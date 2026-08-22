/**
 * User KYC Constants
 * Core user KYC (Know Your Customer) verification-related constants
 */

import { USER_KYC_TYPE } from './user-kyc-type.constants';
import { USER_KYC_STATUS } from './user-kyc-status.constants';

// Document types
export const DOCUMENT_TYPES = {
  NID: 'nid',
  PASSPORT: 'passport',
  BIRTH_CERTIFICATE: 'birth-certificate',
  DRIVING_LICENSE: 'driving-license',
  UTILITY_BILL: 'utility-bill',
  BANK_STATEMENT: 'bank-statement',
  TAX_RETURN: 'tax-return',
  INCOME_CERTIFICATE: 'income-certificate',
  BUSINESS_LICENSE: 'business-license',
  TRADE_LICENSE: 'trade-license',
  VAT_REGISTRATION: 'vat-registration',
  TIN_CERTIFICATE: 'tin-certificate',
  COMPANY_REGISTRATION: 'company-registration',
  SHAREHOLDER_AGREEMENT: 'shareholder-agreement',
  MEMORANDUM: 'memorandum',
  ARTICLES_OF_ASSOCIATION: 'articles-of-association',
} as const;

export type UserKYCDocumentType = (typeof DOCUMENT_TYPES)[keyof typeof DOCUMENT_TYPES];

export const USER_KYC = {
  // Default values
  DEFAULTS: {
    STATUS: USER_KYC_STATUS.PENDING,
    TYPE: USER_KYC_TYPE.NID,
    LEVEL: 1,
    IS_VERIFIED: false,
    EXPIRY_DAYS: 365,
  },

  // KYC levels
  LEVELS: {
    LEVEL_1: 1, // Basic - NID/Passport
    LEVEL_2: 2, // Intermediate - Address verification
    LEVEL_3: 3, // Advanced - Income verification
    LEVEL_4: 4, // Full - Business verification
  },

  // KYC level requirements
  LEVEL_REQUIREMENTS: {
    [1]: {
      requiredTypes: [USER_KYC_TYPE.NID] as readonly UserKYCDocumentType[],
      requiredDocuments: 1,
      description: 'Basic KYC - Identity verification',
    },
    [2]: {
      requiredTypes: [USER_KYC_TYPE.NID, USER_KYC_TYPE.ADDRESS] as readonly UserKYCDocumentType[],
      requiredDocuments: 2,
      description: 'Intermediate KYC - Identity and address verification',
    },
    [3]: {
      requiredTypes: [
        USER_KYC_TYPE.NID,
        USER_KYC_TYPE.ADDRESS,
        USER_KYC_TYPE.INCOME,
      ] as readonly UserKYCDocumentType[],
      requiredDocuments: 3,
      description: 'Advanced KYC - Identity, address and income verification',
    },
    [4]: {
      requiredTypes: [
        USER_KYC_TYPE.NID,
        USER_KYC_TYPE.ADDRESS,
        USER_KYC_TYPE.INCOME,
        USER_KYC_TYPE.BUSINESS,
      ] as readonly UserKYCDocumentType[],
      requiredDocuments: 4,
      description: 'Full KYC - Complete business verification',
    },
  },

  // Document fields
  FIELDS: {
    ID: 'id',
    USER_ID: 'userId',
    TYPE: 'type',
    STATUS: 'status',
    LEVEL: 'level',
    DOCUMENT_TYPE: 'documentType',
    DOCUMENT_NUMBER: 'documentNumber',
    DOCUMENT_URL: 'documentUrl',
    FRONT_IMAGE: 'frontImage',
    BACK_IMAGE: 'backImage',
    SELFIE_IMAGE: 'selfieImage',
    ISSUE_DATE: 'issueDate',
    EXPIRY_DATE: 'expiryDate',
    VERIFIED_AT: 'verifiedAt',
    REJECTED_AT: 'rejectedAt',
    REJECTION_REASON: 'rejectionReason',
    VERIFIED_BY: 'verifiedBy',
    SUBMITTED_AT: 'submittedAt',
    CREATED_AT: 'createdAt',
    UPDATED_AT: 'updatedAt',
    REVIEWER_COMMENTS: 'reviewerComments',
    IP_ADDRESS: 'ipAddress',
    USER_AGENT: 'userAgent',
  },

  // Verification status messages
  STATUS_MESSAGES: {
    [USER_KYC_STATUS.PENDING]: 'KYC verification is pending',
    [USER_KYC_STATUS.SUBMITTED]: 'KYC documents submitted',
    [USER_KYC_STATUS.REVIEWING]: 'KYC documents under review',
    [USER_KYC_STATUS.VERIFIED]: 'KYC verification completed successfully',
    [USER_KYC_STATUS.REJECTED]: 'KYC verification was rejected',
    [USER_KYC_STATUS.EXPIRED]: 'KYC verification has expired',
    [USER_KYC_STATUS.REVOKED]: 'KYC verification was revoked',
  },

  // Document validation rules
  VALIDATION: {
    ALLOWED_FILE_TYPES: ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'] as const,
    MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
    MIN_FILE_SIZE: 10 * 1024, // 10KB
    REQUIRED_FIELDS: ['documentNumber', 'documentType', 'frontImage'] as const,
  },

  // Expiry periods (in days)
  EXPIRY_PERIODS: {
    NID: 365,
    PASSPORT: 365,
    DRIVING_LICENSE: 365,
    UTILITY_BILL: 90,
    BANK_STATEMENT: 90,
    TAX_RETURN: 180,
    BUSINESS_LICENSE: 365,
    TRADE_LICENSE: 365,
  },
} as const;

