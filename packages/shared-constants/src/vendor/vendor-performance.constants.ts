/**
 * ভেন্ডার পারফরম্যান্স মেট্রিক্স সংক্রান্ত কনস্ট্যান্টসমূহ
 */

/**
 * পারফরম্যান্স মেট্রিক অবজেক্ট
 */
export const PerformanceMetric = {
  ORDER_FULFILLMENT: 'ORDER_FULFILLMENT',
  DELIVERY_TIME: 'DELIVERY_TIME',
  CUSTOMER_RATING: 'CUSTOMER_RATING',
  RETURN_RATE: 'RETURN_RATE',
  CANCELLATION_RATE: 'CANCELLATION_RATE',
  AVERAGE_RESPONSE_TIME: 'AVERAGE_RESPONSE_TIME',
  QUALITY_SCORE: 'QUALITY_SCORE',
} as const;

/**
 * পারফরম্যান্স মেট্রিক - ইউনিয়ন টাইপ
 */
export type PerformanceMetricValue = (typeof PerformanceMetric)[keyof typeof PerformanceMetric];

/**
 * পারফরম্যান্স ওয়েটেজ (শতকরা)
 */
export const PerformanceWeightage: Record<PerformanceMetricValue, number> = {
  [PerformanceMetric.ORDER_FULFILLMENT]: 20,
  [PerformanceMetric.DELIVERY_TIME]: 15,
  [PerformanceMetric.CUSTOMER_RATING]: 25,
  [PerformanceMetric.RETURN_RATE]: 10,
  [PerformanceMetric.CANCELLATION_RATE]: 10,
  [PerformanceMetric.AVERAGE_RESPONSE_TIME]: 10,
  [PerformanceMetric.QUALITY_SCORE]: 10,
};

/**
 * পারফরম্যান্স স্কোর রেঞ্জ
 */
export const PerformanceScoreRange = {
  MIN: 0,
  MAX: 100,
  EXCELLENT_THRESHOLD: 90,
  GOOD_THRESHOLD: 70,
  AVERAGE_THRESHOLD: 50,
} as const;

/**
 * পারফরম্যান্স পিরিয়ড
 */
export const PerformancePeriod = {
  DAILY: 'DAILY',
  WEEKLY: 'WEEKLY',
  MONTHLY: 'MONTHLY',
  QUARTERLY: 'QUARTERLY',
} as const;

/**
 * পারফরম্যান্স পিরিয়ড - ইউনিয়ন টাইপ
 */
export type PerformancePeriodValue = (typeof PerformancePeriod)[keyof typeof PerformancePeriod];

/**
 * পারফরম্যান্স স্ট্যাটাস
 */
export const PerformanceStatus = {
  EXCELLENT: 'EXCELLENT',
  GOOD: 'GOOD',
  AVERAGE: 'AVERAGE',
  POOR: 'POOR',
  CRITICAL: 'CRITICAL',
} as const;

/**
 * পারফরম্যান্স স্ট্যাটাস - ইউনিয়ন টাইপ
 */
export type PerformanceStatusValue = (typeof PerformanceStatus)[keyof typeof PerformanceStatus];

/**
 * পারফরম্যান্স মেট্রিক লেবেলসমূহ
 */
export const PerformanceMetricLabels: Record<PerformanceMetricValue, { en: string; bn: string }> = {
  [PerformanceMetric.ORDER_FULFILLMENT]: {
    en: 'Order Fulfillment Rate',
    bn: 'অর্ডার পূরণের হার',
  },
  [PerformanceMetric.DELIVERY_TIME]: {
    en: 'Delivery Time',
    bn: 'ডেলিভারি সময়',
  },
  [PerformanceMetric.CUSTOMER_RATING]: {
    en: 'Customer Rating',
    bn: 'গ্রাহক রেটিং',
  },
  [PerformanceMetric.RETURN_RATE]: {
    en: 'Return Rate',
    bn: 'রিটার্ন হার',
  },
  [PerformanceMetric.CANCELLATION_RATE]: {
    en: 'Cancellation Rate',
    bn: 'বাতিলের হার',
  },
  [PerformanceMetric.AVERAGE_RESPONSE_TIME]: {
    en: 'Average Response Time',
    bn: 'গড় প্রতিক্রিয়া সময়',
  },
  [PerformanceMetric.QUALITY_SCORE]: {
    en: 'Quality Score',
    bn: 'গুণমান স্কোর',
  },
};

/**
 * পারফরম্যান্স স্ট্যাটাস লেবেলসমূহ
 */
export const PerformanceStatusLabels: Record<PerformanceStatusValue, { en: string; bn: string }> = {
  [PerformanceStatus.EXCELLENT]: {
    en: 'Excellent',
    bn: 'অসাধারণ',
  },
  [PerformanceStatus.GOOD]: {
    en: 'Good',
    bn: 'ভাল',
  },
  [PerformanceStatus.AVERAGE]: {
    en: 'Average',
    bn: 'গড়',
  },
  [PerformanceStatus.POOR]: {
    en: 'Poor',
    bn: 'দুর্বল',
  },
  [PerformanceStatus.CRITICAL]: {
    en: 'Critical',
    bn: 'জটিল',
  },
};

/**
 * পারফরম্যান্স স্ট্যাটাস রঙ কোড
 */
export const PerformanceStatusColors: Record<PerformanceStatusValue, string> = {
  [PerformanceStatus.EXCELLENT]: 'bg-green-100 text-green-800 border-green-300',
  [PerformanceStatus.GOOD]: 'bg-blue-100 text-blue-800 border-blue-300',
  [PerformanceStatus.AVERAGE]: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  [PerformanceStatus.POOR]: 'bg-orange-100 text-orange-800 border-orange-300',
  [PerformanceStatus.CRITICAL]: 'bg-red-100 text-red-800 border-red-300',
};

/**
 * পারফরম্যান্স রিভিউ পিরিয়ড (দিন)
 */
export const PerformanceReviewPeriodDays = 30;

/**
 * পারফরম্যান্স হিস্টোরি রিটেনশন (দিন)
 */
export const PerformanceHistoryRetentionDays = 365;
