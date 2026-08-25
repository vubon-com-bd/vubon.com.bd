/**
 * Auth Device Types
 * Type definitions for authentication devices based on shared-constants
 * @module AuthDeviceTypes
 */

import { BaseEntity, Timestamp, Metadata, ID, DeviceInfo } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants auth device
// ============================================================
import {
  // Core Device Constants
  AUTH_DEVICE,
  DEVICE_PLATFORMS,
  DEVICE_TRUST_LEVELS,
  DEVICE_EVENTS,
  DEVICE_CONFIG,
  DEVICE_DEFAULTS,
  AUTHDEVICE_PLATFORMS_LIST,
  AUTHDEVICE_MOBILE_PLATFORMS,
  AUTHDEVICE_DESKTOP_PLATFORMS,
  AUTHDEVICE_EMBEDDED_PLATFORMS,
  // Core Device Types
  AuthDeviceConfig,
  AuthDevicePlatform,
  AuthDeviceTrustLevel,
  AuthDeviceEvent,
  AuthDeviceDefaults,
  // Core Device Status Types
  AuthDeviceStatus,
  // Core Device Type Types
  AuthDeviceType,
  // Core Device Functions
  isAuthdevicePlatform,
  isAuthdeviceMobilePlatform,
  isAuthdeviceDesktopPlatform,
  isAuthdeviceEmbeddedPlatform,
  getAuthdevicePlatformLabel,
  getAuthdevicePlatformIcon,
  getAuthdeviceTrustLevel,
  getAuthdeviceTrustLevelLabel,
  getAuthdeviceTrustLevelColor,
  getAuthdeviceMaxDevicesPerUser,
  getAuthdeviceMaxActiveSessions,
  getAuthdeviceSessionTimeoutMinutes,
  getAuthdeviceRememberMeDays,
  isAuthdeviceTrusted,
  isAuthdeviceUntrusted,
  getAuthdeviceTrustLevelFromHistory,
} from '@vubon/shared-constants';

// ============================================================
// Auth Device Extended Types
// ============================================================

/**
 * Auth device with additional metadata
 */
export interface AuthDeviceExtended extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  deviceInfo: DeviceInfo;
  platform: AuthDevicePlatform;
  type: AuthDeviceType;
  status: AuthDeviceStatus;
  trustLevel: AuthDeviceTrustLevel;
  isActive: boolean;
  isInactive: boolean;
  isPending: boolean;
  isBlocked: boolean;
  isSecurityIssue: boolean;
  isTrusted: boolean;
  isUntrusted: boolean;
  isMobile: boolean;
  isDesktop: boolean;
  isTouch: boolean;
  lastUsedAt?: Date;
  lastVerifiedAt?: Date;
  expiresAt?: Date;
  metadata?: Metadata;
}

/**
 * Auth device filter
 */
