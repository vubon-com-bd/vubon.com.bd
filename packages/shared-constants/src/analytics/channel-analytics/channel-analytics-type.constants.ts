/**
 * Channel Analytics Type Constants
 * Types of channel analytics data and analysis
 */

export const CHANNEL_ANALYTICS_TYPE = {
  // Analysis Types
  ANALYSIS_TYPES: {
    // Channel Performance Analysis
    PERFORMANCE_ANALYSIS: 'performance_analysis',
    EFFECTIVENESS_ANALYSIS: 'effectiveness_analysis',
    EFFICIENCY_ANALYSIS: 'efficiency_analysis',

    // Channel Comparison Analysis
    COMPARATIVE_ANALYSIS: 'comparative_analysis',
    CHANNEL_ATTRIBUTION: 'channel_attribution',
    MULTI_CHANNEL_ANALYSIS: 'multi_channel_analysis',

    // Channel Revenue Analysis
    REVENUE_ANALYSIS: 'revenue_analysis',
    COST_ANALYSIS: 'cost_analysis',
    PROFIT_ANALYSIS: 'profit_analysis',
    ROI_ANALYSIS: 'roi_analysis',

    // Channel Customer Analysis
    CUSTOMER_ANALYSIS: 'customer_analysis',
    ACQUISITION_ANALYSIS: 'acquisition_analysis',
    RETENTION_ANALYSIS: 'retention_analysis',

    // Channel Health Analysis
    HEALTH_ANALYSIS: 'health_analysis',
    RISK_ANALYSIS: 'risk_analysis',

    // Predictive Analysis
    PREDICTIVE: 'predictive',
    FORECAST: 'forecast',
    TREND: 'trend',
  } as const,

  // Data Types
  DATA_TYPES: {
    CHANNEL_DATA: 'channel_data',
    PERFORMANCE_DATA: 'performance_data',
    REVENUE_DATA: 'revenue_data',
    COST_DATA: 'cost_data',
    CUSTOMER_DATA: 'customer_data',
    ENGAGEMENT_DATA: 'engagement_data',
    CONVERSION_DATA: 'conversion_data',
    TIME_SERIES: 'time_series',
    AGGREGATED: 'aggregated',
    RAW: 'raw',
  } as const,

  // Channel Types
  CHANNEL_TYPES: {
    // Digital Channels
    WEBSITE: 'website',
    MOBILE_APP: 'mobile_app',
    SOCIAL_MEDIA: 'social_media',
    EMAIL: 'email',
    SEARCH_ENGINE: 'search_engine',
    DISPLAY_AD: 'display_ad',
    VIDEO_AD: 'video_ad',
    NATIVE_AD: 'native_ad',

    // Traditional Channels
    TELEVISION: 'television',
    RADIO: 'radio',
    PRINT: 'print',
    OUTDOOR: 'outdoor',
    DIRECT_MAIL: 'direct_mail',
    EVENT: 'event',
    SPONSORSHIP: 'sponsorship',

    // Other Channels
    REFERRAL: 'referral',
    AFFILIATE: 'affiliate',
    INFLUENCER: 'influencer',
    PARTNERSHIP: 'partnership',
  } as const,

  // Channel Categories
  CHANNEL_CATEGORIES: {
    DIGITAL: 'digital',
    TRADITIONAL: 'traditional',
    SOCIAL: 'social',
    SEARCH: 'search',
    DISPLAY: 'display',
    VIDEO: 'video',
    PRINT: 'print',
    OUTDOOR: 'outdoor',
    DIRECT: 'direct',
    REFERRAL: 'referral',
    OTHER: 'other',
  } as const,

  // Channel Status
  CHANNEL_STATUS: {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    PENDING: 'pending',
    SUSPENDED: 'suspended',
    ARCHIVED: 'archived',
    UNDER_REVIEW: 'under_review',
  } as const,

  // Channel Performance Levels
  PERFORMANCE_LEVELS: {
    EXCELLENT: 'excellent',
    GOOD: 'good',
    AVERAGE: 'average',
    BELOW_AVERAGE: 'below_average',
    POOR: 'poor',
    CRITICAL: 'critical',
  } as const,

  // Channel Health Levels
  HEALTH_LEVELS: {
    HEALTHY: 'healthy',
    DEGRADED: 'degraded',
    UNHEALTHY: 'unhealthy',
    CRITICAL: 'critical',
  } as const,

  // Channel ROI Categories
  ROI_CATEGORIES: {
    HIGH: 'high',
    MEDIUM: 'medium',
    LOW: 'low',
    NEGATIVE: 'negative',
    BREAK_EVEN: 'break_even',
  } as const,

  // Channel Attribution Models
  ATTRIBUTION_MODELS: {
    LAST_CLICK: 'last_click',
    FIRST_CLICK: 'first_click',
    LINEAR: 'linear',
    TIME_DECAY: 'time_decay',
    POSITION_BASED: 'position_based',
    DATA_DRIVEN: 'data_driven',
  } as const,
} as const;

