/**
 * Authentication Device Types Module
 * Device management types for authentication system
 * Handles device tracking, fingerprinting, trust management, and device analytics
 */

import { authentication } from '@vubon/shared-constants';
import { UserId, Timestamp, IPAddress } from './core-primitives.types';

// Import device constants from shared-constants
const {
  DEVICE_TYPE,
  DEVICE_STATUS,
  DEVICE_MAX_PER_USER,
  DEVICE_SESSION_TIMEOUT,
  DEVICE_TRUST_DURATION,
  DEVICE_UNKNOWN_ALLOWED,
  DEVICE_NOTIFICATION_ON_NEW,
  DEVICE_CONFIG,
} = authentication;

/**
 * Device Type
 * Types of devices (re-exported from shared-constants)
 */
export type DeviceType = (typeof DEVICE_TYPE)[keyof typeof DEVICE_TYPE];

/**
 * Device Status
 * Status of a device (re-exported from shared-constants)
 */
export type DeviceStatus = (typeof DEVICE_STATUS)[keyof typeof DEVICE_STATUS];

/**
 * Device OS
 * Operating system of device
 */
export type DeviceOS =
  | 'windows'
  | 'macos'
  | 'linux'
  | 'ios'
  | 'android'
  | 'chromeos'
  | 'ubuntu'
  | 'debian'
  | 'fedora'
  | 'other';

/**
 * Device Browser
 * Browser of device
 */
export type DeviceBrowser =
  'chrome' | 'firefox' | 'safari' | 'edge' | 'opera' | 'brave' | 'vivaldi' | 'other';

/**
 * Device Trust Level
 * Trust level of a device
 */
export type DeviceTrustLevel = 'untrusted' | 'low' | 'medium' | 'high' | 'verified' | 'certified';

/**
 * Device
 * Device information
 */
export interface Device {
  id: string;
  userId: UserId;
  deviceId: string;
  deviceName: string;
  deviceType: DeviceType;
  manufacturer?: string;
  model?: string;
  os: DeviceOS;
  osVersion?: string;
  browser: DeviceBrowser;
  browserVersion?: string;
  isMobile: boolean;
  isDesktop: boolean;
  isTablet: boolean;
  screenSize?: string;
  screenResolution?: string;
  pixelRatio?: number;
  language?: string;
  timezone?: string;
  ipAddress?: IPAddress;
  location?: string;
  lastSeenAt: Timestamp;
  firstSeenAt: Timestamp;
  registeredAt: Timestamp;
  trustLevel: DeviceTrustLevel;
  status: DeviceStatus;
  isVerified: boolean;
  verifiedAt?: Timestamp;
  isTrusted: boolean;
  trustedAt?: Timestamp;
  metadata?: Record<string, unknown>;
}

/**
 * Device Registration Request
 * Request to register a device
 */
export interface DeviceRegistrationRequest {
  userId: UserId;
  deviceId: string;
  deviceName: string;
  deviceType: DeviceType;
  manufacturer?: string;
  model?: string;
  os: DeviceOS;
  osVersion?: string;
  browser: DeviceBrowser;
  browserVersion?: string;
  screenSize?: string;
  screenResolution?: string;
  pixelRatio?: number;
  language?: string;
  timezone?: string;
  ipAddress?: IPAddress;
  location?: string;
  metadata?: Record<string, unknown>;
}

/**
 * Device Registration Response
 * Response after device registration
 */
export interface DeviceRegistrationResponse {
  success: boolean;
  data?: {
    deviceId: string;
    userId: UserId;
    status: DeviceStatus;
    trustLevel: DeviceTrustLevel;
    registeredAt: Timestamp;
    isFirstDevice: boolean;
    requiresVerification: boolean;
    verificationToken?: string;
    message: string;
  };
  error?: string;
  timestamp: Timestamp;
}

/**
 * Device Verification Request
 * Request to verify a device
 */
export interface DeviceVerificationRequest {
  userId: UserId;
  deviceId: string;
  verificationCode: string;
  method: 'email' | 'sms' | 'push' | 'qrcode';
  metadata?: Record<string, unknown>;
}

/**
 * Device Verification Response
 * Response after device verification
 */
export interface DeviceVerificationResponse {
  success: boolean;
  data?: {
    verified: boolean;
    deviceId: string;
    verifiedAt: Timestamp;
    trustLevel: DeviceTrustLevel;
    isTrusted: boolean;
    message: string;
  };
  error?: string;
  timestamp: Timestamp;
}

/**
 * Device Trust Request
 * Request to trust a device
 */
export interface DeviceTrustRequest {
  userId: UserId;
  deviceId: string;
  trustLevel: DeviceTrustLevel;
  duration?: number;
  reason: string;
  adminId?: UserId;
  metadata?: Record<string, unknown>;
}

