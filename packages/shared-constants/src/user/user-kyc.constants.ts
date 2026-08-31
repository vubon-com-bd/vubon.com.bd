/**
 * User KYC Constants
 * All possible user KYC (Know Your Customer) related constants in the system
 * Imports common values where applicable
 */

import { STATUS } from '../common/status.constants';

/**
 * User KYC status
 * Status of user KYC verification
 */
export const USER_KYC_STATUS = {
  /** KYC not submitted */
  NOT_SUBMITTED: 'not_submitted',
  /** KYC is pending review */
  PENDING: STATUS.PENDING,
  /** KYC is in progress */
  IN_PROGRESS: 'in_progress',
  /** KYC is approved */
  APPROVED: STATUS.APPROVED,
  /** KYC is rejected */
  REJECTED: STATUS.REJECTED,
  /** KYC requires additional information */
  REQUIRES_INFO: 'requires_info',
  /** KYC has expired */
  EXPIRED: STATUS.EXPIRED,
  /** KYC is on hold */
  ON_HOLD: STATUS.ON_HOLD,
  /** KYC requires manual review */
  REQUIRES_REVIEW: 'requires_review',
  /** KYC is flagged for suspicious activity */
  FLAGGED: 'flagged',
  /** KYC is suspended */
  SUSPENDED: STATUS.SUSPENDED,
} as const;

/**
 * User KYC level
 * Levels of KYC verification
 */
export const USER_KYC_LEVEL = {
  /** No KYC (Anonymous) */
  LEVEL_0: 'level_0',
  /** Basic KYC (Name, Email, Phone) */
  LEVEL_1: 'level_1',
  /** Standard KYC (Identity verification) */
  LEVEL_2: 'level_2',
  /** Enhanced KYC (Address verification) */
  LEVEL_3: 'level_3',
  /** Full KYC (All documents) */
  LEVEL_4: 'level_4',
  /** Premium KYC (Business verification) */
  LEVEL_5: 'level_5',
} as const;

/**
 * User KYC document type
 * Types of documents accepted for KYC
 */
export const USER_KYC_DOCUMENT_TYPE = {
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
  /** Incorporation certificate */
  INCORPORATION_CERTIFICATE: 'incorporation_certificate',
  /** Shareholders agreement */
  SHAREHOLDERS_AGREEMENT: 'shareholders_agreement',
  /** Board resolution */
  BOARD_RESOLUTION: 'board_resolution',
} as const;

/**
 * User KYC document status
 * Status of individual KYC documents
 */
export const USER_KYC_DOCUMENT_STATUS = {
  /** Document uploaded */
  UPLOADED: 'uploaded',
  /** Document is being processed */
  PROCESSING: 'processing',
  /** Document is verified */
  VERIFIED: STATUS.VERIFIED,
  /** Document is rejected */
  REJECTED: STATUS.REJECTED,
  /** Document has expired */
  EXPIRED: STATUS.EXPIRED,
  /** Document requires review */
  REQUIRES_REVIEW: 'requires_review',
  /** Document is on hold */
  ON_HOLD: STATUS.ON_HOLD,
  /** Document is flagged */
  FLAGGED: 'flagged',
} as const;

/**
 * User KYC risk level
 * Risk assessment levels
 */
export const USER_KYC_RISK_LEVEL = {
  /** Low risk */
  LOW: 'low',
  /** Medium risk */
  MEDIUM: 'medium',
  /** High risk */
  HIGH: 'high',
  /** Very high risk */
  VERY_HIGH: 'very_high',
  /** Critical risk */
  CRITICAL: 'critical',
} as const;

/**
 * User KYC rejection reason
 * Reasons for KYC rejection
 */
export const USER_KYC_REJECTION_REASON = {
  /** Document is unclear */
  DOCUMENT_UNCLEAR: 'document_unclear',
  /** Document is expired */
  DOCUMENT_EXPIRED: 'document_expired',
  /** Document is forged */
  DOCUMENT_FORGED: 'document_forged',
  /** Document is invalid */
  DOCUMENT_INVALID: 'document_invalid',
  /** Information mismatch */
  INFO_MISMATCH: 'info_mismatch',
  /** Insufficient information */
  INSUFFICIENT_INFO: 'insufficient_info',
  /** Suspicious activity */
  SUSPICIOUS_ACTIVITY: 'suspicious_activity',
  /** Sanctions list match */
  SANCTIONS_MATCH: 'sanctions_match',
  /** PEP (Politically Exposed Person) */
  PEP: 'pep',
  /** Adverse media found */
  ADVERSE_MEDIA: 'adverse_media',
  /** Duplicate submission */
  DUPLICATE: 'duplicate',
  /** Age restriction */
  AGE_RESTRICTION: 'age_restriction',
  /** Country restriction */
  COUNTRY_RESTRICTION: 'country_restriction',
  /** Other reason */
  OTHER: 'other',
} as const;

