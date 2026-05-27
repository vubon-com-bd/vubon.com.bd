/**
 * Device Constants - Pure immutable device configuration
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 *
 * @module shared-constants/auth-constants/device.constants
 *
 * RULES:
 * ✅ NO device fingerprint generation logic
 * ✅ NO business logic
 * ✅ NO side effects
 * ✅ ONLY pure readonly constants
 */

// ============================================================
// Type Utilities
// ============================================================
export type ValueOf<T> = T[keyof T];
export type ReadonlyDeep<T> = {
  readonly [P in keyof T]: ReadonlyDeep<T[P]>;
};

// ============================================================
// Device Types (Extended for Bangladesh market)
// ============================================================
export const DEVICE_TYPES = {
  // Standard devices
  DESKTOP: 'desktop',
  LAPTOP: 'laptop',
  TABLET: 'tablet',
  MOBILE: 'mobile',
  TV: 'tv',
  CONSOLE: 'console',
  WEARABLE: 'wearable',

  // Bangladesh specific
  FEATURE_PHONE: 'feature_phone',     // Keypad phones still used in BD
  TABLET_PHONE: 'tablet_phone',       // Hybrid devices (e.g., Samsung Fold)
  KIOSK: 'kiosk',                     // Public e-commerce kiosks
  POS_DEVICE: 'pos_device',           // Payment terminals

  OTHER: 'other',
} as const;

export type DeviceType = ValueOf<typeof DEVICE_TYPES>;

// ============================================================
// Device Categories (For policy enforcement)
// ============================================================
export const DEVICE_CATEGORIES = {
  HIGH_TRUST: 'high_trust',       // Desktop, Laptop (full features)
  MEDIUM_TRUST: 'medium_trust',   // Tablet, Mobile (standard features)
  LOW_TRUST: 'low_trust',         // Feature phone, Kiosk (limited features)
  RESTRICTED: 'restricted',       // TV, Console, Wearable (view only)
} as const;

export type DeviceCategory = ValueOf<typeof DEVICE_CATEGORIES>;

// ============================================================
// Operating Systems (Full coverage)
// ============================================================
export const OS_TYPES = {
  // Desktop OS
  WINDOWS: 'windows',
  MACOS: 'macos',
  LINUX: 'linux',
  CHROME_OS: 'chrome_os',

  // Mobile OS
  IOS: 'ios',
  ANDROID: 'android',
  HARMONY_OS: 'harmony_os',       // Huawei devices (used in BD)
  KAI_OS: 'kai_os',               // Feature phone OS

  // Bangladesh specific
  SYMPHONY_OS: 'symphony_os',     // Local BD brand
  WALTON_OS: 'walton_os',         // Local BD brand

  OTHER: 'other',
} as const;

export type OsType = ValueOf<typeof OS_TYPES>;

// ============================================================
// Browser Types (Full coverage)
// ============================================================
export const BROWSER_TYPES = {
  // Major browsers
  CHROME: 'chrome',
  FIREFOX: 'firefox',
  SAFARI: 'safari',
  EDGE: 'edge',
  OPERA: 'opera',
  BRAVE: 'brave',
  VIVALDI: 'vivaldi',

  // Mobile browsers
  SAMSUNG: 'samsung_browser',
  UC_BROWSER: 'uc_browser',       // Popular in BD
  XIAOMI: 'xiaomi_browser',
  HUAWEI: 'huawei_browser',

  // Bangladesh specific
  BANGLADESH_BROWSER: 'bd_browser', // Local browsers

  // Mini browsers (data saving)
  OPERA_MINI: 'opera_mini',       // Popular in BD for 2G/3G
  UC_MINI: 'uc_mini',

  // WebViews
  WEBVIEW: 'webview',
  CHROME_WEBVIEW: 'chrome_webview',

  OTHER: 'other',
} as const;

export type BrowserType = ValueOf<typeof BROWSER_TYPES>;

