/**
 * Marketing Constants
 * Configuration for marketing campaigns, promotions, and channels
 */

export const MARKETING = {
  // Marketing Channels
  CHANNELS: {
    EMAIL: 'email',
    SMS: 'sms',
    SOCIAL_MEDIA: 'social_media',
    SEARCH_ENGINE: 'search_engine',
    DISPLAY_ADS: 'display_ads',
    AFFILIATE: 'affiliate',
    REFERRAL: 'referral',
    INFLUENCER: 'influencer',
    CONTENT: 'content',
    VIDEO: 'video',
    PODCAST: 'podcast',
    WEBINAR: 'webinar',
    EVENT: 'event',
    PR: 'pr',
    DIRECT: 'direct',
    OTHER: 'other',
  } as const,

  // Campaign Types
  CAMPAIGN_TYPES: {
    BRAND_AWARENESS: 'brand_awareness',
    LEAD_GENERATION: 'lead_generation',
    CONVERSION: 'conversion',
    RETENTION: 'retention',
    REENGAGEMENT: 'reengagement',
    LOYALTY: 'loyalty',
    REFERRAL: 'referral',
    SEASONAL: 'seasonal',
    HOLIDAY: 'holiday',
    LAUNCH: 'launch',
    PROMOTIONAL: 'promotional',
    EDUCATIONAL: 'educational',
    EVENT: 'event',
    CONTEST: 'contest',
    GIVEAWAY: 'giveaway',
  } as const,

  // Marketing Objectives
  OBJECTIVES: {
    AWARENESS: 'awareness',
    CONSIDERATION: 'consideration',
    CONVERSION: 'conversion',
    LOYALTY: 'loyalty',
    ADVOCACY: 'advocacy',
    RETENTION: 'retention',
    REVENUE: 'revenue',
    GROWTH: 'growth',
    ENGAGEMENT: 'engagement',
    COMMUNITY: 'community',
  } as const,

  // Audience Types
  AUDIENCE_TYPES: {
    ALL: 'all',
    NEW_CUSTOMERS: 'new_customers',
    RETURNING_CUSTOMERS: 'returning_customers',
    HIGH_VALUE: 'high_value',
    LOW_VALUE: 'low_value',
    INACTIVE: 'inactive',
    ACTIVE: 'active',
    BY_SEGMENT: 'by_segment',
    BY_LOCATION: 'by_location',
    BY_BEHAVIOR: 'by_behavior',
    BY_INTEREST: 'by_interest',
    LOOKALIKE: 'lookalike',
    CUSTOM: 'custom',
  } as const,

  // Budget Types
  BUDGET_TYPES: {
    FIXED: 'fixed',
    VARIABLE: 'variable',
    PERCENTAGE_OF_REVENUE: 'percentage_of_revenue',
    DYNAMIC: 'dynamic',
  } as const,

  // Bidding Strategies
  BIDDING_STRATEGIES: {
    MANUAL: 'manual',
    AUTOMATIC: 'automatic',
    TARGET_CPA: 'target_cpa',
    TARGET_ROAS: 'target_roas',
    MAXIMIZE_CLICKS: 'maximize_clicks',
    MAXIMIZE_CONVERSIONS: 'maximize_conversions',
    ENHANCED_CPC: 'enhanced_cpc',
  } as const,

  // Attribution Models
  ATTRIBUTION_MODELS: {
    FIRST_TOUCH: 'first_touch',
    LAST_TOUCH: 'last_touch',
    LINEAR: 'linear',
    TIME_DECAY: 'time_decay',
    POSITION_BASED: 'position_based',
    DATA_DRIVEN: 'data_driven',
    MULTI_TOUCH: 'multi_touch',
  } as const,

  // Campaign Statuses
  CAMPAIGN_STATUSES: {
    DRAFT: 'draft',
    PENDING_APPROVAL: 'pending_approval',
    APPROVED: 'approved',
    REJECTED: 'rejected',
    SCHEDULED: 'scheduled',
    ACTIVE: 'active',
    PAUSED: 'paused',
    COMPLETED: 'completed',
    CANCELLED: 'cancelled',
    ARCHIVED: 'archived',
  } as const,

  // Marketing Metrics
  METRICS: {
    IMPRESSIONS: 'impressions',
    REACH: 'reach',
    CLICKS: 'clicks',
    CLICK_THROUGH_RATE: 'click_through_rate',
    CONVERSIONS: 'conversions',
    CONVERSION_RATE: 'conversion_rate',
    COST_PER_CLICK: 'cost_per_click',
    COST_PER_ACQUISITION: 'cost_per_acquisition',
    RETURN_ON_AD_SPEND: 'return_on_ad_spend',
    LIFETIME_VALUE: 'lifetime_value',
    CUSTOMER_ACQUISITION_COST: 'customer_acquisition_cost',
    ENGAGEMENT_RATE: 'engagement_rate',
    BOUNCE_RATE: 'bounce_rate',
    AVERAGE_ORDER_VALUE: 'average_order_value',
    REVENUE: 'revenue',
    PROFIT: 'profit',
  } as const,

  // Marketing Automation Triggers
  TRIGGERS: {
    // User Actions
    USER_REGISTERED: 'user_registered',
    USER_LOGGED_IN: 'user_logged_in',
    USER_LOGGED_OUT: 'user_logged_out',
    USER_VIEWED_PRODUCT: 'user_viewed_product',
    USER_ADDED_TO_CART: 'user_added_to_cart',
    USER_REMOVED_FROM_CART: 'user_removed_from_cart',
    USER_CHECKOUT: 'user_checkout',
    USER_PURCHASED: 'user_purchased',
    USER_REFUNDED: 'user_refunded',
    USER_REVIEWED: 'user_reviewed',
    USER_SUBSCRIBED: 'user_subscribed',
    USER_UNSUBSCRIBED: 'user_unsubscribed',

    // Time Based
    BIRTHDAY: 'birthday',
    ANNIVERSARY: 'anniversary',
    DATE: 'date',

    // Behavioral
    CART_ABANDONED: 'cart_abandoned',
    BROWSED_PRODUCT: 'browsed_product',
    SEARCHED_QUERY: 'searched_query',
    SPENT_AMOUNT: 'spent_amount',
    ORDER_COUNT: 'order_count',

    // Custom
    CUSTOM: 'custom',
  } as const,

  // Marketing Automation Actions
  ACTIONS: {
    SEND_EMAIL: 'send_email',
    SEND_SMS: 'send_sms',
    SEND_PUSH: 'send_push',
    SEND_NOTIFICATION: 'send_notification',
    APPLY_DISCOUNT: 'apply_discount',
    APPLY_COUPON: 'apply_coupon',
    SEND_WELCOME: 'send_welcome',
    SEND_FOLLOWUP: 'send_followup',
    SEND_REMINDER: 'send_reminder',
    SEND_RECOMMENDATION: 'send_recommendation',
    CREATE_TASK: 'create_task',
    UPDATE_SEGMENT: 'update_segment',
    TRACK_EVENT: 'track_event',
    WEBHOOK: 'webhook',
  } as const,

  // Marketing Permissions
  PERMISSIONS: {
    VIEW_CAMPAIGNS: 'view_campaigns',
    CREATE_CAMPAIGNS: 'create_campaigns',
    EDIT_CAMPAIGNS: 'edit_campaigns',
    DELETE_CAMPAIGNS: 'delete_campaigns',
    APPROVE_CAMPAIGNS: 'approve_campaigns',
    VIEW_ANALYTICS: 'view_analytics',
    VIEW_REPORTS: 'view_reports',
    MANAGE_BUDGET: 'manage_budget',
    MANAGE_AUDIENCE: 'manage_audience',
    MANAGE_AUTOMATION: 'manage_automation',
    EXPORT_DATA: 'export_data',
  } as const,

  // Marketing Error Types
  ERROR_TYPES: {
    CAMPAIGN_NOT_FOUND: 'campaign_not_found',
    CAMPAIGN_EXPIRED: 'campaign_expired',
    BUDGET_EXCEEDED: 'budget_exceeded',
    AUDIENCE_EMPTY: 'audience_empty',
    APPROVAL_REQUIRED: 'approval_required',
    PERMISSION_DENIED: 'permission_denied',
    INVALID_TARGETING: 'invalid_targeting',
    DUPLICATE_CAMPAIGN: 'duplicate_campaign',
    SCHEDULE_CONFLICT: 'schedule_conflict',
    INTEGRATION_ERROR: 'integration_error',
  } as const,

  // Marketing Defaults
  DEFAULTS: {
    DEFAULT_BUDGET: 1000,
    MIN_BUDGET: 100,
    MAX_BUDGET: 100000,
    DEFAULT_DURATION_DAYS: 30,
    MIN_DURATION_DAYS: 1,
    MAX_DURATION_DAYS: 365,
    DEFAULT_CTR_TARGET: 0.02,
    DEFAULT_CONVERSION_TARGET: 0.03,
    DEFAULT_ROAS_TARGET: 3.0,
    MAX_EMAIL_SEND_LIMIT: 10000,
    MAX_SMS_SEND_LIMIT: 5000,
  } as const,
} as const;

