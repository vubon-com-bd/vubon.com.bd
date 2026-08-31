/**
 * User Verification Constants
 * All possible user verification-related constants in the system
 * Imports common values where applicable
 */

import { STATUS } from '../common/status.constants';

/**
 * User verification types
 * Defines the types of verification a user can undergo
 */
export const USER_VERIFICATION_TYPE = {
  /** Email verification */
  EMAIL: 'email',
  /** Phone verification */
  PHONE: 'phone',
  /** Identity verification */
  IDENTITY: 'identity',
  /** Address verification */
  ADDRESS: 'address',
  /** Age verification */
  AGE: 'age',
  /** Document verification */
  DOCUMENT: 'document',
  /** Business verification */
  BUSINESS: 'business',
  /** Tax ID verification */
  TAX_ID: 'tax_id',
  /** Bank account verification */
  BANK_ACCOUNT: 'bank_account',
  /** Social media verification */
  SOCIAL: 'social',
  /** Device verification */
  DEVICE: 'device',
  /** Two-factor verification */
  TWO_FA: 'two_fa',
  /** Biometric verification */
  BIOMETRIC: 'biometric',
} as const;

/**
 * User verification status
 * Status of user verification
 */
export const USER_VERIFICATION_STATUS = {
  /** Verification is not started */
  NOT_STARTED: 'not_started',
  /** Verification is pending */
  PENDING: STATUS.PENDING,
  /** Verification is in progress */
  IN_PROGRESS: 'in_progress',
  /** Verification is successful */
  VERIFIED: STATUS.VERIFIED,
  /** Verification has failed */
  FAILED: STATUS.FAILED,
  /** Verification has expired */
  EXPIRED: STATUS.EXPIRED,
  /** Verification requires manual review */
  REQUIRES_REVIEW: 'requires_review',
  /** Verification has been skipped */
  SKIPPED: 'skipped',
  /** Verification has been cancelled */
  CANCELLED: STATUS.CANCELLED,
  /** Verification is on hold */
  ON_HOLD: STATUS.ON_HOLD,
} as const;

/**
 * User verification method
 * Methods used for verification
 */
export const USER_VERIFICATION_METHOD = {
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
  /** Document upload */
  DOCUMENT_UPLOAD: 'document_upload',
  /** Third-party verification service */
  THIRD_PARTY: 'third_party',
  /** Manual verification by admin */
  MANUAL: 'manual',
  /** Selfie verification */
  SELFIE: 'selfie',
  /** Video verification */
  VIDEO: 'video',
  /** Live verification */
  LIVE: 'live',
  /** AI-based verification */
  AI: 'ai',
} as const;

/**
 * User verification level
 * Levels of verification
 */
export const USER_VERIFICATION_LEVEL = {
  /** No verification */
  LEVEL_0: 'level_0',
  /** Basic verification (email/phone) */
  LEVEL_1: 'level_1',
  /** Standard verification (identity) */
  LEVEL_2: 'level_2',
  /** Enhanced verification (address) */
  LEVEL_3: 'level_3',
  /** Full verification (all documents) */
  LEVEL_4: 'level_4',
  /** Premium verification (business) */
  LEVEL_5: 'level_5',
} as const;

/**
 * User verification document types
 * Types of documents accepted for verification
 */
export const USER_VERIFICATION_DOCUMENT_TYPE = {
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
  /** Company profile */
  COMPANY_PROFILE: 'company_profile',
  /** Financial statement */
  FINANCIAL_STATEMENT: 'financial_statement',
} as const;

/**
 * User verification status labels
 * Human-readable labels for UI
 */
export const USER_VERIFICATION_TYPE_LABELS: Record<string, string> = {
  [USER_VERIFICATION_TYPE.EMAIL]: 'Email Verification',
  [USER_VERIFICATION_TYPE.PHONE]: 'Phone Verification',
  [USER_VERIFICATION_TYPE.IDENTITY]: 'Identity Verification',
  [USER_VERIFICATION_TYPE.ADDRESS]: 'Address Verification',
  [USER_VERIFICATION_TYPE.AGE]: 'Age Verification',
  [USER_VERIFICATION_TYPE.DOCUMENT]: 'Document Verification',
  [USER_VERIFICATION_TYPE.BUSINESS]: 'Business Verification',
  [USER_VERIFICATION_TYPE.TAX_ID]: 'Tax ID Verification',
  [USER_VERIFICATION_TYPE.BANK_ACCOUNT]: 'Bank Account Verification',
  [USER_VERIFICATION_TYPE.SOCIAL]: 'Social Media Verification',
  [USER_VERIFICATION_TYPE.DEVICE]: 'Device Verification',
  [USER_VERIFICATION_TYPE.TWO_FA]: 'Two-Factor Verification',
  [USER_VERIFICATION_TYPE.BIOMETRIC]: 'Biometric Verification',
};

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

