/**
 * @fileoverview User analytics metrics and measurements definitions
 * @package @vubun/shared-constants
 */

// External libraries - none needed for constants

// Shared packages - none needed for constants

// Project files - none needed for constants

/**
 * User analytics metrics
 */
export enum UserAnalyticsMetric {
  /** Total number of users */
  TOTAL_USERS = 'TOTAL_USERS',
  /** Active users in the selected period */
  ACTIVE_USERS = 'ACTIVE_USERS',
  /** New users in the selected period */
  NEW_USERS = 'NEW_USERS',
  /** Returning users in the selected period */
  RETURNING_USERS = 'RETURNING_USERS',
  /** User growth rate percentage */
  USER_GROWTH_RATE = 'USER_GROWTH_RATE',
  /** User retention rate percentage */
  USER_RETENTION_RATE = 'USER_RETENTION_RATE',
  /** User churn rate percentage */
  USER_CHURN_RATE = 'USER_CHURN_RATE',
  /** Average session duration in seconds */
  AVG_SESSION_DURATION = 'AVG_SESSION_DURATION',
  /** Pages per session */
  PAGES_PER_SESSION = 'PAGES_PER_SESSION',
  /** Bounce rate percentage */
  BOUNCE_RATE = 'BOUNCE_RATE',
  /** User engagement score */
  USER_ENGAGEMENT_SCORE = 'USER_ENGAGEMENT_SCORE',
  /** User lifetime value */
  USER_LIFETIME_VALUE = 'USER_LIFETIME_VALUE',
  /** User acquisition cost */
  USER_ACQUISITION_COST = 'USER_ACQUISITION_COST',
  /** User satisfaction score */
  USER_SATISFACTION_SCORE = 'USER_SATISFACTION_SCORE',
  /** User completion rate percentage */
  USER_COMPLETION_RATE = 'USER_COMPLETION_RATE',
  /** User dropoff rate percentage */
  USER_DROPOFF_RATE = 'USER_DROPOFF_RATE',
  /** User conversion rate percentage */
  USER_CONVERSION_RATE = 'USER_CONVERSION_RATE',
  /** User referral rate percentage */
  USER_REFERRAL_RATE = 'USER_REFERRAL_RATE',
  /** User social share rate percentage */
  USER_SOCIAL_SHARE_RATE = 'USER_SOCIAL_SHARE_RATE',
  /** User feedback score */
  USER_FEEDBACK_SCORE = 'USER_FEEDBACK_SCORE',
  /** User loyalty index */
  USER_LOYALTY_INDEX = 'USER_LOYALTY_INDEX',
  /** Daily active users */
  DAU = 'DAU',
  /** Weekly active users */
  WAU = 'WAU',
  /** Monthly active users */
  MAU = 'MAU',
  /** Stickiness ratio (DAU/MAU) */
  STICKINESS = 'STICKINESS',
  /** User engagement rate percentage */
  USER_ENGAGEMENT_RATE = 'USER_ENGAGEMENT_RATE',
  /** Average revenue per user */
  ARPU = 'ARPU',
  /** Average revenue per paying user */
  ARPPU = 'ARPPU',
  /** Customer acquisition cost */
  CAC = 'CAC',
  /** Return on investment */
  ROI = 'ROI',
  /** Net promoter score */
  NPS = 'NPS',
  /** Customer effort score */
  CES = 'CES',
  /** First response time in seconds */
  FIRST_RESPONSE_TIME = 'FIRST_RESPONSE_TIME',
  /** Resolution time in seconds */
  RESOLUTION_TIME = 'RESOLUTION_TIME',
  /** Support ticket volume */
  TICKET_VOLUME = 'TICKET_VOLUME',
  /** Support resolution rate percentage */
  RESOLUTION_RATE = 'RESOLUTION_RATE',
  /** User feature adoption rate */
  FEATURE_ADOPTION_RATE = 'FEATURE_ADOPTION_RATE',
  /** Time to value in seconds */
  TIME_TO_VALUE = 'TIME_TO_VALUE',
  /** Onboarding completion rate */
  ONBOARDING_COMPLETION_RATE = 'ONBOARDING_COMPLETION_RATE',
  /** User activation rate */
  ACTIVATION_RATE = 'ACTIVATION_RATE',
  /** User virality coefficient */
  VIRALITY_COEFFICIENT = 'VIRALITY_COEFFICIENT',
}

