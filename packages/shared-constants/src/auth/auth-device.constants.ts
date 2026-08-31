/**
 * Authentication Device Constants
 * Device management, types, and security constants
 */

// ============================================================
// AUTH DEVICE TYPES
// ============================================================
export const AUTH_DEVICE_TYPES = {
  DESKTOP: 'desktop',
  LAPTOP: 'laptop',
  TABLET: 'tablet',
  MOBILE: 'mobile',
  TV: 'tv',
  CONSOLE: 'console',
  SMART_WATCH: 'smart_watch',
  OTHER: 'other',
} as const;

export type AuthDeviceType = (typeof AUTH_DEVICE_TYPES)[keyof typeof AUTH_DEVICE_TYPES];

// ============================================================
// AUTH DEVICE PLATFORMS
// ============================================================
export const AUTH_DEVICE_PLATFORMS = {
  WINDOWS: 'windows',
  MACOS: 'macos',
  LINUX: 'linux',
  CHROME_OS: 'chrome_os',
  ANDROID: 'android',
  IOS: 'ios',
  IPADOS: 'ipados',
  WATCHOS: 'watchos',
  TVOS: 'tvos',
  WEB: 'web',
  OTHER: 'other',
} as const;

export type AuthDevicePlatform = (typeof AUTH_DEVICE_PLATFORMS)[keyof typeof AUTH_DEVICE_PLATFORMS];

// ============================================================
// AUTH DEVICE TRUST LEVELS
// ============================================================
export const AUTH_DEVICE_TRUST_LEVELS = {
  HIGH: 'high',
  MEDIUM: 'medium',
  LOW: 'low',
  UNTRUSTED: 'untrusted',
} as const;

export type AuthDeviceTrustLevel =
  (typeof AUTH_DEVICE_TRUST_LEVELS)[keyof typeof AUTH_DEVICE_TRUST_LEVELS];

// ============================================================
// AUTH DEVICE STATUS
// ============================================================
export const AUTH_DEVICE_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  BLOCKED: 'blocked',
  SUSPENDED: 'suspended',
  PENDING: 'pending',
  EXPIRED: 'expired',
} as const;

export type AuthDeviceStatus = (typeof AUTH_DEVICE_STATUS)[keyof typeof AUTH_DEVICE_STATUS];

// ============================================================
// AUTH DEVICE CONFIG
// ============================================================
export const AUTH_DEVICE_CONFIG = {
  MAX_DEVICES_PER_USER: 10,
  MAX_UNTRUSTED_DEVICES: 3,
  TRUST_DURATION_DAYS: 90,
  SESSION_DURATION_DAYS: 7,
  REMEMBER_ME_DURATION_DAYS: 30,
  INACTIVE_CLEANUP_DAYS: 30,
  MAX_VERIFICATION_ATTEMPTS: 5,
  FINGERPRINT_TTL_DAYS: 30,
  ALLOW_NEW_DEVICES_WITHOUT_VERIFICATION: false,
  REQUIRE_MFA_FOR_NEW_DEVICES: true,
  TRUST_AFTER_SUCCESSFUL_LOGINS: 3,
} as const;

export type AuthDeviceConfig = (typeof AUTH_DEVICE_CONFIG)[keyof typeof AUTH_DEVICE_CONFIG];

// ============================================================
// AUTH DEVICE ERRORS
// ============================================================
export const AUTH_DEVICE_ERRORS = {
  DEVICE_NOT_FOUND: 'Device not found',
  DEVICE_BLOCKED: 'Device is blocked',
  DEVICE_INACTIVE: 'Device is inactive',
  MAX_DEVICES_EXCEEDED: 'Maximum number of devices exceeded',
  VERIFICATION_FAILED: 'Device verification failed',
  TRUST_LEVEL_TOO_LOW: 'Device trust level is too low for this action',
  DEVICE_NOT_RECOGNIZED: 'Device not recognized. Please verify your identity',
  FINGERPRINT_MISMATCH: 'Device fingerprint mismatch',
  DEVICE_ALREADY_EXISTS: 'Device already exists',
  DEVICE_NOT_ALLOWED: 'Device is not allowed',
  VERIFICATION_EXPIRED: 'Device verification expired',
} as const;

export type AuthDeviceError = (typeof AUTH_DEVICE_ERRORS)[keyof typeof AUTH_DEVICE_ERRORS];

