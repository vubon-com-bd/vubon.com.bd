/**
 * Lead Generation Type Constants
 * Type definitions and classifications for lead generation
 */

export const MARKETINGLEAD_TYPE = {
  // Lead Generation Categories
  CATEGORIES: {
    INBOUND: 'inbound',
    OUTBOUND: 'outbound',
    CONTENT: 'content',
    SOCIAL: 'social',
    SEARCH: 'search',
    DISPLAY: 'display',
    EMAIL: 'email',
    EVENT: 'event',
    REFERRAL: 'referral',
    PARTNERSHIP: 'partnership',
    DIRECT: 'direct',
    PHONE: 'phone',
    SMS: 'sms',
    CHAT: 'chat',
    WEBSITE: 'website',
    LANDING_PAGE: 'landing_page',
    GATED_CONTENT: 'gated_content',
    UNGATED_CONTENT: 'ungated_content',
  } as const,

  // Lead Generation Sub-Types
  SUB_TYPES: {
    // Inbound
    BLOG_SUBSCRIPTION: 'blog_subscription',
    NEWSLETTER_SUBSCRIPTION: 'newsletter_subscription',
    CONTENT_DOWNLOAD: 'content_download',
    WEBINAR_REGISTRATION: 'webinar_registration',
    EVENT_REGISTRATION: 'event_registration',
    FREE_TRIAL: 'free_trial',
    DEMO_REQUEST: 'demo_request',
    CONSULTATION: 'consultation',

    // Outbound
    COLD_EMAIL: 'cold_email',
    COLD_CALL: 'cold_call',
    DIRECT_MAIL: 'direct_mail',
    OUTBOUND_SMS: 'outbound_sms',
    OUTBOUND_SOCIAL: 'outbound_social',

    // Content
    EBOOK_DOWNLOAD: 'ebook_download',
    WHITE_PAPER_DOWNLOAD: 'white_paper_download',
    CASE_STUDY_DOWNLOAD: 'case_study_download',
    GUIDE_DOWNLOAD: 'guide_download',
    TEMPLATE_DOWNLOAD: 'template_download',
    CHECKLIST_DOWNLOAD: 'checklist_download',

    // Social
    SOCIAL_FOLLOW: 'social_follow',
    SOCIAL_ENGAGEMENT: 'social_engagement',
    SOCIAL_SHARE: 'social_share',
    SOCIAL_MENTION: 'social_mention',
    SOCIAL_MESSAGE: 'social_message',

    // Search
    ORGANIC_SEARCH: 'organic_search',
    PAID_SEARCH: 'paid_search',
    SEO_LANDING: 'seo_landing',
    SEM_LANDING: 'sem_landing',

    // Display
    DISPLAY_AD: 'display_ad',
    RETARGETING: 'retargeting',
    NATIVE_AD: 'native_ad',

    // Email
    EMAIL_CAMPAIGN: 'email_campaign',
    EMAIL_NEWSLETTER: 'email_newsletter',
    EMAIL_DIGEST: 'email_digest',

    // Event
    TRADE_SHOW: 'trade_show',
    CONFERENCE: 'conference',
    WORKSHOP: 'workshop',
    SEMINAR: 'seminar',
    NETWORKING: 'networking',
  } as const,

  // Lead Generation Strategies
  STRATEGIES: {
    PULL: 'pull',
    PUSH: 'push',
    HYBRID: 'hybrid',
    CONTENT_DRIVEN: 'content_driven',
    DATA_DRIVEN: 'data_driven',
    AI_DRIVEN: 'ai_driven',
    ACCOUNT_BASED: 'account_based',
    INBOUND: 'inbound',
    OUTBOUND: 'outbound',
  } as const,

  // Lead Generation Funnel Stages
  FUNNEL_STAGES: {
    AWARENESS: 'awareness',
    INTEREST: 'interest',
    CONSIDERATION: 'consideration',
    INTENT: 'intent',
    EVALUATION: 'evaluation',
    PURCHASE: 'purchase',
    LOYALTY: 'loyalty',
    ADVOCACY: 'advocacy',
  } as const,

  // Lead Generation Channels
  CHANNELS: {
    WEBSITE: 'website',
    LANDING_PAGE: 'landing_page',
    SOCIAL_MEDIA: 'social_media',
    SEARCH_ENGINE: 'search_engine',
    EMAIL: 'email',
    SMS: 'sms',
    PHONE: 'phone',
    CHAT: 'chat',
    WEBINAR: 'webinar',
    EVENT: 'event',
    REFERRAL: 'referral',
    PARTNERSHIP: 'partnership',
    DIRECT_MAIL: 'direct_mail',
    PAID_ADS: 'paid_ads',
    CONTENT: 'content',
    OTHER: 'other',
  } as const,
} as const;

