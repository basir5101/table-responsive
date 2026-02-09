
import { ColumnConfig, DataRecord } from './types';

const generateRecords = (prefix: string, count: number, type: string): DataRecord[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: `${prefix}-${i}`,
    label: `${type} ${i + 1001}`,
    subtext: `REF-SEC-${(i * 7 + 12).toString(16).toUpperCase()}`,
    connections: [],
    metadata: {
      status: i % 5 === 0 ? 'MAINTENANCE' : 'ACTIVE',
      lastUpdate: '2024-05-20'
    }
  }));
};

export const createMockDataset = (): ColumnConfig[] => {
  const coachTypes = generateRecords('coach', 50, 'Coach Class');
  const doorAssemblies = generateRecords('door', 80, 'Door Assy');
  const actuators = generateRecords('act', 120, 'Actuator');
  const sensors = generateRecords('sens', 150, 'Sensor Unit');
  const firmware = generateRecords('fw', 200, 'FW Revision');

  // Create Relational Links
  // Simplified logic: Each coach links to a range of doors, which link to actuators, etc.
  coachTypes.forEach((coach, i) => {
    const doorRange = [doorAssemblies[i % 80].id, doorAssemblies[(i + 1) % 80].id];
    coach.connections.push(...doorRange);
  });

  doorAssemblies.forEach((door, i) => {
    const actRange = [actuators[i % 120].id, actuators[(i + 1) % 120].id];
    door.connections.push(...actRange);
    // Backlinks for highlighting
    const coachIdx = Math.floor(i / 1.6) % 50;
    door.connections.push(coachTypes[coachIdx].id);
  });

  actuators.forEach((act, i) => {
    const sensRange = [sensors[i % 150].id];
    act.connections.push(...sensRange);
    const doorIdx = Math.floor(i / 1.5) % 80;
    act.connections.push(doorAssemblies[doorIdx].id);
  });

  sensors.forEach((sens, i) => {
    const fwIdx = (i * 2) % 200;
    sens.connections.push(firmware[fwIdx].id);
    const actIdx = Math.floor(i / 1.25) % 120;
    sens.connections.push(actuators[actIdx].id);
  });

  firmware.forEach((fw, i) => {
    const sensIdx = Math.floor(i / 1.33) % 150;
    fw.connections.push(sensors[sensIdx].id);
  });

  return [
    { id: 'col-anchor', title: 'Coach Type', isAnchor: true, records: coachTypes, color: 'border-red-500' },
    { id: 'col-doors', title: 'Door Assembly', records: doorAssemblies, color: 'border-blue-500' },
    { id: 'col-actuators', title: 'Actuators', records: actuators, color: 'border-emerald-500' },
    { id: 'col-sensors', title: 'Sensors', records: sensors, color: 'border-amber-500' },
    { id: 'col-firmware', title: 'Firmware', records: firmware, color: 'border-indigo-500' }
  ];
};
