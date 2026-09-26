export const DEVICE_TYPE = {
  DESKTOP: 'desktop',
  MOBILE: 'mobile',
  TABLET: 'tablet',
  TV: 'tv',
  WEARABLE: 'wearable',
  BOT: 'bot',
  UNKNOWN: 'unknown',
} as const;

export const DEVICE_OS = {
  ANDROID: 'android',
  IOS: 'ios',
  WINDOWS: 'windows',
  MACOS: 'macos',
  LINUX: 'linux',
  OTHER: 'other',
} as const;

export const DEVICE_BROWSER = {
  CHROME: 'chrome',
  FIREFOX: 'firefox',
  SAFARI: 'safari',
  EDGE: 'edge',
  OPERA: 'opera',
  OTHER: 'other',
} as const;

export type DeviceTypeType = (typeof DEVICE_TYPE)[keyof typeof DEVICE_TYPE];
