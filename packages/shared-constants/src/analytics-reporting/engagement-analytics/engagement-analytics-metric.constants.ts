/**
 * @fileoverview Engagement analytics metrics and measurements definitions
 * @package @vubun/shared-constants
 */

// External libraries - none needed for constants

// Shared packages - none needed for constants

// Project files - none needed for constants

/**
 * Engagement analytics metrics
 */
export enum EngagementAnalyticsMetric {
  /** Overall engagement score */
  ENGAGEMENT_SCORE = 'ENGAGEMENT_SCORE',
  /** User activity index */
  USER_ACTIVITY_INDEX = 'USER_ACTIVITY_INDEX',
  /** Session frequency */
  SESSION_FREQUENCY = 'SESSION_FREQUENCY',
  /** Session duration in seconds */
  SESSION_DURATION = 'SESSION_DURATION',
  /** Interaction count */
  INTERACTION_COUNT = 'INTERACTION_COUNT',
  /** Interaction depth */
  INTERACTION_DEPTH = 'INTERACTION_DEPTH',
  /** Social share count */
  SOCIAL_SHARE_COUNT = 'SOCIAL_SHARE_COUNT',
  /** Social comment count */
  SOCIAL_COMMENT_COUNT = 'SOCIAL_COMMENT_COUNT',
  /** Social like count */
  SOCIAL_LIKE_COUNT = 'SOCIAL_LIKE_COUNT',
  /** Content view duration in seconds */
  CONTENT_VIEW_DURATION = 'CONTENT_VIEW_DURATION',
  /** Content completion rate percentage */
  CONTENT_COMPLETION_RATE = 'CONTENT_COMPLETION_RATE',
  /** Email open rate percentage */
  EMAIL_OPEN_RATE = 'EMAIL_OPEN_RATE',
  /** Email click rate percentage */
  EMAIL_CLICK_RATE = 'EMAIL_CLICK_RATE',
  /** Notification open rate percentage */
  NOTIFICATION_OPEN_RATE = 'NOTIFICATION_OPEN_RATE',
  /** Notification click rate percentage */
  NOTIFICATION_CLICK_RATE = 'NOTIFICATION_CLICK_RATE',
  /** App open frequency */
  APP_OPEN_FREQUENCY = 'APP_OPEN_FREQUENCY',
  /** App page views */
  APP_PAGE_VIEWS = 'APP_PAGE_VIEWS',
  /** Gamification points */
  GAMIFICATION_POINTS = 'GAMIFICATION_POINTS',
  /** Loyalty points */
  LOYALTY_POINTS = 'LOYALTY_POINTS',
  /** Community post count */
  COMMUNITY_POST_COUNT = 'COMMUNITY_POST_COUNT',
  /** Community reply count */
  COMMUNITY_REPLY_COUNT = 'COMMUNITY_REPLY_COUNT',
  /** Survey response rate percentage */
  SURVEY_RESPONSE_RATE = 'SURVEY_RESPONSE_RATE',
  /** Feedback provided rate percentage */
  FEEDBACK_PROVIDED_RATE = 'FEEDBACK_PROVIDED_RATE',
  /** Support interaction frequency */
  SUPPORT_INTERACTION_FREQUENCY = 'SUPPORT_INTERACTION_FREQUENCY',
  /** Product review rate percentage */
  PRODUCT_REVIEW_RATE = 'PRODUCT_REVIEW_RATE',
  /** Product rating */
  PRODUCT_RATING = 'PRODUCT_RATING',
  /** Campaign engagement rate percentage */
  CAMPAIGN_ENGAGEMENT_RATE = 'CAMPAIGN_ENGAGEMENT_RATE',
  /** Event attendance rate percentage */
  EVENT_ATTENDANCE_RATE = 'EVENT_ATTENDANCE_RATE',
  /** Seasonal engagement variation */
  SEASONAL_ENGAGEMENT_VARIATION = 'SEASONAL_ENGAGEMENT_VARIATION',
  /** Engagement growth rate percentage */
  ENGAGEMENT_GROWTH_RATE = 'ENGAGEMENT_GROWTH_RATE',
  /** Engagement retention rate percentage */
  ENGAGEMENT_RETENTION_RATE = 'ENGAGEMENT_RETENTION_RATE',
  /** Engagement churn rate percentage */
  ENGAGEMENT_CHURN_RATE = 'ENGAGEMENT_CHURN_RATE',
  /** Personalization effectiveness score */
  PERSONALIZATION_EFFECTIVENESS_SCORE = 'PERSONALIZATION_EFFECTIVENESS_SCORE',
  /** Engagement by segment */
  ENGAGEMENT_BY_SEGMENT = 'ENGAGEMENT_BY_SEGMENT',
  /** Engagement by channel */
  ENGAGEMENT_BY_CHANNEL = 'ENGAGEMENT_BY_CHANNEL',
  /** Engagement by time of day */
  ENGAGEMENT_BY_TIME_OF_DAY = 'ENGAGEMENT_BY_TIME_OF_DAY',
  /** Engagement by day of week */
  ENGAGEMENT_BY_DAY_OF_WEEK = 'ENGAGEMENT_BY_DAY_OF_WEEK',
  /** User engagement score */
  USER_ENGAGEMENT_SCORE = 'USER_ENGAGEMENT_SCORE',
  /** Real-time engagement index */
  REAL_TIME_ENGAGEMENT_INDEX = 'REAL_TIME_ENGAGEMENT_INDEX',
  /** Behavioral engagement score */
  BEHAVIORAL_ENGAGEMENT_SCORE = 'BEHAVIORAL_ENGAGEMENT_SCORE',
  /** Emotional engagement score */
  EMOTIONAL_ENGAGEMENT_SCORE = 'EMOTIONAL_ENGAGEMENT_SCORE',
}

