/**
 * Analytics Type Constants
 * Types of analytics data and reports
 */

export const ANALYTICS_TYPE = {
  // Data Types
  TYPES: {
    // Real-time Analytics
    REALTIME: 'realtime',
    LIVE: 'live',
    STREAMING: 'streaming',

    // Historical Analytics
    HISTORICAL: 'historical',
    TRENDING: 'trending',
    SEASONAL: 'seasonal',
    COMPARATIVE: 'comparative',

    // Predictive Analytics
    PREDICTIVE: 'predictive',
    FORECAST: 'forecast',
    PROJECTION: 'projection',

    // Diagnostic Analytics
    DIAGNOSTIC: 'diagnostic',
    ROOT_CAUSE: 'root_cause',
    IMPACT: 'impact',

    // Prescriptive Analytics
    PRESCRIPTIVE: 'prescriptive',
    OPTIMIZATION: 'optimization',
    RECOMMENDATION: 'recommendation',

    // Custom Analytics
    CUSTOM: 'custom',
    ADHOC: 'adhoc',
    ONE_TIME: 'one_time',
  } as const,

  // Report Types
  REPORT_TYPES: {
    SUMMARY: 'summary',
    DETAILED: 'detailed',
    EXECUTIVE: 'executive',
    OPERATIONAL: 'operational',
    STRATEGIC: 'strategic',
    TACTICAL: 'tactical',
    REGULATORY: 'regulatory',
    COMPLIANCE: 'compliance',
  } as const,

  // Data Sources
  DATA_SOURCES: {
    WEBSITE: 'website',
    MOBILE_APP: 'mobile_app',
    API: 'api',
    DATABASE: 'database',
    THIRD_PARTY: 'third_party',
    SOCIAL_MEDIA: 'social_media',
    EMAIL: 'email',
    CRM: 'crm',
    ERP: 'erp',
    POS: 'pos',
    WAREHOUSE: 'warehouse',
    INVENTORY: 'inventory',
  } as const,

  // Data Granularity
  GRANULARITY: {
    RAW: 'raw',
    AGGREGATED: 'aggregated',
    SUMMARIZED: 'summarized',
    ROLLED_UP: 'rolled_up',
    DRILL_DOWN: 'drill_down',
  } as const,

  // Data Quality Levels
  QUALITY: {
    EXCELLENT: 'excellent',
    GOOD: 'good',
    FAIR: 'fair',
    POOR: 'poor',
    UNKNOWN: 'unknown',
  } as const,

  // Analysis Types
  ANALYSIS_TYPES: {
    DESCRIPTIVE: 'descriptive',
    DIAGNOSTIC: 'diagnostic',
    PREDICTIVE: 'predictive',
    PRESCRIPTIVE: 'prescriptive',
    COGNITIVE: 'cognitive',
  } as const,

  // Data Refresh Rates
  REFRESH_RATES: {
    REAL_TIME: 'real_time',
    NEAR_REAL_TIME: 'near_real_time',
    HOURLY: 'hourly',
    DAILY: 'daily',
    WEEKLY: 'weekly',
    MONTHLY: 'monthly',
    QUARTERLY: 'quarterly',
    ANNUALLY: 'annually',
  } as const,

  // Data Retention Periods
  RETENTION: {
    TEMPORARY: 'temporary',
    SHORT_TERM: 'short_term',
    MEDIUM_TERM: 'medium_term',
    LONG_TERM: 'long_term',
    PERMANENT: 'permanent',
  } as const,

  // Data Sensitivity
  SENSITIVITY: {
    PUBLIC: 'public',
    INTERNAL: 'internal',
    CONFIDENTIAL: 'confidential',
    RESTRICTED: 'restricted',
    HIGHLY_RESTRICTED: 'highly_restricted',
  } as const,

  // Data Usage
  USAGE: {
    BUSINESS_INTELLIGENCE: 'business_intelligence',
    DECISION_MAKING: 'decision_making',
    STRATEGIC_PLANNING: 'strategic_planning',
    PERFORMANCE_MONITORING: 'performance_monitoring',
    COMPLIANCE_REPORTING: 'compliance_reporting',
    CUSTOMER_INSIGHT: 'customer_insight',
    MARKET_INSIGHT: 'market_insight',
    OPERATIONAL_INSIGHT: 'operational_insight',
  } as const,
} as const;

// Analytics Data Types
export type AnalyticsDataType = (typeof ANALYTICS_TYPE.TYPES)[keyof typeof ANALYTICS_TYPE.TYPES];

// Analytics Report Types
export type AnalyticsReportType =
  (typeof ANALYTICS_TYPE.REPORT_TYPES)[keyof typeof ANALYTICS_TYPE.REPORT_TYPES];

// Analytics Data Sources
export type AnalyticsDataSource =
  (typeof ANALYTICS_TYPE.DATA_SOURCES)[keyof typeof ANALYTICS_TYPE.DATA_SOURCES];

