/**
 * @fileoverview User analytics type definitions and constants
 * @package @vubun/shared-constants
 */

// External libraries - none needed for constants

// Shared packages - none needed for constants

// Project files - none needed for constants

/**
 * User analytics types enum for different user-related analytics
 */
export enum UserAnalyticsType {
  /** User registration analytics */
  REGISTRATION = 'REGISTRATION',
  /** User login activity analytics */
  LOGIN_ACTIVITY = 'LOGIN_ACTIVITY',
  /** User profile update analytics */
  PROFILE_UPDATE = 'PROFILE_UPDATE',
  /** User engagement analytics */
  USER_ENGAGEMENT = 'USER_ENGAGEMENT',
  /** User retention analytics */
  USER_RETENTION = 'USER_RETENTION',
  /** User churn analytics */
  USER_CHURN = 'USER_CHURN',
  /** User segment analytics */
  USER_SEGMENT = 'USER_SEGMENT',
  /** User journey analytics */
  USER_JOURNEY = 'USER_JOURNEY',
  /** User preference analytics */
  USER_PREFERENCE = 'USER_PREFERENCE',
  /** User feedback analytics */
  USER_FEEDBACK = 'USER_FEEDBACK',
  /** User satisfaction analytics */
  USER_SATISFACTION = 'USER_SATISFACTION',
  /** User behavior analytics */
  USER_BEHAVIOR = 'USER_BEHAVIOR',
  /** User demographic analytics */
  USER_DEMOGRAPHIC = 'USER_DEMOGRAPHIC',
  /** User interaction analytics */
  USER_INTERACTION = 'USER_INTERACTION',
  /** User session analytics */
  USER_SESSION = 'USER_SESSION',
  /** User device analytics */
  USER_DEVICE = 'USER_DEVICE',
  /** User location analytics */
  USER_LOCATION = 'USER_LOCATION',
  /** User social activity analytics */
  USER_SOCIAL_ACTIVITY = 'USER_SOCIAL_ACTIVITY',
  /** User notification analytics */
  USER_NOTIFICATION = 'USER_NOTIFICATION',
  /** User subscription analytics */
  USER_SUBSCRIPTION = 'USER_SUBSCRIPTION',
  /** User revenue analytics */
  USER_REVENUE = 'USER_REVENUE',
  /** User lifecycle analytics */
  USER_LIFECYCLE = 'USER_LIFECYCLE',
  /** User sentiment analytics */
  USER_SENTIMENT = 'USER_SENTIMENT',
  /** User referral analytics */
  USER_REFERRAL = 'USER_REFERRAL',
  /** User influence analytics */
  USER_INFLUENCE = 'USER_INFLUENCE',
  /** User loyalty analytics */
  USER_LOYALTY = 'USER_LOYALTY',
  /** User advocacy analytics */
  USER_ADVOCACY = 'USER_ADVOCACY',
  /** User collaboration analytics */
  USER_COLLABORATION = 'USER_COLLABORATION',
  /** User productivity analytics */
  USER_PRODUCTIVITY = 'USER_PRODUCTIVITY',
  /** User growth analytics */
  USER_GROWTH = 'USER_GROWTH',
}

/**
 * User analytics category for grouping
 */
export enum UserAnalyticsCategory {
  /** Identity and profile analytics */
  IDENTITY = 'IDENTITY',
  /** Activity and behavior analytics */
  ACTIVITY = 'ACTIVITY',
  /** Engagement and interaction analytics */
  ENGAGEMENT = 'ENGAGEMENT',
  /** Retention and loyalty analytics */
  RETENTION = 'RETENTION',
  /** Revenue and value analytics */
  REVENUE = 'REVENUE',
  /** Sentiment and satisfaction analytics */
  SENTIMENT = 'SENTIMENT',
  /** Social and community analytics */
  SOCIAL = 'SOCIAL',
  /** Technical and device analytics */
  TECHNICAL = 'TECHNICAL',
  /** Growth and lifecycle analytics */
  GROWTH = 'GROWTH',
}