/**
 * Engagement metric type classification
 */
export enum EngagementAnalyticsMetricType {
  /** Score metrics */
  SCORE = 'SCORE',
  /** Activity metrics */
  ACTIVITY = 'ACTIVITY',
  /** Session metrics */
  SESSION = 'SESSION',
  /** Interaction metrics */
  INTERACTION = 'INTERACTION',
  /** Social metrics */
  SOCIAL = 'SOCIAL',
  /** Content metrics */
  CONTENT = 'CONTENT',
  /** Channel metrics */
  CHANNEL = 'CHANNEL',
  /** Growth metrics */
  GROWTH = 'GROWTH',
  /** Behavioral metrics */
  BEHAVIORAL = 'BEHAVIORAL',
}

/**
 * Engagement metric category mapping
 */
export const ENGAGEMENT_ANALYTICS_METRIC_CATEGORY_MAP: Record<
  EngagementAnalyticsMetric,
  EngagementAnalyticsMetricType
> = {
  [EngagementAnalyticsMetric.ENGAGEMENT_SCORE]: EngagementAnalyticsMetricType.SCORE,
  [EngagementAnalyticsMetric.USER_ENGAGEMENT_SCORE]: EngagementAnalyticsMetricType.SCORE,
  [EngagementAnalyticsMetric.REAL_TIME_ENGAGEMENT_INDEX]: EngagementAnalyticsMetricType.SCORE,
  [EngagementAnalyticsMetric.BEHAVIORAL_ENGAGEMENT_SCORE]: EngagementAnalyticsMetricType.SCORE,
  [EngagementAnalyticsMetric.EMOTIONAL_ENGAGEMENT_SCORE]: EngagementAnalyticsMetricType.SCORE,
  [EngagementAnalyticsMetric.USER_ACTIVITY_INDEX]: EngagementAnalyticsMetricType.ACTIVITY,
  [EngagementAnalyticsMetric.SESSION_FREQUENCY]: EngagementAnalyticsMetricType.SESSION,
  [EngagementAnalyticsMetric.SESSION_DURATION]: EngagementAnalyticsMetricType.SESSION,
  [EngagementAnalyticsMetric.INTERACTION_COUNT]: EngagementAnalyticsMetricType.INTERACTION,
  [EngagementAnalyticsMetric.INTERACTION_DEPTH]: EngagementAnalyticsMetricType.INTERACTION,
  [EngagementAnalyticsMetric.SOCIAL_SHARE_COUNT]: EngagementAnalyticsMetricType.SOCIAL,
  [EngagementAnalyticsMetric.SOCIAL_COMMENT_COUNT]: EngagementAnalyticsMetricType.SOCIAL,
  [EngagementAnalyticsMetric.SOCIAL_LIKE_COUNT]: EngagementAnalyticsMetricType.SOCIAL,
  [EngagementAnalyticsMetric.CONTENT_VIEW_DURATION]: EngagementAnalyticsMetricType.CONTENT,
  [EngagementAnalyticsMetric.CONTENT_COMPLETION_RATE]: EngagementAnalyticsMetricType.CONTENT,
  [EngagementAnalyticsMetric.EMAIL_OPEN_RATE]: EngagementAnalyticsMetricType.CHANNEL,
  [EngagementAnalyticsMetric.EMAIL_CLICK_RATE]: EngagementAnalyticsMetricType.CHANNEL,
  [EngagementAnalyticsMetric.NOTIFICATION_OPEN_RATE]: EngagementAnalyticsMetricType.CHANNEL,
  [EngagementAnalyticsMetric.NOTIFICATION_CLICK_RATE]: EngagementAnalyticsMetricType.CHANNEL,
  [EngagementAnalyticsMetric.APP_OPEN_FREQUENCY]: EngagementAnalyticsMetricType.CHANNEL,
  [EngagementAnalyticsMetric.APP_PAGE_VIEWS]: EngagementAnalyticsMetricType.CHANNEL,
  [EngagementAnalyticsMetric.GAMIFICATION_POINTS]: EngagementAnalyticsMetricType.ACTIVITY,
  [EngagementAnalyticsMetric.LOYALTY_POINTS]: EngagementAnalyticsMetricType.ACTIVITY,
  [EngagementAnalyticsMetric.COMMUNITY_POST_COUNT]: EngagementAnalyticsMetricType.SOCIAL,
  [EngagementAnalyticsMetric.COMMUNITY_REPLY_COUNT]: EngagementAnalyticsMetricType.SOCIAL,
  [EngagementAnalyticsMetric.SURVEY_RESPONSE_RATE]: EngagementAnalyticsMetricType.BEHAVIORAL,
  [EngagementAnalyticsMetric.FEEDBACK_PROVIDED_RATE]: EngagementAnalyticsMetricType.BEHAVIORAL,
  [EngagementAnalyticsMetric.SUPPORT_INTERACTION_FREQUENCY]:
    EngagementAnalyticsMetricType.BEHAVIORAL,
  [EngagementAnalyticsMetric.PRODUCT_REVIEW_RATE]: EngagementAnalyticsMetricType.BEHAVIORAL,
  [EngagementAnalyticsMetric.PRODUCT_RATING]: EngagementAnalyticsMetricType.BEHAVIORAL,
  [EngagementAnalyticsMetric.CAMPAIGN_ENGAGEMENT_RATE]: EngagementAnalyticsMetricType.ACTIVITY,
  [EngagementAnalyticsMetric.EVENT_ATTENDANCE_RATE]: EngagementAnalyticsMetricType.ACTIVITY,
  [EngagementAnalyticsMetric.SEASONAL_ENGAGEMENT_VARIATION]: EngagementAnalyticsMetricType.GROWTH,
  [EngagementAnalyticsMetric.ENGAGEMENT_GROWTH_RATE]: EngagementAnalyticsMetricType.GROWTH,
  [EngagementAnalyticsMetric.ENGAGEMENT_RETENTION_RATE]: EngagementAnalyticsMetricType.GROWTH,
  [EngagementAnalyticsMetric.ENGAGEMENT_CHURN_RATE]: EngagementAnalyticsMetricType.GROWTH,
  [EngagementAnalyticsMetric.PERSONALIZATION_EFFECTIVENESS_SCORE]:
    EngagementAnalyticsMetricType.SCORE,
  [EngagementAnalyticsMetric.ENGAGEMENT_BY_SEGMENT]: EngagementAnalyticsMetricType.GROWTH,
  [EngagementAnalyticsMetric.ENGAGEMENT_BY_CHANNEL]: EngagementAnalyticsMetricType.CHANNEL,
  [EngagementAnalyticsMetric.ENGAGEMENT_BY_TIME_OF_DAY]: EngagementAnalyticsMetricType.GROWTH,
  [EngagementAnalyticsMetric.ENGAGEMENT_BY_DAY_OF_WEEK]: EngagementAnalyticsMetricType.GROWTH,
};

