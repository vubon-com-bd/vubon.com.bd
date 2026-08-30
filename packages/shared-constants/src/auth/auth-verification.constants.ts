/**
 * Authentication Verification Constants
 * Email, phone, identity, and document verification constants
 */

import { EMAIL_REGEX, BD_MOBILE_REGEX } from '../common/regex.constants';

/**
 * Verification Types
 * Types of verification supported by the platform
 */
export const VERIFICATION_TYPES = {
  /** Email address verification */
  EMAIL: 'email',
  /** Phone number verification */
  PHONE: 'phone',
  /** Identity verification */
  IDENTITY: 'identity',
  /** Address verification */
  ADDRESS: 'address',
  /** Device verification */
  DEVICE: 'device',
  /** Document verification (KYC) */
  DOCUMENT: 'document',
  /** Two-factor authentication verification */
  TWO_FA: 'two_fa',
  /** Age verification */
  AGE: 'age',
  /** Business verification */
  BUSINESS: 'business',
  /** Tax ID verification */
  TAX_ID: 'tax_id',
  /** Bank account verification */
  BANK_ACCOUNT: 'bank_account',
  /** Social media verification */
  SOCIAL: 'social',
} as const;

export type VerificationType = (typeof VERIFICATION_TYPES)[keyof typeof VERIFICATION_TYPES];

/**
 * Verification Status
 * Status of a verification attempt
 */
export const VERIFICATION_STATUS = {
  /** Verification is pending */
  PENDING: 'pending',
  /** Verification is successful */
  VERIFIED: 'verified',
  /** Verification has failed */
  FAILED: 'failed',
  /** Verification has expired */
  EXPIRED: 'expired',
  /** Verification has been cancelled */
  CANCELLED: 'cancelled',
  /** Verification is in progress */
  IN_PROGRESS: 'in_progress',
  /** Verification requires manual review */
  REQUIRES_REVIEW: 'requires_review',
  /** Verification is skipped */
  SKIPPED: 'skipped',
} as const;

export type VerificationStatus = (typeof VERIFICATION_STATUS)[keyof typeof VERIFICATION_STATUS];

/**
 * Verification Methods
 * Methods used for verification
 */
export const VERIFICATION_METHODS = {
  /** OTP sent via SMS */
  SMS_OTP: 'sms_otp',
  /** OTP sent via email */
  EMAIL_OTP: 'email_otp',
  /** Magic link sent via email */
  MAGIC_LINK: 'magic_link',
  /** QR code verification */
  QR_CODE: 'qr_code',
  /** Biometric verification */
  BIOMETRIC: 'biometric',
  /** Document upload verification */
  DOCUMENT_UPLOAD: 'document_upload',
  /** Third-party verification service */
  THIRD_PARTY: 'third_party',
  /** Manual verification by admin */
  MANUAL: 'manual',
  /** Selfie verification */
  SELFIE: 'selfie',
  /** Video verification */
  VIDEO: 'video',
} as const;

export type VerificationMethod = (typeof VERIFICATION_METHODS)[keyof typeof VERIFICATION_METHODS];

/**
 * Verification Configuration
 * Default configuration values for verification
 */
export const VERIFICATION_CONFIG = {
  /** OTP code length */
  OTP_LENGTH: 6,
  /** OTP expiry in seconds (5 minutes) */
  OTP_EXPIRY: 300,
  /** Magic link expiry in seconds (15 minutes) */
  MAGIC_LINK_EXPIRY: 900,
  /** Verification token expiry in seconds (1 hour) */
  TOKEN_EXPIRY: 3600,
  /** Maximum verification attempts */
  MAX_ATTEMPTS: 5,
  /** Resend cooldown in seconds (30 seconds) */
  RESEND_COOLDOWN: 30,
  /** Verification timeout in seconds (10 minutes) */
  TIMEOUT: 600,
  /** Maximum documents per verification */
  MAX_DOCUMENTS: 5,
  /** Maximum file size per document in MB */
  MAX_FILE_SIZE: 10,
} as const;