/**
 * User KYC status labels
 * Human-readable labels for UI
 */
export const USER_KYC_STATUS_LABELS: Record<string, string> = {
  [USER_KYC_STATUS.NOT_SUBMITTED]: 'Not Submitted',
  [USER_KYC_STATUS.PENDING]: 'Pending',
  [USER_KYC_STATUS.IN_PROGRESS]: 'In Progress',
  [USER_KYC_STATUS.APPROVED]: 'Approved',
  [USER_KYC_STATUS.REJECTED]: 'Rejected',
  [USER_KYC_STATUS.REQUIRES_INFO]: 'Requires Additional Info',
  [USER_KYC_STATUS.EXPIRED]: 'Expired',
  [USER_KYC_STATUS.ON_HOLD]: 'On Hold',
  [USER_KYC_STATUS.REQUIRES_REVIEW]: 'Requires Review',
  [USER_KYC_STATUS.FLAGGED]: 'Flagged',
  [USER_KYC_STATUS.SUSPENDED]: 'Suspended',
};

/**
 * User KYC level labels
 */
export const USER_KYC_LEVEL_LABELS: Record<string, string> = {
  [USER_KYC_LEVEL.LEVEL_0]: 'No KYC',
  [USER_KYC_LEVEL.LEVEL_1]: 'Basic KYC',
  [USER_KYC_LEVEL.LEVEL_2]: 'Standard KYC',
  [USER_KYC_LEVEL.LEVEL_3]: 'Enhanced KYC',
  [USER_KYC_LEVEL.LEVEL_4]: 'Full KYC',
  [USER_KYC_LEVEL.LEVEL_5]: 'Premium KYC',
};

/**
 * User KYC document type labels
 */
export const USER_KYC_DOCUMENT_TYPE_LABELS: Record<string, string> = {
  [USER_KYC_DOCUMENT_TYPE.NATIONAL_ID]: 'National ID Card',
  [USER_KYC_DOCUMENT_TYPE.PASSPORT]: 'Passport',
  [USER_KYC_DOCUMENT_TYPE.DRIVERS_LICENSE]: "Driver's License",
  [USER_KYC_DOCUMENT_TYPE.VOTER_ID]: 'Voter ID',
  [USER_KYC_DOCUMENT_TYPE.BIRTH_CERTIFICATE]: 'Birth Certificate',
  [USER_KYC_DOCUMENT_TYPE.UTILITY_BILL]: 'Utility Bill',
  [USER_KYC_DOCUMENT_TYPE.BANK_STATEMENT]: 'Bank Statement',
  [USER_KYC_DOCUMENT_TYPE.TAX_ID]: 'Tax ID Document',
  [USER_KYC_DOCUMENT_TYPE.BUSINESS_REGISTRATION]: 'Business Registration',
  [USER_KYC_DOCUMENT_TYPE.TRADE_LICENSE]: 'Trade License',
  [USER_KYC_DOCUMENT_TYPE.TIN_CERTIFICATE]: 'TIN Certificate',
  [USER_KYC_DOCUMENT_TYPE.COMPANY_PROFILE]: 'Company Profile',
  [USER_KYC_DOCUMENT_TYPE.FINANCIAL_STATEMENT]: 'Financial Statement',
  [USER_KYC_DOCUMENT_TYPE.INCORPORATION_CERTIFICATE]: 'Incorporation Certificate',
  [USER_KYC_DOCUMENT_TYPE.SHAREHOLDERS_AGREEMENT]: "Shareholders' Agreement",
  [USER_KYC_DOCUMENT_TYPE.BOARD_RESOLUTION]: 'Board Resolution',
};

/**
 * User KYC document status labels
 */
