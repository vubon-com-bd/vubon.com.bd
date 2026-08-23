/**
 * Engagement Analytics Metric Constants
 * Metrics for measuring user engagement and interaction
 */

export const ENGAGEMENT_ANALYTICS_METRIC = {
  // User Metrics
  USER_METRICS: {
    ACTIVE_USERS: 'active_users',
    ENGAGED_USERS: 'engaged_users',
    DISENGAGED_USERS: 'disengaged_users',
    USER_ENGAGEMENT_RATE: 'user_engagement_rate',
    USER_RETENTION_RATE: 'user_retention_rate',
    USER_CHURN_RATE: 'user_churn_rate',
    USER_ACTIVITY_SCORE: 'user_activity_score',
  } as const,

  // Session Metrics
  SESSION_METRICS: {
    TOTAL_SESSIONS: 'total_sessions',
    AVG_SESSION_DURATION: 'avg_session_duration',
    AVG_SESSION_DEPTH: 'avg_session_depth',
    SESSIONS_PER_USER: 'sessions_per_user',
    SESSION_RETENTION: 'session_retention',
    SESSION_QUALITY_SCORE: 'session_quality_score',
  } as const,

  // Content Metrics
  CONTENT_METRICS: {
    TOTAL_VIEWS: 'total_views',
    UNIQUE_VIEWS: 'unique_views',
    AVG_VIEW_DURATION: 'avg_view_duration',
    VIEW_COMPLETION_RATE: 'view_completion_rate',
    CONTENT_ENGAGEMENT_RATE: 'content_engagement_rate',
    CONTENT_POPULARITY_SCORE: 'content_popularity_score',
  } as const,

  // Interaction Metrics
  INTERACTION_METRICS: {
    TOTAL_INTERACTIONS: 'total_interactions',
    AVG_INTERACTIONS_PER_SESSION: 'avg_interactions_per_session',
    INTERACTION_RATE: 'interaction_rate',
    INTERACTION_DEPTH: 'interaction_depth',
    CLICK_THROUGH_RATE: 'click_through_rate',
  } as const,

  // Social Metrics
  SOCIAL_METRICS: {
    TOTAL_SHARES: 'total_shares',
    TOTAL_LIKES: 'total_likes',
    TOTAL_COMMENTS: 'total_comments',
    SOCIAL_ENGAGEMENT_RATE: 'social_engagement_rate',
    SOCIAL_REACH: 'social_reach',
    SOCIAL_SENTIMENT_SCORE: 'social_sentiment_score',
  } as const,

  // Conversion Metrics
  CONVERSION_METRICS: {
    MICRO_CONVERSIONS: 'micro_conversions',
    MACRO_CONVERSIONS: 'macro_conversions',
    CONVERSION_RATE: 'conversion_rate',
    CONVERSION_VALUE: 'conversion_value',
    GOAL_COMPLETION_RATE: 'goal_completion_rate',
  } as const,

  // Milestone Metrics
  MILESTONE_METRICS: {
    MILESTONES_ACHIEVED: 'milestones_achieved',
    LEVEL_UP_RATE: 'level_up_rate',
    BADGE_EARN_RATE: 'badge_earn_rate',
    ACHIEVEMENT_SCORE: 'achievement_score',
  } as const,

  // Comparison Metrics
  COMPARISON_METRICS: {
    YEAR_OVER_YEAR: 'year_over_year',
    QUARTER_OVER_QUARTER: 'quarter_over_quarter',
    MONTH_OVER_MONTH: 'month_over_month',
    PERIOD_COMPARISON: 'period_comparison',
    SEGMENT_COMPARISON: 'segment_comparison',
    CONTENT_COMPARISON: 'content_comparison',
  } as const,

  // Metric Categories
  CATEGORIES: {
    USER: 'user',
    SESSION: 'session',
    CONTENT: 'content',
    INTERACTION: 'interaction',
    SOCIAL: 'social',
    CONVERSION: 'conversion',
    MILESTONE: 'milestone',
    COMPARISON: 'comparison',
  } as const,

  // Metric Types
  TYPES: {
    ABSOLUTE: 'absolute',
    AVERAGE: 'average',
    PERCENTAGE: 'percentage',
    RATIO: 'ratio',
    RATE: 'rate',
    SCORE: 'score',
    DURATION: 'duration',
  } as const,

  // Metric Formats
  FORMATS: {
    NUMBER: 'number',
    DECIMAL: 'decimal',
    PERCENTAGE: 'percentage',
    DURATION: 'duration',
    RATING: 'rating',
    SCORE: 'score',
  } as const,

  // Metric Priority
  PRIORITY: {
    CRITICAL: 'critical',
    HIGH: 'high',
    MEDIUM: 'medium',
    LOW: 'low',
  } as const,
} as const;