export type VerificationConfig = (typeof VERIFICATION_CONFIG)[keyof typeof VERIFICATION_CONFIG];

/**
 * Verification Error Messages
 * Error messages for verification failures
 */
export const VERIFICATION_ERRORS = {
  /** Invalid email format */
  INVALID_EMAIL: 'Invalid email format',
  /** Invalid phone number format */
  INVALID_PHONE: 'Invalid phone number format',
  /** Verification code has expired */
  CODE_EXPIRED: 'Verification code has expired',
  /** Invalid verification code */
  CODE_INVALID: 'Invalid verification code',
  /** Verification failed */
  VERIFICATION_FAILED: 'Verification failed',
  /** Already verified */
  ALREADY_VERIFIED: 'Already verified',
  /** Maximum verification attempts exceeded */
  MAX_ATTEMPTS_EXCEEDED: 'Maximum verification attempts exceeded',
  /** Verification code not sent */
  CODE_NOT_SENT: 'Verification code not sent',
  /** Verification code not found */
  CODE_NOT_FOUND: 'Verification code not found',
  /** Verification timeout exceeded */
  TIMEOUT_EXCEEDED: 'Verification timeout exceeded',
  /** Invalid verification type */
  INVALID_TYPE: 'Invalid verification type',
  /** Invalid verification method */
  INVALID_METHOD: 'Invalid verification method',
  /** Document upload failed */
  DOCUMENT_UPLOAD_FAILED: 'Document upload failed',
  /** Invalid document type */
  INVALID_DOCUMENT: 'Invalid document type',
  /** Document expired */
  DOCUMENT_EXPIRED: 'Document expired',
  /** Identity verification failed */
  IDENTITY_VERIFICATION_FAILED: 'Identity verification failed',
  /** Address verification failed */
  ADDRESS_VERIFICATION_FAILED: 'Address verification failed',
  /** Age verification failed */
  AGE_VERIFICATION_FAILED: 'Age verification failed',
  /** Business verification failed */
  BUSINESS_VERIFICATION_FAILED: 'Business verification failed',
  /** Tax ID verification failed */
  TAX_ID_VERIFICATION_FAILED: 'Tax ID verification failed',
  /** Bank account verification failed */
  BANK_ACCOUNT_VERIFICATION_FAILED: 'Bank account verification failed',
} as const;

export type VerificationError = (typeof VERIFICATION_ERRORS)[keyof typeof VERIFICATION_ERRORS];

/**
 * Verification Success Messages
 * Success messages for verification operations
 */
export const VERIFICATION_SUCCESS = {
  /** Verification sent successfully */
  SENT: 'Verification code sent successfully',
  /** Verification verified successfully */
  VERIFIED: 'Verification successful',
  /** Verification resend successful */
  RESENT: 'Verification code resent successfully',
  /** Verification cancelled successfully */
  CANCELLED: 'Verification cancelled successfully',
} as const;

export type VerificationSuccess = (typeof VERIFICATION_SUCCESS)[keyof typeof VERIFICATION_SUCCESS];

/**
 * Verification Rules
 * Validation rules for different verification types
 */
export const VERIFICATION_RULES = {
  /** Email verification rules */
  EMAIL: {
    pattern: EMAIL_REGEX,
    minLength: 5,
    maxLength: 100,
    allowedDomains: [] as string[],
    blockedDomains: ['tempmail.com', 'guerrillamail.com'] as string[],
  },
  /** Phone verification rules */
  PHONE: {
    pattern: BD_MOBILE_REGEX,
    minLength: 11,
    maxLength: 14,
    countryCode: '+880',
    allowedCountries: ['BD'],
  },
  /** OTP verification rules */
  OTP: {
    pattern: /^[0-9]{6}$/,
    length: 6,
    expiry: 300, // 5 minutes
  },
  /** Document verification rules */
  DOCUMENT: {
    allowedTypes: ['pdf', 'jpg', 'jpeg', 'png', 'doc', 'docx'],
    maxSize: 10485760, // 10MB
    minSize: 1024, // 1KB
    maxDocuments: 5,
  },
  /** Identity verification rules */
  IDENTITY: {
    requiredFields: ['fullName', 'dateOfBirth', 'nationalId'],
    minAge: 18,
    maxAge: 120,
  },
} as const;