// ============================================================
// Network Types (For security & experience)
// ============================================================
export const NETWORK_TYPES = {
  // Mobile networks
  MOBILE_2G: '2g',
  MOBILE_3G: '3g',
  MOBILE_4G: '4g',
  MOBILE_5G: '5g',
  MOBILE_UNKNOWN: 'mobile_unknown',

  // WiFi
  WIFI: 'wifi',
  WIFI_PUBLIC: 'wifi_public',    // Public hotspots (higher risk)
  WIFI_SECURE: 'wifi_secure',    // Home/Office

  // Wired
  ETHERNET: 'ethernet',

  // Other
  VPN: 'vpn',                     // Higher scrutiny
  PROXY: 'proxy',                 // Higher scrutiny
  TOR: 'tor',                     // Block or high scrutiny

  UNKNOWN: 'unknown',
} as const;

export type NetworkType = ValueOf<typeof NETWORK_TYPES>;

// ============================================================
// Device Trust Duration (in days & seconds)
// ============================================================
export const DEVICE_TRUST_DURATION = {
  // In days
  NEVER: 0,
  ONE_DAY: 1,
  THREE_DAYS: 3,
  SEVEN_DAYS: 7,
  FOURTEEN_DAYS: 14,
  THIRTY_DAYS: 30,
  NINETY_DAYS: 90,
  ONE_YEAR: 365,
  FOREVER: -1,

  // In seconds (for programmatic use)
  IN_SECONDS: {
    ONE_DAY: 86400,
    THREE_DAYS: 259200,
    SEVEN_DAYS: 604800,
    FOURTEEN_DAYS: 1209600,
    THIRTY_DAYS: 2592000,
    NINETY_DAYS: 7776000,
    ONE_YEAR: 31536000,
  },
} as const;

export type DeviceTrustDuration = typeof DEVICE_TRUST_DURATION;

// ============================================================
// Device Fingerprint Headers (For passive fingerprinting)
// ============================================================
export const DEVICE_FINGERPRINT_HEADERS = {
  // Standard HTTP headers
  USER_AGENT: 'user-agent',
  ACCEPT: 'accept',
  ACCEPT_LANGUAGE: 'accept-language',
  ACCEPT_ENCODING: 'accept-encoding',

  // Modern client hints
  SEC_CH_UA: 'sec-ch-ua',
  SEC_CH_UA_PLATFORM: 'sec-ch-ua-platform',
  SEC_CH_UA_MOBILE: 'sec-ch-ua-mobile',
  SEC_CH_UA_ARCH: 'sec-ch-ua-arch',
  SEC_CH_UA_BITNESS: 'sec-ch-ua-bitness',
  SEC_CH_UA_FULL_VERSION: 'sec-ch-ua-full-version',

  // Network hints
  DOWNLINK: 'downlink',           // Effective connection speed
  RTT: 'rtt',                     // Round trip time
  ECT: 'ect',                     // Effective connection type
  SAVE_DATA: 'save-data',         // Data saver mode

  // Device specific
  VIEWPORT_WIDTH: 'viewport-width',
  DEVICE_MEMORY: 'device-memory',

  // Platform specific
  PLATFORM: 'sec-ch-ua-platform',
} as const;

export type DeviceFingerprintHeader = ValueOf<typeof DEVICE_FINGERPRINT_HEADERS>;

// ============================================================
// Device Risk Levels (With scoring)
// ============================================================
export const DEVICE_RISK_LEVEL = {
  // Trust levels
  TRUSTED: 'trusted',             // Known device, frequent use (score: 0)
  NEUTRAL: 'neutral',             // New but normal device (score: 30)
  SUSPICIOUS: 'suspicious',       // Unusual patterns (score: 60)
  HIGH_RISK: 'high_risk',         // Known malicious indicators (score: 85)
  BLOCKED: 'blocked',             // Explicitly blocked (score: 100)

  // Risk scores (for programmatic use)
  RISK_SCORES: {
    TRUSTED: 0,
    NEUTRAL: 30,
    SUSPICIOUS: 60,
    HIGH_RISK: 85,
    BLOCKED: 100,
  },
} as const;

