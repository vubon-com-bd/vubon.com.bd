/**
 * @fileoverview Traffic analytics type definitions and constants
 * @package @vubun/shared-constants
 */

// External libraries - none needed for constants

// Shared packages - none needed for constants

// Project files - none needed for constants

/**
 * Traffic analytics types enum for different traffic-related analytics
 */
export enum TrafficAnalyticsType {
  /** Organic search traffic analytics */
  ORGANIC_TRAFFIC = 'ORGANIC_TRAFFIC',
  /** Direct traffic analytics */
  DIRECT_TRAFFIC = 'DIRECT_TRAFFIC',
  /** Referral traffic analytics */
  REFERRAL_TRAFFIC = 'REFERRAL_TRAFFIC',
  /** Social media traffic analytics */
  SOCIAL_TRAFFIC = 'SOCIAL_TRAFFIC',
  /** Paid search traffic analytics */
  PAID_SEARCH_TRAFFIC = 'PAID_SEARCH_TRAFFIC',
  /** Display advertising traffic analytics */
  DISPLAY_TRAFFIC = 'DISPLAY_TRAFFIC',
  /** Email marketing traffic analytics */
  EMAIL_TRAFFIC = 'EMAIL_TRAFFIC',
  /** Affiliate traffic analytics */
  AFFILIATE_TRAFFIC = 'AFFILIATE_TRAFFIC',
  /** Video advertising traffic analytics */
  VIDEO_TRAFFIC = 'VIDEO_TRAFFIC',
  /** Mobile device traffic analytics */
  MOBILE_TRAFFIC = 'MOBILE_TRAFFIC',
  /** Desktop device traffic analytics */
  DESKTOP_TRAFFIC = 'DESKTOP_TRAFFIC',
  /** Tablet device traffic analytics */
  TABLET_TRAFFIC = 'TABLET_TRAFFIC',
  /** International traffic analytics */
  INTERNATIONAL_TRAFFIC = 'INTERNATIONAL_TRAFFIC',
  /** Local traffic analytics */
  LOCAL_TRAFFIC = 'LOCAL_TRAFFIC',
  /** Bot traffic analytics */
  BOT_TRAFFIC = 'BOT_TRAFFIC',
  /** Human traffic analytics */
  HUMAN_TRAFFIC = 'HUMAN_TRAFFIC',
  /** New visitor traffic analytics */
  NEW_VISITOR = 'NEW_VISITOR',
  /** Returning visitor traffic analytics */
  RETURNING_VISITOR = 'RETURNING_VISITOR',
  /** Unique visitor traffic analytics */
  UNIQUE_VISITOR = 'UNIQUE_VISITOR',
  /** Repeat visitor traffic analytics */
  REPEAT_VISITOR = 'REPEAT_VISITOR',
  /** Landing page traffic analytics */
  LANDING_PAGE_TRAFFIC = 'LANDING_PAGE_TRAFFIC',
  /** Exit page traffic analytics */
  EXIT_PAGE_TRAFFIC = 'EXIT_PAGE_TRAFFIC',
  /** Internal traffic analytics */
  INTERNAL_TRAFFIC = 'INTERNAL_TRAFFIC',
  /** External traffic analytics */
  EXTERNAL_TRAFFIC = 'EXTERNAL_TRAFFIC',
  /** Search engine traffic analytics */
  SEARCH_ENGINE_TRAFFIC = 'SEARCH_ENGINE_TRAFFIC',
  /** Newsletter traffic analytics */
  NEWSLETTER_TRAFFIC = 'NEWSLETTER_TRAFFIC',
  /** Podcast traffic analytics */
  PODCAST_TRAFFIC = 'PODCAST_TRAFFIC',
  /** Webinar traffic analytics */
  WEBINAR_TRAFFIC = 'WEBINAR_TRAFFIC',
  /** Event traffic analytics */
  EVENT_TRAFFIC = 'EVENT_TRAFFIC',
  /** Influencer traffic analytics */
  INFLUENCER_TRAFFIC = 'INFLUENCER_TRAFFIC',
}

