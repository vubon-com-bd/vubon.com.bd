import { getOptionalEnvInt } from '@vubon/shared-config/common';

export const DOCUMENT_CONFIG = Object.freeze({
  maxFileSizeMB: getOptionalEnvInt('DOCUMENT_MAX_SIZE_MB', 10),
  allowedMimeTypes: Object.freeze([
    'image/jpeg',
    'image/png',
    'application/pdf',
  ] as const),
  expiryWarningDays: getOptionalEnvInt('DOCUMENT_EXPIRY_WARNING_DAYS', 30),
  maxDocumentsPerVendor: getOptionalEnvInt('DOCUMENT_MAX_PER_VENDOR', 10),
} as const);
