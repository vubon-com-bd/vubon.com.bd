import { COMMISSION } from '@vubon/shared-constants/src/common/commission.constants';

export const commissionConfig = {
  defaultRate: COMMISSION.DEFAULT.RATE,
  tierRates: {
    basic: COMMISSION.TIER.LEVEL_1.rate,
    silver: COMMISSION.TIER.LEVEL_2.rate,
    gold: COMMISSION.TIER.LEVEL_3.rate,
    platinum: COMMISSION.TIER.LEVEL_4.rate,
    diamond: COMMISSION.TIER.LEVEL_5.rate,
  },
  minAmount: COMMISSION.DEFAULT.MIN_AMOUNT,
  calculation: COMMISSION.BASIS.PRODUCT_PRICE,
} as const;
