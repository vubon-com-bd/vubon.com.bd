import { TYPES as COMMON_TYPES } from '../../common/types.constants';
import { CURRENCY } from '../../common/currency.constants';
import { COMMISSION } from '../../common/commission.constants';
import { VENDOR_TIER } from './vendor-tier.constants';

export const VENDOR_COMMISSION = {
  TYPES: {
    ...COMMON_TYPES,
    ...COMMISSION,
    FIXED: 'fixed',
    PERCENTAGE: 'percentage',
    TIERED: 'tiered',
    HYBRID: 'hybrid',
    SLAB: 'slab',
  },
  CURRENCY: { ...CURRENCY },
  COMMISSION: { ...COMMISSION },
  VENDOR_TIER: { ...VENDOR_TIER },
  TIER_COMMISSION_RATES: {
    BASIC: 0.15,
    SILVER: 0.12,
    GOLD: 0.1,
    PLATINUM: 0.08,
    DIAMOND: 0.06,
    ENTERPRISE: 0.04,
  },
  MIN_COMMISSION_AMOUNT: 1,
  MAX_COMMISSION_AMOUNT: 1000,
  COMMISSION_CALCULATION: {
    PRODUCT_PRICE: 'product_price',
    SUBTOTAL: 'subtotal',
    TOTAL: 'total',
  },
} as const;
