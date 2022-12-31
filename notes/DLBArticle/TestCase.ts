import { DLBGroup, DLBDevice, DLBPhase, Phases, PowerType } from './DLBTypes'

/*                   TEST CASE                 */

// Note that if the device is turned on, it should start with connector requested amperage and allocated amperage set equal to max
var testDevice1: DLBDevice = {
  id: 'HELLOWORLD',
  max_amperage: 50,
  allocated_amperage: 0,
  requested_amperage: 0,
  power_type: PowerType.THREE_PHASE,
  children: [
    {
      id: 1,
      inactive: false,
      max_amperage: 32,
      max_voltage: 500,
      allocated_amperage: 32,
      requested_amperage: 32,
    },
    {
      id: 2,
      inactive: false,
      max_amperage: 32,
      max_voltage: 500,
      allocated_amperage: 32,
      requested_amperage: 32,
    },
  ],
}

var testDevice2: DLBDevice = {
  id: 'HELLOWORLD2',
  max_amperage: 12,
  allocated_amperage: 0,
  requested_amperage: 0,
  power_type: PowerType.SINGLE_PHASE,
  children: [
    {
      id: 1,
      inactive: true,
      max_amperage: 32,
      max_voltage: 240,
      allocated_amperage: 0,
      requested_amperage: 0,
    },
    {
      id: 2,
      inactive: false,
      max_amperage: 32,
      max_voltage: 240,
      allocated_amperage: 32,
      requested_amperage: 32,
    },
  ],
}

var testDevice3: DLBDevice = {
  id: 'HELLOWORLD3',
  max_amperage: 22,
  allocated_amperage: 0,
  requested_amperage: 0,
  power_type: PowerType.SINGLE_PHASE,
  children: [
    {
      id: 1,
      inactive: false,
      max_amperage: 32,
      max_voltage: 240,
      allocated_amperage: 32,
      requested_amperage: 32,
      
    },
    {
      id: 2,
      inactive: false,
      max_amperage: 32,
      max_voltage: 240,
      allocated_amperage: 32,
      requested_amperage: 32,
    },
  ],
}

// Modify this, or the devices, to run a test case however you would like

export var testGroup: DLBGroup = {
  grid_amperage: 40,
  grid_voltage: 240,
  phases: new Map<Phases, DLBPhase>([
    [
      1,
      {
        id: 1,
        children: [testDevice1],
      },
    ],
    [
      2,
      {
        id: 2,
        children: [testDevice1, testDevice2],
      },
    ],
    [
      3,
      {
        id: 3,
        children: [testDevice1, testDevice3],
      },
    ],
  ]),
}