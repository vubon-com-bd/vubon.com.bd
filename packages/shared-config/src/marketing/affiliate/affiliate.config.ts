/**
 * Affiliate program configuration
 * @module shared-config/marketing/affiliate
 */
import { getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper';

export const AFFILIATE_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('AFFILIATE_ENABLED', true),
  requireApproval: getOptionalEnvBool('AFFILIATE_REQUIRE_APPROVAL', true),
  autoApproveVerified: getOptionalEnvBool('AFFILIATE_AUTO_APPROVE_VERIFIED', false),
  minCommissionPercent: getOptionalEnvInt('AFFILIATE_MIN_COMMISSION_PCT', 1),
  maxCommissionPercent: getOptionalEnvInt('AFFILIATE_MAX_COMMISSION_PCT', 50),
  defaultCommissionPercent: getOptionalEnvInt('AFFILIATE_DEFAULT_COMMISSION_PCT', 10),
  cookieDurationDays: getOptionalEnvInt('AFFILIATE_COOKIE_DAYS', 30),
  maxCookieDurationDays: getOptionalEnvInt('AFFILIATE_MAX_COOKIE_DAYS', 90),
  minPayoutAmount: getOptionalEnvInt('AFFILIATE_MIN_PAYOUT_AMOUNT', 1000),
  payoutHoldDays: getOptionalEnvInt('AFFILIATE_PAYOUT_HOLD_DAYS', 30),
  referralCodeLength: getOptionalEnvInt('AFFILIATE_CODE_LENGTH', 10),
  trackSubAffiliates: getOptionalEnvBool('AFFILIATE_SUB_ENABLED', false),
});
