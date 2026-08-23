/**
 * Email Constants
 * Core email notification configuration and settings
 */

export const NOTIFICATIONEMAIL = {
  // Email Types
  TYPES: {
    MARKETING: 'marketing',
    TRANSACTIONAL: 'transactional',
    OPERATIONAL: 'operational',
    SYSTEM: 'system',
    NEWSLETTER: 'newsletter',
    PROMOTIONAL: 'promotional',
    WELCOME: 'welcome',
    ORDER: 'order',
    SHIPPING: 'shipping',
    DELIVERY: 'delivery',
    PAYMENT: 'payment',
    INVOICE: 'invoice',
    REMINDER: 'reminder',
    ALERT: 'alert',
    SECURITY: 'security',
    RESET_PASSWORD: 'reset_password',
    VERIFICATION: 'verification',
    FEEDBACK: 'feedback',
    SURVEY: 'survey',
    EVENT: 'event',
    ANNOUNCEMENT: 'announcement',
    CUSTOM: 'custom',
  } as const,

  // Email Categories
  CATEGORIES: {
    MARKETING: 'marketing',
    TRANSACTIONAL: 'transactional',
    OPERATIONAL: 'operational',
    SYSTEM: 'system',
    SECURITY: 'security',
    SOCIAL: 'social',
    EDUCATIONAL: 'educational',
  } as const,

  // Email Priorities
  PRIORITIES: {
    CRITICAL: 'critical',
    HIGH: 'high',
    MEDIUM: 'medium',
    LOW: 'low',
    BULK: 'bulk',
  } as const,

  // Email Formats
  FORMATS: {
    HTML: 'html',
    TEXT: 'text',
    PLAIN: 'plain',
    MARKDOWN: 'markdown',
    RICH_TEXT: 'rich_text',
    TEMPLATE: 'template',
    DYNAMIC: 'dynamic',
  } as const,

  // Email Providers
  PROVIDERS: {
    SENDGRID: 'sendgrid',
    MAILCHIMP: 'mailchimp',
    AWS_SES: 'aws_ses',
    POSTMARK: 'postmark',
    MAILGUN: 'mailgun',
    BREVO: 'brevo',
    SPARKPOST: 'sparkpost',
    ZOHO: 'zoho',
    ACTIVE_CAMPAIGN: 'active_campaign',
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

  // Email Defaults
  DEFAULTS: {
    DEFAULT_TYPE: 'marketing',
    DEFAULT_CATEGORY: 'marketing',
    DEFAULT_PRIORITY: 'medium',
    DEFAULT_FORMAT: 'html',
    DEFAULT_PROVIDER: 'sendgrid',
    DEFAULT_SENDING_METHOD: 'api',
    DEFAULT_FROM_NAME: 'Your Company',
    DEFAULT_FROM_EMAIL: 'noreply@yourcompany.com',
    DEFAULT_SUBJECT: 'Latest Updates',
    DEFAULT_TRACKING_ENABLED: true,
    DEFAULT_OPEN_TRACKING: true,
    DEFAULT_CLICK_TRACKING: true,
    DEFAULT_UNSUBSCRIBE_LINK: true,
    DEFAULT_BRANDING: true,
    MAX_EMAILS_PER_DAY: 10000,
    MAX_EMAILS_PER_HOUR: 1000,
    MAX_RECIPIENTS_PER_EMAIL: 1000,
    MAX_ATTACHMENT_SIZE_MB: 10,
    MAX_EMAIL_SIZE_MB: 25,
    DEFAULT_RETRY_ATTEMPTS: 3,
    DEFAULT_RETRY_DELAY: 300000,
    DEFAULT_TIMEOUT: 30000,
    DEFAULT_BATCH_SIZE: 100,
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
  } as const,

  // Email Errors
  ERRORS: {
    SEND_FAILED: 'send_failed',
    RATE_LIMIT: 'rate_limit',
    PERMISSION_DENIED: 'permission_denied',
    INVALID_RECIPIENT: 'invalid_recipient',
    INVALID_TEMPLATE: 'invalid_template',
    INVALID_SENDER: 'invalid_sender',
    TIMEOUT: 'timeout',
    AUTHENTICATION_ERROR: 'authentication_error',
    NETWORK_ERROR: 'network_error',
    RESOURCE_EXHAUSTED: 'resource_exhausted',
    CONFIGURATION_ERROR: 'configuration_error',
    VALIDATION_ERROR: 'validation_error',
  } as const,
} as const;

// Email Types
export type NotificationEmailType =
  (typeof NOTIFICATIONEMAIL.TYPES)[keyof typeof NOTIFICATIONEMAIL.TYPES];

// Email Categories
export type NotificationEmailCategory =
  (typeof NOTIFICATIONEMAIL.CATEGORIES)[keyof typeof NOTIFICATIONEMAIL.CATEGORIES];

// Email Priorities
export type NotificationEmailPriority =
  (typeof NOTIFICATIONEMAIL.PRIORITIES)[keyof typeof NOTIFICATIONEMAIL.PRIORITIES];

// Email Formats
export type NotificationEmailFormat =
  (typeof NOTIFICATIONEMAIL.FORMATS)[keyof typeof NOTIFICATIONEMAIL.FORMATS];

// Email Providers
export type NotificationEmailProvider =
  (typeof NOTIFICATIONEMAIL.PROVIDERS)[keyof typeof NOTIFICATIONEMAIL.PROVIDERS];

// Email Sending Methods
export type NotificationEmailSendingMethod =
  (typeof NOTIFICATIONEMAIL.SENDING_METHODS)[keyof typeof NOTIFICATIONEMAIL.SENDING_METHODS];

// Email Tracking Types
export type NotificationEmailTrackingType =
  (typeof NOTIFICATIONEMAIL.TRACKING_TYPES)[keyof typeof NOTIFICATIONEMAIL.TRACKING_TYPES];

// Email Defaults
export type NotificationEmailDefault =
  (typeof NOTIFICATIONEMAIL.DEFAULTS)[keyof typeof NOTIFICATIONEMAIL.DEFAULTS];

// Email Limits
export type NotificationEmailLimit =
  (typeof NOTIFICATIONEMAIL.LIMITS)[keyof typeof NOTIFICATIONEMAIL.LIMITS];

// Email Errors
export type NotificationEmailError =
  (typeof NOTIFICATIONEMAIL.ERRORS)[keyof typeof NOTIFICATIONEMAIL.ERRORS];

// Utility Functions
export function notificationemailGetTypeLabel(type: NotificationEmailType): string {
  const labels: Record<NotificationEmailType, string> = {
    [NOTIFICATIONEMAIL.TYPES.MARKETING]: 'Marketing',
    [NOTIFICATIONEMAIL.TYPES.TRANSACTIONAL]: 'Transactional',
    [NOTIFICATIONEMAIL.TYPES.OPERATIONAL]: 'Operational',
    [NOTIFICATIONEMAIL.TYPES.SYSTEM]: 'System',
    [NOTIFICATIONEMAIL.TYPES.NEWSLETTER]: 'Newsletter',
    [NOTIFICATIONEMAIL.TYPES.PROMOTIONAL]: 'Promotional',
    [NOTIFICATIONEMAIL.TYPES.WELCOME]: 'Welcome',
    [NOTIFICATIONEMAIL.TYPES.ORDER]: 'Order',
    [NOTIFICATIONEMAIL.TYPES.SHIPPING]: 'Shipping',
    [NOTIFICATIONEMAIL.TYPES.DELIVERY]: 'Delivery',
    [NOTIFICATIONEMAIL.TYPES.PAYMENT]: 'Payment',
    [NOTIFICATIONEMAIL.TYPES.INVOICE]: 'Invoice',
    [NOTIFICATIONEMAIL.TYPES.REMINDER]: 'Reminder',
    [NOTIFICATIONEMAIL.TYPES.ALERT]: 'Alert',
    [NOTIFICATIONEMAIL.TYPES.SECURITY]: 'Security',
    [NOTIFICATIONEMAIL.TYPES.RESET_PASSWORD]: 'Reset Password',
    [NOTIFICATIONEMAIL.TYPES.VERIFICATION]: 'Verification',
    [NOTIFICATIONEMAIL.TYPES.FEEDBACK]: 'Feedback',
    [NOTIFICATIONEMAIL.TYPES.SURVEY]: 'Survey',
    [NOTIFICATIONEMAIL.TYPES.EVENT]: 'Event',
    [NOTIFICATIONEMAIL.TYPES.ANNOUNCEMENT]: 'Announcement',
    [NOTIFICATIONEMAIL.TYPES.CUSTOM]: 'Custom',
  };
  return labels[type] || 'Unknown Email Type';
}

export function notificationemailGetCategoryLabel(category: NotificationEmailCategory): string {
  const labels: Record<NotificationEmailCategory, string> = {
    [NOTIFICATIONEMAIL.CATEGORIES.MARKETING]: 'Marketing',
    [NOTIFICATIONEMAIL.CATEGORIES.TRANSACTIONAL]: 'Transactional',
    [NOTIFICATIONEMAIL.CATEGORIES.OPERATIONAL]: 'Operational',
    [NOTIFICATIONEMAIL.CATEGORIES.SYSTEM]: 'System',
    [NOTIFICATIONEMAIL.CATEGORIES.SECURITY]: 'Security',
    [NOTIFICATIONEMAIL.CATEGORIES.SOCIAL]: 'Social',
    [NOTIFICATIONEMAIL.CATEGORIES.EDUCATIONAL]: 'Educational',
  };
  return labels[category] || 'Unknown Category';
}

export function notificationemailGetPriorityLabel(priority: NotificationEmailPriority): string {
  const labels: Record<NotificationEmailPriority, string> = {
    [NOTIFICATIONEMAIL.PRIORITIES.CRITICAL]: 'Critical',
    [NOTIFICATIONEMAIL.PRIORITIES.HIGH]: 'High',
    [NOTIFICATIONEMAIL.PRIORITIES.MEDIUM]: 'Medium',
    [NOTIFICATIONEMAIL.PRIORITIES.LOW]: 'Low',
    [NOTIFICATIONEMAIL.PRIORITIES.BULK]: 'Bulk',
  };
  return labels[priority] || 'Unknown Priority';
}

export function notificationemailGetFormatLabel(format: NotificationEmailFormat): string {
  const labels: Record<NotificationEmailFormat, string> = {
    [NOTIFICATIONEMAIL.FORMATS.HTML]: 'HTML',
    [NOTIFICATIONEMAIL.FORMATS.TEXT]: 'Text',
    [NOTIFICATIONEMAIL.FORMATS.PLAIN]: 'Plain',
    [NOTIFICATIONEMAIL.FORMATS.MARKDOWN]: 'Markdown',
    [NOTIFICATIONEMAIL.FORMATS.RICH_TEXT]: 'Rich Text',
    [NOTIFICATIONEMAIL.FORMATS.TEMPLATE]: 'Template',
    [NOTIFICATIONEMAIL.FORMATS.DYNAMIC]: 'Dynamic',
  };
  return labels[format] || 'Unknown Format';
}

export function notificationemailGetProviderLabel(provider: NotificationEmailProvider): string {
  const labels: Record<NotificationEmailProvider, string> = {
    [NOTIFICATIONEMAIL.PROVIDERS.SENDGRID]: 'SendGrid',
    [NOTIFICATIONEMAIL.PROVIDERS.MAILCHIMP]: 'Mailchimp',
    [NOTIFICATIONEMAIL.PROVIDERS.AWS_SES]: 'AWS SES',
    [NOTIFICATIONEMAIL.PROVIDERS.POSTMARK]: 'Postmark',
    [NOTIFICATIONEMAIL.PROVIDERS.MAILGUN]: 'Mailgun',
    [NOTIFICATIONEMAIL.PROVIDERS.BREVO]: 'Brevo (Sendinblue)',
    [NOTIFICATIONEMAIL.PROVIDERS.SPARKPOST]: 'SparkPost',
    [NOTIFICATIONEMAIL.PROVIDERS.ZOHO]: 'Zoho',
    [NOTIFICATIONEMAIL.PROVIDERS.ACTIVE_CAMPAIGN]: 'Active Campaign',
    [NOTIFICATIONEMAIL.PROVIDERS.CUSTOM]: 'Custom',
  };
  return labels[provider] || 'Unknown Provider';
}

export function notificationemailGetSendingMethodLabel(
  method: NotificationEmailSendingMethod
): string {
  const labels: Record<NotificationEmailSendingMethod, string> = {
    [NOTIFICATIONEMAIL.SENDING_METHODS.SMTP]: 'SMTP',
    [NOTIFICATIONEMAIL.SENDING_METHODS.API]: 'API',
    [NOTIFICATIONEMAIL.SENDING_METHODS.WEBHOOK]: 'Webhook',
    [NOTIFICATIONEMAIL.SENDING_METHODS.BATCH]: 'Batch',
    [NOTIFICATIONEMAIL.SENDING_METHODS.TRIGGERED]: 'Triggered',
    [NOTIFICATIONEMAIL.SENDING_METHODS.SCHEDULED]: 'Scheduled',
    [NOTIFICATIONEMAIL.SENDING_METHODS.CAMPAIGN]: 'Campaign',
    [NOTIFICATIONEMAIL.SENDING_METHODS.AUTOMATION]: 'Automation',
  };
  return labels[method] || 'Unknown Sending Method';
}

export function notificationemailGetTrackingTypeLabel(
  trackingType: NotificationEmailTrackingType
): string {
  const labels: Record<NotificationEmailTrackingType, string> = {
    [NOTIFICATIONEMAIL.TRACKING_TYPES.OPENS]: 'Opens',
    [NOTIFICATIONEMAIL.TRACKING_TYPES.CLICKS]: 'Clicks',
    [NOTIFICATIONEMAIL.TRACKING_TYPES.BOUNCES]: 'Bounces',
    [NOTIFICATIONEMAIL.TRACKING_TYPES.SPAM]: 'Spam Reports',
    [NOTIFICATIONEMAIL.TRACKING_TYPES.UNSUBSCRIBES]: 'Unsubscribes',
    [NOTIFICATIONEMAIL.TRACKING_TYPES.COMPLAINTS]: 'Complaints',
    [NOTIFICATIONEMAIL.TRACKING_TYPES.DELIVERIES]: 'Deliveries',
    [NOTIFICATIONEMAIL.TRACKING_TYPES.REJECTIONS]: 'Rejections',
    [NOTIFICATIONEMAIL.TRACKING_TYPES.ENGAGEMENT]: 'Engagement',
    [NOTIFICATIONEMAIL.TRACKING_TYPES.CONVERSIONS]: 'Conversions',
  };
  return labels[trackingType] || 'Unknown Tracking Type';
}

export function notificationemailGetErrorLabel(error: NotificationEmailError): string {
  const labels: Record<NotificationEmailError, string> = {
    [NOTIFICATIONEMAIL.ERRORS.SEND_FAILED]: 'Send Failed',
    [NOTIFICATIONEMAIL.ERRORS.RATE_LIMIT]: 'Rate Limit Exceeded',
    [NOTIFICATIONEMAIL.ERRORS.PERMISSION_DENIED]: 'Permission Denied',
    [NOTIFICATIONEMAIL.ERRORS.INVALID_RECIPIENT]: 'Invalid Recipient',
    [NOTIFICATIONEMAIL.ERRORS.INVALID_TEMPLATE]: 'Invalid Template',
    [NOTIFICATIONEMAIL.ERRORS.INVALID_SENDER]: 'Invalid Sender',
    [NOTIFICATIONEMAIL.ERRORS.TIMEOUT]: 'Timeout',
    [NOTIFICATIONEMAIL.ERRORS.AUTHENTICATION_ERROR]: 'Authentication Error',
    [NOTIFICATIONEMAIL.ERRORS.NETWORK_ERROR]: 'Network Error',
    [NOTIFICATIONEMAIL.ERRORS.RESOURCE_EXHAUSTED]: 'Resource Exhausted',
    [NOTIFICATIONEMAIL.ERRORS.CONFIGURATION_ERROR]: 'Configuration Error',
    [NOTIFICATIONEMAIL.ERRORS.VALIDATION_ERROR]: 'Validation Error',
  };
  return labels[error] || 'Unknown Error';
}

export function notificationemailGetDefaultFromName(): string {
  return NOTIFICATIONEMAIL.DEFAULTS.DEFAULT_FROM_NAME;
}

export function notificationemailGetDefaultFromEmail(): string {
  return NOTIFICATIONEMAIL.DEFAULTS.DEFAULT_FROM_EMAIL;
}

export function notificationemailGetMaxEmailsPerDay(): number {
  return NOTIFICATIONEMAIL.DEFAULTS.MAX_EMAILS_PER_DAY;
}

export function notificationemailIsTransactional(type: NotificationEmailType): boolean {
  const transactionalTypes: NotificationEmailType[] = [
    NOTIFICATIONEMAIL.TYPES.TRANSACTIONAL,
    NOTIFICATIONEMAIL.TYPES.ORDER,
    NOTIFICATIONEMAIL.TYPES.SHIPPING,
    NOTIFICATIONEMAIL.TYPES.DELIVERY,
    NOTIFICATIONEMAIL.TYPES.PAYMENT,
    NOTIFICATIONEMAIL.TYPES.INVOICE,
    NOTIFICATIONEMAIL.TYPES.RESET_PASSWORD,
    NOTIFICATIONEMAIL.TYPES.VERIFICATION,
  ];
  return transactionalTypes.includes(type);
}

export function notificationemailIsMarketing(type: NotificationEmailType): boolean {
  const marketingTypes: NotificationEmailType[] = [
    NOTIFICATIONEMAIL.TYPES.MARKETING,
    NOTIFICATIONEMAIL.TYPES.NEWSLETTER,
    NOTIFICATIONEMAIL.TYPES.PROMOTIONAL,
    NOTIFICATIONEMAIL.TYPES.WELCOME,
    NOTIFICATIONEMAIL.TYPES.EVENT,
    NOTIFICATIONEMAIL.TYPES.ANNOUNCEMENT,
  ];
  return marketingTypes.includes(type);
}

export function notificationemailIsSystem(type: NotificationEmailType): boolean {
  const systemTypes: NotificationEmailType[] = [
    NOTIFICATIONEMAIL.TYPES.SYSTEM,
    NOTIFICATIONEMAIL.TYPES.OPERATIONAL,
    NOTIFICATIONEMAIL.TYPES.ALERT,
    NOTIFICATIONEMAIL.TYPES.SECURITY,
  ];
  return systemTypes.includes(type);
}
