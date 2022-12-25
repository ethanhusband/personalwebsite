import { DLBGroup, DLBDevice, DLBPhase, Phases, PowerType } from "./DLBTypes"

/*        EVENLY ALLOCATED DLM         */

/**
 * Apply the trickling algorithm to a given DLB group. Currently assumes both ports have same max amperage.
 * @param group 
 * @returns The DLB group with it's allocation set 
 */
const BalanceGroup = (group: DLBGroup): DLBGroup => {
    // We first need to construct the distribution vectors of all devices - dictating how each device will distribute its provided amperage
    ConstructDeviceDistributions(group)

    // This step is necessary to determine how the phases will distribute their amperage across devices
    // It is quite more involved than distributing in proportion to what amperage each device requests
    DistributeFairly(group)

    // Now that the device and phase nodes know what they are being asked for, they can readjust
    // They will allocate each child node a proportional share of what they were asked for, adjusted to not exceed what they can provide
    TrickleAmperage(group)

    // Please note if you wish to set connector amperage their allocated amount via OCPP's setChargingProfile command,
    // Then for it to be safe in practice, you need to do so in the order: inactive ascending & start_date_time ascending.
    return group
}

/**
 * Construct the distribution vector of all Distributable nodes in the DLBGroup tree
 * @param group The group to fill out the distribution vectors for
 */
const ConstructDeviceDistributions = (group: DLBGroup) => {
    group.phases.forEach((value: DLBPhase, key: Phases, map: Map<Phases, DLBPhase>) => {
        // Construct the distribution for each device in the phase
        for (var child of value.children) {
          ConstructDistribution(child.distribution, child.children, child.max_amperage, group.grid_voltage)
        }
    })
    // Now all the distribution vectors for the devices will be set appropriately
}

/**
 * Modify the distribution of phases to allocate the most even amount possible to each connector
 * @param group 
 */
const DistributeFairly = (group: DLBGroup) => {
  // We want to consider A) how much amperage each device requests / can accept and B) what the fairest distribution is.
    group.phases.forEach((value: DLBPhase, key: Phases, map: Map<Phases, DLBPhase>) => {
      // First, get the distribution of what each device can maximally accept.
      var maximal: number[] = [];
      value.children.forEach((value: DLBDevice) => {
        // The sum of the distribution is what the device is requesting. Exceeding device maximums has already been accounted for.
        maximal.push(Sum(value.distribution))
      })
      
      // Next, get the distribution of active connectors as to determine what we ideally should give each device for a fair distribution.
      value.distribution = ActiveConnectorDistribution(value);
      var fairAmperagePerConnector = group.grid_amperage / Sum(value.distribution)
      value.distribution = value.distribution.map((x) => x *= fairAmperagePerConnector)
      console.log("Fair distribution for phase", value.id, "is", value.distribution)

      // Now we need to reconcile the two. Try to give each device it's fair amount. If it cant accept it all - distribute that amongst the rest.
      var totalDevices = value.children.length
      for (var i = 0; i < totalDevices; i++) {
        // Check if we have any leftover
        if (maximal[i] < value.distribution[i]) {
          const leftoverPerRemainingDevice = value.distribution[i] - maximal[i] / (totalDevices - i + 1)
          value.distribution[i] = maximal[i]
          // Adjust the rest of the fair distribution
          for (var j = i; j < totalDevices; j++) {
            value.distribution[j] += leftoverPerRemainingDevice
          }
        }
      }
      console.log("Adjusted fair distribution for phase", value.id, "is", value.distribution)
    })
}

/**
 * From the top down, set the new distribution vector of a device according to it's phase, then allocate to each of its ports.
 * @param group
 */
const TrickleAmperage = (group: DLBGroup) => {
    // The distributions have been constructed, we just need to allocate everything now
    group.phases.forEach((value: DLBPhase, key: Phases, map: Map<Phases, DLBPhase>) => {
        // For each device, set it's distribution vectors sum to the allocation decided by the phase
        for (var i in value.children) {
            var device = value.children[i]
            console.log("PHASE", value.distribution)
            if (value.distribution[i] < Sum(device.distribution)) {
              device.allocated_amperage = value.distribution[i]
              SetVectorLength(device.distribution, device.allocated_amperage)
            }
            
            // Then for each of it's connectors, allocate them what was decided by the device distribution vector
            for (var j in device.children) {
                device.children[j].allocated_amperage = device.distribution[j]
            }
        }
    })
}

/**
 * Use the children and parent node's amperage capacity to set the distribution vector to an optimal safe allocation,
 * Maintaining the proportion of what amperage each child node is asking for
 * @param distribution 
 * @param children 
 * @param capacity 
 */
