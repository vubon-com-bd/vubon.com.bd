/**
 * Insurance configuration
 * @module shared-config/logistics/insurance
 */
import { getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper.js';

export const INSURANCE_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('INSURANCE_ENABLED', true),
  minValue: getOptionalEnvInt('INSURANCE_MIN_VALUE', 100),
  maxValue: getOptionalEnvInt('INSURANCE_MAX_VALUE', 10000000),
  basicPremiumPercent: 0.5,
  standardPremiumPercent: 1.0,
  premiumPremiumPercent: 2.0,
  fullCoveragePremiumPercent: 3.0,
  claimWindowDays: getOptionalEnvInt('INSURANCE_CLAIM_WINDOW_DAYS', 30),
  claimProcessingDays: getOptionalEnvInt('INSURANCE_CLAIM_PROCESSING_DAYS', 15),
  requireProof: getOptionalEnvBool('INSURANCE_REQUIRE_PROOF', true),
  requirePhotos: getOptionalEnvBool('INSURANCE_REQUIRE_PHOTOS', true),
  autoApproveUnder: getOptionalEnvInt('INSURANCE_AUTO_APPROVE_UNDER', 1000),
});
