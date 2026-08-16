/**
 * রেফারেলের স্ট্যাটাস সম্পর্কিত কনস্ট্যান্টসমূহ
 * @module Content-Marketing/marketing
 */

/**
 * রেফারেলের সব স্ট্যাটাস
 */
export const REFERRAL_STATUSES = ['active', 'expired', 'disabled'] as const;

/**
 * প্রতিটি স্ট্যাটাসের জন্য কালার কোড
 */
export const REFERRAL_STATUS_COLORS = {
  active: 'green',
  expired: 'orange',
  disabled: 'red',
} as const satisfies Record<(typeof REFERRAL_STATUSES)[number], string>;

/**
 * প্রতিটি স্ট্যাটাসের জন্য লেবেল (বাংলা এবং ইংরেজি)
 */
export const REFERRAL_STATUS_LABELS = {
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
} as const satisfies Record<(typeof REFERRAL_STATUSES)[number], { en: string; bn: string }>;

/**
 * রেফারেল স্ট্যাটাস টাইপ
 */
export type ReferralStatus = (typeof REFERRAL_STATUSES)[number];

/**
 * ভাষা টাইপ
 */
export type Language = 'en' | 'bn';

/**
 * নির্দিষ্ট স্ট্যাটাসের জন্য কালার পাওয়ার ফাংশন
 */
export function getReferralStatusColor(status: ReferralStatus): string {
  return REFERRAL_STATUS_COLORS[status];
}

/**
 * নির্দিষ্ট স্ট্যাটাসের জন্য লেবেল পাওয়ার ফাংশন
 */
export function getReferralStatusLabel(status: ReferralStatus, lang: Language = 'en'): string {
  return REFERRAL_STATUS_LABELS[status][lang];
}

/**
 * সব রেফারেল স্ট্যাটাসের তালিকা পাওয়ার ফাংশন
 */
export function getAllReferralStatuses(): readonly ReferralStatus[] {
  return REFERRAL_STATUSES;
}

/**
 * রেফারেল স্ট্যাটাস বৈধ কিনা চেক করার ফাংশন
 */
export function isValidReferralStatus(status: string): status is ReferralStatus {
  return REFERRAL_STATUSES.includes(status as ReferralStatus);
}

/**
 * স্ট্যাটাস সক্রিয় কিনা চেক করার ফাংশন
 */
export function isActiveReferralStatus(status: ReferralStatus): boolean {
  return status === 'active';
}

/**
 * স্ট্যাটাস মেয়াদোত্তীর্ণ কিনা চেক করার ফাংশন
 */
export function isExpiredReferralStatus(status: ReferralStatus): boolean {
  return status === 'expired';
}

/**
 * স্ট্যাটাস নিষ্ক্রিয় কিনা চেক করার ফাংশন
 */
export function isDisabledReferralStatus(status: ReferralStatus): boolean {
  return status === 'disabled';
}

/**
 * স্ট্যাটাস এডিটযোগ্য কিনা চেক করার ফাংশন
 */
export function isEditableReferralStatus(status: ReferralStatus): boolean {
  return status === 'active';
}

/**
 * স্ট্যাটাস ডিজেবল করা যায় কিনা চেক করার ফাংশন
 */
export function isDisableableReferralStatus(status: ReferralStatus): boolean {
  return status === 'active';
}

/**
 * স্ট্যাটাস ট্রানজিশন অনুমোদিত কিনা চেক করার ফাংশন
 */
export function canReferralTransitionTo(
  currentStatus: ReferralStatus,
  newStatus: ReferralStatus
): boolean {
  const transitions: Record<ReferralStatus, ReferralStatus[]> = {
    active: ['expired', 'disabled'],
    expired: ['disabled'],
    disabled: [],
  };
  return transitions[currentStatus].includes(newStatus);
}

/**
 * ডিফল্ট রেফারেল স্ট্যাটাস পাওয়ার ফাংশন
 */
export function getDefaultReferralStatus(): ReferralStatus {
  return 'active';
}

/**
 * স্ট্যাটাসের আইকন পাওয়ার ফাংশন
 */
export function getReferralStatusIcon(status: ReferralStatus): string {
  const icons: Record<ReferralStatus, string> = {
    active: '✅',
    expired: '⏰',
    disabled: '🚫',
  };
  return icons[status];
}