/**
 * User verification method labels
 */
export const USER_VERIFICATION_METHOD_LABELS: Record<string, string> = {
  [USER_VERIFICATION_METHOD.SMS_OTP]: 'SMS OTP',
  [USER_VERIFICATION_METHOD.EMAIL_OTP]: 'Email OTP',
  [USER_VERIFICATION_METHOD.MAGIC_LINK]: 'Magic Link',
  [USER_VERIFICATION_METHOD.QR_CODE]: 'QR Code',
  [USER_VERIFICATION_METHOD.BIOMETRIC]: 'Biometric',
  [USER_VERIFICATION_METHOD.DOCUMENT_UPLOAD]: 'Document Upload',
  [USER_VERIFICATION_METHOD.THIRD_PARTY]: 'Third-Party Service',
  [USER_VERIFICATION_METHOD.MANUAL]: 'Manual Review',
  [USER_VERIFICATION_METHOD.SELFIE]: 'Selfie Verification',
  [USER_VERIFICATION_METHOD.VIDEO]: 'Video Verification',
  [USER_VERIFICATION_METHOD.LIVE]: 'Live Verification',
  [USER_VERIFICATION_METHOD.AI]: 'AI-Based Verification',
};

/**
 * User verification level labels
 */
export const USER_VERIFICATION_LEVEL_LABELS: Record<string, string> = {
  [USER_VERIFICATION_LEVEL.LEVEL_0]: 'No Verification',
  [USER_VERIFICATION_LEVEL.LEVEL_1]: 'Basic Verification',
  [USER_VERIFICATION_LEVEL.LEVEL_2]: 'Standard Verification',
  [USER_VERIFICATION_LEVEL.LEVEL_3]: 'Enhanced Verification',
  [USER_VERIFICATION_LEVEL.LEVEL_4]: 'Full Verification',
  [USER_VERIFICATION_LEVEL.LEVEL_5]: 'Premium Verification',
};

/**
 * User verification document type labels
 */
export const USER_VERIFICATION_DOCUMENT_TYPE_LABELS: Record<string, string> = {
  [USER_VERIFICATION_DOCUMENT_TYPE.NATIONAL_ID]: 'National ID Card',
  [USER_VERIFICATION_DOCUMENT_TYPE.PASSPORT]: 'Passport',
  [USER_VERIFICATION_DOCUMENT_TYPE.DRIVERS_LICENSE]: "Driver's License",
  [USER_VERIFICATION_DOCUMENT_TYPE.VOTER_ID]: 'Voter ID',
  [USER_VERIFICATION_DOCUMENT_TYPE.BIRTH_CERTIFICATE]: 'Birth Certificate',
  [USER_VERIFICATION_DOCUMENT_TYPE.UTILITY_BILL]: 'Utility Bill',
  [USER_VERIFICATION_DOCUMENT_TYPE.BANK_STATEMENT]: 'Bank Statement',
  [USER_VERIFICATION_DOCUMENT_TYPE.TAX_ID]: 'Tax ID Document',
  [USER_VERIFICATION_DOCUMENT_TYPE.BUSINESS_REGISTRATION]: 'Business Registration',
  [USER_VERIFICATION_DOCUMENT_TYPE.TRADE_LICENSE]: 'Trade License',
  [USER_VERIFICATION_DOCUMENT_TYPE.TIN_CERTIFICATE]: 'TIN Certificate',
  [USER_VERIFICATION_DOCUMENT_TYPE.COMPANY_PROFILE]: 'Company Profile',
  [USER_VERIFICATION_DOCUMENT_TYPE.FINANCIAL_STATEMENT]: 'Financial Statement',
};

/**
 * Check if user verification type is valid
 */
