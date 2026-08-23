/**
 * Engagement Analytics Constants
 * Configuration for user engagement analytics and tracking
 */

export const ENGAGEMENT_ANALYTICS = {
  // Engagement Analytics Types
  TYPES: {
    // User Engagement
    USER: 'user',
    SESSION: 'session',
    INTERACTION: 'interaction',
    ACTIVITY: 'activity',

    // Content Engagement
    CONTENT: 'content',
    VIEW: 'view',
    READ: 'read',
    WATCH: 'watch',
    LISTEN: 'listen',

    // Social Engagement
    SOCIAL: 'social',
    SHARE: 'share',
    LIKE: 'like',
    COMMENT: 'comment',
    FOLLOW: 'follow',

    // Time Engagement
    DURATION: 'duration',
    FREQUENCY: 'frequency',
    RECENCY: 'recency',
    INTENSITY: 'intensity',

    // Time Analytics
    DAILY: 'daily',
    WEEKLY: 'weekly',
    MONTHLY: 'monthly',
    QUARTERLY: 'quarterly',
    YEARLY: 'yearly',
  } as const,

  // Engagement Analytics Status
  STATUS: {
    TRACKING: 'tracking',
    PROCESSING: 'processing',
    ANALYZING: 'analyzing',
    COMPLETED: 'completed',
    FAILED: 'failed',
    PAUSED: 'paused',
    STOPPED: 'stopped',
    UPDATING: 'updating',
    REFRESHING: 'refreshing',
  } as const,

  // Engagement Analytics Scopes
  SCOPES: {
    INDIVIDUAL: 'individual',
    SEGMENT: 'segment',
    COHORT: 'cohort',
    CONTENT: 'content',
    ALL_ENGAGEMENT: 'all_engagement',
    COMPARATIVE: 'comparative',
  } as const,

  // Engagement Analytics Events
  EVENTS: {
    // User Engagement Events
    USER_ENGAGED: 'user_engaged',
    USER_DISENGAGED: 'user_disengaged',
    USER_ACTIVE: 'user_active',
    USER_INACTIVE: 'user_inactive',

    // Session Events
    SESSION_START: 'session_start',
    SESSION_END: 'session_end',
    SESSION_DURATION: 'session_duration',
    SESSION_DEPTH: 'session_depth',

    // Content Events
    CONTENT_VIEWED: 'content_viewed',
    CONTENT_READ: 'content_read',
    CONTENT_WATCHED: 'content_watched',
    CONTENT_LISTENED: 'content_listened',
    CONTENT_SCROLLED: 'content_scrolled',

    // Interaction Events
    CLICK: 'click',
    HOVER: 'hover',
    SCROLL: 'scroll',
    TAP: 'tap',
    SWIPE: 'swipe',

    // Social Events
    SHARE: 'share',
    LIKE: 'like',
    COMMENT: 'comment',
    FOLLOW: 'follow',
    UNFOLLOW: 'unfollow',

    // Conversion Events
    MICRO_CONVERSION: 'micro_conversion',
    MACRO_CONVERSION: 'macro_conversion',
    GOAL_COMPLETED: 'goal_completed',

    // Milestone Events
    MILESTONE_ACHIEVED: 'milestone_achieved',
    LEVEL_UP: 'level_up',
    BADGE_EARNED: 'badge_earned',
  } as const,

  // Engagement Analytics Dimensions
  DIMENSIONS: {
    // User Attributes
    USER_ID: 'user_id',
    USER_NAME: 'user_name',
    USER_TYPE: 'user_type',
    USER_SEGMENT: 'user_segment',

    // Session Attributes
    SESSION_ID: 'session_id',
    SESSION_DURATION: 'session_duration',
    SESSION_DEPTH: 'session_depth',

    // Content Attributes
    CONTENT_ID: 'content_id',
    CONTENT_TYPE: 'content_type',
    CONTENT_CATEGORY: 'content_category',
    CONTENT_TITLE: 'content_title',

    // Interaction Attributes
    INTERACTION_TYPE: 'interaction_type',
    INTERACTION_VALUE: 'interaction_value',
    INTERACTION_DURATION: 'interaction_duration',

    // Social Attributes
    SOCIAL_TYPE: 'social_type',
    SOCIAL_PLATFORM: 'social_platform',

    // Time Attributes
    ENGAGEMENT_DATE: 'engagement_date',
    ENGAGEMENT_HOUR: 'engagement_hour',
    ENGAGEMENT_DAY: 'engagement_day',
    ENGAGEMENT_WEEK: 'engagement_week',
    ENGAGEMENT_MONTH: 'engagement_month',

    // Device Attributes
    DEVICE_TYPE: 'device_type',
    BROWSER: 'browser',
    OS: 'os',
  } as const,

  // Engagement Analytics Metrics
  METRICS: {
    // User Metrics
    ACTIVE_USERS: 'active_users',
    ENGAGED_USERS: 'engaged_users',
    DISENGAGED_USERS: 'disengaged_users',
    USER_ENGAGEMENT_RATE: 'user_engagement_rate',

    // Session Metrics
    TOTAL_SESSIONS: 'total_sessions',
    AVG_SESSION_DURATION: 'avg_session_duration',
    AVG_SESSION_DEPTH: 'avg_session_depth',

    // Content Metrics
    TOTAL_VIEWS: 'total_views',
    UNIQUE_VIEWS: 'unique_views',
    AVG_VIEW_DURATION: 'avg_view_duration',
    VIEW_COMPLETION_RATE: 'view_completion_rate',

    // Interaction Metrics
    TOTAL_INTERACTIONS: 'total_interactions',
    AVG_INTERACTIONS_PER_SESSION: 'avg_interactions_per_session',
    INTERACTION_RATE: 'interaction_rate',

    // Social Metrics
    TOTAL_SHARES: 'total_shares',
    TOTAL_LIKES: 'total_likes',
    TOTAL_COMMENTS: 'total_comments',
    SOCIAL_ENGAGEMENT_RATE: 'social_engagement_rate',

    // Conversion Metrics
    MICRO_CONVERSIONS: 'micro_conversions',
    MACRO_CONVERSIONS: 'macro_conversions',
    CONVERSION_RATE: 'conversion_rate',

    // Milestone Metrics
    MILESTONES_ACHIEVED: 'milestones_achieved',
    LEVEL_UP_RATE: 'level_up_rate',
    BADGE_EARN_RATE: 'badge_earn_rate',

    // Comparison Metrics
    YEAR_OVER_YEAR: 'year_over_year',
    QUARTER_OVER_QUARTER: 'quarter_over_quarter',
    MONTH_OVER_MONTH: 'month_over_month',
    PERIOD_COMPARISON: 'period_comparison',
  } as const,

  // Engagement Analytics Segments
  SEGMENTS: {
    // User Segments
    HIGHLY_ENGAGED: 'highly_engaged',
    ENGAGED: 'engaged',
    MODERATELY_ENGAGED: 'moderately_engaged',
    LOW_ENGAGED: 'low_engaged',
    DISENGAGED: 'disengaged',

    // Content Segments
    POPULAR: 'popular',
    TRENDING: 'trending',
    VIRAL: 'viral',
    NICHE: 'niche',

    // Time Segments
    PEAK_HOURS: 'peak_hours',
    OFF_PEAK_HOURS: 'off_peak_hours',
    WEEKEND: 'weekend',
    WEEKDAY: 'weekday',

    // Device Segments
    MOBILE: 'mobile',
    DESKTOP: 'desktop',
    TABLET: 'tablet',

    // Interaction Segments
    ACTIVE_INTERACTORS: 'active_interactors',
    PASSIVE_VIEWERS: 'passive_viewers',
    SOCIAL_SHARERS: 'social_sharers',
  } as const,

  // Engagement Analytics Cohorts
  COHORTS: {
    FIRST_ENGAGEMENT: 'first_engagement',
    ACQUISITION_CHANNEL: 'acquisition_channel',
    USER_TYPE: 'user_type',
    CONTENT_TYPE: 'content_type',
    DEVICE_TYPE: 'device_type',
  } as const,

  // Engagement Analytics Granularity
  GRANULARITY: {
    HOURLY: 'hourly',
    DAILY: 'daily',
    WEEKLY: 'weekly',
    MONTHLY: 'monthly',
    QUARTERLY: 'quarterly',
    YEARLY: 'yearly',
  } as const,
} as const;