export type UserKYCLevel = (typeof USER_KYC.LEVELS)[keyof typeof USER_KYC.LEVELS];
export type UserKYCValidationFileType = (typeof USER_KYC.VALIDATION.ALLOWED_FILE_TYPES)[number];

export function getKYCLevelLabel(level: UserKYCLevel): string {
  const labels: Record<UserKYCLevel, string> = {
    [USER_KYC.LEVELS.LEVEL_1]: 'Level 1 - Basic',
    [USER_KYC.LEVELS.LEVEL_2]: 'Level 2 - Intermediate',
    [USER_KYC.LEVELS.LEVEL_3]: 'Level 3 - Advanced',
    [USER_KYC.LEVELS.LEVEL_4]: 'Level 4 - Full',
  };
  return labels[level] || 'Unknown';
}

export function getKYCDocumentTypeLabel(documentType: UserKYCDocumentType): string {
  const labels: Record<UserKYCDocumentType, string> = {
    [DOCUMENT_TYPES.NID]: 'National ID Card',
    [DOCUMENT_TYPES.PASSPORT]: 'Passport',
    [DOCUMENT_TYPES.BIRTH_CERTIFICATE]: 'Birth Certificate',
    [DOCUMENT_TYPES.DRIVING_LICENSE]: 'Driving License',
    [DOCUMENT_TYPES.UTILITY_BILL]: 'Utility Bill',
    [DOCUMENT_TYPES.BANK_STATEMENT]: 'Bank Statement',
    [DOCUMENT_TYPES.TAX_RETURN]: 'Tax Return',
    [DOCUMENT_TYPES.INCOME_CERTIFICATE]: 'Income Certificate',
    [DOCUMENT_TYPES.BUSINESS_LICENSE]: 'Business License',
    [DOCUMENT_TYPES.TRADE_LICENSE]: 'Trade License',
    [DOCUMENT_TYPES.VAT_REGISTRATION]: 'VAT Registration',
    [DOCUMENT_TYPES.TIN_CERTIFICATE]: 'TIN Certificate',
    [DOCUMENT_TYPES.COMPANY_REGISTRATION]: 'Company Registration',
    [DOCUMENT_TYPES.SHAREHOLDER_AGREEMENT]: 'Shareholder Agreement',
    [DOCUMENT_TYPES.MEMORANDUM]: 'Memorandum',
    [DOCUMENT_TYPES.ARTICLES_OF_ASSOCIATION]: 'Articles of Association',
  };
  return labels[documentType] || 'Unknown';
}