export function isValidUserVerificationType(type: string): boolean {
  return Object.values(USER_VERIFICATION_TYPE).includes(
    type as (typeof USER_VERIFICATION_TYPE)[keyof typeof USER_VERIFICATION_TYPE]
  );
}

/**
 * Check if user verification status is valid
 */
export function isValidUserVerificationStatus(status: string): boolean {
  return Object.values(USER_VERIFICATION_STATUS).includes(
    status as (typeof USER_VERIFICATION_STATUS)[keyof typeof USER_VERIFICATION_STATUS]
  );
}

/**
 * Check if user verification method is valid
 */
export function isValidUserVerificationMethod(method: string): boolean {
  return Object.values(USER_VERIFICATION_METHOD).includes(
    method as (typeof USER_VERIFICATION_METHOD)[keyof typeof USER_VERIFICATION_METHOD]
  );
}

/**
 * Check if user verification level is valid
 */
export function isValidUserVerificationLevel(level: string): boolean {
  return Object.values(USER_VERIFICATION_LEVEL).includes(
    level as (typeof USER_VERIFICATION_LEVEL)[keyof typeof USER_VERIFICATION_LEVEL]
  );
}

/**
 * Check if user verification document type is valid
 */
export function isValidUserVerificationDocumentType(type: string): boolean {
  return Object.values(USER_VERIFICATION_DOCUMENT_TYPE).includes(
    type as (typeof USER_VERIFICATION_DOCUMENT_TYPE)[keyof typeof USER_VERIFICATION_DOCUMENT_TYPE]
  );
}

/**
 * Get user verification type label
 */
export function getUserVerificationTypeLabel(type: string): string {
  return USER_VERIFICATION_TYPE_LABELS[type] || type;
}

/**
 * Get user verification status label
 */
export function getUserVerificationStatusLabel(status: string): string {
  return USER_VERIFICATION_STATUS_LABELS[status] || status;
}

/**
 * Get user verification method label
 */
export function getUserVerificationMethodLabel(method: string): string {
  return USER_VERIFICATION_METHOD_LABELS[method] || method;
}

/**
 * Get user verification level label
 */
export function getUserVerificationLevelLabel(level: string): string {
  return USER_VERIFICATION_LEVEL_LABELS[level] || level;
}

/**
 * Get user verification document type label
 */
export function getUserVerificationDocumentTypeLabel(type: string): string {
  return USER_VERIFICATION_DOCUMENT_TYPE_LABELS[type] || type;
}

/**
 * Check if verification is complete
 */
export function isUserVerificationComplete(status: string): boolean {
  return status === USER_VERIFICATION_STATUS.VERIFIED;
}

/**
 * Check if verification is pending
 */
export function isUserVerificationPending(status: string): boolean {
  return (
    status === USER_VERIFICATION_STATUS.PENDING ||
    status === USER_VERIFICATION_STATUS.IN_PROGRESS ||
    status === USER_VERIFICATION_STATUS.REQUIRES_REVIEW
  );
}

/**
 * Check if verification has failed
 */
export function isUserVerificationFailed(status: string): boolean {
  return status === USER_VERIFICATION_STATUS.FAILED || status === USER_VERIFICATION_STATUS.EXPIRED;
}

/**
 * Check if verification is active
 */
export function isUserVerificationActive(status: string): boolean {
  return (
    status === USER_VERIFICATION_STATUS.PENDING ||
    status === USER_VERIFICATION_STATUS.IN_PROGRESS ||
    status === USER_VERIFICATION_STATUS.REQUIRES_REVIEW ||
    status === USER_VERIFICATION_STATUS.VERIFIED
  );
}

/**
 * Get all user verification types
 */
export function getAllUserVerificationTypes(): string[] {
  return Object.values(USER_VERIFICATION_TYPE);
}

/**
 * Get all user verification statuses
 */
export function getAllUserVerificationStatuses(): string[] {
  return Object.values(USER_VERIFICATION_STATUS);
}

/**
 * Get all user verification methods
 */
export function getAllUserVerificationMethods(): string[] {
  return Object.values(USER_VERIFICATION_METHOD);
}

/**
 * Get all user verification levels
 */
export function getAllUserVerificationLevels(): string[] {
  return Object.values(USER_VERIFICATION_LEVEL);
}

/**
 * Get all user verification document types
 */
export function getAllUserVerificationDocumentTypes(): string[] {
  return Object.values(USER_VERIFICATION_DOCUMENT_TYPE);
}