// Engagement Analytics Types
export type EngagementAnalyticsType =
  (typeof ENGAGEMENT_ANALYTICS.TYPES)[keyof typeof ENGAGEMENT_ANALYTICS.TYPES];

// Engagement Analytics Status
export type EngagementAnalyticsStatus =
  (typeof ENGAGEMENT_ANALYTICS.STATUS)[keyof typeof ENGAGEMENT_ANALYTICS.STATUS];

// Engagement Analytics Scopes
export type EngagementAnalyticsScope =
  (typeof ENGAGEMENT_ANALYTICS.SCOPES)[keyof typeof ENGAGEMENT_ANALYTICS.SCOPES];

// Engagement Analytics Events
export type EngagementAnalyticsEvent =
  (typeof ENGAGEMENT_ANALYTICS.EVENTS)[keyof typeof ENGAGEMENT_ANALYTICS.EVENTS];

// Engagement Analytics Dimensions
export type EngagementAnalyticsDimension =
  (typeof ENGAGEMENT_ANALYTICS.DIMENSIONS)[keyof typeof ENGAGEMENT_ANALYTICS.DIMENSIONS];

// Engagement Analytics Metrics
export type EngagementAnalyticsMetric =
  (typeof ENGAGEMENT_ANALYTICS.METRICS)[keyof typeof ENGAGEMENT_ANALYTICS.METRICS];

