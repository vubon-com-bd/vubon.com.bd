/**
 * User KYC Types
 * Types for user KYC (Know Your Customer) management
 */

import type { ID, Timestamp, JsonObject } from '../common/core-primitives.types';
import {
  USER_KYC_STATUS,
  USER_KYC_LEVEL,
  USER_KYC_DOCUMENT_TYPE,
  USER_KYC_DOCUMENT_STATUS,
  USER_KYC_RISK_LEVEL,
  USER_KYC_REJECTION_REASON,
  USER_KYC_STATUS_LABELS,
  USER_KYC_LEVEL_LABELS,
  USER_KYC_DOCUMENT_TYPE_LABELS,
  USER_KYC_DOCUMENT_STATUS_LABELS,
  USER_KYC_RISK_LEVEL_LABELS,
  USER_KYC_REJECTION_REASON_LABELS,
  USER_KYC_LEVEL_DOCUMENTS,
  USER_KYC_VERIFICATION_METHOD,
  USER_KYC_VERIFICATION_METHOD_LABELS,
} from '@vubon/shared-constants';

// ============================================================
// USER KYC TYPES
// ============================================================

/**
 * User KYC status
 */
export type UserKycStatus = (typeof USER_KYC_STATUS)[keyof typeof USER_KYC_STATUS];

/**
 * User KYC level
 */
export type UserKycLevel = (typeof USER_KYC_LEVEL)[keyof typeof USER_KYC_LEVEL];

/**
 * User KYC document type
 */
export type UserKycDocumentType =
  (typeof USER_KYC_DOCUMENT_TYPE)[keyof typeof USER_KYC_DOCUMENT_TYPE];

/**
 * User KYC document status
 */
export type UserKycDocumentStatus =
  (typeof USER_KYC_DOCUMENT_STATUS)[keyof typeof USER_KYC_DOCUMENT_STATUS];

/**
 * User KYC risk level
 */
export type UserKycRiskLevel = (typeof USER_KYC_RISK_LEVEL)[keyof typeof USER_KYC_RISK_LEVEL];

/**
 * User KYC rejection reason
 */
export type UserKycRejectionReason =
  (typeof USER_KYC_REJECTION_REASON)[keyof typeof USER_KYC_REJECTION_REASON];

/**
 * User KYC verification method
 */
export type UserKycVerificationMethod =
  (typeof USER_KYC_VERIFICATION_METHOD)[keyof typeof USER_KYC_VERIFICATION_METHOD];

// ============================================================
// USER KYC DOCUMENT
// ============================================================

/**
 * User KYC document
 */
export interface UserKycDocument {
  /** Unique identifier */
  id: ID;
  /** User ID */
  userId: ID;
  /** Document type */
  documentType: UserKycDocumentType;
  /** Document status */
  status: UserKycDocumentStatus;
  /** Document file URL */
  fileUrl: string;
  /** File name */
  fileName: string;
  /** File size in bytes */
  fileSize: number;
  /** MIME type */
  mimeType: string;
  /** Verification notes */
  notes?: string;
  /** Reviewed by (admin ID) */
  reviewedBy?: ID;
  /** Rejection reason (if rejected) */
  rejectionReason?: UserKycRejectionReason;
  /** When the document was uploaded */
  uploadedAt: Timestamp;
  /** When the document was reviewed */
  reviewedAt?: Timestamp;
  /** When the document expires */
  expiresAt?: Timestamp;
  /** Additional metadata */
  metadata?: JsonObject;
}

// ============================================================
// USER KYC RECORD
// ============================================================

/**
 * User KYC record
 */
