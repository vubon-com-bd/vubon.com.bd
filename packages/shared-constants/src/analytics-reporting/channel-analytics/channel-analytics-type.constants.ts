/**
 * @fileoverview Channel analytics type definitions and constants
 * @package @vubun/shared-constants
 */

// External libraries - none needed for constants

// Shared packages - none needed for constants

// Project files - none needed for constants

/**
 * Channel analytics types enum for different channel-related analytics
 */
export enum ChannelAnalyticsType {
  /** Online channel analytics */
  ONLINE_CHANNEL_ANALYTICS = 'ONLINE_CHANNEL_ANALYTICS',
  /** Offline channel analytics */
  OFFLINE_CHANNEL_ANALYTICS = 'OFFLINE_CHANNEL_ANALYTICS',
  /** Direct channel analytics */
  DIRECT_CHANNEL_ANALYTICS = 'DIRECT_CHANNEL_ANALYTICS',
  /** Indirect channel analytics */
  INDIRECT_CHANNEL_ANALYTICS = 'INDIRECT_CHANNEL_ANALYTICS',
  /** Retail channel analytics */
  RETAIL_CHANNEL_ANALYTICS = 'RETAIL_CHANNEL_ANALYTICS',
  /** Wholesale channel analytics */
  WHOLESALE_CHANNEL_ANALYTICS = 'WHOLESALE_CHANNEL_ANALYTICS',
  /** Distribution channel analytics */
  DISTRIBUTION_CHANNEL_ANALYTICS = 'DISTRIBUTION_CHANNEL_ANALYTICS',
  /** Franchise channel analytics */
  FRANCHISE_CHANNEL_ANALYTICS = 'FRANCHISE_CHANNEL_ANALYTICS',
  /** Marketplace channel analytics */
  MARKETPLACE_CHANNEL_ANALYTICS = 'MARKETPLACE_CHANNEL_ANALYTICS',
  /** Social channel analytics */
  SOCIAL_CHANNEL_ANALYTICS = 'SOCIAL_CHANNEL_ANALYTICS',
  /** Email channel analytics */
  EMAIL_CHANNEL_ANALYTICS = 'EMAIL_CHANNEL_ANALYTICS',
  /** Search channel analytics */
  SEARCH_CHANNEL_ANALYTICS = 'SEARCH_CHANNEL_ANALYTICS',
  /** Display channel analytics */
  DISPLAY_CHANNEL_ANALYTICS = 'DISPLAY_CHANNEL_ANALYTICS',
  /** Affiliate channel analytics */
  AFFILIATE_CHANNEL_ANALYTICS = 'AFFILIATE_CHANNEL_ANALYTICS',
  /** Referral channel analytics */
  REFERRAL_CHANNEL_ANALYTICS = 'REFERRAL_CHANNEL_ANALYTICS',
  /** Partner channel analytics */
  PARTNER_CHANNEL_ANALYTICS = 'PARTNER_CHANNEL_ANALYTICS',
  /** Reseller channel analytics */
  RESELLER_CHANNEL_ANALYTICS = 'RESELLER_CHANNEL_ANALYTICS',
  /** Agent channel analytics */
  AGENT_CHANNEL_ANALYTICS = 'AGENT_CHANNEL_ANALYTICS',
  /** Broker channel analytics */
  BROKER_CHANNEL_ANALYTICS = 'BROKER_CHANNEL_ANALYTICS',
  /** Consultant channel analytics */
  CONSULTANT_CHANNEL_ANALYTICS = 'CONSULTANT_CHANNEL_ANALYTICS',
  /** Mobile channel analytics */
  MOBILE_CHANNEL_ANALYTICS = 'MOBILE_CHANNEL_ANALYTICS',
  /** Digital channel analytics */
  DIGITAL_CHANNEL_ANALYTICS = 'DIGITAL_CHANNEL_ANALYTICS',
  /** Physical channel analytics */
  PHYSICAL_CHANNEL_ANALYTICS = 'PHYSICAL_CHANNEL_ANALYTICS',
  /** Hybrid channel analytics */
  HYBRID_CHANNEL_ANALYTICS = 'HYBRID_CHANNEL_ANALYTICS',
  /** Cross-channel analytics */
  CROSS_CHANNEL_ANALYTICS = 'CROSS_CHANNEL_ANALYTICS',
}

