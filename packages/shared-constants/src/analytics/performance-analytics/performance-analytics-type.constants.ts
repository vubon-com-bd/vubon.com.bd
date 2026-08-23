/**
 * Performance Analytics Type Constants
 * Types of performance analytics data and analysis
 */

export const PERFORMANCE_ANALYTICS_TYPE = {
  // Analysis Types
  ANALYSIS_TYPES: {
    // System Analysis
    SYSTEM_ANALYSIS: 'system_analysis',
    RESOURCE_ANALYSIS: 'resource_analysis',
    CAPACITY_ANALYSIS: 'capacity_analysis',

    // Application Analysis
    APPLICATION_ANALYSIS: 'application_analysis',
    PERFORMANCE_ANALYSIS: 'performance_analysis',
    BOTTLENECK_ANALYSIS: 'bottleneck_analysis',

    // API Analysis
    API_ANALYSIS: 'api_analysis',
    ENDPOINT_ANALYSIS: 'endpoint_analysis',
    LATENCY_ANALYSIS: 'latency_analysis',

    // Database Analysis
    DATABASE_ANALYSIS: 'database_analysis',
    QUERY_ANALYSIS: 'query_analysis',
    CACHE_ANALYSIS: 'cache_analysis',

    // Frontend Analysis
    FRONTEND_ANALYSIS: 'frontend_analysis',
    LOAD_TIME_ANALYSIS: 'load_time_analysis',
    RENDER_ANALYSIS: 'render_analysis',

    // User Experience Analysis
    UX_ANALYSIS: 'ux_analysis',
    SATISFACTION_ANALYSIS: 'satisfaction_analysis',
    ENGAGEMENT_ANALYSIS: 'engagement_analysis',

    // Business Analysis
    BUSINESS_ANALYSIS: 'business_analysis',
    EFFICIENCY_ANALYSIS: 'efficiency_analysis',
    GROWTH_ANALYSIS: 'growth_analysis',

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
    CAPACITY_PLANNING: 'capacity_planning',
  } as const,

  // Data Types
  DATA_TYPES: {
    SYSTEM_DATA: 'system_data',
    RESOURCE_DATA: 'resource_data',
    APPLICATION_DATA: 'application_data',
    API_DATA: 'api_data',
    DATABASE_DATA: 'database_data',
    FRONTEND_DATA: 'frontend_data',
    USER_DATA: 'user_data',
    BUSINESS_DATA: 'business_data',
    METRIC_DATA: 'metric_data',
    TIME_SERIES: 'time_series',
    AGGREGATED: 'aggregated',
    RAW: 'raw',
    REALTIME: 'realtime',
  } as const,

  // System Types
  SYSTEM_TYPES: {
    SERVER: 'server',
    CONTAINER: 'container',
    VIRTUAL_MACHINE: 'virtual_machine',
    CLOUD_INSTANCE: 'cloud_instance',
    EDGE_DEVICE: 'edge_device',
    IOT_DEVICE: 'iot_device',
  } as const,

  // Environment Types
  ENVIRONMENT_TYPES: {
    PRODUCTION: 'production',
    STAGING: 'staging',
    DEVELOPMENT: 'development',
    TESTING: 'testing',
    DEMO: 'demo',
    DR: 'dr',
  } as const,

  // Performance Levels
  PERFORMANCE_LEVELS: {
    EXCELLENT: 'excellent',
    GOOD: 'good',
    AVERAGE: 'average',
    POOR: 'poor',
    CRITICAL: 'critical',
  } as const,

  // Response Time Categories
  RESPONSE_CATEGORIES: {
    VERY_FAST: 'very_fast',
    FAST: 'fast',
    MODERATE: 'moderate',
    SLOW: 'slow',
    VERY_SLOW: 'very_slow',
  } as const,

  // Latency Categories
  LATENCY_CATEGORIES: {
    VERY_LOW: 'very_low',
    LOW: 'low',
    MODERATE: 'moderate',
    HIGH: 'high',
    VERY_HIGH: 'very_high',
  } as const,

  // Throughput Categories
  THROUGHPUT_CATEGORIES: {
    VERY_HIGH: 'very_high',
    HIGH: 'high',
    MODERATE: 'moderate',
    LOW: 'low',
    VERY_LOW: 'very_low',
  } as const,

  // Error Categories
  ERROR_CATEGORIES: {
    VERY_LOW: 'very_low',
    LOW: 'low',
    MODERATE: 'moderate',
    HIGH: 'high',
    VERY_HIGH: 'very_high',
  } as const,

  // User Experience Categories
  UX_CATEGORIES: {
    EXCELLENT: 'excellent',
    GOOD: 'good',
    AVERAGE: 'average',
    POOR: 'poor',
    VERY_POOR: 'very_poor',
  } as const,

  // Business Performance Categories
  BUSINESS_CATEGORIES: {
    EXCELLENT: 'excellent',
    GOOD: 'good',
    AVERAGE: 'average',
    BELOW_AVERAGE: 'below_average',
    POOR: 'poor',
  } as const,
} as const;

