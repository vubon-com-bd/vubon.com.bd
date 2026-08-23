/**
 * Traffic Analytics Type Constants
 * Types of traffic analytics data and analysis
 */

export const TRAFFIC_ANALYTICS_TYPE = {
  // Analysis Types
  ANALYSIS_TYPES: {
    // Traffic Source Analysis
    SOURCE_ANALYSIS: 'source_analysis',
    CHANNEL_ANALYSIS: 'channel_analysis',
    REFERRAL_ANALYSIS: 'referral_analysis',
    CAMPAIGN_ANALYSIS: 'campaign_analysis',

    // Visitor Analysis
    VISITOR_ANALYSIS: 'visitor_analysis',
    VISITOR_BEHAVIOR: 'visitor_behavior',
    VISITOR_JOURNEY: 'visitor_journey',
    VISITOR_SEGMENTATION: 'visitor_segmentation',

    // Session Analysis
    SESSION_ANALYSIS: 'session_analysis',
    SESSION_QUALITY: 'session_quality',
    SESSION_DURATION: 'session_duration',

    // Device Analysis
    DEVICE_ANALYSIS: 'device_analysis',
    BROWSER_ANALYSIS: 'browser_analysis',
    OS_ANALYSIS: 'os_analysis',
    SCREEN_ANALYSIS: 'screen_analysis',

    // Location Analysis
    GEOGRAPHIC_ANALYSIS: 'geographic_analysis',
    REGIONAL_ANALYSIS: 'regional_analysis',
    LOCAL_ANALYSIS: 'local_analysis',

    // Performance Analysis
    PERFORMANCE_ANALYSIS: 'performance_analysis',
    SPEED_ANALYSIS: 'speed_analysis',
    ERROR_ANALYSIS: 'error_analysis',

    // Behavior Analysis
    BEHAVIOR_ANALYSIS: 'behavior_analysis',
    ENGAGEMENT_ANALYSIS: 'engagement_analysis',
    FUNNEL_ANALYSIS: 'funnel_analysis',
    PATH_ANALYSIS: 'path_analysis',

    // Comparative Analysis
    COMPARATIVE: 'comparative',
    YEAR_OVER_YEAR: 'year_over_year',
    QUARTER_OVER_QUARTER: 'quarter_over_quarter',
    MONTH_OVER_MONTH: 'month_over_month',
    WEEK_OVER_WEEK: 'week_over_week',

    // Predictive Analysis
    PREDICTIVE: 'predictive',
    FORECAST: 'forecast',
    TREND: 'trend',
  } as const,

  // Data Types
  DATA_TYPES: {
    TRAFFIC_DATA: 'traffic_data',
    VISITOR_DATA: 'visitor_data',
    SESSION_DATA: 'session_data',
    PAGE_VIEW_DATA: 'page_view_data',

    SOURCE_DATA: 'source_data',
    DEVICE_DATA: 'device_data',
    LOCATION_DATA: 'location_data',

    PERFORMANCE_DATA: 'performance_data',
    BEHAVIOR_DATA: 'behavior_data',

    TIME_SERIES: 'time_series',
    AGGREGATED: 'aggregated',
    RAW: 'raw',
    REALTIME: 'realtime',
  } as const,

  // Traffic Source Types
  SOURCE_TYPES: {
    ORGANIC: 'organic',
    DIRECT: 'direct',
    REFERRAL: 'referral',
    SOCIAL: 'social',
    PAID: 'paid',
    EMAIL: 'email',
    DISPLAY: 'display',
    VIDEO: 'video',
    NATIVE: 'native',
    OTHER: 'other',
  } as const,

  // Device Types
  DEVICE_TYPES: {
    DESKTOP: 'desktop',
    MOBILE: 'mobile',
    TABLET: 'tablet',
    SMART_TV: 'smart_tv',
    GAMING_CONSOLE: 'gaming_console',
    WEARABLE: 'wearable',
    OTHER: 'other',
  } as const,

  // Browser Types
  BROWSER_TYPES: {
    CHROME: 'chrome',
    FIREFOX: 'firefox',
    SAFARI: 'safari',
    EDGE: 'edge',
    OPERA: 'opera',
    BRAVE: 'brave',
    VIVALDI: 'vivaldi',
    IE: 'ie',
    SAMSUNG_INTERNET: 'samsung_internet',
    UC_BROWSER: 'uc_browser',
    OTHER: 'other',
  } as const,

  // OS Types
  OS_TYPES: {
    WINDOWS: 'windows',
    MACOS: 'macos',
    LINUX: 'linux',
    IOS: 'ios',
    ANDROID: 'android',
    CHROME_OS: 'chrome_os',
    OTHER: 'other',
  } as const,

  // Visitor Types
  VISITOR_TYPES: {
    NEW: 'new',
    RETURNING: 'returning',
    ENGAGED: 'engaged',
    CASUAL: 'casual',
    LOYAL: 'loyal',
    AT_RISK: 'at_risk',
    CHURNED: 'churned',
  } as const,

  // Session Quality Levels
  SESSION_QUALITY: {
    EXCELLENT: 'excellent',
    GOOD: 'good',
    AVERAGE: 'average',
    POOR: 'poor',
    VERY_POOR: 'very_poor',
  } as const,

  // Engagement Levels
  ENGAGEMENT_LEVELS: {
    VERY_HIGH: 'very_high',
    HIGH: 'high',
    MEDIUM: 'medium',
    LOW: 'low',
    VERY_LOW: 'very_low',
    NONE: 'none',
  } as const,

  // Bounce Types
  BOUNCE_TYPES: {
    SINGLE_PAGE: 'single_page',
    SHORT_DURATION: 'short_duration',
    NO_ACTION: 'no_action',
    EXIT_EARLY: 'exit_early',
  } as const,

  // Conversion Types
  CONVERSION_TYPES: {
    MICRO: 'micro',
    MACRO: 'macro',
    PRIMARY: 'primary',
    SECONDARY: 'secondary',
  } as const,

  // Funnel Types
  FUNNEL_TYPES: {
    ACQUISITION: 'acquisition',
    ACTIVATION: 'activation',
    RETENTION: 'retention',
    REVENUE: 'revenue',
    REFERRAL: 'referral',
    PURCHASE: 'purchase',
    SIGNUP: 'signup',
  } as const,
} as const;