/**
 * Channel analytics category for grouping
 */
export enum ChannelAnalyticsCategory {
  /** Type-based channel analytics */
  TYPE = 'TYPE',
  /** Channel nature analytics */
  NATURE = 'NATURE',
  /** Channel medium analytics */
  MEDIUM = 'MEDIUM',
  /** Channel relationship analytics */
  RELATIONSHIP = 'RELATIONSHIP',
  /** Channel integration analytics */
  INTEGRATION = 'INTEGRATION',
}

/**
 * Channel analytics category mapping
 */
export const CHANNEL_ANALYTICS_TYPE_CATEGORY_MAP: Record<
  ChannelAnalyticsType,
  ChannelAnalyticsCategory
> = {
  [ChannelAnalyticsType.ONLINE_CHANNEL_ANALYTICS]: ChannelAnalyticsCategory.MEDIUM,
  [ChannelAnalyticsType.OFFLINE_CHANNEL_ANALYTICS]: ChannelAnalyticsCategory.MEDIUM,
  [ChannelAnalyticsType.DIRECT_CHANNEL_ANALYTICS]: ChannelAnalyticsCategory.NATURE,
  [ChannelAnalyticsType.INDIRECT_CHANNEL_ANALYTICS]: ChannelAnalyticsCategory.NATURE,
  [ChannelAnalyticsType.RETAIL_CHANNEL_ANALYTICS]: ChannelAnalyticsCategory.TYPE,
  [ChannelAnalyticsType.WHOLESALE_CHANNEL_ANALYTICS]: ChannelAnalyticsCategory.TYPE,
  [ChannelAnalyticsType.DISTRIBUTION_CHANNEL_ANALYTICS]: ChannelAnalyticsCategory.TYPE,
  [ChannelAnalyticsType.FRANCHISE_CHANNEL_ANALYTICS]: ChannelAnalyticsCategory.TYPE,
  [ChannelAnalyticsType.MARKETPLACE_CHANNEL_ANALYTICS]: ChannelAnalyticsCategory.TYPE,
  [ChannelAnalyticsType.SOCIAL_CHANNEL_ANALYTICS]: ChannelAnalyticsCategory.MEDIUM,
  [ChannelAnalyticsType.EMAIL_CHANNEL_ANALYTICS]: ChannelAnalyticsCategory.MEDIUM,
  [ChannelAnalyticsType.SEARCH_CHANNEL_ANALYTICS]: ChannelAnalyticsCategory.MEDIUM,
  [ChannelAnalyticsType.DISPLAY_CHANNEL_ANALYTICS]: ChannelAnalyticsCategory.MEDIUM,
  [ChannelAnalyticsType.AFFILIATE_CHANNEL_ANALYTICS]: ChannelAnalyticsCategory.RELATIONSHIP,
  [ChannelAnalyticsType.REFERRAL_CHANNEL_ANALYTICS]: ChannelAnalyticsCategory.RELATIONSHIP,
  [ChannelAnalyticsType.PARTNER_CHANNEL_ANALYTICS]: ChannelAnalyticsCategory.RELATIONSHIP,
  [ChannelAnalyticsType.RESELLER_CHANNEL_ANALYTICS]: ChannelAnalyticsCategory.RELATIONSHIP,
  [ChannelAnalyticsType.AGENT_CHANNEL_ANALYTICS]: ChannelAnalyticsCategory.RELATIONSHIP,
  [ChannelAnalyticsType.BROKER_CHANNEL_ANALYTICS]: ChannelAnalyticsCategory.RELATIONSHIP,
  [ChannelAnalyticsType.CONSULTANT_CHANNEL_ANALYTICS]: ChannelAnalyticsCategory.RELATIONSHIP,
  [ChannelAnalyticsType.MOBILE_CHANNEL_ANALYTICS]: ChannelAnalyticsCategory.MEDIUM,
  [ChannelAnalyticsType.DIGITAL_CHANNEL_ANALYTICS]: ChannelAnalyticsCategory.MEDIUM,
  [ChannelAnalyticsType.PHYSICAL_CHANNEL_ANALYTICS]: ChannelAnalyticsCategory.MEDIUM,
  [ChannelAnalyticsType.HYBRID_CHANNEL_ANALYTICS]: ChannelAnalyticsCategory.INTEGRATION,
  [ChannelAnalyticsType.CROSS_CHANNEL_ANALYTICS]: ChannelAnalyticsCategory.INTEGRATION,
};

