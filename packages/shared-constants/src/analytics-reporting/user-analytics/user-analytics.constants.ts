/**
 * @fileoverview User analytics system core constants
 * @package @vubun/shared-constants
 */

// External libraries - none needed for constants

// Shared packages - none needed for constants

// Project files - none needed for constants

/**
 * User lifecycle stages
 */
export enum UserLifecycleStage {
  /** User has just signed up */
  ONBOARDING = 'ONBOARDING',
  /** User is actively using the platform */
  ACTIVE = 'ACTIVE',
  /** User is engaged with the platform */
  ENGAGED = 'ENGAGED',
  /** User is at risk of churning */
  AT_RISK = 'AT_RISK',
  /** User has churned */
  CHURNED = 'CHURNED',
  /** User has been reactivated */
  REACTIVATED = 'REACTIVATED',
  /** User is dormant (inactive) */
  DORMANT = 'DORMANT',
  /** User is a power user */
  POWER_USER = 'POWER_USER',
  /** User is a new user */
  NEW = 'NEW',
  /** User is returning after absence */
  RETURNING = 'RETURNING',
  /** User is a VIP user */
  VIP = 'VIP',
  /** User is a trial user */
  TRIAL = 'TRIAL',
  /** User is a paid user */
  PAID = 'PAID',
  /** User is a free user */
  FREE = 'FREE',
}

/**
 * User engagement levels
 */
export enum UserEngagementLevel {
  /** Very low engagement */
  VERY_LOW = 'VERY_LOW',
  /** Low engagement */
  LOW = 'LOW',
  /** Medium engagement */
  MEDIUM = 'MEDIUM',
  /** High engagement */
  HIGH = 'HIGH',
  /** Very high engagement */
  VERY_HIGH = 'VERY_HIGH',
  /** Critical engagement */
  CRITICAL = 'CRITICAL',
}

/**
 * User segmentation thresholds
 */
export interface UserSegmentationThresholds {
  /** Active days threshold */
  activeDaysThreshold: number;
  /** Session count threshold */
  sessionCountThreshold: number;
  /** Session duration threshold in seconds */
  sessionDurationThreshold: number;
  /** Actions per session threshold */
  actionsPerSessionThreshold: number;
  /** Time since last activity threshold in days */
  lastActivityThreshold: number;
}

export const DEFAULT_USER_SEGMENTATION_THRESHOLDS: UserSegmentationThresholds = {
  activeDaysThreshold: 7,
  sessionCountThreshold: 5,
  sessionDurationThreshold: 300, // 5 minutes
  actionsPerSessionThreshold: 10,
  lastActivityThreshold: 30,
};

/**
 * User analytics periods
 */
export enum UserAnalyticsPeriod {
  /** Last 7 days */
  LAST_7_DAYS = 'LAST_7_DAYS',
  /** Last 14 days */
  LAST_14_DAYS = 'LAST_14_DAYS',
  /** Last 30 days */
  LAST_30_DAYS = 'LAST_30_DAYS',
  /** Last 90 days */
  LAST_90_DAYS = 'LAST_90_DAYS',
  /** Last 12 months */
  LAST_12_MONTHS = 'LAST_12_MONTHS',
  /** Since signup */
  SINCE_SIGNUP = 'SINCE_SIGNUP',
}

/**
 * User analytics period configuration
 */
export const USER_ANALYTICS_PERIOD_CONFIG: Record<
  UserAnalyticsPeriod,
  { label: string; days: number; description: string }
> = {
  [UserAnalyticsPeriod.LAST_7_DAYS]: {
    label: 'Last 7 Days',
    days: 7,
    description: 'User activity in the last 7 days',
  },
  [UserAnalyticsPeriod.LAST_14_DAYS]: {
    label: 'Last 14 Days',
    days: 14,
    description: 'User activity in the last 14 days',
  },
  [UserAnalyticsPeriod.LAST_30_DAYS]: {
    label: 'Last 30 Days',
    days: 30,
    description: 'User activity in the last 30 days',
  },
  [UserAnalyticsPeriod.LAST_90_DAYS]: {
    label: 'Last 90 Days',
    days: 90,
    description: 'User activity in the last 90 days',
  },
  [UserAnalyticsPeriod.LAST_12_MONTHS]: {
    label: 'Last 12 Months',
    days: 365,
    description: 'User activity in the last 12 months',
  },
  [UserAnalyticsPeriod.SINCE_SIGNUP]: {
    label: 'Since Signup',
    days: 0,
    description: 'User activity since account creation',
  },
};