// ============================================================
// AUTH DEVICE SUCCESS
// ============================================================
export const AUTH_DEVICE_SUCCESS = {
  ADDED: 'Device added successfully',
  VERIFIED: 'Device verified successfully',
  REMOVED: 'Device removed successfully',
  UPDATED: 'Device updated successfully',
  TRUSTED: 'Device trusted successfully',
  UNTRUSTED: 'Device untrusted successfully',
} as const;

export type AuthDeviceSuccess = (typeof AUTH_DEVICE_SUCCESS)[keyof typeof AUTH_DEVICE_SUCCESS];

// ============================================================
// AUTH DEVICE STATUS MESSAGES
// ============================================================
export const AUTH_DEVICE_STATUS_MESSAGES: Record<AuthDeviceStatus, string> = {
  [AUTH_DEVICE_STATUS.ACTIVE]: 'Device is active and can access the platform',
  [AUTH_DEVICE_STATUS.INACTIVE]: 'Device is inactive and cannot access the platform',
  [AUTH_DEVICE_STATUS.BLOCKED]: 'Device is blocked from accessing the platform',
  [AUTH_DEVICE_STATUS.SUSPENDED]: 'Device is suspended for security reasons',
  [AUTH_DEVICE_STATUS.PENDING]: 'Device is pending verification',
  [AUTH_DEVICE_STATUS.EXPIRED]: 'Device trust has expired',
} as const;

// ============================================================
// AUTH DEVICE TRUST LEVEL DESCRIPTIONS
// ============================================================
export const AUTH_DEVICE_TRUST_LEVEL_DESCRIPTIONS: Record<AuthDeviceTrustLevel, string> = {
  [AUTH_DEVICE_TRUST_LEVELS.HIGH]: 'Highly trusted device - MFA not required, full access',
  [AUTH_DEVICE_TRUST_LEVELS.MEDIUM]: 'Medium trust device - MFA required for sensitive actions',
  [AUTH_DEVICE_TRUST_LEVELS.LOW]: 'Low trust device - MFA required, limited access',
  [AUTH_DEVICE_TRUST_LEVELS.UNTRUSTED]:
    'Untrusted device - Access blocked or requires verification',
} as const;

// ============================================================
// AUTH DEVICE TRUST LEVEL SCORES
// ============================================================
export const AUTH_DEVICE_TRUST_LEVEL_SCORES: Record<AuthDeviceTrustLevel, number> = {
  [AUTH_DEVICE_TRUST_LEVELS.HIGH]: 100,
  [AUTH_DEVICE_TRUST_LEVELS.MEDIUM]: 75,
  [AUTH_DEVICE_TRUST_LEVELS.LOW]: 25,
  [AUTH_DEVICE_TRUST_LEVELS.UNTRUSTED]: 0,
} as const;

// ============================================================
// AUTH DEVICE TYPE LABELS
// ============================================================
export const AUTH_DEVICE_TYPE_LABELS: Record<AuthDeviceType, string> = {
  [AUTH_DEVICE_TYPES.DESKTOP]: 'Desktop Computer',
  [AUTH_DEVICE_TYPES.LAPTOP]: 'Laptop',
  [AUTH_DEVICE_TYPES.TABLET]: 'Tablet',
  [AUTH_DEVICE_TYPES.MOBILE]: 'Mobile Phone',
  [AUTH_DEVICE_TYPES.TV]: 'Smart TV',
  [AUTH_DEVICE_TYPES.CONSOLE]: 'Gaming Console',
  [AUTH_DEVICE_TYPES.SMART_WATCH]: 'Smart Watch',
  [AUTH_DEVICE_TYPES.OTHER]: 'Other Device',
} as const;

// ============================================================
// AUTH DEVICE PLATFORM LABELS
// ============================================================
export const AUTH_DEVICE_PLATFORM_LABELS: Record<AuthDevicePlatform, string> = {
  [AUTH_DEVICE_PLATFORMS.WINDOWS]: 'Windows',
  [AUTH_DEVICE_PLATFORMS.MACOS]: 'macOS',
  [AUTH_DEVICE_PLATFORMS.LINUX]: 'Linux',
  [AUTH_DEVICE_PLATFORMS.CHROME_OS]: 'Chrome OS',
  [AUTH_DEVICE_PLATFORMS.ANDROID]: 'Android',
  [AUTH_DEVICE_PLATFORMS.IOS]: 'iOS',
  [AUTH_DEVICE_PLATFORMS.IPADOS]: 'iPadOS',
  [AUTH_DEVICE_PLATFORMS.WATCHOS]: 'watchOS',
  [AUTH_DEVICE_PLATFORMS.TVOS]: 'tvOS',
  [AUTH_DEVICE_PLATFORMS.WEB]: 'Web Browser',
  [AUTH_DEVICE_PLATFORMS.OTHER]: 'Other Platform',
} as const;

