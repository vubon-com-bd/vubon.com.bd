/**
 * User KYC Types
 * Type definitions for user KYC (Know Your Customer) based on shared-constants
 * @module UserKYCTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants user kyc
// ============================================================
import {
  // Core KYC Constants
  USER_KYC,
  DOCUMENT_TYPES,
  UserKYCLevel,
  UserKYCDocumentType,
  UserKYCValidationFileType,
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
  // KYC Type Constants
  USER_KYC_TYPE,
  USER_KYC_TYPE_LABELS,
  USER_KYC_TYPE_DESCRIPTIONS,
  IDENTITY_KYC_TYPES,
  ADDRESS_KYC_TYPES,
  FINANCIAL_KYC_TYPES,
  BUSINESS_KYC_TYPES,
  UserKYCType,
  isIdentityKYC,
  isAddressKYC,
  isFinancialKYC,
  isBusinessKYC,
  getKYCTypeLabel,
  getKYCTypeDescription,
  getKYCTypeByValue,
  getKYCTypeCategory,
  // KYC Status Constants
  USER_KYC_STATUS,
  USER_KYC_STATUS_LABELS,
  USER_KYC_STATUS_COLORS,
  PENDING_KYC_STATUSES,
  COMPLETED_KYC_STATUSES,
  FAILED_KYC_STATUSES,
  ACTIONABLE_KYC_STATUSES,
  VERIFIED_KYC_STATUSES,
  UserKYCStatus,
  isKYCPendingStatus,
  isKYCVerified,
  isKYCFailed,
  isKYCStatusComplete,
  canSubmitKYCStatus,
  isKYCUnderReviewStatus,
  getKYCStatusLabel,
  getKYCStatusColor,
} from '@vubon/shared-constants';

// ============================================================
// User KYC Extended Types
// ============================================================

/**
 * User KYC with additional metadata
 */
export interface UserKYCExtended extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  type: UserKYCType;
  level: UserKYCLevel;
  status: UserKYCStatus;
  documents: UserKYCDocument[];
  submittedAt: Date;
  verifiedAt?: Date;
  rejectedAt?: Date;
  rejectionReason?: string;
  expiryDate?: Date;
  isComplete: boolean;
  isPending: boolean;
  isUnderReview: boolean;
  isRejected: boolean;
  isExpired: boolean;
  isVerified: boolean;
  isFailed: boolean;
  canSubmit: boolean;
  isIdentity: boolean;
  isAddress: boolean;
  isFinancial: boolean;
  isBusiness: boolean;
  metadata?: Metadata;
}

/**
 * User KYC document
 */
export interface UserKYCDocument extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  kycId: ID;
  type: UserKYCDocumentType;
  documentType: string;
  documentUrl: string;
  documentName: string;
  documentNumber?: string;
  issuedBy?: string;
  issueDate?: Date;
  expiryDate?: Date;
  status: UserKYCStatus;
  verifiedAt?: Date;
  rejectionReason?: string;
  isExpired: boolean;
  metadata?: Metadata;
}

/**
 * User KYC filter
 */