// Performance Analytics Analysis Types
export type PerformanceAnalyticsAnalysisType =
  (typeof PERFORMANCE_ANALYTICS_TYPE.ANALYSIS_TYPES)[keyof typeof PERFORMANCE_ANALYTICS_TYPE.ANALYSIS_TYPES];

// Performance Analytics Data Types
export type PerformanceAnalyticsDataType =
  (typeof PERFORMANCE_ANALYTICS_TYPE.DATA_TYPES)[keyof typeof PERFORMANCE_ANALYTICS_TYPE.DATA_TYPES];

// Performance Analytics System Types
export type PerformanceAnalyticsSystemType =
  (typeof PERFORMANCE_ANALYTICS_TYPE.SYSTEM_TYPES)[keyof typeof PERFORMANCE_ANALYTICS_TYPE.SYSTEM_TYPES];

// Performance Analytics Environment Types
export type PerformanceAnalyticsEnvironmentType =
  (typeof PERFORMANCE_ANALYTICS_TYPE.ENVIRONMENT_TYPES)[keyof typeof PERFORMANCE_ANALYTICS_TYPE.ENVIRONMENT_TYPES];

// Performance Analytics Performance Levels
export type PerformanceAnalyticsPerformanceLevel =
  (typeof PERFORMANCE_ANALYTICS_TYPE.PERFORMANCE_LEVELS)[keyof typeof PERFORMANCE_ANALYTICS_TYPE.PERFORMANCE_LEVELS];

// Performance Analytics Response Categories
export type PerformanceAnalyticsResponseCategory =
  (typeof PERFORMANCE_ANALYTICS_TYPE.RESPONSE_CATEGORIES)[keyof typeof PERFORMANCE_ANALYTICS_TYPE.RESPONSE_CATEGORIES];

// Performance Analytics Latency Categories
export type PerformanceAnalyticsLatencyCategory =
  (typeof PERFORMANCE_ANALYTICS_TYPE.LATENCY_CATEGORIES)[keyof typeof PERFORMANCE_ANALYTICS_TYPE.LATENCY_CATEGORIES];

// Performance Analytics Throughput Categories
export type PerformanceAnalyticsThroughputCategory =
  (typeof PERFORMANCE_ANALYTICS_TYPE.THROUGHPUT_CATEGORIES)[keyof typeof PERFORMANCE_ANALYTICS_TYPE.THROUGHPUT_CATEGORIES];

// Performance Analytics Error Categories
export type PerformanceAnalyticsErrorCategory =
  (typeof PERFORMANCE_ANALYTICS_TYPE.ERROR_CATEGORIES)[keyof typeof PERFORMANCE_ANALYTICS_TYPE.ERROR_CATEGORIES];

// Performance Analytics UX Categories
export type PerformanceAnalyticsUXCategory =
  (typeof PERFORMANCE_ANALYTICS_TYPE.UX_CATEGORIES)[keyof typeof PERFORMANCE_ANALYTICS_TYPE.UX_CATEGORIES];

// Performance Analytics Business Categories
export type PerformanceAnalyticsBusinessCategory =
  (typeof PERFORMANCE_ANALYTICS_TYPE.BUSINESS_CATEGORIES)[keyof typeof PERFORMANCE_ANALYTICS_TYPE.BUSINESS_CATEGORIES];

