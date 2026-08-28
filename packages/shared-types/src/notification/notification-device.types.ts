/**
 * Notification Device Types
 * Type definitions for notification devices based on shared-constants
 * @module NotificationDeviceTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants notification device
// ============================================================
import {
  // Notification Device
  NOTIFICATIONDEVICE,
  NotificationDeviceType,
  NotificationDevicePlatform,
  NotificationDeviceStatus,
  NotificationDeviceCapability,
  NotificationDeviceTrustLevel,
  NotificationDeviceDefault,
  NotificationDeviceLimit,
  NotificationDeviceError,
  notificationdeviceGetTypeLabel,
  notificationdeviceGetPlatformLabel,
  notificationdeviceGetStatusLabel,
  notificationdeviceGetCapabilityLabel,
  notificationdeviceGetTrustLevelLabel,
  notificationdeviceGetErrorLabel,
  notificationdeviceGetDefaultMaxDevices,
  notificationdeviceIsMobile,
  notificationdeviceIsDesktop,
  notificationdeviceIsActive,
  notificationdeviceIsAndroid,
  notificationdeviceIsIOS,
  notificationdeviceIsWeb,
  // Notification Device Type
  NOTIFICATIONDEVICE_TYPE,
  NotificationDeviceCategoryType,
  NotificationDeviceSubType,
  NotificationDeviceFormFactor,
  NotificationDeviceOSType,
  NotificationDeviceConnectivity,
  notificationdeviceGetCategoryLabel,
  notificationdeviceGetSubTypeLabel,
  notificationdeviceGetFormFactorLabel,
  notificationdeviceGetOSTypeLabel,
  notificationdeviceGetConnectivityLabel,
  notificationdeviceIsMobileCategory,
  notificationdeviceIsDesktopCategory,
  notificationdeviceIsTVCategory,
  notificationdeviceIsConsoleCategory,
  notificationdeviceIsIoTCategory,
  // Notification Device Status
  NOTIFICATIONDEVICE_STATUS,
  NotificationDeviceStatusType,
  NotificationDeviceStatusColor,
  NotificationDeviceStatusCategory,
  NotificationDeviceStatusOrder,
  NotificationDeviceStatusTransition,
  notificationDeviceGetStatusColor,
  notificationDeviceGetStatusCategory,
  notificationDeviceIsActive,
  notificationdeviceIsRegistered,
  notificationdeviceIsBlocked,
  notificationDeviceIsPending,
  notificationDeviceCanTransition,
} from '@vubon/shared-constants';

// ============================================================
// Notification Device Extended Types
// ============================================================

/**
 * Notification Device
 */
export interface NotificationDevice extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  type: NotificationDeviceType;
  platform: NotificationDevicePlatform;
  status: NotificationDeviceStatusType;
  capabilities: NotificationDeviceCapability[];
  trustLevel: NotificationDeviceTrustLevel;
  deviceId: string;
  name: string;
  model?: string;
  osVersion?: string;
  appVersion?: string;
  pushToken?: string;
  isMobile: boolean;
  isDesktop: boolean;
  isActive: boolean;
  isAndroid: boolean;
  isIOS: boolean;
  isWeb: boolean;
  isRegistered: boolean;
  isBlocked: boolean;
  isPending: boolean;
  metadata?: Metadata;
}

/**
 * Notification Device Filter
 */
export interface NotificationDeviceFilter {
  ids?: ID[];
  userIds?: ID[];
  types?: NotificationDeviceType[];
  platforms?: NotificationDevicePlatform[];
  statuses?: NotificationDeviceStatusType[];
  trustLevels?: NotificationDeviceTrustLevel[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isMobile?: boolean;
  isDesktop?: boolean;
  isActive?: boolean;
  isAndroid?: boolean;
  isIOS?: boolean;
  isWeb?: boolean;
  isRegistered?: boolean;
  isBlocked?: boolean;
  isPending?: boolean;
  searchTerm?: string;
  deviceId?: string;
}

/**
 * Notification Device Statistics
 */
export interface NotificationDeviceStatistics {
  userId: ID;
  totalDevices: number;
  activeDevices: number;
  registeredDevices: number;
  blockedDevices: number;
  pendingDevices: number;
  byType: Record<NotificationDeviceType, number>;
  byPlatform: Record<NotificationDevicePlatform, number>;
  byStatus: Record<NotificationDeviceStatusType, number>;
  byTrustLevel: Record<NotificationDeviceTrustLevel, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  mobileDevices: number;
  desktopDevices: number;
  androidDevices: number;
  iosDevices: number;
  webDevices: number;
  mostFrequentType: NotificationDeviceType;
  mostFrequentPlatform: NotificationDevicePlatform;
  mostFrequentStatus: NotificationDeviceStatusType;
  mostFrequentTrustLevel: NotificationDeviceTrustLevel;
}

/**
 * Notification Device Summary
 */
export interface NotificationDeviceSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalDevices: number;
  active: number;
  registered: number;
  blocked: number;
  pending: number;
  byType: Record<NotificationDeviceType, number>;
  byPlatform: Record<NotificationDevicePlatform, number>;
  byStatus: Record<NotificationDeviceStatusType, number>;
  byTrustLevel: Record<NotificationDeviceTrustLevel, number>;
  deviceTrend: {
    date: Date;
    total: number;
    active: number;
    registered: number;
  }[];
  topTypes: {
    type: NotificationDeviceType;
    count: number;
    label: string;
  }[];
  topPlatforms: {
    platform: NotificationDevicePlatform;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: NotificationDeviceStatusType;
    count: number;
    label: string;
  }[];
  topTrustLevels: {
    trustLevel: NotificationDeviceTrustLevel;
    count: number;
    label: string;
  }[];
}

