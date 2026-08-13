/**
 * @fileoverview Marketing analytics type definitions and constants
 * @package @vubun/shared-constants
 */

// External libraries - none needed for constants

// Shared packages - none needed for constants

// Project files - none needed for constants

/**
 * Marketing analytics types enum for different marketing-related analytics
 */
export enum MarketingAnalyticsType {
  /** Email campaign analytics */
  EMAIL_CAMPAIGN = 'EMAIL_CAMPAIGN',
  /** Social media campaign analytics */
  SOCIAL_MEDIA_CAMPAIGN = 'SOCIAL_MEDIA_CAMPAIGN',
  /** Search engine campaign analytics */
  SEARCH_ENGINE_CAMPAIGN = 'SEARCH_ENGINE_CAMPAIGN',
  /** Display ad campaign analytics */
  DISPLAY_AD_CAMPAIGN = 'DISPLAY_AD_CAMPAIGN',
  /** Video campaign analytics */
  VIDEO_CAMPAIGN = 'VIDEO_CAMPAIGN',
  /** Content marketing analytics */
  CONTENT_MARKETING = 'CONTENT_MARKETING',
  /** Influencer marketing analytics */
  INFLUENCER_MARKETING = 'INFLUENCER_MARKETING',
  /** Affiliate marketing analytics */
  AFFILIATE_MARKETING = 'AFFILIATE_MARKETING',
  /** Referral program analytics */
  REFERRAL_PROGRAM = 'REFERRAL_PROGRAM',
  /** Loyalty program analytics */
  LOYALTY_PROGRAM = 'LOYALTY_PROGRAM',
  /** Event marketing analytics */
  EVENT_MARKETING = 'EVENT_MARKETING',
  /** PR campaign analytics */
  PR_CAMPAIGN = 'PR_CAMPAIGN',
  /** Brand awareness analytics */
  BRAND_AWARENESS = 'BRAND_AWARENESS',
  /** Lead generation analytics */
  LEAD_GENERATION = 'LEAD_GENERATION',
  /** Customer retention analytics */
  CUSTOMER_RETENTION = 'CUSTOMER_RETENTION',
  /** Cross-selling analytics */
  CROSS_SELLING = 'CROSS_SELLING',
  /** Upselling analytics */
  UPSELLING = 'UPSELLING',
  /** Reengagement analytics */
  REENGAGEMENT = 'REENGAGEMENT',
  /** Product launch analytics */
  PRODUCT_LAUNCH = 'PRODUCT_LAUNCH',
  /** Seasonal campaign analytics */
  SEASONAL_CAMPAIGN = 'SEASONAL_CAMPAIGN',
  /** Mobile marketing analytics */
  MOBILE_MARKETING = 'MOBILE_MARKETING',
  /** Influencer outreach analytics */
  INFLUENCER_OUTREACH = 'INFLUENCER_OUTREACH',
  /** Viral marketing analytics */
  VIRAL_MARKETING = 'VIRAL_MARKETING',
  /** Guerrilla marketing analytics */
  GUERRILLA_MARKETING = 'GUERRILLA_MARKETING',
  /** Experiential marketing analytics */
  EXPERIENTIAL_MARKETING = 'EXPERIENTIAL_MARKETING',
  /** Cause marketing analytics */
  CAUSE_MARKETING = 'CAUSE_MARKETING',
  /** Partnership marketing analytics */
  PARTNERSHIP_MARKETING = 'PARTNERSHIP_MARKETING',
  /** Community marketing analytics */
  COMMUNITY_MARKETING = 'COMMUNITY_MARKETING',
  /** Word of mouth marketing */
  WORD_OF_MOUTH = 'WORD_OF_MOUTH',
  /** Brand advocacy analytics */
  BRAND_ADVOCACY = 'BRAND_ADVOCACY',
}

/**
 * Marketing analytics category for grouping
 */
