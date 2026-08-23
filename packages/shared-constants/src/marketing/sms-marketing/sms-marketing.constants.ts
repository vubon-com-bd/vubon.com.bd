/**
 * SMS Marketing Constants
 * Core SMS marketing configuration and settings
 */

export const MARKETINGSMS = {
  // SMS Types
  TYPES: {
    PROMOTIONAL: 'promotional',
    TRANSACTIONAL: 'transactional',
    OTP: 'otp',
    VERIFICATION: 'verification',
    ALERT: 'alert',
    NOTIFICATION: 'notification',
    REMINDER: 'reminder',
    WELCOME: 'welcome',
    ABANDONED_CART: 'abandoned_cart',
    ORDER_CONFIRMATION: 'order_confirmation',
    SHIPPING_UPDATE: 'shipping_update',
    DELIVERY_UPDATE: 'delivery_update',
    REVIEW_REQUEST: 'review_request',
    SURVEY: 'survey',
    REENGAGEMENT: 'reengagement',
    BIRTHDAY: 'birthday',
    ANNIVERSARY: 'anniversary',
    WIN_BACK: 'win_back',
    SEASONAL: 'seasonal',
    EVENT: 'event',
    PROMO_CODE: 'promo_code',
    COUPON: 'coupon',
    FLASH_SALE: 'flash_sale',
    CUSTOM: 'custom',
  } as const,

  // SMS Categories
  CATEGORIES: {
    MARKETING: 'marketing',
    TRANSACTIONAL: 'transactional',
    OPERATIONAL: 'operational',
    RELATIONAL: 'relational',
    PROMOTIONAL: 'promotional',
    INFORMATIONAL: 'informational',
    URGENT: 'urgent',
    SECURITY: 'security',
  } as const,

  // SMS Priorities
  PRIORITIES: {
    CRITICAL: 'critical',
    HIGH: 'high',
    MEDIUM: 'medium',
    LOW: 'low',
    BULK: 'bulk',
  } as const,

  // SMS Providers
  PROVIDERS: {
    TWILIO: 'twilio',
    VONAGE: 'vonage',
    PLIVO: 'plivo',
    TEXT_LOCAL: 'text_local',
    CLICKATELL: 'clickatell',
    MESSAGE_BIRD: 'message_bird',
    INFOBIP: 'infobip',
    SINCH: 'sinch',
    BULK_SMS: 'bulk_sms',
    CEQUENS: 'cequens',
    CUSTOM: 'custom',
  } as const,

  // SMS Sending Methods
  SENDING_METHODS: {
    API: 'api',
    SMPP: 'smpp',
    HTTP: 'http',
    WEBHOOK: 'webhook',
    BATCH: 'batch',
    TRIGGERED: 'triggered',
    SCHEDULED: 'scheduled',
    CAMPAIGN: 'campaign',
    AUTOMATION: 'automation',
  } as const,

  // SMS Tracking Types
  TRACKING_TYPES: {
    DELIVERED: 'delivered',
    FAILED: 'failed',
    SENT: 'sent',
    PENDING: 'pending',
    QUEUED: 'queued',
    UNDELIVERED: 'undelivered',
    EXPIRED: 'expired',
    REJECTED: 'rejected',
    DELIVERY_REPORT: 'delivery_report',
    OPT_OUT: 'opt_out',
  } as const,

  // SMS Engagements
  ENGAGEMENTS: {
    SENT: 'sent',
    DELIVERED: 'delivered',
    FAILED: 'failed',
    UNDELIVERED: 'undelivered',
    EXPIRED: 'expired',
    REJECTED: 'rejected',
    OPT_OUT: 'opt_out',
    CLICKED: 'clicked',
    REPLIED: 'replied',
  } as const,

  // SMS Defaults
  DEFAULTS: {
    DEFAULT_TYPE: 'promotional',
    DEFAULT_CATEGORY: 'marketing',
    DEFAULT_PRIORITY: 'medium',
    DEFAULT_PROVIDER: 'twilio',
    DEFAULT_SENDING_METHOD: 'api',
    DEFAULT_SENDER_ID: 'YourCompany',
    DEFAULT_COUNTRY_CODE: '+880',
    MAX_SMS_LENGTH: 160,
    MAX_SMS_SEGMENTS: 10,
    MAX_SMS_PER_DAY: 10000,
    MAX_SMS_PER_HOUR: 1000,
    MAX_SMS_PER_SECOND: 10,
    MAX_RECIPIENTS_PER_SMS: 1000,
    MAX_SEND_RETRIES: 3,
    RETRY_DELAY_MS: 5000,
    DEFAULT_VALIDITY_PERIOD: 1440, // minutes
    DEFAULT_OPT_OUT_MESSAGE: 'Reply STOP to unsubscribe',
    DEFAULT_OPT_IN_MESSAGE: 'Reply YES to subscribe',
  } as const,

  // SMS Limits
  LIMITS: {
    MIN_MESSAGE_LENGTH: 1,
    MAX_MESSAGE_LENGTH: 1600,
    MAX_SMS_SEGMENTS: 10,
    MIN_SMS_SEGMENTS: 1,
    MAX_RECIPIENTS: 1000,
    MAX_SMS_PER_REQUEST: 1000,
    MAX_CONCATENATED_SMS: 10,
    MAX_UNICODE_CHARACTERS: 70,
    MAX_GSM_CHARACTERS: 160,
    MAX_SEND_RETRIES: 5,
    MIN_RETRY_DELAY_MS: 1000,
    MAX_RETRY_DELAY_MS: 60000,
    MIN_VALIDITY_PERIOD: 5, // minutes
    MAX_VALIDITY_PERIOD: 4320, // minutes (3 days)
  } as const,
} as const;

