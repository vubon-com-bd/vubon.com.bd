/**
 * Device identification and management constants for the monorepo
 * All device-related constants are centralized here for consistent device handling
 */

/**
 * Device types for identification and categorization
 */
export const DEVICE_TYPES = {
  /**
   * Desktop computer - Laptop, PC, workstation
   */
  DESKTOP: 'desktop',

  /**
   * Mobile phone - Smartphone, mobile device
   */
  MOBILE: 'mobile',

  /**
   * Feature phone - Basic phone with limited capabilities
   * Common in Bangladesh market
   */
  FEATURE_PHONE: 'feature_phone',

  /**
   * Tablet device - iPad, Android tablet
   */
  TABLET: 'tablet',

  /**
   * Smart TV - Connected TV, streaming devices
   */
  SMART_TV: 'smart_tv',

  /**
   * Gaming console - PlayStation, Xbox, Nintendo
   */
  GAMING_CONSOLE: 'gaming_console',

  /**
   * IoT device - Smart home devices, sensors
   */
  IOT: 'iot',

  /**
   * Kiosk - Self-service kiosks, public terminals
   * Common in Bangladesh for banking, government services
   */
  KIOSK: 'kiosk',

  /**
   * POS device - Point of sale terminals
   * Common in Bangladesh retail
   */
  POS: 'pos',

  /**
   * Wearable - Smart watches, fitness trackers
   */
  WEARABLE: 'wearable',

  /**
   * Automotive - Car infotainment systems
   */
  AUTOMOTIVE: 'automotive',

  /**
   * Unknown - Cannot be determined
   */
  UNKNOWN: 'unknown',
} as const;

export type DeviceType = (typeof DEVICE_TYPES)[keyof typeof DEVICE_TYPES];

/**
 * Device trust levels for security
 */
export const DEVICE_TRUST_LEVELS = {
  /**
   * Trusted device - Known, verified device
   */
  TRUSTED: 'trusted',

  /**
   * Suspicious device - Potential security risk
   */
  SUSPICIOUS: 'suspicious',

  /**
   * Blocked device - Blocked due to security violations
   */
  BLOCKED: 'blocked',

  /**
   * Unknown device - New or unrecognized device
   */
  UNKNOWN: 'unknown',

  /**
   * Untrusted device - Low trust level, requires verification
   */
  UNTRUSTED: 'untrusted',

  /**
   * Verified device - Verified through MFA
   */
  VERIFIED: 'verified',

  /**
   * Compromised device - Potentially compromised
   */
  COMPROMISED: 'compromised',
} as const;

export type DeviceTrustLevel = (typeof DEVICE_TRUST_LEVELS)[keyof typeof DEVICE_TRUST_LEVELS];

/**
 * Device fingerprint components for identification
 */
export const DEVICE_FINGERPRINT_COMPONENTS = {
  /**
   * User agent string
   */
  USER_AGENT: 'user_agent',

  /**
   * IP address
   */
  IP_ADDRESS: 'ip_address',

  /**
   * Screen resolution
   */
  SCREEN_RESOLUTION: 'screen_resolution',

  /**
   * Timezone offset
   */
  TIMEZONE_OFFSET: 'timezone_offset',

  /**
   * Language settings
   */
  LANGUAGE: 'language',

  /**
   * Platform information
   */
  PLATFORM: 'platform',

  /**
   * Device memory
   */
  DEVICE_MEMORY: 'device_memory',

  /**
   * Hardware concurrency
   */
  HARDWARE_CONCURRENCY: 'hardware_concurrency',

  /**
   * WebGL vendor
   */
  WEBGL_VENDOR: 'webgl_vendor',

  /**
   * WebGL renderer
   */
  WEBGL_RENDERER: 'webgl_renderer',

  /**
   * Audio context fingerprint
   */
  AUDIO_FINGERPRINT: 'audio_fingerprint',

  /**
   * Canvas fingerprint
   */
  CANVAS_FINGERPRINT: 'canvas_fingerprint',

  /**
   * Fonts list
   */
  FONTS_LIST: 'fonts_list',

  /**
   * Touch support
   */
  TOUCH_SUPPORT: 'touch_support',

  /**
   * Cookies enabled
   */
  COOKIES_ENABLED: 'cookies_enabled',

  /**
   * Battery status
   */
  BATTERY_STATUS: 'battery_status',

  /**
   * Device orientation
   */
  DEVICE_ORIENTATION: 'device_orientation',

  /**
   * Network information
   */
  NETWORK_INFORMATION: 'network_information',

  /**
   * Browser plugins
   */
  BROWSER_PLUGINS: 'browser_plugins',

  /**
   * Do Not Track status
   */
  DNT_STATUS: 'dnt_status',

  /**
   * Connection type
   */
  CONNECTION_TYPE: 'connection_type',
} as const;