// Marketing Channels
export type MarketingChannel = (typeof MARKETING.CHANNELS)[keyof typeof MARKETING.CHANNELS];

// Campaign Types
export type MarketingCampaignType =
  (typeof MARKETING.CAMPAIGN_TYPES)[keyof typeof MARKETING.CAMPAIGN_TYPES];

// Marketing Objectives
export type MarketingObjective = (typeof MARKETING.OBJECTIVES)[keyof typeof MARKETING.OBJECTIVES];

// Audience Types
export type MarketingAudienceType =
  (typeof MARKETING.AUDIENCE_TYPES)[keyof typeof MARKETING.AUDIENCE_TYPES];

// Budget Types
export type MarketingBudgetType =
  (typeof MARKETING.BUDGET_TYPES)[keyof typeof MARKETING.BUDGET_TYPES];

// Bidding Strategies
export type MarketingBiddingStrategy =
  (typeof MARKETING.BIDDING_STRATEGIES)[keyof typeof MARKETING.BIDDING_STRATEGIES];

// Attribution Models
export type MarketingAttributionModel =
  (typeof MARKETING.ATTRIBUTION_MODELS)[keyof typeof MARKETING.ATTRIBUTION_MODELS];

// Campaign Statuses
export type MarketingCampaignStatus =
  (typeof MARKETING.CAMPAIGN_STATUSES)[keyof typeof MARKETING.CAMPAIGN_STATUSES];

