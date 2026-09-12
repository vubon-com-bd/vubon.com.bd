import { STATUS as COMMON_STATUS } from '../common/status.constants';
import { TYPES as COMMON_TYPES } from '../common/types.constants';
import { ZONE } from './zone.constants';

export const ROUTE = {
  STATUS: {
    ...COMMON_STATUS,
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    OPTIMIZED: 'optimized',
    UNDER_MAINTENANCE: 'under_maintenance',
  },
  TYPES: {
    ...COMMON_TYPES,
    URBAN: 'urban',
    SUBURBAN: 'suburban',
    RURAL: 'rural',
    HIGHWAY: 'highway',
    CUSTOM: 'custom',
  },
  ZONE: { ...ZONE },
  ROUTE_OPTIMIZATION: {
    DISTANCE: 'distance',
    TIME: 'time',
    COST: 'cost',
    FUEL: 'fuel',
  },
  MAX_STOPS: 50,
  MAX_DISTANCE_KM: 500,
  ESTIMATED_TIME_HOURS: 8,
} as const;
