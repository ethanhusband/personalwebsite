/*        TYPES         */

// Abstract type for devices and phases which manage the distribution of their child nodes.
export type Distributable<T> = {
    distribution: number[] // // What amperage will be allocated to each child node. Should start empty
    children: T[]
}

// Abstract type to append to other types such that they have an ID of themselves. Includes <T> such that this can be an enum.
export type SelfReferential<T> = {
    id: T
}

// Abstract type for devices and connectors which can be set an amperage by their parent node.
export type Allocatable = {
    max_amperage: number; // The maximum amperage capacity of the component
    allocated_amperage: number; // The amperage capacity decided by the parent of the component
}

// The data type used to express a DLB group
export type DLBGroup = {
    grid_amperage: number; // The amperage supplied by all grid phases to the group - same for all phases!
    grid_voltage: number;
    phases: Map<Phases, DLBPhase>; // The group phases, may have overlap in terms of devices but this is okay and intended.
  };
  
// The data type to express each phase of a DLB group. 
export type DLBPhase = Distributable<DLBDevice> & SelfReferential<Phases>

// The data type used to express a device in a DLB group
export type DLBDevice = Allocatable & Distributable<DLBConnector> & SelfReferential<string>

// The data type used to express a connector in a DLB group. SelfReferential uses number to refer to respective connector number
export type DLBConnector = Allocatable & SelfReferential<number> & {
    inactive: boolean; // Allocate 0 to inactive connectors
    max_voltage: number; // The voltage applied between the charger and car, either set by the grid (usually 240V) or by a DC device
    power_type: PowerType;
    // This should be an ISO string, and needs to be present if the port is charging
    charging_start_time?: string;
  };

// Possible power types used by devices
export enum PowerType {
    AC_1_PHASE,
    AC_3_PHASE,
    DC,
}

// Possible phases a device might draw power from
export enum Phases {
    L1,
    L2,
    L3
}