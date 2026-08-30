/**
 * Authentication Device Constants
 * Device management, types, and security constants
 */

/**
 * Device Types
 * Types of devices that can access the platform
 */
export const DEVICE_TYPES = {
  /** Desktop computer */
  DESKTOP: 'desktop',
  /** Laptop computer */
  LAPTOP: 'laptop',
  /** Tablet device */
  TABLET: 'tablet',
  /** Mobile phone */
  MOBILE: 'mobile',
  /** Smart TV */
  TV: 'tv',
  /** Gaming console */
  CONSOLE: 'console',
  /** Smart watch */
  SMART_WATCH: 'smart_watch',
  /** Other/Unknown device */
  OTHER: 'other',
} as const;

export type DeviceType = (typeof DEVICE_TYPES)[keyof typeof DEVICE_TYPES];

/**
 * Device Platforms
 * Operating systems and platforms
 */
export const DEVICE_PLATFORMS = {
  /** Windows operating system */
  WINDOWS: 'windows',
  /** macOS operating system */
  MACOS: 'macos',
  /** Linux operating system */
  LINUX: 'linux',
  /** Chrome OS */
  CHROME_OS: 'chrome_os',
  /** Android operating system */
  ANDROID: 'android',
  /** iOS operating system */
  IOS: 'ios',
  /** iPadOS operating system */
  IPADOS: 'ipados',
  /** watchOS */
  WATCHOS: 'watchos',
  /** tvOS */
  TVOS: 'tvos',
  /** Web browser */
  WEB: 'web',
  /** Other/Unknown platform */
  OTHER: 'other',
} as const;

export type DevicePlatform = (typeof DEVICE_PLATFORMS)[keyof typeof DEVICE_PLATFORMS];

/**
 * Device Trust Levels
 * Trust levels for device authentication
 */
export const DEVICE_TRUST_LEVELS = {
  /** Highly trusted device (saved, MFA disabled) */
  HIGH: 'high',
  /** Medium trust device (saved, MFA required) */
  MEDIUM: 'medium',
  /** Low trust device (not saved, MFA required) */
  LOW: 'low',
  /** Untrusted device (blocked) */
  UNTRUSTED: 'untrusted',
} as const;

export type DeviceTrustLevel = (typeof DEVICE_TRUST_LEVELS)[keyof typeof DEVICE_TRUST_LEVELS];

/**
 * Device Status
 * Status of a device in the system
 */
export const DEVICE_STATUS = {
  /** Device is active and allowed */
  ACTIVE: 'active',
  /** Device is inactive */
  INACTIVE: 'inactive',
  /** Device is blocked */
  BLOCKED: 'blocked',
  /** Device is suspended */
  SUSPENDED: 'suspended',
  /** Device is pending verification */
  PENDING: 'pending',
  /** Device is expired */
  EXPIRED: 'expired',
} as const;

export type DeviceStatus = (typeof DEVICE_STATUS)[keyof typeof DEVICE_STATUS];

/**
 * Device Configuration
 * Default configuration values for device management
 */
export const DEVICE_CONFIG = {
  /** Maximum devices per user */
  MAX_DEVICES_PER_USER: 10,
  /** Maximum untrusted devices per user */
  MAX_UNTRUSTED_DEVICES: 3,
  /** Device trust duration in days (90 days) */
  TRUST_DURATION_DAYS: 90,
  /** Device session duration in days (7 days) */
  SESSION_DURATION_DAYS: 7,
  /** Remember me cookie duration in days (30 days) */
  REMEMBER_ME_DURATION_DAYS: 30,
  /** Inactive device cleanup days (30 days) */
  INACTIVE_CLEANUP_DAYS: 30,
  /** Maximum failed device verifications */
  MAX_VERIFICATION_ATTEMPTS: 5,
  /** Device fingerprint TTL in days */
  FINGERPRINT_TTL_DAYS: 30,
  /** Allow new devices without verification */
  ALLOW_NEW_DEVICES_WITHOUT_VERIFICATION: false,
  /** Require MFA for new devices */
  REQUIRE_MFA_FOR_NEW_DEVICES: true,
  /** Trust device after successful logins */
  TRUST_AFTER_SUCCESSFUL_LOGINS: 3,
} as const;

export type DeviceConfig = (typeof DEVICE_CONFIG)[keyof typeof DEVICE_CONFIG];

