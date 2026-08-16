/**
 * অ্যানালিটিক্সের ধরন সম্পর্কিত কনস্ট্যান্টসমূহ
 * @module Content-Marketing/content
 */

/**
 * অ্যানালিটিক্সের ধরনসমূহ
 */
export const ANALYTICS_TYPES = ['daily', 'weekly', 'monthly', 'yearly'] as const;

/**
 * অ্যানালিটিক্স টাইপ টাইপ
 */
export type AnalyticsType = (typeof ANALYTICS_TYPES)[number];

/**
 * অ্যানালিটিক্স টাইপের লেবেল (বাংলা এবং ইংরেজি)
 */
export const ANALYTICS_TYPE_LABELS = {
  daily: {
    en: 'Daily',
    bn: 'দৈনিক',
  },
  weekly: {
    en: 'Weekly',
    bn: 'সাপ্তাহিক',
  },
  monthly: {
    en: 'Monthly',
    bn: 'মাসিক',
  },
  yearly: {
    en: 'Yearly',
    bn: 'বার্ষিক',
  },
} as const satisfies Record<AnalyticsType, { en: string; bn: string }>;

/**
 * অ্যানালিটিক্স টাইপের বিবরণ (বাংলা এবং ইংরেজি)
 */
export const ANALYTICS_TYPE_DESCRIPTIONS = {
  daily: {
    en: 'Daily analytics data aggregated by day',
    bn: 'দিন অনুযায়ী দৈনিক অ্যানালিটিক্স ডেটা',
  },
  weekly: {
    en: 'Weekly analytics data aggregated by week',
    bn: 'সপ্তাহ অনুযায়ী সাপ্তাহিক অ্যানালিটিক্স ডেটা',
  },
  monthly: {
    en: 'Monthly analytics data aggregated by month',
    bn: 'মাস অনুযায়ী মাসিক অ্যানালিটিক্স ডেটা',
  },
  yearly: {
    en: 'Yearly analytics data aggregated by year',
    bn: 'বছর অনুযায়ী বার্ষিক অ্যানালিটিক্স ডেটা',
  },
} as const satisfies Record<AnalyticsType, { en: string; bn: string }>;

/**
 * অ্যানালিটিক্স টাইপের আইকন
 */
export const ANALYTICS_TYPE_ICONS = {
  daily: '📊',
  weekly: '📈',
  monthly: '📉',
  yearly: '📋',
} as const satisfies Record<AnalyticsType, string>;

/**
 * অ্যানালিটিক্স টাইপের কালার
 */
export const ANALYTICS_TYPE_COLORS = {
  daily: 'blue',
  weekly: 'green',
  monthly: 'orange',
  yearly: 'purple',
} as const satisfies Record<AnalyticsType, string>;

/**
 * অ্যানালিটিক্স টাইপের সময় ফ্রেম (দিনে)
 */
export const ANALYTICS_TYPE_DAYS = {
  daily: 1,
  weekly: 7,
  monthly: 30,
  yearly: 365,
} as const satisfies Record<AnalyticsType, number>;

/**
 * নির্দিষ্ট অ্যানালিটিক্স টাইপের লেবেল পাওয়ার ফাংশন
 */
export function getAnalyticsTypeLabel(type: AnalyticsType, lang: 'en' | 'bn' = 'en'): string {
  return ANALYTICS_TYPE_LABELS[type][lang];
}

/**
 * নির্দিষ্ট অ্যানালিটিক্স টাইপের বিবরণ পাওয়ার ফাংশন
 */
export function getAnalyticsTypeDescription(type: AnalyticsType, lang: 'en' | 'bn' = 'en'): string {
  return ANALYTICS_TYPE_DESCRIPTIONS[type][lang];
}

/**
 * নির্দিষ্ট অ্যানালিটিক্স টাইপের আইকন পাওয়ার ফাংশন
 */
export function getAnalyticsTypeIcon(type: AnalyticsType): string {
  return ANALYTICS_TYPE_ICONS[type];
}

/**
 * নির্দিষ্ট অ্যানালিটিক্স টাইপের কালার পাওয়ার ফাংশন
 */
export function getAnalyticsTypeColor(type: AnalyticsType): string {
  return ANALYTICS_TYPE_COLORS[type];
}

/**
 * নির্দিষ্ট অ্যানালিটিক্স টাইপের সময় ফ্রেম (দিনে) পাওয়ার ফাংশন
 */
export function getAnalyticsTypeDays(type: AnalyticsType): number {
  return ANALYTICS_TYPE_DAYS[type];
}

/**
 * সব অ্যানালিটিক্স টাইপের তালিকা পাওয়ার ফাংশন
 */
export function getAllAnalyticsTypes(): readonly AnalyticsType[] {
  return ANALYTICS_TYPES;
}

/**
 * অ্যানালিটিক্স টাইপ বৈধ কিনা চেক করার ফাংশন
 */
export function isValidAnalyticsType(type: string): type is AnalyticsType {
  return ANALYTICS_TYPES.includes(type as AnalyticsType);
}

/**
 * অ্যানালিটিক্স টাইপ দৈনিক কিনা চেক করার ফাংশন
 */
export function isDailyAnalytics(type: AnalyticsType): boolean {
  return type === 'daily';
}

/**
 * অ্যানালিটিক্স টাইপ সাপ্তাহিক কিনা চেক করার ফাংশন
 */
export function isWeeklyAnalytics(type: AnalyticsType): boolean {
  return type === 'weekly';
}

/**
 * অ্যানালিটিক্স টাইপ মাসিক কিনা চেক করার ফাংশন
 */
export function isMonthlyAnalytics(type: AnalyticsType): boolean {
  return type === 'monthly';
}

/**
 * অ্যানালিটিক্স টাইপ বার্ষিক কিনা চেক করার ফাংশন
 */
export function isYearlyAnalytics(type: AnalyticsType): boolean {
  return type === 'yearly';
}

/**
 * ডিফল্ট অ্যানালিটিক্স টাইপ পাওয়ার ফাংশন
 */
export function getDefaultAnalyticsType(): AnalyticsType {
  return 'daily';
}
