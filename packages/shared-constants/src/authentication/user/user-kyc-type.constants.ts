// External libraries
// No external libraries needed

// Shared packages
// No shared packages needed

// Project files
// No project files needed

/**
 * KYC document type enum
 */
export const USER_KYC_TYPE = {
  NID: 'nid',
  PASSPORT: 'passport',
  DRIVING_LICENSE: 'driving_license',
  BIRTH_CERTIFICATE: 'birth_certificate',
  VOTER_ID: 'voter_id',
  TAX_ID: 'tax_id',
  BUSINESS_LICENSE: 'business_license',
  TRADE_LICENSE: 'trade_license',
  COMPANY_REGISTRATION: 'company_registration',
  UTILITY_BILL: 'utility_bill',
} as const;

/**
 * National Identity Card (NID)
 */
export const USER_KYC_TYPE_NID = USER_KYC_TYPE.NID;

/**
 * Passport
 */
export const USER_KYC_TYPE_PASSPORT = USER_KYC_TYPE.PASSPORT;

/**
 * Driving License
 */
export const USER_KYC_TYPE_DRIVING_LICENSE = USER_KYC_TYPE.DRIVING_LICENSE;

/**
 * Birth Certificate
 */
export const USER_KYC_TYPE_BIRTH_CERTIFICATE = USER_KYC_TYPE.BIRTH_CERTIFICATE;

/**
 * Voter ID
 */
export const USER_KYC_TYPE_VOTER_ID = USER_KYC_TYPE.VOTER_ID;

/**
 * Tax ID
 */
export const USER_KYC_TYPE_TAX_ID = USER_KYC_TYPE.TAX_ID;

/**
 * Business License
 */
export const USER_KYC_TYPE_BUSINESS_LICENSE = USER_KYC_TYPE.BUSINESS_LICENSE;

/**
 * Trade License
 */
export const USER_KYC_TYPE_TRADE_LICENSE = USER_KYC_TYPE.TRADE_LICENSE;

/**
 * Company Registration
 */
export const USER_KYC_TYPE_COMPANY_REGISTRATION = USER_KYC_TYPE.COMPANY_REGISTRATION;

/**
 * Utility Bill (for address proof)
 */
export const USER_KYC_TYPE_UTILITY_BILL = USER_KYC_TYPE.UTILITY_BILL;

/**
 * Type for KYC document type
 */
export type UserKycType = (typeof USER_KYC_TYPE)[keyof typeof USER_KYC_TYPE];
