// ============================================
// ব্রডকাস্ট নোটিফিকেশন সংক্রান্ত মৌলিক কনস্ট্যান্টসমূহ
// ============================================

// ============================================
// ১. ব্রডকাস্ট মৌলিক কনফিগারেশন
// ============================================

/**
 * সর্বোচ্চ রিসিপিয়েন্ট কাউন্ট
 * @default 1000000 (১০ লক্ষ)
 */
export const NOTIFICATION_BROADCAST_MAX_RECIPIENTS = 1000000;

/**
 * ডিফল্ট ব্রডকাস্ট ব্যাচ সাইজ
 * @default 1000
 */
export const NOTIFICATION_BROADCAST_DEFAULT_BATCH_SIZE = 1000;

/**
 * সর্বোচ্চ ব্রডকাস্ট ব্যাচ সাইজ
 * @default 10000
 */
export const NOTIFICATION_BROADCAST_MAX_BATCH_SIZE = 10000;

/**
 * ডিফল্ট ব্রডকাস্ট টাইমআউট (মিলিসেকেন্ডে)
 * @default 300000 (৫ মিনিট)
 */
export const NOTIFICATION_BROADCAST_DEFAULT_TIMEOUT = 5 * 60 * 1000;

/**
 * সর্বোচ্চ ব্রডকাস্ট টাইমআউট (মিলিসেকেন্ডে)
 * @default 3600000 (১ ঘন্টা)
 */
export const NOTIFICATION_BROADCAST_MAX_TIMEOUT = 60 * 60 * 1000;

/**
 * ডিফল্ট ব্রডকাস্ট প্রায়োরিটি
 * @default 'NORMAL'
 */
export const NOTIFICATION_BROADCAST_DEFAULT_PRIORITY = 'NORMAL';

/**
 * ডিফল্ট ব্রডকাস্ট রেট লিমিট (প্রতি সেকেন্ডে)
 * @default 100
 */
export const NOTIFICATION_BROADCAST_DEFAULT_RATE_LIMIT = 100;

/**
 * সর্বোচ্চ ব্রডকাস্ট রেট লিমিট (প্রতি সেকেন্ডে)
 * @default 1000
 */
export const NOTIFICATION_BROADCAST_MAX_RATE_LIMIT = 1000;

/**
 * ডিফল্ট ব্রডকাস্ট রিট্রাই লিমিট
 * @default 3
 */
export const NOTIFICATION_BROADCAST_DEFAULT_RETRY_LIMIT = 3;

/**
 * ডিফল্ট ব্রডকাস্ট রিট্রাই ডেলায় (মিলিসেকেন্ডে)
 * @default 60000 (১ মিনিট)
 */
export const NOTIFICATION_BROADCAST_DEFAULT_RETRY_DELAY = 60 * 1000;

/**
 * ডিফল্ট ব্রডকাস্ট কনকারেন্সি লিমিট
 * @default 10
 */
export const NOTIFICATION_BROADCAST_DEFAULT_CONCURRENCY = 10;

/**
 * সর্বোচ্চ ব্রডকাস্ট কনকারেন্সি লিমিট
 * @default 50
 */
export const NOTIFICATION_BROADCAST_MAX_CONCURRENCY = 50;

/**
 * ব্রডকাস্ট ক্যাশ টিটিএল (মিলিসেকেন্ডে)
 * @default 3600000 (১ ঘন্টা)
 */
export const NOTIFICATION_BROADCAST_CACHE_TTL = 60 * 60 * 1000;

/**
 * ব্রডকাস্ট ক্যাশ ম্যাক্স সাইজ
 * @default 100
 */
export const NOTIFICATION_BROADCAST_CACHE_MAX_SIZE = 100;

// ============================================
// ২. ব্রডকাস্ট চ্যানেল
// ============================================

/**
 * ব্রডকাস্ট চ্যানেল টাইপ
 */
