/**
 * সাপোর্ট পুশ নোটিফিকেশন সিস্টেমের মৌলিক কনস্ট্যান্টসমূহ
 */

/**
 * পুশ আইডি প্রিফিক্স
 */
export const PUSH_ID_PREFIX = 'PSH';

/**
 * পুশ নম্বর ফরম্যাট
 */
export const PUSH_NUMBER_FORMAT = 'PSH-{platform}-{timestamp}';

/**
 * ডিফল্ট প্ল্যাটফর্ম
 */
export const PUSH_PLATFORM = {
  IOS: 'ios',
  ANDROID: 'android',
  WEB: 'web',
  WINDOWS: 'windows',
  MACOS: 'macos',
  LINUX: 'linux',
} as const;

/**
 * পুশ টাইটেল ম্যাক্স লেন্থ (অক্ষরে)
 */
export const PUSH_TITLE_MAX_LENGTH = 100;

/**
 * পুশ বডি ম্যাক্স লেন্থ (অক্ষরে)
 */
export const PUSH_BODY_MAX_LENGTH = 500;

/**
 * পুশ ইমেজ সাইজ লিমিট (কেবি)
 */
export const PUSH_IMAGE_SIZE_LIMIT_KB = 100;

/**
 * পুশ ডিভাইস রেজিস্ট্রেশন টাইমআউট (সেকেন্ডে)
 */
export const PUSH_DEVICE_REGISTRATION_TIMEOUT = 30;

/**
 * পুশ রেট লিমিট (প্রতি মিনিটে)
 */
export const PUSH_RATE_LIMIT = 1000;

/**
 * পুশ টাইমআউট (সেকেন্ডে)
 */
export const PUSH_TIMEOUT = 10;

/**
 * পুশ ডেলিভারি প্রায়োরিটি
 */
export const PUSH_PRIORITY = {
  LOW: 'low',
  NORMAL: 'normal',
  HIGH: 'high',
  CRITICAL: 'critical',
} as const;

/**
 * পুশ সাউন্ড টাইপ
 */
export const PUSH_SOUND = {
  DEFAULT: 'default',
  NONE: 'none',
  CUSTOM: 'custom',
} as const;

/**
 * পুশ ব্যাজ টাইপ
 */
export const PUSH_BADGE = {
  NONE: 'none',
  NUMBER: 'number',
  INCREMENT: 'increment',
  DECREMENT: 'decrement',
} as const;

/**
 * পুশ ডিভাইস টাইপ
 */
export const PUSH_DEVICE_TYPE = {
  PHONE: 'phone',
  TABLET: 'tablet',
  DESKTOP: 'desktop',
  WEARABLE: 'wearable',
  TV: 'tv',
} as const;

/**
 * পুশ ডিভাইস স্ট্যাটাস
 */
export const PUSH_DEVICE_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  SUSPENDED: 'suspended',
  UNREGISTERED: 'unregistered',
} as const;

/**
 * পুশ ডিফল্ট সেটিংস
 */
export const PUSH_DEFAULT_SETTINGS = {
  titleMaxLength: PUSH_TITLE_MAX_LENGTH,
  bodyMaxLength: PUSH_BODY_MAX_LENGTH,
  imageSizeLimitKB: PUSH_IMAGE_SIZE_LIMIT_KB,
  deviceRegistrationTimeout: PUSH_DEVICE_REGISTRATION_TIMEOUT,
  rateLimit: PUSH_RATE_LIMIT,
  timeout: PUSH_TIMEOUT,
} as const;

export type PushIdPrefix = typeof PUSH_ID_PREFIX;
export type PushPlatform = (typeof PUSH_PLATFORM)[keyof typeof PUSH_PLATFORM];
export type PushPriority = (typeof PUSH_PRIORITY)[keyof typeof PUSH_PRIORITY];
export type PushSound = (typeof PUSH_SOUND)[keyof typeof PUSH_SOUND];
export type PushBadge = (typeof PUSH_BADGE)[keyof typeof PUSH_BADGE];
export type PushDeviceType = (typeof PUSH_DEVICE_TYPE)[keyof typeof PUSH_DEVICE_TYPE];
export type PushDeviceStatus = (typeof PUSH_DEVICE_STATUS)[keyof typeof PUSH_DEVICE_STATUS];

export interface PushDefaultSettings {
  titleMaxLength: number;
  bodyMaxLength: number;
  imageSizeLimitKB: number;
  deviceRegistrationTimeout: number;
  rateLimit: number;
  timeout: number;
}

export interface PushDevice {
  id: string;
  deviceId: string;
  platform: PushPlatform;
  deviceType: PushDeviceType;
  token: string;
  status: PushDeviceStatus;
  userId?: string;
  appVersion?: string;
  osVersion?: string;
  model?: string;
  metadata?: Record<string, unknown>;
  registeredAt: Date;
  updatedAt: Date;
  lastActiveAt?: Date;
}

export interface PushNotification {
  id: string;
  title: string;
  body: string;
  platform: PushPlatform;
  priority: PushPriority;
  sound: PushSound;
  badge?: number;
  badgeType?: PushBadge;
  image?: string;
  data?: Record<string, unknown>;
  topic?: string;
  condition?: string;
  deviceIds?: string[];
  tags?: string[];
  sentAt?: Date;
  deliveredAt?: Date;
  clickedAt?: Date;
  status?: string;
  metadata?: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}

export interface PushAnalytics {
  totalSent: number;
  totalDelivered: number;
  totalClicked: number;
  deliveryRate: number;
  clickRate: number;
  devicesRegistered: number;
  period: string;
}

/**
 * পুশ কনফিগারেশন
 */
export const PUSH_CONFIG = {
  idPrefix: PUSH_ID_PREFIX,
  numberFormat: PUSH_NUMBER_FORMAT,
  defaultSettings: PUSH_DEFAULT_SETTINGS,
  platforms: PUSH_PLATFORM,
  priorities: PUSH_PRIORITY,
  sounds: PUSH_SOUND,
  badges: PUSH_BADGE,
  deviceTypes: PUSH_DEVICE_TYPE,
  deviceStatuses: PUSH_DEVICE_STATUS,
} as const;

/**
 * পুশ ইভেন্ট টাইপ
 */
export const PUSH_EVENT_TYPES = {
  CREATED: 'push_created',
  SENT: 'push_sent',
  DELIVERED: 'push_delivered',
  CLICKED: 'push_clicked',
  FAILED: 'push_failed',
  DEVICE_REGISTERED: 'device_registered',
  DEVICE_UNREGISTERED: 'device_unregistered',
} as const;

export type PushEventType = (typeof PUSH_EVENT_TYPES)[keyof typeof PUSH_EVENT_TYPES];
