import { STATUS as COMMON_STATUS } from '../common/status.constants';
import { TYPES as COMMON_TYPES } from '../common/types.constants';
import { VENDOR_ADDRESS } from '../business/vendor/vendor-address.constants';

export const WAREHOUSE = {
  STATUS: {
    ...COMMON_STATUS,
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    MAINTENANCE: 'maintenance',
    CLOSED: 'closed',
  },
  TYPES: {
    ...COMMON_TYPES,
    CENTRAL: 'central',
    REGIONAL: 'regional',
    LOCAL: 'local',
    FULFILLMENT: 'fulfillment',
    DISTRIBUTION: 'distribution',
    STORAGE: 'storage',
  },
  VENDOR_ADDRESS: { ...VENDOR_ADDRESS },
  WAREHOUSE_CAPACITY: {
    SMALL: '0-1000 sqft',
    MEDIUM: '1001-5000 sqft',
    LARGE: '5001-20000 sqft',
    XL: '20001+ sqft',
  },
  MAX_STORAGE_DAYS: 365,
  MIN_STORAGE_TEMP_C: -20,
  MAX_STORAGE_TEMP_C: 40,
} as const;
