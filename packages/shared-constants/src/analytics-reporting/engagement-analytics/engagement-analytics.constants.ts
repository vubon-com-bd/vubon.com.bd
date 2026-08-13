/**
 * @fileoverview Engagement analytics system core constants
 * @package @vubun/shared-constants
 */

// External libraries - none needed for constants

// Shared packages - none needed for constants

// Project files - none needed for constants

/**
 * Engagement score calculation settings
 */
export interface EngagementScoreSettings {
  /** Calculation method */
  calculationMethod: 'WEIGHTED' | 'COMPOSITE' | 'ML_BASED';
  /** Weight for interactions */
  interactionWeight: number;
  /** Weight for session duration */
  sessionDurationWeight: number;
  /** Weight for content consumption */
  contentConsumptionWeight: number;
  /** Weight for social activities */
  socialActivityWeight: number;
  /** Weight for email engagement */
  emailEngagementWeight: number;
  /** Weight for notification engagement */
  notificationEngagementWeight: number;
  /** Minimum score threshold */
  minScoreThreshold: number;
  /** Maximum score threshold */
  maxScoreThreshold: number;
}

export const DEFAULT_ENGAGEMENT_SCORE_SETTINGS: EngagementScoreSettings = {
  calculationMethod: 'WEIGHTED',
  interactionWeight: 25,
  sessionDurationWeight: 20,
  contentConsumptionWeight: 20,
  socialActivityWeight: 15,
  emailEngagementWeight: 10,
  notificationEngagementWeight: 10,
  minScoreThreshold: 0,
  maxScoreThreshold: 100,
};

/**
 * Interaction weight settings
 */
export interface InteractionWeightSettings {
  /** Weight for page views */
  pageViewWeight: number;
  /** Weight for clicks */
  clickWeight: number;
  /** Weight for scrolls */
  scrollWeight: number;
  /** Weight for form submissions */
  formSubmitWeight: number;
  /** Weight for searches */
  searchWeight: number;
  /** Weight for shares */
  shareWeight: number;
  /** Weight for comments */
  commentWeight: number;
  /** Weight for likes */
  likeWeight: number;
  /** Weight for downloads */
  downloadWeight: number;
  /** Weight for uploads */
  uploadWeight: number;
  /** Weight for purchases */
  purchaseWeight: number;
  /** Weight for reviews */
  reviewWeight: number;
  /** Weight for ratings */
  ratingWeight: number;
}

export const DEFAULT_INTERACTION_WEIGHT_SETTINGS: InteractionWeightSettings = {
  pageViewWeight: 1,
  clickWeight: 2,
  scrollWeight: 1,
  formSubmitWeight: 5,
  searchWeight: 3,
  shareWeight: 4,
  commentWeight: 4,
  likeWeight: 2,
  downloadWeight: 3,
  uploadWeight: 4,
  purchaseWeight: 10,
  reviewWeight: 5,
  ratingWeight: 3,
};

/**
 * Session threshold settings
 */
export interface SessionThresholdSettings {
  /** Minimum session duration in seconds */
  minSessionDurationSeconds: number;
  /** Maximum session duration in seconds */
  maxSessionDurationSeconds: number;
  /** Minimum pages per session */
  minPagesPerSession: number;
  /** Maximum pages per session */
  maxPagesPerSession: number;
  /** Minimum events per session */
  minEventsPerSession: number;
  /** Maximum events per session */
  maxEventsPerSession: number;
  /** Session inactivity timeout in seconds */
  inactivityTimeoutSeconds: number;
}

export const DEFAULT_SESSION_THRESHOLD_SETTINGS: SessionThresholdSettings = {
  minSessionDurationSeconds: 10,
  maxSessionDurationSeconds: 3600,
  minPagesPerSession: 1,
  maxPagesPerSession: 100,
  minEventsPerSession: 1,
  maxEventsPerSession: 500,
  inactivityTimeoutSeconds: 1800,
};

/**
 * Content engagement settings
 */
export interface ContentEngagementSettings {
  /** Content types to track */
  contentTypes: ('ARTICLE' | 'VIDEO' | 'AUDIO' | 'IMAGE' | 'DOCUMENT' | 'INTERACTIVE')[];
  /** Minimum content read time in seconds */
  minReadTimeSeconds: number;
  /** Maximum content read time in seconds */
  maxReadTimeSeconds: number;
  /** Video completion threshold percentage */
  videoCompletionThreshold: number;
  /** Audio completion threshold percentage */
  audioCompletionThreshold: number;
  /** Content sharing enabled */
  enableContentSharing: boolean;
  /** Content comments enabled */
  enableComments: boolean;
  /** Content ratings enabled */
  enableRatings: boolean;
}