// Channel Analytics Analysis Types
export type ChannelAnalyticsAnalysisType =
  (typeof CHANNEL_ANALYTICS_TYPE.ANALYSIS_TYPES)[keyof typeof CHANNEL_ANALYTICS_TYPE.ANALYSIS_TYPES];

// Channel Analytics Data Types
export type ChannelAnalyticsDataType =
  (typeof CHANNEL_ANALYTICS_TYPE.DATA_TYPES)[keyof typeof CHANNEL_ANALYTICS_TYPE.DATA_TYPES];

// Channel Analytics Channel Types
export type ChannelAnalyticsChannelType =
  (typeof CHANNEL_ANALYTICS_TYPE.CHANNEL_TYPES)[keyof typeof CHANNEL_ANALYTICS_TYPE.CHANNEL_TYPES];

// Channel Analytics Channel Categories
export type ChannelAnalyticsChannelCategory =
  (typeof CHANNEL_ANALYTICS_TYPE.CHANNEL_CATEGORIES)[keyof typeof CHANNEL_ANALYTICS_TYPE.CHANNEL_CATEGORIES];

// Channel Analytics Channel Status
export type ChannelAnalyticsChannelStatus =
  (typeof CHANNEL_ANALYTICS_TYPE.CHANNEL_STATUS)[keyof typeof CHANNEL_ANALYTICS_TYPE.CHANNEL_STATUS];

// Channel Analytics Performance Levels
export type ChannelAnalyticsPerformanceLevel =
  (typeof CHANNEL_ANALYTICS_TYPE.PERFORMANCE_LEVELS)[keyof typeof CHANNEL_ANALYTICS_TYPE.PERFORMANCE_LEVELS];

// Channel Analytics Health Levels
export type ChannelAnalyticsHealthLevel =
  (typeof CHANNEL_ANALYTICS_TYPE.HEALTH_LEVELS)[keyof typeof CHANNEL_ANALYTICS_TYPE.HEALTH_LEVELS];

// Channel Analytics ROI Categories
export type ChannelAnalyticsROICategory =
  (typeof CHANNEL_ANALYTICS_TYPE.ROI_CATEGORIES)[keyof typeof CHANNEL_ANALYTICS_TYPE.ROI_CATEGORIES];

// Channel Analytics Attribution Models
export type ChannelAnalyticsAttributionModel =
  (typeof CHANNEL_ANALYTICS_TYPE.ATTRIBUTION_MODELS)[keyof typeof CHANNEL_ANALYTICS_TYPE.ATTRIBUTION_MODELS];

