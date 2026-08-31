/**
 * Authentication Device Types
 * Types for device management, fingerprinting, and trust
 */

import type {
  AuthDeviceType,
  AuthDevicePlatform,
  AuthDeviceTrustLevel,
  AuthDeviceStatus,
} from '@vubon/shared-constants';
import {
  AUTH_DEVICE_STATUS,
  AUTH_DEVICE_TRUST_LEVELS,
  BLOCKED_AUTH_DEVICE_STATUSES,
} from '@vubon/shared-constants';
import type { ID, Timestamp } from '../common/core-primitives.types';
import type { AuthIPAddress, AuthUserAgent } from './auth-login-attempt.types';

// ============================================================
// CUSTOM PRIMITIVE TYPES (রফা)
// ============================================================

/**
 * Device fingerprint type
 */
export type AuthDeviceFingerprint = string;

// ============================================================
// DEVICE RECORD
// ============================================================

/**
 * Complete device record
 */
export interface AuthDevice {
  /** Unique identifier */
  id: ID;
  /** User ID who owns the device */
  userId: ID;
  /** Device name (user-provided) */
  name?: string;
  /** Device type */
  type: AuthDeviceType;
  /** Device platform */
  platform: AuthDevicePlatform;
  /** Device status */
  status: AuthDeviceStatus;
  /** Trust level of the device */
  trustLevel: AuthDeviceTrustLevel;
  /** Device fingerprint (unique identifier) */
  fingerprint: AuthDeviceFingerprint;
  /** IP address when last used */
  lastIPAddress?: AuthIPAddress;
  /** User agent when last used */
  lastUserAgent?: AuthUserAgent;
  /** Location when last used */
  lastLocation?: {
    country?: string;
    city?: string;
    latitude?: number;
    longitude?: number;
  };
  /** When the device was first registered */
  registeredAt: Timestamp;
  /** When the device was last used */
  lastUsedAt: Timestamp;
  /** When the device trust was established */
  trustedAt?: Timestamp;
  /** When the device trust expires */
  trustExpiresAt?: Timestamp;
  /** Whether the device is verified */
  isVerified: boolean;
  /** Whether the device is trusted */
  isTrusted: boolean;
  /** Whether the device is active */
  isActive: boolean;
  /** Additional metadata */
  metadata?: Record<string, unknown>;
}

// ============================================================
// DEVICE REQUEST
// ============================================================

/**
 * Request to register a new device
 */
export interface AuthDeviceRegisterRequest {
  /** Device name (user-provided) */
  name?: string;
  /** Device type */
  type: AuthDeviceType;
  /** Device platform */
  platform: AuthDevicePlatform;
  /** Device fingerprint */
  fingerprint: AuthDeviceFingerprint;
  /** IP address of the request */
  ipAddress: AuthIPAddress;
  /** User agent of the request */
  userAgent: AuthUserAgent;
  /** Location information */
  location?: {
    country?: string;
    city?: string;
    latitude?: number;
    longitude?: number;
  };
  /** Whether to trust the device */
  trustDevice?: boolean;
  /** Additional metadata */
  metadata?: Record<string, unknown>;
}

/**
 * Request to update a device
 */
export interface AuthDeviceUpdateRequest {
  /** Device name */
  name?: string;
  /** Device type */
  type?: AuthDeviceType;
  /** Device platform */
  platform?: AuthDevicePlatform;
  /** Device status */
  status?: AuthDeviceStatus;
  /** Trust level */
  trustLevel?: AuthDeviceTrustLevel;
  /** Additional metadata */
  metadata?: Record<string, unknown>;
}

/**
 * Request to verify a device
 */
export interface AuthDeviceVerifyRequest {
  /** Device ID */
  deviceId: ID;
  /** Verification code */
  verificationCode?: string;
  /** Whether to trust the device */
  trustDevice?: boolean;
}

// ============================================================
// DEVICE RESPONSE
// ============================================================

/**
 * Response for device operations
 */
export interface AuthDeviceResponse {
  /** Whether the operation was successful */
  success: boolean;
  /** Device record if successful */
  device?: AuthDevice;
  /** Error message if failed */
  error?: string;
  /** Whether verification is required */
  verificationRequired?: boolean;
  /** Verification code (if applicable) */
  verificationCode?: string;
}

// ============================================================
// DEVICE FILTER
// ============================================================

/**
 * Filter for querying devices
 */
