// External libraries
// No external libraries needed

// Shared packages
// No shared packages needed

// Project files
// No project files needed

/**
 * Maximum document size in MB
 */
export const USER_KYC_MAX_DOCUMENT_SIZE = 10;

/**
 * Allowed document types
 */
export const USER_KYC_ALLOWED_DOCUMENT_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
] as const;

/**
 * Maximum number of documents
 */
export const USER_KYC_MAX_DOCUMENTS = 5;

/**
 * Days before expiry to send warning
 */
export const USER_KYC_EXPIRY_WARNING_DAYS = 30;

/**
 * Review timeout in days
 */
export const USER_KYC_REVIEW_TIMEOUT = 7;

/**
 * KYC statuses
 */
export const USER_KYC_STATUSES = [
  'pending',
  'submitted',
  'reviewing',
  'verified',
  'rejected',
  'expired',
  'failed',
] as const;

/**
 * KYC levels
 */
export const USER_KYC_LEVELS = ['basic', 'intermediate', 'advanced', 'premium'] as const;

/**
 * KYC configuration
 */
export const USER_KYC_CONFIG = {
  MAX_DOCUMENT_SIZE: USER_KYC_MAX_DOCUMENT_SIZE,
  ALLOWED_DOCUMENT_TYPES: USER_KYC_ALLOWED_DOCUMENT_TYPES,
  MAX_DOCUMENTS: USER_KYC_MAX_DOCUMENTS,
  EXPIRY_WARNING_DAYS: USER_KYC_EXPIRY_WARNING_DAYS,
  REVIEW_TIMEOUT: USER_KYC_REVIEW_TIMEOUT,
  STATUSES: USER_KYC_STATUSES,
  LEVELS: USER_KYC_LEVELS,
} as const;

/**
 * Type for allowed document type
 */
export type UserKycAllowedDocumentType = (typeof USER_KYC_ALLOWED_DOCUMENT_TYPES)[number];

/**
 * Type for KYC status
 */
export type UserKycStatus = (typeof USER_KYC_STATUSES)[number];

/**
 * Type for KYC level
 */
export type UserKycLevel = (typeof USER_KYC_LEVELS)[number];

/**
 * Type for KYC configuration
 */
export type UserKycConfig = typeof USER_KYC_CONFIG;