/**
 * Device Error Messages
 * Error messages for device management failures
 */
export const DEVICE_ERRORS = {
  /** Device not found */
  DEVICE_NOT_FOUND: 'Device not found',
  /** Device is blocked */
  DEVICE_BLOCKED: 'Device is blocked',
  /** Device is inactive */
  DEVICE_INACTIVE: 'Device is inactive',
  /** Maximum devices exceeded */
  MAX_DEVICES_EXCEEDED: 'Maximum number of devices exceeded',
  /** Device verification failed */
  VERIFICATION_FAILED: 'Device verification failed',
  /** Device trust level is too low */
  TRUST_LEVEL_TOO_LOW: 'Device trust level is too low for this action',
  /** Device not recognized */
  DEVICE_NOT_RECOGNIZED: 'Device not recognized. Please verify your identity',
  /** Device fingerprint mismatch */
  FINGERPRINT_MISMATCH: 'Device fingerprint mismatch',
  /** Device already exists */
  DEVICE_ALREADY_EXISTS: 'Device already exists',
  /** Device not allowed */
  DEVICE_NOT_ALLOWED: 'Device is not allowed',
  /** Device verification expired */
  VERIFICATION_EXPIRED: 'Device verification expired',
} as const;

export type DeviceError = (typeof DEVICE_ERRORS)[keyof typeof DEVICE_ERRORS];

/**
 * Device Success Messages
 * Success messages for device operations
 */
export const DEVICE_SUCCESS = {
  ADDED: 'Device added successfully',
  VERIFIED: 'Device verified successfully',
  REMOVED: 'Device removed successfully',
  UPDATED: 'Device updated successfully',
  TRUSTED: 'Device trusted successfully',
  UNTRUSTED: 'Device untrusted successfully',
} as const;

export type DeviceSuccess = (typeof DEVICE_SUCCESS)[keyof typeof DEVICE_SUCCESS];

/**
 * Device Status Messages
 * Human-readable messages for each device status
 */
export const DEVICE_STATUS_MESSAGES: Record<DeviceStatus, string> = {
  [DEVICE_STATUS.ACTIVE]: 'Device is active and can access the platform',
  [DEVICE_STATUS.INACTIVE]: 'Device is inactive and cannot access the platform',
  [DEVICE_STATUS.BLOCKED]: 'Device is blocked from accessing the platform',
  [DEVICE_STATUS.SUSPENDED]: 'Device is suspended for security reasons',
  [DEVICE_STATUS.PENDING]: 'Device is pending verification',
  [DEVICE_STATUS.EXPIRED]: 'Device trust has expired',
} as const;

/**
 * Device Trust Level Descriptions
 * Human-readable descriptions for each trust level
 */
export const DEVICE_TRUST_LEVEL_DESCRIPTIONS: Record<DeviceTrustLevel, string> = {
  [DEVICE_TRUST_LEVELS.HIGH]: 'Highly trusted device - MFA not required, full access',
  [DEVICE_TRUST_LEVELS.MEDIUM]: 'Medium trust device - MFA required for sensitive actions',
  [DEVICE_TRUST_LEVELS.LOW]: 'Low trust device - MFA required, limited access',
  [DEVICE_TRUST_LEVELS.UNTRUSTED]: 'Untrusted device - Access blocked or requires verification',
} as const;

/**
 * Device Trust Level Scores
 * Numeric scores for trust levels
 */
export const DEVICE_TRUST_LEVEL_SCORES: Record<DeviceTrustLevel, number> = {
  [DEVICE_TRUST_LEVELS.HIGH]: 100,
  [DEVICE_TRUST_LEVELS.MEDIUM]: 75,
  [DEVICE_TRUST_LEVELS.LOW]: 25,
  [DEVICE_TRUST_LEVELS.UNTRUSTED]: 0,
} as const;

/**
 * Device Type Labels
 * Human-readable labels for each device type
 */
export const DEVICE_TYPE_LABELS: Record<DeviceType, string> = {
  [DEVICE_TYPES.DESKTOP]: 'Desktop Computer',
  [DEVICE_TYPES.LAPTOP]: 'Laptop',
  [DEVICE_TYPES.TABLET]: 'Tablet',
  [DEVICE_TYPES.MOBILE]: 'Mobile Phone',
  [DEVICE_TYPES.TV]: 'Smart TV',
  [DEVICE_TYPES.CONSOLE]: 'Gaming Console',
  [DEVICE_TYPES.SMART_WATCH]: 'Smart Watch',
  [DEVICE_TYPES.OTHER]: 'Other Device',
} as const;

