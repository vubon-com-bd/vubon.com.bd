/**
 * User Analytics Constants
 * Configuration for user behavior analytics and tracking
 */

export const USER_ANALYTICS = {
  // User Analytics Types
  TYPES: {
    // Behavior Analytics
    BEHAVIOR: 'behavior',
    ENGAGEMENT: 'engagement',
    RETENTION: 'retention',
    CHURN: 'churn',
    LIFECYCLE: 'lifecycle',

    // Activity Analytics
    ACTIVITY: 'activity',
    SESSION: 'session',
    INTERACTION: 'interaction',
    NAVIGATION: 'navigation',

    // Performance Analytics
    PERFORMANCE: 'performance',
    COMPLETION: 'completion',
    CONVERSION: 'conversion',
    SATISFACTION: 'satisfaction',

    // Demographic Analytics
    DEMOGRAPHIC: 'demographic',
    GEOGRAPHIC: 'geographic',
    PSYCHOGRAPHIC: 'psychographic',
    BEHAVIORAL: 'behavioral',
  } as const,

  // User Analytics Status
  STATUS: {
    TRACKING: 'tracking',
    PROCESSING: 'processing',
    ANALYZING: 'analyzing',
    COMPLETED: 'completed',
    FAILED: 'failed',
    PAUSED: 'paused',
    STOPPED: 'stopped',
  } as const,

  // User Analytics Scopes
  SCOPES: {
    INDIVIDUAL: 'individual',
    COHORT: 'cohort',
    SEGMENT: 'segment',
    ALL_USERS: 'all_users',
    ANONYMOUS: 'anonymous',
    AUTHENTICATED: 'authenticated',
  } as const,

  // User Analytics Events
  EVENTS: {
    // User Lifecycle Events
    SIGNUP: 'signup',
    VERIFICATION: 'verification',
    PROFILE_COMPLETION: 'profile_completion',
    FIRST_PURCHASE: 'first_purchase',
    RETURNING: 'returning',
    CHURN: 'churn',

    // User Activity Events
    LOGIN: 'login',
    LOGOUT: 'logout',
    SESSION_START: 'session_start',
    SESSION_END: 'session_end',
    PAGE_VIEW: 'page_view',
    SCROLL: 'scroll',
    CLICK: 'click',

    // User Engagement Events
    TIME_SPENT: 'time_spent',
    INTERACTION: 'interaction',
    FEEDBACK: 'feedback',
    RATING: 'rating',
    REVIEW: 'review',
    SHARE: 'share',
    REFERRAL: 'referral',

    // User Progress Events
    MILESTONE: 'milestone',
    ACHIEVEMENT: 'achievement',
    LEVEL_UP: 'level_up',
    BADGE: 'badge',

    // User Support Events
    SUPPORT_REQUEST: 'support_request',
    TICKET: 'ticket',
    RESOLUTION: 'resolution',
    SATISFACTION_SURVEY: 'satisfaction_survey',
  } as const,

  // User Analytics Dimensions
  DIMENSIONS: {
    // User Attributes
    USER_ID: 'user_id',
    USER_NAME: 'user_name',
    USER_EMAIL: 'user_email',
    USER_TYPE: 'user_type',
    USER_ROLE: 'user_role',
    USER_STATUS: 'user_status',

    // Demographic Attributes
    AGE_GROUP: 'age_group',
    GENDER: 'gender',
    INCOME_GROUP: 'income_group',
    EDUCATION: 'education',
    OCCUPATION: 'occupation',

    // Geographic Attributes
    COUNTRY: 'country',
    REGION: 'region',
    CITY: 'city',
    TIMEZONE: 'timezone',
    LANGUAGE: 'language',

    // Behavioral Attributes
    DEVICE_TYPE: 'device_type',
    BROWSER: 'browser',
    OS: 'os',
    REFERRER: 'referrer',
    SOURCE: 'source',
    MEDIUM: 'medium',

    // Engagement Attributes
    SESSION_ID: 'session_id',
    SESSION_DURATION: 'session_duration',
    PAGE_DEPTH: 'page_depth',
    INTERACTION_TYPE: 'interaction_type',
    ENGAGEMENT_LEVEL: 'engagement_level',
  } as const,

  // User Analytics Metrics
  METRICS: {
    // User Count Metrics
    TOTAL_USERS: 'total_users',
    ACTIVE_USERS: 'active_users',
    NEW_USERS: 'new_users',
    RETURNING_USERS: 'returning_users',
    UNIQUE_USERS: 'unique_users',

    // User Growth Metrics
    USER_GROWTH_RATE: 'user_growth_rate',
    ACQUISITION_RATE: 'acquisition_rate',
    CHURN_RATE: 'churn_rate',
    RETENTION_RATE: 'retention_rate',

    // User Engagement Metrics
    SESSION_COUNT: 'session_count',
    AVG_SESSION_DURATION: 'avg_session_duration',
    BOUNCE_RATE: 'bounce_rate',
    PAGES_PER_SESSION: 'pages_per_session',
    INTERACTION_RATE: 'interaction_rate',

    // User Lifetime Metrics
    LIFETIME_VALUE: 'lifetime_value',
    AVG_LIFETIME: 'avg_lifetime',
    REPEAT_PURCHASE_RATE: 'repeat_purchase_rate',
    REFERRAL_COUNT: 'referral_count',

    // User Satisfaction Metrics
    NPS: 'nps',
    CSAT: 'csat',
    CES: 'ces',
    SATISFACTION_SCORE: 'satisfaction_score',
  } as const,

  // User Analytics Segments
  SEGMENTS: {
    // Demographic Segments
    BY_AGE: 'by_age',
    BY_GENDER: 'by_gender',
    BY_INCOME: 'by_income',
    BY_LOCATION: 'by_location',

    // Behavioral Segments
    BY_ENGAGEMENT: 'by_engagement',
    BY_ACTIVITY: 'by_activity',
    BY_PURCHASE: 'by_purchase',
    BY_LOYALTY: 'by_loyalty',

    // Lifecycle Segments
    NEW_USERS: 'new_users',
    ACTIVE_USERS: 'active_users',
    AT_RISK: 'at_risk',
    CHURNED: 'churned',
    LOYAL: 'loyal',
    VIP: 'vip',

    // Custom Segments
    HIGH_VALUE: 'high_value',
    LOW_VALUE: 'low_value',
    ENGAGED: 'engaged',
    DISENGAGED: 'disengaged',
  } as const,

  // User Analytics Cohorts
  COHORTS: {
    SIGNUP_DATE: 'signup_date',
    FIRST_PURCHASE_DATE: 'first_purchase_date',
    ACQUISITION_CHANNEL: 'acquisition_channel',
    USER_TYPE: 'user_type',
    LOCATION: 'location',
  } as const,

  // User Analytics Granularity
  GRANULARITY: {
    DAILY: 'daily',
    WEEKLY: 'weekly',
    MONTHLY: 'monthly',
    QUARTERLY: 'quarterly',
    YEARLY: 'yearly',
  } as const,
} as const;

