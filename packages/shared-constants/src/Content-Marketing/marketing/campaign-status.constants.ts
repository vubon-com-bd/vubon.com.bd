/**
 * ক্যাম্পেইনের স্ট্যাটাস সম্পর্কিত কনস্ট্যান্টসমূহ
 * @module Content-Marketing/marketing
 */

/**
 * ক্যাম্পেইনের সব স্ট্যাটাস
 */
export const CAMPAIGN_STATUSES = ['draft', 'active', 'paused', 'completed', 'cancelled'] as const;

/**
 * প্রতিটি স্ট্যাটাসের জন্য কালার কোড
 */
export const CAMPAIGN_STATUS_COLORS = {
  draft: 'gray',
  active: 'green',
  paused: 'yellow',
  completed: 'blue',
  cancelled: 'red',
} as const satisfies Record<(typeof CAMPAIGN_STATUSES)[number], string>;

/**
 * প্রতিটি স্ট্যাটাসের জন্য লেবেল (বাংলা এবং ইংরেজি)
 */
export const CAMPAIGN_STATUS_LABELS = {
  draft: {
    en: 'Draft',
    bn: 'খসড়া',
  },
  active: {
    en: 'Active',
    bn: 'সক্রিয়',
  },
  paused: {
    en: 'Paused',
    bn: 'বিরাম দেওয়া',
  },
  completed: {
    en: 'Completed',
    bn: 'সম্পন্ন',
  },
  cancelled: {
    en: 'Cancelled',
    bn: 'বাতিল করা হয়েছে',
  },
} as const satisfies Record<(typeof CAMPAIGN_STATUSES)[number], { en: string; bn: string }>;

/**
 * ক্যাম্পেইন স্ট্যাটাস টাইপ
 */
export type CampaignStatus = (typeof CAMPAIGN_STATUSES)[number];

/**
 * ভাষা টাইপ
 */
export type Language = 'en' | 'bn';

/**
 * নির্দিষ্ট স্ট্যাটাসের জন্য কালার পাওয়ার ফাংশন
 */
export function getCampaignStatusColor(status: CampaignStatus): string {
  return CAMPAIGN_STATUS_COLORS[status];
}

/**
 * নির্দিষ্ট স্ট্যাটাসের জন্য লেবেল পাওয়ার ফাংশন
 */
export function getCampaignStatusLabel(status: CampaignStatus, lang: Language = 'en'): string {
  return CAMPAIGN_STATUS_LABELS[status][lang];
}

/**
 * সব ক্যাম্পেইন স্ট্যাটাসের তালিকা পাওয়ার ফাংশন
 */
export function getAllCampaignStatuses(): readonly CampaignStatus[] {
  return CAMPAIGN_STATUSES;
}

/**
 * ক্যাম্পেইন স্ট্যাটাস বৈধ কিনা চেক করার ফাংশন
 */
export function isValidCampaignStatus(status: string): status is CampaignStatus {
  return CAMPAIGN_STATUSES.includes(status as CampaignStatus);
}

/**
 * স্ট্যাটাস সক্রিয় কিনা চেক করার ফাংশন
 */
export function isActiveStatus(status: CampaignStatus): boolean {
  return status === 'active';
}

/**
 * স্ট্যাটাস সম্পন্ন হয়েছে কিনা চেক করার ফাংশন
 */
export function isCompletedStatus(status: CampaignStatus): boolean {
  return status === 'completed' || status === 'cancelled';
}

/**
 * স্ট্যাটাস এডিটযোগ্য কিনা চেক করার ফাংশন
 */
export function isEditableStatus(status: CampaignStatus): boolean {
  return status === 'draft' || status === 'paused';
}

/**
 * স্ট্যাটাস পজ করা যায় কিনা চেক করার ফাংশন
 */
export function isPausableStatus(status: CampaignStatus): boolean {
  return status === 'active';
}

/**
 * স্ট্যাটাস রিজিউম করা যায় কিনা চেক করার ফাংশন
 */
export function isResumableStatus(status: CampaignStatus): boolean {
  return status === 'paused';
}

/**
 * স্ট্যাটাস ক্যান্সেল করা যায় কিনা চেক করার ফাংশন
 */
export function isCancellableStatus(status: CampaignStatus): boolean {
  return status === 'draft' || status === 'active' || status === 'paused';
}

/**
 * স্ট্যাটাস ট্রানজিশন অনুমোদিত কিনা চেক করার ফাংশন
 */
export function canCampaignTransitionTo(
  currentStatus: CampaignStatus,
  newStatus: CampaignStatus
): boolean {
  const transitions: Record<CampaignStatus, CampaignStatus[]> = {
    draft: ['active', 'cancelled'],
    active: ['paused', 'completed', 'cancelled'],
    paused: ['active', 'completed', 'cancelled'],
    completed: [],
    cancelled: [],
  };
  return transitions[currentStatus].includes(newStatus);
}

/**
 * ডিফল্ট ক্যাম্পেইন স্ট্যাটাস পাওয়ার ফাংশন
 */
export function getDefaultCampaignStatus(): CampaignStatus {
  return 'draft';
}