export type DeviceFingerprintComponent =
  (typeof DEVICE_FINGERPRINT_COMPONENTS)[keyof typeof DEVICE_FINGERPRINT_COMPONENTS];

/**
 * Device operating systems
 */
export const DEVICE_OS = {
  WINDOWS: 'windows',
  MACOS: 'macos',
  LINUX: 'linux',
  IOS: 'ios',
  ANDROID: 'android',
  CHROME_OS: 'chrome_os',
  TIZEN: 'tizen', // Samsung Smart TV, Galaxy Watch
  WEBOS: 'webos', // LG Smart TV
  KAIOS: 'kaios', // Feature phones
  FREERTOS: 'freertos', // IoT devices
  WINDOWS_PHONE: 'windows_phone',
  FIRE_OS: 'fire_os', // Amazon devices
  HARMONY_OS: 'harmony_os', // Huawei
  MEEGO: 'meego',
  SYMBIAN: 'symbian', // Older Nokia devices
  BLACKBERRY: 'blackberry',
  UNKNOWN: 'unknown',
} as const;

export type DeviceOS = (typeof DEVICE_OS)[keyof typeof DEVICE_OS];

/**
 * Device browsers
 */
export const DEVICE_BROWSERS = {
  CHROME: 'chrome',
  FIREFOX: 'firefox',
  SAFARI: 'safari',
  EDGE: 'edge',
  OPERA: 'opera',
  BRAVE: 'brave',
  VIVALDI: 'vivaldi',
  SAMSUNG_INTERNET: 'samsung_internet',
  UC_BROWSER: 'uc_browser', // Popular in Bangladesh
  OPERA_MINI: 'opera_mini', // Popular in Bangladesh
  NOKIA_BROWSER: 'nokia_browser',
  KAIOS_BROWSER: 'kaios_browser',
  WEBVIEW: 'webview',
  UNKNOWN: 'unknown',
} as const;

export type DeviceBrowser = (typeof DEVICE_BROWSERS)[keyof typeof DEVICE_BROWSERS];

/**
 * Device vendors/manufacturers
 */
export const DEVICE_VENDORS = {
  APPLE: 'apple',
  SAMSUNG: 'samsung',
  HUAWEI: 'huawei',
  XIAOMI: 'xiaomi',
  OPPO: 'oppo',
  VIVO: 'vivo',
  REALME: 'realme',
  ONEPLUS: 'oneplus',
  NOKIA: 'nokia', // Common in Bangladesh
  SYMPHONY: 'symphony', // Popular Bangladeshi brand
  WALTON: 'walton', // Bangladeshi brand
  TRANSSION: 'transsion', // TECNO, Infinix
  LENOVO: 'lenovo',
  DELL: 'dell',
  HP: 'hp',
  ASUS: 'asus',
  ACER: 'acer',
  MICROSOFT: 'microsoft',
  GOOGLE: 'google',
  SONY: 'sony',
  LG: 'lg',
  PANASONIC: 'panasonic',
  UNKNOWN: 'unknown',
} as const;

export type DeviceVendor = (typeof DEVICE_VENDORS)[keyof typeof DEVICE_VENDORS];

/**
 * Device display orientations
 */
export const DEVICE_ORIENTATIONS = {
  PORTRAIT: 'portrait',
  LANDSCAPE: 'landscape',
  SQUARE: 'square',
  UNKNOWN: 'unknown',
} as const;

export type DeviceOrientation = (typeof DEVICE_ORIENTATIONS)[keyof typeof DEVICE_ORIENTATIONS];

/**
 * Device connection types
 */
export const DEVICE_CONNECTION_TYPES = {
  WIFI: 'wifi',
  CELLULAR: 'cellular',
  BLUETOOTH: 'bluetooth',
  ETHERNET: 'ethernet',
  VPN: 'vpn',
  PROXY: 'proxy',
  UNKNOWN: 'unknown',
} as const;