export type NotificationBroadcastChannel =
  | typeof NOTIFICATION_BROADCAST_CHANNEL_EMAIL
  | typeof NOTIFICATION_BROADCAST_CHANNEL_SMS
  | typeof NOTIFICATION_BROADCAST_CHANNEL_PUSH
  | typeof NOTIFICATION_BROADCAST_CHANNEL_IN_APP
  | typeof NOTIFICATION_BROADCAST_CHANNEL_SLACK
  | typeof NOTIFICATION_BROADCAST_CHANNEL_TELEGRAM
  | typeof NOTIFICATION_BROADCAST_CHANNEL_WHATSAPP
  | typeof NOTIFICATION_BROADCAST_CHANNEL_DISCORD
  | typeof NOTIFICATION_BROADCAST_CHANNEL_MESSENGER
  | typeof NOTIFICATION_BROADCAST_CHANNEL_ALL;

/**
 * ইমেইল চ্যানেল
 */
export const NOTIFICATION_BROADCAST_CHANNEL_EMAIL = 'EMAIL';

/**
 * এসএমএস চ্যানেল
 */
export const NOTIFICATION_BROADCAST_CHANNEL_SMS = 'SMS';

/**
 * পুশ চ্যানেল
 */
export const NOTIFICATION_BROADCAST_CHANNEL_PUSH = 'PUSH';

/**
 * ইন-অ্যাপ চ্যানেল
 */
export const NOTIFICATION_BROADCAST_CHANNEL_IN_APP = 'IN_APP';

/**
 * স্ল্যাক চ্যানেল
 */
export const NOTIFICATION_BROADCAST_CHANNEL_SLACK = 'SLACK';

/**
 * টেলিগ্রাম চ্যানেল
 */
export const NOTIFICATION_BROADCAST_CHANNEL_TELEGRAM = 'TELEGRAM';

/**
 * হোয়াটসঅ্যাপ চ্যানেল
 */
export const NOTIFICATION_BROADCAST_CHANNEL_WHATSAPP = 'WHATSAPP';

/**
 * ডিসকর্ড চ্যানেল
 */
export const NOTIFICATION_BROADCAST_CHANNEL_DISCORD = 'DISCORD';

/**
 * মেসেঞ্জার চ্যানেল
 */
export const NOTIFICATION_BROADCAST_CHANNEL_MESSENGER = 'MESSENGER';

/**
 * সকল চ্যানেল
 */
export const NOTIFICATION_BROADCAST_CHANNEL_ALL = 'ALL';

// ============================================
// ৩. ব্রডকাস্ট প্রায়োরিটি
// ============================================

/**
 * ব্রডকাস্ট প্রায়োরিটি টাইপ
 */
export type NotificationBroadcastPriority =
  | typeof NOTIFICATION_BROADCAST_PRIORITY_LOW
  | typeof NOTIFICATION_BROADCAST_PRIORITY_NORMAL
  | typeof NOTIFICATION_BROADCAST_PRIORITY_HIGH
  | typeof NOTIFICATION_BROADCAST_PRIORITY_URGENT
  | typeof NOTIFICATION_BROADCAST_PRIORITY_CRITICAL;

/**
 * লো প্রায়োরিটি
 */
export const NOTIFICATION_BROADCAST_PRIORITY_LOW = 'LOW';

/**
 * নরমাল প্রায়োরিটি
 */
export const NOTIFICATION_BROADCAST_PRIORITY_NORMAL = 'NORMAL';

/**
 * হাই প্রায়োরিটি
 */
export const NOTIFICATION_BROADCAST_PRIORITY_HIGH = 'HIGH';

/**
 * আর্জেন্ট প্রায়োরিটি
 */
export const NOTIFICATION_BROADCAST_PRIORITY_URGENT = 'URGENT';

/**
 * ক্রিটিকাল প্রায়োরিটি
 */
export const NOTIFICATION_BROADCAST_PRIORITY_CRITICAL = 'CRITICAL';

// ============================================
// ৪. ব্রডকাস্ট স্ট্যাটাস
// ============================================

/**
 * ব্রডকাস্ট স্ট্যাটাস টাইপ
 */