// Traffic Analytics Analysis Types
export type TrafficAnalyticsAnalysisType =
  (typeof TRAFFIC_ANALYTICS_TYPE.ANALYSIS_TYPES)[keyof typeof TRAFFIC_ANALYTICS_TYPE.ANALYSIS_TYPES];

// Traffic Analytics Data Types
export type TrafficAnalyticsDataType =
  (typeof TRAFFIC_ANALYTICS_TYPE.DATA_TYPES)[keyof typeof TRAFFIC_ANALYTICS_TYPE.DATA_TYPES];

// Traffic Analytics Source Types
export type TrafficAnalyticsSourceType =
  (typeof TRAFFIC_ANALYTICS_TYPE.SOURCE_TYPES)[keyof typeof TRAFFIC_ANALYTICS_TYPE.SOURCE_TYPES];

// Traffic Analytics Device Types
export type TrafficAnalyticsDeviceType =
  (typeof TRAFFIC_ANALYTICS_TYPE.DEVICE_TYPES)[keyof typeof TRAFFIC_ANALYTICS_TYPE.DEVICE_TYPES];

// Traffic Analytics Browser Types
export type TrafficAnalyticsBrowserType =
  (typeof TRAFFIC_ANALYTICS_TYPE.BROWSER_TYPES)[keyof typeof TRAFFIC_ANALYTICS_TYPE.BROWSER_TYPES];

// Traffic Analytics OS Types
export type TrafficAnalyticsOSType =
  (typeof TRAFFIC_ANALYTICS_TYPE.OS_TYPES)[keyof typeof TRAFFIC_ANALYTICS_TYPE.OS_TYPES];

// Traffic Analytics Visitor Types
export type TrafficAnalyticsVisitorType =
  (typeof TRAFFIC_ANALYTICS_TYPE.VISITOR_TYPES)[keyof typeof TRAFFIC_ANALYTICS_TYPE.VISITOR_TYPES];

