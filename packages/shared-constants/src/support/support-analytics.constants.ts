/**
 * সাপোর্ট অ্যানালিটিক্স সিস্টেমের মৌলিক কনস্ট্যান্টসমূহ
 */

/**
 * ডিফল্ট ড্যাশবোর্ড রিফ্রেশ টাইম (সেকেন্ডে)
 */
export const DEFAULT_DASHBOARD_REFRESH_TIME = 60;

/**
 * টিকেট মেট্রিক্স ক্যালকুলেশন পিরিয়ড (দিনে)
 */
export const TICKET_METRICS_CALCULATION_PERIOD = 30;

/**
 * অ্যানালিটিক্স ডেটা রিটেনশন পিরিয়ড (দিনে)
 */
export const ANALYTICS_DATA_RETENTION_PERIOD = 365;

/**
 * ডিফল্ট অ্যানালিটিক্স চার্ট টাইপ
 */
export const DEFAULT_ANALYTICS_CHART_TYPE = 'line';

/**
 * মেট্রিক্স থ্রেশহোল্ড
 */
export const METRICS_THRESHOLDS = {
  RESPONSE_TIME_WARNING: 60,
  RESPONSE_TIME_CRITICAL: 120,
  RESOLUTION_TIME_WARNING: 24,
  RESOLUTION_TIME_CRITICAL: 48,
  SATISFACTION_WARNING: 70,
  SATISFACTION_CRITICAL: 50,
  ESCALATION_RATE_WARNING: 20,
  ESCALATION_RATE_CRITICAL: 40,
  ABANDON_RATE_WARNING: 15,
  ABANDON_RATE_CRITICAL: 30,
} as const;

/**
 * পিক আওয়ার আইডেন্টিফিকেশন রুলস
 */
export const PEAK_HOUR_RULES = {
  THRESHOLD: 1.5, // গড়ের ১.৫ গুণ বেশি হলে পিক আওয়ার
  MIN_DURATION: 2, // কমপক্ষে ২ ঘন্টা
  MIN_TICKETS: 20, // কমপক্ষে ২০ টি টিকেট
  TIME_WINDOW: 24, // ২৪ ঘন্টার মধ্যে
} as const;

/**
 * অ্যানালিটিক্স টাইপ
 */
export const ANALYTICS_TYPE = {
  TICKET: 'ticket',
  RESPONSE: 'response',
  RESOLUTION: 'resolution',
  SATISFACTION: 'satisfaction',
  ESCALATION: 'escalation',
  CHAT: 'chat',
  AGENT: 'agent',
  CATEGORY: 'category',
  PRIORITY: 'priority',
  CHANNEL: 'channel',
  TREND: 'trend',
  FORECAST: 'forecast',
} as const;

/**
 * অ্যানালিটিক্স টাইপের ডিসপ্লে নাম
 */
export const ANALYTICS_TYPE_DISPLAY_NAMES = {
  [ANALYTICS_TYPE.TICKET]: 'টিকেট অ্যানালিটিক্স',
  [ANALYTICS_TYPE.RESPONSE]: 'রেসপন্স অ্যানালিটিক্স',
  [ANALYTICS_TYPE.RESOLUTION]: 'রেজোলিউশন অ্যানালিটিক্স',
  [ANALYTICS_TYPE.SATISFACTION]: 'সন্তুষ্টি অ্যানালিটিক্স',
  [ANALYTICS_TYPE.ESCALATION]: 'এস্কেলেশন অ্যানালিটিক্স',
  [ANALYTICS_TYPE.CHAT]: 'চ্যাট অ্যানালিটিক্স',
  [ANALYTICS_TYPE.AGENT]: 'এজেন্ট অ্যানালিটিক্স',
  [ANALYTICS_TYPE.CATEGORY]: 'ক্যাটাগরি অ্যানালিটিক্স',
  [ANALYTICS_TYPE.PRIORITY]: 'প্রায়োরিটি অ্যানালিটিক্স',
  [ANALYTICS_TYPE.CHANNEL]: 'চ্যানেল অ্যানালিটিক্স',
  [ANALYTICS_TYPE.TREND]: 'ট্রেন্ড অ্যানালিটিক্স',
  [ANALYTICS_TYPE.FORECAST]: 'ফোরকাস্ট অ্যানালিটিক্স',
} as const;

