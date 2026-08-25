/**
 * Content Analytics Type Constants
 * Types and classifications of content analytics
 */

export const CONTENT_ANALYTICS_TYPE = {
  // Analytics Categories
  CATEGORIES: {
    PERFORMANCE: 'performance',
    ENGAGEMENT: 'engagement',
    REACH: 'reach',
    CONVERSION: 'conversion',
    RETENTION: 'retention',
    GROWTH: 'growth',
    AUDIENCE: 'audience',
    CONTENT: 'content',
    CHANNEL: 'channel',
    CUSTOM: 'custom',
  } as const,

  // Analytics Sub-Types
  SUB_TYPES: {
    // Performance
    SPEED: 'speed',
    AVAILABILITY: 'availability',
    RESPONSE_TIME: 'response_time',

    // Engagement
    TIME_ON_PAGE: 'time_on_page',
    SCROLL_DEPTH: 'scroll_depth',
    INTERACTIONS: 'interactions',

    // Reach
    IMPRESSIONS: 'impressions',
    REACH: 'reach',
    FREQUENCY: 'frequency',

    // Conversion
    GOAL_COMPLETION: 'goal_completion',
    FUNNEL: 'funnel',
    ATTRIBUTION: 'attribution',

    // Retention
    RETURN_RATE: 'return_rate',
    LOYALTY: 'loyalty',
    CHURN: 'churn',

    // Growth
    NEW_USERS: 'new_users',
    GROWTH_RATE: 'growth_rate',
    VIRALITY: 'virality',

    // Audience
    DEMOGRAPHICS: 'demographics',
    INTERESTS: 'interests',
    BEHAVIOR: 'behavior',

    // Content
    POPULARITY: 'popularity',
    PERFORMANCE: 'performance',
    RELEVANCE: 'relevance',

    // Channel
    SOCIAL: 'social',
    EMAIL: 'email',
    DIRECT: 'direct',
    REFERRAL: 'referral',

    // Custom
    CUSTOM: 'custom',
  } as const,

  // Analytics Scopes
  SCOPES: {
    GLOBAL: 'global',
    REGIONAL: 'regional',
    LOCAL: 'local',
    CONTENT: 'content',
    CHANNEL: 'channel',
    CAMPAIGN: 'campaign',
    CUSTOM: 'custom',
  } as const,

  // Analytics Frequencies
  FREQUENCIES: {
    REALTIME: 'realtime',
    HOURLY: 'hourly',
    DAILY: 'daily',
    WEEKLY: 'weekly',
    MONTHLY: 'monthly',
    QUARTERLY: 'quarterly',
    CUSTOM: 'custom',
  } as const,

  // Analytics Quality
  QUALITY: {
    ESTIMATED: 'estimated',
    ACCURATE: 'accurate',
    VERIFIED: 'verified',
    CUSTOM: 'custom',
  } as const,

  // Analytics Sources
  SOURCES: {
    INTERNAL: 'internal',
    EXTERNAL: 'external',
    THIRD_PARTY: 'third_party',
    CUSTOM: 'custom',
  } as const,

  // Analytics Confidence Levels
  CONFIDENCE: {
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high',
    VERY_HIGH: 'very_high',
  } as const,
} as const;

// Analytics Categories
export type ContentAnalyticsTypeCategory =
  (typeof CONTENT_ANALYTICS_TYPE.CATEGORIES)[keyof typeof CONTENT_ANALYTICS_TYPE.CATEGORIES];

// Analytics Sub-Types
export type ContentAnalyticsTypeSubType =
  (typeof CONTENT_ANALYTICS_TYPE.SUB_TYPES)[keyof typeof CONTENT_ANALYTICS_TYPE.SUB_TYPES];

// Analytics Scopes
export type ContentAnalyticsTypeScope =
  (typeof CONTENT_ANALYTICS_TYPE.SCOPES)[keyof typeof CONTENT_ANALYTICS_TYPE.SCOPES];

// Analytics Frequencies
export type ContentAnalyticsTypeFrequency =
  (typeof CONTENT_ANALYTICS_TYPE.FREQUENCIES)[keyof typeof CONTENT_ANALYTICS_TYPE.FREQUENCIES];

// Analytics Quality
export type ContentAnalyticsTypeQuality =
  (typeof CONTENT_ANALYTICS_TYPE.QUALITY)[keyof typeof CONTENT_ANALYTICS_TYPE.QUALITY];

// Analytics Sources
export type ContentAnalyticsTypeSource =
  (typeof CONTENT_ANALYTICS_TYPE.SOURCES)[keyof typeof CONTENT_ANALYTICS_TYPE.SOURCES];

// Analytics Confidence Levels
export type ContentAnalyticsTypeConfidence =
  (typeof CONTENT_ANALYTICS_TYPE.CONFIDENCE)[keyof typeof CONTENT_ANALYTICS_TYPE.CONFIDENCE];

