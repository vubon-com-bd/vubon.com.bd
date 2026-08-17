// ============================================
// ডিভাইস টাইপ সংক্রান্ত কনস্ট্যান্টসমূহ
// ============================================

// ============================================
// ১. ডিভাইস টাইপ
// ============================================

/**
 * ডিভাইস টাইপ
 * ডিভাইসের প্রধান ক্যাটাগরি নির্দেশ করে
 */
export type NotificationDeviceType =
  | typeof NOTIFICATION_DEVICE_TYPE_MOBILE
  | typeof NOTIFICATION_DEVICE_TYPE_TABLET
  | typeof NOTIFICATION_DEVICE_TYPE_DESKTOP
  | typeof NOTIFICATION_DEVICE_TYPE_WEARABLE
  | typeof NOTIFICATION_DEVICE_TYPE_TV
  | typeof NOTIFICATION_DEVICE_TYPE_IOT
  | typeof NOTIFICATION_DEVICE_TYPE_SMART_DEVICE
  | typeof NOTIFICATION_DEVICE_TYPE_WEB_BROWSER
  | typeof NOTIFICATION_DEVICE_TYPE_EMAIL_CLIENT
  | typeof NOTIFICATION_DEVICE_TYPE_GAMING
  | typeof NOTIFICATION_DEVICE_TYPE_AUTO
  | typeof NOTIFICATION_DEVICE_TYPE_GLASSES
  | typeof NOTIFICATION_DEVICE_TYPE_OTHER;

/**
 * মোবাইল ডিভাইস
 * @description স্মার্টফোন
 */
export const NOTIFICATION_DEVICE_TYPE_MOBILE = 'MOBILE';

/**
 * ট্যাবলেট ডিভাইস
 * @description ট্যাবলেট
 */
export const NOTIFICATION_DEVICE_TYPE_TABLET = 'TABLET';

/**
 * ডেস্কটপ ডিভাইস
 * @description কম্পিউটার
 */
export const NOTIFICATION_DEVICE_TYPE_DESKTOP = 'DESKTOP';

/**
 * ওয়্যারেবল ডিভাইস
 * @description স্মার্টওয়াচ, ফিটনেস ট্র্যাকার
 */
export const NOTIFICATION_DEVICE_TYPE_WEARABLE = 'WEARABLE';

/**
 * টিভি ডিভাইস
 * @description স্মার্ট টিভি
 */
export const NOTIFICATION_DEVICE_TYPE_TV = 'TV';

/**
 * আইওটি ডিভাইস
 * @description ইন্টারনেট অফ থিংস ডিভাইস
 */
export const NOTIFICATION_DEVICE_TYPE_IOT = 'IOT';

/**
 * স্মার্ট ডিভাইস
 * @description স্মার্ট হোম ডিভাইস
 */
export const NOTIFICATION_DEVICE_TYPE_SMART_DEVICE = 'SMART_DEVICE';

/**
 * ওয়েব ব্রাউজার
 * @description ওয়েব ব্রাউজার
 */
export const NOTIFICATION_DEVICE_TYPE_WEB_BROWSER = 'WEB_BROWSER';

/**
 * ইমেইল ক্লায়েন্ট
 * @description ইমেইল ক্লায়েন্ট
 */
export const NOTIFICATION_DEVICE_TYPE_EMAIL_CLIENT = 'EMAIL_CLIENT';

/**
 * গেমিং ডিভাইস
 * @description গেমিং কনসোল
 */
export const NOTIFICATION_DEVICE_TYPE_GAMING = 'GAMING';

/**
 * অটো ডিভাইস
 * @description অটোমোবাইল
 */
export const NOTIFICATION_DEVICE_TYPE_AUTO = 'AUTO';

/**
 * গ্লাসেস ডিভাইস
 * @description স্মার্ট গ্লাসেস
 */
export const NOTIFICATION_DEVICE_TYPE_GLASSES = 'GLASSES';

