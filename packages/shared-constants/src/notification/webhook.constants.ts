// ============================================
// ওয়েবহুক সংক্রান্ত মৌলিক কনস্ট্যান্টসমূহ
// ============================================

// ============================================
// ১. ওয়েবহুক মৌলিক কনফিগারেশন
// ============================================

/**
 * ডিফল্ট ওয়েবহুক টাইমআউট (মিলিসেকেন্ডে)
 * @default 30000 (৩০ সেকেন্ড)
 */
export const WEBHOOK_DEFAULT_TIMEOUT = 30000;

/**
 * সর্বোচ্চ ওয়েবহুক টাইমআউট (মিলিসেকেন্ডে)
 * @default 120000 (২ মিনিট)
 */
export const WEBHOOK_MAX_TIMEOUT = 120000;

/**
 * সর্বোচ্চ পেলোড সাইজ (বাইটে)
 * @default 1048576 (১MB)
 */
export const WEBHOOK_MAX_PAYLOAD_SIZE = 1024 * 1024;

/**
 * ডিফল্ট রিট্রাই লিমিট
 * @default 3
 */
export const WEBHOOK_DEFAULT_RETRY_LIMIT = 3;

/**
 * সর্বোচ্চ রিট্রাই লিমিট
 * @default 10
 */
export const WEBHOOK_MAX_RETRY_LIMIT = 10;

/**
 * ডিফল্ট রিট্রাই ডেলায় (মিলিসেকেন্ডে)
 * @default 60000 (১ মিনিট)
 */
export const WEBHOOK_DEFAULT_RETRY_DELAY = 60000;

/**
 * ডিফল্ট রিট্রাই ব্যাকঅফ ফ্যাক্টর
 * @default 2
 */
export const WEBHOOK_DEFAULT_RETRY_BACKOFF = 2;

/**
 * ডিফল্ট কানেকশন টাইমআউট (মিলিসেকেন্ডে)
 * @default 5000 (৫ সেকেন্ড)
 */
export const WEBHOOK_DEFAULT_CONNECTION_TIMEOUT = 5000;

/**
 * ডিফল্ট রিড টাইমআউট (মিলিসেকেন্ডে)
 * @default 10000 (১০ সেকেন্ড)
 */
export const WEBHOOK_DEFAULT_READ_TIMEOUT = 10000;

/**
 * ডিফল্ট ওয়েবহুক ব্যাচ সাইজ
 * @default 100
 */
export const WEBHOOK_DEFAULT_BATCH_SIZE = 100;

/**
 * ডিফল্ট ওয়েবহুক রেট লিমিট (প্রতি মিনিটে)
 * @default 60
 */
export const WEBHOOK_DEFAULT_RATE_LIMIT = 60;

// ============================================
// ২. সাপোর্টেড HTTP মেথড
// ============================================

/**
 * HTTP মেথড টাইপ
 */
export type WebhookMethod =
  | typeof WEBHOOK_METHOD_GET
  | typeof WEBHOOK_METHOD_POST
  | typeof WEBHOOK_METHOD_PUT
  | typeof WEBHOOK_METHOD_PATCH
  | typeof WEBHOOK_METHOD_DELETE
  | typeof WEBHOOK_METHOD_HEAD
  | typeof WEBHOOK_METHOD_OPTIONS;

/**
 * GET মেথড
 */
export const WEBHOOK_METHOD_GET = 'GET';

/**
 * POST মেথড
 */
export const WEBHOOK_METHOD_POST = 'POST';

/**
 * PUT মেথড
 */
export const WEBHOOK_METHOD_PUT = 'PUT';

/**
 * PATCH মেথড
 */
export const WEBHOOK_METHOD_PATCH = 'PATCH';

/**
 * DELETE মেথড
 */
export const WEBHOOK_METHOD_DELETE = 'DELETE';

/**
 * HEAD মেথড
 */
export const WEBHOOK_METHOD_HEAD = 'HEAD';

/**
 * OPTIONS মেথড
 */
export const WEBHOOK_METHOD_OPTIONS = 'OPTIONS';

