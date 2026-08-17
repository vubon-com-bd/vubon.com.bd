// ============================================
// নোটিফিকেশন সিস্টেমের মৌলিক কনস্ট্যান্টসমূহ
// ============================================

// ============================================
// ১. মৌলিক কনফিগারেশন কনস্ট্যান্ট
// ============================================

/**
 * নোটিফিকেশনের সর্বোচ্চ আকার (বাইটে)
 * @default 10240 (10KB)
 */
export const NOTIFICATION_MAX_SIZE = 10240;

/**
 * নোটিফিকেশনের ডিফল্ট এক্সপাইরি সময় (মিলিসেকেন্ডে)
 * @default 604800000 (৭ দিন)
 */
export const NOTIFICATION_DEFAULT_EXPIRY = 7 * 24 * 60 * 60 * 1000;

/**
 * নোটিফিকেশন টাইমআউট (মিলিসেকেন্ডে)
 * @default 30000 (৩০ সেকেন্ড)
 */
export const NOTIFICATION_TIMEOUT = 30000;

/**
 * নোটিফিকেশন রেট লিমিট (প্রতি মিনিটে)
 * @default 60
 */
export const NOTIFICATION_RATE_LIMIT = 60;

/**
 * নোটিফিকেশন ব্যাচ সাইজ
 * @default 100
 */
export const NOTIFICATION_BATCH_SIZE = 100;

/**
 * নোটিফিকেশন রিট্রাই লিমিট
 * @default 3
 */
export const NOTIFICATION_RETRY_LIMIT = 3;

/**
 * নোটিফিকেশন রিট্রাই ডেলায় (মিলিসেকেন্ডে)
 * @default 1000 (১ সেকেন্ড)
 */
export const NOTIFICATION_RETRY_DELAY = 1000;

/**
 * নোটিফিকেশন ম্যাক্স রেট্রাই ডেলায় (মিলিসেকেন্ডে)
 * @default 30000 (৩০ সেকেন্ড)
 */
export const NOTIFICATION_MAX_RETRY_DELAY = 30000;

/**
 * নোটিফিকেশন রিট্রাই ব্যাকঅফ ফ্যাক্টর
 * @default 2
 */
export const NOTIFICATION_RETRY_BACKOFF_FACTOR = 2;

/**
 * নোটিফিকেশন ম্যাক্স পেন্ডিং কাউন্ট
 * @default 1000
 */
export const NOTIFICATION_MAX_PENDING_COUNT = 1000;

// ============================================
// ২. নোটিফিকেশন ডেলিভারি কনফিগারেশন
// ============================================

/**
 * নোটিফিকেশন ডেলিভারি টাইমআউট (মিলিসেকেন্ডে)
 * @default 5000 (৫ সেকেন্ড)
 */
export const NOTIFICATION_DELIVERY_TIMEOUT = 5000;

/**
 * নোটিফিকেশন ডেলিভারি ম্যাক্স রেট্রাই
 * @default 5
 */
export const NOTIFICATION_DELIVERY_MAX_RETRY = 5;

/**
 * নোটিফিকেশন ডেলিভারি ব্যাচ ডিলে (মিলিসেকেন্ডে)
 * @default 100
 */
export const NOTIFICATION_DELIVERY_BATCH_DELAY = 100;

/**
 * নোটিফিকেশন ডেলিভারি কনকারেন্সি লিমিট
 * @default 10
 */
export const NOTIFICATION_DELIVERY_CONCURRENCY_LIMIT = 10;

// ============================================
// ৩. নোটিফিকেশন কিউ কনফিগারেশন
// ============================================

/**
 * নোটিফিকেশন কিউ ম্যাক্স সাইজ
 * @default 10000
 */
export const NOTIFICATION_QUEUE_MAX_SIZE = 10000;

/**
 * নোটিফিকেশন কিউ ড্রেন ইন্টারভাল (মিলিসেকেন্ডে)
 * @default 1000 (১ সেকেন্ড)
 */
export const NOTIFICATION_QUEUE_DRAIN_INTERVAL = 1000;