// Performance Analytics Analysis Type Labels
export function getPerformanceAnalyticsAnalysisTypeLabel(
  type: PerformanceAnalyticsAnalysisType
): string {
  const labels: Record<PerformanceAnalyticsAnalysisType, string> = {
    [PERFORMANCE_ANALYTICS_TYPE.ANALYSIS_TYPES.SYSTEM_ANALYSIS]: 'System Analysis',
    [PERFORMANCE_ANALYTICS_TYPE.ANALYSIS_TYPES.RESOURCE_ANALYSIS]: 'Resource Analysis',
    [PERFORMANCE_ANALYTICS_TYPE.ANALYSIS_TYPES.CAPACITY_ANALYSIS]: 'Capacity Analysis',
    [PERFORMANCE_ANALYTICS_TYPE.ANALYSIS_TYPES.APPLICATION_ANALYSIS]: 'Application Analysis',
    [PERFORMANCE_ANALYTICS_TYPE.ANALYSIS_TYPES.PERFORMANCE_ANALYSIS]: 'Performance Analysis',
    [PERFORMANCE_ANALYTICS_TYPE.ANALYSIS_TYPES.BOTTLENECK_ANALYSIS]: 'Bottleneck Analysis',
    [PERFORMANCE_ANALYTICS_TYPE.ANALYSIS_TYPES.API_ANALYSIS]: 'API Analysis',
    [PERFORMANCE_ANALYTICS_TYPE.ANALYSIS_TYPES.ENDPOINT_ANALYSIS]: 'Endpoint Analysis',
    [PERFORMANCE_ANALYTICS_TYPE.ANALYSIS_TYPES.LATENCY_ANALYSIS]: 'Latency Analysis',
    [PERFORMANCE_ANALYTICS_TYPE.ANALYSIS_TYPES.DATABASE_ANALYSIS]: 'Database Analysis',
    [PERFORMANCE_ANALYTICS_TYPE.ANALYSIS_TYPES.QUERY_ANALYSIS]: 'Query Analysis',
    [PERFORMANCE_ANALYTICS_TYPE.ANALYSIS_TYPES.CACHE_ANALYSIS]: 'Cache Analysis',
    [PERFORMANCE_ANALYTICS_TYPE.ANALYSIS_TYPES.FRONTEND_ANALYSIS]: 'Frontend Analysis',
    [PERFORMANCE_ANALYTICS_TYPE.ANALYSIS_TYPES.LOAD_TIME_ANALYSIS]: 'Load Time Analysis',
    [PERFORMANCE_ANALYTICS_TYPE.ANALYSIS_TYPES.RENDER_ANALYSIS]: 'Render Analysis',
    [PERFORMANCE_ANALYTICS_TYPE.ANALYSIS_TYPES.UX_ANALYSIS]: 'UX Analysis',
    [PERFORMANCE_ANALYTICS_TYPE.ANALYSIS_TYPES.SATISFACTION_ANALYSIS]: 'Satisfaction Analysis',
    [PERFORMANCE_ANALYTICS_TYPE.ANALYSIS_TYPES.ENGAGEMENT_ANALYSIS]: 'Engagement Analysis',
    [PERFORMANCE_ANALYTICS_TYPE.ANALYSIS_TYPES.BUSINESS_ANALYSIS]: 'Business Analysis',
    [PERFORMANCE_ANALYTICS_TYPE.ANALYSIS_TYPES.EFFICIENCY_ANALYSIS]: 'Efficiency Analysis',
    [PERFORMANCE_ANALYTICS_TYPE.ANALYSIS_TYPES.GROWTH_ANALYSIS]: 'Growth Analysis',
    [PERFORMANCE_ANALYTICS_TYPE.ANALYSIS_TYPES.COMPARATIVE]: 'Comparative Analysis',
    [PERFORMANCE_ANALYTICS_TYPE.ANALYSIS_TYPES.YEAR_OVER_YEAR]: 'Year Over Year',
    [PERFORMANCE_ANALYTICS_TYPE.ANALYSIS_TYPES.QUARTER_OVER_QUARTER]: 'Quarter Over Quarter',
    [PERFORMANCE_ANALYTICS_TYPE.ANALYSIS_TYPES.MONTH_OVER_MONTH]: 'Month Over Month',
    [PERFORMANCE_ANALYTICS_TYPE.ANALYSIS_TYPES.WEEK_OVER_WEEK]: 'Week Over Week',
    [PERFORMANCE_ANALYTICS_TYPE.ANALYSIS_TYPES.PREDICTIVE]: 'Predictive Analysis',
    [PERFORMANCE_ANALYTICS_TYPE.ANALYSIS_TYPES.FORECAST]: 'Forecast',
    [PERFORMANCE_ANALYTICS_TYPE.ANALYSIS_TYPES.TREND]: 'Trend Analysis',
    [PERFORMANCE_ANALYTICS_TYPE.ANALYSIS_TYPES.CAPACITY_PLANNING]: 'Capacity Planning',
  };
  return labels[type] || 'Unknown';
}