/**
 * User analytics category mapping
 */
export const USER_ANALYTICS_TYPE_CATEGORY_MAP: Record<UserAnalyticsType, UserAnalyticsCategory> = {
  [UserAnalyticsType.REGISTRATION]: UserAnalyticsCategory.IDENTITY,
  [UserAnalyticsType.LOGIN_ACTIVITY]: UserAnalyticsCategory.ACTIVITY,
  [UserAnalyticsType.PROFILE_UPDATE]: UserAnalyticsCategory.IDENTITY,
  [UserAnalyticsType.USER_ENGAGEMENT]: UserAnalyticsCategory.ENGAGEMENT,
  [UserAnalyticsType.USER_RETENTION]: UserAnalyticsCategory.RETENTION,
  [UserAnalyticsType.USER_CHURN]: UserAnalyticsCategory.RETENTION,
  [UserAnalyticsType.USER_SEGMENT]: UserAnalyticsCategory.GROWTH,
  [UserAnalyticsType.USER_JOURNEY]: UserAnalyticsCategory.GROWTH,
  [UserAnalyticsType.USER_PREFERENCE]: UserAnalyticsCategory.IDENTITY,
  [UserAnalyticsType.USER_FEEDBACK]: UserAnalyticsCategory.SENTIMENT,
  [UserAnalyticsType.USER_SATISFACTION]: UserAnalyticsCategory.SENTIMENT,
  [UserAnalyticsType.USER_BEHAVIOR]: UserAnalyticsCategory.ACTIVITY,
  [UserAnalyticsType.USER_DEMOGRAPHIC]: UserAnalyticsCategory.IDENTITY,
  [UserAnalyticsType.USER_INTERACTION]: UserAnalyticsCategory.ENGAGEMENT,
  [UserAnalyticsType.USER_SESSION]: UserAnalyticsCategory.TECHNICAL,
  [UserAnalyticsType.USER_DEVICE]: UserAnalyticsCategory.TECHNICAL,
  [UserAnalyticsType.USER_LOCATION]: UserAnalyticsCategory.IDENTITY,
  [UserAnalyticsType.USER_SOCIAL_ACTIVITY]: UserAnalyticsCategory.SOCIAL,
  [UserAnalyticsType.USER_NOTIFICATION]: UserAnalyticsCategory.ENGAGEMENT,
  [UserAnalyticsType.USER_SUBSCRIPTION]: UserAnalyticsCategory.REVENUE,
  [UserAnalyticsType.USER_REVENUE]: UserAnalyticsCategory.REVENUE,
  [UserAnalyticsType.USER_LIFECYCLE]: UserAnalyticsCategory.GROWTH,
  [UserAnalyticsType.USER_SENTIMENT]: UserAnalyticsCategory.SENTIMENT,
  [UserAnalyticsType.USER_REFERRAL]: UserAnalyticsCategory.SOCIAL,
  [UserAnalyticsType.USER_INFLUENCE]: UserAnalyticsCategory.SOCIAL,
  [UserAnalyticsType.USER_LOYALTY]: UserAnalyticsCategory.RETENTION,
  [UserAnalyticsType.USER_ADVOCACY]: UserAnalyticsCategory.SOCIAL,
  [UserAnalyticsType.USER_COLLABORATION]: UserAnalyticsCategory.SOCIAL,
  [UserAnalyticsType.USER_PRODUCTIVITY]: UserAnalyticsCategory.ACTIVITY,
  [UserAnalyticsType.USER_GROWTH]: UserAnalyticsCategory.GROWTH,
};

/**
 * User analytics type configuration with display names and descriptions
 */
export interface UserAnalyticsTypeConfig {
  label: string;
  description: string;
  icon?: string;
  color?: string;
  priority: number;
  isRealtime: boolean;
  requiresUserConsent: boolean;
}