/**
 * নোটিফিকেশন কিউ ব্যাচ প্রসেস সাইজ
 * @default 50
 */
export const NOTIFICATION_QUEUE_BATCH_PROCESS_SIZE = 50;

// ============================================
// ৪. নোটিফিকেশন ডেটাবেস কনফিগারেশন
// ============================================

/**
 * নোটিফিকেশন ডিবি ম্যাক্স সংযোগ
 * @default 20
 */
export const NOTIFICATION_DB_MAX_CONNECTIONS = 20;

/**
 * নোটিফিকেশন ডিবি আইডল টাইমআউট (মিলিসেকেন্ডে)
 * @default 30000 (৩০ সেকেন্ড)
 */
export const NOTIFICATION_DB_IDLE_TIMEOUT = 30000;

/**
 * নোটিফিকেশন ডিবি কুয়েরি টাইমআউট (মিলিসেকেন্ডে)
 * @default 5000 (৫ সেকেন্ড)
 */
export const NOTIFICATION_DB_QUERY_TIMEOUT = 5000;

// ============================================
// ৫. নোটিফিকেশন ক্যাশ কনফিগারেশন
// ============================================

/**
 * নোটিফিকেশন ক্যাশ টিটিএল (মিলিসেকেন্ডে)
 * @default 3600000 (১ ঘন্টা)
 */
export const NOTIFICATION_CACHE_TTL = 60 * 60 * 1000;

/**
 * নোটিফিকেশন ক্যাশ ম্যাক্স সাইজ
 * @default 1000
 */
export const NOTIFICATION_CACHE_MAX_SIZE = 1000;

// ============================================
// ৬. নোটিফিকেশন টেমপ্লেট কনফিগারেশন
// ============================================

/**
 * নোটিফিকেশন টেমপ্লেট ম্যাক্স লেংথ
 * @default 10000 (১০KB)
 */
export const NOTIFICATION_TEMPLATE_MAX_LENGTH = 10000;

/**
 * নোটিফিকেশন টেমপ্লেট ক্যাশ টিটিএল (মিলিসেকেন্ডে)
 * @default 3600000 (১ ঘন্টা)
 */
export const NOTIFICATION_TEMPLATE_CACHE_TTL = 60 * 60 * 1000;

// ============================================
// ৭. নোটিফিকেশন চ্যানেল কনফিগারেশন
// ============================================

/**
 * নোটিফিকেশন চ্যানেল ম্যাক্স রেট্রাই
 * @default 3
 */
export const NOTIFICATION_CHANNEL_MAX_RETRY = 3;

/**
 * নোটিফিকেশন চ্যানেল টাইমআউট (মিলিসেকেন্ডে)
 * @default 5000 (৫ সেকেন্ড)
 */
export const NOTIFICATION_CHANNEL_TIMEOUT = 5000;

// ============================================
// ৮. কনফিগারেশন অবজেক্ট
// ============================================

/**
 * নোটিফিকেশন কনফিগারেশন টাইপ
 */
