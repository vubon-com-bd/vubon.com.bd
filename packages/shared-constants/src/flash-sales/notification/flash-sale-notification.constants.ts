/**
 * Flash Sale Notification Constants
 * Configuration for flash sale notifications and alerts
 */

export const FLASH_SALE_NOTIFICATION = {
  // Notification Types
  TYPES: {
    START: 'start',
    END: 'end',
    REMINDER: 'reminder',
    UPDATE: 'update',
    CANCELLED: 'cancelled',
    EXTENDED: 'extended',
    SOLD_OUT: 'sold_out',
    BACK_IN_STOCK: 'back_in_stock',
    PRICE_DROP: 'price_drop',
    LIMITED_STOCK: 'limited_stock',
    DEAL_AVAILABLE: 'deal_available',
    DEAL_EXPIRING: 'deal_expiring',
    NEW_PRODUCT: 'new_product',
    PROMOTIONAL: 'promotional',
    URGENT: 'urgent',
    CUSTOM: 'custom',
  },

  // Notification Channels
  CHANNELS: {
    EMAIL: 'email',
    SMS: 'sms',
    PUSH: 'push',
    IN_APP: 'in_app',
    WEBHOOK: 'webhook',
    DASHBOARD: 'dashboard',
    SLACK: 'slack',
    TELEGRAM: 'telegram',
    WHATSAPP: 'whatsapp',
  },

  // Notification Priorities
  PRIORITIES: {
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high',
    CRITICAL: 'critical',
  },

  // Notification Templates
  TEMPLATES: {
    SALE_START: 'sale_start',
    SALE_END: 'sale_end',
    SALE_REMINDER: 'sale_reminder',
    SOLD_OUT: 'sold_out',
    BACK_IN_STOCK: 'back_in_stock',
    PRICE_DROP: 'price_drop',
    LIMITED_STOCK_ALERT: 'limited_stock_alert',
    DEAL_AVAILABLE: 'deal_available',
    DEAL_EXPIRING: 'deal_expiring',
    NEW_PRODUCT_ALERT: 'new_product_alert',
    PROMOTIONAL_OFFER: 'promotional_offer',
    URGENT_ACTION: 'urgent_action',
    CUSTOM: 'custom',
  },

  // Notification Timing
  TIMING: {
    IMMEDIATE: 'immediate',
    SCHEDULED: 'scheduled',
    DELAYED: 'delayed',
    RECURRING: 'recurring',
    BEFORE_SALE: 'before_sale',
    DURING_SALE: 'during_sale',
    AFTER_SALE: 'after_sale',
  },

  // Notification Frequency
  FREQUENCY: {
    ONE_TIME: 'one_time',
    HOURLY: 'hourly',
    DAILY: 'daily',
    WEEKLY: 'weekly',
    MONTHLY: 'monthly',
    REAL_TIME: 'real_time',
  },

  // Notification Audience
  AUDIENCE: {
    ALL: 'all',
    REGISTERED: 'registered',
    PARTICIPANTS: 'participants',
    INTERESTED: 'interested',
    VIP: 'vip',
    MEMBERS: 'members',
    SUBSCRIBERS: 'subscribers',
    CUSTOM: 'custom',
  },

  // Notification Defaults
  DEFAULTS: {
    CHANNEL: 'email',
    PRIORITY: 'medium',
    TIMING: 'immediate',
    FREQUENCY: 'one_time',
    MAX_RETRIES: 3,
    RETRY_DELAY_MINUTES: 5,
    EXPIRY_HOURS: 24,
    BATCH_SIZE: 100,
  },

  // Notification Limits
  LIMITS: {
    MAX_RECIPIENTS: 10000,
    MAX_ATTACHMENTS: 5,
    MAX_TEMPLATE_SIZE: 50000,
    MAX_SUBJECT_LENGTH: 200,
    MAX_BODY_LENGTH: 10000,
    MAX_RETRIES: 5,
    MAX_NOTIFICATIONS_PER_DAY: 1000,
  },

  // Notification Validation
  VALIDATION: {
    MIN_SUBJECT_LENGTH: 3,
    MAX_SUBJECT_LENGTH: 200,
    MIN_BODY_LENGTH: 10,
    MAX_BODY_LENGTH: 10000,
    MIN_SCHEDULE_HOURS: 1,
    MAX_SCHEDULE_DAYS: 30,
  },
} as const;

// Notification Types
export type FlashSaleNotificationType =
  (typeof FLASH_SALE_NOTIFICATION.TYPES)[keyof typeof FLASH_SALE_NOTIFICATION.TYPES];

