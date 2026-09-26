/**
 * Loyalty program configuration
 * @module shared-config/marketing/loyalty
 */
import { getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper';

export const LOYALTY_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('LOYALTY_ENABLED', true),
  autoEnrollOnSignup: getOptionalEnvBool('LOYALTY_AUTO_ENROLL', true),
  pointsPerCurrency: getOptionalEnvInt('LOYALTY_POINTS_PER_CURRENCY', 1),
  pointValue: getOptionalEnvInt('LOYALTY_POINT_VALUE_CENTS', 1),
  minRedeemPoints: getOptionalEnvInt('LOYALTY_MIN_REDEEM', 100),
  maxRedeemPercent: getOptionalEnvInt('LOYALTY_MAX_REDEEM_PCT', 50),
  signupBonus: getOptionalEnvInt('LOYALTY_SIGNUP_BONUS', 100),
  reviewBonus: getOptionalEnvInt('LOYALTY_REVIEW_BONUS', 50),
  referralBonus: getOptionalEnvInt('LOYALTY_REFERRAL_BONUS', 200),
  birthdayBonus: getOptionalEnvInt('LOYALTY_BIRTHDAY_BONUS', 500),
  pointExpiryDays: getOptionalEnvInt('LOYALTY_POINT_EXPIRY_DAYS', 365),
  tierValidityDays: getOptionalEnvInt('LOYALTY_TIER_VALIDITY_DAYS', 365),
});
