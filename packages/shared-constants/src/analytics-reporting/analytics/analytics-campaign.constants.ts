/**
 * @fileoverview Marketing campaign constants and configurations
 * @package @vubun/shared-constants
 */

// External libraries - none needed for constants

// Shared packages - none needed for constants

// Project files - none needed for constants

/**
 * Campaign status enum
 */
export enum CampaignStatus {
  /** Campaign is active and running */
  ACTIVE = 'ACTIVE',
  /** Campaign is paused temporarily */
  PAUSED = 'PAUSED',
  /** Campaign has been completed */
  COMPLETED = 'COMPLETED',
  /** Campaign is in draft mode */
  DRAFT = 'DRAFT',
  /** Campaign is scheduled for future */
  SCHEDULED = 'SCHEDULED',
  /** Campaign is under review */
  REVIEW = 'REVIEW',
  /** Campaign has been cancelled */
  CANCELLED = 'CANCELLED',
  /** Campaign has been archived */
  ARCHIVED = 'ARCHIVED',
}

/**
 * Campaign type enum
 */
export enum CampaignType {
  /** Email marketing campaign */
  EMAIL = 'EMAIL',
  /** Social media campaign */
  SOCIAL = 'SOCIAL',
  /** Display advertising campaign */
  DISPLAY = 'DISPLAY',
  /** Search engine marketing campaign */
  SEARCH = 'SEARCH',
  /** Video marketing campaign */
  VIDEO = 'VIDEO',
  /** Content marketing campaign */
  CONTENT = 'CONTENT',
  /** Influencer marketing campaign */
  INFLUENCER = 'INFLUENCER',
  /** Affiliate marketing campaign */
  AFFILIATE = 'AFFILIATE',
  /** Referral marketing campaign */
  REFERRAL = 'REFERRAL',
  /** Event marketing campaign */
  EVENT = 'EVENT',
  /** Webinar campaign */
  WEBINAR = 'WEBINAR',
  /** SMS marketing campaign */
  SMS = 'SMS',
  /** Push notification campaign */
  PUSH = 'PUSH',
  /** In-app marketing campaign */
  IN_APP = 'IN_APP',
  /** Out-of-home advertising campaign */
  OOH = 'OOH',
  /** Print advertising campaign */
  PRINT = 'PRINT',
  /** Radio advertising campaign */
  RADIO = 'RADIO',
  /** TV advertising campaign */
  TV = 'TV',
  /** Podcast advertising campaign */
  PODCAST = 'PODCAST',
  /** Native advertising campaign */
  NATIVE = 'NATIVE',
  /** Programmatic advertising campaign */
  PROGRAMMATIC = 'PROGRAMMATIC',
  /** Account-based marketing campaign */
  ABM = 'ABM',
  /** Partner marketing campaign */
  PARTNER = 'PARTNER',
  /** Co-marketing campaign */
  CO_MARKETING = 'CO_MARKETING',
  /** Loyalty program campaign */
  LOYALTY = 'LOYALTY',
  /** Re-engagement campaign */
  RE_ENGAGEMENT = 'RE_ENGAGEMENT',
  /** Win-back campaign */
  WIN_BACK = 'WIN_BACK',
  /** Seasonal campaign */
  SEASONAL = 'SEASONAL',
  /** Holiday campaign */
  HOLIDAY = 'HOLIDAY',
  /** Flash sale campaign */
  FLASH_SALE = 'FLASH_SALE',
  /** Product launch campaign */
  PRODUCT_LAUNCH = 'PRODUCT_LAUNCH',
  /** Brand awareness campaign */
  BRAND_AWARENESS = 'BRAND_AWARENESS',
  /** Lead generation campaign */
  LEAD_GENERATION = 'LEAD_GENERATION',
  /** Customer acquisition campaign */
  CUSTOMER_ACQUISITION = 'CUSTOMER_ACQUISITION',
  /** Customer retention campaign */
  CUSTOMER_RETENTION = 'CUSTOMER_RETENTION',
  /** Upsell/Cross-sell campaign */
  UPSELL_CROSSSELL = 'UPSELL_CROSSSELL',
}