// User Analytics Types
export type UserAnalyticsType = (typeof USER_ANALYTICS.TYPES)[keyof typeof USER_ANALYTICS.TYPES];

// User Analytics Status
export type UserAnalyticsStatus =
  (typeof USER_ANALYTICS.STATUS)[keyof typeof USER_ANALYTICS.STATUS];

// User Analytics Scopes
export type UserAnalyticsScope = (typeof USER_ANALYTICS.SCOPES)[keyof typeof USER_ANALYTICS.SCOPES];

// User Analytics Events
export type UserAnalyticsEvent = (typeof USER_ANALYTICS.EVENTS)[keyof typeof USER_ANALYTICS.EVENTS];

// User Analytics Dimensions
export type UserAnalyticsDimension =
  (typeof USER_ANALYTICS.DIMENSIONS)[keyof typeof USER_ANALYTICS.DIMENSIONS];

// User Analytics Metrics
export type UserAnalyticsMetric =
  (typeof USER_ANALYTICS.METRICS)[keyof typeof USER_ANALYTICS.METRICS];

// User Analytics Segments
export type UserAnalyticsSegment =
  (typeof USER_ANALYTICS.SEGMENTS)[keyof typeof USER_ANALYTICS.SEGMENTS];

// User Analytics Cohorts
export type UserAnalyticsCohort =
  (typeof USER_ANALYTICS.COHORTS)[keyof typeof USER_ANALYTICS.COHORTS];

