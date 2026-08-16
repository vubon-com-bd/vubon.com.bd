/**
 * ই-বুকের স্ট্যাটাস সম্পর্কিত কনস্ট্যান্টসমূহ
 * @module Content-Marketing/content
 */

/**
 * ই-বুকের সব স্ট্যাটাস
 */
export const EBOOK_STATUSES = ['draft', 'published', 'archived'] as const;

/**
 * ই-বুক স্ট্যাটাস টাইপ
 */
export type EbookStatus = (typeof EBOOK_STATUSES)[number];

/**
 * ই-বুক স্ট্যাটাসের কালার কোড
 */
export const EBOOK_STATUS_COLORS = {
  draft: 'gray',
  published: 'green',
  archived: 'orange',
} as const satisfies Record<EbookStatus, string>;

/**
 * ই-বুক স্ট্যাটাস লেবেল (বাংলা এবং ইংরেজি)
 */
export const EBOOK_STATUS_LABELS = {
  draft: {
    en: 'Draft',
    bn: 'খসড়া',
  },
  published: {
    en: 'Published',
    bn: 'প্রকাশিত',
  },
  archived: {
    en: 'Archived',
    bn: 'আর্কাইভড',
  },
} as const satisfies Record<EbookStatus, { en: string; bn: string }>;

/**
 * নির্দিষ্ট স্ট্যাটাসের জন্য কালার পাওয়ার ফাংশন
 */
export function getEbookStatusColor(status: EbookStatus): string {
  return EBOOK_STATUS_COLORS[status];
}

/**
 * নির্দিষ্ট স্ট্যাটাসের জন্য লেবেল পাওয়ার ফাংশন
 */
export function getEbookStatusLabel(status: EbookStatus, lang: 'en' | 'bn' = 'en'): string {
  return EBOOK_STATUS_LABELS[status][lang];
}

/**
 * সব ই-বুক স্ট্যাটাসের তালিকা পাওয়ার ফাংশন
 */
export function getAllEbookStatuses(): readonly EbookStatus[] {
  return EBOOK_STATUSES;
}

/**
 * ই-বুক স্ট্যাটাস বৈধ কিনা চেক করার ফাংশন
 */
export function isValidEbookStatus(status: string): status is EbookStatus {
  return EBOOK_STATUSES.includes(status as EbookStatus);
}

/**
 * ই-বুক ড্রাফট কিনা চেক করার ফাংশন
 */
export function isEbookDraft(status: EbookStatus): boolean {
  return status === 'draft';
}

/**
 * ই-বুক প্রকাশিত কিনা চেক করার ফাংশন
 */
export function isEbookPublished(status: EbookStatus): boolean {
  return status === 'published';
}

/**
 * ই-বুক আর্কাইভড কিনা চেক করার ফাংশন
 */
export function isEbookArchived(status: EbookStatus): boolean {
  return status === 'archived';
}

/**
 * ই-বুক প্রকাশযোগ্য কিনা চেক করার ফাংশন
 */
export function isEbookPublishable(status: EbookStatus): boolean {
  return status === 'draft';
}

/**
 * ই-বুক এডিটযোগ্য কিনা চেক করার ফাংশন
 */
export function isEbookEditable(status: EbookStatus): boolean {
  return status === 'draft' || status === 'published';
}

/**
 * ই-বুক আর্কাইভ করা যায় কিনা চেক করার ফাংশন
 */
export function isEbookArchivable(status: EbookStatus): boolean {
  return status === 'published' || status === 'draft';
}

/**
 * ই-বুক পুনরুদ্ধার করা যায় কিনা চেক করার ফাংশন
 */
export function isEbookRestorable(status: EbookStatus): boolean {
  return status === 'archived';
}

/**
 * স্ট্যাটাস ট্রানজিশন অনুমোদিত কিনা চেক করার ফাংশন
 */
export function canEbookTransitionTo(currentStatus: EbookStatus, newStatus: EbookStatus): boolean {
  const transitions: Record<EbookStatus, EbookStatus[]> = {
    draft: ['published', 'archived'],
    published: ['archived'],
    archived: ['published'],
  };
  return transitions[currentStatus].includes(newStatus);
}

/**
 * ডিফল্ট ই-বুক স্ট্যাটাস পাওয়ার ফাংশন
 */
export function getDefaultEbookStatus(): EbookStatus {
  return 'draft';
}
