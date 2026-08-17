// ============================================
// এসএমএস সংক্রান্ত মৌলিক কনস্ট্যান্টসমূহ
// ============================================

// ============================================
// ১. এসএমএস মৌলিক কনফিগারেশন
// ============================================

/**
 * সর্বোচ্চ এসএমএস ক্যারেক্টার সাইজ (GSM এনকোডিং)
 * @default 160
 */
export const SMS_MAX_CHARS_GSM = 160;

/**
 * সর্বোচ্চ এসএমএস ক্যারেক্টার সাইজ (UNICODE এনকোডিং)
 * @default 70
 */
export const SMS_MAX_CHARS_UNICODE = 70;

/**
 * সর্বোচ্চ এসএমএস সেগমেন্ট সংখ্যা
 * @default 10
 */
export const SMS_MAX_SEGMENTS = 10;

/**
 * ডিফল্ট এসএমএস এনকোডিং
 * @default 'GSM'
 */
export const SMS_DEFAULT_ENCODING = 'GSM';

/**
 * ডিফল্ট কান্ট্রি কোড
 * @default '880' (বাংলাদেশ)
 */
export const SMS_DEFAULT_COUNTRY_CODE = '880';

/**
 * ডিফল্ট সেন্ডার আইডি
 * @default 'VUBON'
 */
export const SMS_DEFAULT_SENDER_ID = 'VUBON';

/**
 * সর্বোচ্চ সেন্ডার আইডি দৈর্ঘ্য
 * @default 11
 */
export const SMS_MAX_SENDER_ID_LENGTH = 11;

/**
 * এসএমএস টাইমআউট (মিলিসেকেন্ডে)
 * @default 30000 (৩০ সেকেন্ড)
 */
export const SMS_TIMEOUT = 30000;

/**
 * এসএমএস কানেকশন টাইমআউট (মিলিসেকেন্ডে)
 * @default 10000 (১০ সেকেন্ড)
 */
export const SMS_CONNECTION_TIMEOUT = 10000;

/**
 * এসএমএস রিট্রাই লিমিট
 * @default 3
 */
export const SMS_RETRY_LIMIT = 3;

/**
 * এসএমএস রিট্রাই ডেলায় (মিলিসেকেন্ডে)
 * @default 300000 (৫ মিনিট)
 */
export const SMS_RETRY_DELAY = 5 * 60 * 1000;

/**
 * এসএমএস ব্যাচ সাইজ
 * @default 100
 */
export const SMS_BATCH_SIZE = 100;

/**
 * এসএমএস রেট লিমিট (প্রতি মিনিটে)
 * @default 30
 */
export const SMS_RATE_LIMIT = 30;

/**
 * এসএমএস এক্সপাইরি সময় (মিলিসেকেন্ডে)
 * @default 604800000 (৭ দিন)
 */
export const SMS_EXPIRY_TIME = 7 * 24 * 60 * 60 * 1000;

// ============================================
// ২. এসএমএস এনকোডিং
// ============================================

/**
 * এসএমএস এনকোডিং টাইপ
 */
export type SmsEncoding =
  typeof SMS_ENCODING_GSM | typeof SMS_ENCODING_UNICODE | typeof SMS_ENCODING_AUTO;

/**
 * GSM এনকোডিং
 * @description GSM 7-বিট এনকোডিং
 */
export const SMS_ENCODING_GSM = 'GSM';

/**
 * UNICODE এনকোডিং
 * @description UCS-2 16-বিট এনকোডিং
 */
export const SMS_ENCODING_UNICODE = 'UNICODE';

/**
 * AUTO এনকোডিং
 * @description স্বয়ংক্রিয় এনকোডিং নির্বাচন
 */
export const SMS_ENCODING_AUTO = 'AUTO';

// ============================================
// ৩. এসএমএস টাইপ
// ============================================

/**
 * এসএমএস টাইপ
 */
export type SmsType =
  | typeof SMS_TYPE_PROMOTIONAL
  | typeof SMS_TYPE_TRANSACTIONAL
  | typeof SMS_TYPE_OTP
  | typeof SMS_TYPE_ALERT
  | typeof SMS_TYPE_REMINDER
  | typeof SMS_TYPE_NOTIFICATION;

/**
 * প্রমোশনাল এসএমএস
 */
export const SMS_TYPE_PROMOTIONAL = 'PROMOTIONAL';