export interface UserKycRecord {
  /** Unique identifier */
  id: ID;
  /** User ID */
  userId: ID;
  /** KYC status */
  status: UserKycStatus;
  /** KYC level */
  level: UserKycLevel;
  /** Risk level */
  riskLevel: UserKycRiskLevel;
  /** Verification method used */
  verificationMethod: UserKycVerificationMethod;
  /** Documents submitted */
  documents: UserKycDocument[];
  /** Submitted by (user ID) */
  submittedBy: ID;
  /** Reviewed by (admin ID) */
  reviewedBy?: ID;
  /** Rejection reason (if rejected) */
  rejectionReason?: UserKycRejectionReason;
  /** Additional notes */
  notes?: string;
  /** When the KYC was submitted */
  submittedAt: Timestamp;
  /** When the KYC was reviewed */
  reviewedAt?: Timestamp;
  /** When the KYC expires */
  expiresAt?: Timestamp;
  /** When the KYC was last updated */
  updatedAt: Timestamp;
  /** Additional metadata */
  metadata?: JsonObject;
}

// ============================================================
// USER KYC REQUEST
// ============================================================

/**
 * User KYC submission request
 */
export interface UserKycSubmissionRequest {
  /** User ID */
  userId: ID;
  /** Documents to submit */
  documents: {
    type: UserKycDocumentType;
    file: File | string;
    metadata?: JsonObject;
  }[];
  /** Additional notes */
  notes?: string;
}

/**
 * User KYC review request
 */
export interface UserKycReviewRequest {
  /** KYC ID */
  kycId: ID;
  /** Review status */
  status: 'approved' | 'rejected' | 'requires_info';
  /** Rejection reason (if rejected) */
  rejectionReason?: UserKycRejectionReason;
  /** Review notes */
  notes?: string;
  /** Reviewer ID (admin) */
  reviewedBy: ID;
}

/**
 * User KYC update request
 */
export interface UserKycUpdateRequest {
  /** KYC ID */
  kycId: ID;
  /** Additional documents */
  documents?: {
    type: UserKycDocumentType;
    file: File | string;
    metadata?: JsonObject;
  }[];
  /** Updated notes */
  notes?: string;
}

// ============================================================
// USER KYC RESPONSE
// ============================================================

/**
 * User KYC response
 */
export interface UserKycResponse {
  /** Whether the operation was successful */
  success: boolean;
  /** KYC record if successful */
  kyc?: UserKycRecord;
  /** Error message if failed */
  error?: string;
  /** Required documents for next level */
  requiredDocuments?: UserKycDocumentType[];
  /** Next KYC level available */
  nextLevel?: UserKycLevel;
}

// ============================================================
// USER KYC FILTER
// ============================================================

/**
 * User KYC filter
 */
export interface UserKycFilter {
  /** Filter by user ID */
  userId?: ID;
  /** Filter by KYC status */
  status?: UserKycStatus | UserKycStatus[];
  /** Filter by KYC level */
  level?: UserKycLevel | UserKycLevel[];
  /** Filter by risk level */
  riskLevel?: UserKycRiskLevel | UserKycRiskLevel[];
  /** Filter by document type */
  documentType?: UserKycDocumentType | UserKycDocumentType[];
  /** Filter by verification method */
  verificationMethod?: UserKycVerificationMethod | UserKycVerificationMethod[];
  /** Filter by active KYC only */
  activeOnly?: boolean;
  /** Filter by approved KYC only */
  approvedOnly?: boolean;
  /** Filter by date range */
  dateRange?: {
    start?: Date;
    end?: Date;
  };
}

// ============================================================
// USER KYC SUMMARY
// ============================================================

/**
 * User KYC summary
 */
export interface UserKycSummary {
  /** User ID */
  userId: ID;
  /** Current KYC status */
  status: UserKycStatus;
  /** Current KYC level */
  level: UserKycLevel;
  /** Total documents submitted */
  totalDocuments: number;
  /** Verified documents */
  verifiedDocuments: number;
  /** Pending documents */
  pendingDocuments: number;
  /** Rejected documents */
  rejectedDocuments: number;
  /** Risk level */
  riskLevel: UserKycRiskLevel;
  /** When KYC was submitted */
  submittedAt?: Timestamp;
  /** When KYC was last updated */
  updatedAt?: Timestamp;
  /** Next KYC level available */
  nextLevel?: UserKycLevel;
  /** Required documents for next level */
  requiredDocuments: UserKycDocumentType[];
}

// ============================================================
// HELPER FUNCTIONS
// ============================================================

/**
 * Check if user KYC status is valid
 */
