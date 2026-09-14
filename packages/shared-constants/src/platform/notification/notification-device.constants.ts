export const NOTIFICATION_DEVICE_TYPE = {
  ANDROID: 'android',
  IOS: 'ios',
  WEB: 'web',
  WINDOWS: 'windows',
  MACOS: 'macos',
  LINUX: 'linux',
  TABLET: 'tablet',
  WEARABLE: 'wearable',
} as const;

export const NOTIFICATION_DEVICE_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  UNREGISTERED: 'unregistered',
  BLOCKED: 'blocked',
  INVALID: 'invalid',
} as const;

export const NOTIFICATION_DEVICE = {
  MAX_DEVICES_PER_USER: 10,
  TOKEN_MAX_LENGTH: 500,
  TOKEN_REFRESH_DAYS: 30,
  INACTIVE_DAYS_THRESHOLD: 90,
  AUTO_CLEANUP: true,
  TRACK_LAST_ACTIVE: true,
  TRACK_APP_VERSION: true,
  TRACK_OS_VERSION: true,
} as const;

export type NotificationDeviceTypeType =
  (typeof NOTIFICATION_DEVICE_TYPE)[keyof typeof NOTIFICATION_DEVICE_TYPE];
export type NotificationDeviceStatusType =
  (typeof NOTIFICATION_DEVICE_STATUS)[keyof typeof NOTIFICATION_DEVICE_STATUS];
