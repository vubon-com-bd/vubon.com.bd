/**
 * Admin Device Types
 * Type definitions for admin devices based on shared-constants
 * @module AdminDeviceTypes
 */

import { BaseEntity, Timestamp, Metadata, ID, DeviceInfo } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants admin device
// ============================================================
import {
  // Core Device Constants
  ADMIN_DEVICE,
  ADMIN_DEVICE_TYPE_LABELS,
  ADMIN_DEVICE_TYPE_ICONS,
  ADMIN_DEVICE_STATUS_LABELS,
  ADMIN_DEVICE_STATUS_COLORS,
  ADMIN_DEVICE_PLATFORM_LABELS,
  ADMIN_DEVICE_TRUST_LEVEL_LABELS,
  ADMIN_DEVICE_TRUST_LEVEL_PRIORITY,
  // Core Device Types
  AdminDeviceType,
  AdminDeviceStatus,
  AdminDevicePlatform,
  AdminDeviceTrustLevel,
  AdminDeviceVerificationMethod,
  AdminDeviceFeature,
  // Core Device Functions
  getAdminDeviceTypeLabel,
  getAdminDeviceTypeIcon,
  getAdminDeviceStatusLabel,
  getAdminDeviceStatusColor,
  getAdminDevicePlatformLabel,
  getAdminDeviceTrustLevelLabel,
  getAdminDeviceTrustLevelPriority,
  isAdminDeviceActive,
  isAdminDeviceInactive,
  isAdminDeviceBlocked,
  isAdminDeviceLostOrStolen,
  isAdminDeviceVerifiable,
  isAdminTrustedDevice,
  isAdminMobileDevice,
  isAdminDesktopDevice,
  getAdminDeviceTypeFromPlatform,
} from '@vubon/shared-constants';

// ============================================================
// Admin Device Extended Types
// ============================================================

/**
 * Admin device with additional metadata
 */
export interface AdminDeviceExtended extends BaseEntity, Timestamp {
  id: ID;
  adminId: ID;
  deviceInfo: DeviceInfo;
  type: AdminDeviceType;
  status: AdminDeviceStatus;
  platform: AdminDevicePlatform;
  trustLevel: AdminDeviceTrustLevel;
  verificationMethod?: AdminDeviceVerificationMethod;
  features: AdminDeviceFeature[];
  isActive: boolean;
  isInactive: boolean;
  isBlocked: boolean;
  isLostOrStolen: boolean;
  isVerifiable: boolean;
  isTrusted: boolean;
  isMobile: boolean;
  isDesktop: boolean;
  lastUsedAt?: Date;
  lastVerifiedAt?: Date;
  verificationExpiryAt?: Date;
  metadata?: Metadata;
}

/**
 * Admin device filter
 */
