/**
 * ভিডিওর স্ট্যাটাস সম্পর্কিত কনস্ট্যান্টসমূহ
 * @module Content-Marketing/content
 */

/**
 * ভিডিওর সব স্ট্যাটাস
 */
export const VIDEO_STATUSES = ['draft', 'published', 'archived', 'deleted'] as const;

/**
 * ভিডিও স্ট্যাটাস টাইপ
 */
export type VideoStatus = (typeof VIDEO_STATUSES)[number];

/**
 * ভিডিও স্ট্যাটাসের কালার কোড
 */
export const VIDEO_STATUS_COLORS = {
  draft: 'gray',
  published: 'green',
  archived: 'orange',
  deleted: 'red',
} as const satisfies Record<VideoStatus, string>;

/**
 * ভিডিও স্ট্যাটাস লেবেল (বাংলা এবং ইংরেজি)
 */
export const VIDEO_STATUS_LABELS = {
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
} as const satisfies Record<VideoStatus, { en: string; bn: string }>;

/**
 * নির্দিষ্ট স্ট্যাটাসের জন্য কালার পাওয়ার ফাংশন
 */
export function getVideoStatusColor(status: VideoStatus): string {
  return VIDEO_STATUS_COLORS[status];
}

/**
 * নির্দিষ্ট স্ট্যাটাসের জন্য লেবেল পাওয়ার ফাংশন
 */
export function getVideoStatusLabel(status: VideoStatus, lang: 'en' | 'bn' = 'en'): string {
  return VIDEO_STATUS_LABELS[status][lang];
}

/**
 * সব ভিডিও স্ট্যাটাসের তালিকা পাওয়ার ফাংশন
 */
export function getAllVideoStatuses(): readonly VideoStatus[] {
  return VIDEO_STATUSES;
}

/**
 * ভিডিও স্ট্যাটাস বৈধ কিনা চেক করার ফাংশন
 */
export function isValidVideoStatus(status: string): status is VideoStatus {
  return VIDEO_STATUSES.includes(status as VideoStatus);
}

/**
 * ভিডিও ড্রাফট কিনা চেক করার ফাংশন
 */
export function isVideoDraft(status: VideoStatus): boolean {
  return status === 'draft';
}

/**
 * ভিডিও প্রকাশিত কিনা চেক করার ফাংশন
 */
export function isVideoPublished(status: VideoStatus): boolean {
  return status === 'published';
}

/**
 * ভিডিও আর্কাইভড কিনা চেক করার ফাংশন
 */
export function isVideoArchived(status: VideoStatus): boolean {
  return status === 'archived';
}

/**
 * ভিডিও ডিলিটেড কিনা চেক করার ফাংশন
 */
export function isVideoDeleted(status: VideoStatus): boolean {
  return status === 'deleted';
}

/**
 * ভিডিও প্রকাশযোগ্য কিনা চেক করার ফাংশন
 */
export function isVideoPublishable(status: VideoStatus): boolean {
  return status === 'draft';
}

/**
 * ভিডিও এডিটযোগ্য কিনা চেক করার ফাংশন
 */
export function isVideoEditable(status: VideoStatus): boolean {
  return status === 'draft' || status === 'published';
}

/**
 * ভিডিও ডিলিট করা যায় কিনা চেক করার ফাংশন
 */
export function isVideoDeletable(status: VideoStatus): boolean {
  return status !== 'deleted';
}

/**
 * ভিডিও আর্কাইভ করা যায় কিনা চেক করার ফাংশন
 */
export function isVideoArchivable(status: VideoStatus): boolean {
  return status === 'published' || status === 'draft';
}

/**
 * ভিডিও পুনরুদ্ধার করা যায় কিনা চেক করার ফাংশন
 */
export function isVideoRestorable(status: VideoStatus): boolean {
  return status === 'archived' || status === 'deleted';
}

/**
 * স্ট্যাটাস ট্রানজিশন অনুমোদিত কিনা চেক করার ফাংশন
 */
export function canVideoTransitionTo(currentStatus: VideoStatus, newStatus: VideoStatus): boolean {
  const transitions: Record<VideoStatus, VideoStatus[]> = {
    draft: ['published', 'archived', 'deleted'],
    published: ['archived', 'deleted'],
    archived: ['published', 'deleted'],
    deleted: [],
  };
  return transitions[currentStatus].includes(newStatus);
}

/**
 * ডিফল্ট ভিডিও স্ট্যাটাস পাওয়ার ফাংশন
 */
export function getDefaultVideoStatus(): VideoStatus {
  return 'draft';
}