// Analytics Granularity
export type AnalyticsGranularity =
  (typeof ANALYTICS_TYPE.GRANULARITY)[keyof typeof ANALYTICS_TYPE.GRANULARITY];

// Analytics Quality
export type AnalyticsQuality = (typeof ANALYTICS_TYPE.QUALITY)[keyof typeof ANALYTICS_TYPE.QUALITY];

// Analytics Analysis Types
export type AnalyticsAnalysisType =
  (typeof ANALYTICS_TYPE.ANALYSIS_TYPES)[keyof typeof ANALYTICS_TYPE.ANALYSIS_TYPES];

// Analytics Refresh Rates
export type AnalyticsRefreshRate =
  (typeof ANALYTICS_TYPE.REFRESH_RATES)[keyof typeof ANALYTICS_TYPE.REFRESH_RATES];

// Analytics Retention
export type AnalyticsRetention =
  (typeof ANALYTICS_TYPE.RETENTION)[keyof typeof ANALYTICS_TYPE.RETENTION];

// Analytics Sensitivity
export type AnalyticsSensitivity =
  (typeof ANALYTICS_TYPE.SENSITIVITY)[keyof typeof ANALYTICS_TYPE.SENSITIVITY];

// Analytics Usage
export type AnalyticsUsage = (typeof ANALYTICS_TYPE.USAGE)[keyof typeof ANALYTICS_TYPE.USAGE];

// Analytics Data Type Labels
export function getAnalyticsDataTypeLabel(type: AnalyticsDataType): string {
  const labels: Record<AnalyticsDataType, string> = {
    [ANALYTICS_TYPE.TYPES.REALTIME]: 'Real-time',
    [ANALYTICS_TYPE.TYPES.LIVE]: 'Live',
    [ANALYTICS_TYPE.TYPES.STREAMING]: 'Streaming',
    [ANALYTICS_TYPE.TYPES.HISTORICAL]: 'Historical',
    [ANALYTICS_TYPE.TYPES.TRENDING]: 'Trending',
    [ANALYTICS_TYPE.TYPES.SEASONAL]: 'Seasonal',
    [ANALYTICS_TYPE.TYPES.COMPARATIVE]: 'Comparative',
    [ANALYTICS_TYPE.TYPES.PREDICTIVE]: 'Predictive',
    [ANALYTICS_TYPE.TYPES.FORECAST]: 'Forecast',
    [ANALYTICS_TYPE.TYPES.PROJECTION]: 'Projection',
    [ANALYTICS_TYPE.TYPES.DIAGNOSTIC]: 'Diagnostic',
    [ANALYTICS_TYPE.TYPES.ROOT_CAUSE]: 'Root Cause',
    [ANALYTICS_TYPE.TYPES.IMPACT]: 'Impact',
    [ANALYTICS_TYPE.TYPES.PRESCRIPTIVE]: 'Prescriptive',
    [ANALYTICS_TYPE.TYPES.OPTIMIZATION]: 'Optimization',
    [ANALYTICS_TYPE.TYPES.RECOMMENDATION]: 'Recommendation',
    [ANALYTICS_TYPE.TYPES.CUSTOM]: 'Custom',
    [ANALYTICS_TYPE.TYPES.ADHOC]: 'Ad-hoc',
    [ANALYTICS_TYPE.TYPES.ONE_TIME]: 'One-time',
  };
  return labels[type] || 'Unknown';
}

// Analytics Report Type Labels
export function getAnalyticsReportTypeLabel(type: AnalyticsReportType): string {
  const labels: Record<AnalyticsReportType, string> = {
    [ANALYTICS_TYPE.REPORT_TYPES.SUMMARY]: 'Summary',
    [ANALYTICS_TYPE.REPORT_TYPES.DETAILED]: 'Detailed',
    [ANALYTICS_TYPE.REPORT_TYPES.EXECUTIVE]: 'Executive',
    [ANALYTICS_TYPE.REPORT_TYPES.OPERATIONAL]: 'Operational',
    [ANALYTICS_TYPE.REPORT_TYPES.STRATEGIC]: 'Strategic',
    [ANALYTICS_TYPE.REPORT_TYPES.TACTICAL]: 'Tactical',
    [ANALYTICS_TYPE.REPORT_TYPES.REGULATORY]: 'Regulatory',
    [ANALYTICS_TYPE.REPORT_TYPES.COMPLIANCE]: 'Compliance',
  };
  return labels[type] || 'Unknown';
}