// ============================================================
// AUTH DEVICE TYPE ICONS
// ============================================================
export const AUTH_DEVICE_TYPE_ICONS: Record<AuthDeviceType, string> = {
  [AUTH_DEVICE_TYPES.DESKTOP]: 'desktop_windows',
  [AUTH_DEVICE_TYPES.LAPTOP]: 'laptop',
  [AUTH_DEVICE_TYPES.TABLET]: 'tablet',
  [AUTH_DEVICE_TYPES.MOBILE]: 'smartphone',
  [AUTH_DEVICE_TYPES.TV]: 'tv',
  [AUTH_DEVICE_TYPES.CONSOLE]: 'sports_esports',
  [AUTH_DEVICE_TYPES.SMART_WATCH]: 'watch',
  [AUTH_DEVICE_TYPES.OTHER]: 'devices',
} as const;

// ============================================================
// BLOCKED AUTH DEVICE STATUSES
// ============================================================
export const BLOCKED_AUTH_DEVICE_STATUSES: AuthDeviceStatus[] = [
  AUTH_DEVICE_STATUS.BLOCKED,
  AUTH_DEVICE_STATUS.SUSPENDED,
] as const;

// ============================================================
// AUTH DEVICE MAIN OBJECT
// ============================================================
export const authDevice = {
  TYPES: AUTH_DEVICE_TYPES,
  PLATFORMS: AUTH_DEVICE_PLATFORMS,
  TRUST_LEVELS: AUTH_DEVICE_TRUST_LEVELS,
  STATUS: AUTH_DEVICE_STATUS,
  CONFIG: AUTH_DEVICE_CONFIG,
  ERRORS: AUTH_DEVICE_ERRORS,
  SUCCESS: AUTH_DEVICE_SUCCESS,
  STATUS_MESSAGES: AUTH_DEVICE_STATUS_MESSAGES,
  TRUST_LEVEL_DESCRIPTIONS: AUTH_DEVICE_TRUST_LEVEL_DESCRIPTIONS,
  TRUST_LEVEL_SCORES: AUTH_DEVICE_TRUST_LEVEL_SCORES,
  TYPE_LABELS: AUTH_DEVICE_TYPE_LABELS,
  PLATFORM_LABELS: AUTH_DEVICE_PLATFORM_LABELS,
  TYPE_ICONS: AUTH_DEVICE_TYPE_ICONS,
  BLOCKED_STATUSES: BLOCKED_AUTH_DEVICE_STATUSES,
} as const;

export type AuthDevice = typeof authDevice;

// ============================================================
// HELPER FUNCTIONS
// ============================================================
export function isValidAuthDeviceType(type: string): type is AuthDeviceType {
  return Object.values(AUTH_DEVICE_TYPES).includes(type as AuthDeviceType);
}

export function isValidAuthDevicePlatform(platform: string): platform is AuthDevicePlatform {
  return Object.values(AUTH_DEVICE_PLATFORMS).includes(platform as AuthDevicePlatform);
}

export function isValidAuthDeviceStatus(status: string): status is AuthDeviceStatus {
  return Object.values(AUTH_DEVICE_STATUS).includes(status as AuthDeviceStatus);
}

export function isValidAuthDeviceTrustLevel(level: string): level is AuthDeviceTrustLevel {
  return Object.values(AUTH_DEVICE_TRUST_LEVELS).includes(level as AuthDeviceTrustLevel);
}

export function getAuthDeviceTypeLabel(type: AuthDeviceType): string {
  return AUTH_DEVICE_TYPE_LABELS[type] || 'Unknown Device';
}

export function getAuthDevicePlatformLabel(platform: AuthDevicePlatform): string {
  return AUTH_DEVICE_PLATFORM_LABELS[platform] || 'Unknown Platform';
}

export function getAuthDeviceTypeIcon(type: AuthDeviceType): string {
  return AUTH_DEVICE_TYPE_ICONS[type] || 'devices';
}

export function getAuthDeviceTrustLevelDescription(level: AuthDeviceTrustLevel): string {
  return AUTH_DEVICE_TRUST_LEVEL_DESCRIPTIONS[level] || 'Unknown trust level';
}

export function getAuthDeviceTrustLevelScore(level: AuthDeviceTrustLevel): number {
  return AUTH_DEVICE_TRUST_LEVEL_SCORES[level] || 0;
}