/**
 * Traffic analytics category for grouping
 */
export enum TrafficAnalyticsCategory {
  /** Source-based analytics */
  SOURCE = 'SOURCE',
  /** Device-based analytics */
  DEVICE = 'DEVICE',
  /** Geographic analytics */
  GEOGRAPHIC = 'GEOGRAPHIC',
  /** Visitor analytics */
  VISITOR = 'VISITOR',
  /** Type analytics */
  TYPE = 'TYPE',
  /** Channel analytics */
  CHANNEL = 'CHANNEL',
}

/**
 * Traffic analytics category mapping
 */
export const TRAFFIC_ANALYTICS_TYPE_CATEGORY_MAP: Record<
  TrafficAnalyticsType,
  TrafficAnalyticsCategory
> = {
  [TrafficAnalyticsType.ORGANIC_TRAFFIC]: TrafficAnalyticsCategory.SOURCE,
  [TrafficAnalyticsType.DIRECT_TRAFFIC]: TrafficAnalyticsCategory.SOURCE,
  [TrafficAnalyticsType.REFERRAL_TRAFFIC]: TrafficAnalyticsCategory.SOURCE,
  [TrafficAnalyticsType.SOCIAL_TRAFFIC]: TrafficAnalyticsCategory.SOURCE,
  [TrafficAnalyticsType.PAID_SEARCH_TRAFFIC]: TrafficAnalyticsCategory.SOURCE,
  [TrafficAnalyticsType.DISPLAY_TRAFFIC]: TrafficAnalyticsCategory.SOURCE,
  [TrafficAnalyticsType.EMAIL_TRAFFIC]: TrafficAnalyticsCategory.SOURCE,
  [TrafficAnalyticsType.AFFILIATE_TRAFFIC]: TrafficAnalyticsCategory.SOURCE,
  [TrafficAnalyticsType.VIDEO_TRAFFIC]: TrafficAnalyticsCategory.SOURCE,
  [TrafficAnalyticsType.MOBILE_TRAFFIC]: TrafficAnalyticsCategory.DEVICE,
  [TrafficAnalyticsType.DESKTOP_TRAFFIC]: TrafficAnalyticsCategory.DEVICE,
  [TrafficAnalyticsType.TABLET_TRAFFIC]: TrafficAnalyticsCategory.DEVICE,
  [TrafficAnalyticsType.INTERNATIONAL_TRAFFIC]: TrafficAnalyticsCategory.GEOGRAPHIC,
  [TrafficAnalyticsType.LOCAL_TRAFFIC]: TrafficAnalyticsCategory.GEOGRAPHIC,
  [TrafficAnalyticsType.BOT_TRAFFIC]: TrafficAnalyticsCategory.TYPE,
  [TrafficAnalyticsType.HUMAN_TRAFFIC]: TrafficAnalyticsCategory.TYPE,
  [TrafficAnalyticsType.NEW_VISITOR]: TrafficAnalyticsCategory.VISITOR,
  [TrafficAnalyticsType.RETURNING_VISITOR]: TrafficAnalyticsCategory.VISITOR,
  [TrafficAnalyticsType.UNIQUE_VISITOR]: TrafficAnalyticsCategory.VISITOR,
  [TrafficAnalyticsType.REPEAT_VISITOR]: TrafficAnalyticsCategory.VISITOR,
  [TrafficAnalyticsType.LANDING_PAGE_TRAFFIC]: TrafficAnalyticsCategory.CHANNEL,
  [TrafficAnalyticsType.EXIT_PAGE_TRAFFIC]: TrafficAnalyticsCategory.CHANNEL,
  [TrafficAnalyticsType.INTERNAL_TRAFFIC]: TrafficAnalyticsCategory.TYPE,
  [TrafficAnalyticsType.EXTERNAL_TRAFFIC]: TrafficAnalyticsCategory.TYPE,
  [TrafficAnalyticsType.SEARCH_ENGINE_TRAFFIC]: TrafficAnalyticsCategory.SOURCE,
  [TrafficAnalyticsType.NEWSLETTER_TRAFFIC]: TrafficAnalyticsCategory.SOURCE,
  [TrafficAnalyticsType.PODCAST_TRAFFIC]: TrafficAnalyticsCategory.SOURCE,
  [TrafficAnalyticsType.WEBINAR_TRAFFIC]: TrafficAnalyticsCategory.SOURCE,
  [TrafficAnalyticsType.EVENT_TRAFFIC]: TrafficAnalyticsCategory.SOURCE,
  [TrafficAnalyticsType.INFLUENCER_TRAFFIC]: TrafficAnalyticsCategory.SOURCE,
};