/**
 * User metric type classification
 */
export enum UserAnalyticsMetricType {
  /** User count metrics */
  COUNT = 'COUNT',
  /** User rate metrics */
  RATE = 'RATE',
  /** User engagement metrics */
  ENGAGEMENT = 'ENGAGEMENT',
  /** User value metrics */
  VALUE = 'VALUE',
  /** User satisfaction metrics */
  SATISFACTION = 'SATISFACTION',
  /** User retention metrics */
  RETENTION = 'RETENTION',
  /** User acquisition metrics */
  ACQUISITION = 'ACQUISITION',
  /** Financial metrics */
  FINANCIAL = 'FINANCIAL',
  /** Support metrics */
  SUPPORT = 'SUPPORT',
  /** Growth metrics */
  GROWTH = 'GROWTH',
}

/**
 * User metric category mapping
 */
export const USER_ANALYTICS_METRIC_CATEGORY_MAP: Record<
  UserAnalyticsMetric,
  UserAnalyticsMetricType
> = {
  [UserAnalyticsMetric.TOTAL_USERS]: UserAnalyticsMetricType.COUNT,
  [UserAnalyticsMetric.ACTIVE_USERS]: UserAnalyticsMetricType.COUNT,
  [UserAnalyticsMetric.NEW_USERS]: UserAnalyticsMetricType.COUNT,
  [UserAnalyticsMetric.RETURNING_USERS]: UserAnalyticsMetricType.COUNT,
  [UserAnalyticsMetric.USER_GROWTH_RATE]: UserAnalyticsMetricType.GROWTH,
  [UserAnalyticsMetric.USER_RETENTION_RATE]: UserAnalyticsMetricType.RETENTION,
  [UserAnalyticsMetric.USER_CHURN_RATE]: UserAnalyticsMetricType.RETENTION,
  [UserAnalyticsMetric.AVG_SESSION_DURATION]: UserAnalyticsMetricType.ENGAGEMENT,
  [UserAnalyticsMetric.PAGES_PER_SESSION]: UserAnalyticsMetricType.ENGAGEMENT,
  [UserAnalyticsMetric.BOUNCE_RATE]: UserAnalyticsMetricType.ENGAGEMENT,
  [UserAnalyticsMetric.USER_ENGAGEMENT_SCORE]: UserAnalyticsMetricType.ENGAGEMENT,
  [UserAnalyticsMetric.USER_LIFETIME_VALUE]: UserAnalyticsMetricType.VALUE,
  [UserAnalyticsMetric.USER_ACQUISITION_COST]: UserAnalyticsMetricType.ACQUISITION,
  [UserAnalyticsMetric.USER_SATISFACTION_SCORE]: UserAnalyticsMetricType.SATISFACTION,
  [UserAnalyticsMetric.USER_COMPLETION_RATE]: UserAnalyticsMetricType.ENGAGEMENT,
  [UserAnalyticsMetric.USER_DROPOFF_RATE]: UserAnalyticsMetricType.ENGAGEMENT,
  [UserAnalyticsMetric.USER_CONVERSION_RATE]: UserAnalyticsMetricType.GROWTH,
  [UserAnalyticsMetric.USER_REFERRAL_RATE]: UserAnalyticsMetricType.GROWTH,
  [UserAnalyticsMetric.USER_SOCIAL_SHARE_RATE]: UserAnalyticsMetricType.ENGAGEMENT,
  [UserAnalyticsMetric.USER_FEEDBACK_SCORE]: UserAnalyticsMetricType.SATISFACTION,
  [UserAnalyticsMetric.USER_LOYALTY_INDEX]: UserAnalyticsMetricType.RETENTION,
  [UserAnalyticsMetric.DAU]: UserAnalyticsMetricType.COUNT,
  [UserAnalyticsMetric.WAU]: UserAnalyticsMetricType.COUNT,
  [UserAnalyticsMetric.MAU]: UserAnalyticsMetricType.COUNT,
  [UserAnalyticsMetric.STICKINESS]: UserAnalyticsMetricType.ENGAGEMENT,
  [UserAnalyticsMetric.USER_ENGAGEMENT_RATE]: UserAnalyticsMetricType.ENGAGEMENT,
  [UserAnalyticsMetric.ARPU]: UserAnalyticsMetricType.FINANCIAL,
  [UserAnalyticsMetric.ARPPU]: UserAnalyticsMetricType.FINANCIAL,
  [UserAnalyticsMetric.CAC]: UserAnalyticsMetricType.ACQUISITION,
  [UserAnalyticsMetric.ROI]: UserAnalyticsMetricType.FINANCIAL,
  [UserAnalyticsMetric.NPS]: UserAnalyticsMetricType.SATISFACTION,
  [UserAnalyticsMetric.CES]: UserAnalyticsMetricType.SATISFACTION,
  [UserAnalyticsMetric.FIRST_RESPONSE_TIME]: UserAnalyticsMetricType.SUPPORT,
  [UserAnalyticsMetric.RESOLUTION_TIME]: UserAnalyticsMetricType.SUPPORT,
  [UserAnalyticsMetric.TICKET_VOLUME]: UserAnalyticsMetricType.SUPPORT,
  [UserAnalyticsMetric.RESOLUTION_RATE]: UserAnalyticsMetricType.SUPPORT,
  [UserAnalyticsMetric.FEATURE_ADOPTION_RATE]: UserAnalyticsMetricType.ENGAGEMENT,
  [UserAnalyticsMetric.TIME_TO_VALUE]: UserAnalyticsMetricType.ACQUISITION,
  [UserAnalyticsMetric.ONBOARDING_COMPLETION_RATE]: UserAnalyticsMetricType.ACQUISITION,
  [UserAnalyticsMetric.ACTIVATION_RATE]: UserAnalyticsMetricType.ENGAGEMENT,
  [UserAnalyticsMetric.VIRALITY_COEFFICIENT]: UserAnalyticsMetricType.GROWTH,
};