export type DeviceConnectionType =
  (typeof DEVICE_CONNECTION_TYPES)[keyof typeof DEVICE_CONNECTION_TYPES];

/**
 * Device configuration
 */
export const DEVICE_CONFIG = {
  /**
   * Maximum number of devices per user
   */
  MAX_DEVICES_PER_USER: 10,

  /**
   * Device trust duration in days for trusted devices
   */
  TRUST_DURATION_DAYS: 30,

  /**
   * Device verification expiry in minutes
   */
  VERIFICATION_EXPIRY_MINUTES: 15,

  /**
   * Whether to require device verification for new devices
   */
  REQUIRE_VERIFICATION_FOR_NEW_DEVICES: true,

  /**
   * Whether to allow trusted devices to bypass MFA
   */
  ALLOW_TRUSTED_DEVICES_BYPASS_MFA: false,

  /**
   * Whether to track device location
   */
  TRACK_LOCATION: true,

  /**
   * Whether to enable device fingerprinting
   */
  ENABLE_FINGERPRINTING: true,

  /**
   * Fingerprint confidence threshold (0-1)
   */
  FINGERPRINT_CONFIDENCE_THRESHOLD: 0.7,

  /**
   * Suspicious activity threshold before blocking
   */
  SUSPICIOUS_ACTIVITY_THRESHOLD: 3,

  /**
   * Device blocking duration in minutes
   */
  BLOCK_DURATION_MINUTES: 60,

  /**
   * Whether to auto-block suspicious devices
   */
  AUTO_BLOCK_SUSPICIOUS_DEVICES: true,

  /**
   * Whether to notify users of new device logins
   */
  NOTIFY_NEW_DEVICE_LOGIN: true,

  /**
   * Whether to notify users of suspicious device activity
   */
  NOTIFY_SUSPICIOUS_ACTIVITY: true,
} as const;

/**
 * Device interface
 */
export interface Device {
  /**
   * Device unique identifier
   */
  id: string;

  /**
   * User ID associated with the device
   */
  userId: string;

  /**
   * Device type
   */
  type: DeviceType;

  /**
   * Device name (user-provided)
   */
  name?: string;

  /**
   * Device trust level
   */
  trustLevel: DeviceTrustLevel;

  /**
   * Device fingerprint hash
   */
  fingerprint: string;

  /**
   * Device metadata
   */
  metadata: DeviceMetadata;

  /**
   * Device status
   */
  status: DeviceStatus;

  /**
   * When the device was first seen
   */
  firstSeenAt: Date;

  /**
   * When the device was last used
   */
  lastUsedAt: Date;

  /**
   * When the device was verified
   */
  verifiedAt?: Date;

  /**
   * When the device was blocked
   */
  blockedAt?: Date;

  /**
   * When the device trust expires
   */
  trustExpiresAt?: Date;

  /**
   * Total login count from this device
   */
  loginCount: number;

  /**
   * Failed login attempts from this device
   */
  failedAttempts: number;

  /**
   * Whether the device is active
   */
  isActive: boolean;

  /**
   * Whether the device is verified
   */
  isVerified: boolean;

  /**
   * Whether the device is blocked
   */
  isBlocked: boolean;
}

/**
 * Device metadata interface
 */
export interface DeviceMetadata {
  /**
   * Device vendor/manufacturer
   */
  vendor: DeviceVendor;

  /**
   * Device model
   */
  model?: string;

  /**
   * Operating system
   */
  os: DeviceOS;

  /**
   * Operating system version
   */
  osVersion?: string;

  /**
   * Browser
   */
  browser: DeviceBrowser;

  /**
   * Browser version
   */
  browserVersion?: string;

  /**
   * Screen resolution
   */
  screenResolution?: string;

  /**
   * Device orientation
   */
  orientation: DeviceOrientation;

  /**
   * Connection type
   */
  connectionType: DeviceConnectionType;

  /**
   * IP address
   */
  ipAddress: string;

  /**
   * User agent string
   */
  userAgent: string;

  /**
   * Location information
   */
  location?: DeviceLocation;

  /**
   * Device capabilities
   */
  capabilities: DeviceCapabilities;

  /**
   * Additional metadata
   */
  additional: Record<string, unknown>;
}

/**
 * Device location interface
 */
export interface DeviceLocation {
  /**
   * Country code (ISO-3166)
   */
  countryCode?: string;

  /**
   * City name
   */
  city?: string;

  /**
   * Region/state
   */
  region?: string;