// SMS Types
export type MarketingSMSType = (typeof MARKETINGSMS.TYPES)[keyof typeof MARKETINGSMS.TYPES];

// SMS Categories
export type MarketingSMSCategory =
  (typeof MARKETINGSMS.CATEGORIES)[keyof typeof MARKETINGSMS.CATEGORIES];

// SMS Priorities
export type MarketingSMSPriority =
  (typeof MARKETINGSMS.PRIORITIES)[keyof typeof MARKETINGSMS.PRIORITIES];

// SMS Providers
export type MarketingSMSProvider =
  (typeof MARKETINGSMS.PROVIDERS)[keyof typeof MARKETINGSMS.PROVIDERS];

// SMS Sending Methods
export type MarketingSMSSendingMethod =
  (typeof MARKETINGSMS.SENDING_METHODS)[keyof typeof MARKETINGSMS.SENDING_METHODS];

// SMS Tracking Types
export type MarketingSMSTrackingType =
  (typeof MARKETINGSMS.TRACKING_TYPES)[keyof typeof MARKETINGSMS.TRACKING_TYPES];

// SMS Engagements
export type MarketingSMSEngagement =
  (typeof MARKETINGSMS.ENGAGEMENTS)[keyof typeof MARKETINGSMS.ENGAGEMENTS];

// SMS Defaults
export type MarketingSMSDefault =
  (typeof MARKETINGSMS.DEFAULTS)[keyof typeof MARKETINGSMS.DEFAULTS];

// SMS Limits
export type MarketingSMSLimit = (typeof MARKETINGSMS.LIMITS)[keyof typeof MARKETINGSMS.LIMITS];

// Utility Functions
export function marketingsmsGetTypeLabel(type: MarketingSMSType): string {
  const labels: Record<MarketingSMSType, string> = {
    [MARKETINGSMS.TYPES.PROMOTIONAL]: 'Promotional',
    [MARKETINGSMS.TYPES.TRANSACTIONAL]: 'Transactional',
    [MARKETINGSMS.TYPES.OTP]: 'OTP',
    [MARKETINGSMS.TYPES.VERIFICATION]: 'Verification',
    [MARKETINGSMS.TYPES.ALERT]: 'Alert',
    [MARKETINGSMS.TYPES.NOTIFICATION]: 'Notification',
    [MARKETINGSMS.TYPES.REMINDER]: 'Reminder',
    [MARKETINGSMS.TYPES.WELCOME]: 'Welcome',
    [MARKETINGSMS.TYPES.ABANDONED_CART]: 'Abandoned Cart',
    [MARKETINGSMS.TYPES.ORDER_CONFIRMATION]: 'Order Confirmation',
    [MARKETINGSMS.TYPES.SHIPPING_UPDATE]: 'Shipping Update',
    [MARKETINGSMS.TYPES.DELIVERY_UPDATE]: 'Delivery Update',
    [MARKETINGSMS.TYPES.REVIEW_REQUEST]: 'Review Request',
    [MARKETINGSMS.TYPES.SURVEY]: 'Survey',
    [MARKETINGSMS.TYPES.REENGAGEMENT]: 'Re-engagement',
    [MARKETINGSMS.TYPES.BIRTHDAY]: 'Birthday',
    [MARKETINGSMS.TYPES.ANNIVERSARY]: 'Anniversary',
    [MARKETINGSMS.TYPES.WIN_BACK]: 'Win Back',
    [MARKETINGSMS.TYPES.SEASONAL]: 'Seasonal',
    [MARKETINGSMS.TYPES.EVENT]: 'Event',
    [MARKETINGSMS.TYPES.PROMO_CODE]: 'Promo Code',
    [MARKETINGSMS.TYPES.COUPON]: 'Coupon',
    [MARKETINGSMS.TYPES.FLASH_SALE]: 'Flash Sale',
    [MARKETINGSMS.TYPES.CUSTOM]: 'Custom SMS',
  };
  return labels[type] || 'Unknown SMS Type';
}

