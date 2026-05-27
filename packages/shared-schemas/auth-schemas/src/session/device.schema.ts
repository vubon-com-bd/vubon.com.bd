/**
 * Device Schemas - Pure validation for device management
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module shared-schemas/auth-schemas/src/session/device.schema
 * 
 * RULES:
 * ✅ ONLY Zod schemas - NO business logic
 * ✅ NO fingerprint generation, browser detection, IP geo lookup
 * ✅ NO side effects, NO async
 * ✅ Reusable primitives from constants
 * ✅ Strict mode enabled
 * ✅ Type exports with z.infer
 */

import { z } from 'zod';

// Import constants from shared-constants layer (Enterprise rule)
import {
  DEVICE_TYPES,
  OS_TYPES,
  BROWSER_TYPES,
  DEVICE_RISK_LEVEL,
  DEVICE_TRUST_DURATION,
  DEVICE_FINGERPRINT_HEADERS,
  NETWORK_TYPES,
} from '@vubon/auth-constants';

// ==================== Primitives (Reusable) ====================

// Device ID Schema
export const DeviceIdSchema = z
  .string()
  .min(1, 'Device ID is required')
  .max(255, 'Device ID too long')
  .brand('DeviceId');

// Device Type Schema (Based on constants)
export const DeviceTypeSchema = z.enum([
  DEVICE_TYPES.DESKTOP,
  DEVICE_TYPES.LAPTOP,
  DEVICE_TYPES.TABLET,
  DEVICE_TYPES.MOBILE,
  DEVICE_TYPES.TV,
  DEVICE_TYPES.CONSOLE,
  DEVICE_TYPES.WEARABLE,
  DEVICE_TYPES.OTHER,
  // Bangladesh specific
  'feature_phone',
  'tablet_phone',
  'kiosk',
  'pos_device',
]);

// Operating System Schema (Based on constants)
export const OSTypeSchema = z.enum([
  OS_TYPES.WINDOWS,
  OS_TYPES.MACOS,
  OS_TYPES.LINUX,
  OS_TYPES.IOS,
  OS_TYPES.ANDROID,
  OS_TYPES.CHROME_OS,
  OS_TYPES.OTHER,
  // Bangladesh specific
  'symphony_os',
  'walton_os',
  'kai_os',
]);

// Browser Type Schema (Based on constants)
export const BrowserTypeSchema = z.enum([
  BROWSER_TYPES.CHROME,
  BROWSER_TYPES.FIREFOX,
  BROWSER_TYPES.SAFARI,
  BROWSER_TYPES.EDGE,
  BROWSER_TYPES.OPERA,
  BROWSER_TYPES.SAMSUNG,
  BROWSER_TYPES.OTHER,
  // Bangladesh specific
  'uc_browser',
  'opera_mini',
  'bd_browser',
]);

// Device Trust Level Schema (Based on constants)
export const DeviceTrustLevelSchema = z.enum([
  DEVICE_RISK_LEVEL.TRUSTED,
  DEVICE_RISK_LEVEL.NEUTRAL,
  DEVICE_RISK_LEVEL.SUSPICIOUS,
  DEVICE_RISK_LEVEL.HIGH_RISK,
  DEVICE_RISK_LEVEL.BLOCKED,
]);

// Network Type Schema (Bangladesh specific)
export const NetworkTypeSchema = z.enum([
  NETWORK_TYPES.MOBILE_2G,
  NETWORK_TYPES.MOBILE_3G,
  NETWORK_TYPES.MOBILE_4G,
  NETWORK_TYPES.MOBILE_5G,
  NETWORK_TYPES.WIFI,
  NETWORK_TYPES.WIFI_PUBLIC,
  NETWORK_TYPES.ETHERNET,
  NETWORK_TYPES.VPN,
  NETWORK_TYPES.PROXY,
  NETWORK_TYPES.TOR,
  NETWORK_TYPES.UNKNOWN,
]);

// Mobile Operator Schema (Bangladesh specific)
export const MobileOperatorSchema = z.enum([
  'gp',
  'robi',
  'banglalink',
  'teletalk',
  'unknown',
]);

// ==================== Domain Schemas ====================

