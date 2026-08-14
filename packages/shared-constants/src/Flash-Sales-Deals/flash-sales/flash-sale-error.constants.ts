/**
 * Flash Sale Error Constants
 * ফ্ল্যাশ সেল সম্পর্কিত সব এরর কোড এবং মেসেজ
 */

// এরর কোড এনাম
export const ERROR_CODE = {
  // Flash Sale Related Errors
  FLASH_SALE_NOT_FOUND: 'FLASH_SALE_NOT_FOUND',
  INVALID_STATUS: 'INVALID_STATUS',
  SCHEDULE_CONFLICT: 'SCHEDULE_CONFLICT',
  INVENTORY_INSUFFICIENT: 'INVENTORY_INSUFFICIENT',
  PRICE_INVALID: 'PRICE_INVALID',
  COUPON_EXPIRED: 'COUPON_EXPIRED',
  VOUCHER_INVALID: 'VOUCHER_INVALID',
  RULE_VIOLATION: 'RULE_VIOLATION',
  PERMISSION_DENIED: 'PERMISSION_DENIED',
  PARTICIPANT_LIMIT_REACHED: 'PARTICIPANT_LIMIT_REACHED',
  TIME_EXPIRED: 'TIME_EXPIRED',
  DUPLICATE_ENTRY: 'DUPLICATE_ENTRY',
  VALIDATION_FAILED: 'VALIDATION_FAILED',

  // System Errors
  SERVER_ERROR: 'SERVER_ERROR',
  DATABASE_ERROR: 'DATABASE_ERROR',
  NETWORK_ERROR: 'NETWORK_ERROR',
  CONFIGURATION_ERROR: 'CONFIGURATION_ERROR',

  // Authentication & Authorization
  AUTHENTICATION_ERROR: 'AUTHENTICATION_ERROR',
  AUTHORIZATION_ERROR: 'AUTHORIZATION_ERROR',

  // Business & Integrity
  BUSINESS_RULE_VIOLATION: 'BUSINESS_RULE_VIOLATION',
  INTEGRITY_CONSTRAINT_VIOLATION: 'INTEGRITY_CONSTRAINT_VIOLATION',
  OPTIMISTIC_LOCK_FAILURE: 'OPTIMISTIC_LOCK_FAILURE',
  CONCURRENT_MODIFICATION: 'CONCURRENT_MODIFICATION',

  // Resource & Dependency
  RESOURCE_CONFLICT: 'RESOURCE_CONFLICT',
  DEPENDENCY_FAILURE: 'DEPENDENCY_FAILURE',
  THIRD_PARTY_ERROR: 'THIRD_PARTY_ERROR',

  // Rate & Quota
  RATE_LIMIT_EXCEEDED: 'RATE_LIMIT_EXCEEDED',
  QUOTA_EXCEEDED: 'QUOTA_EXCEEDED',

  // Service Availability
  MAINTENANCE_MODE: 'MAINTENANCE_MODE',
  SERVICE_UNAVAILABLE: 'SERVICE_UNAVAILABLE',
} as const;

// এরর টাইপ
export type ErrorCode = (typeof ERROR_CODE)[keyof typeof ERROR_CODE];