export enum MarketingAnalyticsCategory {
  /** Campaign analytics */
  CAMPAIGN = 'CAMPAIGN',
  /** Channel analytics */
  CHANNEL = 'CHANNEL',
  /** Customer analytics */
  CUSTOMER = 'CUSTOMER',
  /** Brand analytics */
  BRAND = 'BRAND',
  /** Strategy analytics */
  STRATEGY = 'STRATEGY',
  /** Performance analytics */
  PERFORMANCE = 'PERFORMANCE',
}

/**
 * Marketing analytics category mapping
 */
export const MARKETING_ANALYTICS_TYPE_CATEGORY_MAP: Record<
  MarketingAnalyticsType,
  MarketingAnalyticsCategory
> = {
  [MarketingAnalyticsType.EMAIL_CAMPAIGN]: MarketingAnalyticsCategory.CAMPAIGN,
  [MarketingAnalyticsType.SOCIAL_MEDIA_CAMPAIGN]: MarketingAnalyticsCategory.CAMPAIGN,
  [MarketingAnalyticsType.SEARCH_ENGINE_CAMPAIGN]: MarketingAnalyticsCategory.CAMPAIGN,
  [MarketingAnalyticsType.DISPLAY_AD_CAMPAIGN]: MarketingAnalyticsCategory.CAMPAIGN,
  [MarketingAnalyticsType.VIDEO_CAMPAIGN]: MarketingAnalyticsCategory.CAMPAIGN,
  [MarketingAnalyticsType.CONTENT_MARKETING]: MarketingAnalyticsCategory.CHANNEL,
  [MarketingAnalyticsType.INFLUENCER_MARKETING]: MarketingAnalyticsCategory.CHANNEL,
  [MarketingAnalyticsType.AFFILIATE_MARKETING]: MarketingAnalyticsCategory.CHANNEL,
  [MarketingAnalyticsType.REFERRAL_PROGRAM]: MarketingAnalyticsCategory.CUSTOMER,
  [MarketingAnalyticsType.LOYALTY_PROGRAM]: MarketingAnalyticsCategory.CUSTOMER,
  [MarketingAnalyticsType.EVENT_MARKETING]: MarketingAnalyticsCategory.STRATEGY,
  [MarketingAnalyticsType.PR_CAMPAIGN]: MarketingAnalyticsCategory.BRAND,
  [MarketingAnalyticsType.BRAND_AWARENESS]: MarketingAnalyticsCategory.BRAND,
  [MarketingAnalyticsType.LEAD_GENERATION]: MarketingAnalyticsCategory.CUSTOMER,
  [MarketingAnalyticsType.CUSTOMER_RETENTION]: MarketingAnalyticsCategory.CUSTOMER,
  [MarketingAnalyticsType.CROSS_SELLING]: MarketingAnalyticsCategory.CUSTOMER,
  [MarketingAnalyticsType.UPSELLING]: MarketingAnalyticsCategory.CUSTOMER,
  [MarketingAnalyticsType.REENGAGEMENT]: MarketingAnalyticsCategory.CUSTOMER,
  [MarketingAnalyticsType.PRODUCT_LAUNCH]: MarketingAnalyticsCategory.STRATEGY,
  [MarketingAnalyticsType.SEASONAL_CAMPAIGN]: MarketingAnalyticsCategory.CAMPAIGN,
  [MarketingAnalyticsType.MOBILE_MARKETING]: MarketingAnalyticsCategory.CHANNEL,
  [MarketingAnalyticsType.INFLUENCER_OUTREACH]: MarketingAnalyticsCategory.CHANNEL,
  [MarketingAnalyticsType.VIRAL_MARKETING]: MarketingAnalyticsCategory.STRATEGY,
  [MarketingAnalyticsType.GUERRILLA_MARKETING]: MarketingAnalyticsCategory.STRATEGY,
  [MarketingAnalyticsType.EXPERIENTIAL_MARKETING]: MarketingAnalyticsCategory.STRATEGY,
  [MarketingAnalyticsType.CAUSE_MARKETING]: MarketingAnalyticsCategory.BRAND,
  [MarketingAnalyticsType.PARTNERSHIP_MARKETING]: MarketingAnalyticsCategory.CHANNEL,
  [MarketingAnalyticsType.COMMUNITY_MARKETING]: MarketingAnalyticsCategory.CUSTOMER,
  [MarketingAnalyticsType.WORD_OF_MOUTH]: MarketingAnalyticsCategory.BRAND,
  [MarketingAnalyticsType.BRAND_ADVOCACY]: MarketingAnalyticsCategory.BRAND,
};