// Performance Analytics Data Type Labels
export function getPerformanceAnalyticsDataTypeLabel(type: PerformanceAnalyticsDataType): string {
  const labels: Record<PerformanceAnalyticsDataType, string> = {
    [PERFORMANCE_ANALYTICS_TYPE.DATA_TYPES.SYSTEM_DATA]: 'System Data',
    [PERFORMANCE_ANALYTICS_TYPE.DATA_TYPES.RESOURCE_DATA]: 'Resource Data',
    [PERFORMANCE_ANALYTICS_TYPE.DATA_TYPES.APPLICATION_DATA]: 'Application Data',
    [PERFORMANCE_ANALYTICS_TYPE.DATA_TYPES.API_DATA]: 'API Data',
    [PERFORMANCE_ANALYTICS_TYPE.DATA_TYPES.DATABASE_DATA]: 'Database Data',
    [PERFORMANCE_ANALYTICS_TYPE.DATA_TYPES.FRONTEND_DATA]: 'Frontend Data',
    [PERFORMANCE_ANALYTICS_TYPE.DATA_TYPES.USER_DATA]: 'User Data',
    [PERFORMANCE_ANALYTICS_TYPE.DATA_TYPES.BUSINESS_DATA]: 'Business Data',
    [PERFORMANCE_ANALYTICS_TYPE.DATA_TYPES.METRIC_DATA]: 'Metric Data',
    [PERFORMANCE_ANALYTICS_TYPE.DATA_TYPES.TIME_SERIES]: 'Time Series',
    [PERFORMANCE_ANALYTICS_TYPE.DATA_TYPES.AGGREGATED]: 'Aggregated',
    [PERFORMANCE_ANALYTICS_TYPE.DATA_TYPES.RAW]: 'Raw',
    [PERFORMANCE_ANALYTICS_TYPE.DATA_TYPES.REALTIME]: 'Real-time',
  };
  return labels[type] || 'Unknown';
}

// Performance Analytics System Type Labels
export function getPerformanceAnalyticsSystemTypeLabel(
  type: PerformanceAnalyticsSystemType
): string {
  const labels: Record<PerformanceAnalyticsSystemType, string> = {
    [PERFORMANCE_ANALYTICS_TYPE.SYSTEM_TYPES.SERVER]: 'Server',
    [PERFORMANCE_ANALYTICS_TYPE.SYSTEM_TYPES.CONTAINER]: 'Container',
    [PERFORMANCE_ANALYTICS_TYPE.SYSTEM_TYPES.VIRTUAL_MACHINE]: 'Virtual Machine',
    [PERFORMANCE_ANALYTICS_TYPE.SYSTEM_TYPES.CLOUD_INSTANCE]: 'Cloud Instance',
    [PERFORMANCE_ANALYTICS_TYPE.SYSTEM_TYPES.EDGE_DEVICE]: 'Edge Device',
    [PERFORMANCE_ANALYTICS_TYPE.SYSTEM_TYPES.IOT_DEVICE]: 'IoT Device',
  };
  return labels[type] || 'Unknown';
}

// Performance Analytics Environment Type Labels
export function getPerformanceAnalyticsEnvironmentTypeLabel(
  type: PerformanceAnalyticsEnvironmentType
): string {
  const labels: Record<PerformanceAnalyticsEnvironmentType, string> = {
    [PERFORMANCE_ANALYTICS_TYPE.ENVIRONMENT_TYPES.PRODUCTION]: 'Production',
    [PERFORMANCE_ANALYTICS_TYPE.ENVIRONMENT_TYPES.STAGING]: 'Staging',
    [PERFORMANCE_ANALYTICS_TYPE.ENVIRONMENT_TYPES.DEVELOPMENT]: 'Development',
    [PERFORMANCE_ANALYTICS_TYPE.ENVIRONMENT_TYPES.TESTING]: 'Testing',
    [PERFORMANCE_ANALYTICS_TYPE.ENVIRONMENT_TYPES.DEMO]: 'Demo',
    [PERFORMANCE_ANALYTICS_TYPE.ENVIRONMENT_TYPES.DR]: 'DR',
  };
  return labels[type] || 'Unknown';
}

