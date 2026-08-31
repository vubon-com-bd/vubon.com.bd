/**
 * Authentication Verification Constants
 * Email, phone, identity, and document verification constants
 */

import { EMAIL_REGEX, BD_MOBILE_REGEX } from '../common/regex.constants';

// ============================================================
// AUTH VERIFICATION TYPES
// ============================================================
export const AUTH_VERIFICATION_TYPES = {
  EMAIL: 'email',
  PHONE: 'phone',
  IDENTITY: 'identity',
  ADDRESS: 'address',
  DEVICE: 'device',
  DOCUMENT: 'document',
  TWO_FA: 'two_fa',
  AGE: 'age',
  BUSINESS: 'business',
  TAX_ID: 'tax_id',
  BANK_ACCOUNT: 'bank_account',
  SOCIAL: 'social',
} as const;

export type AuthVerificationType =
  (typeof AUTH_VERIFICATION_TYPES)[keyof typeof AUTH_VERIFICATION_TYPES];

// ============================================================
// AUTH VERIFICATION STATUS
// ============================================================
export const AUTH_VERIFICATION_STATUS = {
  PENDING: 'pending',
  VERIFIED: 'verified',
  FAILED: 'failed',
  EXPIRED: 'expired',
  CANCELLED: 'cancelled',
  IN_PROGRESS: 'in_progress',
  REQUIRES_REVIEW: 'requires_review',
  SKIPPED: 'skipped',
} as const;

export type AuthVerificationStatus =
  (typeof AUTH_VERIFICATION_STATUS)[keyof typeof AUTH_VERIFICATION_STATUS];

// ============================================================
// AUTH VERIFICATION METHODS
// ============================================================
export const AUTH_VERIFICATION_METHODS = {
  SMS_OTP: 'sms_otp',
  EMAIL_OTP: 'email_otp',
  MAGIC_LINK: 'magic_link',
  QR_CODE: 'qr_code',
  BIOMETRIC: 'biometric',
  DOCUMENT_UPLOAD: 'document_upload',
  THIRD_PARTY: 'third_party',
  MANUAL: 'manual',
  SELFIE: 'selfie',
  VIDEO: 'video',
} as const;

export type AuthVerificationMethod =
  (typeof AUTH_VERIFICATION_METHODS)[keyof typeof AUTH_VERIFICATION_METHODS];

// ============================================================
// AUTH VERIFICATION CONFIG
// ============================================================
export const AUTH_VERIFICATION_CONFIG = {
  OTP_LENGTH: 6,
  OTP_EXPIRY: 300,
  MAGIC_LINK_EXPIRY: 900,
  TOKEN_EXPIRY: 3600,
  MAX_ATTEMPTS: 5,
  RESEND_COOLDOWN: 30,
  TIMEOUT: 600,
  MAX_DOCUMENTS: 5,
  MAX_FILE_SIZE: 10,
} as const;

export type AuthVerificationConfig =
  (typeof AUTH_VERIFICATION_CONFIG)[keyof typeof AUTH_VERIFICATION_CONFIG];

// ============================================================
// AUTH VERIFICATION ERRORS
// ============================================================
export const AUTH_VERIFICATION_ERRORS = {
  INVALID_EMAIL: 'Invalid email format',
  INVALID_PHONE: 'Invalid phone number format',
  CODE_EXPIRED: 'Verification code has expired',
  CODE_INVALID: 'Invalid verification code',
  VERIFICATION_FAILED: 'Verification failed',
  ALREADY_VERIFIED: 'Already verified',
  MAX_ATTEMPTS_EXCEEDED: 'Maximum verification attempts exceeded',
  CODE_NOT_SENT: 'Verification code not sent',
  CODE_NOT_FOUND: 'Verification code not found',
  TIMEOUT_EXCEEDED: 'Verification timeout exceeded',
  INVALID_TYPE: 'Invalid verification type',
  INVALID_METHOD: 'Invalid verification method',
  DOCUMENT_UPLOAD_FAILED: 'Document upload failed',
  INVALID_DOCUMENT: 'Invalid document type',
  DOCUMENT_EXPIRED: 'Document expired',
  IDENTITY_VERIFICATION_FAILED: 'Identity verification failed',
  ADDRESS_VERIFICATION_FAILED: 'Address verification failed',
  AGE_VERIFICATION_FAILED: 'Age verification failed',
  BUSINESS_VERIFICATION_FAILED: 'Business verification failed',
  TAX_ID_VERIFICATION_FAILED: 'Tax ID verification failed',
  BANK_ACCOUNT_VERIFICATION_FAILED: 'Bank account verification failed',
} as const;

export type AuthVerificationError =
  (typeof AUTH_VERIFICATION_ERRORS)[keyof typeof AUTH_VERIFICATION_ERRORS];

