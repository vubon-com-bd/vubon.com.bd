/**
 * Document configuration
 * @module vendor-service/infrastructure/config
 */
import { getOptionalEnvInt, getOptionalEnvBool } from '@vubon/shared-config/common';

export const DOCUMENT_CONFIG = Object.freeze({
  maxSizeMb: getOptionalEnvInt('DOCUMENT_MAX_SIZE_MB', 10),
  maxDocuments: getOptionalEnvInt('DOCUMENT_MAX_COUNT', 20),
  expiryReminderDays: getOptionalEnvInt('DOCUMENT_EXPIRY_REMINDER_DAYS', 30),
  autoVerifyOcr: getOptionalEnvBool('DOCUMENT_AUTO_VERIFY_OCR', false),
} as const);