// Traffic Analytics Session Quality
export type TrafficAnalyticsSessionQuality =
  (typeof TRAFFIC_ANALYTICS_TYPE.SESSION_QUALITY)[keyof typeof TRAFFIC_ANALYTICS_TYPE.SESSION_QUALITY];

// Traffic Analytics Engagement Levels
export type TrafficAnalyticsEngagementLevel =
  (typeof TRAFFIC_ANALYTICS_TYPE.ENGAGEMENT_LEVELS)[keyof typeof TRAFFIC_ANALYTICS_TYPE.ENGAGEMENT_LEVELS];

// Traffic Analytics Bounce Types
export type TrafficAnalyticsBounceType =
  (typeof TRAFFIC_ANALYTICS_TYPE.BOUNCE_TYPES)[keyof typeof TRAFFIC_ANALYTICS_TYPE.BOUNCE_TYPES];

// Traffic Analytics Conversion Types
export type TrafficAnalyticsConversionType =
  (typeof TRAFFIC_ANALYTICS_TYPE.CONVERSION_TYPES)[keyof typeof TRAFFIC_ANALYTICS_TYPE.CONVERSION_TYPES];

// Traffic Analytics Funnel Types
export type TrafficAnalyticsFunnelType =
  (typeof TRAFFIC_ANALYTICS_TYPE.FUNNEL_TYPES)[keyof typeof TRAFFIC_ANALYTICS_TYPE.FUNNEL_TYPES];

// Traffic Analytics Analysis Type Labels
export function getTrafficAnalyticsAnalysisTypeLabel(type: TrafficAnalyticsAnalysisType): string {
  const labels: Record<TrafficAnalyticsAnalysisType, string> = {
    [TRAFFIC_ANALYTICS_TYPE.ANALYSIS_TYPES.SOURCE_ANALYSIS]: 'Source Analysis',
    [TRAFFIC_ANALYTICS_TYPE.ANALYSIS_TYPES.CHANNEL_ANALYSIS]: 'Channel Analysis',
    [TRAFFIC_ANALYTICS_TYPE.ANALYSIS_TYPES.REFERRAL_ANALYSIS]: 'Referral Analysis',
    [TRAFFIC_ANALYTICS_TYPE.ANALYSIS_TYPES.CAMPAIGN_ANALYSIS]: 'Campaign Analysis',
    [TRAFFIC_ANALYTICS_TYPE.ANALYSIS_TYPES.VISITOR_ANALYSIS]: 'Visitor Analysis',
    [TRAFFIC_ANALYTICS_TYPE.ANALYSIS_TYPES.VISITOR_BEHAVIOR]: 'Visitor Behavior',
    [TRAFFIC_ANALYTICS_TYPE.ANALYSIS_TYPES.VISITOR_JOURNEY]: 'Visitor Journey',
    [TRAFFIC_ANALYTICS_TYPE.ANALYSIS_TYPES.VISITOR_SEGMENTATION]: 'Visitor Segmentation',
    [TRAFFIC_ANALYTICS_TYPE.ANALYSIS_TYPES.SESSION_ANALYSIS]: 'Session Analysis',
    [TRAFFIC_ANALYTICS_TYPE.ANALYSIS_TYPES.SESSION_QUALITY]: 'Session Quality',
    [TRAFFIC_ANALYTICS_TYPE.ANALYSIS_TYPES.SESSION_DURATION]: 'Session Duration',
    [TRAFFIC_ANALYTICS_TYPE.ANALYSIS_TYPES.DEVICE_ANALYSIS]: 'Device Analysis',
    [TRAFFIC_ANALYTICS_TYPE.ANALYSIS_TYPES.BROWSER_ANALYSIS]: 'Browser Analysis',
    [TRAFFIC_ANALYTICS_TYPE.ANALYSIS_TYPES.OS_ANALYSIS]: 'OS Analysis',
    [TRAFFIC_ANALYTICS_TYPE.ANALYSIS_TYPES.SCREEN_ANALYSIS]: 'Screen Analysis',
    [TRAFFIC_ANALYTICS_TYPE.ANALYSIS_TYPES.GEOGRAPHIC_ANALYSIS]: 'Geographic Analysis',
    [TRAFFIC_ANALYTICS_TYPE.ANALYSIS_TYPES.REGIONAL_ANALYSIS]: 'Regional Analysis',
    [TRAFFIC_ANALYTICS_TYPE.ANALYSIS_TYPES.LOCAL_ANALYSIS]: 'Local Analysis',
    [TRAFFIC_ANALYTICS_TYPE.ANALYSIS_TYPES.PERFORMANCE_ANALYSIS]: 'Performance Analysis',
    [TRAFFIC_ANALYTICS_TYPE.ANALYSIS_TYPES.SPEED_ANALYSIS]: 'Speed Analysis',
    [TRAFFIC_ANALYTICS_TYPE.ANALYSIS_TYPES.ERROR_ANALYSIS]: 'Error Analysis',
    [TRAFFIC_ANALYTICS_TYPE.ANALYSIS_TYPES.BEHAVIOR_ANALYSIS]: 'Behavior Analysis',
    [TRAFFIC_ANALYTICS_TYPE.ANALYSIS_TYPES.ENGAGEMENT_ANALYSIS]: 'Engagement Analysis',
    [TRAFFIC_ANALYTICS_TYPE.ANALYSIS_TYPES.FUNNEL_ANALYSIS]: 'Funnel Analysis',
    [TRAFFIC_ANALYTICS_TYPE.ANALYSIS_TYPES.PATH_ANALYSIS]: 'Path Analysis',
    [TRAFFIC_ANALYTICS_TYPE.ANALYSIS_TYPES.COMPARATIVE]: 'Comparative Analysis',
    [TRAFFIC_ANALYTICS_TYPE.ANALYSIS_TYPES.YEAR_OVER_YEAR]: 'Year Over Year',
    [TRAFFIC_ANALYTICS_TYPE.ANALYSIS_TYPES.QUARTER_OVER_QUARTER]: 'Quarter Over Quarter',
    [TRAFFIC_ANALYTICS_TYPE.ANALYSIS_TYPES.MONTH_OVER_MONTH]: 'Month Over Month',
    [TRAFFIC_ANALYTICS_TYPE.ANALYSIS_TYPES.WEEK_OVER_WEEK]: 'Week Over Week',
    [TRAFFIC_ANALYTICS_TYPE.ANALYSIS_TYPES.PREDICTIVE]: 'Predictive Analysis',
    [TRAFFIC_ANALYTICS_TYPE.ANALYSIS_TYPES.FORECAST]: 'Forecast',
    [TRAFFIC_ANALYTICS_TYPE.ANALYSIS_TYPES.TREND]: 'Trend Analysis',
  };
  return labels[type] || 'Unknown';
}

