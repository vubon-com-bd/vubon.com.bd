// ============================================
// পুশ নোটিফিকেশন সংক্রান্ত মৌলিক কনস্ট্যান্টসমূহ
// ============================================

// ============================================
// ১. পুশ নোটিফিকেশন মৌলিক কনফিগারেশন
// ============================================

/**
 * সর্বোচ্চ পেলোড সাইজ (বাইটে)
 * @default 4096 (৪KB)
 */
export const PUSH_MAX_PAYLOAD_SIZE = 4096;

/**
 * সর্বোচ্চ পুশ নোটিফিকেশন টাইটেল দৈর্ঘ্য
 * @default 100
 */
export const PUSH_MAX_TITLE_LENGTH = 100;

/**
 * সর্বোচ্চ পুশ নোটিফিকেশন বডি দৈর্ঘ্য
 * @default 200
 */
export const PUSH_MAX_BODY_LENGTH = 200;

/**
 * ডিফল্ট টাইম-টু-লাইভ (TTL) (সেকেন্ডে)
 * @default 86400 (২৪ ঘন্টা)
 */
export const PUSH_DEFAULT_TTL = 86400;

/**
 * সর্বোচ্চ টাইম-টু-লাইভ (TTL) (সেকেন্ডে)
 * @default 2592000 (৩০ দিন)
 */
export const PUSH_MAX_TTL = 2592000;

/**
 * ডিফল্ট পুশ প্রায়োরিটি
 * @default 'NORMAL'
 */
export const PUSH_DEFAULT_PRIORITY = 'NORMAL';

/**
 * ডিফল্ট পুশ সাউন্ড
 * @default 'default'
 */
export const PUSH_DEFAULT_SOUND = 'default';

/**
 * ডিফল্ট পুশ ব্যাজ সংখ্যা
 * @default 0
 */
export const PUSH_DEFAULT_BADGE = 0;

/**
 * পুশ টাইমআউট (মিলিসেকেন্ডে)
 * @default 30000 (৩০ সেকেন্ড)
 */
export const PUSH_TIMEOUT = 30000;

/**
 * পুশ রিট্রাই লিমিট
 * @default 3
 */
export const PUSH_RETRY_LIMIT = 3;

/**
 * পুশ রিট্রাই ডেলায় (মিলিসেকেন্ডে)
 * @default 300000 (৫ মিনিট)
 */
export const PUSH_RETRY_DELAY = 5 * 60 * 1000;

/**
 * পুশ ব্যাচ সাইজ
 * @default 100
 */
export const PUSH_BATCH_SIZE = 100;

/**
 * পুশ রেট লিমিট (প্রতি মিনিটে)
 * @default 60
 */
export const PUSH_RATE_LIMIT = 60;

// ============================================
// ২. পুশ প্ল্যাটফর্ম
// ============================================

/**
 * পুশ প্ল্যাটফর্ম টাইপ
 */
export type PushPlatform =
  | typeof PUSH_PLATFORM_IOS
  | typeof PUSH_PLATFORM_ANDROID
  | typeof PUSH_PLATFORM_WEB
  | typeof PUSH_PLATFORM_ALL;

/**
 * iOS প্ল্যাটফর্ম
 * @description Apple APNS
 */
export const PUSH_PLATFORM_IOS = 'IOS';

/**
 * Android প্ল্যাটফর্ম
 * @description Google FCM
 */
export const PUSH_PLATFORM_ANDROID = 'ANDROID';

/**
 * Web প্ল্যাটফর্ম
 * @description Web Push API
 */
export const PUSH_PLATFORM_WEB = 'WEB';

/**
 * All প্ল্যাটফর্ম
 * @description সব প্ল্যাটফর্ম
 */
export const PUSH_PLATFORM_ALL = 'ALL';

// ============================================
// ৩. পুশ প্রায়োরিটি
// ============================================

/**
 * পুশ প্রায়োরিটি টাইপ
 */