/**
 * অ্যানালিটিক্স টাইম ফ্রেম
 */
export const ANALYTICS_TIME_FRAME = {
  TODAY: 'today',
  YESTERDAY: 'yesterday',
  WEEK: 'week',
  MONTH: 'month',
  QUARTER: 'quarter',
  YEAR: 'year',
  CUSTOM: 'custom',
} as const;

/**
 * অ্যানালিটিক্স টাইম ফ্রেমের ডিসপ্লে নাম
 */
export const ANALYTICS_TIME_FRAME_DISPLAY_NAMES = {
  [ANALYTICS_TIME_FRAME.TODAY]: 'আজ',
  [ANALYTICS_TIME_FRAME.YESTERDAY]: 'গতকাল',
  [ANALYTICS_TIME_FRAME.WEEK]: 'এই সপ্তাহ',
  [ANALYTICS_TIME_FRAME.MONTH]: 'এই মাস',
  [ANALYTICS_TIME_FRAME.QUARTER]: 'এই ত্রৈমাসিক',
  [ANALYTICS_TIME_FRAME.YEAR]: 'এই বছর',
  [ANALYTICS_TIME_FRAME.CUSTOM]: 'কাস্টম',
} as const;

/**
 * চার্ট টাইপ
 */
export const CHART_TYPES = {
  LINE: 'line',
  BAR: 'bar',
  PIE: 'pie',
  AREA: 'area',
  SCATTER: 'scatter',
  HEATMAP: 'heatmap',
  GAUGE: 'gauge',
  FUNNEL: 'funnel',
  TABLE: 'table',
} as const;

/**
 * চার্ট টাইপের ডিসপ্লে নাম
 */
export const CHART_TYPES_DISPLAY_NAMES = {
  [CHART_TYPES.LINE]: 'লাইন চার্ট',
  [CHART_TYPES.BAR]: 'বার চার্ট',
  [CHART_TYPES.PIE]: 'পাই চার্ট',
  [CHART_TYPES.AREA]: 'এরিয়া চার্ট',
  [CHART_TYPES.SCATTER]: 'স্ক্যাটার চার্ট',
  [CHART_TYPES.HEATMAP]: 'হিটম্যাপ',
  [CHART_TYPES.GAUGE]: 'গজ',
  [CHART_TYPES.FUNNEL]: 'ফানেল',
  [CHART_TYPES.TABLE]: 'টেবিল',
} as const;

/**
 * মেট্রিক্স ক্যাটাগরি
 */
export const METRICS_CATEGORY = {
  VOLUME: 'volume',
  PERFORMANCE: 'performance',
  QUALITY: 'quality',
  EFFICIENCY: 'efficiency',
  SATISFACTION: 'satisfaction',
  OPERATIONAL: 'operational',
} as const;

/**
 * মেট্রিক্স ক্যাটাগরির ডিসপ্লে নাম
 */
export const METRICS_CATEGORY_DISPLAY_NAMES = {
  [METRICS_CATEGORY.VOLUME]: 'ভলিউম',
  [METRICS_CATEGORY.PERFORMANCE]: 'পারফরম্যান্স',
  [METRICS_CATEGORY.QUALITY]: 'গুণমান',
  [METRICS_CATEGORY.EFFICIENCY]: 'দক্ষতা',
  [METRICS_CATEGORY.SATISFACTION]: 'সন্তুষ্টি',
  [METRICS_CATEGORY.OPERATIONAL]: 'অপারেশনাল',
} as const;

/**
 * মেট্রিক্স থ্রেশহোল্ড লেভেল
 */
export const METRICS_THRESHOLD_LEVELS = {
  GOOD: 'good',
  WARNING: 'warning',
  CRITICAL: 'critical',
} as const;

/**
 * অ্যানালিটিক্স ডিফল্ট সেটিংস
 */
export const ANALYTICS_DEFAULT_SETTINGS = {
  dashboardRefreshTime: DEFAULT_DASHBOARD_REFRESH_TIME,
  metricsCalculationPeriod: TICKET_METRICS_CALCULATION_PERIOD,
  dataRetentionPeriod: ANALYTICS_DATA_RETENTION_PERIOD,
  defaultChartType: DEFAULT_ANALYTICS_CHART_TYPE as typeof DEFAULT_ANALYTICS_CHART_TYPE,
  metricsThresholds: METRICS_THRESHOLDS,
  peakHourRules: PEAK_HOUR_RULES,
} as const;