export const USER_KYC_DOCUMENT_STATUS_LABELS: Record<string, string> = {
  [USER_KYC_DOCUMENT_STATUS.UPLOADED]: 'Uploaded',
  [USER_KYC_DOCUMENT_STATUS.PROCESSING]: 'Processing',
  [USER_KYC_DOCUMENT_STATUS.VERIFIED]: 'Verified',
  [USER_KYC_DOCUMENT_STATUS.REJECTED]: 'Rejected',
  [USER_KYC_DOCUMENT_STATUS.EXPIRED]: 'Expired',
  [USER_KYC_DOCUMENT_STATUS.REQUIRES_REVIEW]: 'Requires Review',
  [USER_KYC_DOCUMENT_STATUS.ON_HOLD]: 'On Hold',
  [USER_KYC_DOCUMENT_STATUS.FLAGGED]: 'Flagged',
};

/**
 * User KYC risk level labels
 */
export const USER_KYC_RISK_LEVEL_LABELS: Record<string, string> = {
  [USER_KYC_RISK_LEVEL.LOW]: 'Low Risk',
  [USER_KYC_RISK_LEVEL.MEDIUM]: 'Medium Risk',
  [USER_KYC_RISK_LEVEL.HIGH]: 'High Risk',
  [USER_KYC_RISK_LEVEL.VERY_HIGH]: 'Very High Risk',
  [USER_KYC_RISK_LEVEL.CRITICAL]: 'Critical Risk',
};

/**
 * User KYC rejection reason labels
 */
export const USER_KYC_REJECTION_REASON_LABELS: Record<string, string> = {
  [USER_KYC_REJECTION_REASON.DOCUMENT_UNCLEAR]: 'Document is Unclear',
  [USER_KYC_REJECTION_REASON.DOCUMENT_EXPIRED]: 'Document has Expired',
  [USER_KYC_REJECTION_REASON.DOCUMENT_FORGED]: 'Document appears Forged',
  [USER_KYC_REJECTION_REASON.DOCUMENT_INVALID]: 'Document is Invalid',
  [USER_KYC_REJECTION_REASON.INFO_MISMATCH]: 'Information Mismatch',
  [USER_KYC_REJECTION_REASON.INSUFFICIENT_INFO]: 'Insufficient Information',
  [USER_KYC_REJECTION_REASON.SUSPICIOUS_ACTIVITY]: 'Suspicious Activity Detected',
  [USER_KYC_REJECTION_REASON.SANCTIONS_MATCH]: 'Sanctions List Match',
  [USER_KYC_REJECTION_REASON.PEP]: 'Politically Exposed Person',
  [USER_KYC_REJECTION_REASON.ADVERSE_MEDIA]: 'Adverse Media Found',
  [USER_KYC_REJECTION_REASON.DUPLICATE]: 'Duplicate Submission',
  [USER_KYC_REJECTION_REASON.AGE_RESTRICTION]: 'Age Restriction',
  [USER_KYC_REJECTION_REASON.COUNTRY_RESTRICTION]: 'Country Restriction',
  [USER_KYC_REJECTION_REASON.OTHER]: 'Other Reason',
};

/**
 * Check if user KYC status is valid
 */
export function isValidUserKycStatus(status: string): boolean {
  return Object.values(USER_KYC_STATUS).includes(
    status as (typeof USER_KYC_STATUS)[keyof typeof USER_KYC_STATUS]
  );
}

/**
 * Check if user KYC level is valid
 */
export function isValidUserKycLevel(level: string): boolean {
  return Object.values(USER_KYC_LEVEL).includes(
    level as (typeof USER_KYC_LEVEL)[keyof typeof USER_KYC_LEVEL]
  );
}

/**
 * Check if user KYC document type is valid
 */
export function isValidUserKycDocumentType(type: string): boolean {
  return Object.values(USER_KYC_DOCUMENT_TYPE).includes(
    type as (typeof USER_KYC_DOCUMENT_TYPE)[keyof typeof USER_KYC_DOCUMENT_TYPE]
  );
}

/**
 * Check if user KYC document status is valid
 */
export function isValidUserKycDocumentStatus(status: string): boolean {
  return Object.values(USER_KYC_DOCUMENT_STATUS).includes(
    status as (typeof USER_KYC_DOCUMENT_STATUS)[keyof typeof USER_KYC_DOCUMENT_STATUS]
  );
}

/**
 * Check if user KYC risk level is valid
 */