/**
 * Device Trust Response
 * Response after device trust update
 */
export interface DeviceTrustResponse {
  success: boolean;
  data?: {
    deviceId: string;
    trustLevel: DeviceTrustLevel;
    updatedAt: Timestamp;
    isTrusted: boolean;
    expiresAt?: Timestamp;
    message: string;
  };
  error?: string;
  timestamp: Timestamp;
}

/**
 * Device Update Request
 * Request to update device information
 */
export interface DeviceUpdateRequest {
  userId: UserId;
  deviceId: string;
  deviceName?: string;
  os?: DeviceOS;
  osVersion?: string;
  browser?: DeviceBrowser;
  browserVersion?: string;
  ipAddress?: IPAddress;
  location?: string;
  metadata?: Record<string, unknown>;
}

/**
 * Device Update Response
 * Response after device update
 */
export interface DeviceUpdateResponse {
  success: boolean;
  data?: {
    deviceId: string;
    updated: boolean;
    updatedAt: Timestamp;
    updatedFields: string[];
    message: string;
  };
  error?: string;
  timestamp: Timestamp;
}

/**
 * Device Removal Request
 * Request to remove a device
 */
export interface DeviceRemovalRequest {
  userId: UserId;
  deviceId: string;
  reason: string;
  adminId?: UserId;
  revokeTokens?: boolean;
  invalidateSessions?: boolean;
}

/**
 * Device Removal Response
 * Response after device removal
 */
export interface DeviceRemovalResponse {
  success: boolean;
  data?: {
    removed: boolean;
    deviceId: string;
    removedAt: Timestamp;
    sessionsInvalidated: number;
    tokensRevoked: boolean;
    message: string;
  };
  error?: string;
  timestamp: Timestamp;
}

/**
 * Device Fingerprint
 * Device fingerprint information
 */
export interface DeviceFingerprint {
  deviceId: string;
  userId: UserId;
  fingerprint: string;
  components: {
    userAgent: string;
    screenResolution: string;
    timezone: string;
    language: string;
    platform: string;
    canvasHash?: string;
    webglHash?: string;
    audioHash?: string;
    fonts?: string[];
    plugins?: string[];
  };
  generatedAt: Timestamp;
  expiresAt?: Timestamp;
  metadata?: Record<string, unknown>;
}

/**
 * Device Session Info
 * Device session information (renamed to avoid conflict)
 */
export interface DeviceSessionInfo {
  id: string;
  userId: UserId;
  deviceId: string;
  sessionId: string;
  startedAt: Timestamp;
  endedAt?: Timestamp;
  duration: number;
  ipAddress?: IPAddress;
  location?: string;
  metadata?: Record<string, unknown>;
}

/**
 * Device Analytics
 * Analytics data for devices
 */
export interface DeviceAnalytics {
  period: string;
  totalDevices: number;
  uniqueUsers: number;
  byType: Record<DeviceType, number>;
  byOS: Record<DeviceOS, number>;
  byBrowser: Record<DeviceBrowser, number>;
  byTrustLevel: Record<DeviceTrustLevel, number>;
  byStatus: Record<DeviceStatus, number>;
  activeDevices: number;
  inactiveDevices: number;
  trustedDevices: number;
  untrustedDevices: number;
  averageSessionsPerDevice: number;
  averageSessionDuration: number;
  timestamp: Timestamp;
}

/**
 * Device Filter
 * Filter criteria for device queries
 */
export interface DeviceFilter {
  userId?: UserId[];
  deviceType?: DeviceType[];
  os?: DeviceOS[];
  browser?: DeviceBrowser[];
  status?: DeviceStatus[];
  trustLevel?: DeviceTrustLevel[];
  isTrusted?: boolean;
  isVerified?: boolean;
  dateRange?: {
    start: Timestamp;
    end: Timestamp;
  };
  ipAddress?: IPAddress[];
  location?: string[];
}

/**
 * Device Response Builder
 * Helper for building device responses
 */
export interface DeviceResponseBuilder {
  registerSuccess(response: DeviceRegistrationResponse): DeviceRegistrationResponse;
  verifySuccess(response: DeviceVerificationResponse): DeviceVerificationResponse;
  trustSuccess(response: DeviceTrustResponse): DeviceTrustResponse;
  updateSuccess(response: DeviceUpdateResponse): DeviceUpdateResponse;
  removeSuccess(response: DeviceRemovalResponse): DeviceRemovalResponse;
  error(code: string, message: string, details?: Record<string, unknown>): DeviceErrorResponse;
}

/**
 * Device Error Response
 * Error response for device operations
 */
export interface DeviceErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: Record<string, unknown>;
  };
  timestamp: Timestamp;
  requestId?: string;
}