/**
 * রিপোর্ট টাইপ
 */
export const REPORT_TYPES = {
  DAILY: 'daily',
  WEEKLY: 'weekly',
  MONTHLY: 'monthly',
  QUARTERLY: 'quarterly',
  YEARLY: 'yearly',
  CUSTOM: 'custom',
} as const;

/**
 * রিপোর্ট টাইপের ডিসপ্লে নাম
 */
export const REPORT_TYPES_DISPLAY_NAMES = {
  [REPORT_TYPES.DAILY]: 'দৈনিক রিপোর্ট',
  [REPORT_TYPES.WEEKLY]: 'সাপ্তাহিক রিপোর্ট',
  [REPORT_TYPES.MONTHLY]: 'মাসিক রিপোর্ট',
  [REPORT_TYPES.QUARTERLY]: 'ত্রৈমাসিক রিপোর্ট',
  [REPORT_TYPES.YEARLY]: 'বার্ষিক রিপোর্ট',
  [REPORT_TYPES.CUSTOM]: 'কাস্টম রিপোর্ট',
} as const;

/**
 * রিপোর্ট ফরম্যাট
 */
export const REPORT_FORMATS = {
  PDF: 'pdf',
  EXCEL: 'excel',
  CSV: 'csv',
  JSON: 'json',
  HTML: 'html',
} as const;

/**
 * রিপোর্ট ফরম্যাটের ডিসপ্লে নাম
 */
export const REPORT_FORMATS_DISPLAY_NAMES = {
  [REPORT_FORMATS.PDF]: 'পিডিএফ',
  [REPORT_FORMATS.EXCEL]: 'এক্সেল',
  [REPORT_FORMATS.CSV]: 'সিএসভি',
  [REPORT_FORMATS.JSON]: 'জেসন',
  [REPORT_FORMATS.HTML]: 'এইচটিএমএল',
} as const;

export type AnalyticsType = (typeof ANALYTICS_TYPE)[keyof typeof ANALYTICS_TYPE];
export type AnalyticsTimeFrame = (typeof ANALYTICS_TIME_FRAME)[keyof typeof ANALYTICS_TIME_FRAME];
export type ChartType = (typeof CHART_TYPES)[keyof typeof CHART_TYPES];
export type MetricsCategory = (typeof METRICS_CATEGORY)[keyof typeof METRICS_CATEGORY];
export type MetricsThresholdLevel =
  (typeof METRICS_THRESHOLD_LEVELS)[keyof typeof METRICS_THRESHOLD_LEVELS];
export type ReportType = (typeof REPORT_TYPES)[keyof typeof REPORT_TYPES];
export type ReportFormat = (typeof REPORT_FORMATS)[keyof typeof REPORT_FORMATS];

export interface MetricsThresholds {
  RESPONSE_TIME_WARNING: number;
  RESPONSE_TIME_CRITICAL: number;
  RESOLUTION_TIME_WARNING: number;
  RESOLUTION_TIME_CRITICAL: number;
  SATISFACTION_WARNING: number;
  SATISFACTION_CRITICAL: number;
  ESCALATION_RATE_WARNING: number;
  ESCALATION_RATE_CRITICAL: number;
  ABANDON_RATE_WARNING: number;
  ABANDON_RATE_CRITICAL: number;
}

export interface PeakHourRules {
  THRESHOLD: number;
  MIN_DURATION: number;
  MIN_TICKETS: number;
  TIME_WINDOW: number;
}

export interface AnalyticsDefaultSettings {
  dashboardRefreshTime: number;
  metricsCalculationPeriod: number;
  dataRetentionPeriod: number;
  defaultChartType: string;
  metricsThresholds: MetricsThresholds;
  peakHourRules: PeakHourRules;
}

export interface MetricValue {
  value: number;
  timestamp: Date;
  metadata?: Record<string, unknown>;
}

export interface MetricsData {
  metric: string;
  category: MetricsCategory;
  values: MetricValue[];
  average: number;
  min: number;
  max: number;
  total: number;
  count: number;
  threshold: number;
  level: MetricsThresholdLevel;
}