// Engagement Analytics User Metrics
export type EngagementAnalyticsUserMetric =
  (typeof ENGAGEMENT_ANALYTICS_METRIC.USER_METRICS)[keyof typeof ENGAGEMENT_ANALYTICS_METRIC.USER_METRICS];

// Engagement Analytics Session Metrics
export type EngagementAnalyticsSessionMetric =
  (typeof ENGAGEMENT_ANALYTICS_METRIC.SESSION_METRICS)[keyof typeof ENGAGEMENT_ANALYTICS_METRIC.SESSION_METRICS];

// Engagement Analytics Content Metrics
export type EngagementAnalyticsContentMetric =
  (typeof ENGAGEMENT_ANALYTICS_METRIC.CONTENT_METRICS)[keyof typeof ENGAGEMENT_ANALYTICS_METRIC.CONTENT_METRICS];

// Engagement Analytics Interaction Metrics
export type EngagementAnalyticsInteractionMetric =
  (typeof ENGAGEMENT_ANALYTICS_METRIC.INTERACTION_METRICS)[keyof typeof ENGAGEMENT_ANALYTICS_METRIC.INTERACTION_METRICS];

// Engagement Analytics Social Metrics
export type EngagementAnalyticsSocialMetric =
  (typeof ENGAGEMENT_ANALYTICS_METRIC.SOCIAL_METRICS)[keyof typeof ENGAGEMENT_ANALYTICS_METRIC.SOCIAL_METRICS];

// Engagement Analytics Conversion Metrics
export type EngagementAnalyticsConversionMetric =
  (typeof ENGAGEMENT_ANALYTICS_METRIC.CONVERSION_METRICS)[keyof typeof ENGAGEMENT_ANALYTICS_METRIC.CONVERSION_METRICS];

// Engagement Analytics Milestone Metrics
export type EngagementAnalyticsMilestoneMetric =
  (typeof ENGAGEMENT_ANALYTICS_METRIC.MILESTONE_METRICS)[keyof typeof ENGAGEMENT_ANALYTICS_METRIC.MILESTONE_METRICS];

// Engagement Analytics Comparison Metrics
export type EngagementAnalyticsComparisonMetric =
  (typeof ENGAGEMENT_ANALYTICS_METRIC.COMPARISON_METRICS)[keyof typeof ENGAGEMENT_ANALYTICS_METRIC.COMPARISON_METRICS];

// Engagement Analytics Metric Categories
export type EngagementAnalyticsMetricCategory =
  (typeof ENGAGEMENT_ANALYTICS_METRIC.CATEGORIES)[keyof typeof ENGAGEMENT_ANALYTICS_METRIC.CATEGORIES];

// Engagement Analytics Metric Types
export type EngagementAnalyticsMetricType =
  (typeof ENGAGEMENT_ANALYTICS_METRIC.TYPES)[keyof typeof ENGAGEMENT_ANALYTICS_METRIC.TYPES];

// Engagement Analytics Metric Formats
export type EngagementAnalyticsMetricFormat =
  (typeof ENGAGEMENT_ANALYTICS_METRIC.FORMATS)[keyof typeof ENGAGEMENT_ANALYTICS_METRIC.FORMATS];

// Engagement Analytics Metric Priority
export type EngagementAnalyticsMetricPriority =
  (typeof ENGAGEMENT_ANALYTICS_METRIC.PRIORITY)[keyof typeof ENGAGEMENT_ANALYTICS_METRIC.PRIORITY];