export const USER_ANALYTICS_TYPE_CONFIG: Record<UserAnalyticsType, UserAnalyticsTypeConfig> = {
  [UserAnalyticsType.REGISTRATION]: {
    label: 'Registration',
    description: 'User registration and account creation analytics',
    icon: 'UserPlus',
    color: '#3B82F6',
    priority: 1,
    isRealtime: true,
    requiresUserConsent: false,
  },
  [UserAnalyticsType.LOGIN_ACTIVITY]: {
    label: 'Login Activity',
    description: 'User login patterns and activity analytics',
    icon: 'LogIn',
    color: '#6366F1',
    priority: 2,
    isRealtime: true,
    requiresUserConsent: false,
  },
  [UserAnalyticsType.PROFILE_UPDATE]: {
    label: 'Profile Update',
    description: 'User profile update and management analytics',
    icon: 'User',
    color: '#8B5CF6',
    priority: 2,
    isRealtime: false,
    requiresUserConsent: false,
  },
  [UserAnalyticsType.USER_ENGAGEMENT]: {
    label: 'User Engagement',
    description: 'User engagement and interaction analytics',
    icon: 'Activity',
    color: '#10B981',
    priority: 1,
    isRealtime: true,
    requiresUserConsent: true,
  },
  [UserAnalyticsType.USER_RETENTION]: {
    label: 'User Retention',
    description: 'User retention and loyalty analytics',
    icon: 'UserCheck',
    color: '#22C55E',
    priority: 1,
    isRealtime: false,
    requiresUserConsent: true,
  },
  [UserAnalyticsType.USER_CHURN]: {
    label: 'User Churn',
    description: 'User churn and attrition analytics',
    icon: 'UserX',
    color: '#EF4444',
    priority: 1,
    isRealtime: false,
    requiresUserConsent: true,
  },
  [UserAnalyticsType.USER_SEGMENT]: {
    label: 'User Segment',
    description: 'User segmentation and grouping analytics',
    icon: 'PieChart',
    color: '#F59E0B',
    priority: 2,
    isRealtime: false,
    requiresUserConsent: true,
  },
  [UserAnalyticsType.USER_JOURNEY]: {
    label: 'User Journey',
    description: 'User journey and path analytics',
    icon: 'Map',
    color: '#F97316',
    priority: 2,
    isRealtime: false,
    requiresUserConsent: true,
  },
  [UserAnalyticsType.USER_PREFERENCE]: {
    label: 'User Preference',
    description: 'User preferences and settings analytics',
    icon: 'Settings',
    color: '#6B7280',
    priority: 2,
    isRealtime: false,
    requiresUserConsent: true,
  },
  [UserAnalyticsType.USER_FEEDBACK]: {
    label: 'User Feedback',
    description: 'User feedback and review analytics',
    icon: 'MessageSquare',
    color: '#F472B6',
    priority: 1,
    isRealtime: true,
    requiresUserConsent: true,
  },
  [UserAnalyticsType.USER_SATISFACTION]: {
    label: 'User Satisfaction',
    description: 'User satisfaction and NPS analytics',
    icon: 'Smile',
    color: '#F59E0B',
    priority: 1,
    isRealtime: false,
    requiresUserConsent: true,
  },
  [UserAnalyticsType.USER_BEHAVIOR]: {
    label: 'User Behavior',
    description: 'User behavior and action analytics',
    icon: 'Activity',
    color: '#8B5CF6',
    priority: 1,
    isRealtime: true,
    requiresUserConsent: true,
  },
  [UserAnalyticsType.USER_DEMOGRAPHIC]: {
    label: 'User Demographic',
    description: 'User demographic and population analytics',
    icon: 'Users',
    color: '#3B82F6',
    priority: 2,
    isRealtime: false,
    requiresUserConsent: true,
  },
  [UserAnalyticsType.USER_INTERACTION]: {
    label: 'User Interaction',
    description: 'User interaction and touchpoint analytics',
    icon: 'Handshake',
    color: '#10B981',
    priority: 2,
    isRealtime: true,
    requiresUserConsent: true,
  },
  [UserAnalyticsType.USER_SESSION]: {
    label: 'User Session',
    description: 'User session and usage analytics',
    icon: 'Clock',
    color: '#6366F1',
    priority: 2,
    isRealtime: true,
    requiresUserConsent: false,
  },
  [UserAnalyticsType.USER_DEVICE]: {
    label: 'User Device',
    description: 'User device and platform analytics',
    icon: 'Smartphone',
    color: '#8B5CF6',
    priority: 2,
    isRealtime: false,
    requiresUserConsent: false,
  },
  [UserAnalyticsType.USER_LOCATION]: {
    label: 'User Location',
    description: 'User geographic location analytics',
    icon: 'MapPin',
    color: '#10B981',
    priority: 2,
    isRealtime: false,
    requiresUserConsent: true,
  },
  [UserAnalyticsType.USER_SOCIAL_ACTIVITY]: {
    label: 'User Social Activity',
    description: 'User social media and community activity analytics',
    icon: 'Share2',
    color: '#1DA1F2',
    priority: 2,
    isRealtime: true,
    requiresUserConsent: true,
  },
  [UserAnalyticsType.USER_NOTIFICATION]: {
    label: 'User Notification',
    description: 'User notification engagement and response analytics',
    icon: 'Bell',
    color: '#F472B6',
    priority: 2,
    isRealtime: true,
    requiresUserConsent: false,
  },
  [UserAnalyticsType.USER_SUBSCRIPTION]: {
    label: 'User Subscription',
    description: 'User subscription and billing analytics',
    icon: 'Repeat',
    color: '#F59E0B',
    priority: 1,
    isRealtime: true,
    requiresUserConsent: false,
  },
  [UserAnalyticsType.USER_REVENUE]: {
    label: 'User Revenue',
    description: 'User revenue and monetization analytics',
    icon: 'DollarSign',
    color: '#22C55E',
    priority: 1,
    isRealtime: false,
    requiresUserConsent: false,
  },
  [UserAnalyticsType.USER_LIFECYCLE]: {
    label: 'User Lifecycle',
    description: 'User lifecycle stage and progression analytics',
    icon: 'Cycle',
    color: '#3B82F6',
    priority: 1,
    isRealtime: false,
    requiresUserConsent: true,
  },
  [UserAnalyticsType.USER_SENTIMENT]: {
    label: 'User Sentiment',
    description: 'User sentiment and emotion analytics',
    icon: 'TrendingUp',
    color: '#F472B6',
    priority: 2,
    isRealtime: false,
    requiresUserConsent: true,
  },
  [UserAnalyticsType.USER_REFERRAL]: {
    label: 'User Referral',
    description: 'User referral and invite analytics',
    icon: 'Users',
    color: '#10B981',
    priority: 2,
    isRealtime: true,
    requiresUserConsent: true,
  },
  [UserAnalyticsType.USER_INFLUENCE]: {
    label: 'User Influence',
    description: 'User influence and network impact analytics',
    icon: 'Network',
    color: '#8B5CF6',
    priority: 2,
    isRealtime: false,
    requiresUserConsent: true,
  },
  [UserAnalyticsType.USER_LOYALTY]: {
    label: 'User Loyalty',
    description: 'User loyalty and reward analytics',
    icon: 'Heart',
    color: '#EC4899',
    priority: 2,
    isRealtime: false,
    requiresUserConsent: true,
  },
  [UserAnalyticsType.USER_ADVOCACY]: {
    label: 'User Advocacy',
    description: 'User advocacy and promotion analytics',
    icon: 'Megaphone',
    color: '#F59E0B',
    priority: 2,
    isRealtime: false,
    requiresUserConsent: true,
  },
  [UserAnalyticsType.USER_COLLABORATION]: {
    label: 'User Collaboration',
    description: 'User collaboration and teamwork analytics',
    icon: 'Users',
    color: '#6366F1',
    priority: 2,
    isRealtime: true,
    requiresUserConsent: true,
  },
  [UserAnalyticsType.USER_PRODUCTIVITY]: {
    label: 'User Productivity',
    description: 'User productivity and efficiency analytics',
    icon: 'BarChart',
    color: '#10B981',
    priority: 2,
    isRealtime: false,
    requiresUserConsent: true,
  },
  [UserAnalyticsType.USER_GROWTH]: {
    label: 'User Growth',
    description: 'User growth and acquisition analytics',
    icon: 'TrendingUp',
    color: '#22C55E',
    priority: 1,
    isRealtime: false,
    requiresUserConsent: false,
  },
};