// ============================================================
// AUTH VERIFICATION SUCCESS
// ============================================================
export const AUTH_VERIFICATION_SUCCESS = {
  SENT: 'Verification code sent successfully',
  VERIFIED: 'Verification successful',
  RESENT: 'Verification code resent successfully',
  CANCELLED: 'Verification cancelled successfully',
} as const;

export type AuthVerificationSuccess =
  (typeof AUTH_VERIFICATION_SUCCESS)[keyof typeof AUTH_VERIFICATION_SUCCESS];

// ============================================================
// AUTH VERIFICATION RULES
// ============================================================
export const AUTH_VERIFICATION_RULES = {
  EMAIL: {
    pattern: EMAIL_REGEX,
    minLength: 5,
    maxLength: 100,
    allowedDomains: [] as string[],
    blockedDomains: ['tempmail.com', 'guerrillamail.com'] as string[],
  },
  PHONE: {
    pattern: BD_MOBILE_REGEX,
    minLength: 11,
    maxLength: 14,
    countryCode: '+880',
    allowedCountries: ['BD'],
  },
  OTP: {
    pattern: /^[0-9]{6}$/,
    length: 6,
    expiry: 300,
  },
  DOCUMENT: {
    allowedTypes: ['pdf', 'jpg', 'jpeg', 'png', 'doc', 'docx'],
    maxSize: 10485760,
    minSize: 1024,
    maxDocuments: 5,
  },
  IDENTITY: {
    requiredFields: ['fullName', 'dateOfBirth', 'nationalId'],
    minAge: 18,
    maxAge: 120,
  },
} as const;

export type AuthVerificationRule =
  (typeof AUTH_VERIFICATION_RULES)[keyof typeof AUTH_VERIFICATION_RULES];

// ============================================================
// AUTH VERIFICATION STATUS MESSAGES
// ============================================================
export const AUTH_VERIFICATION_STATUS_MESSAGES: Record<AuthVerificationStatus, string> = {
  [AUTH_VERIFICATION_STATUS.PENDING]: 'Verification is pending',
  [AUTH_VERIFICATION_STATUS.VERIFIED]: 'Verification is complete and verified',
  [AUTH_VERIFICATION_STATUS.FAILED]: 'Verification has failed',
  [AUTH_VERIFICATION_STATUS.EXPIRED]: 'Verification has expired',
  [AUTH_VERIFICATION_STATUS.CANCELLED]: 'Verification has been cancelled',
  [AUTH_VERIFICATION_STATUS.IN_PROGRESS]: 'Verification is in progress',
  [AUTH_VERIFICATION_STATUS.REQUIRES_REVIEW]: 'Verification requires manual review',
  [AUTH_VERIFICATION_STATUS.SKIPPED]: 'Verification has been skipped',
} as const;

// ============================================================
// AUTH DOCUMENT TYPES
// ============================================================
export const AUTH_DOCUMENT_TYPES = {
  NATIONAL_ID: 'national_id',
  PASSPORT: 'passport',
  DRIVERS_LICENSE: 'drivers_license',
  VOTER_ID: 'voter_id',
  BIRTH_CERTIFICATE: 'birth_certificate',
  UTILITY_BILL: 'utility_bill',
  BANK_STATEMENT: 'bank_statement',
  TAX_ID: 'tax_id',
  BUSINESS_REGISTRATION: 'business_registration',
  TRADE_LICENSE: 'trade_license',
  TIN_CERTIFICATE: 'tin_certificate',
} as const;

export type AuthDocumentType = (typeof AUTH_DOCUMENT_TYPES)[keyof typeof AUTH_DOCUMENT_TYPES];

// ============================================================
// AUTH DOCUMENT STATUS
// ============================================================
export const AUTH_DOCUMENT_STATUS = {
  UPLOADED: 'uploaded',
  PROCESSING: 'processing',
  VERIFIED: 'verified',
  REJECTED: 'rejected',
  EXPIRED: 'expired',
  REQUIRES_REVIEW: 'requires_review',
} as const;

export type AuthDocumentStatus = (typeof AUTH_DOCUMENT_STATUS)[keyof typeof AUTH_DOCUMENT_STATUS];

// ============================================================
// FINAL AUTH VERIFICATION STATUSES
// ============================================================
export const FINAL_AUTH_VERIFICATION_STATUSES: AuthVerificationStatus[] = [
  AUTH_VERIFICATION_STATUS.VERIFIED,
  AUTH_VERIFICATION_STATUS.FAILED,
  AUTH_VERIFICATION_STATUS.CANCELLED,
  AUTH_VERIFICATION_STATUS.EXPIRED,
  AUTH_VERIFICATION_STATUS.SKIPPED,
] as const;

// ============================================================
// PENDING AUTH VERIFICATION STATUSES
// ============================================================
export const PENDING_AUTH_VERIFICATION_STATUSES: AuthVerificationStatus[] = [
  AUTH_VERIFICATION_STATUS.PENDING,
  AUTH_VERIFICATION_STATUS.IN_PROGRESS,
  AUTH_VERIFICATION_STATUS.REQUIRES_REVIEW,
] as const;