export interface AuthDeviceFilter {
  userIds?: ID[];
  platforms?: AuthDevicePlatform[];
  types?: AuthDeviceType[];
  statuses?: AuthDeviceStatus[];
  trustLevels?: AuthDeviceTrustLevel[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isActive?: boolean;
  isInactive?: boolean;
  isPending?: boolean;
  isBlocked?: boolean;
  isTrusted?: boolean;
  isUntrusted?: boolean;
  isMobile?: boolean;
  isDesktop?: boolean;
  isTouch?: boolean;
  searchTerm?: string;
}

/**
 * Auth device statistics
 */
export interface AuthDeviceStatistics {
  userId: ID;
  totalDevices: number;
  activeDevices: number;
  inactiveDevices: number;
  pendingDevices: number;
  blockedDevices: number;
  trustedDevices: number;
  untrustedDevices: number;
  byPlatform: Record<AuthDevicePlatform, number>;
  byType: Record<AuthDeviceType, number>;
  byStatus: Record<AuthDeviceStatus, number>;
  byTrustLevel: Record<AuthDeviceTrustLevel, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averageDevicesPerUser: number;
  mostFrequentPlatform: AuthDevicePlatform;
  mostFrequentType: AuthDeviceType;
  mostFrequentTrustLevel: AuthDeviceTrustLevel;
}

/**
 * Auth device summary
 */
export interface AuthDeviceSummary {
  period: {
    start: Date;
    end: Date;
  };
  total: number;
  active: number;
  inactive: number;
  pending: number;
  blocked: number;
  trusted: number;
  untrusted: number;
  byPlatform: Record<AuthDevicePlatform, number>;
  byType: Record<AuthDeviceType, number>;
  byStatus: Record<AuthDeviceStatus, number>;
  byTrustLevel: Record<AuthDeviceTrustLevel, number>;
  deviceTrend: {
    date: Date;
    total: number;
    active: number;
    trusted: number;
  }[];
  topPlatforms: {
    platform: AuthDevicePlatform;
    count: number;
    label: string;
  }[];
  topTypes: {
    type: AuthDeviceType;
    count: number;
    label: string;
  }[];
}

/**
 * Auth device configuration
 */
export interface AuthDeviceConfiguration {
  enabled: boolean;
  maxDevicesPerUser: number;
  maxActiveSessions: number;
  sessionTimeoutMinutes: number;
  rememberMeDays: number;
  requireVerificationForNewDevices: boolean;
  autoTrustKnownDevices: boolean;
  trustLevelExpiryDays: number;
  allowMobileDevices: boolean;
  allowDesktopDevices: boolean;
  allowEmbeddedDevices: boolean;
  notificationOnNewDevice: boolean;
  notificationOnTrustChange: boolean;
  notificationOnBlock: boolean;
  alertConfig?: AuthDeviceAlertConfig;
}

/**
 * Auth device alert configuration
 */
export interface AuthDeviceAlertConfig {
  enabled: boolean;
  newDeviceAlert: boolean;
  trustChangeAlert: boolean;
  blockAlert: boolean;
  suspiciousActivityAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Auth device history
 */
export interface AuthDeviceHistory extends BaseEntity, Timestamp {
  id: ID;
  deviceId: ID;
  userId: ID;
  action: 'register' | 'verify' | 'trust' | 'untrust' | 'block' | 'unblock' | 'expire' | 'remove';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  ipAddress?: string;
  userAgent?: string;
  metadata?: Metadata;
}

/**
 * Auth device verification
 */
export interface AuthDeviceVerification extends BaseEntity, Timestamp {
  id: ID;
  deviceId: ID;
  userId: ID;
  method: 'email' | 'sms' | 'push' | 'biometric' | 'password';
  status: 'pending' | 'verified' | 'failed' | 'expired';
  code?: string;
  token?: string;
  verifiedAt?: Date;
  expiresAt: Date;
  attempts: number;
  maxAttempts: number;
  metadata?: Metadata;
}

/**
 * Auth device trust
 */
export interface AuthDeviceTrust extends BaseEntity, Timestamp {
  id: ID;
  deviceId: ID;
  userId: ID;
  level: AuthDeviceTrustLevel;
  grantedBy: ID;
  grantedAt: Date;
  expiresAt?: Date;
  reason?: string;
  isActive: boolean;
  metadata?: Metadata;
}

/**
 * Auth device session
 */
export interface AuthDeviceSession extends BaseEntity, Timestamp {
  id: ID;
  deviceId: ID;
  userId: ID;
  sessionId: ID;
  isActive: boolean;
  startedAt: Date;
  endedAt?: Date;
  ipAddress?: string;
  location?: string;
  metadata?: Metadata;
}

/**
 * Auth device export
 */
export interface AuthDeviceExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf';
  filter: AuthDeviceFilter;
  filename: string;
  fileSize?: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  completedAt?: Date;
  downloadUrl?: string;
  metadata?: Metadata;
}

// ============================================================
// Re-export Everything
// ============================================================

export {
  // Core Constants
  AUTH_DEVICE,
  DEVICE_PLATFORMS,
  DEVICE_TRUST_LEVELS,
  DEVICE_EVENTS,
  DEVICE_CONFIG,
  DEVICE_DEFAULTS,
  AUTHDEVICE_PLATFORMS_LIST,
  AUTHDEVICE_MOBILE_PLATFORMS,
  AUTHDEVICE_DESKTOP_PLATFORMS,
  AUTHDEVICE_EMBEDDED_PLATFORMS,
  // Core Types
  AuthDeviceConfig,
  AuthDevicePlatform,
  AuthDeviceTrustLevel,
  AuthDeviceEvent,
  AuthDeviceDefaults,
  AuthDeviceStatus,
  AuthDeviceType,
  // Core Functions
  isAuthdevicePlatform,
  isAuthdeviceMobilePlatform,
  isAuthdeviceDesktopPlatform,
  isAuthdeviceEmbeddedPlatform,
  getAuthdevicePlatformLabel,
  getAuthdevicePlatformIcon,
  getAuthdeviceTrustLevel,
  getAuthdeviceTrustLevelLabel,
  getAuthdeviceTrustLevelColor,
  getAuthdeviceMaxDevicesPerUser,
  getAuthdeviceMaxActiveSessions,
  getAuthdeviceSessionTimeoutMinutes,
  getAuthdeviceRememberMeDays,
  isAuthdeviceTrusted,
  isAuthdeviceUntrusted,
  getAuthdeviceTrustLevelFromHistory,
};
