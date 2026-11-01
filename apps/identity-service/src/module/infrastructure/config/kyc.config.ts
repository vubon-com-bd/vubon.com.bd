/**
 * KYC Configuration
 * @module identity-service/infrastructure/config
 */
import { getOptionalEnvBool, getOptionalEnvInt } from '@vubon/shared-config/common';

export const AUTH_KYC_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('KYC_ENABLED', true),
  requiredForVendor: getOptionalEnvBool('KYC_REQUIRED_FOR_VENDOR', true),
  requiredForBusiness: getOptionalEnvBool('KYC_REQUIRED_FOR_BUSINESS', true),
  maxRetries: getOptionalEnvInt('KYC_MAX_RETRIES', 3),
  reviewTimeoutHours: getOptionalEnvInt('KYC_REVIEW_TIMEOUT_HOURS', 72),
  expiresAfterDays: getOptionalEnvInt('KYC_EXPIRES_AFTER_DAYS', 730),
  alertBeforeExpiryDays: getOptionalEnvInt('KYC_ALERT_BEFORE_EXPIRY_DAYS', 30),
  requiredDocsIndividual: ['national_id'] as const,
  requiredDocsBusiness: ['trade_license', 'tin_certificate'] as const,
  maxDocumentSizeMb: getOptionalEnvInt('KYC_MAX_DOC_SIZE_MB', 10),
  allowedFormats: ['jpg', 'jpeg', 'png', 'pdf'] as const,
});

export type AuthKycConfig = typeof AUTH_KYC_CONFIG;