export function marketingsmsGetCategoryLabel(category: MarketingSMSCategory): string {
  const labels: Record<MarketingSMSCategory, string> = {
    [MARKETINGSMS.CATEGORIES.MARKETING]: 'Marketing',
    [MARKETINGSMS.CATEGORIES.TRANSACTIONAL]: 'Transactional',
    [MARKETINGSMS.CATEGORIES.OPERATIONAL]: 'Operational',
    [MARKETINGSMS.CATEGORIES.RELATIONAL]: 'Relational',
    [MARKETINGSMS.CATEGORIES.PROMOTIONAL]: 'Promotional',
    [MARKETINGSMS.CATEGORIES.INFORMATIONAL]: 'Informational',
    [MARKETINGSMS.CATEGORIES.URGENT]: 'Urgent',
    [MARKETINGSMS.CATEGORIES.SECURITY]: 'Security',
  };
  return labels[category] || 'Unknown Category';
}

export function marketingsmsGetPriorityLabel(priority: MarketingSMSPriority): string {
  const labels: Record<MarketingSMSPriority, string> = {
    [MARKETINGSMS.PRIORITIES.CRITICAL]: 'Critical',
    [MARKETINGSMS.PRIORITIES.HIGH]: 'High',
    [MARKETINGSMS.PRIORITIES.MEDIUM]: 'Medium',
    [MARKETINGSMS.PRIORITIES.LOW]: 'Low',
    [MARKETINGSMS.PRIORITIES.BULK]: 'Bulk',
  };
  return labels[priority] || 'Unknown Priority';
}

export function marketingsmsGetProviderLabel(provider: MarketingSMSProvider): string {
  const labels: Record<MarketingSMSProvider, string> = {
    [MARKETINGSMS.PROVIDERS.TWILIO]: 'Twilio',
    [MARKETINGSMS.PROVIDERS.VONAGE]: 'Vonage (Nexmo)',
    [MARKETINGSMS.PROVIDERS.PLIVO]: 'Plivo',
    [MARKETINGSMS.PROVIDERS.TEXT_LOCAL]: 'Text Local',
    [MARKETINGSMS.PROVIDERS.CLICKATELL]: 'Clickatell',
    [MARKETINGSMS.PROVIDERS.MESSAGE_BIRD]: 'Message Bird',
    [MARKETINGSMS.PROVIDERS.INFOBIP]: 'Infobip',
    [MARKETINGSMS.PROVIDERS.SINCH]: 'Sinch',
    [MARKETINGSMS.PROVIDERS.BULK_SMS]: 'Bulk SMS',
    [MARKETINGSMS.PROVIDERS.CEQUENS]: 'Cequens',
    [MARKETINGSMS.PROVIDERS.CUSTOM]: 'Custom Provider',
  };
  return labels[provider] || 'Unknown Provider';
}

export function marketingsmsGetSendingMethodLabel(method: MarketingSMSSendingMethod): string {
  const labels: Record<MarketingSMSSendingMethod, string> = {
    [MARKETINGSMS.SENDING_METHODS.API]: 'API',
    [MARKETINGSMS.SENDING_METHODS.SMPP]: 'SMPP',
    [MARKETINGSMS.SENDING_METHODS.HTTP]: 'HTTP',
    [MARKETINGSMS.SENDING_METHODS.WEBHOOK]: 'Webhook',
    [MARKETINGSMS.SENDING_METHODS.BATCH]: 'Batch',
    [MARKETINGSMS.SENDING_METHODS.TRIGGERED]: 'Triggered',
    [MARKETINGSMS.SENDING_METHODS.SCHEDULED]: 'Scheduled',
    [MARKETINGSMS.SENDING_METHODS.CAMPAIGN]: 'Campaign',
    [MARKETINGSMS.SENDING_METHODS.AUTOMATION]: 'Automation',
  };
  return labels[method] || 'Unknown Sending Method';
}

