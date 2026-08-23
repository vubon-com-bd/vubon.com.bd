/**
 * Analytics Campaign Constants
 * Marketing campaign tracking and management
 */

export const ANALYTICS_CAMPAIGN = {
  // Campaign Types
  TYPES: {
    // Marketing Campaigns
    BRAND_AWARENESS: 'brand_awareness',
    LEAD_GENERATION: 'lead_generation',
    SALES: 'sales',
    RETENTION: 'retention',
    LOYALTY: 'loyalty',
    REFERRAL: 'referral',

    // Promotional Campaigns
    DISCOUNT: 'discount',
    SEASONAL: 'seasonal',
    HOLIDAY: 'holiday',
    FLASH_SALE: 'flash_sale',
    CLEARANCE: 'clearance',

    // Content Campaigns
    CONTENT: 'content',
    EDUCATIONAL: 'educational',
    INFORMATIONAL: 'informational',
    ENGAGEMENT: 'engagement',

    // Digital Campaigns
    SEO: 'seo',
    SOCIAL: 'social',
    EMAIL: 'email',
    PAID_AD: 'paid_ad',
    DISPLAY_AD: 'display_ad',
    VIDEO_AD: 'video_ad',

    // Offline Campaigns
    EVENT: 'event',
    WEBINAR: 'webinar',
    WORKSHOP: 'workshop',
    TRADE_SHOW: 'trade_show',
    PRINT: 'print',
    TV: 'tv',
    RADIO: 'radio',
  } as const,

  // Campaign Status
  STATUS: {
    DRAFT: 'draft',
    PLANNED: 'planned',
    SCHEDULED: 'scheduled',
    LIVE: 'live',
    PAUSED: 'paused',
    COMPLETED: 'completed',
    CANCELLED: 'cancelled',
    ARCHIVED: 'archived',
  } as const,

  // Campaign Channels
  CHANNELS: {
    SEARCH: 'search',
    SOCIAL: 'social',
    EMAIL: 'email',
    DISPLAY: 'display',
    VIDEO: 'video',
    AFFILIATE: 'affiliate',
    INFLUENCER: 'influencer',
    CONTENT: 'content',
    PR: 'pr',
    EVENT: 'event',
    DIRECT_MAIL: 'direct_mail',
    TV: 'tv',
    RADIO: 'radio',
    PRINT: 'print',
    OUTDOOR: 'outdoor',
  } as const,

  // Campaign Objectives
  OBJECTIVES: {
    AWARENESS: 'awareness',
    CONSIDERATION: 'consideration',
    CONVERSION: 'conversion',
    RETENTION: 'retention',
    LOYALTY: 'loyalty',
    ADVOCACY: 'advocacy',
  } as const,

  // Campaign Budget Types
  BUDGET_TYPES: {
    TOTAL: 'total',
    DAILY: 'daily',
    WEEKLY: 'weekly',
    MONTHLY: 'monthly',
    FLEXIBLE: 'flexible',
  } as const,

  // Campaign ROI Status
  ROI_STATUS: {
    PROFITABLE: 'profitable',
    BREAK_EVEN: 'break_even',
    LOSS: 'loss',
    UNKNOWN: 'unknown',
  } as const,

  // Campaign Metrics
  METRICS: {
    IMPRESSIONS: 'impressions',
    CLICKS: 'clicks',
    CTR: 'ctr',
    CONVERSIONS: 'conversions',
    CONVERSION_RATE: 'conversion_rate',
    REVENUE: 'revenue',
    COST: 'cost',
    ROI: 'roi',
    ROAS: 'roas',
    CPA: 'cpa',
    CPL: 'cpl',
    CPC: 'cpc',
    CPM: 'cpm',
    LTV: 'ltv',
  } as const,

  // Campaign Priority
  PRIORITY: {
    CRITICAL: 'critical',
    HIGH: 'high',
    MEDIUM: 'medium',
    LOW: 'low',
  } as const,

  // Campaign Visibility
  VISIBILITY: {
    PUBLIC: 'public',
    INTERNAL: 'internal',
    TEAM: 'team',
    PRIVATE: 'private',
  } as const,
} as const;

// Analytics Campaign Types
export type AnalyticsCampaignType =
  (typeof ANALYTICS_CAMPAIGN.TYPES)[keyof typeof ANALYTICS_CAMPAIGN.TYPES];

