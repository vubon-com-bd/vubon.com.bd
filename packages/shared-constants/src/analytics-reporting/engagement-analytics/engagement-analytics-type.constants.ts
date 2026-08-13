/**
 * @fileoverview Engagement analytics type definitions and constants
 * @package @vubun/shared-constants
 */

// External libraries - none needed for constants

// Shared packages - none needed for constants

// Project files - none needed for constants

/**
 * Engagement analytics types enum for different engagement-related analytics
 */
export enum EngagementAnalyticsType {
  /** User engagement analytics */
  USER_ENGAGEMENT_ANALYTICS = 'USER_ENGAGEMENT_ANALYTICS',
  /** Content engagement analytics */
  CONTENT_ENGAGEMENT_ANALYTICS = 'CONTENT_ENGAGEMENT_ANALYTICS',
  /** Social engagement analytics */
  SOCIAL_ENGAGEMENT_ANALYTICS = 'SOCIAL_ENGAGEMENT_ANALYTICS',
  /** Email engagement analytics */
  EMAIL_ENGAGEMENT_ANALYTICS = 'EMAIL_ENGAGEMENT_ANALYTICS',
  /** App engagement analytics */
  APP_ENGAGEMENT_ANALYTICS = 'APP_ENGAGEMENT_ANALYTICS',
  /** Notification engagement analytics */
  NOTIFICATION_ENGAGEMENT_ANALYTICS = 'NOTIFICATION_ENGAGEMENT_ANALYTICS',
  /** Campaign engagement analytics */
  CAMPAIGN_ENGAGEMENT_ANALYTICS = 'CAMPAIGN_ENGAGEMENT_ANALYTICS',
  /** Product engagement analytics */
  PRODUCT_ENGAGEMENT_ANALYTICS = 'PRODUCT_ENGAGEMENT_ANALYTICS',
  /** Community engagement analytics */
  COMMUNITY_ENGAGEMENT_ANALYTICS = 'COMMUNITY_ENGAGEMENT_ANALYTICS',
  /** Event engagement analytics */
  EVENT_ENGAGEMENT_ANALYTICS = 'EVENT_ENGAGEMENT_ANALYTICS',
  /** Survey engagement analytics */
  SURVEY_ENGAGEMENT_ANALYTICS = 'SURVEY_ENGAGEMENT_ANALYTICS',
  /** Feedback engagement analytics */
  FEEDBACK_ENGAGEMENT_ANALYTICS = 'FEEDBACK_ENGAGEMENT_ANALYTICS',
  /** Support engagement analytics */
  SUPPORT_ENGAGEMENT_ANALYTICS = 'SUPPORT_ENGAGEMENT_ANALYTICS',
  /** Transactional engagement analytics */
  TRANSACTIONAL_ENGAGEMENT_ANALYTICS = 'TRANSACTIONAL_ENGAGEMENT_ANALYTICS',
  /** Seasonal engagement analytics */
  SEASONAL_ENGAGEMENT_ANALYTICS = 'SEASONAL_ENGAGEMENT_ANALYTICS',
  /** Trend engagement analytics */
  TREND_ENGAGEMENT_ANALYTICS = 'TREND_ENGAGEMENT_ANALYTICS',
  /** Segment engagement analytics */
  SEGMENT_ENGAGEMENT_ANALYTICS = 'SEGMENT_ENGAGEMENT_ANALYTICS',
  /** Personalization engagement analytics */
  PERSONALIZATION_ENGAGEMENT_ANALYTICS = 'PERSONALIZATION_ENGAGEMENT_ANALYTICS',
  /** Gamification engagement analytics */
  GAMIFICATION_ENGAGEMENT_ANALYTICS = 'GAMIFICATION_ENGAGEMENT_ANALYTICS',
  /** Loyalty engagement analytics */
  LOYALTY_ENGAGEMENT_ANALYTICS = 'LOYALTY_ENGAGEMENT_ANALYTICS',
  /** Real-time engagement analytics */
  REAL_TIME_ENGAGEMENT_ANALYTICS = 'REAL_TIME_ENGAGEMENT_ANALYTICS',
  /** Behavioral engagement analytics */
  BEHAVIORAL_ENGAGEMENT_ANALYTICS = 'BEHAVIORAL_ENGAGEMENT_ANALYTICS',
  /** Emotional engagement analytics */
  EMOTIONAL_ENGAGEMENT_ANALYTICS = 'EMOTIONAL_ENGAGEMENT_ANALYTICS',
  /** Cognitive engagement analytics */
  COGNITIVE_ENGAGEMENT_ANALYTICS = 'COGNITIVE_ENGAGEMENT_ANALYTICS',
  /** Social listening analytics */
  SOCIAL_LISTENING_ANALYTICS = 'SOCIAL_LISTENING_ANALYTICS',
}