// Channel Analytics Analysis Type Labels
export function getChannelAnalyticsAnalysisTypeLabel(type: ChannelAnalyticsAnalysisType): string {
  const labels: Record<ChannelAnalyticsAnalysisType, string> = {
    [CHANNEL_ANALYTICS_TYPE.ANALYSIS_TYPES.PERFORMANCE_ANALYSIS]: 'Performance Analysis',
    [CHANNEL_ANALYTICS_TYPE.ANALYSIS_TYPES.EFFECTIVENESS_ANALYSIS]: 'Effectiveness Analysis',
    [CHANNEL_ANALYTICS_TYPE.ANALYSIS_TYPES.EFFICIENCY_ANALYSIS]: 'Efficiency Analysis',
    [CHANNEL_ANALYTICS_TYPE.ANALYSIS_TYPES.COMPARATIVE_ANALYSIS]: 'Comparative Analysis',
    [CHANNEL_ANALYTICS_TYPE.ANALYSIS_TYPES.CHANNEL_ATTRIBUTION]: 'Channel Attribution',
    [CHANNEL_ANALYTICS_TYPE.ANALYSIS_TYPES.MULTI_CHANNEL_ANALYSIS]: 'Multi-Channel Analysis',
    [CHANNEL_ANALYTICS_TYPE.ANALYSIS_TYPES.REVENUE_ANALYSIS]: 'Revenue Analysis',
    [CHANNEL_ANALYTICS_TYPE.ANALYSIS_TYPES.COST_ANALYSIS]: 'Cost Analysis',
    [CHANNEL_ANALYTICS_TYPE.ANALYSIS_TYPES.PROFIT_ANALYSIS]: 'Profit Analysis',
    [CHANNEL_ANALYTICS_TYPE.ANALYSIS_TYPES.ROI_ANALYSIS]: 'ROI Analysis',
    [CHANNEL_ANALYTICS_TYPE.ANALYSIS_TYPES.CUSTOMER_ANALYSIS]: 'Customer Analysis',
    [CHANNEL_ANALYTICS_TYPE.ANALYSIS_TYPES.ACQUISITION_ANALYSIS]: 'Acquisition Analysis',
    [CHANNEL_ANALYTICS_TYPE.ANALYSIS_TYPES.RETENTION_ANALYSIS]: 'Retention Analysis',
    [CHANNEL_ANALYTICS_TYPE.ANALYSIS_TYPES.HEALTH_ANALYSIS]: 'Health Analysis',
    [CHANNEL_ANALYTICS_TYPE.ANALYSIS_TYPES.RISK_ANALYSIS]: 'Risk Analysis',
    [CHANNEL_ANALYTICS_TYPE.ANALYSIS_TYPES.PREDICTIVE]: 'Predictive Analysis',
    [CHANNEL_ANALYTICS_TYPE.ANALYSIS_TYPES.FORECAST]: 'Forecast',
    [CHANNEL_ANALYTICS_TYPE.ANALYSIS_TYPES.TREND]: 'Trend Analysis',
  };
  return labels[type] || 'Unknown';
}

// Channel Analytics Data Type Labels
export function getChannelAnalyticsDataTypeLabel(type: ChannelAnalyticsDataType): string {
  const labels: Record<ChannelAnalyticsDataType, string> = {
    [CHANNEL_ANALYTICS_TYPE.DATA_TYPES.CHANNEL_DATA]: 'Channel Data',
    [CHANNEL_ANALYTICS_TYPE.DATA_TYPES.PERFORMANCE_DATA]: 'Performance Data',
    [CHANNEL_ANALYTICS_TYPE.DATA_TYPES.REVENUE_DATA]: 'Revenue Data',
    [CHANNEL_ANALYTICS_TYPE.DATA_TYPES.COST_DATA]: 'Cost Data',
    [CHANNEL_ANALYTICS_TYPE.DATA_TYPES.CUSTOMER_DATA]: 'Customer Data',
    [CHANNEL_ANALYTICS_TYPE.DATA_TYPES.ENGAGEMENT_DATA]: 'Engagement Data',
    [CHANNEL_ANALYTICS_TYPE.DATA_TYPES.CONVERSION_DATA]: 'Conversion Data',
    [CHANNEL_ANALYTICS_TYPE.DATA_TYPES.TIME_SERIES]: 'Time Series',
    [CHANNEL_ANALYTICS_TYPE.DATA_TYPES.AGGREGATED]: 'Aggregated',
    [CHANNEL_ANALYTICS_TYPE.DATA_TYPES.RAW]: 'Raw',
  };
  return labels[type] || 'Unknown';
}