// Analytics Campaign Status
export type AnalyticsCampaignStatus =
  (typeof ANALYTICS_CAMPAIGN.STATUS)[keyof typeof ANALYTICS_CAMPAIGN.STATUS];

// Analytics Campaign Channels
export type AnalyticsCampaignChannel =
  (typeof ANALYTICS_CAMPAIGN.CHANNELS)[keyof typeof ANALYTICS_CAMPAIGN.CHANNELS];

// Analytics Campaign Objectives
export type AnalyticsCampaignObjective =
  (typeof ANALYTICS_CAMPAIGN.OBJECTIVES)[keyof typeof ANALYTICS_CAMPAIGN.OBJECTIVES];

// Analytics Campaign Budget Types
export type AnalyticsCampaignBudgetType =
  (typeof ANALYTICS_CAMPAIGN.BUDGET_TYPES)[keyof typeof ANALYTICS_CAMPAIGN.BUDGET_TYPES];

// Analytics Campaign ROI Status
export type AnalyticsCampaignROIStatus =
  (typeof ANALYTICS_CAMPAIGN.ROI_STATUS)[keyof typeof ANALYTICS_CAMPAIGN.ROI_STATUS];

// Analytics Campaign Metrics
export type AnalyticsCampaignMetric =
  (typeof ANALYTICS_CAMPAIGN.METRICS)[keyof typeof ANALYTICS_CAMPAIGN.METRICS];

// Analytics Campaign Priority
export type AnalyticsCampaignPriority =
  (typeof ANALYTICS_CAMPAIGN.PRIORITY)[keyof typeof ANALYTICS_CAMPAIGN.PRIORITY];

// Analytics Campaign Visibility
export type AnalyticsCampaignVisibility =
  (typeof ANALYTICS_CAMPAIGN.VISIBILITY)[keyof typeof ANALYTICS_CAMPAIGN.VISIBILITY];

// Analytics Campaign Type Labels
export function getAnalyticsCampaignTypeLabel(type: AnalyticsCampaignType): string {
  const labels: Record<AnalyticsCampaignType, string> = {
    [ANALYTICS_CAMPAIGN.TYPES.BRAND_AWARENESS]: 'Brand Awareness',
    [ANALYTICS_CAMPAIGN.TYPES.LEAD_GENERATION]: 'Lead Generation',
    [ANALYTICS_CAMPAIGN.TYPES.SALES]: 'Sales',
    [ANALYTICS_CAMPAIGN.TYPES.RETENTION]: 'Retention',
    [ANALYTICS_CAMPAIGN.TYPES.LOYALTY]: 'Loyalty',
    [ANALYTICS_CAMPAIGN.TYPES.REFERRAL]: 'Referral',
    [ANALYTICS_CAMPAIGN.TYPES.DISCOUNT]: 'Discount',
    [ANALYTICS_CAMPAIGN.TYPES.SEASONAL]: 'Seasonal',
    [ANALYTICS_CAMPAIGN.TYPES.HOLIDAY]: 'Holiday',
    [ANALYTICS_CAMPAIGN.TYPES.FLASH_SALE]: 'Flash Sale',
    [ANALYTICS_CAMPAIGN.TYPES.CLEARANCE]: 'Clearance',
    [ANALYTICS_CAMPAIGN.TYPES.CONTENT]: 'Content',
    [ANALYTICS_CAMPAIGN.TYPES.EDUCATIONAL]: 'Educational',
    [ANALYTICS_CAMPAIGN.TYPES.INFORMATIONAL]: 'Informational',
    [ANALYTICS_CAMPAIGN.TYPES.ENGAGEMENT]: 'Engagement',
    [ANALYTICS_CAMPAIGN.TYPES.SEO]: 'SEO',
    [ANALYTICS_CAMPAIGN.TYPES.SOCIAL]: 'Social',
    [ANALYTICS_CAMPAIGN.TYPES.EMAIL]: 'Email',
    [ANALYTICS_CAMPAIGN.TYPES.PAID_AD]: 'Paid Ad',
    [ANALYTICS_CAMPAIGN.TYPES.DISPLAY_AD]: 'Display Ad',
    [ANALYTICS_CAMPAIGN.TYPES.VIDEO_AD]: 'Video Ad',
    [ANALYTICS_CAMPAIGN.TYPES.EVENT]: 'Event',
    [ANALYTICS_CAMPAIGN.TYPES.WEBINAR]: 'Webinar',
    [ANALYTICS_CAMPAIGN.TYPES.WORKSHOP]: 'Workshop',
    [ANALYTICS_CAMPAIGN.TYPES.TRADE_SHOW]: 'Trade Show',
    [ANALYTICS_CAMPAIGN.TYPES.PRINT]: 'Print',
    [ANALYTICS_CAMPAIGN.TYPES.TV]: 'TV',
    [ANALYTICS_CAMPAIGN.TYPES.RADIO]: 'Radio',
  };
  return labels[type] || 'Unknown';
}

