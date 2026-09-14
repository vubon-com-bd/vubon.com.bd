/**
 * Bundle deal configuration
 * @module shared-config/business/flash-sales
 */
import { getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper';

export const BUNDLE_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('BUNDLE_ENABLED', true),
  maxActive: getOptionalEnvInt('BUNDLE_MAX_ACTIVE', 100),
  minItems: getOptionalEnvInt('BUNDLE_MIN_ITEMS', 2),
  maxItems: getOptionalEnvInt('BUNDLE_MAX_ITEMS', 20),
  minDiscountPercent: getOptionalEnvInt('BUNDLE_MIN_DISCOUNT', 1),
  maxDiscountPercent: getOptionalEnvInt('BUNDLE_MAX_DISCOUNT', 80),
  allowMixCategories: getOptionalEnvBool('BUNDLE_MIX_CATEGORIES', true),
  perUserLimit: getOptionalEnvInt('BUNDLE_PER_USER_LIMIT', 5),
});
