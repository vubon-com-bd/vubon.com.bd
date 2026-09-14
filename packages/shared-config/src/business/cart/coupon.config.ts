/**
 * Coupon configuration
 * @module shared-config/business/cart
 */
import { getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper';

export const COUPON_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('COUPON_ENABLED', true),
  codeMinLength: getOptionalEnvInt('COUPON_CODE_MIN_LENGTH', 4),
  codeMaxLength: getOptionalEnvInt('COUPON_CODE_MAX_LENGTH', 32),
  maxUsesDefault: getOptionalEnvInt('COUPON_MAX_USES', 100000),
  maxUsesPerUserDefault: getOptionalEnvInt('COUPON_MAX_USES_PER_USER', 1),
  maxDiscountPercent: getOptionalEnvInt('COUPON_MAX_DISCOUNT_PERCENT', 90),
  maxDiscountAmount: getOptionalEnvInt('COUPON_MAX_DISCOUNT_AMOUNT', 100000),
  expiryDaysDefault: getOptionalEnvInt('COUPON_EXPIRY_DAYS', 365),
  stackableDefault: getOptionalEnvBool('COUPON_STACKABLE', false),
  caseSensitive: getOptionalEnvBool('COUPON_CASE_SENSITIVE', false),
});
