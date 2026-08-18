/**
 * সাপোর্ট ইমেইল সিস্টেমের মৌলিক কনস্ট্যান্টসমূহ
 */

/**
 * ইমেইল আইডি প্রিফিক্স
 */
export const EMAIL_ID_PREFIX = 'EML';

/**
 * ইমেইল নম্বর ফরম্যাট
 */
export const EMAIL_NUMBER_FORMAT = 'EML-{type}-{timestamp}';

/**
 * ডিফল্ট ফ্রম অ্যাড্রেস
 */
export const DEFAULT_FROM_ADDRESS = 'support@vubon.com';

/**
 * ডিফল্ট ফ্রম নাম
 */
export const DEFAULT_FROM_NAME = 'Vubon Support';

/**
 * ডিফল্ট সাবজেক্ট ফরম্যাট
 */
export const DEFAULT_SUBJECT_FORMAT = '[#{ticketId}] {subject}';

/**
 * ইমেইল টেমপ্লেট ফোল্ডার
 */
export const EMAIL_TEMPLATE_FOLDER = 'email-templates';

/**
 * ইমেইল অ্যাটাচমেন্ট সাইজ লিমিট (এমবি)
 */
export const EMAIL_ATTACHMENT_SIZE_LIMIT_MB = 25;

/**
 * ইমেইল রেট লিমিট (প্রতি মিনিটে)
 */
export const EMAIL_RATE_LIMIT = 100;

/**
 * ইমেইল রিট্রাই কনফিগারেশন
 */
export const EMAIL_RETRY_CONFIG = {
  MAX_RETRIES: 3,
  RETRY_DELAYS: [5, 15, 30], // মিনিটে
  BACKOFF_MULTIPLIER: 2,
} as const;

/**
 * ইমেইল বাউন্স হ্যান্ডলিং রুলস
 */
export const EMAIL_BOUNCE_HANDLING = {
  SOFT_BOUNCE_RETRY: true,
  HARD_BOUNCE_REMOVE: true,
  BOUNCE_THRESHOLD: 3,
  BOUNCE_WINDOW: 7, // দিনে
} as const;

/**
 * ইমেইল চারসেট
 */
export const EMAIL_CHARSET = 'UTF-8';

/**
 * ইমেইল এনক্রিপশন
 */
export const EMAIL_ENCRYPTION = {
  NONE: 'none',
  TLS: 'tls',
  SSL: 'ssl',
  STARTTLS: 'starttls',
} as const;

/**
 * ইমেইল প্রায়োরিটি
 */
export const EMAIL_PRIORITY = {
  LOW: 'low',
  NORMAL: 'normal',
  HIGH: 'high',
  URGENT: 'urgent',
} as const;

/**
 * ইমেইল ডিফল্ট সেটিংস
 */
export const EMAIL_DEFAULT_SETTINGS = {
  fromAddress: DEFAULT_FROM_ADDRESS,
  fromName: DEFAULT_FROM_NAME,
  subjectFormat: DEFAULT_SUBJECT_FORMAT,
  templateFolder: EMAIL_TEMPLATE_FOLDER,
  attachmentSizeLimitMB: EMAIL_ATTACHMENT_SIZE_LIMIT_MB,
  rateLimit: EMAIL_RATE_LIMIT,
  retryConfig: EMAIL_RETRY_CONFIG,
  bounceHandling: EMAIL_BOUNCE_HANDLING,
  charset: EMAIL_CHARSET,
} as const;

export type EmailIdPrefix = typeof EMAIL_ID_PREFIX;
export type EmailEncryption = (typeof EMAIL_ENCRYPTION)[keyof typeof EMAIL_ENCRYPTION];
export type EmailPriority = (typeof EMAIL_PRIORITY)[keyof typeof EMAIL_PRIORITY];

export interface EmailRetryConfig {
  MAX_RETRIES: number;
  RETRY_DELAYS: number[];
  BACKOFF_MULTIPLIER: number;
}

export interface EmailBounceHandling {
  SOFT_BOUNCE_RETRY: boolean;
  HARD_BOUNCE_REMOVE: boolean;
  BOUNCE_THRESHOLD: number;
  BOUNCE_WINDOW: number;
}

export interface EmailDefaultSettings {
  fromAddress: string;
  fromName: string;
  subjectFormat: string;
  templateFolder: string;
  attachmentSizeLimitMB: number;
  rateLimit: number;
  retryConfig: EmailRetryConfig;
  bounceHandling: EmailBounceHandling;
  charset: string;
}

export interface EmailAttachment {
  filename: string;
  content: Buffer | string;
  contentType?: string;
  size?: number;
}

export interface Email {
  id: string;
  to: string[];
  cc?: string[];
  bcc?: string[];
  from: string;
  fromName?: string;
  subject: string;
  body: string;
  htmlBody?: string;
  attachments?: EmailAttachment[];
  priority: EmailPriority;
  templateId?: string;
  templateData?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
  sentAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface EmailTracking {
  id: string;
  emailId: string;
  openedAt?: Date;
  clickedAt?: Date;
  linkClicked?: string;
  userAgent?: string;
  ip?: string;
  metadata?: Record<string, unknown>;
}

export interface EmailAnalytics {
  totalSent: number;
  totalDelivered: number;
  totalOpened: number;
  totalClicked: number;
  totalBounced: number;
  openRate: number;
  clickRate: number;
  bounceRate: number;
  period: string;
}

/**
 * ইমেইল কনফিগারেশন
 */
export const EMAIL_CONFIG = {
  idPrefix: EMAIL_ID_PREFIX,
  numberFormat: EMAIL_NUMBER_FORMAT,
  defaultSettings: EMAIL_DEFAULT_SETTINGS,
  encryption: EMAIL_ENCRYPTION,
  priority: EMAIL_PRIORITY,
} as const;

/**
 * ইমেইল ইভেন্ট টাইপ
 */
export const EMAIL_EVENT_TYPES = {
  CREATED: 'email_created',
  QUEUED: 'email_queued',
  SENT: 'email_sent',
  DELIVERED: 'email_delivered',
  OPENED: 'email_opened',
  CLICKED: 'email_clicked',
  BOUNCED: 'email_bounced',
  FAILED: 'email_failed',
  RETRY: 'email_retry',
} as const;

export type EmailEventType = (typeof EMAIL_EVENT_TYPES)[keyof typeof EMAIL_EVENT_TYPES];