/**
 * Traffic analytics type configuration
 */
export interface TrafficAnalyticsTypeConfig {
  label: string;
  description: string;
  icon?: string;
  color?: string;
  priority: number;
  isRealtime: boolean;
  requiresSourceId: boolean;
}

export const TRAFFIC_ANALYTICS_TYPE_CONFIG: Record<
  TrafficAnalyticsType,
  TrafficAnalyticsTypeConfig
> = {
  [TrafficAnalyticsType.ORGANIC_TRAFFIC]: {
    label: 'Organic Traffic',
    description: 'Traffic from search engine organic results',
    icon: 'Search',
    color: '#22C55E',
    priority: 1,
    isRealtime: true,
    requiresSourceId: false,
  },
  [TrafficAnalyticsType.DIRECT_TRAFFIC]: {
    label: 'Direct Traffic',
    description: 'Direct traffic from bookmarks or typed URLs',
    icon: 'ArrowRight',
    color: '#6B7280',
    priority: 1,
    isRealtime: true,
    requiresSourceId: false,
  },
  [TrafficAnalyticsType.REFERRAL_TRAFFIC]: {
    label: 'Referral Traffic',
    description: 'Traffic from referral websites',
    icon: 'Link2',
    color: '#A855F7',
    priority: 1,
    isRealtime: true,
    requiresSourceId: true,
  },
  [TrafficAnalyticsType.SOCIAL_TRAFFIC]: {
    label: 'Social Traffic',
    description: 'Traffic from social media platforms',
    icon: 'Share2',
    color: '#1DA1F2',
    priority: 1,
    isRealtime: true,
    requiresSourceId: true,
  },
  [TrafficAnalyticsType.PAID_SEARCH_TRAFFIC]: {
    label: 'Paid Search Traffic',
    description: 'Traffic from paid search advertising',
    icon: 'Search',
    color: '#4285F4',
    priority: 1,
    isRealtime: true,
    requiresSourceId: true,
  },
  [TrafficAnalyticsType.DISPLAY_TRAFFIC]: {
    label: 'Display Traffic',
    description: 'Traffic from display advertising',
    icon: 'Layout',
    color: '#3B82F6',
    priority: 2,
    isRealtime: true,
    requiresSourceId: true,
  },
  [TrafficAnalyticsType.EMAIL_TRAFFIC]: {
    label: 'Email Traffic',
    description: 'Traffic from email campaigns',
    icon: 'Mail',
    color: '#EA580C',
    priority: 2,
    isRealtime: true,
    requiresSourceId: true,
  },
  [TrafficAnalyticsType.AFFILIATE_TRAFFIC]: {
    label: 'Affiliate Traffic',
    description: 'Traffic from affiliate marketing',
    icon: 'Link2',
    color: '#10B981',
    priority: 2,
    isRealtime: false,
    requiresSourceId: true,
  },
  [TrafficAnalyticsType.VIDEO_TRAFFIC]: {
    label: 'Video Traffic',
    description: 'Traffic from video advertising',
    icon: 'Video',
    color: '#EC4899',
    priority: 2,
    isRealtime: true,
    requiresSourceId: true,
  },
  [TrafficAnalyticsType.MOBILE_TRAFFIC]: {
    label: 'Mobile Traffic',
    description: 'Traffic from mobile devices',
    icon: 'Smartphone',
    color: '#10B981',
    priority: 2,
    isRealtime: true,
    requiresSourceId: false,
  },
  [TrafficAnalyticsType.DESKTOP_TRAFFIC]: {
    label: 'Desktop Traffic',
    description: 'Traffic from desktop computers',
    icon: 'Monitor',
    color: '#6B7280',
    priority: 2,
    isRealtime: true,
    requiresSourceId: false,
  },
  [TrafficAnalyticsType.TABLET_TRAFFIC]: {
    label: 'Tablet Traffic',
    description: 'Traffic from tablet devices',
    icon: 'Tablet',
    color: '#8B5CF6',
    priority: 2,
    isRealtime: true,
    requiresSourceId: false,
  },
  [TrafficAnalyticsType.INTERNATIONAL_TRAFFIC]: {
    label: 'International Traffic',
    description: 'Traffic from international locations',
    icon: 'Globe',
    color: '#3B82F6',
    priority: 2,
    isRealtime: false,
    requiresSourceId: false,
  },
  [TrafficAnalyticsType.LOCAL_TRAFFIC]: {
    label: 'Local Traffic',
    description: 'Traffic from local locations',
    icon: 'MapPin',
    color: '#10B981',
    priority: 2,
    isRealtime: false,
    requiresSourceId: false,
  },
  [TrafficAnalyticsType.BOT_TRAFFIC]: {
    label: 'Bot Traffic',
    description: 'Traffic from automated bots',
    icon: 'Robot',
    color: '#EF4444',
    priority: 3,
    isRealtime: true,
    requiresSourceId: false,
  },
  [TrafficAnalyticsType.HUMAN_TRAFFIC]: {
    label: 'Human Traffic',
    description: 'Traffic from real human visitors',
    icon: 'User',
    color: '#22C55E',
    priority: 1,
    isRealtime: true,
    requiresSourceId: false,
  },
  [TrafficAnalyticsType.NEW_VISITOR]: {
    label: 'New Visitor',
    description: 'Traffic from first-time visitors',
    icon: 'UserPlus',
    color: '#3B82F6',
    priority: 1,
    isRealtime: true,
    requiresSourceId: false,
  },
  [TrafficAnalyticsType.RETURNING_VISITOR]: {
    label: 'Returning Visitor',
    description: 'Traffic from returning visitors',
    icon: 'UserCheck',
    color: '#10B981',
    priority: 1,
    isRealtime: true,
    requiresSourceId: false,
  },
  [TrafficAnalyticsType.UNIQUE_VISITOR]: {
    label: 'Unique Visitor',
    description: 'Traffic from unique visitors',
    icon: 'User',
    color: '#6366F1',
    priority: 1,
    isRealtime: false,
    requiresSourceId: false,
  },
  [TrafficAnalyticsType.REPEAT_VISITOR]: {
    label: 'Repeat Visitor',
    description: 'Traffic from repeat visitors',
    icon: 'Repeat',
    color: '#F59E0B',
    priority: 2,
    isRealtime: false,
    requiresSourceId: false,
  },
  [TrafficAnalyticsType.LANDING_PAGE_TRAFFIC]: {
    label: 'Landing Page Traffic',
    description: 'Traffic to landing pages',
    icon: 'FileText',
    color: '#8B5CF6',
    priority: 2,
    isRealtime: true,
    requiresSourceId: false,
  },
  [TrafficAnalyticsType.EXIT_PAGE_TRAFFIC]: {
    label: 'Exit Page Traffic',
    description: 'Traffic from exit pages',
    icon: 'FileText',
    color: '#EF4444',
    priority: 2,
    isRealtime: true,
    requiresSourceId: false,
  },
  [TrafficAnalyticsType.INTERNAL_TRAFFIC]: {
    label: 'Internal Traffic',
    description: 'Traffic from internal sources',
    icon: 'Building',
    color: '#6B7280',
    priority: 3,
    isRealtime: false,
    requiresSourceId: false,
  },
  [TrafficAnalyticsType.EXTERNAL_TRAFFIC]: {
    label: 'External Traffic',
    description: 'Traffic from external sources',
    icon: 'Globe',
    color: '#3B82F6',
    priority: 2,
    isRealtime: false,
    requiresSourceId: false,
  },
  [TrafficAnalyticsType.SEARCH_ENGINE_TRAFFIC]: {
    label: 'Search Engine Traffic',
    description: 'Traffic from all search engines',
    icon: 'Search',
    color: '#4285F4',
    priority: 2,
    isRealtime: true,
    requiresSourceId: false,
  },
  [TrafficAnalyticsType.NEWSLETTER_TRAFFIC]: {
    label: 'Newsletter Traffic',
    description: 'Traffic from newsletter campaigns',
    icon: 'Mail',
    color: '#F59E0B',
    priority: 2,
    isRealtime: true,
    requiresSourceId: true,
  },
  [TrafficAnalyticsType.PODCAST_TRAFFIC]: {
    label: 'Podcast Traffic',
    description: 'Traffic from podcast references',
    icon: 'Mic',
    color: '#6366F1',
    priority: 3,
    isRealtime: false,
    requiresSourceId: true,
  },
  [TrafficAnalyticsType.WEBINAR_TRAFFIC]: {
    label: 'Webinar Traffic',
    description: 'Traffic from webinars',
    icon: 'Video',
    color: '#8B5CF6',
    priority: 2,
    isRealtime: false,
    requiresSourceId: true,
  },
  [TrafficAnalyticsType.EVENT_TRAFFIC]: {
    label: 'Event Traffic',
    description: 'Traffic from events and conferences',
    icon: 'Calendar',
    color: '#F59E0B',
    priority: 2,
    isRealtime: false,
    requiresSourceId: true,
  },
  [TrafficAnalyticsType.INFLUENCER_TRAFFIC]: {
    label: 'Influencer Traffic',
    description: 'Traffic from influencer marketing',
    icon: 'Star',
    color: '#F472B6',
    priority: 2,
    isRealtime: true,
    requiresSourceId: true,
  },
};

