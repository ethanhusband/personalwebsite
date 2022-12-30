import { DLBGroup, DLBPhase, DLBDevice, Allocatable, Phases, PowerType } from "./DLBTypes"
import { testGroup } from "./TestCase"

/*        PROPORTIONALLY ALLOCATED DLM         */

/**
 * Apply the "I Gotta Ask My Dad" algorithm to a given DLB group, where the distribution of amperage is proportional to device power
 * @param group 
 * @returns The DLB group with it's allocation set 
 */
const BalanceGroup = (group: DLBGroup): DLBGroup => {
    // We first need to know what each device needs from its phases, by constructing how it will distribute current to its connectors.
    ConstructRequests(group)

    // Now we need to delicately determine what each device can have, by constructing phase distributions
    DeterminePhaseAllocations(group)

    // Now that the device and phase nodes know what they are being asked for, they can readjust
    // They will allocate each child node a proportional share of what they were asked for, adjusted to not exceed what they can provide
    DistributeAmperage(group)

    // Please note if you wish to set connector amperage their allocated amount via OCPP's setChargingProfile command,
    // Then for it to be safe in practice, you need to do so in the order: inactive ascending & start_date_time ascending.
    return group
}

/**
 * Construct the distribution vector of all device nodes in the DLBGroup tree
 * @param group
 */
const ConstructRequests = (group: DLBGroup) => {
    var devices = new Map<string, DLBDevice>()

    // Get all the devices in a single list
    group.phases.forEach((phase: DLBPhase, key: Phases, map: Map<Phases, DLBPhase>) => {
        for (var device of phase.children) {
          if (!devices.get(device.id)) {
            devices.set(device.id, device)
          }
        }
    })

    // Construct the distribution for each device in the phase
    for (var device of Array.from(devices.values())) {
        var connectorsRequested = 0
        for (var connector of device.children) {
          connectorsRequested += connector.requested_amperage
        }
        // Adjust what they can have if they asked too much
        if (connectorsRequested > device.max_amperage) {
          AdjustChildProportions(device.children, device.max_amperage / connectorsRequested)
          device.requested_amperage = device.max_amperage
        } else {
          device.requested_amperage = connectorsRequested
        }
        // For the sake of using the Min function later, set this
        device.allocated_amperage = device.requested_amperage
        console.log("Device", device.id, "will req amperage", device.requested_amperage)
    }
}

/**
 * Let the phases decide how they should distribute their amperage to the devices - implying what each device can draw
 * @param group
 */
const DeterminePhaseAllocations = (group: DLBGroup) => {
    // Firstly, we want to determine the an initial calculation which will give us a certain allocation for 3 phase devices.
    Determine3PhaseAllocations(group)

    // Now iterate through again, there might be some single phase devices we can allocate more current to,
    // Since three phase devices will take the minimum of what is available.
    Determine1PhaseAllocations(group)
}

/**
 * Set each connector to get its share of each devices allocated amperage
 * @param group
 */
const DistributeAmperage = (group: DLBGroup) => {
    // The distributions have been constructed, we just need to allocate everything now
    var devices = new Map<string, DLBDevice>()

    // Get all the devices in a single list
    group.phases.forEach((phase: DLBPhase, key: Phases, map: Map<Phases, DLBPhase>) => {
        for (var device of phase.children) {
          if (!devices.get(device.id)) {
            devices.set(device.id, device)
          }
        }
    })

    // Get the connector requests again and finally give them their share of the devices allocated amperage
    for (var device of Array.from(devices.values())) {
      var currentRequested = 0
      for (var connector of device.children) {
        currentRequested += connector.requested_amperage
      }
      AdjustChildProportions(device.children, device.allocated_amperage / currentRequested)
    }
}

/**
 * Determine what every 3 phase device should draw, by taking the minimum it can take off each phase.
 * @param group
 */
const Determine3PhaseAllocations = (group: DLBGroup) => {
    group.phases.forEach((phase: DLBPhase, key: Phases, map: Map<Phases, DLBPhase>) => {
        // Count what the device is asking for, readjust it if it's too much
        var devicesRequested = 0;
        for (var device of phase.children) {
          devicesRequested += device.requested_amperage
        }
        // This just acts to set all the device allocation fields
        AdjustChildProportions(phase.children, 1)
        // Adjust what they can have if they asked too much
        if (devicesRequested > group.grid_amperage) {
            AdjustChildProportions(phase.children, group.grid_amperage / devicesRequested)
        }
        console.log("Constructed distribution for", phase.id, "as", phase.children.map((x) => x.allocated_amperage))
    })
}

/**
 * Optimise the distribution by accounting for the remaining amperage to allocate, which is a result of 
 * 3 phase devices taking their minimum allocation. Give the remaining amperage per phase to any single phase devices.
 * @group
 */
const Determine1PhaseAllocations = (group: DLBGroup) => {
  group.phases.forEach((phase: DLBPhase, key: Phases, map: Map<Phases, DLBPhase>) => { 
      var devicesToIncrease = []
      
      // Have a remainder amount to give to the phases 1-phase devices, subtracting what is taken by 3 phase devices.
      var remainder = group.grid_amperage;
      var totalRequested = 0
      for (var device of phase.children) {
        if (device.power_type === PowerType.THREE_PHASE) {
          remainder -= device.allocated_amperage;
        } else {
          devicesToIncrease.push(device)
          // Do this so we can use the AdjustChildProportions function, otherwise the Min causes issues.
          device.allocated_amperage = device.requested_amperage
          totalRequested += device.requested_amperage
        } 
      }
      // Distribute that remainder proportionally to any remaining single phase devices that can be increased
      if (devicesToIncrease.length > 0) {
        AdjustChildProportions(devicesToIncrease, remainder / totalRequested)
      }
      
      console.log("Reconstructed distribution for", phase.id, "as", phase.children.map((x) => x.allocated_amperage))
    })
}

/**
 * Multiply each element by a ratio such that the sum of 'vector' becomes 'length',
 * While stil maintaining the relative proportion of elements.
 * @param vector 
 * @param length
 */
const AdjustChildProportions = (children: Allocatable[], multiplier: number) => {
    for (var child of children) {
        child.allocated_amperage = Min(child.requested_amperage * multiplier, child.allocated_amperage)
    }
}

const MakeAllocatableExpectMax = (children: Allocatable[]) => {
  // We do this for the sake of using the Min function
  for (var child of children) {
    child.allocated_amperage = child.max_amperage
  }
}

/**
 * Sum the elements in an array of numbers
 * @param array Array to sum
 * @returns The sum of the array
 */
const Sum = (array: Allocatable[]): number => {
    return array.reduce((accumulator, current) => {
        return accumulator;
      }, 0); 
}

/**
 * Return the minimum of two numbers
 * @param num1
 * @param num2
 */
const Min = (num1: number, num2: number) => {
  if (num1 > num2) return num2
  else return num1
}

// See the result for each phase here
const BalancedGroup = BalanceGroup(testGroup)
console.log("Group balanced:", BalancedGroup.phases.get(1), BalancedGroup.phases.get(2), BalancedGroup.phases.get(3))

export {}