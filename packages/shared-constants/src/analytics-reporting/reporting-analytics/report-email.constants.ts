/**
 * @fileoverview Report email constants and configurations
 * @package @vubun/shared-constants
 */

// External libraries - none needed for constants

// Shared packages - none needed for constants

// Project files - none needed for constants

/**
 * Email format types
 */
export enum EmailFormat {
  /** HTML format */
  HTML = 'HTML',
  /** Plain text format */
  PLAIN_TEXT = 'PLAIN_TEXT',
  /** Both HTML and plain text */
  BOTH = 'BOTH',
}

/**
 * Recipient types
 */
export enum RecipientType {
  /** To recipient */
  TO = 'TO',
  /** CC recipient */
  CC = 'CC',
  /** BCC recipient */
  BCC = 'BCC',
}

/**
 * Email tracking types
 */
export enum EmailTrackingType {
  /** Track email opens */
  OPEN_TRACKING = 'OPEN_TRACKING',
  /** Track link clicks */
  CLICK_TRACKING = 'CLICK_TRACKING',
  /** Track email bounces */
  BOUNCE_TRACKING = 'BOUNCE_TRACKING',
  /** Track spam complaints */
  COMPLAINT_TRACKING = 'COMPLAINT_TRACKING',
}

/**
 * Email encryption types
 */
export enum EmailEncryptionType {
  /** No encryption */
  NONE = 'NONE',
  /** TLS encryption */
  TLS = 'TLS',
  /** SSL encryption */
  SSL = 'SSL',
}

/**
 * Email authentication settings
 */
export interface EmailAuthenticationSettings {
  /** Enable SPF */
  enableSPF: boolean;
  /** Enable DKIM */
  enableDKIM: boolean;
  /** Enable DMARC */
  enableDMARC: boolean;
  /** SPF record */
  spfRecord?: string;
  /** DKIM selector */
  dkimSelector?: string;
  /** DKIM private key */
  dkimPrivateKey?: string;
  /** DMARC policy */
  dmarcPolicy?: 'none' | 'quarantine' | 'reject';
}

export const DEFAULT_EMAIL_AUTHENTICATION_SETTINGS: EmailAuthenticationSettings = {
  enableSPF: true,
  enableDKIM: true,
  enableDMARC: true,
  dmarcPolicy: 'quarantine',
};

/**
 * Email template settings
 */
export interface EmailTemplateSettings {
  /** Template ID */
  id: string;
  /** Template name */
  name: string;
  /** Template subject */
  subject: string;
  /** Template body HTML */
  bodyHtml: string;
  /** Template body plain text */
  bodyText: string;
  /** Template variables */
  variables: string[];
  /** Is active */
  isActive: boolean;
  /** Is default */
  isDefault: boolean;
}

export const DEFAULT_EMAIL_TEMPLATE_SETTINGS: EmailTemplateSettings = {
  id: 'default',
  name: 'Default Template',
  subject: 'Report: {reportName}',
  bodyHtml: '<html><body><h1>{reportName}</h1><p>{reportContent}</p></body></html>',
  bodyText: 'Report: {reportName}\n\n{reportContent}',
  variables: ['reportName', 'reportContent', 'reportDate', 'recipientName'],
  isActive: true,
  isDefault: true,
};

/**
 * Email subject format settings
 */
export interface EmailSubjectFormat {
  /** Subject prefix */
  prefix: string;
  /** Subject suffix */
  suffix: string;
  /** Include report name */
  includeReportName: boolean;
  /** Include date */
  includeDate: boolean;
  /** Include time */
  includeTime: boolean;
  /** Custom format */
  customFormat?: string;
}

export const DEFAULT_EMAIL_SUBJECT_FORMAT: EmailSubjectFormat = {
  prefix: '[Report]',
  suffix: '',
  includeReportName: true,
  includeDate: true,
  includeTime: false,
};

/**
 * Email attachment settings
 */
export interface EmailAttachmentSettings {
  /** Enable attachments */
  enableAttachments: boolean;
  /** Max attachment size in MB */
  maxAttachmentSizeMB: number;
  /** Allowed attachment types */
  allowedTypes: string[];
  /** Compress attachments */
  compressAttachments: boolean;
  /** Max attachments per email */
  maxAttachments: number;
}

export const DEFAULT_EMAIL_ATTACHMENT_SETTINGS: EmailAttachmentSettings = {
  enableAttachments: true,
  maxAttachmentSizeMB: 10,
  allowedTypes: ['pdf', 'xlsx', 'csv', 'json', 'xml', 'html', 'txt'],
  compressAttachments: false,
  maxAttachments: 5,
};

