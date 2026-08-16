/**
 * মার্কেটিং অ্যানালিটিক্স সম্পর্কিত কনস্ট্যান্টসমূহ
 * @module Content-Marketing/marketing
 */

/**
 * মার্কেটিং অ্যানালিটিক্স মডিউলের নাম
 */
export const MARKETING_ANALYTICS_MODULE_NAME = 'Marketing Analytics';

/**
 * অ্যানালিটিক্স মেট্রিক্স
 */
export const METRICS = ['impressions', 'clicks', 'conversions', 'ctr', 'roi', 'cpc'] as const;

/**
 * ডিফল্ট সময় পরিসীমা (দিন)
 */
export const DEFAULT_TIME_RANGE_DAYS = 30;

/**
 * মেট্রিক টাইপ
 */
export type Metric = (typeof METRICS)[number];

/**
 * প্রতিটি মেট্রিকের লেবেল (বাংলা এবং ইংরেজি)
 */
export const METRIC_LABELS = {
  impressions: {
    en: 'Impressions',
    bn: 'ইম্প্রেশন',
  },
  clicks: {
    en: 'Clicks',
    bn: 'ক্লিক',
  },
  conversions: {
    en: 'Conversions',
    bn: 'কনভার্সন',
  },
  ctr: {
    en: 'Click-Through Rate (CTR)',
    bn: 'ক্লিক-থ্রু রেট (সিটিআর)',
  },
  roi: {
    en: 'Return on Investment (ROI)',
    bn: 'বিনিয়োগে রিটার্ন (আরওআই)',
  },
  cpc: {
    en: 'Cost Per Click (CPC)',
    bn: 'প্রতি ক্লিকে খরচ (সিপিসি)',
  },
} as const satisfies Record<Metric, { en: string; bn: string }>;

/**
 * প্রতিটি মেট্রিকের জন্য ডিফল্ট মান
 */
export const METRIC_DEFAULT_VALUES = {
  impressions: 0,
  clicks: 0,
  conversions: 0,
  ctr: 0,
  roi: 0,
  cpc: 0,
} as const satisfies Record<Metric, number>;

/**
 * প্রতিটি মেট্রিকের ইউনিট
 */
export const METRIC_UNITS = {
  impressions: 'count',
  clicks: 'count',
  conversions: 'count',
  ctr: 'percentage',
  roi: 'percentage',
  cpc: 'currency',
} as const satisfies Record<Metric, string>;

/**
 * ভাষা টাইপ
 */
export type Language = 'en' | 'bn';

/**
 * অ্যানালিটিক্স ডেটা ইন্টারফেস
 */
export interface AnalyticsData {
  metric: Metric;
  value: number;
  timestamp: Date;
  source?: string;
  campaignId?: string;
  metadata?: AnalyticsMetadata;
}

/**
 * অ্যানালিটিক্স মেটাডেটা ইন্টারফেস
 */
export interface AnalyticsMetadata {
  deviceType?: 'desktop' | 'mobile' | 'tablet';
  browser?: string;
  location?: string;
  referrer?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
}

/**
 * অ্যানালিটিক্স ফিল্টার ইন্টারফেস
 */
export interface AnalyticsFilter {
  metrics?: Metric[];
  fromDate?: Date;
  toDate?: Date;
  campaignId?: string;
  source?: string;
  deviceType?: string;
  limit?: number;
  offset?: number;
}

/**
 * অ্যানালিটিক্স সামারি ইন্টারফেস
 */
export interface AnalyticsSummary {
  totalImpressions: number;
  totalClicks: number;
  totalConversions: number;
  averageCtr: number;
  averageRoi: number;
  averageCpc: number;
}

/**
 * নির্দিষ্ট মেট্রিকের লেবেল পাওয়ার ফাংশন
 */
export function getMetricLabel(metric: Metric, lang: Language = 'en'): string {
  return METRIC_LABELS[metric][lang];
}

/**
 * সব মেট্রিকের তালিকা পাওয়ার ফাংশন
 */
export function getAllMetrics(): readonly Metric[] {
  return METRICS;
}

/**
 * মেট্রিক বৈধ কিনা চেক করার ফাংশন
 */