/**
 * অন্যান্য ডিভাইস
 * @description অন্যান্য
 */
export const NOTIFICATION_DEVICE_TYPE_OTHER = 'OTHER';

// ============================================
// ২. ডিভাইস টাইপ গ্রুপ
// ============================================

/**
 * ডিভাইস টাইপ গ্রুপ
 */
export type NotificationDeviceTypeGroup =
  | typeof NOTIFICATION_DEVICE_TYPE_GROUP_MOBILE
  | typeof NOTIFICATION_DEVICE_TYPE_GROUP_COMPUTING
  | typeof NOTIFICATION_DEVICE_TYPE_GROUP_WEARABLE
  | typeof NOTIFICATION_DEVICE_TYPE_GROUP_HOME
  | typeof NOTIFICATION_DEVICE_TYPE_GROUP_VEHICLE
  | typeof NOTIFICATION_DEVICE_TYPE_GROUP_OTHER;

/**
 * মোবাইল গ্রুপ
 * @description মোবাইল ডিভাইস
 */
export const NOTIFICATION_DEVICE_TYPE_GROUP_MOBILE = 'MOBILE';

/**
 * কম্পিউটিং গ্রুপ
 * @description কম্পিউটিং ডিভাইস
 */
export const NOTIFICATION_DEVICE_TYPE_GROUP_COMPUTING = 'COMPUTING';

/**
 * ওয়্যারেবল গ্রুপ
 * @description পরিধানযোগ্য ডিভাইস
 */
export const NOTIFICATION_DEVICE_TYPE_GROUP_WEARABLE = 'WEARABLE';

/**
 * হোম গ্রুপ
 * @description হোম ডিভাইস
 */
export const NOTIFICATION_DEVICE_TYPE_GROUP_HOME = 'HOME';

/**
 * ভেহিকেল গ্রুপ
 * @description যানবাহন
 */
export const NOTIFICATION_DEVICE_TYPE_GROUP_VEHICLE = 'VEHICLE';

/**
 * অন্যান্য গ্রুপ
 * @description অন্যান্য
 */
export const NOTIFICATION_DEVICE_TYPE_GROUP_OTHER = 'OTHER';

// ============================================
// ৩. ডিভাইস টাইপ থেকে গ্রুপ ম্যাপিং
// ============================================

/**
 * ডিভাইস টাইপ থেকে গ্রুপ ম্যাপিং
 */
export const NOTIFICATION_DEVICE_TYPE_TO_GROUP: Record<
  NotificationDeviceType,
  NotificationDeviceTypeGroup
> = {
  [NOTIFICATION_DEVICE_TYPE_MOBILE]: NOTIFICATION_DEVICE_TYPE_GROUP_MOBILE,
  [NOTIFICATION_DEVICE_TYPE_TABLET]: NOTIFICATION_DEVICE_TYPE_GROUP_MOBILE,
  [NOTIFICATION_DEVICE_TYPE_DESKTOP]: NOTIFICATION_DEVICE_TYPE_GROUP_COMPUTING,
  [NOTIFICATION_DEVICE_TYPE_WEARABLE]: NOTIFICATION_DEVICE_TYPE_GROUP_WEARABLE,
  [NOTIFICATION_DEVICE_TYPE_TV]: NOTIFICATION_DEVICE_TYPE_GROUP_HOME,
  [NOTIFICATION_DEVICE_TYPE_IOT]: NOTIFICATION_DEVICE_TYPE_GROUP_HOME,
  [NOTIFICATION_DEVICE_TYPE_SMART_DEVICE]: NOTIFICATION_DEVICE_TYPE_GROUP_HOME,
  [NOTIFICATION_DEVICE_TYPE_WEB_BROWSER]: NOTIFICATION_DEVICE_TYPE_GROUP_COMPUTING,
  [NOTIFICATION_DEVICE_TYPE_EMAIL_CLIENT]: NOTIFICATION_DEVICE_TYPE_GROUP_COMPUTING,
  [NOTIFICATION_DEVICE_TYPE_GAMING]: NOTIFICATION_DEVICE_TYPE_GROUP_HOME,
  [NOTIFICATION_DEVICE_TYPE_AUTO]: NOTIFICATION_DEVICE_TYPE_GROUP_VEHICLE,
  [NOTIFICATION_DEVICE_TYPE_GLASSES]: NOTIFICATION_DEVICE_TYPE_GROUP_WEARABLE,
  [NOTIFICATION_DEVICE_TYPE_OTHER]: NOTIFICATION_DEVICE_TYPE_GROUP_OTHER,
};

