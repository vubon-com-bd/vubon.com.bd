/**
 * ওয়েবিনারের স্ট্যাটাস সম্পর্কিত কনস্ট্যান্টসমূহ
 * @module Content-Marketing/content
 */

/**
 * ওয়েবিনারের সব স্ট্যাটাস
 */
export const WEBINAR_STATUSES = ['draft', 'scheduled', 'live', 'completed', 'cancelled'] as const;

/**
 * ওয়েবিনার স্ট্যাটাস টাইপ
 */
export type WebinarStatus = (typeof WEBINAR_STATUSES)[number];

/**
 * ওয়েবিনার স্ট্যাটাসের কালার কোড
 */
export const WEBINAR_STATUS_COLORS = {
  draft: 'gray',
  scheduled: 'blue',
  live: 'green',
  completed: 'purple',
  cancelled: 'red',
} as const satisfies Record<WebinarStatus, string>;

/**
 * ওয়েবিনার স্ট্যাটাস লেবেল (বাংলা এবং ইংরেজি)
 */
export const WEBINAR_STATUS_LABELS = {
  draft: {
    en: 'Draft',
    bn: 'খসড়া',
  },
  scheduled: {
    en: 'Scheduled',
    bn: 'নির্ধারিত',
  },
  live: {
    en: 'Live',
    bn: 'লাইভ',
  },
  completed: {
    en: 'Completed',
    bn: 'সম্পন্ন',
  },
  cancelled: {
    en: 'Cancelled',
    bn: 'বাতিল',
  },
} as const satisfies Record<WebinarStatus, { en: string; bn: string }>;

/**
 * নির্দিষ্ট স্ট্যাটাসের জন্য কালার পাওয়ার ফাংশন
 */
export function getWebinarStatusColor(status: WebinarStatus): string {
  return WEBINAR_STATUS_COLORS[status];
}

/**
 * নির্দিষ্ট স্ট্যাটাসের জন্য লেবেল পাওয়ার ফাংশন
 */
export function getWebinarStatusLabel(status: WebinarStatus, lang: 'en' | 'bn' = 'en'): string {
  return WEBINAR_STATUS_LABELS[status][lang];
}

/**
 * সব ওয়েবিনার স্ট্যাটাসের তালিকা পাওয়ার ফাংশন
 */
export function getAllWebinarStatuses(): readonly WebinarStatus[] {
  return WEBINAR_STATUSES;
}

/**
 * ওয়েবিনার স্ট্যাটাস বৈধ কিনা চেক করার ফাংশন
 */
export function isValidWebinarStatus(status: string): status is WebinarStatus {
  return WEBINAR_STATUSES.includes(status as WebinarStatus);
}

/**
 * ওয়েবিনার ড্রাফট কিনা চেক করার ফাংশন
 */
export function isWebinarDraft(status: WebinarStatus): boolean {
  return status === 'draft';
}

/**
 * ওয়েবিনার নির্ধারিত কিনা চেক করার ফাংশন
 */
export function isWebinarScheduled(status: WebinarStatus): boolean {
  return status === 'scheduled';
}

/**
 * ওয়েবিনার লাইভ কিনা চেক করার ফাংশন
 */
export function isWebinarLive(status: WebinarStatus): boolean {
  return status === 'live';
}

/**
 * ওয়েবিনার সম্পন্ন কিনা চেক করার ফাংশন
 */
export function isWebinarCompleted(status: WebinarStatus): boolean {
  return status === 'completed';
}

/**
 * ওয়েবিনার বাতিল কিনা চেক করার ফাংশন
 */
export function isWebinarCancelled(status: WebinarStatus): boolean {
  return status === 'cancelled';
}

/**
 * ওয়েবিনার সক্রিয় কিনা চেক করার ফাংশন (সক্রিয় বা লাইভ)
 */
export function isWebinarActive(status: WebinarStatus): boolean {
  return status === 'scheduled' || status === 'live';
}

/**
 * ওয়েবিনার শেষ হয়েছে কিনা চেক করার ফাংশন
 */
export function isWebinarEnded(status: WebinarStatus): boolean {
  return status === 'completed' || status === 'cancelled';
}

/**
 * ওয়েবিনার প্রকাশযোগ্য কিনা চেক করার ফাংশন
 */
export function isWebinarPublishable(status: WebinarStatus): boolean {
  return status === 'draft';
}

/**
 * ওয়েবিনার এডিটযোগ্য কিনা চেক করার ফাংশন
 */
export function isWebinarEditable(status: WebinarStatus): boolean {
  return status === 'draft' || status === 'scheduled';
}

/**
 * ওয়েবিনার বাতিল করা যায় কিনা চেক করার ফাংশন
 */
export function isWebinarCancellable(status: WebinarStatus): boolean {
  return status === 'scheduled' || status === 'live';
}

/**
 * ওয়েবিনার পুনরায় খোলা যায় কিনা চেক করার ফাংশন
 */
export function isWebinarReopenable(status: WebinarStatus): boolean {
  return status === 'completed' || status === 'cancelled';
}

/**
 * স্ট্যাটাস ট্রানজিশন অনুমোদিত কিনা চেক করার ফাংশন
 */
export function canWebinarTransitionTo(
  currentStatus: WebinarStatus,
  newStatus: WebinarStatus
): boolean {
  const transitions: Record<WebinarStatus, WebinarStatus[]> = {
    draft: ['scheduled', 'cancelled'],
    scheduled: ['live', 'cancelled'],
    live: ['completed', 'cancelled'],
    completed: ['draft', 'cancelled'],
    cancelled: ['draft', 'scheduled'],
  };
  return transitions[currentStatus].includes(newStatus);
}

/**
 * ডিফল্ট ওয়েবিনার স্ট্যাটাস পাওয়ার ফাংশন
 */
export function getDefaultWebinarStatus(): WebinarStatus {
  return 'draft';
}
