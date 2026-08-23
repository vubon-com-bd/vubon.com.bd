/**
 * Acquisition Analytics Type Constants
 * Types of acquisition analytics data and analysis
 */

export const ACQUISITION_ANALYTICS_TYPE = {
  // Analysis Types
  ANALYSIS_TYPES: {
    // Channel Analysis
    CHANNEL_ANALYSIS: 'channel_analysis',
    SOURCE_ANALYSIS: 'source_analysis',
    MEDIUM_ANALYSIS: 'medium_analysis',
    CAMPAIGN_ANALYSIS: 'campaign_analysis',

    // Customer Analysis
    CUSTOMER_ACQUISITION: 'customer_acquisition',
    LEAD_ANALYSIS: 'lead_analysis',
    CONVERSION_ANALYSIS: 'conversion_analysis',

    // Cost Analysis
    COST_ANALYSIS: 'cost_analysis',
    CAC_ANALYSIS: 'cac_analysis',
    ROI_ANALYSIS: 'roi_analysis',

    // Funnel Analysis
    ACQUISITION_FUNNEL: 'acquisition_funnel',
    CONVERSION_FUNNEL: 'conversion_funnel',
    DROPOFF_ANALYSIS: 'dropoff_analysis',

    // Comparative Analysis
    COMPARATIVE: 'comparative',
    YEAR_OVER_YEAR: 'year_over_year',
    QUARTER_OVER_QUARTER: 'quarter_over_quarter',
    MONTH_OVER_MONTH: 'month_over_month',

    // Predictive Analysis
    PREDICTIVE: 'predictive',
    FORECAST: 'forecast',
    TREND: 'trend',
  } as const,

  // Data Types
  DATA_TYPES: {
    LEAD_DATA: 'lead_data',
    CUSTOMER_DATA: 'customer_data',
    CHANNEL_DATA: 'channel_data',
    CAMPAIGN_DATA: 'campaign_data',
    COST_DATA: 'cost_data',
    CONVERSION_DATA: 'conversion_data',
    TIME_SERIES: 'time_series',
    AGGREGATED: 'aggregated',
    RAW: 'raw',
  } as const,

  // Lead Status
  LEAD_STATUS: {
    NEW: 'new',
    CONTACTED: 'contacted',
    QUALIFIED: 'qualified',
    CONVERTED: 'converted',
    LOST: 'lost',
    DISQUALIFIED: 'disqualified',
    NURTURING: 'nurturing',
  } as const,

  // Lead Types
  LEAD_TYPES: {
    HOT: 'hot',
    WARM: 'warm',
    COLD: 'cold',
    INFORMATION: 'information',
    DEMO: 'demo',
    TRIAL: 'trial',
  } as const,

  // Acquisition Channels
  ACQUISITION_CHANNELS: {
    ORGANIC_SEARCH: 'organic_search',
    PAID_SEARCH: 'paid_search',
    SOCIAL_ORGANIC: 'social_organic',
    SOCIAL_PAID: 'social_paid',
    DISPLAY_ADS: 'display_ads',
    VIDEO_ADS: 'video_ads',
    EMAIL: 'email',
    REFERRAL: 'referral',
    DIRECT: 'direct',
    AFFILIATE: 'affiliate',
    INFLUENCER: 'influencer',
    EVENT: 'event',
    OTHER: 'other',
  } as const,

  // Acquisition Sources
  ACQUISITION_SOURCES: {
    GOOGLE: 'google',
    FACEBOOK: 'facebook',
    INSTAGRAM: 'instagram',
    TWITTER: 'twitter',
    LINKEDIN: 'linkedin',
    YOUTUBE: 'youtube',
    TIKTOK: 'tiktok',
    PINTEREST: 'pinterest',
    REDDIT: 'reddit',
    QUORA: 'quora',
    MEDIUM: 'medium',
    NEWSLETTER: 'newsletter',
    BLOG: 'blog',
    PODCAST: 'podcast',
    WEBINAR: 'webinar',
    TRADE_SHOW: 'trade_show',
    REFERRAL: 'referral',
    OTHER: 'other',
  } as const,

  // Acquisition Mediums
  ACQUISITION_MEDIUMS: {
    ORGANIC: 'organic',
    CPC: 'cpc',
    CPM: 'cpm',
    CPA: 'cpa',
    CPL: 'cpl',
    CPS: 'cps',
    SOCIAL: 'social',
    EMAIL: 'email',
    REFERRAL: 'referral',
    DISPLAY: 'display',
    VIDEO: 'video',
    NATIVE: 'native',
  } as const,

  // Acquisition Funnel Stages
  FUNNEL_STAGES: {
    AWARENESS: 'awareness',
    INTEREST: 'interest',
    CONSIDERATION: 'consideration',
    INTENT: 'intent',
    EVALUATION: 'evaluation',
    PURCHASE: 'purchase',
    RETENTION: 'retention',
  } as const,

  // CAC Categories
  CAC_CATEGORIES: {
    VERY_LOW: 'very_low',
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high',
    VERY_HIGH: 'very_high',
  } as const,

  // ROI Categories
  ROI_CATEGORIES: {
    EXCELLENT: 'excellent',
    GOOD: 'good',
    AVERAGE: 'average',
    POOR: 'poor',
    NEGATIVE: 'negative',
  } as const,
} as const;