export const DEFAULT_CONTENT_ENGAGEMENT_SETTINGS: ContentEngagementSettings = {
  contentTypes: ['ARTICLE', 'VIDEO', 'AUDIO', 'IMAGE', 'DOCUMENT'],
  minReadTimeSeconds: 30,
  maxReadTimeSeconds: 3600,
  videoCompletionThreshold: 50,
  audioCompletionThreshold: 50,
  enableContentSharing: true,
  enableComments: true,
  enableRatings: true,
};

/**
 * Social engagement settings
 */
export interface SocialEngagementSettings {
  /** Social platforms to track */
  platforms: (
    'FACEBOOK' | 'TWITTER' | 'INSTAGRAM' | 'LINKEDIN' | 'YOUTUBE' | 'TIKTOK' | 'PINTEREST'
  )[];
  /** Track mentions */
  trackMentions: boolean;
  /** Track hashtags */
  trackHashtags: boolean;
  /** Track shares */
  trackShares: boolean;
  /** Track comments */
  trackComments: boolean;
  /** Track likes */
  trackLikes: boolean;
  /** Track followers */
  trackFollowers: boolean;
  /** Social engagement score weight */
  socialScoreWeight: number;
}

export const DEFAULT_SOCIAL_ENGAGEMENT_SETTINGS: SocialEngagementSettings = {
  platforms: ['FACEBOOK', 'TWITTER', 'INSTAGRAM', 'LINKEDIN', 'YOUTUBE'],
  trackMentions: true,
  trackHashtags: true,
  trackShares: true,
  trackComments: true,
  trackLikes: true,
  trackFollowers: true,
  socialScoreWeight: 20,
};

/**
 * Email engagement settings
 */
export interface EmailEngagementSettings {
  /** Track email opens */
  trackOpens: boolean;
  /** Track email clicks */
  trackClicks: boolean;
  /** Track email forwards */
  trackForwards: boolean;
  /** Track email replies */
  trackReplies: boolean;
  /** Track email unsubscribes */
  trackUnsubscribes: boolean;
  /** Track email bounces */
  trackBounces: boolean;
  /** Email engagement score weight */
  emailScoreWeight: number;
}

export const DEFAULT_EMAIL_ENGAGEMENT_SETTINGS: EmailEngagementSettings = {
  trackOpens: true,
  trackClicks: true,
  trackForwards: true,
  trackReplies: true,
  trackUnsubscribes: true,
  trackBounces: true,
  emailScoreWeight: 15,
};

/**
 * Notification engagement settings
 */
export interface NotificationEngagementSettings {
  /** Track notification delivery */
  trackDelivery: boolean;
  /** Track notification opens */
  trackOpens: boolean;
  /** Track notification clicks */
  trackClicks: boolean;
  /** Track notification dismissals */
  trackDismissals: boolean;
  /** Notification engagement score weight */
  notificationScoreWeight: number;
}

export const DEFAULT_NOTIFICATION_ENGAGEMENT_SETTINGS: NotificationEngagementSettings = {
  trackDelivery: true,
  trackOpens: true,
  trackClicks: true,
  trackDismissals: true,
  notificationScoreWeight: 10,
};

/**
 * Gamification settings
 */
export interface GamificationSettings {
  /** Enable gamification */
  enableGamification: boolean;
  /** Points per interaction */
  pointsPerInteraction: number;
  /** Points per session */
  pointsPerSession: number;
  /** Points per content read */
  pointsPerContentRead: number;
  /** Points per social action */
  pointsPerSocialAction: number;
  /** Points per purchase */
  pointsPerPurchase: number;
  /** Points per review */
  pointsPerReview: number;
  /** Level thresholds */
  levelThresholds: number[];
  /** Badge criteria */
  badgeCriteria: {
    name: string;
    description: string;
    pointsRequired: number;
    actionsRequired: number;
  }[];
}

export const DEFAULT_GAMIFICATION_SETTINGS: GamificationSettings = {
  enableGamification: true,
  pointsPerInteraction: 1,
  pointsPerSession: 5,
  pointsPerContentRead: 3,
  pointsPerSocialAction: 2,
  pointsPerPurchase: 20,
  pointsPerReview: 10,
  levelThresholds: [0, 100, 250, 500, 1000, 2000, 5000, 10000],
  badgeCriteria: [
    {
      name: 'First Step',
      description: 'Complete your first interaction',
      pointsRequired: 10,
      actionsRequired: 1,
    },
    {
      name: 'Engaged',
      description: 'Reach 100 engagement points',
      pointsRequired: 100,
      actionsRequired: 10,
    },
    {
      name: 'Super User',
      description: 'Reach 1000 engagement points',
      pointsRequired: 1000,
      actionsRequired: 50,
    },
    {
      name: 'Community Leader',
      description: 'Reach 5000 engagement points',
      pointsRequired: 5000,
      actionsRequired: 200,
    },
  ],
};