/**
 * Engagement metric format type
 */
export enum EngagementAnalyticsMetricFormat {
  /** Score format (0-100) */
  SCORE = 'SCORE',
  /** Percentage format */
  PERCENTAGE = 'PERCENTAGE',
  /** Number format */
  NUMBER = 'NUMBER',
  /** Time format (seconds) */
  TIME = 'TIME',
  /** Rating format (0-5) */
  RATING = 'RATING',
  /** Ratio format */
  RATIO = 'RATIO',
}

/**
 * Engagement metric configuration
 */
export interface EngagementAnalyticsMetricConfig {
  label: string;
  description: string;
  format: EngagementAnalyticsMetricFormat;
  icon?: string;
  color?: string;
  isReversed: boolean;
  priority: number;
  threshold?: {
    good: number;
    average: number;
    poor: number;
  };
}

export const ENGAGEMENT_ANALYTICS_METRIC_CONFIG: Record<
  EngagementAnalyticsMetric,
  EngagementAnalyticsMetricConfig
> = {
  [EngagementAnalyticsMetric.ENGAGEMENT_SCORE]: {
    label: 'Engagement Score',
    description: 'Overall engagement score',
    format: EngagementAnalyticsMetricFormat.SCORE,
    icon: 'Activity',
    color: '#8B5CF6',
    isReversed: false,
    priority: 1,
    threshold: {
      good: 70,
      average: 50,
      poor: 30,
    },
  },
  [EngagementAnalyticsMetric.USER_ENGAGEMENT_SCORE]: {
    label: 'User Engagement Score',
    description: 'User-level engagement score',
    format: EngagementAnalyticsMetricFormat.SCORE,
    icon: 'User',
    color: '#3B82F6',
    isReversed: false,
    priority: 1,
  },
  [EngagementAnalyticsMetric.REAL_TIME_ENGAGEMENT_INDEX]: {
    label: 'Real-Time Engagement Index',
    description: 'Real-time engagement index',
    format: EngagementAnalyticsMetricFormat.SCORE,
    icon: 'Zap',
    color: '#F59E0B',
    isReversed: false,
    priority: 2,
  },
  [EngagementAnalyticsMetric.BEHAVIORAL_ENGAGEMENT_SCORE]: {
    label: 'Behavioral Engagement Score',
    description: 'Behavioral engagement score',
    format: EngagementAnalyticsMetricFormat.SCORE,
    icon: 'Activity',
    color: '#6366F1',
    isReversed: false,
    priority: 2,
  },
  [EngagementAnalyticsMetric.EMOTIONAL_ENGAGEMENT_SCORE]: {
    label: 'Emotional Engagement Score',
    description: 'Emotional engagement score',
    format: EngagementAnalyticsMetricFormat.SCORE,
    icon: 'Smile',
    color: '#F472B6',
    isReversed: false,
    priority: 2,
  },
  [EngagementAnalyticsMetric.USER_ACTIVITY_INDEX]: {
    label: 'User Activity Index',
    description: 'User activity level index',
    format: EngagementAnalyticsMetricFormat.SCORE,
    icon: 'Activity',
    color: '#10B981',
    isReversed: false,
    priority: 2,
  },
  [EngagementAnalyticsMetric.SESSION_FREQUENCY]: {
    label: 'Session Frequency',
    description: 'Number of sessions per user',
    format: EngagementAnalyticsMetricFormat.NUMBER,
    icon: 'Repeat',
    color: '#3B82F6',
    isReversed: false,
    priority: 2,
  },
  [EngagementAnalyticsMetric.SESSION_DURATION]: {
    label: 'Session Duration',
    description: 'Average session duration',
    format: EngagementAnalyticsMetricFormat.TIME,
    icon: 'Clock',
    color: '#F59E0B',
    isReversed: false,
    priority: 2,
  },
  [EngagementAnalyticsMetric.INTERACTION_COUNT]: {
    label: 'Interaction Count',
    description: 'Number of interactions',
    format: EngagementAnalyticsMetricFormat.NUMBER,
    icon: 'MousePointer',
    color: '#8B5CF6',
    isReversed: false,
    priority: 2,
  },
  [EngagementAnalyticsMetric.INTERACTION_DEPTH]: {
    label: 'Interaction Depth',
    description: 'Depth of interactions',
    format: EngagementAnalyticsMetricFormat.NUMBER,
    icon: 'ArrowDown',
    color: '#6366F1',
    isReversed: false,
    priority: 2,
  },
  [EngagementAnalyticsMetric.SOCIAL_SHARE_COUNT]: {
    label: 'Social Share Count',
    description: 'Number of social shares',
    format: EngagementAnalyticsMetricFormat.NUMBER,
    icon: 'Share2',
    color: '#1DA1F2',
    isReversed: false,
    priority: 2,
  },
  [EngagementAnalyticsMetric.SOCIAL_COMMENT_COUNT]: {
    label: 'Social Comment Count',
    description: 'Number of social comments',
    format: EngagementAnalyticsMetricFormat.NUMBER,
    icon: 'MessageSquare',
    color: '#F472B6',
    isReversed: false,
    priority: 2,
  },
  [EngagementAnalyticsMetric.SOCIAL_LIKE_COUNT]: {
    label: 'Social Like Count',
    description: 'Number of social likes',
    format: EngagementAnalyticsMetricFormat.NUMBER,
    icon: 'Heart',
    color: '#EC4899',
    isReversed: false,
    priority: 2,
  },
  [EngagementAnalyticsMetric.CONTENT_VIEW_DURATION]: {
    label: 'Content View Duration',
    description: 'Average content view duration',
    format: EngagementAnalyticsMetricFormat.TIME,
    icon: 'Eye',
    color: '#8B5CF6',
    isReversed: false,
    priority: 2,
  },
  [EngagementAnalyticsMetric.CONTENT_COMPLETION_RATE]: {
    label: 'Content Completion Rate',
    description: 'Rate of content completion',
    format: EngagementAnalyticsMetricFormat.PERCENTAGE,
    icon: 'CheckCircle',
    color: '#22C55E',
    isReversed: false,
    priority: 2,
  },
  [EngagementAnalyticsMetric.EMAIL_OPEN_RATE]: {
    label: 'Email Open Rate',
    description: 'Email open rate',
    format: EngagementAnalyticsMetricFormat.PERCENTAGE,
    icon: 'MailOpen',
    color: '#EA580C',
    isReversed: false,
    priority: 2,
  },
  [EngagementAnalyticsMetric.EMAIL_CLICK_RATE]: {
    label: 'Email Click Rate',
    description: 'Email click rate',
    format: EngagementAnalyticsMetricFormat.PERCENTAGE,
    icon: 'MousePointer',
    color: '#F59E0B',
    isReversed: false,
    priority: 2,
  },
  [EngagementAnalyticsMetric.NOTIFICATION_OPEN_RATE]: {
    label: 'Notification Open Rate',
    description: 'Notification open rate',
    format: EngagementAnalyticsMetricFormat.PERCENTAGE,
    icon: 'Bell',
    color: '#F472B6',
    isReversed: false,
    priority: 2,
  },
  [EngagementAnalyticsMetric.NOTIFICATION_CLICK_RATE]: {
    label: 'Notification Click Rate',
    description: 'Notification click rate',
    format: EngagementAnalyticsMetricFormat.PERCENTAGE,
    icon: 'BellRing',
    color: '#EC4899',
    isReversed: false,
    priority: 2,
  },
  [EngagementAnalyticsMetric.APP_OPEN_FREQUENCY]: {
    label: 'App Open Frequency',
    description: 'App open frequency',
    format: EngagementAnalyticsMetricFormat.NUMBER,
    icon: 'Smartphone',
    color: '#10B981',
    isReversed: false,
    priority: 2,
  },
  [EngagementAnalyticsMetric.APP_PAGE_VIEWS]: {
    label: 'App Page Views',
    description: 'App page views',
    format: EngagementAnalyticsMetricFormat.NUMBER,
    icon: 'Eye',
    color: '#3B82F6',
    isReversed: false,
    priority: 2,
  },
  [EngagementAnalyticsMetric.GAMIFICATION_POINTS]: {
    label: 'Gamification Points',
    description: 'Gamification points earned',
    format: EngagementAnalyticsMetricFormat.NUMBER,
    icon: 'Trophy',
    color: '#F59E0B',
    isReversed: false,
    priority: 2,
  },
  [EngagementAnalyticsMetric.LOYALTY_POINTS]: {
    label: 'Loyalty Points',
    description: 'Loyalty points accumulated',
    format: EngagementAnalyticsMetricFormat.NUMBER,
    icon: 'Heart',
    color: '#EC4899',
    isReversed: false,
    priority: 2,
  },
  [EngagementAnalyticsMetric.COMMUNITY_POST_COUNT]: {
    label: 'Community Post Count',
    description: 'Number of community posts',
    format: EngagementAnalyticsMetricFormat.NUMBER,
    icon: 'MessageSquare',
    color: '#8B5CF6',
    isReversed: false,
    priority: 2,
  },
  [EngagementAnalyticsMetric.COMMUNITY_REPLY_COUNT]: {
    label: 'Community Reply Count',
    description: 'Number of community replies',
    format: EngagementAnalyticsMetricFormat.NUMBER,
    icon: 'Reply',
    color: '#6366F1',
    isReversed: false,
    priority: 2,
  },
  [EngagementAnalyticsMetric.SURVEY_RESPONSE_RATE]: {
    label: 'Survey Response Rate',
    description: 'Survey response rate',
    format: EngagementAnalyticsMetricFormat.PERCENTAGE,
    icon: 'FileText',
    color: '#F59E0B',
    isReversed: false,
    priority: 2,
  },
  [EngagementAnalyticsMetric.FEEDBACK_PROVIDED_RATE]: {
    label: 'Feedback Provided Rate',
    description: 'Feedback provided rate',
    format: EngagementAnalyticsMetricFormat.PERCENTAGE,
    icon: 'MessageSquare',
    color: '#F472B6',
    isReversed: false,
    priority: 2,
  },
  [EngagementAnalyticsMetric.SUPPORT_INTERACTION_FREQUENCY]: {
    label: 'Support Interaction Frequency',
    description: 'Support interaction frequency',
    format: EngagementAnalyticsMetricFormat.NUMBER,
    icon: 'Headset',
    color: '#8B5CF6',
    isReversed: false,
    priority: 2,
  },
  [EngagementAnalyticsMetric.PRODUCT_REVIEW_RATE]: {
    label: 'Product Review Rate',
    description: 'Product review rate',
    format: EngagementAnalyticsMetricFormat.PERCENTAGE,
    icon: 'Star',
    color: '#F59E0B',
    isReversed: false,
    priority: 2,
  },
  [EngagementAnalyticsMetric.PRODUCT_RATING]: {
    label: 'Product Rating',
    description: 'Average product rating',
    format: EngagementAnalyticsMetricFormat.RATING,
    icon: 'Star',
    color: '#F472B6',
    isReversed: false,
    priority: 2,
  },
  [EngagementAnalyticsMetric.CAMPAIGN_ENGAGEMENT_RATE]: {
    label: 'Campaign Engagement Rate',
    description: 'Campaign engagement rate',
    format: EngagementAnalyticsMetricFormat.PERCENTAGE,
    icon: 'Megaphone',
    color: '#F59E0B',
    isReversed: false,
    priority: 2,
  },
  [EngagementAnalyticsMetric.EVENT_ATTENDANCE_RATE]: {
    label: 'Event Attendance Rate',
    description: 'Event attendance rate',
    format: EngagementAnalyticsMetricFormat.PERCENTAGE,
    icon: 'Calendar',
    color: '#3B82F6',
    isReversed: false,
    priority: 2,
  },
  [EngagementAnalyticsMetric.SEASONAL_ENGAGEMENT_VARIATION]: {
    label: 'Seasonal Engagement Variation',
    description: 'Seasonal variation in engagement',
    format: EngagementAnalyticsMetricFormat.RATIO,
    icon: 'Calendar',
    color: '#F472B6',
    isReversed: false,
    priority: 2,
  },
  [EngagementAnalyticsMetric.ENGAGEMENT_GROWTH_RATE]: {
    label: 'Engagement Growth Rate',
    description: 'Growth rate of engagement',
    format: EngagementAnalyticsMetricFormat.PERCENTAGE,
    icon: 'TrendingUp',
    color: '#22C55E',
    isReversed: false,
    priority: 1,
  },
  [EngagementAnalyticsMetric.ENGAGEMENT_RETENTION_RATE]: {
    label: 'Engagement Retention Rate',
    description: 'Retention rate of engagement',
    format: EngagementAnalyticsMetricFormat.PERCENTAGE,
    icon: 'UserCheck',
    color: '#10B981',
    isReversed: false,
    priority: 1,
  },
  [EngagementAnalyticsMetric.ENGAGEMENT_CHURN_RATE]: {
    label: 'Engagement Churn Rate',
    description: 'Churn rate of engagement',
    format: EngagementAnalyticsMetricFormat.PERCENTAGE,
    icon: 'UserX',
    color: '#EF4444',
    isReversed: true,
    priority: 1,
  },
  [EngagementAnalyticsMetric.PERSONALIZATION_EFFECTIVENESS_SCORE]: {
    label: 'Personalization Effectiveness Score',
    description: 'Effectiveness of personalization',
    format: EngagementAnalyticsMetricFormat.SCORE,
    icon: 'UserCog',
    color: '#8B5CF6',
    isReversed: false,
    priority: 2,
  },
  [EngagementAnalyticsMetric.ENGAGEMENT_BY_SEGMENT]: {
    label: 'Engagement by Segment',
    description: 'Engagement by customer segment',
    format: EngagementAnalyticsMetricFormat.NUMBER,
    icon: 'PieChart',
    color: '#3B82F6',
    isReversed: false,
    priority: 2,
  },
  [EngagementAnalyticsMetric.ENGAGEMENT_BY_CHANNEL]: {
    label: 'Engagement by Channel',
    description: 'Engagement by channel',
    format: EngagementAnalyticsMetricFormat.NUMBER,
    icon: 'Layers',
    color: '#8B5CF6',
    isReversed: false,
    priority: 2,
  },
  [EngagementAnalyticsMetric.ENGAGEMENT_BY_TIME_OF_DAY]: {
    label: 'Engagement by Time of Day',
    description: 'Engagement by time of day',
    format: EngagementAnalyticsMetricFormat.NUMBER,
    icon: 'Clock',
    color: '#F59E0B',
    isReversed: false,
    priority: 2,
  },
  [EngagementAnalyticsMetric.ENGAGEMENT_BY_DAY_OF_WEEK]: {
    label: 'Engagement by Day of Week',
    description: 'Engagement by day of week',
    format: EngagementAnalyticsMetricFormat.NUMBER,
    icon: 'Calendar',
    color: '#6366F1',
    isReversed: false,
    priority: 2,
  },
};

