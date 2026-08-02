/**
 * Device-related type definitions for the monorepo
 * All device types are centralized here for consistent usage across packages
 */

/**
 * Device type types
 * Represents the type of device being used
 */
export type DeviceType =
  | 'desktop'
  | 'mobile'
  | 'feature_phone'
  | 'tablet'
  | 'smart_tv'
  | 'gaming_console'
  | 'iot'
  | 'kiosk'
  | 'pos'
  | 'wearable'
  | 'automotive'
  | 'unknown';

/**
 * Device OS types
 * Represents the operating system of the device
 */
export type DeviceOS =
  | 'windows'
  | 'macos'
  | 'linux'
  | 'ios'
  | 'android'
  | 'chrome_os'
  | 'tizen'
  | 'webos'
  | 'kaios'
  | 'freertos'
  | 'windows_phone'
  | 'fire_os'
  | 'harmony_os'
  | 'meego'
  | 'symbian'
  | 'blackberry'
  | 'unknown';

/**
 * Device browser types
 * Represents the browser or app used on the device
 */
export type DeviceBrowser =
  | 'chrome'
  | 'firefox'
  | 'safari'
  | 'edge'
  | 'opera'
  | 'brave'
  | 'vivaldi'
  | 'samsung_internet'
  | 'uc_browser'
  | 'opera_mini'
  | 'nokia_browser'
  | 'kaios_browser'
  | 'webview'
  | 'unknown';

/**
 * Device vendor types
 * Represents the manufacturer of the device
 */
export type DeviceVendor =
  | 'apple'
  | 'samsung'
  | 'huawei'
  | 'xiaomi'
  | 'oppo'
  | 'vivo'
  | 'realme'
  | 'oneplus'
  | 'nokia'
  | 'symphony'
  | 'walton'
  | 'transsion'
  | 'lenovo'
  | 'dell'
  | 'hp'
  | 'asus'
  | 'acer'
  | 'microsoft'
  | 'google'
  | 'sony'
  | 'lg'
  | 'panasonic'
  | 'unknown';

/**
 * Device trust level types
 * Represents the trust level of a device
 */
export type DeviceTrustLevel =
  'trusted' | 'suspicious' | 'blocked' | 'unknown' | 'untrusted' | 'verified' | 'compromised';

/**
 * Device orientation types
 * Represents the screen orientation of the device
 */
export type DeviceOrientation = 'portrait' | 'landscape' | 'square' | 'unknown';

/**
 * Device connection type types
 * Represents the network connection type
 */
export type DeviceConnectionType =
  'wifi' | 'cellular' | 'bluetooth' | 'ethernet' | 'vpn' | 'proxy' | 'unknown';

/**
 * Mobile network operator types (Bangladesh specific)
 * Represents the mobile network operator in Bangladesh
 */
export type MobileNetworkOperator =
  | 'gp' // Grameenphone
  | 'robi' // Robi Axiata
  | 'bangla_link' // BanglaLink
  | 'teletalk' // Teletalk
  | 'unknown';

/**
 * Device interface
 * Represents a device in the system
 */
export interface Device {
  /** Unique identifier for the device */
  id: string;
  /** User ID associated with the device */
  userId: string;
  /** Device type */
  type: DeviceType;
  /** Device name (user-provided or system-generated) */
  name?: string;
  /** Device trust level */
  trustLevel: DeviceTrustLevel;
  /** Device fingerprint hash */
  fingerprint: string;
  /** Device metadata */
  metadata: DeviceMetadata;
  /** Device status */
  status: DeviceStatus;
  /** When the device was first seen */
  firstSeenAt: Date;
  /** When the device was last used */
  lastUsedAt: Date;
  /** When the device was verified */
  verifiedAt?: Date;
  /** When the device was blocked */
  blockedAt?: Date;
  /** When the device trust expires */
  trustExpiresAt?: Date;
  /** Total login count from this device */
  loginCount: number;
  /** Failed login attempts from this device */
  failedAttempts: number;
  /** Whether the device is active */
  isActive: boolean;
  /** Whether the device is verified */
  isVerified: boolean;
  /** Whether the device is blocked */
  isBlocked: boolean;
}

/**
 * Device metadata interface
 * Contains detailed information about the device
 */
export interface DeviceMetadata {
  /** Device vendor/manufacturer */
  vendor: DeviceVendor;
  /** Device model */
  model?: string;
  /** Operating system */
  os: DeviceOS;
  /** Operating system version */
  osVersion?: string;
  /** Browser or app */
  browser: DeviceBrowser;
  /** Browser version */
  browserVersion?: string;
  /** Screen resolution */
  screenResolution?: string;
  /** Device orientation */
  orientation: DeviceOrientation;
  /** Connection type */
  connectionType: DeviceConnectionType;
  /** IP address */
  ipAddress: string;
  /** User agent string */
  userAgent: string;
  /** Location information */
  location?: DeviceLocation;
  /** Device capabilities */
  capabilities: DeviceCapabilities;
  /** Additional metadata */
  additional: Record<string, unknown>;
}