/**
 * ট্রানজেকশনাল এসএমএস
 */
export const SMS_TYPE_TRANSACTIONAL = 'TRANSACTIONAL';

/**
 * ওটিপি এসএমএস
 */
export const SMS_TYPE_OTP = 'OTP';

/**
 * এলার্ট এসএমএস
 */
export const SMS_TYPE_ALERT = 'ALERT';

/**
 * রিমাইন্ডার এসএমএস
 */
export const SMS_TYPE_REMINDER = 'REMINDER';

/**
 * নোটিফিকেশন এসএমএস
 */
export const SMS_TYPE_NOTIFICATION = 'NOTIFICATION';

// ============================================
// ৪. এসএমএস স্ট্যাটাস
// ============================================

/**
 * এসএমএস স্ট্যাটাস
 */
export type SmsStatus =
  | typeof SMS_STATUS_PENDING
  | typeof SMS_STATUS_QUEUED
  | typeof SMS_STATUS_SENT
  | typeof SMS_STATUS_DELIVERED
  | typeof SMS_STATUS_FAILED
  | typeof SMS_STATUS_EXPIRED
  | typeof SMS_STATUS_REJECTED
  | typeof SMS_STATUS_UNSUBSCRIBED;

/**
 * পেন্ডিং স্ট্যাটাস
 */
export const SMS_STATUS_PENDING = 'PENDING';

/**
 * কিউড স্ট্যাটাস
 */
export const SMS_STATUS_QUEUED = 'QUEUED';

/**
 * সেন্ট স্ট্যাটাস
 */
export const SMS_STATUS_SENT = 'SENT';

/**
 * ডেলিভারড স্ট্যাটাস
 */
export const SMS_STATUS_DELIVERED = 'DELIVERED';

/**
 * ফেইলড স্ট্যাটাস
 */
export const SMS_STATUS_FAILED = 'FAILED';

/**
 * এক্সপাইরড স্ট্যাটাস
 */
export const SMS_STATUS_EXPIRED = 'EXPIRED';

/**
 * রিজেক্টেড স্ট্যাটাস
 */
export const SMS_STATUS_REJECTED = 'REJECTED';

/**
 * আনসাবস্ক্রাইবড স্ট্যাটাস
 */
export const SMS_STATUS_UNSUBSCRIBED = 'UNSUBSCRIBED';

// ============================================
// ৫. GSM ক্যারেক্টার সেট
// ============================================

/**
 * GSM 7-বিট ক্যারেক্টার সেট
 */
export const SMS_GSM_CHARACTERS = [
  '@',
  '£',
  '$',
  '¥',
  'è',
  'é',
  'ù',
  'ì',
  'ò',
  'Ç',
  '\n',
  'Ø',
  'ø',
  '\r',
  'Å',
  'å',
  'Δ',
  '_',
  'Φ',
  'Γ',
  'Λ',
  'Ω',
  'Π',
  'Ψ',
  'Σ',
  'Θ',
  'Ξ',
  'Æ',
  'æ',
  'ß',
  'É',
  ' ',
  '!',
  '"',
  '#',
  '¤',
  '%',
  '&',
  "'",
  '(',
  ')',
  '*',
  '+',
  ',',
  '-',
  '.',
  '/',
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  ':',
  ';',
  '<',
  '=',
  '>',
  '?',
  '¡',
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
  'Ä',
  'Ö',
  'Ñ',
  'Ü',
  '§',
  '¿',
  'ä',
  'ö',
  'ñ',
  'ü',
  'à',
  'å',
  'é',
  'è',
  'ì',
  'ò',
  'ù',
];

/**
 * GSM ক্যারেক্টার এক্সটেনশন
 */
export const SMS_GSM_EXTENDED_CHARACTERS = {
  '\n': 0x0a,
  '\r': 0x0d,
  '€': 0x1b65,
  '[': 0x1b3c,
  ']': 0x1b3e,
  '{': 0x1b28,
  '}': 0x1b29,
  '\\': 0x1b2f,
  '|': 0x1b40,
  '^': 0x1b14,
  '~': 0x1b3d,
};

// ============================================
// ৬. এসএমএস কনফিগারেশন
// ============================================

/**
 * এসএমএস কনফিগারেশন ইন্টারফেস
 */
