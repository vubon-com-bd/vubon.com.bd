/**
 * Lead Generation Constants
 * Core lead generation configuration and settings
 */

export const MARKETINGLEAD = {
  // Lead Generation Types
  TYPES: {
    INBOUND: 'inbound',
    OUTBOUND: 'outbound',
    COLD: 'cold',
    WARM: 'warm',
    HOT: 'hot',
    MARKETING_QUALIFIED: 'marketing_qualified',
    SALES_QUALIFIED: 'sales_qualified',
    PRODUCT_QUALIFIED: 'product_qualified',
    DEMAND_GENERATION: 'demand_generation',
    CONTENT_DOWNLOAD: 'content_download',
    WEBINAR_REGISTRATION: 'webinar_registration',
    EVENT_REGISTRATION: 'event_registration',
    FREE_TRIAL: 'free_trial',
    DEMO_REQUEST: 'demo_request',
    CONSULTATION: 'consultation',
    REFERRAL: 'referral',
    PARTNERSHIP: 'partnership',
    INFLUENCER: 'influencer',
    SOCIAL_MEDIA: 'social_media',
    EMAIL_CAMPAIGN: 'email_campaign',
    SEARCH_ENGINE: 'search_engine',
    PAID_ADS: 'paid_ads',
    DIRECT_MAIL: 'direct_mail',
    CUSTOM: 'custom',
  } as const,

  // Lead Generation Categories
  CATEGORIES: {
    INBOUND: 'inbound',
    OUTBOUND: 'outbound',
    ORGANIC: 'organic',
    PAID: 'paid',
    REFERRAL: 'referral',
    PARTNERSHIP: 'partnership',
    EVENT: 'event',
    CONTENT: 'content',
    SOCIAL: 'social',
    DIRECT: 'direct',
    SEARCH: 'search',
    DISPLAY: 'display',
    EMAIL: 'email',
    PHONE: 'phone',
    SMS: 'sms',
  } as const,

  // Lead Generation Channels
  CHANNELS: {
    WEBSITE: 'website',
    LANDING_PAGE: 'landing_page',
    BLOG: 'blog',
    SOCIAL_MEDIA: 'social_media',
    EMAIL: 'email',
    SMS: 'sms',
    PHONE: 'phone',
    CHAT: 'chat',
    WEBINAR: 'webinar',
    EVENT: 'event',
    TRADE_SHOW: 'trade_show',
    CONFERENCE: 'conference',
    WORKSHOP: 'workshop',
    SEMINAR: 'seminar',
    PODCAST: 'podcast',
    YOUTUBE: 'youtube',
    SEARCH_ENGINE: 'search_engine',
    PAID_ADS: 'paid_ads',
    REFERRAL: 'referral',
    PARTNERSHIP: 'partnership',
    DIRECT_MAIL: 'direct_mail',
    OUTBOUND_CALL: 'outbound_call',
    INBOUND_CALL: 'inbound_call',
    CONTACT_FORM: 'contact_form',
    LIVE_CHAT: 'live_chat',
    CUSTOM: 'custom',
  } as const,

  // Lead Generation Methods
  METHODS: {
    OPT_IN: 'opt_in',
    OPT_OUT: 'opt_out',
    GATED_CONTENT: 'gated_content',
    UNGATED_CONTENT: 'ungated_content',
    TWO_STEP: 'two_step',
    MULTI_STEP: 'multi_step',
    DIRECT: 'direct',
    AUTOMATED: 'automated',
    MANUAL: 'manual',
    TRIGGERED: 'triggered',
    CAMPAIGN: 'campaign',
    LEAD_MAGNET: 'lead_magnet',
    LANDING_PAGE: 'landing_page',
    POPUP: 'popup',
    SLIDE_IN: 'slide_in',
    EMBEDDED_FORM: 'embedded_form',
    SOCIAL_LOGIN: 'social_login',
    EMAIL_SUBSCRIPTION: 'email_subscription',
    SMS_SUBSCRIPTION: 'sms_subscription',
  } as const,

  // Lead Generation Scores
  SCORES: {
    MIN: 0,
    MAX: 100,
    THRESHOLD_HOT: 80,
    THRESHOLD_WARM: 50,
    THRESHOLD_COLD: 20,
    DEFAULT: 0,
    INCREMENT_HIGH: 10,
    INCREMENT_MEDIUM: 5,
    INCREMENT_LOW: 2,
    DECREMENT_HIGH: -10,
    DECREMENT_MEDIUM: -5,
    DECREMENT_LOW: -2,
  } as const,

  // Lead Generation Conversion Rates
  CONVERSION_RATES: {
    HIGH: 10,
    MEDIUM: 5,
    LOW: 2,
    VERY_LOW: 1,
    DEFAULT: 3,
  } as const,

  // Lead Generation Defaults
  DEFAULTS: {
    DEFAULT_TYPE: 'inbound',
    DEFAULT_CATEGORY: 'inbound',
    DEFAULT_CHANNEL: 'website',
    DEFAULT_METHOD: 'opt_in',
    DEFAULT_SCORE: 0,
    DEFAULT_CONVERSION_RATE: 3,
    DEFAULT_QUALIFICATION_THRESHOLD: 50,
    DEFAULT_AUTO_QUALIFY: true,
    DEFAULT_EMAIL_FOLLOWUP: true,
    DEFAULT_SMS_FOLLOWUP: false,
    DEFAULT_PHONE_FOLLOWUP: false,
    DEFAULT_PRIORITY: 'medium',
    DEFAULT_URGENCY: 'medium',
    DEFAULT_VALUE: 'low',
    MAX_SCORE: 100,
    MIN_SCORE: 0,
  } as const,

  // Lead Generation Limits
  LIMITS: {
    MIN_NAME_LENGTH: 2,
    MAX_NAME_LENGTH: 100,
    MAX_COMPANY_LENGTH: 200,
    MAX_PHONE_LENGTH: 20,
    MAX_EMAIL_LENGTH: 100,
    MAX_NOTES_LENGTH: 1000,
    MAX_TAGS_PER_LEAD: 20,
    MAX_LEADS_PER_DAY: 1000,
    MAX_LEADS_PER_HOUR: 100,
    MAX_SCORE_HISTORY: 100,
    MAX_ACTIVITY_HISTORY: 100,
    MAX_FOLLOWUPS_PER_LEAD: 10,
    MAX_CAMPAIGNS_PER_LEAD: 5,
    DEFAULT_PAGE_SIZE: 50,
    MAX_PAGE_SIZE: 500,
  } as const,
} as const;

