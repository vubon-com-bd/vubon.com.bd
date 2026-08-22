/**
 * User KYC Constants Index
 * Export all user KYC-related constants and types
 */

// Core KYC Constants
export {
  USER_KYC,
  DOCUMENT_TYPES,
  getKYCLevelLabel,
  getKYCDocumentTypeLabel,
  getKYCStatusMessage,
  isKYCComplete,
  isKYCPending,
  isKYCUnderReview,
  isKYCRejected,
  isKYCExpired,
  canSubmitKYC,
  getRequiredDocumentTypes,
  getKYCLevelFromDocumentCount,
  getKYCLevelRequirements,
  validateKYCFile,
  getDocumentExpiryDays,
  isDocumentExpired,
  getKYCLevelDescription,
  getRequiredDocumentsForLevel,
  isLevelComplete,
} from './user-kyc.constants';

export type {
  UserKYCLevel,
  UserKYCDocumentType,
  UserKYCValidationFileType,
} from './user-kyc.constants';

// KYC Type Constants
export {
  USER_KYC_TYPE,
  USER_KYC_TYPE_LABELS,
  USER_KYC_TYPE_DESCRIPTIONS,
  IDENTITY_KYC_TYPES,
  ADDRESS_KYC_TYPES,
  FINANCIAL_KYC_TYPES,
  BUSINESS_KYC_TYPES,
  isIdentityKYC,
  isAddressKYC,
  isFinancialKYC,
  isBusinessKYC,
  getKYCTypeLabel,
  getKYCTypeDescription,
  getKYCTypeByValue,
  getKYCTypeCategory,
} from './user-kyc-type.constants';

export type { UserKYCType } from './user-kyc-type.constants';

// KYC Status Constants
export {
  USER_KYC_STATUS,
  USER_KYC_STATUS_LABELS,
  USER_KYC_STATUS_COLORS,
  PENDING_KYC_STATUSES,
  COMPLETED_KYC_STATUSES,
  FAILED_KYC_STATUSES,
  ACTIONABLE_KYC_STATUSES,
  VERIFIED_KYC_STATUSES,
  isKYCPending as isKYCPendingStatus,
  isKYCVerified,
  isKYCFailed,
  isKYCComplete as isKYCStatusComplete,
  canSubmitKYC as canSubmitKYCStatus,
  isKYCUnderReview as isKYCUnderReviewStatus,
  getKYCStatusLabel,
  getKYCStatusColor,
} from './user-kyc-status.constants';

export type { UserKYCStatus } from './user-kyc-status.constants';