// User Analytics Granularity
export type UserAnalyticsGranularity =
  (typeof USER_ANALYTICS.GRANULARITY)[keyof typeof USER_ANALYTICS.GRANULARITY];

// User Analytics Status Labels
export function getUserAnalyticsStatusLabel(status: UserAnalyticsStatus): string {
  const labels: Record<UserAnalyticsStatus, string> = {
    [USER_ANALYTICS.STATUS.TRACKING]: 'Tracking',
    [USER_ANALYTICS.STATUS.PROCESSING]: 'Processing',
    [USER_ANALYTICS.STATUS.ANALYZING]: 'Analyzing',
    [USER_ANALYTICS.STATUS.COMPLETED]: 'Completed',
    [USER_ANALYTICS.STATUS.FAILED]: 'Failed',
    [USER_ANALYTICS.STATUS.PAUSED]: 'Paused',
    [USER_ANALYTICS.STATUS.STOPPED]: 'Stopped',
  };
  return labels[status] || 'Unknown';
}

// User Analytics Event Labels
export function getUserAnalyticsEventLabel(event: UserAnalyticsEvent): string {
  const labels: Record<UserAnalyticsEvent, string> = {
    [USER_ANALYTICS.EVENTS.SIGNUP]: 'Signup',
    [USER_ANALYTICS.EVENTS.VERIFICATION]: 'Verification',
    [USER_ANALYTICS.EVENTS.PROFILE_COMPLETION]: 'Profile Completion',
    [USER_ANALYTICS.EVENTS.FIRST_PURCHASE]: 'First Purchase',
    [USER_ANALYTICS.EVENTS.RETURNING]: 'Returning',
    [USER_ANALYTICS.EVENTS.CHURN]: 'Churn',
    [USER_ANALYTICS.EVENTS.LOGIN]: 'Login',
    [USER_ANALYTICS.EVENTS.LOGOUT]: 'Logout',
    [USER_ANALYTICS.EVENTS.SESSION_START]: 'Session Start',
    [USER_ANALYTICS.EVENTS.SESSION_END]: 'Session End',
    [USER_ANALYTICS.EVENTS.PAGE_VIEW]: 'Page View',
    [USER_ANALYTICS.EVENTS.SCROLL]: 'Scroll',
    [USER_ANALYTICS.EVENTS.CLICK]: 'Click',
    [USER_ANALYTICS.EVENTS.TIME_SPENT]: 'Time Spent',
    [USER_ANALYTICS.EVENTS.INTERACTION]: 'Interaction',
    [USER_ANALYTICS.EVENTS.FEEDBACK]: 'Feedback',
    [USER_ANALYTICS.EVENTS.RATING]: 'Rating',
    [USER_ANALYTICS.EVENTS.REVIEW]: 'Review',
    [USER_ANALYTICS.EVENTS.SHARE]: 'Share',
    [USER_ANALYTICS.EVENTS.REFERRAL]: 'Referral',
    [USER_ANALYTICS.EVENTS.MILESTONE]: 'Milestone',
    [USER_ANALYTICS.EVENTS.ACHIEVEMENT]: 'Achievement',
    [USER_ANALYTICS.EVENTS.LEVEL_UP]: 'Level Up',
    [USER_ANALYTICS.EVENTS.BADGE]: 'Badge',
    [USER_ANALYTICS.EVENTS.SUPPORT_REQUEST]: 'Support Request',
    [USER_ANALYTICS.EVENTS.TICKET]: 'Ticket',
    [USER_ANALYTICS.EVENTS.RESOLUTION]: 'Resolution',
    [USER_ANALYTICS.EVENTS.SATISFACTION_SURVEY]: 'Satisfaction Survey',
  };
  return labels[event] || 'Unknown';
}