// Marketing Metrics
export type MarketingMetric = (typeof MARKETING.METRICS)[keyof typeof MARKETING.METRICS];

// Marketing Automation Triggers
export type MarketingTrigger = (typeof MARKETING.TRIGGERS)[keyof typeof MARKETING.TRIGGERS];

// Marketing Automation Actions
export type MarketingAction = (typeof MARKETING.ACTIONS)[keyof typeof MARKETING.ACTIONS];

// Marketing Permissions
export type MarketingPermission =
  (typeof MARKETING.PERMISSIONS)[keyof typeof MARKETING.PERMISSIONS];

// Marketing Error Types
export type MarketingErrorType = (typeof MARKETING.ERROR_TYPES)[keyof typeof MARKETING.ERROR_TYPES];

// Marketing Defaults
export type MarketingDefault = (typeof MARKETING.DEFAULTS)[keyof typeof MARKETING.DEFAULTS];

// Utility Functions
export function getMarketingChannelLabel(channel: MarketingChannel): string {
  const labels: Record<MarketingChannel, string> = {
    [MARKETING.CHANNELS.EMAIL]: 'Email',
    [MARKETING.CHANNELS.SMS]: 'SMS',
    [MARKETING.CHANNELS.SOCIAL_MEDIA]: 'Social Media',
    [MARKETING.CHANNELS.SEARCH_ENGINE]: 'Search Engine',
    [MARKETING.CHANNELS.DISPLAY_ADS]: 'Display Ads',
    [MARKETING.CHANNELS.AFFILIATE]: 'Affiliate',
    [MARKETING.CHANNELS.REFERRAL]: 'Referral',
    [MARKETING.CHANNELS.INFLUENCER]: 'Influencer',
    [MARKETING.CHANNELS.CONTENT]: 'Content',
    [MARKETING.CHANNELS.VIDEO]: 'Video',
    [MARKETING.CHANNELS.PODCAST]: 'Podcast',
    [MARKETING.CHANNELS.WEBINAR]: 'Webinar',
    [MARKETING.CHANNELS.EVENT]: 'Event',
    [MARKETING.CHANNELS.PR]: 'Public Relations',
    [MARKETING.CHANNELS.DIRECT]: 'Direct',
    [MARKETING.CHANNELS.OTHER]: 'Other',
  };
  return labels[channel] || 'Unknown Channel';
}