// ============================================
// ৩. সিগনেচার অ্যালগরিদম
// ============================================

/**
 * সিগনেচার অ্যালগরিদম টাইপ
 */
export type WebhookSignatureAlgorithm =
  | typeof WEBHOOK_SIGNATURE_ALGORITHM_SHA1
  | typeof WEBHOOK_SIGNATURE_ALGORITHM_SHA256
  | typeof WEBHOOK_SIGNATURE_ALGORITHM_SHA384
  | typeof WEBHOOK_SIGNATURE_ALGORITHM_SHA512
  | typeof WEBHOOK_SIGNATURE_ALGORITHM_MD5;

/**
 * SHA1 অ্যালগরিদম
 */
export const WEBHOOK_SIGNATURE_ALGORITHM_SHA1 = 'SHA1';

/**
 * SHA256 অ্যালগরিদম
 */
export const WEBHOOK_SIGNATURE_ALGORITHM_SHA256 = 'SHA256';

/**
 * SHA384 অ্যালগরিদম
 */
export const WEBHOOK_SIGNATURE_ALGORITHM_SHA384 = 'SHA384';

/**
 * SHA512 অ্যালগরিদম
 */
export const WEBHOOK_SIGNATURE_ALGORITHM_SHA512 = 'SHA512';

/**
 * MD5 অ্যালগরিদম
 */
export const WEBHOOK_SIGNATURE_ALGORITHM_MD5 = 'MD5';

// ============================================
// ৪. ওয়েবহুক স্ট্যাটাস
// ============================================

/**
 * ওয়েবহুক স্ট্যাটাস টাইপ
 */
export type WebhookStatus =
  | typeof WEBHOOK_STATUS_PENDING
  | typeof WEBHOOK_STATUS_SUCCESS
  | typeof WEBHOOK_STATUS_FAILED
  | typeof WEBHOOK_STATUS_RETRYING
  | typeof WEBHOOK_STATUS_TIMEOUT
  | typeof WEBHOOK_STATUS_REJECTED
  | typeof WEBHOOK_STATUS_EXPIRED;

/**
 * পেন্ডিং স্ট্যাটাস
 */
export const WEBHOOK_STATUS_PENDING = 'PENDING';

/**
 * সাকসেস স্ট্যাটাস
 */
export const WEBHOOK_STATUS_SUCCESS = 'SUCCESS';

/**
 * ফেইলড স্ট্যাটাস
 */
export const WEBHOOK_STATUS_FAILED = 'FAILED';

/**
 * রিট্রাইং স্ট্যাটাস
 */
export const WEBHOOK_STATUS_RETRYING = 'RETRYING';

/**
 * টাইমআউট স্ট্যাটাস
 */
export const WEBHOOK_STATUS_TIMEOUT = 'TIMEOUT';

/**
 * রিজেক্টেড স্ট্যাটাস
 */
export const WEBHOOK_STATUS_REJECTED = 'REJECTED';

/**
 * এক্সপাইরড স্ট্যাটাস
 */
export const WEBHOOK_STATUS_EXPIRED = 'EXPIRED';

// ============================================
// ৫. ওয়েবহুক কন্টেন্ট টাইপ
// ============================================

/**
 * কন্টেন্ট টাইপ টাইপ
 */
export type WebhookContentType =
  | typeof WEBHOOK_CONTENT_TYPE_JSON
  | typeof WEBHOOK_CONTENT_TYPE_FORM_URLENCODED
  | typeof WEBHOOK_CONTENT_TYPE_MULTIPART_FORM_DATA
  | typeof WEBHOOK_CONTENT_TYPE_XML
  | typeof WEBHOOK_CONTENT_TYPE_TEXT_PLAIN
  | typeof WEBHOOK_CONTENT_TYPE_TEXT_HTML
  | typeof WEBHOOK_CONTENT_TYPE_OCTET_STREAM;

/**
 * JSON কন্টেন্ট টাইপ
 */
export const WEBHOOK_CONTENT_TYPE_JSON = 'application/json';