// Lead Generation Types
export type MarketingLeadType = (typeof MARKETINGLEAD.TYPES)[keyof typeof MARKETINGLEAD.TYPES];

// Lead Generation Categories
export type MarketingLeadCategory =
  (typeof MARKETINGLEAD.CATEGORIES)[keyof typeof MARKETINGLEAD.CATEGORIES];

// Lead Generation Channels
export type MarketingLeadChannel =
  (typeof MARKETINGLEAD.CHANNELS)[keyof typeof MARKETINGLEAD.CHANNELS];

// Lead Generation Methods
export type MarketingLeadMethod =
  (typeof MARKETINGLEAD.METHODS)[keyof typeof MARKETINGLEAD.METHODS];

// Lead Generation Scores
export type MarketingLeadScore = (typeof MARKETINGLEAD.SCORES)[keyof typeof MARKETINGLEAD.SCORES];

// Lead Generation Conversion Rates
export type MarketingLeadConversionRate =
  (typeof MARKETINGLEAD.CONVERSION_RATES)[keyof typeof MARKETINGLEAD.CONVERSION_RATES];

// Lead Generation Defaults
export type MarketingLeadDefault =
  (typeof MARKETINGLEAD.DEFAULTS)[keyof typeof MARKETINGLEAD.DEFAULTS];