// ============================================
// ৪. ডিভাইস টাইপ লেবেল
// ============================================

/**
 * ডিভাইস টাইপ লেবেল
 */
export const NOTIFICATION_DEVICE_TYPE_LABELS: Record<NotificationDeviceType, string> = {
  [NOTIFICATION_DEVICE_TYPE_MOBILE]: 'মোবাইল',
  [NOTIFICATION_DEVICE_TYPE_TABLET]: 'ট্যাবলেট',
  [NOTIFICATION_DEVICE_TYPE_DESKTOP]: 'ডেস্কটপ',
  [NOTIFICATION_DEVICE_TYPE_WEARABLE]: 'ওয়্যারেবল',
  [NOTIFICATION_DEVICE_TYPE_TV]: 'টিভি',
  [NOTIFICATION_DEVICE_TYPE_IOT]: 'আইওটি',
  [NOTIFICATION_DEVICE_TYPE_SMART_DEVICE]: 'স্মার্ট ডিভাইস',
  [NOTIFICATION_DEVICE_TYPE_WEB_BROWSER]: 'ওয়েব ব্রাউজার',
  [NOTIFICATION_DEVICE_TYPE_EMAIL_CLIENT]: 'ইমেইল ক্লায়েন্ট',
  [NOTIFICATION_DEVICE_TYPE_GAMING]: 'গেমিং',
  [NOTIFICATION_DEVICE_TYPE_AUTO]: 'অটো',
  [NOTIFICATION_DEVICE_TYPE_GLASSES]: 'গ্লাসেস',
  [NOTIFICATION_DEVICE_TYPE_OTHER]: 'অন্যান্য',
};

// ============================================
// ৫. ডিভাইস টাইপ আইকন
// ============================================

/**
 * ডিভাইস টাইপ আইকন
 */
export const NOTIFICATION_DEVICE_TYPE_ICONS: Record<NotificationDeviceType, string> = {
  [NOTIFICATION_DEVICE_TYPE_MOBILE]: 'smartphone',
  [NOTIFICATION_DEVICE_TYPE_TABLET]: 'tablet',
  [NOTIFICATION_DEVICE_TYPE_DESKTOP]: 'desktop_windows',
  [NOTIFICATION_DEVICE_TYPE_WEARABLE]: 'watch',
  [NOTIFICATION_DEVICE_TYPE_TV]: 'tv',
  [NOTIFICATION_DEVICE_TYPE_IOT]: 'sensors',
  [NOTIFICATION_DEVICE_TYPE_SMART_DEVICE]: 'home',
  [NOTIFICATION_DEVICE_TYPE_WEB_BROWSER]: 'language',
  [NOTIFICATION_DEVICE_TYPE_EMAIL_CLIENT]: 'email',
  [NOTIFICATION_DEVICE_TYPE_GAMING]: 'sports_esports',
  [NOTIFICATION_DEVICE_TYPE_AUTO]: 'directions_car',
  [NOTIFICATION_DEVICE_TYPE_GLASSES]: 'glasses',
  [NOTIFICATION_DEVICE_TYPE_OTHER]: 'devices_other',
};

// ============================================
// ৬. ডিভাইস টাইপ কালার
// ============================================

/**
 * ডিভাইস টাইপ কালার
 */