// Engagement Analytics Metric Labels
export function getEngagementAnalyticsMetricLabel(metric: string): string {
  const labels: Record<string, string> = {
    // User Metrics
    active_users: 'Active Users',
    engaged_users: 'Engaged Users',
    disengaged_users: 'Disengaged Users',
    user_engagement_rate: 'User Engagement Rate',
    user_retention_rate: 'User Retention Rate',
    user_churn_rate: 'User Churn Rate',
    user_activity_score: 'User Activity Score',

    // Session Metrics
    total_sessions: 'Total Sessions',
    avg_session_duration: 'Avg Session Duration',
    avg_session_depth: 'Avg Session Depth',
    sessions_per_user: 'Sessions Per User',
    session_retention: 'Session Retention',
    session_quality_score: 'Session Quality Score',

    // Content Metrics
    total_views: 'Total Views',
    unique_views: 'Unique Views',
    avg_view_duration: 'Avg View Duration',
    view_completion_rate: 'View Completion Rate',
    content_engagement_rate: 'Content Engagement Rate',
    content_popularity_score: 'Content Popularity Score',

    // Interaction Metrics
    total_interactions: 'Total Interactions',
    avg_interactions_per_session: 'Avg Interactions Per Session',
    interaction_rate: 'Interaction Rate',
    interaction_depth: 'Interaction Depth',
    click_through_rate: 'Click-through Rate',

    // Social Metrics
    total_shares: 'Total Shares',
    total_likes: 'Total Likes',
    total_comments: 'Total Comments',
    social_engagement_rate: 'Social Engagement Rate',
    social_reach: 'Social Reach',
    social_sentiment_score: 'Social Sentiment Score',

    // Conversion Metrics
    micro_conversions: 'Micro Conversions',
    macro_conversions: 'Macro Conversions',
    conversion_rate: 'Conversion Rate',
    conversion_value: 'Conversion Value',
    goal_completion_rate: 'Goal Completion Rate',

    // Milestone Metrics
    milestones_achieved: 'Milestones Achieved',
    level_up_rate: 'Level Up Rate',
    badge_earn_rate: 'Badge Earn Rate',
    achievement_score: 'Achievement Score',

    // Comparison Metrics
    year_over_year: 'Year Over Year',
    quarter_over_quarter: 'Quarter Over Quarter',
    month_over_month: 'Month Over Month',
    period_comparison: 'Period Comparison',
    segment_comparison: 'Segment Comparison',
    content_comparison: 'Content Comparison',
  };

  return (
    labels[metric] || metric.replace(/_/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())
  );
}

// Engagement Analytics Metric Category Labels
export function getEngagementAnalyticsMetricCategoryLabel(
  category: EngagementAnalyticsMetricCategory
): string {
  const labels: Record<EngagementAnalyticsMetricCategory, string> = {
    [ENGAGEMENT_ANALYTICS_METRIC.CATEGORIES.USER]: 'User',
    [ENGAGEMENT_ANALYTICS_METRIC.CATEGORIES.SESSION]: 'Session',
    [ENGAGEMENT_ANALYTICS_METRIC.CATEGORIES.CONTENT]: 'Content',
    [ENGAGEMENT_ANALYTICS_METRIC.CATEGORIES.INTERACTION]: 'Interaction',
    [ENGAGEMENT_ANALYTICS_METRIC.CATEGORIES.SOCIAL]: 'Social',
    [ENGAGEMENT_ANALYTICS_METRIC.CATEGORIES.CONVERSION]: 'Conversion',
    [ENGAGEMENT_ANALYTICS_METRIC.CATEGORIES.MILESTONE]: 'Milestone',
    [ENGAGEMENT_ANALYTICS_METRIC.CATEGORIES.COMPARISON]: 'Comparison',
  };
  return labels[category] || 'Unknown';
}

// Engagement Analytics Metric Type Labels
export function getEngagementAnalyticsMetricTypeLabel(type: EngagementAnalyticsMetricType): string {
  const labels: Record<EngagementAnalyticsMetricType, string> = {
    [ENGAGEMENT_ANALYTICS_METRIC.TYPES.ABSOLUTE]: 'Absolute',
    [ENGAGEMENT_ANALYTICS_METRIC.TYPES.AVERAGE]: 'Average',
    [ENGAGEMENT_ANALYTICS_METRIC.TYPES.PERCENTAGE]: 'Percentage',
    [ENGAGEMENT_ANALYTICS_METRIC.TYPES.RATIO]: 'Ratio',
    [ENGAGEMENT_ANALYTICS_METRIC.TYPES.RATE]: 'Rate',
    [ENGAGEMENT_ANALYTICS_METRIC.TYPES.SCORE]: 'Score',
    [ENGAGEMENT_ANALYTICS_METRIC.TYPES.DURATION]: 'Duration',
  };
  return labels[type] || 'Unknown';
}

