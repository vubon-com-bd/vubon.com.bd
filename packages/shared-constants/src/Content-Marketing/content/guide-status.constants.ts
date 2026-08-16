/**
 * গাইডের স্ট্যাটাস সম্পর্কিত কনস্ট্যান্টসমূহ
 * @module Content-Marketing/content
 */

/**
 * গাইডের সব স্ট্যাটাস
 */
export const GUIDE_STATUSES = ['draft', 'published', 'archived', 'deleted'] as const;

/**
 * গাইড স্ট্যাটাস টাইপ
 */
export type GuideStatus = (typeof GUIDE_STATUSES)[number];

/**
 * গাইড স্ট্যাটাসের কালার কোড
 */
export const GUIDE_STATUS_COLORS = {
  draft: 'gray',
  published: 'green',
  archived: 'orange',
  deleted: 'red',
} as const satisfies Record<GuideStatus, string>;

/**
 * গাইড স্ট্যাটাস লেবেল (বাংলা এবং ইংরেজি)
 */
export const GUIDE_STATUS_LABELS = {
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
  deleted: {
    en: 'Deleted',
    bn: 'মুছে ফেলা',
  },
} as const satisfies Record<GuideStatus, { en: string; bn: string }>;

/**
 * নির্দিষ্ট স্ট্যাটাসের জন্য কালার পাওয়ার ফাংশন
 */
export function getGuideStatusColor(status: GuideStatus): string {
  return GUIDE_STATUS_COLORS[status];
}

/**
 * নির্দিষ্ট স্ট্যাটাসের জন্য লেবেল পাওয়ার ফাংশন
 */
export function getGuideStatusLabel(status: GuideStatus, lang: 'en' | 'bn' = 'en'): string {
  return GUIDE_STATUS_LABELS[status][lang];
}

/**
 * সব গাইড স্ট্যাটাসের তালিকা পাওয়ার ফাংশন
 */
export function getAllGuideStatuses(): readonly GuideStatus[] {
  return GUIDE_STATUSES;
}

/**
 * গাইড স্ট্যাটাস বৈধ কিনা চেক করার ফাংশন
 */
export function isValidGuideStatus(status: string): status is GuideStatus {
  return GUIDE_STATUSES.includes(status as GuideStatus);
}

/**
 * গাইড ড্রাফট কিনা চেক করার ফাংশন
 */
export function isGuideDraft(status: GuideStatus): boolean {
  return status === 'draft';
}

/**
 * গাইড প্রকাশিত কিনা চেক করার ফাংশন
 */
export function isGuidePublished(status: GuideStatus): boolean {
  return status === 'published';
}

/**
 * গাইড আর্কাইভড কিনা চেক করার ফাংশন
 */
export function isGuideArchived(status: GuideStatus): boolean {
  return status === 'archived';
}

/**
 * গাইড ডিলিটেড কিনা চেক করার ফাংশন
 */
export function isGuideDeleted(status: GuideStatus): boolean {
  return status === 'deleted';
}

/**
 * গাইড প্রকাশযোগ্য কিনা চেক করার ফাংশন
 */
export function isGuidePublishable(status: GuideStatus): boolean {
  return status === 'draft';
}

/**
 * গাইড এডিটযোগ্য কিনা চেক করার ফাংশন
 */
export function isGuideEditable(status: GuideStatus): boolean {
  return status === 'draft' || status === 'published';
}

/**
 * গাইড ডিলিট করা যায় কিনা চেক করার ফাংশন
 */
export function isGuideDeletable(status: GuideStatus): boolean {
  return status !== 'deleted';
}

/**
 * গাইড আর্কাইভ করা যায় কিনা চেক করার ফাংশন
 */
export function isGuideArchivable(status: GuideStatus): boolean {
  return status === 'published' || status === 'draft';
}

/**
 * গাইড পুনরুদ্ধার করা যায় কিনা চেক করার ফাংশন
 */
export function isGuideRestorable(status: GuideStatus): boolean {
  return status === 'archived' || status === 'deleted';
}

/**
 * স্ট্যাটাস ট্রানজিশন অনুমোদিত কিনা চেক করার ফাংশন
 */
export function canGuideTransitionTo(currentStatus: GuideStatus, newStatus: GuideStatus): boolean {
  const transitions: Record<GuideStatus, GuideStatus[]> = {
    draft: ['published', 'archived', 'deleted'],
    published: ['archived', 'deleted'],
    archived: ['published', 'deleted'],
    deleted: [],
  };
  return transitions[currentStatus].includes(newStatus);
}

/**
 * ডিফল্ট গাইড স্ট্যাটাস পাওয়ার ফাংশন
 */
export function getDefaultGuideStatus(): GuideStatus {
  return 'draft';
}