// Analytics Campaign Status Labels
export function getAnalyticsCampaignStatusLabel(status: AnalyticsCampaignStatus): string {
  const labels: Record<AnalyticsCampaignStatus, string> = {
    [ANALYTICS_CAMPAIGN.STATUS.DRAFT]: 'Draft',
    [ANALYTICS_CAMPAIGN.STATUS.PLANNED]: 'Planned',
    [ANALYTICS_CAMPAIGN.STATUS.SCHEDULED]: 'Scheduled',
    [ANALYTICS_CAMPAIGN.STATUS.LIVE]: 'Live',
    [ANALYTICS_CAMPAIGN.STATUS.PAUSED]: 'Paused',
    [ANALYTICS_CAMPAIGN.STATUS.COMPLETED]: 'Completed',
    [ANALYTICS_CAMPAIGN.STATUS.CANCELLED]: 'Cancelled',
    [ANALYTICS_CAMPAIGN.STATUS.ARCHIVED]: 'Archived',
  };
  return labels[status] || 'Unknown';
}

// Analytics Campaign Channel Labels
export function getAnalyticsCampaignChannelLabel(channel: AnalyticsCampaignChannel): string {
  const labels: Record<AnalyticsCampaignChannel, string> = {
    [ANALYTICS_CAMPAIGN.CHANNELS.SEARCH]: 'Search',
    [ANALYTICS_CAMPAIGN.CHANNELS.SOCIAL]: 'Social',
    [ANALYTICS_CAMPAIGN.CHANNELS.EMAIL]: 'Email',
    [ANALYTICS_CAMPAIGN.CHANNELS.DISPLAY]: 'Display',
    [ANALYTICS_CAMPAIGN.CHANNELS.VIDEO]: 'Video',
    [ANALYTICS_CAMPAIGN.CHANNELS.AFFILIATE]: 'Affiliate',
    [ANALYTICS_CAMPAIGN.CHANNELS.INFLUENCER]: 'Influencer',
    [ANALYTICS_CAMPAIGN.CHANNELS.CONTENT]: 'Content',
    [ANALYTICS_CAMPAIGN.CHANNELS.PR]: 'PR',
    [ANALYTICS_CAMPAIGN.CHANNELS.EVENT]: 'Event',
    [ANALYTICS_CAMPAIGN.CHANNELS.DIRECT_MAIL]: 'Direct Mail',
    [ANALYTICS_CAMPAIGN.CHANNELS.TV]: 'TV',
    [ANALYTICS_CAMPAIGN.CHANNELS.RADIO]: 'Radio',
    [ANALYTICS_CAMPAIGN.CHANNELS.PRINT]: 'Print',
    [ANALYTICS_CAMPAIGN.CHANNELS.OUTDOOR]: 'Outdoor',
  };
  return labels[channel] || 'Unknown';
}

// Analytics Campaign Objective Labels
export function getAnalyticsCampaignObjectiveLabel(objective: AnalyticsCampaignObjective): string {
  const labels: Record<AnalyticsCampaignObjective, string> = {
    [ANALYTICS_CAMPAIGN.OBJECTIVES.AWARENESS]: 'Awareness',
    [ANALYTICS_CAMPAIGN.OBJECTIVES.CONSIDERATION]: 'Consideration',
    [ANALYTICS_CAMPAIGN.OBJECTIVES.CONVERSION]: 'Conversion',
    [ANALYTICS_CAMPAIGN.OBJECTIVES.RETENTION]: 'Retention',
    [ANALYTICS_CAMPAIGN.OBJECTIVES.LOYALTY]: 'Loyalty',
    [ANALYTICS_CAMPAIGN.OBJECTIVES.ADVOCACY]: 'Advocacy',
  };
  return labels[objective] || 'Unknown';
}

