import { STATUS as COMMON_STATUS } from '../../common/status.constants';
import { TYPES as COMMON_TYPES } from '../../common/types.constants';
import { USER_STATUS } from '../../user/user-status.constants';
import { FLASH_SALE_STATUS } from './flash-sale-status.constants';

export const FLASH_SALE_VOUCHER = {
  STATUS: {
    ...COMMON_STATUS,
    ACTIVE: 'active',
    USED: 'used',
    EXPIRED: 'expired',
    CANCELLED: 'cancelled',
    TRANSFERRED: 'transferred',
  },
  TYPES: {
    ...COMMON_TYPES,
    DISCOUNT: 'discount',
    FREE_SHIPPING: 'free_shipping',
    GIFT: 'gift',
    ACCESS: 'access',
  },
  USER_STATUS: { ...USER_STATUS },
  FLASH_SALE_STATUS: { ...FLASH_SALE_STATUS },
  VOUCHER_TYPES: {
    INDIVIDUAL: 'individual',
    BULK: 'bulk',
    CUSTOM: 'custom',
  },
  MAX_VOUCHERS_PER_USER: 5,
  VOUCHER_VALIDITY_DAYS: 30,
} as const;