// Traffic Analytics Data Type Labels
export function getTrafficAnalyticsDataTypeLabel(type: TrafficAnalyticsDataType): string {
  const labels: Record<TrafficAnalyticsDataType, string> = {
    [TRAFFIC_ANALYTICS_TYPE.DATA_TYPES.TRAFFIC_DATA]: 'Traffic Data',
    [TRAFFIC_ANALYTICS_TYPE.DATA_TYPES.VISITOR_DATA]: 'Visitor Data',
    [TRAFFIC_ANALYTICS_TYPE.DATA_TYPES.SESSION_DATA]: 'Session Data',
    [TRAFFIC_ANALYTICS_TYPE.DATA_TYPES.PAGE_VIEW_DATA]: 'Page View Data',
    [TRAFFIC_ANALYTICS_TYPE.DATA_TYPES.SOURCE_DATA]: 'Source Data',
    [TRAFFIC_ANALYTICS_TYPE.DATA_TYPES.DEVICE_DATA]: 'Device Data',
    [TRAFFIC_ANALYTICS_TYPE.DATA_TYPES.LOCATION_DATA]: 'Location Data',
    [TRAFFIC_ANALYTICS_TYPE.DATA_TYPES.PERFORMANCE_DATA]: 'Performance Data',
    [TRAFFIC_ANALYTICS_TYPE.DATA_TYPES.BEHAVIOR_DATA]: 'Behavior Data',
    [TRAFFIC_ANALYTICS_TYPE.DATA_TYPES.TIME_SERIES]: 'Time Series',
    [TRAFFIC_ANALYTICS_TYPE.DATA_TYPES.AGGREGATED]: 'Aggregated',
    [TRAFFIC_ANALYTICS_TYPE.DATA_TYPES.RAW]: 'Raw',
    [TRAFFIC_ANALYTICS_TYPE.DATA_TYPES.REALTIME]: 'Real-time',
  };
  return labels[type] || 'Unknown';
}