// Analytics Campaign ROI Status Labels
export function getAnalyticsCampaignROIStatusLabel(status: AnalyticsCampaignROIStatus): string {
  const labels: Record<AnalyticsCampaignROIStatus, string> = {
    [ANALYTICS_CAMPAIGN.ROI_STATUS.PROFITABLE]: 'Profitable',
    [ANALYTICS_CAMPAIGN.ROI_STATUS.BREAK_EVEN]: 'Break Even',
    [ANALYTICS_CAMPAIGN.ROI_STATUS.LOSS]: 'Loss',
    [ANALYTICS_CAMPAIGN.ROI_STATUS.UNKNOWN]: 'Unknown',
  };
  return labels[status] || 'Unknown';
}

// Analytics Campaign Metric Labels
export function getAnalyticsCampaignMetricLabel(metric: AnalyticsCampaignMetric): string {
  const labels: Record<AnalyticsCampaignMetric, string> = {
    [ANALYTICS_CAMPAIGN.METRICS.IMPRESSIONS]: 'Impressions',
    [ANALYTICS_CAMPAIGN.METRICS.CLICKS]: 'Clicks',
    [ANALYTICS_CAMPAIGN.METRICS.CTR]: 'CTR',
    [ANALYTICS_CAMPAIGN.METRICS.CONVERSIONS]: 'Conversions',
    [ANALYTICS_CAMPAIGN.METRICS.CONVERSION_RATE]: 'Conversion Rate',
    [ANALYTICS_CAMPAIGN.METRICS.REVENUE]: 'Revenue',
    [ANALYTICS_CAMPAIGN.METRICS.COST]: 'Cost',
    [ANALYTICS_CAMPAIGN.METRICS.ROI]: 'ROI',
    [ANALYTICS_CAMPAIGN.METRICS.ROAS]: 'ROAS',
    [ANALYTICS_CAMPAIGN.METRICS.CPA]: 'CPA',
    [ANALYTICS_CAMPAIGN.METRICS.CPL]: 'CPL',
    [ANALYTICS_CAMPAIGN.METRICS.CPC]: 'CPC',
    [ANALYTICS_CAMPAIGN.METRICS.CPM]: 'CPM',
    [ANALYTICS_CAMPAIGN.METRICS.LTV]: 'LTV',
  };
  return labels[metric] || 'Unknown';
}

// Analytics Campaign Priority Labels
export function getAnalyticsCampaignPriorityLabel(priority: AnalyticsCampaignPriority): string {
  const labels: Record<AnalyticsCampaignPriority, string> = {
    [ANALYTICS_CAMPAIGN.PRIORITY.CRITICAL]: 'Critical',
    [ANALYTICS_CAMPAIGN.PRIORITY.HIGH]: 'High',
    [ANALYTICS_CAMPAIGN.PRIORITY.MEDIUM]: 'Medium',
    [ANALYTICS_CAMPAIGN.PRIORITY.LOW]: 'Low',
  };
  return labels[priority] || 'Unknown';
}

// Check if campaign is active
export function isAnalyticsCampaignActive(status: AnalyticsCampaignStatus): boolean {
  return status === ANALYTICS_CAMPAIGN.STATUS.LIVE;
}

// Check if campaign is scheduled
export function isAnalyticsCampaignScheduled(status: AnalyticsCampaignStatus): boolean {
  return (
    status === ANALYTICS_CAMPAIGN.STATUS.SCHEDULED || status === ANALYTICS_CAMPAIGN.STATUS.PLANNED
  );
}

// Check if campaign is completed
export function isAnalyticsCampaignCompleted(status: AnalyticsCampaignStatus): boolean {
  return (
    status === ANALYTICS_CAMPAIGN.STATUS.COMPLETED ||
    status === ANALYTICS_CAMPAIGN.STATUS.CANCELLED ||
    status === ANALYTICS_CAMPAIGN.STATUS.ARCHIVED
  );
}