/**
 * Get user analytics type label
 */
export function getUserAnalyticsTypeLabel(type: UserAnalyticsType): string {
  return USER_ANALYTICS_TYPE_CONFIG[type]?.label || type;
}

/**
 * Get user analytics type description
 */
export function getUserAnalyticsTypeDescription(type: UserAnalyticsType): string {
  return USER_ANALYTICS_TYPE_CONFIG[type]?.description || '';
}

/**
 * Get user analytics type category
 */
export function getUserAnalyticsTypeCategory(type: UserAnalyticsType): UserAnalyticsCategory {
  return USER_ANALYTICS_TYPE_CATEGORY_MAP[type];
}

/**
 * Get user analytics types by category
 */
export function getUserAnalyticsTypesByCategory(
  category: UserAnalyticsCategory
): UserAnalyticsType[] {
  return Object.entries(USER_ANALYTICS_TYPE_CATEGORY_MAP)
    .filter(([_, cat]) => cat === category)
    .map(([type]) => type as UserAnalyticsType);
}

/**
 * Get identity analytics types
 */
export function getIdentityAnalyticsTypes(): UserAnalyticsType[] {
  return getUserAnalyticsTypesByCategory(UserAnalyticsCategory.IDENTITY);
}

/**
 * Get activity analytics types
 */