/**
 * Form URLEncoded কন্টেন্ট টাইপ
 */
export const WEBHOOK_CONTENT_TYPE_FORM_URLENCODED = 'application/x-www-form-urlencoded';

/**
 * Multipart Form Data কন্টেন্ট টাইপ
 */
export const WEBHOOK_CONTENT_TYPE_MULTIPART_FORM_DATA = 'multipart/form-data';

/**
 * XML কন্টেন্ট টাইপ
 */
export const WEBHOOK_CONTENT_TYPE_XML = 'application/xml';

/**
 * Text Plain কন্টেন্ট টাইপ
 */
export const WEBHOOK_CONTENT_TYPE_TEXT_PLAIN = 'text/plain';

/**
 * Text HTML কন্টেন্ট টাইপ
 */
export const WEBHOOK_CONTENT_TYPE_TEXT_HTML = 'text/html';

/**
 * Octet Stream কন্টেন্ট টাইপ
 */
export const WEBHOOK_CONTENT_TYPE_OCTET_STREAM = 'application/octet-stream';

// ============================================
// ৬. ওয়েবহুক হেডার
// ============================================

/**
 * স্ট্যান্ডার্ড ওয়েবহুক হেডার
 */
export const WEBHOOK_HEADERS = {
  /** সিগনেচার হেডার */
  SIGNATURE: 'X-Webhook-Signature',
  /** ইভেন্ট টাইপ হেডার */
  EVENT_TYPE: 'X-Webhook-Event-Type',
  /** ডেলিভারি আইডি হেডার */
  DELIVERY_ID: 'X-Webhook-Delivery-ID',
  /** টাইমস্ট্যাম্প হেডার */
  TIMESTAMP: 'X-Webhook-Timestamp',
  /** রিট্রাই কাউন্ট হেডার */
  RETRY_COUNT: 'X-Webhook-Retry-Count',
  /** ডেলিভারি স্ট্যাটাস হেডার */
  DELIVERY_STATUS: 'X-Webhook-Delivery-Status',
  /** সোর্স হেডার */
  SOURCE: 'X-Webhook-Source',
  /** ভার্সন হেডার */
  VERSION: 'X-Webhook-Version',
} as const;

// ============================================
// ৭. ওয়েবহুক কনফিগারেশন
// ============================================

/**
 * ওয়েবহুক কনফিগারেশন ইন্টারফেস
 */
export interface WebhookConfig {
  /** ডিফল্ট টাইমআউট */
  defaultTimeout: number;
  /** সর্বোচ্চ টাইমআউট */
  maxTimeout: number;
  /** সর্বোচ্চ পেলোড সাইজ */
  maxPayloadSize: number;
  /** ডিফল্ট রিট্রাই লিমিট */
  defaultRetryLimit: number;
  /** সর্বোচ্চ রিট্রাই লিমিট */
  maxRetryLimit: number;
  /** ডিফল্ট রিট্রাই ডেলায় */
  defaultRetryDelay: number;
  /** ডিফল্ট রিট্রাই ব্যাকঅফ */
  defaultRetryBackoff: number;
  /** ডিফল্ট কানেকশন টাইমআউট */
  defaultConnectionTimeout: number;
  /** ডিফল্ট রিড টাইমআউট */
  defaultReadTimeout: number;
  /** ডিফল্ট ব্যাচ সাইজ */
  defaultBatchSize: number;
  /** ডিফল্ট রেট লিমিট */
  defaultRateLimit: number;
}

/**
 * ডিফল্ট ওয়েবহুক কনফিগারেশন
 */