// এরর মেসেজ
export const ERROR_MESSAGES: Record<ErrorCode, string> = {
  // Flash Sale Related Errors
  FLASH_SALE_NOT_FOUND: 'ফ্ল্যাশ সেল পাওয়া যায়নি',
  INVALID_STATUS: 'অবৈধ স্ট্যাটাস',
  SCHEDULE_CONFLICT: 'শিডিউল কনফ্লিক্ট',
  INVENTORY_INSUFFICIENT: 'পর্যাপ্ত ইনভেন্টরি নেই',
  PRICE_INVALID: 'অবৈধ মূল্য',
  COUPON_EXPIRED: 'কুপন মেয়াদোত্তীর্ণ',
  VOUCHER_INVALID: 'অবৈধ ভাউচার',
  RULE_VIOLATION: 'রুল লঙ্ঘন',
  PERMISSION_DENIED: 'অনুমতি নেই',
  PARTICIPANT_LIMIT_REACHED: 'অংশগ্রহণকারী সীমা পৌঁছেছে',
  TIME_EXPIRED: 'সময় শেষ',
  DUPLICATE_ENTRY: 'ডুপ্লিকেট এন্ট্রি',
  VALIDATION_FAILED: 'ভ্যালিডেশন ব্যর্থ',

  // System Errors
  SERVER_ERROR: 'সার্ভার ত্রুটি',
  DATABASE_ERROR: 'ডেটাবেস ত্রুটি',
  NETWORK_ERROR: 'নেটওয়ার্ক ত্রুটি',
  CONFIGURATION_ERROR: 'কনফিগারেশন ত্রুটি',

  // Authentication & Authorization
  AUTHENTICATION_ERROR: 'অথেন্টিকেশন ত্রুটি',
  AUTHORIZATION_ERROR: 'অথরাইজেশন ত্রুটি',

  // Business & Integrity
  BUSINESS_RULE_VIOLATION: 'বিজনেস রুল লঙ্ঘন',
  INTEGRITY_CONSTRAINT_VIOLATION: 'ইন্টিগ্রিটি কনস্ট্রেইন্ট লঙ্ঘন',
  OPTIMISTIC_LOCK_FAILURE: 'অপটিমিস্টিক লক ব্যর্থ',
  CONCURRENT_MODIFICATION: 'কনকারেন্ট মডিফিকেশন',

  // Resource & Dependency
  RESOURCE_CONFLICT: 'রিসোর্স কনফ্লিক্ট',
  DEPENDENCY_FAILURE: 'ডিপেন্ডেন্সি ব্যর্থ',
  THIRD_PARTY_ERROR: 'থার্ড-পার্টি ত্রুটি',

  // Rate & Quota
  RATE_LIMIT_EXCEEDED: 'রেট লিমিট অতিক্রম',
  QUOTA_EXCEEDED: 'কোটা অতিক্রম',

  // Service Availability
  MAINTENANCE_MODE: 'মেইনটেন্যান্স মোড',
  SERVICE_UNAVAILABLE: 'সার্ভিস অনুপলব্ধ',
};

// এরর বিবরণ
export const ERROR_DESCRIPTIONS: Record<ErrorCode, string> = {
  // Flash Sale Related Errors
  FLASH_SALE_NOT_FOUND: 'প্রদত্ত আইডি সহ ফ্ল্যাশ সেল ডাটাবেসে পাওয়া যায়নি',
  INVALID_STATUS: 'ফ্ল্যাশ সেলের বর্তমান স্ট্যাটাস অপারেশনের জন্য উপযুক্ত নয়',
  SCHEDULE_CONFLICT: 'একই সময়ে একাধিক ফ্ল্যাশ সেল শিডিউল করা হয়েছে',
  INVENTORY_INSUFFICIENT: 'ফ্ল্যাশ সেলের জন্য পর্যাপ্ত ইনভেন্টরি উপলব্ধ নেই',
  PRICE_INVALID: 'প্রদত্ত মূল্য অনুমোদিত সীমার মধ্যে নেই',
  COUPON_EXPIRED: 'কুপনটির মেয়াদ শেষ হয়ে গেছে',
  VOUCHER_INVALID: 'ভাউচারটি অবৈধ বা ইতিমধ্যে ব্যবহার করা হয়েছে',
  RULE_VIOLATION: 'ফ্ল্যাশ সেলের রুল লঙ্ঘন করা হয়েছে',
  PERMISSION_DENIED: 'এই অপারেশন করার জন্য যথেষ্ট অনুমতি নেই',
  PARTICIPANT_LIMIT_REACHED: 'ফ্ল্যাশ সেলের সর্বোচ্চ অংশগ্রহণকারী সীমা পৌঁছেছে',
  TIME_EXPIRED: 'ফ্ল্যাশ সেলের সময়সীমা শেষ হয়ে গেছে',
  DUPLICATE_ENTRY: 'একই ডেটা ইতিমধ্যে বিদ্যমান',
  VALIDATION_FAILED: 'প্রদত্ত ডেটা ভ্যালিডেশন পাস করেনি',

  // System Errors
  SERVER_ERROR: 'সার্ভারে অভ্যন্তরীণ ত্রুটি ঘটেছে',
  DATABASE_ERROR: 'ডেটাবেস অপারেশন ব্যর্থ হয়েছে',
  NETWORK_ERROR: 'নেটওয়ার্ক কানেকশন সমস্যা',
  CONFIGURATION_ERROR: 'সিস্টেম কনফিগারেশন ত্রুটি',

  // Authentication & Authorization
  AUTHENTICATION_ERROR: 'ব্যবহারকারী অথেন্টিকেশন ব্যর্থ হয়েছে',
  AUTHORIZATION_ERROR: 'ব্যবহারকারীর প্রয়োজনীয় অনুমতি নেই',

  // Business & Integrity
  BUSINESS_RULE_VIOLATION: 'বিজনেস লজিক রুল লঙ্ঘন',
  INTEGRITY_CONSTRAINT_VIOLATION: 'ডেটাবেস ইন্টিগ্রিটি কনস্ট্রেইন্ট লঙ্ঘন',
  OPTIMISTIC_LOCK_FAILURE: 'ডেটা আপডেটের সময় অপটিমিস্টিক লক ব্যর্থ',
  CONCURRENT_MODIFICATION: 'একই ডেটা একাধিক ব্যবহারকারী দ্বারা পরিবর্তন',

  // Resource & Dependency
  RESOURCE_CONFLICT: 'রিসোর্স অ্যাক্সেস কনফ্লিক্ট',
  DEPENDENCY_FAILURE: 'নির্ভরশীল সার্ভিস বা কম্পোনেন্ট ব্যর্থ',
  THIRD_PARTY_ERROR: 'থার্ড-পার্টি সার্ভিসে ত্রুটি',

  // Rate & Quota
  RATE_LIMIT_EXCEEDED: 'রিকোয়েস্ট রেট লিমিট অতিক্রম',
  QUOTA_EXCEEDED: 'নির্ধারিত কোটা অতিক্রম',

  // Service Availability
  MAINTENANCE_MODE: 'সিস্টেম মেইনটেন্যান্স মোডে আছে',
  SERVICE_UNAVAILABLE: 'সার্ভিস বর্তমানে অনুপলব্ধ',
};

