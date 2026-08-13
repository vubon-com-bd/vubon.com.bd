/**
 * @fileoverview Marketing analytics system core constants
 * @package @vubun/shared-constants
 */

// External libraries - none needed for constants

// Shared packages - none needed for constants

// Project files - none needed for constants

/**
 * Marketing channel priority
 */
export enum MarketingChannelPriority {
  /** Critical channel */
  CRITICAL = 'CRITICAL',
  /** High priority channel */
  HIGH = 'HIGH',
  /** Medium priority channel */
  MEDIUM = 'MEDIUM',
  /** Low priority channel */
  LOW = 'LOW',
  /** Experimental channel */
  EXPERIMENTAL = 'EXPERIMENTAL',
}

/**
 * Marketing channels
 */
export enum MarketingChannel {
  /** Email marketing */
  EMAIL = 'EMAIL',
  /** Social media */
  SOCIAL = 'SOCIAL',
  /** Search engine marketing */
  SEM = 'SEM',
  /** Search engine optimization */
  SEO = 'SEO',
  /** Content marketing */
  CONTENT = 'CONTENT',
  /** Influencer marketing */
  INFLUENCER = 'INFLUENCER',
  /** Display advertising */
  DISPLAY = 'DISPLAY',
  /** Video advertising */
  VIDEO = 'VIDEO',
  /** Native advertising */
  NATIVE = 'NATIVE',
  /** Affiliate marketing */
  AFFILIATE = 'AFFILIATE',
  /** Referral marketing */
  REFERRAL = 'REFERRAL',
  /** Event marketing */
  EVENT = 'EVENT',
  /** Webinar marketing */
  WEBINAR = 'WEBINAR',
  /** Podcast marketing */
  PODCAST = 'PODCAST',
  /** Print advertising */
  PRINT = 'PRINT',
  /** Out-of-home advertising */
  OOH = 'OOH',
  /** TV advertising */
  TV = 'TV',
  /** Radio advertising */
  RADIO = 'RADIO',
  /** SMS marketing */
  SMS = 'SMS',
  /** Push notifications */
  PUSH = 'PUSH',
  /** In-app marketing */
  IN_APP = 'IN_APP',
  /** Programmatic advertising */
  PROGRAMMATIC = 'PROGRAMMATIC',
  /** Account-based marketing */
  ABM = 'ABM',
  /** Partner marketing */
  PARTNER = 'PARTNER',
}

/**
 * Marketing channel configuration
 */
export const MARKETING_CHANNEL_CONFIG: Record<
  MarketingChannel,
  {
    label: string;
    description: string;
    priority: MarketingChannelPriority;
    icon?: string;
    color?: string;
    typicalROI: number;
  }