/**
 * User data retention policies
 */
export interface UserDataRetentionPolicy {
  /** Raw user activity data retention in days */
  rawDataRetentionDays: number;
  /** Aggregated user data retention in days */
  aggregatedDataRetentionDays: number;
  /** User profile data retention in days */
  profileDataRetentionDays: number;
  /** GDPR compliance retention in days */
  gdprComplianceRetentionDays: number;
  /** Anonymization period in days */
  anonymizationPeriodDays: number;
}

export const DEFAULT_USER_DATA_RETENTION_POLICY: UserDataRetentionPolicy = {
  rawDataRetentionDays: 90,
  aggregatedDataRetentionDays: 365,
  profileDataRetentionDays: 730, // 2 years
  gdprComplianceRetentionDays: 30,
  anonymizationPeriodDays: 180,
};

/**
 * User tracking settings
 */
export interface UserTrackingSettings {
  /** Enable user activity tracking */
  enableActivityTracking: boolean;
  /** Enable session tracking */
  enableSessionTracking: boolean;
  /** Enable event tracking */
  enableEventTracking: boolean;
  /** Enable page view tracking */
  enablePageViewTracking: boolean;
  /** Enable interaction tracking */
  enableInteractionTracking: boolean;
  /** Track IP addresses */
  trackIPAddresses: boolean;
  /** Track user agent */
  trackUserAgent: boolean;
  /** Track device information */
  trackDeviceInfo: boolean;
  /** Track location information */
  trackLocationInfo: boolean;
  /** Track referral information */
  trackReferralInfo: boolean;
  /** Session timeout in minutes */
  sessionTimeoutMinutes: number;
  /** Activity timeout in minutes */
  activityTimeoutMinutes: number;
  /** Maximum events per session */
  maxEventsPerSession: number;
  /** Track authenticated users only */
  authenticatedUsersOnly: boolean;
  /** GDPR consent required */
  gdprConsentRequired: boolean;
}

export const DEFAULT_USER_TRACKING_SETTINGS: UserTrackingSettings = {
  enableActivityTracking: true,
  enableSessionTracking: true,
  enableEventTracking: true,
  enablePageViewTracking: true,
  enableInteractionTracking: true,
  trackIPAddresses: false,
  trackUserAgent: true,
  trackDeviceInfo: true,
  trackLocationInfo: false,
  trackReferralInfo: true,
  sessionTimeoutMinutes: 30,
  activityTimeoutMinutes: 15,
  maxEventsPerSession: 1000,
  authenticatedUsersOnly: false,
  gdprConsentRequired: true,
};

/**
 * User activity status
 */
export enum UserActivityStatus {
  /** User is currently online */
  ONLINE = 'ONLINE',
  /** User was recently active */
  RECENTLY_ACTIVE = 'RECENTLY_ACTIVE',
  /** User is inactive */
  INACTIVE = 'INACTIVE',
  /** User is offline */
  OFFLINE = 'OFFLINE',
  /** User is away */
  AWAY = 'AWAY',
  /** User is busy */
  BUSY = 'BUSY',
}

/**
 * User onboarding metrics
 */
export interface UserOnboardingMetrics {
  /** Time to first action in seconds */
  timeToFirstAction: number;
  /** Time to value in seconds */
  timeToValue: number;
  /** Number of actions in first session */
  actionsInFirstSession: number;
  /** Number of actions in first week */
  actionsInFirstWeek: number;
  /** Onboarding completion rate */
  completionRate: number;
  /** Dropoff point */
  dropoffPoint?: string;
  /** User satisfaction score */
  satisfactionScore: number;
}

