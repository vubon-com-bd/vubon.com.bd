/**
 * Email Marketing Constants
 * Core email marketing configuration and settings
 */

export const MARKETINGEMAIL = {
  // Email Types
  TYPES: {
    NEWSLETTER: 'newsletter',
    PROMOTIONAL: 'promotional',
    TRANSACTIONAL: 'transactional',
    WELCOME: 'welcome',
    ABANDONED_CART: 'abandoned_cart',
    ORDER_CONFIRMATION: 'order_confirmation',
    SHIPPING_CONFIRMATION: 'shipping_confirmation',
    DELIVERY_CONFIRMATION: 'delivery_confirmation',
    REVIEW_REQUEST: 'review_request',
    SURVEY: 'survey',
    REENGAGEMENT: 'reengagement',
    BIRTHDAY: 'birthday',
    ANNIVERSARY: 'anniversary',
    WIN_BACK: 'win_back',
    SEASONAL: 'seasonal',
    EVENT: 'event',
    WEBINAR: 'webinar',
    PRODUCT_UPDATE: 'product_update',
    PRICE_DROP: 'price_drop',
    BACK_IN_STOCK: 'back_in_stock',
    RECOMMENDATION: 'recommendation',
    EDUCATIONAL: 'educational',
    CASE_STUDY: 'case_study',
    CUSTOM: 'custom',
  } as const,

  // Email Categories
  CATEGORIES: {
    MARKETING: 'marketing',
    TRANSACTIONAL: 'transactional',
    OPERATIONAL: 'operational',
    RELATIONAL: 'relational',
    PROMOTIONAL: 'promotional',
    INFORMATIONAL: 'informational',
  } as const,

  // Email Priorities
  PRIORITIES: {
    CRITICAL: 'critical',
    HIGH: 'high',
    MEDIUM: 'medium',
    LOW: 'low',
    BULK: 'bulk',
  } as const,

  // Email Providers
  PROVIDERS: {
    SENDGRID: 'sendgrid',
    MAILCHIMP: 'mailchimp',
    BREVO: 'brevo',
    SES: 'ses',
    POSTMARK: 'postmark',
    MAILGUN: 'mailgun',
    SPARKPOST: 'sparkpost',
    ZOHO: 'zoho',
    ACTIVE_CAMPAIGN: 'active_campaign',
    KLICKTIPP: 'klicktipp',
    CUSTOM: 'custom',
  } as const,

  // Email Sending Methods
  SENDING_METHODS: {
    SMTP: 'smtp',
    API: 'api',
    WEBHOOK: 'webhook',
    BATCH: 'batch',
    TRIGGERED: 'triggered',
    SCHEDULED: 'scheduled',
    CAMPAIGN: 'campaign',
    AUTOMATION: 'automation',
  } as const,

  // Email Tracking Types
  TRACKING_TYPES: {
    OPENS: 'opens',
    CLICKS: 'clicks',
    BOUNCES: 'bounces',
    SPAM: 'spam',
    UNSUBSCRIBES: 'unsubscribes',
    COMPLAINTS: 'complaints',
    DELIVERIES: 'deliveries',
    REJECTIONS: 'rejections',
    ENGAGEMENT: 'engagement',
    CONVERSIONS: 'conversions',
  } as const,

  // Email Engagements
  ENGAGEMENTS: {
    OPENED: 'opened',
    CLICKED: 'clicked',
    REPLIED: 'replied',
    FORWARDED: 'forwarded',
    SPAM_REPORTED: 'spam_reported',
    UNSUBSCRIBED: 'unsubscribed',
    BOUNCED: 'bounced',
    DELIVERED: 'delivered',
    DEFERRED: 'deferred',
    PROCESSED: 'processed',
  } as const,

  // Email Defaults
  DEFAULTS: {
    DEFAULT_TYPE: 'newsletter',
    DEFAULT_CATEGORY: 'marketing',
    DEFAULT_PRIORITY: 'medium',
    DEFAULT_PROVIDER: 'sendgrid',
    DEFAULT_SENDING_METHOD: 'api',
    DEFAULT_FROM_NAME: 'Your Company',
    DEFAULT_FROM_EMAIL: 'noreply@yourcompany.com',
    DEFAULT_SUBJECT_LINE: 'Latest Updates',
    DEFAULT_TRACKING_ENABLED: true,
    DEFAULT_OPEN_TRACKING: true,
    DEFAULT_CLICK_TRACKING: true,
    DEFAULT_UNSUBSCRIBE_LINK: true,
    DEFAULT_BRANDING: true,
    DEFAULT_SEND_TIME: '09:00',
    MAX_EMAILS_PER_DAY: 10000,
    MAX_EMAILS_PER_HOUR: 1000,
    MAX_RECIPIENTS_PER_EMAIL: 1000,
    MAX_ATTACHMENT_SIZE_MB: 10,
    MAX_EMAIL_SIZE_MB: 25,
  } as const,

  // Email Limits
  LIMITS: {
    MIN_SUBJECT_LENGTH: 3,
    MAX_SUBJECT_LENGTH: 100,
    MIN_BODY_LENGTH: 10,
    MAX_BODY_LENGTH: 1000000,
    MAX_RECIPIENTS: 1000,
    MAX_ATTACHMENTS: 10,
    MAX_ATTACHMENT_SIZE_MB: 10,
    MAX_EMAIL_SIZE_MB: 25,
    MAX_SEND_RETRIES: 3,
    MAX_TAGS_PER_EMAIL: 20,
    MAX_VARIABLES_PER_EMAIL: 50,
    MAX_EMAILS_PER_SEGMENT: 50000,
  } as const,
} as const;