export interface NotificationConfig {
  /** সর্বোচ্চ নোটিফিকেশন সাইজ (বাইটে) */
  maxSize: number;
  /** ডিফল্ট এক্সপাইরি সময় (মিলিসেকেন্ডে) */
  defaultExpiry: number;
  /** টাইমআউট (মিলিসেকেন্ডে) */
  timeout: number;
  /** রেট লিমিট (প্রতি মিনিটে) */
  rateLimit: number;
  /** ব্যাচ সাইজ */
  batchSize: number;
  /** রিট্রাই লিমিট */
  retryLimit: number;
  /** রিট্রাই ডেলায় (মিলিসেকেন্ডে) */
  retryDelay: number;
  /** ম্যাক্স রেট্রাই ডেলায় (মিলিসেকেন্ডে) */
  maxRetryDelay: number;
  /** রিট্রাই ব্যাকঅফ ফ্যাক্টর */
  retryBackoffFactor: number;
  /** ম্যাক্স পেন্ডিং কাউন্ট */
  maxPendingCount: number;
  /** ডেলিভারি টাইমআউট (মিলিসেকেন্ডে) */
  deliveryTimeout: number;
  /** ডেলিভারি ম্যাক্স রেট্রাই */
  deliveryMaxRetry: number;
  /** ডেলিভারি ব্যাচ ডিলে (মিলিসেকেন্ডে) */
  deliveryBatchDelay: number;
  /** ডেলিভারি কনকারেন্সি লিমিট */
  deliveryConcurrencyLimit: number;
  /** কিউ ম্যাক্স সাইজ */
  queueMaxSize: number;
  /** কিউ ড্রেন ইন্টারভাল (মিলিসেকেন্ডে) */
  queueDrainInterval: number;
  /** কিউ ব্যাচ প্রসেস সাইজ */
  queueBatchProcessSize: number;
  /** ডিবি ম্যাক্স সংযোগ */
  dbMaxConnections: number;
  /** ডিবি আইডল টাইমআউট (মিলিসেকেন্ডে) */
  dbIdleTimeout: number;
  /** ডিবি কুয়েরি টাইমআউট (মিলিসেকেন্ডে) */
  dbQueryTimeout: number;
  /** ক্যাশ টিটিএল (মিলিসেকেন্ডে) */
  cacheTtl: number;
  /** ক্যাশ ম্যাক্স সাইজ */
  cacheMaxSize: number;
  /** টেমপ্লেট ম্যাক্স লেংথ */
  templateMaxLength: number;
  /** টেমপ্লেট ক্যাশ টিটিএল (মিলিসেকেন্ডে) */
  templateCacheTtl: number;
  /** চ্যানেল ম্যাক্স রেট্রাই */
  channelMaxRetry: number;
  /** চ্যানেল টাইমআউট (মিলিসেকেন্ডে) */
  channelTimeout: number;
}

/**
 * ডিফল্ট নোটিফিকেশন কনফিগারেশন
 */
export const NOTIFICATION_DEFAULT_CONFIG: NotificationConfig = {
  maxSize: NOTIFICATION_MAX_SIZE,
  defaultExpiry: NOTIFICATION_DEFAULT_EXPIRY,
  timeout: NOTIFICATION_TIMEOUT,
  rateLimit: NOTIFICATION_RATE_LIMIT,
  batchSize: NOTIFICATION_BATCH_SIZE,
  retryLimit: NOTIFICATION_RETRY_LIMIT,
  retryDelay: NOTIFICATION_RETRY_DELAY,
  maxRetryDelay: NOTIFICATION_MAX_RETRY_DELAY,
  retryBackoffFactor: NOTIFICATION_RETRY_BACKOFF_FACTOR,
  maxPendingCount: NOTIFICATION_MAX_PENDING_COUNT,
  deliveryTimeout: NOTIFICATION_DELIVERY_TIMEOUT,
  deliveryMaxRetry: NOTIFICATION_DELIVERY_MAX_RETRY,
  deliveryBatchDelay: NOTIFICATION_DELIVERY_BATCH_DELAY,
  deliveryConcurrencyLimit: NOTIFICATION_DELIVERY_CONCURRENCY_LIMIT,
  queueMaxSize: NOTIFICATION_QUEUE_MAX_SIZE,
  queueDrainInterval: NOTIFICATION_QUEUE_DRAIN_INTERVAL,
  queueBatchProcessSize: NOTIFICATION_QUEUE_BATCH_PROCESS_SIZE,
  dbMaxConnections: NOTIFICATION_DB_MAX_CONNECTIONS,
  dbIdleTimeout: NOTIFICATION_DB_IDLE_TIMEOUT,
  dbQueryTimeout: NOTIFICATION_DB_QUERY_TIMEOUT,
  cacheTtl: NOTIFICATION_CACHE_TTL,
  cacheMaxSize: NOTIFICATION_CACHE_MAX_SIZE,
  templateMaxLength: NOTIFICATION_TEMPLATE_MAX_LENGTH,
  templateCacheTtl: NOTIFICATION_TEMPLATE_CACHE_TTL,
  channelMaxRetry: NOTIFICATION_CHANNEL_MAX_RETRY,
  channelTimeout: NOTIFICATION_CHANNEL_TIMEOUT,
};
