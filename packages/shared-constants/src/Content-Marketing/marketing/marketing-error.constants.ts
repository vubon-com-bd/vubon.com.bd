/**
 * মার্কেটিং সম্পর্কিত এরর মেসেজ কনস্ট্যান্টসমূহ
 * @module Content-Marketing/marketing
 */

/**
 * মার্কেটিং এরর মেসেজসমূহ
 */
export const ERROR_MESSAGES = {
  CAMPAIGN_NOT_FOUND: 'Campaign not found',
  PROMOTION_NOT_FOUND: 'Promotion not found',
  AFFILIATE_NOT_FOUND: 'Affiliate not found',
  INVALID_CAMPAIGN_STATUS: 'Invalid campaign status',
  CAMPAIGN_ALREADY_ACTIVE: 'Campaign is already active',
  PROMOTION_EXPIRED: 'Promotion has expired',
  INSUFFICIENT_BUDGET: 'Insufficient budget',
  EMAIL_SEND_FAILED: 'Email send failed',
  SMS_SEND_FAILED: 'SMS send failed',
  SOCIAL_PUBLISH_FAILED: 'Social media publish failed',
} as const;

/**
 * এরর মেসেজ টাইপ
 */
export type ErrorMessageKey = keyof typeof ERROR_MESSAGES;

/**
 * এরর মেসেজ টাইপ
 */
export type ErrorMessage = (typeof ERROR_MESSAGES)[ErrorMessageKey];

/**
 * প্রতিটি এরর মেসেজের বাংলা অনুবাদ
 */
export const ERROR_MESSAGES_BN = {
  CAMPAIGN_NOT_FOUND: 'ক্যাম্পেইন পাওয়া যায়নি',
  PROMOTION_NOT_FOUND: 'প্রমোশন পাওয়া যায়নি',
  AFFILIATE_NOT_FOUND: 'অ্যাফিলিয়েট পাওয়া যায়নি',
  INVALID_CAMPAIGN_STATUS: 'অবৈধ ক্যাম্পেইন স্ট্যাটাস',
  CAMPAIGN_ALREADY_ACTIVE: 'ক্যাম্পেইন ইতিমধ্যে সক্রিয়',
  PROMOTION_EXPIRED: 'প্রমোশনের মেয়াদ শেষ হয়েছে',
  INSUFFICIENT_BUDGET: 'অপর্যাপ্ত বাজেট',
  EMAIL_SEND_FAILED: 'ইমেইল পাঠানো ব্যর্থ হয়েছে',
  SMS_SEND_FAILED: 'এসএমএস পাঠানো ব্যর্থ হয়েছে',
  SOCIAL_PUBLISH_FAILED: 'সোশ্যাল মিডিয়া প্রকাশ ব্যর্থ হয়েছে',
} as const;

/**
 * প্রতিটি এরর মেসেজের কোড
 */
export const ERROR_CODES = {
  CAMPAIGN_NOT_FOUND: 'ERR_CAMPAIGN_001',
  PROMOTION_NOT_FOUND: 'ERR_PROMOTION_001',
  AFFILIATE_NOT_FOUND: 'ERR_AFFILIATE_001',
  INVALID_CAMPAIGN_STATUS: 'ERR_CAMPAIGN_002',
  CAMPAIGN_ALREADY_ACTIVE: 'ERR_CAMPAIGN_003',
  PROMOTION_EXPIRED: 'ERR_PROMOTION_002',
  INSUFFICIENT_BUDGET: 'ERR_BUDGET_001',
  EMAIL_SEND_FAILED: 'ERR_EMAIL_001',
  SMS_SEND_FAILED: 'ERR_SMS_001',
  SOCIAL_PUBLISH_FAILED: 'ERR_SOCIAL_001',
} as const;

/**
 * প্রতিটি এরর মেসেজের HTTP স্ট্যাটাস কোড
 */
export const ERROR_HTTP_STATUS = {
  CAMPAIGN_NOT_FOUND: 404,
  PROMOTION_NOT_FOUND: 404,
  AFFILIATE_NOT_FOUND: 404,
  INVALID_CAMPAIGN_STATUS: 400,
  CAMPAIGN_ALREADY_ACTIVE: 400,
  PROMOTION_EXPIRED: 400,
  INSUFFICIENT_BUDGET: 400,
  EMAIL_SEND_FAILED: 500,
  SMS_SEND_FAILED: 500,
  SOCIAL_PUBLISH_FAILED: 500,
} as const;

