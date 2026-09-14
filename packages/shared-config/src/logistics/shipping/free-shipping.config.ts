/**
 * Free shipping configuration
 * @module shared-config/logistics/shipping
 */
import { getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper';

export const FREE_SHIPPING_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('FREE_SHIPPING_ENABLED', true),
  minOrderAmount: getOptionalEnvInt('FREE_SHIPPING_MIN_ORDER', 1000),
  minItemsCount: getOptionalEnvInt('FREE_SHIPPING_MIN_ITEMS', 0),
  firstOrderOnly: getOptionalEnvBool('FREE_SHIPPING_FIRST_ORDER', false),
  forLoyaltyTiers: Object.freeze(['gold', 'platinum', 'diamond'] as const),
  maxWeightKg: getOptionalEnvInt('FREE_SHIPPING_MAX_WEIGHT_KG', 20),
  excludeRemoteZones: getOptionalEnvBool('FREE_SHIPPING_EXCLUDE_REMOTE', true),
});