// Performance Analytics Performance Level Labels
export function getPerformanceAnalyticsPerformanceLevelLabel(
  level: PerformanceAnalyticsPerformanceLevel
): string {
  const labels: Record<PerformanceAnalyticsPerformanceLevel, string> = {
    [PERFORMANCE_ANALYTICS_TYPE.PERFORMANCE_LEVELS.EXCELLENT]: 'Excellent',
    [PERFORMANCE_ANALYTICS_TYPE.PERFORMANCE_LEVELS.GOOD]: 'Good',
    [PERFORMANCE_ANALYTICS_TYPE.PERFORMANCE_LEVELS.AVERAGE]: 'Average',
    [PERFORMANCE_ANALYTICS_TYPE.PERFORMANCE_LEVELS.POOR]: 'Poor',
    [PERFORMANCE_ANALYTICS_TYPE.PERFORMANCE_LEVELS.CRITICAL]: 'Critical',
  };
  return labels[level] || 'Unknown';
}

// Performance Analytics Response Category Labels
export function getPerformanceAnalyticsResponseCategoryLabel(
  category: PerformanceAnalyticsResponseCategory
): string {
  const labels: Record<PerformanceAnalyticsResponseCategory, string> = {
    [PERFORMANCE_ANALYTICS_TYPE.RESPONSE_CATEGORIES.VERY_FAST]: 'Very Fast (<100ms)',
    [PERFORMANCE_ANALYTICS_TYPE.RESPONSE_CATEGORIES.FAST]: 'Fast (100-300ms)',
    [PERFORMANCE_ANALYTICS_TYPE.RESPONSE_CATEGORIES.MODERATE]: 'Moderate (300-1000ms)',
    [PERFORMANCE_ANALYTICS_TYPE.RESPONSE_CATEGORIES.SLOW]: 'Slow (1-5s)',
    [PERFORMANCE_ANALYTICS_TYPE.RESPONSE_CATEGORIES.VERY_SLOW]: 'Very Slow (>5s)',
  };
  return labels[category] || 'Unknown';
}

// Performance Analytics Latency Category Labels
export function getPerformanceAnalyticsLatencyCategoryLabel(
  category: PerformanceAnalyticsLatencyCategory
): string {
  const labels: Record<PerformanceAnalyticsLatencyCategory, string> = {
    [PERFORMANCE_ANALYTICS_TYPE.LATENCY_CATEGORIES.VERY_LOW]: 'Very Low (<50ms)',
    [PERFORMANCE_ANALYTICS_TYPE.LATENCY_CATEGORIES.LOW]: 'Low (50-200ms)',
    [PERFORMANCE_ANALYTICS_TYPE.LATENCY_CATEGORIES.MODERATE]: 'Moderate (200-500ms)',
    [PERFORMANCE_ANALYTICS_TYPE.LATENCY_CATEGORIES.HIGH]: 'High (500-1000ms)',
    [PERFORMANCE_ANALYTICS_TYPE.LATENCY_CATEGORIES.VERY_HIGH]: 'Very High (>1s)',
  };
  return labels[category] || 'Unknown';
}

// Performance Analytics Throughput Category Labels
export function getPerformanceAnalyticsThroughputCategoryLabel(
  category: PerformanceAnalyticsThroughputCategory
): string {
  const labels: Record<PerformanceAnalyticsThroughputCategory, string> = {
    [PERFORMANCE_ANALYTICS_TYPE.THROUGHPUT_CATEGORIES.VERY_HIGH]: 'Very High',
    [PERFORMANCE_ANALYTICS_TYPE.THROUGHPUT_CATEGORIES.HIGH]: 'High',
    [PERFORMANCE_ANALYTICS_TYPE.THROUGHPUT_CATEGORIES.MODERATE]: 'Moderate',
    [PERFORMANCE_ANALYTICS_TYPE.THROUGHPUT_CATEGORIES.LOW]: 'Low',
    [PERFORMANCE_ANALYTICS_TYPE.THROUGHPUT_CATEGORIES.VERY_LOW]: 'Very Low',
  };
  return labels[category] || 'Unknown';
}