// HTTP স্ট্যাটাস কোড
export const ERROR_HTTP_STATUS: Record<ErrorCode, number> = {
  // Flash Sale Related Errors (4xx)
  FLASH_SALE_NOT_FOUND: 404,
  INVALID_STATUS: 400,
  SCHEDULE_CONFLICT: 409,
  INVENTORY_INSUFFICIENT: 409,
  PRICE_INVALID: 400,
  COUPON_EXPIRED: 400,
  VOUCHER_INVALID: 400,
  RULE_VIOLATION: 422,
  PERMISSION_DENIED: 403,
  PARTICIPANT_LIMIT_REACHED: 409,
  TIME_EXPIRED: 410,
  DUPLICATE_ENTRY: 409,
  VALIDATION_FAILED: 422,

  // System Errors (5xx)
  SERVER_ERROR: 500,
  DATABASE_ERROR: 500,
  NETWORK_ERROR: 503,
  CONFIGURATION_ERROR: 500,

  // Authentication & Authorization (4xx)
  AUTHENTICATION_ERROR: 401,
  AUTHORIZATION_ERROR: 403,

  // Business & Integrity (4xx/5xx)
  BUSINESS_RULE_VIOLATION: 422,
  INTEGRITY_CONSTRAINT_VIOLATION: 409,
  OPTIMISTIC_LOCK_FAILURE: 409,
  CONCURRENT_MODIFICATION: 409,

  // Resource & Dependency (5xx)
  RESOURCE_CONFLICT: 409,
  DEPENDENCY_FAILURE: 503,
  THIRD_PARTY_ERROR: 503,

  // Rate & Quota (4xx)
  RATE_LIMIT_EXCEEDED: 429,
  QUOTA_EXCEEDED: 429,

  // Service Availability (5xx)
  MAINTENANCE_MODE: 503,
  SERVICE_UNAVAILABLE: 503,
};

