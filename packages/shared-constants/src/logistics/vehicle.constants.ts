import { STATUS as COMMON_STATUS } from '../common/status.constants';
import { TYPES as COMMON_TYPES } from '../common/types.constants';

export const VEHICLE = {
  STATUS: {
    ...COMMON_STATUS,
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    MAINTENANCE: 'maintenance',
    OUT_OF_SERVICE: 'out_of_service',
    ON_ROUTE: 'on_route',
  },
  TYPES: {
    ...COMMON_TYPES,
    BIKE: 'bike',
    CAR: 'car',
    VAN: 'van',
    TRUCK: 'truck',
    TEMPO: 'tempo',
    PICKUP: 'pickup',
    CONTAINER: 'container',
  },
  VEHICLE_CAPACITY: {
    BIKE: 10,
    CAR: 50,
    VAN: 200,
    TRUCK: 1000,
    TEMPO: 150,
    PICKUP: 300,
    CONTAINER: 5000,
  },
  FUEL_TYPES: {
    PETROL: 'petrol',
    DIESEL: 'diesel',
    CNG: 'cng',
    ELECTRIC: 'electric',
    HYBRID: 'hybrid',
  },
  MAX_WEIGHT_KG: 10000,
  MAX_DIMENSIONS_CM: { length: 500, width: 250, height: 250 },
} as const;
