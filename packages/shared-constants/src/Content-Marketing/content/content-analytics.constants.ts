/**
 * কন্টেন্ট অ্যানালিটিক্স সম্পর্কিত কনস্ট্যান্টসমূহ
 * @module Content-Marketing/content
 */

/**
 * অ্যানালিটিক্স ম্যানেজমেন্ট মডিউলের নাম
 */
export const ANALYTICS_MODULE_NAME = 'Content Analytics';

/**
 * মেট্রিক্স টাইপসমূহ
 */
export const METRICS = ['views', 'likes', 'shares', 'comments', 'clicks', 'conversions'] as const;

/**
 * ডিফল্ট টাইম রেঞ্জ (দিনে)
 */
export const DEFAULT_TIME_RANGE_DAYS = 30;

/**
 * সর্বোচ্চ অ্যানালিটিক্স রেঞ্জ (দিনে)
 */
export const MAX_ANALYTICS_RANGE_DAYS = 365;

/**
 * মেট্রিক টাইপ
 */
export type Metric = (typeof METRICS)[number];

/**
 * মেট্রিক লেবেল (বাংলা এবং ইংরেজি)
 */
export const METRIC_LABELS = {
  views: {
    en: 'Views',
    bn: 'দেখা হয়েছে',
  },
  likes: {
    en: 'Likes',
    bn: 'লাইক',
  },
  shares: {
    en: 'Shares',
    bn: 'শেয়ার',
  },
  comments: {
    en: 'Comments',
    bn: 'মন্তব্য',
  },
  clicks: {
    en: 'Clicks',
    bn: 'ক্লিক',
  },
  conversions: {
    en: 'Conversions',
    bn: 'কনভার্সন',
  },
} as const satisfies Record<Metric, { en: string; bn: string }>;

/**
 * মেট্রিক আইকন
 */
export const METRIC_ICONS = {
  views: '👁️',
  likes: '❤️',
  shares: '🔄',
  comments: '💬',
  clicks: '🖱️',
  conversions: '🎯',
} as const satisfies Record<Metric, string>;

/**
 * মেট্রিক কালার
 */
export const METRIC_COLORS = {
  views: 'blue',
  likes: 'red',
  shares: 'green',
  comments: 'orange',
  clicks: 'purple',
  conversions: 'gold',
} as const satisfies Record<Metric, string>;

/**
 * অ্যানালিটিক্স ডেটা ইন্টারফেস
 */
export interface AnalyticsData {
  metric: Metric;
  value: number;
  date: Date;
  change?: number;
  changePercentage?: number;
}

/**
 * অ্যানালিটিক্স সামারি ইন্টারফেস
 */
export interface AnalyticsSummary {
  totalViews: number;
  totalLikes: number;
  totalShares: number;
  totalComments: number;
  totalClicks: number;
  totalConversions: number;
  engagementRate: number;
  conversionRate: number;
}

/**
 * অ্যানালিটিক্স ফিল্টার ইন্টারফেস
 */
export interface AnalyticsFilter {
  metrics?: Metric[];
  fromDate: Date;
  toDate: Date;
  contentId?: string;
  contentType?: string;
  groupBy?: 'day' | 'week' | 'month';
}

/**
 * মেট্রিক বৈধ কিনা চেক করার ফাংশন
 */
export function isValidMetric(metric: string): metric is Metric {
  return METRICS.includes(metric as Metric);
}

/**
 * মেট্রিকের লেবেল পাওয়ার ফাংশন
 */
export function getMetricLabel(metric: Metric, lang: 'en' | 'bn' = 'en'): string {
  return METRIC_LABELS[metric][lang];
}

/**
 * মেট্রিকের আইকন পাওয়ার ফাংশন
 */
export function getMetricIcon(metric: Metric): string {
  return METRIC_ICONS[metric];
}

/**
 * মেট্রিকের কালার পাওয়ার ফাংশন
 */
export function getMetricColor(metric: Metric): string {
  return METRIC_COLORS[metric];
}

/**
 * সব মেট্রিকের তালিকা পাওয়ার ফাংশন
 */
export function getAllMetrics(): readonly Metric[] {
  return METRICS;
}

/**
 * ডিফল্ট টাইম রেঞ্জ পাওয়ার ফাংশন
 */