// Device Info Schema (Complete device information)
export const DeviceInfoSchema = z
  .object({
    deviceId: DeviceIdSchema,
    deviceType: DeviceTypeSchema,
    os: OSTypeSchema,
    osVersion: z.string().max(50).optional(),
    browser: BrowserTypeSchema,
    browserVersion: z.string().max(50).optional(),
    isMobile: z.boolean(),
    isTouchDevice: z.boolean(),
    screenResolution: z.string().regex(/^\d+x\d+$/, 'Invalid screen resolution format (e.g., 1920x1080)').optional(),
    screenWidth: z.number().int().min(0).optional(),
    screenHeight: z.number().int().min(0).optional(),
    colorDepth: z.number().int().min(0).optional(),
    language: z.string().min(2, 'Language code required').max(10, 'Language code too long'),
    timezone: z.string().min(1, 'Timezone required'),
    timezoneOffset: z.number().int().min(-720).max(840).optional(),
    // Bangladesh specific
    networkType: NetworkTypeSchema.optional(),
    mobileOperator: MobileOperatorSchema.optional(),
    dataSaverEnabled: z.boolean().optional(),
    district: z.string().optional(),
    upazila: z.string().optional(),
  })
  .strict()
  .brand('DeviceInfo');

// Device Fingerprint Schema (Hashed, not raw data)
export const DeviceFingerprintSchema = z
  .object({
    hash: z.string().min(32, 'Invalid fingerprint hash').max(128),
    components: z.array(z.string()).min(1, 'At least one fingerprint component required'),
    componentVersions: z.record(z.string()).optional(),
    generatedAt: z.date(),
    version: z.number().int().min(1).default(1),
  })
  .strict()
  .brand('DeviceFingerprint');

// Trusted Device Entity Schema
export const TrustedDeviceSchema = z
  .object({
    id: z.string().uuid(),
    userId: z.string().uuid(),
    deviceId: DeviceIdSchema,
    deviceInfo: DeviceInfoSchema,
    fingerprint: DeviceFingerprintSchema.optional(),
    trustLevel: DeviceTrustLevelSchema,
    trustScore: z.number().int().min(0).max(100).default(0),
    trustedAt: z.date(),
    lastUsedAt: z.date(),
    expiresAt: z.date().nullable(),
    name: z.string().max(100, 'Device name too long').nullable(),
    familyShared: z.boolean().default(false),
    familyMemberId: z.string().uuid().optional(),
  })
  .strict()
  .brand('TrustedDevice');

// Device Risk Assessment Schema
export const DeviceRiskAssessmentSchema = z
  .object({
    deviceId: DeviceIdSchema,
    userId: z.string().uuid(),
    riskScore: z.number().int().min(0).max(100),
    riskLevel: z.enum(['low', 'medium', 'high', 'critical']),
    factors: z.array(
      z.object({
        factor: z.string(),
        score: z.number().int(),
        weight: z.number().min(0).max(1),
        reason: z.string(),
        evidence: z.string().optional(),
      })
    ),
    requiresMFA: z.boolean(),
    requiresAdditionalVerification: z.boolean(),
    recommendedTrustLevel: DeviceTrustLevelSchema,
    assessedAt: z.date(),
  })
  .strict()
  .brand('DeviceRiskAssessment');

// Device Activity Schema
export const DeviceActivitySchema = z
  .object({
    id: z.string().uuid(),
    deviceId: DeviceIdSchema,
    userId: z.string().uuid(),
    activityType: z.enum([
      'login',
      'logout',
      'token_refresh',
      'mfa_verified',
      'trust_granted',
      'trust_revoked',
      'trust_escalated',
      'trust_deescalated',
      'device_removed',
      'device_name_changed',
      'device_fingerprint_changed',
      'suspicious_activity_detected',
    ]),
    timestamp: z.date(),
    ipAddress: z.string().ip(),
    userAgent: z.string().optional(),
    location: z
      .object({
        country: z.string().optional(),
        city: z.string().optional(),
        district: z.string().optional(),
        upazila: z.string().optional(),
        latitude: z.number().optional(),
        longitude: z.number().optional(),
      })
      .optional(),
    metadata: z.record(z.unknown()).optional(),
  })
  .strict()
  .brand('DeviceActivity');

// ==================== Request Schemas ====================

// Register Device Request
export const RegisterDeviceSchema = z
  .object({
    userId: z.string().uuid('Invalid user ID'),
    deviceInfo: DeviceInfoSchema,
    fingerprint: DeviceFingerprintSchema.optional(),
    name: z.string().max(100, 'Device name too long').optional(),
    trustDevice: z.boolean().default(false),
    trustDurationDays: z.number().int().min(1).max(365).optional(),
    isFamilyShared: z.boolean().default(false),
    familyMemberId: z.string().uuid().optional(),
  })
  .strict()
  .brand('RegisterDeviceRequest');