// Lead Generation Limits
export type MarketingLeadLimit = (typeof MARKETINGLEAD.LIMITS)[keyof typeof MARKETINGLEAD.LIMITS];

// Utility Functions
export function marketingleadGetTypeLabel(type: MarketingLeadType): string {
  const labels: Record<MarketingLeadType, string> = {
    [MARKETINGLEAD.TYPES.INBOUND]: 'Inbound',
    [MARKETINGLEAD.TYPES.OUTBOUND]: 'Outbound',
    [MARKETINGLEAD.TYPES.COLD]: 'Cold',
    [MARKETINGLEAD.TYPES.WARM]: 'Warm',
    [MARKETINGLEAD.TYPES.HOT]: 'Hot',
    [MARKETINGLEAD.TYPES.MARKETING_QUALIFIED]: 'Marketing Qualified',
    [MARKETINGLEAD.TYPES.SALES_QUALIFIED]: 'Sales Qualified',
    [MARKETINGLEAD.TYPES.PRODUCT_QUALIFIED]: 'Product Qualified',
    [MARKETINGLEAD.TYPES.DEMAND_GENERATION]: 'Demand Generation',
    [MARKETINGLEAD.TYPES.CONTENT_DOWNLOAD]: 'Content Download',
    [MARKETINGLEAD.TYPES.WEBINAR_REGISTRATION]: 'Webinar Registration',
    [MARKETINGLEAD.TYPES.EVENT_REGISTRATION]: 'Event Registration',
    [MARKETINGLEAD.TYPES.FREE_TRIAL]: 'Free Trial',
    [MARKETINGLEAD.TYPES.DEMO_REQUEST]: 'Demo Request',
    [MARKETINGLEAD.TYPES.CONSULTATION]: 'Consultation',
    [MARKETINGLEAD.TYPES.REFERRAL]: 'Referral',
    [MARKETINGLEAD.TYPES.PARTNERSHIP]: 'Partnership',
    [MARKETINGLEAD.TYPES.INFLUENCER]: 'Influencer',
    [MARKETINGLEAD.TYPES.SOCIAL_MEDIA]: 'Social Media',
    [MARKETINGLEAD.TYPES.EMAIL_CAMPAIGN]: 'Email Campaign',
    [MARKETINGLEAD.TYPES.SEARCH_ENGINE]: 'Search Engine',
    [MARKETINGLEAD.TYPES.PAID_ADS]: 'Paid Ads',
    [MARKETINGLEAD.TYPES.DIRECT_MAIL]: 'Direct Mail',
    [MARKETINGLEAD.TYPES.CUSTOM]: 'Custom',
  };
  return labels[type] || 'Unknown Lead Type';
}

export function marketingleadGetCategoryLabel(category: MarketingLeadCategory): string {
  const labels: Record<MarketingLeadCategory, string> = {
    [MARKETINGLEAD.CATEGORIES.INBOUND]: 'Inbound',
    [MARKETINGLEAD.CATEGORIES.OUTBOUND]: 'Outbound',
    [MARKETINGLEAD.CATEGORIES.ORGANIC]: 'Organic',
    [MARKETINGLEAD.CATEGORIES.PAID]: 'Paid',
    [MARKETINGLEAD.CATEGORIES.REFERRAL]: 'Referral',
    [MARKETINGLEAD.CATEGORIES.PARTNERSHIP]: 'Partnership',
    [MARKETINGLEAD.CATEGORIES.EVENT]: 'Event',
    [MARKETINGLEAD.CATEGORIES.CONTENT]: 'Content',
    [MARKETINGLEAD.CATEGORIES.SOCIAL]: 'Social',
    [MARKETINGLEAD.CATEGORIES.DIRECT]: 'Direct',
    [MARKETINGLEAD.CATEGORIES.SEARCH]: 'Search',
    [MARKETINGLEAD.CATEGORIES.DISPLAY]: 'Display',
    [MARKETINGLEAD.CATEGORIES.EMAIL]: 'Email',
    [MARKETINGLEAD.CATEGORIES.PHONE]: 'Phone',
    [MARKETINGLEAD.CATEGORIES.SMS]: 'SMS',
  };
  return labels[category] || 'Unknown Category';
}