export interface AnalyticsReport {
  id: string;
  type: ReportType;
  format: ReportFormat;
  name: string;
  description?: string;
  metrics: string[];
  timeFrame: AnalyticsTimeFrame;
  startDate: Date;
  endDate: Date;
  data: MetricsData[];
  generatedAt: Date;
  generatedBy: string;
  metadata?: Record<string, unknown>;
}

export interface DashboardWidget {
  id: string;
  type: AnalyticsType;
  chartType: ChartType;
  title: string;
  metrics: string[];
  timeFrame: AnalyticsTimeFrame;
  position: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  settings?: Record<string, unknown>;
}

export interface AnalyticsFilter {
  categories?: MetricsCategory[];
  timeFrame: AnalyticsTimeFrame;
  startDate?: Date;
  endDate?: Date;
  metrics?: string[];
  agents?: string[];
  channels?: string[];
  priorities?: string[];
}

/**
 * অ্যানালিটিক্স কনফিগারেশন
 */
export const ANALYTICS_CONFIG = {
  defaultSettings: ANALYTICS_DEFAULT_SETTINGS,
  types: ANALYTICS_TYPE,
  timeFrames: ANALYTICS_TIME_FRAME,
  chartTypes: CHART_TYPES,
  metricsCategories: METRICS_CATEGORY,
  thresholdLevels: METRICS_THRESHOLD_LEVELS,
  reportTypes: REPORT_TYPES,
  reportFormats: REPORT_FORMATS,
} as const;

/**
 * অ্যানালিটিক্স ইভেন্ট টাইপ
 */
export const ANALYTICS_EVENT_TYPES = {
  VIEW: 'analytics_view',
  EXPORT: 'analytics_export',
  FILTER: 'analytics_filter',
  REFRESH: 'analytics_refresh',
  REPORT_GENERATED: 'report_generated',
  DASHBOARD_UPDATED: 'dashboard_updated',
} as const;

export type AnalyticsEventType = (typeof ANALYTICS_EVENT_TYPES)[keyof typeof ANALYTICS_EVENT_TYPES];

/**
 * অ্যানালিটিক্স মেট্রিক্স ডিফিনিশন
 */
export const ANALYTICS_METRICS_DEFINITIONS = {
  TOTAL_TICKETS: {
    name: 'total_tickets',
    displayName: 'মোট টিকেট',
    category: 'volume',
    description: 'মোট টিকেট সংখ্যা',
  },
  OPEN_TICKETS: {
    name: 'open_tickets',
    displayName: 'খোলা টিকেট',
    category: 'volume',
    description: 'বর্তমানে খোলা টিকেট সংখ্যা',
  },
  AVG_RESPONSE_TIME: {
    name: 'avg_response_time',
    displayName: 'গড় রেসপন্স টাইম',
    category: 'performance',
    description: 'প্রথম রেসপন্সের গড় সময়',
  },
  AVG_RESOLUTION_TIME: {
    name: 'avg_resolution_time',
    displayName: 'গড় রেজোলিউশন টাইম',
    category: 'performance',
    description: 'সমাধানের গড় সময়',
  },
  SATISFACTION_SCORE: {
    name: 'satisfaction_score',
    displayName: 'সন্তুষ্টি স্কোর',
    category: 'satisfaction',
    description: 'গ্রাহক সন্তুষ্টি স্কোর',
  },
  ESCALATION_RATE: {
    name: 'escalation_rate',
    displayName: 'এস্কেলেশন রেট',
    category: 'efficiency',
    description: 'এস্কেলেটেড টিকেটের হার',
  },
  RESOLUTION_RATE: {
    name: 'resolution_rate',
    displayName: 'রেজোলিউশন রেট',
    category: 'efficiency',
    description: 'সমাধানের হার',
  },
  ABANDON_RATE: {
    name: 'abandon_rate',
    displayName: 'অ্যাব্যান্ডন রেট',
    category: 'operational',
    description: 'পরিত্যক্ত টিকেটের হার',
  },
} as const;

export type AnalyticsMetricDefinition =
  (typeof ANALYTICS_METRICS_DEFINITIONS)[keyof typeof ANALYTICS_METRICS_DEFINITIONS];