export type PushPriority =
  | typeof PUSH_PRIORITY_NORMAL
  | typeof PUSH_PRIORITY_HIGH
  | typeof PUSH_PRIORITY_LOW
  | typeof PUSH_PRIORITY_IMMEDIATE;

/**
 * নরমাল প্রায়োরিটি
 * @description স্বাভাবিক গুরুত্ব
 */
export const PUSH_PRIORITY_NORMAL = 'NORMAL';

/**
 * হাই প্রায়োরিটি
 * @description উচ্চ গুরুত্ব
 */
export const PUSH_PRIORITY_HIGH = 'HIGH';

/**
 * লো প্রায়োরিটি
 * @description নিম্ন গুরুত্ব
 */
export const PUSH_PRIORITY_LOW = 'LOW';

/**
 * ইমিডিয়েট প্রায়োরিটি
 * @description তাৎক্ষণিক গুরুত্ব
 */
export const PUSH_PRIORITY_IMMEDIATE = 'IMMEDIATE';

// ============================================
// ৪. পুশ সাউন্ড ফরম্যাট
// ============================================

/**
 * পুশ সাউন্ড ফরম্যাট টাইপ
 */
export type PushSoundFormat =
  | typeof PUSH_SOUND_FORMAT_AAC
  | typeof PUSH_SOUND_FORMAT_MP3
  | typeof PUSH_SOUND_FORMAT_WAV
  | typeof PUSH_SOUND_FORMAT_CAF
  | typeof PUSH_SOUND_FORMAT_M4R;

/**
 * AAC সাউন্ড ফরম্যাট
 */
export const PUSH_SOUND_FORMAT_AAC = 'AAC';

/**
 * MP3 সাউন্ড ফরম্যাট
 */
export const PUSH_SOUND_FORMAT_MP3 = 'MP3';

/**
 * WAV সাউন্ড ফরম্যাট
 */
export const PUSH_SOUND_FORMAT_WAV = 'WAV';

/**
 * CAF সাউন্ড ফরম্যাট (iOS)
 */
export const PUSH_SOUND_FORMAT_CAF = 'CAF';

/**
 * M4R সাউন্ড ফরম্যাট (iOS রিংটোন)
 */
export const PUSH_SOUND_FORMAT_M4R = 'M4R';

// ============================================
// ৫. পুশ স্ট্যাটাস
// ============================================

/**
 * পুশ স্ট্যাটাস টাইপ
 */
export type PushStatus =
  | typeof PUSH_STATUS_PENDING
  | typeof PUSH_STATUS_QUEUED
  | typeof PUSH_STATUS_SENT
  | typeof PUSH_STATUS_DELIVERED
  | typeof PUSH_STATUS_FAILED
  | typeof PUSH_STATUS_EXPIRED
  | typeof PUSH_STATUS_REJECTED
  | typeof PUSH_STATUS_UNKNOWN;

/**
 * পেন্ডিং স্ট্যাটাস
 */
export const PUSH_STATUS_PENDING = 'PENDING';

/**
 * কিউড স্ট্যাটাস
 */
export const PUSH_STATUS_QUEUED = 'QUEUED';

/**
 * সেন্ট স্ট্যাটাস
 */
export const PUSH_STATUS_SENT = 'SENT';

/**
 * ডেলিভারড স্ট্যাটাস
 */
export const PUSH_STATUS_DELIVERED = 'DELIVERED';

/**
 * ফেইলড স্ট্যাটাস
 */
export const PUSH_STATUS_FAILED = 'FAILED';

/**
 * এক্সপাইরড স্ট্যাটাস
 */
export const PUSH_STATUS_EXPIRED = 'EXPIRED';

/**
 * রিজেক্টেড স্ট্যাটাস
 */
export const PUSH_STATUS_REJECTED = 'REJECTED';

/**
 * আননোন স্ট্যাটাস
 */