export interface UserKYCFilter {
  userIds?: ID[];
  types?: UserKYCType[];
  levels?: UserKYCLevel[];
  statuses?: UserKYCStatus[];
  documentTypes?: UserKYCDocumentType[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isComplete?: boolean;
  isPending?: boolean;
  isUnderReview?: boolean;
  isRejected?: boolean;
  isExpired?: boolean;
  isVerified?: boolean;
  isFailed?: boolean;
  canSubmit?: boolean;
  isIdentity?: boolean;
  isAddress?: boolean;
  isFinancial?: boolean;
  isBusiness?: boolean;
  searchTerm?: string;
}

/**
 * User KYC statistics
 */
export interface UserKYCStatistics {
  userId: ID;
  totalKYC: number;
  completedKYC: number;
  pendingKYC: number;
  underReviewKYC: number;
  rejectedKYC: number;
  expiredKYC: number;
  verifiedKYC: number;
  failedKYC: number;
  byType: Record<UserKYCType, number>;
  byLevel: Record<UserKYCLevel, number>;
  byStatus: Record<UserKYCStatus, number>;
  byDocumentType: Record<UserKYCDocumentType, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averageCompletionTime: number;
  successRate: number;
  rejectionRate: number;
  mostFrequentType: UserKYCType;
  mostFrequentLevel: UserKYCLevel;
  mostFrequentDocumentType: UserKYCDocumentType;
}

/**
 * User KYC summary
 */
export interface UserKYCSummary {
  period: {
    start: Date;
    end: Date;
  };
  total: number;
  completed: number;
  pending: number;
  underReview: number;
  rejected: number;
  expired: number;
  verified: number;
  failed: number;
  byType: Record<UserKYCType, number>;
  byLevel: Record<UserKYCLevel, number>;
  byStatus: Record<UserKYCStatus, number>;
  byDocumentType: Record<UserKYCDocumentType, number>;
  kycTrend: {
    date: Date;
    total: number;
    completed: number;
    rejected: number;
  }[];
  topTypes: {
    type: UserKYCType;
    count: number;
    label: string;
  }[];
  topLevels: {
    level: UserKYCLevel;
    count: number;
    label: string;
  }[];
}

/**
 * User KYC configuration
 */
export interface UserKYCConfiguration {
  enabled: boolean;
  defaultLevel: UserKYCLevel;
  requiredTypes: UserKYCType[];
  requiredDocumentTypes: UserKYCDocumentType[];
  maxFileSizeMB: number;
  allowedFileTypes: UserKYCValidationFileType[];
  expiryDays: number;
  autoVerify: boolean;
  requireManualReview: boolean;
  notificationOnSubmit: boolean;
  notificationOnVerify: boolean;
  notificationOnReject: boolean;
  notificationOnExpire: boolean;
  alertConfig?: UserKYCAlertConfig;
}

/**
 * User KYC alert configuration
 */
export interface UserKYCAlertConfig {
  enabled: boolean;
  pendingReviewAlert: boolean;
  rejectionAlert: boolean;
  expiryAlert: boolean;
  suspiciousActivityAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'push' | 'in_app')[];
  cooldownMinutes: number;
  rejectionThreshold: number;
}

/**
 * User KYC history
 */
export interface UserKYCHistory extends BaseEntity, Timestamp {
  id: ID;
  kycId: ID;
  userId: ID;
  action: 'submit' | 'review' | 'verify' | 'reject' | 'expire' | 'update' | 'delete';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  ipAddress?: string;
  userAgent?: string;
  metadata?: Metadata;
}

/**
 * User KYC validation
 */
export interface UserKYCValidation {
  isValid: boolean;
  kycId: ID;
  userId: ID;
  documentId: ID;
  documentType: UserKYCDocumentType;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
  metadata?: Metadata;
}

/**
 * User KYC file upload
 */
export interface UserKYCFileUpload extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  kycId: ID;
  documentType: UserKYCDocumentType;
  fileName: string;
  fileSize: number;
  fileType: string;
  fileUrl: string;
  uploadStatus: 'uploading' | 'uploaded' | 'processing' | 'completed' | 'failed';
  uploadCompletedAt?: Date;
  processingCompletedAt?: Date;
  metadata?: Metadata;
}

/**
 * User KYC export
 */
export interface UserKYCExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf';
  filter: UserKYCFilter;
  filename: string;
  fileSize?: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  completedAt?: Date;
  downloadUrl?: string;
  metadata?: Metadata;
}

// ============================================================
// Re-export Everything
// ============================================================

export {
  // Core KYC Constants
  USER_KYC,
  DOCUMENT_TYPES,
  UserKYCLevel,
  UserKYCDocumentType,
  UserKYCValidationFileType,
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
  // KYC Type Constants
  USER_KYC_TYPE,
  USER_KYC_TYPE_LABELS,
  USER_KYC_TYPE_DESCRIPTIONS,
  IDENTITY_KYC_TYPES,
  ADDRESS_KYC_TYPES,
  FINANCIAL_KYC_TYPES,
  BUSINESS_KYC_TYPES,
  UserKYCType,
  isIdentityKYC,
  isAddressKYC,
  isFinancialKYC,
  isBusinessKYC,
  getKYCTypeLabel,
  getKYCTypeDescription,
  getKYCTypeByValue,
  getKYCTypeCategory,
  // KYC Status Constants
  USER_KYC_STATUS,
  USER_KYC_STATUS_LABELS,
  USER_KYC_STATUS_COLORS,
  PENDING_KYC_STATUSES,
  COMPLETED_KYC_STATUSES,
  FAILED_KYC_STATUSES,
  ACTIONABLE_KYC_STATUSES,
  VERIFIED_KYC_STATUSES,
  UserKYCStatus,
  isKYCPendingStatus,
  isKYCVerified,
  isKYCFailed,
  isKYCStatusComplete,
  canSubmitKYCStatus,
  isKYCUnderReviewStatus,
  getKYCStatusLabel,
  getKYCStatusColor,
};
