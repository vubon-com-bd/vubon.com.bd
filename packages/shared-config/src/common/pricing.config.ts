import { DISCOUNT } from '@vubon/shared-constants/src/common/discount.constants';
import { CURRENCY } from '@vubon/shared-constants/src/common/currency.constants';

export const pricingConfig = {
  defaultCurrency: CURRENCY.BDT.code,
  taxInclusive: true,
  discountTypes: [DISCOUNT.TYPE.PERCENTAGE, DISCOUNT.TYPE.FIXED, DISCOUNT.TYPE.BUNDLE],
  maxDiscountPercentage: DISCOUNT.MAX.PERCENTAGE,
  minDiscountPercentage: DISCOUNT.MIN.PERCENTAGE,
  priceRoundTo: 2,
} as const;