export function marketingleadGetChannelLabel(channel: MarketingLeadChannel): string {
  const labels: Record<MarketingLeadChannel, string> = {
    [MARKETINGLEAD.CHANNELS.WEBSITE]: 'Website',
    [MARKETINGLEAD.CHANNELS.LANDING_PAGE]: 'Landing Page',
    [MARKETINGLEAD.CHANNELS.BLOG]: 'Blog',
    [MARKETINGLEAD.CHANNELS.SOCIAL_MEDIA]: 'Social Media',
    [MARKETINGLEAD.CHANNELS.EMAIL]: 'Email',
    [MARKETINGLEAD.CHANNELS.SMS]: 'SMS',
    [MARKETINGLEAD.CHANNELS.PHONE]: 'Phone',
    [MARKETINGLEAD.CHANNELS.CHAT]: 'Chat',
    [MARKETINGLEAD.CHANNELS.WEBINAR]: 'Webinar',
    [MARKETINGLEAD.CHANNELS.EVENT]: 'Event',
    [MARKETINGLEAD.CHANNELS.TRADE_SHOW]: 'Trade Show',
    [MARKETINGLEAD.CHANNELS.CONFERENCE]: 'Conference',
    [MARKETINGLEAD.CHANNELS.WORKSHOP]: 'Workshop',
    [MARKETINGLEAD.CHANNELS.SEMINAR]: 'Seminar',
    [MARKETINGLEAD.CHANNELS.PODCAST]: 'Podcast',
    [MARKETINGLEAD.CHANNELS.YOUTUBE]: 'YouTube',
    [MARKETINGLEAD.CHANNELS.SEARCH_ENGINE]: 'Search Engine',
    [MARKETINGLEAD.CHANNELS.PAID_ADS]: 'Paid Ads',
    [MARKETINGLEAD.CHANNELS.REFERRAL]: 'Referral',
    [MARKETINGLEAD.CHANNELS.PARTNERSHIP]: 'Partnership',
    [MARKETINGLEAD.CHANNELS.DIRECT_MAIL]: 'Direct Mail',
    [MARKETINGLEAD.CHANNELS.OUTBOUND_CALL]: 'Outbound Call',
    [MARKETINGLEAD.CHANNELS.INBOUND_CALL]: 'Inbound Call',
    [MARKETINGLEAD.CHANNELS.CONTACT_FORM]: 'Contact Form',
    [MARKETINGLEAD.CHANNELS.LIVE_CHAT]: 'Live Chat',
    [MARKETINGLEAD.CHANNELS.CUSTOM]: 'Custom',
  };
  return labels[channel] || 'Unknown Channel';
}

