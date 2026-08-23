/**
 * SMS Constants
 * Core SMS notification configuration and settings
 */

export const NOTIFICATIONSMS = {
  // SMS Types
  TYPES: {
    MARKETING: 'marketing',
    TRANSACTIONAL: 'transactional',
    OPERATIONAL: 'operational',
    SYSTEM: 'system',
    OTP: 'otp',
    VERIFICATION: 'verification',
    ALERT: 'alert',
    REMINDER: 'reminder',
    PROMOTIONAL: 'promotional',
    ORDER: 'order',
    SHIPPING: 'shipping',
    DELIVERY: 'delivery',
    PAYMENT: 'payment',
    WELCOME: 'welcome',
    CUSTOM: 'custom',
  } as const,

  // SMS Categories
  CATEGORIES: {
    MARKETING: 'marketing',
    TRANSACTIONAL: 'transactional',
    OPERATIONAL: 'operational',
    SYSTEM: 'system',
    SECURITY: 'security',
    SOCIAL: 'social',
    URGENT: 'urgent',
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
  } as const,

  // SMS Character Sets
  CHARACTER_SETS: {
    GSM_7BIT: 'gsm_7bit',
    UCS_2: 'ucs_2',
    ISO_8859_1: 'iso_8859_1',
    UTF_8: 'utf_8',
    UTF_16: 'utf_16',
    ASCII: 'ascii',
  } as const,

  // SMS Defaults
  DEFAULTS: {
    DEFAULT_TYPE: 'transactional',
    DEFAULT_CATEGORY: 'transactional',
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
    DEFAULT_VALIDITY_PERIOD: 1440,
    DEFAULT_OPT_OUT_MESSAGE: 'Reply STOP to unsubscribe',
    DEFAULT_OPT_IN_MESSAGE: 'Reply YES to subscribe',
    DEFAULT_TRACKING_ENABLED: true,
    DEFAULT_DELIVERY_REPORT: true,
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
    MIN_VALIDITY_PERIOD: 5,
    MAX_VALIDITY_PERIOD: 4320,
  } as const,

  // SMS Errors
  ERRORS: {
    SEND_FAILED: 'send_failed',
    RATE_LIMIT: 'rate_limit',
    PERMISSION_DENIED: 'permission_denied',
    INVALID_RECIPIENT: 'invalid_recipient',
    INVALID_SENDER: 'invalid_sender',
    INVALID_MESSAGE: 'invalid_message',
    TIMEOUT: 'timeout',
    AUTHENTICATION_ERROR: 'authentication_error',
    NETWORK_ERROR: 'network_error',
    RESOURCE_EXHAUSTED: 'resource_exhausted',
    CONFIGURATION_ERROR: 'configuration_error',
    VALIDATION_ERROR: 'validation_error',
    OPT_OUT: 'opt_out',
    SPAM_DETECTED: 'spam_detected',
  } as const,
} as const;

// SMS Types
export type NotificationSMSType =
  (typeof NOTIFICATIONSMS.TYPES)[keyof typeof NOTIFICATIONSMS.TYPES];

// SMS Categories
export type NotificationSMSCategory =
  (typeof NOTIFICATIONSMS.CATEGORIES)[keyof typeof NOTIFICATIONSMS.CATEGORIES];

// SMS Priorities
export type NotificationSMSPriority =
  (typeof NOTIFICATIONSMS.PRIORITIES)[keyof typeof NOTIFICATIONSMS.PRIORITIES];

// SMS Providers
export type NotificationSMSProvider =
  (typeof NOTIFICATIONSMS.PROVIDERS)[keyof typeof NOTIFICATIONSMS.PROVIDERS];

// SMS Sending Methods
export type NotificationSMSSendingMethod =
  (typeof NOTIFICATIONSMS.SENDING_METHODS)[keyof typeof NOTIFICATIONSMS.SENDING_METHODS];

// SMS Character Sets
export type NotificationSMSCharacterSet =
  (typeof NOTIFICATIONSMS.CHARACTER_SETS)[keyof typeof NOTIFICATIONSMS.CHARACTER_SETS];

// SMS Defaults
export type NotificationSMSDefault =
  (typeof NOTIFICATIONSMS.DEFAULTS)[keyof typeof NOTIFICATIONSMS.DEFAULTS];

// SMS Limits
export type NotificationSMSLimit =
  (typeof NOTIFICATIONSMS.LIMITS)[keyof typeof NOTIFICATIONSMS.LIMITS];

// SMS Errors
export type NotificationSMSError =
  (typeof NOTIFICATIONSMS.ERRORS)[keyof typeof NOTIFICATIONSMS.ERRORS];