// Notification Channels
export type FlashSaleNotificationChannel =
  (typeof FLASH_SALE_NOTIFICATION.CHANNELS)[keyof typeof FLASH_SALE_NOTIFICATION.CHANNELS];

// Notification Priorities
export type FlashSaleNotificationPriority =
  (typeof FLASH_SALE_NOTIFICATION.PRIORITIES)[keyof typeof FLASH_SALE_NOTIFICATION.PRIORITIES];

// Notification Templates
export type FlashSaleNotificationTemplate =
  (typeof FLASH_SALE_NOTIFICATION.TEMPLATES)[keyof typeof FLASH_SALE_NOTIFICATION.TEMPLATES];

// Notification Timing
export type FlashSaleNotificationTiming =
  (typeof FLASH_SALE_NOTIFICATION.TIMING)[keyof typeof FLASH_SALE_NOTIFICATION.TIMING];

// Notification Frequency
export type FlashSaleNotificationFrequency =
  (typeof FLASH_SALE_NOTIFICATION.FREQUENCY)[keyof typeof FLASH_SALE_NOTIFICATION.FREQUENCY];

// Notification Audience
export type FlashSaleNotificationAudience =
  (typeof FLASH_SALE_NOTIFICATION.AUDIENCE)[keyof typeof FLASH_SALE_NOTIFICATION.AUDIENCE];

// Utility Functions
export function flashsalesNotificationGetTypeLabel(type: FlashSaleNotificationType): string {
  const labels: Record<FlashSaleNotificationType, string> = {
    [FLASH_SALE_NOTIFICATION.TYPES.START]: 'Sale Started',
    [FLASH_SALE_NOTIFICATION.TYPES.END]: 'Sale Ended',
    [FLASH_SALE_NOTIFICATION.TYPES.REMINDER]: 'Reminder',
    [FLASH_SALE_NOTIFICATION.TYPES.UPDATE]: 'Sale Updated',
    [FLASH_SALE_NOTIFICATION.TYPES.CANCELLED]: 'Sale Cancelled',
    [FLASH_SALE_NOTIFICATION.TYPES.EXTENDED]: 'Sale Extended',
    [FLASH_SALE_NOTIFICATION.TYPES.SOLD_OUT]: 'Sold Out',
    [FLASH_SALE_NOTIFICATION.TYPES.BACK_IN_STOCK]: 'Back in Stock',
    [FLASH_SALE_NOTIFICATION.TYPES.PRICE_DROP]: 'Price Drop',
    [FLASH_SALE_NOTIFICATION.TYPES.LIMITED_STOCK]: 'Limited Stock Alert',
    [FLASH_SALE_NOTIFICATION.TYPES.DEAL_AVAILABLE]: 'Deal Available',
    [FLASH_SALE_NOTIFICATION.TYPES.DEAL_EXPIRING]: 'Deal Expiring',
    [FLASH_SALE_NOTIFICATION.TYPES.NEW_PRODUCT]: 'New Product Alert',
    [FLASH_SALE_NOTIFICATION.TYPES.PROMOTIONAL]: 'Promotional Offer',
    [FLASH_SALE_NOTIFICATION.TYPES.URGENT]: 'Urgent Alert',
    [FLASH_SALE_NOTIFICATION.TYPES.CUSTOM]: 'Custom Notification',
  };
  return labels[type] || 'Unknown Notification Type';
}

export function flashsalesNotificationGetChannelLabel(
  channel: FlashSaleNotificationChannel
): string {
  const labels: Record<FlashSaleNotificationChannel, string> = {
    [FLASH_SALE_NOTIFICATION.CHANNELS.EMAIL]: 'Email',
    [FLASH_SALE_NOTIFICATION.CHANNELS.SMS]: 'SMS',
    [FLASH_SALE_NOTIFICATION.CHANNELS.PUSH]: 'Push Notification',
    [FLASH_SALE_NOTIFICATION.CHANNELS.IN_APP]: 'In-App Notification',
    [FLASH_SALE_NOTIFICATION.CHANNELS.WEBHOOK]: 'Webhook',
    [FLASH_SALE_NOTIFICATION.CHANNELS.DASHBOARD]: 'Dashboard',
    [FLASH_SALE_NOTIFICATION.CHANNELS.SLACK]: 'Slack',
    [FLASH_SALE_NOTIFICATION.CHANNELS.TELEGRAM]: 'Telegram',
    [FLASH_SALE_NOTIFICATION.CHANNELS.WHATSAPP]: 'WhatsApp',
  };
  return labels[channel] || 'Unknown Channel';
}

