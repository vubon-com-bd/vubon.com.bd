/**
 * ভেন্ডার ভেরিফিকেশন সংক্রান্ত কনস্ট্যান্টসমূহ
 */

/**
 * ভেরিফিকেশন স্ট্যাটাস অবজেক্ট
 */
export const VerificationStatus = {
  PENDING: 'PENDING',
  IN_PROGRESS: 'IN_PROGRESS',
  VERIFIED: 'VERIFIED',
  FAILED: 'FAILED',
  EXPIRED: 'EXPIRED',
} as const;

/**
 * ভেরিফিকেশন স্ট্যাটাস - ইউনিয়ন টাইপ
 */
export type VerificationStatusValue = (typeof VerificationStatus)[keyof typeof VerificationStatus];

/**
 * ভেরিফিকেশন টাইপ অবজেক্ট
 */
export const VerificationType = {
  EMAIL: 'EMAIL',
  PHONE: 'PHONE',
  IDENTITY: 'IDENTITY',
  BUSINESS: 'BUSINESS',
  ADDRESS: 'ADDRESS',
  TAX: 'TAX',
  BANK: 'BANK',
} as const;

/**
 * ভেরিফিকেশন টাইপ - ইউনিয়ন টাইপ
 */
export type VerificationTypeValue = (typeof VerificationType)[keyof typeof VerificationType];

/**
 * ভেরিফিকেশন চেষ্টার সর্বোচ্চ সংখ্যা
 */
export const VERIFICATION_ATTEMPTS_LIMIT = 3;

/**
 * ভেরিফিকেশন মেয়াদ শেষ হওয়ার দিন সংখ্যা
 */
export const VerificationExpiryDays = 365;

/**
 * ভেরিফিকেশন স্ট্যাটাস লেবেলসমূহ
 */
export const VerificationStatusLabels: Record<VerificationStatusValue, { en: string; bn: string }> =
  {
    [VerificationStatus.PENDING]: {
      en: 'Pending',
      bn: 'অপেক্ষমাণ',
    },
    [VerificationStatus.IN_PROGRESS]: {
      en: 'In Progress',
      bn: 'প্রক্রিয়াধীন',
    },
    [VerificationStatus.VERIFIED]: {
      en: 'Verified',
      bn: 'যাচাইকৃত',
    },
    [VerificationStatus.FAILED]: {
      en: 'Failed',
      bn: 'ব্যর্থ',
    },
    [VerificationStatus.EXPIRED]: {
      en: 'Expired',
      bn: 'মেয়াদোত্তীর্ণ',
    },
  };

/**
 * ভেরিফিকেশন টাইপ লেবেলসমূহ
 */
export const VerificationTypeLabels: Record<VerificationTypeValue, { en: string; bn: string }> = {
  [VerificationType.EMAIL]: {
    en: 'Email Verification',
    bn: 'ইমেইল যাচাই',
  },
  [VerificationType.PHONE]: {
    en: 'Phone Verification',
    bn: 'ফোন যাচাই',
  },
  [VerificationType.IDENTITY]: {
    en: 'Identity Verification',
    bn: 'পরিচয় যাচাই',
  },
  [VerificationType.BUSINESS]: {
    en: 'Business Verification',
    bn: 'ব্যবসা যাচাই',
  },
  [VerificationType.ADDRESS]: {
    en: 'Address Verification',
    bn: 'ঠিকানা যাচাই',
  },
  [VerificationType.TAX]: {
    en: 'Tax Verification',
    bn: 'কর যাচাই',
  },
  [VerificationType.BANK]: {
    en: 'Bank Verification',
    bn: 'ব্যাংক যাচাই',
  },
};

/**
 * ভেরিফিকেশন প্রক্রিয়ার প্রয়োজনীয় ডকুমেন্টসমূহ
 */
export const VerificationRequiredDocuments: Record<VerificationTypeValue, string[]> = {
  [VerificationType.EMAIL]: ['email-confirmation'],
  [VerificationType.PHONE]: ['phone-otp'],
  [VerificationType.IDENTITY]: ['national-id', 'passport', 'drivers-license'],
  [VerificationType.BUSINESS]: [
    'business-license',
    'trade-license',
    'certificate-of-incorporation',
  ],
  [VerificationType.ADDRESS]: ['utility-bill', 'bank-statement', 'rental-agreement'],
  [VerificationType.TAX]: ['tin-certificate', 'tax-return', 'vat-registration'],
  [VerificationType.BANK]: ['bank-account-details', 'bank-statement', 'cancelled-cheque'],
};

/**
 * ভেরিফিকেশন প্রক্রিয়ার সর্বোচ্চ সময় (দিন)
 */
export const VerificationMaxProcessingDays = 7;

/**
 * ভেরিফিকেশন রি-অ্যাটেম্প্ট সময় (ঘণ্টা)
 */
export const VerificationReattemptHours = 24;