// এরর সিভারিটি লেভেল
export const ERROR_SEVERITY: Record<ErrorCode, 'low' | 'medium' | 'high' | 'critical'> = {
  // Flash Sale Related Errors
  FLASH_SALE_NOT_FOUND: 'medium',
  INVALID_STATUS: 'medium',
  SCHEDULE_CONFLICT: 'high',
  INVENTORY_INSUFFICIENT: 'high',
  PRICE_INVALID: 'medium',
  COUPON_EXPIRED: 'low',
  VOUCHER_INVALID: 'low',
  RULE_VIOLATION: 'high',
  PERMISSION_DENIED: 'high',
  PARTICIPANT_LIMIT_REACHED: 'medium',
  TIME_EXPIRED: 'low',
  DUPLICATE_ENTRY: 'low',
  VALIDATION_FAILED: 'medium',

  // System Errors
  SERVER_ERROR: 'critical',
  DATABASE_ERROR: 'critical',
  NETWORK_ERROR: 'high',
  CONFIGURATION_ERROR: 'critical',

  // Authentication & Authorization
  AUTHENTICATION_ERROR: 'high',
  AUTHORIZATION_ERROR: 'high',

  // Business & Integrity
  BUSINESS_RULE_VIOLATION: 'high',
  INTEGRITY_CONSTRAINT_VIOLATION: 'critical',
  OPTIMISTIC_LOCK_FAILURE: 'medium',
  CONCURRENT_MODIFICATION: 'medium',

  // Resource & Dependency
  RESOURCE_CONFLICT: 'medium',
  DEPENDENCY_FAILURE: 'high',
  THIRD_PARTY_ERROR: 'high',

  // Rate & Quota
  RATE_LIMIT_EXCEEDED: 'low',
  QUOTA_EXCEEDED: 'low',

  // Service Availability
  MAINTENANCE_MODE: 'medium',
  SERVICE_UNAVAILABLE: 'critical',
};

// হেল্পার ফাংশন: এরর কোড ভ্যালিড কিনা চেক করুন
export const isValidErrorCode = (code: string): code is ErrorCode => {
  return Object.values(ERROR_CODE).includes(code as ErrorCode);
};

// হেল্পার ফাংশন: এরর মেসেজ পান
export const getErrorMessage = (code: ErrorCode): string => {
  return ERROR_MESSAGES[code] || 'অজানা ত্রুটি';
};

// হেল্পার ফাংশন: এরর বিবরণ পান
export const getErrorDescription = (code: ErrorCode): string => {
  return ERROR_DESCRIPTIONS[code] || '';
};

// হেল্পার ফাংশন: HTTP স্ট্যাটাস কোড পান
export const getErrorHttpStatus = (code: ErrorCode): number => {
  return ERROR_HTTP_STATUS[code] || 500;
};

// হেল্পার ফাংশন: এরর সিভারিটি পান
export const getErrorSeverity = (code: ErrorCode): 'low' | 'medium' | 'high' | 'critical' => {
  return ERROR_SEVERITY[code] || 'medium';
};

// হেল্পার ফাংশন: এরর কোড ক্যাটাগরি পান
export const getErrorCategory = (code: ErrorCode): string => {
  if (code.startsWith('FLASH_SALE_')) return 'flash_sale';
  if (
    code.startsWith('SERVER_') ||
    code.startsWith('DATABASE_') ||
    code.startsWith('NETWORK_') ||
    code.startsWith('CONFIGURATION_')
  )
    return 'system';
  if (code.startsWith('AUTHENTICATION_') || code.startsWith('AUTHORIZATION_')) return 'security';
  if (
    code.startsWith('BUSINESS_') ||
    code.startsWith('INTEGRITY_') ||
    code.startsWith('OPTIMISTIC_') ||
    code.startsWith('CONCURRENT_')
  )
    return 'business';
  if (code.startsWith('RESOURCE_') || code.startsWith('DEPENDENCY_') || code.startsWith('THIRD_'))
    return 'resource';
  if (code.startsWith('RATE_') || code.startsWith('QUOTA_')) return 'limit';
  if (code.startsWith('MAINTENANCE_') || code.startsWith('SERVICE_')) return 'availability';
  return 'unknown';
};

// হেল্পার ফাংশন: এরর রিট্রাই যোগ্য কিনা চেক করুন
export const isRetryableError = (code: ErrorCode): boolean => {
  const retryableCodes: ErrorCode[] = [
    'SERVER_ERROR',
    'DATABASE_ERROR',
    'NETWORK_ERROR',
    'DEPENDENCY_FAILURE',
    'THIRD_PARTY_ERROR',
    'RATE_LIMIT_EXCEEDED',
    'SERVICE_UNAVAILABLE',
  ];
  return retryableCodes.includes(code);
};