/**
 * Email delivery settings
 */
export interface EmailDeliverySettings {
  /** Delivery provider */
  provider: 'SENDGRID' | 'AWS_SES' | 'MAILGUN' | 'SMTP' | 'CUSTOM';
  /** SMTP host */
  smtpHost?: string;
  /** SMTP port */
  smtpPort?: number;
  /** SMTP username */
  smtpUsername?: string;
  /** SMTP password */
  smtpPassword?: string;
  /** From email */
  fromEmail: string;
  /** From name */
  fromName: string;
  /** Reply-to email */
  replyToEmail?: string;
  /** Max retries */
  maxRetries: number;
  /** Retry delay in seconds */
  retryDelaySeconds: number;
}

export const DEFAULT_EMAIL_DELIVERY_SETTINGS: EmailDeliverySettings = {
  provider: 'SMTP',
  smtpHost: 'smtp.gmail.com',
  smtpPort: 587,
  fromEmail: 'reports@example.com',
  fromName: 'Report System',
  maxRetries: 3,
  retryDelaySeconds: 60,
};

/**
 * Email rate limit settings
 */
export interface EmailRateLimitSettings {
  /** Enable rate limiting */
  enableRateLimiting: boolean;
  /** Max emails per minute */
  maxPerMinute: number;
  /** Max emails per hour */
  maxPerHour: number;
  /** Max emails per day */
  maxPerDay: number;
  /** Rate limit strategy */
  strategy: 'FIXED_WINDOW' | 'SLIDING_WINDOW' | 'TOKEN_BUCKET';
}

export const DEFAULT_EMAIL_RATE_LIMIT_SETTINGS: EmailRateLimitSettings = {
  enableRateLimiting: true,
  maxPerMinute: 10,
  maxPerHour: 100,
  maxPerDay: 500,
  strategy: 'FIXED_WINDOW',
};

/**
 * Email quota settings
 */
export interface EmailQuotaSettings {
  /** Enable quota */
  enableQuota: boolean;
  /** Max emails per user */
  maxPerUser: number;
  /** Max emails per team */
  maxPerTeam: number;
  /** Quota period */
  quotaPeriod: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'QUARTERLY';
  /** Quota reset period in days */
  resetPeriodDays: number;
}

export const DEFAULT_EMAIL_QUOTA_SETTINGS: EmailQuotaSettings = {
  enableQuota: true,
  maxPerUser: 50,
  maxPerTeam: 200,
  quotaPeriod: 'MONTHLY',
  resetPeriodDays: 30,
};

/**
 * Email tracking settings
 */
export interface EmailTrackingSettings {
  /** Enable tracking */
  enableTracking: boolean;
  /** Track opens */
  trackOpens: boolean;
  /** Track clicks */
  trackClicks: boolean;
  /** Track bounces */
  trackBounces: boolean;
  /** Track complaints */
  trackComplaints: boolean;
  /** Tracking retention days */
  retentionDays: number;
}

export const DEFAULT_EMAIL_TRACKING_SETTINGS: EmailTrackingSettings = {
  enableTracking: true,
  trackOpens: true,
  trackClicks: true,
  trackBounces: true,
  trackComplaints: true,
  retentionDays: 30,
};

/**
 * Email retry settings
 */
export interface EmailRetrySettings {
  /** Enable retries */
  enableRetries: boolean;
  /** Max retry attempts */
  maxRetryAttempts: number;
  /** Retry delay in seconds */
  retryDelaySeconds: number;
  /** Retry delay multiplier */
  retryDelayMultiplier: number;
  /** Max retry delay in seconds */
  maxRetryDelaySeconds: number;
  /** Retry on specific errors */
  retryOnErrors: string[];
}

export const DEFAULT_EMAIL_RETRY_SETTINGS: EmailRetrySettings = {
  enableRetries: true,
  maxRetryAttempts: 3,
  retryDelaySeconds: 60,
  retryDelayMultiplier: 2,
  maxRetryDelaySeconds: 600,
  retryOnErrors: ['TIMEOUT', 'RATE_LIMIT', 'SERVICE_UNAVAILABLE', 'SMTP_ERROR'],
};

/**
 * Email batching settings
 */
export interface EmailBatchingSettings {
  /** Enable batching */
  enableBatching: boolean;
  /** Batch size */
  batchSize: number;
  /** Batch interval in seconds */
  batchIntervalSeconds: number;
  /** Max concurrent batches */
  maxConcurrentBatches: number;
  /** Batch strategy */
  strategy: 'SIZE' | 'TIME' | 'HYBRID';
}