/**
 * Channel analytics type configuration
 */
export interface ChannelAnalyticsTypeConfig {
  label: string;
  description: string;
  icon?: string;
  color?: string;
  priority: number;
  isRealtime: boolean;
  requiresChannelId: boolean;
}

export const CHANNEL_ANALYTICS_TYPE_CONFIG: Record<
  ChannelAnalyticsType,
  ChannelAnalyticsTypeConfig
> = {
  [ChannelAnalyticsType.ONLINE_CHANNEL_ANALYTICS]: {
    label: 'Online Channel Analytics',
    description: 'Analytics for online channels',
    icon: 'Globe',
    color: '#3B82F6',
    priority: 1,
    isRealtime: true,
    requiresChannelId: true,
  },
  [ChannelAnalyticsType.OFFLINE_CHANNEL_ANALYTICS]: {
    label: 'Offline Channel Analytics',
    description: 'Analytics for offline channels',
    icon: 'Store',
    color: '#6B7280',
    priority: 2,
    isRealtime: false,
    requiresChannelId: true,
  },
  [ChannelAnalyticsType.DIRECT_CHANNEL_ANALYTICS]: {
    label: 'Direct Channel Analytics',
    description: 'Analytics for direct sales channels',
    icon: 'User',
    color: '#22C55E',
    priority: 1,
    isRealtime: true,
    requiresChannelId: true,
  },
  [ChannelAnalyticsType.INDIRECT_CHANNEL_ANALYTICS]: {
    label: 'Indirect Channel Analytics',
    description: 'Analytics for indirect channels',
    icon: 'Users',
    color: '#8B5CF6',
    priority: 2,
    isRealtime: false,
    requiresChannelId: true,
  },
  [ChannelAnalyticsType.RETAIL_CHANNEL_ANALYTICS]: {
    label: 'Retail Channel Analytics',
    description: 'Analytics for retail channels',
    icon: 'ShoppingBag',
    color: '#F59E0B',
    priority: 2,
    isRealtime: true,
    requiresChannelId: true,
  },
  [ChannelAnalyticsType.WHOLESALE_CHANNEL_ANALYTICS]: {
    label: 'Wholesale Channel Analytics',
    description: 'Analytics for wholesale channels',
    icon: 'Truck',
    color: '#6366F1',
    priority: 2,
    isRealtime: false,
    requiresChannelId: true,
  },
  [ChannelAnalyticsType.DISTRIBUTION_CHANNEL_ANALYTICS]: {
    label: 'Distribution Channel Analytics',
    description: 'Analytics for distribution channels',
    icon: 'Package',
    color: '#10B981',
    priority: 2,
    isRealtime: false,
    requiresChannelId: true,
  },
  [ChannelAnalyticsType.FRANCHISE_CHANNEL_ANALYTICS]: {
    label: 'Franchise Channel Analytics',
    description: 'Analytics for franchise channels',
    icon: 'Store',
    color: '#8B5CF6',
    priority: 2,
    isRealtime: false,
    requiresChannelId: true,
  },
  [ChannelAnalyticsType.MARKETPLACE_CHANNEL_ANALYTICS]: {
    label: 'Marketplace Channel Analytics',
    description: 'Analytics for marketplace channels',
    icon: 'Layers',
    color: '#EC4899',
    priority: 2,
    isRealtime: true,
    requiresChannelId: true,
  },
  [ChannelAnalyticsType.SOCIAL_CHANNEL_ANALYTICS]: {
    label: 'Social Channel Analytics',
    description: 'Analytics for social media channels',
    icon: 'Share2',
    color: '#1DA1F2',
    priority: 2,
    isRealtime: true,
    requiresChannelId: true,
  },
  [ChannelAnalyticsType.EMAIL_CHANNEL_ANALYTICS]: {
    label: 'Email Channel Analytics',
    description: 'Analytics for email marketing channels',
    icon: 'Mail',
    color: '#EA580C',
    priority: 2,
    isRealtime: true,
    requiresChannelId: true,
  },
  [ChannelAnalyticsType.SEARCH_CHANNEL_ANALYTICS]: {
    label: 'Search Channel Analytics',
    description: 'Analytics for search engine channels',
    icon: 'Search',
    color: '#4285F4',
    priority: 1,
    isRealtime: true,
    requiresChannelId: true,
  },
  [ChannelAnalyticsType.DISPLAY_CHANNEL_ANALYTICS]: {
    label: 'Display Channel Analytics',
    description: 'Analytics for display advertising channels',
    icon: 'Layout',
    color: '#3B82F6',
    priority: 2,
    isRealtime: true,
    requiresChannelId: true,
  },
  [ChannelAnalyticsType.AFFILIATE_CHANNEL_ANALYTICS]: {
    label: 'Affiliate Channel Analytics',
    description: 'Analytics for affiliate marketing channels',
    icon: 'Link2',
    color: '#10B981',
    priority: 2,
    isRealtime: false,
    requiresChannelId: true,
  },
  [ChannelAnalyticsType.REFERRAL_CHANNEL_ANALYTICS]: {
    label: 'Referral Channel Analytics',
    description: 'Analytics for referral channels',
    icon: 'Users',
    color: '#A855F7',
    priority: 2,
    isRealtime: false,
    requiresChannelId: true,
  },
  [ChannelAnalyticsType.PARTNER_CHANNEL_ANALYTICS]: {
    label: 'Partner Channel Analytics',
    description: 'Analytics for partner channels',
    icon: 'Handshake',
    color: '#F59E0B',
    priority: 2,
    isRealtime: false,
    requiresChannelId: true,
  },
  [ChannelAnalyticsType.RESELLER_CHANNEL_ANALYTICS]: {
    label: 'Reseller Channel Analytics',
    description: 'Analytics for reseller channels',
    icon: 'Users',
    color: '#22C55E',
    priority: 2,
    isRealtime: false,
    requiresChannelId: true,
  },
  [ChannelAnalyticsType.AGENT_CHANNEL_ANALYTICS]: {
    label: 'Agent Channel Analytics',
    description: 'Analytics for agent channels',
    icon: 'User',
    color: '#6366F1',
    priority: 2,
    isRealtime: false,
    requiresChannelId: true,
  },
  [ChannelAnalyticsType.BROKER_CHANNEL_ANALYTICS]: {
    label: 'Broker Channel Analytics',
    description: 'Analytics for broker channels',
    icon: 'Scale',
    color: '#6B7280',
    priority: 2,
    isRealtime: false,
    requiresChannelId: true,
  },
  [ChannelAnalyticsType.CONSULTANT_CHANNEL_ANALYTICS]: {
    label: 'Consultant Channel Analytics',
    description: 'Analytics for consultant channels',
    icon: 'Briefcase',
    color: '#8B5CF6',
    priority: 2,
    isRealtime: false,
    requiresChannelId: true,
  },
  [ChannelAnalyticsType.MOBILE_CHANNEL_ANALYTICS]: {
    label: 'Mobile Channel Analytics',
    description: 'Analytics for mobile channels',
    icon: 'Smartphone',
    color: '#10B981',
    priority: 2,
    isRealtime: true,
    requiresChannelId: true,
  },
  [ChannelAnalyticsType.DIGITAL_CHANNEL_ANALYTICS]: {
    label: 'Digital Channel Analytics',
    description: 'Analytics for digital channels',
    icon: 'Code',
    color: '#8B5CF6',
    priority: 1,
    isRealtime: true,
    requiresChannelId: true,
  },
  [ChannelAnalyticsType.PHYSICAL_CHANNEL_ANALYTICS]: {
    label: 'Physical Channel Analytics',
    description: 'Analytics for physical channels',
    icon: 'Building',
    color: '#6B7280',
    priority: 2,
    isRealtime: false,
    requiresChannelId: true,
  },
  [ChannelAnalyticsType.HYBRID_CHANNEL_ANALYTICS]: {
    label: 'Hybrid Channel Analytics',
    description: 'Analytics for hybrid channels',
    icon: 'Layers',
    color: '#F59E0B',
    priority: 2,
    isRealtime: false,
    requiresChannelId: true,
  },
  [ChannelAnalyticsType.CROSS_CHANNEL_ANALYTICS]: {
    label: 'Cross-Channel Analytics',
    description: 'Analytics for cross-channel integration',
    icon: 'Grid',
    color: '#3B82F6',
    priority: 1,
    isRealtime: false,
    requiresChannelId: false,
  },
};

