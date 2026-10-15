/**
 * Coupon/Voucher Configuration
 * @module cart-service/infrastructure/config
 */
import {
  getOptionalEnvBool,
  getOptionalEnvInt,
} from '@vubon/shared-config/common';

export const COUPON_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('COUPON_ENABLED', true),
  maxDiscountPercent: getOptionalEnvInt('COUPON_MAX_DISCOUNT_PERCENT', 90),
  maxDiscountAmount: getOptionalEnvInt('COUPON_MAX_DISCOUNT_AMOUNT', 100000),
  caseSensitive: getOptionalEnvBool('COUPON_CASE_SENSITIVE', false),
});

export const VOUCHER_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('VOUCHER_ENABLED', true),
  partialRedeemDefault: getOptionalEnvBool('VOUCHER_PARTIAL_REDEEM', true),
  maxActivePerUser: getOptionalEnvInt('VOUCHER_MAX_ACTIVE_PER_USER', 20),
});