/**
 * Campaign objective enum
 */
export enum CampaignObjective {
  /** Increase brand awareness */
  AWARENESS = 'AWARENESS',
  /** Drive conversions/sales */
  CONVERSION = 'CONVERSION',
  /** Retain existing customers */
  RETENTION = 'RETENTION',
  /** Generate leads */
  LEAD_GENERATION = 'LEAD_GENERATION',
  /** Acquire new customers */
  CUSTOMER_ACQUISITION = 'CUSTOMER_ACQUISITION',
  /** Increase engagement */
  ENGAGEMENT = 'ENGAGEMENT',
  /** Build brand loyalty */
  LOYALTY = 'LOYALTY',
  /** Drive website traffic */
  TRAFFIC = 'TRAFFIC',
  /** Increase social media following */
  SOCIAL_FOLLOWING = 'SOCIAL_FOLLOWING',
  /** Generate app downloads */
  APP_DOWNLOADS = 'APP_DOWNLOADS',
  /** Increase product adoption */
  PRODUCT_ADOPTION = 'PRODUCT_ADOPTION',
  /** Improve customer satisfaction */
  CUSTOMER_SATISFACTION = 'CUSTOMER_SATISFACTION',
  /** Drive referrals */
  REFERRAL = 'REFERRAL',
  /** Increase average order value */
  AOV_INCREASE = 'AOV_INCREASE',
  /** Reduce churn */
  CHURN_REDUCTION = 'CHURN_REDUCTION',
  /** Launch new product */
  PRODUCT_LAUNCH = 'PRODUCT_LAUNCH',
  /** Brand positioning */
  BRAND_POSITIONING = 'BRAND_POSITIONING',
  /** Education and awareness */
  EDUCATION = 'EDUCATION',
  /** Community building */
  COMMUNITY_BUILDING = 'COMMUNITY_BUILDING',
  /** Advocacy and testimonials */
  ADVOCACY = 'ADVOCACY',
}

/**
 * Campaign channel enum
 */
export enum CampaignChannel {
  /** Email channel */
  EMAIL = 'EMAIL',
  /** Social media channel */
  SOCIAL = 'SOCIAL',
  /** Search engine channel */
  SEARCH = 'SEARCH',
  /** Display network channel */
  DISPLAY = 'DISPLAY',
  /** Video platform channel */
  VIDEO = 'VIDEO',
  /** Content platform channel */
  CONTENT = 'CONTENT',
  /** Mobile channel */
  MOBILE = 'MOBILE',
  /** Direct mail channel */
  DIRECT_MAIL = 'DIRECT_MAIL',
  /** Out-of-home channel */
  OOH = 'OOH',
  /** Print channel */
  PRINT = 'PRINT',
  /** Radio channel */
  RADIO = 'RADIO',
  /** TV channel */
  TV = 'TV',
  /** Podcast channel */
  PODCAST = 'PODCAST',
  /** SMS channel */
  SMS = 'SMS',
  /** Push notification channel */
  PUSH = 'PUSH',
  /** In-app channel */
  IN_APP = 'IN_APP',
  /** Webinar channel */
  WEBINAR = 'WEBINAR',
  /** Event channel */
  EVENT = 'EVENT',
  /** Affiliate channel */
  AFFILIATE = 'AFFILIATE',
  /** Referral channel */
  REFERRAL = 'REFERRAL',
  /** Influencer channel */
  INFLUENCER = 'INFLUENCER',
  /** Partner channel */
  PARTNER = 'PARTNER',
}

/**
 * Campaign configuration with labels and descriptions
 */
export interface CampaignConfig {
  label: string;
  description: string;
  icon?: string;
  color?: string;
  priority: number;
}