// Traffic Analytics Source Type Labels
export function getTrafficAnalyticsSourceTypeLabel(type: TrafficAnalyticsSourceType): string {
  const labels: Record<TrafficAnalyticsSourceType, string> = {
    [TRAFFIC_ANALYTICS_TYPE.SOURCE_TYPES.ORGANIC]: 'Organic',
    [TRAFFIC_ANALYTICS_TYPE.SOURCE_TYPES.DIRECT]: 'Direct',
    [TRAFFIC_ANALYTICS_TYPE.SOURCE_TYPES.REFERRAL]: 'Referral',
    [TRAFFIC_ANALYTICS_TYPE.SOURCE_TYPES.SOCIAL]: 'Social',
    [TRAFFIC_ANALYTICS_TYPE.SOURCE_TYPES.PAID]: 'Paid',
    [TRAFFIC_ANALYTICS_TYPE.SOURCE_TYPES.EMAIL]: 'Email',
    [TRAFFIC_ANALYTICS_TYPE.SOURCE_TYPES.DISPLAY]: 'Display',
    [TRAFFIC_ANALYTICS_TYPE.SOURCE_TYPES.VIDEO]: 'Video',
    [TRAFFIC_ANALYTICS_TYPE.SOURCE_TYPES.NATIVE]: 'Native',
    [TRAFFIC_ANALYTICS_TYPE.SOURCE_TYPES.OTHER]: 'Other',
  };
  return labels[type] || 'Unknown';
}

// Traffic Analytics Device Type Labels
export function getTrafficAnalyticsDeviceTypeLabel(type: TrafficAnalyticsDeviceType): string {
  const labels: Record<TrafficAnalyticsDeviceType, string> = {
    [TRAFFIC_ANALYTICS_TYPE.DEVICE_TYPES.DESKTOP]: 'Desktop',
    [TRAFFIC_ANALYTICS_TYPE.DEVICE_TYPES.MOBILE]: 'Mobile',
    [TRAFFIC_ANALYTICS_TYPE.DEVICE_TYPES.TABLET]: 'Tablet',
    [TRAFFIC_ANALYTICS_TYPE.DEVICE_TYPES.SMART_TV]: 'Smart TV',
    [TRAFFIC_ANALYTICS_TYPE.DEVICE_TYPES.GAMING_CONSOLE]: 'Gaming Console',
    [TRAFFIC_ANALYTICS_TYPE.DEVICE_TYPES.WEARABLE]: 'Wearable',
    [TRAFFIC_ANALYTICS_TYPE.DEVICE_TYPES.OTHER]: 'Other',
  };
  return labels[type] || 'Unknown';
}

// Traffic Analytics Browser Type Labels
export function getTrafficAnalyticsBrowserTypeLabel(type: TrafficAnalyticsBrowserType): string {
  const labels: Record<TrafficAnalyticsBrowserType, string> = {
    [TRAFFIC_ANALYTICS_TYPE.BROWSER_TYPES.CHROME]: 'Chrome',
    [TRAFFIC_ANALYTICS_TYPE.BROWSER_TYPES.FIREFOX]: 'Firefox',
    [TRAFFIC_ANALYTICS_TYPE.BROWSER_TYPES.SAFARI]: 'Safari',
    [TRAFFIC_ANALYTICS_TYPE.BROWSER_TYPES.EDGE]: 'Edge',
    [TRAFFIC_ANALYTICS_TYPE.BROWSER_TYPES.OPERA]: 'Opera',
    [TRAFFIC_ANALYTICS_TYPE.BROWSER_TYPES.BRAVE]: 'Brave',
    [TRAFFIC_ANALYTICS_TYPE.BROWSER_TYPES.VIVALDI]: 'Vivaldi',
    [TRAFFIC_ANALYTICS_TYPE.BROWSER_TYPES.IE]: 'IE',
    [TRAFFIC_ANALYTICS_TYPE.BROWSER_TYPES.SAMSUNG_INTERNET]: 'Samsung Internet',
    [TRAFFIC_ANALYTICS_TYPE.BROWSER_TYPES.UC_BROWSER]: 'UC Browser',
    [TRAFFIC_ANALYTICS_TYPE.BROWSER_TYPES.OTHER]: 'Other',
  };
  return labels[type] || 'Unknown';
}