/**
 * User metric format type
 */
export enum UserAnalyticsMetricFormat {
  /** Currency format */
  CURRENCY = 'CURRENCY',
  /** Percentage format */
  PERCENTAGE = 'PERCENTAGE',
  /** Number format */
  NUMBER = 'NUMBER',
  /** Time format (seconds) */
  TIME = 'TIME',
  /** Score format (0-100) */
  SCORE = 'SCORE',
  /** Ratio format */
  RATIO = 'RATIO',
}

/**
 * User metric configuration
 */
export interface UserAnalyticsMetricConfig {
  label: string;
  description: string;
  format: UserAnalyticsMetricFormat;
  icon?: string;
  color?: string;
  isReversed: boolean; // Higher is better (false) or lower is better (true)
  priority: number;
  threshold?: {
    good: number;
    average: number;
    poor: number;
  };
}

export const USER_ANALYTICS_METRIC_CONFIG: Record<UserAnalyticsMetric, UserAnalyticsMetricConfig> =
  {
    [UserAnalyticsMetric.TOTAL_USERS]: {
      label: 'Total Users',
      description: 'Total number of registered users',
      format: UserAnalyticsMetricFormat.NUMBER,
      icon: 'Users',
      color: '#3B82F6',
      isReversed: false,
      priority: 1,
    },
    [UserAnalyticsMetric.ACTIVE_USERS]: {
      label: 'Active Users',
      description: 'Number of active users in selected period',
      format: UserAnalyticsMetricFormat.NUMBER,
      icon: 'UserCheck',
      color: '#22C55E',
      isReversed: false,
      priority: 1,
    },
    [UserAnalyticsMetric.NEW_USERS]: {
      label: 'New Users',
      description: 'Number of new users in selected period',
      format: UserAnalyticsMetricFormat.NUMBER,
      icon: 'UserPlus',
      color: '#10B981',
      isReversed: false,
      priority: 2,
    },
    [UserAnalyticsMetric.RETURNING_USERS]: {
      label: 'Returning Users',
      description: 'Number of returning users in selected period',
      format: UserAnalyticsMetricFormat.NUMBER,
      icon: 'UserCheck',
      color: '#6366F1',
      isReversed: false,
      priority: 2,
    },
    [UserAnalyticsMetric.USER_GROWTH_RATE]: {
      label: 'User Growth Rate',
      description: 'Rate of user growth over time',
      format: UserAnalyticsMetricFormat.PERCENTAGE,
      icon: 'TrendingUp',
      color: '#22C55E',
      isReversed: false,
      priority: 1,
      threshold: {
        good: 10,
        average: 5,
        poor: 0,
      },
    },
    [UserAnalyticsMetric.USER_RETENTION_RATE]: {
      label: 'User Retention Rate',
      description: 'Percentage of users retained over time',
      format: UserAnalyticsMetricFormat.PERCENTAGE,
      icon: 'UserCheck',
      color: '#10B981',
      isReversed: false,
      priority: 1,
      threshold: {
        good: 80,
        average: 60,
        poor: 40,
      },
    },
    [UserAnalyticsMetric.USER_CHURN_RATE]: {
      label: 'User Churn Rate',
      description: 'Percentage of users who churned',
      format: UserAnalyticsMetricFormat.PERCENTAGE,
      icon: 'UserX',
      color: '#EF4444',
      isReversed: true,
      priority: 1,
      threshold: {
        good: 5,
        average: 10,
        poor: 20,
      },
    },
    [UserAnalyticsMetric.AVG_SESSION_DURATION]: {
      label: 'Avg Session Duration',
      description: 'Average duration of user sessions',
      format: UserAnalyticsMetricFormat.TIME,
      icon: 'Clock',
      color: '#8B5CF6',
      isReversed: false,
      priority: 2,
    },
    [UserAnalyticsMetric.PAGES_PER_SESSION]: {
      label: 'Pages Per Session',
      description: 'Average number of pages viewed per session',
      format: UserAnalyticsMetricFormat.NUMBER,
      icon: 'FileText',
      color: '#F59E0B',
      isReversed: false,
      priority: 2,
    },
    [UserAnalyticsMetric.BOUNCE_RATE]: {
      label: 'Bounce Rate',
      description: 'Percentage of single-page sessions',
      format: UserAnalyticsMetricFormat.PERCENTAGE,
      icon: 'TrendingDown',
      color: '#EF4444',
      isReversed: true,
      priority: 2,
      threshold: {
        good: 30,
        average: 50,
        poor: 70,
      },
    },
    [UserAnalyticsMetric.USER_ENGAGEMENT_SCORE]: {
      label: 'User Engagement Score',
      description: 'Overall user engagement score',
      format: UserAnalyticsMetricFormat.SCORE,
      icon: 'Activity',
      color: '#8B5CF6',
      isReversed: false,
      priority: 2,
      threshold: {
        good: 70,
        average: 50,
        poor: 30,
      },
    },
    [UserAnalyticsMetric.USER_LIFETIME_VALUE]: {
      label: 'User Lifetime Value',
      description: 'Total value generated by a user over lifetime',
      format: UserAnalyticsMetricFormat.CURRENCY,
      icon: 'DollarSign',
      color: '#22C55E',
      isReversed: false,
      priority: 1,
    },
    [UserAnalyticsMetric.USER_ACQUISITION_COST]: {
      label: 'User Acquisition Cost',
      description: 'Cost to acquire a new user',
      format: UserAnalyticsMetricFormat.CURRENCY,
      icon: 'DollarSign',
      color: '#F97316',
      isReversed: true,
      priority: 1,
    },
    [UserAnalyticsMetric.USER_SATISFACTION_SCORE]: {
      label: 'User Satisfaction Score',
      description: 'User satisfaction rating',
      format: UserAnalyticsMetricFormat.SCORE,
      icon: 'Smile',
      color: '#F59E0B',
      isReversed: false,
      priority: 1,
      threshold: {
        good: 8,
        average: 6,
        poor: 4,
      },
    },
    [UserAnalyticsMetric.USER_COMPLETION_RATE]: {
      label: 'User Completion Rate',
      description: 'Percentage of users who complete tasks',
      format: UserAnalyticsMetricFormat.PERCENTAGE,
      icon: 'CheckCircle',
      color: '#22C55E',
      isReversed: false,
      priority: 2,
      threshold: {
        good: 80,
        average: 60,
        poor: 40,
      },
    },
    [UserAnalyticsMetric.USER_DROPOFF_RATE]: {
      label: 'User Dropoff Rate',
      description: 'Percentage of users who drop off',
      format: UserAnalyticsMetricFormat.PERCENTAGE,
      icon: 'TrendingDown',
      color: '#EF4444',
      isReversed: true,
      priority: 2,
      threshold: {
        good: 20,
        average: 40,
        poor: 60,
      },
    },
    [UserAnalyticsMetric.USER_CONVERSION_RATE]: {
      label: 'User Conversion Rate',
      description: 'Percentage of users who convert',
      format: UserAnalyticsMetricFormat.PERCENTAGE,
      icon: 'TrendingUp',
      color: '#10B981',
      isReversed: false,
      priority: 1,
      threshold: {
        good: 10,
        average: 5,
        poor: 2,
      },
    },
    [UserAnalyticsMetric.USER_REFERRAL_RATE]: {
      label: 'User Referral Rate',
      description: 'Percentage of users who refer others',
      format: UserAnalyticsMetricFormat.PERCENTAGE,
      icon: 'Users',
      color: '#8B5CF6',
      isReversed: false,
      priority: 2,
      threshold: {
        good: 20,
        average: 10,
        poor: 5,
      },
    },
    [UserAnalyticsMetric.USER_SOCIAL_SHARE_RATE]: {
      label: 'User Social Share Rate',
      description: 'Percentage of users who share content',
      format: UserAnalyticsMetricFormat.PERCENTAGE,
      icon: 'Share2',
      color: '#1DA1F2',
      isReversed: false,
      priority: 3,
    },
    [UserAnalyticsMetric.USER_FEEDBACK_SCORE]: {
      label: 'User Feedback Score',
      description: 'Average user feedback rating',
      format: UserAnalyticsMetricFormat.SCORE,
      icon: 'MessageSquare',
      color: '#F472B6',
      isReversed: false,
      priority: 2,
    },
    [UserAnalyticsMetric.USER_LOYALTY_INDEX]: {
      label: 'User Loyalty Index',
      description: 'Measure of user loyalty',
      format: UserAnalyticsMetricFormat.SCORE,
      icon: 'Heart',
      color: '#EC4899',
      isReversed: false,
      priority: 2,
      threshold: {
        good: 70,
        average: 50,
        poor: 30,
      },
    },
    [UserAnalyticsMetric.DAU]: {
      label: 'Daily Active Users',
      description: 'Number of daily active users',
      format: UserAnalyticsMetricFormat.NUMBER,
      icon: 'Users',
      color: '#3B82F6',
      isReversed: false,
      priority: 2,
    },
    [UserAnalyticsMetric.WAU]: {
      label: 'Weekly Active Users',
      description: 'Number of weekly active users',
      format: UserAnalyticsMetricFormat.NUMBER,
      icon: 'Users',
      color: '#6366F1',
      isReversed: false,
      priority: 2,
    },
    [UserAnalyticsMetric.MAU]: {
      label: 'Monthly Active Users',
      description: 'Number of monthly active users',
      format: UserAnalyticsMetricFormat.NUMBER,
      icon: 'Users',
      color: '#8B5CF6',
      isReversed: false,
      priority: 2,
    },
    [UserAnalyticsMetric.STICKINESS]: {
      label: 'Stickiness',
      description: 'DAU/MAU ratio indicating user engagement',
      format: UserAnalyticsMetricFormat.RATIO,
      icon: 'Activity',
      color: '#F59E0B',
      isReversed: false,
      priority: 2,
    },
    [UserAnalyticsMetric.USER_ENGAGEMENT_RATE]: {
      label: 'User Engagement Rate',
      description: 'Percentage of engaged users',
      format: UserAnalyticsMetricFormat.PERCENTAGE,
      icon: 'Activity',
      color: '#10B981',
      isReversed: false,
      priority: 2,
      threshold: {
        good: 60,
        average: 40,
        poor: 20,
      },
    },
    [UserAnalyticsMetric.ARPU]: {
      label: 'Average Revenue Per User',
      description: 'Average revenue generated per user',
      format: UserAnalyticsMetricFormat.CURRENCY,
      icon: 'DollarSign',
      color: '#22C55E',
      isReversed: false,
      priority: 1,
    },
    [UserAnalyticsMetric.ARPPU]: {
      label: 'Average Revenue Per Paying User',
      description: 'Average revenue generated per paying user',
      format: UserAnalyticsMetricFormat.CURRENCY,
      icon: 'DollarSign',
      color: '#10B981',
      isReversed: false,
      priority: 2,
    },
    [UserAnalyticsMetric.CAC]: {
      label: 'Customer Acquisition Cost',
      description: 'Cost to acquire a paying customer',
      format: UserAnalyticsMetricFormat.CURRENCY,
      icon: 'DollarSign',
      color: '#EF4444',
      isReversed: true,
      priority: 1,
    },
    [UserAnalyticsMetric.ROI]: {
      label: 'Return on Investment',
      description: 'Return on marketing investment',
      format: UserAnalyticsMetricFormat.PERCENTAGE,
      icon: 'TrendingUp',
      color: '#22C55E',
      isReversed: false,
      priority: 1,
    },
    [UserAnalyticsMetric.NPS]: {
      label: 'Net Promoter Score',
      description: 'Net promoter score (-100 to 100)',
      format: UserAnalyticsMetricFormat.SCORE,
      icon: 'Smile',
      color: '#F59E0B',
      isReversed: false,
      priority: 1,
      threshold: {
        good: 50,
        average: 30,
        poor: 10,
      },
    },
    [UserAnalyticsMetric.CES]: {
      label: 'Customer Effort Score',
      description: 'Customer effort score (0-100)',
      format: UserAnalyticsMetricFormat.SCORE,
      icon: 'Gauge',
      color: '#8B5CF6',
      isReversed: false,
      priority: 2,
    },
    [UserAnalyticsMetric.FIRST_RESPONSE_TIME]: {
      label: 'First Response Time',
      description: 'Average time to first response',
      format: UserAnalyticsMetricFormat.TIME,
      icon: 'Clock',
      color: '#F59E0B',
      isReversed: true,
      priority: 3,
    },
    [UserAnalyticsMetric.RESOLUTION_TIME]: {
      label: 'Resolution Time',
      description: 'Average time to resolve issues',
      format: UserAnalyticsMetricFormat.TIME,
      icon: 'Clock',
      color: '#F97316',
      isReversed: true,
      priority: 3,
    },
    [UserAnalyticsMetric.TICKET_VOLUME]: {
      label: 'Ticket Volume',
      description: 'Number of support tickets',
      format: UserAnalyticsMetricFormat.NUMBER,
      icon: 'MessageSquare',
      color: '#6366F1',
      isReversed: true,
      priority: 3,
    },
    [UserAnalyticsMetric.RESOLUTION_RATE]: {
      label: 'Resolution Rate',
      description: 'Percentage of resolved tickets',
      format: UserAnalyticsMetricFormat.PERCENTAGE,
      icon: 'CheckCircle',
      color: '#22C55E',
      isReversed: false,
      priority: 2,
    },
    [UserAnalyticsMetric.FEATURE_ADOPTION_RATE]: {
      label: 'Feature Adoption Rate',
      description: 'Percentage of users using features',
      format: UserAnalyticsMetricFormat.PERCENTAGE,
      icon: 'Rocket',
      color: '#8B5CF6',
      isReversed: false,
      priority: 2,
    },
    [UserAnalyticsMetric.TIME_TO_VALUE]: {
      label: 'Time to Value',
      description: 'Time taken to realize value',
      format: UserAnalyticsMetricFormat.TIME,
      icon: 'Clock',
      color: '#10B981',
      isReversed: true,
      priority: 2,
    },
    [UserAnalyticsMetric.ONBOARDING_COMPLETION_RATE]: {
      label: 'Onboarding Completion Rate',
      description: 'Percentage of users completing onboarding',
      format: UserAnalyticsMetricFormat.PERCENTAGE,
      icon: 'UserCheck',
      color: '#22C55E',
      isReversed: false,
      priority: 2,
    },
    [UserAnalyticsMetric.ACTIVATION_RATE]: {
      label: 'User Activation Rate',
      description: 'Percentage of activated users',
      format: UserAnalyticsMetricFormat.PERCENTAGE,
      icon: 'UserPlus',
      color: '#10B981',
      isReversed: false,
      priority: 2,
    },
    [UserAnalyticsMetric.VIRALITY_COEFFICIENT]: {
      label: 'Virality Coefficient',
      description: 'User virality and growth coefficient',
      format: UserAnalyticsMetricFormat.RATIO,
      icon: 'Share2',
      color: '#EC4899',
      isReversed: false,
      priority: 2,
    },
  };