export const ANALYTICS_CAMPAIGN_CONFIG: Record<CampaignType, CampaignConfig> = {
  [CampaignType.EMAIL]: {
    label: 'Email Campaign',
    description: 'Email marketing campaigns for direct communication',
    icon: 'Mail',
    color: '#EA580C',
    priority: 1,
  },
  [CampaignType.SOCIAL]: {
    label: 'Social Media Campaign',
    description: 'Social media marketing campaigns across platforms',
    icon: 'Share2',
    color: '#1DA1F2',
    priority: 2,
  },
  [CampaignType.DISPLAY]: {
    label: 'Display Campaign',
    description: 'Display advertising campaigns on websites and apps',
    icon: 'Layout',
    color: '#3B82F6',
    priority: 2,
  },
  [CampaignType.SEARCH]: {
    label: 'Search Campaign',
    description: 'Search engine marketing and advertising campaigns',
    icon: 'Search',
    color: '#4285F4',
    priority: 1,
  },
  [CampaignType.VIDEO]: {
    label: 'Video Campaign',
    description: 'Video advertising and content campaigns',
    icon: 'Video',
    color: '#EC4899',
    priority: 2,
  },
  [CampaignType.CONTENT]: {
    label: 'Content Campaign',
    description: 'Content marketing campaigns and distribution',
    icon: 'FileText',
    color: '#8B5CF6',
    priority: 2,
  },
  [CampaignType.INFLUENCER]: {
    label: 'Influencer Campaign',
    description: 'Influencer marketing and partnership campaigns',
    icon: 'Star',
    color: '#F472B6',
    priority: 2,
  },
  [CampaignType.AFFILIATE]: {
    label: 'Affiliate Campaign',
    description: 'Affiliate marketing and commission-based campaigns',
    icon: 'Link2',
    color: '#10B981',
    priority: 2,
  },
  [CampaignType.REFERRAL]: {
    label: 'Referral Campaign',
    description: 'Referral marketing and word-of-mouth campaigns',
    icon: 'Users',
    color: '#A855F7',
    priority: 2,
  },
  [CampaignType.EVENT]: {
    label: 'Event Campaign',
    description: 'Event marketing and promotion campaigns',
    icon: 'Calendar',
    color: '#F59E0B',
    priority: 2,
  },
  [CampaignType.WEBINAR]: {
    label: 'Webinar Campaign',
    description: 'Webinar marketing and educational campaigns',
    icon: 'Video',
    color: '#6366F1',
    priority: 2,
  },
  [CampaignType.SMS]: {
    label: 'SMS Campaign',
    description: 'SMS marketing and messaging campaigns',
    icon: 'MessageCircle',
    color: '#10B981',
    priority: 2,
  },
  [CampaignType.PUSH]: {
    label: 'Push Notification Campaign',
    description: 'Push notification marketing campaigns',
    icon: 'Bell',
    color: '#F472B6',
    priority: 2,
  },
  [CampaignType.IN_APP]: {
    label: 'In-App Campaign',
    description: 'In-app marketing and messaging campaigns',
    icon: 'Smartphone',
    color: '#8B5CF6',
    priority: 2,
  },
  [CampaignType.OOH]: {
    label: 'Out-of-Home Campaign',
    description: 'Out-of-home advertising and billboard campaigns',
    icon: 'Layout',
    color: '#6B7280',
    priority: 3,
  },
  [CampaignType.PRINT]: {
    label: 'Print Campaign',
    description: 'Print advertising and publication campaigns',
    icon: 'FileText',
    color: '#6B7280',
    priority: 3,
  },
  [CampaignType.RADIO]: {
    label: 'Radio Campaign',
    description: 'Radio advertising and audio campaigns',
    icon: 'Radio',
    color: '#6B7280',
    priority: 3,
  },
  [CampaignType.TV]: {
    label: 'TV Campaign',
    description: 'Television advertising campaigns',
    icon: 'Tv',
    color: '#6B7280',
    priority: 3,
  },
  [CampaignType.PODCAST]: {
    label: 'Podcast Campaign',
    description: 'Podcast advertising and sponsorship campaigns',
    icon: 'Mic',
    color: '#6366F1',
    priority: 3,
  },
  [CampaignType.NATIVE]: {
    label: 'Native Campaign',
    description: 'Native advertising campaigns',
    icon: 'FileText',
    color: '#F59E0B',
    priority: 2,
  },
  [CampaignType.PROGRAMMATIC]: {
    label: 'Programmatic Campaign',
    description: 'Programmatic advertising campaigns',
    icon: 'Code',
    color: '#8B5CF6',
    priority: 2,
  },
  [CampaignType.ABM]: {
    label: 'ABM Campaign',
    description: 'Account-based marketing campaigns',
    icon: 'Building',
    color: '#6B7280',
    priority: 2,
  },
  [CampaignType.PARTNER]: {
    label: 'Partner Campaign',
    description: 'Partner marketing and co-marketing campaigns',
    icon: 'Handshake',
    color: '#10B981',
    priority: 2,
  },
  [CampaignType.CO_MARKETING]: {
    label: 'Co-Marketing Campaign',
    description: 'Co-marketing and joint promotion campaigns',
    icon: 'Users',
    color: '#F59E0B',
    priority: 2,
  },
  [CampaignType.LOYALTY]: {
    label: 'Loyalty Campaign',
    description: 'Loyalty program and retention campaigns',
    icon: 'Heart',
    color: '#EC4899',
    priority: 1,
  },
  [CampaignType.RE_ENGAGEMENT]: {
    label: 'Re-Engagement Campaign',
    description: 'Re-engagement and win-back campaigns',
    icon: 'Refresh',
    color: '#F59E0B',
    priority: 1,
  },
  [CampaignType.WIN_BACK]: {
    label: 'Win-Back Campaign',
    description: 'Win-back campaigns for lapsed customers',
    icon: 'Undo',
    color: '#EF4444',
    priority: 1,
  },
  [CampaignType.SEASONAL]: {
    label: 'Seasonal Campaign',
    description: 'Seasonal and holiday marketing campaigns',
    icon: 'Calendar',
    color: '#22C55E',
    priority: 2,
  },
  [CampaignType.HOLIDAY]: {
    label: 'Holiday Campaign',
    description: 'Holiday-themed marketing campaigns',
    icon: 'Gift',
    color: '#EF4444',
    priority: 2,
  },
  [CampaignType.FLASH_SALE]: {
    label: 'Flash Sale Campaign',
    description: 'Flash sale and limited-time offer campaigns',
    icon: 'Clock',
    color: '#F59E0B',
    priority: 1,
  },
  [CampaignType.PRODUCT_LAUNCH]: {
    label: 'Product Launch Campaign',
    description: 'New product launch and promotion campaigns',
    icon: 'Rocket',
    color: '#3B82F6',
    priority: 1,
  },
  [CampaignType.BRAND_AWARENESS]: {
    label: 'Brand Awareness Campaign',
    description: 'Brand awareness and visibility campaigns',
    icon: 'Globe',
    color: '#A855F7',
    priority: 2,
  },
  [CampaignType.LEAD_GENERATION]: {
    label: 'Lead Generation Campaign',
    description: 'Lead generation and capture campaigns',
    icon: 'Target',
    color: '#10B981',
    priority: 1,
  },
  [CampaignType.CUSTOMER_ACQUISITION]: {
    label: 'Customer Acquisition Campaign',
    description: 'New customer acquisition campaigns',
    icon: 'UserPlus',
    color: '#3B82F6',
    priority: 1,
  },
  [CampaignType.CUSTOMER_RETENTION]: {
    label: 'Customer Retention Campaign',
    description: 'Customer retention and loyalty campaigns',
    icon: 'UserCheck',
    color: '#22C55E',
    priority: 1,
  },
  [CampaignType.UPSELL_CROSSSELL]: {
    label: 'Upsell/Cross-Sell Campaign',
    description: 'Upsell and cross-sell marketing campaigns',
    icon: 'TrendingUp',
    color: '#8B5CF6',
    priority: 1,
  },
};