/**
 * Loyalty point system
 */
export interface LoyaltyPointSystem {
  /** Enable loyalty points */
  enableLoyaltyPoints: boolean;
  /** Points per dollar spent */
  pointsPerDollar: number;
  /** Bonus points for milestones */
  milestoneBonusPoints: Record<number, number>;
  /** Points expiration in days */
  pointsExpirationDays: number;
  /** Minimum points for redemption */
  minPointsForRedemption: number;
  /** Points conversion rate */
  pointsConversionRate: number;
  /** Loyalty tiers */
  loyaltyTiers: {
    name: string;
    minPoints: number;
    benefits: string[];
  }[];
}

export const DEFAULT_LOYALTY_POINT_SYSTEM: LoyaltyPointSystem = {
  enableLoyaltyPoints: true,
  pointsPerDollar: 10,
  milestoneBonusPoints: {
    100: 20,
    500: 100,
    1000: 200,
    5000: 1000,
  },
  pointsExpirationDays: 365,
  minPointsForRedemption: 500,
  pointsConversionRate: 100,
  loyaltyTiers: [
    { name: 'Bronze', minPoints: 0, benefits: ['Basic rewards'] },
    { name: 'Silver', minPoints: 500, benefits: ['Priority support', 'Extra points'] },
    { name: 'Gold', minPoints: 2000, benefits: ['VIP support', 'Exclusive offers'] },
    { name: 'Platinum', minPoints: 5000, benefits: ['All access', 'Premium support'] },
  ],
};

/**
 * Engagement trigger settings
 */
export interface EngagementTriggerSettings {
  /** Enable engagement triggers */
  enableTriggers: boolean;
  /** Trigger conditions */
  triggerConditions: {
    name: string;
    description: string;
    condition: string;
    action: string;
  }[];
  /** Trigger evaluation interval in minutes */
  evaluationIntervalMinutes: number;
  /** Maximum triggers per user per day */
  maxTriggersPerUserPerDay: number;
}

export const DEFAULT_ENGAGEMENT_TRIGGER_SETTINGS: EngagementTriggerSettings = {
  enableTriggers: true,
  triggerConditions: [
    {
      name: 'Low Engagement Alert',
      description: 'Alert when engagement score drops below threshold',
      condition: 'engagement_score < 30',
      action: 'send_notification',
    },
    {
      name: 'High Engagement Reward',
      description: 'Reward when engagement score reaches high level',
      condition: 'engagement_score > 80',
      action: 'award_points',
    },
    {
      name: 'Milestone Achievement',
      description: 'Celebrate when user reaches milestone',
      condition: 'milestone_reached',
      action: 'show_congratulations',
    },
    {
      name: 'Inactivity Alert',
      description: 'Alert when user becomes inactive',
      condition: 'last_activity > 7 days',
      action: 'send_reengagement_email',
    },
  ],
  evaluationIntervalMinutes: 15,
  maxTriggersPerUserPerDay: 10,
};

/**
 * Engagement analytics configuration
 */
export const ENGAGEMENT_ANALYTICS_CONFIG = {
  /** Maximum engagement records to process */
  MAX_RECORDS: 100000,
  /** Engagement analytics cache TTL in seconds */
  CACHE_TTL_SECONDS: 300,
  /** Engagement query timeout in seconds */
  QUERY_TIMEOUT_SECONDS: 30,
  /** Maximum engagement in report */
  MAX_ENGAGEMENT_IN_REPORT: 10000,
  /** Engagement data export limit */
  EXPORT_LIMIT: 50000,
  /** Engagement analytics version */
  VERSION: '1.0.0',
} as const;

/**
 * Engagement functions
 */
export function calculateEngagementScore(
  interactionPoints: number,
  sessionPoints: number,
  contentPoints: number,
  socialPoints: number,
  emailPoints: number,
  notificationPoints: number,
  settings: EngagementScoreSettings = DEFAULT_ENGAGEMENT_SCORE_SETTINGS
): number {
  const totalWeight =
    settings.interactionWeight +
    settings.sessionDurationWeight +
    settings.contentConsumptionWeight +
    settings.socialActivityWeight +
    settings.emailEngagementWeight +
    settings.notificationEngagementWeight;

  const weightedScore =
    (interactionPoints * settings.interactionWeight +
      sessionPoints * settings.sessionDurationWeight +
      contentPoints * settings.contentConsumptionWeight +
      socialPoints * settings.socialActivityWeight +
      emailPoints * settings.emailEngagementWeight +
      notificationPoints * settings.notificationEngagementWeight) /
    totalWeight;

  return Math.min(settings.maxScoreThreshold, Math.max(settings.minScoreThreshold, weightedScore));
}
