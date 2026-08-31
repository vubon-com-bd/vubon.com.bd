/**
 * User Verification Types
 * Types for user verification management
 */

import type { ID, Timestamp, JsonObject } from '../common/core-primitives.types';
import {
  USER_VERIFICATION_TYPE,
  USER_VERIFICATION_METHOD,
  USER_VERIFICATION_LEVEL,
  USER_VERIFICATION_DOCUMENT_TYPE,
  USER_VERIFICATION_TYPE_LABELS,
  USER_VERIFICATION_METHOD_LABELS,
  USER_VERIFICATION_LEVEL_LABELS,
  USER_VERIFICATION_DOCUMENT_TYPE_LABELS,
  USER_VERIFICATION_LEVEL_DOCUMENTS,
  USER_VERIFICATION_CONFIG,
} from '@vubon/shared-constants';

// ============================================================
// USER VERIFICATION STATUS (Local definition)
// ============================================================

/**
 * User verification status
 */
export const USER_VERIFICATION_STATUS = {
  /** Verification is not started */
  NOT_STARTED: 'not_started',
  /** Verification is pending */
  PENDING: 'pending',
  /** Verification is in progress */
  IN_PROGRESS: 'in_progress',
  /** Verification is successful */
  VERIFIED: 'verified',
  /** Verification has failed */
  FAILED: 'failed',
  /** Verification has expired */
  EXPIRED: 'expired',
  /** Verification requires manual review */
  REQUIRES_REVIEW: 'requires_review',
  /** Verification has been skipped */
  SKIPPED: 'skipped',
  /** Verification has been cancelled */
  CANCELLED: 'cancelled',
  /** Verification is on hold */
  ON_HOLD: 'on_hold',
} as const;

/**
 * User verification status labels
 */
export const USER_VERIFICATION_STATUS_LABELS: Record<string, string> = {
  [USER_VERIFICATION_STATUS.NOT_STARTED]: 'Not Started',
  [USER_VERIFICATION_STATUS.PENDING]: 'Pending',
  [USER_VERIFICATION_STATUS.IN_PROGRESS]: 'In Progress',
  [USER_VERIFICATION_STATUS.VERIFIED]: 'Verified',
  [USER_VERIFICATION_STATUS.FAILED]: 'Failed',
  [USER_VERIFICATION_STATUS.EXPIRED]: 'Expired',
  [USER_VERIFICATION_STATUS.REQUIRES_REVIEW]: 'Requires Review',
  [USER_VERIFICATION_STATUS.SKIPPED]: 'Skipped',
  [USER_VERIFICATION_STATUS.CANCELLED]: 'Cancelled',
  [USER_VERIFICATION_STATUS.ON_HOLD]: 'On Hold',
};

// ============================================================
// USER VERIFICATION TYPES
// ============================================================

/**
 * User verification type
 */
export type UserVerificationType =
  (typeof USER_VERIFICATION_TYPE)[keyof typeof USER_VERIFICATION_TYPE];

/**
 * User verification status
 */
export type UserVerificationStatus =
  (typeof USER_VERIFICATION_STATUS)[keyof typeof USER_VERIFICATION_STATUS];

/**
 * User verification method
 */
export type UserVerificationMethod =
  (typeof USER_VERIFICATION_METHOD)[keyof typeof USER_VERIFICATION_METHOD];

/**
 * User verification level
 */
export type UserVerificationLevel =
  (typeof USER_VERIFICATION_LEVEL)[keyof typeof USER_VERIFICATION_LEVEL];

/**
 * User verification document type
 */
export type UserVerificationDocumentType =
  (typeof USER_VERIFICATION_DOCUMENT_TYPE)[keyof typeof USER_VERIFICATION_DOCUMENT_TYPE];

// ============================================================
// USER VERIFICATION RECORD
// ============================================================

/**
 * User verification record
 */