/**
 * Engagement analytics category for grouping
 */
export enum EngagementAnalyticsCategory {
  /** User engagement */
  USER = 'USER',
  /** Content engagement */
  CONTENT = 'CONTENT',
  /** Social engagement */
  SOCIAL = 'SOCIAL',
  /** Channel engagement */
  CHANNEL = 'CHANNEL',
  /** Behavioral engagement */
  BEHAVIORAL = 'BEHAVIORAL',
  /** Strategic engagement */
  STRATEGIC = 'STRATEGIC',
  /** Emotional engagement */
  EMOTIONAL = 'EMOTIONAL',
}

/**
 * Engagement analytics category mapping
 */
export const ENGAGEMENT_ANALYTICS_TYPE_CATEGORY_MAP: Record<
  EngagementAnalyticsType,
  EngagementAnalyticsCategory
> = {
  [EngagementAnalyticsType.USER_ENGAGEMENT_ANALYTICS]: EngagementAnalyticsCategory.USER,
  [EngagementAnalyticsType.CONTENT_ENGAGEMENT_ANALYTICS]: EngagementAnalyticsCategory.CONTENT,
  [EngagementAnalyticsType.SOCIAL_ENGAGEMENT_ANALYTICS]: EngagementAnalyticsCategory.SOCIAL,
  [EngagementAnalyticsType.EMAIL_ENGAGEMENT_ANALYTICS]: EngagementAnalyticsCategory.CHANNEL,
  [EngagementAnalyticsType.APP_ENGAGEMENT_ANALYTICS]: EngagementAnalyticsCategory.CHANNEL,
  [EngagementAnalyticsType.NOTIFICATION_ENGAGEMENT_ANALYTICS]: EngagementAnalyticsCategory.CHANNEL,
  [EngagementAnalyticsType.CAMPAIGN_ENGAGEMENT_ANALYTICS]: EngagementAnalyticsCategory.STRATEGIC,
  [EngagementAnalyticsType.PRODUCT_ENGAGEMENT_ANALYTICS]: EngagementAnalyticsCategory.CONTENT,
  [EngagementAnalyticsType.COMMUNITY_ENGAGEMENT_ANALYTICS]: EngagementAnalyticsCategory.SOCIAL,
  [EngagementAnalyticsType.EVENT_ENGAGEMENT_ANALYTICS]: EngagementAnalyticsCategory.STRATEGIC,
  [EngagementAnalyticsType.SURVEY_ENGAGEMENT_ANALYTICS]: EngagementAnalyticsCategory.BEHAVIORAL,
  [EngagementAnalyticsType.FEEDBACK_ENGAGEMENT_ANALYTICS]: EngagementAnalyticsCategory.BEHAVIORAL,
  [EngagementAnalyticsType.SUPPORT_ENGAGEMENT_ANALYTICS]: EngagementAnalyticsCategory.BEHAVIORAL,
  [EngagementAnalyticsType.TRANSACTIONAL_ENGAGEMENT_ANALYTICS]:
    EngagementAnalyticsCategory.BEHAVIORAL,
  [EngagementAnalyticsType.SEASONAL_ENGAGEMENT_ANALYTICS]: EngagementAnalyticsCategory.STRATEGIC,
  [EngagementAnalyticsType.TREND_ENGAGEMENT_ANALYTICS]: EngagementAnalyticsCategory.STRATEGIC,
  [EngagementAnalyticsType.SEGMENT_ENGAGEMENT_ANALYTICS]: EngagementAnalyticsCategory.USER,
  [EngagementAnalyticsType.PERSONALIZATION_ENGAGEMENT_ANALYTICS]: EngagementAnalyticsCategory.USER,
  [EngagementAnalyticsType.GAMIFICATION_ENGAGEMENT_ANALYTICS]:
    EngagementAnalyticsCategory.BEHAVIORAL,
  [EngagementAnalyticsType.LOYALTY_ENGAGEMENT_ANALYTICS]: EngagementAnalyticsCategory.USER,
  [EngagementAnalyticsType.REAL_TIME_ENGAGEMENT_ANALYTICS]: EngagementAnalyticsCategory.BEHAVIORAL,
  [EngagementAnalyticsType.BEHAVIORAL_ENGAGEMENT_ANALYTICS]: EngagementAnalyticsCategory.BEHAVIORAL,
  [EngagementAnalyticsType.EMOTIONAL_ENGAGEMENT_ANALYTICS]: EngagementAnalyticsCategory.EMOTIONAL,
  [EngagementAnalyticsType.COGNITIVE_ENGAGEMENT_ANALYTICS]: EngagementAnalyticsCategory.EMOTIONAL,
  [EngagementAnalyticsType.SOCIAL_LISTENING_ANALYTICS]: EngagementAnalyticsCategory.SOCIAL,
};

