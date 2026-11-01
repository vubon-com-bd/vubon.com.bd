export const PUSH_PROVIDER = {
  FCM: 'fcm',
  APNS: 'apns',
  WEB_PUSH: 'web_push',
  ONESIGNAL: 'onesignal',
  EXPO: 'expo',
  CUSTOM: 'custom',
} as const;

export const PUSH_PLATFORM = {
  ANDROID: 'android',
  IOS: 'ios',
  WEB: 'web',
  WINDOWS: 'windows',
  MACOS: 'macos',
} as const;

export const PUSH_STATUS = {
  PENDING: 'pending',
  QUEUED: 'queued',
  SENDING: 'sending',
  SENT: 'sent',
  DELIVERED: 'delivered',
  FAILED: 'failed',
  INVALID_TOKEN: 'invalid_token',
} as const;

export const PUSH_PRIORITY = {
  HIGH: 'high',
  NORMAL: 'normal',
} as const;

export const PUSH = {
  TITLE_MAX_LENGTH: 65,
  BODY_MAX_LENGTH: 240,
  DATA_MAX_SIZE_KB: 4,
  ICON_MAX_SIZE_KB: 100,
  IMAGE_MAX_SIZE_KB: 500,
  MAX_ACTIONS: 3,
  TTL_SECONDS: 2419200,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY_SECONDS: 30,
  BATCH_SIZE: 1000,
  RATE_LIMIT_PER_SECOND: 500,
  SILENT_DEFAULT: false,
} as const;

export type PushProviderType = (typeof PUSH_PROVIDER)[keyof typeof PUSH_PROVIDER];
export type PushPlatformType = (typeof PUSH_PLATFORM)[keyof typeof PUSH_PLATFORM];
export type PushStatusType = (typeof PUSH_STATUS)[keyof typeof PUSH_STATUS];