// Engagement Analytics Metric Format Labels
export function getEngagementAnalyticsMetricFormatLabel(
  format: EngagementAnalyticsMetricFormat
): string {
  const labels: Record<EngagementAnalyticsMetricFormat, string> = {
    [ENGAGEMENT_ANALYTICS_METRIC.FORMATS.NUMBER]: 'Number',
    [ENGAGEMENT_ANALYTICS_METRIC.FORMATS.DECIMAL]: 'Decimal',
    [ENGAGEMENT_ANALYTICS_METRIC.FORMATS.PERCENTAGE]: 'Percentage',
    [ENGAGEMENT_ANALYTICS_METRIC.FORMATS.DURATION]: 'Duration',
    [ENGAGEMENT_ANALYTICS_METRIC.FORMATS.RATING]: 'Rating',
    [ENGAGEMENT_ANALYTICS_METRIC.FORMATS.SCORE]: 'Score',
  };
  return labels[format] || 'Unknown';
}

// Engagement Analytics Metric Priority Labels
export function getEngagementAnalyticsMetricPriorityLabel(
  priority: EngagementAnalyticsMetricPriority
): string {
  const labels: Record<EngagementAnalyticsMetricPriority, string> = {
    [ENGAGEMENT_ANALYTICS_METRIC.PRIORITY.CRITICAL]: 'Critical',
    [ENGAGEMENT_ANALYTICS_METRIC.PRIORITY.HIGH]: 'High',
    [ENGAGEMENT_ANALYTICS_METRIC.PRIORITY.MEDIUM]: 'Medium',
    [ENGAGEMENT_ANALYTICS_METRIC.PRIORITY.LOW]: 'Low',
  };
  return labels[priority] || 'Unknown';
}

// Get metric category
export function getEngagementAnalyticsMetricCategory(
  metric: string
): EngagementAnalyticsMetricCategory {
  const userMetrics = Object.values(ENGAGEMENT_ANALYTICS_METRIC.USER_METRICS) as readonly string[];
  const sessionMetrics = Object.values(
    ENGAGEMENT_ANALYTICS_METRIC.SESSION_METRICS
  ) as readonly string[];
  const contentMetrics = Object.values(
    ENGAGEMENT_ANALYTICS_METRIC.CONTENT_METRICS
  ) as readonly string[];
  const interactionMetrics = Object.values(
    ENGAGEMENT_ANALYTICS_METRIC.INTERACTION_METRICS
  ) as readonly string[];
  const socialMetrics = Object.values(
    ENGAGEMENT_ANALYTICS_METRIC.SOCIAL_METRICS
  ) as readonly string[];
  const conversionMetrics = Object.values(
    ENGAGEMENT_ANALYTICS_METRIC.CONVERSION_METRICS
  ) as readonly string[];
  const milestoneMetrics = Object.values(
    ENGAGEMENT_ANALYTICS_METRIC.MILESTONE_METRICS
  ) as readonly string[];
  const comparisonMetrics = Object.values(
    ENGAGEMENT_ANALYTICS_METRIC.COMPARISON_METRICS
  ) as readonly string[];

  if (userMetrics.includes(metric)) return ENGAGEMENT_ANALYTICS_METRIC.CATEGORIES.USER;
  if (sessionMetrics.includes(metric)) return ENGAGEMENT_ANALYTICS_METRIC.CATEGORIES.SESSION;
  if (contentMetrics.includes(metric)) return ENGAGEMENT_ANALYTICS_METRIC.CATEGORIES.CONTENT;
  if (interactionMetrics.includes(metric))
    return ENGAGEMENT_ANALYTICS_METRIC.CATEGORIES.INTERACTION;
  if (socialMetrics.includes(metric)) return ENGAGEMENT_ANALYTICS_METRIC.CATEGORIES.SOCIAL;
  if (conversionMetrics.includes(metric)) return ENGAGEMENT_ANALYTICS_METRIC.CATEGORIES.CONVERSION;
  if (milestoneMetrics.includes(metric)) return ENGAGEMENT_ANALYTICS_METRIC.CATEGORIES.MILESTONE;
  if (comparisonMetrics.includes(metric)) return ENGAGEMENT_ANALYTICS_METRIC.CATEGORIES.COMPARISON;

  return ENGAGEMENT_ANALYTICS_METRIC.CATEGORIES.USER;
}