  /**
   * Postal code
   */
  postalCode?: string;

  /**
   * Latitude
   */
  latitude?: number;

  /**
   * Longitude
   */
  longitude?: number;

  /**
   * Timezone
   */
  timezone?: string;
}

/**
 * Device capabilities interface
 */
export interface DeviceCapabilities {
  /**
   * Whether device has touch support
   */
  touchSupport: boolean;

  /**
   * Whether device has camera
   */
  hasCamera: boolean;

  /**
   * Whether device has microphone
   */
  hasMicrophone: boolean;

  /**
   * Whether device has GPS
   */
  hasGPS: boolean;

  /**
   * Whether device has NFC
   */
  hasNFC: boolean;

  /**
   * Whether device supports biometrics
   */
  supportsBiometrics: boolean;

  /**
   * Device memory in GB
   */
  memory?: number;

  /**
   * Device storage in GB
   */
  storage?: number;

  /**
   * Screen size in inches
   */
  screenSize?: number;

  /**
   * Pixel density
   */
  pixelDensity?: number;
}

/**
 * Device status types
 */
export const DEVICE_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  SUSPENDED: 'suspended',
  BLOCKED: 'blocked',
  VERIFIED: 'verified',
  PENDING_VERIFICATION: 'pending_verification',
  EXPIRED: 'expired',
} as const;

export type DeviceStatus = (typeof DEVICE_STATUS)[keyof typeof DEVICE_STATUS];

/**
 * Device events for logging
 */
export const DEVICE_EVENTS = {
  DEVICE_REGISTERED: 'device.registered',
  DEVICE_VERIFIED: 'device.verified',
  DEVICE_TRUSTED: 'device.trusted',
  DEVICE_UNTRUSTED: 'device.untrusted',
  DEVICE_BLOCKED: 'device.blocked',
  DEVICE_UNBLOCKED: 'device.unblocked',
  DEVICE_SUSPECTED: 'device.suspected',
  DEVICE_REMOVED: 'device.removed',
  DEVICE_FINGERPRINT_GENERATED: 'device.fingerprint.generated',
  DEVICE_FINGERPRINT_MISMATCH: 'device.fingerprint.mismatch',
  DEVICE_VERIFICATION_ATTEMPT: 'device.verification.attempt',
  DEVICE_VERIFICATION_SUCCESS: 'device.verification.success',
  DEVICE_VERIFICATION_FAILURE: 'device.verification.failure',
  DEVICE_TOKEN_GENERATED: 'device.token.generated',
  DEVICE_TOKEN_USED: 'device.token.used',
  DEVICE_TOKEN_EXPIRED: 'device.token.expired',
} as const;

export type DeviceEvent = (typeof DEVICE_EVENTS)[keyof typeof DEVICE_EVENTS];

/**
 * Device error messages
 */
export const DEVICE_ERROR_MESSAGES = {
  DEVICE_NOT_FOUND: 'Device not found',
  DEVICE_BLOCKED: 'Device is blocked',
  DEVICE_SUSPICIOUS: 'Device is flagged as suspicious',
  DEVICE_UNTRUSTED: 'Device is not trusted',
  DEVICE_NOT_VERIFIED: 'Device is not verified',
  DEVICE_VERIFICATION_FAILED: 'Device verification failed',
  DEVICE_FINGERPRINT_MISMATCH: 'Device fingerprint mismatch',
  DEVICE_LIMIT_EXCEEDED: 'Maximum devices per user exceeded',
  DEVICE_TOKEN_INVALID: 'Invalid device verification token',
  DEVICE_TOKEN_EXPIRED: 'Device verification token expired',
  DEVICE_VERIFICATION_REQUIRED: 'Device verification required',
  DEVICE_REGISTRATION_FAILED: 'Device registration failed',
  DEVICE_UPDATE_FAILED: 'Device update failed',
  DEVICE_REMOVAL_FAILED: 'Device removal failed',
  DEVICE_TYPE_UNSUPPORTED: 'Device type not supported',
  DEVICE_LOCATION_BLOCKED: 'Device location is blocked',
} as const;

export type DeviceErrorMessage = (typeof DEVICE_ERROR_MESSAGES)[keyof typeof DEVICE_ERROR_MESSAGES];

/**
 * Device success messages
 */