// ============================================================
// SUCCESSFUL AUTH VERIFICATION STATUSES
// ============================================================
export const SUCCESSFUL_AUTH_VERIFICATION_STATUSES: AuthVerificationStatus[] = [
  AUTH_VERIFICATION_STATUS.VERIFIED,
] as const;

// ============================================================
// AUTH VERIFICATION MAIN OBJECT
// ============================================================
export const authVerification = {
  TYPES: AUTH_VERIFICATION_TYPES,
  STATUS: AUTH_VERIFICATION_STATUS,
  METHODS: AUTH_VERIFICATION_METHODS,
  CONFIG: AUTH_VERIFICATION_CONFIG,
  ERRORS: AUTH_VERIFICATION_ERRORS,
  SUCCESS: AUTH_VERIFICATION_SUCCESS,
  RULES: AUTH_VERIFICATION_RULES,
  STATUS_MESSAGES: AUTH_VERIFICATION_STATUS_MESSAGES,
  DOCUMENT_TYPES: AUTH_DOCUMENT_TYPES,
  DOCUMENT_STATUS: AUTH_DOCUMENT_STATUS,
  FINAL_STATUSES: FINAL_AUTH_VERIFICATION_STATUSES,
  PENDING_STATUSES: PENDING_AUTH_VERIFICATION_STATUSES,
  SUCCESSFUL_STATUSES: SUCCESSFUL_AUTH_VERIFICATION_STATUSES,
} as const;

export type AuthVerification = typeof authVerification;

// ============================================================
// HELPER FUNCTIONS
// ============================================================
export function isFinalAuthVerificationStatus(status: AuthVerificationStatus): boolean {
  return FINAL_AUTH_VERIFICATION_STATUSES.includes(status);
}

export function isAuthVerificationSuccessful(status: AuthVerificationStatus): boolean {
  return SUCCESSFUL_AUTH_VERIFICATION_STATUSES.includes(status);
}

export function isAuthVerificationPending(status: AuthVerificationStatus): boolean {
  return PENDING_AUTH_VERIFICATION_STATUSES.includes(status);
}

export function isValidAuthVerificationType(type: string): type is AuthVerificationType {
  return Object.values(AUTH_VERIFICATION_TYPES).includes(type as AuthVerificationType);
}

export function isValidAuthVerificationStatus(status: string): status is AuthVerificationStatus {
  return Object.values(AUTH_VERIFICATION_STATUS).includes(status as AuthVerificationStatus);
}

export function getAuthVerificationStatusMessage(status: AuthVerificationStatus): string {
  return AUTH_VERIFICATION_STATUS_MESSAGES[status] || 'Unknown verification status';
}

export function isValidAuthVerificationMethod(method: string): method is AuthVerificationMethod {
  return Object.values(AUTH_VERIFICATION_METHODS).includes(method as AuthVerificationMethod);
}

export function isValidAuthDocumentType(type: string): type is AuthDocumentType {
  return Object.values(AUTH_DOCUMENT_TYPES).includes(type as AuthDocumentType);
}

export function isValidAuthDocumentStatus(status: string): status is AuthDocumentStatus {
  return Object.values(AUTH_DOCUMENT_STATUS).includes(status as AuthDocumentStatus);
}

export function isAuthDocumentAccepted(status: AuthDocumentStatus): boolean {
  return status === AUTH_DOCUMENT_STATUS.VERIFIED;
}

export function getAllowedAuthDocumentTypes(): AuthDocumentType[] {
  return Object.values(AUTH_DOCUMENT_TYPES);
}

export function isEmailAllowedForAuthVerification(email: string): boolean {
  const domain = email.split('@')[1];
  const blockedDomains = AUTH_VERIFICATION_RULES.EMAIL.blockedDomains;
  return !blockedDomains.includes(domain);
}

export function isPhoneAllowedForAuthVerification(phone: string): boolean {
  const pattern = AUTH_VERIFICATION_RULES.PHONE.pattern;
  return pattern.test(phone);
}

export function getMaxAuthVerificationAttempts(): number {
  return AUTH_VERIFICATION_CONFIG.MAX_ATTEMPTS;
}

export function getAuthResendCooldown(): number {
  return AUTH_VERIFICATION_CONFIG.RESEND_COOLDOWN;
}

export function getAuthOtpExpiry(): number {
  return AUTH_VERIFICATION_CONFIG.OTP_EXPIRY;
}

export function isAuthOtpExpired(createdAt: Date): boolean {
  const now = Date.now();
  const age = (now - createdAt.getTime()) / 1000;
  return age >= AUTH_VERIFICATION_CONFIG.OTP_EXPIRY;
}
