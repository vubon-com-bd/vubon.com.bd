/**
 * Auth Device Constants
 * প্রমাণীকরণ ডিভাইস সম্পর্কিত কনস্ট্যান্টস
 */

export const AUTH_DEVICE = {
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
    SESSION_TIMEOUT: 3600, // 1 hour
    TRUSTED_TOKEN_EXPIRY: 2592000, // 30 days
    FINGERPRINT_EXPIRY: 86400, // 24 hours
  },
} as const;

export type AuthDeviceType = (typeof AUTH_DEVICE.TYPES)[keyof typeof AUTH_DEVICE.TYPES];
export type AuthDevicePlatform = (typeof AUTH_DEVICE.PLATFORMS)[keyof typeof AUTH_DEVICE.PLATFORMS];
export type AuthDeviceStatus = (typeof AUTH_DEVICE.STATUS)[keyof typeof AUTH_DEVICE.STATUS];