/**
 * Campaign objective mapping to types
 */
export const CAMPAIGN_OBJECTIVE_TO_TYPES: Record<CampaignObjective, CampaignType[]> = {
  [CampaignObjective.AWARENESS]: [
    CampaignType.BRAND_AWARENESS,
    CampaignType.SOCIAL,
    CampaignType.DISPLAY,
  ],
  [CampaignObjective.CONVERSION]: [
    CampaignType.SEARCH,
    CampaignType.EMAIL,
    CampaignType.FLASH_SALE,
  ],
  [CampaignObjective.RETENTION]: [
    CampaignType.LOYALTY,
    CampaignType.RE_ENGAGEMENT,
    CampaignType.WIN_BACK,
  ],
  [CampaignObjective.LEAD_GENERATION]: [
    CampaignType.LEAD_GENERATION,
    CampaignType.WEBINAR,
    CampaignType.CONTENT,
  ],
  [CampaignObjective.CUSTOMER_ACQUISITION]: [
    CampaignType.CUSTOMER_ACQUISITION,
    CampaignType.REFERRAL,
    CampaignType.AFFILIATE,
  ],
  [CampaignObjective.ENGAGEMENT]: [CampaignType.SOCIAL, CampaignType.IN_APP, CampaignType.PUSH],
  [CampaignObjective.LOYALTY]: [
    CampaignType.LOYALTY,
    CampaignType.EMAIL,
    CampaignType.RE_ENGAGEMENT,
  ],
  [CampaignObjective.TRAFFIC]: [CampaignType.SEARCH, CampaignType.SOCIAL, CampaignType.DISPLAY],
  [CampaignObjective.SOCIAL_FOLLOWING]: [CampaignType.SOCIAL, CampaignType.INFLUENCER],
  [CampaignObjective.APP_DOWNLOADS]: [
    CampaignType.IN_APP,
    CampaignType.SOCIAL,
    CampaignType.DISPLAY,
  ],
  [CampaignObjective.PRODUCT_ADOPTION]: [
    CampaignType.PRODUCT_LAUNCH,
    CampaignType.EMAIL,
    CampaignType.IN_APP,
  ],
  [CampaignObjective.CUSTOMER_SATISFACTION]: [
    CampaignType.EMAIL,
    CampaignType.SMS,
    CampaignType.PUSH,
  ],
  [CampaignObjective.REFERRAL]: [
    CampaignType.REFERRAL,
    CampaignType.AFFILIATE,
    CampaignType.CO_MARKETING,
  ],
  [CampaignObjective.AOV_INCREASE]: [
    CampaignType.UPSELL_CROSSSELL,
    CampaignType.EMAIL,
    CampaignType.PUSH,
  ],
  [CampaignObjective.CHURN_REDUCTION]: [
    CampaignType.WIN_BACK,
    CampaignType.RE_ENGAGEMENT,
    CampaignType.LOYALTY,
  ],
  [CampaignObjective.PRODUCT_LAUNCH]: [
    CampaignType.PRODUCT_LAUNCH,
    CampaignType.SOCIAL,
    CampaignType.EMAIL,
  ],
  [CampaignObjective.BRAND_POSITIONING]: [
    CampaignType.BRAND_AWARENESS,
    CampaignType.CONTENT,
    CampaignType.SOCIAL,
  ],
  [CampaignObjective.EDUCATION]: [CampaignType.CONTENT, CampaignType.WEBINAR, CampaignType.EMAIL],
  [CampaignObjective.COMMUNITY_BUILDING]: [
    CampaignType.SOCIAL,
    CampaignType.EVENT,
    CampaignType.CO_MARKETING,
  ],
  [CampaignObjective.ADVOCACY]: [CampaignType.REFERRAL, CampaignType.SOCIAL, CampaignType.EMAIL],
};