// Performance Analytics Error Category Labels
export function getPerformanceAnalyticsErrorCategoryLabel(
  category: PerformanceAnalyticsErrorCategory
): string {
  const labels: Record<PerformanceAnalyticsErrorCategory, string> = {
    [PERFORMANCE_ANALYTICS_TYPE.ERROR_CATEGORIES.VERY_LOW]: 'Very Low (<1%)',
    [PERFORMANCE_ANALYTICS_TYPE.ERROR_CATEGORIES.LOW]: 'Low (1-5%)',
    [PERFORMANCE_ANALYTICS_TYPE.ERROR_CATEGORIES.MODERATE]: 'Moderate (5-10%)',
    [PERFORMANCE_ANALYTICS_TYPE.ERROR_CATEGORIES.HIGH]: 'High (10-20%)',
    [PERFORMANCE_ANALYTICS_TYPE.ERROR_CATEGORIES.VERY_HIGH]: 'Very High (>20%)',
  };
  return labels[category] || 'Unknown';
}

// Performance Analytics UX Category Labels
export function getPerformanceAnalyticsUXCategoryLabel(
  category: PerformanceAnalyticsUXCategory
): string {
  const labels: Record<PerformanceAnalyticsUXCategory, string> = {
    [PERFORMANCE_ANALYTICS_TYPE.UX_CATEGORIES.EXCELLENT]: 'Excellent',
    [PERFORMANCE_ANALYTICS_TYPE.UX_CATEGORIES.GOOD]: 'Good',
    [PERFORMANCE_ANALYTICS_TYPE.UX_CATEGORIES.AVERAGE]: 'Average',
    [PERFORMANCE_ANALYTICS_TYPE.UX_CATEGORIES.POOR]: 'Poor',
    [PERFORMANCE_ANALYTICS_TYPE.UX_CATEGORIES.VERY_POOR]: 'Very Poor',
  };
  return labels[category] || 'Unknown';
}

// Performance Analytics Business Category Labels
export function getPerformanceAnalyticsBusinessCategoryLabel(
  category: PerformanceAnalyticsBusinessCategory
): string {
  const labels: Record<PerformanceAnalyticsBusinessCategory, string> = {
    [PERFORMANCE_ANALYTICS_TYPE.BUSINESS_CATEGORIES.EXCELLENT]: 'Excellent',
    [PERFORMANCE_ANALYTICS_TYPE.BUSINESS_CATEGORIES.GOOD]: 'Good',
    [PERFORMANCE_ANALYTICS_TYPE.BUSINESS_CATEGORIES.AVERAGE]: 'Average',
    [PERFORMANCE_ANALYTICS_TYPE.BUSINESS_CATEGORIES.BELOW_AVERAGE]: 'Below Average',
    [PERFORMANCE_ANALYTICS_TYPE.BUSINESS_CATEGORIES.POOR]: 'Poor',
  };
  return labels[category] || 'Unknown';
}

// Check if analysis is system analysis
export function isPerformanceAnalyticsSystemAnalysis(
  type: PerformanceAnalyticsAnalysisType
): boolean {
  const systemTypes: PerformanceAnalyticsAnalysisType[] = [
    PERFORMANCE_ANALYTICS_TYPE.ANALYSIS_TYPES.SYSTEM_ANALYSIS,
    PERFORMANCE_ANALYTICS_TYPE.ANALYSIS_TYPES.RESOURCE_ANALYSIS,
    PERFORMANCE_ANALYTICS_TYPE.ANALYSIS_TYPES.CAPACITY_ANALYSIS,
  ];
  return systemTypes.includes(type);
}

// Check if analysis is application analysis
export function isPerformanceAnalyticsApplicationAnalysis(
  type: PerformanceAnalyticsAnalysisType
): boolean {
  const applicationTypes: PerformanceAnalyticsAnalysisType[] = [
    PERFORMANCE_ANALYTICS_TYPE.ANALYSIS_TYPES.APPLICATION_ANALYSIS,
    PERFORMANCE_ANALYTICS_TYPE.ANALYSIS_TYPES.PERFORMANCE_ANALYSIS,
    PERFORMANCE_ANALYTICS_TYPE.ANALYSIS_TYPES.BOTTLENECK_ANALYSIS,
  ];
  return applicationTypes.includes(type);
}