export function getDefaultTimeRange(): number {
  return DEFAULT_TIME_RANGE_DAYS;
}

/**
 * সর্বোচ্চ অ্যানালিটিক্স রেঞ্জ পাওয়ার ফাংশন
 */
export function getMaxAnalyticsRange(): number {
  return MAX_ANALYTICS_RANGE_DAYS;
}

/**
 * অ্যানালিটিক্স টাইম রেঞ্জ বৈধ কিনা চেক করার ফাংশন
 */
export function isValidAnalyticsRange(days: number): boolean {
  return days > 0 && days <= MAX_ANALYTICS_RANGE_DAYS;
}

/**
 * অ্যানালিটিক্স ডেটা তৈরির ফাংশন
 */
export function createAnalyticsData(metric: Metric, value: number, date: Date): AnalyticsData {
  return {
    metric,
    value,
    date,
  };
}

/**
 * অ্যানালিটিক্স সামারি তৈরির ফাংশন
 */
export function createAnalyticsSummary(data: AnalyticsData[]): AnalyticsSummary {
  const summary: AnalyticsSummary = {
    totalViews: 0,
    totalLikes: 0,
    totalShares: 0,
    totalComments: 0,
    totalClicks: 0,
    totalConversions: 0,
    engagementRate: 0,
    conversionRate: 0,
  };

  data.forEach((item) => {
    switch (item.metric) {
      case 'views':
        summary.totalViews += item.value;
        break;
      case 'likes':
        summary.totalLikes += item.value;
        break;
      case 'shares':
        summary.totalShares += item.value;
        break;
      case 'comments':
        summary.totalComments += item.value;
        break;
      case 'clicks':
        summary.totalClicks += item.value;
        break;
      case 'conversions':
        summary.totalConversions += item.value;
        break;
    }
  });

  // Engagement rate calculation (likes + comments + shares) / views
  if (summary.totalViews > 0) {
    summary.engagementRate =
      ((summary.totalLikes + summary.totalComments + summary.totalShares) / summary.totalViews) *
      100;
  }

  // Conversion rate calculation
  if (summary.totalClicks > 0) {
    summary.conversionRate = (summary.totalConversions / summary.totalClicks) * 100;
  }

  return summary;
}

/**
 * অ্যানালিটিক্স ডেটা ভ্যালিডেট করার ফাংশন
 */
export function validateAnalyticsData(data: AnalyticsData[]): boolean {
  if (!Array.isArray(data) || data.length === 0) {
    return false;
  }

  return data.every((item) => {
    if (!isValidMetric(item.metric)) {
      return false;
    }
    if (typeof item.value !== 'number' || item.value < 0) {
      return false;
    }
    if (!(item.date instanceof Date) || isNaN(item.date.getTime())) {
      return false;
    }
    return true;
  });
}

/**
 * অ্যানালিটিক্স ডেটা সাজানোর ফাংশন
 */
export function sortAnalyticsData(
  data: AnalyticsData[],
  sortBy: 'date' | 'value' = 'date',
  sortOrder: 'asc' | 'desc' = 'desc'
): AnalyticsData[] {
  return [...data].sort((a, b) => {
    let comparison = 0;
    if (sortBy === 'date') {
      comparison = a.date.getTime() - b.date.getTime();
    } else {
      comparison = a.value - b.value;
    }
    return sortOrder === 'asc' ? comparison : -comparison;
  });
}

/**
 * অ্যানালিটিক্স ডেটা গ্রুপ করার ফাংশন
 */
export function groupAnalyticsData(
  data: AnalyticsData[],
  groupBy: 'day' | 'week' | 'month'
): Map<string, AnalyticsData[]> {
  const grouped = new Map<string, AnalyticsData[]>();

  data.forEach((item) => {
    const date = new Date(item.date);
    let key: string;

    switch (groupBy) {
      case 'day':
        key = date.toISOString().split('T')[0];
        break;
      case 'week':
        const weekStart = new Date(date);
        weekStart.setDate(date.getDate() - date.getDay());
        key = weekStart.toISOString().split('T')[0];
        break;
      case 'month':
        key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        break;
    }

    if (!grouped.has(key)) {
      grouped.set(key, []);
    }
    grouped.get(key)!.push(item);
  });

  return grouped;
}