export function getMarketingCampaignTypeLabel(campaignType: MarketingCampaignType): string {
  const labels: Record<MarketingCampaignType, string> = {
    [MARKETING.CAMPAIGN_TYPES.BRAND_AWARENESS]: 'Brand Awareness',
    [MARKETING.CAMPAIGN_TYPES.LEAD_GENERATION]: 'Lead Generation',
    [MARKETING.CAMPAIGN_TYPES.CONVERSION]: 'Conversion',
    [MARKETING.CAMPAIGN_TYPES.RETENTION]: 'Retention',
    [MARKETING.CAMPAIGN_TYPES.REENGAGEMENT]: 'Re-engagement',
    [MARKETING.CAMPAIGN_TYPES.LOYALTY]: 'Loyalty',
    [MARKETING.CAMPAIGN_TYPES.REFERRAL]: 'Referral',
    [MARKETING.CAMPAIGN_TYPES.SEASONAL]: 'Seasonal',
    [MARKETING.CAMPAIGN_TYPES.HOLIDAY]: 'Holiday',
    [MARKETING.CAMPAIGN_TYPES.LAUNCH]: 'Product Launch',
    [MARKETING.CAMPAIGN_TYPES.PROMOTIONAL]: 'Promotional',
    [MARKETING.CAMPAIGN_TYPES.EDUCATIONAL]: 'Educational',
    [MARKETING.CAMPAIGN_TYPES.EVENT]: 'Event',
    [MARKETING.CAMPAIGN_TYPES.CONTEST]: 'Contest',
    [MARKETING.CAMPAIGN_TYPES.GIVEAWAY]: 'Giveaway',
  };
  return labels[campaignType] || 'Unknown Campaign Type';
}

export function getMarketingObjectiveLabel(objective: MarketingObjective): string {
  const labels: Record<MarketingObjective, string> = {
    [MARKETING.OBJECTIVES.AWARENESS]: 'Awareness',
    [MARKETING.OBJECTIVES.CONSIDERATION]: 'Consideration',
    [MARKETING.OBJECTIVES.CONVERSION]: 'Conversion',
    [MARKETING.OBJECTIVES.LOYALTY]: 'Loyalty',
    [MARKETING.OBJECTIVES.ADVOCACY]: 'Advocacy',
    [MARKETING.OBJECTIVES.RETENTION]: 'Retention',
    [MARKETING.OBJECTIVES.REVENUE]: 'Revenue',
    [MARKETING.OBJECTIVES.GROWTH]: 'Growth',
    [MARKETING.OBJECTIVES.ENGAGEMENT]: 'Engagement',
    [MARKETING.OBJECTIVES.COMMUNITY]: 'Community',
  };
  return labels[objective] || 'Unknown Objective';
}