export const WEBHOOK_DEFAULT_CONFIG: WebhookConfig = {
  defaultTimeout: WEBHOOK_DEFAULT_TIMEOUT,
  maxTimeout: WEBHOOK_MAX_TIMEOUT,
  maxPayloadSize: WEBHOOK_MAX_PAYLOAD_SIZE,
  defaultRetryLimit: WEBHOOK_DEFAULT_RETRY_LIMIT,
  maxRetryLimit: WEBHOOK_MAX_RETRY_LIMIT,
  defaultRetryDelay: WEBHOOK_DEFAULT_RETRY_DELAY,
  defaultRetryBackoff: WEBHOOK_DEFAULT_RETRY_BACKOFF,
  defaultConnectionTimeout: WEBHOOK_DEFAULT_CONNECTION_TIMEOUT,
  defaultReadTimeout: WEBHOOK_DEFAULT_READ_TIMEOUT,
  defaultBatchSize: WEBHOOK_DEFAULT_BATCH_SIZE,
  defaultRateLimit: WEBHOOK_DEFAULT_RATE_LIMIT,
};

// ============================================
// ৮. HTTP মেথড লেবেল
// ============================================

/**
 * HTTP মেথড লেবেল
 */
export const WEBHOOK_METHOD_LABELS: Record<WebhookMethod, string> = {
  [WEBHOOK_METHOD_GET]: 'GET',
  [WEBHOOK_METHOD_POST]: 'POST',
  [WEBHOOK_METHOD_PUT]: 'PUT',
  [WEBHOOK_METHOD_PATCH]: 'PATCH',
  [WEBHOOK_METHOD_DELETE]: 'DELETE',
  [WEBHOOK_METHOD_HEAD]: 'HEAD',
  [WEBHOOK_METHOD_OPTIONS]: 'OPTIONS',
};

// ============================================
// ৯. সিগনেচার অ্যালগরিদম লেবেল
// ============================================

/**
 * সিগনেচার অ্যালগরিদম লেবেল
 */
export const WEBHOOK_SIGNATURE_ALGORITHM_LABELS: Record<WebhookSignatureAlgorithm, string> = {
  [WEBHOOK_SIGNATURE_ALGORITHM_SHA1]: 'SHA-1',
  [WEBHOOK_SIGNATURE_ALGORITHM_SHA256]: 'SHA-256',
  [WEBHOOK_SIGNATURE_ALGORITHM_SHA384]: 'SHA-384',
  [WEBHOOK_SIGNATURE_ALGORITHM_SHA512]: 'SHA-512',
  [WEBHOOK_SIGNATURE_ALGORITHM_MD5]: 'MD5',
};

// ============================================
// ১০. ওয়েবহুক স্ট্যাটাস লেবেল
// ============================================

/**
 * ওয়েবহুক স্ট্যাটাস লেবেল
 */
export const WEBHOOK_STATUS_LABELS: Record<WebhookStatus, string> = {
  [WEBHOOK_STATUS_PENDING]: 'অপেক্ষমান',
  [WEBHOOK_STATUS_SUCCESS]: 'সফল',
  [WEBHOOK_STATUS_FAILED]: 'ব্যর্থ',
  [WEBHOOK_STATUS_RETRYING]: 'পুনরায় চেষ্টা',
  [WEBHOOK_STATUS_TIMEOUT]: 'টাইমআউট',
  [WEBHOOK_STATUS_REJECTED]: 'প্রত্যাখ্যান',
  [WEBHOOK_STATUS_EXPIRED]: 'মেয়াদোত্তীর্ণ',
};

// ============================================
// ১১. কন্টেন্ট টাইপ লেবেল
// ============================================

/**
 * কন্টেন্ট টাইপ লেবেল
 */
export const WEBHOOK_CONTENT_TYPE_LABELS: Record<WebhookContentType, string> = {
  [WEBHOOK_CONTENT_TYPE_JSON]: 'JSON',
  [WEBHOOK_CONTENT_TYPE_FORM_URLENCODED]: 'Form URLEncoded',
  [WEBHOOK_CONTENT_TYPE_MULTIPART_FORM_DATA]: 'Multipart Form Data',
  [WEBHOOK_CONTENT_TYPE_XML]: 'XML',
  [WEBHOOK_CONTENT_TYPE_TEXT_PLAIN]: 'Plain Text',
  [WEBHOOK_CONTENT_TYPE_TEXT_HTML]: 'HTML',
  [WEBHOOK_CONTENT_TYPE_OCTET_STREAM]: 'Octet Stream',
};