// Engagement Analytics Segments
export type EngagementAnalyticsSegment =
  (typeof ENGAGEMENT_ANALYTICS.SEGMENTS)[keyof typeof ENGAGEMENT_ANALYTICS.SEGMENTS];

// Engagement Analytics Cohorts
export type EngagementAnalyticsCohort =
  (typeof ENGAGEMENT_ANALYTICS.COHORTS)[keyof typeof ENGAGEMENT_ANALYTICS.COHORTS];

// Engagement Analytics Granularity
export type EngagementAnalyticsGranularity =
  (typeof ENGAGEMENT_ANALYTICS.GRANULARITY)[keyof typeof ENGAGEMENT_ANALYTICS.GRANULARITY];

// Engagement Analytics Status Labels
export function getEngagementAnalyticsStatusLabel(status: EngagementAnalyticsStatus): string {
  const labels: Record<EngagementAnalyticsStatus, string> = {
    [ENGAGEMENT_ANALYTICS.STATUS.TRACKING]: 'Tracking',
    [ENGAGEMENT_ANALYTICS.STATUS.PROCESSING]: 'Processing',
    [ENGAGEMENT_ANALYTICS.STATUS.ANALYZING]: 'Analyzing',
    [ENGAGEMENT_ANALYTICS.STATUS.COMPLETED]: 'Completed',
    [ENGAGEMENT_ANALYTICS.STATUS.FAILED]: 'Failed',
    [ENGAGEMENT_ANALYTICS.STATUS.PAUSED]: 'Paused',
    [ENGAGEMENT_ANALYTICS.STATUS.STOPPED]: 'Stopped',
    [ENGAGEMENT_ANALYTICS.STATUS.UPDATING]: 'Updating',
    [ENGAGEMENT_ANALYTICS.STATUS.REFRESHING]: 'Refreshing',
  };
  return labels[status] || 'Unknown';
}

