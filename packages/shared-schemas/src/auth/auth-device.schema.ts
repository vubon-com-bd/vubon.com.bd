/**
 * Authentication Device Schema
 * Zod schemas for device management, fingerprinting, and trust
 */

import { z } from 'zod';
import {
  AUTH_DEVICE_TYPES,
  AUTH_DEVICE_PLATFORMS,
  AUTH_DEVICE_TRUST_LEVELS,
  AUTH_DEVICE_STATUS,
  AUTH_DEVICE_CONFIG,
  AUTH_DEVICE_STATUS_MESSAGES,
  AUTH_DEVICE_TRUST_LEVEL_DESCRIPTIONS,
  AUTH_DEVICE_TRUST_LEVEL_SCORES,
  AUTH_DEVICE_TYPE_LABELS,
  AUTH_DEVICE_PLATFORM_LABELS,
  AUTH_DEVICE_TYPE_ICONS,
  BLOCKED_AUTH_DEVICE_STATUSES,
  type AuthDeviceType,
  type AuthDevicePlatform,
  type AuthDeviceTrustLevel,
  type AuthDeviceStatus,
} from '@vubon/shared-constants';
import { idSchema, timestampSchema, jsonObjectSchema } from '../common/core-primitives.schema';

// ============================================================
// AUTH DEVICE TYPE SCHEMAS
// ============================================================

/**
 * Auth device type schema
 */
export const authDeviceTypeSchema = z.enum([
  AUTH_DEVICE_TYPES.DESKTOP,
  AUTH_DEVICE_TYPES.LAPTOP,
  AUTH_DEVICE_TYPES.TABLET,
  AUTH_DEVICE_TYPES.MOBILE,
  AUTH_DEVICE_TYPES.TV,
  AUTH_DEVICE_TYPES.CONSOLE,
  AUTH_DEVICE_TYPES.SMART_WATCH,
  AUTH_DEVICE_TYPES.OTHER,
]);

/**
 * Auth device platform schema
 */
export const authDevicePlatformSchema = z.enum([
  AUTH_DEVICE_PLATFORMS.WINDOWS,
  AUTH_DEVICE_PLATFORMS.MACOS,
  AUTH_DEVICE_PLATFORMS.LINUX,
  AUTH_DEVICE_PLATFORMS.CHROME_OS,
  AUTH_DEVICE_PLATFORMS.ANDROID,
  AUTH_DEVICE_PLATFORMS.IOS,
  AUTH_DEVICE_PLATFORMS.IPADOS,
  AUTH_DEVICE_PLATFORMS.WATCHOS,
  AUTH_DEVICE_PLATFORMS.TVOS,
  AUTH_DEVICE_PLATFORMS.WEB,
  AUTH_DEVICE_PLATFORMS.OTHER,
]);

/**
 * Auth device trust level schema
 */
export const authDeviceTrustLevelSchema = z.enum([
  AUTH_DEVICE_TRUST_LEVELS.HIGH,
  AUTH_DEVICE_TRUST_LEVELS.MEDIUM,
  AUTH_DEVICE_TRUST_LEVELS.LOW,
  AUTH_DEVICE_TRUST_LEVELS.UNTRUSTED,
]);

/**
 * Auth device status schema
 */
export const authDeviceStatusSchema = z.enum([
  AUTH_DEVICE_STATUS.ACTIVE,
  AUTH_DEVICE_STATUS.INACTIVE,
  AUTH_DEVICE_STATUS.BLOCKED,
  AUTH_DEVICE_STATUS.SUSPENDED,
  AUTH_DEVICE_STATUS.PENDING,
  AUTH_DEVICE_STATUS.EXPIRED,
]);

// ============================================================
// AUTH DEVICE RECORD SCHEMA
// ============================================================

/**
 * Auth device schema
 */
export const authDeviceSchema = z.object({
  id: idSchema,
  userId: idSchema,
  name: z.string().optional(),
  type: authDeviceTypeSchema,
  platform: authDevicePlatformSchema,
  status: authDeviceStatusSchema,
  trustLevel: authDeviceTrustLevelSchema,
  fingerprint: z.string().min(1),
  lastIPAddress: z.string().ip().optional(),
  lastUserAgent: z.string().optional(),
  lastLocation: z
    .object({
      country: z.string().optional(),
      city: z.string().optional(),
      latitude: z.number().optional(),
      longitude: z.number().optional(),
    })
    .optional(),
  registeredAt: timestampSchema,
  lastUsedAt: timestampSchema,
  trustedAt: timestampSchema.optional(),
  trustExpiresAt: timestampSchema.optional(),
  isVerified: z.boolean().default(false),
  isTrusted: z.boolean().default(false),
  isActive: z.boolean().default(true),
  metadata: jsonObjectSchema.optional(),
});