export interface UserVerificationRecord {
  /** Unique identifier */
  id: ID;
  /** User ID */
  userId: ID;
  /** Verification type */
  type: UserVerificationType;
  /** Verification status */
  status: UserVerificationStatus;
  /** Verification method */
  method: UserVerificationMethod;
  /** Verification level */
  level: UserVerificationLevel;
  /** Target (email, phone, etc.) */
  target: string;
  /** Verification code (hashed) */
  codeHash?: string;
  /** Number of attempts */
  attempts: number;
  /** Maximum attempts allowed */
  maxAttempts: number;
  /** When the verification was initiated */
  initiatedAt: Timestamp;
  /** When the verification was completed */
  completedAt?: Timestamp;
  /** When the verification expires */
  expiresAt: Timestamp;
  /** When the verification was last attempted */
  lastAttemptAt?: Timestamp;
  /** Additional data */
  data?: JsonObject;
  /** Whether the verification is active */
  isActive: boolean;
}

// ============================================================
// USER VERIFICATION DOCUMENT
// ============================================================

/**
 * User verification document
 */
export interface UserVerificationDocument {
  /** Unique identifier */
  id: ID;
  /** User ID */
  userId: ID;
  /** Document type */
  documentType: UserVerificationDocumentType;
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
// USER VERIFICATION REQUEST
// ============================================================

/**
 * User verification request
 */
export interface UserVerificationRequest {
  /** User ID */
  userId: ID;
  /** Verification type */
  type: UserVerificationType;
  /** Verification method */
  method: UserVerificationMethod;
  /** Target (email, phone, etc.) */
  target: string;
  /** Additional data */
  data?: JsonObject;
  /** Whether to resend if already sent */
  resend?: boolean;
}

/**
 * User verify code request
 */
export interface UserVerifyCodeRequest {
  /** User ID */
  userId: ID;
  /** Verification type */
  type: UserVerificationType;
  /** Verification code */
  code: string;
  /** Verification session ID */
  sessionId?: ID;
}

/**
 * User verify document request
 */
export interface UserVerifyDocumentRequest {
  /** User ID */
  userId: ID;
  /** Document type */
  documentType: UserVerificationDocumentType;
  /** Document file or URL */
  document: File | string;
  /** Additional metadata */
  metadata?: JsonObject;
}

// ============================================================
// USER VERIFICATION RESPONSE
// ============================================================

/**
 * User verification response
 */
export interface UserVerificationResponse {
  /** Whether the operation was successful */
  success: boolean;
  /** Verification status */
  status: UserVerificationStatus;
  /** Verification record */
  record?: UserVerificationRecord;
  /** Verification session ID */
  sessionId?: ID;
  /** Whether verification requires action */
  requiresAction?: boolean;
  /** Required action (if any) */
  requiredAction?: string;
  /** Error message if failed */
  error?: string;
  /** Remaining attempts */
  remainingAttempts?: number;
  /** Resend cooldown in seconds */
  resendCooldown?: number;
}

// ============================================================
// USER VERIFICATION FILTER
// ============================================================

/**
 * User verification filter
 */
export interface UserVerificationFilter {
  /** Filter by user ID */
  userId?: ID;
  /** Filter by verification type */
  type?: UserVerificationType | UserVerificationType[];
  /** Filter by verification method */
  method?: UserVerificationMethod | UserVerificationMethod[];
  /** Filter by verification status */
  status?: UserVerificationStatus | UserVerificationStatus[];
  /** Filter by verification level */
  level?: UserVerificationLevel | UserVerificationLevel[];
  /** Filter by target (email, phone, etc.) */
  target?: string;
  /** Filter by active verifications only */
  activeOnly?: boolean;
  /** Filter by date range (initiated) */
  initiatedDateRange?: {
    start?: Date;
    end?: Date;
  };
}

// ============================================================
// USER VERIFICATION SUMMARY
// ============================================================

/**
 * User verification summary
 */
export interface UserVerificationSummary {
  /** User ID */
  userId: ID;
  /** Total verifications */
  totalVerifications: number;
  /** Verified items */
  verifiedItems: {
    email?: boolean;
    phone?: boolean;
    identity?: boolean;
    address?: boolean;
    age?: boolean;
    business?: boolean;
    taxId?: boolean;
    bankAccount?: boolean;
    social?: boolean;
    device?: boolean;
    twoFa?: boolean;
    biometric?: boolean;
  };
  /** Current verification level */
  currentLevel: UserVerificationLevel;
  /** Pending verifications */
  pendingVerifications: UserVerificationRecord[];
  /** Completed verifications */
  completedVerifications: UserVerificationRecord[];
  /** Document verifications */
  documentVerifications: UserVerificationDocument[];
}

// ============================================================
// USER VERIFICATION CONFIG
// ============================================================

/**
 * User verification configuration
 */
export interface UserVerificationConfig {
  /** OTP code length */
  otpLength: number;
  /** OTP expiry in seconds */
  otpExpiry: number;
  /** Magic link expiry in seconds */
  magicLinkExpiry: number;
  /** Verification token expiry in seconds */
  tokenExpiry: number;
  /** Maximum verification attempts */
  maxAttempts: number;
  /** Resend cooldown in seconds */
  resendCooldown: number;
  /** Verification timeout in seconds */
  timeout: number;
  /** Maximum documents per verification */
  maxDocuments: number;
  /** Maximum file size per document in MB */
  maxFileSize: number;
}

// ============================================================
// HELPER FUNCTIONS
// ============================================================

/**
 * Check if user verification type is valid
 */
export function isValidUserVerificationType(type: string): type is UserVerificationType {
  return Object.values(USER_VERIFICATION_TYPE).includes(type as UserVerificationType);
}

/**
 * Check if user verification status is valid
 */
export function isValidUserVerificationStatus(status: string): status is UserVerificationStatus {
  return Object.values(USER_VERIFICATION_STATUS).includes(status as UserVerificationStatus);
}

/**
 * Check if user verification method is valid
 */
export function isValidUserVerificationMethod(method: string): method is UserVerificationMethod {
  return Object.values(USER_VERIFICATION_METHOD).includes(method as UserVerificationMethod);
}

/**
 * Check if user verification level is valid
 */
export function isValidUserVerificationLevel(level: string): level is UserVerificationLevel {
  return Object.values(USER_VERIFICATION_LEVEL).includes(level as UserVerificationLevel);
}

/**
 * Check if user verification document type is valid
 */
export function isValidUserVerificationDocumentType(
  type: string
): type is UserVerificationDocumentType {
  return Object.values(USER_VERIFICATION_DOCUMENT_TYPE).includes(
    type as UserVerificationDocumentType
  );
}

/**
 * Get user verification type display name
 */
export function getUserVerificationTypeDisplayName(type: UserVerificationType): string {
  return USER_VERIFICATION_TYPE_LABELS[type] || type;
}

/**
 * Get user verification status display name
 */
export function getUserVerificationStatusDisplayName(status: UserVerificationStatus): string {
  return USER_VERIFICATION_STATUS_LABELS[status] || status;
}

/**
 * Get user verification method display name
 */
export function getUserVerificationMethodDisplayName(method: UserVerificationMethod): string {
  return USER_VERIFICATION_METHOD_LABELS[method] || method;
}

/**
 * Get user verification level display name
 */
export function getUserVerificationLevelDisplayName(level: UserVerificationLevel): string {
  return USER_VERIFICATION_LEVEL_LABELS[level] || level;
}

/**
 * Get user verification document type display name
 */
export function getUserVerificationDocumentTypeDisplayName(
  type: UserVerificationDocumentType
): string {
  return USER_VERIFICATION_DOCUMENT_TYPE_LABELS[type] || type;
}

/**
 * Check if verification is complete
 */
export function isUserVerificationComplete(status: UserVerificationStatus): boolean {
  return status === USER_VERIFICATION_STATUS.VERIFIED;
}

/**
 * Check if verification is pending
 */
export function isUserVerificationPending(status: UserVerificationStatus): boolean {
  const pendingStatuses: UserVerificationStatus[] = ['pending', 'in_progress', 'requires_review'];
  return pendingStatuses.includes(status);
}

/**
 * Check if verification has failed
 */
export function isUserVerificationFailed(status: UserVerificationStatus): boolean {
  const failedStatuses: UserVerificationStatus[] = ['failed', 'expired'];
  return failedStatuses.includes(status);
}

/**
 * Check if verification is active
 */
export function isUserVerificationActive(status: UserVerificationStatus): boolean {
  const activeStatuses: UserVerificationStatus[] = [
    'pending',
    'in_progress',
    'requires_review',
    'verified',
  ];
  return activeStatuses.includes(status);
}

/**
 * Check if verification has expired
 */
export function isUserVerificationExpired(expiresAt: Date): boolean {
  return new Date() > expiresAt;
}

/**
 * Check if verification attempt limit is reached
 */
export function isUserVerificationAttemptsExceeded(
  attempts: number,
  maxAttempts: number = USER_VERIFICATION_CONFIG.MAX_ATTEMPTS
): boolean {
  return attempts >= maxAttempts;
}

/**
 * Check if resend is allowed
 */
export function isUserVerificationResendAllowed(
  lastAttemptAt: Date,
  cooldownSeconds: number = USER_VERIFICATION_CONFIG.RESEND_COOLDOWN
): boolean {
  const now = Date.now();
  const elapsed = (now - lastAttemptAt.getTime()) / 1000;
  return elapsed >= cooldownSeconds;
}

/**
 * Get remaining resend cooldown in seconds
 */
export function getUserVerificationResendCooldown(
  lastAttemptAt: Date,
  cooldownSeconds: number = USER_VERIFICATION_CONFIG.RESEND_COOLDOWN
): number {
  const now = Date.now();
  const elapsed = (now - lastAttemptAt.getTime()) / 1000;
  const remaining = cooldownSeconds - elapsed;
  return Math.max(0, Math.ceil(remaining));
}

/**
 * Get all user verification types
 */
export function getAllUserVerificationTypes(): UserVerificationType[] {
  return Object.values(USER_VERIFICATION_TYPE);
}

/**
 * Get all user verification statuses
 */
export function getAllUserVerificationStatuses(): UserVerificationStatus[] {
  return Object.values(USER_VERIFICATION_STATUS);
}

/**
 * Get all user verification methods
 */
export function getAllUserVerificationMethods(): UserVerificationMethod[] {
  return Object.values(USER_VERIFICATION_METHOD);
}

/**
 * Get all user verification levels
 */
export function getAllUserVerificationLevels(): UserVerificationLevel[] {
  return Object.values(USER_VERIFICATION_LEVEL);
}

/**
 * Get all user verification document types
 */
export function getAllUserVerificationDocumentTypes(): UserVerificationDocumentType[] {
  return Object.values(USER_VERIFICATION_DOCUMENT_TYPE);
}

/**
 * Get identity verification types
 */
export function getIdentityUserVerificationTypes(): UserVerificationType[] {
  return ['identity', 'age'];
}

/**
 * Get document verification types
 */
export function getDocumentUserVerificationTypes(): UserVerificationType[] {
  return ['document', 'business', 'tax_id', 'bank_account'];
}

/**
 * Get contact verification types
 */
export function getContactUserVerificationTypes(): UserVerificationType[] {
  return ['email', 'phone'];
}

/**
 * Get security verification types
 */
export function getSecurityUserVerificationTypes(): UserVerificationType[] {
  return ['two_fa', 'biometric', 'device'];
}

/**
 * Get required documents for verification level
 */
export function getUserVerificationLevelDocuments(
  level: UserVerificationLevel
): UserVerificationType[] {
  return (USER_VERIFICATION_LEVEL_DOCUMENTS[level] || []) as UserVerificationType[];
}

/**
 * Get default verification config
 */
export function getUserDefaultVerificationConfig(): UserVerificationConfig {
  return {
    otpLength: USER_VERIFICATION_CONFIG.OTP_LENGTH,
    otpExpiry: USER_VERIFICATION_CONFIG.OTP_EXPIRY,
    magicLinkExpiry: USER_VERIFICATION_CONFIG.MAGIC_LINK_EXPIRY,
    tokenExpiry: USER_VERIFICATION_CONFIG.TOKEN_EXPIRY,
    maxAttempts: USER_VERIFICATION_CONFIG.MAX_ATTEMPTS,
    resendCooldown: USER_VERIFICATION_CONFIG.RESEND_COOLDOWN,
    timeout: USER_VERIFICATION_CONFIG.TIMEOUT,
    maxDocuments: USER_VERIFICATION_CONFIG.MAX_DOCUMENTS,
    maxFileSize: USER_VERIFICATION_CONFIG.MAX_FILE_SIZE,
  };
}

/**
 * Get next verification level
 */
export function getUserVerificationNextLevel(
  currentLevel: UserVerificationLevel
): UserVerificationLevel | null {
  const levels = getAllUserVerificationLevels();
  const currentIndex = levels.indexOf(currentLevel);
  if (currentIndex === -1 || currentIndex >= levels.length - 1) {
    return null;
  }
  return levels[currentIndex + 1];
}
