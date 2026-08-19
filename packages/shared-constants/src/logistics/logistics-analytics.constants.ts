/**
 * লজিস্টিকস অ্যানালিটিক্স সম্পর্কিত মৌলিক কনস্ট্যান্টসমূহ
 */

/**
 * অ্যানালিটিক্স ডেটা রিটেনশন পিরিয়ড (দিন)
 */
export const ANALYTICS_DATA_RETENTION_DAYS = 365;

/**
 * ডিফল্ট রিপোর্টিং সময়সীমা
 */
export const DEFAULT_REPORTING_PERIOD = {
  START_DAYS_AGO: 30,
  END_DAYS_AGO: 0,
  DEFAULT_INTERVAL: 'monthly',
} as const;

/**
 * ডিফল্ট রিপোর্টিং সময়সীমা টাইপ
 */
export type DefaultReportingPeriod = typeof DEFAULT_REPORTING_PERIOD;

/**
 * অ্যানালিটিক্স ক্যালকুলেশন ফর্মুলা
 */
export const ANALYTICS_CALCULATION_FORMULAS = {
  AVERAGE_DELIVERY_TIME: 'avg_delivery_time',
  ON_TIME_DELIVERY_RATE: 'on_time_delivery_rate',
  DELIVERY_SUCCESS_RATE: 'delivery_success_rate',
  COURIER_UTILIZATION: 'courier_utilization',
  COST_PER_DELIVERY: 'cost_per_delivery',
  CUSTOMER_SATISFACTION_SCORE: 'customer_satisfaction_score',
} as const;

/**
 * অ্যানালিটিক্স ক্যালকুলেশন ফর্মুলা টাইপ
 */
export type AnalyticsCalculationFormula =
  (typeof ANALYTICS_CALCULATION_FORMULAS)[keyof typeof ANALYTICS_CALCULATION_FORMULAS];

/**
 * কেপিআই থ্রেশহোল্ড
 */
export const KPI_THRESHOLDS = {
  DELIVERY_TIME: {
    EXCELLENT: 24,
    GOOD: 48,
    AVERAGE: 72,
    POOR: 96,
    CRITICAL: 120,
  },
  ON_TIME_DELIVERY: {
    EXCELLENT: 98,
    GOOD: 95,
    AVERAGE: 90,
    POOR: 85,
    CRITICAL: 80,
  },
  DELIVERY_SUCCESS: {
    EXCELLENT: 99,
    GOOD: 97,
    AVERAGE: 95,
    POOR: 90,
    CRITICAL: 85,
  },
  COURIER_UTILIZATION: {
    EXCELLENT: 90,
    GOOD: 80,
    AVERAGE: 70,
    POOR: 60,
    CRITICAL: 50,
  },
  COST_PER_DELIVERY: {
    EXCELLENT: 50,
    GOOD: 75,
    AVERAGE: 100,
    POOR: 150,
    CRITICAL: 200,
  },
  SATISFACTION_SCORE: {
    EXCELLENT: 4.8,
    GOOD: 4.5,
    AVERAGE: 4.0,
    POOR: 3.5,
    CRITICAL: 3.0,
  },
} as const;

/**
 * কেপিআই থ্রেশহোল্ড টাইপ
 */
export type KPIThresholds = typeof KPI_THRESHOLDS;

/**
 * ড্যাশবোর্ড রিফ্রেশ ইন্টারভাল (মিনিট)
 */
export const DASHBOARD_REFRESH_INTERVAL_MINUTES = 5;

/**
 * অ্যানালিটিক্স রিপোর্ট ফরম্যাট
 */
export const ANALYTICS_REPORT_FORMATS = {
  PDF: 'pdf',
  EXCEL: 'excel',
  CSV: 'csv',
  JSON: 'json',
  HTML: 'html',
} as const;

/**
 * অ্যানালিটিক্স রিপোর্ট ফরম্যাট টাইপ
 */
export type AnalyticsReportFormat =
  (typeof ANALYTICS_REPORT_FORMATS)[keyof typeof ANALYTICS_REPORT_FORMATS];

/**
 * অ্যানালিটিক্স টাইম গ্র্যানুলারিটি
 */