// Email Types
export type MarketingEmailType = (typeof MARKETINGEMAIL.TYPES)[keyof typeof MARKETINGEMAIL.TYPES];

// Email Categories
export type MarketingEmailCategory =
  (typeof MARKETINGEMAIL.CATEGORIES)[keyof typeof MARKETINGEMAIL.CATEGORIES];

// Email Priorities
export type MarketingEmailPriority =
  (typeof MARKETINGEMAIL.PRIORITIES)[keyof typeof MARKETINGEMAIL.PRIORITIES];

// Email Providers
export type MarketingEmailProvider =
  (typeof MARKETINGEMAIL.PROVIDERS)[keyof typeof MARKETINGEMAIL.PROVIDERS];

// Email Sending Methods
export type MarketingEmailSendingMethod =
  (typeof MARKETINGEMAIL.SENDING_METHODS)[keyof typeof MARKETINGEMAIL.SENDING_METHODS];

// Email Tracking Types
export type MarketingEmailTrackingType =
  (typeof MARKETINGEMAIL.TRACKING_TYPES)[keyof typeof MARKETINGEMAIL.TRACKING_TYPES];

// Email Engagements
export type MarketingEmailEngagement =
  (typeof MARKETINGEMAIL.ENGAGEMENTS)[keyof typeof MARKETINGEMAIL.ENGAGEMENTS];

// Email Defaults
export type MarketingEmailDefault =
  (typeof MARKETINGEMAIL.DEFAULTS)[keyof typeof MARKETINGEMAIL.DEFAULTS];

// Email Limits
export type MarketingEmailLimit =
  (typeof MARKETINGEMAIL.LIMITS)[keyof typeof MARKETINGEMAIL.LIMITS];

// Utility Functions
export function marketingemailGetTypeLabel(type: MarketingEmailType): string {
  const labels: Record<MarketingEmailType, string> = {
    [MARKETINGEMAIL.TYPES.NEWSLETTER]: 'Newsletter',
    [MARKETINGEMAIL.TYPES.PROMOTIONAL]: 'Promotional',
    [MARKETINGEMAIL.TYPES.TRANSACTIONAL]: 'Transactional',
    [MARKETINGEMAIL.TYPES.WELCOME]: 'Welcome',
    [MARKETINGEMAIL.TYPES.ABANDONED_CART]: 'Abandoned Cart',
    [MARKETINGEMAIL.TYPES.ORDER_CONFIRMATION]: 'Order Confirmation',
    [MARKETINGEMAIL.TYPES.SHIPPING_CONFIRMATION]: 'Shipping Confirmation',
    [MARKETINGEMAIL.TYPES.DELIVERY_CONFIRMATION]: 'Delivery Confirmation',
    [MARKETINGEMAIL.TYPES.REVIEW_REQUEST]: 'Review Request',
    [MARKETINGEMAIL.TYPES.SURVEY]: 'Survey',
    [MARKETINGEMAIL.TYPES.REENGAGEMENT]: 'Re-engagement',
    [MARKETINGEMAIL.TYPES.BIRTHDAY]: 'Birthday',
    [MARKETINGEMAIL.TYPES.ANNIVERSARY]: 'Anniversary',
    [MARKETINGEMAIL.TYPES.WIN_BACK]: 'Win Back',
    [MARKETINGEMAIL.TYPES.SEASONAL]: 'Seasonal',
    [MARKETINGEMAIL.TYPES.EVENT]: 'Event',
    [MARKETINGEMAIL.TYPES.WEBINAR]: 'Webinar',
    [MARKETINGEMAIL.TYPES.PRODUCT_UPDATE]: 'Product Update',
    [MARKETINGEMAIL.TYPES.PRICE_DROP]: 'Price Drop',
    [MARKETINGEMAIL.TYPES.BACK_IN_STOCK]: 'Back in Stock',
    [MARKETINGEMAIL.TYPES.RECOMMENDATION]: 'Recommendation',
    [MARKETINGEMAIL.TYPES.EDUCATIONAL]: 'Educational',
    [MARKETINGEMAIL.TYPES.CASE_STUDY]: 'Case Study',
    [MARKETINGEMAIL.TYPES.CUSTOM]: 'Custom Email',
  };
  return labels[type] || 'Unknown Email Type';
}