// Analytics Data Source Labels
export function getAnalyticsDataSourceLabel(source: AnalyticsDataSource): string {
  const labels: Record<AnalyticsDataSource, string> = {
    [ANALYTICS_TYPE.DATA_SOURCES.WEBSITE]: 'Website',
    [ANALYTICS_TYPE.DATA_SOURCES.MOBILE_APP]: 'Mobile App',
    [ANALYTICS_TYPE.DATA_SOURCES.API]: 'API',
    [ANALYTICS_TYPE.DATA_SOURCES.DATABASE]: 'Database',
    [ANALYTICS_TYPE.DATA_SOURCES.THIRD_PARTY]: 'Third Party',
    [ANALYTICS_TYPE.DATA_SOURCES.SOCIAL_MEDIA]: 'Social Media',
    [ANALYTICS_TYPE.DATA_SOURCES.EMAIL]: 'Email',
    [ANALYTICS_TYPE.DATA_SOURCES.CRM]: 'CRM',
    [ANALYTICS_TYPE.DATA_SOURCES.ERP]: 'ERP',
    [ANALYTICS_TYPE.DATA_SOURCES.POS]: 'POS',
    [ANALYTICS_TYPE.DATA_SOURCES.WAREHOUSE]: 'Warehouse',
    [ANALYTICS_TYPE.DATA_SOURCES.INVENTORY]: 'Inventory',
  };
  return labels[source] || 'Unknown';
}

// Analytics Quality Labels
export function getAnalyticsQualityLabel(quality: AnalyticsQuality): string {
  const labels: Record<AnalyticsQuality, string> = {
    [ANALYTICS_TYPE.QUALITY.EXCELLENT]: 'Excellent',
    [ANALYTICS_TYPE.QUALITY.GOOD]: 'Good',
    [ANALYTICS_TYPE.QUALITY.FAIR]: 'Fair',
    [ANALYTICS_TYPE.QUALITY.POOR]: 'Poor',
    [ANALYTICS_TYPE.QUALITY.UNKNOWN]: 'Unknown',
  };
  return labels[quality] || 'Unknown';
}

// Analytics Analysis Type Labels
export function getAnalyticsAnalysisTypeLabel(type: AnalyticsAnalysisType): string {
  const labels: Record<AnalyticsAnalysisType, string> = {
    [ANALYTICS_TYPE.ANALYSIS_TYPES.DESCRIPTIVE]: 'Descriptive',
    [ANALYTICS_TYPE.ANALYSIS_TYPES.DIAGNOSTIC]: 'Diagnostic',
    [ANALYTICS_TYPE.ANALYSIS_TYPES.PREDICTIVE]: 'Predictive',
    [ANALYTICS_TYPE.ANALYSIS_TYPES.PRESCRIPTIVE]: 'Prescriptive',
    [ANALYTICS_TYPE.ANALYSIS_TYPES.COGNITIVE]: 'Cognitive',
  };
  return labels[type] || 'Unknown';
}

// Analytics Sensitivity Labels
export function getAnalyticsSensitivityLabel(sensitivity: AnalyticsSensitivity): string {
  const labels: Record<AnalyticsSensitivity, string> = {
    [ANALYTICS_TYPE.SENSITIVITY.PUBLIC]: 'Public',
    [ANALYTICS_TYPE.SENSITIVITY.INTERNAL]: 'Internal',
    [ANALYTICS_TYPE.SENSITIVITY.CONFIDENTIAL]: 'Confidential',
    [ANALYTICS_TYPE.SENSITIVITY.RESTRICTED]: 'Restricted',
    [ANALYTICS_TYPE.SENSITIVITY.HIGHLY_RESTRICTED]: 'Highly Restricted',
  };
  return labels[sensitivity] || 'Unknown';
}

// Check if analytics is real-time
export function isAnalyticsRealtime(type: AnalyticsDataType): boolean {
  const realtimeTypes: AnalyticsDataType[] = [
    ANALYTICS_TYPE.TYPES.REALTIME,
    ANALYTICS_TYPE.TYPES.LIVE,
    ANALYTICS_TYPE.TYPES.STREAMING,
  ];
  return realtimeTypes.includes(type);
}

// Check if analytics is historical
export function isAnalyticsHistorical(type: AnalyticsDataType): boolean {
  const historicalTypes: AnalyticsDataType[] = [
    ANALYTICS_TYPE.TYPES.HISTORICAL,
    ANALYTICS_TYPE.TYPES.TRENDING,
    ANALYTICS_TYPE.TYPES.SEASONAL,
    ANALYTICS_TYPE.TYPES.COMPARATIVE,
  ];
  return historicalTypes.includes(type);
}

// Check if analytics is predictive
export function isAnalyticsPredictive(type: AnalyticsDataType): boolean {
  const predictiveTypes: AnalyticsDataType[] = [
    ANALYTICS_TYPE.TYPES.PREDICTIVE,
    ANALYTICS_TYPE.TYPES.FORECAST,
    ANALYTICS_TYPE.TYPES.PROJECTION,
  ];
  return predictiveTypes.includes(type);
}