export interface SmsConfig {
  /** সর্বোচ্চ GSM ক্যারেক্টার */
  maxCharsGsm: number;
  /** সর্বোচ্চ UNICODE ক্যারেক্টার */
  maxCharsUnicode: number;
  /** সর্বোচ্চ সেগমেন্ট সংখ্যা */
  maxSegments: number;
  /** ডিফল্ট এনকোডিং */
  defaultEncoding: SmsEncoding;
  /** ডিফল্ট কান্ট্রি কোড */
  defaultCountryCode: string;
  /** ডিফল্ট সেন্ডার আইডি */
  defaultSenderId: string;
  /** সর্বোচ্চ সেন্ডার আইডি দৈর্ঘ্য */
  maxSenderIdLength: number;
  /** টাইমআউট */
  timeout: number;
  /** কানেকশন টাইমআউট */
  connectionTimeout: number;
  /** রিট্রাই লিমিট */
  retryLimit: number;
  /** রিট্রাই ডেলায় */
  retryDelay: number;
  /** ব্যাচ সাইজ */
  batchSize: number;
  /** রেট লিমিট */
  rateLimit: number;
  /** এক্সপাইরি সময় */
  expiryTime: number;
}

/**
 * ডিফল্ট এসএমএস কনফিগারেশন
 */
export const SMS_DEFAULT_CONFIG: SmsConfig = {
  maxCharsGsm: SMS_MAX_CHARS_GSM,
  maxCharsUnicode: SMS_MAX_CHARS_UNICODE,
  maxSegments: SMS_MAX_SEGMENTS,
  defaultEncoding: SMS_DEFAULT_ENCODING,
  defaultCountryCode: SMS_DEFAULT_COUNTRY_CODE,
  defaultSenderId: SMS_DEFAULT_SENDER_ID,
  maxSenderIdLength: SMS_MAX_SENDER_ID_LENGTH,
  timeout: SMS_TIMEOUT,
  connectionTimeout: SMS_CONNECTION_TIMEOUT,
  retryLimit: SMS_RETRY_LIMIT,
  retryDelay: SMS_RETRY_DELAY,
  batchSize: SMS_BATCH_SIZE,
  rateLimit: SMS_RATE_LIMIT,
  expiryTime: SMS_EXPIRY_TIME,
};

// ============================================
// ৭. এসএমএস টাইপ লেবেল
// ============================================

/**
 * এসএমএস টাইপ লেবেল
 */
export const SMS_TYPE_LABELS: Record<SmsType, string> = {
  [SMS_TYPE_PROMOTIONAL]: 'প্রমোশনাল',
  [SMS_TYPE_TRANSACTIONAL]: 'ট্রানজেকশনাল',
  [SMS_TYPE_OTP]: 'ওটিপি',
  [SMS_TYPE_ALERT]: 'সতর্কতা',
  [SMS_TYPE_REMINDER]: 'মনে করিয়ে দিন',
  [SMS_TYPE_NOTIFICATION]: 'বিজ্ঞপ্তি',
};

// ============================================
// ৮. এসএমএস স্ট্যাটাস লেবেল
// ============================================

/**
 * এসএমএস স্ট্যাটাস লেবেল
 */
export const SMS_STATUS_LABELS: Record<SmsStatus, string> = {
  [SMS_STATUS_PENDING]: 'অপেক্ষমান',
  [SMS_STATUS_QUEUED]: 'সারিবদ্ধ',
  [SMS_STATUS_SENT]: 'পাঠানো হয়েছে',
  [SMS_STATUS_DELIVERED]: 'পৌঁছেছে',
  [SMS_STATUS_FAILED]: 'ব্যর্থ হয়েছে',
  [SMS_STATUS_EXPIRED]: 'মেয়াদোত্তীর্ণ',
  [SMS_STATUS_REJECTED]: 'প্রত্যাখ্যান',
  [SMS_STATUS_UNSUBSCRIBED]: 'আনসাবস্ক্রাইব',
};

// ============================================
// ৯. এসএমএস এনকোডিং লেবেল
// ============================================

/**
 * এসএমএস এনকোডিং লেবেল
 */
export const SMS_ENCODING_LABELS: Record<SmsEncoding, string> = {
  [SMS_ENCODING_GSM]: 'GSM (7-বিট)',
  [SMS_ENCODING_UNICODE]: 'UNICODE (16-বিট)',
  [SMS_ENCODING_AUTO]: 'স্বয়ংক্রিয়',
};