export const PUSH_STATUS_UNKNOWN = 'UNKNOWN';

// ============================================
// ৬. পুশ প্রোভাইডার
// ============================================

/**
 * পুশ প্রোভাইডার টাইপ
 */
export type PushProvider =
  | typeof PUSH_PROVIDER_APNS
  | typeof PUSH_PROVIDER_FCM
  | typeof PUSH_PROVIDER_WEB_PUSH
  | typeof PUSH_PROVIDER_HUAWEI
  | typeof PUSH_PROVIDER_XIAOMI
  | typeof PUSH_PROVIDER_OPPO
  | typeof PUSH_PROVIDER_VIVO;

/**
 * APNS প্রোভাইডার (Apple)
 */
export const PUSH_PROVIDER_APNS = 'APNS';

/**
 * FCM প্রোভাইডার (Google)
 */
export const PUSH_PROVIDER_FCM = 'FCM';

/**
 * Web Push প্রোভাইডার
 */
export const PUSH_PROVIDER_WEB_PUSH = 'WEB_PUSH';

/**
 * Huawei প্রোভাইডার
 */
export const PUSH_PROVIDER_HUAWEI = 'HUAWEI';

/**
 * Xiaomi প্রোভাইডার
 */
export const PUSH_PROVIDER_XIAOMI = 'XIAOMI';

/**
 * OPPO প্রোভাইডার
 */
export const PUSH_PROVIDER_OPPO = 'OPPO';

/**
 * VIVO প্রোভাইডার
 */
export const PUSH_PROVIDER_VIVO = 'VIVO';

// ============================================
// ৭. পুশ কনফিগারেশন
// ============================================

/**
 * পুশ কনফিগারেশন ইন্টারফেস
 */
export interface PushConfig {
  /** সর্বোচ্চ পেলোড সাইজ */
  maxPayloadSize: number;
  /** সর্বোচ্চ টাইটেল দৈর্ঘ্য */
  maxTitleLength: number;
  /** সর্বোচ্চ বডি দৈর্ঘ্য */
  maxBodyLength: number;
  /** ডিফল্ট টাইম-টু-লাইভ */
  defaultTtl: number;
  /** সর্বোচ্চ টাইম-টু-লাইভ */
  maxTtl: number;
  /** ডিফল্ট প্রায়োরিটি */
  defaultPriority: PushPriority;
  /** ডিফল্ট সাউন্ড */
  defaultSound: string;
  /** ডিফল্ট ব্যাজ */
  defaultBadge: number;
  /** টাইমআউট */
  timeout: number;
  /** রিট্রাই লিমিট */
  retryLimit: number;
  /** রিট্রাই ডেলায় */
  retryDelay: number;
  /** ব্যাচ সাইজ */
  batchSize: number;
  /** রেট লিমিট */
  rateLimit: number;
}

/**
 * ডিফল্ট পুশ কনফিগারেশন
 */
export const PUSH_DEFAULT_CONFIG: PushConfig = {
  maxPayloadSize: PUSH_MAX_PAYLOAD_SIZE,
  maxTitleLength: PUSH_MAX_TITLE_LENGTH,
  maxBodyLength: PUSH_MAX_BODY_LENGTH,
  defaultTtl: PUSH_DEFAULT_TTL,
  maxTtl: PUSH_MAX_TTL,
  defaultPriority: PUSH_DEFAULT_PRIORITY,
  defaultSound: PUSH_DEFAULT_SOUND,
  defaultBadge: PUSH_DEFAULT_BADGE,
  timeout: PUSH_TIMEOUT,
  retryLimit: PUSH_RETRY_LIMIT,
  retryDelay: PUSH_RETRY_DELAY,
  batchSize: PUSH_BATCH_SIZE,
  rateLimit: PUSH_RATE_LIMIT,
};

// ============================================
// ৮. পুশ প্ল্যাটফর্ম লেবেল
// ============================================