// Utility Functions
export function contentAnalyticsTypeGetCategoryLabel(
  category: ContentAnalyticsTypeCategory
): string {
  const labels: Record<ContentAnalyticsTypeCategory, string> = {
    [CONTENT_ANALYTICS_TYPE.CATEGORIES.PERFORMANCE]: 'Performance Analytics',
    [CONTENT_ANALYTICS_TYPE.CATEGORIES.ENGAGEMENT]: 'Engagement Analytics',
    [CONTENT_ANALYTICS_TYPE.CATEGORIES.REACH]: 'Reach Analytics',
    [CONTENT_ANALYTICS_TYPE.CATEGORIES.CONVERSION]: 'Conversion Analytics',
    [CONTENT_ANALYTICS_TYPE.CATEGORIES.RETENTION]: 'Retention Analytics',
    [CONTENT_ANALYTICS_TYPE.CATEGORIES.GROWTH]: 'Growth Analytics',
    [CONTENT_ANALYTICS_TYPE.CATEGORIES.AUDIENCE]: 'Audience Analytics',
    [CONTENT_ANALYTICS_TYPE.CATEGORIES.CONTENT]: 'Content Analytics',
    [CONTENT_ANALYTICS_TYPE.CATEGORIES.CHANNEL]: 'Channel Analytics',
    [CONTENT_ANALYTICS_TYPE.CATEGORIES.CUSTOM]: 'Custom Analytics',
  };
  return labels[category] || 'Unknown Category';
}

export function contentAnalyticsTypeGetSubTypeLabel(subType: ContentAnalyticsTypeSubType): string {
  const labels: Record<ContentAnalyticsTypeSubType, string> = {
    // Performance
    [CONTENT_ANALYTICS_TYPE.SUB_TYPES.SPEED]: 'Speed',
    [CONTENT_ANALYTICS_TYPE.SUB_TYPES.AVAILABILITY]: 'Availability',
    [CONTENT_ANALYTICS_TYPE.SUB_TYPES.RESPONSE_TIME]: 'Response Time',

    // Engagement
    [CONTENT_ANALYTICS_TYPE.SUB_TYPES.TIME_ON_PAGE]: 'Time on Page',
    [CONTENT_ANALYTICS_TYPE.SUB_TYPES.SCROLL_DEPTH]: 'Scroll Depth',
    [CONTENT_ANALYTICS_TYPE.SUB_TYPES.INTERACTIONS]: 'Interactions',

    // Reach
    [CONTENT_ANALYTICS_TYPE.SUB_TYPES.IMPRESSIONS]: 'Impressions',
    [CONTENT_ANALYTICS_TYPE.SUB_TYPES.REACH]: 'Reach',
    [CONTENT_ANALYTICS_TYPE.SUB_TYPES.FREQUENCY]: 'Frequency',

    // Conversion
    [CONTENT_ANALYTICS_TYPE.SUB_TYPES.GOAL_COMPLETION]: 'Goal Completion',
    [CONTENT_ANALYTICS_TYPE.SUB_TYPES.FUNNEL]: 'Funnel Analysis',
    [CONTENT_ANALYTICS_TYPE.SUB_TYPES.ATTRIBUTION]: 'Attribution',

    // Retention
    [CONTENT_ANALYTICS_TYPE.SUB_TYPES.RETURN_RATE]: 'Return Rate',
    [CONTENT_ANALYTICS_TYPE.SUB_TYPES.LOYALTY]: 'Loyalty',
    [CONTENT_ANALYTICS_TYPE.SUB_TYPES.CHURN]: 'Churn',

    // Growth
    [CONTENT_ANALYTICS_TYPE.SUB_TYPES.NEW_USERS]: 'New Users',
    [CONTENT_ANALYTICS_TYPE.SUB_TYPES.GROWTH_RATE]: 'Growth Rate',
    [CONTENT_ANALYTICS_TYPE.SUB_TYPES.VIRALITY]: 'Virality',

    // Audience
    [CONTENT_ANALYTICS_TYPE.SUB_TYPES.DEMOGRAPHICS]: 'Demographics',
    [CONTENT_ANALYTICS_TYPE.SUB_TYPES.INTERESTS]: 'Interests',
    [CONTENT_ANALYTICS_TYPE.SUB_TYPES.BEHAVIOR]: 'Behavior',

    // Content
    [CONTENT_ANALYTICS_TYPE.SUB_TYPES.POPULARITY]: 'Popularity',
    [CONTENT_ANALYTICS_TYPE.SUB_TYPES.PERFORMANCE]: 'Content Performance',
    [CONTENT_ANALYTICS_TYPE.SUB_TYPES.RELEVANCE]: 'Relevance',

    // Channel
    [CONTENT_ANALYTICS_TYPE.SUB_TYPES.SOCIAL]: 'Social Media',
    [CONTENT_ANALYTICS_TYPE.SUB_TYPES.EMAIL]: 'Email',
    [CONTENT_ANALYTICS_TYPE.SUB_TYPES.DIRECT]: 'Direct Traffic',
    [CONTENT_ANALYTICS_TYPE.SUB_TYPES.REFERRAL]: 'Referral',

    // Custom
    [CONTENT_ANALYTICS_TYPE.SUB_TYPES.CUSTOM]: 'Custom Sub-Type',
  };
  return labels[subType] || 'Unknown Sub-Type';
}