// Traffic Analytics OS Type Labels
export function getTrafficAnalyticsOSTypeLabel(type: TrafficAnalyticsOSType): string {
  const labels: Record<TrafficAnalyticsOSType, string> = {
    [TRAFFIC_ANALYTICS_TYPE.OS_TYPES.WINDOWS]: 'Windows',
    [TRAFFIC_ANALYTICS_TYPE.OS_TYPES.MACOS]: 'macOS',
    [TRAFFIC_ANALYTICS_TYPE.OS_TYPES.LINUX]: 'Linux',
    [TRAFFIC_ANALYTICS_TYPE.OS_TYPES.IOS]: 'iOS',
    [TRAFFIC_ANALYTICS_TYPE.OS_TYPES.ANDROID]: 'Android',
    [TRAFFIC_ANALYTICS_TYPE.OS_TYPES.CHROME_OS]: 'Chrome OS',
    [TRAFFIC_ANALYTICS_TYPE.OS_TYPES.OTHER]: 'Other',
  };
  return labels[type] || 'Unknown';
}

// Traffic Analytics Visitor Type Labels
export function getTrafficAnalyticsVisitorTypeLabel(type: TrafficAnalyticsVisitorType): string {
  const labels: Record<TrafficAnalyticsVisitorType, string> = {
    [TRAFFIC_ANALYTICS_TYPE.VISITOR_TYPES.NEW]: 'New',
    [TRAFFIC_ANALYTICS_TYPE.VISITOR_TYPES.RETURNING]: 'Returning',
    [TRAFFIC_ANALYTICS_TYPE.VISITOR_TYPES.ENGAGED]: 'Engaged',
    [TRAFFIC_ANALYTICS_TYPE.VISITOR_TYPES.CASUAL]: 'Casual',
    [TRAFFIC_ANALYTICS_TYPE.VISITOR_TYPES.LOYAL]: 'Loyal',
    [TRAFFIC_ANALYTICS_TYPE.VISITOR_TYPES.AT_RISK]: 'At Risk',
    [TRAFFIC_ANALYTICS_TYPE.VISITOR_TYPES.CHURNED]: 'Churned',
  };
  return labels[type] || 'Unknown';
}

// Traffic Analytics Session Quality Labels
export function getTrafficAnalyticsSessionQualityLabel(
  quality: TrafficAnalyticsSessionQuality
): string {
  const labels: Record<TrafficAnalyticsSessionQuality, string> = {
    [TRAFFIC_ANALYTICS_TYPE.SESSION_QUALITY.EXCELLENT]: 'Excellent',
    [TRAFFIC_ANALYTICS_TYPE.SESSION_QUALITY.GOOD]: 'Good',
    [TRAFFIC_ANALYTICS_TYPE.SESSION_QUALITY.AVERAGE]: 'Average',
    [TRAFFIC_ANALYTICS_TYPE.SESSION_QUALITY.POOR]: 'Poor',
    [TRAFFIC_ANALYTICS_TYPE.SESSION_QUALITY.VERY_POOR]: 'Very Poor',
  };
  return labels[quality] || 'Unknown';
}