export function isValidUserKycStatus(status: string): status is UserKycStatus {
  return Object.values(USER_KYC_STATUS).includes(status as UserKycStatus);
}

/**
 * Check if user KYC level is valid
 */
export function isValidUserKycLevel(level: string): level is UserKycLevel {
  return Object.values(USER_KYC_LEVEL).includes(level as UserKycLevel);
}

/**
 * Check if user KYC document type is valid
 */
export function isValidUserKycDocumentType(type: string): type is UserKycDocumentType {
  return Object.values(USER_KYC_DOCUMENT_TYPE).includes(type as UserKycDocumentType);
}

/**
 * Check if user KYC document status is valid
 */
export function isValidUserKycDocumentStatus(status: string): status is UserKycDocumentStatus {
  return Object.values(USER_KYC_DOCUMENT_STATUS).includes(status as UserKycDocumentStatus);
}

/**
 * Check if user KYC risk level is valid
 */
export function isValidUserKycRiskLevel(level: string): level is UserKycRiskLevel {
  return Object.values(USER_KYC_RISK_LEVEL).includes(level as UserKycRiskLevel);
}

/**
 * Check if user KYC rejection reason is valid
 */
export function isValidUserKycRejectionReason(reason: string): reason is UserKycRejectionReason {
  return Object.values(USER_KYC_REJECTION_REASON).includes(reason as UserKycRejectionReason);
}

/**
 * Check if user KYC verification method is valid
 */
export function isValidUserKycVerificationMethod(
  method: string
): method is UserKycVerificationMethod {
  return Object.values(USER_KYC_VERIFICATION_METHOD).includes(method as UserKycVerificationMethod);
}

/**
 * Get user KYC status display name
 */
export function getUserKycStatusDisplayName(status: UserKycStatus): string {
  return USER_KYC_STATUS_LABELS[status] || status;
}

/**
 * Get user KYC level display name
 */
export function getUserKycLevelDisplayName(level: UserKycLevel): string {
  return USER_KYC_LEVEL_LABELS[level] || level;
}

/**
 * Get user KYC document type display name
 */
export function getUserKycDocumentTypeDisplayName(type: UserKycDocumentType): string {
  return USER_KYC_DOCUMENT_TYPE_LABELS[type] || type;
}

/**
 * Get user KYC document status display name
 */
export function getUserKycDocumentStatusDisplayName(status: UserKycDocumentStatus): string {
  return USER_KYC_DOCUMENT_STATUS_LABELS[status] || status;
}

/**
 * Get user KYC risk level display name
 */
export function getUserKycRiskLevelDisplayName(level: UserKycRiskLevel): string {
  return USER_KYC_RISK_LEVEL_LABELS[level] || level;
}

/**
 * Get user KYC rejection reason display name
 */
export function getUserKycRejectionReasonDisplayName(reason: UserKycRejectionReason): string {
  return USER_KYC_REJECTION_REASON_LABELS[reason] || reason;
}

/**
 * Get user KYC verification method display name
 */
export function getUserKycVerificationMethodDisplayName(method: UserKycVerificationMethod): string {
  return USER_KYC_VERIFICATION_METHOD_LABELS[method] || method;
}

/**
 * Check if KYC is approved
 */
export function isUserKycApproved(status: UserKycStatus): boolean {
  return status === USER_KYC_STATUS.APPROVED;
}

/**
 * Check if KYC is pending
 */
export function isUserKycPending(status: UserKycStatus): boolean {
  const pendingStatuses: UserKycStatus[] = [
    'pending',
    'in_progress',
    'requires_info',
    'requires_review',
  ];
  return pendingStatuses.includes(status);
}

/**
 * Check if KYC is rejected
 */
export function isUserKycRejected(status: UserKycStatus): boolean {
  const rejectedStatuses: UserKycStatus[] = ['rejected', 'expired', 'flagged'];
  return rejectedStatuses.includes(status);
}

/**
 * Check if KYC is active
 */
export function isUserKycActive(status: UserKycStatus): boolean {
  const activeStatuses: UserKycStatus[] = ['pending', 'in_progress', 'requires_info', 'approved'];
  return activeStatuses.includes(status);
}