const ConstructDistribution = (distribution: number[], children: any[], capacity: number, voltage: number) => {
    // To start, the distribution vector will contain what amperage each child node is asking for.
    // Only calculate the distribution vector once, as overlapping devices will cause multiple recalculations
    if (distribution.length === children.length) return;
    for (var child of children) {
        // For a device, set this to the sum of the distribution array, for a connector, set this to it's max_amperage
        var amperage_requested = child.children ? Sum(child.distribution) : child.max_amperage;
        // Set 0 for inactive connectors - will be null and continue if child is a device
        if (child.inactive) amperage_requested = 0; 
        // Adjust by voltage proportion so power is what's being evenly distributed - when DC devices are included
        if (child.voltage && child.voltage !== voltage) amperage_requested *= voltage / child.voltage 
        
        distribution.push(amperage_requested)
    }
    // Then, we need to normalise the distribution such that it's sum is equal to the max_amperage of the parent node
    // This is such that what we allocate to the child nodes is safe according to the parent node
    console.log("Distribution before length adjustment:", distribution, capacity)
    SetVectorLength(distribution, capacity)
    
}

/**
 * Get the distribution of active connectors across devices on the phase
 * @param phase 
 * @returns An array which corresponds to how many active connectors each device on the phase has
 */
const ActiveConnectorDistribution = (phase: DLBPhase): number[] => {
    var active = []
    for (var device of phase.children) {
        var count = 0;
        for (var connector of device.children) {
            if (!connector.inactive) count++
        }
        active.push(count)
    }
    return active
}

/**
 * Multiply each element by a ratio such that the sum of 'vector' becomes 'length',
 * While stil maintaining the relative proportion of elements.
 * @param vector 
 * @param length
 */
const SetVectorLength = (vector: number[], length: number) => {
    const curLength = Sum(vector)
    for (var i in vector) {
        vector[i] *= (length / curLength) 
    }
}

/**
 * Sum the elements in an array of numbers
 * @param array Array to sum
 * @returns The sum of the array
 */
const Sum = (array: number[]): number => {
    return array.reduce((accumulator, current) => {
        return accumulator + current;
      }, 0); 
}

var testDevice1: DLBDevice = {
  id: "HELLOWORLD",
  max_amperage: 50,
  allocated_amperage: 0,
  distribution: [],
  children: [
    {
      id: 1,
      inactive: false,
      max_amperage: 32,
      max_voltage: 500,
      allocated_amperage: 0,
      power_type: PowerType.DC,
    },
    {
      id: 2,
      inactive: true,
      max_amperage: 32,
      max_voltage: 500,
      allocated_amperage: 0,
      power_type: PowerType.DC,
    },
  ],
};

var testDevice2: DLBDevice = {
  id: "HELLOWORLD2",
  max_amperage: 50,
  allocated_amperage: 0,
  distribution: [],
  children: [
    {
      id: 1,
      inactive: true,
      max_amperage: 32,
      max_voltage: 240,
      allocated_amperage: 0,
      power_type: PowerType.AC_1_PHASE,
    },
    {
      id: 2,
      inactive: false,
      max_amperage: 32,
      max_voltage: 240,
      allocated_amperage: 0,
      power_type: PowerType.AC_1_PHASE,
    },
  ],
};

var testDevice3: DLBDevice = {
  id: "HELLOWORLD3",
  max_amperage: 20,
  allocated_amperage: 0,
  distribution: [],
  children: [
    {
      id: 1,
      inactive: false,
      max_amperage: 32,
      max_voltage: 240,
      allocated_amperage: 0,
      power_type: PowerType.AC_3_PHASE,
    },
    {
      id: 2,
      inactive: false,
      max_amperage: 32,
      max_voltage: 240,
      allocated_amperage: 0,
      power_type: PowerType.AC_3_PHASE,
    },
  ],
};

const testGroup: DLBGroup = {
  grid_amperage: 50,
  grid_voltage: 240,
  phases: new Map<Phases, DLBPhase>([
        [1, {
            id: 1,
            distribution: [],
            children: [testDevice1, testDevice2]
            }
        ],
        [2, {
            id: 1,
            distribution: [],
            children: [testDevice1, testDevice2, testDevice3]
            }
        ],
        [3, {
            id: 1,
            distribution: [],
            children: [testDevice1, testDevice2]
            }
        ],
    ]),
}

console.log("Group balanced:", BalanceGroup(testGroup).phases.get(2))

export {}