// Traffic Analytics Engagement Level Labels
export function getTrafficAnalyticsEngagementLevelLabel(
  level: TrafficAnalyticsEngagementLevel
): string {
  const labels: Record<TrafficAnalyticsEngagementLevel, string> = {
    [TRAFFIC_ANALYTICS_TYPE.ENGAGEMENT_LEVELS.VERY_HIGH]: 'Very High',
    [TRAFFIC_ANALYTICS_TYPE.ENGAGEMENT_LEVELS.HIGH]: 'High',
    [TRAFFIC_ANALYTICS_TYPE.ENGAGEMENT_LEVELS.MEDIUM]: 'Medium',
    [TRAFFIC_ANALYTICS_TYPE.ENGAGEMENT_LEVELS.LOW]: 'Low',
    [TRAFFIC_ANALYTICS_TYPE.ENGAGEMENT_LEVELS.VERY_LOW]: 'Very Low',
    [TRAFFIC_ANALYTICS_TYPE.ENGAGEMENT_LEVELS.NONE]: 'None',
  };
  return labels[level] || 'Unknown';
}

// Traffic Analytics Bounce Type Labels
export function getTrafficAnalyticsBounceTypeLabel(type: TrafficAnalyticsBounceType): string {
  const labels: Record<TrafficAnalyticsBounceType, string> = {
    [TRAFFIC_ANALYTICS_TYPE.BOUNCE_TYPES.SINGLE_PAGE]: 'Single Page',
    [TRAFFIC_ANALYTICS_TYPE.BOUNCE_TYPES.SHORT_DURATION]: 'Short Duration',
    [TRAFFIC_ANALYTICS_TYPE.BOUNCE_TYPES.NO_ACTION]: 'No Action',
    [TRAFFIC_ANALYTICS_TYPE.BOUNCE_TYPES.EXIT_EARLY]: 'Exit Early',
  };
  return labels[type] || 'Unknown';
}

// Traffic Analytics Conversion Type Labels
export function getTrafficAnalyticsConversionTypeLabel(
  type: TrafficAnalyticsConversionType
): string {
  const labels: Record<TrafficAnalyticsConversionType, string> = {
    [TRAFFIC_ANALYTICS_TYPE.CONVERSION_TYPES.MICRO]: 'Micro',
    [TRAFFIC_ANALYTICS_TYPE.CONVERSION_TYPES.MACRO]: 'Macro',
    [TRAFFIC_ANALYTICS_TYPE.CONVERSION_TYPES.PRIMARY]: 'Primary',
    [TRAFFIC_ANALYTICS_TYPE.CONVERSION_TYPES.SECONDARY]: 'Secondary',
  };
  return labels[type] || 'Unknown';
}

// Traffic Analytics Funnel Type Labels
export function getTrafficAnalyticsFunnelTypeLabel(type: TrafficAnalyticsFunnelType): string {
  const labels: Record<TrafficAnalyticsFunnelType, string> = {
    [TRAFFIC_ANALYTICS_TYPE.FUNNEL_TYPES.ACQUISITION]: 'Acquisition',
    [TRAFFIC_ANALYTICS_TYPE.FUNNEL_TYPES.ACTIVATION]: 'Activation',
    [TRAFFIC_ANALYTICS_TYPE.FUNNEL_TYPES.RETENTION]: 'Retention',
    [TRAFFIC_ANALYTICS_TYPE.FUNNEL_TYPES.REVENUE]: 'Revenue',
    [TRAFFIC_ANALYTICS_TYPE.FUNNEL_TYPES.REFERRAL]: 'Referral',
    [TRAFFIC_ANALYTICS_TYPE.FUNNEL_TYPES.PURCHASE]: 'Purchase',
    [TRAFFIC_ANALYTICS_TYPE.FUNNEL_TYPES.SIGNUP]: 'Signup',
  };
  return labels[type] || 'Unknown';
}

// Check if analysis is traffic source analysis
export function isTrafficAnalyticsSourceAnalysis(type: TrafficAnalyticsAnalysisType): boolean {
  const sourceTypes: TrafficAnalyticsAnalysisType[] = [
    TRAFFIC_ANALYTICS_TYPE.ANALYSIS_TYPES.SOURCE_ANALYSIS,
    TRAFFIC_ANALYTICS_TYPE.ANALYSIS_TYPES.CHANNEL_ANALYSIS,
    TRAFFIC_ANALYTICS_TYPE.ANALYSIS_TYPES.REFERRAL_ANALYSIS,
    TRAFFIC_ANALYTICS_TYPE.ANALYSIS_TYPES.CAMPAIGN_ANALYSIS,
  ];
  return sourceTypes.includes(type);
}

