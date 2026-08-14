/**
 * Flash Sale Analytics Constants
 * ফ্ল্যাশ সেল অ্যানালিটিক্স সম্পর্কিত কনস্ট্যান্টসমূহ
 */

// ডিফল্ট টাইম রেঞ্জ (দিনে)
export const DEFAULT_TIME_RANGE = 30;

// ডিফল্ট মেট্রিক্স
export const DEFAULT_METRICS = {
  revenue: 'revenue',
  orders: 'orders',
  participants: 'participants',
  conversionRate: 'conversion_rate',
  averageOrderValue: 'average_order_value',
};

// ডিফল্ট চার্ট টাইপ
export const DEFAULT_CHART_TYPE = {
  line: 'line',
  bar: 'bar',
  pie: 'pie',
  area: 'area',
  scatter: 'scatter',
};

// ডিফল্ট অ্যাগ্রিগেশন
export const DEFAULT_AGGREGATION = {
  daily: 'daily',
  weekly: 'weekly',
  monthly: 'monthly',
  hourly: 'hourly',
};

// ক্যাশ টাইমআউট (মিলিসেকেন্ডে)
export const ANALYTICS_CACHE_TIMEOUT = 600000; // ১০ মিনিট

// ডিফল্ট পেজিনেশন
export const ANALYTICS_PAGINATION_SIZE = 10;

// রিফ্রেশ ইন্টারভাল (মিলিসেকেন্ডে)
export const ANALYTICS_REFRESH_INTERVAL = 30000; // ৩০ সেকেন্ড

// ডিফল্ট ড্যাশবোর্ড সেটিংস
export const DEFAULT_DASHBOARD_SETTINGS = {
  showRevenue: true,
  showOrders: true,
  showParticipants: true,
  showConversionRate: true,
  showAverageOrderValue: true,
  autoRefresh: true,
  refreshInterval: 30000,
};

// ডিফল্ট সর্টিং
export const DEFAULT_ANALYTICS_SORTING = {
  field: 'date',
  order: 'desc' as const,
};

// API রেসপন্স লিমিট
export const ANALYTICS_API_RESPONSE_LIMIT = 100;

// ডিফল্ট এক্সপোর্ট ফরম্যাট
export const DEFAULT_EXPORT_FORMAT = {
  csv: 'csv',
  excel: 'excel',
  json: 'json',
  pdf: 'pdf',
};

// অ্যানালিটিক্স কনফিগারেশন ইন্টারফেস
export interface FlashSaleAnalyticsConfig {
  defaultTimeRange: number;
  defaultMetrics: {
    revenue: string;
    orders: string;
    participants: string;
    conversionRate: string;
    averageOrderValue: string;
  };
  defaultChartTypes: {
    line: string;
    bar: string;
    pie: string;
    area: string;
    scatter: string;
  };
  defaultAggregations: {
    daily: string;
    weekly: string;
    monthly: string;
    hourly: string;
  };
  cacheTimeout: number;
  paginationSize: number;
  refreshInterval: number;
  defaultSorting: {
    field: string;
    order: 'asc' | 'desc';
  };
  apiResponseLimit: number;
  defaultExportFormats: {
    csv: string;
    excel: string;
    json: string;
    pdf: string;
  };
  defaultDashboardSettings: {
    showRevenue: boolean;
    showOrders: boolean;
    showParticipants: boolean;
    showConversionRate: boolean;
    showAverageOrderValue: boolean;
    autoRefresh: boolean;
    refreshInterval: number;
  };
}

// ডিফল্ট অ্যানালিটিক্স কনফিগারেশন
export const DEFAULT_ANALYTICS_CONFIG: FlashSaleAnalyticsConfig = {
  defaultTimeRange: DEFAULT_TIME_RANGE,
  defaultMetrics: DEFAULT_METRICS,
  defaultChartTypes: DEFAULT_CHART_TYPE,
  defaultAggregations: DEFAULT_AGGREGATION,
  cacheTimeout: ANALYTICS_CACHE_TIMEOUT,
  paginationSize: ANALYTICS_PAGINATION_SIZE,
  refreshInterval: ANALYTICS_REFRESH_INTERVAL,
  defaultSorting: DEFAULT_ANALYTICS_SORTING,
  apiResponseLimit: ANALYTICS_API_RESPONSE_LIMIT,
  defaultExportFormats: DEFAULT_EXPORT_FORMAT,
  defaultDashboardSettings: DEFAULT_DASHBOARD_SETTINGS,
};

// মেট্রিক্সের লেবেল
export const METRICS_LABELS: Record<
  (typeof DEFAULT_METRICS)[keyof typeof DEFAULT_METRICS],
  string