/**
 * Get engagement metric category
 */
export function getEngagementMetricCategory(
  metric: EngagementAnalyticsMetric
): EngagementAnalyticsMetricType {
  return ENGAGEMENT_ANALYTICS_METRIC_CATEGORY_MAP[metric];
}

/**
 * Get engagement metric label
 */
export function getEngagementMetricLabel(metric: EngagementAnalyticsMetric): string {
  return ENGAGEMENT_ANALYTICS_METRIC_CONFIG[metric]?.label || metric;
}

/**
 * Get engagement metric description
 */
export function getEngagementMetricDescription(metric: EngagementAnalyticsMetric): string {
  return ENGAGEMENT_ANALYTICS_METRIC_CONFIG[metric]?.description || '';
}

/**
 * Get engagement metric format
 */
export function getEngagementMetricFormat(
  metric: EngagementAnalyticsMetric
): EngagementAnalyticsMetricFormat {
  return (
    ENGAGEMENT_ANALYTICS_METRIC_CONFIG[metric]?.format || EngagementAnalyticsMetricFormat.NUMBER
  );
}

/**
 * Check if engagement metric is reversed (lower is better)
 */
export function isEngagementMetricReversed(metric: EngagementAnalyticsMetric): boolean {
  return ENGAGEMENT_ANALYTICS_METRIC_CONFIG[metric]?.isReversed || false;
}