/**
 * Engagement analytics type configuration
 */
export interface EngagementAnalyticsTypeConfig {
  label: string;
  description: string;
  icon?: string;
  color?: string;
  priority: number;
  isRealtime: boolean;
  requiresUserId: boolean;
}

export const ENGAGEMENT_ANALYTICS_TYPE_CONFIG: Record<
  EngagementAnalyticsType,
  EngagementAnalyticsTypeConfig
> = {
  [EngagementAnalyticsType.USER_ENGAGEMENT_ANALYTICS]: {
    label: 'User Engagement Analytics',
    description: 'Analytics for overall user engagement',
    icon: 'User',
    color: '#3B82F6',
    priority: 1,
    isRealtime: true,
    requiresUserId: true,
  },
  [EngagementAnalyticsType.CONTENT_ENGAGEMENT_ANALYTICS]: {
    label: 'Content Engagement Analytics',
    description: 'Analytics for content engagement metrics',
    icon: 'FileText',
    color: '#8B5CF6',
    priority: 1,
    isRealtime: true,
    requiresUserId: false,
  },
  [EngagementAnalyticsType.SOCIAL_ENGAGEMENT_ANALYTICS]: {
    label: 'Social Engagement Analytics',
    description: 'Analytics for social media engagement',
    icon: 'Share2',
    color: '#1DA1F2',
    priority: 2,
    isRealtime: true,
    requiresUserId: true,
  },
  [EngagementAnalyticsType.EMAIL_ENGAGEMENT_ANALYTICS]: {
    label: 'Email Engagement Analytics',
    description: 'Analytics for email engagement',
    icon: 'Mail',
    color: '#EA580C',
    priority: 2,
    isRealtime: true,
    requiresUserId: true,
  },
  [EngagementAnalyticsType.APP_ENGAGEMENT_ANALYTICS]: {
    label: 'App Engagement Analytics',
    description: 'Analytics for mobile app engagement',
    icon: 'Smartphone',
    color: '#10B981',
    priority: 2,
    isRealtime: true,
    requiresUserId: true,
  },
  [EngagementAnalyticsType.NOTIFICATION_ENGAGEMENT_ANALYTICS]: {
    label: 'Notification Engagement Analytics',
    description: 'Analytics for push notification engagement',
    icon: 'Bell',
    color: '#F472B6',
    priority: 2,
    isRealtime: true,
    requiresUserId: true,
  },
  [EngagementAnalyticsType.CAMPAIGN_ENGAGEMENT_ANALYTICS]: {
    label: 'Campaign Engagement Analytics',
    description: 'Analytics for marketing campaign engagement',
    icon: 'Megaphone',
    color: '#F59E0B',
    priority: 2,
    isRealtime: false,
    requiresUserId: false,
  },
  [EngagementAnalyticsType.PRODUCT_ENGAGEMENT_ANALYTICS]: {
    label: 'Product Engagement Analytics',
    description: 'Analytics for product engagement',
    icon: 'Package',
    color: '#10B981',
    priority: 2,
    isRealtime: false,
    requiresUserId: true,
  },
  [EngagementAnalyticsType.COMMUNITY_ENGAGEMENT_ANALYTICS]: {
    label: 'Community Engagement Analytics',
    description: 'Analytics for community engagement',
    icon: 'Users',
    color: '#8B5CF6',
    priority: 2,
    isRealtime: true,
    requiresUserId: true,
  },
  [EngagementAnalyticsType.EVENT_ENGAGEMENT_ANALYTICS]: {
    label: 'Event Engagement Analytics',
    description: 'Analytics for event engagement',
    icon: 'Calendar',
    color: '#F59E0B',
    priority: 2,
    isRealtime: false,
    requiresUserId: true,
  },
  [EngagementAnalyticsType.SURVEY_ENGAGEMENT_ANALYTICS]: {
    label: 'Survey Engagement Analytics',
    description: 'Analytics for survey engagement',
    icon: 'FileText',
    color: '#6366F1',
    priority: 2,
    isRealtime: false,
    requiresUserId: true,
  },
  [EngagementAnalyticsType.FEEDBACK_ENGAGEMENT_ANALYTICS]: {
    label: 'Feedback Engagement Analytics',
    description: 'Analytics for feedback engagement',
    icon: 'MessageSquare',
    color: '#F472B6',
    priority: 2,
    isRealtime: true,
    requiresUserId: true,
  },
  [EngagementAnalyticsType.SUPPORT_ENGAGEMENT_ANALYTICS]: {
    label: 'Support Engagement Analytics',
    description: 'Analytics for support engagement',
    icon: 'Headset',
    color: '#8B5CF6',
    priority: 2,
    isRealtime: true,
    requiresUserId: true,
  },
  [EngagementAnalyticsType.TRANSACTIONAL_ENGAGEMENT_ANALYTICS]: {
    label: 'Transactional Engagement Analytics',
    description: 'Analytics for transactional engagement',
    icon: 'ShoppingCart',
    color: '#22C55E',
    priority: 2,
    isRealtime: true,
    requiresUserId: true,
  },
  [EngagementAnalyticsType.SEASONAL_ENGAGEMENT_ANALYTICS]: {
    label: 'Seasonal Engagement Analytics',
    description: 'Analytics for seasonal engagement patterns',
    icon: 'Calendar',
    color: '#F472B6',
    priority: 2,
    isRealtime: false,
    requiresUserId: false,
  },
  [EngagementAnalyticsType.TREND_ENGAGEMENT_ANALYTICS]: {
    label: 'Trend Engagement Analytics',
    description: 'Analytics for engagement trends',
    icon: 'TrendingUp',
    color: '#10B981',
    priority: 2,
    isRealtime: false,
    requiresUserId: false,
  },
  [EngagementAnalyticsType.SEGMENT_ENGAGEMENT_ANALYTICS]: {
    label: 'Segment Engagement Analytics',
    description: 'Analytics for segment-based engagement',
    icon: 'PieChart',
    color: '#3B82F6',
    priority: 2,
    isRealtime: false,
    requiresUserId: false,
  },
  [EngagementAnalyticsType.PERSONALIZATION_ENGAGEMENT_ANALYTICS]: {
    label: 'Personalization Engagement Analytics',
    description: 'Analytics for personalized engagement',
    icon: 'UserCog',
    color: '#8B5CF6',
    priority: 2,
    isRealtime: false,
    requiresUserId: true,
  },
  [EngagementAnalyticsType.GAMIFICATION_ENGAGEMENT_ANALYTICS]: {
    label: 'Gamification Engagement Analytics',
    description: 'Analytics for gamification engagement',
    icon: 'Trophy',
    color: '#F59E0B',
    priority: 2,
    isRealtime: true,
    requiresUserId: true,
  },
  [EngagementAnalyticsType.LOYALTY_ENGAGEMENT_ANALYTICS]: {
    label: 'Loyalty Engagement Analytics',
    description: 'Analytics for loyalty program engagement',
    icon: 'Heart',
    color: '#EC4899',
    priority: 2,
    isRealtime: false,
    requiresUserId: true,
  },
  [EngagementAnalyticsType.REAL_TIME_ENGAGEMENT_ANALYTICS]: {
    label: 'Real-Time Engagement Analytics',
    description: 'Analytics for real-time engagement',
    icon: 'Zap',
    color: '#F59E0B',
    priority: 1,
    isRealtime: true,
    requiresUserId: true,
  },
  [EngagementAnalyticsType.BEHAVIORAL_ENGAGEMENT_ANALYTICS]: {
    label: 'Behavioral Engagement Analytics',
    description: 'Analytics for behavioral engagement',
    icon: 'Activity',
    color: '#6366F1',
    priority: 2,
    isRealtime: true,
    requiresUserId: true,
  },
  [EngagementAnalyticsType.EMOTIONAL_ENGAGEMENT_ANALYTICS]: {
    label: 'Emotional Engagement Analytics',
    description: 'Analytics for emotional engagement',
    icon: 'Smile',
    color: '#F472B6',
    priority: 2,
    isRealtime: false,
    requiresUserId: true,
  },
  [EngagementAnalyticsType.COGNITIVE_ENGAGEMENT_ANALYTICS]: {
    label: 'Cognitive Engagement Analytics',
    description: 'Analytics for cognitive engagement',
    icon: 'Brain',
    color: '#8B5CF6',
    priority: 2,
    isRealtime: false,
    requiresUserId: true,
  },
  [EngagementAnalyticsType.SOCIAL_LISTENING_ANALYTICS]: {
    label: 'Social Listening Analytics',
    description: 'Analytics for social listening and sentiment',
    icon: 'MessageCircle',
    color: '#1DA1F2',
    priority: 2,
    isRealtime: true,
    requiresUserId: false,
  },
};

