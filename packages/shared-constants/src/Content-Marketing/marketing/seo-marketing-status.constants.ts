/**
 * SEO মার্কেটিং এর স্ট্যাটাস সম্পর্কিত কনস্ট্যান্টসমূহ
 * @module Content-Marketing/marketing
 */

/**
 * SEO এর সব স্ট্যাটাস
 */
export const SEO_STATUSES = ['draft', 'active', 'paused', 'completed'] as const;

/**
 * প্রতিটি স্ট্যাটাসের জন্য কালার কোড
 */
export const SEO_STATUS_COLORS = {
  draft: 'gray',
  active: 'green',
  paused: 'yellow',
  completed: 'blue',
} as const satisfies Record<(typeof SEO_STATUSES)[number], string>;

/**
 * প্রতিটি স্ট্যাটাসের জন্য লেবেল (বাংলা এবং ইংরেজি)
 */
export const SEO_STATUS_LABELS = {
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
} as const satisfies Record<(typeof SEO_STATUSES)[number], { en: string; bn: string }>;

/**
 * SEO স্ট্যাটাস টাইপ
 */
export type SeoStatus = (typeof SEO_STATUSES)[number];

/**
 * ভাষা টাইপ
 */
export type Language = 'en' | 'bn';

/**
 * নির্দিষ্ট স্ট্যাটাসের জন্য কালার পাওয়ার ফাংশন
 */
export function getSeoStatusColor(status: SeoStatus): string {
  return SEO_STATUS_COLORS[status];
}

/**
 * নির্দিষ্ট স্ট্যাটাসের জন্য লেবেল পাওয়ার ফাংশন
 */
export function getSeoStatusLabel(status: SeoStatus, lang: Language = 'en'): string {
  return SEO_STATUS_LABELS[status][lang];
}

/**
 * সব SEO স্ট্যাটাসের তালিকা পাওয়ার ফাংশন
 */
export function getAllSeoStatuses(): readonly SeoStatus[] {
  return SEO_STATUSES;
}

/**
 * SEO স্ট্যাটাস বৈধ কিনা চেক করার ফাংশন
 */
export function isValidSeoStatus(status: string): status is SeoStatus {
  return SEO_STATUSES.includes(status as SeoStatus);
}

/**
 * স্ট্যাটাস ড্রাফট কিনা চেক করার ফাংশন
 */
export function isDraftSeoStatus(status: SeoStatus): boolean {
  return status === 'draft';
}

/**
 * স্ট্যাটাস সক্রিয় কিনা চেক করার ফাংশন
 */
export function isActiveSeoStatus(status: SeoStatus): boolean {
  return status === 'active';
}

/**
 * স্ট্যাটাস বিরাম দেওয়া কিনা চেক করার ফাংশন
 */
export function isPausedSeoStatus(status: SeoStatus): boolean {
  return status === 'paused';
}

/**
 * স্ট্যাটাস সম্পন্ন কিনা চেক করার ফাংশন
 */
export function isCompletedSeoStatus(status: SeoStatus): boolean {
  return status === 'completed';
}

/**
 * স্ট্যাটাস টার্মিনাল (কমপ্লিটেড) কিনা চেক করার ফাংশন
 */
export function isTerminalSeoStatus(status: SeoStatus): boolean {
  return status === 'completed';
}

/**
 * স্ট্যাটাস অ্যাক্টিভ (অ্যাক্টিভ) কিনা চেক করার ফাংশন
 */
export function isActiveSeoStatusGroup(status: SeoStatus): boolean {
  return status === 'active' || status === 'paused';
}

/**
 * স্ট্যাটাস এডিটযোগ্য (ড্রাফট) কিনা চেক করার ফাংশন
 */
export function isEditableSeoStatus(status: SeoStatus): boolean {
  return status === 'draft';
}

/**
 * স্ট্যাটাস ট্রানজিশন অনুমোদিত কিনা চেক করার ফাংশন
 */
export function canSeoTransitionTo(currentStatus: SeoStatus, newStatus: SeoStatus): boolean {
  const transitions: Record<SeoStatus, SeoStatus[]> = {
    draft: ['active', 'paused', 'completed'],
    active: ['paused', 'completed'],
    paused: ['active', 'completed'],
    completed: [],
  };
  return transitions[currentStatus].includes(newStatus);
}

/**
 * ডিফল্ট SEO স্ট্যাটাস পাওয়ার ফাংশন
 */
export function getDefaultSeoStatus(): SeoStatus {
  return 'draft';
}

/**
 * স্ট্যাটাসের আইকন পাওয়ার ফাংশন
 */
export function getSeoStatusIcon(status: SeoStatus): string {
  const icons: Record<SeoStatus, string> = {
    draft: '📝',
    active: '▶️',
    paused: '⏸️',
    completed: '✅',
  };
  return icons[status];
}