// Check if analysis is comparative
export function isPerformanceAnalyticsComparative(type: PerformanceAnalyticsAnalysisType): boolean {
  const comparativeTypes: PerformanceAnalyticsAnalysisType[] = [
    PERFORMANCE_ANALYTICS_TYPE.ANALYSIS_TYPES.COMPARATIVE,
    PERFORMANCE_ANALYTICS_TYPE.ANALYSIS_TYPES.YEAR_OVER_YEAR,
    PERFORMANCE_ANALYTICS_TYPE.ANALYSIS_TYPES.QUARTER_OVER_QUARTER,
    PERFORMANCE_ANALYTICS_TYPE.ANALYSIS_TYPES.MONTH_OVER_MONTH,
    PERFORMANCE_ANALYTICS_TYPE.ANALYSIS_TYPES.WEEK_OVER_WEEK,
  ];
  return comparativeTypes.includes(type);
}

// Check if analysis is predictive
export function isPerformanceAnalyticsPredictive(type: PerformanceAnalyticsAnalysisType): boolean {
  const predictiveTypes: PerformanceAnalyticsAnalysisType[] = [
    PERFORMANCE_ANALYTICS_TYPE.ANALYSIS_TYPES.PREDICTIVE,
    PERFORMANCE_ANALYTICS_TYPE.ANALYSIS_TYPES.FORECAST,
    PERFORMANCE_ANALYTICS_TYPE.ANALYSIS_TYPES.TREND,
    PERFORMANCE_ANALYTICS_TYPE.ANALYSIS_TYPES.CAPACITY_PLANNING,
  ];
  return predictiveTypes.includes(type);
}

// Get performance level from score
export function getPerformanceAnalyticsPerformanceLevel(
  score: number
): PerformanceAnalyticsPerformanceLevel {
  if (score >= 90) return PERFORMANCE_ANALYTICS_TYPE.PERFORMANCE_LEVELS.EXCELLENT;
  if (score >= 70) return PERFORMANCE_ANALYTICS_TYPE.PERFORMANCE_LEVELS.GOOD;
  if (score >= 50) return PERFORMANCE_ANALYTICS_TYPE.PERFORMANCE_LEVELS.AVERAGE;
  if (score >= 30) return PERFORMANCE_ANALYTICS_TYPE.PERFORMANCE_LEVELS.POOR;
  return PERFORMANCE_ANALYTICS_TYPE.PERFORMANCE_LEVELS.CRITICAL;
}

// Get response category from time
export function getPerformanceAnalyticsResponseCategory(
  time: number
): PerformanceAnalyticsResponseCategory {
  if (time < 100) return PERFORMANCE_ANALYTICS_TYPE.RESPONSE_CATEGORIES.VERY_FAST;
  if (time < 300) return PERFORMANCE_ANALYTICS_TYPE.RESPONSE_CATEGORIES.FAST;
  if (time < 1000) return PERFORMANCE_ANALYTICS_TYPE.RESPONSE_CATEGORIES.MODERATE;
  if (time < 5000) return PERFORMANCE_ANALYTICS_TYPE.RESPONSE_CATEGORIES.SLOW;
  return PERFORMANCE_ANALYTICS_TYPE.RESPONSE_CATEGORIES.VERY_SLOW;
}

// Get latency category from time
export function getPerformanceAnalyticsLatencyCategory(
  time: number
): PerformanceAnalyticsLatencyCategory {
  if (time < 50) return PERFORMANCE_ANALYTICS_TYPE.LATENCY_CATEGORIES.VERY_LOW;
  if (time < 200) return PERFORMANCE_ANALYTICS_TYPE.LATENCY_CATEGORIES.LOW;
  if (time < 500) return PERFORMANCE_ANALYTICS_TYPE.LATENCY_CATEGORIES.MODERATE;
  if (time < 1000) return PERFORMANCE_ANALYTICS_TYPE.LATENCY_CATEGORIES.HIGH;
  return PERFORMANCE_ANALYTICS_TYPE.LATENCY_CATEGORIES.VERY_HIGH;
}

// Get error category from rate
export function getPerformanceAnalyticsErrorCategory(
  rate: number
): PerformanceAnalyticsErrorCategory {
  if (rate < 1) return PERFORMANCE_ANALYTICS_TYPE.ERROR_CATEGORIES.VERY_LOW;
  if (rate < 5) return PERFORMANCE_ANALYTICS_TYPE.ERROR_CATEGORIES.LOW;
  if (rate < 10) return PERFORMANCE_ANALYTICS_TYPE.ERROR_CATEGORIES.MODERATE;
  if (rate < 20) return PERFORMANCE_ANALYTICS_TYPE.ERROR_CATEGORIES.HIGH;
  return PERFORMANCE_ANALYTICS_TYPE.ERROR_CATEGORIES.VERY_HIGH;
}