export type NotificationBroadcastStatus =
  | typeof NOTIFICATION_BROADCAST_STATUS_PENDING
  | typeof NOTIFICATION_BROADCAST_STATUS_PROCESSING
  | typeof NOTIFICATION_BROADCAST_STATUS_COMPLETED
  | typeof NOTIFICATION_BROADCAST_STATUS_FAILED
  | typeof NOTIFICATION_BROADCAST_STATUS_CANCELLED
  | typeof NOTIFICATION_BROADCAST_STATUS_PAUSED
  | typeof NOTIFICATION_BROADCAST_STATUS_PARTIAL;

/**
 * পেন্ডিং স্ট্যাটাস
 */
export const NOTIFICATION_BROADCAST_STATUS_PENDING = 'PENDING';

/**
 * প্রসেসিং স্ট্যাটাস
 */
export const NOTIFICATION_BROADCAST_STATUS_PROCESSING = 'PROCESSING';

/**
 * কমপ্লিটেড স্ট্যাটাস
 */
export const NOTIFICATION_BROADCAST_STATUS_COMPLETED = 'COMPLETED';

/**
 * ফেইলড স্ট্যাটাস
 */
export const NOTIFICATION_BROADCAST_STATUS_FAILED = 'FAILED';

/**
 * ক্যান্সেলড স্ট্যাটাস
 */
export const NOTIFICATION_BROADCAST_STATUS_CANCELLED = 'CANCELLED';

/**
 * পজড স্ট্যাটাস
 */
export const NOTIFICATION_BROADCAST_STATUS_PAUSED = 'PAUSED';

/**
 * পার্শিয়াল স্ট্যাটাস
 */
export const NOTIFICATION_BROADCAST_STATUS_PARTIAL = 'PARTIAL';

// ============================================
// ৫. ব্রডকাস্ট কনফিগারেশন
// ============================================

/**
 * ব্রডকাস্ট কনফিগারেশন ইন্টারফেস
 */
export interface NotificationBroadcastConfig {
  /** সর্বোচ্চ রিসিপিয়েন্ট কাউন্ট */
  maxRecipients: number;
  /** ডিফল্ট ব্যাচ সাইজ */
  defaultBatchSize: number;
  /** সর্বোচ্চ ব্যাচ সাইজ */
  maxBatchSize: number;
  /** ডিফল্ট টাইমআউট */
  defaultTimeout: number;
  /** সর্বোচ্চ টাইমআউট */
  maxTimeout: number;
  /** ডিফল্ট প্রায়োরিটি */
  defaultPriority: NotificationBroadcastPriority;
  /** ডিফল্ট রেট লিমিট */
  defaultRateLimit: number;
  /** সর্বোচ্চ রেট লিমিট */
  maxRateLimit: number;
  /** ডিফল্ট রিট্রাই লিমিট */
  defaultRetryLimit: number;
  /** ডিফল্ট রিট্রাই ডেলায় */
  defaultRetryDelay: number;
  /** ডিফল্ট কনকারেন্সি লিমিট */
  defaultConcurrency: number;
  /** সর্বোচ্চ কনকারেন্সি লিমিট */
  maxConcurrency: number;
  /** ক্যাশ টিটিএল */
  cacheTtl: number;
  /** ক্যাশ ম্যাক্স সাইজ */
  cacheMaxSize: number;
}

/**
 * ডিফল্ট ব্রডকাস্ট কনফিগারেশন
 */
export const NOTIFICATION_BROADCAST_DEFAULT_CONFIG: NotificationBroadcastConfig = {
  maxRecipients: NOTIFICATION_BROADCAST_MAX_RECIPIENTS,
  defaultBatchSize: NOTIFICATION_BROADCAST_DEFAULT_BATCH_SIZE,
  maxBatchSize: NOTIFICATION_BROADCAST_MAX_BATCH_SIZE,
  defaultTimeout: NOTIFICATION_BROADCAST_DEFAULT_TIMEOUT,
  maxTimeout: NOTIFICATION_BROADCAST_MAX_TIMEOUT,
  defaultPriority: NOTIFICATION_BROADCAST_DEFAULT_PRIORITY,
  defaultRateLimit: NOTIFICATION_BROADCAST_DEFAULT_RATE_LIMIT,
  maxRateLimit: NOTIFICATION_BROADCAST_MAX_RATE_LIMIT,
  defaultRetryLimit: NOTIFICATION_BROADCAST_DEFAULT_RETRY_LIMIT,
  defaultRetryDelay: NOTIFICATION_BROADCAST_DEFAULT_RETRY_DELAY,
  defaultConcurrency: NOTIFICATION_BROADCAST_DEFAULT_CONCURRENCY,
  maxConcurrency: NOTIFICATION_BROADCAST_MAX_CONCURRENCY,
  cacheTtl: NOTIFICATION_BROADCAST_CACHE_TTL,
  cacheMaxSize: NOTIFICATION_BROADCAST_CACHE_MAX_SIZE,
};