export function marketingsmsGetTrackingTypeLabel(trackingType: MarketingSMSTrackingType): string {
  const labels: Record<MarketingSMSTrackingType, string> = {
    [MARKETINGSMS.TRACKING_TYPES.DELIVERED]: 'Delivered',
    [MARKETINGSMS.TRACKING_TYPES.FAILED]: 'Failed',
    [MARKETINGSMS.TRACKING_TYPES.SENT]: 'Sent',
    [MARKETINGSMS.TRACKING_TYPES.PENDING]: 'Pending',
    [MARKETINGSMS.TRACKING_TYPES.QUEUED]: 'Queued',
    [MARKETINGSMS.TRACKING_TYPES.UNDELIVERED]: 'Undelivered',
    [MARKETINGSMS.TRACKING_TYPES.EXPIRED]: 'Expired',
    [MARKETINGSMS.TRACKING_TYPES.REJECTED]: 'Rejected',
    [MARKETINGSMS.TRACKING_TYPES.DELIVERY_REPORT]: 'Delivery Report',
    [MARKETINGSMS.TRACKING_TYPES.OPT_OUT]: 'Opt Out',
  };
  return labels[trackingType] || 'Unknown Tracking Type';
}

export function marketingsmsGetEngagementLabel(engagement: MarketingSMSEngagement): string {
  const labels: Record<MarketingSMSEngagement, string> = {
    [MARKETINGSMS.ENGAGEMENTS.SENT]: 'Sent',
    [MARKETINGSMS.ENGAGEMENTS.DELIVERED]: 'Delivered',
    [MARKETINGSMS.ENGAGEMENTS.FAILED]: 'Failed',
    [MARKETINGSMS.ENGAGEMENTS.UNDELIVERED]: 'Undelivered',
    [MARKETINGSMS.ENGAGEMENTS.EXPIRED]: 'Expired',
    [MARKETINGSMS.ENGAGEMENTS.REJECTED]: 'Rejected',
    [MARKETINGSMS.ENGAGEMENTS.OPT_OUT]: 'Opt Out',
    [MARKETINGSMS.ENGAGEMENTS.CLICKED]: 'Clicked',
    [MARKETINGSMS.ENGAGEMENTS.REPLIED]: 'Replied',
  };
  return labels[engagement] || 'Unknown Engagement';
}

export function marketingsmsIsTransactional(type: MarketingSMSType): boolean {
  const transactionalTypes: MarketingSMSType[] = [
    MARKETINGSMS.TYPES.TRANSACTIONAL,
    MARKETINGSMS.TYPES.OTP,
    MARKETINGSMS.TYPES.VERIFICATION,
    MARKETINGSMS.TYPES.ORDER_CONFIRMATION,
    MARKETINGSMS.TYPES.SHIPPING_UPDATE,
    MARKETINGSMS.TYPES.DELIVERY_UPDATE,
    MARKETINGSMS.TYPES.ALERT,
  ];
  return transactionalTypes.includes(type);
}

export function marketingsmsIsPromotional(type: MarketingSMSType): boolean {
  const promotionalTypes: MarketingSMSType[] = [
    MARKETINGSMS.TYPES.PROMOTIONAL,
    MARKETINGSMS.TYPES.PROMO_CODE,
    MARKETINGSMS.TYPES.COUPON,
    MARKETINGSMS.TYPES.FLASH_SALE,
    MARKETINGSMS.TYPES.SEASONAL,
    MARKETINGSMS.TYPES.EVENT,
  ];
  return promotionalTypes.includes(type);
}

export function marketingsmsIsRelational(type: MarketingSMSType): boolean {
  const relationalTypes: MarketingSMSType[] = [
    MARKETINGSMS.TYPES.WELCOME,
    MARKETINGSMS.TYPES.REENGAGEMENT,
    MARKETINGSMS.TYPES.WIN_BACK,
    MARKETINGSMS.TYPES.BIRTHDAY,
    MARKETINGSMS.TYPES.ANNIVERSARY,
  ];
  return relationalTypes.includes(type);
}

export function marketingsmsGetMaxSMSSegments(): number {
  return MARKETINGSMS.DEFAULTS.MAX_SMS_SEGMENTS;
}

export function marketingsmsGetDefaultSenderId(): string {
  return MARKETINGSMS.DEFAULTS.DEFAULT_SENDER_ID;
}

export function marketingsmsGetDefaultCountryCode(): string {
  return MARKETINGSMS.DEFAULTS.DEFAULT_COUNTRY_CODE;
}

export function marketingsmsGetDefaultValidityPeriod(): number {
  return MARKETINGSMS.DEFAULTS.DEFAULT_VALIDITY_PERIOD;
}

export function marketingsmsGetDefaultOptOutMessage(): string {
  return MARKETINGSMS.DEFAULTS.DEFAULT_OPT_OUT_MESSAGE;
}
