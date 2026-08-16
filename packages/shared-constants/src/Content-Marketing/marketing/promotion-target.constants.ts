/**
 * প্রমোশনের টার্গেট সম্পর্কিত কনস্ট্যান্টসমূহ
 * @module Content-Marketing/marketing
 */

/**
 * প্রমোশনের সব টার্গেট
 */
export const PROMOTION_TARGETS = ['all', 'new-users', 'existing-users', 'specific-users'] as const;

/**
 * প্রতিটি টার্গেটের লেবেল (বাংলা এবং ইংরেজি)
 */
export const PROMOTION_TARGET_LABELS = {
  all: {
    en: 'All Users',
    bn: 'সব ব্যবহারকারী',
  },
  'new-users': {
    en: 'New Users Only',
    bn: 'শুধুমাত্র নতুন ব্যবহারকারী',
  },
  'existing-users': {
    en: 'Existing Users Only',
    bn: 'শুধুমাত্র বিদ্যমান ব্যবহারকারী',
  },
  'specific-users': {
    en: 'Specific Users',
    bn: 'নির্দিষ্ট ব্যবহারকারী',
  },
} as const satisfies Record<(typeof PROMOTION_TARGETS)[number], { en: string; bn: string }>;

/**
 * প্রমোশন টার্গেট টাইপ
 */
export type PromotionTarget = (typeof PROMOTION_TARGETS)[number];

/**
 * ভাষা টাইপ
 */
export type Language = 'en' | 'bn';

/**
 * নির্দিষ্ট টার্গেটের লেবেল পাওয়ার ফাংশন
 */
export function getPromotionTargetLabel(target: PromotionTarget, lang: Language = 'en'): string {
  return PROMOTION_TARGET_LABELS[target][lang];
}

/**
 * সব প্রমোশন টার্গেটের তালিকা পাওয়ার ফাংশন
 */
export function getAllPromotionTargets(): readonly PromotionTarget[] {
  return PROMOTION_TARGETS;
}

/**
 * প্রমোশন টার্গেট বৈধ কিনা চেক করার ফাংশন
 */
export function isValidPromotionTarget(target: string): target is PromotionTarget {
  return PROMOTION_TARGETS.includes(target as PromotionTarget);
}

/**
 * টার্গেট অল ইউজার কিনা চেক করার ফাংশন
 */
export function isAllUserPromotionTarget(target: PromotionTarget): boolean {
  return target === 'all';
}

/**
 * টার্গেট নিউ ইউজার কিনা চেক করার ফাংশন
 */
export function isNewUserPromotionTarget(target: PromotionTarget): boolean {
  return target === 'new-users';
}

/**
 * টার্গেট এক্সিস্টিং ইউজার কিনা চেক করার ফাংশন
 */
export function isExistingUserPromotionTarget(target: PromotionTarget): boolean {
  return target === 'existing-users';
}

/**
 * টার্গেট স্পেসিফিক ইউজার কিনা চেক করার ফাংশন
 */
export function isSpecificUserPromotionTarget(target: PromotionTarget): boolean {
  return target === 'specific-users';
}

/**
 * টার্গেট সেগমেন্টেড কিনা চেক করার ফাংশন
 */
export function isSegmentedPromotionTarget(target: PromotionTarget): boolean {
  return target !== 'all';
}

/**
 * টার্গেট নিউ বা এক্সিস্টিং ইউজার কিনা চেক করার ফাংশন
 */
export function isNewOrExistingUserTarget(target: PromotionTarget): boolean {
  return target === 'new-users' || target === 'existing-users';
}

/**
 * ডিফল্ট প্রমোশন টার্গেট পাওয়ার ফাংশন
 */
export function getDefaultPromotionTarget(): PromotionTarget {
  return 'all';
}

/**
 * টার্গেটের বিবরণ পাওয়ার ফাংশন
 */
export function getPromotionTargetDescription(
  target: PromotionTarget,
  lang: Language = 'en'
): string {
  const descriptions: Record<PromotionTarget, { en: string; bn: string }> = {
    all: {
      en: 'Promotion available to all users',
      bn: 'সব ব্যবহারকারীর জন্য প্রমোশন উপলব্ধ',
    },
    'new-users': {
      en: 'Promotion available only to new users',
      bn: 'শুধুমাত্র নতুন ব্যবহারকারীদের জন্য প্রমোশন উপলব্ধ',
    },
    'existing-users': {
      en: 'Promotion available only to existing users',
      bn: 'শুধুমাত্র বিদ্যমান ব্যবহারকারীদের জন্য প্রমোশন উপলব্ধ',
    },
    'specific-users': {
      en: 'Promotion available to specific users only',
      bn: 'শুধুমাত্র নির্দিষ্ট ব্যবহারকারীদের জন্য প্রমোশন উপলব্ধ',
    },
  };
  return descriptions[target][lang];
}

/**
 * টার্গেটের আইকন পাওয়ার ফাংশন
 */
export function getPromotionTargetIcon(target: PromotionTarget): string {
  const icons: Record<PromotionTarget, string> = {
    all: '👥',
    'new-users': '🆕',
    'existing-users': '👤',
    'specific-users': '⭐',
  };
  return icons[target];
}

/**
 * টার্গেটের রঙ পাওয়ার ফাংশন
 */
export function getPromotionTargetColor(target: PromotionTarget): string {
  const colors: Record<PromotionTarget, string> = {
    all: '#6B7280',
    'new-users': '#3B82F6',
    'existing-users': '#10B981',
    'specific-users': '#8B5CF6',
  };
  return colors[target];
}