/**
 * Get engagement metrics by category
 */
export function getEngagementMetricsByCategory(
  category: EngagementAnalyticsMetricType
): EngagementAnalyticsMetric[] {
  return Object.entries(ENGAGEMENT_ANALYTICS_METRIC_CATEGORY_MAP)
    .filter(([_, cat]) => cat === category)
    .map(([metric]) => metric as EngagementAnalyticsMetric);
}

/**
 * Format engagement metric value
 */
export function formatEngagementMetricValue(
  metric: EngagementAnalyticsMetric,
  value: number
): string {
  const format = getEngagementMetricFormat(metric);

  switch (format) {
    case EngagementAnalyticsMetricFormat.SCORE:
      return value.toFixed(1);
    case EngagementAnalyticsMetricFormat.PERCENTAGE:
      return `${(value * 100).toFixed(2)}%`;
    case EngagementAnalyticsMetricFormat.TIME:
      if (value >= 3600) {
        const hours = Math.floor(value / 3600);
        const minutes = Math.floor((value % 3600) / 60);
        return `${hours}h ${minutes}m`;
      }
      if (value >= 60) {
        const minutes = Math.floor(value / 60);
        const seconds = Math.floor(value % 60);
        return `${minutes}m ${seconds}s`;
      }
      return `${Math.floor(value)}s`;
    case EngagementAnalyticsMetricFormat.RATING:
      return value.toFixed(1);
    default:
      return value.toLocaleString();
  }
}

