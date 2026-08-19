/**
 * ভেন্ডারের ব্যাংক অ্যাকাউন্ট সংক্রান্ত কনস্ট্যান্টসমূহ
 */

/**
 * ব্যাংক অ্যাকাউন্ট টাইপ অবজেক্ট
 */
export const BankAccountType = {
  SAVINGS: 'SAVINGS',
  CURRENT: 'CURRENT',
  BUSINESS: 'BUSINESS',
  JOINT: 'JOINT',
} as const;

/**
 * ব্যাংক অ্যাকাউন্ট টাইপ - ইউনিয়ন টাইপ
 */
export type BankAccountTypeValue = (typeof BankAccountType)[keyof typeof BankAccountType];

/**
 * ব্যাংক অ্যাকাউন্ট স্ট্যাটাস
 */
export const BankAccountStatus = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  PENDING_VERIFICATION: 'PENDING_VERIFICATION',
  VERIFIED: 'VERIFIED',
  REJECTED: 'REJECTED',
} as const;

/**
 * ব্যাংক অ্যাকাউন্ট স্ট্যাটাস - ইউনিয়ন টাইপ
 */
export type BankAccountStatusValue = (typeof BankAccountStatus)[keyof typeof BankAccountStatus];

/**
 * ন্যূনতম ব্যালেন্স প্রয়োজন
 */
export const MinimumBalanceRequired = 500;

/**
 * সমর্থিত ব্যাংকের তালিকা
 */
export const SupportedBanks = [
  'Sonali Bank',
  'Janata Bank',
  'Agrani Bank',
  'Rupali Bank',
  'Bangladesh Bank',
  'Islami Bank Bangladesh',
  'Pubali Bank',
  'Uttara Bank',
  'Mutual Trust Bank',
  'Prime Bank',
  'Dutch-Bangla Bank',
  'Eastern Bank',
  'IFIC Bank',
  'NCC Bank',
  'Bank Asia',
  'Trust Bank',
  'Standard Chartered',
  'HSBC',
  'City Bank',
  'BRAC Bank',
] as const;

/**
 * সমর্থিত ব্যাংক টাইপ
 */
export type SupportedBankValue = (typeof SupportedBanks)[number];

/**
 * অ্যাকাউন্ট নম্বর ফরম্যাট (রেগুলার এক্সপ্রেশন প্যাটার্ন)
 * সাধারণত: ১০-১৭ ডিজিট, শুধুমাত্র সংখ্যা
 */
export const AccountNumberFormat = /^[0-9]{10,17}$/;

/**
 * প্রতি ভেন্ডারের সর্বোচ্চ ব্যাংক অ্যাকাউন্ট সংখ্যা
 */
export const MaxBankAccountsPerVendor = 5;

/**
 * ব্যাংক অ্যাকাউন্ট টাইপ লেবেলসমূহ
 */
export const BankAccountTypeLabels: Record<BankAccountTypeValue, { en: string; bn: string }> = {
  [BankAccountType.SAVINGS]: {
    en: 'Savings Account',
    bn: 'সঞ্চয়ী অ্যাকাউন্ট',
  },
  [BankAccountType.CURRENT]: {
    en: 'Current Account',
    bn: 'চলতি অ্যাকাউন্ট',
  },
  [BankAccountType.BUSINESS]: {
    en: 'Business Account',
    bn: 'ব্যবসায়িক অ্যাকাউন্ট',
  },
  [BankAccountType.JOINT]: {
    en: 'Joint Account',
    bn: 'যৌথ অ্যাকাউন্ট',
  },
};

/**
 * ব্যাংক অ্যাকাউন্ট স্ট্যাটাস লেবেলসমূহ
 */
export const BankAccountStatusLabels: Record<BankAccountStatusValue, { en: string; bn: string }> = {
  [BankAccountStatus.ACTIVE]: {
    en: 'Active',
    bn: 'সক্রিয়',
  },
  [BankAccountStatus.INACTIVE]: {
    en: 'Inactive',
    bn: 'নিষ্ক্রিয়',
  },
  [BankAccountStatus.PENDING_VERIFICATION]: {
    en: 'Pending Verification',
    bn: 'যাচাই অপেক্ষমাণ',
  },
  [BankAccountStatus.VERIFIED]: {
    en: 'Verified',
    bn: 'যাচাইকৃত',
  },
  [BankAccountStatus.REJECTED]: {
    en: 'Rejected',
    bn: 'বাতিল',
  },
};

/**
 * ব্যাংক অ্যাকাউন্ট স্ট্যাটাস রঙ কোডসমূহ
 */
export const BankAccountStatusColors: Record<BankAccountStatusValue, string> = {
  [BankAccountStatus.ACTIVE]: 'bg-green-100 text-green-800 border-green-300',
  [BankAccountStatus.INACTIVE]: 'bg-gray-100 text-gray-800 border-gray-300',
  [BankAccountStatus.PENDING_VERIFICATION]: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  [BankAccountStatus.VERIFIED]: 'bg-blue-100 text-blue-800 border-blue-300',
  [BankAccountStatus.REJECTED]: 'bg-red-100 text-red-800 border-red-300',
};

/**
 * ব্যাংক অ্যাকাউন্ট ভ্যালিডেশন রুলস
 */
export const BankAccountValidationRules = {
  MIN_LENGTH: 10,
  MAX_LENGTH: 17,
  ALLOWED_CHARACTERS: '0123456789',
  REQUIRED_FIELDS: ['accountNumber', 'accountHolderName', 'bankName', 'branchName'],
} as const;

/**
 * ব্যাংক অ্যাকাউন্ট রুটিন চেক সময় (দিন)
 */
export const BankAccountRoutineCheckDays = 30;

/**
 * ব্যাংক অ্যাকাউন্ট ভারিফিকেশন টাইমআউট (দিন)
 */
export const BankAccountVerificationTimeoutDays = 7;
