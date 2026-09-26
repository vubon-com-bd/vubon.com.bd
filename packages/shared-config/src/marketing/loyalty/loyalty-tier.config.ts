/**
 * Loyalty tier configuration
 * @module shared-config/marketing/loyalty
 */
import { getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper';

export const LOYALTY_TIER_CONFIG = Object.freeze({
  autoUpgrade: getOptionalEnvBool('LOYALTY_TIER_AUTO_UPGRADE', true),
  autoDowngrade: getOptionalEnvBool('LOYALTY_TIER_AUTO_DOWNGRADE', false),
  evaluationDays: getOptionalEnvInt('LOYALTY_TIER_EVAL_DAYS', 30),
  gracePeriodDays: getOptionalEnvInt('LOYALTY_TIER_GRACE_DAYS', 30),
  thresholds: Object.freeze({
    bronze: getOptionalEnvInt('LOYALTY_TIER_BRONZE', 0),
    silver: getOptionalEnvInt('LOYALTY_TIER_SILVER', 1000),
    gold: getOptionalEnvInt('LOYALTY_TIER_GOLD', 5000),
    platinum: getOptionalEnvInt('LOYALTY_TIER_PLATINUM', 20000),
    diamond: getOptionalEnvInt('LOYALTY_TIER_DIAMOND', 100000),
  }),
  multipliers: Object.freeze({
    bronze: 1.0,
    silver: 1.25,
    gold: 1.5,
    platinum: 2.0,
    diamond: 3.0,
  }),
});
