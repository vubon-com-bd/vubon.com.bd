/**
 * অ্যাফিলিয়েটের স্ট্যাটাস সম্পর্কিত কনস্ট্যান্টসমূহ
 * @module Content-Marketing/marketing
 */

/**
 * অ্যাফিলিয়েটের সব স্ট্যাটাস
 */
export const AFFILIATE_STATUSES = ['pending', 'active', 'suspended', 'terminated'] as const;

/**
 * প্রতিটি স্ট্যাটাসের জন্য কালার কোড
 */
export const AFFILIATE_STATUS_COLORS = {
  pending: 'yellow',
  active: 'green',
  suspended: 'orange',
  terminated: 'red',
} as const satisfies Record<(typeof AFFILIATE_STATUSES)[number], string>;

/**
 * প্রতিটি স্ট্যাটাসের জন্য লেবেল (বাংলা এবং ইংরেজি)
 */
export const AFFILIATE_STATUS_LABELS = {
  pending: {
    en: 'Pending',
    bn: 'অপেক্ষমাণ',
  },
  active: {
    en: 'Active',
    bn: 'সক্রিয়',
  },
  suspended: {
    en: 'Suspended',
    bn: 'স্থগিত',
  },
  terminated: {
    en: 'Terminated',
    bn: 'বাতিল',
  },
} as const satisfies Record<(typeof AFFILIATE_STATUSES)[number], { en: string; bn: string }>;

/**
 * অ্যাফিলিয়েট স্ট্যাটাস টাইপ
 */
export type AffiliateStatus = (typeof AFFILIATE_STATUSES)[number];

/**
 * ভাষা টাইপ
 */
export type Language = 'en' | 'bn';

/**
 * নির্দিষ্ট স্ট্যাটাসের জন্য কালার পাওয়ার ফাংশন
 */
export function getAffiliateStatusColor(status: AffiliateStatus): string {
  return AFFILIATE_STATUS_COLORS[status];
}

/**
 * নির্দিষ্ট স্ট্যাটাসের জন্য লেবেল পাওয়ার ফাংশন
 */
export function getAffiliateStatusLabel(status: AffiliateStatus, lang: Language = 'en'): string {
  return AFFILIATE_STATUS_LABELS[status][lang];
}

/**
 * সব অ্যাফিলিয়েট স্ট্যাটাসের তালিকা পাওয়ার ফাংশন
 */
export function getAllAffiliateStatuses(): readonly AffiliateStatus[] {
  return AFFILIATE_STATUSES;
}

/**
 * অ্যাফিলিয়েট স্ট্যাটাস বৈধ কিনা চেক করার ফাংশন
 */
export function isValidAffiliateStatus(status: string): status is AffiliateStatus {
  return AFFILIATE_STATUSES.includes(status as AffiliateStatus);
}

/**
 * স্ট্যাটাস সক্রিয় কিনা চেক করার ফাংশন
 */
export function isActiveAffiliateStatus(status: AffiliateStatus): boolean {
  return status === 'active';
}

/**
 * স্ট্যাটাস পেন্ডিং কিনা চেক করার ফাংশন
 */
export function isPendingAffiliateStatus(status: AffiliateStatus): boolean {
  return status === 'pending';
}

/**
 * স্ট্যাটাস স্থগিত কিনা চেক করার ফাংশন
 */
export function isSuspendedAffiliateStatus(status: AffiliateStatus): boolean {
  return status === 'suspended';
}

/**
 * স্ট্যাটাস বাতিল কিনা চেক করার ফাংশন
 */
export function isTerminatedAffiliateStatus(status: AffiliateStatus): boolean {
  return status === 'terminated';
}

/**
 * স্ট্যাটাস এডিটযোগ্য কিনা চেক করার ফাংশন
 */
export function isEditableAffiliateStatus(status: AffiliateStatus): boolean {
  return status === 'pending' || status === 'active';
}

/**
 * স্ট্যাটাস অ্যাক্টিভেট করা যায় কিনা চেক করার ফাংশন
 */
export function isActivatableAffiliateStatus(status: AffiliateStatus): boolean {
  return status === 'pending';
}

/**
 * স্ট্যাটাস সাসপেন্ড করা যায় কিনা চেক করার ফাংশন
 */
export function isSuspendableAffiliateStatus(status: AffiliateStatus): boolean {
  return status === 'active';
}

/**
 * স্ট্যাটাস টারমিনেট করা যায় কিনা চেক করার ফাংশন
 */
export function isTerminatableAffiliateStatus(status: AffiliateStatus): boolean {
  return status === 'active' || status === 'suspended';
}

/**
 * স্ট্যাটাস ট্রানজিশন অনুমোদিত কিনা চেক করার ফাংশন
 */
export function canAffiliateTransitionTo(
  currentStatus: AffiliateStatus,
  newStatus: AffiliateStatus
): boolean {
  const transitions: Record<AffiliateStatus, AffiliateStatus[]> = {
    pending: ['active', 'terminated'],
    active: ['suspended', 'terminated'],
    suspended: ['active', 'terminated'],
    terminated: [],
  };
  return transitions[currentStatus].includes(newStatus);
}

/**
 * ডিফল্ট অ্যাফিলিয়েট স্ট্যাটাস পাওয়ার ফাংশন
 */
export function getDefaultAffiliateStatus(): AffiliateStatus {
  return 'pending';
}
