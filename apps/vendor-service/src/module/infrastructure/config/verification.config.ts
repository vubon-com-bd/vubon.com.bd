import { getOptionalEnvInt } from '@vubon/shared-config/common';

export const VERIFICATION_CONFIG = Object.freeze({
  maxDocuments: getOptionalEnvInt('VERIFICATION_MAX_DOCUMENTS', 10),
  documentExpiryDays: getOptionalEnvInt('VERIFICATION_DOC_EXPIRY_DAYS', 365),
  autoExpireHours: getOptionalEnvInt('VERIFICATION_AUTO_EXPIRE_HOURS', 72),
  maxRetries: getOptionalEnvInt('VERIFICATION_MAX_RETRIES', 3),
} as const);
