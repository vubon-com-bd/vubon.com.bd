/**
 * Device Constants
 * ডিভাইস সম্পর্কিত সাধারণ কনস্ট্যান্টস
 */

export const DEVICE = {
  // Device types
  TYPES: {
    DESKTOP: 'desktop',
    LAPTOP: 'laptop',
    TABLET: 'tablet',
    MOBILE: 'mobile',
    SMART_TV: 'smart_tv',
    SMART_WATCH: 'smart_watch',
    IOT: 'iot',
    SERVER: 'server',
    API_CLIENT: 'api_client',
    OTHER: 'other',
  },

  // Device platforms
  PLATFORMS: {
    WINDOWS: 'windows',
    MACOS: 'macos',
    LINUX: 'linux',
    IOS: 'ios',
    ANDROID: 'android',
    WEB: 'web',
    CHROME_OS: 'chrome_os',
    FIREFOX_OS: 'firefox_os',
    SAMSUNG: 'samsung',
    HUAWEI: 'huawei',
    XIAOMI: 'xiaomi',
    OPPO: 'oppo',
    VIVO: 'vivo',
    NOKIA: 'nokia',
    SYMBIAN: 'symbian',
    BLACKBERRY: 'blackberry',
    UNKNOWN: 'unknown',
  },

  // Device status
  STATUS: {
    TRUSTED: 'trusted',
    UNTRUSTED: 'untrusted',
    SUSPICIOUS: 'suspicious',
    BLOCKED: 'blocked',
    PENDING: 'pending',
    EXPIRED: 'expired',
    REVOKED: 'revoked',
  },

  // Default values
  DEFAULTS: {
    MAX_DEVICES: 10,
    SESSION_TIMEOUT: 3600,
    TRUSTED_TOKEN_EXPIRY: 2592000,
    FINGERPRINT_EXPIRY: 86400,
  },
} as const;

export type DeviceType = (typeof DEVICE.TYPES)[keyof typeof DEVICE.TYPES];
export type DevicePlatform = (typeof DEVICE.PLATFORMS)[keyof typeof DEVICE.PLATFORMS];
export type DeviceStatus = (typeof DEVICE.STATUS)[keyof typeof DEVICE.STATUS];
