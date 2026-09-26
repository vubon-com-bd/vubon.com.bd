/**
 * Affiliate payout configuration
 * @module shared-config/marketing/affiliate
 */
import { getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper';

export const AFFILIATE_PAYOUT_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('AFFILIATE_PAYOUT_ENABLED', true),
  minAmount: getOptionalEnvInt('AFFILIATE_PAYOUT_MIN', 1000),
  maxAmount: getOptionalEnvInt('AFFILIATE_PAYOUT_MAX', 10000000),
  holdDays: getOptionalEnvInt('AFFILIATE_PAYOUT_HOLD_DAYS', 30),
  processingDays: getOptionalEnvInt('AFFILIATE_PAYOUT_PROCESSING_DAYS', 5),
  autoApprove: getOptionalEnvBool('AFFILIATE_PAYOUT_AUTO_APPROVE', false),
  requireApproval: getOptionalEnvBool('AFFILIATE_PAYOUT_REQUIRE_APPROVAL', true),
  cycle: getOptionalEnvInt('AFFILIATE_PAYOUT_CYCLE_DAYS', 30),
});