export function getMarketingAudienceTypeLabel(audienceType: MarketingAudienceType): string {
  const labels: Record<MarketingAudienceType, string> = {
    [MARKETING.AUDIENCE_TYPES.ALL]: 'All Customers',
    [MARKETING.AUDIENCE_TYPES.NEW_CUSTOMERS]: 'New Customers',
    [MARKETING.AUDIENCE_TYPES.RETURNING_CUSTOMERS]: 'Returning Customers',
    [MARKETING.AUDIENCE_TYPES.HIGH_VALUE]: 'High Value',
    [MARKETING.AUDIENCE_TYPES.LOW_VALUE]: 'Low Value',
    [MARKETING.AUDIENCE_TYPES.INACTIVE]: 'Inactive',
    [MARKETING.AUDIENCE_TYPES.ACTIVE]: 'Active',
    [MARKETING.AUDIENCE_TYPES.BY_SEGMENT]: 'By Segment',
    [MARKETING.AUDIENCE_TYPES.BY_LOCATION]: 'By Location',
    [MARKETING.AUDIENCE_TYPES.BY_BEHAVIOR]: 'By Behavior',
    [MARKETING.AUDIENCE_TYPES.BY_INTEREST]: 'By Interest',
    [MARKETING.AUDIENCE_TYPES.LOOKALIKE]: 'Lookalike Audience',
    [MARKETING.AUDIENCE_TYPES.CUSTOM]: 'Custom Audience',
  };
  return labels[audienceType] || 'Unknown Audience Type';
}

export function getMarketingCampaignStatusLabel(status: MarketingCampaignStatus): string {
  const labels: Record<MarketingCampaignStatus, string> = {
    [MARKETING.CAMPAIGN_STATUSES.DRAFT]: 'Draft',
    [MARKETING.CAMPAIGN_STATUSES.PENDING_APPROVAL]: 'Pending Approval',
    [MARKETING.CAMPAIGN_STATUSES.APPROVED]: 'Approved',
    [MARKETING.CAMPAIGN_STATUSES.REJECTED]: 'Rejected',
    [MARKETING.CAMPAIGN_STATUSES.SCHEDULED]: 'Scheduled',
    [MARKETING.CAMPAIGN_STATUSES.ACTIVE]: 'Active',
    [MARKETING.CAMPAIGN_STATUSES.PAUSED]: 'Paused',
    [MARKETING.CAMPAIGN_STATUSES.COMPLETED]: 'Completed',
    [MARKETING.CAMPAIGN_STATUSES.CANCELLED]: 'Cancelled',
    [MARKETING.CAMPAIGN_STATUSES.ARCHIVED]: 'Archived',
  };
  return labels[status] || 'Unknown Status';
}

export function getMarketingMetricLabel(metric: MarketingMetric): string {
  const labels: Record<MarketingMetric, string> = {
    [MARKETING.METRICS.IMPRESSIONS]: 'Impressions',
    [MARKETING.METRICS.REACH]: 'Reach',
    [MARKETING.METRICS.CLICKS]: 'Clicks',
    [MARKETING.METRICS.CLICK_THROUGH_RATE]: 'Click-Through Rate',
    [MARKETING.METRICS.CONVERSIONS]: 'Conversions',
    [MARKETING.METRICS.CONVERSION_RATE]: 'Conversion Rate',
    [MARKETING.METRICS.COST_PER_CLICK]: 'Cost Per Click',
    [MARKETING.METRICS.COST_PER_ACQUISITION]: 'Cost Per Acquisition',
    [MARKETING.METRICS.RETURN_ON_AD_SPEND]: 'Return on Ad Spend',
    [MARKETING.METRICS.LIFETIME_VALUE]: 'Lifetime Value',
    [MARKETING.METRICS.CUSTOMER_ACQUISITION_COST]: 'Customer Acquisition Cost',
    [MARKETING.METRICS.ENGAGEMENT_RATE]: 'Engagement Rate',
    [MARKETING.METRICS.BOUNCE_RATE]: 'Bounce Rate',
    [MARKETING.METRICS.AVERAGE_ORDER_VALUE]: 'Average Order Value',
    [MARKETING.METRICS.REVENUE]: 'Revenue',
    [MARKETING.METRICS.PROFIT]: 'Profit',
  };
  return labels[metric] || 'Unknown Metric';
}

