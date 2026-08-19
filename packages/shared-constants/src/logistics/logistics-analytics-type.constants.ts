/**
 * লজিস্টিকস অ্যানালিটিক্সের বিভিন্ন টাইপ সম্পর্কিত কনস্ট্যান্টসমূহ
 */

/**
 * অ্যানালিটিক্স টাইপ
 */
export const ANALYTICS_TYPES = {
  DELIVERY_PERFORMANCE: 'delivery_performance',
  SHIPMENT_VOLUME: 'shipment_volume',
  COURIER_EFFICIENCY: 'courier_efficiency',
  COST_ANALYSIS: 'cost_analysis',
  CUSTOMER_SATISFACTION: 'customer_satisfaction',
  TIME_METRICS: 'time_metrics',
} as const;

/**
 * অ্যানালিটিক্স টাইপ টাইপ
 */
export type AnalyticsType = (typeof ANALYTICS_TYPES)[keyof typeof ANALYTICS_TYPES];

/**
 * অ্যানালিটিক্স টাইপের বিবরণ
 */
export const ANALYTICS_TYPE_DESCRIPTIONS: Record<AnalyticsType, string> = {
  [ANALYTICS_TYPES.DELIVERY_PERFORMANCE]: 'ডেলিভারি পারফরম্যান্স - ডেলিভারি সময় ও সাফল্য বিশ্লেষণ',
  [ANALYTICS_TYPES.SHIPMENT_VOLUME]: 'শিপমেন্ট ভলিউম - শিপমেন্টের পরিমাণ ও প্রবণতা বিশ্লেষণ',
  [ANALYTICS_TYPES.COURIER_EFFICIENCY]: 'কুরিয়ার দক্ষতা - কুরিয়ারদের কর্মদক্ষতা বিশ্লেষণ',
  [ANALYTICS_TYPES.COST_ANALYSIS]: 'খরচ বিশ্লেষণ - অপারেশনাল খরচ বিশ্লেষণ',
  [ANALYTICS_TYPES.CUSTOMER_SATISFACTION]:
    'গ্রাহক সন্তুষ্টি - গ্রাহক প্রতিক্রিয়া ও সন্তুষ্টি বিশ্লেষণ',
  [ANALYTICS_TYPES.TIME_METRICS]: 'সময় মেট্রিক্স - সময় সম্পর্কিত মেট্রিক্স বিশ্লেষণ',
};

/**
 * অ্যানালিটিক্স টাইপের রং (UI এর জন্য)
 */
export const ANALYTICS_TYPE_COLORS: Record<AnalyticsType, string> = {
  [ANALYTICS_TYPES.DELIVERY_PERFORMANCE]: '#3498DB', // নীল
  [ANALYTICS_TYPES.SHIPMENT_VOLUME]: '#2ECC71', // সবুজ
  [ANALYTICS_TYPES.COURIER_EFFICIENCY]: '#F39C12', // কমলা
  [ANALYTICS_TYPES.COST_ANALYSIS]: '#E74C3C', // লাল
  [ANALYTICS_TYPES.CUSTOMER_SATISFACTION]: '#9B59B6', // বেগুনি
  [ANALYTICS_TYPES.TIME_METRICS]: '#1ABC9C', // টিল
};

/**
 * অ্যানালিটিক্স টাইপের আইকন (UI এর জন্য)
 */
export const ANALYTICS_TYPE_ICONS: Record<AnalyticsType, string> = {
  [ANALYTICS_TYPES.DELIVERY_PERFORMANCE]: 'truck',
  [ANALYTICS_TYPES.SHIPMENT_VOLUME]: 'chart-bar',
  [ANALYTICS_TYPES.COURIER_EFFICIENCY]: 'user-check',
  [ANALYTICS_TYPES.COST_ANALYSIS]: 'money-bill',
  [ANALYTICS_TYPES.CUSTOMER_SATISFACTION]: 'smile',
  [ANALYTICS_TYPES.TIME_METRICS]: 'clock',
};

/**
 * অ্যানালিটিক্স টাইপের প্রায়োরিটি
 */
export const ANALYTICS_TYPE_PRIORITIES: Record<AnalyticsType, number> = {
  [ANALYTICS_TYPES.DELIVERY_PERFORMANCE]: 1,
  [ANALYTICS_TYPES.SHIPMENT_VOLUME]: 2,
  [ANALYTICS_TYPES.COURIER_EFFICIENCY]: 3,
  [ANALYTICS_TYPES.COST_ANALYSIS]: 4,
  [ANALYTICS_TYPES.CUSTOMER_SATISFACTION]: 5,
  [ANALYTICS_TYPES.TIME_METRICS]: 6,
};

/**
 * অ্যানালিটিক্স টাইপের ডিফল্ট গ্রানুলারিটি
 */
export const ANALYTICS_TYPE_DEFAULT_GRANULARITY: Record<AnalyticsType, string> = {
  [ANALYTICS_TYPES.DELIVERY_PERFORMANCE]: 'daily',
  [ANALYTICS_TYPES.SHIPMENT_VOLUME]: 'weekly',
  [ANALYTICS_TYPES.COURIER_EFFICIENCY]: 'weekly',
  [ANALYTICS_TYPES.COST_ANALYSIS]: 'monthly',
  [ANALYTICS_TYPES.CUSTOMER_SATISFACTION]: 'monthly',
  [ANALYTICS_TYPES.TIME_METRICS]: 'hourly',
};

/**
 * অ্যানালিটিক্স টাইপের কেপিআই
 */
