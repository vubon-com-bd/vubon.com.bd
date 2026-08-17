// ============================================
// নোটিফিকেশন ডিভাইস সংক্রান্ত মৌলিক কনস্ট্যান্টসমূহ
// ============================================

// ============================================
// ১. ডিভাইস মৌলিক কনফিগারেশন
// ============================================

/**
 * ডিভাইস ক্যাশ টিটিএল (মিলিসেকেন্ডে)
 * @default 300000 (৫ মিনিট)
 */
export const NOTIFICATION_DEVICE_CACHE_TTL = 5 * 60 * 1000;

/**
 * ডিভাইস ক্যাশ ম্যাক্স সাইজ
 * @default 1000
 */
export const NOTIFICATION_DEVICE_CACHE_MAX_SIZE = 1000;

/**
 * পুশ টোকেনের সর্বোচ্চ দৈর্ঘ্য
 * @default 255
 */
export const NOTIFICATION_DEVICE_MAX_TOKEN_LENGTH = 255;

/**
 * ডিভাইস নামের সর্বোচ্চ দৈর্ঘ্য
 * @default 100
 */
export const NOTIFICATION_DEVICE_MAX_NAME_LENGTH = 100;

/**
 * ডিভাইস আইডির সর্বোচ্চ দৈর্ঘ্য
 * @default 100
 */
export const NOTIFICATION_DEVICE_MAX_ID_LENGTH = 100;

/**
 * ডিভাইস মডেলের সর্বোচ্চ দৈর্ঘ্য
 * @default 50
 */
export const NOTIFICATION_DEVICE_MAX_MODEL_LENGTH = 50;

/**
 * OS ভার্সনের সর্বোচ্চ দৈর্ঘ্য
 * @default 20
 */
export const NOTIFICATION_DEVICE_MAX_OS_VERSION_LENGTH = 20;

/**
 * ব্রাউজার ভার্সনের সর্বোচ্চ দৈর্ঘ্য
 * @default 20
 */
export const NOTIFICATION_DEVICE_MAX_BROWSER_VERSION_LENGTH = 20;

/**
 * ডিভাইস ল্যাঙ্গুয়েজের সর্বোচ্চ দৈর্ঘ্য
 * @default 10
 */
export const NOTIFICATION_DEVICE_MAX_LANGUAGE_LENGTH = 10;

/**
 * ডিভাইস টাইমজোনের সর্বোচ্চ দৈর্ঘ্য
 * @default 50
 */
export const NOTIFICATION_DEVICE_MAX_TIMEZONE_LENGTH = 50;

/**
 * ডিফল্ট ডিভাইস ভাষা
 * @default 'en'
 */
export const NOTIFICATION_DEVICE_DEFAULT_LANGUAGE = 'en';

/**
 * ডিফল্ট ডিভাইস টাইমজোন
 * @default 'UTC'
 */
export const NOTIFICATION_DEVICE_DEFAULT_TIMEZONE = 'UTC';

// ============================================
// ২. প্ল্যাটফর্ম
// ============================================

/**
 * প্ল্যাটফর্ম টাইপ
 */
export type NotificationDevicePlatform =
  | typeof NOTIFICATION_DEVICE_PLATFORM_IOS
  | typeof NOTIFICATION_DEVICE_PLATFORM_ANDROID
  | typeof NOTIFICATION_DEVICE_PLATFORM_WINDOWS
  | typeof NOTIFICATION_DEVICE_PLATFORM_MACOS
  | typeof NOTIFICATION_DEVICE_PLATFORM_LINUX
  | typeof NOTIFICATION_DEVICE_PLATFORM_WEB
  | typeof NOTIFICATION_DEVICE_PLATFORM_TVOS
  | typeof NOTIFICATION_DEVICE_PLATFORM_WATCHOS
  | typeof NOTIFICATION_DEVICE_PLATFORM_OTHER;

/**
 * iOS প্ল্যাটফর্ম
 */
export const NOTIFICATION_DEVICE_PLATFORM_IOS = 'IOS';

/**
 * Android প্ল্যাটফর্ম
 */
export const NOTIFICATION_DEVICE_PLATFORM_ANDROID = 'ANDROID';

/**
 * Windows প্ল্যাটফর্ম
 */
export const NOTIFICATION_DEVICE_PLATFORM_WINDOWS = 'WINDOWS';

/**
 * macOS প্ল্যাটফর্ম
 */
export const NOTIFICATION_DEVICE_PLATFORM_MACOS = 'MACOS';

/**
 * Linux প্ল্যাটফর্ম
 */
export const NOTIFICATION_DEVICE_PLATFORM_LINUX = 'LINUX';

/**
 * Web প্ল্যাটফর্ম
 */
export const NOTIFICATION_DEVICE_PLATFORM_WEB = 'WEB';