// Acquisition Analytics Analysis Types
export type AcquisitionAnalyticsAnalysisType =
  (typeof ACQUISITION_ANALYTICS_TYPE.ANALYSIS_TYPES)[keyof typeof ACQUISITION_ANALYTICS_TYPE.ANALYSIS_TYPES];

// Acquisition Analytics Data Types
export type AcquisitionAnalyticsDataType =
  (typeof ACQUISITION_ANALYTICS_TYPE.DATA_TYPES)[keyof typeof ACQUISITION_ANALYTICS_TYPE.DATA_TYPES];

// Acquisition Analytics Lead Status
export type AcquisitionAnalyticsLeadStatus =
  (typeof ACQUISITION_ANALYTICS_TYPE.LEAD_STATUS)[keyof typeof ACQUISITION_ANALYTICS_TYPE.LEAD_STATUS];

// Acquisition Analytics Lead Types
export type AcquisitionAnalyticsLeadType =
  (typeof ACQUISITION_ANALYTICS_TYPE.LEAD_TYPES)[keyof typeof ACQUISITION_ANALYTICS_TYPE.LEAD_TYPES];

// Acquisition Analytics Acquisition Channels
export type AcquisitionAnalyticsAcquisitionChannel =
  (typeof ACQUISITION_ANALYTICS_TYPE.ACQUISITION_CHANNELS)[keyof typeof ACQUISITION_ANALYTICS_TYPE.ACQUISITION_CHANNELS];

// Acquisition Analytics Acquisition Sources
export type AcquisitionAnalyticsAcquisitionSource =
  (typeof ACQUISITION_ANALYTICS_TYPE.ACQUISITION_SOURCES)[keyof typeof ACQUISITION_ANALYTICS_TYPE.ACQUISITION_SOURCES];

// Acquisition Analytics Acquisition Mediums
export type AcquisitionAnalyticsAcquisitionMedium =
  (typeof ACQUISITION_ANALYTICS_TYPE.ACQUISITION_MEDIUMS)[keyof typeof ACQUISITION_ANALYTICS_TYPE.ACQUISITION_MEDIUMS];

// Acquisition Analytics Funnel Stages
export type AcquisitionAnalyticsFunnelStage =
  (typeof ACQUISITION_ANALYTICS_TYPE.FUNNEL_STAGES)[keyof typeof ACQUISITION_ANALYTICS_TYPE.FUNNEL_STAGES];

