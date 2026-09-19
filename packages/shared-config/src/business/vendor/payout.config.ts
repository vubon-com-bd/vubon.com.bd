/**
 * Vendor payout configuration
 * @module shared-config/business/vendor
 */
import { getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper';

export const VENDOR_PAYOUT_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('VENDOR_PAYOUT_ENABLED', true),
  minAmount: getOptionalEnvInt('VENDOR_PAYOUT_MIN_AMOUNT', 100),
  maxAmount: getOptionalEnvInt('VENDOR_PAYOUT_MAX_AMOUNT', 10000000),
  holdDays: getOptionalEnvInt('VENDOR_PAYOUT_HOLD_DAYS', 7),
  processingDays: getOptionalEnvInt('VENDOR_PAYOUT_PROCESSING_DAYS', 3),
  defaultCycle: getOptionalEnvInt('VENDOR_PAYOUT_CYCLE_DAYS', 7),
  autoPayout: getOptionalEnvBool('VENDOR_PAYOUT_AUTO', false),
  requireApproval: getOptionalEnvBool('VENDOR_PAYOUT_APPROVAL', true),
});