export const DEFAULT_EMAIL_BATCHING_SETTINGS: EmailBatchingSettings = {
  enableBatching: false,
  batchSize: 50,
  batchIntervalSeconds: 60,
  maxConcurrentBatches: 5,
  strategy: 'SIZE',
};

/**
 * Email throttling settings
 */
export interface EmailThrottlingSettings {
  /** Enable throttling */
  enableThrottling: boolean;
  /** Throttle rate (emails per interval) */
  rate: number;
  /** Throttle interval in seconds */
  intervalSeconds: number;
  /** Burst size */
  burstSize: number;
  /** Throttling strategy */
  strategy: 'FIXED_WINDOW' | 'SLIDING_WINDOW' | 'TOKEN_BUCKET';
}

export const DEFAULT_EMAIL_THROTTLING_SETTINGS: EmailThrottlingSettings = {
  enableThrottling: false,
  rate: 10,
  intervalSeconds: 60,
  burstSize: 20,
  strategy: 'FIXED_WINDOW',
};

/**
 * Email deadline settings
 */
export interface EmailDeadlineSettings {
  /** Enable deadlines */
  enableDeadlines: boolean;
  /** Deadline in seconds */
  deadlineSeconds: number;
  /** Grace period in seconds */
  gracePeriodSeconds: number;
  /** Action on deadline miss */
  actionOnMiss: 'NOTIFY' | 'ESCALATE' | 'CANCEL' | 'RESCHEDULE';
}

export const DEFAULT_EMAIL_DEADLINE_SETTINGS: EmailDeadlineSettings = {
  enableDeadlines: true,
  deadlineSeconds: 600,
  gracePeriodSeconds: 60,
  actionOnMiss: 'NOTIFY',
};

/**
 * Email priority settings
 */
export interface EmailPrioritySettings {
  /** Priority levels */
  levels: ('LOW' | 'NORMAL' | 'HIGH' | 'URGENT' | 'CRITICAL')[];
  /** Default priority */
  defaultPriority: 'LOW' | 'NORMAL' | 'HIGH' | 'URGENT' | 'CRITICAL';
  /** Priority queue enabled */
  enablePriorityQueue: boolean;
  /** Priority escalation enabled */
  enableEscalation: boolean;
}

export const DEFAULT_EMAIL_PRIORITY_SETTINGS: EmailPrioritySettings = {
  levels: ['LOW', 'NORMAL', 'HIGH', 'URGENT', 'CRITICAL'],
  defaultPriority: 'NORMAL',
  enablePriorityQueue: true,
  enableEscalation: true,
};

/**
 * Email encryption settings
 */
export interface EmailEncryptionSettings {
  /** Encryption type */
  encryptionType: EmailEncryptionType;
  /** Enable encryption */
  enableEncryption: boolean;
  /** Certificate path */
  certificatePath?: string;
  /** Private key path */
  privateKeyPath?: string;
  /** Enable PGP encryption */
  enablePGP: boolean;
  /** PGP public key */
  pgpPublicKey?: string;
}

export const DEFAULT_EMAIL_ENCRYPTION_SETTINGS: EmailEncryptionSettings = {
  encryptionType: EmailEncryptionType.TLS,
  enableEncryption: true,
  enablePGP: false,
};

/**
 * Email logging settings
 */
export interface EmailLoggingSettings {
  /** Enable logging */
  enableLogging: boolean;
  /** Log level */
  logLevel: 'DEBUG' | 'INFO' | 'WARN' | 'ERROR' | 'FATAL';
  /** Log retention days */
  retentionDays: number;
  /** Log email events */
  logEmailEvents: boolean;
  /** Log delivery events */
  logDeliveryEvents: boolean;
  /** Log errors */
  logErrors: boolean;
}

export const DEFAULT_EMAIL_LOGGING_SETTINGS: EmailLoggingSettings = {
  enableLogging: true,
  logLevel: 'INFO',
  retentionDays: 30,
  logEmailEvents: true,
  logDeliveryEvents: true,
  logErrors: true,
};

/**
 * Email reporting settings
 */
export interface EmailReportingSettings {
  /** Enable reporting */
  enableReporting: boolean;
  /** Report frequency */
  frequency: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'QUARTERLY';
  /** Report metrics */
  metrics: (
    'COUNT' | 'DELIVERY_RATE' | 'OPEN_RATE' | 'CLICK_RATE' | 'BOUNCE_RATE' | 'COMPLAINT_RATE'
  )[];
  /** Report recipients */
  recipients: string[];
  /** Report format */
  format: 'PDF' | 'EXCEL' | 'CSV' | 'JSON';
}