// User Analytics Dimension Labels
export function getUserAnalyticsDimensionLabel(dimension: UserAnalyticsDimension): string {
  const labels: Record<UserAnalyticsDimension, string> = {
    [USER_ANALYTICS.DIMENSIONS.USER_ID]: 'User ID',
    [USER_ANALYTICS.DIMENSIONS.USER_NAME]: 'User Name',
    [USER_ANALYTICS.DIMENSIONS.USER_EMAIL]: 'User Email',
    [USER_ANALYTICS.DIMENSIONS.USER_TYPE]: 'User Type',
    [USER_ANALYTICS.DIMENSIONS.USER_ROLE]: 'User Role',
    [USER_ANALYTICS.DIMENSIONS.USER_STATUS]: 'User Status',
    [USER_ANALYTICS.DIMENSIONS.AGE_GROUP]: 'Age Group',
    [USER_ANALYTICS.DIMENSIONS.GENDER]: 'Gender',
    [USER_ANALYTICS.DIMENSIONS.INCOME_GROUP]: 'Income Group',
    [USER_ANALYTICS.DIMENSIONS.EDUCATION]: 'Education',
    [USER_ANALYTICS.DIMENSIONS.OCCUPATION]: 'Occupation',
    [USER_ANALYTICS.DIMENSIONS.COUNTRY]: 'Country',
    [USER_ANALYTICS.DIMENSIONS.REGION]: 'Region',
    [USER_ANALYTICS.DIMENSIONS.CITY]: 'City',
    [USER_ANALYTICS.DIMENSIONS.TIMEZONE]: 'Timezone',
    [USER_ANALYTICS.DIMENSIONS.LANGUAGE]: 'Language',
    [USER_ANALYTICS.DIMENSIONS.DEVICE_TYPE]: 'Device Type',
    [USER_ANALYTICS.DIMENSIONS.BROWSER]: 'Browser',
    [USER_ANALYTICS.DIMENSIONS.OS]: 'OS',
    [USER_ANALYTICS.DIMENSIONS.REFERRER]: 'Referrer',
    [USER_ANALYTICS.DIMENSIONS.SOURCE]: 'Source',
    [USER_ANALYTICS.DIMENSIONS.MEDIUM]: 'Medium',
    [USER_ANALYTICS.DIMENSIONS.SESSION_ID]: 'Session ID',
    [USER_ANALYTICS.DIMENSIONS.SESSION_DURATION]: 'Session Duration',
    [USER_ANALYTICS.DIMENSIONS.PAGE_DEPTH]: 'Page Depth',
    [USER_ANALYTICS.DIMENSIONS.INTERACTION_TYPE]: 'Interaction Type',
    [USER_ANALYTICS.DIMENSIONS.ENGAGEMENT_LEVEL]: 'Engagement Level',
  };
  return labels[dimension] || 'Unknown';
}

// User Analytics Segment Labels
export function getUserAnalyticsSegmentLabel(segment: UserAnalyticsSegment): string {
  const labels: Record<UserAnalyticsSegment, string> = {
    [USER_ANALYTICS.SEGMENTS.BY_AGE]: 'By Age',
    [USER_ANALYTICS.SEGMENTS.BY_GENDER]: 'By Gender',
    [USER_ANALYTICS.SEGMENTS.BY_INCOME]: 'By Income',
    [USER_ANALYTICS.SEGMENTS.BY_LOCATION]: 'By Location',
    [USER_ANALYTICS.SEGMENTS.BY_ENGAGEMENT]: 'By Engagement',
    [USER_ANALYTICS.SEGMENTS.BY_ACTIVITY]: 'By Activity',
    [USER_ANALYTICS.SEGMENTS.BY_PURCHASE]: 'By Purchase',
    [USER_ANALYTICS.SEGMENTS.BY_LOYALTY]: 'By Loyalty',
    [USER_ANALYTICS.SEGMENTS.NEW_USERS]: 'New Users',
    [USER_ANALYTICS.SEGMENTS.ACTIVE_USERS]: 'Active Users',
    [USER_ANALYTICS.SEGMENTS.AT_RISK]: 'At Risk',
    [USER_ANALYTICS.SEGMENTS.CHURNED]: 'Churned',
    [USER_ANALYTICS.SEGMENTS.LOYAL]: 'Loyal',
    [USER_ANALYTICS.SEGMENTS.VIP]: 'VIP',
    [USER_ANALYTICS.SEGMENTS.HIGH_VALUE]: 'High Value',
    [USER_ANALYTICS.SEGMENTS.LOW_VALUE]: 'Low Value',
    [USER_ANALYTICS.SEGMENTS.ENGAGED]: 'Engaged',
    [USER_ANALYTICS.SEGMENTS.DISENGAGED]: 'Disengaged',
  };
  return labels[segment] || 'Unknown';
}