/**
 * tvOS প্ল্যাটফর্ম
 */
export const NOTIFICATION_DEVICE_PLATFORM_TVOS = 'TVOS';

/**
 * watchOS প্ল্যাটফর্ম
 */
export const NOTIFICATION_DEVICE_PLATFORM_WATCHOS = 'WATCHOS';

/**
 * অন্যান্য প্ল্যাটফর্ম
 */
export const NOTIFICATION_DEVICE_PLATFORM_OTHER = 'OTHER';

// ============================================
// ৩. পুশ টোকেন ফরম্যাট
// ============================================

/**
 * পুশ টোকেন ফরম্যাট
 */
export type NotificationDeviceTokenFormat =
  | typeof NOTIFICATION_DEVICE_TOKEN_FORMAT_APNS
  | typeof NOTIFICATION_DEVICE_TOKEN_FORMAT_FCM
  | typeof NOTIFICATION_DEVICE_TOKEN_FORMAT_WEB_PUSH
  | typeof NOTIFICATION_DEVICE_TOKEN_FORMAT_HUAWEI
  | typeof NOTIFICATION_DEVICE_TOKEN_FORMAT_XIAOMI
  | typeof NOTIFICATION_DEVICE_TOKEN_FORMAT_OPPO
  | typeof NOTIFICATION_DEVICE_TOKEN_FORMAT_VIVO;

/**
 * APNS টোকেন ফরম্যাট (Apple)
 */
export const NOTIFICATION_DEVICE_TOKEN_FORMAT_APNS = 'APNS';

/**
 * FCM টোকেন ফরম্যাট (Google)
 */
export const NOTIFICATION_DEVICE_TOKEN_FORMAT_FCM = 'FCM';

/**
 * Web Push টোকেন ফরম্যাট
 */
export const NOTIFICATION_DEVICE_TOKEN_FORMAT_WEB_PUSH = 'WEB_PUSH';

/**
 * Huawei টোকেন ফরম্যাট
 */
export const NOTIFICATION_DEVICE_TOKEN_FORMAT_HUAWEI = 'HUAWEI';

/**
 * Xiaomi টোকেন ফরম্যাট
 */
export const NOTIFICATION_DEVICE_TOKEN_FORMAT_XIAOMI = 'XIAOMI';

/**
 * OPPO টোকেন ফরম্যাট
 */
export const NOTIFICATION_DEVICE_TOKEN_FORMAT_OPPO = 'OPPO';

/**
 * VIVO টোকেন ফরম্যাট
 */
export const NOTIFICATION_DEVICE_TOKEN_FORMAT_VIVO = 'VIVO';

// ============================================
// ৪. ডিভাইস স্ট্যাটাস
// ============================================

/**
 * ডিভাইস স্ট্যাটাস
 */
export type NotificationDeviceStatus =
  | typeof NOTIFICATION_DEVICE_STATUS_ACTIVE
  | typeof NOTIFICATION_DEVICE_STATUS_INACTIVE
  | typeof NOTIFICATION_DEVICE_STATUS_PENDING
  | typeof NOTIFICATION_DEVICE_STATUS_REVOKED
  | typeof NOTIFICATION_DEVICE_STATUS_EXPIRED
  | typeof NOTIFICATION_DEVICE_STATUS_BLOCKED
  | typeof NOTIFICATION_DEVICE_STATUS_UNREGISTERED;

/**
 * অ্যাক্টিভ স্ট্যাটাস
 */
export const NOTIFICATION_DEVICE_STATUS_ACTIVE = 'ACTIVE';

/**
 * ইনঅ্যাক্টিভ স্ট্যাটাস
 */
export const NOTIFICATION_DEVICE_STATUS_INACTIVE = 'INACTIVE';

/**
 * পেন্ডিং স্ট্যাটাস
 */
export const NOTIFICATION_DEVICE_STATUS_PENDING = 'PENDING';

/**
 * রিভোকড স্ট্যাটাস
 */
export const NOTIFICATION_DEVICE_STATUS_REVOKED = 'REVOKED';

/**
 * এক্সপাইরড স্ট্যাটাস
 */
export const NOTIFICATION_DEVICE_STATUS_EXPIRED = 'EXPIRED';

/**
 * ব্লকড স্ট্যাটাস
 */
export const NOTIFICATION_DEVICE_STATUS_BLOCKED = 'BLOCKED';

/**
 * আনরেজিস্টারড স্ট্যাটাস
 */
export const NOTIFICATION_DEVICE_STATUS_UNREGISTERED = 'UNREGISTERED';

// ============================================
// ৫. স্ক্রিন রেজোলিউশন
// ============================================

/**
 * স্ক্রিন রেজোলিউশন ইন্টারফেস
 */