// Channel Analytics Channel Type Labels
export function getChannelAnalyticsChannelTypeLabel(type: ChannelAnalyticsChannelType): string {
  const labels: Record<ChannelAnalyticsChannelType, string> = {
    [CHANNEL_ANALYTICS_TYPE.CHANNEL_TYPES.WEBSITE]: 'Website',
    [CHANNEL_ANALYTICS_TYPE.CHANNEL_TYPES.MOBILE_APP]: 'Mobile App',
    [CHANNEL_ANALYTICS_TYPE.CHANNEL_TYPES.SOCIAL_MEDIA]: 'Social Media',
    [CHANNEL_ANALYTICS_TYPE.CHANNEL_TYPES.EMAIL]: 'Email',
    [CHANNEL_ANALYTICS_TYPE.CHANNEL_TYPES.SEARCH_ENGINE]: 'Search Engine',
    [CHANNEL_ANALYTICS_TYPE.CHANNEL_TYPES.DISPLAY_AD]: 'Display Ad',
    [CHANNEL_ANALYTICS_TYPE.CHANNEL_TYPES.VIDEO_AD]: 'Video Ad',
    [CHANNEL_ANALYTICS_TYPE.CHANNEL_TYPES.NATIVE_AD]: 'Native Ad',
    [CHANNEL_ANALYTICS_TYPE.CHANNEL_TYPES.TELEVISION]: 'Television',
    [CHANNEL_ANALYTICS_TYPE.CHANNEL_TYPES.RADIO]: 'Radio',
    [CHANNEL_ANALYTICS_TYPE.CHANNEL_TYPES.PRINT]: 'Print',
    [CHANNEL_ANALYTICS_TYPE.CHANNEL_TYPES.OUTDOOR]: 'Outdoor',
    [CHANNEL_ANALYTICS_TYPE.CHANNEL_TYPES.DIRECT_MAIL]: 'Direct Mail',
    [CHANNEL_ANALYTICS_TYPE.CHANNEL_TYPES.EVENT]: 'Event',
    [CHANNEL_ANALYTICS_TYPE.CHANNEL_TYPES.SPONSORSHIP]: 'Sponsorship',
    [CHANNEL_ANALYTICS_TYPE.CHANNEL_TYPES.REFERRAL]: 'Referral',
    [CHANNEL_ANALYTICS_TYPE.CHANNEL_TYPES.AFFILIATE]: 'Affiliate',
    [CHANNEL_ANALYTICS_TYPE.CHANNEL_TYPES.INFLUENCER]: 'Influencer',
    [CHANNEL_ANALYTICS_TYPE.CHANNEL_TYPES.PARTNERSHIP]: 'Partnership',
  };
  return labels[type] || 'Unknown';
}

// Channel Analytics Channel Category Labels
export function getChannelAnalyticsChannelCategoryLabel(
  category: ChannelAnalyticsChannelCategory
): string {
  const labels: Record<ChannelAnalyticsChannelCategory, string> = {
    [CHANNEL_ANALYTICS_TYPE.CHANNEL_CATEGORIES.DIGITAL]: 'Digital',
    [CHANNEL_ANALYTICS_TYPE.CHANNEL_CATEGORIES.TRADITIONAL]: 'Traditional',
    [CHANNEL_ANALYTICS_TYPE.CHANNEL_CATEGORIES.SOCIAL]: 'Social',
    [CHANNEL_ANALYTICS_TYPE.CHANNEL_CATEGORIES.SEARCH]: 'Search',
    [CHANNEL_ANALYTICS_TYPE.CHANNEL_CATEGORIES.DISPLAY]: 'Display',
    [CHANNEL_ANALYTICS_TYPE.CHANNEL_CATEGORIES.VIDEO]: 'Video',
    [CHANNEL_ANALYTICS_TYPE.CHANNEL_CATEGORIES.PRINT]: 'Print',
    [CHANNEL_ANALYTICS_TYPE.CHANNEL_CATEGORIES.OUTDOOR]: 'Outdoor',
    [CHANNEL_ANALYTICS_TYPE.CHANNEL_CATEGORIES.DIRECT]: 'Direct',
    [CHANNEL_ANALYTICS_TYPE.CHANNEL_CATEGORIES.REFERRAL]: 'Referral',
    [CHANNEL_ANALYTICS_TYPE.CHANNEL_CATEGORIES.OTHER]: 'Other',
  };
  return labels[category] || 'Unknown';
}

// Channel Analytics Channel Status Labels
export function getChannelAnalyticsChannelStatusLabel(
  status: ChannelAnalyticsChannelStatus
): string {
  const labels: Record<ChannelAnalyticsChannelStatus, string> = {
    [CHANNEL_ANALYTICS_TYPE.CHANNEL_STATUS.ACTIVE]: 'Active',
    [CHANNEL_ANALYTICS_TYPE.CHANNEL_STATUS.INACTIVE]: 'Inactive',
    [CHANNEL_ANALYTICS_TYPE.CHANNEL_STATUS.PENDING]: 'Pending',
    [CHANNEL_ANALYTICS_TYPE.CHANNEL_STATUS.SUSPENDED]: 'Suspended',
    [CHANNEL_ANALYTICS_TYPE.CHANNEL_STATUS.ARCHIVED]: 'Archived',
    [CHANNEL_ANALYTICS_TYPE.CHANNEL_STATUS.UNDER_REVIEW]: 'Under Review',
  };
  return labels[status] || 'Unknown';
}