export function getKYCStatusMessage(status: string): string {
  return (
    USER_KYC.STATUS_MESSAGES[status as keyof typeof USER_KYC.STATUS_MESSAGES] || 'Unknown status'
  );
}

export function isKYCComplete(status: string): boolean {
  return status === USER_KYC_STATUS.VERIFIED;
}

export function isKYCPending(status: string): boolean {
  return status === USER_KYC_STATUS.PENDING || status === USER_KYC_STATUS.SUBMITTED;
}

export function isKYCUnderReview(status: string): boolean {
  return status === USER_KYC_STATUS.REVIEWING;
}

export function isKYCRejected(status: string): boolean {
  return status === USER_KYC_STATUS.REJECTED;
}

export function isKYCExpired(status: string): boolean {
  return status === USER_KYC_STATUS.EXPIRED;
}

export function canSubmitKYC(status: string): boolean {
  return (
    status === USER_KYC_STATUS.PENDING ||
    status === USER_KYC_STATUS.REJECTED ||
    status === USER_KYC_STATUS.EXPIRED
  );
}

export function getRequiredDocumentTypes(level: UserKYCLevel): readonly UserKYCDocumentType[] {
  const requirements =
    USER_KYC.LEVEL_REQUIREMENTS[level as keyof typeof USER_KYC.LEVEL_REQUIREMENTS];
  if (requirements) {
    return requirements.requiredTypes;
  }
  return [];
}

export function getKYCLevelFromDocumentCount(documentCount: number): UserKYCLevel {
  if (documentCount >= 4) return USER_KYC.LEVELS.LEVEL_4;
  if (documentCount >= 3) return USER_KYC.LEVELS.LEVEL_3;
  if (documentCount >= 2) return USER_KYC.LEVELS.LEVEL_2;
  return USER_KYC.LEVELS.LEVEL_1;
}

export function getKYCLevelRequirements(
  level: UserKYCLevel
): (typeof USER_KYC.LEVEL_REQUIREMENTS)[keyof typeof USER_KYC.LEVEL_REQUIREMENTS] | null {
  return USER_KYC.LEVEL_REQUIREMENTS[level as keyof typeof USER_KYC.LEVEL_REQUIREMENTS] || null;
}

export function validateKYCFile(fileType: string, fileSize: number): boolean {
  const allowedTypes = USER_KYC.VALIDATION.ALLOWED_FILE_TYPES;
  const maxSize = USER_KYC.VALIDATION.MAX_FILE_SIZE;
  const minSize = USER_KYC.VALIDATION.MIN_FILE_SIZE;

  return (
    allowedTypes.includes(fileType as UserKYCValidationFileType) &&
    fileSize <= maxSize &&
    fileSize >= minSize
  );
}

export function getDocumentExpiryDays(documentType: UserKYCDocumentType): number {
  return (
    USER_KYC.EXPIRY_PERIODS[documentType as keyof typeof USER_KYC.EXPIRY_PERIODS] ||
    USER_KYC.DEFAULTS.EXPIRY_DAYS
  );
}

export function isDocumentExpired(expiryDate: Date): boolean {
  return new Date() > expiryDate;
}

export function getKYCLevelDescription(level: UserKYCLevel): string {
  const requirements = getKYCLevelRequirements(level);
  return requirements?.description || '';
}

export function getRequiredDocumentsForLevel(level: UserKYCLevel): number {
  const requirements = getKYCLevelRequirements(level);
  return requirements?.requiredDocuments || 0;
}

export function isLevelComplete(currentLevel: UserKYCLevel, targetLevel: UserKYCLevel): boolean {
  return currentLevel >= targetLevel;
}