export function isValidUserKycRiskLevel(level: string): boolean {
  return Object.values(USER_KYC_RISK_LEVEL).includes(
    level as (typeof USER_KYC_RISK_LEVEL)[keyof typeof USER_KYC_RISK_LEVEL]
  );
}

/**
 * Check if user KYC rejection reason is valid
 */
export function isValidUserKycRejectionReason(reason: string): boolean {
  return Object.values(USER_KYC_REJECTION_REASON).includes(
    reason as (typeof USER_KYC_REJECTION_REASON)[keyof typeof USER_KYC_REJECTION_REASON]
  );
}

/**
 * Get user KYC status label
 */
export function getUserKycStatusLabel(status: string): string {
  return USER_KYC_STATUS_LABELS[status] || status;
}

/**
 * Get user KYC level label
 */
export function getUserKycLevelLabel(level: string): string {
  return USER_KYC_LEVEL_LABELS[level] || level;
}

/**
 * Get user KYC document type label
 */
export function getUserKycDocumentTypeLabel(type: string): string {
  return USER_KYC_DOCUMENT_TYPE_LABELS[type] || type;
}

/**
 * Get user KYC document status label
 */
export function getUserKycDocumentStatusLabel(status: string): string {
  return USER_KYC_DOCUMENT_STATUS_LABELS[status] || status;
}

/**
 * Get user KYC risk level label
 */
export function getUserKycRiskLevelLabel(level: string): string {
  return USER_KYC_RISK_LEVEL_LABELS[level] || level;
}

/**
 * Get user KYC rejection reason label
 */
export function getUserKycRejectionReasonLabel(reason: string): string {
  return USER_KYC_REJECTION_REASON_LABELS[reason] || reason;
}

/**
 * Check if KYC is approved
 */
export function isUserKycApproved(status: string): boolean {
  return status === USER_KYC_STATUS.APPROVED;
}

/**
 * Check if KYC is pending
 */
export function isUserKycPending(status: string): boolean {
  return (
    status === USER_KYC_STATUS.PENDING ||
    status === USER_KYC_STATUS.IN_PROGRESS ||
    status === USER_KYC_STATUS.REQUIRES_INFO ||
    status === USER_KYC_STATUS.REQUIRES_REVIEW
  );
}

/**
 * Check if KYC is rejected
 */
export function isUserKycRejected(status: string): boolean {
  return (
    status === USER_KYC_STATUS.REJECTED ||
    status === USER_KYC_STATUS.EXPIRED ||
    status === USER_KYC_STATUS.FLAGGED
  );
}

/**
 * Check if KYC is active
 */
export function isUserKycActive(status: string): boolean {
  return (
    status === USER_KYC_STATUS.PENDING ||
    status === USER_KYC_STATUS.IN_PROGRESS ||
    status === USER_KYC_STATUS.REQUIRES_INFO ||
    status === USER_KYC_STATUS.APPROVED
  );
}

/**
 * Get all user KYC statuses
 */
export function getAllUserKycStatuses(): string[] {
  return Object.values(USER_KYC_STATUS);
}

/**
 * Get all user KYC levels
 */
export function getAllUserKycLevels(): string[] {
  return Object.values(USER_KYC_LEVEL);
}

/**
 * Get all user KYC document types
 */
export function getAllUserKycDocumentTypes(): string[] {
  return Object.values(USER_KYC_DOCUMENT_TYPE);
}

/**
 * Get all user KYC document statuses
 */
export function getAllUserKycDocumentStatuses(): string[] {
  return Object.values(USER_KYC_DOCUMENT_STATUS);
}

/**
 * Get all user KYC risk levels
 */
export function getAllUserKycRiskLevels(): string[] {
  return Object.values(USER_KYC_RISK_LEVEL);
}

/**
 * Get all user KYC rejection reasons
 */
export function getAllUserKycRejectionReasons(): string[] {
  return Object.values(USER_KYC_REJECTION_REASON);
}

/**
 * Get KYC document types by level
 */