export interface NotificationDeviceScreenResolution {
  /** প্রস্থ (পিক্সেলে) */
  width: number;
  /** উচ্চতা (পিক্সেলে) */
  height: number;
  /** পিক্সেল ঘনত্ব */
  density: number;
}

/**
 * স্ট্যান্ডার্ড স্ক্রিন রেজোলিউশন
 */
export const NOTIFICATION_DEVICE_SCREEN_RESOLUTIONS = {
  /** HD (720p) */
  HD: { width: 1280, height: 720, density: 1 },
  /** Full HD (1080p) */
  FULL_HD: { width: 1920, height: 1080, density: 1 },
  /** Quad HD (1440p) */
  QHD: { width: 2560, height: 1440, density: 1.5 },
  /** 4K UHD */
  UHD_4K: { width: 3840, height: 2160, density: 2 },
  /** 8K UHD */
  UHD_8K: { width: 7680, height: 4320, density: 3 },
} as const;

// ============================================
// ৬. ডিভাইস ক্যাটাগরি
// ============================================

/**
 * ডিভাইস ক্যাটাগরি
 */
export type NotificationDeviceCategory =
  | typeof NOTIFICATION_DEVICE_CATEGORY_PHONE
  | typeof NOTIFICATION_DEVICE_CATEGORY_TABLET
  | typeof NOTIFICATION_DEVICE_CATEGORY_COMPUTER
  | typeof NOTIFICATION_DEVICE_CATEGORY_TV
  | typeof NOTIFICATION_DEVICE_CATEGORY_WATCH
  | typeof NOTIFICATION_DEVICE_CATEGORY_OTHER;

/**
 * ফোন ক্যাটাগরি
 */
export const NOTIFICATION_DEVICE_CATEGORY_PHONE = 'PHONE';

/**
 * ট্যাবলেট ক্যাটাগরি
 */
export const NOTIFICATION_DEVICE_CATEGORY_TABLET = 'TABLET';

/**
 * কম্পিউটার ক্যাটাগরি
 */
export const NOTIFICATION_DEVICE_CATEGORY_COMPUTER = 'COMPUTER';

/**
 * টিভি ক্যাটাগরি
 */
export const NOTIFICATION_DEVICE_CATEGORY_TV = 'TV';

/**
 * ওয়াচ ক্যাটাগরি
 */
export const NOTIFICATION_DEVICE_CATEGORY_WATCH = 'WATCH';

/**
 * অন্যান্য ক্যাটাগরি
 */
export const NOTIFICATION_DEVICE_CATEGORY_OTHER = 'OTHER';

// ============================================
// ৭. প্ল্যাটফর্ম লেবেল
// ============================================

/**
 * প্ল্যাটফর্ম লেবেল
 */
export const NOTIFICATION_DEVICE_PLATFORM_LABELS: Record<NotificationDevicePlatform, string> = {
  [NOTIFICATION_DEVICE_PLATFORM_IOS]: 'iOS',
  [NOTIFICATION_DEVICE_PLATFORM_ANDROID]: 'Android',
  [NOTIFICATION_DEVICE_PLATFORM_WINDOWS]: 'Windows',
  [NOTIFICATION_DEVICE_PLATFORM_MACOS]: 'macOS',
  [NOTIFICATION_DEVICE_PLATFORM_LINUX]: 'Linux',
  [NOTIFICATION_DEVICE_PLATFORM_WEB]: 'Web',
  [NOTIFICATION_DEVICE_PLATFORM_TVOS]: 'tvOS',
  [NOTIFICATION_DEVICE_PLATFORM_WATCHOS]: 'watchOS',
  [NOTIFICATION_DEVICE_PLATFORM_OTHER]: 'অন্যান্য',
};

// ============================================
// ৮. টোকেন ফরম্যাট লেবেল
// ============================================

/**
 * টোকেন ফরম্যাট লেবেল
 */
export const NOTIFICATION_DEVICE_TOKEN_FORMAT_LABELS: Record<
  NotificationDeviceTokenFormat,
  string
> = {
  [NOTIFICATION_DEVICE_TOKEN_FORMAT_APNS]: 'APNS (Apple)',
  [NOTIFICATION_DEVICE_TOKEN_FORMAT_FCM]: 'FCM (Google)',
  [NOTIFICATION_DEVICE_TOKEN_FORMAT_WEB_PUSH]: 'Web Push',
  [NOTIFICATION_DEVICE_TOKEN_FORMAT_HUAWEI]: 'Huawei',
  [NOTIFICATION_DEVICE_TOKEN_FORMAT_XIAOMI]: 'Xiaomi',
  [NOTIFICATION_DEVICE_TOKEN_FORMAT_OPPO]: 'OPPO',
  [NOTIFICATION_DEVICE_TOKEN_FORMAT_VIVO]: 'VIVO',
};

// ============================================
// ৯. ডিভাইস স্ট্যাটাস লেবেল
// ============================================

