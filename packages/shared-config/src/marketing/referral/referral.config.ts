/**
 * Referral program configuration
 * @module shared-config/marketing/referral
 */
import { getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper';

export const REFERRAL_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('REFERRAL_ENABLED', true),
  codeLength: getOptionalEnvInt('REFERRAL_CODE_LENGTH', 8),
  minCodeLength: getOptionalEnvInt('REFERRAL_CODE_MIN', 6),
  maxCodeLength: getOptionalEnvInt('REFERRAL_CODE_MAX', 16),
  maxReferralsPerUser: getOptionalEnvInt('REFERRAL_MAX_PER_USER', 100),
  maxRewardsPerUser: getOptionalEnvInt('REFERRAL_MAX_REWARDS', 50),
  referrerRewardAmount: getOptionalEnvInt('REFERRAL_REFERRER_REWARD', 100),
  refereeRewardAmount: getOptionalEnvInt('REFERRAL_REFEREE_REWARD', 50),
  referrerRewardPercent: getOptionalEnvInt('REFERRAL_REFERRER_PCT', 10),
  refereeRewardPercent: getOptionalEnvInt('REFERRAL_REFEREE_PCT', 5),
  minOrderAmount: getOptionalEnvInt('REFERRAL_MIN_ORDER_AMOUNT', 500),
  qualifyingDays: getOptionalEnvInt('REFERRAL_QUALIFY_DAYS', 30),
  rewardExpiryDays: getOptionalEnvInt('REFERRAL_REWARD_EXPIRY_DAYS', 90),
  fraudCheckEnabled: getOptionalEnvBool('REFERRAL_FRAUD_CHECK', true),
  requireFirstPurchase: getOptionalEnvBool('REFERRAL_REQUIRE_FIRST_PURCHASE', true),
});