// Update Device Trust Request
export const UpdateDeviceTrustSchema = z
  .object({
    deviceId: DeviceIdSchema,
    userId: z.string().uuid('Invalid user ID'),
    trustLevel: DeviceTrustLevelSchema,
    durationDays: z.number().int().min(1).max(365).optional(),
    reason: z.string().max(500).optional(),
    adminId: z.string().uuid().optional(),
  })
  .strict()
  .brand('UpdateDeviceTrustRequest');

// Remove Device Request
export const RemoveDeviceSchema = z
  .object({
    deviceId: DeviceIdSchema,
    userId: z.string().uuid('Invalid user ID'),
    reason: z.string().max(500).optional(),
    revokeTrustOnly: z.boolean().default(false),
  })
  .strict()
  .brand('RemoveDeviceRequest');

// Device Session Transfer Request (Bangladesh specific)
export const DeviceSessionTransferSchema = z
  .object({
    fromSessionId: z.string().uuid('Invalid session ID'),
    toDeviceInfo: DeviceInfoSchema,
    transferMethod: z.enum(['qr_code', 'magic_link', 'otp']),
    transferCode: z.string().optional(),
    userId: z.string().uuid('Invalid user ID'),
  })
  .strict()
  .brand('DeviceSessionTransferRequest');

// Device Pairing Request (Family sharing - Bangladesh specific)
export const DevicePairingSchema = z
  .object({
    ownerUserId: z.string().uuid('Invalid owner user ID'),
    pairedDeviceId: DeviceIdSchema,
    pairedUserId: z.string().uuid('Invalid paired user ID'),
    relationship: z.enum(['parent', 'child', 'spouse', 'sibling', 'other']),
    permissions: z.array(
      z.enum([
        'view_orders',
        'track_orders',
        'add_to_cart',
        'wishlist',
        'view_addresses',
        'limited_payment',
        'full_payment',
      ])
    ),
    expiresAt: z.date().optional(),
  })
  .strict()
  .brand('DevicePairingRequest');

// Device Filter Schema (For listing devices)
export const DeviceFilterSchema = z
  .object({
    userId: z.string().uuid().optional(),
    trustLevel: DeviceTrustLevelSchema.optional(),
    deviceType: DeviceTypeSchema.optional(),
    isActive: z.boolean().optional(),
    isFamilyShared: z.boolean().optional(),
    fromDate: z.date().optional(),
    toDate: z.date().optional(),
    page: z.number().int().positive().default(1),
    limit: z.number().int().min(1).max(100).default(20),
    sortBy: z.enum(['trustedAt', 'lastUsedAt', 'trustLevel']).default('lastUsedAt'),
    sortOrder: z.enum(['asc', 'desc']).default('desc'),
  })
  .strict()
  .brand('DeviceFilterRequest');

// ==================== Response Schemas ====================

// Device Response Schema
export const DeviceResponseSchema = z
  .object({
    id: z.string().uuid(),
    deviceId: DeviceIdSchema,
    deviceInfo: DeviceInfoSchema,
    trustLevel: DeviceTrustLevelSchema,
    trustLevelName: z.string(),
    trustScore: z.number().int(),
    trustedAt: z.date(),
    lastUsedAt: z.date(),
    expiresAt: z.date().nullable(),
    name: z.string().nullable(),
    isCurrent: z.boolean(),
    isFamilyShared: z.boolean(),
    deviceName: z.string().nullable(),
  })
  .strict()
  .brand('DeviceResponse');

// Device List Response Schema (Paginated)
export const DeviceListResponseSchema = z
  .object({
    devices: z.array(DeviceResponseSchema),
    total: z.number().int().min(0),
    page: z.number().int().positive(),
    limit: z.number().int().min(1).max(100),
    totalPages: z.number().int().min(0),
  })
  .strict()
  .brand('DeviceListResponse');

// Device Session Transfer Response
export const DeviceSessionTransferResponseSchema = z
  .object({
    transferId: z.string().uuid(),
    transferMethod: z.enum(['qr_code', 'magic_link', 'otp']),
    qrCodeUrl: z.string().url().optional(),
    magicLink: z.string().url().optional(),
    otpSent: z.boolean().optional(),
    expiresAt: z.date(),
    status: z.enum(['pending', 'completed', 'expired']),
  })
  .strict()
  .brand('DeviceSessionTransferResponse');