/**
 * Get user metric category
 */
export function getUserMetricCategory(metric: UserAnalyticsMetric): UserAnalyticsMetricType {
  return USER_ANALYTICS_METRIC_CATEGORY_MAP[metric];
}

/**
 * Get user metric label
 */
export function getUserMetricLabel(metric: UserAnalyticsMetric): string {
  return USER_ANALYTICS_METRIC_CONFIG[metric]?.label || metric;
}

/**
 * Get user metric description
 */
export function getUserMetricDescription(metric: UserAnalyticsMetric): string {
  return USER_ANALYTICS_METRIC_CONFIG[metric]?.description || '';
}

/**
 * Get user metric format
 */
export function getUserMetricFormat(metric: UserAnalyticsMetric): UserAnalyticsMetricFormat {
  return USER_ANALYTICS_METRIC_CONFIG[metric]?.format || UserAnalyticsMetricFormat.NUMBER;
}

/**
 * Check if user metric is reversed (lower is better)
 */
export function isUserMetricReversed(metric: UserAnalyticsMetric): boolean {
  return USER_ANALYTICS_METRIC_CONFIG[metric]?.isReversed || false;
}

/**
 * Get user metrics by category
 */
export function getUserMetricsByCategory(category: UserAnalyticsMetricType): UserAnalyticsMetric[] {
  return Object.entries(USER_ANALYTICS_METRIC_CATEGORY_MAP)
    .filter(([_, cat]) => cat === category)
    .map(([metric]) => metric as UserAnalyticsMetric);
}