/**
 * Get engagement analytics type label
 */
export function getEngagementAnalyticsTypeLabel(type: EngagementAnalyticsType): string {
  return ENGAGEMENT_ANALYTICS_TYPE_CONFIG[type]?.label || type;
}

/**
 * Get engagement analytics type description
 */
export function getEngagementAnalyticsTypeDescription(type: EngagementAnalyticsType): string {
  return ENGAGEMENT_ANALYTICS_TYPE_CONFIG[type]?.description || '';
}

/**
 * Get engagement analytics type category
 */
export function getEngagementAnalyticsTypeCategory(
  type: EngagementAnalyticsType
): EngagementAnalyticsCategory {
  return ENGAGEMENT_ANALYTICS_TYPE_CATEGORY_MAP[type];
}

/**
 * Get engagement analytics types by category
 */
export function getEngagementAnalyticsTypesByCategory(
  category: EngagementAnalyticsCategory
): EngagementAnalyticsType[] {
  return Object.entries(ENGAGEMENT_ANALYTICS_TYPE_CATEGORY_MAP)
    .filter(([_, cat]) => cat === category)
    .map(([type]) => type as EngagementAnalyticsType);
}

/**
 * Check if engagement analytics type requires user ID
 */
export function engagementAnalyticsTypeRequiresUserId(type: EngagementAnalyticsType): boolean {
  return ENGAGEMENT_ANALYTICS_TYPE_CONFIG[type]?.requiresUserId || false;
}