export interface AuthDeviceFilter {
  /** Filter by user ID */
  userId?: ID;
  /** Filter by device type */
  type?: AuthDeviceType | AuthDeviceType[];
  /** Filter by platform */
  platform?: AuthDevicePlatform | AuthDevicePlatform[];
  /** Filter by status */
  status?: AuthDeviceStatus | AuthDeviceStatus[];
  /** Filter by trust level */
  trustLevel?: AuthDeviceTrustLevel | AuthDeviceTrustLevel[];
  /** Filter by verification status */
  verifiedOnly?: boolean;
  /** Filter by trust status */
  trustedOnly?: boolean;
  /** Filter by active status */
  activeOnly?: boolean;
  /** Filter by date range (registration) */
  registeredDateRange?: {
    start?: Date;
    end?: Date;
  };
  /** Filter by date range (last used) */
  lastUsedDateRange?: {
    start?: Date;
    end?: Date;
  };
}

// ============================================================
// DEVICE SUMMARY
// ============================================================

/**
 * Summary of devices for a user
 */
export interface AuthDeviceSummary {
  /** User ID */
  userId: ID;
  /** Total number of devices */
  totalDevices: number;
  /** Number of active devices */
  activeDevices: number;
  /** Number of trusted devices */
  trustedDevices: number;
  /** Number of verified devices */
  verifiedDevices: number;
  /** Number of blocked devices */
  blockedDevices: number;
  /** Devices by type */
  devicesByType: Record<AuthDeviceType, number>;
  /** Devices by platform */
  devicesByPlatform: Record<AuthDevicePlatform, number>;
  /** Devices by trust level */
  devicesByTrustLevel: Record<AuthDeviceTrustLevel, number>;
  /** Most recently used device */
  lastUsedDevice?: AuthDevice;
  /** All devices (limited) */
  devices: AuthDevice[];
}

// ============================================================
// HELPER FUNCTIONS
// ============================================================

/**
 * Check if device is active
 */
export function isAuthDeviceActive(status: AuthDeviceStatus): boolean {
  return status === AUTH_DEVICE_STATUS.ACTIVE;
}

/**
 * Check if device is blocked
 */
export function isAuthDeviceBlocked(status: AuthDeviceStatus): boolean {
  return BLOCKED_AUTH_DEVICE_STATUSES.includes(status);
}

/**
 * Check if device is allowed (not blocked or suspended)
 */
export function isAuthDeviceAllowed(status: AuthDeviceStatus): boolean {
  return !isAuthDeviceBlocked(status);
}

/**
 * Check if device needs verification
 */
export function doesAuthDeviceNeedVerification(status: AuthDeviceStatus): boolean {
  return status === AUTH_DEVICE_STATUS.PENDING;
}

/**
 * Check if device is trusted
 */
export function isAuthDeviceTrusted(trustLevel: AuthDeviceTrustLevel): boolean {
  return (
    trustLevel === AUTH_DEVICE_TRUST_LEVELS.HIGH || trustLevel === AUTH_DEVICE_TRUST_LEVELS.MEDIUM
  );
}

/**
 * Check if device is highly trusted
 */
export function isAuthDeviceHighlyTrusted(trustLevel: AuthDeviceTrustLevel): boolean {
  return trustLevel === AUTH_DEVICE_TRUST_LEVELS.HIGH;
}

/**
 * Check if device trust has expired
 */
export function isAuthDeviceTrustExpired(
  trustedAt: Date | undefined,
  trustExpiresAt: Date | undefined,
  currentDate: Date = new Date()
): boolean {
  if (!trustedAt || !trustExpiresAt) {
    return true;
  }
  return currentDate > trustExpiresAt;
}

/**
 * Check if device session has expired
 */
export function isAuthDeviceSessionExpired(
  lastUsedAt: Date,
  sessionDurationDays: number = 7,
  currentDate: Date = new Date()
): boolean {
  const sessionExpiry = new Date(lastUsedAt);
  sessionExpiry.setDate(sessionExpiry.getDate() + sessionDurationDays);
  return currentDate > sessionExpiry;
}

/**
 * Check if device is inactive for cleanup
 */
export function isAuthDeviceInactiveForCleanup(
  lastUsedAt: Date,
  cleanupDays: number = 30,
  currentDate: Date = new Date()
): boolean {
  const cleanupDate = new Date(lastUsedAt);
  cleanupDate.setDate(cleanupDate.getDate() + cleanupDays);
  return currentDate > cleanupDate;
}

