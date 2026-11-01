/**
 * Verification configuration
 * @module vendor-service/infrastructure/config
 */
import { getOptionalEnvInt, getOptionalEnvBool } from '@vubon/shared-config/common';

export const VERIFICATION_CONFIG = Object.freeze({
  requireEmail: getOptionalEnvBool('VERIFICATION_REQUIRE_EMAIL', true),
  requirePhone: getOptionalEnvBool('VERIFICATION_REQUIRE_PHONE', true),
  requireBusinessLicense: getOptionalEnvBool('VERIFICATION_REQUIRE_LICENSE', true),
  requireTaxId: getOptionalEnvBool('VERIFICATION_REQUIRE_TAX_ID', true),
  requireBankAccount: getOptionalEnvBool('VERIFICATION_REQUIRE_BANK', true),
  requireIdentity: getOptionalEnvBool('VERIFICATION_REQUIRE_IDENTITY', true),
  autoApproveVerified: getOptionalEnvBool('VERIFICATION_AUTO_APPROVE', false),
  reviewSlaHours: getOptionalEnvInt('VERIFICATION_REVIEW_SLA_HOURS', 72),
  expiryDays: getOptionalEnvInt('VERIFICATION_EXPIRY_DAYS', 365),
} as const);