export type DeviceRiskLevel = ValueOf<typeof DEVICE_RISK_LEVEL>;

// ============================================================
// Device Risk Indicators (What triggers risk escalation)
// ============================================================
export const DEVICE_RISK_INDICATORS = {
  // High risk indicators
  VPN_DETECTED: 'vpn_detected',
  PROXY_DETECTED: 'proxy_detected',
  TOR_DETECTED: 'tor_detected',
  DATACENTER_IP: 'datacenter_ip',

  // Medium risk indicators
  FREQUENT_IP_CHANGE: 'frequent_ip_change',
  FREQUENT_USER_AGENT_CHANGE: 'frequent_ua_change',
  SUSPICIOUS_HEADERS: 'suspicious_headers',

  // Low risk indicators
  NEW_GEO_LOCATION: 'new_geo_location',
  NEW_DEVICE_TYPE: 'new_device_type',
  UNCOMMON_BROWSER: 'uncommon_browser',

  // Fraud indicators
  MULTIPLE_ACCOUNTS: 'multiple_accounts_same_device',
  FAST_ACCOUNT_SWITCHING: 'fast_account_switching',
  KNOWN_FRAUD_DEVICE: 'known_fraud_device',
} as const;

export type DeviceRiskIndicator = ValueOf<typeof DEVICE_RISK_INDICATORS>;

// ============================================================
// Device Activity Limits (Anti-fraud)
// ============================================================
export const DEVICE_ACTIVITY_LIMITS = {
  // Max accounts per device
  MAX_ACCOUNTS_PER_DEVICE: 5,

  // Max devices per account
  MAX_DEVICES_PER_ACCOUNT: 10,

  // Time window for suspicious activity (seconds)
  SUSPICIOUS_WINDOW_SECONDS: 3600, // 1 hour

  // Max logins per device per hour
  MAX_LOGINS_PER_DEVICE_PER_HOUR: 20,

  // Max OTP requests per device per hour
  MAX_OTP_PER_DEVICE_PER_HOUR: 10,
} as const;

export type DeviceActivityLimits = typeof DEVICE_ACTIVITY_LIMITS;

// ============================================================
// Unknown Device Handling Policy
// ============================================================
export const UNKNOWN_DEVICE_HANDLING = {
  // Security requirements
  REQUIRE_MFA: true,
  REQUIRE_EMAIL_VERIFICATION: false,
  REQUIRE_PHONE_VERIFICATION: true,
  SEND_NOTIFICATION: true,

  // Action limitations
  LIMIT_SENSITIVE_ACTIONS: true,        // e.g., payment, password change
  LIMIT_HIGH_VALUE_ACTIONS: true,       // e.g., high amount purchase

  // What sensitive actions are restricted
  RESTRICTED_ACTIONS: {
    PAYMENT: true,
    WITHDRAWAL: true,
    PASSWORD_CHANGE: true,
    EMAIL_CHANGE: true,
    PHONE_CHANGE: true,
    DEVICE_REMOVAL: true,
  },

  // Cooldown period before unknown device is trusted (seconds)
  TRUST_COOLDOWN_SECONDS: 300,           // 5 minutes of normal activity

  // Max failed attempts before blocking device
  MAX_FAILED_ATTEMPTS_BEFORE_BLOCK: 10,
} as const;

export type UnknownDeviceHandling = typeof UNKNOWN_DEVICE_HANDLING;