/**
 * Get engagement metric priority
 */
export function getEngagementMetricPriority(metric: EngagementAnalyticsMetric): number {
  return ENGAGEMENT_ANALYTICS_METRIC_CONFIG[metric]?.priority || 3;
}

/**
 * Get high priority engagement metrics
 */
export function getHighPriorityEngagementMetrics(): EngagementAnalyticsMetric[] {
  return Object.values(EngagementAnalyticsMetric).filter(
    (metric) => getEngagementMetricPriority(metric) === 1
  );
}

/**
 * Get engagement metric thresholds
 */
export function getEngagementMetricThreshold(
  metric: EngagementAnalyticsMetric
): { good: number; average: number; poor: number } | undefined {
  return ENGAGEMENT_ANALYTICS_METRIC_CONFIG[metric]?.threshold;
}

/**
 * Evaluate engagement metric performance
 */
export function evaluateEngagementMetricPerformance(
  metric: EngagementAnalyticsMetric,
  value: number
): 'good' | 'average' | 'poor' {
  const threshold = getEngagementMetricThreshold(metric);
  if (!threshold) {
    return 'average';
  }

  const isReversed = isEngagementMetricReversed(metric);

  if (isReversed) {
    if (value <= threshold.good) return 'good';
    if (value <= threshold.average) return 'average';
    return 'poor';
  } else {
    if (value >= threshold.good) return 'good';
    if (value >= threshold.average) return 'average';
    return 'poor';
  }
}

