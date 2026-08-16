/**
 * ভিডিওর ধরন সম্পর্কিত কনস্ট্যান্টসমূহ
 * @module Content-Marketing/content
 */

/**
 * ভিডিওর ধরনসমূহ
 */
export const VIDEO_TYPES = [
  'tutorial',
  'presentation',
  'interview',
  'promotional',
  'educational',
] as const;

/**
 * ভিডিও টাইপ টাইপ
 */
export type VideoType = (typeof VIDEO_TYPES)[number];

/**
 * ভিডিও টাইপের লেবেল (বাংলা এবং ইংরেজি)
 */
export const VIDEO_TYPE_LABELS = {
  tutorial: {
    en: 'Tutorial',
    bn: 'টিউটোরিয়াল',
  },
  presentation: {
    en: 'Presentation',
    bn: 'প্রেজেন্টেশন',
  },
  interview: {
    en: 'Interview',
    bn: 'ইন্টারভিউ',
  },
  promotional: {
    en: 'Promotional',
    bn: 'প্রচারমূলক',
  },
  educational: {
    en: 'Educational',
    bn: 'শিক্ষামূলক',
  },
} as const satisfies Record<VideoType, { en: string; bn: string }>;

/**
 * ভিডিও টাইপের বিবরণ (বাংলা এবং ইংরেজি)
 */
export const VIDEO_TYPE_DESCRIPTIONS = {
  tutorial: {
    en: 'Step-by-step instructional video',
    bn: 'পদক্ষেপে পদক্ষেপ নির্দেশনামূলক ভিডিও',
  },
  presentation: {
    en: 'Presentation or slideshow video',
    bn: 'প্রেজেন্টেশন বা স্লাইডশো ভিডিও',
  },
  interview: {
    en: 'Interview or conversation video',
    bn: 'ইন্টারভিউ বা কথোপকথন ভিডিও',
  },
  promotional: {
    en: 'Promotional or marketing video',
    bn: 'প্রচারমূলক বা মার্কেটিং ভিডিও',
  },
  educational: {
    en: 'Educational and learning content',
    bn: 'শিক্ষামূলক এবং শেখার কন্টেন্ট',
  },
} as const satisfies Record<VideoType, { en: string; bn: string }>;

/**
 * ভিডিও টাইপের আইকন
 */
export const VIDEO_TYPE_ICONS = {
  tutorial: '📝',
  presentation: '📊',
  interview: '🎙️',
  promotional: '📣',
  educational: '📚',
} as const satisfies Record<VideoType, string>;

/**
 * ভিডিও টাইপের কালার
 */
export const VIDEO_TYPE_COLORS = {
  tutorial: 'blue',
  presentation: 'purple',
  interview: 'green',
  promotional: 'orange',
  educational: 'red',
} as const satisfies Record<VideoType, string>;

/**
 * নির্দিষ্ট ভিডিও টাইপের লেবেল পাওয়ার ফাংশন
 */
export function getVideoTypeLabel(type: VideoType, lang: 'en' | 'bn' = 'en'): string {
  return VIDEO_TYPE_LABELS[type][lang];
}

/**
 * নির্দিষ্ট ভিডিও টাইপের বিবরণ পাওয়ার ফাংশন
 */
export function getVideoTypeDescription(type: VideoType, lang: 'en' | 'bn' = 'en'): string {
  return VIDEO_TYPE_DESCRIPTIONS[type][lang];
}

/**
 * নির্দিষ্ট ভিডিও টাইপের আইকন পাওয়ার ফাংশন
 */
export function getVideoTypeIcon(type: VideoType): string {
  return VIDEO_TYPE_ICONS[type];
}

/**
 * নির্দিষ্ট ভিডিও টাইপের কালার পাওয়ার ফাংশন
 */
export function getVideoTypeColor(type: VideoType): string {
  return VIDEO_TYPE_COLORS[type];
}

/**
 * সব ভিডিও টাইপের তালিকা পাওয়ার ফাংশন
 */
export function getAllVideoTypes(): readonly VideoType[] {
  return VIDEO_TYPES;
}

/**
 * ভিডিও টাইপ বৈধ কিনা চেক করার ফাংশন
 */
export function isValidVideoType(type: string): type is VideoType {
  return VIDEO_TYPES.includes(type as VideoType);
}

/**
 * ভিডিও টাইপ টিউটোরিয়াল কিনা চেক করার ফাংশন
 */
export function isTutorialVideo(type: VideoType): boolean {
  return type === 'tutorial';
}

/**
 * ভিডিও টাইপ প্রেজেন্টেশন কিনা চেক করার ফাংশন
 */
export function isPresentationVideo(type: VideoType): boolean {
  return type === 'presentation';
}

/**
 * ভিডিও টাইপ ইন্টারভিউ কিনা চেক করার ফাংশন
 */
export function isInterviewVideo(type: VideoType): boolean {
  return type === 'interview';
}

/**
 * ভিডিও টাইপ প্রচারমূলক কিনা চেক করার ফাংশন
 */
export function isPromotionalVideo(type: VideoType): boolean {
  return type === 'promotional';
}

/**
 * ভিডিও টাইপ শিক্ষামূলক কিনা চেক করার ফাংশন
 */
export function isEducationalVideo(type: VideoType): boolean {
  return type === 'educational';
}

/**
 * ডিফল্ট ভিডিও টাইপ পাওয়ার ফাংশন
 */
export function getDefaultVideoType(): VideoType {
  return 'tutorial';
}