> = {
  [MarketingChannel.EMAIL]: {
    label: 'Email Marketing',
    description: 'Email campaigns and newsletters',
    priority: MarketingChannelPriority.HIGH,
    icon: 'Mail',
    color: '#EA580C',
    typicalROI: 36,
  },
  [MarketingChannel.SOCIAL]: {
    label: 'Social Media',
    description: 'Social media marketing and engagement',
    priority: MarketingChannelPriority.HIGH,
    icon: 'Share2',
    color: '#1DA1F2',
    typicalROI: 12,
  },
  [MarketingChannel.SEM]: {
    label: 'Search Engine Marketing',
    description: 'Paid search advertising',
    priority: MarketingChannelPriority.CRITICAL,
    icon: 'Search',
    color: '#4285F4',
    typicalROI: 25,
  },
  [MarketingChannel.SEO]: {
    label: 'SEO',
    description: 'Search engine optimization',
    priority: MarketingChannelPriority.CRITICAL,
    icon: 'TrendingUp',
    color: '#22C55E',
    typicalROI: 20,
  },
  [MarketingChannel.CONTENT]: {
    label: 'Content Marketing',
    description: 'Content creation and distribution',
    priority: MarketingChannelPriority.HIGH,
    icon: 'FileText',
    color: '#8B5CF6',
    typicalROI: 15,
  },
  [MarketingChannel.INFLUENCER]: {
    label: 'Influencer Marketing',
    description: 'Influencer partnerships',
    priority: MarketingChannelPriority.MEDIUM,
    icon: 'Star',
    color: '#F472B6',
    typicalROI: 11,
  },
  [MarketingChannel.DISPLAY]: {
    label: 'Display Advertising',
    description: 'Banner and display ads',
    priority: MarketingChannelPriority.MEDIUM,
    icon: 'Layout',
    color: '#3B82F6',
    typicalROI: 8,
  },
  [MarketingChannel.VIDEO]: {
    label: 'Video Advertising',
    description: 'Video marketing and ads',
    priority: MarketingChannelPriority.MEDIUM,
    icon: 'Video',
    color: '#EC4899',
    typicalROI: 10,
  },
  [MarketingChannel.NATIVE]: {
    label: 'Native Advertising',
    description: 'Native and sponsored content',
    priority: MarketingChannelPriority.MEDIUM,
    icon: 'FileText',
    color: '#F59E0B',
    typicalROI: 9,
  },
  [MarketingChannel.AFFILIATE]: {
    label: 'Affiliate Marketing',
    description: 'Affiliate and partnership programs',
    priority: MarketingChannelPriority.MEDIUM,
    icon: 'Link2',
    color: '#10B981',
    typicalROI: 14,
  },
  [MarketingChannel.REFERRAL]: {
    label: 'Referral Marketing',
    description: 'Referral and word-of-mouth programs',
    priority: MarketingChannelPriority.HIGH,
    icon: 'Users',
    color: '#A855F7',
    typicalROI: 16,
  },
  [MarketingChannel.EVENT]: {
    label: 'Event Marketing',
    description: 'Events and conferences',
    priority: MarketingChannelPriority.LOW,
    icon: 'Calendar',
    color: '#F59E0B',
    typicalROI: 6,
  },
  [MarketingChannel.WEBINAR]: {
    label: 'Webinar Marketing',
    description: 'Webinars and online events',
    priority: MarketingChannelPriority.MEDIUM,
    icon: 'Video',
    color: '#6366F1',
    typicalROI: 13,
  },
  [MarketingChannel.PODCAST]: {
    label: 'Podcast Marketing',
    description: 'Podcast advertising and sponsorships',
    priority: MarketingChannelPriority.LOW,
    icon: 'Mic',
    color: '#6B7280',
    typicalROI: 7,
  },
  [MarketingChannel.PRINT]: {
    label: 'Print Advertising',
    description: 'Print ads and publications',
    priority: MarketingChannelPriority.LOW,
    icon: 'FileText',
    color: '#6B7280',
    typicalROI: 4,
  },
  [MarketingChannel.OOH]: {
    label: 'Out-of-Home Advertising',
    description: 'Billboards and outdoor ads',
    priority: MarketingChannelPriority.LOW,
    icon: 'Layout',
    color: '#6B7280',
    typicalROI: 3,
  },
  [MarketingChannel.TV]: {
    label: 'TV Advertising',
    description: 'Television commercials',
    priority: MarketingChannelPriority.LOW,
    icon: 'Tv',
    color: '#6B7280',
    typicalROI: 5,
  },
  [MarketingChannel.RADIO]: {
    label: 'Radio Advertising',
    description: 'Radio commercials',
    priority: MarketingChannelPriority.LOW,
    icon: 'Radio',
    color: '#6B7280',
    typicalROI: 4,
  },
  [MarketingChannel.SMS]: {
    label: 'SMS Marketing',
    description: 'SMS and text message marketing',
    priority: MarketingChannelPriority.MEDIUM,
    icon: 'MessageCircle',
    color: '#10B981',
    typicalROI: 18,
  },
  [MarketingChannel.PUSH]: {
    label: 'Push Notifications',
    description: 'Push notification marketing',
    priority: MarketingChannelPriority.MEDIUM,
    icon: 'Bell',
    color: '#F472B6',
    typicalROI: 12,
  },
  [MarketingChannel.IN_APP]: {
    label: 'In-App Marketing',
    description: 'In-app messaging and promotions',
    priority: MarketingChannelPriority.HIGH,
    icon: 'Smartphone',
    color: '#8B5CF6',
    typicalROI: 14,
  },
  [MarketingChannel.PROGRAMMATIC]: {
    label: 'Programmatic Advertising',
    description: 'Programmatic ad buying',
    priority: MarketingChannelPriority.MEDIUM,
    icon: 'Code',
    color: '#8B5CF6',
    typicalROI: 8,
  },
  [MarketingChannel.ABM]: {
    label: 'Account-Based Marketing',
    description: 'ABM campaigns and strategies',
    priority: MarketingChannelPriority.HIGH,
    icon: 'Building',
    color: '#6366F1',
    typicalROI: 15,
  },
  [MarketingChannel.PARTNER]: {
    label: 'Partner Marketing',
    description: 'Partner and co-marketing programs',
    priority: MarketingChannelPriority.MEDIUM,
    icon: 'Handshake',
    color: '#10B981',
    typicalROI: 12,
  },
};