/**
 * Campaign budget ranges
 */
export enum CampaignBudgetRange {
  /** Very small budget (under $100) */
  VERY_SMALL = 'VERY_SMALL',
  /** Small budget ($100 - $500) */
  SMALL = 'SMALL',
  /** Medium budget ($500 - $2,000) */
  MEDIUM = 'MEDIUM',
  /** Large budget ($2,000 - $10,000) */
  LARGE = 'LARGE',
  /** Very large budget ($10,000 - $50,000) */
  VERY_LARGE = 'VERY_LARGE',
  /** Enterprise budget (over $50,000) */
  ENTERPRISE = 'ENTERPRISE',
}

/**
 * Campaign budget configuration
 */
export const CAMPAIGN_BUDGET_CONFIG: Record<
  CampaignBudgetRange,
  { label: string; min: number; max: number; color: string }
> = {
  [CampaignBudgetRange.VERY_SMALL]: {
    label: 'Very Small Budget',
    min: 0,
    max: 100,
    color: '#22C55E',
  },
  [CampaignBudgetRange.SMALL]: {
    label: 'Small Budget',
    min: 100,
    max: 500,
    color: '#3B82F6',
  },
  [CampaignBudgetRange.MEDIUM]: {
    label: 'Medium Budget',
    min: 500,
    max: 2000,
    color: '#F59E0B',
  },
  [CampaignBudgetRange.LARGE]: {
    label: 'Large Budget',
    min: 2000,
    max: 10000,
    color: '#F97316',
  },
  [CampaignBudgetRange.VERY_LARGE]: {
    label: 'Very Large Budget',
    min: 10000,
    max: 50000,
    color: '#EF4444',
  },
  [CampaignBudgetRange.ENTERPRISE]: {
    label: 'Enterprise Budget',
    min: 50000,
    max: Number.MAX_SAFE_INTEGER,
    color: '#8B5CF6',
  },
};