export const USER_KYC_LEVEL_DOCUMENTS: Record<string, string[]> = {
  [USER_KYC_LEVEL.LEVEL_0]: [],
  [USER_KYC_LEVEL.LEVEL_1]: [USER_KYC_DOCUMENT_TYPE.NATIONAL_ID],
  [USER_KYC_LEVEL.LEVEL_2]: [
    USER_KYC_DOCUMENT_TYPE.NATIONAL_ID,
    USER_KYC_DOCUMENT_TYPE.PASSPORT,
    USER_KYC_DOCUMENT_TYPE.DRIVERS_LICENSE,
  ],
  [USER_KYC_LEVEL.LEVEL_3]: [
    USER_KYC_DOCUMENT_TYPE.NATIONAL_ID,
    USER_KYC_DOCUMENT_TYPE.PASSPORT,
    USER_KYC_DOCUMENT_TYPE.DRIVERS_LICENSE,
    USER_KYC_DOCUMENT_TYPE.UTILITY_BILL,
    USER_KYC_DOCUMENT_TYPE.BANK_STATEMENT,
  ],
  [USER_KYC_LEVEL.LEVEL_4]: [
    USER_KYC_DOCUMENT_TYPE.NATIONAL_ID,
    USER_KYC_DOCUMENT_TYPE.PASSPORT,
    USER_KYC_DOCUMENT_TYPE.DRIVERS_LICENSE,
    USER_KYC_DOCUMENT_TYPE.UTILITY_BILL,
    USER_KYC_DOCUMENT_TYPE.BANK_STATEMENT,
    USER_KYC_DOCUMENT_TYPE.TAX_ID,
  ],
  [USER_KYC_LEVEL.LEVEL_5]: [
    USER_KYC_DOCUMENT_TYPE.NATIONAL_ID,
    USER_KYC_DOCUMENT_TYPE.PASSPORT,
    USER_KYC_DOCUMENT_TYPE.DRIVERS_LICENSE,
    USER_KYC_DOCUMENT_TYPE.UTILITY_BILL,
    USER_KYC_DOCUMENT_TYPE.BANK_STATEMENT,
    USER_KYC_DOCUMENT_TYPE.TAX_ID,
    USER_KYC_DOCUMENT_TYPE.BUSINESS_REGISTRATION,
    USER_KYC_DOCUMENT_TYPE.TRADE_LICENSE,
    USER_KYC_DOCUMENT_TYPE.TIN_CERTIFICATE,
    USER_KYC_DOCUMENT_TYPE.COMPANY_PROFILE,
  ],
};

/**
 * Get required documents for KYC level
 */
export function getUserKycLevelDocuments(level: string): string[] {
  return USER_KYC_LEVEL_DOCUMENTS[level] || [];
}

/**
 * KYC verification methods
 */
export const USER_KYC_VERIFICATION_METHOD = {
  /** Manual verification by admin */
  MANUAL: 'manual',
  /** Automated system verification */
  AUTOMATED: 'automated',
  /** Third-party service */
  THIRD_PARTY: 'third_party',
  /** AI-based verification */
  AI: 'ai',
  /** Biometric verification */
  BIOMETRIC: 'biometric',
  /** Video verification */
  VIDEO: 'video',
  /** Live verification */
  LIVE: 'live',
} as const;

/**
 * User KYC verification method labels
 */
export const USER_KYC_VERIFICATION_METHOD_LABELS: Record<string, string> = {
  [USER_KYC_VERIFICATION_METHOD.MANUAL]: 'Manual Verification',
  [USER_KYC_VERIFICATION_METHOD.AUTOMATED]: 'Automated Verification',
  [USER_KYC_VERIFICATION_METHOD.THIRD_PARTY]: 'Third-Party Service',
  [USER_KYC_VERIFICATION_METHOD.AI]: 'AI-Based Verification',
  [USER_KYC_VERIFICATION_METHOD.BIOMETRIC]: 'Biometric Verification',
  [USER_KYC_VERIFICATION_METHOD.VIDEO]: 'Video Verification',
  [USER_KYC_VERIFICATION_METHOD.LIVE]: 'Live Verification',
};

/**
 * Check if KYC verification method is valid
 */
export function isValidUserKycVerificationMethod(method: string): boolean {
  return Object.values(USER_KYC_VERIFICATION_METHOD).includes(
    method as (typeof USER_KYC_VERIFICATION_METHOD)[keyof typeof USER_KYC_VERIFICATION_METHOD]
  );
}

/**
 * Get KYC verification method label
 */
export function getUserKycVerificationMethodLabel(method: string): string {
  return USER_KYC_VERIFICATION_METHOD_LABELS[method] || method;
}

/**
 * Get all KYC verification methods
 */
export function getAllUserKycVerificationMethods(): string[] {
  return Object.values(USER_KYC_VERIFICATION_METHOD);
}
