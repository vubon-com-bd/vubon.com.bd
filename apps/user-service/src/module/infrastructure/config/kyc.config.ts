import { getOptionalEnvInt } from '@vubon/shared-config/common';

export const KYC_CONFIG = Object.freeze({
  documentExpiryDays: getOptionalEnvInt('KYC_DOCUMENT_EXPIRY_DAYS', 365),
  reviewTtlHours: getOptionalEnvInt('KYC_REVIEW_TTL_HOURS', 72),
  maxRetryAttempts: getOptionalEnvInt('KYC_MAX_RETRY', 3),
  allowedDocuments: Object.freeze([
    'national_id',
    'passport',
    'driving_license',
    'birth_certificate',
  ] as const),
  minAge: 18,
} as const);
