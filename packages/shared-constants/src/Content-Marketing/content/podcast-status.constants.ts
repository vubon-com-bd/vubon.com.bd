/**
 * পডকাস্টের স্ট্যাটাস সম্পর্কিত কনস্ট্যান্টসমূহ
 * @module Content-Marketing/content
 */

/**
 * পডকাস্টের সব স্ট্যাটাস
 */
export const PODCAST_STATUSES = ['draft', 'published', 'archived'] as const;

/**
 * পডকাস্ট স্ট্যাটাস টাইপ
 */
export type PodcastStatus = (typeof PODCAST_STATUSES)[number];

/**
 * পডকাস্ট স্ট্যাটাসের কালার কোড
 */
export const PODCAST_STATUS_COLORS = {
  draft: 'gray',
  published: 'green',
  archived: 'orange',
} as const satisfies Record<PodcastStatus, string>;

/**
 * পডকাস্ট স্ট্যাটাস লেবেল (বাংলা এবং ইংরেজি)
 */
export const PODCAST_STATUS_LABELS = {
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
} as const satisfies Record<PodcastStatus, { en: string; bn: string }>;

/**
 * নির্দিষ্ট স্ট্যাটাসের জন্য কালার পাওয়ার ফাংশন
 */
export function getPodcastStatusColor(status: PodcastStatus): string {
  return PODCAST_STATUS_COLORS[status];
}

/**
 * নির্দিষ্ট স্ট্যাটাসের জন্য লেবেল পাওয়ার ফাংশন
 */
export function getPodcastStatusLabel(status: PodcastStatus, lang: 'en' | 'bn' = 'en'): string {
  return PODCAST_STATUS_LABELS[status][lang];
}

/**
 * সব পডকাস্ট স্ট্যাটাসের তালিকা পাওয়ার ফাংশন
 */
export function getAllPodcastStatuses(): readonly PodcastStatus[] {
  return PODCAST_STATUSES;
}

/**
 * পডকাস্ট স্ট্যাটাস বৈধ কিনা চেক করার ফাংশন
 */
export function isValidPodcastStatus(status: string): status is PodcastStatus {
  return PODCAST_STATUSES.includes(status as PodcastStatus);
}

/**
 * পডকাস্ট ড্রাফট কিনা চেক করার ফাংশন
 */
export function isPodcastDraft(status: PodcastStatus): boolean {
  return status === 'draft';
}

/**
 * পডকাস্ট প্রকাশিত কিনা চেক করার ফাংশন
 */
export function isPodcastPublished(status: PodcastStatus): boolean {
  return status === 'published';
}

/**
 * পডকাস্ট আর্কাইভড কিনা চেক করার ফাংশন
 */
export function isPodcastArchived(status: PodcastStatus): boolean {
  return status === 'archived';
}

/**
 * পডকাস্ট প্রকাশযোগ্য কিনা চেক করার ফাংশন
 */
export function isPodcastPublishable(status: PodcastStatus): boolean {
  return status === 'draft';
}

/**
 * পডকাস্ট এডিটযোগ্য কিনা চেক করার ফাংশন
 */
export function isPodcastEditable(status: PodcastStatus): boolean {
  return status === 'draft' || status === 'published';
}

/**
 * পডকাস্ট আর্কাইভ করা যায় কিনা চেক করার ফাংশন
 */
export function isPodcastArchivable(status: PodcastStatus): boolean {
  return status === 'published' || status === 'draft';
}

/**
 * পডকাস্ট পুনরুদ্ধার করা যায় কিনা চেক করার ফাংশন
 */
export function isPodcastRestorable(status: PodcastStatus): boolean {
  return status === 'archived';
}

/**
 * স্ট্যাটাস ট্রানজিশন অনুমোদিত কিনা চেক করার ফাংশন
 */
export function canPodcastTransitionTo(
  currentStatus: PodcastStatus,
  newStatus: PodcastStatus
): boolean {
  const transitions: Record<PodcastStatus, PodcastStatus[]> = {
    draft: ['published', 'archived'],
    published: ['archived'],
    archived: ['published'],
  };
  return transitions[currentStatus].includes(newStatus);
}

/**
 * ডিফল্ট পডকাস্ট স্ট্যাটাস পাওয়ার ফাংশন
 */
export function getDefaultPodcastStatus(): PodcastStatus {
  return 'draft';
}
