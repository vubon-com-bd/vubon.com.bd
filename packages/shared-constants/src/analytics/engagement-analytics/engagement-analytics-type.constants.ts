/**
 * Engagement Analytics Type Constants
 * Types of engagement analytics data and analysis
 */

export const ENGAGEMENT_ANALYTICS_TYPE = {
  // Analysis Types
  ANALYSIS_TYPES: {
    // User Analysis
    USER_ENGAGEMENT: 'user_engagement',
    USER_BEHAVIOR: 'user_behavior',
    USER_JOURNEY: 'user_journey',

    // Session Analysis
    SESSION_ANALYSIS: 'session_analysis',
    SESSION_QUALITY: 'session_quality',
    SESSION_PATTERN: 'session_pattern',

    // Content Analysis
    CONTENT_ANALYSIS: 'content_analysis',
    CONTENT_PERFORMANCE: 'content_performance',
    CONTENT_POPULARITY: 'content_popularity',

    // Interaction Analysis
    INTERACTION_ANALYSIS: 'interaction_analysis',
    INTERACTION_PATTERN: 'interaction_pattern',

    // Social Analysis
    SOCIAL_ANALYSIS: 'social_analysis',
    SOCIAL_SENTIMENT: 'social_sentiment',

    // Time Analysis
    TIME_ANALYSIS: 'time_analysis',
    TREND_ANALYSIS: 'trend_analysis',
    SEASONAL_ANALYSIS: 'seasonal_analysis',

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
    USER_DATA: 'user_data',
    SESSION_DATA: 'session_data',
    CONTENT_DATA: 'content_data',
    INTERACTION_DATA: 'interaction_data',
    SOCIAL_DATA: 'social_data',
    TIME_SERIES: 'time_series',
    AGGREGATED: 'aggregated',
    RAW: 'raw',
    REALTIME: 'realtime',
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

  // Session Quality
  SESSION_QUALITY: {
    EXCELLENT: 'excellent',
    GOOD: 'good',
    AVERAGE: 'average',
    POOR: 'poor',
    VERY_POOR: 'very_poor',
  } as const,

  // Content Types
  CONTENT_TYPES: {
    ARTICLE: 'article',
    VIDEO: 'video',
    AUDIO: 'audio',
    IMAGE: 'image',
    INTERACTIVE: 'interactive',
    LIVE: 'live',
    PODCAST: 'podcast',
    WEBINAR: 'webinar',
    TUTORIAL: 'tutorial',
    REVIEW: 'review',
  } as const,

  // Interaction Types
  INTERACTION_TYPES: {
    CLICK: 'click',
    HOVER: 'hover',
    SCROLL: 'scroll',
    TAP: 'tap',
    SWIPE: 'swipe',
    ZOOM: 'zoom',
    DRAG: 'drag',
    DROP: 'drop',
    TYPE: 'type',
  } as const,

  // Social Types
  SOCIAL_TYPES: {
    SHARE: 'share',
    LIKE: 'like',
    COMMENT: 'comment',
    FOLLOW: 'follow',
    MENTION: 'mention',
    TAG: 'tag',
    REVIEW: 'review',
    RATING: 'rating',
  } as const,

  // User States
  USER_STATES: {
    ACTIVE: 'active',
    ENGAGED: 'engaged',
    DISENGAGED: 'disengaged',
    DORMANT: 'dormant',
    CHURNED: 'churned',
    INACTIVE: 'inactive',
  } as const,

  // Conversion Types
  CONVERSION_TYPES: {
    MICRO: 'micro',
    MACRO: 'macro',
    PRIMARY: 'primary',
    SECONDARY: 'secondary',
  } as const,

  // Engagement Funnel Stages
  FUNNEL_STAGES: {
    AWARENESS: 'awareness',
    INTEREST: 'interest',
    ENGAGEMENT: 'engagement',
    ACTION: 'action',
    CONVERSION: 'conversion',
    LOYALTY: 'loyalty',
    ADVOCACY: 'advocacy',
  } as const,
} as const;

// Engagement Analytics Analysis Types
export type EngagementAnalyticsAnalysisType =
  (typeof ENGAGEMENT_ANALYTICS_TYPE.ANALYSIS_TYPES)[keyof typeof ENGAGEMENT_ANALYTICS_TYPE.ANALYSIS_TYPES];

// Engagement Analytics Data Types
export type EngagementAnalyticsDataType =
  (typeof ENGAGEMENT_ANALYTICS_TYPE.DATA_TYPES)[keyof typeof ENGAGEMENT_ANALYTICS_TYPE.DATA_TYPES];

// Engagement Analytics Engagement Levels
export type EngagementAnalyticsEngagementLevel =
  (typeof ENGAGEMENT_ANALYTICS_TYPE.ENGAGEMENT_LEVELS)[keyof typeof ENGAGEMENT_ANALYTICS_TYPE.ENGAGEMENT_LEVELS];

// Engagement Analytics Session Quality
export type EngagementAnalyticsSessionQuality =
  (typeof ENGAGEMENT_ANALYTICS_TYPE.SESSION_QUALITY)[keyof typeof ENGAGEMENT_ANALYTICS_TYPE.SESSION_QUALITY];

// Engagement Analytics Content Types
export type EngagementAnalyticsContentType =
  (typeof ENGAGEMENT_ANALYTICS_TYPE.CONTENT_TYPES)[keyof typeof ENGAGEMENT_ANALYTICS_TYPE.CONTENT_TYPES];

// Engagement Analytics Interaction Types
export type EngagementAnalyticsInteractionType =
  (typeof ENGAGEMENT_ANALYTICS_TYPE.INTERACTION_TYPES)[keyof typeof ENGAGEMENT_ANALYTICS_TYPE.INTERACTION_TYPES];

// Engagement Analytics Social Types
export type EngagementAnalyticsSocialType =
  (typeof ENGAGEMENT_ANALYTICS_TYPE.SOCIAL_TYPES)[keyof typeof ENGAGEMENT_ANALYTICS_TYPE.SOCIAL_TYPES];

// Engagement Analytics User States
export type EngagementAnalyticsUserState =
  (typeof ENGAGEMENT_ANALYTICS_TYPE.USER_STATES)[keyof typeof ENGAGEMENT_ANALYTICS_TYPE.USER_STATES];

// Engagement Analytics Conversion Types
export type EngagementAnalyticsConversionType =
  (typeof ENGAGEMENT_ANALYTICS_TYPE.CONVERSION_TYPES)[keyof typeof ENGAGEMENT_ANALYTICS_TYPE.CONVERSION_TYPES];

// Engagement Analytics Funnel Stages
export type EngagementAnalyticsFunnelStage =
  (typeof ENGAGEMENT_ANALYTICS_TYPE.FUNNEL_STAGES)[keyof typeof ENGAGEMENT_ANALYTICS_TYPE.FUNNEL_STAGES];

// Engagement Analytics Analysis Type Labels
export function getEngagementAnalyticsAnalysisTypeLabel(
  type: EngagementAnalyticsAnalysisType
): string {
  const labels: Record<EngagementAnalyticsAnalysisType, string> = {
    [ENGAGEMENT_ANALYTICS_TYPE.ANALYSIS_TYPES.USER_ENGAGEMENT]: 'User Engagement',
    [ENGAGEMENT_ANALYTICS_TYPE.ANALYSIS_TYPES.USER_BEHAVIOR]: 'User Behavior',
    [ENGAGEMENT_ANALYTICS_TYPE.ANALYSIS_TYPES.USER_JOURNEY]: 'User Journey',
    [ENGAGEMENT_ANALYTICS_TYPE.ANALYSIS_TYPES.SESSION_ANALYSIS]: 'Session Analysis',
    [ENGAGEMENT_ANALYTICS_TYPE.ANALYSIS_TYPES.SESSION_QUALITY]: 'Session Quality',
    [ENGAGEMENT_ANALYTICS_TYPE.ANALYSIS_TYPES.SESSION_PATTERN]: 'Session Pattern',
    [ENGAGEMENT_ANALYTICS_TYPE.ANALYSIS_TYPES.CONTENT_ANALYSIS]: 'Content Analysis',
    [ENGAGEMENT_ANALYTICS_TYPE.ANALYSIS_TYPES.CONTENT_PERFORMANCE]: 'Content Performance',
    [ENGAGEMENT_ANALYTICS_TYPE.ANALYSIS_TYPES.CONTENT_POPULARITY]: 'Content Popularity',
    [ENGAGEMENT_ANALYTICS_TYPE.ANALYSIS_TYPES.INTERACTION_ANALYSIS]: 'Interaction Analysis',
    [ENGAGEMENT_ANALYTICS_TYPE.ANALYSIS_TYPES.INTERACTION_PATTERN]: 'Interaction Pattern',
    [ENGAGEMENT_ANALYTICS_TYPE.ANALYSIS_TYPES.SOCIAL_ANALYSIS]: 'Social Analysis',
    [ENGAGEMENT_ANALYTICS_TYPE.ANALYSIS_TYPES.SOCIAL_SENTIMENT]: 'Social Sentiment',
    [ENGAGEMENT_ANALYTICS_TYPE.ANALYSIS_TYPES.TIME_ANALYSIS]: 'Time Analysis',
    [ENGAGEMENT_ANALYTICS_TYPE.ANALYSIS_TYPES.TREND_ANALYSIS]: 'Trend Analysis',
    [ENGAGEMENT_ANALYTICS_TYPE.ANALYSIS_TYPES.SEASONAL_ANALYSIS]: 'Seasonal Analysis',
    [ENGAGEMENT_ANALYTICS_TYPE.ANALYSIS_TYPES.COMPARATIVE]: 'Comparative Analysis',
    [ENGAGEMENT_ANALYTICS_TYPE.ANALYSIS_TYPES.YEAR_OVER_YEAR]: 'Year Over Year',
    [ENGAGEMENT_ANALYTICS_TYPE.ANALYSIS_TYPES.QUARTER_OVER_QUARTER]: 'Quarter Over Quarter',
    [ENGAGEMENT_ANALYTICS_TYPE.ANALYSIS_TYPES.MONTH_OVER_MONTH]: 'Month Over Month',
    [ENGAGEMENT_ANALYTICS_TYPE.ANALYSIS_TYPES.PREDICTIVE]: 'Predictive Analysis',
    [ENGAGEMENT_ANALYTICS_TYPE.ANALYSIS_TYPES.FORECAST]: 'Forecast',
    [ENGAGEMENT_ANALYTICS_TYPE.ANALYSIS_TYPES.TREND]: 'Trend Analysis',
  };
  return labels[type] || 'Unknown';
}

// Engagement Analytics Data Type Labels
export function getEngagementAnalyticsDataTypeLabel(type: EngagementAnalyticsDataType): string {
  const labels: Record<EngagementAnalyticsDataType, string> = {
    [ENGAGEMENT_ANALYTICS_TYPE.DATA_TYPES.USER_DATA]: 'User Data',
    [ENGAGEMENT_ANALYTICS_TYPE.DATA_TYPES.SESSION_DATA]: 'Session Data',
    [ENGAGEMENT_ANALYTICS_TYPE.DATA_TYPES.CONTENT_DATA]: 'Content Data',
    [ENGAGEMENT_ANALYTICS_TYPE.DATA_TYPES.INTERACTION_DATA]: 'Interaction Data',
    [ENGAGEMENT_ANALYTICS_TYPE.DATA_TYPES.SOCIAL_DATA]: 'Social Data',
    [ENGAGEMENT_ANALYTICS_TYPE.DATA_TYPES.TIME_SERIES]: 'Time Series',
    [ENGAGEMENT_ANALYTICS_TYPE.DATA_TYPES.AGGREGATED]: 'Aggregated',
    [ENGAGEMENT_ANALYTICS_TYPE.DATA_TYPES.RAW]: 'Raw',
    [ENGAGEMENT_ANALYTICS_TYPE.DATA_TYPES.REALTIME]: 'Real-time',
  };
  return labels[type] || 'Unknown';
}

// Engagement Analytics Engagement Level Labels
export function getEngagementAnalyticsEngagementLevelLabel(
  level: EngagementAnalyticsEngagementLevel
): string {
  const labels: Record<EngagementAnalyticsEngagementLevel, string> = {
    [ENGAGEMENT_ANALYTICS_TYPE.ENGAGEMENT_LEVELS.VERY_HIGH]: 'Very High',
    [ENGAGEMENT_ANALYTICS_TYPE.ENGAGEMENT_LEVELS.HIGH]: 'High',
    [ENGAGEMENT_ANALYTICS_TYPE.ENGAGEMENT_LEVELS.MEDIUM]: 'Medium',
    [ENGAGEMENT_ANALYTICS_TYPE.ENGAGEMENT_LEVELS.LOW]: 'Low',
    [ENGAGEMENT_ANALYTICS_TYPE.ENGAGEMENT_LEVELS.VERY_LOW]: 'Very Low',
    [ENGAGEMENT_ANALYTICS_TYPE.ENGAGEMENT_LEVELS.NONE]: 'None',
  };
  return labels[level] || 'Unknown';
}

// Engagement Analytics Session Quality Labels
export function getEngagementAnalyticsSessionQualityLabel(
  quality: EngagementAnalyticsSessionQuality
): string {
  const labels: Record<EngagementAnalyticsSessionQuality, string> = {
    [ENGAGEMENT_ANALYTICS_TYPE.SESSION_QUALITY.EXCELLENT]: 'Excellent',
    [ENGAGEMENT_ANALYTICS_TYPE.SESSION_QUALITY.GOOD]: 'Good',
    [ENGAGEMENT_ANALYTICS_TYPE.SESSION_QUALITY.AVERAGE]: 'Average',
    [ENGAGEMENT_ANALYTICS_TYPE.SESSION_QUALITY.POOR]: 'Poor',
    [ENGAGEMENT_ANALYTICS_TYPE.SESSION_QUALITY.VERY_POOR]: 'Very Poor',
  };
  return labels[quality] || 'Unknown';
}

// Engagement Analytics Content Type Labels
export function getEngagementAnalyticsContentTypeLabel(
  type: EngagementAnalyticsContentType
): string {
  const labels: Record<EngagementAnalyticsContentType, string> = {
    [ENGAGEMENT_ANALYTICS_TYPE.CONTENT_TYPES.ARTICLE]: 'Article',
    [ENGAGEMENT_ANALYTICS_TYPE.CONTENT_TYPES.VIDEO]: 'Video',
    [ENGAGEMENT_ANALYTICS_TYPE.CONTENT_TYPES.AUDIO]: 'Audio',
    [ENGAGEMENT_ANALYTICS_TYPE.CONTENT_TYPES.IMAGE]: 'Image',
    [ENGAGEMENT_ANALYTICS_TYPE.CONTENT_TYPES.INTERACTIVE]: 'Interactive',
    [ENGAGEMENT_ANALYTICS_TYPE.CONTENT_TYPES.LIVE]: 'Live',
    [ENGAGEMENT_ANALYTICS_TYPE.CONTENT_TYPES.PODCAST]: 'Podcast',
    [ENGAGEMENT_ANALYTICS_TYPE.CONTENT_TYPES.WEBINAR]: 'Webinar',
    [ENGAGEMENT_ANALYTICS_TYPE.CONTENT_TYPES.TUTORIAL]: 'Tutorial',
    [ENGAGEMENT_ANALYTICS_TYPE.CONTENT_TYPES.REVIEW]: 'Review',
  };
  return labels[type] || 'Unknown';
}

// Engagement Analytics Interaction Type Labels
export function getEngagementAnalyticsInteractionTypeLabel(
  type: EngagementAnalyticsInteractionType
): string {
  const labels: Record<EngagementAnalyticsInteractionType, string> = {
    [ENGAGEMENT_ANALYTICS_TYPE.INTERACTION_TYPES.CLICK]: 'Click',
    [ENGAGEMENT_ANALYTICS_TYPE.INTERACTION_TYPES.HOVER]: 'Hover',
    [ENGAGEMENT_ANALYTICS_TYPE.INTERACTION_TYPES.SCROLL]: 'Scroll',
    [ENGAGEMENT_ANALYTICS_TYPE.INTERACTION_TYPES.TAP]: 'Tap',
    [ENGAGEMENT_ANALYTICS_TYPE.INTERACTION_TYPES.SWIPE]: 'Swipe',
    [ENGAGEMENT_ANALYTICS_TYPE.INTERACTION_TYPES.ZOOM]: 'Zoom',
    [ENGAGEMENT_ANALYTICS_TYPE.INTERACTION_TYPES.DRAG]: 'Drag',
    [ENGAGEMENT_ANALYTICS_TYPE.INTERACTION_TYPES.DROP]: 'Drop',
    [ENGAGEMENT_ANALYTICS_TYPE.INTERACTION_TYPES.TYPE]: 'Type',
  };
  return labels[type] || 'Unknown';
}

// Engagement Analytics Social Type Labels
export function getEngagementAnalyticsSocialTypeLabel(type: EngagementAnalyticsSocialType): string {
  const labels: Record<EngagementAnalyticsSocialType, string> = {
    [ENGAGEMENT_ANALYTICS_TYPE.SOCIAL_TYPES.SHARE]: 'Share',
    [ENGAGEMENT_ANALYTICS_TYPE.SOCIAL_TYPES.LIKE]: 'Like',
    [ENGAGEMENT_ANALYTICS_TYPE.SOCIAL_TYPES.COMMENT]: 'Comment',
    [ENGAGEMENT_ANALYTICS_TYPE.SOCIAL_TYPES.FOLLOW]: 'Follow',
    [ENGAGEMENT_ANALYTICS_TYPE.SOCIAL_TYPES.MENTION]: 'Mention',
    [ENGAGEMENT_ANALYTICS_TYPE.SOCIAL_TYPES.TAG]: 'Tag',
    [ENGAGEMENT_ANALYTICS_TYPE.SOCIAL_TYPES.REVIEW]: 'Review',
    [ENGAGEMENT_ANALYTICS_TYPE.SOCIAL_TYPES.RATING]: 'Rating',
  };
  return labels[type] || 'Unknown';
}

// Engagement Analytics User State Labels
export function getEngagementAnalyticsUserStateLabel(state: EngagementAnalyticsUserState): string {
  const labels: Record<EngagementAnalyticsUserState, string> = {
    [ENGAGEMENT_ANALYTICS_TYPE.USER_STATES.ACTIVE]: 'Active',
    [ENGAGEMENT_ANALYTICS_TYPE.USER_STATES.ENGAGED]: 'Engaged',
    [ENGAGEMENT_ANALYTICS_TYPE.USER_STATES.DISENGAGED]: 'Disengaged',
    [ENGAGEMENT_ANALYTICS_TYPE.USER_STATES.DORMANT]: 'Dormant',
    [ENGAGEMENT_ANALYTICS_TYPE.USER_STATES.CHURNED]: 'Churned',
    [ENGAGEMENT_ANALYTICS_TYPE.USER_STATES.INACTIVE]: 'Inactive',
  };
  return labels[state] || 'Unknown';
}

// Engagement Analytics Conversion Type Labels
export function getEngagementAnalyticsConversionTypeLabel(
  type: EngagementAnalyticsConversionType
): string {
  const labels: Record<EngagementAnalyticsConversionType, string> = {
    [ENGAGEMENT_ANALYTICS_TYPE.CONVERSION_TYPES.MICRO]: 'Micro',
    [ENGAGEMENT_ANALYTICS_TYPE.CONVERSION_TYPES.MACRO]: 'Macro',
    [ENGAGEMENT_ANALYTICS_TYPE.CONVERSION_TYPES.PRIMARY]: 'Primary',
    [ENGAGEMENT_ANALYTICS_TYPE.CONVERSION_TYPES.SECONDARY]: 'Secondary',
  };
  return labels[type] || 'Unknown';
}

// Engagement Analytics Funnel Stage Labels
export function getEngagementAnalyticsFunnelStageLabel(
  stage: EngagementAnalyticsFunnelStage
): string {
  const labels: Record<EngagementAnalyticsFunnelStage, string> = {
    [ENGAGEMENT_ANALYTICS_TYPE.FUNNEL_STAGES.AWARENESS]: 'Awareness',
    [ENGAGEMENT_ANALYTICS_TYPE.FUNNEL_STAGES.INTEREST]: 'Interest',
    [ENGAGEMENT_ANALYTICS_TYPE.FUNNEL_STAGES.ENGAGEMENT]: 'Engagement',
    [ENGAGEMENT_ANALYTICS_TYPE.FUNNEL_STAGES.ACTION]: 'Action',
    [ENGAGEMENT_ANALYTICS_TYPE.FUNNEL_STAGES.CONVERSION]: 'Conversion',
    [ENGAGEMENT_ANALYTICS_TYPE.FUNNEL_STAGES.LOYALTY]: 'Loyalty',
    [ENGAGEMENT_ANALYTICS_TYPE.FUNNEL_STAGES.ADVOCACY]: 'Advocacy',
  };
  return labels[stage] || 'Unknown';
}

// Check if analysis is user analysis
export function isEngagementAnalyticsUserAnalysis(type: EngagementAnalyticsAnalysisType): boolean {
  const userTypes: EngagementAnalyticsAnalysisType[] = [
    ENGAGEMENT_ANALYTICS_TYPE.ANALYSIS_TYPES.USER_ENGAGEMENT,
    ENGAGEMENT_ANALYTICS_TYPE.ANALYSIS_TYPES.USER_BEHAVIOR,
    ENGAGEMENT_ANALYTICS_TYPE.ANALYSIS_TYPES.USER_JOURNEY,
  ];
  return userTypes.includes(type);
}

// Check if analysis is session analysis
export function isEngagementAnalyticsSessionAnalysis(
  type: EngagementAnalyticsAnalysisType
): boolean {
  const sessionTypes: EngagementAnalyticsAnalysisType[] = [
    ENGAGEMENT_ANALYTICS_TYPE.ANALYSIS_TYPES.SESSION_ANALYSIS,
    ENGAGEMENT_ANALYTICS_TYPE.ANALYSIS_TYPES.SESSION_QUALITY,
    ENGAGEMENT_ANALYTICS_TYPE.ANALYSIS_TYPES.SESSION_PATTERN,
  ];
  return sessionTypes.includes(type);
}

// Check if analysis is content analysis
export function isEngagementAnalyticsContentAnalysis(
  type: EngagementAnalyticsAnalysisType
): boolean {
  const contentTypes: EngagementAnalyticsAnalysisType[] = [
    ENGAGEMENT_ANALYTICS_TYPE.ANALYSIS_TYPES.CONTENT_ANALYSIS,
    ENGAGEMENT_ANALYTICS_TYPE.ANALYSIS_TYPES.CONTENT_PERFORMANCE,
    ENGAGEMENT_ANALYTICS_TYPE.ANALYSIS_TYPES.CONTENT_POPULARITY,
  ];
  return contentTypes.includes(type);
}

// Check if analysis is comparative
export function isEngagementAnalyticsComparative(type: EngagementAnalyticsAnalysisType): boolean {
  const comparativeTypes: EngagementAnalyticsAnalysisType[] = [
    ENGAGEMENT_ANALYTICS_TYPE.ANALYSIS_TYPES.COMPARATIVE,
    ENGAGEMENT_ANALYTICS_TYPE.ANALYSIS_TYPES.YEAR_OVER_YEAR,
    ENGAGEMENT_ANALYTICS_TYPE.ANALYSIS_TYPES.QUARTER_OVER_QUARTER,
    ENGAGEMENT_ANALYTICS_TYPE.ANALYSIS_TYPES.MONTH_OVER_MONTH,
  ];
  return comparativeTypes.includes(type);
}

// Check if analysis is predictive
export function isEngagementAnalyticsPredictive(type: EngagementAnalyticsAnalysisType): boolean {
  const predictiveTypes: EngagementAnalyticsAnalysisType[] = [
    ENGAGEMENT_ANALYTICS_TYPE.ANALYSIS_TYPES.PREDICTIVE,
    ENGAGEMENT_ANALYTICS_TYPE.ANALYSIS_TYPES.FORECAST,
    ENGAGEMENT_ANALYTICS_TYPE.ANALYSIS_TYPES.TREND,
  ];
  return predictiveTypes.includes(type);
}

// Get engagement level from score
export function getEngagementAnalyticsEngagementLevel(
  score: number
): EngagementAnalyticsEngagementLevel {
  if (score > 0.9) return ENGAGEMENT_ANALYTICS_TYPE.ENGAGEMENT_LEVELS.VERY_HIGH;
  if (score > 0.7) return ENGAGEMENT_ANALYTICS_TYPE.ENGAGEMENT_LEVELS.HIGH;
  if (score > 0.5) return ENGAGEMENT_ANALYTICS_TYPE.ENGAGEMENT_LEVELS.MEDIUM;
  if (score > 0.3) return ENGAGEMENT_ANALYTICS_TYPE.ENGAGEMENT_LEVELS.LOW;
  if (score > 0.01) return ENGAGEMENT_ANALYTICS_TYPE.ENGAGEMENT_LEVELS.VERY_LOW;
  return ENGAGEMENT_ANALYTICS_TYPE.ENGAGEMENT_LEVELS.NONE;
}

// Get session quality from metrics
export function getEngagementAnalyticsSessionQuality(
  duration: number,
  depth: number,
  interactions: number
): EngagementAnalyticsSessionQuality {
  if (duration > 300 && depth > 5 && interactions > 10) {
    return ENGAGEMENT_ANALYTICS_TYPE.SESSION_QUALITY.EXCELLENT;
  }
  if (duration > 180 && depth > 3 && interactions > 5) {
    return ENGAGEMENT_ANALYTICS_TYPE.SESSION_QUALITY.GOOD;
  }
  if (duration > 60 && depth > 1 && interactions > 1) {
    return ENGAGEMENT_ANALYTICS_TYPE.SESSION_QUALITY.AVERAGE;
  }
  if (duration > 30 && depth > 0 && interactions > 0) {
    return ENGAGEMENT_ANALYTICS_TYPE.SESSION_QUALITY.POOR;
  }
  return ENGAGEMENT_ANALYTICS_TYPE.SESSION_QUALITY.VERY_POOR;
}
