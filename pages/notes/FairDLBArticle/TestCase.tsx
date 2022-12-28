import { DLBGroup, DLBDevice, DLBPhase, Phases, PowerType } from './DLBTypes'

export var testDevice1: DLBDevice = {
  id: 'HELLOWORLD',
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
}

var testDevice2: DLBDevice = {
  id: 'HELLOWORLD2',
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
}

var testDevice3: DLBDevice = {
  id: 'HELLOWORLD3',
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
}

// Modify this, or the devices, to run a test case however you would like

export var testGroup: DLBGroup = {
  grid_amperage: 50,
  grid_voltage: 240,
  phases: new Map<Phases, DLBPhase>([
    [
      1,
      {
        id: 1,
        distribution: [],
        children: [testDevice1, testDevice2],
      },
    ],
    [
      2,
      {
        id: 1,
        distribution: [],
        children: [testDevice1, testDevice2, testDevice3],
      },
    ],
    [
      3,
      {
        id: 1,
        distribution: [],
        children: [testDevice1, testDevice2],
      },
    ],
  ]),
}

export {}
