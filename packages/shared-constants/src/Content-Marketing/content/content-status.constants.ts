/**
 * কন্টেন্ট স্ট্যাটাস সম্পর্কিত কনস্ট্যান্টসমূহ
 * @module Content-Marketing/content
 */

/**
 * কন্টেন্টের সব স্ট্যাটাস
 */
export const CONTENT_STATUSES = [
  'draft',
  'pending',
  'published',
  'archived',
  'deleted',
  'scheduled',
] as const;

/**
 * প্রতিটি স্ট্যাটাসের জন্য কালার কোড
 */
export const CONTENT_STATUS_COLORS = {
  draft: 'gray',
  pending: 'yellow',
  published: 'green',
  archived: 'gray',
  deleted: 'red',
  scheduled: 'blue',
} as const satisfies Record<(typeof CONTENT_STATUSES)[number], string>;

/**
 * প্রতিটি স্ট্যাটাসের জন্য লেবেল (বাংলা এবং ইংরেজি)
 */
export const CONTENT_STATUS_LABELS = {
  draft: {
    en: 'Draft',
    bn: 'খসড়া',
  },
  pending: {
    en: 'Pending Review',
    bn: 'পর্যালোচনার অপেক্ষায়',
  },
  published: {
    en: 'Published',
    bn: 'প্রকাশিত',
  },
  archived: {
    en: 'Archived',
    bn: 'আর্কাইভড',
  },
  deleted: {
    en: 'Deleted',
    bn: 'মুছে ফেলা',
  },
  scheduled: {
    en: 'Scheduled',
    bn: 'নির্ধারিত',
  },
} as const satisfies Record<(typeof CONTENT_STATUSES)[number], { en: string; bn: string }>;

/**
 * কন্টেন্ট স্ট্যাটাস টাইপ
 */
export type ContentStatus = (typeof CONTENT_STATUSES)[number];

/**
 * কন্টেন্ট স্ট্যাটাস কালার টাইপ
 */
export type ContentStatusColor = typeof CONTENT_STATUS_COLORS;

/**
 * কন্টেন্ট স্ট্যাটাস লেবেল টাইপ
 */
export type ContentStatusLabel = typeof CONTENT_STATUS_LABELS;

/**
 * ভাষা টাইপ
 */
export type Language = 'en' | 'bn';

/**
 * নির্দিষ্ট স্ট্যাটাসের জন্য কালার পাওয়ার ফাংশন
 */
export function getContentStatusColor(status: ContentStatus): string {
  return CONTENT_STATUS_COLORS[status];
}

/**
 * নির্দিষ্ট স্ট্যাটাসের জন্য লেবেল পাওয়ার ফাংশন
 */
export function getContentStatusLabel(status: ContentStatus, lang: Language = 'en'): string {
  return CONTENT_STATUS_LABELS[status][lang];
}

/**
 * সব কন্টেন্ট স্ট্যাটাসের তালিকা পাওয়ার ফাংশন
 */
export function getAllContentStatuses(): readonly ContentStatus[] {
  return CONTENT_STATUSES;
}

/**
 * কন্টেন্ট স্ট্যাটাস বৈধ কিনা চেক করার ফাংশন
 */
export function isValidContentStatus(status: string): status is ContentStatus {
  return CONTENT_STATUSES.includes(status as ContentStatus);
}

/**
 * পাবলিশড স্ট্যাটাস চেক করার ফাংশন
 */
export function isPublishedStatus(status: ContentStatus): boolean {
  return status === 'published';
}

/**
 * এডিটেবল স্ট্যাটাস চেক করার ফাংশন
 */
export function isEditableStatus(status: ContentStatus): boolean {
  return ['draft', 'pending', 'scheduled'].includes(status);
}

/**
 * ডিলিটেড স্ট্যাটাস চেক করার ফাংশন
 */
export function isDeletedStatus(status: ContentStatus): boolean {
  return status === 'deleted';
}