/**
 * Campaign performance indicators
 */
export interface CampaignMetrics {
  /** Number of impressions */
  impressions: number;
  /** Number of clicks */
  clicks: number;
  /** Click-through rate */
  ctr: number;
  /** Number of conversions */
  conversions: number;
  /** Conversion rate */
  conversionRate: number;
  /** Cost per acquisition */
  cpa: number;
  /** Cost per click */
  cpc: number;
  /** Return on investment */
  roi: number;
  /** Revenue generated */
  revenue: number;
  /** Total cost */
  cost: number;
  /** Number of leads */
  leads: number;
  /** Number of sales */
  sales: number;
  /** Average order value */
  aov: number;
  /** Customer lifetime value */
  clv: number;
}

/**
 * Default campaign metrics
 */
export const CAMPAIGN_DEFAULT_METRICS: Partial<CampaignMetrics> = {
  impressions: 0,
  clicks: 0,
  ctr: 0,
  conversions: 0,
  conversionRate: 0,
  cpa: 0,
  cpc: 0,
  roi: 0,
  revenue: 0,
  cost: 0,
  leads: 0,
  sales: 0,
  aov: 0,
  clv: 0,
};

/**
 * Get label for campaign type
 */
export function getCampaignTypeLabel(type: CampaignType): string {
  return ANALYTICS_CAMPAIGN_CONFIG[type]?.label || type;
}

/**
 * Get description for campaign type
 */
export function getCampaignTypeDescription(type: CampaignType): string {
  return ANALYTICS_CAMPAIGN_CONFIG[type]?.description || '';
}

/**
 * Get priority for campaign type
 */