export function flashsalesNotificationGetPriorityLabel(
  priority: FlashSaleNotificationPriority
): string {
  const labels: Record<FlashSaleNotificationPriority, string> = {
    [FLASH_SALE_NOTIFICATION.PRIORITIES.LOW]: 'Low',
    [FLASH_SALE_NOTIFICATION.PRIORITIES.MEDIUM]: 'Medium',
    [FLASH_SALE_NOTIFICATION.PRIORITIES.HIGH]: 'High',
    [FLASH_SALE_NOTIFICATION.PRIORITIES.CRITICAL]: 'Critical',
  };
  return labels[priority] || 'Unknown Priority';
}

export function flashsalesNotificationGetTemplateLabel(
  template: FlashSaleNotificationTemplate
): string {
  const labels: Record<FlashSaleNotificationTemplate, string> = {
    [FLASH_SALE_NOTIFICATION.TEMPLATES.SALE_START]: 'Sale Start Template',
    [FLASH_SALE_NOTIFICATION.TEMPLATES.SALE_END]: 'Sale End Template',
    [FLASH_SALE_NOTIFICATION.TEMPLATES.SALE_REMINDER]: 'Sale Reminder Template',
    [FLASH_SALE_NOTIFICATION.TEMPLATES.SOLD_OUT]: 'Sold Out Template',
    [FLASH_SALE_NOTIFICATION.TEMPLATES.BACK_IN_STOCK]: 'Back in Stock Template',
    [FLASH_SALE_NOTIFICATION.TEMPLATES.PRICE_DROP]: 'Price Drop Template',
    [FLASH_SALE_NOTIFICATION.TEMPLATES.LIMITED_STOCK_ALERT]: 'Limited Stock Alert Template',
    [FLASH_SALE_NOTIFICATION.TEMPLATES.DEAL_AVAILABLE]: 'Deal Available Template',
    [FLASH_SALE_NOTIFICATION.TEMPLATES.DEAL_EXPIRING]: 'Deal Expiring Template',
    [FLASH_SALE_NOTIFICATION.TEMPLATES.NEW_PRODUCT_ALERT]: 'New Product Alert Template',
    [FLASH_SALE_NOTIFICATION.TEMPLATES.PROMOTIONAL_OFFER]: 'Promotional Offer Template',
    [FLASH_SALE_NOTIFICATION.TEMPLATES.URGENT_ACTION]: 'Urgent Action Template',
    [FLASH_SALE_NOTIFICATION.TEMPLATES.CUSTOM]: 'Custom Template',
  };
  return labels[template] || 'Unknown Template';
}

export function flashsalesNotificationGetTimingLabel(timing: FlashSaleNotificationTiming): string {
  const labels: Record<FlashSaleNotificationTiming, string> = {
    [FLASH_SALE_NOTIFICATION.TIMING.IMMEDIATE]: 'Immediate',
    [FLASH_SALE_NOTIFICATION.TIMING.SCHEDULED]: 'Scheduled',
    [FLASH_SALE_NOTIFICATION.TIMING.DELAYED]: 'Delayed',
    [FLASH_SALE_NOTIFICATION.TIMING.RECURRING]: 'Recurring',
    [FLASH_SALE_NOTIFICATION.TIMING.BEFORE_SALE]: 'Before Sale',
    [FLASH_SALE_NOTIFICATION.TIMING.DURING_SALE]: 'During Sale',
    [FLASH_SALE_NOTIFICATION.TIMING.AFTER_SALE]: 'After Sale',
  };
  return labels[timing] || 'Unknown Timing';
}

export function flashsalesNotificationGetFrequencyLabel(
  frequency: FlashSaleNotificationFrequency
): string {
  const labels: Record<FlashSaleNotificationFrequency, string> = {
    [FLASH_SALE_NOTIFICATION.FREQUENCY.ONE_TIME]: 'One Time',
    [FLASH_SALE_NOTIFICATION.FREQUENCY.HOURLY]: 'Hourly',
    [FLASH_SALE_NOTIFICATION.FREQUENCY.DAILY]: 'Daily',
    [FLASH_SALE_NOTIFICATION.FREQUENCY.WEEKLY]: 'Weekly',
    [FLASH_SALE_NOTIFICATION.FREQUENCY.MONTHLY]: 'Monthly',
    [FLASH_SALE_NOTIFICATION.FREQUENCY.REAL_TIME]: 'Real Time',
  };
  return labels[frequency] || 'Unknown Frequency';
}