/**
 * Get human-readable label for device type
 */
export function getAuthDeviceTypeLabel(type: AuthDeviceType): string {
  const labels: Record<AuthDeviceType, string> = {
    desktop: 'Desktop Computer',
    laptop: 'Laptop',
    tablet: 'Tablet',
    mobile: 'Mobile Phone',
    tv: 'Smart TV',
    console: 'Gaming Console',
    smart_watch: 'Smart Watch',
    other: 'Other Device',
  };
  return labels[type] || 'Unknown Device';
}

/**
 * Get human-readable label for device platform
 */
export function getAuthDevicePlatformLabel(platform: AuthDevicePlatform): string {
  const labels: Record<AuthDevicePlatform, string> = {
    windows: 'Windows',
    macos: 'macOS',
    linux: 'Linux',
    chrome_os: 'Chrome OS',
    android: 'Android',
    ios: 'iOS',
    ipados: 'iPadOS',
    watchos: 'watchOS',
    tvos: 'tvOS',
    web: 'Web Browser',
    other: 'Other Platform',
  };
  return labels[platform] || 'Unknown Platform';
}

/**
 * Get human-readable label for device status
 */
export function getAuthDeviceStatusLabel(status: AuthDeviceStatus): string {
  const labels: Record<AuthDeviceStatus, string> = {
    active: 'Active',
    inactive: 'Inactive',
    blocked: 'Blocked',
    suspended: 'Suspended',
    pending: 'Pending Verification',
    expired: 'Expired',
  };
  return labels[status] || 'Unknown Status';
}

/**
 * Get human-readable label for trust level
 */
export function getAuthDeviceTrustLevelLabel(level: AuthDeviceTrustLevel): string {
  const labels: Record<AuthDeviceTrustLevel, string> = {
    high: 'High Trust',
    medium: 'Medium Trust',
    low: 'Low Trust',
    untrusted: 'Untrusted',
  };
  return labels[level] || 'Unknown Trust Level';
}

/**
 * Get trust level score
 */
export function getAuthDeviceTrustLevelScore(level: AuthDeviceTrustLevel): number {
  const scores: Record<AuthDeviceTrustLevel, number> = {
    high: 100,
    medium: 75,
    low: 25,
    untrusted: 0,
  };
  return scores[level] || 0;
}

/**
 * Get device type from user agent
 */
export function getAuthDeviceTypeFromUserAgent(userAgent: string): AuthDeviceType {
  const ua = userAgent.toLowerCase();

  if (
    ua.includes('mobile') ||
    ua.includes('android') ||
    ua.includes('iphone') ||
    ua.includes('ipod')
  ) {
    return 'mobile';
  }
  if (ua.includes('tablet') || ua.includes('ipad')) {
    return 'tablet';
  }
  if (ua.includes('tv') || ua.includes('smarttv') || ua.includes('android tv')) {
    return 'tv';
  }
  if (ua.includes('console') || ua.includes('ps4') || ua.includes('ps5') || ua.includes('xbox')) {
    return 'console';
  }
  if (ua.includes('watch')) {
    return 'smart_watch';
  }
  if (ua.includes('laptop') || ua.includes('macbook')) {
    return 'laptop';
  }

  return 'desktop';
}

/**
 * Get device platform from user agent
 */
export function getAuthDevicePlatformFromUserAgent(userAgent: string): AuthDevicePlatform {
  const ua = userAgent.toLowerCase();

  if (ua.includes('windows')) return 'windows';
  if (ua.includes('mac os') || ua.includes('macos') || ua.includes('darwin')) {
    return 'macos';
  }
  if (ua.includes('linux') || ua.includes('x11')) return 'linux';
  if (ua.includes('chrome os') || ua.includes('cros')) return 'chrome_os';
  if (ua.includes('android')) return 'android';
  if (ua.includes('iphone') || ua.includes('ios') || ua.includes('ipod')) {
    return 'ios';
  }
  if (ua.includes('ipad') || ua.includes('ipados')) return 'ipados';
  if (ua.includes('watchos')) return 'watchos';
  if (ua.includes('tvos') || ua.includes('apple tv')) return 'tvos';
  if (ua.includes('web') || ua.includes('browser')) return 'web';

  return 'other';
}