export interface AdminDeviceFilter {
  adminIds?: ID[];
  types?: AdminDeviceType[];
  statuses?: AdminDeviceStatus[];
  platforms?: AdminDevicePlatform[];
  trustLevels?: AdminDeviceTrustLevel[];
  features?: AdminDeviceFeature[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isActive?: boolean;
  isBlocked?: boolean;
  isTrusted?: boolean;
  isMobile?: boolean;
  isDesktop?: boolean;
  searchTerm?: string;
}

/**
 * Admin device statistics
 */
export interface AdminDeviceStatistics {
  adminId: ID;
  totalDevices: number;
  activeDevices: number;
  inactiveDevices: number;
  blockedDevices: number;
  byType: Record<AdminDeviceType, number>;
  byStatus: Record<AdminDeviceStatus, number>;
  byPlatform: Record<AdminDevicePlatform, number>;
  byTrustLevel: Record<AdminDeviceTrustLevel, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averageDevicesPerAdmin: number;
  mostFrequentType: AdminDeviceType;
  mostFrequentPlatform: AdminDevicePlatform;
  trustedDevicesCount: number;
  verifiableDevicesCount: number;
}

/**
 * Admin device summary
 */
export interface AdminDeviceSummary {
  period: {
    start: Date;
    end: Date;
  };
  total: number;
  active: number;
  inactive: number;
  blocked: number;
  byType: Record<AdminDeviceType, number>;
  byStatus: Record<AdminDeviceStatus, number>;
  byPlatform: Record<AdminDevicePlatform, number>;
  byTrustLevel: Record<AdminDeviceTrustLevel, number>;
  deviceTrend: {
    date: Date;
    total: number;
    new: number;
    removed: number;
  }[];
  topTypes: {
    type: AdminDeviceType;
    count: number;
    label: string;
  }[];
  topPlatforms: {
    platform: AdminDevicePlatform;
    count: number;
    label: string;
  }[];
}

/**
 * Admin device configuration
 */
export interface AdminDeviceConfiguration {
  enabled: boolean;
  maxDevicesPerAdmin: number;
  requireVerification: boolean;
  verificationExpiryDays: number;
  trustedDevicesOnly: boolean;
  autoBlockUntrusted: boolean;
  autoBlockThreshold: number;
  allowMobileDevices: boolean;
  allowDesktopDevices: boolean;
  allowUnknownPlatforms: boolean;
  requireMFAForNewDevices: boolean;
  notificationOnNewDevice: boolean;
  notificationOnTrustedDevice: boolean;
  alertConfig?: AdminDeviceAlertConfig;
}

/**
 * Admin device alert configuration
 */
export interface AdminDeviceAlertConfig {
  enabled: boolean;
  newDeviceAlert: boolean;
  untrustedDeviceAlert: boolean;
  blockedDeviceAlert: boolean;
  suspiciousDeviceAlert: boolean;
  maxDevicesAlert: boolean;
  maxDevicesThreshold: number;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Admin device history
 */
export interface AdminDeviceHistory extends BaseEntity, Timestamp {
  id: ID;
  deviceId: ID;
  adminId: ID;
  action: 'register' | 'verify' | 'update' | 'block' | 'unblock' | 'trust' | 'untrust' | 'remove';
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
 * Admin device verification
 */
export interface AdminDeviceVerification extends BaseEntity, Timestamp {
  id: ID;
  deviceId: ID;
  adminId: ID;
  method: AdminDeviceVerificationMethod;
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
 * Admin device trust
 */
export interface AdminDeviceTrust extends BaseEntity, Timestamp {
  id: ID;
  deviceId: ID;
  adminId: ID;
  level: AdminDeviceTrustLevel;
  grantedBy: ID;
  grantedAt: Date;
  expiresAt?: Date;
  reason?: string;
  isActive: boolean;
  metadata?: Metadata;
}

/**
 * Admin device session
 */
export interface AdminDeviceSession extends BaseEntity, Timestamp {
  id: ID;
  deviceId: ID;
  adminId: ID;
  sessionId: ID;
  isActive: boolean;
  startedAt: Date;
  endedAt?: Date;
  ipAddress?: string;
  location?: string;
  metadata?: Metadata;
}

/**
 * Admin device export
 */
export interface AdminDeviceExport extends BaseEntity, Timestamp {
  id: ID;
  adminId: ID;
  format: 'json' | 'csv' | 'pdf';
  filter: AdminDeviceFilter;
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
  ADMIN_DEVICE,
  ADMIN_DEVICE_TYPE_LABELS,
  ADMIN_DEVICE_TYPE_ICONS,
  ADMIN_DEVICE_STATUS_LABELS,
  ADMIN_DEVICE_STATUS_COLORS,
  ADMIN_DEVICE_PLATFORM_LABELS,
  ADMIN_DEVICE_TRUST_LEVEL_LABELS,
  ADMIN_DEVICE_TRUST_LEVEL_PRIORITY,
  // Core Types
  AdminDeviceType,
  AdminDeviceStatus,
  AdminDevicePlatform,
  AdminDeviceTrustLevel,
  AdminDeviceVerificationMethod,
  AdminDeviceFeature,
  // Core Functions
  getAdminDeviceTypeLabel,
  getAdminDeviceTypeIcon,
  getAdminDeviceStatusLabel,
  getAdminDeviceStatusColor,
  getAdminDevicePlatformLabel,
  getAdminDeviceTrustLevelLabel,
  getAdminDeviceTrustLevelPriority,
  isAdminDeviceActive,
  isAdminDeviceInactive,
  isAdminDeviceBlocked,
  isAdminDeviceLostOrStolen,
  isAdminDeviceVerifiable,
  isAdminTrustedDevice,
  isAdminMobileDevice,
  isAdminDesktopDevice,
  getAdminDeviceTypeFromPlatform,
};
