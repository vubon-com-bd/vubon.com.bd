/**
 * ব্লগ স্ট্যাটাস সম্পর্কিত কনস্ট্যান্টসমূহ
 * @module Content-Marketing/content
 */

/**
 * ব্লগের সব স্ট্যাটাস
 */
export const BLOG_STATUSES = [
  'draft',
  'pending-review',
  'published',
  'scheduled',
  'archived',
  'deleted',
] as const;

/**
 * প্রতিটি স্ট্যাটাসের জন্য কালার কোড
 */
export const BLOG_STATUS_COLORS = {
  draft: 'gray',
  'pending-review': 'yellow',
  published: 'green',
  scheduled: 'blue',
  archived: 'orange',
  deleted: 'red',
} as const satisfies Record<(typeof BLOG_STATUSES)[number], string>;

/**
 * প্রতিটি স্ট্যাটাসের জন্য লেবেল (বাংলা এবং ইংরেজি)
 */
export const BLOG_STATUS_LABELS = {
  draft: {
    en: 'Draft',
    bn: 'খসড়া',
  },
  'pending-review': {
    en: 'Pending Review',
    bn: 'পর্যালোচনার অপেক্ষায়',
  },
  published: {
    en: 'Published',
    bn: 'প্রকাশিত',
  },
  scheduled: {
    en: 'Scheduled',
    bn: 'নির্ধারিত',
  },
  archived: {
    en: 'Archived',
    bn: 'আর্কাইভড',
  },
  deleted: {
    en: 'Deleted',
    bn: 'মুছে ফেলা',
  },
} as const satisfies Record<(typeof BLOG_STATUSES)[number], { en: string; bn: string }>;

/**
 * যেসব স্ট্যাটাসে ব্লগ প্রকাশিত হিসেবে বিবেচিত হবে
 */
export const PUBLISHABLE_STATUSES = ['published', 'scheduled'] as const;

/**
 * ব্লগ স্ট্যাটাস টাইপ
 */
export type BlogStatus = (typeof BLOG_STATUSES)[number];

/**
 * পাবলিশেবল স্ট্যাটাস টাইপ
 */
export type PublishableStatus = (typeof PUBLISHABLE_STATUSES)[number];

/**
 * ভাষা টাইপ
 */
export type Language = 'en' | 'bn';

/**
 * নির্দিষ্ট স্ট্যাটাসের জন্য কালার পাওয়ার ফাংশন
 */
export function getBlogStatusColor(status: BlogStatus): string {
  return BLOG_STATUS_COLORS[status];
}

/**
 * নির্দিষ্ট স্ট্যাটাসের জন্য লেবেল পাওয়ার ফাংশন
 */
export function getBlogStatusLabel(status: BlogStatus, lang: Language = 'en'): string {
  return BLOG_STATUS_LABELS[status][lang];
}

/**
 * সব ব্লগ স্ট্যাটাসের তালিকা পাওয়ার ফাংশন
 */
export function getAllBlogStatuses(): readonly BlogStatus[] {
  return BLOG_STATUSES;
}

/**
 * ব্লগ স্ট্যাটাস বৈধ কিনা চেক করার ফাংশন
 */
export function isValidBlogStatus(status: string): status is BlogStatus {
  return BLOG_STATUSES.includes(status as BlogStatus);
}

/**
 * স্ট্যাটাস পাবলিশেবল কিনা চেক করার ফাংশন
 */
export function isPublishableStatus(status: BlogStatus): boolean {
  return PUBLISHABLE_STATUSES.includes(status as PublishableStatus);
}

/**
 * ব্লগ এডিটযোগ্য কিনা চেক করার ফাংশন (ড্রাফট এবং পেন্ডিং রিভিউ)
 */
export function isBlogEditable(status: BlogStatus): boolean {
  return ['draft', 'pending-review'].includes(status);
}

/**
 * ব্লগ ডিলিট করা যায় কিনা চেক করার ফাংশন
 */
export function isBlogDeletable(status: BlogStatus): boolean {
  return status !== 'published' && status !== 'scheduled';
}

/**
 * ব্লগ আর্কাইভ করা যায় কিনা চেক করার ফাংশন
 */
export function isBlogArchivable(status: BlogStatus): boolean {
  return status === 'published' || status === 'scheduled';
}

/**
 * স্ট্যাটাস ট্রানজিশন অনুমোদিত কিনা চেক করার ফাংশন
 */
export function canTransitionTo(currentStatus: BlogStatus, newStatus: BlogStatus): boolean {
  const transitions: Record<BlogStatus, BlogStatus[]> = {
    draft: ['pending-review', 'archived', 'deleted'],
    'pending-review': ['draft', 'published', 'archived', 'deleted'],
    published: ['archived', 'deleted'],
    scheduled: ['draft', 'published', 'archived', 'deleted'],
    archived: ['draft', 'deleted'],
    deleted: [],
  };
  return transitions[currentStatus].includes(newStatus);
}

/**
 * পাবলিশেবল স্ট্যাটাসের তালিকা পাওয়ার ফাংশন
 */
export function getPublishableStatuses(): readonly PublishableStatus[] {
  return PUBLISHABLE_STATUSES;
}