export function getActivityAnalyticsTypes(): UserAnalyticsType[] {
  return getUserAnalyticsTypesByCategory(UserAnalyticsCategory.ACTIVITY);
}

/**
 * Get engagement analytics types
 */
export function getEngagementAnalyticsTypes(): UserAnalyticsType[] {
  return getUserAnalyticsTypesByCategory(UserAnalyticsCategory.ENGAGEMENT);
}

/**
 * Get retention analytics types
 */
export function getRetentionAnalyticsTypes(): UserAnalyticsType[] {
  return getUserAnalyticsTypesByCategory(UserAnalyticsCategory.RETENTION);
}

/**
 * Get revenue analytics types
 */
export function getRevenueAnalyticsTypes(): UserAnalyticsType[] {
  return getUserAnalyticsTypesByCategory(UserAnalyticsCategory.REVENUE);
}

/**
 * Get sentiment analytics types
 */
export function getSentimentAnalyticsTypes(): UserAnalyticsType[] {
  return getUserAnalyticsTypesByCategory(UserAnalyticsCategory.SENTIMENT);
}

/**
 * Get social analytics types
 */
export function getSocialAnalyticsTypes(): UserAnalyticsType[] {
  return getUserAnalyticsTypesByCategory(UserAnalyticsCategory.SOCIAL);
}

/**
 * Get technical analytics types
 */
export function getTechnicalAnalyticsTypes(): UserAnalyticsType[] {
  return getUserAnalyticsTypesByCategory(UserAnalyticsCategory.TECHNICAL);
}

/**
 * Get growth analytics types
 */
export function getGrowthAnalyticsTypes(): UserAnalyticsType[] {
  return getUserAnalyticsTypesByCategory(UserAnalyticsCategory.GROWTH);
}

/**
 * Check if user analytics type requires user consent
 */