/**
 * Marketing analytics type configuration
 */
export interface MarketingAnalyticsTypeConfig {
  label: string;
  description: string;
  icon?: string;
  color?: string;
  priority: number;
  isRealtime: boolean;
  requiresCampaignId: boolean;
}

export const MARKETING_ANALYTICS_TYPE_CONFIG: Record<
  MarketingAnalyticsType,
  MarketingAnalyticsTypeConfig
> = {
  [MarketingAnalyticsType.EMAIL_CAMPAIGN]: {
    label: 'Email Campaign',
    description: 'Analytics for email marketing campaigns',
    icon: 'Mail',
    color: '#EA580C',
    priority: 1,
    isRealtime: true,
    requiresCampaignId: true,
  },
  [MarketingAnalyticsType.SOCIAL_MEDIA_CAMPAIGN]: {
    label: 'Social Media Campaign',
    description: 'Analytics for social media campaigns',
    icon: 'Share2',
    color: '#1DA1F2',
    priority: 1,
    isRealtime: true,
    requiresCampaignId: true,
  },
  [MarketingAnalyticsType.SEARCH_ENGINE_CAMPAIGN]: {
    label: 'Search Engine Campaign',
    description: 'Analytics for search engine marketing campaigns',
    icon: 'Search',
    color: '#4285F4',
    priority: 1,
    isRealtime: true,
    requiresCampaignId: true,
  },
  [MarketingAnalyticsType.DISPLAY_AD_CAMPAIGN]: {
    label: 'Display Ad Campaign',
    description: 'Analytics for display advertising campaigns',
    icon: 'Layout',
    color: '#3B82F6',
    priority: 2,
    isRealtime: true,
    requiresCampaignId: true,
  },
  [MarketingAnalyticsType.VIDEO_CAMPAIGN]: {
    label: 'Video Campaign',
    description: 'Analytics for video marketing campaigns',
    icon: 'Video',
    color: '#EC4899',
    priority: 2,
    isRealtime: true,
    requiresCampaignId: true,
  },
  [MarketingAnalyticsType.CONTENT_MARKETING]: {
    label: 'Content Marketing',
    description: 'Analytics for content marketing efforts',
    icon: 'FileText',
    color: '#8B5CF6',
    priority: 2,
    isRealtime: false,
    requiresCampaignId: false,
  },
  [MarketingAnalyticsType.INFLUENCER_MARKETING]: {
    label: 'Influencer Marketing',
    description: 'Analytics for influencer marketing campaigns',
    icon: 'Star',
    color: '#F472B6',
    priority: 2,
    isRealtime: true,
    requiresCampaignId: true,
  },
  [MarketingAnalyticsType.AFFILIATE_MARKETING]: {
    label: 'Affiliate Marketing',
    description: 'Analytics for affiliate marketing programs',
    icon: 'Link2',
    color: '#10B981',
    priority: 2,
    isRealtime: false,
    requiresCampaignId: true,
  },
  [MarketingAnalyticsType.REFERRAL_PROGRAM]: {
    label: 'Referral Program',
    description: 'Analytics for referral marketing programs',
    icon: 'Users',
    color: '#A855F7',
    priority: 2,
    isRealtime: false,
    requiresCampaignId: true,
  },
  [MarketingAnalyticsType.LOYALTY_PROGRAM]: {
    label: 'Loyalty Program',
    description: 'Analytics for customer loyalty programs',
    icon: 'Heart',
    color: '#EC4899',
    priority: 2,
    isRealtime: false,
    requiresCampaignId: true,
  },
  [MarketingAnalyticsType.EVENT_MARKETING]: {
    label: 'Event Marketing',
    description: 'Analytics for event marketing efforts',
    icon: 'Calendar',
    color: '#F59E0B',
    priority: 2,
    isRealtime: false,
    requiresCampaignId: true,
  },
  [MarketingAnalyticsType.PR_CAMPAIGN]: {
    label: 'PR Campaign',
    description: 'Analytics for public relations campaigns',
    icon: 'Megaphone',
    color: '#6B7280',
    priority: 2,
    isRealtime: false,
    requiresCampaignId: true,
  },
  [MarketingAnalyticsType.BRAND_AWARENESS]: {
    label: 'Brand Awareness',
    description: 'Analytics for brand awareness metrics',
    icon: 'Eye',
    color: '#3B82F6',
    priority: 1,
    isRealtime: false,
    requiresCampaignId: false,
  },
  [MarketingAnalyticsType.LEAD_GENERATION]: {
    label: 'Lead Generation',
    description: 'Analytics for lead generation campaigns',
    icon: 'UserPlus',
    color: '#22C55E',
    priority: 1,
    isRealtime: true,
    requiresCampaignId: true,
  },
  [MarketingAnalyticsType.CUSTOMER_RETENTION]: {
    label: 'Customer Retention',
    description: 'Analytics for customer retention efforts',
    icon: 'UserCheck',
    color: '#10B981',
    priority: 1,
    isRealtime: false,
    requiresCampaignId: false,
  },
  [MarketingAnalyticsType.CROSS_SELLING]: {
    label: 'Cross-Selling',
    description: 'Analytics for cross-selling campaigns',
    icon: 'ArrowRight',
    color: '#8B5CF6',
    priority: 2,
    isRealtime: false,
    requiresCampaignId: true,
  },
  [MarketingAnalyticsType.UPSELLING]: {
    label: 'Upselling',
    description: 'Analytics for upselling campaigns',
    icon: 'TrendingUp',
    color: '#F59E0B',
    priority: 2,
    isRealtime: false,
    requiresCampaignId: true,
  },
  [MarketingAnalyticsType.REENGAGEMENT]: {
    label: 'Reengagement',
    description: 'Analytics for reengagement campaigns',
    icon: 'Refresh',
    color: '#F59E0B',
    priority: 2,
    isRealtime: false,
    requiresCampaignId: true,
  },
  [MarketingAnalyticsType.PRODUCT_LAUNCH]: {
    label: 'Product Launch',
    description: 'Analytics for product launch campaigns',
    icon: 'Rocket',
    color: '#3B82F6',
    priority: 1,
    isRealtime: false,
    requiresCampaignId: true,
  },
  [MarketingAnalyticsType.SEASONAL_CAMPAIGN]: {
    label: 'Seasonal Campaign',
    description: 'Analytics for seasonal marketing campaigns',
    icon: 'Calendar',
    color: '#F59E0B',
    priority: 2,
    isRealtime: false,
    requiresCampaignId: true,
  },
  [MarketingAnalyticsType.MOBILE_MARKETING]: {
    label: 'Mobile Marketing',
    description: 'Analytics for mobile marketing campaigns',
    icon: 'Smartphone',
    color: '#10B981',
    priority: 2,
    isRealtime: true,
    requiresCampaignId: true,
  },
  [MarketingAnalyticsType.INFLUENCER_OUTREACH]: {
    label: 'Influencer Outreach',
    description: 'Analytics for influencer outreach programs',
    icon: 'Users',
    color: '#F472B6',
    priority: 2,
    isRealtime: false,
    requiresCampaignId: true,
  },
  [MarketingAnalyticsType.VIRAL_MARKETING]: {
    label: 'Viral Marketing',
    description: 'Analytics for viral marketing campaigns',
    icon: 'Share2',
    color: '#EC4899',
    priority: 2,
    isRealtime: true,
    requiresCampaignId: true,
  },
  [MarketingAnalyticsType.GUERRILLA_MARKETING]: {
    label: 'Guerrilla Marketing',
    description: 'Analytics for guerrilla marketing efforts',
    icon: 'Activity',
    color: '#EF4444',
    priority: 2,
    isRealtime: false,
    requiresCampaignId: true,
  },
  [MarketingAnalyticsType.EXPERIENTIAL_MARKETING]: {
    label: 'Experiential Marketing',
    description: 'Analytics for experiential marketing campaigns',
    icon: 'Sparkles',
    color: '#F472B6',
    priority: 2,
    isRealtime: false,
    requiresCampaignId: true,
  },
  [MarketingAnalyticsType.CAUSE_MARKETING]: {
    label: 'Cause Marketing',
    description: 'Analytics for cause marketing campaigns',
    icon: 'Heart',
    color: '#EC4899',
    priority: 2,
    isRealtime: false,
    requiresCampaignId: true,
  },
  [MarketingAnalyticsType.PARTNERSHIP_MARKETING]: {
    label: 'Partnership Marketing',
    description: 'Analytics for partnership marketing programs',
    icon: 'Handshake',
    color: '#10B981',
    priority: 2,
    isRealtime: false,
    requiresCampaignId: true,
  },
  [MarketingAnalyticsType.COMMUNITY_MARKETING]: {
    label: 'Community Marketing',
    description: 'Analytics for community marketing efforts',
    icon: 'Users',
    color: '#8B5CF6',
    priority: 2,
    isRealtime: false,
    requiresCampaignId: false,
  },
  [MarketingAnalyticsType.WORD_OF_MOUTH]: {
    label: 'Word of Mouth',
    description: 'Analytics for word-of-mouth marketing',
    icon: 'MessageSquare',
    color: '#F59E0B',
    priority: 2,
    isRealtime: false,
    requiresCampaignId: false,
  },
  [MarketingAnalyticsType.BRAND_ADVOCACY]: {
    label: 'Brand Advocacy',
    description: 'Analytics for brand advocacy programs',
    icon: 'Shield',
    color: '#22C55E',
    priority: 2,
    isRealtime: false,
    requiresCampaignId: false,
  },
};