// Get metric type
export function getEngagementAnalyticsMetricType(metric: string): EngagementAnalyticsMetricType {
  const percentageMetrics: string[] = [
    'rate',
    'percentage',
    'completion',
    'retention',
    'churn',
    'conversion',
    'engagement',
    'click_through',
    'goal_completion',
    'level_up',
    'badge_earn',
  ];

  const averageMetrics: string[] = ['avg', 'average', 'mean'];

  const durationMetrics: string[] = ['duration', 'time'];

  const scoreMetrics: string[] = ['score'];

  const lowerMetric = metric.toLowerCase();

  if (durationMetrics.some((dm) => lowerMetric.includes(dm))) {
    return ENGAGEMENT_ANALYTICS_METRIC.TYPES.DURATION;
  }

  if (percentageMetrics.some((pm) => lowerMetric.includes(pm))) {
    return ENGAGEMENT_ANALYTICS_METRIC.TYPES.PERCENTAGE;
  }

  if (averageMetrics.some((am) => lowerMetric.includes(am))) {
    return ENGAGEMENT_ANALYTICS_METRIC.TYPES.AVERAGE;
  }

  if (scoreMetrics.some((sm) => lowerMetric.includes(sm))) {
    return ENGAGEMENT_ANALYTICS_METRIC.TYPES.SCORE;
  }

  return ENGAGEMENT_ANALYTICS_METRIC.TYPES.ABSOLUTE;
}

// Get metric format
export function getEngagementAnalyticsMetricFormat(
  metric: string
): EngagementAnalyticsMetricFormat {
  const durationMetrics: string[] = ['duration', 'time'];

  const percentageMetrics: string[] = [
    'rate',
    'percentage',
    'completion',
    'retention',
    'churn',
    'conversion',
    'engagement',
    'click_through',
    'goal_completion',
    'level_up',
    'badge_earn',
  ];

  const scoreMetrics: string[] = ['score'];

  const lowerMetric = metric.toLowerCase();

  if (durationMetrics.some((dm) => lowerMetric.includes(dm))) {
    return ENGAGEMENT_ANALYTICS_METRIC.FORMATS.DURATION;
  }

  if (scoreMetrics.some((sm) => lowerMetric.includes(sm))) {
    return ENGAGEMENT_ANALYTICS_METRIC.FORMATS.SCORE;
  }

  if (percentageMetrics.some((pm) => lowerMetric.includes(pm))) {
    return ENGAGEMENT_ANALYTICS_METRIC.FORMATS.PERCENTAGE;
  }

  return ENGAGEMENT_ANALYTICS_METRIC.FORMATS.NUMBER;
}

// Calculate user engagement rate
export function calculateEngagementAnalyticsUserEngagementRate(
  engagedUsers: number,
  totalUsers: number
): number {
  if (totalUsers === 0) return 0;
  return (engagedUsers / totalUsers) * 100;
}

// Calculate average session duration
export function calculateEngagementAnalyticsAvgSessionDuration(
  totalDuration: number,
  totalSessions: number
): number {
  if (totalSessions === 0) return 0;
  return totalDuration / totalSessions;
}

// Calculate view completion rate
export function calculateEngagementAnalyticsViewCompletionRate(
  completedViews: number,
  totalViews: number
): number {
  if (totalViews === 0) return 0;
  return (completedViews / totalViews) * 100;
}

// Calculate interaction rate
export function calculateEngagementAnalyticsInteractionRate(
  interactions: number,
  views: number
): number {
  if (views === 0) return 0;
  return (interactions / views) * 100;
}

// Calculate social engagement rate
export function calculateEngagementAnalyticsSocialEngagementRate(
  socialActions: number,
  reach: number
): number {
  if (reach === 0) return 0;
  return (socialActions / reach) * 100;
}

// Calculate conversion rate
export function calculateEngagementAnalyticsConversionRate(
  conversions: number,
  engagements: number
): number {
  if (engagements === 0) return 0;
  return (conversions / engagements) * 100;
}

// Calculate session quality score
export function calculateEngagementAnalyticsSessionQualityScore(
  duration: number,
  depth: number,
  interactions: number
): number {
  const durationScore = Math.min(duration / 60, 10);
  const depthScore = Math.min(depth / 5, 10);
  const interactionScore = Math.min(interactions / 10, 10);
  return (durationScore + depthScore + interactionScore) / 3;
}

// Calculate content popularity score
export function calculateEngagementAnalyticsContentPopularityScore(
  views: number,
  interactions: number,
  shares: number
): number {
  const viewScore = Math.min(views / 1000, 10);
  const interactionScore = Math.min(interactions / 100, 10);
  const shareScore = Math.min(shares / 10, 10);
  return (viewScore + interactionScore + shareScore) / 3;
}