export type VerificationRule = (typeof VERIFICATION_RULES)[keyof typeof VERIFICATION_RULES];

/**
 * Verification Status Messages
 * Human-readable messages for each verification status
 */
export const VERIFICATION_STATUS_MESSAGES: Record<VerificationStatus, string> = {
  [VERIFICATION_STATUS.PENDING]: 'Verification is pending',
  [VERIFICATION_STATUS.VERIFIED]: 'Verification is complete and verified',
  [VERIFICATION_STATUS.FAILED]: 'Verification has failed',
  [VERIFICATION_STATUS.EXPIRED]: 'Verification has expired',
  [VERIFICATION_STATUS.CANCELLED]: 'Verification has been cancelled',
  [VERIFICATION_STATUS.IN_PROGRESS]: 'Verification is in progress',
  [VERIFICATION_STATUS.REQUIRES_REVIEW]: 'Verification requires manual review',
  [VERIFICATION_STATUS.SKIPPED]: 'Verification has been skipped',
} as const;

/**
 * Document Types for KYC
 * Types of documents accepted for identity verification
 */
export const DOCUMENT_TYPES = {
  /** National ID card */
  NATIONAL_ID: 'national_id',
  /** Passport */
  PASSPORT: 'passport',
  /** Driver's license */
  DRIVERS_LICENSE: 'drivers_license',
  /** Voter ID */
  VOTER_ID: 'voter_id',
  /** Birth certificate */
  BIRTH_CERTIFICATE: 'birth_certificate',
  /** Utility bill (address proof) */
  UTILITY_BILL: 'utility_bill',
  /** Bank statement (address proof) */
  BANK_STATEMENT: 'bank_statement',
  /** Tax ID document */
  TAX_ID: 'tax_id',
  /** Business registration */
  BUSINESS_REGISTRATION: 'business_registration',
  /** Trade license */
  TRADE_LICENSE: 'trade_license',
  /** TIN certificate */
  TIN_CERTIFICATE: 'tin_certificate',
} as const;

export type DocumentType = (typeof DOCUMENT_TYPES)[keyof typeof DOCUMENT_TYPES];

/**
 * Document Status
 * Status of a verification document
 */
export const DOCUMENT_STATUS = {
  /** Document uploaded but not processed */
  UPLOADED: 'uploaded',
  /** Document is being processed */
  PROCESSING: 'processing',
  /** Document is verified */
  VERIFIED: 'verified',
  /** Document is rejected */
  REJECTED: 'rejected',
  /** Document is expired */
  EXPIRED: 'expired',
  /** Document requires review */
  REQUIRES_REVIEW: 'requires_review',
} as const;

export type DocumentStatus = (typeof DOCUMENT_STATUS)[keyof typeof DOCUMENT_STATUS];

/**
 * Final Verification Statuses
 * Statuses that indicate a verification process has ended
 */
export const FINAL_VERIFICATION_STATUSES: VerificationStatus[] = [
  VERIFICATION_STATUS.VERIFIED,
  VERIFICATION_STATUS.FAILED,
  VERIFICATION_STATUS.CANCELLED,
  VERIFICATION_STATUS.EXPIRED,
  VERIFICATION_STATUS.SKIPPED,
] as const;

/**
 * Pending Verification Statuses
 * Statuses that indicate verification is still in progress
 */
export const PENDING_VERIFICATION_STATUSES: VerificationStatus[] = [
  VERIFICATION_STATUS.PENDING,
  VERIFICATION_STATUS.IN_PROGRESS,
  VERIFICATION_STATUS.REQUIRES_REVIEW,
] as const;