/**
 * Check if engagement analytics type is real-time
 */
export function isEngagementAnalyticsTypeRealtime(type: EngagementAnalyticsType): boolean {
  return ENGAGEMENT_ANALYTICS_TYPE_CONFIG[type]?.isRealtime || false;
}

/**
 * Get engagement analytics type priority
 */
export function getEngagementAnalyticsTypePriority(type: EngagementAnalyticsType): number {
  return ENGAGEMENT_ANALYTICS_TYPE_CONFIG[type]?.priority || 3;
}

/**
 * Engagement analytics type status
 */
export enum EngagementAnalyticsTypeStatus {
  /** Active and collecting data */
  ACTIVE = 'ACTIVE',
  /** Inactive and not collecting data */
  INACTIVE = 'INACTIVE',
  /** Paused temporarily */
  PAUSED = 'PAUSED',
  /** Under maintenance */
  MAINTENANCE = 'MAINTENANCE',
  /** Deprecated and will be removed */
  DEPRECATED = 'DEPRECATED',
}

/**
 * Default status for engagement analytics types
 */
export const ENGAGEMENT_ANALYTICS_TYPE_DEFAULT_STATUS: Record<
  EngagementAnalyticsType,
  EngagementAnalyticsTypeStatus
> = {
  [EngagementAnalyticsType.USER_ENGAGEMENT_ANALYTICS]: EngagementAnalyticsTypeStatus.ACTIVE,
  [EngagementAnalyticsType.CONTENT_ENGAGEMENT_ANALYTICS]: EngagementAnalyticsTypeStatus.ACTIVE,
  [EngagementAnalyticsType.SOCIAL_ENGAGEMENT_ANALYTICS]: EngagementAnalyticsTypeStatus.ACTIVE,
  [EngagementAnalyticsType.EMAIL_ENGAGEMENT_ANALYTICS]: EngagementAnalyticsTypeStatus.ACTIVE,
  [EngagementAnalyticsType.APP_ENGAGEMENT_ANALYTICS]: EngagementAnalyticsTypeStatus.ACTIVE,
  [EngagementAnalyticsType.NOTIFICATION_ENGAGEMENT_ANALYTICS]: EngagementAnalyticsTypeStatus.ACTIVE,
  [EngagementAnalyticsType.CAMPAIGN_ENGAGEMENT_ANALYTICS]: EngagementAnalyticsTypeStatus.ACTIVE,
  [EngagementAnalyticsType.PRODUCT_ENGAGEMENT_ANALYTICS]: EngagementAnalyticsTypeStatus.ACTIVE,
  [EngagementAnalyticsType.COMMUNITY_ENGAGEMENT_ANALYTICS]: EngagementAnalyticsTypeStatus.ACTIVE,
  [EngagementAnalyticsType.EVENT_ENGAGEMENT_ANALYTICS]: EngagementAnalyticsTypeStatus.ACTIVE,
  [EngagementAnalyticsType.SURVEY_ENGAGEMENT_ANALYTICS]: EngagementAnalyticsTypeStatus.ACTIVE,
  [EngagementAnalyticsType.FEEDBACK_ENGAGEMENT_ANALYTICS]: EngagementAnalyticsTypeStatus.ACTIVE,
  [EngagementAnalyticsType.SUPPORT_ENGAGEMENT_ANALYTICS]: EngagementAnalyticsTypeStatus.ACTIVE,
  [EngagementAnalyticsType.TRANSACTIONAL_ENGAGEMENT_ANALYTICS]:
    EngagementAnalyticsTypeStatus.ACTIVE,
  [EngagementAnalyticsType.SEASONAL_ENGAGEMENT_ANALYTICS]: EngagementAnalyticsTypeStatus.ACTIVE,
  [EngagementAnalyticsType.TREND_ENGAGEMENT_ANALYTICS]: EngagementAnalyticsTypeStatus.ACTIVE,
  [EngagementAnalyticsType.SEGMENT_ENGAGEMENT_ANALYTICS]: EngagementAnalyticsTypeStatus.ACTIVE,
  [EngagementAnalyticsType.PERSONALIZATION_ENGAGEMENT_ANALYTICS]:
    EngagementAnalyticsTypeStatus.ACTIVE,
  [EngagementAnalyticsType.GAMIFICATION_ENGAGEMENT_ANALYTICS]: EngagementAnalyticsTypeStatus.ACTIVE,
  [EngagementAnalyticsType.LOYALTY_ENGAGEMENT_ANALYTICS]: EngagementAnalyticsTypeStatus.ACTIVE,
  [EngagementAnalyticsType.REAL_TIME_ENGAGEMENT_ANALYTICS]: EngagementAnalyticsTypeStatus.ACTIVE,
  [EngagementAnalyticsType.BEHAVIORAL_ENGAGEMENT_ANALYTICS]: EngagementAnalyticsTypeStatus.ACTIVE,
  [EngagementAnalyticsType.EMOTIONAL_ENGAGEMENT_ANALYTICS]: EngagementAnalyticsTypeStatus.ACTIVE,
  [EngagementAnalyticsType.COGNITIVE_ENGAGEMENT_ANALYTICS]: EngagementAnalyticsTypeStatus.ACTIVE,
  [EngagementAnalyticsType.SOCIAL_LISTENING_ANALYTICS]: EngagementAnalyticsTypeStatus.ACTIVE,
};