/**
 * Get traffic analytics type label
 */
export function getTrafficAnalyticsTypeLabel(type: TrafficAnalyticsType): string {
  return TRAFFIC_ANALYTICS_TYPE_CONFIG[type]?.label || type;
}

/**
 * Get traffic analytics type description
 */
export function getTrafficAnalyticsTypeDescription(type: TrafficAnalyticsType): string {
  return TRAFFIC_ANALYTICS_TYPE_CONFIG[type]?.description || '';
}

/**
 * Get traffic analytics type category
 */
export function getTrafficAnalyticsTypeCategory(
  type: TrafficAnalyticsType
): TrafficAnalyticsCategory {
  return TRAFFIC_ANALYTICS_TYPE_CATEGORY_MAP[type];
}

/**
 * Get traffic analytics types by category
 */
export function getTrafficAnalyticsTypesByCategory(
  category: TrafficAnalyticsCategory
): TrafficAnalyticsType[] {
  return Object.entries(TRAFFIC_ANALYTICS_TYPE_CATEGORY_MAP)
    .filter(([_, cat]) => cat === category)
    .map(([type]) => type as TrafficAnalyticsType);
}

/**
 * Check if traffic analytics type requires source ID
 */
export function trafficAnalyticsTypeRequiresSourceId(type: TrafficAnalyticsType): boolean {
  return TRAFFIC_ANALYTICS_TYPE_CONFIG[type]?.requiresSourceId || false;
}

