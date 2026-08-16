/**
 * পডকাস্টের ধরন সম্পর্কিত কনস্ট্যান্টসমূহ
 * @module Content-Marketing/content
 */

/**
 * পডকাস্টের ধরনসমূহ
 */
export const PODCAST_TYPES = ['interview', 'solo', 'panel', 'storytelling'] as const;

/**
 * পডকাস্ট টাইপ টাইপ
 */
export type PodcastType = (typeof PODCAST_TYPES)[number];

/**
 * পডকাস্ট টাইপের লেবেল (বাংলা এবং ইংরেজি)
 */
export const PODCAST_TYPE_LABELS = {
  interview: {
    en: 'Interview',
    bn: 'ইন্টারভিউ',
  },
  solo: {
    en: 'Solo',
    bn: 'একক',
  },
  panel: {
    en: 'Panel',
    bn: 'প্যানেল',
  },
  storytelling: {
    en: 'Storytelling',
    bn: 'গল্প বলা',
  },
} as const satisfies Record<PodcastType, { en: string; bn: string }>;

/**
 * পডকাস্ট টাইপের বিবরণ (বাংলা এবং ইংরেজি)
 */
export const PODCAST_TYPE_DESCRIPTIONS = {
  interview: {
    en: 'Interview with guests and experts',
    bn: 'অতিথি এবং বিশেষজ্ঞদের সাথে ইন্টারভিউ',
  },
  solo: {
    en: 'Solo presentation by the host',
    bn: 'হোস্টের একক উপস্থাপনা',
  },
  panel: {
    en: 'Panel discussion with multiple participants',
    bn: 'একাধিক অংশগ্রহণকারীদের সাথে প্যানেল আলোচনা',
  },
  storytelling: {
    en: 'Narrative and storytelling format',
    bn: 'আখ্যান এবং গল্প বলার ফরম্যাট',
  },
} as const satisfies Record<PodcastType, { en: string; bn: string }>;

/**
 * পডকাস্ট টাইপের আইকন
 */
export const PODCAST_TYPE_ICONS = {
  interview: '🎙️',
  solo: '🎤',
  panel: '👥',
  storytelling: '📖',
} as const satisfies Record<PodcastType, string>;

/**
 * পডকাস্ট টাইপের কালার
 */
export const PODCAST_TYPE_COLORS = {
  interview: 'blue',
  solo: 'purple',
  panel: 'green',
  storytelling: 'orange',
} as const satisfies Record<PodcastType, string>;

/**
 * নির্দিষ্ট পডকাস্ট টাইপের লেবেল পাওয়ার ফাংশন
 */
export function getPodcastTypeLabel(type: PodcastType, lang: 'en' | 'bn' = 'en'): string {
  return PODCAST_TYPE_LABELS[type][lang];
}

/**
 * নির্দিষ্ট পডকাস্ট টাইপের বিবরণ পাওয়ার ফাংশন
 */
export function getPodcastTypeDescription(type: PodcastType, lang: 'en' | 'bn' = 'en'): string {
  return PODCAST_TYPE_DESCRIPTIONS[type][lang];
}

/**
 * নির্দিষ্ট পডকাস্ট টাইপের আইকন পাওয়ার ফাংশন
 */
export function getPodcastTypeIcon(type: PodcastType): string {
  return PODCAST_TYPE_ICONS[type];
}

/**
 * নির্দিষ্ট পডকাস্ট টাইপের কালার পাওয়ার ফাংশন
 */
export function getPodcastTypeColor(type: PodcastType): string {
  return PODCAST_TYPE_COLORS[type];
}

/**
 * সব পডকাস্ট টাইপের তালিকা পাওয়ার ফাংশন
 */
export function getAllPodcastTypes(): readonly PodcastType[] {
  return PODCAST_TYPES;
}

/**
 * পডকাস্ট টাইপ বৈধ কিনা চেক করার ফাংশন
 */
export function isValidPodcastType(type: string): type is PodcastType {
  return PODCAST_TYPES.includes(type as PodcastType);
}

/**
 * পডকাস্ট টাইপ ইন্টারভিউ কিনা চেক করার ফাংশন
 */
export function isInterviewPodcast(type: PodcastType): boolean {
  return type === 'interview';
}

/**
 * পডকাস্ট টাইপ একক কিনা চেক করার ফাংশন
 */
export function isSoloPodcast(type: PodcastType): boolean {
  return type === 'solo';
}

/**
 * পডকাস্ট টাইপ প্যানেল কিনা চেক করার ফাংশন
 */
export function isPanelPodcast(type: PodcastType): boolean {
  return type === 'panel';
}

/**
 * পডকাস্ট টাইপ গল্প বলা কিনা চেক করার ফাংশন
 */
export function isStorytellingPodcast(type: PodcastType): boolean {
  return type === 'storytelling';
}

/**
 * ডিফল্ট পডকাস্ট টাইপ পাওয়ার ফাংশন
 */
export function getDefaultPodcastType(): PodcastType {
  return 'interview';
}
