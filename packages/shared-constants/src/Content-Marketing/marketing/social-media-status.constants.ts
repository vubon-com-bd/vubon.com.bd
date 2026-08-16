/**
 * সোশ্যাল মিডিয়া পোস্টের স্ট্যাটাস সম্পর্কিত কনস্ট্যান্টসমূহ
 * @module Content-Marketing/marketing
 */

/**
 * সোশ্যাল মিডিয়া পোস্টের সব স্ট্যাটাস
 */
export const SOCIAL_STATUSES = ['draft', 'scheduled', 'published', 'failed'] as const;

/**
 * প্রতিটি স্ট্যাটাসের জন্য কালার কোড
 */
export const SOCIAL_STATUS_COLORS = {
  draft: 'gray',
  scheduled: 'blue',
  published: 'green',
  failed: 'red',
} as const satisfies Record<(typeof SOCIAL_STATUSES)[number], string>;

/**
 * প্রতিটি স্ট্যাটাসের জন্য লেবেল (বাংলা এবং ইংরেজি)
 */
export const SOCIAL_STATUS_LABELS = {
  draft: {
    en: 'Draft',
    bn: 'খসড়া',
  },
  scheduled: {
    en: 'Scheduled',
    bn: 'নির্ধারিত',
  },
  published: {
    en: 'Published',
    bn: 'প্রকাশিত',
  },
  failed: {
    en: 'Failed',
    bn: 'ব্যর্থ',
  },
} as const satisfies Record<(typeof SOCIAL_STATUSES)[number], { en: string; bn: string }>;

/**
 * সোশ্যাল মিডিয়া স্ট্যাটাস টাইপ
 */
export type SocialStatus = (typeof SOCIAL_STATUSES)[number];

/**
 * ভাষা টাইপ
 */
export type Language = 'en' | 'bn';

/**
 * নির্দিষ্ট স্ট্যাটাসের জন্য কালার পাওয়ার ফাংশন
 */
export function getSocialStatusColor(status: SocialStatus): string {
  return SOCIAL_STATUS_COLORS[status];
}

/**
 * নির্দিষ্ট স্ট্যাটাসের জন্য লেবেল পাওয়ার ফাংশন
 */
export function getSocialStatusLabel(status: SocialStatus, lang: Language = 'en'): string {
  return SOCIAL_STATUS_LABELS[status][lang];
}

/**
 * সব সোশ্যাল মিডিয়া স্ট্যাটাসের তালিকা পাওয়ার ফাংশন
 */
export function getAllSocialStatuses(): readonly SocialStatus[] {
  return SOCIAL_STATUSES;
}

/**
 * সোশ্যাল মিডিয়া স্ট্যাটাস বৈধ কিনা চেক করার ফাংশন
 */
export function isValidSocialStatus(status: string): status is SocialStatus {
  return SOCIAL_STATUSES.includes(status as SocialStatus);
}

/**
 * স্ট্যাটাস ড্রাফট কিনা চেক করার ফাংশন
 */
export function isDraftSocialStatus(status: SocialStatus): boolean {
  return status === 'draft';
}

/**
 * স্ট্যাটাস নির্ধারিত কিনা চেক করার ফাংশন
 */
export function isScheduledSocialStatus(status: SocialStatus): boolean {
  return status === 'scheduled';
}

/**
 * স্ট্যাটাস প্রকাশিত কিনা চেক করার ফাংশন
 */
export function isPublishedSocialStatus(status: SocialStatus): boolean {
  return status === 'published';
}

/**
 * স্ট্যাটাস ব্যর্থ কিনা চেক করার ফাংশন
 */
export function isFailedSocialStatus(status: SocialStatus): boolean {
  return status === 'failed';
}

/**
 * স্ট্যাটাস টার্মিনাল (পাবলিশড বা ফেইলড) কিনা চেক করার ফাংশন
 */
export function isTerminalSocialStatus(status: SocialStatus): boolean {
  return status === 'published' || status === 'failed';
}

/**
 * স্ট্যাটাস অ্যাক্টিভ (শিডিউলড) কিনা চেক করার ফাংশন
 */
export function isActiveSocialStatus(status: SocialStatus): boolean {
  return status === 'scheduled';
}

/**
 * স্ট্যাটাস এডিটযোগ্য (ড্রাফট) কিনা চেক করার ফাংশন
 */
export function isEditableSocialStatus(status: SocialStatus): boolean {
  return status === 'draft';
}

/**
 * স্ট্যাটাস ট্রানজিশন অনুমোদিত কিনা চেক করার ফাংশন
 */
export function canSocialTransitionTo(
  currentStatus: SocialStatus,
  newStatus: SocialStatus
): boolean {
  const transitions: Record<SocialStatus, SocialStatus[]> = {
    draft: ['scheduled', 'published', 'failed'],
    scheduled: ['published', 'failed'],
    published: [],
    failed: ['draft'],
  };
  return transitions[currentStatus].includes(newStatus);
}

/**
 * ডিফল্ট সোশ্যাল মিডিয়া স্ট্যাটাস পাওয়ার ফাংশন
 */
export function getDefaultSocialStatus(): SocialStatus {
  return 'draft';
}

/**
 * স্ট্যাটাসের আইকন পাওয়ার ফাংশন
 */
export function getSocialStatusIcon(status: SocialStatus): string {
  const icons: Record<SocialStatus, string> = {
    draft: '📝',
    scheduled: '📅',
    published: '📢',
    failed: '❌',
  };
  return icons[status];
}