export const NOTIFICATION_DEVICE_TYPE_COLORS: Record<NotificationDeviceType, string> = {
  [NOTIFICATION_DEVICE_TYPE_MOBILE]: '#4CAF50', // Green
  [NOTIFICATION_DEVICE_TYPE_TABLET]: '#2196F3', // Blue
  [NOTIFICATION_DEVICE_TYPE_DESKTOP]: '#9C27B0', // Purple
  [NOTIFICATION_DEVICE_TYPE_WEARABLE]: '#FF9800', // Orange
  [NOTIFICATION_DEVICE_TYPE_TV]: '#F44336', // Red
  [NOTIFICATION_DEVICE_TYPE_IOT]: '#00BCD4', // Cyan
  [NOTIFICATION_DEVICE_TYPE_SMART_DEVICE]: '#8BC34A', // Light Green
  [NOTIFICATION_DEVICE_TYPE_WEB_BROWSER]: '#3F51B5', // Indigo
  [NOTIFICATION_DEVICE_TYPE_EMAIL_CLIENT]: '#E91E63', // Pink
  [NOTIFICATION_DEVICE_TYPE_GAMING]: '#FF5722', // Deep Orange
  [NOTIFICATION_DEVICE_TYPE_AUTO]: '#795548', // Brown
  [NOTIFICATION_DEVICE_TYPE_GLASSES]: '#607D8B', // Blue Grey
  [NOTIFICATION_DEVICE_TYPE_OTHER]: '#9E9E9E', // Grey
};

// ============================================
// ৭. ডিভাইস টাইপ প্রায়োরিটি
// ============================================

/**
 * ডিভাইস টাইপ প্রায়োরিটি (১-১০)
 */
export const NOTIFICATION_DEVICE_TYPE_PRIORITY: Record<NotificationDeviceType, number> = {
  [NOTIFICATION_DEVICE_TYPE_MOBILE]: 9,
  [NOTIFICATION_DEVICE_TYPE_TABLET]: 8,
  [NOTIFICATION_DEVICE_TYPE_DESKTOP]: 7,
  [NOTIFICATION_DEVICE_TYPE_WEARABLE]: 6,
  [NOTIFICATION_DEVICE_TYPE_TV]: 5,
  [NOTIFICATION_DEVICE_TYPE_IOT]: 4,
  [NOTIFICATION_DEVICE_TYPE_SMART_DEVICE]: 5,
  [NOTIFICATION_DEVICE_TYPE_WEB_BROWSER]: 8,
  [NOTIFICATION_DEVICE_TYPE_EMAIL_CLIENT]: 7,
  [NOTIFICATION_DEVICE_TYPE_GAMING]: 4,
  [NOTIFICATION_DEVICE_TYPE_AUTO]: 3,
  [NOTIFICATION_DEVICE_TYPE_GLASSES]: 4,
  [NOTIFICATION_DEVICE_TYPE_OTHER]: 3,
};

// ============================================
// ৮. ডিভাইস টাইপ কনফিগারেশন
// ============================================

/**
 * ডিভাইস টাইপ কনফিগারেশন
 */
export interface NotificationDeviceTypeConfig {
  /** টাইপের নাম */
  type: NotificationDeviceType;
  /** টাইপের লেবেল */
  label: string;
  /** টাইপের আইকন */
  icon: string;
  /** টাইপের কালার */
  color: string;
  /** টাইপের প্রায়োরিটি */
  priority: number;
  /** টাইপের গ্রুপ */
  group: NotificationDeviceTypeGroup;
  /** মোবাইল টাইপ কিনা */
  isMobile: boolean;
  /** কম্পিউটিং টাইপ কিনা */
  isComputing: boolean;
  /** পরিধানযোগ্য টাইপ কিনা */
  isWearable: boolean;
  /** হোম টাইপ কিনা */
  isHome: boolean;
}

/**
 * সব ডিভাইস টাইপের কনফিগারেশন
 */