/**
 * Get channel analytics type label
 */
export function getChannelAnalyticsTypeLabel(type: ChannelAnalyticsType): string {
  return CHANNEL_ANALYTICS_TYPE_CONFIG[type]?.label || type;
}

/**
 * Get channel analytics type description
 */
export function getChannelAnalyticsTypeDescription(type: ChannelAnalyticsType): string {
  return CHANNEL_ANALYTICS_TYPE_CONFIG[type]?.description || '';
}

/**
 * Get channel analytics type category
 */
export function getChannelAnalyticsTypeCategory(
  type: ChannelAnalyticsType
): ChannelAnalyticsCategory {
  return CHANNEL_ANALYTICS_TYPE_CATEGORY_MAP[type];
}

/**
 * Get channel analytics types by category
 */
export function getChannelAnalyticsTypesByCategory(
  category: ChannelAnalyticsCategory
): ChannelAnalyticsType[] {
  return Object.entries(CHANNEL_ANALYTICS_TYPE_CATEGORY_MAP)
    .filter(([_, cat]) => cat === category)
    .map(([type]) => type as ChannelAnalyticsType);
}

/**
 * Check if channel analytics type requires channel ID
 */
export function channelAnalyticsTypeRequiresChannelId(type: ChannelAnalyticsType): boolean {
  return CHANNEL_ANALYTICS_TYPE_CONFIG[type]?.requiresChannelId || false;
}