export function getCampaignTypePriority(type: CampaignType): number {
  return ANALYTICS_CAMPAIGN_CONFIG[type]?.priority || 3;
}

/**
 * Get campaign types by objective
 */
export function getCampaignTypesByObjective(objective: CampaignObjective): CampaignType[] {
  return CAMPAIGN_OBJECTIVE_TO_TYPES[objective] || [];
}

/**
 * Campaign status labels
 */
export const CAMPAIGN_STATUS_LABELS: Record<CampaignStatus, string> = {
  [CampaignStatus.ACTIVE]: 'Active',
  [CampaignStatus.PAUSED]: 'Paused',
  [CampaignStatus.COMPLETED]: 'Completed',
  [CampaignStatus.DRAFT]: 'Draft',
  [CampaignStatus.SCHEDULED]: 'Scheduled',
  [CampaignStatus.REVIEW]: 'Under Review',
  [CampaignStatus.CANCELLED]: 'Cancelled',
  [CampaignStatus.ARCHIVED]: 'Archived',
};

/**
 * Campaign status colors
 */
export const CAMPAIGN_STATUS_COLORS: Record<CampaignStatus, string> = {
  [CampaignStatus.ACTIVE]: '#22C55E',
  [CampaignStatus.PAUSED]: '#F59E0B',
  [CampaignStatus.COMPLETED]: '#3B82F6',
  [CampaignStatus.DRAFT]: '#6B7280',
  [CampaignStatus.SCHEDULED]: '#8B5CF6',
  [CampaignStatus.REVIEW]: '#F97316',
  [CampaignStatus.CANCELLED]: '#EF4444',
  [CampaignStatus.ARCHIVED]: '#6B7280',
};

/**
 * Campaign objective labels
 */
export const CAMPAIGN_OBJECTIVE_LABELS: Record<CampaignObjective, string> = {
  [CampaignObjective.AWARENESS]: 'Brand Awareness',
  [CampaignObjective.CONVERSION]: 'Conversions',
  [CampaignObjective.RETENTION]: 'Customer Retention',
  [CampaignObjective.LEAD_GENERATION]: 'Lead Generation',
  [CampaignObjective.CUSTOMER_ACQUISITION]: 'Customer Acquisition',
  [CampaignObjective.ENGAGEMENT]: 'Engagement',
  [CampaignObjective.LOYALTY]: 'Loyalty',
  [CampaignObjective.TRAFFIC]: 'Website Traffic',
  [CampaignObjective.SOCIAL_FOLLOWING]: 'Social Following',
  [CampaignObjective.APP_DOWNLOADS]: 'App Downloads',
  [CampaignObjective.PRODUCT_ADOPTION]: 'Product Adoption',
  [CampaignObjective.CUSTOMER_SATISFACTION]: 'Customer Satisfaction',
  [CampaignObjective.REFERRAL]: 'Referrals',
  [CampaignObjective.AOV_INCREASE]: 'Increase AOV',
  [CampaignObjective.CHURN_REDUCTION]: 'Reduce Churn',
  [CampaignObjective.PRODUCT_LAUNCH]: 'Product Launch',
  [CampaignObjective.BRAND_POSITIONING]: 'Brand Positioning',
  [CampaignObjective.EDUCATION]: 'Education',
  [CampaignObjective.COMMUNITY_BUILDING]: 'Community Building',
  [CampaignObjective.ADVOCACY]: 'Advocacy',
};

/**
 * Campaign channel labels
 */