/**
 * Format user metric value
 */
export function formatUserMetricValue(metric: UserAnalyticsMetric, value: number): string {
  const format = getUserMetricFormat(metric);

  switch (format) {
    case UserAnalyticsMetricFormat.CURRENCY:
      return `$${value.toFixed(2)}`;
    case UserAnalyticsMetricFormat.PERCENTAGE:
      return `${(value * 100).toFixed(2)}%`;
    case UserAnalyticsMetricFormat.TIME:
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
    case UserAnalyticsMetricFormat.SCORE:
      return value.toFixed(1);
    case UserAnalyticsMetricFormat.RATIO:
      return value.toFixed(2);
    default:
      return value.toLocaleString();
  }
}

/**
 * Get user metric priority
 */
export function getUserMetricPriority(metric: UserAnalyticsMetric): number {
  return USER_ANALYTICS_METRIC_CONFIG[metric]?.priority || 3;
}

/**
 * Get high priority user metrics
 */
export function getHighPriorityUserMetrics(): UserAnalyticsMetric[] {
  return Object.values(UserAnalyticsMetric).filter((metric) => getUserMetricPriority(metric) === 1);
}

/**
 * Get user metric thresholds
 */
export function getUserMetricThreshold(
  metric: UserAnalyticsMetric
): { good: number; average: number; poor: number } | undefined {
  return USER_ANALYTICS_METRIC_CONFIG[metric]?.threshold;
}

