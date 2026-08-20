/**
 * কিউ এবং মেসেজ ব্রোকার সম্পর্কিত কনস্ট্যান্টসমূহ
 */

// কিউ টাইপ
export const QUEUE_TYPES = {
  BULL: 'bull',
  RABBITMQ: 'rabbitmq',
  KAFKA: 'kafka',
  SQS: 'sqs',
} as const;

// ডিফল্ট কিউ ডেলে (মিলিসেকেন্ডে)
export const DEFAULT_QUEUE_DELAY = 1000;

// ডিফল্ট কিউ রিট্রাই লিমিট
export const DEFAULT_QUEUE_RETRY_LIMIT = 3;

// কিউ কনকারেন্সি লিমিট
export const QUEUE_CONCURRENCY_LIMIT = 10;

// ডিফল্ট কিউ টাইমআউট (মিলিসেকেন্ডে)
export const DEFAULT_QUEUE_TIMEOUT = 30000; // ৩০ সেকেন্ড

// কিউ প্রায়োরিটি লেভেল
export const QUEUE_PRIORITY_LEVELS = {
  CRITICAL: 1,
  HIGH: 2,
  MEDIUM: 3,
  LOW: 4,
  BACKGROUND: 5,
} as const;

// কিউ ডেড লেটার এক্সচেঞ্জ
export const QUEUE_DEAD_LETTER_EXCHANGE = 'dead_letter_exchange';

// কিউ ডেড লেটার রাউটিং কী
export const QUEUE_DEAD_LETTER_ROUTING_KEY = 'dead_letter';

// কিউ রিট্রাই ডেলে সেটিংস
export const QUEUE_RETRY_DELAY = {
  FIRST: 1000, // ১ সেকেন্ড
  SECOND: 5000, // ৫ সেকেন্ড
  THIRD: 15000, // ১৫ সেকেন্ড
  MAX: 60000, // ১ মিনিট
} as const;

// কিউ ক্লিনআপ ইন্টারভাল (ঘন্টায়)
export const QUEUE_CLEANUP_INTERVAL = 24;

// কিউ মনিটরিং ইন্টারভাল (মিনিটে)
export const QUEUE_MONITORING_INTERVAL = 5;

// কিউ ব্যাচ প্রসেসিং সাইজ
export const QUEUE_BATCH_PROCESSING_SIZE = 50;

// কিউ নাম
export const QUEUE_NAMES = {
  EMAIL: 'email_queue',
  NOTIFICATION: 'notification_queue',
  REPORT: 'report_queue',
  AUDIT: 'audit_queue',
  LOG: 'log_queue',
  PROCESSING: 'processing_queue',
  BACKGROUND: 'background_queue',
  SCHEDULED: 'scheduled_queue',
  RETRY: 'retry_queue',
  DEAD_LETTER: 'dead_letter_queue',
} as const;

// কিউ ডেলিভারি মোড
export const QUEUE_DELIVERY_MODES = {
  PERSISTENT: 'persistent',
  NON_PERSISTENT: 'non_persistent',
} as const;

// কিউ এক্সচেঞ্জ টাইপ
export const QUEUE_EXCHANGE_TYPES = {
  DIRECT: 'direct',
  TOPIC: 'topic',
  FANOUT: 'fanout',
  HEADERS: 'headers',
} as const;

// কিউ প্রিফেচ কাউন্ট
export const QUEUE_PREFETCH_COUNT = 10;

// কিউ ম্যাক্স মেসেজ সাইজ (এমবি)
export const QUEUE_MAX_MESSAGE_SIZE = 10;

// কিউ টাইটমআউট সেটিংস
export const QUEUE_TIMEOUT_SETTINGS = {
  CONNECTION: 5000, // মিলিসেকেন্ড
  CHANNEL: 3000, // মিলিসেকেন্ড
  OPERATION: 10000, // মিলিসেকেন্ড
} as const;

// কিউ রিকানেক্ট সেটিংস
export const QUEUE_RECONNECT = {
  enabled: true,
  maxAttempts: 5,
  initialDelay: 1000, // মিলিসেকেন্ড
  maxDelay: 30000, // মিলিসেকেন্ড
} as const;

// কিউ মনিটরিং সেটিংস
export const QUEUE_MONITORING = {
  enabled: true,
  alertThreshold: 1000, // কিউতে পেন্ডিং মেসেজ
  notificationEmail: 'admin@vubon.com',
} as const;

// কিউ এনক্রিপশন সেটিংস
export const QUEUE_ENCRYPTION = {
  enabled: true,
  algorithm: 'aes-256-gcm',
  keyRotation: 30, // দিন
} as const;

// কিউ অ্যাকনোয়েজমেন্ট মোড
export const QUEUE_ACKNOWLEDGMENT_MODES = {
  AUTO: 'auto',
  MANUAL: 'manual',
  NONE: 'none',
} as const;

// কিউ মেসেজ টাইপ
export const QUEUE_MESSAGE_TYPES = {
  JSON: 'json',
  TEXT: 'text',
  BINARY: 'binary',
  XML: 'xml',
} as const;
