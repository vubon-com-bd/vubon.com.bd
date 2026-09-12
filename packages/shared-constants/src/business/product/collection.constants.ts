import { STATUS as COMMON_STATUS } from '../../common/status.constants';
import { TYPES as COMMON_TYPES } from '../../common/types.constants';

export const COLLECTION = {
  STATUS: {
    ...COMMON_STATUS,
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    SCHEDULED: 'scheduled',
    EXPIRED: 'expired',
  },
  TYPES: {
    ...COMMON_TYPES,
    SEASONAL: 'seasonal',
    PROMOTIONAL: 'promotional',
    THEMED: 'themed',
    BESTSELLER: 'bestseller',
  },
} as const;