export const NOTIFICATION_DEVICE_TYPE_CONFIGS: NotificationDeviceTypeConfig[] = [
  {
    type: NOTIFICATION_DEVICE_TYPE_MOBILE,
    label: NOTIFICATION_DEVICE_TYPE_LABELS[NOTIFICATION_DEVICE_TYPE_MOBILE],
    icon: NOTIFICATION_DEVICE_TYPE_ICONS[NOTIFICATION_DEVICE_TYPE_MOBILE],
    color: NOTIFICATION_DEVICE_TYPE_COLORS[NOTIFICATION_DEVICE_TYPE_MOBILE],
    priority: NOTIFICATION_DEVICE_TYPE_PRIORITY[NOTIFICATION_DEVICE_TYPE_MOBILE],
    group: NOTIFICATION_DEVICE_TYPE_TO_GROUP[NOTIFICATION_DEVICE_TYPE_MOBILE],
    isMobile: true,
    isComputing: false,
    isWearable: false,
    isHome: false,
  },
  {
    type: NOTIFICATION_DEVICE_TYPE_TABLET,
    label: NOTIFICATION_DEVICE_TYPE_LABELS[NOTIFICATION_DEVICE_TYPE_TABLET],
    icon: NOTIFICATION_DEVICE_TYPE_ICONS[NOTIFICATION_DEVICE_TYPE_TABLET],
    color: NOTIFICATION_DEVICE_TYPE_COLORS[NOTIFICATION_DEVICE_TYPE_TABLET],
    priority: NOTIFICATION_DEVICE_TYPE_PRIORITY[NOTIFICATION_DEVICE_TYPE_TABLET],
    group: NOTIFICATION_DEVICE_TYPE_TO_GROUP[NOTIFICATION_DEVICE_TYPE_TABLET],
    isMobile: true,
    isComputing: false,
    isWearable: false,
    isHome: false,
  },
  {
    type: NOTIFICATION_DEVICE_TYPE_DESKTOP,
    label: NOTIFICATION_DEVICE_TYPE_LABELS[NOTIFICATION_DEVICE_TYPE_DESKTOP],
    icon: NOTIFICATION_DEVICE_TYPE_ICONS[NOTIFICATION_DEVICE_TYPE_DESKTOP],
    color: NOTIFICATION_DEVICE_TYPE_COLORS[NOTIFICATION_DEVICE_TYPE_DESKTOP],
    priority: NOTIFICATION_DEVICE_TYPE_PRIORITY[NOTIFICATION_DEVICE_TYPE_DESKTOP],
    group: NOTIFICATION_DEVICE_TYPE_TO_GROUP[NOTIFICATION_DEVICE_TYPE_DESKTOP],
    isMobile: false,
    isComputing: true,
    isWearable: false,
    isHome: false,
  },
  {
    type: NOTIFICATION_DEVICE_TYPE_WEARABLE,
    label: NOTIFICATION_DEVICE_TYPE_LABELS[NOTIFICATION_DEVICE_TYPE_WEARABLE],
    icon: NOTIFICATION_DEVICE_TYPE_ICONS[NOTIFICATION_DEVICE_TYPE_WEARABLE],
    color: NOTIFICATION_DEVICE_TYPE_COLORS[NOTIFICATION_DEVICE_TYPE_WEARABLE],
    priority: NOTIFICATION_DEVICE_TYPE_PRIORITY[NOTIFICATION_DEVICE_TYPE_WEARABLE],
    group: NOTIFICATION_DEVICE_TYPE_TO_GROUP[NOTIFICATION_DEVICE_TYPE_WEARABLE],
    isMobile: false,
    isComputing: false,
    isWearable: true,
    isHome: false,
  },
  {
    type: NOTIFICATION_DEVICE_TYPE_TV,
    label: NOTIFICATION_DEVICE_TYPE_LABELS[NOTIFICATION_DEVICE_TYPE_TV],
    icon: NOTIFICATION_DEVICE_TYPE_ICONS[NOTIFICATION_DEVICE_TYPE_TV],
    color: NOTIFICATION_DEVICE_TYPE_COLORS[NOTIFICATION_DEVICE_TYPE_TV],
    priority: NOTIFICATION_DEVICE_TYPE_PRIORITY[NOTIFICATION_DEVICE_TYPE_TV],
    group: NOTIFICATION_DEVICE_TYPE_TO_GROUP[NOTIFICATION_DEVICE_TYPE_TV],
    isMobile: false,
    isComputing: false,
    isWearable: false,
    isHome: true,
  },
  {
    type: NOTIFICATION_DEVICE_TYPE_IOT,
    label: NOTIFICATION_DEVICE_TYPE_LABELS[NOTIFICATION_DEVICE_TYPE_IOT],
    icon: NOTIFICATION_DEVICE_TYPE_ICONS[NOTIFICATION_DEVICE_TYPE_IOT],
    color: NOTIFICATION_DEVICE_TYPE_COLORS[NOTIFICATION_DEVICE_TYPE_IOT],
    priority: NOTIFICATION_DEVICE_TYPE_PRIORITY[NOTIFICATION_DEVICE_TYPE_IOT],
    group: NOTIFICATION_DEVICE_TYPE_TO_GROUP[NOTIFICATION_DEVICE_TYPE_IOT],
    isMobile: false,
    isComputing: false,
    isWearable: false,
    isHome: true,
  },
  {
    type: NOTIFICATION_DEVICE_TYPE_SMART_DEVICE,
    label: NOTIFICATION_DEVICE_TYPE_LABELS[NOTIFICATION_DEVICE_TYPE_SMART_DEVICE],
    icon: NOTIFICATION_DEVICE_TYPE_ICONS[NOTIFICATION_DEVICE_TYPE_SMART_DEVICE],
    color: NOTIFICATION_DEVICE_TYPE_COLORS[NOTIFICATION_DEVICE_TYPE_SMART_DEVICE],
    priority: NOTIFICATION_DEVICE_TYPE_PRIORITY[NOTIFICATION_DEVICE_TYPE_SMART_DEVICE],
    group: NOTIFICATION_DEVICE_TYPE_TO_GROUP[NOTIFICATION_DEVICE_TYPE_SMART_DEVICE],
    isMobile: false,
    isComputing: false,
    isWearable: false,
    isHome: true,
  },
  {
    type: NOTIFICATION_DEVICE_TYPE_WEB_BROWSER,
    label: NOTIFICATION_DEVICE_TYPE_LABELS[NOTIFICATION_DEVICE_TYPE_WEB_BROWSER],
    icon: NOTIFICATION_DEVICE_TYPE_ICONS[NOTIFICATION_DEVICE_TYPE_WEB_BROWSER],
    color: NOTIFICATION_DEVICE_TYPE_COLORS[NOTIFICATION_DEVICE_TYPE_WEB_BROWSER],
    priority: NOTIFICATION_DEVICE_TYPE_PRIORITY[NOTIFICATION_DEVICE_TYPE_WEB_BROWSER],
    group: NOTIFICATION_DEVICE_TYPE_TO_GROUP[NOTIFICATION_DEVICE_TYPE_WEB_BROWSER],
    isMobile: false,
    isComputing: true,
    isWearable: false,
    isHome: false,
  },
  {
    type: NOTIFICATION_DEVICE_TYPE_EMAIL_CLIENT,
    label: NOTIFICATION_DEVICE_TYPE_LABELS[NOTIFICATION_DEVICE_TYPE_EMAIL_CLIENT],
    icon: NOTIFICATION_DEVICE_TYPE_ICONS[NOTIFICATION_DEVICE_TYPE_EMAIL_CLIENT],
    color: NOTIFICATION_DEVICE_TYPE_COLORS[NOTIFICATION_DEVICE_TYPE_EMAIL_CLIENT],
    priority: NOTIFICATION_DEVICE_TYPE_PRIORITY[NOTIFICATION_DEVICE_TYPE_EMAIL_CLIENT],
    group: NOTIFICATION_DEVICE_TYPE_TO_GROUP[NOTIFICATION_DEVICE_TYPE_EMAIL_CLIENT],
    isMobile: false,
    isComputing: true,
    isWearable: false,
    isHome: false,
  },
  {
    type: NOTIFICATION_DEVICE_TYPE_GAMING,
    label: NOTIFICATION_DEVICE_TYPE_LABELS[NOTIFICATION_DEVICE_TYPE_GAMING],
    icon: NOTIFICATION_DEVICE_TYPE_ICONS[NOTIFICATION_DEVICE_TYPE_GAMING],
    color: NOTIFICATION_DEVICE_TYPE_COLORS[NOTIFICATION_DEVICE_TYPE_GAMING],
    priority: NOTIFICATION_DEVICE_TYPE_PRIORITY[NOTIFICATION_DEVICE_TYPE_GAMING],
    group: NOTIFICATION_DEVICE_TYPE_TO_GROUP[NOTIFICATION_DEVICE_TYPE_GAMING],
    isMobile: false,
    isComputing: false,
    isWearable: false,
    isHome: true,
  },
  {
    type: NOTIFICATION_DEVICE_TYPE_AUTO,
    label: NOTIFICATION_DEVICE_TYPE_LABELS[NOTIFICATION_DEVICE_TYPE_AUTO],
    icon: NOTIFICATION_DEVICE_TYPE_ICONS[NOTIFICATION_DEVICE_TYPE_AUTO],
    color: NOTIFICATION_DEVICE_TYPE_COLORS[NOTIFICATION_DEVICE_TYPE_AUTO],
    priority: NOTIFICATION_DEVICE_TYPE_PRIORITY[NOTIFICATION_DEVICE_TYPE_AUTO],
    group: NOTIFICATION_DEVICE_TYPE_TO_GROUP[NOTIFICATION_DEVICE_TYPE_AUTO],
    isMobile: false,
    isComputing: false,
    isWearable: false,
    isHome: false,
  },
  {
    type: NOTIFICATION_DEVICE_TYPE_GLASSES,
    label: NOTIFICATION_DEVICE_TYPE_LABELS[NOTIFICATION_DEVICE_TYPE_GLASSES],
    icon: NOTIFICATION_DEVICE_TYPE_ICONS[NOTIFICATION_DEVICE_TYPE_GLASSES],
    color: NOTIFICATION_DEVICE_TYPE_COLORS[NOTIFICATION_DEVICE_TYPE_GLASSES],
    priority: NOTIFICATION_DEVICE_TYPE_PRIORITY[NOTIFICATION_DEVICE_TYPE_GLASSES],
    group: NOTIFICATION_DEVICE_TYPE_TO_GROUP[NOTIFICATION_DEVICE_TYPE_GLASSES],
    isMobile: false,
    isComputing: false,
    isWearable: true,
    isHome: false,
  },
  {
    type: NOTIFICATION_DEVICE_TYPE_OTHER,
    label: NOTIFICATION_DEVICE_TYPE_LABELS[NOTIFICATION_DEVICE_TYPE_OTHER],
    icon: NOTIFICATION_DEVICE_TYPE_ICONS[NOTIFICATION_DEVICE_TYPE_OTHER],
    color: NOTIFICATION_DEVICE_TYPE_COLORS[NOTIFICATION_DEVICE_TYPE_OTHER],
    priority: NOTIFICATION_DEVICE_TYPE_PRIORITY[NOTIFICATION_DEVICE_TYPE_OTHER],
    group: NOTIFICATION_DEVICE_TYPE_TO_GROUP[NOTIFICATION_DEVICE_TYPE_OTHER],
    isMobile: false,
    isComputing: false,
    isWearable: false,
    isHome: false,
  },
];
