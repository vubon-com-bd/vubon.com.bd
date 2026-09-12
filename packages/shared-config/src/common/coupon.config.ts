import { DISCOUNT } from '@vubon/shared-constants/src/common/discount.constants';

export const couponConfig = {
  maxCouponsPerCart: 10,
  maxUsagePerUser: DISCOUNT.DEFAULT.USAGE_LIMIT_PER_USER,
  maxUsageTotal: DISCOUNT.LIMIT.DEFAULT_MAX_TOTAL,
  minOrderAmount: DISCOUNT.DEFAULT.MIN_ORDER_AMOUNT,
  maxDiscountAmount: 500,
  codeLength: DISCOUNT.COUPON.MIN_LENGTH,
  expiryDays: 30,
} as const;
