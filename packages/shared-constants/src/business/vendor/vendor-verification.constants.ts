/**
 * Vendor Verification Constants
 * ভেন্ডর ভেরিফিকেশন সম্পর্কিত কনস্ট্যান্টস (কমন ফোল্ডার থেকে রি-এক্সপোর্ট)
 */

import {
  VERIFICATION,
  VerificationStatus,
  VerificationType,
  VerificationMethod,
} from '../../common';

// কমন ফোল্ডার থেকে সবকিছু রি-এক্সপোর্ট করা
export { VERIFICATION, VerificationStatus, VerificationType, VerificationMethod };

// ভেন্ডর স্পেসিফিক অতিরিক্ত কনস্ট্যান্টস
export const VENDOR_VERIFICATION = {
  ...VERIFICATION,
  // Vendor specific verification types
  TYPES: {
    ...VERIFICATION.TYPES,
    BUSINESS_LICENSE: 'business_license',
    TRADE_LICENSE: 'trade_license',
    TIN: 'tin',
    BANK_ACCOUNT: 'bank_account',
  },
} as const;

export type VendorVerificationStatus = VerificationStatus;
export type VendorVerificationType = VerificationType;
export type VendorVerificationMethod = VerificationMethod;