// Engagement Analytics Event Labels
export function getEngagementAnalyticsEventLabel(event: EngagementAnalyticsEvent): string {
  const labels: Record<EngagementAnalyticsEvent, string> = {
    [ENGAGEMENT_ANALYTICS.EVENTS.USER_ENGAGED]: 'User Engaged',
    [ENGAGEMENT_ANALYTICS.EVENTS.USER_DISENGAGED]: 'User Disengaged',
    [ENGAGEMENT_ANALYTICS.EVENTS.USER_ACTIVE]: 'User Active',
    [ENGAGEMENT_ANALYTICS.EVENTS.USER_INACTIVE]: 'User Inactive',
    [ENGAGEMENT_ANALYTICS.EVENTS.SESSION_START]: 'Session Start',
    [ENGAGEMENT_ANALYTICS.EVENTS.SESSION_END]: 'Session End',
    [ENGAGEMENT_ANALYTICS.EVENTS.SESSION_DURATION]: 'Session Duration',
    [ENGAGEMENT_ANALYTICS.EVENTS.SESSION_DEPTH]: 'Session Depth',
    [ENGAGEMENT_ANALYTICS.EVENTS.CONTENT_VIEWED]: 'Content Viewed',
    [ENGAGEMENT_ANALYTICS.EVENTS.CONTENT_READ]: 'Content Read',
    [ENGAGEMENT_ANALYTICS.EVENTS.CONTENT_WATCHED]: 'Content Watched',
    [ENGAGEMENT_ANALYTICS.EVENTS.CONTENT_LISTENED]: 'Content Listened',
    [ENGAGEMENT_ANALYTICS.EVENTS.CONTENT_SCROLLED]: 'Content Scrolled',
    [ENGAGEMENT_ANALYTICS.EVENTS.CLICK]: 'Click',
    [ENGAGEMENT_ANALYTICS.EVENTS.HOVER]: 'Hover',
    [ENGAGEMENT_ANALYTICS.EVENTS.SCROLL]: 'Scroll',
    [ENGAGEMENT_ANALYTICS.EVENTS.TAP]: 'Tap',
    [ENGAGEMENT_ANALYTICS.EVENTS.SWIPE]: 'Swipe',
    [ENGAGEMENT_ANALYTICS.EVENTS.SHARE]: 'Share',
    [ENGAGEMENT_ANALYTICS.EVENTS.LIKE]: 'Like',
    [ENGAGEMENT_ANALYTICS.EVENTS.COMMENT]: 'Comment',
    [ENGAGEMENT_ANALYTICS.EVENTS.FOLLOW]: 'Follow',
    [ENGAGEMENT_ANALYTICS.EVENTS.UNFOLLOW]: 'Unfollow',
    [ENGAGEMENT_ANALYTICS.EVENTS.MICRO_CONVERSION]: 'Micro Conversion',
    [ENGAGEMENT_ANALYTICS.EVENTS.MACRO_CONVERSION]: 'Macro Conversion',
    [ENGAGEMENT_ANALYTICS.EVENTS.GOAL_COMPLETED]: 'Goal Completed',
    [ENGAGEMENT_ANALYTICS.EVENTS.MILESTONE_ACHIEVED]: 'Milestone Achieved',
    [ENGAGEMENT_ANALYTICS.EVENTS.LEVEL_UP]: 'Level Up',
    [ENGAGEMENT_ANALYTICS.EVENTS.BADGE_EARNED]: 'Badge Earned',
  };
  return labels[event] || 'Unknown';
}

// Engagement Analytics Dimension Labels
export function getEngagementAnalyticsDimensionLabel(
  dimension: EngagementAnalyticsDimension
): string {
  const labels: Record<EngagementAnalyticsDimension, string> = {
    [ENGAGEMENT_ANALYTICS.DIMENSIONS.USER_ID]: 'User ID',
    [ENGAGEMENT_ANALYTICS.DIMENSIONS.USER_NAME]: 'User Name',
    [ENGAGEMENT_ANALYTICS.DIMENSIONS.USER_TYPE]: 'User Type',
    [ENGAGEMENT_ANALYTICS.DIMENSIONS.USER_SEGMENT]: 'User Segment',
    [ENGAGEMENT_ANALYTICS.DIMENSIONS.SESSION_ID]: 'Session ID',
    [ENGAGEMENT_ANALYTICS.DIMENSIONS.SESSION_DURATION]: 'Session Duration',
    [ENGAGEMENT_ANALYTICS.DIMENSIONS.SESSION_DEPTH]: 'Session Depth',
    [ENGAGEMENT_ANALYTICS.DIMENSIONS.CONTENT_ID]: 'Content ID',
    [ENGAGEMENT_ANALYTICS.DIMENSIONS.CONTENT_TYPE]: 'Content Type',
    [ENGAGEMENT_ANALYTICS.DIMENSIONS.CONTENT_CATEGORY]: 'Content Category',
    [ENGAGEMENT_ANALYTICS.DIMENSIONS.CONTENT_TITLE]: 'Content Title',
    [ENGAGEMENT_ANALYTICS.DIMENSIONS.INTERACTION_TYPE]: 'Interaction Type',
    [ENGAGEMENT_ANALYTICS.DIMENSIONS.INTERACTION_VALUE]: 'Interaction Value',
    [ENGAGEMENT_ANALYTICS.DIMENSIONS.INTERACTION_DURATION]: 'Interaction Duration',
    [ENGAGEMENT_ANALYTICS.DIMENSIONS.SOCIAL_TYPE]: 'Social Type',
    [ENGAGEMENT_ANALYTICS.DIMENSIONS.SOCIAL_PLATFORM]: 'Social Platform',
    [ENGAGEMENT_ANALYTICS.DIMENSIONS.ENGAGEMENT_DATE]: 'Engagement Date',
    [ENGAGEMENT_ANALYTICS.DIMENSIONS.ENGAGEMENT_HOUR]: 'Engagement Hour',
    [ENGAGEMENT_ANALYTICS.DIMENSIONS.ENGAGEMENT_DAY]: 'Engagement Day',
    [ENGAGEMENT_ANALYTICS.DIMENSIONS.ENGAGEMENT_WEEK]: 'Engagement Week',
    [ENGAGEMENT_ANALYTICS.DIMENSIONS.ENGAGEMENT_MONTH]: 'Engagement Month',
    [ENGAGEMENT_ANALYTICS.DIMENSIONS.DEVICE_TYPE]: 'Device Type',
    [ENGAGEMENT_ANALYTICS.DIMENSIONS.BROWSER]: 'Browser',
    [ENGAGEMENT_ANALYTICS.DIMENSIONS.OS]: 'OS',
  };
  return labels[dimension] || 'Unknown';
}