export function marketingemailGetCategoryLabel(category: MarketingEmailCategory): string {
  const labels: Record<MarketingEmailCategory, string> = {
    [MARKETINGEMAIL.CATEGORIES.MARKETING]: 'Marketing',
    [MARKETINGEMAIL.CATEGORIES.TRANSACTIONAL]: 'Transactional',
    [MARKETINGEMAIL.CATEGORIES.OPERATIONAL]: 'Operational',
    [MARKETINGEMAIL.CATEGORIES.RELATIONAL]: 'Relational',
    [MARKETINGEMAIL.CATEGORIES.PROMOTIONAL]: 'Promotional',
    [MARKETINGEMAIL.CATEGORIES.INFORMATIONAL]: 'Informational',
  };
  return labels[category] || 'Unknown Category';
}

export function marketingemailGetPriorityLabel(priority: MarketingEmailPriority): string {
  const labels: Record<MarketingEmailPriority, string> = {
    [MARKETINGEMAIL.PRIORITIES.CRITICAL]: 'Critical',
    [MARKETINGEMAIL.PRIORITIES.HIGH]: 'High',
    [MARKETINGEMAIL.PRIORITIES.MEDIUM]: 'Medium',
    [MARKETINGEMAIL.PRIORITIES.LOW]: 'Low',
    [MARKETINGEMAIL.PRIORITIES.BULK]: 'Bulk',
  };
  return labels[priority] || 'Unknown Priority';
}

export function marketingemailGetProviderLabel(provider: MarketingEmailProvider): string {
  const labels: Record<MarketingEmailProvider, string> = {
    [MARKETINGEMAIL.PROVIDERS.SENDGRID]: 'SendGrid',
    [MARKETINGEMAIL.PROVIDERS.MAILCHIMP]: 'Mailchimp',
    [MARKETINGEMAIL.PROVIDERS.BREVO]: 'Brevo (Sendinblue)',
    [MARKETINGEMAIL.PROVIDERS.SES]: 'Amazon SES',
    [MARKETINGEMAIL.PROVIDERS.POSTMARK]: 'Postmark',
    [MARKETINGEMAIL.PROVIDERS.MAILGUN]: 'Mailgun',
    [MARKETINGEMAIL.PROVIDERS.SPARKPOST]: 'SparkPost',
    [MARKETINGEMAIL.PROVIDERS.ZOHO]: 'Zoho',
    [MARKETINGEMAIL.PROVIDERS.ACTIVE_CAMPAIGN]: 'Active Campaign',
    [MARKETINGEMAIL.PROVIDERS.KLICKTIPP]: 'KlickTipp',
    [MARKETINGEMAIL.PROVIDERS.CUSTOM]: 'Custom Provider',
  };
  return labels[provider] || 'Unknown Provider';
}

export function marketingemailGetSendingMethodLabel(method: MarketingEmailSendingMethod): string {
  const labels: Record<MarketingEmailSendingMethod, string> = {
    [MARKETINGEMAIL.SENDING_METHODS.SMTP]: 'SMTP',
    [MARKETINGEMAIL.SENDING_METHODS.API]: 'API',
    [MARKETINGEMAIL.SENDING_METHODS.WEBHOOK]: 'Webhook',
    [MARKETINGEMAIL.SENDING_METHODS.BATCH]: 'Batch',
    [MARKETINGEMAIL.SENDING_METHODS.TRIGGERED]: 'Triggered',
    [MARKETINGEMAIL.SENDING_METHODS.SCHEDULED]: 'Scheduled',
    [MARKETINGEMAIL.SENDING_METHODS.CAMPAIGN]: 'Campaign',
    [MARKETINGEMAIL.SENDING_METHODS.AUTOMATION]: 'Automation',
  };
  return labels[method] || 'Unknown Sending Method';
}

