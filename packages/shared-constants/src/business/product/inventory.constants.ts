import { STATUS as COMMON_STATUS } from '../../common/status.constants';
import { TYPES as COMMON_TYPES } from '../../common/types.constants';

export const INVENTORY = {
  STATUS: {
    ...COMMON_STATUS,
    AVAILABLE: 'available',
    RESERVED: 'reserved',
    SOLD: 'sold',
    DAMAGED: 'damaged',
    RETURNED: 'returned',
  },
  TYPES: {
    ...COMMON_TYPES,
    PHYSICAL: 'physical',
    VIRTUAL: 'virtual',
  },
} as const;
