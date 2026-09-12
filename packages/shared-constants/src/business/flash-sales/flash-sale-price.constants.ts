import { TYPES as COMMON_TYPES } from '../../common/types.constants';
import { CURRENCY } from '../../common/currency.constants';
import { PRICING } from '../product/pricing.constants';
import { FLASH_SALE_STATUS } from './flash-sale-status.constants';

export const FLASH_SALE_PRICE = {
  TYPES: {
    ...COMMON_TYPES,
    ...PRICING.TYPES,
    FLASH_SALE: 'flash_sale',
    EARLY_BIRD: 'early_bird',
    LAST_MINUTE: 'last_minute',
  },
  CURRENCY: { ...CURRENCY },
  PRICING: { ...PRICING },
  FLASH_SALE_STATUS: { ...FLASH_SALE_STATUS },
  PRICE_TYPES: {
    REGULAR: 'regular',
    FLASH_SALE: 'flash_sale',
    EARLY_ACCESS: 'early_access',
    VIP: 'vip',
  },
  MIN_PRICE_DROP_PERCENTAGE: 5,
  MAX_PRICE_DROP_PERCENTAGE: 90,
  PRICE_VALIDITY_MINUTES: 60,
} as const;