// Acquisition Analytics CAC Categories
export type AcquisitionAnalyticsCACCategory =
  (typeof ACQUISITION_ANALYTICS_TYPE.CAC_CATEGORIES)[keyof typeof ACQUISITION_ANALYTICS_TYPE.CAC_CATEGORIES];

// Acquisition Analytics ROI Categories
export type AcquisitionAnalyticsROICategory =
  (typeof ACQUISITION_ANALYTICS_TYPE.ROI_CATEGORIES)[keyof typeof ACQUISITION_ANALYTICS_TYPE.ROI_CATEGORIES];

// Acquisition Analytics Analysis Type Labels
export function getAcquisitionAnalyticsAnalysisTypeLabel(
  type: AcquisitionAnalyticsAnalysisType
): string {
  const labels: Record<AcquisitionAnalyticsAnalysisType, string> = {
    [ACQUISITION_ANALYTICS_TYPE.ANALYSIS_TYPES.CHANNEL_ANALYSIS]: 'Channel Analysis',
    [ACQUISITION_ANALYTICS_TYPE.ANALYSIS_TYPES.SOURCE_ANALYSIS]: 'Source Analysis',
    [ACQUISITION_ANALYTICS_TYPE.ANALYSIS_TYPES.MEDIUM_ANALYSIS]: 'Medium Analysis',
    [ACQUISITION_ANALYTICS_TYPE.ANALYSIS_TYPES.CAMPAIGN_ANALYSIS]: 'Campaign Analysis',
    [ACQUISITION_ANALYTICS_TYPE.ANALYSIS_TYPES.CUSTOMER_ACQUISITION]: 'Customer Acquisition',
    [ACQUISITION_ANALYTICS_TYPE.ANALYSIS_TYPES.LEAD_ANALYSIS]: 'Lead Analysis',
    [ACQUISITION_ANALYTICS_TYPE.ANALYSIS_TYPES.CONVERSION_ANALYSIS]: 'Conversion Analysis',
    [ACQUISITION_ANALYTICS_TYPE.ANALYSIS_TYPES.COST_ANALYSIS]: 'Cost Analysis',
    [ACQUISITION_ANALYTICS_TYPE.ANALYSIS_TYPES.CAC_ANALYSIS]: 'CAC Analysis',
    [ACQUISITION_ANALYTICS_TYPE.ANALYSIS_TYPES.ROI_ANALYSIS]: 'ROI Analysis',
    [ACQUISITION_ANALYTICS_TYPE.ANALYSIS_TYPES.ACQUISITION_FUNNEL]: 'Acquisition Funnel',
    [ACQUISITION_ANALYTICS_TYPE.ANALYSIS_TYPES.CONVERSION_FUNNEL]: 'Conversion Funnel',
    [ACQUISITION_ANALYTICS_TYPE.ANALYSIS_TYPES.DROPOFF_ANALYSIS]: 'Dropoff Analysis',
    [ACQUISITION_ANALYTICS_TYPE.ANALYSIS_TYPES.COMPARATIVE]: 'Comparative Analysis',
    [ACQUISITION_ANALYTICS_TYPE.ANALYSIS_TYPES.YEAR_OVER_YEAR]: 'Year Over Year',
    [ACQUISITION_ANALYTICS_TYPE.ANALYSIS_TYPES.QUARTER_OVER_QUARTER]: 'Quarter Over Quarter',
    [ACQUISITION_ANALYTICS_TYPE.ANALYSIS_TYPES.MONTH_OVER_MONTH]: 'Month Over Month',
    [ACQUISITION_ANALYTICS_TYPE.ANALYSIS_TYPES.PREDICTIVE]: 'Predictive Analysis',
    [ACQUISITION_ANALYTICS_TYPE.ANALYSIS_TYPES.FORECAST]: 'Forecast',
    [ACQUISITION_ANALYTICS_TYPE.ANALYSIS_TYPES.TREND]: 'Trend Analysis',
  };
  return labels[type] || 'Unknown';
}

