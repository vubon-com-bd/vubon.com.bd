/**
 * Authentication Verification Types
 * Types for email, phone, identity, and document verification
 */

import type {
  AuthVerificationType,
  AuthVerificationStatus,
  AuthVerificationMethod,
  AuthDocumentType,
  AuthDocumentStatus,
} from '@vubon/shared-constants';
import {
  AUTH_VERIFICATION_TYPES,
  AUTH_VERIFICATION_STATUS,
  AUTH_VERIFICATION_METHODS,
  AUTH_VERIFICATION_CONFIG,
  AUTH_VERIFICATION_RULES,
  AUTH_DOCUMENT_TYPES,
  AUTH_DOCUMENT_STATUS,
  FINAL_AUTH_VERIFICATION_STATUSES,
  PENDING_AUTH_VERIFICATION_STATUSES,
  SUCCESSFUL_AUTH_VERIFICATION_STATUSES,
} from '@vubon/shared-constants';
import type { ID, Timestamp, Url } from '../common/core-primitives.types';

// ============================================================
// VERIFICATION REQUEST
// ============================================================

/**
 * Request to start verification
 */
export interface AuthVerificationRequest {
  /** User ID */
  userId: ID;
  /** Verification type */
  type: AuthVerificationType;
  /** Verification method */
  method: AuthVerificationMethod;
  /** Target (email, phone, etc.) */
  target: string;
  /** Additional data */
  data?: Record<string, unknown>;
  /** Whether to resend if already sent */
  resend?: boolean;
}

/**
 * Request to verify a code
 */
export interface AuthVerifyCodeRequest {
  /** User ID */
  userId: ID;
  /** Verification type */
  type: AuthVerificationType;
  /** Verification code */
  code: string;
  /** Verification session ID (if applicable) */
  sessionId?: ID;
}

/**
 * Request to verify a document
 */
export interface AuthVerifyDocumentRequest {
  /** User ID */
  userId: ID;
  /** Document type */
  documentType: AuthDocumentType;
  /** Document file URL or data */
  document: string | File;
  /** Additional metadata */
  metadata?: Record<string, unknown>;
}

// ============================================================
// VERIFICATION RESPONSE
// ============================================================

/**
 * Verification response
 */