export function getAuthDeviceStatusMessage(status: AuthDeviceStatus): string {
  return AUTH_DEVICE_STATUS_MESSAGES[status] || 'Unknown device status';
}

export function isAuthDeviceActive(status: AuthDeviceStatus): boolean {
  return status === AUTH_DEVICE_STATUS.ACTIVE;
}

export function isAuthDeviceAllowed(status: AuthDeviceStatus): boolean {
  return !BLOCKED_AUTH_DEVICE_STATUSES.includes(status);
}

export function doesAuthDeviceNeedVerification(status: AuthDeviceStatus): boolean {
  return status === AUTH_DEVICE_STATUS.PENDING;
}

export function isAuthDeviceTrustExpired(
  trustedAt: Date,
  durationDays: number = AUTH_DEVICE_CONFIG.TRUST_DURATION_DAYS
): boolean {
  const now = Date.now();
  const age = (now - trustedAt.getTime()) / (1000 * 60 * 60 * 24);
  return age >= durationDays;
}

export function isAuthDeviceSessionExpired(
  lastUsedAt: Date,
  durationDays: number = AUTH_DEVICE_CONFIG.SESSION_DURATION_DAYS
): boolean {
  const now = Date.now();
  const age = (now - lastUsedAt.getTime()) / (1000 * 60 * 60 * 24);
  return age >= durationDays;
}

export function isAuthDeviceInactiveForCleanup(
  lastUsedAt: Date,
  cleanupDays: number = AUTH_DEVICE_CONFIG.INACTIVE_CLEANUP_DAYS
): boolean {
  const now = Date.now();
  const age = (now - lastUsedAt.getTime()) / (1000 * 60 * 60 * 24);
  return age >= cleanupDays;
}

export function getAuthDeviceTypeFromUserAgent(userAgent: string): AuthDeviceType {
  const ua = userAgent.toLowerCase();
  if (
    ua.includes('mobile') ||
    ua.includes('android') ||
    ua.includes('iphone') ||
    ua.includes('ipod')
  ) {
    return AUTH_DEVICE_TYPES.MOBILE;
  }
  if (ua.includes('tablet') || ua.includes('ipad')) {
    return AUTH_DEVICE_TYPES.TABLET;
  }
  if (ua.includes('tv') || ua.includes('smarttv') || ua.includes('android tv')) {
    return AUTH_DEVICE_TYPES.TV;
  }
  if (ua.includes('console') || ua.includes('ps4') || ua.includes('ps5') || ua.includes('xbox')) {
    return AUTH_DEVICE_TYPES.CONSOLE;
  }
  if (ua.includes('watch')) {
    return AUTH_DEVICE_TYPES.SMART_WATCH;
  }
  if (ua.includes('laptop') || ua.includes('macbook')) {
    return AUTH_DEVICE_TYPES.LAPTOP;
  }
  return AUTH_DEVICE_TYPES.DESKTOP;
}

export function getAuthDevicePlatformFromUserAgent(userAgent: string): AuthDevicePlatform {
  const ua = userAgent.toLowerCase();
  if (ua.includes('windows')) return AUTH_DEVICE_PLATFORMS.WINDOWS;
  if (ua.includes('mac os') || ua.includes('macos') || ua.includes('darwin')) {
    return AUTH_DEVICE_PLATFORMS.MACOS;
  }
  if (ua.includes('linux') || ua.includes('x11')) return AUTH_DEVICE_PLATFORMS.LINUX;
  if (ua.includes('chrome os') || ua.includes('cros')) return AUTH_DEVICE_PLATFORMS.CHROME_OS;
  if (ua.includes('android')) return AUTH_DEVICE_PLATFORMS.ANDROID;
  if (ua.includes('iphone') || ua.includes('ios') || ua.includes('ipod')) {
    return AUTH_DEVICE_PLATFORMS.IOS;
  }
  if (ua.includes('ipad') || ua.includes('ipados')) return AUTH_DEVICE_PLATFORMS.IPADOS;
  if (ua.includes('watchos')) return AUTH_DEVICE_PLATFORMS.WATCHOS;
  if (ua.includes('tvos') || ua.includes('apple tv')) return AUTH_DEVICE_PLATFORMS.TVOS;
  if (ua.includes('web') || ua.includes('browser')) return AUTH_DEVICE_PLATFORMS.WEB;
  return AUTH_DEVICE_PLATFORMS.OTHER;
}
