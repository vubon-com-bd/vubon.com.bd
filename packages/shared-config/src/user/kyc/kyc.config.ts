/**
 * User KYC Configuration
 * @module shared-config/user/kyc
 */
import {
  USER_KYC,
  USER_KYC_STATUS,
  USER_KYC_DOCUMENT,
  USER_KYC_LEVEL,
} from '@vubon/shared-constants/user';
import {
  getOptionalEnvBool,
  getOptionalEnvInt,
} from '../../common/env/env.helper.js';

export const KYC_CONFIG = Object.freeze({
  maxDocumentSizeMb: USER_KYC.MAX_DOCUMENT_SIZE_MB,
  maxDocuments: USER_KYC.MAX_DOCUMENTS,
  reviewSlaHours: USER_KYC.REVIEW_SLA_HOURS,
  expiryDays: USER_KYC.EXPIRY_DAYS,

  allowedStatuses: Object.freeze(Object.values(USER_KYC_STATUS)),
  allowedDocumentTypes: Object.freeze(Object.values(USER_KYC_DOCUMENT)),
  allowedLevels: Object.freeze(Object.values(USER_KYC_LEVEL)),

  requiredForTypes: Object.freeze(['business', 'vendor'] as const),
  autoApproveLowRisk: getOptionalEnvBool('KYC_AUTO_APPROVE_LOW_RISK', false),
  requireSelfie: getOptionalEnvBool('KYC_REQUIRE_SELFIE', true),
  requireBackSide: getOptionalEnvBool('KYC_REQUIRE_BACK_SIDE', true),
  maxReviewAttempts: getOptionalEnvInt('KYC_MAX_REVIEW_ATTEMPTS', 3),
  reminderBeforeExpiryDays: getOptionalEnvInt('KYC_REMINDER_DAYS', 30),
  blockTransactionsOnExpiry: getOptionalEnvBool('KYC_BLOCK_ON_EXPIRY', true),
});