export const DEFAULT_USER_ONBOARDING_METRICS: UserOnboardingMetrics = {
  timeToFirstAction: 60,
  timeToValue: 300,
  actionsInFirstSession: 5,
  actionsInFirstWeek: 20,
  completionRate: 0.7,
  satisfactionScore: 4.0,
};

/**
 * User analytics configuration
 */
export const USER_ANALYTICS_CONFIG = {
  /** Maximum number of users to process in batch */
  BATCH_SIZE: 1000,
  /** User analytics cache TTL in seconds */
  CACHE_TTL_SECONDS: 300,
  /** User analytics query timeout in seconds */
  QUERY_TIMEOUT_SECONDS: 30,
  /** Maximum users in report */
  MAX_USERS_IN_REPORT: 10000,
  /** User data export limit */
  EXPORT_LIMIT: 50000,
  /** User analytics version */
  VERSION: '1.0.0',
} as const;

/**
 * User engagement score thresholds
 */
export const USER_ENGAGEMENT_SCORE_THRESHOLDS = {
  [UserEngagementLevel.VERY_LOW]: 0,
  [UserEngagementLevel.LOW]: 20,
  [UserEngagementLevel.MEDIUM]: 40,
  [UserEngagementLevel.HIGH]: 60,
  [UserEngagementLevel.VERY_HIGH]: 80,
  [UserEngagementLevel.CRITICAL]: 90,
} as const;

/**
 * User actions for engagement scoring
 */
export enum UserActionWeight {
  /** Page view action weight */
  PAGE_VIEW = 1,
  /** Click action weight */
  CLICK = 2,
  /** Form submit action weight */
  FORM_SUBMIT = 5,
  /** Search action weight */
  SEARCH = 3,
  /** Share action weight */
  SHARE = 4,
  /** Purchase action weight */
  PURCHASE = 10,
  /** Review action weight */
  REVIEW = 6,
  /** Rating action weight */
  RATING = 7,
  /** Login action weight */
  LOGIN = 8,
  /** Signup action weight */
  SIGNUP = 9,
  /** Download action weight */
  DOWNLOAD = 11,
  /** Upload action weight */
  UPLOAD = 12,
  /** Comment action weight */
  COMMENT = 13,
  /** Like action weight */
  LIKE = 14,
  /** Follow action weight */
  FOLLOW = 15,
  /** Unfollow action weight */
  UNFOLLOW = 16,
  /** Report action weight */
  REPORT = 17,
  /** Feedback action weight */
  FEEDBACK = 18,
}

/**
 * User lifecyle duration thresholds in days
 */
export const USER_LIFECYCLE_DURATION_THRESHOLDS = {
  /** Days since signup to consider user as new */
  NEW_USER_DAYS: 7,
  /** Days since last activity to consider user at risk */
  AT_RISK_DAYS: 14,
  /** Days since last activity to consider user dormant */
  DORMANT_DAYS: 30,
  /** Days since last activity to consider user churned */
  CHURNED_DAYS: 60,
  /** Days since signup to consider user as power user */
  POWER_USER_DAYS: 90,
};

/**
 * User profile update tracking
 */
export interface UserProfileUpdateTracking {
  /** Last profile update timestamp */
  lastUpdateTimestamp: Date | null;
  /** Number of profile updates */
  updateCount: number;
  /** Fields updated */
  updatedFields: string[];
  /** Average time between updates in days */
  avgUpdateInterval: number;
}

export const DEFAULT_USER_PROFILE_UPDATE_TRACKING: UserProfileUpdateTracking = {
  lastUpdateTimestamp: null,
  updateCount: 0,
  updatedFields: [],
  avgUpdateInterval: 0,
};

/**
 * User segment types
 */
export enum UserSegmentType {
  /** New users */
  NEW_USERS = 'NEW_USERS',
  /** Active users */
  ACTIVE_USERS = 'ACTIVE_USERS',
  /** Power users */
  POWER_USERS = 'POWER_USERS',
  /** Churned users */
  CHURNED_USERS = 'CHURNED_USERS',
  /** VIP users */
  VIP_USERS = 'VIP_USERS',
  /** Trial users */
  TRIAL_USERS = 'TRIAL_USERS',
  /** Paid users */
  PAID_USERS = 'PAID_USERS',
  /** Free users */
  FREE_USERS = 'FREE_USERS',
  /** Engaged users */
  ENGAGED_USERS = 'ENGAGED_USERS',
  /** At risk users */
  AT_RISK_USERS = 'AT_RISK_USERS',
  /** Dormant users */
  DORMANT_USERS = 'DORMANT_USERS',
  /** Reactivated users */
  REACTIVATED_USERS = 'REACTIVATED_USERS',
}

