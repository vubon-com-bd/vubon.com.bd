/**
 * প্রমোশনের স্ট্যাটাস সম্পর্কিত কনস্ট্যান্টসমূহ
 * @module Content-Marketing/marketing
 */

/**
 * প্রমোশনের সব স্ট্যাটাস
 */
export const PROMOTION_STATUSES = ['draft', 'active', 'expired', 'disabled'] as const;

/**
 * প্রতিটি স্ট্যাটাসের জন্য কালার কোড
 */
export const PROMOTION_STATUS_COLORS = {
  draft: 'gray',
  active: 'green',
  expired: 'orange',
  disabled: 'red',
} as const satisfies Record<(typeof PROMOTION_STATUSES)[number], string>;

/**
 * প্রতিটি স্ট্যাটাসের জন্য লেবেল (বাংলা এবং ইংরেজি)
 */
export const PROMOTION_STATUS_LABELS = {
  draft: {
    en: 'Draft',
    bn: 'খসড়া',
  },
  active: {
    en: 'Active',
    bn: 'সক্রিয়',
  },
  expired: {
    en: 'Expired',
    bn: 'মেয়াদোত্তীর্ণ',
  },
  disabled: {
    en: 'Disabled',
    bn: 'নিষ্ক্রিয়',
  },
} as const satisfies Record<(typeof PROMOTION_STATUSES)[number], { en: string; bn: string }>;

/**
 * প্রমোশন স্ট্যাটাস টাইপ
 */
export type PromotionStatus = (typeof PROMOTION_STATUSES)[number];

/**
 * ভাষা টাইপ
 */
export type Language = 'en' | 'bn';

/**
 * নির্দিষ্ট স্ট্যাটাসের জন্য কালার পাওয়ার ফাংশন
 */
export function getPromotionStatusColor(status: PromotionStatus): string {
  return PROMOTION_STATUS_COLORS[status];
}

/**
 * নির্দিষ্ট স্ট্যাটাসের জন্য লেবেল পাওয়ার ফাংশন
 */
export function getPromotionStatusLabel(status: PromotionStatus, lang: Language = 'en'): string {
  return PROMOTION_STATUS_LABELS[status][lang];
}

/**
 * সব প্রমোশন স্ট্যাটাসের তালিকা পাওয়ার ফাংশন
 */
export function getAllPromotionStatuses(): readonly PromotionStatus[] {
  return PROMOTION_STATUSES;
}

/**
 * প্রমোশন স্ট্যাটাস বৈধ কিনা চেক করার ফাংশন
 */
export function isValidPromotionStatus(status: string): status is PromotionStatus {
  return PROMOTION_STATUSES.includes(status as PromotionStatus);
}

/**
 * স্ট্যাটাস সক্রিয় কিনা চেক করার ফাংশন
 */
export function isActivePromotionStatus(status: PromotionStatus): boolean {
  return status === 'active';
}

/**
 * স্ট্যাটাস মেয়াদোত্তীর্ণ কিনা চেক করার ফাংশন
 */
export function isExpiredPromotionStatus(status: PromotionStatus): boolean {
  return status === 'expired';
}

/**
 * স্ট্যাটাস নিষ্ক্রিয় কিনা চেক করার ফাংশন
 */
export function isDisabledPromotionStatus(status: PromotionStatus): boolean {
  return status === 'disabled';
}

/**
 * স্ট্যাটাস ড্রাফট কিনা চেক করার ফাংশন
 */
export function isDraftPromotionStatus(status: PromotionStatus): boolean {
  return status === 'draft';
}

/**
 * স্ট্যাটাস এডিটযোগ্য কিনা চেক করার ফাংশন
 */
export function isEditablePromotionStatus(status: PromotionStatus): boolean {
  return status === 'draft';
}

/**
 * স্ট্যাটাস পাবলিশ করা যায় কিনা চেক করার ফাংশন
 */
export function isPublishablePromotionStatus(status: PromotionStatus): boolean {
  return status === 'draft' || status === 'disabled';
}

/**
 * স্ট্যাটাস ডিজেবল করা যায় কিনা চেক করার ফাংশন
 */
export function isDisableablePromotionStatus(status: PromotionStatus): boolean {
  return status === 'active';
}

/**
 * স্ট্যাটাস ট্রানজিশন অনুমোদিত কিনা চেক করার ফাংশন
 */
export function canPromotionTransitionTo(
  currentStatus: PromotionStatus,
  newStatus: PromotionStatus
): boolean {
  const transitions: Record<PromotionStatus, PromotionStatus[]> = {
    draft: ['active', 'disabled'],
    active: ['expired', 'disabled'],
    expired: ['disabled'],
    disabled: ['draft', 'active'],
  };
  return transitions[currentStatus].includes(newStatus);
}

/**
 * ডিফল্ট প্রমোশন স্ট্যাটাস পাওয়ার ফাংশন
 */
export function getDefaultPromotionStatus(): PromotionStatus {
  return 'draft';
}