/**
 * Get engagement analytics type status
 */
export function getEngagementAnalyticsTypeStatus(
  type: EngagementAnalyticsType
): EngagementAnalyticsTypeStatus {
  return ENGAGEMENT_ANALYTICS_TYPE_DEFAULT_STATUS[type] || EngagementAnalyticsTypeStatus.INACTIVE;
}

/**
 * Set engagement analytics type status
 */
export function setEngagementAnalyticsTypeStatus(
  type: EngagementAnalyticsType,
  status: EngagementAnalyticsTypeStatus
): void {
  ENGAGEMENT_ANALYTICS_TYPE_DEFAULT_STATUS[type] = status;
}

/**
 * Engagement analytics priority levels
 */
export const ENGAGEMENT_ANALYTICS_PRIORITY_LEVELS = {
  /** Critical priority - essential analytics */
  CRITICAL: 1,
  /** High priority - important analytics */
  HIGH: 2,
  /** Medium priority - useful analytics */
  MEDIUM: 3,
  /** Low priority - nice to have */
  LOW: 4,
} as const;

/**
 * Get engagement analytics types by priority
 */
export function getEngagementAnalyticsTypesByPriority(priority: number): EngagementAnalyticsType[] {
  return Object.entries(ENGAGEMENT_ANALYTICS_TYPE_CONFIG)
    .filter(([_, config]) => config.priority === priority)
    .map(([type]) => type as EngagementAnalyticsType);
}