// Acquisition Analytics Data Type Labels
export function getAcquisitionAnalyticsDataTypeLabel(type: AcquisitionAnalyticsDataType): string {
  const labels: Record<AcquisitionAnalyticsDataType, string> = {
    [ACQUISITION_ANALYTICS_TYPE.DATA_TYPES.LEAD_DATA]: 'Lead Data',
    [ACQUISITION_ANALYTICS_TYPE.DATA_TYPES.CUSTOMER_DATA]: 'Customer Data',
    [ACQUISITION_ANALYTICS_TYPE.DATA_TYPES.CHANNEL_DATA]: 'Channel Data',
    [ACQUISITION_ANALYTICS_TYPE.DATA_TYPES.CAMPAIGN_DATA]: 'Campaign Data',
    [ACQUISITION_ANALYTICS_TYPE.DATA_TYPES.COST_DATA]: 'Cost Data',
    [ACQUISITION_ANALYTICS_TYPE.DATA_TYPES.CONVERSION_DATA]: 'Conversion Data',
    [ACQUISITION_ANALYTICS_TYPE.DATA_TYPES.TIME_SERIES]: 'Time Series',
    [ACQUISITION_ANALYTICS_TYPE.DATA_TYPES.AGGREGATED]: 'Aggregated',
    [ACQUISITION_ANALYTICS_TYPE.DATA_TYPES.RAW]: 'Raw',
  };
  return labels[type] || 'Unknown';
}

// Acquisition Analytics Lead Status Labels
export function getAcquisitionAnalyticsLeadStatusLabel(
  status: AcquisitionAnalyticsLeadStatus
): string {
  const labels: Record<AcquisitionAnalyticsLeadStatus, string> = {
    [ACQUISITION_ANALYTICS_TYPE.LEAD_STATUS.NEW]: 'New',
    [ACQUISITION_ANALYTICS_TYPE.LEAD_STATUS.CONTACTED]: 'Contacted',
    [ACQUISITION_ANALYTICS_TYPE.LEAD_STATUS.QUALIFIED]: 'Qualified',
    [ACQUISITION_ANALYTICS_TYPE.LEAD_STATUS.CONVERTED]: 'Converted',
    [ACQUISITION_ANALYTICS_TYPE.LEAD_STATUS.LOST]: 'Lost',
    [ACQUISITION_ANALYTICS_TYPE.LEAD_STATUS.DISQUALIFIED]: 'Disqualified',
    [ACQUISITION_ANALYTICS_TYPE.LEAD_STATUS.NURTURING]: 'Nurturing',
  };
  return labels[status] || 'Unknown';
}

// Acquisition Analytics Lead Type Labels
export function getAcquisitionAnalyticsLeadTypeLabel(type: AcquisitionAnalyticsLeadType): string {
  const labels: Record<AcquisitionAnalyticsLeadType, string> = {
    [ACQUISITION_ANALYTICS_TYPE.LEAD_TYPES.HOT]: 'Hot',
    [ACQUISITION_ANALYTICS_TYPE.LEAD_TYPES.WARM]: 'Warm',
    [ACQUISITION_ANALYTICS_TYPE.LEAD_TYPES.COLD]: 'Cold',
    [ACQUISITION_ANALYTICS_TYPE.LEAD_TYPES.INFORMATION]: 'Information',
    [ACQUISITION_ANALYTICS_TYPE.LEAD_TYPES.DEMO]: 'Demo',
    [ACQUISITION_ANALYTICS_TYPE.LEAD_TYPES.TRIAL]: 'Trial',
  };
  return labels[type] || 'Unknown';
}

