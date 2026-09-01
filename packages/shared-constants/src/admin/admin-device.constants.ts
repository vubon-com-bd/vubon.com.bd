/**
 * Admin Device Constants
 * Device detection and management definitions
 */

/**
 * Device types
 */
export const DEVICE_TYPE = {
  DESKTOP: 'desktop',
  LAPTOP: 'laptop',
  TABLET: 'tablet',
  MOBILE: 'mobile',
  PHONE: 'phone',
  SMART_TV: 'smart_tv',
  CONSOLE: 'console',
  WEARABLE: 'wearable',
  IOT: 'iot',
  SERVER: 'server',
  UNKNOWN: 'unknown',
} as const;

export type DeviceType = (typeof DEVICE_TYPE)[keyof typeof DEVICE_TYPE];

/**
 * Device platforms
 */
export const DEVICE_PLATFORM = {
  WINDOWS: 'windows',
  MACOS: 'macos',
  LINUX: 'linux',
  IOS: 'ios',
  ANDROID: 'android',
  CHROME_OS: 'chrome_os',
  FIREFOX_OS: 'firefox_os',
  WEB_OS: 'web_os',
  TIZEN: 'tizen',
  UNIX: 'unix',
  UNKNOWN: 'unknown',
} as const;

export type DevicePlatform = (typeof DEVICE_PLATFORM)[keyof typeof DEVICE_PLATFORM];

/**
 * Device browsers
 */
export const DEVICE_BROWSER = {
  CHROME: 'chrome',
  FIREFOX: 'firefox',
  SAFARI: 'safari',
  EDGE: 'edge',
  OPERA: 'opera',
  BRAVE: 'brave',
  VIVALDI: 'vivaldi',
  ARC: 'arc',
  SAMSUNG: 'samsung',
  UC: 'uc',
  QQ: 'qq',
  UNKNOWN: 'unknown',
} as const;

export type DeviceBrowser = (typeof DEVICE_BROWSER)[keyof typeof DEVICE_BROWSER];

/**
 * Device trust levels
 */
export const DEVICE_TRUST = {
  TRUSTED: 'trusted',
  UNTRUSTED: 'untrusted',
  SUSPICIOUS: 'suspicious',
  BLOCKED: 'blocked',
  PENDING: 'pending',
} as const;

export type DeviceTrust = (typeof DEVICE_TRUST)[keyof typeof DEVICE_TRUST];

/**
 * Device status types
 */
export const DEVICE_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  SUSPENDED: 'suspended',
  BLOCKED: 'blocked',
  REVOKED: 'revoked',
  EXPIRED: 'expired',
} as const;

export type DeviceStatus = (typeof DEVICE_STATUS)[keyof typeof DEVICE_STATUS];

/**
 * Device validation rules
 */
export const DEVICE_VALIDATION = {
  /** Max devices per admin */
  MAX_DEVICES_PER_ADMIN: 10,
  /** Max trust devices per admin */
  MAX_TRUSTED_DEVICES: 5,
  /** Device token expiry (in seconds) */
  TOKEN_EXPIRY: 604800, // 7 days
  /** Trust duration (in seconds) */
  TRUST_DURATION: 2592000, // 30 days
} as const;

/**
 * Device user agent patterns
 */
export const DEVICE_PATTERNS = {
  DESKTOP: /Windows|Macintosh|Linux/i,
  MOBILE: /Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i,
  TABLET: /iPad|Android(?!.*Mobile)|Tablet/i,
  CHROME: /Chrome/i,
  FIREFOX: /Firefox/i,
  SAFARI: /Safari/i,
  EDGE: /Edg/i,
  OPERA: /Opera|OPR/i,
} as const;

/**
 * Get device type from user agent
 */
export function getDeviceTypeFromUserAgent(userAgent: string): DeviceType {
  if (DEVICE_PATTERNS.TABLET.test(userAgent)) {
    return DEVICE_TYPE.TABLET;
  }
  if (DEVICE_PATTERNS.MOBILE.test(userAgent)) {
    return DEVICE_TYPE.MOBILE;
  }
  if (DEVICE_PATTERNS.DESKTOP.test(userAgent)) {
    return DEVICE_TYPE.DESKTOP;
  }
  return DEVICE_TYPE.UNKNOWN;
}

/**
 * Get browser from user agent
 */
export function getBrowserFromUserAgent(userAgent: string): DeviceBrowser {
  if (DEVICE_PATTERNS.CHROME.test(userAgent) && !DEVICE_PATTERNS.EDGE.test(userAgent)) {
    return DEVICE_BROWSER.CHROME;
  }
  if (DEVICE_PATTERNS.FIREFOX.test(userAgent)) {
    return DEVICE_BROWSER.FIREFOX;
  }
  if (DEVICE_PATTERNS.SAFARI.test(userAgent)) {
    return DEVICE_BROWSER.SAFARI;
  }
  if (DEVICE_PATTERNS.EDGE.test(userAgent)) {
    return DEVICE_BROWSER.EDGE;
  }
  if (DEVICE_PATTERNS.OPERA.test(userAgent)) {
    return DEVICE_BROWSER.OPERA;
  }
  return DEVICE_BROWSER.UNKNOWN;
}

/**
 * Get platform from user agent
 */
