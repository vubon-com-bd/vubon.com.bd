import { STATUS as COMMON_STATUS } from '../common/status.constants';
import { TYPES as COMMON_TYPES } from '../common/types.constants';
import { DIVISIONS } from '../common/divisions.constants';
import { DISTRICTS } from '../common/districts.constants';

export const ZONE = {
  STATUS: {
    ...COMMON_STATUS,
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    UNDER_REVIEW: 'under_review',
  },
  TYPES: {
    ...COMMON_TYPES,
    DIVISION: 'division',
    DISTRICT: 'district',
    CITY: 'city',
    AREA: 'area',
    POSTAL: 'postal',
  },
  DIVISIONS: { ...DIVISIONS },
  DISTRICTS: { ...DISTRICTS },
  ZONE_PRIORITY: {
    HIGH: 1,
    MEDIUM: 2,
    LOW: 3,
  },
  MAX_ZONES_PER_DIVISION: 50,
  COVERAGE_RADIUS_KM: 100,
} as const;