/**
 * Evaluate user metric performance
 */
export function evaluateUserMetricPerformance(
  metric: UserAnalyticsMetric,
  value: number
): 'good' | 'average' | 'poor' {
  const threshold = getUserMetricThreshold(metric);
  if (!threshold) {
    return 'average';
  }

  const isReversed = isUserMetricReversed(metric);

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
 * User metrics for dashboard
 */
export const USER_DASHBOARD_METRICS: UserAnalyticsMetric[] = [
  UserAnalyticsMetric.TOTAL_USERS,
  UserAnalyticsMetric.ACTIVE_USERS,
  UserAnalyticsMetric.NEW_USERS,
  UserAnalyticsMetric.USER_GROWTH_RATE,
  UserAnalyticsMetric.USER_RETENTION_RATE,
  UserAnalyticsMetric.USER_CHURN_RATE,
  UserAnalyticsMetric.USER_LIFETIME_VALUE,
  UserAnalyticsMetric.USER_SATISFACTION_SCORE,
  UserAnalyticsMetric.USER_CONVERSION_RATE,
];

/**
 * User acquisition metrics
 */
export const USER_ACQUISITION_METRICS: UserAnalyticsMetric[] = [
  UserAnalyticsMetric.NEW_USERS,
  UserAnalyticsMetric.USER_ACQUISITION_COST,
  UserAnalyticsMetric.USER_CONVERSION_RATE,
  UserAnalyticsMetric.TIME_TO_VALUE,
  UserAnalyticsMetric.ONBOARDING_COMPLETION_RATE,
  UserAnalyticsMetric.ACTIVATION_RATE,
];

/**
 * User engagement metrics
 */
export const USER_ENGAGEMENT_METRICS: UserAnalyticsMetric[] = [
  UserAnalyticsMetric.USER_ENGAGEMENT_SCORE,
  UserAnalyticsMetric.USER_ENGAGEMENT_RATE,
  UserAnalyticsMetric.AVG_SESSION_DURATION,
  UserAnalyticsMetric.PAGES_PER_SESSION,
  UserAnalyticsMetric.BOUNCE_RATE,
  UserAnalyticsMetric.STICKINESS,
  UserAnalyticsMetric.FEATURE_ADOPTION_RATE,
];

/**
 * User retention metrics
 */
export const USER_RETENTION_METRICS: UserAnalyticsMetric[] = [
  UserAnalyticsMetric.USER_RETENTION_RATE,
  UserAnalyticsMetric.USER_CHURN_RATE,
  UserAnalyticsMetric.USER_LOYALTY_INDEX,
  UserAnalyticsMetric.USER_LIFETIME_VALUE,
  UserAnalyticsMetric.RETURNING_USERS,
];

/**
 * User financial metrics
 */
export const USER_FINANCIAL_METRICS: UserAnalyticsMetric[] = [
  UserAnalyticsMetric.USER_LIFETIME_VALUE,
  UserAnalyticsMetric.ARPU,
  UserAnalyticsMetric.ARPPU,
  UserAnalyticsMetric.CAC,
  UserAnalyticsMetric.ROI,
  UserAnalyticsMetric.USER_ACQUISITION_COST,
];

/**
 * User satisfaction metrics
 */
export const USER_SATISFACTION_METRICS: UserAnalyticsMetric[] = [
  UserAnalyticsMetric.USER_SATISFACTION_SCORE,
  UserAnalyticsMetric.USER_FEEDBACK_SCORE,
  UserAnalyticsMetric.NPS,
  UserAnalyticsMetric.CES,
];