/**
 * Engagement dashboard metrics
 */
export const ENGAGEMENT_DASHBOARD_METRICS: EngagementAnalyticsMetric[] = [
  EngagementAnalyticsMetric.ENGAGEMENT_SCORE,
  EngagementAnalyticsMetric.USER_ACTIVITY_INDEX,
  EngagementAnalyticsMetric.SESSION_FREQUENCY,
  EngagementAnalyticsMetric.SESSION_DURATION,
  EngagementAnalyticsMetric.INTERACTION_COUNT,
  EngagementAnalyticsMetric.ENGAGEMENT_GROWTH_RATE,
  EngagementAnalyticsMetric.ENGAGEMENT_RETENTION_RATE,
  EngagementAnalyticsMetric.EMAIL_OPEN_RATE,
  EngagementAnalyticsMetric.NOTIFICATION_OPEN_RATE,
];

/**
 * Engagement channel metrics
 */
export const ENGAGEMENT_CHANNEL_METRICS: EngagementAnalyticsMetric[] = [
  EngagementAnalyticsMetric.EMAIL_OPEN_RATE,
  EngagementAnalyticsMetric.EMAIL_CLICK_RATE,
  EngagementAnalyticsMetric.NOTIFICATION_OPEN_RATE,
  EngagementAnalyticsMetric.NOTIFICATION_CLICK_RATE,
  EngagementAnalyticsMetric.APP_OPEN_FREQUENCY,
  EngagementAnalyticsMetric.APP_PAGE_VIEWS,
  EngagementAnalyticsMetric.ENGAGEMENT_BY_CHANNEL,
];