// Utility Functions
export function notificationsmsGetTypeLabel(type: NotificationSMSType): string {
  const labels: Record<NotificationSMSType, string> = {
    [NOTIFICATIONSMS.TYPES.MARKETING]: 'Marketing',
    [NOTIFICATIONSMS.TYPES.TRANSACTIONAL]: 'Transactional',
    [NOTIFICATIONSMS.TYPES.OPERATIONAL]: 'Operational',
    [NOTIFICATIONSMS.TYPES.SYSTEM]: 'System',
    [NOTIFICATIONSMS.TYPES.OTP]: 'OTP',
    [NOTIFICATIONSMS.TYPES.VERIFICATION]: 'Verification',
    [NOTIFICATIONSMS.TYPES.ALERT]: 'Alert',
    [NOTIFICATIONSMS.TYPES.REMINDER]: 'Reminder',
    [NOTIFICATIONSMS.TYPES.PROMOTIONAL]: 'Promotional',
    [NOTIFICATIONSMS.TYPES.ORDER]: 'Order',
    [NOTIFICATIONSMS.TYPES.SHIPPING]: 'Shipping',
    [NOTIFICATIONSMS.TYPES.DELIVERY]: 'Delivery',
    [NOTIFICATIONSMS.TYPES.PAYMENT]: 'Payment',
    [NOTIFICATIONSMS.TYPES.WELCOME]: 'Welcome',
    [NOTIFICATIONSMS.TYPES.CUSTOM]: 'Custom',
  };
  return labels[type] || 'Unknown SMS Type';
}

export function notificationsmsGetCategoryLabel(category: NotificationSMSCategory): string {
  const labels: Record<NotificationSMSCategory, string> = {
    [NOTIFICATIONSMS.CATEGORIES.MARKETING]: 'Marketing',
    [NOTIFICATIONSMS.CATEGORIES.TRANSACTIONAL]: 'Transactional',
    [NOTIFICATIONSMS.CATEGORIES.OPERATIONAL]: 'Operational',
    [NOTIFICATIONSMS.CATEGORIES.SYSTEM]: 'System',
    [NOTIFICATIONSMS.CATEGORIES.SECURITY]: 'Security',
    [NOTIFICATIONSMS.CATEGORIES.SOCIAL]: 'Social',
    [NOTIFICATIONSMS.CATEGORIES.URGENT]: 'Urgent',
  };
  return labels[category] || 'Unknown Category';
}

export function notificationsmsGetPriorityLabel(priority: NotificationSMSPriority): string {
  const labels: Record<NotificationSMSPriority, string> = {
    [NOTIFICATIONSMS.PRIORITIES.CRITICAL]: 'Critical',
    [NOTIFICATIONSMS.PRIORITIES.HIGH]: 'High',
    [NOTIFICATIONSMS.PRIORITIES.MEDIUM]: 'Medium',
    [NOTIFICATIONSMS.PRIORITIES.LOW]: 'Low',
    [NOTIFICATIONSMS.PRIORITIES.BULK]: 'Bulk',
  };
  return labels[priority] || 'Unknown Priority';
}

export function notificationsmsGetProviderLabel(provider: NotificationSMSProvider): string {
  const labels: Record<NotificationSMSProvider, string> = {
    [NOTIFICATIONSMS.PROVIDERS.TWILIO]: 'Twilio',
    [NOTIFICATIONSMS.PROVIDERS.VONAGE]: 'Vonage (Nexmo)',
    [NOTIFICATIONSMS.PROVIDERS.PLIVO]: 'Plivo',
    [NOTIFICATIONSMS.PROVIDERS.TEXT_LOCAL]: 'Text Local',
    [NOTIFICATIONSMS.PROVIDERS.CLICKATELL]: 'Clickatell',
    [NOTIFICATIONSMS.PROVIDERS.MESSAGE_BIRD]: 'Message Bird',
    [NOTIFICATIONSMS.PROVIDERS.INFOBIP]: 'Infobip',
    [NOTIFICATIONSMS.PROVIDERS.SINCH]: 'Sinch',
    [NOTIFICATIONSMS.PROVIDERS.BULK_SMS]: 'Bulk SMS',
    [NOTIFICATIONSMS.PROVIDERS.CEQUENS]: 'Cequens',
    [NOTIFICATIONSMS.PROVIDERS.CUSTOM]: 'Custom',
  };
  return labels[provider] || 'Unknown Provider';
}

export function notificationsmsGetSendingMethodLabel(method: NotificationSMSSendingMethod): string {
  const labels: Record<NotificationSMSSendingMethod, string> = {
    [NOTIFICATIONSMS.SENDING_METHODS.API]: 'API',
    [NOTIFICATIONSMS.SENDING_METHODS.SMPP]: 'SMPP',
    [NOTIFICATIONSMS.SENDING_METHODS.HTTP]: 'HTTP',
    [NOTIFICATIONSMS.SENDING_METHODS.WEBHOOK]: 'Webhook',
    [NOTIFICATIONSMS.SENDING_METHODS.BATCH]: 'Batch',
    [NOTIFICATIONSMS.SENDING_METHODS.TRIGGERED]: 'Triggered',
    [NOTIFICATIONSMS.SENDING_METHODS.SCHEDULED]: 'Scheduled',
  };
  return labels[method] || 'Unknown Sending Method';
}