// Lead Generation Categories
export type MarketingLeadCategoryType =
  (typeof MARKETINGLEAD_TYPE.CATEGORIES)[keyof typeof MARKETINGLEAD_TYPE.CATEGORIES];

// Lead Generation Sub-Types
export type MarketingLeadSubType =
  (typeof MARKETINGLEAD_TYPE.SUB_TYPES)[keyof typeof MARKETINGLEAD_TYPE.SUB_TYPES];

// Lead Generation Strategies
export type MarketingLeadStrategy =
  (typeof MARKETINGLEAD_TYPE.STRATEGIES)[keyof typeof MARKETINGLEAD_TYPE.STRATEGIES];

// Lead Generation Funnel Stages
export type MarketingLeadFunnelStage =
  (typeof MARKETINGLEAD_TYPE.FUNNEL_STAGES)[keyof typeof MARKETINGLEAD_TYPE.FUNNEL_STAGES];

// Lead Generation Channels
export type MarketingLeadChannelType =
  (typeof MARKETINGLEAD_TYPE.CHANNELS)[keyof typeof MARKETINGLEAD_TYPE.CHANNELS];

// Utility Functions
export function marketingleadGetCategoryLabel(category: MarketingLeadCategoryType): string {
  const labels: Record<MarketingLeadCategoryType, string> = {
    [MARKETINGLEAD_TYPE.CATEGORIES.INBOUND]: 'Inbound',
    [MARKETINGLEAD_TYPE.CATEGORIES.OUTBOUND]: 'Outbound',
    [MARKETINGLEAD_TYPE.CATEGORIES.CONTENT]: 'Content',
    [MARKETINGLEAD_TYPE.CATEGORIES.SOCIAL]: 'Social',
    [MARKETINGLEAD_TYPE.CATEGORIES.SEARCH]: 'Search',
    [MARKETINGLEAD_TYPE.CATEGORIES.DISPLAY]: 'Display',
    [MARKETINGLEAD_TYPE.CATEGORIES.EMAIL]: 'Email',
    [MARKETINGLEAD_TYPE.CATEGORIES.EVENT]: 'Event',
    [MARKETINGLEAD_TYPE.CATEGORIES.REFERRAL]: 'Referral',
    [MARKETINGLEAD_TYPE.CATEGORIES.PARTNERSHIP]: 'Partnership',
    [MARKETINGLEAD_TYPE.CATEGORIES.DIRECT]: 'Direct',
    [MARKETINGLEAD_TYPE.CATEGORIES.PHONE]: 'Phone',
    [MARKETINGLEAD_TYPE.CATEGORIES.SMS]: 'SMS',
    [MARKETINGLEAD_TYPE.CATEGORIES.CHAT]: 'Chat',
    [MARKETINGLEAD_TYPE.CATEGORIES.WEBSITE]: 'Website',
    [MARKETINGLEAD_TYPE.CATEGORIES.LANDING_PAGE]: 'Landing Page',
    [MARKETINGLEAD_TYPE.CATEGORIES.GATED_CONTENT]: 'Gated Content',
    [MARKETINGLEAD_TYPE.CATEGORIES.UNGATED_CONTENT]: 'Ungated Content',
  };
  return labels[category] || 'Unknown Category';
}

