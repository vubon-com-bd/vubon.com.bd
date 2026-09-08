import { STATUS as COMMON_STATUS } from '../../common/status.constants';
import { TYPES as COMMON_TYPES } from '../../common/types.constants';

export const TAG = {
  STATUS: {
    ...COMMON_STATUS,
    ACTIVE: 'active',
    INACTIVE: 'inactive',
  },
  TYPES: {
    ...COMMON_TYPES,
    PRODUCT: 'product',
    BLOG: 'blog',
    OFFER: 'offer',
  },
} as const;