export function getPlatformFromUserAgent(userAgent: string): DevicePlatform {
  if (/Windows/i.test(userAgent)) {
    return DEVICE_PLATFORM.WINDOWS;
  }
  if (/Macintosh|Mac OS X/i.test(userAgent)) {
    return DEVICE_PLATFORM.MACOS;
  }
  if (/Linux/i.test(userAgent) && !/Android/i.test(userAgent)) {
    return DEVICE_PLATFORM.LINUX;
  }
  if (/Android/i.test(userAgent)) {
    return DEVICE_PLATFORM.ANDROID;
  }
  if (/iPhone|iPad|iPod/i.test(userAgent)) {
    return DEVICE_PLATFORM.IOS;
  }
  return DEVICE_PLATFORM.UNKNOWN;
}

/**
 * Get device trust label
 */
export function getDeviceTrustLabel(trust: string): string {
  const labels: Record<string, string> = {
    [DEVICE_TRUST.TRUSTED]: 'Trusted Device',
    [DEVICE_TRUST.UNTRUSTED]: 'Untrusted Device',
    [DEVICE_TRUST.SUSPICIOUS]: 'Suspicious Device',
    [DEVICE_TRUST.BLOCKED]: 'Blocked Device',
    [DEVICE_TRUST.PENDING]: 'Pending Trust',
  };
  return labels[trust] || trust;
}

/**
 * Get device status color
 */
export function getDeviceStatusColor(status: string): string {
  const colors: Record<string, string> = {
    [DEVICE_STATUS.ACTIVE]: 'success',
    [DEVICE_STATUS.INACTIVE]: 'default',
    [DEVICE_STATUS.SUSPENDED]: 'warning',
    [DEVICE_STATUS.BLOCKED]: 'error',
    [DEVICE_STATUS.REVOKED]: 'error',
    [DEVICE_STATUS.EXPIRED]: 'default',
  };
  return colors[status] || 'default';
}

/**
 * Check if device is trusted
 */
export function isDeviceTrusted(trust: string): boolean {
  return trust === DEVICE_TRUST.TRUSTED;
}

/**
 * Check if device is active
 */
export function isDeviceActive(status: string): boolean {
  return status === DEVICE_STATUS.ACTIVE;
}

/**
 * Get device type label
 */
export function getDeviceTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    [DEVICE_TYPE.DESKTOP]: 'Desktop Computer',
    [DEVICE_TYPE.LAPTOP]: 'Laptop',
    [DEVICE_TYPE.TABLET]: 'Tablet',
    [DEVICE_TYPE.MOBILE]: 'Mobile Phone',
    [DEVICE_TYPE.PHONE]: 'Phone',
    [DEVICE_TYPE.SMART_TV]: 'Smart TV',
    [DEVICE_TYPE.CONSOLE]: 'Game Console',
    [DEVICE_TYPE.WEARABLE]: 'Wearable Device',
    [DEVICE_TYPE.IOT]: 'IoT Device',
    [DEVICE_TYPE.SERVER]: 'Server',
    [DEVICE_TYPE.UNKNOWN]: 'Unknown Device',
  };
  return labels[type] || type;
}

/**
 * Get platform label
 */
export function getPlatformLabel(platform: string): string {
  const labels: Record<string, string> = {
    [DEVICE_PLATFORM.WINDOWS]: 'Windows',
    [DEVICE_PLATFORM.MACOS]: 'macOS',
    [DEVICE_PLATFORM.LINUX]: 'Linux',
    [DEVICE_PLATFORM.IOS]: 'iOS',
    [DEVICE_PLATFORM.ANDROID]: 'Android',
    [DEVICE_PLATFORM.CHROME_OS]: 'Chrome OS',
    [DEVICE_PLATFORM.FIREFOX_OS]: 'Firefox OS',
    [DEVICE_PLATFORM.WEB_OS]: 'Web OS',
    [DEVICE_PLATFORM.TIZEN]: 'Tizen',
    [DEVICE_PLATFORM.UNIX]: 'Unix',
    [DEVICE_PLATFORM.UNKNOWN]: 'Unknown Platform',
  };
  return labels[platform] || platform;
}

/**
 * Get browser label
 */
export function getBrowserLabel(browser: string): string {
  const labels: Record<string, string> = {
    [DEVICE_BROWSER.CHROME]: 'Google Chrome',
    [DEVICE_BROWSER.FIREFOX]: 'Mozilla Firefox',
    [DEVICE_BROWSER.SAFARI]: 'Apple Safari',
    [DEVICE_BROWSER.EDGE]: 'Microsoft Edge',
    [DEVICE_BROWSER.OPERA]: 'Opera',
    [DEVICE_BROWSER.BRAVE]: 'Brave',
    [DEVICE_BROWSER.VIVALDI]: 'Vivaldi',
    [DEVICE_BROWSER.ARC]: 'Arc',
    [DEVICE_BROWSER.SAMSUNG]: 'Samsung Internet',
    [DEVICE_BROWSER.UC]: 'UC Browser',
    [DEVICE_BROWSER.QQ]: 'QQ Browser',
    [DEVICE_BROWSER.UNKNOWN]: 'Unknown Browser',
  };
  return labels[browser] || browser;
}