export const ANALYTICS_TIME_GRANULARITY = {
  HOURLY: 'hourly',
  DAILY: 'daily',
  WEEKLY: 'weekly',
  MONTHLY: 'monthly',
  QUARTERLY: 'quarterly',
  YEARLY: 'yearly',
} as const;

/**
 * অ্যানালিটিক্স টাইম গ্র্যানুলারিটি টাইপ
 */
export type AnalyticsTimeGranularity =
  (typeof ANALYTICS_TIME_GRANULARITY)[keyof typeof ANALYTICS_TIME_GRANULARITY];

/**
 * অ্যানালিটিক্স কনফিগারেশন
 */
export const ANALYTICS_CONFIG = {
  DATA_RETENTION_DAYS: ANALYTICS_DATA_RETENTION_DAYS,
  DEFAULT_REPORTING_PERIOD: DEFAULT_REPORTING_PERIOD,
  CALCULATION_FORMULAS: ANALYTICS_CALCULATION_FORMULAS,
  KPI_THRESHOLDS: KPI_THRESHOLDS,
  DASHBOARD_REFRESH_INTERVAL: DASHBOARD_REFRESH_INTERVAL_MINUTES,
  REPORT_FORMATS: ANALYTICS_REPORT_FORMATS,
  TIME_GRANULARITY: ANALYTICS_TIME_GRANULARITY,
} as const;

/**
 * অ্যানালিটিক্স কনফিগারেশন টাইপ
 */
export type AnalyticsConfig = typeof ANALYTICS_CONFIG;

/**
 * কেপিআই থ্রেশহোল্ড লেভেল নির্ধারণ করুন
 */
export function getKPILevel(value: number, thresholds: Record<string, number>): string {
  const entries = Object.entries(thresholds);
  for (const [level, threshold] of entries) {
    if (value >= threshold) {
      return level;
    }
  }
  return 'CRITICAL';
}

/**
 * ডেলিভারি টাইম কেপিআই লেভেল পাওয়া
 */
export function getDeliveryTimeKPILevel(hours: number): string {
  return getKPILevel(hours, KPI_THRESHOLDS.DELIVERY_TIME);
}

/**
 * অন-টাইম ডেলিভারি কেপিআই লেভেল পাওয়া
 */
export function getOnTimeDeliveryKPILevel(percentage: number): string {
  return getKPILevel(percentage, KPI_THRESHOLDS.ON_TIME_DELIVERY);
}

/**
 * ডেলিভারি সাকসেস কেপিআই লেভেল পাওয়া
 */
export function getDeliverySuccessKPILevel(percentage: number): string {
  return getKPILevel(percentage, KPI_THRESHOLDS.DELIVERY_SUCCESS);
}

/**
 * কুরিয়ার ইউটিলাইজেশন কেপিআই লেভেল পাওয়া
 */
export function getCourierUtilizationKPILevel(percentage: number): string {
  return getKPILevel(percentage, KPI_THRESHOLDS.COURIER_UTILIZATION);
}

/**
 * কস্ট পার ডেলিভারি কেপিআই লেভেল পাওয়া
 */
export function getCostPerDeliveryKPILevel(cost: number): string {
  return getKPILevel(cost, KPI_THRESHOLDS.COST_PER_DELIVERY);
}

/**
 * সন্তুষ্টি স্কোর কেপিআই লেভেল পাওয়া
 */
export function getSatisfactionScoreKPILevel(score: number): string {
  return getKPILevel(score, KPI_THRESHOLDS.SATISFACTION_SCORE);
}

/**
 * কেপিআই থ্রেশহোল্ডের বিবরণ পাওয়া
 */
export function getKPIThresholdDescription(kpi: string): string {
  const descriptions: Record<string, string> = {
    DELIVERY_TIME: 'ডেলিভারি সময় (ঘন্টা)',
    ON_TIME_DELIVERY: 'সময়মতো ডেলিভারি (%)',
    DELIVERY_SUCCESS: 'ডেলিভারি সাফল্য (%)',
    COURIER_UTILIZATION: 'কুরিয়ার ব্যবহার (%)',
    COST_PER_DELIVERY: 'প্রতি ডেলিভারি খরচ (টাকা)',
    SATISFACTION_SCORE: 'গ্রাহক সন্তুষ্টি স্কোর',
  };
  return descriptions[kpi] || kpi;
}
