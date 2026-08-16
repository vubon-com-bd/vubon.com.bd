/**
 * ওয়েবিনারের ধরন সম্পর্কিত কনস্ট্যান্টসমূহ
 * @module Content-Marketing/content
 */

/**
 * ওয়েবিনারের ধরনসমূহ
 */
export const WEBINAR_TYPES = ['live', 'recorded', 'interactive'] as const;

/**
 * ওয়েবিনার টাইপ টাইপ
 */
export type WebinarType = (typeof WEBINAR_TYPES)[number];

/**
 * ওয়েবিনার টাইপের লেবেল (বাংলা এবং ইংরেজি)
 */
export const WEBINAR_TYPE_LABELS = {
  live: {
    en: 'Live',
    bn: 'লাইভ',
  },
  recorded: {
    en: 'Recorded',
    bn: 'রেকর্ডেড',
  },
  interactive: {
    en: 'Interactive',
    bn: 'ইন্টারেক্টিভ',
  },
} as const satisfies Record<WebinarType, { en: string; bn: string }>;

/**
 * ওয়েবিনার টাইপের বিবরণ (বাংলা এবং ইংরেজি)
 */
export const WEBINAR_TYPE_DESCRIPTIONS = {
  live: {
    en: 'Live webinar with real-time participation and interaction',
    bn: 'রিয়েল-টাইম অংশগ্রহণ এবং ইন্টারঅ্যাকশন সহ লাইভ ওয়েবিনার',
  },
  recorded: {
    en: 'Pre-recorded webinar available for on-demand viewing',
    bn: 'অন-ডিমান্ড দেখার জন্য প্রাক-রেকর্ডেড ওয়েবিনার',
  },
  interactive: {
    en: 'Interactive webinar with polls, Q&A, and engagement features',
    bn: 'পোল, প্রশ্নোত্তর এবং এনগেজমেন্ট বৈশিষ্ট্য সহ ইন্টারেক্টিভ ওয়েবিনার',
  },
} as const satisfies Record<WebinarType, { en: string; bn: string }>;

/**
 * ওয়েবিনার টাইপের আইকন
 */
export const WEBINAR_TYPE_ICONS = {
  live: '🔴',
  recorded: '📹',
  interactive: '💬',
} as const satisfies Record<WebinarType, string>;

/**
 * ওয়েবিনার টাইপের কালার
 */
export const WEBINAR_TYPE_COLORS = {
  live: 'red',
  recorded: 'blue',
  interactive: 'purple',
} as const satisfies Record<WebinarType, string>;

/**
 * নির্দিষ্ট ওয়েবিনার টাইপের লেবেল পাওয়ার ফাংশন
 */
export function getWebinarTypeLabel(type: WebinarType, lang: 'en' | 'bn' = 'en'): string {
  return WEBINAR_TYPE_LABELS[type][lang];
}

/**
 * নির্দিষ্ট ওয়েবিনার টাইপের বিবরণ পাওয়ার ফাংশন
 */
export function getWebinarTypeDescription(type: WebinarType, lang: 'en' | 'bn' = 'en'): string {
  return WEBINAR_TYPE_DESCRIPTIONS[type][lang];
}

/**
 * নির্দিষ্ট ওয়েবিনার টাইপের আইকন পাওয়ার ফাংশন
 */
export function getWebinarTypeIcon(type: WebinarType): string {
  return WEBINAR_TYPE_ICONS[type];
}

/**
 * নির্দিষ্ট ওয়েবিনার টাইপের কালার পাওয়ার ফাংশন
 */
export function getWebinarTypeColor(type: WebinarType): string {
  return WEBINAR_TYPE_COLORS[type];
}

/**
 * সব ওয়েবিনার টাইপের তালিকা পাওয়ার ফাংশন
 */
export function getAllWebinarTypes(): readonly WebinarType[] {
  return WEBINAR_TYPES;
}

/**
 * ওয়েবিনার টাইপ বৈধ কিনা চেক করার ফাংশন
 */
export function isValidWebinarType(type: string): type is WebinarType {
  return WEBINAR_TYPES.includes(type as WebinarType);
}

/**
 * ওয়েবিনার টাইপ লাইভ কিনা চেক করার ফাংশন
 */
export function isLiveWebinar(type: WebinarType): boolean {
  return type === 'live';
}

/**
 * ওয়েবিনার টাইপ রেকর্ডেড কিনা চেক করার ফাংশন
 */
export function isRecordedWebinar(type: WebinarType): boolean {
  return type === 'recorded';
}

/**
 * ওয়েবিনার টাইপ ইন্টারেক্টিভ কিনা চেক করার ফাংশন
 */
export function isInteractiveWebinar(type: WebinarType): boolean {
  return type === 'interactive';
}

/**
 * ওয়েবিনার টাইপ রিয়েল-টাইম কিনা চেক করার ফাংশন
 */
export function isRealtimeWebinar(type: WebinarType): boolean {
  return type === 'live' || type === 'interactive';
}

/**
 * ডিফল্ট ওয়েবিনার টাইপ পাওয়ার ফাংশন
 */
export function getDefaultWebinarType(): WebinarType {
  return 'live';
}