/**
 * Get marketing analytics type label
 */
export function getMarketingAnalyticsTypeLabel(type: MarketingAnalyticsType): string {
  return MARKETING_ANALYTICS_TYPE_CONFIG[type]?.label || type;
}

/**
 * Get marketing analytics type description
 */
export function getMarketingAnalyticsTypeDescription(type: MarketingAnalyticsType): string {
  return MARKETING_ANALYTICS_TYPE_CONFIG[type]?.description || '';
}

/**
 * Get marketing analytics type category
 */
export function getMarketingAnalyticsTypeCategory(
  type: MarketingAnalyticsType
): MarketingAnalyticsCategory {
  return MARKETING_ANALYTICS_TYPE_CATEGORY_MAP[type];
}

/**
 * Get marketing analytics types by category
 */
export function getMarketingAnalyticsTypesByCategory(
  category: MarketingAnalyticsCategory
): MarketingAnalyticsType[] {
  return Object.entries(MARKETING_ANALYTICS_TYPE_CATEGORY_MAP)
    .filter(([_, cat]) => cat === category)
    .map(([type]) => type as MarketingAnalyticsType);
}

/**
 * Check if marketing analytics type requires campaign ID
 */
export function marketingAnalyticsTypeRequiresCampaignId(type: MarketingAnalyticsType): boolean {
  return MARKETING_ANALYTICS_TYPE_CONFIG[type]?.requiresCampaignId || false;
}