/**
 * Get critical engagement analytics types
 */
export function getCriticalEngagementAnalyticsTypes(): EngagementAnalyticsType[] {
  return getEngagementAnalyticsTypesByPriority(ENGAGEMENT_ANALYTICS_PRIORITY_LEVELS.CRITICAL);
}

/**
 * Engagement analytics sub-categories
 */
export enum EngagementAnalyticsSubCategory {
  /** User engagement analysis */
  USER_ANALYSIS = 'USER_ANALYSIS',
  /** Content engagement analysis */
  CONTENT_ANALYSIS = 'CONTENT_ANALYSIS',
  /** Social engagement analysis */
  SOCIAL_ANALYSIS = 'SOCIAL_ANALYSIS',
  /** Channel engagement analysis */
  CHANNEL_ANALYSIS = 'CHANNEL_ANALYSIS',
  /** Behavioral analysis */
  BEHAVIORAL_ANALYSIS = 'BEHAVIORAL_ANALYSIS',
  /** Strategic analysis */
  STRATEGIC_ANALYSIS = 'STRATEGIC_ANALYSIS',
  /** Emotional analysis */
  EMOTIONAL_ANALYSIS = 'EMOTIONAL_ANALYSIS',
}

/**
 * Mapping of engagement analytics types to sub-categories
 */
export const ENGAGEMENT_ANALYTICS_TYPE_SUB_CATEGORY_MAP: Record<
  EngagementAnalyticsType,
  EngagementAnalyticsSubCategory