export function flashsalesNotificationGetAudienceLabel(
  audience: FlashSaleNotificationAudience
): string {
  const labels: Record<FlashSaleNotificationAudience, string> = {
    [FLASH_SALE_NOTIFICATION.AUDIENCE.ALL]: 'All Users',
    [FLASH_SALE_NOTIFICATION.AUDIENCE.REGISTERED]: 'Registered Users',
    [FLASH_SALE_NOTIFICATION.AUDIENCE.PARTICIPANTS]: 'Participants',
    [FLASH_SALE_NOTIFICATION.AUDIENCE.INTERESTED]: 'Interested Users',
    [FLASH_SALE_NOTIFICATION.AUDIENCE.VIP]: 'VIP Users',
    [FLASH_SALE_NOTIFICATION.AUDIENCE.MEMBERS]: 'Members',
    [FLASH_SALE_NOTIFICATION.AUDIENCE.SUBSCRIBERS]: 'Subscribers',
    [FLASH_SALE_NOTIFICATION.AUDIENCE.CUSTOM]: 'Custom Audience',
  };
  return labels[audience] || 'Unknown Audience';
}

export function flashsalesNotificationIsValidType(type: string): type is FlashSaleNotificationType {
  return Object.values(FLASH_SALE_NOTIFICATION.TYPES).includes(type as FlashSaleNotificationType);
}

export function flashsalesNotificationIsValidChannel(
  channel: string
): channel is FlashSaleNotificationChannel {
  return Object.values(FLASH_SALE_NOTIFICATION.CHANNELS).includes(
    channel as FlashSaleNotificationChannel
  );
}

export function flashsalesNotificationIsValidPriority(
  priority: string
): priority is FlashSaleNotificationPriority {
  return Object.values(FLASH_SALE_NOTIFICATION.PRIORITIES).includes(
    priority as FlashSaleNotificationPriority
  );
}

export function flashsalesNotificationIsHighPriority(
  priority: FlashSaleNotificationPriority
): boolean {
  const highPriorities: FlashSaleNotificationPriority[] = [
    FLASH_SALE_NOTIFICATION.PRIORITIES.HIGH,
    FLASH_SALE_NOTIFICATION.PRIORITIES.CRITICAL,
  ];
  return highPriorities.includes(priority);
}

export function flashsalesNotificationIsLowPriority(
  priority: FlashSaleNotificationPriority
): boolean {
  const lowPriorities: FlashSaleNotificationPriority[] = [
    FLASH_SALE_NOTIFICATION.PRIORITIES.LOW,
    FLASH_SALE_NOTIFICATION.PRIORITIES.MEDIUM,
  ];
  return lowPriorities.includes(priority);
}

export function flashsalesNotificationGetDefaultChannel(): FlashSaleNotificationChannel {
  return FLASH_SALE_NOTIFICATION.DEFAULTS.CHANNEL as FlashSaleNotificationChannel;
}

export function flashsalesNotificationGetDefaultPriority(): FlashSaleNotificationPriority {
  return FLASH_SALE_NOTIFICATION.DEFAULTS.PRIORITY as FlashSaleNotificationPriority;
}

export function flashsalesNotificationGetMaxRecipients(): number {
  return FLASH_SALE_NOTIFICATION.LIMITS.MAX_RECIPIENTS;
}

export function flashsalesNotificationGetMaxRetries(): number {
  return FLASH_SALE_NOTIFICATION.LIMITS.MAX_RETRIES;
}

export function flashsalesNotificationGetMaxNotificationsPerDay(): number {
  return FLASH_SALE_NOTIFICATION.LIMITS.MAX_NOTIFICATIONS_PER_DAY;
}

export function flashsalesNotificationGetMinSubjectLength(): number {
  return FLASH_SALE_NOTIFICATION.VALIDATION.MIN_SUBJECT_LENGTH;
}

export function flashsalesNotificationGetMaxSubjectLength(): number {
  return FLASH_SALE_NOTIFICATION.VALIDATION.MAX_SUBJECT_LENGTH;
}

export function flashsalesNotificationGetMinBodyLength(): number {
  return FLASH_SALE_NOTIFICATION.VALIDATION.MIN_BODY_LENGTH;
}

export function flashsalesNotificationGetMaxBodyLength(): number {
  return FLASH_SALE_NOTIFICATION.VALIDATION.MAX_BODY_LENGTH;
}