export function contentAnalyticsTypeGetScopeLabel(scope: ContentAnalyticsTypeScope): string {
  const labels: Record<ContentAnalyticsTypeScope, string> = {
    [CONTENT_ANALYTICS_TYPE.SCOPES.GLOBAL]: 'Global',
    [CONTENT_ANALYTICS_TYPE.SCOPES.REGIONAL]: 'Regional',
    [CONTENT_ANALYTICS_TYPE.SCOPES.LOCAL]: 'Local',
    [CONTENT_ANALYTICS_TYPE.SCOPES.CONTENT]: 'Content Level',
    [CONTENT_ANALYTICS_TYPE.SCOPES.CHANNEL]: 'Channel Level',
    [CONTENT_ANALYTICS_TYPE.SCOPES.CAMPAIGN]: 'Campaign Level',
    [CONTENT_ANALYTICS_TYPE.SCOPES.CUSTOM]: 'Custom Scope',
  };
  return labels[scope] || 'Unknown Scope';
}

export function contentAnalyticsTypeGetFrequencyLabel(
  frequency: ContentAnalyticsTypeFrequency
): string {
  const labels: Record<ContentAnalyticsTypeFrequency, string> = {
    [CONTENT_ANALYTICS_TYPE.FREQUENCIES.REALTIME]: 'Real-time',
    [CONTENT_ANALYTICS_TYPE.FREQUENCIES.HOURLY]: 'Hourly',
    [CONTENT_ANALYTICS_TYPE.FREQUENCIES.DAILY]: 'Daily',
    [CONTENT_ANALYTICS_TYPE.FREQUENCIES.WEEKLY]: 'Weekly',
    [CONTENT_ANALYTICS_TYPE.FREQUENCIES.MONTHLY]: 'Monthly',
    [CONTENT_ANALYTICS_TYPE.FREQUENCIES.QUARTERLY]: 'Quarterly',
    [CONTENT_ANALYTICS_TYPE.FREQUENCIES.CUSTOM]: 'Custom Frequency',
  };
  return labels[frequency] || 'Unknown Frequency';
}

export function contentAnalyticsTypeGetQualityLabel(quality: ContentAnalyticsTypeQuality): string {
  const labels: Record<ContentAnalyticsTypeQuality, string> = {
    [CONTENT_ANALYTICS_TYPE.QUALITY.ESTIMATED]: 'Estimated',
    [CONTENT_ANALYTICS_TYPE.QUALITY.ACCURATE]: 'Accurate',
    [CONTENT_ANALYTICS_TYPE.QUALITY.VERIFIED]: 'Verified',
    [CONTENT_ANALYTICS_TYPE.QUALITY.CUSTOM]: 'Custom Quality',
  };
  return labels[quality] || 'Unknown Quality';
}

export function contentAnalyticsTypeGetSourceLabel(source: ContentAnalyticsTypeSource): string {
  const labels: Record<ContentAnalyticsTypeSource, string> = {
    [CONTENT_ANALYTICS_TYPE.SOURCES.INTERNAL]: 'Internal',
    [CONTENT_ANALYTICS_TYPE.SOURCES.EXTERNAL]: 'External',
    [CONTENT_ANALYTICS_TYPE.SOURCES.THIRD_PARTY]: 'Third-Party',
    [CONTENT_ANALYTICS_TYPE.SOURCES.CUSTOM]: 'Custom Source',
  };
  return labels[source] || 'Unknown Source';
}

export function contentAnalyticsTypeGetConfidenceLabel(
  confidence: ContentAnalyticsTypeConfidence
): string {
  const labels: Record<ContentAnalyticsTypeConfidence, string> = {
    [CONTENT_ANALYTICS_TYPE.CONFIDENCE.LOW]: 'Low Confidence',
    [CONTENT_ANALYTICS_TYPE.CONFIDENCE.MEDIUM]: 'Medium Confidence',
    [CONTENT_ANALYTICS_TYPE.CONFIDENCE.HIGH]: 'High Confidence',
    [CONTENT_ANALYTICS_TYPE.CONFIDENCE.VERY_HIGH]: 'Very High Confidence',
  };
  return labels[confidence] || 'Unknown Confidence';
}

export function contentAnalyticsTypeIsValidCategory(
  category: string
): category is ContentAnalyticsTypeCategory {
  return Object.values(CONTENT_ANALYTICS_TYPE.CATEGORIES).includes(
    category as ContentAnalyticsTypeCategory
  );
}

export function contentAnalyticsTypeIsValidScope(
  scope: string
): scope is ContentAnalyticsTypeScope {
  return Object.values(CONTENT_ANALYTICS_TYPE.SCOPES).includes(scope as ContentAnalyticsTypeScope);
}

export function contentAnalyticsTypeIsValidFrequency(
  frequency: string
): frequency is ContentAnalyticsTypeFrequency {
  return Object.values(CONTENT_ANALYTICS_TYPE.FREQUENCIES).includes(
    frequency as ContentAnalyticsTypeFrequency
  );
}