/**
 * ডিভাইস স্ট্যাটাস লেবেল
 */
export const NOTIFICATION_DEVICE_STATUS_LABELS: Record<NotificationDeviceStatus, string> = {
  [NOTIFICATION_DEVICE_STATUS_ACTIVE]: 'সক্রিয়',
  [NOTIFICATION_DEVICE_STATUS_INACTIVE]: 'নিষ্ক্রিয়',
  [NOTIFICATION_DEVICE_STATUS_PENDING]: 'অপেক্ষমান',
  [NOTIFICATION_DEVICE_STATUS_REVOKED]: 'প্রত্যাহার',
  [NOTIFICATION_DEVICE_STATUS_EXPIRED]: 'মেয়াদোত্তীর্ণ',
  [NOTIFICATION_DEVICE_STATUS_BLOCKED]: 'ব্লক',
  [NOTIFICATION_DEVICE_STATUS_UNREGISTERED]: 'নিবন্ধিত নয়',
};

// ============================================
// ১০. ডিভাইস ক্যাটাগরি লেবেল
// ============================================

/**
 * ডিভাইস ক্যাটাগরি লেবেল
 */
export const NOTIFICATION_DEVICE_CATEGORY_LABELS: Record<NotificationDeviceCategory, string> = {
  [NOTIFICATION_DEVICE_CATEGORY_PHONE]: 'ফোন',
  [NOTIFICATION_DEVICE_CATEGORY_TABLET]: 'ট্যাবলেট',
  [NOTIFICATION_DEVICE_CATEGORY_COMPUTER]: 'কম্পিউটার',
  [NOTIFICATION_DEVICE_CATEGORY_TV]: 'টিভি',
  [NOTIFICATION_DEVICE_CATEGORY_WATCH]: 'ওয়াচ',
  [NOTIFICATION_DEVICE_CATEGORY_OTHER]: 'অন্যান্য',
};

// ============================================
// ১১. ডিভাইস কনফিগারেশন
// ============================================

/**
 * ডিভাইস কনফিগারেশন ইন্টারফেস
 */
export interface NotificationDeviceConfig {
  /** ক্যাশ টিটিএল */
  cacheTtl: number;
  /** ক্যাশ ম্যাক্স সাইজ */
  cacheMaxSize: number;
  /** সর্বোচ্চ টোকেন দৈর্ঘ্য */
  maxTokenLength: number;
  /** সর্বোচ্চ নামের দৈর্ঘ্য */
  maxNameLength: number;
  /** সর্বোচ্চ আইডি দৈর্ঘ্য */
  maxIdLength: number;
  /** সর্বোচ্চ মডেল দৈর্ঘ্য */
  maxModelLength: number;
  /** সর্বোচ্চ OS ভার্সন দৈর্ঘ্য */
  maxOsVersionLength: number;
  /** সর্বোচ্চ ব্রাউজার ভার্সন দৈর্ঘ্য */
  maxBrowserVersionLength: number;
  /** সর্বোচ্চ ভাষার দৈর্ঘ্য */
  maxLanguageLength: number;
  /** সর্বোচ্চ টাইমজোন দৈর্ঘ্য */
  maxTimezoneLength: number;
  /** ডিফল্ট ভাষা */
  defaultLanguage: string;
  /** ডিফল্ট টাইমজোন */
  defaultTimezone: string;
}

/**
 * ডিফল্ট ডিভাইস কনফিগারেশন
 */
export const NOTIFICATION_DEVICE_DEFAULT_CONFIG: NotificationDeviceConfig = {
  cacheTtl: NOTIFICATION_DEVICE_CACHE_TTL,
  cacheMaxSize: NOTIFICATION_DEVICE_CACHE_MAX_SIZE,
  maxTokenLength: NOTIFICATION_DEVICE_MAX_TOKEN_LENGTH,
  maxNameLength: NOTIFICATION_DEVICE_MAX_NAME_LENGTH,
  maxIdLength: NOTIFICATION_DEVICE_MAX_ID_LENGTH,
  maxModelLength: NOTIFICATION_DEVICE_MAX_MODEL_LENGTH,
  maxOsVersionLength: NOTIFICATION_DEVICE_MAX_OS_VERSION_LENGTH,
  maxBrowserVersionLength: NOTIFICATION_DEVICE_MAX_BROWSER_VERSION_LENGTH,
  maxLanguageLength: NOTIFICATION_DEVICE_MAX_LANGUAGE_LENGTH,
  maxTimezoneLength: NOTIFICATION_DEVICE_MAX_TIMEZONE_LENGTH,
  defaultLanguage: NOTIFICATION_DEVICE_DEFAULT_LANGUAGE,
  defaultTimezone: NOTIFICATION_DEVICE_DEFAULT_TIMEZONE,
};