// ============================================================
// AUTH DEVICE REQUEST SCHEMAS
// ============================================================

/**
 * Auth device register request schema
 */
export const authDeviceRegisterRequestSchema = z.object({
  name: z.string().optional(),
  type: authDeviceTypeSchema,
  platform: authDevicePlatformSchema,
  fingerprint: z.string().min(1),
  ipAddress: z.string().ip(),
  userAgent: z.string().min(1),
  location: z
    .object({
      country: z.string().optional(),
      city: z.string().optional(),
      latitude: z.number().optional(),
      longitude: z.number().optional(),
    })
    .optional(),
  trustDevice: z.boolean().optional(),
  metadata: jsonObjectSchema.optional(),
});

/**
 * Auth device update request schema
 */
export const authDeviceUpdateRequestSchema = z.object({
  name: z.string().optional(),
  type: authDeviceTypeSchema.optional(),
  platform: authDevicePlatformSchema.optional(),
  status: authDeviceStatusSchema.optional(),
  trustLevel: authDeviceTrustLevelSchema.optional(),
  metadata: jsonObjectSchema.optional(),
});

/**
 * Auth device verify request schema
 */
export const authDeviceVerifyRequestSchema = z.object({
  deviceId: idSchema,
  verificationCode: z.string().optional(),
  trustDevice: z.boolean().optional(),
});

// ============================================================
// AUTH DEVICE RESPONSE SCHEMA
// ============================================================

/**
 * Auth device response schema
 */
export const authDeviceResponseSchema = z.object({
  success: z.boolean(),
  device: authDeviceSchema.optional(),
  error: z.string().optional(),
  verificationRequired: z.boolean().optional(),
  verificationCode: z.string().optional(),
});

// ============================================================
// AUTH DEVICE FILTER SCHEMA
// ============================================================

/**
 * Auth device filter schema
 */
export const authDeviceFilterSchema = z.object({
  userId: idSchema.optional(),
  type: z.union([authDeviceTypeSchema, z.array(authDeviceTypeSchema)]).optional(),
  platform: z.union([authDevicePlatformSchema, z.array(authDevicePlatformSchema)]).optional(),
  status: z.union([authDeviceStatusSchema, z.array(authDeviceStatusSchema)]).optional(),
  trustLevel: z.union([authDeviceTrustLevelSchema, z.array(authDeviceTrustLevelSchema)]).optional(),
  verifiedOnly: z.boolean().optional(),
  trustedOnly: z.boolean().optional(),
  activeOnly: z.boolean().optional(),
  registeredDateRange: z
    .object({
      start: z.date().optional(),
      end: z.date().optional(),
    })
    .optional(),
  lastUsedDateRange: z
    .object({
      start: z.date().optional(),
      end: z.date().optional(),
    })
    .optional(),
});

// ============================================================
// AUTH DEVICE SUMMARY SCHEMA
// ============================================================

/**
 * Auth device summary schema
 */
export const authDeviceSummarySchema = z.object({
  userId: idSchema,
  totalDevices: z.number().int().min(0),
  activeDevices: z.number().int().min(0),
  trustedDevices: z.number().int().min(0),
  verifiedDevices: z.number().int().min(0),
  blockedDevices: z.number().int().min(0),
  devicesByType: z.record(authDeviceTypeSchema, z.number().int().min(0)),
  devicesByPlatform: z.record(authDevicePlatformSchema, z.number().int().min(0)),
  devicesByTrustLevel: z.record(authDeviceTrustLevelSchema, z.number().int().min(0)),
  lastUsedDevice: authDeviceSchema.optional(),
  devices: z.array(authDeviceSchema),
});

// ============================================================
// TYPE INFERENCES (Zod থেকে টাইপ বের করা)
// ============================================================

export type AuthDevice = z.infer<typeof authDeviceSchema>;
export type AuthDeviceRegisterRequest = z.infer<typeof authDeviceRegisterRequestSchema>;
export type AuthDeviceUpdateRequest = z.infer<typeof authDeviceUpdateRequestSchema>;
export type AuthDeviceVerifyRequest = z.infer<typeof authDeviceVerifyRequestSchema>;
export type AuthDeviceResponse = z.infer<typeof authDeviceResponseSchema>;
export type AuthDeviceFilter = z.infer<typeof authDeviceFilterSchema>;
export type AuthDeviceSummary = z.infer<typeof authDeviceSummarySchema>;