export function marketingleadGetSubTypeLabel(subType: MarketingLeadSubType): string {
  const labels: Record<MarketingLeadSubType, string> = {
    // Inbound
    [MARKETINGLEAD_TYPE.SUB_TYPES.BLOG_SUBSCRIPTION]: 'Blog Subscription',
    [MARKETINGLEAD_TYPE.SUB_TYPES.NEWSLETTER_SUBSCRIPTION]: 'Newsletter Subscription',
    [MARKETINGLEAD_TYPE.SUB_TYPES.CONTENT_DOWNLOAD]: 'Content Download',
    [MARKETINGLEAD_TYPE.SUB_TYPES.WEBINAR_REGISTRATION]: 'Webinar Registration',
    [MARKETINGLEAD_TYPE.SUB_TYPES.EVENT_REGISTRATION]: 'Event Registration',
    [MARKETINGLEAD_TYPE.SUB_TYPES.FREE_TRIAL]: 'Free Trial',
    [MARKETINGLEAD_TYPE.SUB_TYPES.DEMO_REQUEST]: 'Demo Request',
    [MARKETINGLEAD_TYPE.SUB_TYPES.CONSULTATION]: 'Consultation',

    // Outbound
    [MARKETINGLEAD_TYPE.SUB_TYPES.COLD_EMAIL]: 'Cold Email',
    [MARKETINGLEAD_TYPE.SUB_TYPES.COLD_CALL]: 'Cold Call',
    [MARKETINGLEAD_TYPE.SUB_TYPES.DIRECT_MAIL]: 'Direct Mail',
    [MARKETINGLEAD_TYPE.SUB_TYPES.OUTBOUND_SMS]: 'Outbound SMS',
    [MARKETINGLEAD_TYPE.SUB_TYPES.OUTBOUND_SOCIAL]: 'Outbound Social',

    // Content
    [MARKETINGLEAD_TYPE.SUB_TYPES.EBOOK_DOWNLOAD]: 'Ebook Download',
    [MARKETINGLEAD_TYPE.SUB_TYPES.WHITE_PAPER_DOWNLOAD]: 'White Paper Download',
    [MARKETINGLEAD_TYPE.SUB_TYPES.CASE_STUDY_DOWNLOAD]: 'Case Study Download',
    [MARKETINGLEAD_TYPE.SUB_TYPES.GUIDE_DOWNLOAD]: 'Guide Download',
    [MARKETINGLEAD_TYPE.SUB_TYPES.TEMPLATE_DOWNLOAD]: 'Template Download',
    [MARKETINGLEAD_TYPE.SUB_TYPES.CHECKLIST_DOWNLOAD]: 'Checklist Download',

    // Social
    [MARKETINGLEAD_TYPE.SUB_TYPES.SOCIAL_FOLLOW]: 'Social Follow',
    [MARKETINGLEAD_TYPE.SUB_TYPES.SOCIAL_ENGAGEMENT]: 'Social Engagement',
    [MARKETINGLEAD_TYPE.SUB_TYPES.SOCIAL_SHARE]: 'Social Share',
    [MARKETINGLEAD_TYPE.SUB_TYPES.SOCIAL_MENTION]: 'Social Mention',
    [MARKETINGLEAD_TYPE.SUB_TYPES.SOCIAL_MESSAGE]: 'Social Message',

    // Search
    [MARKETINGLEAD_TYPE.SUB_TYPES.ORGANIC_SEARCH]: 'Organic Search',
    [MARKETINGLEAD_TYPE.SUB_TYPES.PAID_SEARCH]: 'Paid Search',
    [MARKETINGLEAD_TYPE.SUB_TYPES.SEO_LANDING]: 'SEO Landing',
    [MARKETINGLEAD_TYPE.SUB_TYPES.SEM_LANDING]: 'SEM Landing',

    // Display
    [MARKETINGLEAD_TYPE.SUB_TYPES.DISPLAY_AD]: 'Display Ad',
    [MARKETINGLEAD_TYPE.SUB_TYPES.RETARGETING]: 'Retargeting',
    [MARKETINGLEAD_TYPE.SUB_TYPES.NATIVE_AD]: 'Native Ad',

    // Email
    [MARKETINGLEAD_TYPE.SUB_TYPES.EMAIL_CAMPAIGN]: 'Email Campaign',
    [MARKETINGLEAD_TYPE.SUB_TYPES.EMAIL_NEWSLETTER]: 'Email Newsletter',
    [MARKETINGLEAD_TYPE.SUB_TYPES.EMAIL_DIGEST]: 'Email Digest',

    // Event
    [MARKETINGLEAD_TYPE.SUB_TYPES.TRADE_SHOW]: 'Trade Show',
    [MARKETINGLEAD_TYPE.SUB_TYPES.CONFERENCE]: 'Conference',
    [MARKETINGLEAD_TYPE.SUB_TYPES.WORKSHOP]: 'Workshop',
    [MARKETINGLEAD_TYPE.SUB_TYPES.SEMINAR]: 'Seminar',
    [MARKETINGLEAD_TYPE.SUB_TYPES.NETWORKING]: 'Networking',
  };
  return labels[subType] || 'Unknown Sub-Type';
}