/**
 * Check if traffic analytics type is real-time
 */
export function isTrafficAnalyticsTypeRealtime(type: TrafficAnalyticsType): boolean {
  return TRAFFIC_ANALYTICS_TYPE_CONFIG[type]?.isRealtime || false;
}

/**
 * Get traffic analytics type priority
 */
export function getTrafficAnalyticsTypePriority(type: TrafficAnalyticsType): number {
  return TRAFFIC_ANALYTICS_TYPE_CONFIG[type]?.priority || 3;
}

/**
 * Traffic analytics type status
 */
export enum TrafficAnalyticsTypeStatus {
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
 * Default status for traffic analytics types
 */
export const TRAFFIC_ANALYTICS_TYPE_DEFAULT_STATUS: Record<
  TrafficAnalyticsType,
  TrafficAnalyticsTypeStatus
> = {
  [TrafficAnalyticsType.ORGANIC_TRAFFIC]: TrafficAnalyticsTypeStatus.ACTIVE,
  [TrafficAnalyticsType.DIRECT_TRAFFIC]: TrafficAnalyticsTypeStatus.ACTIVE,
  [TrafficAnalyticsType.REFERRAL_TRAFFIC]: TrafficAnalyticsTypeStatus.ACTIVE,
  [TrafficAnalyticsType.SOCIAL_TRAFFIC]: TrafficAnalyticsTypeStatus.ACTIVE,
  [TrafficAnalyticsType.PAID_SEARCH_TRAFFIC]: TrafficAnalyticsTypeStatus.ACTIVE,
  [TrafficAnalyticsType.DISPLAY_TRAFFIC]: TrafficAnalyticsTypeStatus.ACTIVE,
  [TrafficAnalyticsType.EMAIL_TRAFFIC]: TrafficAnalyticsTypeStatus.ACTIVE,
  [TrafficAnalyticsType.AFFILIATE_TRAFFIC]: TrafficAnalyticsTypeStatus.ACTIVE,
  [TrafficAnalyticsType.VIDEO_TRAFFIC]: TrafficAnalyticsTypeStatus.ACTIVE,
  [TrafficAnalyticsType.MOBILE_TRAFFIC]: TrafficAnalyticsTypeStatus.ACTIVE,
  [TrafficAnalyticsType.DESKTOP_TRAFFIC]: TrafficAnalyticsTypeStatus.ACTIVE,
  [TrafficAnalyticsType.TABLET_TRAFFIC]: TrafficAnalyticsTypeStatus.ACTIVE,
  [TrafficAnalyticsType.INTERNATIONAL_TRAFFIC]: TrafficAnalyticsTypeStatus.ACTIVE,
  [TrafficAnalyticsType.LOCAL_TRAFFIC]: TrafficAnalyticsTypeStatus.ACTIVE,
  [TrafficAnalyticsType.BOT_TRAFFIC]: TrafficAnalyticsTypeStatus.ACTIVE,
  [TrafficAnalyticsType.HUMAN_TRAFFIC]: TrafficAnalyticsTypeStatus.ACTIVE,
  [TrafficAnalyticsType.NEW_VISITOR]: TrafficAnalyticsTypeStatus.ACTIVE,
  [TrafficAnalyticsType.RETURNING_VISITOR]: TrafficAnalyticsTypeStatus.ACTIVE,
  [TrafficAnalyticsType.UNIQUE_VISITOR]: TrafficAnalyticsTypeStatus.ACTIVE,
  [TrafficAnalyticsType.REPEAT_VISITOR]: TrafficAnalyticsTypeStatus.ACTIVE,
  [TrafficAnalyticsType.LANDING_PAGE_TRAFFIC]: TrafficAnalyticsTypeStatus.ACTIVE,
  [TrafficAnalyticsType.EXIT_PAGE_TRAFFIC]: TrafficAnalyticsTypeStatus.ACTIVE,
  [TrafficAnalyticsType.INTERNAL_TRAFFIC]: TrafficAnalyticsTypeStatus.ACTIVE,
  [TrafficAnalyticsType.EXTERNAL_TRAFFIC]: TrafficAnalyticsTypeStatus.ACTIVE,
  [TrafficAnalyticsType.SEARCH_ENGINE_TRAFFIC]: TrafficAnalyticsTypeStatus.ACTIVE,
  [TrafficAnalyticsType.NEWSLETTER_TRAFFIC]: TrafficAnalyticsTypeStatus.ACTIVE,
  [TrafficAnalyticsType.PODCAST_TRAFFIC]: TrafficAnalyticsTypeStatus.ACTIVE,
  [TrafficAnalyticsType.WEBINAR_TRAFFIC]: TrafficAnalyticsTypeStatus.ACTIVE,
  [TrafficAnalyticsType.EVENT_TRAFFIC]: TrafficAnalyticsTypeStatus.ACTIVE,
  [TrafficAnalyticsType.INFLUENCER_TRAFFIC]: TrafficAnalyticsTypeStatus.ACTIVE,
};

/**
 * Get traffic analytics type status
 */
export function getTrafficAnalyticsTypeStatus(
  type: TrafficAnalyticsType
): TrafficAnalyticsTypeStatus {
  return TRAFFIC_ANALYTICS_TYPE_DEFAULT_STATUS[type] || TrafficAnalyticsTypeStatus.INACTIVE;
}

/**
 * Set traffic analytics type status
 */
export function setTrafficAnalyticsTypeStatus(
  type: TrafficAnalyticsType,
  status: TrafficAnalyticsTypeStatus
): void {
  TRAFFIC_ANALYTICS_TYPE_DEFAULT_STATUS[type] = status;
}

/**
 * Traffic analytics priority levels
 */
export const TRAFFIC_ANALYTICS_PRIORITY_LEVELS = {
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
 * Get traffic analytics types by priority
 */
export function getTrafficAnalyticsTypesByPriority(priority: number): TrafficAnalyticsType[] {
  return Object.entries(TRAFFIC_ANALYTICS_TYPE_CONFIG)
    .filter(([_, config]) => config.priority === priority)
    .map(([type]) => type as TrafficAnalyticsType);
}

/**
 * Get critical traffic analytics types
 */
export function getCriticalTrafficAnalyticsTypes(): TrafficAnalyticsType[] {
  return getTrafficAnalyticsTypesByPriority(TRAFFIC_ANALYTICS_PRIORITY_LEVELS.CRITICAL);
}

/**
 * Traffic analytics sub-categories
 */
export enum TrafficAnalyticsSubCategory {
  /** Source analysis */
  SOURCE_ANALYSIS = 'SOURCE_ANALYSIS',
  /** Device analysis */
  DEVICE_ANALYSIS = 'DEVICE_ANALYSIS',
  /** Visitor analysis */
  VISITOR_ANALYSIS = 'VISITOR_ANALYSIS',
  /** Geographic analysis */
  GEOGRAPHIC_ANALYSIS = 'GEOGRAPHIC_ANALYSIS',
  /** Behavior analysis */
  BEHAVIOR_ANALYSIS = 'BEHAVIOR_ANALYSIS',
  /** Channel analysis */
  CHANNEL_ANALYSIS = 'CHANNEL_ANALYSIS',
}

/**
 * Mapping of traffic analytics types to sub-categories
 */
export const TRAFFIC_ANALYTICS_TYPE_SUB_CATEGORY_MAP: Record<
  TrafficAnalyticsType,
  TrafficAnalyticsSubCategory
> = {
  [TrafficAnalyticsType.ORGANIC_TRAFFIC]: TrafficAnalyticsSubCategory.SOURCE_ANALYSIS,
  [TrafficAnalyticsType.DIRECT_TRAFFIC]: TrafficAnalyticsSubCategory.SOURCE_ANALYSIS,
  [TrafficAnalyticsType.REFERRAL_TRAFFIC]: TrafficAnalyticsSubCategory.SOURCE_ANALYSIS,
  [TrafficAnalyticsType.SOCIAL_TRAFFIC]: TrafficAnalyticsSubCategory.SOURCE_ANALYSIS,
  [TrafficAnalyticsType.PAID_SEARCH_TRAFFIC]: TrafficAnalyticsSubCategory.SOURCE_ANALYSIS,
  [TrafficAnalyticsType.DISPLAY_TRAFFIC]: TrafficAnalyticsSubCategory.SOURCE_ANALYSIS,
  [TrafficAnalyticsType.EMAIL_TRAFFIC]: TrafficAnalyticsSubCategory.SOURCE_ANALYSIS,
  [TrafficAnalyticsType.AFFILIATE_TRAFFIC]: TrafficAnalyticsSubCategory.SOURCE_ANALYSIS,
  [TrafficAnalyticsType.VIDEO_TRAFFIC]: TrafficAnalyticsSubCategory.SOURCE_ANALYSIS,
  [TrafficAnalyticsType.SEARCH_ENGINE_TRAFFIC]: TrafficAnalyticsSubCategory.SOURCE_ANALYSIS,
  [TrafficAnalyticsType.NEWSLETTER_TRAFFIC]: TrafficAnalyticsSubCategory.SOURCE_ANALYSIS,
  [TrafficAnalyticsType.PODCAST_TRAFFIC]: TrafficAnalyticsSubCategory.SOURCE_ANALYSIS,
  [TrafficAnalyticsType.WEBINAR_TRAFFIC]: TrafficAnalyticsSubCategory.SOURCE_ANALYSIS,
  [TrafficAnalyticsType.EVENT_TRAFFIC]: TrafficAnalyticsSubCategory.SOURCE_ANALYSIS,
  [TrafficAnalyticsType.INFLUENCER_TRAFFIC]: TrafficAnalyticsSubCategory.SOURCE_ANALYSIS,
  [TrafficAnalyticsType.MOBILE_TRAFFIC]: TrafficAnalyticsSubCategory.DEVICE_ANALYSIS,
  [TrafficAnalyticsType.DESKTOP_TRAFFIC]: TrafficAnalyticsSubCategory.DEVICE_ANALYSIS,
  [TrafficAnalyticsType.TABLET_TRAFFIC]: TrafficAnalyticsSubCategory.DEVICE_ANALYSIS,
  [TrafficAnalyticsType.INTERNATIONAL_TRAFFIC]: TrafficAnalyticsSubCategory.GEOGRAPHIC_ANALYSIS,
  [TrafficAnalyticsType.LOCAL_TRAFFIC]: TrafficAnalyticsSubCategory.GEOGRAPHIC_ANALYSIS,
  [TrafficAnalyticsType.NEW_VISITOR]: TrafficAnalyticsSubCategory.VISITOR_ANALYSIS,
  [TrafficAnalyticsType.RETURNING_VISITOR]: TrafficAnalyticsSubCategory.VISITOR_ANALYSIS,
  [TrafficAnalyticsType.UNIQUE_VISITOR]: TrafficAnalyticsSubCategory.VISITOR_ANALYSIS,
  [TrafficAnalyticsType.REPEAT_VISITOR]: TrafficAnalyticsSubCategory.VISITOR_ANALYSIS,
  [TrafficAnalyticsType.BOT_TRAFFIC]: TrafficAnalyticsSubCategory.BEHAVIOR_ANALYSIS,
  [TrafficAnalyticsType.HUMAN_TRAFFIC]: TrafficAnalyticsSubCategory.BEHAVIOR_ANALYSIS,
  [TrafficAnalyticsType.INTERNAL_TRAFFIC]: TrafficAnalyticsSubCategory.BEHAVIOR_ANALYSIS,
  [TrafficAnalyticsType.EXTERNAL_TRAFFIC]: TrafficAnalyticsSubCategory.BEHAVIOR_ANALYSIS,
  [TrafficAnalyticsType.LANDING_PAGE_TRAFFIC]: TrafficAnalyticsSubCategory.BEHAVIOR_ANALYSIS,
  [TrafficAnalyticsType.EXIT_PAGE_TRAFFIC]: TrafficAnalyticsSubCategory.BEHAVIOR_ANALYSIS,
};

/**
 * Get traffic analytics type sub-category
 */
export function getTrafficAnalyticsTypeSubCategory(
  type: TrafficAnalyticsType
): TrafficAnalyticsSubCategory {
  return TRAFFIC_ANALYTICS_TYPE_SUB_CATEGORY_MAP[type];
}

/**
 * Get traffic analytics types by sub-category
 */
export function getTrafficAnalyticsTypesBySubCategory(
  subCategory: TrafficAnalyticsSubCategory
): TrafficAnalyticsType[] {
  return Object.entries(TRAFFIC_ANALYTICS_TYPE_SUB_CATEGORY_MAP)
    .filter(([_, subCat]) => subCat === subCategory)
    .map(([type]) => type as TrafficAnalyticsType);
}