// Channel Analytics Performance Level Labels
export function getChannelAnalyticsPerformanceLevelLabel(
  level: ChannelAnalyticsPerformanceLevel
): string {
  const labels: Record<ChannelAnalyticsPerformanceLevel, string> = {
    [CHANNEL_ANALYTICS_TYPE.PERFORMANCE_LEVELS.EXCELLENT]: 'Excellent',
    [CHANNEL_ANALYTICS_TYPE.PERFORMANCE_LEVELS.GOOD]: 'Good',
    [CHANNEL_ANALYTICS_TYPE.PERFORMANCE_LEVELS.AVERAGE]: 'Average',
    [CHANNEL_ANALYTICS_TYPE.PERFORMANCE_LEVELS.BELOW_AVERAGE]: 'Below Average',
    [CHANNEL_ANALYTICS_TYPE.PERFORMANCE_LEVELS.POOR]: 'Poor',
    [CHANNEL_ANALYTICS_TYPE.PERFORMANCE_LEVELS.CRITICAL]: 'Critical',
  };
  return labels[level] || 'Unknown';
}

// Channel Analytics Health Level Labels
export function getChannelAnalyticsHealthLevelLabel(level: ChannelAnalyticsHealthLevel): string {
  const labels: Record<ChannelAnalyticsHealthLevel, string> = {
    [CHANNEL_ANALYTICS_TYPE.HEALTH_LEVELS.HEALTHY]: 'Healthy',
    [CHANNEL_ANALYTICS_TYPE.HEALTH_LEVELS.DEGRADED]: 'Degraded',
    [CHANNEL_ANALYTICS_TYPE.HEALTH_LEVELS.UNHEALTHY]: 'Unhealthy',
    [CHANNEL_ANALYTICS_TYPE.HEALTH_LEVELS.CRITICAL]: 'Critical',
  };
  return labels[level] || 'Unknown';
}

// Channel Analytics ROI Category Labels
export function getChannelAnalyticsROICategoryLabel(category: ChannelAnalyticsROICategory): string {
  const labels: Record<ChannelAnalyticsROICategory, string> = {
    [CHANNEL_ANALYTICS_TYPE.ROI_CATEGORIES.HIGH]: 'High',
    [CHANNEL_ANALYTICS_TYPE.ROI_CATEGORIES.MEDIUM]: 'Medium',
    [CHANNEL_ANALYTICS_TYPE.ROI_CATEGORIES.LOW]: 'Low',
    [CHANNEL_ANALYTICS_TYPE.ROI_CATEGORIES.NEGATIVE]: 'Negative',
    [CHANNEL_ANALYTICS_TYPE.ROI_CATEGORIES.BREAK_EVEN]: 'Break Even',
  };
  return labels[category] || 'Unknown';
}

// Channel Analytics Attribution Model Labels
export function getChannelAnalyticsAttributionModelLabel(
  model: ChannelAnalyticsAttributionModel
): string {
  const labels: Record<ChannelAnalyticsAttributionModel, string> = {
    [CHANNEL_ANALYTICS_TYPE.ATTRIBUTION_MODELS.LAST_CLICK]: 'Last Click',
    [CHANNEL_ANALYTICS_TYPE.ATTRIBUTION_MODELS.FIRST_CLICK]: 'First Click',
    [CHANNEL_ANALYTICS_TYPE.ATTRIBUTION_MODELS.LINEAR]: 'Linear',
    [CHANNEL_ANALYTICS_TYPE.ATTRIBUTION_MODELS.TIME_DECAY]: 'Time Decay',
    [CHANNEL_ANALYTICS_TYPE.ATTRIBUTION_MODELS.POSITION_BASED]: 'Position Based',
    [CHANNEL_ANALYTICS_TYPE.ATTRIBUTION_MODELS.DATA_DRIVEN]: 'Data Driven',
  };
  return labels[model] || 'Unknown';
}

// Check if analysis is performance analysis
export function isChannelAnalyticsPerformanceAnalysis(type: ChannelAnalyticsAnalysisType): boolean {
  const performanceTypes: ChannelAnalyticsAnalysisType[] = [
    CHANNEL_ANALYTICS_TYPE.ANALYSIS_TYPES.PERFORMANCE_ANALYSIS,
    CHANNEL_ANALYTICS_TYPE.ANALYSIS_TYPES.EFFECTIVENESS_ANALYSIS,
    CHANNEL_ANALYTICS_TYPE.ANALYSIS_TYPES.EFFICIENCY_ANALYSIS,
  ];
  return performanceTypes.includes(type);
}