export function marketingleadGetStrategyLabel(strategy: MarketingLeadStrategy): string {
  const labels: Record<MarketingLeadStrategy, string> = {
    [MARKETINGLEAD_TYPE.STRATEGIES.PULL]: 'Pull',
    [MARKETINGLEAD_TYPE.STRATEGIES.PUSH]: 'Push',
    [MARKETINGLEAD_TYPE.STRATEGIES.HYBRID]: 'Hybrid',
    [MARKETINGLEAD_TYPE.STRATEGIES.CONTENT_DRIVEN]: 'Content Driven',
    [MARKETINGLEAD_TYPE.STRATEGIES.DATA_DRIVEN]: 'Data Driven',
    [MARKETINGLEAD_TYPE.STRATEGIES.AI_DRIVEN]: 'AI Driven',
    [MARKETINGLEAD_TYPE.STRATEGIES.ACCOUNT_BASED]: 'Account Based',
    [MARKETINGLEAD_TYPE.STRATEGIES.INBOUND]: 'Inbound',
    [MARKETINGLEAD_TYPE.STRATEGIES.OUTBOUND]: 'Outbound',
  };
  return labels[strategy] || 'Unknown Strategy';
}

export function marketingleadGetFunnelStageLabel(stage: MarketingLeadFunnelStage): string {
  const labels: Record<MarketingLeadFunnelStage, string> = {
    [MARKETINGLEAD_TYPE.FUNNEL_STAGES.AWARENESS]: 'Awareness',
    [MARKETINGLEAD_TYPE.FUNNEL_STAGES.INTEREST]: 'Interest',
    [MARKETINGLEAD_TYPE.FUNNEL_STAGES.CONSIDERATION]: 'Consideration',
    [MARKETINGLEAD_TYPE.FUNNEL_STAGES.INTENT]: 'Intent',
    [MARKETINGLEAD_TYPE.FUNNEL_STAGES.EVALUATION]: 'Evaluation',
    [MARKETINGLEAD_TYPE.FUNNEL_STAGES.PURCHASE]: 'Purchase',
    [MARKETINGLEAD_TYPE.FUNNEL_STAGES.LOYALTY]: 'Loyalty',
    [MARKETINGLEAD_TYPE.FUNNEL_STAGES.ADVOCACY]: 'Advocacy',
  };
  return labels[stage] || 'Unknown Funnel Stage';
}