/**
 * Campaign budget thresholds
 */
export interface CampaignBudgetThresholds {
  /** Minimum budget for campaign */
  minimumBudget: number;
  /** Maximum budget for campaign */
  maximumBudget: number;
  /** Alert threshold for budget overrun percentage */
  overrunAlertThreshold: number;
  /** Auto-pause budget threshold percentage */
  autoPauseThreshold: number;
  /** Campaign budget increment step */
  budgetIncrementStep: number;
}

export const DEFAULT_CAMPAIGN_BUDGET_THRESHOLDS: CampaignBudgetThresholds = {
  minimumBudget: 100,
  maximumBudget: 100000,
  overrunAlertThreshold: 110,
  autoPauseThreshold: 120,
  budgetIncrementStep: 50,
};

/**
 * Conversion funnel stages
 */
export enum ConversionFunnelStage {
  /** Awareness stage - user becomes aware of brand */
  AWARENESS = 'AWARENESS',
  /** Interest stage - user shows interest */
  INTEREST = 'INTEREST',
  /** Consideration stage - user considers purchase */
  CONSIDERATION = 'CONSIDERATION',
  /** Intent stage - user intends to purchase */
  INTENT = 'INTENT',
  /** Evaluation stage - user evaluates options */
  EVALUATION = 'EVALUATION',
  /** Purchase stage - user makes purchase */
  PURCHASE = 'PURCHASE',
  /** Loyalty stage - user becomes repeat customer */
  LOYALTY = 'LOYALTY',
  /** Advocacy stage - user advocates for brand */
  ADVOCACY = 'ADVOCACY',
}

/**
 * Conversion funnel stage configuration
 */
export const CONVERSION_FUNNEL_STAGE_CONFIG: Record<
  ConversionFunnelStage,
  { label: string; description: string; typicalConversionRate: number; color: string }
> = {
  [ConversionFunnelStage.AWARENESS]: {
    label: 'Awareness',
    description: 'User becomes aware of the brand or product',
    typicalConversionRate: 100,
    color: '#3B82F6',
  },
  [ConversionFunnelStage.INTEREST]: {
    label: 'Interest',
    description: 'User shows interest in the product',
    typicalConversionRate: 40,
    color: '#6366F1',
  },
  [ConversionFunnelStage.CONSIDERATION]: {
    label: 'Consideration',
    description: 'User considers purchasing the product',
    typicalConversionRate: 20,
    color: '#8B5CF6',
  },
  [ConversionFunnelStage.INTENT]: {
    label: 'Intent',
    description: 'User intends to make a purchase',
    typicalConversionRate: 10,
    color: '#10B981',
  },
  [ConversionFunnelStage.EVALUATION]: {
    label: 'Evaluation',
    description: 'User evaluates product options',
    typicalConversionRate: 5,
    color: '#F59E0B',
  },
  [ConversionFunnelStage.PURCHASE]: {
    label: 'Purchase',
    description: 'User makes a purchase',
    typicalConversionRate: 3,
    color: '#22C55E',
  },
  [ConversionFunnelStage.LOYALTY]: {
    label: 'Loyalty',
    description: 'User becomes a repeat customer',
    typicalConversionRate: 1.5,
    color: '#F472B6',
  },
  [ConversionFunnelStage.ADVOCACY]: {
    label: 'Advocacy',
    description: 'User advocates for the brand',
    typicalConversionRate: 0.5,
    color: '#EC4899',
  },
};

/**
 * Marketing automation settings
 */
export interface MarketingAutomationSettings {
  /** Enable marketing automation */
  enableAutomation: boolean;
  /** Enable lead scoring */
  enableLeadScoring: boolean;
  /** Enable email automation */
  enableEmailAutomation: boolean;
  /** Enable social automation */
  enableSocialAutomation: boolean;
  /** Enable ad automation */
  enableAdAutomation: boolean;
  /** Automation trigger delay in hours */
  triggerDelayHours: number;
  /** Lead scoring threshold */
  leadScoreThreshold: number;
  /** Max automation steps */
  maxAutomationSteps: number;
}