/**
 * Device Platform Labels
 * Human-readable labels for each platform
 */
export const DEVICE_PLATFORM_LABELS: Record<DevicePlatform, string> = {
  [DEVICE_PLATFORMS.WINDOWS]: 'Windows',
  [DEVICE_PLATFORMS.MACOS]: 'macOS',
  [DEVICE_PLATFORMS.LINUX]: 'Linux',
  [DEVICE_PLATFORMS.CHROME_OS]: 'Chrome OS',
  [DEVICE_PLATFORMS.ANDROID]: 'Android',
  [DEVICE_PLATFORMS.IOS]: 'iOS',
  [DEVICE_PLATFORMS.IPADOS]: 'iPadOS',
  [DEVICE_PLATFORMS.WATCHOS]: 'watchOS',
  [DEVICE_PLATFORMS.TVOS]: 'tvOS',
  [DEVICE_PLATFORMS.WEB]: 'Web Browser',
  [DEVICE_PLATFORMS.OTHER]: 'Other Platform',
} as const;

/**
 * Device Icon Mapping
 * Icon names for each device type
 */
export const DEVICE_TYPE_ICONS: Record<DeviceType, string> = {
  [DEVICE_TYPES.DESKTOP]: 'desktop_windows',
  [DEVICE_TYPES.LAPTOP]: 'laptop',
  [DEVICE_TYPES.TABLET]: 'tablet',
  [DEVICE_TYPES.MOBILE]: 'smartphone',
  [DEVICE_TYPES.TV]: 'tv',
  [DEVICE_TYPES.CONSOLE]: 'sports_esports',
  [DEVICE_TYPES.SMART_WATCH]: 'watch',
  [DEVICE_TYPES.OTHER]: 'devices',
} as const;

/**
 * Blocked Device Statuses
 * Device statuses that indicate blocked or restricted access
 */
export const BLOCKED_DEVICE_STATUSES: DeviceStatus[] = [
  DEVICE_STATUS.BLOCKED,
  DEVICE_STATUS.SUSPENDED,
] as const;

/**
 * Helper function to check if device type is valid
 */
export function isValidDeviceType(type: string): type is DeviceType {
  return Object.values(DEVICE_TYPES).includes(type as DeviceType);
}

/**
 * Helper function to check if device platform is valid
 */
export function isValidDevicePlatform(platform: string): platform is DevicePlatform {
  return Object.values(DEVICE_PLATFORMS).includes(platform as DevicePlatform);
}

/**
 * Helper function to check if device status is valid
 */
export function isValidDeviceStatus(status: string): status is DeviceStatus {
  return Object.values(DEVICE_STATUS).includes(status as DeviceStatus);
}

/**
 * Helper function to check if device trust level is valid
 */
export function isValidDeviceTrustLevel(level: string): level is DeviceTrustLevel {
  return Object.values(DEVICE_TRUST_LEVELS).includes(level as DeviceTrustLevel);
}

/**
 * Helper function to get device type label
 */
export function getDeviceTypeLabel(type: DeviceType): string {
  return DEVICE_TYPE_LABELS[type] || 'Unknown Device';
}

/**
 * Helper function to get device platform label
 */
export function getDevicePlatformLabel(platform: DevicePlatform): string {
  return DEVICE_PLATFORM_LABELS[platform] || 'Unknown Platform';
}

/**
 * Helper function to get device type icon
 */
export function getDeviceTypeIcon(type: DeviceType): string {
  return DEVICE_TYPE_ICONS[type] || 'devices';
}

/**
 * Helper function to get device trust level description
 */
export function getDeviceTrustLevelDescription(level: DeviceTrustLevel): string {
  return DEVICE_TRUST_LEVEL_DESCRIPTIONS[level] || 'Unknown trust level';
}

/**
 * Helper function to get device trust level score
 */
export function getDeviceTrustLevelScore(level: DeviceTrustLevel): number {
  return DEVICE_TRUST_LEVEL_SCORES[level] || 0;
}

/**
 * Helper function to get device status message
 */
export function getDeviceStatusMessage(status: DeviceStatus): string {
  return DEVICE_STATUS_MESSAGES[status] || 'Unknown device status';
}