// Acquisition Analytics Acquisition Channel Labels
export function getAcquisitionAnalyticsAcquisitionChannelLabel(
  channel: AcquisitionAnalyticsAcquisitionChannel
): string {
  const labels: Record<AcquisitionAnalyticsAcquisitionChannel, string> = {
    [ACQUISITION_ANALYTICS_TYPE.ACQUISITION_CHANNELS.ORGANIC_SEARCH]: 'Organic Search',
    [ACQUISITION_ANALYTICS_TYPE.ACQUISITION_CHANNELS.PAID_SEARCH]: 'Paid Search',
    [ACQUISITION_ANALYTICS_TYPE.ACQUISITION_CHANNELS.SOCIAL_ORGANIC]: 'Social Organic',
    [ACQUISITION_ANALYTICS_TYPE.ACQUISITION_CHANNELS.SOCIAL_PAID]: 'Social Paid',
    [ACQUISITION_ANALYTICS_TYPE.ACQUISITION_CHANNELS.DISPLAY_ADS]: 'Display Ads',
    [ACQUISITION_ANALYTICS_TYPE.ACQUISITION_CHANNELS.VIDEO_ADS]: 'Video Ads',
    [ACQUISITION_ANALYTICS_TYPE.ACQUISITION_CHANNELS.EMAIL]: 'Email',
    [ACQUISITION_ANALYTICS_TYPE.ACQUISITION_CHANNELS.REFERRAL]: 'Referral',
    [ACQUISITION_ANALYTICS_TYPE.ACQUISITION_CHANNELS.DIRECT]: 'Direct',
    [ACQUISITION_ANALYTICS_TYPE.ACQUISITION_CHANNELS.AFFILIATE]: 'Affiliate',
    [ACQUISITION_ANALYTICS_TYPE.ACQUISITION_CHANNELS.INFLUENCER]: 'Influencer',
    [ACQUISITION_ANALYTICS_TYPE.ACQUISITION_CHANNELS.EVENT]: 'Event',
    [ACQUISITION_ANALYTICS_TYPE.ACQUISITION_CHANNELS.OTHER]: 'Other',
  };
  return labels[channel] || 'Unknown';
}

// Acquisition Analytics Acquisition Source Labels
export function getAcquisitionAnalyticsAcquisitionSourceLabel(
  source: AcquisitionAnalyticsAcquisitionSource
): string {
  const labels: Record<AcquisitionAnalyticsAcquisitionSource, string> = {
    [ACQUISITION_ANALYTICS_TYPE.ACQUISITION_SOURCES.GOOGLE]: 'Google',
    [ACQUISITION_ANALYTICS_TYPE.ACQUISITION_SOURCES.FACEBOOK]: 'Facebook',
    [ACQUISITION_ANALYTICS_TYPE.ACQUISITION_SOURCES.INSTAGRAM]: 'Instagram',
    [ACQUISITION_ANALYTICS_TYPE.ACQUISITION_SOURCES.TWITTER]: 'Twitter',
    [ACQUISITION_ANALYTICS_TYPE.ACQUISITION_SOURCES.LINKEDIN]: 'LinkedIn',
    [ACQUISITION_ANALYTICS_TYPE.ACQUISITION_SOURCES.YOUTUBE]: 'YouTube',
    [ACQUISITION_ANALYTICS_TYPE.ACQUISITION_SOURCES.TIKTOK]: 'TikTok',
    [ACQUISITION_ANALYTICS_TYPE.ACQUISITION_SOURCES.PINTEREST]: 'Pinterest',
    [ACQUISITION_ANALYTICS_TYPE.ACQUISITION_SOURCES.REDDIT]: 'Reddit',
    [ACQUISITION_ANALYTICS_TYPE.ACQUISITION_SOURCES.QUORA]: 'Quora',
    [ACQUISITION_ANALYTICS_TYPE.ACQUISITION_SOURCES.MEDIUM]: 'Medium',
    [ACQUISITION_ANALYTICS_TYPE.ACQUISITION_SOURCES.NEWSLETTER]: 'Newsletter',
    [ACQUISITION_ANALYTICS_TYPE.ACQUISITION_SOURCES.BLOG]: 'Blog',
    [ACQUISITION_ANALYTICS_TYPE.ACQUISITION_SOURCES.PODCAST]: 'Podcast',
    [ACQUISITION_ANALYTICS_TYPE.ACQUISITION_SOURCES.WEBINAR]: 'Webinar',
    [ACQUISITION_ANALYTICS_TYPE.ACQUISITION_SOURCES.TRADE_SHOW]: 'Trade Show',
    [ACQUISITION_ANALYTICS_TYPE.ACQUISITION_SOURCES.REFERRAL]: 'Referral',
    [ACQUISITION_ANALYTICS_TYPE.ACQUISITION_SOURCES.OTHER]: 'Other',
  };
  return labels[source] || 'Unknown';
}