// ============================================================
// HELPER FUNCTIONS
// ============================================================

/**
 * Check if device type is valid
 */
export function isValidAuthDeviceType(type: string): type is AuthDeviceType {
  return Object.values(AUTH_DEVICE_TYPES).includes(type as AuthDeviceType);
}

/**
 * Check if device platform is valid
 */
export function isValidAuthDevicePlatform(platform: string): platform is AuthDevicePlatform {
  return Object.values(AUTH_DEVICE_PLATFORMS).includes(platform as AuthDevicePlatform);
}

/**
 * Check if device status is valid
 */
export function isValidAuthDeviceStatus(status: string): status is AuthDeviceStatus {
  return Object.values(AUTH_DEVICE_STATUS).includes(status as AuthDeviceStatus);
}

/**
 * Check if device trust level is valid
 */
export function isValidAuthDeviceTrustLevel(level: string): level is AuthDeviceTrustLevel {
  return Object.values(AUTH_DEVICE_TRUST_LEVELS).includes(level as AuthDeviceTrustLevel);
}

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
 * Get device type label
 */
export function getAuthDeviceTypeLabel(type: AuthDeviceType): string {
  return AUTH_DEVICE_TYPE_LABELS[type] || 'Unknown Device';
}

/**
 * Get device platform label
 */
export function getAuthDevicePlatformLabel(platform: AuthDevicePlatform): string {
  return AUTH_DEVICE_PLATFORM_LABELS[platform] || 'Unknown Platform';
}

/**
 * Get device status label
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
 * Get device trust level label
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
 * Get device type icon
 */
export function getAuthDeviceTypeIcon(type: AuthDeviceType): string {
  return AUTH_DEVICE_TYPE_ICONS[type] || 'devices';
}

/**
 * Get device trust level description
 */
export function getAuthDeviceTrustLevelDescription(level: AuthDeviceTrustLevel): string {
  return AUTH_DEVICE_TRUST_LEVEL_DESCRIPTIONS[level] || 'Unknown trust level';
}

/**
 * Get device trust level score
 */
export function getAuthDeviceTrustLevelScore(level: AuthDeviceTrustLevel): number {
  return AUTH_DEVICE_TRUST_LEVEL_SCORES[level] || 0;
}

/**
 * Get device status message
 */
export function getAuthDeviceStatusMessage(status: AuthDeviceStatus): string {
  return AUTH_DEVICE_STATUS_MESSAGES[status] || 'Unknown device status';
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
  sessionDurationDays: number = AUTH_DEVICE_CONFIG.SESSION_DURATION_DAYS,
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
  cleanupDays: number = AUTH_DEVICE_CONFIG.INACTIVE_CLEANUP_DAYS,
  currentDate: Date = new Date()
): boolean {
  const cleanupDate = new Date(lastUsedAt);
  cleanupDate.setDate(cleanupDate.getDate() + cleanupDays);
  return currentDate > cleanupDate;
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

/**
 * Get device platform from user agent
 */
export function getAuthDevicePlatformFromUserAgent(userAgent: string): AuthDevicePlatform {
  const ua = userAgent.toLowerCase();

  if (ua.includes('windows')) return AUTH_DEVICE_PLATFORMS.WINDOWS;
  if (ua.includes('mac os') || ua.includes('macos') || ua.includes('darwin')) {
    return AUTH_DEVICE_PLATFORMS.MACOS;
  }
  if (ua.includes('linux') || ua.includes('x11')) return AUTH_DEVICE_PLATFORMS.LINUX;
  if (ua.includes('chrome os') || ua.includes('cros')) {
    return AUTH_DEVICE_PLATFORMS.CHROME_OS;
  }
  if (ua.includes('android')) return AUTH_DEVICE_PLATFORMS.ANDROID;
  if (ua.includes('iphone') || ua.includes('ios') || ua.includes('ipod')) {
    return AUTH_DEVICE_PLATFORMS.IOS;
  }
  if (ua.includes('ipad') || ua.includes('ipados')) {
    return AUTH_DEVICE_PLATFORMS.IPADOS;
  }
  if (ua.includes('watchos')) return AUTH_DEVICE_PLATFORMS.WATCHOS;
  if (ua.includes('tvos') || ua.includes('apple tv')) {
    return AUTH_DEVICE_PLATFORMS.TVOS;
  }
  if (ua.includes('web') || ua.includes('browser')) {
    return AUTH_DEVICE_PLATFORMS.WEB;
  }

  return AUTH_DEVICE_PLATFORMS.OTHER;
}