export function userAnalyticsTypeRequiresConsent(type: UserAnalyticsType): boolean {
  return USER_ANALYTICS_TYPE_CONFIG[type]?.requiresUserConsent || false;
}

/**
 * Check if user analytics type is real-time
 */
export function isUserAnalyticsTypeRealtime(type: UserAnalyticsType): boolean {
  return USER_ANALYTICS_TYPE_CONFIG[type]?.isRealtime || false;
}

/**
 * Get user analytics type priority
 */
export function getUserAnalyticsTypePriority(type: UserAnalyticsType): number {
  return USER_ANALYTICS_TYPE_CONFIG[type]?.priority || 3;
}

/**
 * User analytics type status
 */
export enum UserAnalyticsTypeStatus {
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
 * Default status for user analytics types
 */
export const USER_ANALYTICS_TYPE_DEFAULT_STATUS: Record<
  UserAnalyticsType,
  UserAnalyticsTypeStatus
> = {
  [UserAnalyticsType.REGISTRATION]: UserAnalyticsTypeStatus.ACTIVE,
  [UserAnalyticsType.LOGIN_ACTIVITY]: UserAnalyticsTypeStatus.ACTIVE,
  [UserAnalyticsType.PROFILE_UPDATE]: UserAnalyticsTypeStatus.ACTIVE,
  [UserAnalyticsType.USER_ENGAGEMENT]: UserAnalyticsTypeStatus.ACTIVE,
  [UserAnalyticsType.USER_RETENTION]: UserAnalyticsTypeStatus.ACTIVE,
  [UserAnalyticsType.USER_CHURN]: UserAnalyticsTypeStatus.ACTIVE,
  [UserAnalyticsType.USER_SEGMENT]: UserAnalyticsTypeStatus.ACTIVE,
  [UserAnalyticsType.USER_JOURNEY]: UserAnalyticsTypeStatus.ACTIVE,
  [UserAnalyticsType.USER_PREFERENCE]: UserAnalyticsTypeStatus.ACTIVE,
  [UserAnalyticsType.USER_FEEDBACK]: UserAnalyticsTypeStatus.ACTIVE,
  [UserAnalyticsType.USER_SATISFACTION]: UserAnalyticsTypeStatus.ACTIVE,
  [UserAnalyticsType.USER_BEHAVIOR]: UserAnalyticsTypeStatus.ACTIVE,
  [UserAnalyticsType.USER_DEMOGRAPHIC]: UserAnalyticsTypeStatus.ACTIVE,
  [UserAnalyticsType.USER_INTERACTION]: UserAnalyticsTypeStatus.ACTIVE,
  [UserAnalyticsType.USER_SESSION]: UserAnalyticsTypeStatus.ACTIVE,
  [UserAnalyticsType.USER_DEVICE]: UserAnalyticsTypeStatus.ACTIVE,
  [UserAnalyticsType.USER_LOCATION]: UserAnalyticsTypeStatus.ACTIVE,
  [UserAnalyticsType.USER_SOCIAL_ACTIVITY]: UserAnalyticsTypeStatus.ACTIVE,
  [UserAnalyticsType.USER_NOTIFICATION]: UserAnalyticsTypeStatus.ACTIVE,
  [UserAnalyticsType.USER_SUBSCRIPTION]: UserAnalyticsTypeStatus.ACTIVE,
  [UserAnalyticsType.USER_REVENUE]: UserAnalyticsTypeStatus.ACTIVE,
  [UserAnalyticsType.USER_LIFECYCLE]: UserAnalyticsTypeStatus.ACTIVE,
  [UserAnalyticsType.USER_SENTIMENT]: UserAnalyticsTypeStatus.ACTIVE,
  [UserAnalyticsType.USER_REFERRAL]: UserAnalyticsTypeStatus.ACTIVE,
  [UserAnalyticsType.USER_INFLUENCE]: UserAnalyticsTypeStatus.ACTIVE,
  [UserAnalyticsType.USER_LOYALTY]: UserAnalyticsTypeStatus.ACTIVE,
  [UserAnalyticsType.USER_ADVOCACY]: UserAnalyticsTypeStatus.ACTIVE,
  [UserAnalyticsType.USER_COLLABORATION]: UserAnalyticsTypeStatus.ACTIVE,
  [UserAnalyticsType.USER_PRODUCTIVITY]: UserAnalyticsTypeStatus.ACTIVE,
  [UserAnalyticsType.USER_GROWTH]: UserAnalyticsTypeStatus.ACTIVE,
};

/**
 * Get user analytics type status
 */
export function getUserAnalyticsTypeStatus(type: UserAnalyticsType): UserAnalyticsTypeStatus {
  return USER_ANALYTICS_TYPE_DEFAULT_STATUS[type] || UserAnalyticsTypeStatus.INACTIVE;
}

/**
 * Set user analytics type status
 */
export function setUserAnalyticsTypeStatus(
  type: UserAnalyticsType,
  status: UserAnalyticsTypeStatus
): void {
  USER_ANALYTICS_TYPE_DEFAULT_STATUS[type] = status;
}

/**
 * User analytics type priority levels
 */
export const USER_ANALYTICS_PRIORITY_LEVELS = {
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
 * Get user analytics types by priority
 */
export function getUserAnalyticsTypesByPriority(priority: number): UserAnalyticsType[] {
  return Object.entries(USER_ANALYTICS_TYPE_CONFIG)
    .filter(([_, config]) => config.priority === priority)
    .map(([type]) => type as UserAnalyticsType);
}

/**
 * Get critical user analytics types
 */
export function getCriticalUserAnalyticsTypes(): UserAnalyticsType[] {
  return getUserAnalyticsTypesByPriority(USER_ANALYTICS_PRIORITY_LEVELS.CRITICAL);
}

/**
 * Get high priority user analytics types
 */
export function getHighPriorityUserAnalyticsTypes(): UserAnalyticsType[] {
  return getUserAnalyticsTypesByPriority(USER_ANALYTICS_PRIORITY_LEVELS.HIGH);
}

/**
 * User analytics type sub-categories
 */
export enum UserAnalyticsSubCategory {
  /** Authentication and identity */
  AUTHENTICATION = 'AUTHENTICATION',
  /** Profile management */
  PROFILE = 'PROFILE',
  /** Session management */
  SESSION = 'SESSION',
  /** Behavior tracking */
  BEHAVIOR = 'BEHAVIOR',
  /** Engagement metrics */
  ENGAGEMENT_METRICS = 'ENGAGEMENT_METRICS',
  /** Satisfaction metrics */
  SATISFACTION_METRICS = 'SATISFACTION_METRICS',
  /** Financial metrics */
  FINANCIAL = 'FINANCIAL',
  /** Social metrics */
  SOCIAL_METRICS = 'SOCIAL_METRICS',
  /** Growth metrics */
  GROWTH_METRICS = 'GROWTH_METRICS',
  /** Technical metrics */
  TECHNICAL_METRICS = 'TECHNICAL_METRICS',
}

/**
 * Mapping of user analytics types to sub-categories
 */
export const USER_ANALYTICS_TYPE_SUB_CATEGORY_MAP: Record<
  UserAnalyticsType,
  UserAnalyticsSubCategory
> = {
  [UserAnalyticsType.REGISTRATION]: UserAnalyticsSubCategory.AUTHENTICATION,
  [UserAnalyticsType.LOGIN_ACTIVITY]: UserAnalyticsSubCategory.AUTHENTICATION,
  [UserAnalyticsType.PROFILE_UPDATE]: UserAnalyticsSubCategory.PROFILE,
  [UserAnalyticsType.USER_ENGAGEMENT]: UserAnalyticsSubCategory.ENGAGEMENT_METRICS,
  [UserAnalyticsType.USER_RETENTION]: UserAnalyticsSubCategory.GROWTH_METRICS,
  [UserAnalyticsType.USER_CHURN]: UserAnalyticsSubCategory.GROWTH_METRICS,
  [UserAnalyticsType.USER_SEGMENT]: UserAnalyticsSubCategory.GROWTH_METRICS,
  [UserAnalyticsType.USER_JOURNEY]: UserAnalyticsSubCategory.BEHAVIOR,
  [UserAnalyticsType.USER_PREFERENCE]: UserAnalyticsSubCategory.PROFILE,
  [UserAnalyticsType.USER_FEEDBACK]: UserAnalyticsSubCategory.SATISFACTION_METRICS,
  [UserAnalyticsType.USER_SATISFACTION]: UserAnalyticsSubCategory.SATISFACTION_METRICS,
  [UserAnalyticsType.USER_BEHAVIOR]: UserAnalyticsSubCategory.BEHAVIOR,
  [UserAnalyticsType.USER_DEMOGRAPHIC]: UserAnalyticsSubCategory.PROFILE,
  [UserAnalyticsType.USER_INTERACTION]: UserAnalyticsSubCategory.ENGAGEMENT_METRICS,
  [UserAnalyticsType.USER_SESSION]: UserAnalyticsSubCategory.SESSION,
  [UserAnalyticsType.USER_DEVICE]: UserAnalyticsSubCategory.TECHNICAL_METRICS,
  [UserAnalyticsType.USER_LOCATION]: UserAnalyticsSubCategory.PROFILE,
  [UserAnalyticsType.USER_SOCIAL_ACTIVITY]: UserAnalyticsSubCategory.SOCIAL_METRICS,
  [UserAnalyticsType.USER_NOTIFICATION]: UserAnalyticsSubCategory.ENGAGEMENT_METRICS,
  [UserAnalyticsType.USER_SUBSCRIPTION]: UserAnalyticsSubCategory.FINANCIAL,
  [UserAnalyticsType.USER_REVENUE]: UserAnalyticsSubCategory.FINANCIAL,
  [UserAnalyticsType.USER_LIFECYCLE]: UserAnalyticsSubCategory.GROWTH_METRICS,
  [UserAnalyticsType.USER_SENTIMENT]: UserAnalyticsSubCategory.SATISFACTION_METRICS,
  [UserAnalyticsType.USER_REFERRAL]: UserAnalyticsSubCategory.SOCIAL_METRICS,
  [UserAnalyticsType.USER_INFLUENCE]: UserAnalyticsSubCategory.SOCIAL_METRICS,
  [UserAnalyticsType.USER_LOYALTY]: UserAnalyticsSubCategory.GROWTH_METRICS,
  [UserAnalyticsType.USER_ADVOCACY]: UserAnalyticsSubCategory.SOCIAL_METRICS,
  [UserAnalyticsType.USER_COLLABORATION]: UserAnalyticsSubCategory.SOCIAL_METRICS,
  [UserAnalyticsType.USER_PRODUCTIVITY]: UserAnalyticsSubCategory.BEHAVIOR,
  [UserAnalyticsType.USER_GROWTH]: UserAnalyticsSubCategory.GROWTH_METRICS,
};

/**
 * Get user analytics type sub-category
 */
export function getUserAnalyticsTypeSubCategory(type: UserAnalyticsType): UserAnalyticsSubCategory {
  return USER_ANALYTICS_TYPE_SUB_CATEGORY_MAP[type];
}

/**
 * Get user analytics types by sub-category
 */
export function getUserAnalyticsTypesBySubCategory(
  subCategory: UserAnalyticsSubCategory
): UserAnalyticsType[] {
  return Object.entries(USER_ANALYTICS_TYPE_SUB_CATEGORY_MAP)
    .filter(([_, subCat]) => subCat === subCategory)
    .map(([type]) => type as UserAnalyticsType);
}
