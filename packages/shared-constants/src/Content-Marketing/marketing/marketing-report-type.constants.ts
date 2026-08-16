/**
 * রিপোর্টের ধরন সম্পর্কিত কনস্ট্যান্টসমূহ
 * @module Content-Marketing/marketing
 */

/**
 * রিপোর্টের ধরনসমূহ
 */
export const REPORT_TYPES = [
  'performance',
  'roi',
  'campaign',
  'channel',
  'conversion',
  'engagement',
] as const;

/**
 * রিপোর্ট টাইপ টাইপ
 */
export type ReportType = (typeof REPORT_TYPES)[number];

/**
 * প্রতিটি রিপোর্ট টাইপের লেবেল (বাংলা এবং ইংরেজি)
 */
export const REPORT_TYPE_LABELS = {
  performance: {
    en: 'Performance Report',
    bn: 'পারফরম্যান্স রিপোর্ট',
  },
  roi: {
    en: 'ROI Report',
    bn: 'আরওআই রিপোর্ট',
  },
  campaign: {
    en: 'Campaign Report',
    bn: 'ক্যাম্পেইন রিপোর্ট',
  },
  channel: {
    en: 'Channel Report',
    bn: 'চ্যানেল রিপোর্ট',
  },
  conversion: {
    en: 'Conversion Report',
    bn: 'কনভার্সন রিপোর্ট',
  },
  engagement: {
    en: 'Engagement Report',
    bn: 'এনগেজমেন্ট রিপোর্ট',
  },
} as const satisfies Record<ReportType, { en: string; bn: string }>;

/**
 * প্রতিটি রিপোর্ট টাইপের আইকন
 */
export const REPORT_TYPE_ICONS = {
  performance: '📊',
  roi: '💰',
  campaign: '📈',
  channel: '📡',
  conversion: '🎯',
  engagement: '❤️',
} as const satisfies Record<ReportType, string>;

/**
 * প্রতিটি রিপোর্ট টাইপের রঙ
 */
export const REPORT_TYPE_COLORS = {
  performance: '#3B82F6',
  roi: '#10B981',
  campaign: '#8B5CF6',
  channel: '#F59E0B',
  conversion: '#EF4444',
  engagement: '#EC4899',
} as const satisfies Record<ReportType, string>;

/**
 * ভাষা টাইপ
 */
export type Language = 'en' | 'bn';

/**
 * নির্দিষ্ট রিপোর্ট টাইপের লেবেল পাওয়ার ফাংশন
 */
export function getReportTypeLabel(type: ReportType, lang: Language = 'en'): string {
  return REPORT_TYPE_LABELS[type][lang];
}

/**
 * নির্দিষ্ট রিপোর্ট টাইপের আইকন পাওয়ার ফাংশন
 */
export function getReportTypeIcon(type: ReportType): string {
  return REPORT_TYPE_ICONS[type];
}

/**
 * নির্দিষ্ট রিপোর্ট টাইপের রঙ পাওয়ার ফাংশন
 */
export function getReportTypeColor(type: ReportType): string {
  return REPORT_TYPE_COLORS[type];
}

/**
 * সব রিপোর্ট টাইপের তালিকা পাওয়ার ফাংশন
 */
export function getAllReportTypes(): readonly ReportType[] {
  return REPORT_TYPES;
}

/**
 * রিপোর্ট টাইপ বৈধ কিনা চেক করার ফাংশন
 */
export function isValidReportType(type: string): type is ReportType {
  return REPORT_TYPES.includes(type as ReportType);
}

/**
 * টাইপ পারফরম্যান্স কিনা চেক করার ফাংশন
 */
export function isPerformanceReportType(type: ReportType): boolean {
  return type === 'performance';
}

/**
 * টাইপ ROI কিনা চেক করার ফাংশন
 */
export function isRoiReportType(type: ReportType): boolean {
  return type === 'roi';
}

/**
 * টাইপ ক্যাম্পেইন কিনা চেক করার ফাংশন
 */
export function isCampaignReportType(type: ReportType): boolean {
  return type === 'campaign';
}

/**
 * টাইপ চ্যানেল কিনা চেক করার ফাংশন
 */
export function isChannelReportType(type: ReportType): boolean {
  return type === 'channel';
}

/**
 * টাইপ কনভার্সন কিনা চেক করার ফাংশন
 */
export function isConversionReportType(type: ReportType): boolean {
  return type === 'conversion';
}

/**
 * টাইপ এনগেজমেন্ট কিনা চেক করার ফাংশন
 */
export function isEngagementReportType(type: ReportType): boolean {
  return type === 'engagement';
}

/**
 * টাইপ ফিন্যান্সিয়াল (ROI) কিনা চেক করার ফাংশন
 */
export function isFinancialReportType(type: ReportType): boolean {
  return type === 'roi';
}

/**
 * টাইপ মার্কেটিং (পারফরম্যান্স, ক্যাম্পেইন, চ্যানেল) কিনা চেক করার ফাংশন
 */
export function isMarketingReportType(type: ReportType): boolean {
  return ['performance', 'campaign', 'channel'].includes(type);
}

/**
 * টাইপ অডিয়েন্স (এনগেজমেন্ট) কিনা চেক করার ফাংশন
 */
export function isAudienceReportType(type: ReportType): boolean {
  return type === 'engagement';
}

/**
 * টাইপ কনভার্সন (কনভার্সন) কিনা চেক করার ফাংশন
 */
export function isConversionReportTypeGroup(type: ReportType): boolean {
  return type === 'conversion';
}

/**
 * ডিফল্ট রিপোর্ট টাইপ পাওয়ার ফাংশন
 */
export function getDefaultReportType(): ReportType {
  return 'performance';
}

/**
 * রিপোর্ট টাইপের বিবরণ পাওয়ার ফাংশন
 */
export function getReportTypeDescription(type: ReportType, lang: Language = 'en'): string {
  const descriptions: Record<ReportType, { en: string; bn: string }> = {
    performance: {
      en: 'Overall performance metrics and KPIs',
      bn: 'সামগ্রিক পারফরম্যান্স মেট্রিক্স এবং কেপিআই',
    },
    roi: {
      en: 'Return on investment analysis',
      bn: 'বিনিয়োগে রিটার্ন বিশ্লেষণ',
    },
    campaign: {
      en: 'Campaign performance and results',
      bn: 'ক্যাম্পেইন পারফরম্যান্স এবং ফলাফল',
    },
    channel: {
      en: 'Channel-wise performance analysis',
      bn: 'চ্যানেল-ওয়াইজ পারফরম্যান্স বিশ্লেষণ',
    },
    conversion: {
      en: 'Conversion rate and funnel analysis',
      bn: 'কনভার্সন রেট এবং ফানেল বিশ্লেষণ',
    },
    engagement: {
      en: 'User engagement and interaction metrics',
      bn: 'ব্যবহারকারীর এনগেজমেন্ট এবং ইন্টারঅ্যাকশন মেট্রিক্স',
    },
  };
  return descriptions[type][lang];
}