/**
 * Get all user KYC statuses
 */
export function getAllUserKycStatuses(): UserKycStatus[] {
  return Object.values(USER_KYC_STATUS);
}

/**
 * Get all user KYC levels
 */
export function getAllUserKycLevels(): UserKycLevel[] {
  return Object.values(USER_KYC_LEVEL);
}

/**
 * Get all user KYC document types
 */
export function getAllUserKycDocumentTypes(): UserKycDocumentType[] {
  return Object.values(USER_KYC_DOCUMENT_TYPE);
}

/**
 * Get all user KYC document statuses
 */
export function getAllUserKycDocumentStatuses(): UserKycDocumentStatus[] {
  return Object.values(USER_KYC_DOCUMENT_STATUS);
}

/**
 * Get all user KYC risk levels
 */
export function getAllUserKycRiskLevels(): UserKycRiskLevel[] {
  return Object.values(USER_KYC_RISK_LEVEL);
}

/**
 * Get all user KYC rejection reasons
 */
export function getAllUserKycRejectionReasons(): UserKycRejectionReason[] {
  return Object.values(USER_KYC_REJECTION_REASON);
}

/**
 * Get all user KYC verification methods
 */
export function getAllUserKycVerificationMethods(): UserKycVerificationMethod[] {
  return Object.values(USER_KYC_VERIFICATION_METHOD);
}

/**
 * Get required documents for KYC level
 */
export function getUserKycLevelDocuments(level: UserKycLevel): UserKycDocumentType[] {
  return (USER_KYC_LEVEL_DOCUMENTS[level] || []) as UserKycDocumentType[];
}

/**
 * Get next KYC level
 */
export function getUserKycNextLevel(currentLevel: UserKycLevel): UserKycLevel | null {
  const levels = getAllUserKycLevels();
  const currentIndex = levels.indexOf(currentLevel);
  if (currentIndex === -1 || currentIndex >= levels.length - 1) {
    return null;
  }
  return levels[currentIndex + 1];
}

/**
 * Get KYC level from status
 */
export function getUserKycLevelFromStatus(status: UserKycStatus): UserKycLevel {
  const levelMap: Record<UserKycStatus, UserKycLevel> = {
    not_submitted: 'level_0',
    pending: 'level_1',
    in_progress: 'level_1',
    approved: 'level_2',
    rejected: 'level_0',
    requires_info: 'level_1',
    expired: 'level_0',
    on_hold: 'level_1',
    requires_review: 'level_1',
    flagged: 'level_0',
    suspended: 'level_0',
  };
  return levelMap[status] || 'level_0';
}

/**
 * Check if KYC document is verified
 */
export function isUserKycDocumentVerified(status: UserKycDocumentStatus): boolean {
  return status === USER_KYC_DOCUMENT_STATUS.VERIFIED;
}

/**
 * Check if KYC document is rejected
 */
export function isUserKycDocumentRejected(status: UserKycDocumentStatus): boolean {
  return status === USER_KYC_DOCUMENT_STATUS.REJECTED;
}

/**
 * Check if KYC document is pending
 */
export function isUserKycDocumentPending(status: UserKycDocumentStatus): boolean {
  const pendingStatuses: UserKycDocumentStatus[] = [
    'uploaded',
    'processing',
    'requires_review',
    'on_hold',
  ];
  return pendingStatuses.includes(status);
}

/**
 * Check if KYC document is expired
 */
export function isUserKycDocumentExpired(status: UserKycDocumentStatus): boolean {
  return status === USER_KYC_DOCUMENT_STATUS.EXPIRED;
}

/**
 * Get document status color
 */
export function getUserKycDocumentStatusColor(status: UserKycDocumentStatus): string {
  const colors: Record<UserKycDocumentStatus, string> = {
    uploaded: '#2196F3',
    processing: '#FF9800',
    verified: '#4CAF50',
    rejected: '#F44336',
    expired: '#9E9E9E',
    requires_review: '#FFC107',
    on_hold: '#FF9800',
    flagged: '#F44336',
  };
  return colors[status] || '#9E9E9E';
}