export const DEVICE_SUCCESS_MESSAGES = {
  DEVICE_REGISTERED: 'Device registered successfully',
  DEVICE_VERIFIED: 'Device verified successfully',
  DEVICE_TRUSTED: 'Device trusted successfully',
  DEVICE_UNBLOCKED: 'Device unblocked successfully',
  DEVICE_REMOVED: 'Device removed successfully',
  DEVICE_TOKEN_GENERATED: 'Device verification token generated',
  DEVICE_FINGERPRINT_GENERATED: 'Device fingerprint generated',
} as const;

export type DeviceSuccessMessage =
  (typeof DEVICE_SUCCESS_MESSAGES)[keyof typeof DEVICE_SUCCESS_MESSAGES];

/**
 * Helper functions for device management
 */
export const DEVICE_UTILS = {
  /**
   * Get device type from user agent
   */
  getDeviceTypeFromUserAgent: (userAgent: string): DeviceType => {
    const ua = userAgent.toLowerCase();

    if (ua.includes('mobile') && !ua.includes('tablet')) {
      return DEVICE_TYPES.MOBILE;
    }
    if (ua.includes('tablet') || ua.includes('ipad')) {
      return DEVICE_TYPES.TABLET;
    }
    if (ua.includes('tv') || ua.includes('smarttv')) {
      return DEVICE_TYPES.SMART_TV;
    }
    if (ua.includes('playstation') || ua.includes('xbox') || ua.includes('nintendo')) {
      return DEVICE_TYPES.GAMING_CONSOLE;
    }
    if (ua.includes('kiosk') || ua.includes('self-service')) {
      return DEVICE_TYPES.KIOSK;
    }
    if (ua.includes('pos') || ua.includes('point-of-sale')) {
      return DEVICE_TYPES.POS;
    }
    if (ua.includes('watch') || ua.includes('wearable')) {
      return DEVICE_TYPES.WEARABLE;
    }
    if (ua.includes('car') || ua.includes('automotive')) {
      return DEVICE_TYPES.AUTOMOTIVE;
    }
    if (ua.includes('feature') || ua.includes('j2me') || ua.includes('nokia')) {
      return DEVICE_TYPES.FEATURE_PHONE;
    }
    if (ua.includes('iot') || ua.includes('smart')) {
      return DEVICE_TYPES.IOT;
    }

    return DEVICE_TYPES.DESKTOP;
  },

  /**
   * Get device vendor from user agent
   */
  getDeviceVendor: (userAgent: string): DeviceVendor => {
    const ua = userAgent.toLowerCase();

    if (ua.includes('apple')) return DEVICE_VENDORS.APPLE;
    if (ua.includes('samsung')) return DEVICE_VENDORS.SAMSUNG;
    if (ua.includes('huawei')) return DEVICE_VENDORS.HUAWEI;
    if (ua.includes('xiaomi')) return DEVICE_VENDORS.XIAOMI;
    if (ua.includes('oppo')) return DEVICE_VENDORS.OPPO;
    if (ua.includes('vivo')) return DEVICE_VENDORS.VIVO;
    if (ua.includes('realme')) return DEVICE_VENDORS.REALME;
    if (ua.includes('oneplus')) return DEVICE_VENDORS.ONEPLUS;
    if (ua.includes('nokia')) return DEVICE_VENDORS.NOKIA;
    if (ua.includes('symphony')) return DEVICE_VENDORS.SYMPHONY;
    if (ua.includes('walton')) return DEVICE_VENDORS.WALTON;
    if (ua.includes('transsion') || ua.includes('tecno') || ua.includes('infinix')) {
      return DEVICE_VENDORS.TRANSSION;
    }
    if (ua.includes('lenovo')) return DEVICE_VENDORS.LENOVO;
    if (ua.includes('dell')) return DEVICE_VENDORS.DELL;
    if (ua.includes('hp') || ua.includes('hewlett')) return DEVICE_VENDORS.HP;
    if (ua.includes('asus')) return DEVICE_VENDORS.ASUS;
    if (ua.includes('acer')) return DEVICE_VENDORS.ACER;
    if (ua.includes('microsoft') || ua.includes('surface')) return DEVICE_VENDORS.MICROSOFT;
    if (ua.includes('google') || ua.includes('pixel')) return DEVICE_VENDORS.GOOGLE;
    if (ua.includes('sony')) return DEVICE_VENDORS.SONY;
    if (ua.includes('lg')) return DEVICE_VENDORS.LG;
    if (ua.includes('panasonic')) return DEVICE_VENDORS.PANASONIC;

    return DEVICE_VENDORS.UNKNOWN;
  },

  /**
   * Get device OS from user agent
   */
  getDeviceOS: (userAgent: string): DeviceOS => {
    const ua = userAgent.toLowerCase();

    if (ua.includes('windows')) return DEVICE_OS.WINDOWS;
    if (ua.includes('mac os')) return DEVICE_OS.MACOS;
    if (ua.includes('linux')) return DEVICE_OS.LINUX;
    if (ua.includes('iphone') || ua.includes('ipad') || ua.includes('ios')) return DEVICE_OS.IOS;
    if (ua.includes('android')) return DEVICE_OS.ANDROID;
    if (ua.includes('chrome os')) return DEVICE_OS.CHROME_OS;
    if (ua.includes('tizen')) return DEVICE_OS.TIZEN;
    if (ua.includes('webos')) return DEVICE_OS.WEBOS;
    if (ua.includes('kaios')) return DEVICE_OS.KAIOS;
    if (ua.includes('freertos')) return DEVICE_OS.FREERTOS;
    if (ua.includes('windows phone') || ua.includes('wp')) return DEVICE_OS.WINDOWS_PHONE;
    if (ua.includes('fire os')) return DEVICE_OS.FIRE_OS;
    if (ua.includes('harmony')) return DEVICE_OS.HARMONY_OS;
    if (ua.includes('symbian')) return DEVICE_OS.SYMBIAN;
    if (ua.includes('blackberry')) return DEVICE_OS.BLACKBERRY;

    return DEVICE_OS.UNKNOWN;
  },

  /**
   * Get device browser from user agent
   */
  getDeviceBrowser: (userAgent: string): DeviceBrowser => {
    const ua = userAgent.toLowerCase();

    if (ua.includes('chrome')) return DEVICE_BROWSERS.CHROME;
    if (ua.includes('firefox')) return DEVICE_BROWSERS.FIREFOX;
    if (ua.includes('safari') && !ua.includes('chrome')) return DEVICE_BROWSERS.SAFARI;
    if (ua.includes('edge')) return DEVICE_BROWSERS.EDGE;
    if (ua.includes('opera mini')) return DEVICE_BROWSERS.OPERA_MINI;
    if (ua.includes('opera')) return DEVICE_BROWSERS.OPERA;
    if (ua.includes('brave')) return DEVICE_BROWSERS.BRAVE;
    if (ua.includes('vivaldi')) return DEVICE_BROWSERS.VIVALDI;
    if (ua.includes('samsung') && ua.includes('internet')) return DEVICE_BROWSERS.SAMSUNG_INTERNET;
    if (ua.includes('ucbrowser') || ua.includes('uc browser')) return DEVICE_BROWSERS.UC_BROWSER;
    if (ua.includes('nokia') && ua.includes('browser')) return DEVICE_BROWSERS.NOKIA_BROWSER;
    if (ua.includes('kaios')) return DEVICE_BROWSERS.KAIOS_BROWSER;
    if (ua.includes('webview')) return DEVICE_BROWSERS.WEBVIEW;

    return DEVICE_BROWSERS.UNKNOWN;
  },

  /**
   * Get device trust level based on factors
   */
  getTrustLevel: (device: Partial<Device>): DeviceTrustLevel => {
    // If device has been blocked, return blocked
    if (device.isBlocked) {
      return DEVICE_TRUST_LEVELS.BLOCKED;
    }

    // If device is verified, return verified
    if (device.isVerified) {
      return DEVICE_TRUST_LEVELS.VERIFIED;
    }

    // Check suspicious activity
    if (
      device.failedAttempts &&
      device.failedAttempts > DEVICE_CONFIG.SUSPICIOUS_ACTIVITY_THRESHOLD
    ) {
      return DEVICE_TRUST_LEVELS.SUSPICIOUS;
    }

    // Check trust expiry
    if (device.trustExpiresAt && device.trustExpiresAt < new Date()) {
      return DEVICE_TRUST_LEVELS.UNTRUSTED;
    }

    // Default trust level based on verification status
    if (device.isVerified) {
      return DEVICE_TRUST_LEVELS.TRUSTED;
    }

    return DEVICE_TRUST_LEVELS.UNKNOWN;
  },

  /**
   * Check if device is considered trusted
   */
  isDeviceTrusted: (device: Partial<Device>): boolean => {
    const trustLevel = DEVICE_UTILS.getTrustLevel(device);
    return (
      trustLevel === DEVICE_TRUST_LEVELS.TRUSTED || trustLevel === DEVICE_TRUST_LEVELS.VERIFIED
    );
  },

  /**
   * Check if device is suspicious
   */
  isDeviceSuspicious: (device: Partial<Device>): boolean => {
    const trustLevel = DEVICE_UTILS.getTrustLevel(device);
    return (
      trustLevel === DEVICE_TRUST_LEVELS.SUSPICIOUS || trustLevel === DEVICE_TRUST_LEVELS.UNTRUSTED
    );
  },

  /**
   * Check if device is blocked
   */
  isDeviceBlocked: (device: Partial<Device>): boolean => {
    return (
      device.isBlocked === true ||
      DEVICE_UTILS.getTrustLevel(device) === DEVICE_TRUST_LEVELS.BLOCKED
    );
  },

  /**
   * Get display name for device type
   */
  getDeviceTypeDisplayName: (type: DeviceType): string => {
    const map: Record<DeviceType, string> = {
      desktop: 'Desktop Computer',
      mobile: 'Mobile Phone',
      feature_phone: 'Feature Phone',
      tablet: 'Tablet',
      smart_tv: 'Smart TV',
      gaming_console: 'Gaming Console',
      iot: 'IoT Device',
      kiosk: 'Self-Service Kiosk',
      pos: 'POS Terminal',
      wearable: 'Wearable Device',
      automotive: 'Automotive System',
      unknown: 'Unknown Device',
    };
    return map[type] || type;
  },

  /**
   * Get display name for trust level
   */
  getTrustLevelDisplayName: (level: DeviceTrustLevel): string => {
    const map: Record<DeviceTrustLevel, string> = {
      trusted: '✅ Trusted',
      suspicious: '⚠️ Suspicious',
      blocked: '🚫 Blocked',
      unknown: '❓ Unknown',
      untrusted: '❌ Untrusted',
      verified: '✓ Verified',
      compromised: '🔓 Compromised',
    };
    return map[level] || level;
  },

  /**
   * Get color for trust level
   */
  getTrustLevelColor: (level: DeviceTrustLevel): string => {
    const map: Record<DeviceTrustLevel, string> = {
      trusted: '#22C55E', // Green
      suspicious: '#F59E0B', // Yellow
      blocked: '#EF4444', // Red
      unknown: '#9CA3AF', // Gray
      untrusted: '#F97316', // Orange
      verified: '#3B82F6', // Blue
      compromised: '#7F1D1D', // Dark Red
    };
    return map[level] || map.unknown;
  },
} as const;