/**
 * Check if channel analytics type is real-time
 */
export function isChannelAnalyticsTypeRealtime(type: ChannelAnalyticsType): boolean {
  return CHANNEL_ANALYTICS_TYPE_CONFIG[type]?.isRealtime || false;
}

/**
 * Get channel analytics type priority
 */
export function getChannelAnalyticsTypePriority(type: ChannelAnalyticsType): number {
  return CHANNEL_ANALYTICS_TYPE_CONFIG[type]?.priority || 3;
}

/**
 * Channel analytics type status
 */
export enum ChannelAnalyticsTypeStatus {
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
 * Default status for channel analytics types
 */
export const CHANNEL_ANALYTICS_TYPE_DEFAULT_STATUS: Record<
  ChannelAnalyticsType,
  ChannelAnalyticsTypeStatus
> = {
  [ChannelAnalyticsType.ONLINE_CHANNEL_ANALYTICS]: ChannelAnalyticsTypeStatus.ACTIVE,
  [ChannelAnalyticsType.OFFLINE_CHANNEL_ANALYTICS]: ChannelAnalyticsTypeStatus.ACTIVE,
  [ChannelAnalyticsType.DIRECT_CHANNEL_ANALYTICS]: ChannelAnalyticsTypeStatus.ACTIVE,
  [ChannelAnalyticsType.INDIRECT_CHANNEL_ANALYTICS]: ChannelAnalyticsTypeStatus.ACTIVE,
  [ChannelAnalyticsType.RETAIL_CHANNEL_ANALYTICS]: ChannelAnalyticsTypeStatus.ACTIVE,
  [ChannelAnalyticsType.WHOLESALE_CHANNEL_ANALYTICS]: ChannelAnalyticsTypeStatus.ACTIVE,
  [ChannelAnalyticsType.DISTRIBUTION_CHANNEL_ANALYTICS]: ChannelAnalyticsTypeStatus.ACTIVE,
  [ChannelAnalyticsType.FRANCHISE_CHANNEL_ANALYTICS]: ChannelAnalyticsTypeStatus.ACTIVE,
  [ChannelAnalyticsType.MARKETPLACE_CHANNEL_ANALYTICS]: ChannelAnalyticsTypeStatus.ACTIVE,
  [ChannelAnalyticsType.SOCIAL_CHANNEL_ANALYTICS]: ChannelAnalyticsTypeStatus.ACTIVE,
  [ChannelAnalyticsType.EMAIL_CHANNEL_ANALYTICS]: ChannelAnalyticsTypeStatus.ACTIVE,
  [ChannelAnalyticsType.SEARCH_CHANNEL_ANALYTICS]: ChannelAnalyticsTypeStatus.ACTIVE,
  [ChannelAnalyticsType.DISPLAY_CHANNEL_ANALYTICS]: ChannelAnalyticsTypeStatus.ACTIVE,
  [ChannelAnalyticsType.AFFILIATE_CHANNEL_ANALYTICS]: ChannelAnalyticsTypeStatus.ACTIVE,
  [ChannelAnalyticsType.REFERRAL_CHANNEL_ANALYTICS]: ChannelAnalyticsTypeStatus.ACTIVE,
  [ChannelAnalyticsType.PARTNER_CHANNEL_ANALYTICS]: ChannelAnalyticsTypeStatus.ACTIVE,
  [ChannelAnalyticsType.RESELLER_CHANNEL_ANALYTICS]: ChannelAnalyticsTypeStatus.ACTIVE,
  [ChannelAnalyticsType.AGENT_CHANNEL_ANALYTICS]: ChannelAnalyticsTypeStatus.ACTIVE,
  [ChannelAnalyticsType.BROKER_CHANNEL_ANALYTICS]: ChannelAnalyticsTypeStatus.ACTIVE,
  [ChannelAnalyticsType.CONSULTANT_CHANNEL_ANALYTICS]: ChannelAnalyticsTypeStatus.ACTIVE,
  [ChannelAnalyticsType.MOBILE_CHANNEL_ANALYTICS]: ChannelAnalyticsTypeStatus.ACTIVE,
  [ChannelAnalyticsType.DIGITAL_CHANNEL_ANALYTICS]: ChannelAnalyticsTypeStatus.ACTIVE,
  [ChannelAnalyticsType.PHYSICAL_CHANNEL_ANALYTICS]: ChannelAnalyticsTypeStatus.ACTIVE,
  [ChannelAnalyticsType.HYBRID_CHANNEL_ANALYTICS]: ChannelAnalyticsTypeStatus.ACTIVE,
  [ChannelAnalyticsType.CROSS_CHANNEL_ANALYTICS]: ChannelAnalyticsTypeStatus.ACTIVE,
};

/**
 * Get channel analytics type status
 */
export function getChannelAnalyticsTypeStatus(
  type: ChannelAnalyticsType
): ChannelAnalyticsTypeStatus {
  return CHANNEL_ANALYTICS_TYPE_DEFAULT_STATUS[type] || ChannelAnalyticsTypeStatus.INACTIVE;
}

/**
 * Set channel analytics type status
 */
export function setChannelAnalyticsTypeStatus(
  type: ChannelAnalyticsType,
  status: ChannelAnalyticsTypeStatus
): void {
  CHANNEL_ANALYTICS_TYPE_DEFAULT_STATUS[type] = status;
}

/**
 * Channel analytics priority levels
 */
export const CHANNEL_ANALYTICS_PRIORITY_LEVELS = {
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
 * Get channel analytics types by priority
 */
export function getChannelAnalyticsTypesByPriority(priority: number): ChannelAnalyticsType[] {
  return Object.entries(CHANNEL_ANALYTICS_TYPE_CONFIG)
    .filter(([_, config]) => config.priority === priority)
    .map(([type]) => type as ChannelAnalyticsType);
}

/**
 * Get critical channel analytics types
 */
export function getCriticalChannelAnalyticsTypes(): ChannelAnalyticsType[] {
  return getChannelAnalyticsTypesByPriority(CHANNEL_ANALYTICS_PRIORITY_LEVELS.CRITICAL);
}

/**
 * Channel analytics sub-categories
 */
export enum ChannelAnalyticsSubCategory {
  /** Channel type analysis */
  TYPE_ANALYSIS = 'TYPE_ANALYSIS',
  /** Channel nature analysis */
  NATURE_ANALYSIS = 'NATURE_ANALYSIS',
  /** Channel medium analysis */
  MEDIUM_ANALYSIS = 'MEDIUM_ANALYSIS',
  /** Channel relationship analysis */
  RELATIONSHIP_ANALYSIS = 'RELATIONSHIP_ANALYSIS',
  /** Channel integration analysis */
  INTEGRATION_ANALYSIS = 'INTEGRATION_ANALYSIS',
  /** Channel performance analysis */
  PERFORMANCE_ANALYSIS = 'PERFORMANCE_ANALYSIS',
}

/**
 * Mapping of channel analytics types to sub-categories
 */
export const CHANNEL_ANALYTICS_TYPE_SUB_CATEGORY_MAP: Record<
  ChannelAnalyticsType,
  ChannelAnalyticsSubCategory
> = {
  [ChannelAnalyticsType.ONLINE_CHANNEL_ANALYTICS]: ChannelAnalyticsSubCategory.MEDIUM_ANALYSIS,
  [ChannelAnalyticsType.OFFLINE_CHANNEL_ANALYTICS]: ChannelAnalyticsSubCategory.MEDIUM_ANALYSIS,
  [ChannelAnalyticsType.MOBILE_CHANNEL_ANALYTICS]: ChannelAnalyticsSubCategory.MEDIUM_ANALYSIS,
  [ChannelAnalyticsType.DIGITAL_CHANNEL_ANALYTICS]: ChannelAnalyticsSubCategory.MEDIUM_ANALYSIS,
  [ChannelAnalyticsType.PHYSICAL_CHANNEL_ANALYTICS]: ChannelAnalyticsSubCategory.MEDIUM_ANALYSIS,
  [ChannelAnalyticsType.DIRECT_CHANNEL_ANALYTICS]: ChannelAnalyticsSubCategory.NATURE_ANALYSIS,
  [ChannelAnalyticsType.INDIRECT_CHANNEL_ANALYTICS]: ChannelAnalyticsSubCategory.NATURE_ANALYSIS,
  [ChannelAnalyticsType.RETAIL_CHANNEL_ANALYTICS]: ChannelAnalyticsSubCategory.TYPE_ANALYSIS,
  [ChannelAnalyticsType.WHOLESALE_CHANNEL_ANALYTICS]: ChannelAnalyticsSubCategory.TYPE_ANALYSIS,
  [ChannelAnalyticsType.DISTRIBUTION_CHANNEL_ANALYTICS]: ChannelAnalyticsSubCategory.TYPE_ANALYSIS,
  [ChannelAnalyticsType.FRANCHISE_CHANNEL_ANALYTICS]: ChannelAnalyticsSubCategory.TYPE_ANALYSIS,
  [ChannelAnalyticsType.MARKETPLACE_CHANNEL_ANALYTICS]: ChannelAnalyticsSubCategory.TYPE_ANALYSIS,
  [ChannelAnalyticsType.SOCIAL_CHANNEL_ANALYTICS]: ChannelAnalyticsSubCategory.TYPE_ANALYSIS,
  [ChannelAnalyticsType.EMAIL_CHANNEL_ANALYTICS]: ChannelAnalyticsSubCategory.TYPE_ANALYSIS,
  [ChannelAnalyticsType.SEARCH_CHANNEL_ANALYTICS]: ChannelAnalyticsSubCategory.TYPE_ANALYSIS,
  [ChannelAnalyticsType.DISPLAY_CHANNEL_ANALYTICS]: ChannelAnalyticsSubCategory.TYPE_ANALYSIS,
  [ChannelAnalyticsType.AFFILIATE_CHANNEL_ANALYTICS]:
    ChannelAnalyticsSubCategory.RELATIONSHIP_ANALYSIS,
  [ChannelAnalyticsType.REFERRAL_CHANNEL_ANALYTICS]:
    ChannelAnalyticsSubCategory.RELATIONSHIP_ANALYSIS,
  [ChannelAnalyticsType.PARTNER_CHANNEL_ANALYTICS]:
    ChannelAnalyticsSubCategory.RELATIONSHIP_ANALYSIS,
  [ChannelAnalyticsType.RESELLER_CHANNEL_ANALYTICS]:
    ChannelAnalyticsSubCategory.RELATIONSHIP_ANALYSIS,
  [ChannelAnalyticsType.AGENT_CHANNEL_ANALYTICS]: ChannelAnalyticsSubCategory.RELATIONSHIP_ANALYSIS,
  [ChannelAnalyticsType.BROKER_CHANNEL_ANALYTICS]:
    ChannelAnalyticsSubCategory.RELATIONSHIP_ANALYSIS,
  [ChannelAnalyticsType.CONSULTANT_CHANNEL_ANALYTICS]:
    ChannelAnalyticsSubCategory.RELATIONSHIP_ANALYSIS,
  [ChannelAnalyticsType.HYBRID_CHANNEL_ANALYTICS]: ChannelAnalyticsSubCategory.INTEGRATION_ANALYSIS,
  [ChannelAnalyticsType.CROSS_CHANNEL_ANALYTICS]: ChannelAnalyticsSubCategory.INTEGRATION_ANALYSIS,
};

/**
 * Get channel analytics type sub-category
 */
export function getChannelAnalyticsTypeSubCategory(
  type: ChannelAnalyticsType
): ChannelAnalyticsSubCategory {
  return CHANNEL_ANALYTICS_TYPE_SUB_CATEGORY_MAP[type];
}

/**
 * Get channel analytics types by sub-category
 */
export function getChannelAnalyticsTypesBySubCategory(
  subCategory: ChannelAnalyticsSubCategory
): ChannelAnalyticsType[] {
  return Object.entries(CHANNEL_ANALYTICS_TYPE_SUB_CATEGORY_MAP)
    .filter(([_, subCat]) => subCat === subCategory)
    .map(([type]) => type as ChannelAnalyticsType);
}