/**
 * Successful Verification Statuses
 * Statuses that indicate verification was successful
 */
export const SUCCESSFUL_VERIFICATION_STATUSES: VerificationStatus[] = [
  VERIFICATION_STATUS.VERIFIED,
] as const;

/**
 * Helper function to check if verification status is final
 */
export function isFinalVerificationStatus(status: VerificationStatus): boolean {
  return FINAL_VERIFICATION_STATUSES.includes(status);
}

/**
 * Helper function to check if verification is successful
 */
export function isVerificationSuccessful(status: VerificationStatus): boolean {
  return SUCCESSFUL_VERIFICATION_STATUSES.includes(status);
}

/**
 * Helper function to check if verification is pending
 */
export function isVerificationPending(status: VerificationStatus): boolean {
  return PENDING_VERIFICATION_STATUSES.includes(status);
}

/**
 * Helper function to check if verification type is valid
 */
export function isValidVerificationType(type: string): type is VerificationType {
  return Object.values(VERIFICATION_TYPES).includes(type as VerificationType);
}

/**
 * Helper function to check if verification status is valid
 */
export function isValidVerificationStatus(status: string): status is VerificationStatus {
  return Object.values(VERIFICATION_STATUS).includes(status as VerificationStatus);
}

/**
 * Helper function to get verification status message
 */
export function getVerificationStatusMessage(status: VerificationStatus): string {
  return VERIFICATION_STATUS_MESSAGES[status] || 'Unknown verification status';
}

/**
 * Helper function to check if verification method is valid
 */
export function isValidVerificationMethod(method: string): method is VerificationMethod {
  return Object.values(VERIFICATION_METHODS).includes(method as VerificationMethod);
}

/**
 * Helper function to check if document type is valid
 */
export function isValidDocumentType(type: string): type is DocumentType {
  return Object.values(DOCUMENT_TYPES).includes(type as DocumentType);
}

/**
 * Helper function to check if document status is valid
 */
export function isValidDocumentStatus(status: string): status is DocumentStatus {
  return Object.values(DOCUMENT_STATUS).includes(status as DocumentStatus);
}

/**
 * Helper function to check if document is accepted
 */
export function isDocumentAccepted(status: DocumentStatus): boolean {
  return status === DOCUMENT_STATUS.VERIFIED;
}

/**
 * Helper function to get allowed document types
 */
export function getAllowedDocumentTypes(): DocumentType[] {
  return Object.values(DOCUMENT_TYPES);
}

/**
 * Helper function to check if email is allowed for verification
 */
export function isEmailAllowedForVerification(email: string): boolean {
  const domain = email.split('@')[1];
  const blockedDomains = VERIFICATION_RULES.EMAIL.blockedDomains;
  return !blockedDomains.includes(domain);
}

/**
 * Helper function to check if phone is allowed for verification
 */
export function isPhoneAllowedForVerification(phone: string): boolean {
  const pattern = VERIFICATION_RULES.PHONE.pattern;
  return pattern.test(phone);
}

/**
 * Helper function to get max attempts for verification
 */
export function getMaxVerificationAttempts(): number {
  return VERIFICATION_CONFIG.MAX_ATTEMPTS;
}

/**
 * Helper function to get resend cooldown
 */
export function getResendCooldown(): number {
  return VERIFICATION_CONFIG.RESEND_COOLDOWN;
}

/**
 * Helper function to get OTP expiry
 */
export function getOtpExpiry(): number {
  return VERIFICATION_CONFIG.OTP_EXPIRY;
}

/**
 * Helper function to check if OTP is expired
 */
export function isOtpExpired(createdAt: Date): boolean {
  const now = Date.now();
  const age = (now - createdAt.getTime()) / 1000;
  return age >= VERIFICATION_CONFIG.OTP_EXPIRY;
}