export function getMarketingTriggerLabel(trigger: MarketingTrigger): string {
  const labels: Record<MarketingTrigger, string> = {
    [MARKETING.TRIGGERS.USER_REGISTERED]: 'User Registered',
    [MARKETING.TRIGGERS.USER_LOGGED_IN]: 'User Logged In',
    [MARKETING.TRIGGERS.USER_LOGGED_OUT]: 'User Logged Out',
    [MARKETING.TRIGGERS.USER_VIEWED_PRODUCT]: 'User Viewed Product',
    [MARKETING.TRIGGERS.USER_ADDED_TO_CART]: 'User Added to Cart',
    [MARKETING.TRIGGERS.USER_REMOVED_FROM_CART]: 'User Removed from Cart',
    [MARKETING.TRIGGERS.USER_CHECKOUT]: 'User Checkout',
    [MARKETING.TRIGGERS.USER_PURCHASED]: 'User Purchased',
    [MARKETING.TRIGGERS.USER_REFUNDED]: 'User Refunded',
    [MARKETING.TRIGGERS.USER_REVIEWED]: 'User Reviewed',
    [MARKETING.TRIGGERS.USER_SUBSCRIBED]: 'User Subscribed',
    [MARKETING.TRIGGERS.USER_UNSUBSCRIBED]: 'User Unsubscribed',
    [MARKETING.TRIGGERS.BIRTHDAY]: 'Birthday',
    [MARKETING.TRIGGERS.ANNIVERSARY]: 'Anniversary',
    [MARKETING.TRIGGERS.DATE]: 'Specific Date',
    [MARKETING.TRIGGERS.CART_ABANDONED]: 'Cart Abandoned',
    [MARKETING.TRIGGERS.BROWSED_PRODUCT]: 'Browsed Product',
    [MARKETING.TRIGGERS.SEARCHED_QUERY]: 'Searched Query',
    [MARKETING.TRIGGERS.SPENT_AMOUNT]: 'Spent Amount',
    [MARKETING.TRIGGERS.ORDER_COUNT]: 'Order Count',
    [MARKETING.TRIGGERS.CUSTOM]: 'Custom Trigger',
  };
  return labels[trigger] || 'Unknown Trigger';
}

export function getMarketingActionLabel(action: MarketingAction): string {
  const labels: Record<MarketingAction, string> = {
    [MARKETING.ACTIONS.SEND_EMAIL]: 'Send Email',
    [MARKETING.ACTIONS.SEND_SMS]: 'Send SMS',
    [MARKETING.ACTIONS.SEND_PUSH]: 'Send Push Notification',
    [MARKETING.ACTIONS.SEND_NOTIFICATION]: 'Send Notification',
    [MARKETING.ACTIONS.APPLY_DISCOUNT]: 'Apply Discount',
    [MARKETING.ACTIONS.APPLY_COUPON]: 'Apply Coupon',
    [MARKETING.ACTIONS.SEND_WELCOME]: 'Send Welcome Message',
    [MARKETING.ACTIONS.SEND_FOLLOWUP]: 'Send Follow-up',
    [MARKETING.ACTIONS.SEND_REMINDER]: 'Send Reminder',
    [MARKETING.ACTIONS.SEND_RECOMMENDATION]: 'Send Recommendation',
    [MARKETING.ACTIONS.CREATE_TASK]: 'Create Task',
    [MARKETING.ACTIONS.UPDATE_SEGMENT]: 'Update Segment',
    [MARKETING.ACTIONS.TRACK_EVENT]: 'Track Event',
    [MARKETING.ACTIONS.WEBHOOK]: 'Webhook',
  };
  return labels[action] || 'Unknown Action';
}