/**
 * User segment configuration
 */
export interface UserSegmentConfig {
  label: string;
  description: string;
  conditions: Record<string, unknown>;
  priority: number;
}

export const USER_SEGMENT_CONFIG: Record<UserSegmentType, UserSegmentConfig> = {
  [UserSegmentType.NEW_USERS]: {
    label: 'New Users',
    description: 'Users who joined in the last 7 days',
    conditions: { daysSinceSignup: '< 7' },
    priority: 1,
  },
  [UserSegmentType.ACTIVE_USERS]: {
    label: 'Active Users',
    description: 'Users who have been active in the last 7 days',
    conditions: { lastActiveDays: '< 7' },
    priority: 1,
  },
  [UserSegmentType.POWER_USERS]: {
    label: 'Power Users',
    description: 'Highly active users with high engagement',
    conditions: { engagementLevel: 'HIGH', sessionCount: '> 20' },
    priority: 1,
  },
  [UserSegmentType.CHURNED_USERS]: {
    label: 'Churned Users',
    description: 'Users who have been inactive for more than 60 days',
    conditions: { lastActiveDays: '> 60' },
    priority: 2,
  },
  [UserSegmentType.VIP_USERS]: {
    label: 'VIP Users',
    description: 'Users with VIP status',
    conditions: { isVip: true },
    priority: 1,
  },
  [UserSegmentType.TRIAL_USERS]: {
    label: 'Trial Users',
    description: 'Users currently on trial',
    conditions: { isTrial: true },
    priority: 2,
  },
  [UserSegmentType.PAID_USERS]: {
    label: 'Paid Users',
    description: 'Users with paid subscription',
    conditions: { isPaid: true },
    priority: 1,
  },
  [UserSegmentType.FREE_USERS]: {
    label: 'Free Users',
    description: 'Users on free plan',
    conditions: { isPaid: false },
    priority: 2,
  },
  [UserSegmentType.ENGAGED_USERS]: {
    label: 'Engaged Users',
    description: 'Users with high engagement score',
    conditions: { engagementScore: '> 60' },
    priority: 2,
  },
  [UserSegmentType.AT_RISK_USERS]: {
    label: 'At Risk Users',
    description: 'Users at risk of churning',
    conditions: { lastActiveDays: 'between 14 and 30' },
    priority: 1,
  },
  [UserSegmentType.DORMANT_USERS]: {
    label: 'Dormant Users',
    description: 'Users who are inactive but not yet churned',
    conditions: { lastActiveDays: 'between 30 and 60' },
    priority: 2,
  },
  [UserSegmentType.REACTIVATED_USERS]: {
    label: 'Reactivated Users',
    description: 'Users who returned after being dormant',
    conditions: { wasDormant: true, isActive: true },
    priority: 2,
  },
};

/**
 * User analytics functions
 */
export function getUserLifecycleStage(
  daysSinceSignup: number,
  daysSinceLastActivity: number,
  isPaid: boolean,
  isVip: boolean
): UserLifecycleStage {
  if (daysSinceSignup <= 7) {
    return UserLifecycleStage.ONBOARDING;
  }

  if (daysSinceLastActivity > 60) {
    return UserLifecycleStage.CHURNED;
  }

  if (daysSinceLastActivity > 30) {
    return UserLifecycleStage.DORMANT;
  }

  if (daysSinceLastActivity > 14) {
    return UserLifecycleStage.AT_RISK;
  }

  if (isVip) {
    return UserLifecycleStage.VIP;
  }

  if (isPaid && daysSinceSignup > 90) {
    return UserLifecycleStage.POWER_USER;
  }

  if (daysSinceLastActivity <= 7 && daysSinceSignup > 7) {
    return UserLifecycleStage.ACTIVE;
  }

  if (daysSinceLastActivity <= 30) {
    return UserLifecycleStage.ENGAGED;
  }

  return UserLifecycleStage.FREE;
}