/**
 * All device constants for export
 */
export const DEVICE_CONSTANTS = {
  TYPES: DEVICE_TYPES,
  TRUST_LEVELS: DEVICE_TRUST_LEVELS,
  FINGERPRINT_COMPONENTS: DEVICE_FINGERPRINT_COMPONENTS,
  OS: DEVICE_OS,
  BROWSERS: DEVICE_BROWSERS,
  VENDORS: DEVICE_VENDORS,
  ORIENTATIONS: DEVICE_ORIENTATIONS,
  CONNECTION_TYPES: DEVICE_CONNECTION_TYPES,
  CONFIG: DEVICE_CONFIG,
  STATUS: DEVICE_STATUS,
  EVENTS: DEVICE_EVENTS,
  ERROR_MESSAGES: DEVICE_ERROR_MESSAGES,
  SUCCESS_MESSAGES: DEVICE_SUCCESS_MESSAGES,
  UTILS: DEVICE_UTILS,
} as const;

/**
 * All device constants for export
 */
export const ALL_DEVICE_CONSTANTS = {
  ...DEVICE_TYPES,
  ...DEVICE_TRUST_LEVELS,
  ...DEVICE_FINGERPRINT_COMPONENTS,
  ...DEVICE_OS,
  ...DEVICE_BROWSERS,
  ...DEVICE_VENDORS,
  ...DEVICE_ORIENTATIONS,
  ...DEVICE_CONNECTION_TYPES,
  ...DEVICE_CONFIG,
  ...DEVICE_STATUS,
  ...DEVICE_EVENTS,
  ...DEVICE_ERROR_MESSAGES,
  ...DEVICE_SUCCESS_MESSAGES,
} as const;
