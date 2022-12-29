import { DLBGroup, DLBPhase, Phases } from "./DLBTypes"
import { testGroup } from "./TestCase"

/*        PROPORTIONALLY ALLOCATED DLM         */

// Note: This is designed such that with small modifications, it can be easily abstracted to ANY problem involving layers of dependency
// If I think of another problem like that, I'll be bothered to make the types abstract too.

/**
 * Apply the "I Gotta Ask My Dad" algorithm to a given DLB group, where the distribution of amperage is proportional to device power
 * @param group 
 * @returns The DLB group with it's allocation set 
 */
const BalanceGroup = (group: DLBGroup): DLBGroup => {
    // We first need to construct the tree by understanding what amperage each port and device requires
    ConstructTree(group)

    // Now that the device and phase nodes know what they are being asked for, they can readjust
    // They will allocate each child node a proportional share of what they were asked for, adjusted to not exceed what they can provide
    DistributeAmperage(group)

    // Please note if you wish to set connector amperage their allocated amount via OCPP's setChargingProfile command,
    // Then for it to be safe in practice, you need to do so in the order: inactive ascending & start_date_time ascending.
    return group
}

/**
 * Construct the distribution vector of all Distributable nodes in the DLBGroup tree
 * @param group The group to fill out the distribution vectors for
 */
const ConstructTree = (group: DLBGroup) => {
    group.phases.forEach((value: DLBPhase, key: Phases, map: Map<Phases, DLBPhase>) => {
        // Construct the distribution for each device in the phase
        for (var child of value.children) {
            ConstructDistribution(child.distribution, child.children, child.max_amperage)
        }
        // Construct the distribution for the phase itself
        ConstructDistribution(value.distribution, value.children, group.grid_amperage, false)
    })
    // Now all the distribution vectors in the group will be set appropriately
    console.log("Constructed initial distribution:", group.phases)
}

/**
 * From the top down, set the new distribution vector of a device according to it's phase, then allocate to each of its ports.
 * @param group
 */
const DistributeAmperage = (group: DLBGroup) => {
    // The distributions have been constructed, we just need to allocate everything now
    group.phases.forEach((value: DLBPhase, key: Phases, map: Map<Phases, DLBPhase>) => {
        // For each device, set it's distribution vectors sum to the allocation decided by the phase
        for (var i in value.children) {
            var device = value.children[i]
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
const ConstructDistribution = (distribution: number[], children: any[], capacity: number, isDevice: boolean = true) => {
    // To start, the distribution vector will contain what amperage each child node is asking for.
    // Only calculate the distribution vector once, as overlapping devices will cause multiple recalculations
    if (distribution.length === children.length) return;
    for (var child of children) {
        // For a device, set this to the sum of the distribution array, for a connector, set this to it's max_amperage
        var amperage_requested = child.children ? Sum(child.distribution) : child.max_amperage;
        // Set 0 for inactive connectors - will be null and continue if child is a device
        if (child.inactive) amperage_requested = 0;  
        
        distribution.push(amperage_requested)
    }
    // Then, we need to normalise the distribution such that it's sum is less than or equal to the max_amperage of the parent node.
    // If a device has its sum less than its capacity, only ask for the sum
    isDevice ? Sum(distribution) > capacity && SetVectorLength(distribution, capacity) : SetVectorLength(distribution, capacity)
    
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

// See the result for each phase here
const BalancedGroup = BalanceGroup(testGroup)
console.log("Group balanced:", BalancedGroup.phases.get(1), BalancedGroup.phases.get(2), BalancedGroup.phases.get(3))

export {}