/**
 * Device Constants
 * @module shared-constants/common/device.constants
 */

export const DEVICE = {
  // Device types
  TYPE: {
    DESKTOP: 'desktop',
    LAPTOP: 'laptop',
    TABLET: 'tablet',
    MOBILE: 'mobile',
    SMART_TV: 'smart_tv',
    SMART_WATCH: 'smart_watch',
    GAMING_CONSOLE: 'gaming_console',
    OTHER: 'other',
  } as const,

  // Operating systems
  OS: {
    WINDOWS: 'windows',
    MACOS: 'macos',
    LINUX: 'linux',
    ANDROID: 'android',
    IOS: 'ios',
    IPADOS: 'ipados',
    TVOS: 'tvos',
    WATCHOS: 'watchos',
    CHROME_OS: 'chrome_os',
    OTHER: 'other',
  } as const,

  // Browsers
  BROWSER: {
    CHROME: 'chrome',
    FIREFOX: 'firefox',
    SAFARI: 'safari',
    EDGE: 'edge',
    OPERA: 'opera',
    BRAVE: 'brave',
    VIVALDI: 'vivaldi',
    SAMSUNG: 'samsung',
    UC: 'uc',
    OTHER: 'other',
  } as const,

  // Device platforms
  PLATFORM: {
    WEB: 'web',
    MOBILE_WEB: 'mobile_web',
    ANDROID_APP: 'android_app',
    IOS_APP: 'ios_app',
    PWA: 'pwa',
    API: 'api',
    BOT: 'bot',
  } as const,

  // Device status
  DEVICE_STATUS: {
    REGISTERED: 'registered',
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    BLOCKED: 'blocked',
    REMOVED: 'removed',
    PENDING_VERIFICATION: 'pending_verification',
  } as const,

  // Device verification
  VERIFICATION: {
    REQUIRED: true,
    MAX_ATTEMPTS: 3,
    TIMEOUT_SECONDS: 300,
    TRUST_EXPIRY_DAYS: 90,
  },

  // Device limits
  LIMITS: {
    MAX_DEVICES_PER_USER: 10,
    MAX_ACTIVE_SESSIONS: 5,
    MAX_FAILED_ATTEMPTS: 5,
    LOCKOUT_DURATION: 3600, // 1 hour
  },

  // Device fingerprinting
  FINGERPRINT: {
    ENABLED: true,
    COMPONENTS: ['user_agent', 'screen', 'canvas', 'webgl', 'fonts', 'timezone', 'language'],
    SALT_ROUNDS: 12,
  },

  // Device validation
  VALIDATION: {
    USER_AGENT: {
      MAX_LENGTH: 1000,
      REQUIRED: true,
    },
    IP_ADDRESS: {
      REQUIRED: true,
      ALLOW_PRIVATE: false,
      ALLOW_LOOPBACK: false,
    },
    SCREEN_RESOLUTION: {
      REQUIRED: false,
      MIN_WIDTH: 320,
      MIN_HEIGHT: 480,
    },
  },

  // Device capabilities
  CAPABILITIES: {
    TOUCH: 'touch',
    CAMERA: 'camera',
    MICROPHONE: 'microphone',
    GPS: 'gps',
    NFC: 'nfc',
    BLUETOOTH: 'bluetooth',
    BIOMETRIC: 'biometric',
    NOTIFICATIONS: 'notifications',
    OFFLINE: 'offline',
    PUSH: 'push',
  } as const,

  // Device orientation
  ORIENTATION: {
    PORTRAIT: 'portrait',
    LANDSCAPE: 'landscape',
    SQUARE: 'square',
  } as const,

  // Screen sizes
  SCREEN: {
    XS: { width: 0, height: 0, label: 'Extra Small' },
    SM: { width: 640, height: 480, label: 'Small' },
    MD: { width: 768, height: 1024, label: 'Medium' },
    LG: { width: 1024, height: 768, label: 'Large' },
    XL: { width: 1280, height: 720, label: 'Extra Large' },
    '2XL': { width: 1536, height: 864, label: '2X Large' },
  } as const,
} as const;

export type DeviceType = (typeof DEVICE.TYPE)[keyof typeof DEVICE.TYPE];
export type DeviceOS = (typeof DEVICE.OS)[keyof typeof DEVICE.OS];
export type DeviceBrowser = (typeof DEVICE.BROWSER)[keyof typeof DEVICE.BROWSER];
export type DevicePlatform = (typeof DEVICE.PLATFORM)[keyof typeof DEVICE.PLATFORM];
export type DeviceStatusType = (typeof DEVICE.DEVICE_STATUS)[keyof typeof DEVICE.DEVICE_STATUS];
export type DeviceCapability = (typeof DEVICE.CAPABILITIES)[keyof typeof DEVICE.CAPABILITIES];
export type DeviceOrientation = (typeof DEVICE.ORIENTATION)[keyof typeof DEVICE.ORIENTATION];