// Device Pairing Response
export const DevicePairingResponseSchema = z
  .object({
    pairingId: z.string().uuid(),
    ownerUserId: z.string().uuid(),
    pairedDeviceId: DeviceIdSchema,
    pairedUserId: z.string().uuid(),
    relationship: z.string(),
    permissions: z.array(z.string()),
    pairedAt: z.date(),
    expiresAt: z.date().nullable(),
    status: z.enum(['active', 'revoked', 'expired']),
  })
  .strict()
  .brand('DevicePairingResponse');

// Device Statistics Response (For admin dashboard)
export const DeviceStatisticsResponseSchema = z
  .object({
    totalDevices: z.number().int(),
    uniqueUsers: z.number().int(),
    trustedDevices: z.number().int(),
    untrustedDevices: z.number().int(),
    suspendedDevices: z.number().int(),
    familySharedDevices: z.number().int(),
    averageTrustScore: z.number().min(0).max(100),
    devicesByType: z.array(
      z.object({
        type: DeviceTypeSchema,
        count: z.number().int(),
        percentage: z.number().min(0).max(100),
      })
    ),
    devicesByOS: z.array(
      z.object({
        os: OSTypeSchema,
        count: z.number().int(),
        percentage: z.number().min(0).max(100),
      })
    ),
    devicesByBrowser: z.array(
      z.object({
        browser: BrowserTypeSchema,
        count: z.number().int(),
        percentage: z.number().min(0).max(100),
      })
    ),
    // Bangladesh specific
    devicesByNetworkType: z.array(
      z.object({
        network: NetworkTypeSchema,
        count: z.number().int(),
      })
    ),
    devicesByMobileOperator: z.array(
      z.object({
        operator: MobileOperatorSchema,
        count: z.number().int(),
      })
    ),
    devicesByDistrict: z.array(
      z.object({
        district: z.string(),
        count: z.number().int(),
      })
    ),
    suspiciousDevices: z.number().int(),
    highRiskDevices: z.number().int(),
  })
  .strict()
  .brand('DeviceStatisticsResponse');

// ==================== Error Schemas ====================

export const DeviceErrorSchema = z
  .object({
    error: z.string(),
    errorCode: z.enum([
      'device_not_found',
      'device_already_registered',
      'device_blocked',
      'device_suspended',
      'invalid_fingerprint',
      'trust_level_invalid',
      'max_devices_exceeded',
      'device_already_paired',
      'pairing_not_found',
      'insufficient_permissions',
      'transfer_not_found',
      'transfer_expired',
    ]),
    field: z.string().optional(),
  })
  .strict()
  .brand('DeviceError');

// ==================== Type Exports ====================

export type DeviceId = z.infer<typeof DeviceIdSchema>;
export type DeviceType = z.infer<typeof DeviceTypeSchema>;
export type OSType = z.infer<typeof OSTypeSchema>;
export type BrowserType = z.infer<typeof BrowserTypeSchema>;
export type DeviceTrustLevel = z.infer<typeof DeviceTrustLevelSchema>;
export type NetworkType = z.infer<typeof NetworkTypeSchema>;
export type MobileOperator = z.infer<typeof MobileOperatorSchema>;

export type DeviceInfo = z.infer<typeof DeviceInfoSchema>;
export type DeviceFingerprint = z.infer<typeof DeviceFingerprintSchema>;
export type TrustedDevice = z.infer<typeof TrustedDeviceSchema>;
export type DeviceRiskAssessment = z.infer<typeof DeviceRiskAssessmentSchema>;
export type DeviceActivity = z.infer<typeof DeviceActivitySchema>;

export type RegisterDeviceRequest = z.infer<typeof RegisterDeviceSchema>;
export type UpdateDeviceTrustRequest = z.infer<typeof UpdateDeviceTrustSchema>;
export type RemoveDeviceRequest = z.infer<typeof RemoveDeviceSchema>;
export type DeviceSessionTransferRequest = z.infer<typeof DeviceSessionTransferSchema>;
export type DevicePairingRequest = z.infer<typeof DevicePairingSchema>;
export type DeviceFilterRequest = z.infer<typeof DeviceFilterSchema>;

export type DeviceResponse = z.infer<typeof DeviceResponseSchema>;
export type DeviceListResponse = z.infer<typeof DeviceListResponseSchema>;
export type DeviceSessionTransferResponse = z.infer<typeof DeviceSessionTransferResponseSchema>;
export type DevicePairingResponse = z.infer<typeof DevicePairingResponseSchema>;
export type DeviceStatisticsResponse = z.infer<typeof DeviceStatisticsResponseSchema>;
export type DeviceError = z.infer<typeof DeviceErrorSchema>;
