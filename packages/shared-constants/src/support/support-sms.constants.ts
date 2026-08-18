/**
 * সাপোর্ট SMS সিস্টেমের মৌলিক কনস্ট্যান্টসমূহ
 */

/**
 * SMS আইডি প্রিফিক্স
 */
export const SMS_ID_PREFIX = 'SMS';

/**
 * SMS নম্বর ফরম্যাট
 */
export const SMS_NUMBER_FORMAT = 'SMS-{type}-{timestamp}';

/**
 * ডিফল্ট সেন্ডার আইডি
 */
export const DEFAULT_SENDER_ID = 'Vubon';

/**
 * ম্যাক্সিমাম SMS লেন্থ (অক্ষরে)
 */
export const MAX_SMS_LENGTH = 160;

/**
 * ইউনিকোড SMS ম্যাক্সিমাম লেন্থ (অক্ষরে)
 */
export const MAX_UNICODE_SMS_LENGTH = 70;

/**
 * কনক্যাটেনেটেড SMS ম্যাক্স পার্টস
 */
export const MAX_CONCATENATED_SMS_PARTS = 10;

/**
 * SMS রেট লিমিট (প্রতি মিনিটে)
 */
export const SMS_RATE_LIMIT = 50;

/**
 * SMS টাইমআউট (সেকেন্ডে)
 */
export const SMS_TIMEOUT = 30;

/**
 * SMS রিট্রাই কনফিগারেশন
 */
export const SMS_RETRY_CONFIG = {
  MAX_RETRIES: 3,
  RETRY_DELAYS: [30, 60, 120], // সেকেন্ডে
  BACKOFF_MULTIPLIER: 2,
} as const;

/**
 * SMS ডেলিভারি রিপোর্ট ফরম্যাট
 */
export const SMS_DELIVERY_REPORT_FORMAT = {
  FORMAT: 'json',
  FIELDS: ['messageId', 'status', 'deliveredAt', 'errorCode', 'errorMessage'],
} as const;

/**
 * SMS এনকোডিং
 */
export const SMS_ENCODING = {
  GSM: 'gsm',
  UCS2: 'ucs2',
  UTF8: 'utf8',
} as const;

/**
 * SMS প্রায়োরিটি
 */
export const SMS_PRIORITY = {
  LOW: 'low',
  NORMAL: 'normal',
  HIGH: 'high',
  URGENT: 'urgent',
} as const;

/**
 * SMS ডিফল্ট সেটিংস
 */
export const SMS_DEFAULT_SETTINGS = {
  defaultSenderId: DEFAULT_SENDER_ID,
  maxSmsLength: MAX_SMS_LENGTH,
  maxUnicodeSmsLength: MAX_UNICODE_SMS_LENGTH,
  maxConcatenatedParts: MAX_CONCATENATED_SMS_PARTS,
  rateLimit: SMS_RATE_LIMIT,
  timeout: SMS_TIMEOUT,
  retryConfig: SMS_RETRY_CONFIG,
  deliveryReportFormat: SMS_DELIVERY_REPORT_FORMAT,
} as const;

export type SmsIdPrefix = typeof SMS_ID_PREFIX;
export type SmsEncoding = (typeof SMS_ENCODING)[keyof typeof SMS_ENCODING];
export type SmsPriority = (typeof SMS_PRIORITY)[keyof typeof SMS_PRIORITY];

export interface SmsRetryConfig {
  MAX_RETRIES: number;
  RETRY_DELAYS: number[];
  BACKOFF_MULTIPLIER: number;
}

export interface SmsDeliveryReportFormat {
  FORMAT: string;
  FIELDS: string[];
}

export interface SmsDefaultSettings {
  defaultSenderId: string;
  maxSmsLength: number;
  maxUnicodeSmsLength: number;
  maxConcatenatedParts: number;
  rateLimit: number;
  timeout: number;
  retryConfig: SmsRetryConfig;
  deliveryReportFormat: SmsDeliveryReportFormat;
}

export interface Sms {
  id: string;
  to: string;
  from: string;
  message: string;
  encoding: SmsEncoding;
  priority: SmsPriority;
  isUnicode: boolean;
  parts: number;
  metadata?: Record<string, unknown>;
  sentAt?: Date;
  deliveredAt?: Date;
  status?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface SmsDeliveryReport {
  messageId: string;
  status: string;
  deliveredAt?: Date;
  errorCode?: string;
  errorMessage?: string;
  metadata?: Record<string, unknown>;
}

export interface SmsAnalytics {
  totalSent: number;
  totalDelivered: number;
  totalFailed: number;
  deliveryRate: number;
  averageParts: number;
  period: string;
}

/**
 * SMS কনফিগারেশন
 */
export const SMS_CONFIG = {
  idPrefix: SMS_ID_PREFIX,
  numberFormat: SMS_NUMBER_FORMAT,
  defaultSettings: SMS_DEFAULT_SETTINGS,
  encoding: SMS_ENCODING,
  priority: SMS_PRIORITY,
} as const;

/**
 * SMS ইভেন্ট টাইপ
 */
export const SMS_EVENT_TYPES = {
  CREATED: 'sms_created',
  QUEUED: 'sms_queued',
  SENT: 'sms_sent',
  DELIVERED: 'sms_delivered',
  FAILED: 'sms_failed',
  RETRY: 'sms_retry',
} as const;

export type SmsEventType = (typeof SMS_EVENT_TYPES)[keyof typeof SMS_EVENT_TYPES];