/**
 * Check if marketing analytics type is real-time
 */
export function isMarketingAnalyticsTypeRealtime(type: MarketingAnalyticsType): boolean {
  return MARKETING_ANALYTICS_TYPE_CONFIG[type]?.isRealtime || false;
}

/**
 * Get marketing analytics type priority
 */
export function getMarketingAnalyticsTypePriority(type: MarketingAnalyticsType): number {
  return MARKETING_ANALYTICS_TYPE_CONFIG[type]?.priority || 3;
}

/**
 * Marketing analytics type status
 */
export enum MarketingAnalyticsTypeStatus {
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
 * Default status for marketing analytics types
 */
export const MARKETING_ANALYTICS_TYPE_DEFAULT_STATUS: Record<
  MarketingAnalyticsType,
  MarketingAnalyticsTypeStatus
> = {
  [MarketingAnalyticsType.EMAIL_CAMPAIGN]: MarketingAnalyticsTypeStatus.ACTIVE,
  [MarketingAnalyticsType.SOCIAL_MEDIA_CAMPAIGN]: MarketingAnalyticsTypeStatus.ACTIVE,
  [MarketingAnalyticsType.SEARCH_ENGINE_CAMPAIGN]: MarketingAnalyticsTypeStatus.ACTIVE,
  [MarketingAnalyticsType.DISPLAY_AD_CAMPAIGN]: MarketingAnalyticsTypeStatus.ACTIVE,
  [MarketingAnalyticsType.VIDEO_CAMPAIGN]: MarketingAnalyticsTypeStatus.ACTIVE,
  [MarketingAnalyticsType.CONTENT_MARKETING]: MarketingAnalyticsTypeStatus.ACTIVE,
  [MarketingAnalyticsType.INFLUENCER_MARKETING]: MarketingAnalyticsTypeStatus.ACTIVE,
  [MarketingAnalyticsType.AFFILIATE_MARKETING]: MarketingAnalyticsTypeStatus.ACTIVE,
  [MarketingAnalyticsType.REFERRAL_PROGRAM]: MarketingAnalyticsTypeStatus.ACTIVE,
  [MarketingAnalyticsType.LOYALTY_PROGRAM]: MarketingAnalyticsTypeStatus.ACTIVE,
  [MarketingAnalyticsType.EVENT_MARKETING]: MarketingAnalyticsTypeStatus.ACTIVE,
  [MarketingAnalyticsType.PR_CAMPAIGN]: MarketingAnalyticsTypeStatus.ACTIVE,
  [MarketingAnalyticsType.BRAND_AWARENESS]: MarketingAnalyticsTypeStatus.ACTIVE,
  [MarketingAnalyticsType.LEAD_GENERATION]: MarketingAnalyticsTypeStatus.ACTIVE,
  [MarketingAnalyticsType.CUSTOMER_RETENTION]: MarketingAnalyticsTypeStatus.ACTIVE,
  [MarketingAnalyticsType.CROSS_SELLING]: MarketingAnalyticsTypeStatus.ACTIVE,
  [MarketingAnalyticsType.UPSELLING]: MarketingAnalyticsTypeStatus.ACTIVE,
  [MarketingAnalyticsType.REENGAGEMENT]: MarketingAnalyticsTypeStatus.ACTIVE,
  [MarketingAnalyticsType.PRODUCT_LAUNCH]: MarketingAnalyticsTypeStatus.ACTIVE,
  [MarketingAnalyticsType.SEASONAL_CAMPAIGN]: MarketingAnalyticsTypeStatus.ACTIVE,
  [MarketingAnalyticsType.MOBILE_MARKETING]: MarketingAnalyticsTypeStatus.ACTIVE,
  [MarketingAnalyticsType.INFLUENCER_OUTREACH]: MarketingAnalyticsTypeStatus.ACTIVE,
  [MarketingAnalyticsType.VIRAL_MARKETING]: MarketingAnalyticsTypeStatus.ACTIVE,
  [MarketingAnalyticsType.GUERRILLA_MARKETING]: MarketingAnalyticsTypeStatus.ACTIVE,
  [MarketingAnalyticsType.EXPERIENTIAL_MARKETING]: MarketingAnalyticsTypeStatus.ACTIVE,
  [MarketingAnalyticsType.CAUSE_MARKETING]: MarketingAnalyticsTypeStatus.ACTIVE,
  [MarketingAnalyticsType.PARTNERSHIP_MARKETING]: MarketingAnalyticsTypeStatus.ACTIVE,
  [MarketingAnalyticsType.COMMUNITY_MARKETING]: MarketingAnalyticsTypeStatus.ACTIVE,
  [MarketingAnalyticsType.WORD_OF_MOUTH]: MarketingAnalyticsTypeStatus.ACTIVE,
  [MarketingAnalyticsType.BRAND_ADVOCACY]: MarketingAnalyticsTypeStatus.ACTIVE,
};

/**
 * Get marketing analytics type status
 */
export function getMarketingAnalyticsTypeStatus(
  type: MarketingAnalyticsType
): MarketingAnalyticsTypeStatus {
  return MARKETING_ANALYTICS_TYPE_DEFAULT_STATUS[type] || MarketingAnalyticsTypeStatus.INACTIVE;
}

/**
 * Set marketing analytics type status
 */
export function setMarketingAnalyticsTypeStatus(
  type: MarketingAnalyticsType,
  status: MarketingAnalyticsTypeStatus
): void {
  MARKETING_ANALYTICS_TYPE_DEFAULT_STATUS[type] = status;
}

/**
 * Marketing analytics priority levels
 */
export const MARKETING_ANALYTICS_PRIORITY_LEVELS = {
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
 * Get marketing analytics types by priority
 */
export function getMarketingAnalyticsTypesByPriority(priority: number): MarketingAnalyticsType[] {
  return Object.entries(MARKETING_ANALYTICS_TYPE_CONFIG)
    .filter(([_, config]) => config.priority === priority)
    .map(([type]) => type as MarketingAnalyticsType);
}

/**
 * Get critical marketing analytics types
 */
export function getCriticalMarketingAnalyticsTypes(): MarketingAnalyticsType[] {
  return getMarketingAnalyticsTypesByPriority(MARKETING_ANALYTICS_PRIORITY_LEVELS.CRITICAL);
}

/**
 * Marketing analytics sub-categories
 */
export enum MarketingAnalyticsSubCategory {
  /** Campaign management */
  CAMPAIGN = 'CAMPAIGN',
  /** Channel management */
  CHANNEL = 'CHANNEL',
  /** Customer engagement */
  ENGAGEMENT = 'ENGAGEMENT',
  /** Brand management */
  BRAND = 'BRAND',
  /** Strategy management */
  STRATEGY = 'STRATEGY',
  /** Performance tracking */
  PERFORMANCE = 'PERFORMANCE',
}

/**
 * Mapping of marketing analytics types to sub-categories
 */
export const MARKETING_ANALYTICS_TYPE_SUB_CATEGORY_MAP: Record<
  MarketingAnalyticsType,
  MarketingAnalyticsSubCategory
> = {
  [MarketingAnalyticsType.EMAIL_CAMPAIGN]: MarketingAnalyticsSubCategory.CAMPAIGN,
  [MarketingAnalyticsType.SOCIAL_MEDIA_CAMPAIGN]: MarketingAnalyticsSubCategory.CAMPAIGN,
  [MarketingAnalyticsType.SEARCH_ENGINE_CAMPAIGN]: MarketingAnalyticsSubCategory.CAMPAIGN,
  [MarketingAnalyticsType.DISPLAY_AD_CAMPAIGN]: MarketingAnalyticsSubCategory.CAMPAIGN,
  [MarketingAnalyticsType.VIDEO_CAMPAIGN]: MarketingAnalyticsSubCategory.CAMPAIGN,
  [MarketingAnalyticsType.SEASONAL_CAMPAIGN]: MarketingAnalyticsSubCategory.CAMPAIGN,
  [MarketingAnalyticsType.PR_CAMPAIGN]: MarketingAnalyticsSubCategory.CAMPAIGN,
  [MarketingAnalyticsType.CONTENT_MARKETING]: MarketingAnalyticsSubCategory.CHANNEL,
  [MarketingAnalyticsType.INFLUENCER_MARKETING]: MarketingAnalyticsSubCategory.CHANNEL,
  [MarketingAnalyticsType.AFFILIATE_MARKETING]: MarketingAnalyticsSubCategory.CHANNEL,
  [MarketingAnalyticsType.MOBILE_MARKETING]: MarketingAnalyticsSubCategory.CHANNEL,
  [MarketingAnalyticsType.PARTNERSHIP_MARKETING]: MarketingAnalyticsSubCategory.CHANNEL,
  [MarketingAnalyticsType.LEAD_GENERATION]: MarketingAnalyticsSubCategory.PERFORMANCE,
  [MarketingAnalyticsType.CUSTOMER_RETENTION]: MarketingAnalyticsSubCategory.ENGAGEMENT,
  [MarketingAnalyticsType.CROSS_SELLING]: MarketingAnalyticsSubCategory.ENGAGEMENT,
  [MarketingAnalyticsType.UPSELLING]: MarketingAnalyticsSubCategory.ENGAGEMENT,
  [MarketingAnalyticsType.REENGAGEMENT]: MarketingAnalyticsSubCategory.ENGAGEMENT,
  [MarketingAnalyticsType.REFERRAL_PROGRAM]: MarketingAnalyticsSubCategory.ENGAGEMENT,
  [MarketingAnalyticsType.LOYALTY_PROGRAM]: MarketingAnalyticsSubCategory.ENGAGEMENT,
  [MarketingAnalyticsType.BRAND_AWARENESS]: MarketingAnalyticsSubCategory.BRAND,
  [MarketingAnalyticsType.BRAND_ADVOCACY]: MarketingAnalyticsSubCategory.BRAND,
  [MarketingAnalyticsType.CAUSE_MARKETING]: MarketingAnalyticsSubCategory.BRAND,
  [MarketingAnalyticsType.WORD_OF_MOUTH]: MarketingAnalyticsSubCategory.BRAND,
  [MarketingAnalyticsType.PRODUCT_LAUNCH]: MarketingAnalyticsSubCategory.STRATEGY,
  [MarketingAnalyticsType.EVENT_MARKETING]: MarketingAnalyticsSubCategory.STRATEGY,
  [MarketingAnalyticsType.VIRAL_MARKETING]: MarketingAnalyticsSubCategory.STRATEGY,
  [MarketingAnalyticsType.GUERRILLA_MARKETING]: MarketingAnalyticsSubCategory.STRATEGY,
  [MarketingAnalyticsType.EXPERIENTIAL_MARKETING]: MarketingAnalyticsSubCategory.STRATEGY,
  [MarketingAnalyticsType.COMMUNITY_MARKETING]: MarketingAnalyticsSubCategory.ENGAGEMENT,
  [MarketingAnalyticsType.INFLUENCER_OUTREACH]: MarketingAnalyticsSubCategory.CHANNEL,
};

/**
 * Get marketing analytics type sub-category
 */
export function getMarketingAnalyticsTypeSubCategory(
  type: MarketingAnalyticsType
): MarketingAnalyticsSubCategory {
  return MARKETING_ANALYTICS_TYPE_SUB_CATEGORY_MAP[type];
}

/**
 * Get marketing analytics types by sub-category
 */
export function getMarketingAnalyticsTypesBySubCategory(
  subCategory: MarketingAnalyticsSubCategory
): MarketingAnalyticsType[] {
  return Object.entries(MARKETING_ANALYTICS_TYPE_SUB_CATEGORY_MAP)
    .filter(([_, subCat]) => subCat === subCategory)
    .map(([type]) => type as MarketingAnalyticsType);
}
