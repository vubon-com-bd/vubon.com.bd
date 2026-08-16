/**
 * ক্যাম্পেইনের টার্গেট সম্পর্কিত কনস্ট্যান্টসমূহ
 * @module Content-Marketing/marketing
 */

/**
 * ক্যাম্পেইনের সব টার্গেট অডিয়েন্স
 */
export const TARGET_AUDIENCES = [
  'all',
  'new-users',
  'existing-users',
  'high-value',
  'inactive',
] as const;

/**
 * প্রতিটি টার্গেটের লেবেল (বাংলা এবং ইংরেজি)
 */
export const TARGET_TYPE_LABELS = {
  all: {
    en: 'All Users',
    bn: 'সব ব্যবহারকারী',
  },
  'new-users': {
    en: 'New Users',
    bn: 'নতুন ব্যবহারকারী',
  },
  'existing-users': {
    en: 'Existing Users',
    bn: 'বিদ্যমান ব্যবহারকারী',
  },
  'high-value': {
    en: 'High Value Users',
    bn: 'উচ্চ মানের ব্যবহারকারী',
  },
  inactive: {
    en: 'Inactive Users',
    bn: 'নিষ্ক্রিয় ব্যবহারকারী',
  },
} as const satisfies Record<(typeof TARGET_AUDIENCES)[number], { en: string; bn: string }>;

/**
 * টার্গেট টাইপ
 */
export type TargetAudience = (typeof TARGET_AUDIENCES)[number];

/**
 * ভাষা টাইপ
 */
export type Language = 'en' | 'bn';

/**
 * নির্দিষ্ট টার্গেটের লেবেল পাওয়ার ফাংশন
 */
export function getTargetAudienceLabel(target: TargetAudience, lang: Language = 'en'): string {
  return TARGET_TYPE_LABELS[target][lang];
}

/**
 * সব টার্গেট অডিয়েন্সের তালিকা পাওয়ার ফাংশন
 */
export function getAllTargetAudiences(): readonly TargetAudience[] {
  return TARGET_AUDIENCES;
}

/**
 * টার্গেট অডিয়েন্স বৈধ কিনা চেক করার ফাংশন
 */
export function isValidTargetAudience(target: string): target is TargetAudience {
  return TARGET_AUDIENCES.includes(target as TargetAudience);
}

/**
 * টার্গেট নিউ ইউজার কিনা চেক করার ফাংশন
 */
export function isNewUserTarget(target: TargetAudience): boolean {
  return target === 'new-users';
}

/**
 * টার্গেট এক্সিস্টিং ইউজার কিনা চেক করার ফাংশন
 */
export function isExistingUserTarget(target: TargetAudience): boolean {
  return target === 'existing-users';
}

/**
 * টার্গেট হাই-ভ্যালু ইউজার কিনা চেক করার ফাংশন
 */
export function isHighValueTarget(target: TargetAudience): boolean {
  return target === 'high-value';
}

/**
 * টার্গেট ইনঅ্যাকটিভ ইউজার কিনা চেক করার ফাংশন
 */
export function isInactiveTarget(target: TargetAudience): boolean {
  return target === 'inactive';
}

/**
 * টার্গেট অল ইউজার কিনা চেক করার ফাংশন
 */
export function isAllUserTarget(target: TargetAudience): boolean {
  return target === 'all';
}

/**
 * টার্গেট সেগমেন্টেড কিনা চেক করার ফাংশন (অল ছাড়া বাকি সব)
 */
export function isSegmentedTarget(target: TargetAudience): boolean {
  return target !== 'all';
}

/**
 * ডিফল্ট টার্গেট অডিয়েন্স পাওয়ার ফাংশন
 */
export function getDefaultTargetAudience(): TargetAudience {
  return 'all';
}

/**
 * টার্গেটের বিবরণ পাওয়ার ফাংশন
 */
export function getTargetDescription(target: TargetAudience, lang: Language = 'en'): string {
  const descriptions: Record<TargetAudience, { en: string; bn: string }> = {
    all: {
      en: 'Target all users regardless of their status',
      bn: 'স্ট্যাটাস নির্বিশেষে সব ব্যবহারকারীকে টার্গেট করুন',
    },
    'new-users': {
      en: 'Users who joined within the last 30 days',
      bn: 'গত ৩০ দিনের মধ্যে যোগদান করা ব্যবহারকারী',
    },
    'existing-users': {
      en: 'Users who have been active for more than 30 days',
      bn: '৩০ দিনের বেশি সক্রিয় থাকা ব্যবহারকারী',
    },
    'high-value': {
      en: 'Users with high engagement and purchase history',
      bn: 'উচ্চ ব্যস্ততা এবং ক্রয় ইতিহাস সহ ব্যবহারকারী',
    },
    inactive: {
      en: 'Users who have not been active for more than 90 days',
      bn: '৯০ দিনের বেশি নিষ্ক্রিয় থাকা ব্যবহারকারী',
    },
  };
  return descriptions[target][lang];
}

/**
 * টার্গেটের আইকন পাওয়ার ফাংশন
 */
export function getTargetIcon(target: TargetAudience): string {
  const icons: Record<TargetAudience, string> = {
    all: '👥',
    'new-users': '🆕',
    'existing-users': '👤',
    'high-value': '⭐',
    inactive: '💤',
  };
  return icons[target];
}

/**
 * টার্গেটের রঙ পাওয়ার ফাংশন
 */
export function getTargetColor(target: TargetAudience): string {
  const colors: Record<TargetAudience, string> = {
    all: '#6B7280',
    'new-users': '#3B82F6',
    'existing-users': '#10B981',
    'high-value': '#F59E0B',
    inactive: '#EF4444',
  };
  return colors[target];
}