/**
 * নির্দিষ্ট এরর মেসেজের বাংলা অনুবাদ পাওয়ার ফাংশন
 */
export function getErrorMessageBn(key: ErrorMessageKey): string {
  return ERROR_MESSAGES_BN[key];
}

/**
 * নির্দিষ্ট এরর মেসেজের কোড পাওয়ার ফাংশন
 */
export function getErrorCode(key: ErrorMessageKey): string {
  return ERROR_CODES[key];
}

/**
 * নির্দিষ্ট এরর মেসেজের HTTP স্ট্যাটাস কোড পাওয়ার ফাংশন
 */
export function getErrorHttpStatus(key: ErrorMessageKey): number {
  return ERROR_HTTP_STATUS[key];
}

/**
 * এরর মেসেজ কী দ্বারা এরর অবজেক্ট তৈরি করার ফাংশন
 */
export function createErrorObject(key: ErrorMessageKey): {
  key: ErrorMessageKey;
  message: ErrorMessage;
  messageBn: string;
  code: string;
  status: number;
} {
  return {
    key,
    message: ERROR_MESSAGES[key],
    messageBn: ERROR_MESSAGES_BN[key],
    code: ERROR_CODES[key],
    status: ERROR_HTTP_STATUS[key],
  };
}

/**
 * এরর কী আছে কিনা চেক করার ফাংশন
 */
export function isValidErrorKey(key: string): key is ErrorMessageKey {
  return key in ERROR_MESSAGES;
}

/**
 * সব এরর কী পাওয়ার ফাংশন
 */
export function getAllErrorKeys(): ErrorMessageKey[] {
  return Object.keys(ERROR_MESSAGES) as ErrorMessageKey[];
}

/**
 * সব এরর মেসেজ পাওয়ার ফাংশন
 */
export function getAllErrorMessages(): ErrorMessage[] {
  return Object.values(ERROR_MESSAGES);
}

/**
 * ক্যাটাগরি অনুযায়ী এরর মেসেজ ফিল্টার করার ফাংশন
 */
export function getErrorsByCategory(category: string): ErrorMessageKey[] {
  const categories: Record<string, ErrorMessageKey[]> = {
    campaign: ['CAMPAIGN_NOT_FOUND', 'INVALID_CAMPAIGN_STATUS', 'CAMPAIGN_ALREADY_ACTIVE'],
    promotion: ['PROMOTION_NOT_FOUND', 'PROMOTION_EXPIRED'],
    affiliate: ['AFFILIATE_NOT_FOUND'],
    budget: ['INSUFFICIENT_BUDGET'],
    email: ['EMAIL_SEND_FAILED'],
    sms: ['SMS_SEND_FAILED'],
    social: ['SOCIAL_PUBLISH_FAILED'],
  };
  return categories[category] || [];
}

/**
 * এরর মেসেজের বিবরণ পাওয়ার ফাংশন
 */
export function getErrorDescription(key: ErrorMessageKey): string {
  const descriptions: Record<ErrorMessageKey, string> = {
    CAMPAIGN_NOT_FOUND: 'The requested campaign does not exist in the system',
    PROMOTION_NOT_FOUND: 'The requested promotion does not exist in the system',
    AFFILIATE_NOT_FOUND: 'The requested affiliate does not exist in the system',
    INVALID_CAMPAIGN_STATUS: 'The campaign status is invalid or not allowed',
    CAMPAIGN_ALREADY_ACTIVE: 'The campaign is already active and cannot be activated again',
    PROMOTION_EXPIRED: 'The promotion has expired and cannot be used',
    INSUFFICIENT_BUDGET: 'The campaign budget is insufficient for the requested action',
    EMAIL_SEND_FAILED: 'The email could not be sent due to technical issues',
    SMS_SEND_FAILED: 'The SMS could not be sent due to technical issues',
    SOCIAL_PUBLISH_FAILED: 'The social media post could not be published',
  };
  return descriptions[key];
}