export function marketingemailGetTrackingTypeLabel(
  trackingType: MarketingEmailTrackingType
): string {
  const labels: Record<MarketingEmailTrackingType, string> = {
    [MARKETINGEMAIL.TRACKING_TYPES.OPENS]: 'Opens',
    [MARKETINGEMAIL.TRACKING_TYPES.CLICKS]: 'Clicks',
    [MARKETINGEMAIL.TRACKING_TYPES.BOUNCES]: 'Bounces',
    [MARKETINGEMAIL.TRACKING_TYPES.SPAM]: 'Spam Reports',
    [MARKETINGEMAIL.TRACKING_TYPES.UNSUBSCRIBES]: 'Unsubscribes',
    [MARKETINGEMAIL.TRACKING_TYPES.COMPLAINTS]: 'Complaints',
    [MARKETINGEMAIL.TRACKING_TYPES.DELIVERIES]: 'Deliveries',
    [MARKETINGEMAIL.TRACKING_TYPES.REJECTIONS]: 'Rejections',
    [MARKETINGEMAIL.TRACKING_TYPES.ENGAGEMENT]: 'Engagement',
    [MARKETINGEMAIL.TRACKING_TYPES.CONVERSIONS]: 'Conversions',
  };
  return labels[trackingType] || 'Unknown Tracking Type';
}

export function marketingemailGetEngagementLabel(engagement: MarketingEmailEngagement): string {
  const labels: Record<MarketingEmailEngagement, string> = {
    [MARKETINGEMAIL.ENGAGEMENTS.OPENED]: 'Opened',
    [MARKETINGEMAIL.ENGAGEMENTS.CLICKED]: 'Clicked',
    [MARKETINGEMAIL.ENGAGEMENTS.REPLIED]: 'Replied',
    [MARKETINGEMAIL.ENGAGEMENTS.FORWARDED]: 'Forwarded',
    [MARKETINGEMAIL.ENGAGEMENTS.SPAM_REPORTED]: 'Spam Reported',
    [MARKETINGEMAIL.ENGAGEMENTS.UNSUBSCRIBED]: 'Unsubscribed',
    [MARKETINGEMAIL.ENGAGEMENTS.BOUNCED]: 'Bounced',
    [MARKETINGEMAIL.ENGAGEMENTS.DELIVERED]: 'Delivered',
    [MARKETINGEMAIL.ENGAGEMENTS.DEFERRED]: 'Deferred',
    [MARKETINGEMAIL.ENGAGEMENTS.PROCESSED]: 'Processed',
  };
  return labels[engagement] || 'Unknown Engagement';
}

export function marketingemailIsTransactional(type: MarketingEmailType): boolean {
  const transactionalTypes: MarketingEmailType[] = [
    MARKETINGEMAIL.TYPES.ORDER_CONFIRMATION,
    MARKETINGEMAIL.TYPES.SHIPPING_CONFIRMATION,
    MARKETINGEMAIL.TYPES.DELIVERY_CONFIRMATION,
    MARKETINGEMAIL.TYPES.TRANSACTIONAL,
  ];
  return transactionalTypes.includes(type);
}

export function marketingemailIsPromotional(type: MarketingEmailType): boolean {
  const promotionalTypes: MarketingEmailType[] = [
    MARKETINGEMAIL.TYPES.PROMOTIONAL,
    MARKETINGEMAIL.TYPES.PRICE_DROP,
    MARKETINGEMAIL.TYPES.BACK_IN_STOCK,
    MARKETINGEMAIL.TYPES.SEASONAL,
    MARKETINGEMAIL.TYPES.EVENT,
  ];
  return promotionalTypes.includes(type);
}

export function marketingemailIsEngagementEmail(type: MarketingEmailType): boolean {
  const engagementTypes: MarketingEmailType[] = [
    MARKETINGEMAIL.TYPES.WELCOME,
    MARKETINGEMAIL.TYPES.REENGAGEMENT,
    MARKETINGEMAIL.TYPES.WIN_BACK,
    MARKETINGEMAIL.TYPES.BIRTHDAY,
    MARKETINGEMAIL.TYPES.ANNIVERSARY,
  ];
  return engagementTypes.includes(type);
}

export function marketingemailGetDefaultFromName(): string {
  return MARKETINGEMAIL.DEFAULTS.DEFAULT_FROM_NAME;
}

export function marketingemailGetDefaultFromEmail(): string {
  return MARKETINGEMAIL.DEFAULTS.DEFAULT_FROM_EMAIL;
}

export function marketingemailGetDefaultSendTime(): string {
  return MARKETINGEMAIL.DEFAULTS.DEFAULT_SEND_TIME;
}