// Acquisition Analytics Acquisition Medium Labels
export function getAcquisitionAnalyticsAcquisitionMediumLabel(
  medium: AcquisitionAnalyticsAcquisitionMedium
): string {
  const labels: Record<AcquisitionAnalyticsAcquisitionMedium, string> = {
    [ACQUISITION_ANALYTICS_TYPE.ACQUISITION_MEDIUMS.ORGANIC]: 'Organic',
    [ACQUISITION_ANALYTICS_TYPE.ACQUISITION_MEDIUMS.CPC]: 'CPC',
    [ACQUISITION_ANALYTICS_TYPE.ACQUISITION_MEDIUMS.CPM]: 'CPM',
    [ACQUISITION_ANALYTICS_TYPE.ACQUISITION_MEDIUMS.CPA]: 'CPA',
    [ACQUISITION_ANALYTICS_TYPE.ACQUISITION_MEDIUMS.CPL]: 'CPL',
    [ACQUISITION_ANALYTICS_TYPE.ACQUISITION_MEDIUMS.CPS]: 'CPS',
    [ACQUISITION_ANALYTICS_TYPE.ACQUISITION_MEDIUMS.SOCIAL]: 'Social',
    [ACQUISITION_ANALYTICS_TYPE.ACQUISITION_MEDIUMS.EMAIL]: 'Email',
    [ACQUISITION_ANALYTICS_TYPE.ACQUISITION_MEDIUMS.REFERRAL]: 'Referral',
    [ACQUISITION_ANALYTICS_TYPE.ACQUISITION_MEDIUMS.DISPLAY]: 'Display',
    [ACQUISITION_ANALYTICS_TYPE.ACQUISITION_MEDIUMS.VIDEO]: 'Video',
    [ACQUISITION_ANALYTICS_TYPE.ACQUISITION_MEDIUMS.NATIVE]: 'Native',
  };
  return labels[medium] || 'Unknown';
}

// Acquisition Analytics Funnel Stage Labels
export function getAcquisitionAnalyticsFunnelStageLabel(
  stage: AcquisitionAnalyticsFunnelStage
): string {
  const labels: Record<AcquisitionAnalyticsFunnelStage, string> = {
    [ACQUISITION_ANALYTICS_TYPE.FUNNEL_STAGES.AWARENESS]: 'Awareness',
    [ACQUISITION_ANALYTICS_TYPE.FUNNEL_STAGES.INTEREST]: 'Interest',
    [ACQUISITION_ANALYTICS_TYPE.FUNNEL_STAGES.CONSIDERATION]: 'Consideration',
    [ACQUISITION_ANALYTICS_TYPE.FUNNEL_STAGES.INTENT]: 'Intent',
    [ACQUISITION_ANALYTICS_TYPE.FUNNEL_STAGES.EVALUATION]: 'Evaluation',
    [ACQUISITION_ANALYTICS_TYPE.FUNNEL_STAGES.PURCHASE]: 'Purchase',
    [ACQUISITION_ANALYTICS_TYPE.FUNNEL_STAGES.RETENTION]: 'Retention',
  };
  return labels[stage] || 'Unknown';
}