/**
 * Device location interface
 * Location information of the device
 */
export interface DeviceLocation {
  /** Country code (ISO-3166) */
  countryCode?: string;
  /** City name */
  city?: string;
  /** Region/state */
  region?: string;
  /** Postal code */
  postalCode?: string;
  /** Latitude */
  latitude?: number;
  /** Longitude */
  longitude?: number;
  /** Timezone */
  timezone?: string;
}

/**
 * Device capabilities interface
 * Hardware and software capabilities of the device
 */
export interface DeviceCapabilities {
  /** Whether device has touch support */
  touchSupport: boolean;
  /** Whether device has camera */
  hasCamera: boolean;
  /** Whether device has microphone */
  hasMicrophone: boolean;
  /** Whether device has GPS */
  hasGPS: boolean;
  /** Whether device has NFC */
  hasNFC: boolean;
  /** Whether device supports biometrics */
  supportsBiometrics: boolean;
  /** Device memory in GB */
  memory?: number;
  /** Device storage in GB */
  storage?: number;
  /** Screen size in inches */
  screenSize?: number;
  /** Pixel density */
  pixelDensity?: number;
  /** Whether device supports face recognition */
  supportsFaceRecognition?: boolean;
  /** Whether device supports fingerprint */
  supportsFingerprint?: boolean;
}

/**
 * Device status types
 * Represents the current status of a device
 */
export type DeviceStatus =
  'active' | 'inactive' | 'suspended' | 'blocked' | 'verified' | 'pending_verification' | 'expired';

/**
 * Device trust score interface
 * Score indicating how trusted a device is
 */
export interface DeviceTrustScore {
  /** Overall trust score (0-100) */
  score: number;
  /** Factors contributing to the score */
  factors: {
    /** Based on login history */
    history: number;
    /** Based on device fingerprint consistency */
    fingerprint: number;
    /** Based on location consistency */
    location: number;
    /** Based on behavior patterns */
    behavior: number;
    /** Based on security posture */
    security: number;
  };
  /** Last time the score was calculated */
  calculatedAt: Date;
}

/**
 * Device fingerprint interface
 * Unique fingerprint for a device
 */
export interface DeviceFingerprint {
  /** Hash of the fingerprint components */
  hash: string;
  /** Components used to generate the fingerprint */
  components: {
    userAgent: string;
    ipAddress: string;
    screenResolution?: string;
    timezoneOffset?: number;
    language?: string;
    platform?: string;
    deviceMemory?: number;
    hardwareConcurrency?: number;
    webglVendor?: string;
    webglRenderer?: string;
    audioFingerprint?: string;
    canvasFingerprint?: string;
    fontsList?: string[];
    touchSupport?: boolean;
    cookiesEnabled?: boolean;
    batteryStatus?: string;
    deviceOrientation?: string;
    networkInformation?: string;
    browserPlugins?: string[];
    dntStatus?: boolean;
    connectionType?: string;
  };
  /** Confidence level (0-1) of the fingerprint */
  confidence: number;
  /** Last time the fingerprint was generated */
  generatedAt: Date;
}

/**
 * Device registration request interface
 * Used when registering a new device
 */
export interface DeviceRegistrationRequest {
  /** Device metadata */
  metadata: Omit<DeviceMetadata, 'additional'>;
  /** Additional metadata */
  additional?: Record<string, unknown>;
  /** Device name (user-provided) */
  name?: string;
}

/**
 * Device registration response interface
 * Response after registering a device
 */
export interface DeviceRegistrationResponse {
  /** Whether registration was successful */
  success: boolean;
  /** Registered device */
  device?: Device;
  /** Response message */
  message: string;
  /** Error code if registration failed */
  errorCode?: string;
}

/**
 * Device verification request interface
 * Used when verifying a device
 */
export interface DeviceVerificationRequest {
  /** Device ID to verify */
  deviceId: string;
  /** Verification code */
  code: string;
  /** Trust duration in days */
  trustDurationDays?: number;
}

/**
 * Device verification response interface
 * Response after device verification
 */
export interface DeviceVerificationResponse {
  /** Whether verification was successful */
  success: boolean;
  /** Verified device */
  device?: Device;
  /** Response message */
  message: string;
  /** Error code if verification failed */
  errorCode?: string;
}

/**
 * Device trust request interface
 * Used when manually trusting or untrusting a device
 */
export interface DeviceTrustRequest {
  /** Device ID */
  deviceId: string;
  /** Trust level to set */
  trustLevel: DeviceTrustLevel;
  /** Trust duration in days (for trust level) */
  durationDays?: number;
  /** Reason for changing trust level */
  reason?: string;
}

/**
 * Device trust response interface
 * Response after device trust change
 */
export interface DeviceTrustResponse {
  /** Whether trust change was successful */
  success: boolean;
  /** Updated device */
  device?: Device;
  /** Response message */
  message: string;
  /** Error code if trust change failed */
  errorCode?: string;
}