/**
 * Engagement social metrics
 */
export const ENGAGEMENT_SOCIAL_METRICS: EngagementAnalyticsMetric[] = [
  EngagementAnalyticsMetric.SOCIAL_SHARE_COUNT,
  EngagementAnalyticsMetric.SOCIAL_COMMENT_COUNT,
  EngagementAnalyticsMetric.SOCIAL_LIKE_COUNT,
  EngagementAnalyticsMetric.COMMUNITY_POST_COUNT,
  EngagementAnalyticsMetric.COMMUNITY_REPLY_COUNT,
];

/**
 * Engagement behavioral metrics
 */
export const ENGAGEMENT_BEHAVIORAL_METRICS: EngagementAnalyticsMetric[] = [
  EngagementAnalyticsMetric.USER_ACTIVITY_INDEX,
  EngagementAnalyticsMetric.INTERACTION_DEPTH,
  EngagementAnalyticsMetric.CONTENT_VIEW_DURATION,
  EngagementAnalyticsMetric.CONTENT_COMPLETION_RATE,
  EngagementAnalyticsMetric.SURVEY_RESPONSE_RATE,
  EngagementAnalyticsMetric.FEEDBACK_PROVIDED_RATE,
  EngagementAnalyticsMetric.PRODUCT_REVIEW_RATE,
];