// ============================================================
// Session Transfer (QR code based device login)
// ============================================================
export const SESSION_TRANSFER = {
  ENABLED: true,

  // QR code expiry (seconds)
  QR_CODE_EXPIRY_SECONDS: 60,

  // Max pending transfers per user
  MAX_PENDING_TRANSFERS: 3,

  // Allowed transfer types
  ALLOWED_TRANSFERS: {
    MOBILE_TO_DESKTOP: true,
    DESKTOP_TO_MOBILE: true,
    TABLET_TO_MOBILE: true,
    FEATURE_PHONE_TO_SMART: false,    // Not supported
  },

  // Security
  REQUIRE_CONFIRMATION: true,          // User must confirm on both devices
} as const;

export type SessionTransfer = typeof SESSION_TRANSFER;

// ============================================================
// Device Pairing (Family sharing)
// ============================================================
export const DEVICE_PAIRING = {
  ENABLED: true,

  // Max paired devices per account
  MAX_PAIRED_DEVICES: 5,

  // Trust level for paired devices
  PAIRED_DEVICE_TRUST_LEVEL: 'trusted' as const,

  // What can paired devices do
  PAIRED_DEVICE_PERMISSIONS: {
    VIEW_ORDER_HISTORY: true,
    TRACK_ORDERS: true,
    ADD_TO_CART: true,
    MAKE_PAYMENT: false,              // Must be owner device
    VIEW_PERSONAL_INFO: false,
  },
} as const;

export type DevicePairing = typeof DEVICE_PAIRING;

// ============================================================
// Device Logging & Monitoring
// ============================================================
export const DEVICE_LOGGING = {
  // What to log
  LOG_LOGIN: true,
  LOG_LOGOUT: true,
  LOG_DEVICE_CHANGE: true,
  LOG_IP_CHANGE: true,
  LOG_RISK_ESCALATION: true,

  // Log retention (days)
  LOG_RETENTION_DAYS: 90,

  // Send alert for suspicious device activity
  ALERT_ON_SUSPICIOUS_DEVICE: true,
  ALERT_ON_NEW_DEVICE_LOGIN: true,
  ALERT_ON_RISK_ESCALATION: true,

  // Alert channels
  ALERT_CHANNELS: {
    EMAIL: true,
    SMS: true,
    PUSH_NOTIFICATION: true,
  },
} as const;

export type DeviceLogging = typeof DEVICE_LOGGING;

// ============================================================
// Device Fingerprint Components (What data is collected)
// ============================================================
export const FINGERPRINT_COMPONENTS = {
  // Browser data
  USER_AGENT: true,
  ACCEPT_LANGUAGE: true,
  ACCEPT_ENCODING: true,

  // Hardware data
  SCREEN_RESOLUTION: true,
  COLOR_DEPTH: true,
  DEVICE_MEMORY: true,
  HARDWARE_CONCURRENCY: true,     // CPU cores

  // Software data
  PLATFORM: true,
  TIMEZONE: true,
  SESSION_STORAGE: true,
  LOCAL_STORAGE: true,
  INDEXED_DB: true,

  // Network data
  IP_ADDRESS: true,
  SUBNET_MASK: false,              // Privacy sensitive, optional

  // Canvas & Audio (Browser fingerprinting)
  CANVAS_FINGERPRINT: true,
  AUDIO_FINGERPRINT: true,
  WEBGL_FINGERPRINT: true,

  // Bangladesh specific
  MOBILE_NETWORK_OPERATOR: true,   // Detect GP, Robi, Banglalink, Teletalk
} as const;

export type FingerprintComponents = typeof FINGERPRINT_COMPONENTS;

// ============================================================
// Device Compliance (Privacy)
// ============================================================
export const DEVICE_COMPLIANCE = {
  // GDPR, Bangladesh Data Protection Law
  REQUIRE_CONSENT_FOR_FINGERPRINTING: true,

  // Data minimization
  MINIMIZE_DATA_COLLECTION: true,

  // Retention policy
  FINGERPRINT_RETENTION_DAYS: 30,

  // Anonymize after
  ANONYMIZE_AFTER_DAYS: 90,

  // User right to delete device data
  USER_CAN_DELETE_DEVICE_HISTORY: true,
} as const;