export function marketingleadGetChannelLabel(channel: MarketingLeadChannelType): string {
  const labels: Record<MarketingLeadChannelType, string> = {
    [MARKETINGLEAD_TYPE.CHANNELS.WEBSITE]: 'Website',
    [MARKETINGLEAD_TYPE.CHANNELS.LANDING_PAGE]: 'Landing Page',
    [MARKETINGLEAD_TYPE.CHANNELS.SOCIAL_MEDIA]: 'Social Media',
    [MARKETINGLEAD_TYPE.CHANNELS.SEARCH_ENGINE]: 'Search Engine',
    [MARKETINGLEAD_TYPE.CHANNELS.EMAIL]: 'Email',
    [MARKETINGLEAD_TYPE.CHANNELS.SMS]: 'SMS',
    [MARKETINGLEAD_TYPE.CHANNELS.PHONE]: 'Phone',
    [MARKETINGLEAD_TYPE.CHANNELS.CHAT]: 'Chat',
    [MARKETINGLEAD_TYPE.CHANNELS.WEBINAR]: 'Webinar',
    [MARKETINGLEAD_TYPE.CHANNELS.EVENT]: 'Event',
    [MARKETINGLEAD_TYPE.CHANNELS.REFERRAL]: 'Referral',
    [MARKETINGLEAD_TYPE.CHANNELS.PARTNERSHIP]: 'Partnership',
    [MARKETINGLEAD_TYPE.CHANNELS.DIRECT_MAIL]: 'Direct Mail',
    [MARKETINGLEAD_TYPE.CHANNELS.PAID_ADS]: 'Paid Ads',
    [MARKETINGLEAD_TYPE.CHANNELS.CONTENT]: 'Content',
    [MARKETINGLEAD_TYPE.CHANNELS.OTHER]: 'Other',
  };
  return labels[channel] || 'Unknown Channel';
}

export function marketingleadIsInboundCategory(category: MarketingLeadCategoryType): boolean {
  const inboundCategories: MarketingLeadCategoryType[] = [
    MARKETINGLEAD_TYPE.CATEGORIES.INBOUND,
    MARKETINGLEAD_TYPE.CATEGORIES.CONTENT,
    MARKETINGLEAD_TYPE.CATEGORIES.SOCIAL,
    MARKETINGLEAD_TYPE.CATEGORIES.SEARCH,
    MARKETINGLEAD_TYPE.CATEGORIES.WEBSITE,
    MARKETINGLEAD_TYPE.CATEGORIES.LANDING_PAGE,
    MARKETINGLEAD_TYPE.CATEGORIES.GATED_CONTENT,
    MARKETINGLEAD_TYPE.CATEGORIES.UNGATED_CONTENT,
  ];
  return inboundCategories.includes(category);
}

export function marketingleadIsOutboundCategory(category: MarketingLeadCategoryType): boolean {
  const outboundCategories: MarketingLeadCategoryType[] = [
    MARKETINGLEAD_TYPE.CATEGORIES.OUTBOUND,
    MARKETINGLEAD_TYPE.CATEGORIES.DIRECT,
    MARKETINGLEAD_TYPE.CATEGORIES.PHONE,
  ];
  return outboundCategories.includes(category);
}

export function marketingleadIsEarlyFunnelStage(stage: MarketingLeadFunnelStage): boolean {
  const earlyStages: MarketingLeadFunnelStage[] = [
    MARKETINGLEAD_TYPE.FUNNEL_STAGES.AWARENESS,
    MARKETINGLEAD_TYPE.FUNNEL_STAGES.INTEREST,
  ];
  return earlyStages.includes(stage);
}

export function marketingleadIsMidFunnelStage(stage: MarketingLeadFunnelStage): boolean {
  const midStages: MarketingLeadFunnelStage[] = [
    MARKETINGLEAD_TYPE.FUNNEL_STAGES.CONSIDERATION,
    MARKETINGLEAD_TYPE.FUNNEL_STAGES.INTENT,
    MARKETINGLEAD_TYPE.FUNNEL_STAGES.EVALUATION,
  ];
  return midStages.includes(stage);
}

export function marketingleadIsLateFunnelStage(stage: MarketingLeadFunnelStage): boolean {
  const lateStages: MarketingLeadFunnelStage[] = [
    MARKETINGLEAD_TYPE.FUNNEL_STAGES.PURCHASE,
    MARKETINGLEAD_TYPE.FUNNEL_STAGES.LOYALTY,
    MARKETINGLEAD_TYPE.FUNNEL_STAGES.ADVOCACY,
  ];
  return lateStages.includes(stage);
}