// Check if analysis is visitor analysis
export function isTrafficAnalyticsVisitorAnalysis(type: TrafficAnalyticsAnalysisType): boolean {
  const visitorTypes: TrafficAnalyticsAnalysisType[] = [
    TRAFFIC_ANALYTICS_TYPE.ANALYSIS_TYPES.VISITOR_ANALYSIS,
    TRAFFIC_ANALYTICS_TYPE.ANALYSIS_TYPES.VISITOR_BEHAVIOR,
    TRAFFIC_ANALYTICS_TYPE.ANALYSIS_TYPES.VISITOR_JOURNEY,
    TRAFFIC_ANALYTICS_TYPE.ANALYSIS_TYPES.VISITOR_SEGMENTATION,
  ];
  return visitorTypes.includes(type);
}

// Check if analysis is device analysis
export function isTrafficAnalyticsDeviceAnalysis(type: TrafficAnalyticsAnalysisType): boolean {
  const deviceTypes: TrafficAnalyticsAnalysisType[] = [
    TRAFFIC_ANALYTICS_TYPE.ANALYSIS_TYPES.DEVICE_ANALYSIS,
    TRAFFIC_ANALYTICS_TYPE.ANALYSIS_TYPES.BROWSER_ANALYSIS,
    TRAFFIC_ANALYTICS_TYPE.ANALYSIS_TYPES.OS_ANALYSIS,
    TRAFFIC_ANALYTICS_TYPE.ANALYSIS_TYPES.SCREEN_ANALYSIS,
  ];
  return deviceTypes.includes(type);
}

// Check if analysis is predictive
export function isTrafficAnalyticsPredictive(type: TrafficAnalyticsAnalysisType): boolean {
  const predictiveTypes: TrafficAnalyticsAnalysisType[] = [
    TRAFFIC_ANALYTICS_TYPE.ANALYSIS_TYPES.PREDICTIVE,
    TRAFFIC_ANALYTICS_TYPE.ANALYSIS_TYPES.FORECAST,
    TRAFFIC_ANALYTICS_TYPE.ANALYSIS_TYPES.TREND,
  ];
  return predictiveTypes.includes(type);
}

// Get engagement level from rate
export function getTrafficAnalyticsEngagementLevel(rate: number): TrafficAnalyticsEngagementLevel {
  if (rate > 0.8) return TRAFFIC_ANALYTICS_TYPE.ENGAGEMENT_LEVELS.VERY_HIGH;
  if (rate > 0.6) return TRAFFIC_ANALYTICS_TYPE.ENGAGEMENT_LEVELS.HIGH;
  if (rate > 0.4) return TRAFFIC_ANALYTICS_TYPE.ENGAGEMENT_LEVELS.MEDIUM;
  if (rate > 0.2) return TRAFFIC_ANALYTICS_TYPE.ENGAGEMENT_LEVELS.LOW;
  if (rate > 0.01) return TRAFFIC_ANALYTICS_TYPE.ENGAGEMENT_LEVELS.VERY_LOW;
  return TRAFFIC_ANALYTICS_TYPE.ENGAGEMENT_LEVELS.NONE;
}

// Get session quality from metrics
export function getTrafficAnalyticsSessionQuality(
  duration: number,
  depth: number,
  bounceRate: number
): TrafficAnalyticsSessionQuality {
  if (duration > 300 && depth > 5 && bounceRate < 20) {
    return TRAFFIC_ANALYTICS_TYPE.SESSION_QUALITY.EXCELLENT;
  }
  if (duration > 180 && depth > 3 && bounceRate < 40) {
    return TRAFFIC_ANALYTICS_TYPE.SESSION_QUALITY.GOOD;
  }
  if (duration > 60 && depth > 1 && bounceRate < 60) {
    return TRAFFIC_ANALYTICS_TYPE.SESSION_QUALITY.AVERAGE;
  }
  if (duration > 30 && depth > 0 && bounceRate < 80) {
    return TRAFFIC_ANALYTICS_TYPE.SESSION_QUALITY.POOR;
  }
  return TRAFFIC_ANALYTICS_TYPE.SESSION_QUALITY.VERY_POOR;
}
