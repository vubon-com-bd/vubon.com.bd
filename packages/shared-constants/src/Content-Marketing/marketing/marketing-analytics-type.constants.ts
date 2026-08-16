/**
 * মার্কেটিং অ্যানালিটিক্স এর ধরন সম্পর্কিত কনস্ট্যান্টসমূহ
 * @module Content-Marketing/marketing
 */

/**
 * অ্যানালিটিক্স এর সব ধরন
 */
export const ANALYTICS_TYPES = ['campaign', 'channel', 'source', 'demographic'] as const;

/**
 * প্রতিটি অ্যানালিটিক্স টাইপের লেবেল (বাংলা এবং ইংরেজি)
 */
export const ANALYTICS_TYPE_LABELS = {
  campaign: {
    en: 'Campaign Analytics',
    bn: 'ক্যাম্পেইন অ্যানালিটিক্স',
  },
  channel: {
    en: 'Channel Analytics',
    bn: 'চ্যানেল অ্যানালিটিক্স',
  },
  source: {
    en: 'Source Analytics',
    bn: 'সোর্স অ্যানালিটিক্স',
  },
  demographic: {
    en: 'Demographic Analytics',
    bn: 'ডেমোগ্রাফিক অ্যানালিটিক্স',
  },
} as const satisfies Record<(typeof ANALYTICS_TYPES)[number], { en: string; bn: string }>;

/**
 * অ্যানালিটিক্স টাইপ টাইপ
 */
export type AnalyticsType = (typeof ANALYTICS_TYPES)[number];

/**
 * ভাষা টাইপ
 */
export type Language = 'en' | 'bn';

/**
 * নির্দিষ্ট অ্যানালিটিক্স টাইপের লেবেল পাওয়ার ফাংশন
 */
export function getAnalyticsTypeLabel(type: AnalyticsType, lang: Language = 'en'): string {
  return ANALYTICS_TYPE_LABELS[type][lang];
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
 * টাইপ ক্যাম্পেইন কিনা চেক করার ফাংশন
 */
export function isCampaignAnalyticsType(type: AnalyticsType): boolean {
  return type === 'campaign';
}

/**
 * টাইপ চ্যানেল কিনা চেক করার ফাংশন
 */
export function isChannelAnalyticsType(type: AnalyticsType): boolean {
  return type === 'channel';
}

/**
 * টাইপ সোর্স কিনা চেক করার ফাংশন
 */
export function isSourceAnalyticsType(type: AnalyticsType): boolean {
  return type === 'source';
}

/**
 * টাইপ ডেমোগ্রাফিক কিনা চেক করার ফাংশন
 */
export function isDemographicAnalyticsType(type: AnalyticsType): boolean {
  return type === 'demographic';
}

/**
 * টাইপ মার্কেটিং (ক্যাম্পেইন, চ্যানেল, সোর্স) কিনা চেক করার ফাংশন
 */
export function isMarketingAnalyticsType(type: AnalyticsType): boolean {
  return type === 'campaign' || type === 'channel' || type === 'source';
}

/**
 * টাইপ অডিয়েন্স (ডেমোগ্রাফিক) কিনা চেক করার ফাংশন
 */
export function isAudienceAnalyticsType(type: AnalyticsType): boolean {
  return type === 'demographic';
}

/**
 * টাইপ পারফরম্যান্স (ক্যাম্পেইন) কিনা চেক করার ফাংশন
 */
export function isPerformanceAnalyticsType(type: AnalyticsType): boolean {
  return type === 'campaign';
}

/**
 * ডিফল্ট অ্যানালিটিক্স টাইপ পাওয়ার ফাংশন
 */
export function getDefaultAnalyticsType(): AnalyticsType {
  return 'campaign';
}

/**
 * টাইপের আইকন পাওয়ার ফাংশন
 */
export function getAnalyticsTypeIcon(type: AnalyticsType): string {
  const icons: Record<AnalyticsType, string> = {
    campaign: '📊',
    channel: '📡',
    source: '🔍',
    demographic: '👥',
  };
  return icons[type];
}

/**
 * টাইপের রঙ পাওয়ার ফাংশন
 */
export function getAnalyticsTypeColor(type: AnalyticsType): string {
  const colors: Record<AnalyticsType, string> = {
    campaign: '#3B82F6',
    channel: '#10B981',
    source: '#8B5CF6',
    demographic: '#F59E0B',
  };
  return colors[type];
}

/**
 * টাইপের বিবরণ পাওয়ার ফাংশন
 */
export function getAnalyticsTypeDescription(type: AnalyticsType, lang: Language = 'en'): string {
  const descriptions: Record<AnalyticsType, { en: string; bn: string }> = {
    campaign: {
      en: 'Analytics for marketing campaigns',
      bn: 'মার্কেটিং ক্যাম্পেইনের জন্য অ্যানালিটিক্স',
    },
    channel: {
      en: 'Analytics by marketing channels',
      bn: 'মার্কেটিং চ্যানেল অনুযায়ী অ্যানালিটিক্স',
    },
    source: {
      en: 'Analytics by traffic sources',
      bn: 'ট্রাফিক সোর্স অনুযায়ী অ্যানালিটিক্স',
    },
    demographic: {
      en: 'Analytics by audience demographics',
      bn: 'অডিয়েন্স ডেমোগ্রাফিক অনুযায়ী অ্যানালিটিক্স',
    },
  };
  return descriptions[type][lang];
}
