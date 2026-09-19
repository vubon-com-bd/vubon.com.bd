/**
 * Promotion configuration
 * @module shared-config/marketing/promotion
 */
import { getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper';

export const PROMOTION_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('PROMOTION_ENABLED', true),
  maxActive: getOptionalEnvInt('PROMOTION_MAX_ACTIVE', 5000),
  minDiscountPercent: getOptionalEnvInt('PROMOTION_MIN_DISCOUNT_PCT', 1),
  maxDiscountPercent: getOptionalEnvInt('PROMOTION_MAX_DISCOUNT_PCT', 90),
  minDiscountAmount: getOptionalEnvInt('PROMOTION_MIN_DISCOUNT_AMOUNT', 1),
  maxDiscountAmount: getOptionalEnvInt('PROMOTION_MAX_DISCOUNT_AMOUNT', 1000000),
  minOrderAmount: getOptionalEnvInt('PROMOTION_MIN_ORDER_AMOUNT', 0),
  maxUses: getOptionalEnvInt('PROMOTION_MAX_USES', 1000000),
  maxUsesPerUser: getOptionalEnvInt('PROMOTION_MAX_USES_PER_USER', 100),
  stackableDefault: getOptionalEnvBool('PROMOTION_STACKABLE', false),
  defaultDurationDays: getOptionalEnvInt('PROMOTION_DEFAULT_DAYS', 30),
  maxDurationDays: getOptionalEnvInt('PROMOTION_MAX_DAYS', 365),
});