/**
 * Notification Device Configuration
 */
export interface NotificationDeviceConfiguration {
  enabled: boolean;
  defaultType: NotificationDeviceType;
  defaultPlatform: NotificationDevicePlatform;
  defaultTrustLevel: NotificationDeviceTrustLevel;
  defaultMaxDevices: number;
  maxDevicesPerUser: number;
  requirePushToken: boolean;
  requireName: boolean;
  allowMultipleDevices: boolean;
  autoRegister: boolean;
  autoBlockInactive: boolean;
  inactiveThresholdDays: number;
  notificationOnRegister: boolean;
  notificationOnBlock: boolean;
  notificationOnUnblock: boolean;
  alertConfig?: NotificationDeviceAlertConfig;
}

/**
 * Notification Device Alert Configuration
 */
export interface NotificationDeviceAlertConfig {
  enabled: boolean;
  maxDevicesAlert: boolean;
  maxDevicesThreshold: number;
  suspiciousDeviceAlert: boolean;
  blockedDeviceAlert: boolean;
  inactiveDeviceAlert: boolean;
  inactiveThresholdDays: number;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Notification Device History
 */
export interface NotificationDeviceHistory extends BaseEntity, Timestamp {
  id: ID;
  deviceId: ID;
  userId: ID;
  action:
    'register' | 'update' | 'activate' | 'deactivate' | 'block' | 'unblock' | 'delete' | 'restore';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Notification Device Validation
 */
export interface NotificationDeviceValidation {
  isValid: boolean;
  deviceId: ID;
  userId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Notification Device Export
 */
export interface NotificationDeviceExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: NotificationDeviceFilter;
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
  // Notification Device
  NOTIFICATIONDEVICE,
  NotificationDeviceType,
  NotificationDevicePlatform,
  NotificationDeviceStatus,
  NotificationDeviceCapability,
  NotificationDeviceTrustLevel,
  NotificationDeviceDefault,
  NotificationDeviceLimit,
  NotificationDeviceError,
  notificationdeviceGetTypeLabel,
  notificationdeviceGetPlatformLabel,
  notificationdeviceGetStatusLabel,
  notificationdeviceGetCapabilityLabel,
  notificationdeviceGetTrustLevelLabel,
  notificationdeviceGetErrorLabel,
  notificationdeviceGetDefaultMaxDevices,
  notificationdeviceIsMobile,
  notificationdeviceIsDesktop,
  notificationdeviceIsActive,
  notificationdeviceIsAndroid,
  notificationdeviceIsIOS,
  notificationdeviceIsWeb,
  // Notification Device Type
  NOTIFICATIONDEVICE_TYPE,
  NotificationDeviceCategoryType,
  NotificationDeviceSubType,
  NotificationDeviceFormFactor,
  NotificationDeviceOSType,
  NotificationDeviceConnectivity,
  notificationdeviceGetCategoryLabel,
  notificationdeviceGetSubTypeLabel,
  notificationdeviceGetFormFactorLabel,
  notificationdeviceGetOSTypeLabel,
  notificationdeviceGetConnectivityLabel,
  notificationdeviceIsMobileCategory,
  notificationdeviceIsDesktopCategory,
  notificationdeviceIsTVCategory,
  notificationdeviceIsConsoleCategory,
  notificationdeviceIsIoTCategory,
  // Notification Device Status
  NOTIFICATIONDEVICE_STATUS,
  NotificationDeviceStatusType,
  NotificationDeviceStatusColor,
  NotificationDeviceStatusCategory,
  NotificationDeviceStatusOrder,
  NotificationDeviceStatusTransition,
  notificationDeviceGetStatusColor,
  notificationDeviceGetStatusCategory,
  notificationDeviceIsActive,
  notificationdeviceIsRegistered,
  notificationdeviceIsBlocked,
  notificationDeviceIsPending,
  notificationDeviceCanTransition,
};