// Get campaign objective from type
export function getAnalyticsCampaignObjective(
  type: AnalyticsCampaignType
): AnalyticsCampaignObjective {
  const objectiveMap: Record<AnalyticsCampaignType, AnalyticsCampaignObjective> = {
    [ANALYTICS_CAMPAIGN.TYPES.BRAND_AWARENESS]: ANALYTICS_CAMPAIGN.OBJECTIVES.AWARENESS,
    [ANALYTICS_CAMPAIGN.TYPES.LEAD_GENERATION]: ANALYTICS_CAMPAIGN.OBJECTIVES.CONSIDERATION,
    [ANALYTICS_CAMPAIGN.TYPES.SALES]: ANALYTICS_CAMPAIGN.OBJECTIVES.CONVERSION,
    [ANALYTICS_CAMPAIGN.TYPES.RETENTION]: ANALYTICS_CAMPAIGN.OBJECTIVES.RETENTION,
    [ANALYTICS_CAMPAIGN.TYPES.LOYALTY]: ANALYTICS_CAMPAIGN.OBJECTIVES.LOYALTY,
    [ANALYTICS_CAMPAIGN.TYPES.REFERRAL]: ANALYTICS_CAMPAIGN.OBJECTIVES.ADVOCACY,
    [ANALYTICS_CAMPAIGN.TYPES.DISCOUNT]: ANALYTICS_CAMPAIGN.OBJECTIVES.CONVERSION,
    [ANALYTICS_CAMPAIGN.TYPES.SEASONAL]: ANALYTICS_CAMPAIGN.OBJECTIVES.CONSIDERATION,
    [ANALYTICS_CAMPAIGN.TYPES.HOLIDAY]: ANALYTICS_CAMPAIGN.OBJECTIVES.AWARENESS,
    [ANALYTICS_CAMPAIGN.TYPES.FLASH_SALE]: ANALYTICS_CAMPAIGN.OBJECTIVES.CONVERSION,
    [ANALYTICS_CAMPAIGN.TYPES.CLEARANCE]: ANALYTICS_CAMPAIGN.OBJECTIVES.CONVERSION,
    [ANALYTICS_CAMPAIGN.TYPES.CONTENT]: ANALYTICS_CAMPAIGN.OBJECTIVES.CONSIDERATION,
    [ANALYTICS_CAMPAIGN.TYPES.EDUCATIONAL]: ANALYTICS_CAMPAIGN.OBJECTIVES.CONSIDERATION,
    [ANALYTICS_CAMPAIGN.TYPES.INFORMATIONAL]: ANALYTICS_CAMPAIGN.OBJECTIVES.AWARENESS,
    [ANALYTICS_CAMPAIGN.TYPES.ENGAGEMENT]: ANALYTICS_CAMPAIGN.OBJECTIVES.AWARENESS,
    [ANALYTICS_CAMPAIGN.TYPES.SEO]: ANALYTICS_CAMPAIGN.OBJECTIVES.AWARENESS,
    [ANALYTICS_CAMPAIGN.TYPES.SOCIAL]: ANALYTICS_CAMPAIGN.OBJECTIVES.AWARENESS,
    [ANALYTICS_CAMPAIGN.TYPES.EMAIL]: ANALYTICS_CAMPAIGN.OBJECTIVES.CONSIDERATION,
    [ANALYTICS_CAMPAIGN.TYPES.PAID_AD]: ANALYTICS_CAMPAIGN.OBJECTIVES.CONVERSION,
    [ANALYTICS_CAMPAIGN.TYPES.DISPLAY_AD]: ANALYTICS_CAMPAIGN.OBJECTIVES.AWARENESS,
    [ANALYTICS_CAMPAIGN.TYPES.VIDEO_AD]: ANALYTICS_CAMPAIGN.OBJECTIVES.AWARENESS,
    [ANALYTICS_CAMPAIGN.TYPES.EVENT]: ANALYTICS_CAMPAIGN.OBJECTIVES.AWARENESS,
    [ANALYTICS_CAMPAIGN.TYPES.WEBINAR]: ANALYTICS_CAMPAIGN.OBJECTIVES.CONSIDERATION,
    [ANALYTICS_CAMPAIGN.TYPES.WORKSHOP]: ANALYTICS_CAMPAIGN.OBJECTIVES.CONSIDERATION,
    [ANALYTICS_CAMPAIGN.TYPES.TRADE_SHOW]: ANALYTICS_CAMPAIGN.OBJECTIVES.AWARENESS,
    [ANALYTICS_CAMPAIGN.TYPES.PRINT]: ANALYTICS_CAMPAIGN.OBJECTIVES.AWARENESS,
    [ANALYTICS_CAMPAIGN.TYPES.TV]: ANALYTICS_CAMPAIGN.OBJECTIVES.AWARENESS,
    [ANALYTICS_CAMPAIGN.TYPES.RADIO]: ANALYTICS_CAMPAIGN.OBJECTIVES.AWARENESS,
  };
  return objectiveMap[type] || ANALYTICS_CAMPAIGN.OBJECTIVES.AWARENESS;
}