// ============================================
// ৬. ব্রডকাস্ট চ্যানেল লেবেল
// ============================================

/**
 * ব্রডকাস্ট চ্যানেল লেবেল
 */
export const NOTIFICATION_BROADCAST_CHANNEL_LABELS: Record<NotificationBroadcastChannel, string> = {
  [NOTIFICATION_BROADCAST_CHANNEL_EMAIL]: 'ইমেইল',
  [NOTIFICATION_BROADCAST_CHANNEL_SMS]: 'এসএমএস',
  [NOTIFICATION_BROADCAST_CHANNEL_PUSH]: 'পুশ',
  [NOTIFICATION_BROADCAST_CHANNEL_IN_APP]: 'ইন-অ্যাপ',
  [NOTIFICATION_BROADCAST_CHANNEL_SLACK]: 'স্ল্যাক',
  [NOTIFICATION_BROADCAST_CHANNEL_TELEGRAM]: 'টেলিগ্রাম',
  [NOTIFICATION_BROADCAST_CHANNEL_WHATSAPP]: 'হোয়াটসঅ্যাপ',
  [NOTIFICATION_BROADCAST_CHANNEL_DISCORD]: 'ডিসকর্ড',
  [NOTIFICATION_BROADCAST_CHANNEL_MESSENGER]: 'মেসেঞ্জার',
  [NOTIFICATION_BROADCAST_CHANNEL_ALL]: 'সকল চ্যানেল',
};

// ============================================
// ৭. ব্রডকাস্ট প্রায়োরিটি লেবেল
// ============================================

/**
 * ব্রডকাস্ট প্রায়োরিটি লেবেল
 */
export const NOTIFICATION_BROADCAST_PRIORITY_LABELS: Record<NotificationBroadcastPriority, string> =
  {
    [NOTIFICATION_BROADCAST_PRIORITY_LOW]: 'নিম্ন',
    [NOTIFICATION_BROADCAST_PRIORITY_NORMAL]: 'স্বাভাবিক',
    [NOTIFICATION_BROADCAST_PRIORITY_HIGH]: 'উচ্চ',
    [NOTIFICATION_BROADCAST_PRIORITY_URGENT]: 'জরুরি',
    [NOTIFICATION_BROADCAST_PRIORITY_CRITICAL]: 'অত্যন্ত জরুরি',
  };

// ============================================
// ৮. ব্রডকাস্ট স্ট্যাটাস লেবেল
// ============================================

/**
 * ব্রডকাস্ট স্ট্যাটাস লেবেল
 */
export const NOTIFICATION_BROADCAST_STATUS_LABELS: Record<NotificationBroadcastStatus, string> = {
  [NOTIFICATION_BROADCAST_STATUS_PENDING]: 'অপেক্ষমান',
  [NOTIFICATION_BROADCAST_STATUS_PROCESSING]: 'প্রক্রিয়াকরণ',
  [NOTIFICATION_BROADCAST_STATUS_COMPLETED]: 'সম্পন্ন',
  [NOTIFICATION_BROADCAST_STATUS_FAILED]: 'ব্যর্থ',
  [NOTIFICATION_BROADCAST_STATUS_CANCELLED]: 'বাতিল',
  [NOTIFICATION_BROADCAST_STATUS_PAUSED]: 'স্থগিত',
  [NOTIFICATION_BROADCAST_STATUS_PARTIAL]: 'আংশিক',
};