> = {
  revenue: 'রাজস্ব',
  orders: 'অর্ডার',
  participants: 'অংশগ্রহণকারী',
  conversion_rate: 'কনভার্সন রেট',
  average_order_value: 'গড় অর্ডার মান',
};

// চার্ট টাইপের লেবেল
export const CHART_TYPE_LABELS: Record<
  (typeof DEFAULT_CHART_TYPE)[keyof typeof DEFAULT_CHART_TYPE],
  string
> = {
  line: 'লাইন চার্ট',
  bar: 'বার চার্ট',
  pie: 'পাই চার্ট',
  area: 'এরিয়া চার্ট',
  scatter: 'স্ক্যাটার চার্ট',
};

// অ্যাগ্রিগেশনের লেবেল
export const AGGREGATION_LABELS: Record<
  (typeof DEFAULT_AGGREGATION)[keyof typeof DEFAULT_AGGREGATION],
  string
> = {
  daily: 'দৈনিক',
  weekly: 'সাপ্তাহিক',
  monthly: 'মাসিক',
  hourly: 'প্রতি ঘন্টা',
};

// এক্সপোর্ট ফরম্যাটের লেবেল
export const EXPORT_FORMAT_LABELS: Record<
  (typeof DEFAULT_EXPORT_FORMAT)[keyof typeof DEFAULT_EXPORT_FORMAT],
  string
> = {
  csv: 'CSV',
  excel: 'Excel',
  json: 'JSON',
  pdf: 'PDF',
};

// হেল্পার ফাংশন: টাইম রেঞ্জ ভ্যালিড কিনা চেক করুন
export const isValidTimeRange = (range: number): boolean => {
  return range >= 1 && range <= 365;
};

// হেল্পার ফাংশন: মেট্রিক্স ভ্যালিড কিনা চেক করুন
export const isValidMetric = (
  metric: string
): metric is (typeof DEFAULT_METRICS)[keyof typeof DEFAULT_METRICS] => {
  return Object.values(DEFAULT_METRICS).includes(
    metric as (typeof DEFAULT_METRICS)[keyof typeof DEFAULT_METRICS]
  );
};

// হেল্পার ফাংশন: চার্ট টাইপ ভ্যালিড কিনা চেক করুন
export const isValidChartType = (
  type: string
): type is (typeof DEFAULT_CHART_TYPE)[keyof typeof DEFAULT_CHART_TYPE] => {
  return Object.values(DEFAULT_CHART_TYPE).includes(
    type as (typeof DEFAULT_CHART_TYPE)[keyof typeof DEFAULT_CHART_TYPE]
  );
};

// হেল্পার ফাংশন: অ্যাগ্রিগেশন ভ্যালিড কিনা চেক করুন
export const isValidAggregation = (
  aggregation: string
): aggregation is (typeof DEFAULT_AGGREGATION)[keyof typeof DEFAULT_AGGREGATION] => {
  return Object.values(DEFAULT_AGGREGATION).includes(
    aggregation as (typeof DEFAULT_AGGREGATION)[keyof typeof DEFAULT_AGGREGATION]
  );
};

// হেল্পার ফাংশন: এক্সপোর্ট ফরম্যাট ভ্যালিড কিনা চেক করুন
export const isValidExportFormat = (
  format: string
): format is (typeof DEFAULT_EXPORT_FORMAT)[keyof typeof DEFAULT_EXPORT_FORMAT] => {
  return Object.values(DEFAULT_EXPORT_FORMAT).includes(
    format as (typeof DEFAULT_EXPORT_FORMAT)[keyof typeof DEFAULT_EXPORT_FORMAT]
  );
};

// হেল্পার ফাংশন: মেট্রিক্সের লেবেল পান
export const getMetricLabel = (metric: string): string => {
  return METRICS_LABELS[metric as keyof typeof METRICS_LABELS] || metric;
};

// হেল্পার ফাংশন: চার্ট টাইপের লেবেল পান
export const getChartTypeLabel = (type: string): string => {
  return CHART_TYPE_LABELS[type as keyof typeof CHART_TYPE_LABELS] || type;
};

// হেল্পার ফাংশন: অ্যাগ্রিগেশনের লেবেল পান
export const getAggregationLabel = (aggregation: string): string => {
  return AGGREGATION_LABELS[aggregation as keyof typeof AGGREGATION_LABELS] || aggregation;
};

// হেল্পার ফাংশন: এক্সপোর্ট ফরম্যাটের লেবেল পান
export const getExportFormatLabel = (format: string): string => {
  return EXPORT_FORMAT_LABELS[format as keyof typeof EXPORT_FORMAT_LABELS] || format;
};