/**
 * Device list response interface
 * Paginated list of devices
 */
export interface DeviceListResponse {
  /** Array of devices */
  devices: Device[];
  /** Total number of devices */
  total: number;
  /** Current page number */
  page: number;
  /** Number of devices per page */
  limit: number;
  /** Total number of pages */
  totalPages: number;
}

/**
 * Device filter interface
 * Used for filtering devices in lists
 */
export interface DeviceFilter {
  /** Filter by user ID */
  userId?: string;
  /** Filter by device type */
  type?: DeviceType;
  /** Filter by trust level */
  trustLevel?: DeviceTrustLevel;
  /** Filter by OS */
  os?: DeviceOS;
  /** Filter by browser */
  browser?: DeviceBrowser;
  /** Filter by active status */
  isActive?: boolean;
  /** Filter by verified status */
  isVerified?: boolean;
  /** Filter by blocked status */
  isBlocked?: boolean;
  /** Filter by date range - from */
  fromDate?: Date;
  /** Filter by date range - to */
  toDate?: Date;
  /** Search term for device name or metadata */
  search?: string;
}

/**
 * Device statistics interface
 * Statistical data about devices
 */
export interface DeviceStatistics {
  /** Total number of devices */
  totalDevices: number;
  /** Number of unique users with devices */
  uniqueUsers: number;
  /** Devices by type */
  devicesByType: Record<DeviceType, number>;
  /** Devices by OS */
  devicesByOS: Record<DeviceOS, number>;
  /** Devices by browser */
  devicesByBrowser: Record<DeviceBrowser, number>;
  /** Devices by trust level */
  devicesByTrustLevel: Record<DeviceTrustLevel, number>;
  /** Average devices per user */
  averageDevicesPerUser: number;
  /** Most common device vendors */
  topVendors: Array<{
    vendor: DeviceVendor;
    count: number;
  }>;
  /** Timestamp when statistics were calculated */
  calculatedAt: Date;
}

/**
 * Device configuration interface
 * Configuration for device management
 */
export interface DeviceConfig {
  /** Maximum devices per user */
  maxDevicesPerUser: number;
  /** Device trust duration in days */
  trustDurationDays: number;
  /** Device verification expiry in minutes */
  verificationExpiryMinutes: number;
  /** Whether to require verification for new devices */
  requireVerificationForNewDevices: boolean;
  /** Whether to allow trusted devices to bypass MFA */
  allowTrustedDevicesBypassMFA: boolean;
  /** Whether to track device location */
  trackLocation: boolean;
  /** Whether to enable device fingerprinting */
  enableFingerprinting: boolean;
  /** Fingerprint confidence threshold (0-1) */
  fingerprintConfidenceThreshold: number;
  /** Suspicious activity threshold before blocking */
  suspiciousActivityThreshold: number;
  /** Device blocking duration in minutes */
  blockDurationMinutes: number;
  /** Whether to auto-block suspicious devices */
  autoBlockSuspiciousDevices: boolean;
  /** Whether to notify users of new device logins */
  notifyNewDeviceLogin: boolean;
  /** Whether to notify users of suspicious device activity */
  notifySuspiciousActivity: boolean;
}

/**
 * Device event interface
 * Used for device-related events
 */
export interface DeviceEvent {
  /** Type of device event */
  type:
    | 'REGISTERED'
    | 'VERIFIED'
    | 'TRUSTED'
    | 'UNTRUSTED'
    | 'BLOCKED'
    | 'UNBLOCKED'
    | 'SUSPECTED'
    | 'REMOVED';
  /** Device ID */
  deviceId: string;
  /** User ID */
  userId: string;
  /** Device type */
  deviceType: DeviceType;
  /** Additional data */
  data: {
    success: boolean;
    error?: string;
    trustLevel?: DeviceTrustLevel;
    metadata?: Record<string, unknown>;
  };
  /** Timestamp of the event */
  timestamp: Date;
}

/**
 * Device session information interface
 * Session information specific to a device
 */
export interface DeviceSessionInfo {
  /** Device ID */
  deviceId: string;
  /** Session ID */
  sessionId: string;
  /** IP address */
  ipAddress: string;
  /** User agent */
  userAgent: string;
  /** Session start time */
  startedAt: Date;
  /** Last activity time */
  lastActivityAt: Date;
  /** Session duration in seconds */
  duration: number;
  /** Whether session is active */
  isActive: boolean;
}

/**
 * Device network information interface (Bangladesh specific)
 * Network information for devices in Bangladesh
 */
export interface DeviceNetworkInfo {
  /** Mobile network operator */
  mobileOperator?: MobileNetworkOperator;
  /** Network type (2G, 3G, 4G, 5G) */
  networkGeneration?: '2G' | '3G' | '4G' | '5G';
  /** Signal strength */
  signalStrength?: number;
  /** Roaming status */
  isRoaming?: boolean;
  /** SIM operator (if multiple SIMs) */
  simOperator?: string;
}
