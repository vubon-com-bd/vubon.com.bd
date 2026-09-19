/**
 * Deal configuration
 * @module shared-config/business/flash-sales
 */
import { getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper';

export const DEAL_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('DEAL_ENABLED', true),
  maxActive: getOptionalEnvInt('DEAL_MAX_ACTIVE', 200),
  minDiscountPercent: getOptionalEnvInt('DEAL_MIN_DISCOUNT', 1),
  maxDiscountPercent: getOptionalEnvInt('DEAL_MAX_DISCOUNT', 90),
  maxDiscountAmount: getOptionalEnvInt('DEAL_MAX_DISCOUNT_AMOUNT', 1000000),
  minOrderAmount: getOptionalEnvInt('DEAL_MIN_ORDER_AMOUNT', 0),
  perUserLimit: getOptionalEnvInt('DEAL_PER_USER_LIMIT', 10),
  stackable: getOptionalEnvBool('DEAL_STACKABLE', false),
});