// Check if analysis is revenue analysis
export function isChannelAnalyticsRevenueAnalysis(type: ChannelAnalyticsAnalysisType): boolean {
  const revenueTypes: ChannelAnalyticsAnalysisType[] = [
    CHANNEL_ANALYTICS_TYPE.ANALYSIS_TYPES.REVENUE_ANALYSIS,
    CHANNEL_ANALYTICS_TYPE.ANALYSIS_TYPES.COST_ANALYSIS,
    CHANNEL_ANALYTICS_TYPE.ANALYSIS_TYPES.PROFIT_ANALYSIS,
    CHANNEL_ANALYTICS_TYPE.ANALYSIS_TYPES.ROI_ANALYSIS,
  ];
  return revenueTypes.includes(type);
}

// Check if analysis is comparative
export function isChannelAnalyticsComparative(type: ChannelAnalyticsAnalysisType): boolean {
  const comparativeTypes: ChannelAnalyticsAnalysisType[] = [
    CHANNEL_ANALYTICS_TYPE.ANALYSIS_TYPES.COMPARATIVE_ANALYSIS,
    CHANNEL_ANALYTICS_TYPE.ANALYSIS_TYPES.CHANNEL_ATTRIBUTION,
    CHANNEL_ANALYTICS_TYPE.ANALYSIS_TYPES.MULTI_CHANNEL_ANALYSIS,
  ];
  return comparativeTypes.includes(type);
}

// Check if analysis is predictive
export function isChannelAnalyticsPredictive(type: ChannelAnalyticsAnalysisType): boolean {
  const predictiveTypes: ChannelAnalyticsAnalysisType[] = [
    CHANNEL_ANALYTICS_TYPE.ANALYSIS_TYPES.PREDICTIVE,
    CHANNEL_ANALYTICS_TYPE.ANALYSIS_TYPES.FORECAST,
    CHANNEL_ANALYTICS_TYPE.ANALYSIS_TYPES.TREND,
  ];
  return predictiveTypes.includes(type);
}

// Get performance level from score
export function getChannelAnalyticsPerformanceLevel(
  score: number
): ChannelAnalyticsPerformanceLevel {
  if (score >= 90) return CHANNEL_ANALYTICS_TYPE.PERFORMANCE_LEVELS.EXCELLENT;
  if (score >= 70) return CHANNEL_ANALYTICS_TYPE.PERFORMANCE_LEVELS.GOOD;
  if (score >= 50) return CHANNEL_ANALYTICS_TYPE.PERFORMANCE_LEVELS.AVERAGE;
  if (score >= 30) return CHANNEL_ANALYTICS_TYPE.PERFORMANCE_LEVELS.BELOW_AVERAGE;
  if (score >= 10) return CHANNEL_ANALYTICS_TYPE.PERFORMANCE_LEVELS.POOR;
  return CHANNEL_ANALYTICS_TYPE.PERFORMANCE_LEVELS.CRITICAL;
}

// Get health level from score
export function getChannelAnalyticsHealthLevel(score: number): ChannelAnalyticsHealthLevel {
  if (score >= 80) return CHANNEL_ANALYTICS_TYPE.HEALTH_LEVELS.HEALTHY;
  if (score >= 60) return CHANNEL_ANALYTICS_TYPE.HEALTH_LEVELS.DEGRADED;
  if (score >= 40) return CHANNEL_ANALYTICS_TYPE.HEALTH_LEVELS.UNHEALTHY;
  return CHANNEL_ANALYTICS_TYPE.HEALTH_LEVELS.CRITICAL;
}

// Get ROI category from percentage
export function getChannelAnalyticsROICategory(roi: number): ChannelAnalyticsROICategory {
  if (roi > 20) return CHANNEL_ANALYTICS_TYPE.ROI_CATEGORIES.HIGH;
  if (roi > 10) return CHANNEL_ANALYTICS_TYPE.ROI_CATEGORIES.MEDIUM;
  if (roi > 0) return CHANNEL_ANALYTICS_TYPE.ROI_CATEGORIES.LOW;
  if (roi === 0) return CHANNEL_ANALYTICS_TYPE.ROI_CATEGORIES.BREAK_EVEN;
  return CHANNEL_ANALYTICS_TYPE.ROI_CATEGORIES.NEGATIVE;
}