/**
 * Calculate user engagement level based on score
 */
export function getUserEngagementLevel(score: number): UserEngagementLevel {
  if (score >= USER_ENGAGEMENT_SCORE_THRESHOLDS[UserEngagementLevel.CRITICAL]) {
    return UserEngagementLevel.CRITICAL;
  }
  if (score >= USER_ENGAGEMENT_SCORE_THRESHOLDS[UserEngagementLevel.VERY_HIGH]) {
    return UserEngagementLevel.VERY_HIGH;
  }
  if (score >= USER_ENGAGEMENT_SCORE_THRESHOLDS[UserEngagementLevel.HIGH]) {
    return UserEngagementLevel.HIGH;
  }
  if (score >= USER_ENGAGEMENT_SCORE_THRESHOLDS[UserEngagementLevel.MEDIUM]) {
    return UserEngagementLevel.MEDIUM;
  }
  if (score >= USER_ENGAGEMENT_SCORE_THRESHOLDS[UserEngagementLevel.LOW]) {
    return UserEngagementLevel.LOW;
  }
  return UserEngagementLevel.VERY_LOW;
}

/**
 * Calculate user engagement score
 */
export function calculateUserEngagementScore(
  sessionCount: number,
  totalActions: number,
  sessionDuration: number
): number {
  const sessionScore = Math.min(sessionCount * 5, 30);
  const actionScore = Math.min(totalActions * 2, 40);
  const durationScore = Math.min(sessionDuration / 60, 30);
  return Math.min(sessionScore + actionScore + durationScore, 100);
}

/**
 * Get default user analytics period
 */
export const DEFAULT_USER_ANALYTICS_PERIOD: UserAnalyticsPeriod = UserAnalyticsPeriod.LAST_30_DAYS;

/**
 * User analytics event types
 */
export enum UserAnalyticsEventType {
  /** User signed up */
  USER_SIGNUP = 'USER_SIGNUP',
  /** User logged in */
  USER_LOGIN = 'USER_LOGIN',
  /** User logged out */
  USER_LOGOUT = 'USER_LOGOUT',
  /** User viewed page */
  USER_PAGE_VIEW = 'USER_PAGE_VIEW',
  /** User clicked element */
  USER_CLICK = 'USER_CLICK',
  /** User performed action */
  USER_ACTION = 'USER_ACTION',
  /** User submitted form */
  USER_FORM_SUBMIT = 'USER_FORM_SUBMIT',
  /** User searched */
  USER_SEARCH = 'USER_SEARCH',
  /** User shared content */
  USER_SHARE = 'USER_SHARE',
  /** User downloaded file */
  USER_DOWNLOAD = 'USER_DOWNLOAD',
  /** User uploaded file */
  USER_UPLOAD = 'USER_UPLOAD',
  /** User commented */
  USER_COMMENT = 'USER_COMMENT',
  /** User liked content */
  USER_LIKE = 'USER_LIKE',
  /** User followed another user */
  USER_FOLLOW = 'USER_FOLLOW',
  /** User unfollowed another user */
  USER_UNFOLLOW = 'USER_UNFOLLOW',
  /** User reported content */
  USER_REPORT = 'USER_REPORT',
  /** User provided feedback */
  USER_FEEDBACK = 'USER_FEEDBACK',
  /** User completed onboarding */
  USER_ONBOARDING_COMPLETE = 'USER_ONBOARDING_COMPLETE',
  /** User reached milestone */
  USER_MILESTONE = 'USER_MILESTONE',
  /** User achieved goal */
  USER_GOAL_ACHIEVED = 'USER_GOAL_ACHIEVED',
  /** User became paid */
  USER_BECAME_PAID = 'USER_BECAME_PAID',
  /** User became VIP */
  USER_BECAME_VIP = 'USER_BECAME_VIP',
  /** User churned */
  USER_CHURNED = 'USER_CHURNED',
  /** User reactivated */
  USER_REACTIVATED = 'USER_REACTIVATED',
}