/**
 * Helper function to check if device is active
 */
export function isDeviceActive(status: DeviceStatus): boolean {
  return status === DEVICE_STATUS.ACTIVE;
}

/**
 * Helper function to check if device is allowed
 */
export function isDeviceAllowed(status: DeviceStatus): boolean {
  return !BLOCKED_DEVICE_STATUSES.includes(status);
}

/**
 * Helper function to check if device needs verification
 */
export function doesDeviceNeedVerification(status: DeviceStatus): boolean {
  return status === DEVICE_STATUS.PENDING;
}

/**
 * Helper function to check if device trust has expired
 */
export function isDeviceTrustExpired(
  trustedAt: Date,
  durationDays: number = DEVICE_CONFIG.TRUST_DURATION_DAYS
): boolean {
  const now = Date.now();
  const age = (now - trustedAt.getTime()) / (1000 * 60 * 60 * 24);
  return age >= durationDays;
}

/**
 * Helper function to check if device session has expired
 */
export function isDeviceSessionExpired(
  lastUsedAt: Date,
  durationDays: number = DEVICE_CONFIG.SESSION_DURATION_DAYS
): boolean {
  const now = Date.now();
  const age = (now - lastUsedAt.getTime()) / (1000 * 60 * 60 * 24);
  return age >= durationDays;
}

/**
 * Helper function to check if device is inactive for cleanup
 */
export function isDeviceInactiveForCleanup(
  lastUsedAt: Date,
  cleanupDays: number = DEVICE_CONFIG.INACTIVE_CLEANUP_DAYS
): boolean {
  const now = Date.now();
  const age = (now - lastUsedAt.getTime()) / (1000 * 60 * 60 * 24);
  return age >= cleanupDays;
}

/**
 * Helper function to get device type from user agent
 * This is a simple detection based on user agent string
 */
export function getDeviceTypeFromUserAgent(userAgent: string): DeviceType {
  const ua = userAgent.toLowerCase();
  if (
    ua.includes('mobile') ||
    ua.includes('android') ||
    ua.includes('iphone') ||
    ua.includes('ipod')
  ) {
    return DEVICE_TYPES.MOBILE;
  }
  if (ua.includes('tablet') || ua.includes('ipad')) {
    return DEVICE_TYPES.TABLET;
  }
  if (ua.includes('tv') || ua.includes('smarttv') || ua.includes('android tv')) {
    return DEVICE_TYPES.TV;
  }
  if (ua.includes('console') || ua.includes('ps4') || ua.includes('ps5') || ua.includes('xbox')) {
    return DEVICE_TYPES.CONSOLE;
  }
  if (ua.includes('watch')) {
    return DEVICE_TYPES.SMART_WATCH;
  }
  if (ua.includes('laptop') || ua.includes('macbook')) {
    return DEVICE_TYPES.LAPTOP;
  }
  return DEVICE_TYPES.DESKTOP;
}

/**
 * Helper function to get device platform from user agent
 */
export function getDevicePlatformFromUserAgent(userAgent: string): DevicePlatform {
  const ua = userAgent.toLowerCase();
  if (ua.includes('windows')) return DEVICE_PLATFORMS.WINDOWS;
  if (ua.includes('mac os') || ua.includes('macos') || ua.includes('darwin')) {
    return DEVICE_PLATFORMS.MACOS;
  }
  if (ua.includes('linux') || ua.includes('x11')) return DEVICE_PLATFORMS.LINUX;
  if (ua.includes('chrome os') || ua.includes('cros')) return DEVICE_PLATFORMS.CHROME_OS;
  if (ua.includes('android')) return DEVICE_PLATFORMS.ANDROID;
  if (ua.includes('iphone') || ua.includes('ios') || ua.includes('ipod')) {
    return DEVICE_PLATFORMS.IOS;
  }
  if (ua.includes('ipad') || ua.includes('ipados')) return DEVICE_PLATFORMS.IPADOS;
  if (ua.includes('watchos')) return DEVICE_PLATFORMS.WATCHOS;
  if (ua.includes('tvos') || ua.includes('apple tv')) return DEVICE_PLATFORMS.TVOS;
  if (ua.includes('web') || ua.includes('browser')) return DEVICE_PLATFORMS.WEB;
  return DEVICE_PLATFORMS.OTHER;
}
