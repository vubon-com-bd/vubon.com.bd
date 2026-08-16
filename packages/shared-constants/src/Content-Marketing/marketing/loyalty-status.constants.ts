/**
 * লয়্যালটির স্ট্যাটাস সম্পর্কিত কনস্ট্যান্টসমূহ
 * @module Content-Marketing/marketing
 */

/**
 * লয়্যালটির সব স্ট্যাটাস
 */
export const LOYALTY_STATUSES = ['active', 'inactive', 'suspended'] as const;

/**
 * প্রতিটি স্ট্যাটাসের জন্য কালার কোড
 */
export const LOYALTY_STATUS_COLORS = {
  active: 'green',
  inactive: 'gray',
  suspended: 'orange',
} as const satisfies Record<(typeof LOYALTY_STATUSES)[number], string>;

/**
 * প্রতিটি স্ট্যাটাসের জন্য লেবেল (বাংলা এবং ইংরেজি)
 */
export const LOYALTY_STATUS_LABELS = {
  active: {
    en: 'Active',
    bn: 'সক্রিয়',
  },
  inactive: {
    en: 'Inactive',
    bn: 'নিষ্ক্রিয়',
  },
  suspended: {
    en: 'Suspended',
    bn: 'স্থগিত',
  },
} as const satisfies Record<(typeof LOYALTY_STATUSES)[number], { en: string; bn: string }>;

/**
 * লয়্যালটি স্ট্যাটাস টাইপ
 */
export type LoyaltyStatus = (typeof LOYALTY_STATUSES)[number];

/**
 * ভাষা টাইপ
 */
export type Language = 'en' | 'bn';

/**
 * নির্দিষ্ট স্ট্যাটাসের জন্য কালার পাওয়ার ফাংশন
 */
export function getLoyaltyStatusColor(status: LoyaltyStatus): string {
  return LOYALTY_STATUS_COLORS[status];
}

/**
 * নির্দিষ্ট স্ট্যাটাসের জন্য লেবেল পাওয়ার ফাংশন
 */
export function getLoyaltyStatusLabel(status: LoyaltyStatus, lang: Language = 'en'): string {
  return LOYALTY_STATUS_LABELS[status][lang];
}

/**
 * সব লয়্যালটি স্ট্যাটাসের তালিকা পাওয়ার ফাংশন
 */
export function getAllLoyaltyStatuses(): readonly LoyaltyStatus[] {
  return LOYALTY_STATUSES;
}

/**
 * লয়্যালটি স্ট্যাটাস বৈধ কিনা চেক করার ফাংশন
 */
export function isValidLoyaltyStatus(status: string): status is LoyaltyStatus {
  return LOYALTY_STATUSES.includes(status as LoyaltyStatus);
}

/**
 * স্ট্যাটাস সক্রিয় কিনা চেক করার ফাংশন
 */
export function isActiveLoyaltyStatus(status: LoyaltyStatus): boolean {
  return status === 'active';
}

/**
 * স্ট্যাটাস নিষ্ক্রিয় কিনা চেক করার ফাংশন
 */
export function isInactiveLoyaltyStatus(status: LoyaltyStatus): boolean {
  return status === 'inactive';
}

/**
 * স্ট্যাটাস স্থগিত কিনা চেক করার ফাংশন
 */
export function isSuspendedLoyaltyStatus(status: LoyaltyStatus): boolean {
  return status === 'suspended';
}

/**
 * স্ট্যাটাস এডিটযোগ্য কিনা চেক করার ফাংশন
 */
export function isEditableLoyaltyStatus(status: LoyaltyStatus): boolean {
  return status === 'active' || status === 'inactive';
}

/**
 * স্ট্যাটাস অ্যাক্টিভেট করা যায় কিনা চেক করার ফাংশন
 */
export function isActivatableLoyaltyStatus(status: LoyaltyStatus): boolean {
  return status === 'inactive' || status === 'suspended';
}

/**
 * স্ট্যাটাস সাসপেন্ড করা যায় কিনা চেক করার ফাংশন
 */
export function isSuspendableLoyaltyStatus(status: LoyaltyStatus): boolean {
  return status === 'active';
}

/**
 * স্ট্যাটাস ট্রানজিশন অনুমোদিত কিনা চেক করার ফাংশন
 */
export function canLoyaltyTransitionTo(
  currentStatus: LoyaltyStatus,
  newStatus: LoyaltyStatus
): boolean {
  const transitions: Record<LoyaltyStatus, LoyaltyStatus[]> = {
    active: ['inactive', 'suspended'],
    inactive: ['active'],
    suspended: ['active', 'inactive'],
  };
  return transitions[currentStatus].includes(newStatus);
}

/**
 * ডিফল্ট লয়্যালটি স্ট্যাটাস পাওয়ার ফাংশন
 */
export function getDefaultLoyaltyStatus(): LoyaltyStatus {
  return 'active';
}

/**
 * স্ট্যাটাসের আইকন পাওয়ার ফাংশন
 */
export function getLoyaltyStatusIcon(status: LoyaltyStatus): string {
  const icons: Record<LoyaltyStatus, string> = {
    active: '✅',
    inactive: '⭕',
    suspended: '⏸️',
  };
  return icons[status];
}