/**
 * User analytics event configuration
 */
export const USER_ANALYTICS_EVENT_CONFIG = {
  [UserAnalyticsEventType.USER_SIGNUP]: {
    label: 'User Signup',
    description: 'User signed up for the platform',
    isCritical: true,
  },
  [UserAnalyticsEventType.USER_LOGIN]: {
    label: 'User Login',
    description: 'User logged in to the platform',
    isCritical: false,
  },
  [UserAnalyticsEventType.USER_LOGOUT]: {
    label: 'User Logout',
    description: 'User logged out from the platform',
    isCritical: false,
  },
  [UserAnalyticsEventType.USER_PAGE_VIEW]: {
    label: 'User Page View',
    description: 'User viewed a page',
    isCritical: false,
  },
  [UserAnalyticsEventType.USER_CLICK]: {
    label: 'User Click',
    description: 'User clicked an element',
    isCritical: false,
  },
  [UserAnalyticsEventType.USER_ACTION]: {
    label: 'User Action',
    description: 'User performed an action',
    isCritical: false,
  },
  [UserAnalyticsEventType.USER_FORM_SUBMIT]: {
    label: 'User Form Submit',
    description: 'User submitted a form',
    isCritical: true,
  },
  [UserAnalyticsEventType.USER_SEARCH]: {
    label: 'User Search',
    description: 'User performed a search',
    isCritical: false,
  },
  [UserAnalyticsEventType.USER_SHARE]: {
    label: 'User Share',
    description: 'User shared content',
    isCritical: false,
  },
  [UserAnalyticsEventType.USER_DOWNLOAD]: {
    label: 'User Download',
    description: 'User downloaded a file',
    isCritical: false,
  },
  [UserAnalyticsEventType.USER_UPLOAD]: {
    label: 'User Upload',
    description: 'User uploaded a file',
    isCritical: false,
  },
  [UserAnalyticsEventType.USER_COMMENT]: {
    label: 'User Comment',
    description: 'User posted a comment',
    isCritical: false,
  },
  [UserAnalyticsEventType.USER_LIKE]: {
    label: 'User Like',
    description: 'User liked content',
    isCritical: false,
  },
  [UserAnalyticsEventType.USER_FOLLOW]: {
    label: 'User Follow',
    description: 'User followed another user',
    isCritical: false,
  },
  [UserAnalyticsEventType.USER_UNFOLLOW]: {
    label: 'User Unfollow',
    description: 'User unfollowed another user',
    isCritical: false,
  },
  [UserAnalyticsEventType.USER_REPORT]: {
    label: 'User Report',
    description: 'User reported content',
    isCritical: true,
  },
  [UserAnalyticsEventType.USER_FEEDBACK]: {
    label: 'User Feedback',
    description: 'User provided feedback',
    isCritical: true,
  },
  [UserAnalyticsEventType.USER_ONBOARDING_COMPLETE]: {
    label: 'User Onboarding Complete',
    description: 'User completed onboarding',
    isCritical: true,
  },
  [UserAnalyticsEventType.USER_MILESTONE]: {
    label: 'User Milestone',
    description: 'User reached a milestone',
    isCritical: false,
  },
  [UserAnalyticsEventType.USER_GOAL_ACHIEVED]: {
    label: 'User Goal Achieved',
    description: 'User achieved a goal',
    isCritical: false,
  },
  [UserAnalyticsEventType.USER_BECAME_PAID]: {
    label: 'User Became Paid',
    description: 'User became a paid user',
    isCritical: true,
  },
  [UserAnalyticsEventType.USER_BECAME_VIP]: {
    label: 'User Became VIP',
    description: 'User became a VIP user',
    isCritical: true,
  },
  [UserAnalyticsEventType.USER_CHURNED]: {
    label: 'User Churned',
    description: 'User churned from the platform',
    isCritical: true,
  },
  [UserAnalyticsEventType.USER_REACTIVATED]: {
    label: 'User Reactivated',
    description: 'User returned after being dormant',
    isCritical: true,
  },
} as const;