export const DEFAULT_MARKETING_AUTOMATION_SETTINGS: MarketingAutomationSettings = {
  enableAutomation: true,
  enableLeadScoring: true,
  enableEmailAutomation: true,
  enableSocialAutomation: false,
  enableAdAutomation: false,
  triggerDelayHours: 2,
  leadScoreThreshold: 50,
  maxAutomationSteps: 10,
};

/**
 * Social media tracking settings
 */
export interface SocialMediaTrackingSettings {
  /** Enable social media tracking */
  enableTracking: boolean;
  /** Track mentions */
  trackMentions: boolean;
  /** Track hashtags */
  trackHashtags: boolean;
  /** Track sentiment */
  trackSentiment: boolean;
  /** Track engagement */
  trackEngagement: boolean;
  /** Track reach */
  trackReach: boolean;
  /** Social platforms to track */
  platforms: (
    | 'FACEBOOK'
    | 'TWITTER'
    | 'INSTAGRAM'
    | 'LINKEDIN'
    | 'YOUTUBE'
    | 'TIKTOK'
    | 'PINTEREST'
    | 'SNAPCHAT'
  )[];
  /** Tracking frequency in minutes */
  trackingFrequencyMinutes: number;
}

export const DEFAULT_SOCIAL_MEDIA_TRACKING_SETTINGS: SocialMediaTrackingSettings = {
  enableTracking: true,
  trackMentions: true,
  trackHashtags: true,
  trackSentiment: true,
  trackEngagement: true,
  trackReach: true,
  platforms: ['FACEBOOK', 'TWITTER', 'INSTAGRAM', 'LINKEDIN', 'YOUTUBE'],
  trackingFrequencyMinutes: 60,
};

/**
 * Email marketing settings
 */
export interface EmailMarketingSettings {
  /** Enable email marketing */
  enableEmailMarketing: boolean;
  /** Enable drip campaigns */
  enableDripCampaigns: boolean;
  /** Enable A/B testing */
  enableABTesting: boolean;
  /** Enable personalization */
  enablePersonalization: boolean;
  /** Open rate tracking */
  trackOpenRate: boolean;
  /** Click rate tracking */
  trackClickRate: boolean;
  /** Bounce rate tracking */
  trackBounceRate: boolean;
  /** Unsubscribe rate tracking */
  trackUnsubscribeRate: boolean;
  /** Maximum emails per day */
  maxEmailsPerDay: number;
  /** Email frequency in days */
  emailFrequencyDays: number;
}

export const DEFAULT_EMAIL_MARKETING_SETTINGS: EmailMarketingSettings = {
  enableEmailMarketing: true,
  enableDripCampaigns: true,
  enableABTesting: true,
  enablePersonalization: true,
  trackOpenRate: true,
  trackClickRate: true,
  trackBounceRate: true,
  trackUnsubscribeRate: true,
  maxEmailsPerDay: 3,
  emailFrequencyDays: 3,
};

/**
 * SEO parameters
 */
export interface SEOParameters {
  /** Enable SEO tracking */
  enableSEOTracking: boolean;
  /** Track keyword rankings */
  trackKeywordRankings: boolean;
  /** Track backlinks */
  trackBacklinks: boolean;
  /** Track domain authority */
  trackDomainAuthority: boolean;
  /** Track page speed */
  trackPageSpeed: boolean;
  /** Track mobile responsiveness */
  trackMobileResponsiveness: boolean;
  /** Track core web vitals */
  trackCoreWebVitals: boolean;
  /** Keyword tracking list */
  keywordsToTrack: string[];
  /** Competitor tracking list */
  competitorsToTrack: string[];
}

export const DEFAULT_SEO_PARAMETERS: SEOParameters = {
  enableSEOTracking: true,
  trackKeywordRankings: true,
  trackBacklinks: true,
  trackDomainAuthority: true,
  trackPageSpeed: true,
  trackMobileResponsiveness: true,
  trackCoreWebVitals: true,
  keywordsToTrack: [],
  competitorsToTrack: [],
};

/**
 * Paid advertising settings
 */