export type DeviceCompliance = typeof DEVICE_COMPLIANCE;

// ============================================================
// Device Performance (For poor networks)
// ============================================================
export const DEVICE_PERFORMANCE = {
  // Feature detection for poor devices
  FEATURE_PHONE_MODE: {
    ENABLED: true,
    SIMPLIFIED_UI: true,
    DISABLE_ANIMATIONS: true,
    SMALLER_IMAGES: true,
  },

  // Slow network optimization (Bangladesh 3G/2G)
  SLOW_NETWORK_MODE: {
    ENABLED: true,
    COMPRESS_RESPONSES: true,
    REDUCE_IMAGE_QUALITY: true,
    INCREASE_TIMEOUTS: true,
    DATA_SAVER_HINTS: true,
  },

  // Network threshold (Mbps)
  SLOW_NETWORK_THRESHOLD_MBPS: 2,
  VERY_SLOW_NETWORK_THRESHOLD_MBPS: 0.5,
} as const;

export type DevicePerformance = typeof DEVICE_PERFORMANCE;

// ============================================================
// Allowed Device Types by Role
// ============================================================
export const ROLE_DEVICE_ALLOWANCE = {
  CUSTOMER: {
    allowed: [
      DEVICE_TYPES.DESKTOP,
      DEVICE_TYPES.LAPTOP,
      DEVICE_TYPES.MOBILE,
      DEVICE_TYPES.TABLET,
      DEVICE_TYPES.FEATURE_PHONE,
    ] as DeviceType[],
    maxDevices: 10,
  },
  SELLER: {
    allowed: [
      DEVICE_TYPES.DESKTOP,
      DEVICE_TYPES.LAPTOP,
      DEVICE_TYPES.MOBILE,
      DEVICE_TYPES.TABLET,
    ] as DeviceType[],
    maxDevices: 5,
  },
  ADMIN: {
    allowed: [
      DEVICE_TYPES.DESKTOP,
      DEVICE_TYPES.LAPTOP,
    ] as DeviceType[],
    maxDevices: 3,
  },
  SUPER_ADMIN: {
    allowed: [
      DEVICE_TYPES.DESKTOP,
    ] as DeviceType[],
    maxDevices: 2,
  },
} as const;

export type RoleDeviceAllowance = typeof ROLE_DEVICE_ALLOWANCE;
export type UserRole = keyof typeof ROLE_DEVICE_ALLOWANCE;

// ============================================================
// Deep freeze everything for immutability
// ============================================================
const deepFreeze = <T>(obj: T): ReadonlyDeep<T> => {
  Object.freeze(obj);
  if (obj === null || typeof obj !== 'object') return obj as ReadonlyDeep<T>;

  for (const value of Object.values(obj)) {
    if (value !== null && typeof value === 'object') {
      deepFreeze(value);
    }
  }

  return obj as ReadonlyDeep<T>;
};

// Apply deep freeze to all exported objects
export const __ALL_CONSTANTS_FROZEN__ = deepFreeze({
  DEVICE_TYPES,
  DEVICE_CATEGORIES,
  OS_TYPES,
  BROWSER_TYPES,
  NETWORK_TYPES,
  DEVICE_TRUST_DURATION,
  DEVICE_FINGERPRINT_HEADERS,
  DEVICE_RISK_LEVEL,
  DEVICE_RISK_INDICATORS,
  DEVICE_ACTIVITY_LIMITS,
  UNKNOWN_DEVICE_HANDLING,
  SESSION_TRANSFER,
  DEVICE_PAIRING,
  DEVICE_LOGGING,
  FINGERPRINT_COMPONENTS,
  DEVICE_COMPLIANCE,
  DEVICE_PERFORMANCE,
  ROLE_DEVICE_ALLOWANCE,
});
