export const AUTH_DEVICE = {
  MAX_DEVICES_PER_USER: 10,
  TRUST_DEVICE_EXPIRY_DAYS: 30,
  REMEMBER_DEVICE_DEFAULT: false,
  TRACK_FINGERPRINT: true,
  TRACK_IP: true,
  TRACK_USER_AGENT: true,
} as const;

export const AUTH_DEVICE_TYPE = {
  DESKTOP: 'desktop',
  MOBILE: 'mobile',
  TABLET: 'tablet',
  TV: 'tv',
  WEARABLE: 'wearable',
  UNKNOWN: 'unknown',
} as const;

export type AuthDeviceTypeType = (typeof AUTH_DEVICE_TYPE)[keyof typeof AUTH_DEVICE_TYPE];