// Engagement Analytics Segment Labels
export function getEngagementAnalyticsSegmentLabel(segment: EngagementAnalyticsSegment): string {
  const labels: Record<EngagementAnalyticsSegment, string> = {
    [ENGAGEMENT_ANALYTICS.SEGMENTS.HIGHLY_ENGAGED]: 'Highly Engaged',
    [ENGAGEMENT_ANALYTICS.SEGMENTS.ENGAGED]: 'Engaged',
    [ENGAGEMENT_ANALYTICS.SEGMENTS.MODERATELY_ENGAGED]: 'Moderately Engaged',
    [ENGAGEMENT_ANALYTICS.SEGMENTS.LOW_ENGAGED]: 'Low Engaged',
    [ENGAGEMENT_ANALYTICS.SEGMENTS.DISENGAGED]: 'Disengaged',
    [ENGAGEMENT_ANALYTICS.SEGMENTS.POPULAR]: 'Popular',
    [ENGAGEMENT_ANALYTICS.SEGMENTS.TRENDING]: 'Trending',
    [ENGAGEMENT_ANALYTICS.SEGMENTS.VIRAL]: 'Viral',
    [ENGAGEMENT_ANALYTICS.SEGMENTS.NICHE]: 'Niche',
    [ENGAGEMENT_ANALYTICS.SEGMENTS.PEAK_HOURS]: 'Peak Hours',
    [ENGAGEMENT_ANALYTICS.SEGMENTS.OFF_PEAK_HOURS]: 'Off Peak Hours',
    [ENGAGEMENT_ANALYTICS.SEGMENTS.WEEKEND]: 'Weekend',
    [ENGAGEMENT_ANALYTICS.SEGMENTS.WEEKDAY]: 'Weekday',
    [ENGAGEMENT_ANALYTICS.SEGMENTS.MOBILE]: 'Mobile',
    [ENGAGEMENT_ANALYTICS.SEGMENTS.DESKTOP]: 'Desktop',
    [ENGAGEMENT_ANALYTICS.SEGMENTS.TABLET]: 'Tablet',
    [ENGAGEMENT_ANALYTICS.SEGMENTS.ACTIVE_INTERACTORS]: 'Active Interactors',
    [ENGAGEMENT_ANALYTICS.SEGMENTS.PASSIVE_VIEWERS]: 'Passive Viewers',
    [ENGAGEMENT_ANALYTICS.SEGMENTS.SOCIAL_SHARERS]: 'Social Sharers',
  };
  return labels[segment] || 'Unknown';
}

// Engagement Analytics Cohort Labels
export function getEngagementAnalyticsCohortLabel(cohort: EngagementAnalyticsCohort): string {
  const labels: Record<EngagementAnalyticsCohort, string> = {
    [ENGAGEMENT_ANALYTICS.COHORTS.FIRST_ENGAGEMENT]: 'First Engagement',
    [ENGAGEMENT_ANALYTICS.COHORTS.ACQUISITION_CHANNEL]: 'Acquisition Channel',
    [ENGAGEMENT_ANALYTICS.COHORTS.USER_TYPE]: 'User Type',
    [ENGAGEMENT_ANALYTICS.COHORTS.CONTENT_TYPE]: 'Content Type',
    [ENGAGEMENT_ANALYTICS.COHORTS.DEVICE_TYPE]: 'Device Type',
  };
  return labels[cohort] || 'Unknown';
}