export const ANALYTICS_TYPE_KPIS: Record<AnalyticsType, readonly string[]> = {
  [ANALYTICS_TYPES.DELIVERY_PERFORMANCE]: [
    'average_delivery_time',
    'on_time_delivery_rate',
    'delivery_success_rate',
  ],
  [ANALYTICS_TYPES.SHIPMENT_VOLUME]: ['total_shipments', 'shipments_by_zone', 'peak_hour_volume'],
  [ANALYTICS_TYPES.COURIER_EFFICIENCY]: [
    'deliveries_per_courier',
    'courier_utilization',
    'average_delivery_per_shift',
  ],
  [ANALYTICS_TYPES.COST_ANALYSIS]: ['cost_per_delivery', 'fuel_cost_per_km', 'operational_cost'],
  [ANALYTICS_TYPES.CUSTOMER_SATISFACTION]: ['satisfaction_score', 'complaint_rate', 'return_rate'],
  [ANALYTICS_TYPES.TIME_METRICS]: [
    'average_pickup_time',
    'average_transit_time',
    'total_cycle_time',
  ],
};

/**
 * অ্যানালিটিক্স টাইপ গ্রুপ
 */
export const ANALYTICS_TYPE_GROUPS = {
  ALL: Object.values(ANALYTICS_TYPES),
  PERFORMANCE: [ANALYTICS_TYPES.DELIVERY_PERFORMANCE, ANALYTICS_TYPES.COURIER_EFFICIENCY] as const,
  VOLUME: [ANALYTICS_TYPES.SHIPMENT_VOLUME] as const,
  FINANCIAL: [ANALYTICS_TYPES.COST_ANALYSIS] as const,
  CUSTOMER: [ANALYTICS_TYPES.CUSTOMER_SATISFACTION] as const,
  TIME: [ANALYTICS_TYPES.TIME_METRICS] as const,
} as const;

/**
 * অ্যানালিটিক্স টাইপ গ্রুপ টাইপ
 */
export type AnalyticsTypeGroup = typeof ANALYTICS_TYPE_GROUPS;

/**
 * অ্যানালিটিক্স টাইপ কনফিগারেশন
 */
export const ANALYTICS_TYPE_CONFIG = {
  TYPES: ANALYTICS_TYPES,
  DESCRIPTIONS: ANALYTICS_TYPE_DESCRIPTIONS,
  COLORS: ANALYTICS_TYPE_COLORS,
  ICONS: ANALYTICS_TYPE_ICONS,
  PRIORITIES: ANALYTICS_TYPE_PRIORITIES,
  DEFAULT_GRANULARITY: ANALYTICS_TYPE_DEFAULT_GRANULARITY,
  KPIS: ANALYTICS_TYPE_KPIS,
  GROUPS: ANALYTICS_TYPE_GROUPS,
} as const;

/**
 * অ্যানালিটিক্স টাইপ কনফিগারেশন টাইপ
 */
export type AnalyticsTypeConfig = typeof ANALYTICS_TYPE_CONFIG;

/**
 * চেক করে যে অ্যানালিটিক্স টাইপ পারফরম্যান্স কিনা
 */
export function isPerformanceAnalyticsType(type: AnalyticsType): boolean {
  return (ANALYTICS_TYPE_GROUPS.PERFORMANCE as readonly AnalyticsType[]).includes(type);
}

/**
 * চেক করে যে অ্যানালিটিক্স টাইপ ভলিউম কিনা
 */
export function isVolumeAnalyticsType(type: AnalyticsType): boolean {
  return (ANALYTICS_TYPE_GROUPS.VOLUME as readonly AnalyticsType[]).includes(type);
}

/**
 * চেক করে যে অ্যানালিটিক্স টাইপ ফাইন্যান্সিয়াল কিনা
 */
export function isFinancialAnalyticsType(type: AnalyticsType): boolean {
  return (ANALYTICS_TYPE_GROUPS.FINANCIAL as readonly AnalyticsType[]).includes(type);
}

/**
 * চেক করে যে অ্যানালিটিক্স টাইপ কাস্টমার কিনা
 */
export function isCustomerAnalyticsType(type: AnalyticsType): boolean {
  return (ANALYTICS_TYPE_GROUPS.CUSTOMER as readonly AnalyticsType[]).includes(type);
}

/**
 * চেক করে যে অ্যানালিটিক্স টাইপ টাইম কিনা
 */
export function isTimeAnalyticsType(type: AnalyticsType): boolean {
  return (ANALYTICS_TYPE_GROUPS.TIME as readonly AnalyticsType[]).includes(type);
}

/**
 * অ্যানালিটিক্স টাইপের বিবরণ পাওয়া
 */
export function getAnalyticsTypeDescription(type: AnalyticsType): string {
  return ANALYTICS_TYPE_DESCRIPTIONS[type];
}

/**
 * অ্যানালিটিক্স টাইপের কেপিআই পাওয়া
 */
export function getAnalyticsTypeKPIs(type: AnalyticsType): readonly string[] {
  return ANALYTICS_TYPE_KPIS[type];
}

/**
 * অ্যানালিটিক্স টাইপের ডিফল্ট গ্রানুলারিটি পাওয়া
 */
export function getAnalyticsTypeDefaultGranularity(type: AnalyticsType): string {
  return ANALYTICS_TYPE_DEFAULT_GRANULARITY[type];
}

/**
 * অ্যানালিটিক্স টাইপের প্রায়োরিটি পাওয়া
 */
export function getAnalyticsTypePriority(type: AnalyticsType): number {
  return ANALYTICS_TYPE_PRIORITIES[type];
}