export function getMarketingErrorLabel(errorType: MarketingErrorType): string {
  const labels: Record<MarketingErrorType, string> = {
    [MARKETING.ERROR_TYPES.CAMPAIGN_NOT_FOUND]: 'Campaign Not Found',
    [MARKETING.ERROR_TYPES.CAMPAIGN_EXPIRED]: 'Campaign Expired',
    [MARKETING.ERROR_TYPES.BUDGET_EXCEEDED]: 'Budget Exceeded',
    [MARKETING.ERROR_TYPES.AUDIENCE_EMPTY]: 'Audience Empty',
    [MARKETING.ERROR_TYPES.APPROVAL_REQUIRED]: 'Approval Required',
    [MARKETING.ERROR_TYPES.PERMISSION_DENIED]: 'Permission Denied',
    [MARKETING.ERROR_TYPES.INVALID_TARGETING]: 'Invalid Targeting',
    [MARKETING.ERROR_TYPES.DUPLICATE_CAMPAIGN]: 'Duplicate Campaign',
    [MARKETING.ERROR_TYPES.SCHEDULE_CONFLICT]: 'Schedule Conflict',
    [MARKETING.ERROR_TYPES.INTEGRATION_ERROR]: 'Integration Error',
  };
  return labels[errorType] || 'Unknown Error';
}

export function getMarketingAttributionModelLabel(model: MarketingAttributionModel): string {
  const labels: Record<MarketingAttributionModel, string> = {
    [MARKETING.ATTRIBUTION_MODELS.FIRST_TOUCH]: 'First Touch',
    [MARKETING.ATTRIBUTION_MODELS.LAST_TOUCH]: 'Last Touch',
    [MARKETING.ATTRIBUTION_MODELS.LINEAR]: 'Linear',
    [MARKETING.ATTRIBUTION_MODELS.TIME_DECAY]: 'Time Decay',
    [MARKETING.ATTRIBUTION_MODELS.POSITION_BASED]: 'Position Based',
    [MARKETING.ATTRIBUTION_MODELS.DATA_DRIVEN]: 'Data Driven',
    [MARKETING.ATTRIBUTION_MODELS.MULTI_TOUCH]: 'Multi-Touch',
  };
  return labels[model] || 'Unknown Model';
}

export function isCampaignActive(status: MarketingCampaignStatus): boolean {
  return status === MARKETING.CAMPAIGN_STATUSES.ACTIVE;
}

export function isCampaignEditable(status: MarketingCampaignStatus): boolean {
  const editableStatuses: MarketingCampaignStatus[] = [
    MARKETING.CAMPAIGN_STATUSES.DRAFT,
    MARKETING.CAMPAIGN_STATUSES.PENDING_APPROVAL,
    MARKETING.CAMPAIGN_STATUSES.REJECTED,
  ];
  return editableStatuses.includes(status);
}

export function isCampaignEnded(status: MarketingCampaignStatus): boolean {
  const endedStatuses: MarketingCampaignStatus[] = [
    MARKETING.CAMPAIGN_STATUSES.COMPLETED,
    MARKETING.CAMPAIGN_STATUSES.CANCELLED,
    MARKETING.CAMPAIGN_STATUSES.ARCHIVED,
  ];
  return endedStatuses.includes(status);
}
