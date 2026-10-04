export const USER_KYC_STATUS = {
  NOT_STARTED: 'not_started',
  PENDING: 'pending',
  IN_REVIEW: 'in_review',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  EXPIRED: 'expired',
  RESUBMITTED: 'resubmitted',
} as const;

export const USER_KYC_LEVEL = {
  NONE: 0,
  BASIC: 1,
  INTERMEDIATE: 2,
  ADVANCED: 3,
  FULL: 4,
} as const;

export const USER_KYC_DOCUMENT = {
  NID: 'nid',
  PASSPORT: 'passport',
  DRIVING_LICENSE: 'driving_license',
  BIRTH_CERTIFICATE: 'birth_certificate',
  UTILITY_BILL: 'utility_bill',
  BANK_STATEMENT: 'bank_statement',
  TIN_CERTIFICATE: 'tin_certificate',
} as const;

export const USER_KYC = {
  MAX_DOCUMENT_SIZE_MB: 10,
  MAX_DOCUMENTS: 10,
  REVIEW_SLA_HOURS: 48,
  EXPIRY_DAYS: 365,
} as const;

export type UserKycStatusType = (typeof USER_KYC_STATUS)[keyof typeof USER_KYC_STATUS];
export type UserKycLevelType = (typeof USER_KYC_LEVEL)[keyof typeof USER_KYC_LEVEL];
export type UserKycDocumentType = (typeof USER_KYC_DOCUMENT)[keyof typeof USER_KYC_DOCUMENT];