export function notificationsmsGetCharacterSetLabel(charSet: NotificationSMSCharacterSet): string {
  const labels: Record<NotificationSMSCharacterSet, string> = {
    [NOTIFICATIONSMS.CHARACTER_SETS.GSM_7BIT]: 'GSM 7-bit',
    [NOTIFICATIONSMS.CHARACTER_SETS.UCS_2]: 'UCS-2',
    [NOTIFICATIONSMS.CHARACTER_SETS.ISO_8859_1]: 'ISO-8859-1',
    [NOTIFICATIONSMS.CHARACTER_SETS.UTF_8]: 'UTF-8',
    [NOTIFICATIONSMS.CHARACTER_SETS.UTF_16]: 'UTF-16',
    [NOTIFICATIONSMS.CHARACTER_SETS.ASCII]: 'ASCII',
  };
  return labels[charSet] || 'Unknown Character Set';
}

export function notificationsmsGetErrorLabel(error: NotificationSMSError): string {
  const labels: Record<NotificationSMSError, string> = {
    [NOTIFICATIONSMS.ERRORS.SEND_FAILED]: 'Send Failed',
    [NOTIFICATIONSMS.ERRORS.RATE_LIMIT]: 'Rate Limit Exceeded',
    [NOTIFICATIONSMS.ERRORS.PERMISSION_DENIED]: 'Permission Denied',
    [NOTIFICATIONSMS.ERRORS.INVALID_RECIPIENT]: 'Invalid Recipient',
    [NOTIFICATIONSMS.ERRORS.INVALID_SENDER]: 'Invalid Sender',
    [NOTIFICATIONSMS.ERRORS.INVALID_MESSAGE]: 'Invalid Message',
    [NOTIFICATIONSMS.ERRORS.TIMEOUT]: 'Timeout',
    [NOTIFICATIONSMS.ERRORS.AUTHENTICATION_ERROR]: 'Authentication Error',
    [NOTIFICATIONSMS.ERRORS.NETWORK_ERROR]: 'Network Error',
    [NOTIFICATIONSMS.ERRORS.RESOURCE_EXHAUSTED]: 'Resource Exhausted',
    [NOTIFICATIONSMS.ERRORS.CONFIGURATION_ERROR]: 'Configuration Error',
    [NOTIFICATIONSMS.ERRORS.VALIDATION_ERROR]: 'Validation Error',
    [NOTIFICATIONSMS.ERRORS.OPT_OUT]: 'Opt Out',
    [NOTIFICATIONSMS.ERRORS.SPAM_DETECTED]: 'Spam Detected',
  };
  return labels[error] || 'Unknown Error';
}

export function notificationsmsGetDefaultSenderId(): string {
  return NOTIFICATIONSMS.DEFAULTS.DEFAULT_SENDER_ID;
}

export function notificationsmsGetDefaultCountryCode(): string {
  return NOTIFICATIONSMS.DEFAULTS.DEFAULT_COUNTRY_CODE;
}

export function notificationsmsGetMaxSMSSegments(): number {
  return NOTIFICATIONSMS.DEFAULTS.MAX_SMS_SEGMENTS;
}

export function notificationsmsGetMaxGSMCharacters(): number {
  return NOTIFICATIONSMS.DEFAULTS.MAX_SMS_LENGTH;
}

export function notificationsmsGetMaxUnicodeCharacters(): number {
  return NOTIFICATIONSMS.LIMITS.MAX_UNICODE_CHARACTERS;
}

export function notificationsmsIsTransactional(type: NotificationSMSType): boolean {
  const transactionalTypes: NotificationSMSType[] = [
    NOTIFICATIONSMS.TYPES.TRANSACTIONAL,
    NOTIFICATIONSMS.TYPES.OTP,
    NOTIFICATIONSMS.TYPES.VERIFICATION,
    NOTIFICATIONSMS.TYPES.ORDER,
    NOTIFICATIONSMS.TYPES.SHIPPING,
    NOTIFICATIONSMS.TYPES.DELIVERY,
    NOTIFICATIONSMS.TYPES.PAYMENT,
  ];
  return transactionalTypes.includes(type);
}

export function notificationsmsIsMarketing(type: NotificationSMSType): boolean {
  const marketingTypes: NotificationSMSType[] = [
    NOTIFICATIONSMS.TYPES.MARKETING,
    NOTIFICATIONSMS.TYPES.PROMOTIONAL,
    NOTIFICATIONSMS.TYPES.WELCOME,
  ];
  return marketingTypes.includes(type);
}

export function notificationsmsIsUrgent(type: NotificationSMSType): boolean {
  const urgentTypes: NotificationSMSType[] = [
    NOTIFICATIONSMS.TYPES.ALERT,
    NOTIFICATIONSMS.TYPES.REMINDER,
    NOTIFICATIONSMS.TYPES.OTP,
    NOTIFICATIONSMS.TYPES.VERIFICATION,
  ];
  return urgentTypes.includes(type);
}

export function notificationsmsCalculateSegments(message: string): number {
  const gsmChars = message.replace(/[^A-Za-z0-9\s.,!?;:'"\-()@]/g, '').length;
  const unicodeChars = message.length - gsmChars;

  if (unicodeChars > 0) {
    if (message.length <= 70) return 1;
    return Math.ceil(message.length / 67);
  } else {
    if (message.length <= 160) return 1;
    return Math.ceil(message.length / 153);
  }
}
