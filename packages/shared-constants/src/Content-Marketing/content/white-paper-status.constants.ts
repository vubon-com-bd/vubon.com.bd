/**
 * হোয়াইট পেপারের স্ট্যাটাস সম্পর্কিত কনস্ট্যান্টসমূহ
 * @module Content-Marketing/content
 */

/**
 * হোয়াইট পেপারের সব স্ট্যাটাস
 */
export const WHITE_PAPER_STATUSES = ['draft', 'published', 'archived'] as const;

/**
 * হোয়াইট পেপার স্ট্যাটাস টাইপ
 */
export type WhitePaperStatus = (typeof WHITE_PAPER_STATUSES)[number];

/**
 * হোয়াইট পেপার স্ট্যাটাসের কালার কোড
 */
export const WHITE_PAPER_STATUS_COLORS = {
  draft: 'gray',
  published: 'green',
  archived: 'orange',
} as const satisfies Record<WhitePaperStatus, string>;

/**
 * হোয়াইট পেপার স্ট্যাটাস লেবেল (বাংলা এবং ইংরেজি)
 */
export const WHITE_PAPER_STATUS_LABELS = {
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
} as const satisfies Record<WhitePaperStatus, { en: string; bn: string }>;

/**
 * নির্দিষ্ট স্ট্যাটাসের জন্য কালার পাওয়ার ফাংশন
 */
export function getWhitePaperStatusColor(status: WhitePaperStatus): string {
  return WHITE_PAPER_STATUS_COLORS[status];
}

/**
 * নির্দিষ্ট স্ট্যাটাসের জন্য লেবেল পাওয়ার ফাংশন
 */
export function getWhitePaperStatusLabel(
  status: WhitePaperStatus,
  lang: 'en' | 'bn' = 'en'
): string {
  return WHITE_PAPER_STATUS_LABELS[status][lang];
}

/**
 * সব হোয়াইট পেপার স্ট্যাটাসের তালিকা পাওয়ার ফাংশন
 */
export function getAllWhitePaperStatuses(): readonly WhitePaperStatus[] {
  return WHITE_PAPER_STATUSES;
}

/**
 * হোয়াইট পেপার স্ট্যাটাস বৈধ কিনা চেক করার ফাংশন
 */
export function isValidWhitePaperStatus(status: string): status is WhitePaperStatus {
  return WHITE_PAPER_STATUSES.includes(status as WhitePaperStatus);
}

/**
 * হোয়াইট পেপার ড্রাফট কিনা চেক করার ফাংশন
 */
export function isWhitePaperDraft(status: WhitePaperStatus): boolean {
  return status === 'draft';
}

/**
 * হোয়াইট পেপার প্রকাশিত কিনা চেক করার ফাংশন
 */
export function isWhitePaperPublished(status: WhitePaperStatus): boolean {
  return status === 'published';
}

/**
 * হোয়াইট পেপার আর্কাইভড কিনা চেক করার ফাংশন
 */
export function isWhitePaperArchived(status: WhitePaperStatus): boolean {
  return status === 'archived';
}

/**
 * হোয়াইট পেপার প্রকাশযোগ্য কিনা চেক করার ফাংশন
 */
export function isWhitePaperPublishable(status: WhitePaperStatus): boolean {
  return status === 'draft';
}

/**
 * হোয়াইট পেপার এডিটযোগ্য কিনা চেক করার ফাংশন
 */
export function isWhitePaperEditable(status: WhitePaperStatus): boolean {
  return status === 'draft' || status === 'published';
}

/**
 * হোয়াইট পেপার আর্কাইভ করা যায় কিনা চেক করার ফাংশন
 */
export function isWhitePaperArchivable(status: WhitePaperStatus): boolean {
  return status === 'published' || status === 'draft';
}

/**
 * হোয়াইট পেপার পুনরুদ্ধার করা যায় কিনা চেক করার ফাংশন
 */
export function isWhitePaperRestorable(status: WhitePaperStatus): boolean {
  return status === 'archived';
}

/**
 * স্ট্যাটাস ট্রানজিশন অনুমোদিত কিনা চেক করার ফাংশন
 */
export function canWhitePaperTransitionTo(
  currentStatus: WhitePaperStatus,
  newStatus: WhitePaperStatus
): boolean {
  const transitions: Record<WhitePaperStatus, WhitePaperStatus[]> = {
    draft: ['published', 'archived'],
    published: ['archived'],
    archived: ['published'],
  };
  return transitions[currentStatus].includes(newStatus);
}

/**
 * ডিফল্ট হোয়াইট পেপার স্ট্যাটাস পাওয়ার ফাংশন
 */
export function getDefaultWhitePaperStatus(): WhitePaperStatus {
  return 'draft';
}