/**
 * পুশ প্ল্যাটফর্ম লেবেল
 */
export const PUSH_PLATFORM_LABELS: Record<PushPlatform, string> = {
  [PUSH_PLATFORM_IOS]: 'iOS (APNS)',
  [PUSH_PLATFORM_ANDROID]: 'Android (FCM)',
  [PUSH_PLATFORM_WEB]: 'Web Push',
  [PUSH_PLATFORM_ALL]: 'সব প্ল্যাটফর্ম',
};

// ============================================
// ৯. পুশ প্রায়োরিটি লেবেল
// ============================================

/**
 * পুশ প্রায়োরিটি লেবেল
 */
export const PUSH_PRIORITY_LABELS: Record<PushPriority, string> = {
  [PUSH_PRIORITY_NORMAL]: 'স্বাভাবিক',
  [PUSH_PRIORITY_HIGH]: 'উচ্চ',
  [PUSH_PRIORITY_LOW]: 'নিম্ন',
  [PUSH_PRIORITY_IMMEDIATE]: 'তাৎক্ষণিক',
};

// ============================================
// ১০. পুশ স্ট্যাটাস লেবেল
// ============================================

/**
 * পুশ স্ট্যাটাস লেবেল
 */
export const PUSH_STATUS_LABELS: Record<PushStatus, string> = {
  [PUSH_STATUS_PENDING]: 'অপেক্ষমান',
  [PUSH_STATUS_QUEUED]: 'সারিবদ্ধ',
  [PUSH_STATUS_SENT]: 'পাঠানো হয়েছে',
  [PUSH_STATUS_DELIVERED]: 'পৌঁছেছে',
  [PUSH_STATUS_FAILED]: 'ব্যর্থ হয়েছে',
  [PUSH_STATUS_EXPIRED]: 'মেয়াদোত্তীর্ণ',
  [PUSH_STATUS_REJECTED]: 'প্রত্যাখ্যান',
  [PUSH_STATUS_UNKNOWN]: 'অজানা',
};

// ============================================
// ১১. পুশ প্রোভাইডার লেবেল
// ============================================

/**
 * পুশ প্রোভাইডার লেবেল
 */
export const PUSH_PROVIDER_LABELS: Record<PushProvider, string> = {
  [PUSH_PROVIDER_APNS]: 'Apple APNS',
  [PUSH_PROVIDER_FCM]: 'Google FCM',
  [PUSH_PROVIDER_WEB_PUSH]: 'Web Push API',
  [PUSH_PROVIDER_HUAWEI]: 'Huawei Push',
  [PUSH_PROVIDER_XIAOMI]: 'Xiaomi Push',
  [PUSH_PROVIDER_OPPO]: 'OPPO Push',
  [PUSH_PROVIDER_VIVO]: 'VIVO Push',
};

// ============================================
// ১২. পুশ প্ল্যাটফর্ম থেকে প্রোভাইডার ম্যাপিং
// ============================================

/**
 * পুশ প্ল্যাটফর্ম থেকে প্রোভাইডার ম্যাপিং
 */
export const PUSH_PLATFORM_TO_PROVIDER: Record<PushPlatform, PushProvider[]> = {
  [PUSH_PLATFORM_IOS]: [PUSH_PROVIDER_APNS],
  [PUSH_PLATFORM_ANDROID]: [
    PUSH_PROVIDER_FCM,
    PUSH_PROVIDER_HUAWEI,
    PUSH_PROVIDER_XIAOMI,
    PUSH_PROVIDER_OPPO,
    PUSH_PROVIDER_VIVO,
  ],
  [PUSH_PLATFORM_WEB]: [PUSH_PROVIDER_WEB_PUSH],
  [PUSH_PLATFORM_ALL]: [PUSH_PROVIDER_APNS, PUSH_PROVIDER_FCM, PUSH_PROVIDER_WEB_PUSH],
};
