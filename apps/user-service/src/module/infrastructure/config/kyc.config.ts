/**
 * KYC Config
 */
import { USER_KYC } from '@vubon/shared-constants/user';

export const KYC_CONFIG = Object.freeze({
  maxDocumentSizeMB: USER_KYC.MAX_DOCUMENT_SIZE_MB,
  maxDocuments: USER_KYC.MAX_DOCUMENTS,
  reviewSlaHours: USER_KYC.REVIEW_SLA_HOURS,
  expiryDays: USER_KYC.EXPIRY_DAYS,
} as const);

export type KycConfig = typeof KYC_CONFIG;
