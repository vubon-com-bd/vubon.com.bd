/**
 * @fileoverview Acquisition analytics system core constants
 * @package @vubun/shared-constants
 */

// External libraries - none needed for constants

// Shared packages - none needed for constants

// Project files - none needed for constants

/**
 * Acquisition channel priority
 */
export enum AcquisitionChannelPriority {
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
 * Acquisition channels
 */
export enum AcquisitionChannel {
  /** Organic search */
  ORGANIC_SEARCH = 'ORGANIC_SEARCH',
  /** Paid search */
  PAID_SEARCH = 'PAID_SEARCH',
  /** Social media */
  SOCIAL_MEDIA = 'SOCIAL_MEDIA',
  /** Email marketing */
  EMAIL = 'EMAIL',
  /** Referral */
  REFERRAL = 'REFERRAL',
  /** Direct traffic */
  DIRECT = 'DIRECT',
  /** Display advertising */
  DISPLAY = 'DISPLAY',
  /** Video advertising */
  VIDEO = 'VIDEO',
  /** Affiliate marketing */
  AFFILIATE = 'AFFILIATE',
  /** Influencer marketing */
  INFLUENCER = 'INFLUENCER',
  /** Content marketing */
  CONTENT = 'CONTENT',
  /** Events */
  EVENTS = 'EVENTS',
  /** PR */
  PR = 'PR',
  /** Podcast */
  PODCAST = 'PODCAST',
  /** Webinar */
  WEBINAR = 'WEBINAR',
}

/**
 * Acquisition channel configuration
 */
export const ACQUISITION_CHANNEL_CONFIG: Record<
  AcquisitionChannel,
  {
    label: string;
    description: string;
    priority: AcquisitionChannelPriority;
    typicalConversionRate: number;
    typicalCAC: number;
    icon?: string;
    color?: string;
  }
> = {
  [AcquisitionChannel.ORGANIC_SEARCH]: {
    label: 'Organic Search',
    description: 'Traffic from search engine organic results',
    priority: AcquisitionChannelPriority.CRITICAL,
    typicalConversionRate: 0.03,
    typicalCAC: 0,
    icon: 'Search',
    color: '#22C55E',
  },
  [AcquisitionChannel.PAID_SEARCH]: {
    label: 'Paid Search',
    description: 'Traffic from paid search advertising',
    priority: AcquisitionChannelPriority.HIGH,
    typicalConversionRate: 0.025,
    typicalCAC: 50,
    icon: 'Search',
    color: '#4285F4',
  },
  [AcquisitionChannel.SOCIAL_MEDIA]: {
    label: 'Social Media',
    description: 'Traffic from social media platforms',
    priority: AcquisitionChannelPriority.HIGH,
    typicalConversionRate: 0.015,
    typicalCAC: 30,
    icon: 'Share2',
    color: '#1DA1F2',
  },
  [AcquisitionChannel.EMAIL]: {
    label: 'Email',
    description: 'Traffic from email campaigns',
    priority: AcquisitionChannelPriority.HIGH,
    typicalConversionRate: 0.04,
    typicalCAC: 20,
    icon: 'Mail',
    color: '#EA580C',
  },
  [AcquisitionChannel.REFERRAL]: {
    label: 'Referral',
    description: 'Traffic from referral programs',
    priority: AcquisitionChannelPriority.HIGH,
    typicalConversionRate: 0.035,
    typicalCAC: 15,
    icon: 'Users',
    color: '#A855F7',
  },
  [AcquisitionChannel.DIRECT]: {
    label: 'Direct',
    description: 'Direct traffic from bookmarks or typed URLs',
    priority: AcquisitionChannelPriority.MEDIUM,
    typicalConversionRate: 0.02,
    typicalCAC: 0,
    icon: 'ArrowRight',
    color: '#6B7280',
  },
  [AcquisitionChannel.DISPLAY]: {
    label: 'Display',
    description: 'Traffic from display advertising',
    priority: AcquisitionChannelPriority.MEDIUM,
    typicalConversionRate: 0.01,
    typicalCAC: 40,
    icon: 'Layout',
    color: '#3B82F6',
  },
  [AcquisitionChannel.VIDEO]: {
    label: 'Video',
    description: 'Traffic from video advertising',
    priority: AcquisitionChannelPriority.MEDIUM,
    typicalConversionRate: 0.02,
    typicalCAC: 35,
    icon: 'Video',
    color: '#EC4899',
  },
  [AcquisitionChannel.AFFILIATE]: {
    label: 'Affiliate',
    description: 'Traffic from affiliate marketing',
    priority: AcquisitionChannelPriority.MEDIUM,
    typicalConversionRate: 0.025,
    typicalCAC: 45,
    icon: 'Link2',
    color: '#10B981',
  },
  [AcquisitionChannel.INFLUENCER]: {
    label: 'Influencer',
    description: 'Traffic from influencer marketing',
    priority: AcquisitionChannelPriority.MEDIUM,
    typicalConversionRate: 0.02,
    typicalCAC: 55,
    icon: 'Star',
    color: '#F472B6',
  },
  [AcquisitionChannel.CONTENT]: {
    label: 'Content',
    description: 'Traffic from content marketing',
    priority: AcquisitionChannelPriority.HIGH,
    typicalConversionRate: 0.02,
    typicalCAC: 25,
    icon: 'FileText',
    color: '#8B5CF6',
  },
  [AcquisitionChannel.EVENTS]: {
    label: 'Events',
    description: 'Traffic from events and conferences',
    priority: AcquisitionChannelPriority.LOW,
    typicalConversionRate: 0.03,
    typicalCAC: 60,
    icon: 'Calendar',
    color: '#F59E0B',
  },
  [AcquisitionChannel.PR]: {
    label: 'PR',
    description: 'Traffic from public relations',
    priority: AcquisitionChannelPriority.LOW,
    typicalConversionRate: 0.015,
    typicalCAC: 70,
    icon: 'Megaphone',
    color: '#6B7280',
  },
  [AcquisitionChannel.PODCAST]: {
    label: 'Podcast',
    description: 'Traffic from podcast marketing',
    priority: AcquisitionChannelPriority.LOW,
    typicalConversionRate: 0.015,
    typicalCAC: 50,
    icon: 'Mic',
    color: '#6366F1',
  },
  [AcquisitionChannel.WEBINAR]: {
    label: 'Webinar',
    description: 'Traffic from webinar marketing',
    priority: AcquisitionChannelPriority.MEDIUM,
    typicalConversionRate: 0.04,
    typicalCAC: 30,
    icon: 'Video',
    color: '#8B5CF6',
  },
};

/**
 * Conversion funnel stage thresholds
 */
export interface ConversionFunnelThresholds {
  /** Awareness to interest threshold */
  awarenessToInterestThreshold: number;
  /** Interest to consideration threshold */
  interestToConsiderationThreshold: number;
  /** Consideration to intent threshold */
  considerationToIntentThreshold: number;
  /** Intent to purchase threshold */
  intentToPurchaseThreshold: number;
  /** Purchase to loyalty threshold */
  purchaseToLoyaltyThreshold: number;
  /** Loyalty to advocacy threshold */
  loyaltyToAdvocacyThreshold: number;
}

export const DEFAULT_CONVERSION_FUNNEL_THRESHOLDS: ConversionFunnelThresholds = {
  awarenessToInterestThreshold: 0.4,
  interestToConsiderationThreshold: 0.5,
  considerationToIntentThreshold: 0.3,
  intentToPurchaseThreshold: 0.6,
  purchaseToLoyaltyThreshold: 0.3,
  loyaltyToAdvocacyThreshold: 0.2,
};

/**
 * Lead qualification settings
 */
export interface LeadQualificationSettings {
  /** Enable lead qualification */
  enableQualification: boolean;
  /** Qualification method */
  qualificationMethod: 'BANT' | 'CHAMP' | 'MEDDIC' | 'CUSTOM';
  /** Minimum budget */
  minBudget: number;
  /** Authority level required */
  authorityLevelRequired: string;
  /** Need score threshold */
  needScoreThreshold: number;
  /** Timeline in days */
  timelineDays: number;
  /** Qualification score threshold */
  scoreThreshold: number;
}

export const DEFAULT_LEAD_QUALIFICATION_SETTINGS: LeadQualificationSettings = {
  enableQualification: true,
  qualificationMethod: 'BANT',
  minBudget: 1000,
  authorityLevelRequired: 'DECISION_MAKER',
  needScoreThreshold: 70,
  timelineDays: 30,
  scoreThreshold: 75,
};

/**
 * Acquisition cost budget settings
 */
export interface AcquisitionCostBudgetSettings {
  /** Daily budget */
  dailyBudget: number;
  /** Monthly budget */
  monthlyBudget: number;
  /** Quarterly budget */
  quarterlyBudget: number;
  /** Annual budget */
  annualBudget: number;
  /** Budget allocation method */
  allocationMethod: 'PERCENTAGE' | 'FIXED' | 'PERFORMANCE';
  /** Budget alert threshold percentage */
  alertThreshold: number;
  /** Budget auto-pause threshold percentage */
  autoPauseThreshold: number;
}

export const DEFAULT_ACQUISITION_COST_BUDGET_SETTINGS: AcquisitionCostBudgetSettings = {
  dailyBudget: 100,
  monthlyBudget: 3000,
  quarterlyBudget: 9000,
  annualBudget: 36000,
  allocationMethod: 'PERCENTAGE',
  alertThreshold: 80,
  autoPauseThreshold: 100,
};

/**
 * Tracking cookie lifetime settings
 */
export interface TrackingCookieLifetimeSettings {
  /** Default cookie lifetime in days */
  defaultLifetimeDays: number;
  /** Session cookie lifetime in minutes */
  sessionLifetimeMinutes: number;
  /** Persistent cookie lifetime in days */
  persistentLifetimeDays: number;
  /** Referral cookie lifetime in days */
  referralLifetimeDays: number;
  /** Campaign cookie lifetime in days */
  campaignLifetimeDays: number;
}

export const DEFAULT_TRACKING_COOKIE_LIFETIME_SETTINGS: TrackingCookieLifetimeSettings = {
  defaultLifetimeDays: 30,
  sessionLifetimeMinutes: 30,
  persistentLifetimeDays: 365,
  referralLifetimeDays: 30,
  campaignLifetimeDays: 90,
};

/**
 * Conversion tracking window settings
 */
export interface ConversionTrackingWindowSettings {
  /** Default conversion window in days */
  defaultWindowDays: number;
  /** First click conversion window in days */
  firstClickWindowDays: number;
  /** Last click conversion window in days */
  lastClickWindowDays: number;
  /** Multi-touch conversion window in days */
  multiTouchWindowDays: number;
  /** View-through conversion window in days */
  viewThroughWindowDays: number;
}

export const DEFAULT_CONVERSION_TRACKING_WINDOW_SETTINGS: ConversionTrackingWindowSettings = {
  defaultWindowDays: 30,
  firstClickWindowDays: 30,
  lastClickWindowDays: 30,
  multiTouchWindowDays: 30,
  viewThroughWindowDays: 1,
};

/**
 * Attribution model settings
 */
export interface AttributionModelSettings {
  /** Attribution model */
  model: 'FIRST_TOUCH' | 'LAST_TOUCH' | 'LINEAR' | 'TIME_DECAY' | 'POSITION_BASED' | 'DATA_DRIVEN';
  /** Attribution window in days */
  windowDays: number;
  /** Enable multi-channel attribution */
  enableMultiChannel: boolean;
  /** Enable cross-device attribution */
  enableCrossDevice: boolean;
  /** Custom attribution weights */
  customWeights?: {
    firstTouch: number;
    lastTouch: number;
    middleTouches: number;
  };
}

export const DEFAULT_ATTRIBUTION_MODEL_SETTINGS: AttributionModelSettings = {
  model: 'LINEAR',
  windowDays: 30,
  enableMultiChannel: true,
  enableCrossDevice: true,
  customWeights: {
    firstTouch: 40,
    lastTouch: 40,
    middleTouches: 20,
  },
};

/**
 * Acquisition campaign settings
 */
export interface AcquisitionCampaignSettings {
  /** Enable campaign tracking */
  enableCampaignTracking: boolean;
  /** Campaign naming convention */
  namingConvention: string;
  /** Campaign default budget */
  defaultBudget: number;
  /** Campaign duration in days */
  campaignDurationDays: number;
  /** Campaign optimization goal */
  optimizationGoal: 'CONVERSIONS' | 'REVENUE' | 'ROI' | 'CLICKS' | 'IMPRESSIONS';
  /** Campaign performance review interval in days */
  reviewIntervalDays: number;
}

export const DEFAULT_ACQUISITION_CAMPAIGN_SETTINGS: AcquisitionCampaignSettings = {
  enableCampaignTracking: true,
  namingConvention: 'CHANNEL_CAMPAIGN_DATE',
  defaultBudget: 1000,
  campaignDurationDays: 30,
  optimizationGoal: 'CONVERSIONS',
  reviewIntervalDays: 7,
};

/**
 * Lead scoring settings
 */
export interface LeadScoringSettings {
  /** Enable lead scoring */
  enableLeadScoring: boolean;
  /** Lead scoring model */
  scoringModel: 'DEMOGRAPHIC' | 'BEHAVIORAL' | 'HYBRID';
  /** Score thresholds */
  thresholds: {
    hot: number;
    warm: number;
    cold: number;
  };
  /** Behavior weights */
  behaviorWeights: {
    pageView: number;
    contentDownload: number;
    webinarRegistration: number;
    demoRequest: number;
    contactSales: number;
  };
  /** Score decay in days */
  scoreDecayDays: number;
}

export const DEFAULT_LEAD_SCORING_SETTINGS: LeadScoringSettings = {
  enableLeadScoring: true,
  scoringModel: 'HYBRID',
  thresholds: {
    hot: 80,
    warm: 50,
    cold: 20,
  },
  behaviorWeights: {
    pageView: 1,
    contentDownload: 5,
    webinarRegistration: 10,
    demoRequest: 20,
    contactSales: 25,
  },
  scoreDecayDays: 30,
};

/**
 * Acquisition ROI thresholds
 */
export interface AcquisitionROIThresholds {
  /** Target ROI percentage */
  targetROI: number;
  /** Minimum ROI percentage */
  minimumROI: number;
  /** ROI alert threshold */
  alertThreshold: number;
  /** ROI critical threshold */
  criticalThreshold: number;
  /** ROI calculation period in days */
  calculationPeriodDays: number;
}

export const DEFAULT_ACQUISITION_ROI_THRESHOLDS: AcquisitionROIThresholds = {
  targetROI: 20,
  minimumROI: 10,
  alertThreshold: 15,
  criticalThreshold: 5,
  calculationPeriodDays: 30,
};

/**
 * Acquisition analytics configuration
 */
export const ACQUISITION_ANALYTICS_CONFIG = {
  /** Maximum campaigns to process */
  MAX_CAMPAIGNS: 1000,
  /** Acquisition analytics cache TTL in seconds */
  CACHE_TTL_SECONDS: 300,
  /** Acquisition query timeout in seconds */
  QUERY_TIMEOUT_SECONDS: 30,
  /** Maximum campaigns in report */
  MAX_CAMPAIGNS_IN_REPORT: 100,
  /** Acquisition data export limit */
  EXPORT_LIMIT: 50000,
  /** Acquisition analytics version */
  VERSION: '1.0.0',
} as const;

/**
 * Acquisition functions
 */
export function getAcquisitionChannelLabel(channel: AcquisitionChannel): string {
  return ACQUISITION_CHANNEL_CONFIG[channel]?.label || channel;
}

export function getAcquisitionChannelPriority(
  channel: AcquisitionChannel
): AcquisitionChannelPriority {
  return ACQUISITION_CHANNEL_CONFIG[channel]?.priority || AcquisitionChannelPriority.MEDIUM;
}

export function getAcquisitionChannelConversionRate(channel: AcquisitionChannel): number {
  return ACQUISITION_CHANNEL_CONFIG[channel]?.typicalConversionRate || 0;
}

export function getAcquisitionChannelCAC(channel: AcquisitionChannel): number {
  return ACQUISITION_CHANNEL_CONFIG[channel]?.typicalCAC || 0;
}