> = {
  [EngagementAnalyticsType.USER_ENGAGEMENT_ANALYTICS]: EngagementAnalyticsSubCategory.USER_ANALYSIS,
  [EngagementAnalyticsType.SEGMENT_ENGAGEMENT_ANALYTICS]:
    EngagementAnalyticsSubCategory.USER_ANALYSIS,
  [EngagementAnalyticsType.PERSONALIZATION_ENGAGEMENT_ANALYTICS]:
    EngagementAnalyticsSubCategory.USER_ANALYSIS,
  [EngagementAnalyticsType.LOYALTY_ENGAGEMENT_ANALYTICS]:
    EngagementAnalyticsSubCategory.USER_ANALYSIS,
  [EngagementAnalyticsType.CONTENT_ENGAGEMENT_ANALYTICS]:
    EngagementAnalyticsSubCategory.CONTENT_ANALYSIS,
  [EngagementAnalyticsType.PRODUCT_ENGAGEMENT_ANALYTICS]:
    EngagementAnalyticsSubCategory.CONTENT_ANALYSIS,
  [EngagementAnalyticsType.SOCIAL_ENGAGEMENT_ANALYTICS]:
    EngagementAnalyticsSubCategory.SOCIAL_ANALYSIS,
  [EngagementAnalyticsType.COMMUNITY_ENGAGEMENT_ANALYTICS]:
    EngagementAnalyticsSubCategory.SOCIAL_ANALYSIS,
  [EngagementAnalyticsType.SOCIAL_LISTENING_ANALYTICS]:
    EngagementAnalyticsSubCategory.SOCIAL_ANALYSIS,
  [EngagementAnalyticsType.EMAIL_ENGAGEMENT_ANALYTICS]:
    EngagementAnalyticsSubCategory.CHANNEL_ANALYSIS,
  [EngagementAnalyticsType.APP_ENGAGEMENT_ANALYTICS]:
    EngagementAnalyticsSubCategory.CHANNEL_ANALYSIS,
  [EngagementAnalyticsType.NOTIFICATION_ENGAGEMENT_ANALYTICS]:
    EngagementAnalyticsSubCategory.CHANNEL_ANALYSIS,
  [EngagementAnalyticsType.REAL_TIME_ENGAGEMENT_ANALYTICS]:
    EngagementAnalyticsSubCategory.BEHAVIORAL_ANALYSIS,
  [EngagementAnalyticsType.BEHAVIORAL_ENGAGEMENT_ANALYTICS]:
    EngagementAnalyticsSubCategory.BEHAVIORAL_ANALYSIS,
  [EngagementAnalyticsType.SURVEY_ENGAGEMENT_ANALYTICS]:
    EngagementAnalyticsSubCategory.BEHAVIORAL_ANALYSIS,
  [EngagementAnalyticsType.FEEDBACK_ENGAGEMENT_ANALYTICS]:
    EngagementAnalyticsSubCategory.BEHAVIORAL_ANALYSIS,
  [EngagementAnalyticsType.SUPPORT_ENGAGEMENT_ANALYTICS]:
    EngagementAnalyticsSubCategory.BEHAVIORAL_ANALYSIS,
  [EngagementAnalyticsType.TRANSACTIONAL_ENGAGEMENT_ANALYTICS]:
    EngagementAnalyticsSubCategory.BEHAVIORAL_ANALYSIS,
  [EngagementAnalyticsType.GAMIFICATION_ENGAGEMENT_ANALYTICS]:
    EngagementAnalyticsSubCategory.BEHAVIORAL_ANALYSIS,
  [EngagementAnalyticsType.CAMPAIGN_ENGAGEMENT_ANALYTICS]:
    EngagementAnalyticsSubCategory.STRATEGIC_ANALYSIS,
  [EngagementAnalyticsType.EVENT_ENGAGEMENT_ANALYTICS]:
    EngagementAnalyticsSubCategory.STRATEGIC_ANALYSIS,
  [EngagementAnalyticsType.SEASONAL_ENGAGEMENT_ANALYTICS]:
    EngagementAnalyticsSubCategory.STRATEGIC_ANALYSIS,
  [EngagementAnalyticsType.TREND_ENGAGEMENT_ANALYTICS]:
    EngagementAnalyticsSubCategory.STRATEGIC_ANALYSIS,
  [EngagementAnalyticsType.EMOTIONAL_ENGAGEMENT_ANALYTICS]:
    EngagementAnalyticsSubCategory.EMOTIONAL_ANALYSIS,
  [EngagementAnalyticsType.COGNITIVE_ENGAGEMENT_ANALYTICS]:
    EngagementAnalyticsSubCategory.EMOTIONAL_ANALYSIS,
};

/**
 * Get engagement analytics type sub-category
 */
export function getEngagementAnalyticsTypeSubCategory(
  type: EngagementAnalyticsType
): EngagementAnalyticsSubCategory {
  return ENGAGEMENT_ANALYTICS_TYPE_SUB_CATEGORY_MAP[type];
}

/**
 * Get engagement analytics types by sub-category
 */
export function getEngagementAnalyticsTypesBySubCategory(
  subCategory: EngagementAnalyticsSubCategory
): EngagementAnalyticsType[] {
  return Object.entries(ENGAGEMENT_ANALYTICS_TYPE_SUB_CATEGORY_MAP)
    .filter(([_, subCat]) => subCat === subCategory)
    .map(([type]) => type as EngagementAnalyticsType);
}