export interface AuthVerificationResponse {
  /** Whether the operation was successful */
  success: boolean;
  /** Verification status */
  status: AuthVerificationStatus;
  /** Verification record (if applicable) */
  record?: AuthVerificationRecord;
  /** Verification session ID (if applicable) */
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
// VERIFICATION RECORD
// ============================================================

/**
 * Verification record
 */
export interface AuthVerificationRecord {
  /** Unique identifier */
  id: ID;
  /** User ID */
  userId: ID;
  /** Verification type */
  type: AuthVerificationType;
  /** Verification method */
  method: AuthVerificationMethod;
  /** Verification status */
  status: AuthVerificationStatus;
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
  /** When the verification was completed (if applicable) */
  completedAt?: Timestamp;
  /** When the verification expires */
  expiresAt: Timestamp;
  /** When the verification was last attempted */
  lastAttemptAt?: Timestamp;
  /** Additional data */
  data?: Record<string, unknown>;
  /** Whether the verification is active */
  isActive: boolean;
}

// ============================================================
// DOCUMENT VERIFICATION
// ============================================================

/**
 * Document verification record
 */
export interface AuthDocumentVerification {
  /** Unique identifier */
  id: ID;
  /** User ID */
  userId: ID;
  /** Document type */
  documentType: AuthDocumentType;
  /** Document status */
  status: AuthDocumentStatus;
  /** Document file URL */
  fileUrl: Url;
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
  /** When the document was reviewed (if applicable) */
  reviewedAt?: Timestamp;
  /** When the document expires (if applicable) */
  expiresAt?: Timestamp;
  /** Additional metadata */
  metadata?: Record<string, unknown>;
}

// ============================================================
// VERIFICATION FILTER
// ============================================================

/**
 * Filter for querying verifications
 */
export interface AuthVerificationFilter {
  /** Filter by user ID */
  userId?: ID;
  /** Filter by verification type */
  type?: AuthVerificationType | AuthVerificationType[];
  /** Filter by verification method */
  method?: AuthVerificationMethod | AuthVerificationMethod[];
  /** Filter by status */
  status?: AuthVerificationStatus | AuthVerificationStatus[];
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

/**
 * Filter for querying document verifications
 */
export interface AuthDocumentFilter {
  /** Filter by user ID */
  userId?: ID;
  /** Filter by document type */
  documentType?: AuthDocumentType | AuthDocumentType[];
  /** Filter by status */
  status?: AuthDocumentStatus | AuthDocumentStatus[];
  /** Filter by date range (uploaded) */
  uploadedDateRange?: {
    start?: Date;
    end?: Date;
  };
}

// ============================================================
// VERIFICATION SUMMARY
// ============================================================

/**
 * Verification summary for a user
 */
export interface AuthVerificationSummary {
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
  };
  /** Pending verifications */
  pendingVerifications: AuthVerificationRecord[];
  /** Completed verifications */
  completedVerifications: AuthVerificationRecord[];
  /** Document verifications */
  documentVerifications: AuthDocumentVerification[];
}

// ============================================================
// VERIFICATION CONFIG
// ============================================================

/**
 * Verification configuration
 */
export interface AuthVerificationConfig {
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
 * Check if verification type is valid
 */
export function isValidAuthVerificationType(type: string): type is AuthVerificationType {
  return Object.values(AUTH_VERIFICATION_TYPES).includes(type as AuthVerificationType);
}

/**
 * Check if verification status is valid
 */
export function isValidAuthVerificationStatus(status: string): status is AuthVerificationStatus {
  return Object.values(AUTH_VERIFICATION_STATUS).includes(status as AuthVerificationStatus);
}

/**
 * Check if verification method is valid
 */
export function isValidAuthVerificationMethod(method: string): method is AuthVerificationMethod {
  return Object.values(AUTH_VERIFICATION_METHODS).includes(method as AuthVerificationMethod);
}

/**
 * Check if document type is valid
 */
export function isValidAuthDocumentType(type: string): type is AuthDocumentType {
  return Object.values(AUTH_DOCUMENT_TYPES).includes(type as AuthDocumentType);
}

/**
 * Check if document status is valid
 */
export function isValidAuthDocumentStatus(status: string): status is AuthDocumentStatus {
  return Object.values(AUTH_DOCUMENT_STATUS).includes(status as AuthDocumentStatus);
}

/**
 * Check if verification status is final
 */
export function isAuthVerificationFinal(status: AuthVerificationStatus): boolean {
  return FINAL_AUTH_VERIFICATION_STATUSES.includes(status);
}

/**
 * Check if verification is successful
 */
export function isAuthVerificationSuccessful(status: AuthVerificationStatus): boolean {
  return SUCCESSFUL_AUTH_VERIFICATION_STATUSES.includes(status);
}

/**
 * Check if verification is pending
 */
export function isAuthVerificationPending(status: AuthVerificationStatus): boolean {
  return PENDING_AUTH_VERIFICATION_STATUSES.includes(status);
}

/**
 * Get verification status message
 */
export function getAuthVerificationStatusMessage(status: AuthVerificationStatus): string {
  const messages: Record<AuthVerificationStatus, string> = {
    pending: 'Verification is pending',
    verified: 'Verification is complete and verified',
    failed: 'Verification has failed',
    expired: 'Verification has expired',
    cancelled: 'Verification has been cancelled',
    in_progress: 'Verification is in progress',
    requires_review: 'Verification requires manual review',
    skipped: 'Verification has been skipped',
  };
  return messages[status] || 'Unknown verification status';
}

/**
 * Check if verification has expired
 */
export function isAuthVerificationExpired(expiresAt: Date): boolean {
  return new Date() > expiresAt;
}

/**
 * Check if verification attempt limit is reached
 */
export function isAuthVerificationAttemptsExceeded(
  attempts: number,
  maxAttempts: number = AUTH_VERIFICATION_CONFIG.MAX_ATTEMPTS
): boolean {
  return attempts >= maxAttempts;
}

/**
 * Check if resend is allowed
 */
export function isAuthVerificationResendAllowed(
  lastAttemptAt: Date,
  cooldownSeconds: number = AUTH_VERIFICATION_CONFIG.RESEND_COOLDOWN
): boolean {
  const now = Date.now();
  const elapsed = (now - lastAttemptAt.getTime()) / 1000;
  return elapsed >= cooldownSeconds;
}

/**
 * Get remaining resend cooldown in seconds
 */
export function getAuthVerificationResendCooldown(
  lastAttemptAt: Date,
  cooldownSeconds: number = AUTH_VERIFICATION_CONFIG.RESEND_COOLDOWN
): number {
  const now = Date.now();
  const elapsed = (now - lastAttemptAt.getTime()) / 1000;
  const remaining = cooldownSeconds - elapsed;
  return Math.max(0, Math.ceil(remaining));
}

/**
 * Get human-readable label for verification type
 */
export function getAuthVerificationTypeLabel(type: AuthVerificationType): string {
  const labels: Record<AuthVerificationType, string> = {
    email: 'Email Verification',
    phone: 'Phone Verification',
    identity: 'Identity Verification',
    address: 'Address Verification',
    device: 'Device Verification',
    document: 'Document Verification',
    two_fa: 'Two-Factor Authentication',
    age: 'Age Verification',
    business: 'Business Verification',
    tax_id: 'Tax ID Verification',
    bank_account: 'Bank Account Verification',
    social: 'Social Media Verification',
  };
  return labels[type] || 'Unknown Type';
}

/**
 * Get human-readable label for verification method
 */
export function getAuthVerificationMethodLabel(method: AuthVerificationMethod): string {
  const labels: Record<AuthVerificationMethod, string> = {
    sms_otp: 'SMS OTP',
    email_otp: 'Email OTP',
    magic_link: 'Magic Link',
    qr_code: 'QR Code',
    biometric: 'Biometric',
    document_upload: 'Document Upload',
    third_party: 'Third-Party Service',
    manual: 'Manual Review',
    selfie: 'Selfie Verification',
    video: 'Video Verification',
  };
  return labels[method] || 'Unknown Method';
}

/**
 * Get human-readable label for document type
 */
export function getAuthDocumentTypeLabel(type: AuthDocumentType): string {
  const labels: Record<AuthDocumentType, string> = {
    national_id: 'National ID',
    passport: 'Passport',
    drivers_license: "Driver's License",
    voter_id: 'Voter ID',
    birth_certificate: 'Birth Certificate',
    utility_bill: 'Utility Bill',
    bank_statement: 'Bank Statement',
    tax_id: 'Tax ID',
    business_registration: 'Business Registration',
    trade_license: 'Trade License',
    tin_certificate: 'TIN Certificate',
  };
  return labels[type] || 'Unknown Document Type';
}

/**
 * Get human-readable label for document status
 */
export function getAuthDocumentStatusLabel(status: AuthDocumentStatus): string {
  const labels: Record<AuthDocumentStatus, string> = {
    uploaded: 'Uploaded',
    processing: 'Processing',
    verified: 'Verified',
    rejected: 'Rejected',
    expired: 'Expired',
    requires_review: 'Requires Review',
  };
  return labels[status] || 'Unknown Status';
}

/**
 * Check if email is allowed for verification
 */
export function isAuthEmailAllowedForVerification(email: string): boolean {
  const domain = email.split('@')[1];
  const blockedDomains = AUTH_VERIFICATION_RULES.EMAIL.blockedDomains;
  return !blockedDomains.includes(domain);
}

/**
 * Check if phone is allowed for verification
 */
export function isAuthPhoneAllowedForVerification(phone: string): boolean {
  const pattern = AUTH_VERIFICATION_RULES.PHONE.pattern;
  return pattern.test(phone);
}

/**
 * Get default verification config
 */
export function getAuthDefaultVerificationConfig(): AuthVerificationConfig {
  return {
    otpLength: AUTH_VERIFICATION_CONFIG.OTP_LENGTH,
    otpExpiry: AUTH_VERIFICATION_CONFIG.OTP_EXPIRY,
    magicLinkExpiry: AUTH_VERIFICATION_CONFIG.MAGIC_LINK_EXPIRY,
    tokenExpiry: AUTH_VERIFICATION_CONFIG.TOKEN_EXPIRY,
    maxAttempts: AUTH_VERIFICATION_CONFIG.MAX_ATTEMPTS,
    resendCooldown: AUTH_VERIFICATION_CONFIG.RESEND_COOLDOWN,
    timeout: AUTH_VERIFICATION_CONFIG.TIMEOUT,
    maxDocuments: AUTH_VERIFICATION_CONFIG.MAX_DOCUMENTS,
    maxFileSize: AUTH_VERIFICATION_CONFIG.MAX_FILE_SIZE,
  };
}

/**
 * Get allowed document types
 */
export function getAuthAllowedDocumentTypes(): AuthDocumentType[] {
  return Object.values(AUTH_DOCUMENT_TYPES);
}

/**
 * Check if document is accepted
 */
export function isAuthDocumentAccepted(status: AuthDocumentStatus): boolean {
  return status === AUTH_DOCUMENT_STATUS.VERIFIED;
}
