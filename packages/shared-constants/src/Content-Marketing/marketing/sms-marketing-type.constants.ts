/**
 * এসএমএস মার্কেটিং এর ধরন সম্পর্কিত কনস্ট্যান্টসমূহ
 * @module Content-Marketing/marketing
 */

/**
 * এসএমএসের সব ধরন
 */
export const SMS_TYPES = ['promotional', 'transactional', 'otp', 'alert'] as const;

/**
 * প্রতিটি এসএমএস টাইপের লেবেল (বাংলা এবং ইংরেজি)
 */
export const SMS_TYPE_LABELS = {
  promotional: {
    en: 'Promotional',
    bn: 'প্রচারমূলক',
  },
  transactional: {
    en: 'Transactional',
    bn: 'লেনদেনমূলক',
  },
  otp: {
    en: 'OTP / Verification',
    bn: 'ওটিপি / যাচাইকরণ',
  },
  alert: {
    en: 'Alert / Notification',
    bn: 'সতর্কতা / বিজ্ঞপ্তি',
  },
} as const satisfies Record<(typeof SMS_TYPES)[number], { en: string; bn: string }>;

/**
 * এসএমএস টাইপ টাইপ
 */
export type SmsType = (typeof SMS_TYPES)[number];

/**
 * ভাষা টাইপ
 */
export type Language = 'en' | 'bn';

/**
 * নির্দিষ্ট এসএমএস টাইপের লেবেল পাওয়ার ফাংশন
 */
export function getSmsTypeLabel(type: SmsType, lang: Language = 'en'): string {
  return SMS_TYPE_LABELS[type][lang];
}

/**
 * সব এসএমএস টাইপের তালিকা পাওয়ার ফাংশন
 */
export function getAllSmsTypes(): readonly SmsType[] {
  return SMS_TYPES;
}

/**
 * এসএমএস টাইপ বৈধ কিনা চেক করার ফাংশন
 */
export function isValidSmsType(type: string): type is SmsType {
  return SMS_TYPES.includes(type as SmsType);
}

/**
 * টাইপ প্রমোশনাল কিনা চেক করার ফাংশন
 */
export function isPromotionalSmsType(type: SmsType): boolean {
  return type === 'promotional';
}

/**
 * টাইপ ট্রানজেকশনাল কিনা চেক করার ফাংশন
 */
export function isTransactionalSmsType(type: SmsType): boolean {
  return type === 'transactional';
}

/**
 * টাইপ ওটিপি কিনা চেক করার ফাংশন
 */
export function isOtpSmsType(type: SmsType): boolean {
  return type === 'otp';
}

/**
 * টাইপ এলার্ট কিনা চেক করার ফাংশন
 */
export function isAlertSmsType(type: SmsType): boolean {
  return type === 'alert';
}

/**
 * টাইপ মার্কেটিং (প্রমোশনাল) কিনা চেক করার ফাংশন
 */
export function isMarketingSmsType(type: SmsType): boolean {
  return type === 'promotional';
}

/**
 * টাইপ ট্রানজেকশনাল (ট্রানজেকশনাল, ওটিপি, এলার্ট) কিনা চেক করার ফাংশন
 */
export function isTransactionalSmsTypeGroup(type: SmsType): boolean {
  return type === 'transactional' || type === 'otp' || type === 'alert';
}

/**
 * টাইপ ভেরিফিকেশন (ওটিপি) কিনা চেক করার ফাংশন
 */
export function isVerificationSmsType(type: SmsType): boolean {
  return type === 'otp';
}

/**
 * টাইপ নোটিফিকেশন (এলার্ট, ট্রানজেকশনাল) কিনা চেক করার ফাংশন
 */
export function isNotificationSmsType(type: SmsType): boolean {
  return type === 'alert' || type === 'transactional';
}

/**
 * ডিফল্ট এসএমএস টাইপ পাওয়ার ফাংশন
 */
export function getDefaultSmsType(): SmsType {
  return 'promotional';
}

/**
 * টাইপের আইকন পাওয়ার ফাংশন
 */
export function getSmsTypeIcon(type: SmsType): string {
  const icons: Record<SmsType, string> = {
    promotional: '📢',
    transactional: '📊',
    otp: '🔐',
    alert: '🔔',
  };
  return icons[type];
}

/**
 * টাইপের রঙ পাওয়ার ফাংশন
 */
export function getSmsTypeColor(type: SmsType): string {
  const colors: Record<SmsType, string> = {
    promotional: '#F59E0B',
    transactional: '#10B981',
    otp: '#3B82F6',
    alert: '#EF4444',
  };
  return colors[type];
}

/**
 * টাইপের বিবরণ পাওয়ার ফাংশন
 */
export function getSmsTypeDescription(type: SmsType, lang: Language = 'en'): string {
  const descriptions: Record<SmsType, { en: string; bn: string }> = {
    promotional: {
      en: 'Promotional messages for marketing campaigns',
      bn: 'মার্কেটিং ক্যাম্পেইনের জন্য প্রচারমূলক বার্তা',
    },
    transactional: {
      en: 'Transactional messages for order confirmations, receipts, etc.',
      bn: 'অর্ডার নিশ্চিতকরণ, রসিদ ইত্যাদির জন্য লেনদেনমূলক বার্তা',
    },
    otp: {
      en: 'One-time password for authentication and verification',
      bn: 'অথেন্টিকেশন এবং যাচাইকরণের জন্য ওয়ান-টাইম পাসওয়ার্ড',
    },
    alert: {
      en: 'Alert and notification messages for important updates',
      bn: 'গুরুত্বপূর্ণ আপডেটের জন্য সতর্কতা এবং বিজ্ঞপ্তি বার্তা',
    },
  };
  return descriptions[type][lang];
}