// Acquisition Analytics CAC Category Labels
export function getAcquisitionAnalyticsCACCategoryLabel(
  category: AcquisitionAnalyticsCACCategory
): string {
  const labels: Record<AcquisitionAnalyticsCACCategory, string> = {
    [ACQUISITION_ANALYTICS_TYPE.CAC_CATEGORIES.VERY_LOW]: 'Very Low',
    [ACQUISITION_ANALYTICS_TYPE.CAC_CATEGORIES.LOW]: 'Low',
    [ACQUISITION_ANALYTICS_TYPE.CAC_CATEGORIES.MEDIUM]: 'Medium',
    [ACQUISITION_ANALYTICS_TYPE.CAC_CATEGORIES.HIGH]: 'High',
    [ACQUISITION_ANALYTICS_TYPE.CAC_CATEGORIES.VERY_HIGH]: 'Very High',
  };
  return labels[category] || 'Unknown';
}

// Acquisition Analytics ROI Category Labels
export function getAcquisitionAnalyticsROICategoryLabel(
  category: AcquisitionAnalyticsROICategory
): string {
  const labels: Record<AcquisitionAnalyticsROICategory, string> = {
    [ACQUISITION_ANALYTICS_TYPE.ROI_CATEGORIES.EXCELLENT]: 'Excellent',
    [ACQUISITION_ANALYTICS_TYPE.ROI_CATEGORIES.GOOD]: 'Good',
    [ACQUISITION_ANALYTICS_TYPE.ROI_CATEGORIES.AVERAGE]: 'Average',
    [ACQUISITION_ANALYTICS_TYPE.ROI_CATEGORIES.POOR]: 'Poor',
    [ACQUISITION_ANALYTICS_TYPE.ROI_CATEGORIES.NEGATIVE]: 'Negative',
  };
  return labels[category] || 'Unknown';
}

// Check if analysis is channel analysis
export function isAcquisitionAnalyticsChannelAnalysis(
  type: AcquisitionAnalyticsAnalysisType
): boolean {
  const channelTypes: AcquisitionAnalyticsAnalysisType[] = [
    ACQUISITION_ANALYTICS_TYPE.ANALYSIS_TYPES.CHANNEL_ANALYSIS,
    ACQUISITION_ANALYTICS_TYPE.ANALYSIS_TYPES.SOURCE_ANALYSIS,
    ACQUISITION_ANALYTICS_TYPE.ANALYSIS_TYPES.MEDIUM_ANALYSIS,
    ACQUISITION_ANALYTICS_TYPE.ANALYSIS_TYPES.CAMPAIGN_ANALYSIS,
  ];
  return channelTypes.includes(type);
}

// Check if analysis is customer analysis
export function isAcquisitionAnalyticsCustomerAnalysis(
  type: AcquisitionAnalyticsAnalysisType
): boolean {
  const customerTypes: AcquisitionAnalyticsAnalysisType[] = [
    ACQUISITION_ANALYTICS_TYPE.ANALYSIS_TYPES.CUSTOMER_ACQUISITION,
    ACQUISITION_ANALYTICS_TYPE.ANALYSIS_TYPES.LEAD_ANALYSIS,
    ACQUISITION_ANALYTICS_TYPE.ANALYSIS_TYPES.CONVERSION_ANALYSIS,
  ];
  return customerTypes.includes(type);
}

// Check if analysis is cost analysis
export function isAcquisitionAnalyticsCostAnalysis(
  type: AcquisitionAnalyticsAnalysisType
): boolean {
  const costTypes: AcquisitionAnalyticsAnalysisType[] = [
    ACQUISITION_ANALYTICS_TYPE.ANALYSIS_TYPES.COST_ANALYSIS,
    ACQUISITION_ANALYTICS_TYPE.ANALYSIS_TYPES.CAC_ANALYSIS,
    ACQUISITION_ANALYTICS_TYPE.ANALYSIS_TYPES.ROI_ANALYSIS,
  ];
  return costTypes.includes(type);
}