export function isValidMetric(metric: string): metric is Metric {
  return METRICS.includes(metric as Metric);
}

/**
 * মেট্রিকের ডিফল্ট মান পাওয়ার ফাংশন
 */
export function getMetricDefaultValue(metric: Metric): number {
  return METRIC_DEFAULT_VALUES[metric];
}

/**
 * মেট্রিকের ইউনিট পাওয়ার ফাংশন
 */
export function getMetricUnit(metric: Metric): string {
  return METRIC_UNITS[metric];
}

/**
 * মেট্রিক কাউন্ট টাইপ কিনা চেক করার ফাংশন
 */
export function isCountMetric(metric: Metric): boolean {
  return ['impressions', 'clicks', 'conversions'].includes(metric);
}

/**
 * মেট্রিক পার্সেন্টেজ টাইপ কিনা চেক করার ফাংশন
 */
export function isPercentageMetric(metric: Metric): boolean {
  return ['ctr', 'roi'].includes(metric);
}

/**
 * মেট্রিক কারেন্সি টাইপ কিনা চেক করার ফাংশন
 */
export function isCurrencyMetric(metric: Metric): boolean {
  return metric === 'cpc';
}

/**
 * CTR গণনা করার ফাংশন
 */
export function calculateCtr(clicks: number, impressions: number): number {
  if (impressions === 0) return 0;
  return (clicks / impressions) * 100;
}

/**
 * ROI গণনা করার ফাংশন
 */
export function calculateRoi(revenue: number, cost: number): number {
  if (cost === 0) return 0;
  return ((revenue - cost) / cost) * 100;
}

/**
 * CPC গণনা করার ফাংশন
 */
export function calculateCpc(cost: number, clicks: number): number {
  if (clicks === 0) return 0;
  return cost / clicks;
}

/**
 * কনভার্সন রেট গণনা করার ফাংশন
 */
export function calculateConversionRate(conversions: number, clicks: number): number {
  if (clicks === 0) return 0;
  return (conversions / clicks) * 100;
}

/**
 * অ্যানালিটিক্স সামারি তৈরি করার ফাংশন
 */
export function createAnalyticsSummary(data: AnalyticsData[]): AnalyticsSummary {
  const summary: AnalyticsSummary = {
    totalImpressions: 0,
    totalClicks: 0,
    totalConversions: 0,
    averageCtr: 0,
    averageRoi: 0,
    averageCpc: 0,
  };

  let ctrSum = 0;
  let roiSum = 0;
  let cpcSum = 0;
  let count = 0;

  data.forEach((item) => {
    switch (item.metric) {
      case 'impressions':
        summary.totalImpressions += item.value;
        break;
      case 'clicks':
        summary.totalClicks += item.value;
        break;
      case 'conversions':
        summary.totalConversions += item.value;
        break;
      case 'ctr':
        ctrSum += item.value;
        count++;
        break;
      case 'roi':
        roiSum += item.value;
        break;
      case 'cpc':
        cpcSum += item.value;
        break;
    }
  });

  summary.averageCtr = count > 0 ? ctrSum / count : 0;
  summary.averageRoi = data.length > 0 ? roiSum / data.length : 0;
  summary.averageCpc = data.length > 0 ? cpcSum / data.length : 0;

  return summary;
}

/**
 * ডিফল্ট সময় পরিসীমা পাওয়ার ফাংশন
 */
export function getDefaultTimeRange(): number {
  return DEFAULT_TIME_RANGE_DAYS;
}

/**
 * মেট্রিকের আইকন পাওয়ার ফাংশন
 */
export function getMetricIcon(metric: Metric): string {
  const icons: Record<Metric, string> = {
    impressions: '👁️',
    clicks: '🖱️',
    conversions: '🎯',
    ctr: '📊',
    roi: '💰',
    cpc: '💳',
  };
  return icons[metric];
}

/**
 * মেট্রিকের রঙ পাওয়ার ফাংশন
 */
export function getMetricColor(metric: Metric): string {
  const colors: Record<Metric, string> = {
    impressions: '#3B82F6',
    clicks: '#10B981',
    conversions: '#F59E0B',
    ctr: '#8B5CF6',
    roi: '#EF4444',
    cpc: '#EC4899',
  };
  return colors[metric];
}