export const CAMPAIGN_CHANNEL_LABELS: Record<CampaignChannel, string> = {
  [CampaignChannel.EMAIL]: 'Email',
  [CampaignChannel.SOCIAL]: 'Social Media',
  [CampaignChannel.SEARCH]: 'Search Engine',
  [CampaignChannel.DISPLAY]: 'Display Network',
  [CampaignChannel.VIDEO]: 'Video Platform',
  [CampaignChannel.CONTENT]: 'Content Platform',
  [CampaignChannel.MOBILE]: 'Mobile',
  [CampaignChannel.DIRECT_MAIL]: 'Direct Mail',
  [CampaignChannel.OOH]: 'Out-of-Home',
  [CampaignChannel.PRINT]: 'Print',
  [CampaignChannel.RADIO]: 'Radio',
  [CampaignChannel.TV]: 'Television',
  [CampaignChannel.PODCAST]: 'Podcast',
  [CampaignChannel.SMS]: 'SMS',
  [CampaignChannel.PUSH]: 'Push Notification',
  [CampaignChannel.IN_APP]: 'In-App',
  [CampaignChannel.WEBINAR]: 'Webinar',
  [CampaignChannel.EVENT]: 'Event',
  [CampaignChannel.AFFILIATE]: 'Affiliate',
  [CampaignChannel.REFERRAL]: 'Referral',
  [CampaignChannel.INFLUENCER]: 'Influencer',
  [CampaignChannel.PARTNER]: 'Partner',
};

/**
 * Campaign attribution models
 */
export enum AttributionModel {
  /** First interaction gets full credit */
  FIRST_TOUCH = 'FIRST_TOUCH',
  /** Last interaction gets full credit */
  LAST_TOUCH = 'LAST_TOUCH',
  /** Equal credit to all interactions */
  LINEAR = 'LINEAR',
  /** More credit to recent interactions */
  TIME_DECAY = 'TIME_DECAY',
  /** 40% credit to first and last, 20% split among middle */
  POSITION_BASED = 'POSITION_BASED',
  /** Based on custom rules */
  CUSTOM = 'CUSTOM',
  /** Algorithm-based attribution */
  ALGORITHMIC = 'ALGORITHMIC',
}

/**
 * Attribution model labels
 */
export const ATTRIBUTION_MODEL_LABELS: Record<AttributionModel, string> = {
  [AttributionModel.FIRST_TOUCH]: 'First Touch',
  [AttributionModel.LAST_TOUCH]: 'Last Touch',
  [AttributionModel.LINEAR]: 'Linear',
  [AttributionModel.TIME_DECAY]: 'Time Decay',
  [AttributionModel.POSITION_BASED]: 'Position Based',
  [AttributionModel.CUSTOM]: 'Custom',
  [AttributionModel.ALGORITHMIC]: 'Algorithmic',
};

/**
 * Check if campaign is active
 */
export function isCampaignActive(status: CampaignStatus): boolean {
  return status === CampaignStatus.ACTIVE;
}

/**
 * Check if campaign can be edited
 */
export function canEditCampaign(status: CampaignStatus): boolean {
  return [CampaignStatus.DRAFT, CampaignStatus.PAUSED, CampaignStatus.SCHEDULED].includes(status);
}

/**
 * Get budget range by amount
 */
export function getBudgetRange(amount: number): CampaignBudgetRange {
  const ranges = Object.values(CampaignBudgetRange);
  for (const range of ranges) {
    const config = CAMPAIGN_BUDGET_CONFIG[range];
    if (amount >= config.min && amount <= config.max) {
      return range;
    }
  }
  return CampaignBudgetRange.ENTERPRISE;
}

/**
 * Get campaign metrics from data
 */
export function getCampaignMetrics(data: Partial<CampaignMetrics>): CampaignMetrics {
  return {
    impressions: data.impressions || 0,
    clicks: data.clicks || 0,
    ctr: data.ctr || 0,
    conversions: data.conversions || 0,
    conversionRate: data.conversionRate || 0,
    cpa: data.cpa || 0,
    cpc: data.cpc || 0,
    roi: data.roi || 0,
    revenue: data.revenue || 0,
    cost: data.cost || 0,
    leads: data.leads || 0,
    sales: data.sales || 0,
    aov: data.aov || 0,
    clv: data.clv || 0,
  };
}