// Check if analysis is funnel analysis
export function isAcquisitionAnalyticsFunnelAnalysis(
  type: AcquisitionAnalyticsAnalysisType
): boolean {
  const funnelTypes: AcquisitionAnalyticsAnalysisType[] = [
    ACQUISITION_ANALYTICS_TYPE.ANALYSIS_TYPES.ACQUISITION_FUNNEL,
    ACQUISITION_ANALYTICS_TYPE.ANALYSIS_TYPES.CONVERSION_FUNNEL,
    ACQUISITION_ANALYTICS_TYPE.ANALYSIS_TYPES.DROPOFF_ANALYSIS,
  ];
  return funnelTypes.includes(type);
}

// Check if analysis is comparative
export function isAcquisitionAnalyticsComparative(type: AcquisitionAnalyticsAnalysisType): boolean {
  const comparativeTypes: AcquisitionAnalyticsAnalysisType[] = [
    ACQUISITION_ANALYTICS_TYPE.ANALYSIS_TYPES.COMPARATIVE,
    ACQUISITION_ANALYTICS_TYPE.ANALYSIS_TYPES.YEAR_OVER_YEAR,
    ACQUISITION_ANALYTICS_TYPE.ANALYSIS_TYPES.QUARTER_OVER_QUARTER,
    ACQUISITION_ANALYTICS_TYPE.ANALYSIS_TYPES.MONTH_OVER_MONTH,
  ];
  return comparativeTypes.includes(type);
}

// Check if analysis is predictive
export function isAcquisitionAnalyticsPredictive(type: AcquisitionAnalyticsAnalysisType): boolean {
  const predictiveTypes: AcquisitionAnalyticsAnalysisType[] = [
    ACQUISITION_ANALYTICS_TYPE.ANALYSIS_TYPES.PREDICTIVE,
    ACQUISITION_ANALYTICS_TYPE.ANALYSIS_TYPES.FORECAST,
    ACQUISITION_ANALYTICS_TYPE.ANALYSIS_TYPES.TREND,
  ];
  return predictiveTypes.includes(type);
}

// Get CAC category from value
export function getAcquisitionAnalyticsCACCategory(cac: number): AcquisitionAnalyticsCACCategory {
  if (cac < 10) return ACQUISITION_ANALYTICS_TYPE.CAC_CATEGORIES.VERY_LOW;
  if (cac < 50) return ACQUISITION_ANALYTICS_TYPE.CAC_CATEGORIES.LOW;
  if (cac < 100) return ACQUISITION_ANALYTICS_TYPE.CAC_CATEGORIES.MEDIUM;
  if (cac < 200) return ACQUISITION_ANALYTICS_TYPE.CAC_CATEGORIES.HIGH;
  return ACQUISITION_ANALYTICS_TYPE.CAC_CATEGORIES.VERY_HIGH;
}

// Get ROI category from percentage
export function getAcquisitionAnalyticsROICategory(roi: number): AcquisitionAnalyticsROICategory {
  if (roi > 50) return ACQUISITION_ANALYTICS_TYPE.ROI_CATEGORIES.EXCELLENT;
  if (roi > 20) return ACQUISITION_ANALYTICS_TYPE.ROI_CATEGORIES.GOOD;
  if (roi > 0) return ACQUISITION_ANALYTICS_TYPE.ROI_CATEGORIES.AVERAGE;
  if (roi > -20) return ACQUISITION_ANALYTICS_TYPE.ROI_CATEGORIES.POOR;
  return ACQUISITION_ANALYTICS_TYPE.ROI_CATEGORIES.NEGATIVE;
}