/**
 * Get identity verification types
 */
export function getIdentityUserVerificationTypes(): string[] {
  return [USER_VERIFICATION_TYPE.IDENTITY, USER_VERIFICATION_TYPE.AGE];
}

/**
 * Get document verification types
 */
export function getDocumentUserVerificationTypes(): string[] {
  return [
    USER_VERIFICATION_TYPE.DOCUMENT,
    USER_VERIFICATION_TYPE.BUSINESS,
    USER_VERIFICATION_TYPE.TAX_ID,
    USER_VERIFICATION_TYPE.BANK_ACCOUNT,
  ];
}

/**
 * Get contact verification types
 */
export function getContactUserVerificationTypes(): string[] {
  return [USER_VERIFICATION_TYPE.EMAIL, USER_VERIFICATION_TYPE.PHONE];
}

/**
 * Get security verification types
 */
export function getSecurityUserVerificationTypes(): string[] {
  return [
    USER_VERIFICATION_TYPE.TWO_FA,
    USER_VERIFICATION_TYPE.BIOMETRIC,
    USER_VERIFICATION_TYPE.DEVICE,
  ];
}

/**
 * Get required documents for verification level
 */
export const USER_VERIFICATION_LEVEL_DOCUMENTS: Record<string, string[]> = {
  [USER_VERIFICATION_LEVEL.LEVEL_0]: [],
  [USER_VERIFICATION_LEVEL.LEVEL_1]: [USER_VERIFICATION_TYPE.EMAIL, USER_VERIFICATION_TYPE.PHONE],
  [USER_VERIFICATION_LEVEL.LEVEL_2]: [
    USER_VERIFICATION_TYPE.EMAIL,
    USER_VERIFICATION_TYPE.PHONE,
    USER_VERIFICATION_TYPE.IDENTITY,
  ],
  [USER_VERIFICATION_LEVEL.LEVEL_3]: [
    USER_VERIFICATION_TYPE.EMAIL,
    USER_VERIFICATION_TYPE.PHONE,
    USER_VERIFICATION_TYPE.IDENTITY,
    USER_VERIFICATION_TYPE.ADDRESS,
  ],
  [USER_VERIFICATION_LEVEL.LEVEL_4]: [
    USER_VERIFICATION_TYPE.EMAIL,
    USER_VERIFICATION_TYPE.PHONE,
    USER_VERIFICATION_TYPE.IDENTITY,
    USER_VERIFICATION_TYPE.ADDRESS,
    USER_VERIFICATION_TYPE.DOCUMENT,
  ],
  [USER_VERIFICATION_LEVEL.LEVEL_5]: [
    USER_VERIFICATION_TYPE.EMAIL,
    USER_VERIFICATION_TYPE.PHONE,
    USER_VERIFICATION_TYPE.IDENTITY,
    USER_VERIFICATION_TYPE.ADDRESS,
    USER_VERIFICATION_TYPE.DOCUMENT,
    USER_VERIFICATION_TYPE.BUSINESS,
    USER_VERIFICATION_TYPE.TAX_ID,
  ],
};

/**
 * Get required documents for verification level
 */
export function getUserVerificationLevelDocuments(level: string): string[] {
  return USER_VERIFICATION_LEVEL_DOCUMENTS[level] || [];
}

/**
 * User verification config
 * Default configuration for verification
 */
export const USER_VERIFICATION_CONFIG = {
  /** OTP code length */
  OTP_LENGTH: 6,
  /** OTP expiry in seconds */
  OTP_EXPIRY: 300,
  /** Magic link expiry in seconds */
  MAGIC_LINK_EXPIRY: 900,
  /** Verification token expiry in seconds */
  TOKEN_EXPIRY: 3600,
  /** Maximum verification attempts */
  MAX_ATTEMPTS: 5,
  /** Resend cooldown in seconds */
  RESEND_COOLDOWN: 30,
  /** Verification timeout in seconds */
  TIMEOUT: 600,
  /** Maximum documents per verification */
  MAX_DOCUMENTS: 5,
  /** Maximum file size per document in MB */
  MAX_FILE_SIZE: 10,
} as const;

/**
 * Get verification config
 */
export function getUserVerificationConfig(): typeof USER_VERIFICATION_CONFIG {
  return USER_VERIFICATION_CONFIG;
}