// User Analytics Cohort Labels
export function getUserAnalyticsCohortLabel(cohort: UserAnalyticsCohort): string {
  const labels: Record<UserAnalyticsCohort, string> = {
    [USER_ANALYTICS.COHORTS.SIGNUP_DATE]: 'Signup Date',
    [USER_ANALYTICS.COHORTS.FIRST_PURCHASE_DATE]: 'First Purchase Date',
    [USER_ANALYTICS.COHORTS.ACQUISITION_CHANNEL]: 'Acquisition Channel',
    [USER_ANALYTICS.COHORTS.USER_TYPE]: 'User Type',
    [USER_ANALYTICS.COHORTS.LOCATION]: 'Location',
  };
  return labels[cohort] || 'Unknown';
}

// User Analytics Granularity Labels
export function getUserAnalyticsGranularityLabel(granularity: UserAnalyticsGranularity): string {
  const labels: Record<UserAnalyticsGranularity, string> = {
    [USER_ANALYTICS.GRANULARITY.DAILY]: 'Daily',
    [USER_ANALYTICS.GRANULARITY.WEEKLY]: 'Weekly',
    [USER_ANALYTICS.GRANULARITY.MONTHLY]: 'Monthly',
    [USER_ANALYTICS.GRANULARITY.QUARTERLY]: 'Quarterly',
    [USER_ANALYTICS.GRANULARITY.YEARLY]: 'Yearly',
  };
  return labels[granularity] || 'Unknown';
}

// Check if user analytics is active
export function isUserAnalyticsActive(status: UserAnalyticsStatus): boolean {
  const activeStatuses: UserAnalyticsStatus[] = [
    USER_ANALYTICS.STATUS.TRACKING,
    USER_ANALYTICS.STATUS.PROCESSING,
    USER_ANALYTICS.STATUS.ANALYZING,
  ];
  return activeStatuses.includes(status);
}

// Check if user analytics is completed
export function isUserAnalyticsCompleted(status: UserAnalyticsStatus): boolean {
  return status === USER_ANALYTICS.STATUS.COMPLETED;
}

// Check if user analytics has failed
export function isUserAnalyticsFailed(status: UserAnalyticsStatus): boolean {
  return status === USER_ANALYTICS.STATUS.FAILED;
}

// Check if event is lifecycle event
export function isUserAnalyticsLifecycleEvent(event: UserAnalyticsEvent): boolean {
  const lifecycleEvents: UserAnalyticsEvent[] = [
    USER_ANALYTICS.EVENTS.SIGNUP,
    USER_ANALYTICS.EVENTS.VERIFICATION,
    USER_ANALYTICS.EVENTS.PROFILE_COMPLETION,
    USER_ANALYTICS.EVENTS.FIRST_PURCHASE,
    USER_ANALYTICS.EVENTS.RETURNING,
    USER_ANALYTICS.EVENTS.CHURN,
  ];
  return lifecycleEvents.includes(event);
}

// Check if event is engagement event
export function isUserAnalyticsEngagementEvent(event: UserAnalyticsEvent): boolean {
  const engagementEvents: UserAnalyticsEvent[] = [
    USER_ANALYTICS.EVENTS.PAGE_VIEW,
    USER_ANALYTICS.EVENTS.SCROLL,
    USER_ANALYTICS.EVENTS.CLICK,
    USER_ANALYTICS.EVENTS.TIME_SPENT,
    USER_ANALYTICS.EVENTS.INTERACTION,
    USER_ANALYTICS.EVENTS.FEEDBACK,
    USER_ANALYTICS.EVENTS.RATING,
    USER_ANALYTICS.EVENTS.REVIEW,
    USER_ANALYTICS.EVENTS.SHARE,
  ];
  return engagementEvents.includes(event);
}