/**
 * Device Constants
 * Device-related constants (re-exported from shared-constants)
 */
export const DEVICE_TYPES = DEVICE_TYPE;
export const DEVICE_STATUSES = DEVICE_STATUS;
export const DEVICE_CONFIG_DEFAULT = DEVICE_CONFIG;

/**
 * Default Device Configuration
 */
export const DEFAULT_DEVICE_CONFIG = {
  maxDevicesPerUser: DEVICE_MAX_PER_USER,
  deviceExpiryDays: 365,
  sessionTimeoutMinutes: DEVICE_SESSION_TIMEOUT,
  requireVerification: true,
  enableFingerprinting: true,
  enableTrustedDevices: true,
  trustDurationDays: DEVICE_TRUST_DURATION,
  requireTrustForSensitive: true,
  blockUnknownDevices: !DEVICE_UNKNOWN_ALLOWED,
  notifyOnNewDevice: DEVICE_NOTIFICATION_ON_NEW,
  notifyOnTrustChange: true,
  deviceTrackingEnabled: true,
} as const;

/**
 * Device Webhook
 * Webhook payload for device events
 */
export interface DeviceWebhook {
  event: string;
  userId: UserId;
  deviceId: string;
  deviceName: string;
  deviceType: DeviceType;
  timestamp: Timestamp;
  data: Record<string, unknown>;
}

/**
 * Device Security
 * Security settings for devices
 */
export interface DeviceSecurity {
  requireVerification: boolean;
  requireTrustedDevice: boolean;
  maxDevices: number;
  deviceExpiryDays: number;
  trustDurationDays: number;
  blockUnknownDevices: boolean;
  requireMFAOnNewDevice: boolean;
  notifyOnNewDevice: boolean;
  notifyOnDeviceChange: boolean;
  enableFingerprinting: boolean;
  fingerprintExpiryDays: number;
  sessionTimeoutMinutes: number;
  allowMultipleSessions: boolean;
  maxSessionsPerDevice: number;
}

/**
 * Device Statistics
 * Statistical data about devices
 */
export interface DeviceStatistics {
  totalDevices: number;
  activeDevices: number;
  inactiveDevices: number;
  byType: Record<DeviceType, number>;
  byOS: Record<DeviceOS, number>;
  byBrowser: Record<DeviceBrowser, number>;
  byTrustLevel: Record<DeviceTrustLevel, number>;
  byStatus: Record<DeviceStatus, number>;
  newDevicesToday: number;
  newDevicesWeek: number;
  newDevicesMonth: number;
  averageDevicesPerUser: number;
  averageDeviceAge: number;
  verifiedDevices: number;
  unverifiedDevices: number;
  trustedDevices: number;
  untrustedDevices: number;
  timestamp: Timestamp;
}

/**
 * Device Audit Log
 * Audit log for device operations
 */
export interface DeviceAuditLog {
  id: string;
  userId: UserId;
  deviceId: string;
  operation:
    'register' | 'verify' | 'trust' | 'update' | 'remove' | 'block' | 'suspend' | 'activate';
  success: boolean;
  timestamp: Timestamp;
  ipAddress?: IPAddress;
  userAgent?: string;
  metadata?: Record<string, unknown>;
}

/**
 * Device Limit
 * Device limit configuration
 */
export interface DeviceLimit {
  userId: UserId;
  maxDevices: number;
  currentDevices: number;
  canRegisterMore: boolean;
  remainingDevices: number;
  resetAt?: Timestamp;
  metadata?: Record<string, unknown>;
}

/**
 * Device Block Request
 * Request to block a device
 */
export interface DeviceBlockRequest {
  userId: UserId;
  deviceId: string;
  reason: string;
  duration?: number;
  adminId?: UserId;
  notes?: string;
  metadata?: Record<string, unknown>;
}

/**
 * Device Block Response
 * Response after device block
 */
export interface DeviceBlockResponse {
  success: boolean;
  data?: {
    blocked: boolean;
    deviceId: string;
    blockedAt: Timestamp;
    expiresAt?: Timestamp;
    reason: string;
    message: string;
  };
  error?: string;
  timestamp: Timestamp;
}

/**
 * Device Unblock Request
 * Request to unblock a device
 */
export interface DeviceUnblockRequest {
  userId: UserId;
  deviceId: string;
  reason: string;
  adminId?: UserId;
  notes?: string;
}

/**
 * Device Unblock Response
 * Response after device unblock
 */
export interface DeviceUnblockResponse {
  success: boolean;
  data?: {
    unblocked: boolean;
    deviceId: string;
    unblockedAt: Timestamp;
    reason: string;
    message: string;
  };
  error?: string;
  timestamp: Timestamp;
}