// Engagement Analytics Granularity Labels
export function getEngagementAnalyticsGranularityLabel(
  granularity: EngagementAnalyticsGranularity
): string {
  const labels: Record<EngagementAnalyticsGranularity, string> = {
    [ENGAGEMENT_ANALYTICS.GRANULARITY.HOURLY]: 'Hourly',
    [ENGAGEMENT_ANALYTICS.GRANULARITY.DAILY]: 'Daily',
    [ENGAGEMENT_ANALYTICS.GRANULARITY.WEEKLY]: 'Weekly',
    [ENGAGEMENT_ANALYTICS.GRANULARITY.MONTHLY]: 'Monthly',
    [ENGAGEMENT_ANALYTICS.GRANULARITY.QUARTERLY]: 'Quarterly',
    [ENGAGEMENT_ANALYTICS.GRANULARITY.YEARLY]: 'Yearly',
  };
  return labels[granularity] || 'Unknown';
}

// Check if engagement analytics is active
export function isEngagementAnalyticsActive(status: EngagementAnalyticsStatus): boolean {
  const activeStatuses: EngagementAnalyticsStatus[] = [
    ENGAGEMENT_ANALYTICS.STATUS.TRACKING,
    ENGAGEMENT_ANALYTICS.STATUS.PROCESSING,
    ENGAGEMENT_ANALYTICS.STATUS.ANALYZING,
    ENGAGEMENT_ANALYTICS.STATUS.UPDATING,
    ENGAGEMENT_ANALYTICS.STATUS.REFRESHING,
  ];
  return activeStatuses.includes(status);
}

// Check if engagement analytics is completed
export function isEngagementAnalyticsCompleted(status: EngagementAnalyticsStatus): boolean {
  return status === ENGAGEMENT_ANALYTICS.STATUS.COMPLETED;
}

// Check if engagement analytics has failed
export function isEngagementAnalyticsFailed(status: EngagementAnalyticsStatus): boolean {
  return status === ENGAGEMENT_ANALYTICS.STATUS.FAILED;
}

// Check if event is user engagement event
export function isEngagementAnalyticsUserEvent(event: EngagementAnalyticsEvent): boolean {
  const userEvents: EngagementAnalyticsEvent[] = [
    ENGAGEMENT_ANALYTICS.EVENTS.USER_ENGAGED,
    ENGAGEMENT_ANALYTICS.EVENTS.USER_DISENGAGED,
    ENGAGEMENT_ANALYTICS.EVENTS.USER_ACTIVE,
    ENGAGEMENT_ANALYTICS.EVENTS.USER_INACTIVE,
  ];
  return userEvents.includes(event);
}

// Check if event is session event
export function isEngagementAnalyticsSessionEvent(event: EngagementAnalyticsEvent): boolean {
  const sessionEvents: EngagementAnalyticsEvent[] = [
    ENGAGEMENT_ANALYTICS.EVENTS.SESSION_START,
    ENGAGEMENT_ANALYTICS.EVENTS.SESSION_END,
    ENGAGEMENT_ANALYTICS.EVENTS.SESSION_DURATION,
    ENGAGEMENT_ANALYTICS.EVENTS.SESSION_DEPTH,
  ];
  return sessionEvents.includes(event);
}

// Check if event is content event
export function isEngagementAnalyticsContentEvent(event: EngagementAnalyticsEvent): boolean {
  const contentEvents: EngagementAnalyticsEvent[] = [
    ENGAGEMENT_ANALYTICS.EVENTS.CONTENT_VIEWED,
    ENGAGEMENT_ANALYTICS.EVENTS.CONTENT_READ,
    ENGAGEMENT_ANALYTICS.EVENTS.CONTENT_WATCHED,
    ENGAGEMENT_ANALYTICS.EVENTS.CONTENT_LISTENED,
    ENGAGEMENT_ANALYTICS.EVENTS.CONTENT_SCROLLED,
  ];
  return contentEvents.includes(event);
}

// Check if event is social event
export function isEngagementAnalyticsSocialEvent(event: EngagementAnalyticsEvent): boolean {
  const socialEvents: EngagementAnalyticsEvent[] = [
    ENGAGEMENT_ANALYTICS.EVENTS.SHARE,
    ENGAGEMENT_ANALYTICS.EVENTS.LIKE,
    ENGAGEMENT_ANALYTICS.EVENTS.COMMENT,
    ENGAGEMENT_ANALYTICS.EVENTS.FOLLOW,
    ENGAGEMENT_ANALYTICS.EVENTS.UNFOLLOW,
  ];
  return socialEvents.includes(event);
}