export function marketingleadGetMethodLabel(method: MarketingLeadMethod): string {
  const labels: Record<MarketingLeadMethod, string> = {
    [MARKETINGLEAD.METHODS.OPT_IN]: 'Opt-In',
    [MARKETINGLEAD.METHODS.OPT_OUT]: 'Opt-Out',
    [MARKETINGLEAD.METHODS.GATED_CONTENT]: 'Gated Content',
    [MARKETINGLEAD.METHODS.UNGATED_CONTENT]: 'Ungated Content',
    [MARKETINGLEAD.METHODS.TWO_STEP]: 'Two-Step',
    [MARKETINGLEAD.METHODS.MULTI_STEP]: 'Multi-Step',
    [MARKETINGLEAD.METHODS.DIRECT]: 'Direct',
    [MARKETINGLEAD.METHODS.AUTOMATED]: 'Automated',
    [MARKETINGLEAD.METHODS.MANUAL]: 'Manual',
    [MARKETINGLEAD.METHODS.TRIGGERED]: 'Triggered',
    [MARKETINGLEAD.METHODS.CAMPAIGN]: 'Campaign',
    [MARKETINGLEAD.METHODS.LEAD_MAGNET]: 'Lead Magnet',
    [MARKETINGLEAD.METHODS.LANDING_PAGE]: 'Landing Page',
    [MARKETINGLEAD.METHODS.POPUP]: 'Popup',
    [MARKETINGLEAD.METHODS.SLIDE_IN]: 'Slide-In',
    [MARKETINGLEAD.METHODS.EMBEDDED_FORM]: 'Embedded Form',
    [MARKETINGLEAD.METHODS.SOCIAL_LOGIN]: 'Social Login',
    [MARKETINGLEAD.METHODS.EMAIL_SUBSCRIPTION]: 'Email Subscription',
    [MARKETINGLEAD.METHODS.SMS_SUBSCRIPTION]: 'SMS Subscription',
  };
  return labels[method] || 'Unknown Method';
}

export function marketingleadGetScoreLabel(score: number): string {
  if (score >= MARKETINGLEAD.SCORES.THRESHOLD_HOT) return 'Hot';
  if (score >= MARKETINGLEAD.SCORES.THRESHOLD_WARM) return 'Warm';
  if (score >= MARKETINGLEAD.SCORES.THRESHOLD_COLD) return 'Cold';
  return 'Cold';
}

export function marketingleadGetDefaultScore(): number {
  return MARKETINGLEAD.DEFAULTS.DEFAULT_SCORE;
}

export function marketingleadGetDefaultConversionRate(): number {
  return MARKETINGLEAD.DEFAULTS.DEFAULT_CONVERSION_RATE;
}

export function marketingleadGetQualificationThreshold(): number {
  return MARKETINGLEAD.DEFAULTS.DEFAULT_QUALIFICATION_THRESHOLD;
}

export function marketingleadIsInbound(type: MarketingLeadType): boolean {
  const inboundTypes: MarketingLeadType[] = [
    MARKETINGLEAD.TYPES.INBOUND,
    MARKETINGLEAD.TYPES.CONTENT_DOWNLOAD,
    MARKETINGLEAD.TYPES.WEBINAR_REGISTRATION,
    MARKETINGLEAD.TYPES.EVENT_REGISTRATION,
    MARKETINGLEAD.TYPES.FREE_TRIAL,
    MARKETINGLEAD.TYPES.DEMO_REQUEST,
    MARKETINGLEAD.TYPES.CONSULTATION,
  ];
  return inboundTypes.includes(type);
}

export function marketingleadIsOutbound(type: MarketingLeadType): boolean {
  const outboundTypes: MarketingLeadType[] = [
    MARKETINGLEAD.TYPES.OUTBOUND,
    MARKETINGLEAD.TYPES.COLD,
    MARKETINGLEAD.TYPES.DIRECT_MAIL,
  ];
  return outboundTypes.includes(type);
}

export function marketingleadIsQualified(score: number): boolean {
  return score >= MARKETINGLEAD.DEFAULTS.DEFAULT_QUALIFICATION_THRESHOLD;
}

export function marketingleadIsHot(score: number): boolean {
  return score >= MARKETINGLEAD.SCORES.THRESHOLD_HOT;
}

export function marketingleadIsWarm(score: number): boolean {
  return score >= MARKETINGLEAD.SCORES.THRESHOLD_WARM && score < MARKETINGLEAD.SCORES.THRESHOLD_HOT;
}

export function marketingleadIsCold(score: number): boolean {
  return score < MARKETINGLEAD.SCORES.THRESHOLD_WARM;
}
