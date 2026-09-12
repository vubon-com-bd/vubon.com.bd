import { STATUS as COMMON_STATUS } from '../common/status.constants';
import { TYPES as COMMON_TYPES } from '../common/types.constants';
import { VENDOR_STATUS } from '../business/vendor/vendor-status.constants';

export const COURIER = {
  STATUS: {
    ...COMMON_STATUS,
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    SUSPENDED: 'suspended',
    BANNED: 'banned',
  },
  TYPES: {
    ...COMMON_TYPES,
    LOCAL: 'local',
    NATIONAL: 'national',
    INTERNATIONAL: 'international',
    EXPRESS: 'express',
    STANDARD: 'standard',
    ECONOMY: 'economy',
  },
  VENDOR_STATUS: { ...VENDOR_STATUS },
  COURIER_COMPANIES: [
    'SA Paribahan',
    'Sundarban Courier',
    'Redx',
    'Pathao Courier',
    'E-Courier',
    'DHL',
    'FedEx',
    'UPS',
  ],
  SERVICE_TYPES: {
    DOOR_TO_DOOR: 'door_to_door',
    DOOR_TO_STATION: 'door_to_station',
    STATION_TO_DOOR: 'station_to_door',
    STATION_TO_STATION: 'station_to_station',
  },
  MAX_WEIGHT_KG: 100,
  MAX_DIMENSIONS_CM: { length: 150, width: 150, height: 150 },
} as const;