export interface PaidAdvertisingSettings {
  /** Enable paid advertising */
  enablePaidAdvertising: boolean;
  /** Enable budget optimization */
  enableBudgetOptimization: boolean;
  /** Enable bid optimization */
  enableBidOptimization: boolean;
  /** Enable ad rotation */
  enableAdRotation: boolean;
  /** Enable audience targeting */
  enableAudienceTargeting: boolean;
  /** Enable retargeting */
  enableRetargeting: boolean;
  /** Daily budget */
  dailyBudget: number;
  /** Cost per acquisition target */
  costPerAcquisitionTarget: number;
  /** Maximum bid per click */
  maxBidPerClick: number;
}

export const DEFAULT_PAID_ADVERTISING_SETTINGS: PaidAdvertisingSettings = {
  enablePaidAdvertising: true,
  enableBudgetOptimization: true,
  enableBidOptimization: true,
  enableAdRotation: true,
  enableAudienceTargeting: true,
  enableRetargeting: true,
  dailyBudget: 50,
  costPerAcquisitionTarget: 25,
  maxBidPerClick: 2,
};

/**
 * Marketing ROI thresholds
 */
export interface MarketingROIThresholds {
  /** ROI target percentage */
  roiTarget: number;
  /** Minimum ROI percentage */
  minimumROI: number;
  /** ROI alert threshold percentage */
  alertThreshold: number;
  /** ROI critical threshold percentage */
  criticalThreshold: number;
  /** ROI calculation period in days */
  calculationPeriodDays: number;
}

export const DEFAULT_MARKETING_ROI_THRESHOLDS: MarketingROIThresholds = {
  roiTarget: 20,
  minimumROI: 10,
  alertThreshold: 15,
  criticalThreshold: 5,
  calculationPeriodDays: 30,
};

/**
 * Brand awareness metrics
 */
export interface BrandAwarenessMetrics {
  /** Brand recall rate */
  recallRate: number;
  /** Brand recognition rate */
  recognitionRate: number;
  /** Brand sentiment score */
  sentimentScore: number;
  /** Brand mentions */
  mentions: number;
  /** Brand reach */
  reach: number;
  /** Brand impressions */
  impressions: number;
  /** Brand engagement rate */
  engagementRate: number;
}

export const DEFAULT_BRAND_AWARENESS_METRICS: BrandAwarenessMetrics = {
  recallRate: 0,
  recognitionRate: 0,
  sentimentScore: 0,
  mentions: 0,
  reach: 0,
  impressions: 0,
  engagementRate: 0,
};

/**
 * Marketing analytics configuration
 */
export const MARKETING_ANALYTICS_CONFIG = {
  /** Maximum campaigns to process */
  MAX_CAMPAIGNS: 1000,
  /** Marketing analytics cache TTL in seconds */
  CACHE_TTL_SECONDS: 300,
  /** Marketing query timeout in seconds */
  QUERY_TIMEOUT_SECONDS: 30,
  /** Maximum campaigns in report */
  MAX_CAMPAIGNS_IN_REPORT: 100,
  /** Marketing data export limit */
  EXPORT_LIMIT: 50000,
  /** Marketing analytics version */
  VERSION: '1.0.0',
} as const;

/**
 * Marketing functions
 */
export function getMarketingChannelLabel(channel: MarketingChannel): string {
  return MARKETING_CHANNEL_CONFIG[channel]?.label || channel;
}

export function getMarketingChannelPriority(channel: MarketingChannel): MarketingChannelPriority {
  return MARKETING_CHANNEL_CONFIG[channel]?.priority || MarketingChannelPriority.MEDIUM;
}

export function getMarketingChannelROI(channel: MarketingChannel): number {
  return MARKETING_CHANNEL_CONFIG[channel]?.typicalROI || 0;
}

export function getMarketingChannelColor(channel: MarketingChannel): string {
  return MARKETING_CHANNEL_CONFIG[channel]?.color || '#6B7280';
}

export function getFunnelStageLabel(stage: ConversionFunnelStage): string {
  return CONVERSION_FUNNEL_STAGE_CONFIG[stage]?.label || stage;
}

export function getFunnelStageConversionRate(stage: ConversionFunnelStage): number {
  return CONVERSION_FUNNEL_STAGE_CONFIG[stage]?.typicalConversionRate || 0;
}
