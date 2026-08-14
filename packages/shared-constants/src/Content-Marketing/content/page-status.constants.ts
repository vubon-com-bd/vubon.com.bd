/**
 * পেজ স্ট্যাটাস সম্পর্কিত কনস্ট্যান্টসমূহ
 * @module Content-Marketing/content
 */

/**
 * পেজের সব স্ট্যাটাস
 */
export const PAGE_STATUSES = ['draft', 'published', 'archived', 'deleted'] as const;

/**
 * প্রতিটি স্ট্যাটাসের জন্য কালার কোড
 */
export const PAGE_STATUS_COLORS = {
  draft: 'gray',
  published: 'green',
  archived: 'orange',
  deleted: 'red',
} as const satisfies Record<(typeof PAGE_STATUSES)[number], string>;

/**
 * পেজ স্ট্যাটাস টাইপ
 */
export type PageStatus = (typeof PAGE_STATUSES)[number];

/**
 * নির্দিষ্ট স্ট্যাটাসের জন্য কালার পাওয়ার ফাংশন
 */
export function getPageStatusColor(status: PageStatus): string {
  return PAGE_STATUS_COLORS[status];
}

/**
 * সব পেজ স্ট্যাটাসের তালিকা পাওয়ার ফাংশন
 */
export function getAllPageStatuses(): readonly PageStatus[] {
  return PAGE_STATUSES;
}

/**
 * পেজ স্ট্যাটাস বৈধ কিনা চেক করার ফাংশন
 */
export function isValidPageStatus(status: string): status is PageStatus {
  return PAGE_STATUSES.includes(status as PageStatus);
}

/**
 * পেজ পাবলিশ করা যায় কিনা চেক করার ফাংশন
 */
export function isPagePublishable(status: PageStatus): boolean {
  return status === 'draft' || status === 'archived';
}

/**
 * পেজ এডিটযোগ্য কিনা চেক করার ফাংশন
 */
export function isPageEditable(status: PageStatus): boolean {
  return status === 'draft';
}

/**
 * পেজ ডিলিট করা যায় কিনা চেক করার ফাংশন
 */
export function isPageDeletable(status: PageStatus): boolean {
  return status !== 'published';
}

/**
 * পেজ আর্কাইভ করা যায় কিনা চেক করার ফাংশন
 */
export function isPageArchivable(status: PageStatus): boolean {
  return status === 'published' || status === 'draft';
}

/**
 * স্ট্যাটাস ট্রানজিশন অনুমোদিত কিনা চেক করার ফাংশন
 */
export function canPageTransitionTo(currentStatus: PageStatus, newStatus: PageStatus): boolean {
  const transitions: Record<PageStatus, PageStatus[]> = {
    draft: ['published', 'archived', 'deleted'],
    published: ['archived', 'deleted'],
    archived: ['draft', 'published', 'deleted'],
    deleted: [],
  };
  return transitions[currentStatus].includes(newStatus);
}

/**
 * পেজ পাবলিশড কিনা চেক করার ফাংশন
 */
export function isPagePublished(status: PageStatus): boolean {
  return status === 'published';
}

/**
 * পেজ ড্রাফট কিনা চেক করার ফাংশন
 */
export function isPageDraft(status: PageStatus): boolean {
  return status === 'draft';
}