export const DEFAULT_EMAIL_REPORTING_SETTINGS: EmailReportingSettings = {
  enableReporting: true,
  frequency: 'WEEKLY',
  metrics: ['COUNT', 'DELIVERY_RATE', 'OPEN_RATE', 'CLICK_RATE'],
  recipients: [],
  format: 'PDF',
};

/**
 * Email notification settings
 */
export interface EmailNotificationSettings {
  /** Enable notifications */
  enableNotifications: boolean;
  /** Notification on success */
  notifyOnSuccess: boolean;
  /** Notification on failure */
  notifyOnFailure: boolean;
  /** Notification channels */
  channels: ('EMAIL' | 'SLACK' | 'TEAMS' | 'PUSH' | 'SMS')[];
  /** Notification template */
  template: string;
}

export const DEFAULT_EMAIL_NOTIFICATION_SETTINGS: EmailNotificationSettings = {
  enableNotifications: true,
  notifyOnSuccess: false,
  notifyOnFailure: true,
  channels: ['EMAIL'],
  template: 'default',
};

/**
 * Email onboarding settings
 */
export interface EmailOnboardingSettings {
  /** Enable onboarding emails */
  enableOnboarding: boolean;
  /** Welcome email template */
  welcomeTemplate: string;
  /** Confirmation email template */
  confirmationTemplate: string;
  /** Follow-up emails */
  followUpEmails: {
    days: number;
    template: string;
  }[];
  /** Onboarding sequence */
  sequence: 'WELCOME' | 'CONFIRMATION' | 'FOLLOW_UP' | 'COMPLETE';
}

export const DEFAULT_EMAIL_ONBOARDING_SETTINGS: EmailOnboardingSettings = {
  enableOnboarding: true,
  welcomeTemplate: 'welcome',
  confirmationTemplate: 'confirmation',
  followUpEmails: [
    { days: 3, template: 'followup_1' },
    { days: 7, template: 'followup_2' },
    { days: 14, template: 'followup_3' },
  ],
  sequence: 'WELCOME',
};

/**
 * Email constants
 */
export const EMAIL_CONSTANTS = {
  /** Default from email */
  DEFAULT_FROM_EMAIL: 'reports@example.com',
  /** Default from name */
  DEFAULT_FROM_NAME: 'Report System',
  /** Max attachment size in MB */
  MAX_ATTACHMENT_SIZE_MB: 10,
  /** Max recipients per email */
  MAX_RECIPIENTS_PER_EMAIL: 100,
  /** Max retry attempts */
  MAX_RETRY_ATTEMPTS: 5,
  /** Default retry delay in seconds */
  DEFAULT_RETRY_DELAY_SECONDS: 60,
  /** Default deadline in seconds */
  DEFAULT_DEADLINE_SECONDS: 600,
} as const;

/**
 * Get email format label
 */
export function getEmailFormatLabel(format: EmailFormat): string {
  const labels: Record<EmailFormat, string> = {
    [EmailFormat.HTML]: 'HTML',
    [EmailFormat.PLAIN_TEXT]: 'Plain Text',
    [EmailFormat.BOTH]: 'Both HTML & Plain Text',
  };
  return labels[format] || format;
}

/**
 * Get recipient type label
 */
export function getRecipientTypeLabel(type: RecipientType): string {
  const labels: Record<RecipientType, string> = {
    [RecipientType.TO]: 'To',
    [RecipientType.CC]: 'Cc',
    [RecipientType.BCC]: 'Bcc',
  };
  return labels[type] || type;
}

/**
 * Get email encryption type label
 */
export function getEmailEncryptionTypeLabel(type: EmailEncryptionType): string {
  const labels: Record<EmailEncryptionType, string> = {
    [EmailEncryptionType.NONE]: 'None',
    [EmailEncryptionType.TLS]: 'TLS',
    [EmailEncryptionType.SSL]: 'SSL',
  };
  return labels[type] || type;
}

/**
 * Check if encryption is enabled
 */
export function isEmailEncryptionEnabled(settings: EmailEncryptionSettings): boolean {
  return settings.enableEncryption && settings.encryptionType !== EmailEncryptionType.NONE;
}

/**
 * Get effective max attachments
 */
export function getEffectiveMaxAttachments(settings: EmailAttachmentSettings): number {
  return settings.enableAttachments ? settings.maxAttachments : 0;
}

/**
 * Check if email is valid
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Check if email domain is valid
 */
export function isValidEmailDomain(domain: string): boolean {
  const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/;
  return domainRegex.test(domain);
}
