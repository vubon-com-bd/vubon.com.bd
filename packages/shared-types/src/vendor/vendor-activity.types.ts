/**
 * Vendor Activity Types
 * Type definitions for vendor activities based on shared-constants
 * @module VendorActivityTypes
 */

import { BaseEntity, Timestamp, Metadata, ID, DeviceInfo } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants vendor activity
// ============================================================
import {
  // Vendor Activity
  VENDOR_ACTIVITY,
  VendorActivityType,
  VendorActivityStatus,
  VendorActivityCategory,
  VendorActivitySeverity,
  VendorActivityColor,
  VendorActivityIcon,
  vendorActivityGetTypeLabel,
  vendorActivityGetStatusLabel,
  vendorActivityGetCategory,
  vendorActivityGetColor,
  vendorActivityIsSuccess,
  vendorActivityIsFailed,
  vendorActivityGetSeverity,
  // Vendor Activity Type
  VENDOR_ACTIVITY_TYPE,
  VendorActivityTypeCategory,
  VendorActivityTypeScope,
  VendorActivityTypePriority,
  VendorActivityTypeRetention,
  VendorActivityTypeLogging,
  vendorActivityTypeGetCategoryLabel,
  vendorActivityTypeGetScopeLabel,
  vendorActivityTypeGetPriorityLabel,
  vendorActivityTypeGetRetention,
  vendorActivityTypeGetLogging,
} from '@vubon/shared-constants';

// ============================================================
// Vendor Activity Extended Types
// ============================================================

/**
 * Vendor activity
 */
export interface VendorActivity extends BaseEntity, Timestamp {
  id: ID;
  vendorId: ID;
  userId: ID;
  type: VendorActivityType;
  status: VendorActivityStatus;
  category: VendorActivityCategory;
  severity: VendorActivitySeverity;
  description: string;
  isSuccess: boolean;
  isFailed: boolean;
  ipAddress?: string;
  userAgent?: string;
  deviceInfo?: DeviceInfo;
  metadata?: Metadata;
}

/**
 * Vendor activity filter
 */
export interface VendorActivityFilter {
  ids?: ID[];
  vendorIds?: ID[];
  userIds?: ID[];
  types?: VendorActivityType[];
  statuses?: VendorActivityStatus[];
  categories?: VendorActivityCategory[];
  severities?: VendorActivitySeverity[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isSuccess?: boolean;
  isFailed?: boolean;
  searchTerm?: string;
  ipAddress?: string;
}

/**
 * Vendor activity statistics
 */
export interface VendorActivityStatistics {
  vendorId: ID;
  totalActivities: number;
  successActivities: number;
  failedActivities: number;
  byType: Record<VendorActivityType, number>;
  byStatus: Record<VendorActivityStatus, number>;
  byCategory: Record<VendorActivityCategory, number>;
  bySeverity: Record<VendorActivitySeverity, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averageSeverity: number;
  maxSeverity: number;
  minSeverity: number;
  successRate: number;
  failureRate: number;
  mostFrequentType: VendorActivityType;
  mostFrequentStatus: VendorActivityStatus;
  mostFrequentCategory: VendorActivityCategory;
  mostFrequentSeverity: VendorActivitySeverity;
}

/**
 * Vendor activity summary
 */
export interface VendorActivitySummary {
  period: {
    start: Date;
    end: Date;
  };
  totalActivities: number;
  success: number;
  failed: number;
  byType: Record<VendorActivityType, number>;
  byStatus: Record<VendorActivityStatus, number>;
  byCategory: Record<VendorActivityCategory, number>;
  bySeverity: Record<VendorActivitySeverity, number>;
  activityTrend: {
    date: Date;
    total: number;
    success: number;
    failed: number;
  }[];
  topTypes: {
    type: VendorActivityType;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: VendorActivityStatus;
    count: number;
    label: string;
  }[];
  topCategories: {
    category: VendorActivityCategory;
    count: number;
    label: string;
  }[];
  topSeverities: {
    severity: VendorActivitySeverity;
    count: number;
    label: string;
  }[];
  performanceMetrics: {
    successRate: number;
    failureRate: number;
    averageSeverity: number;
  };
}

/**
 * Vendor activity configuration
 */
export interface VendorActivityConfiguration {
  enabled: boolean;
  defaultCategory: VendorActivityCategory;
  defaultSeverity: VendorActivitySeverity;
  logAllActivities: boolean;
  logTypes: VendorActivityType[];
  logCategories: VendorActivityCategory[];
  logSeverities: VendorActivitySeverity[];
  retentionDays: number;
  autoArchive: boolean;
  archiveAfterDays: number;
  autoDelete: boolean;
  deleteAfterDays: number;
  notificationOnFailure: boolean;
  notificationOnHighSeverity: boolean;
  notificationOnSuspicious: boolean;
  alertConfig?: VendorActivityAlertConfig;
}

/**
 * Vendor activity alert configuration
 */
export interface VendorActivityAlertConfig {
  enabled: boolean;
  failureAlert: boolean;
  highSeverityAlert: boolean;
  suspiciousActivityAlert: boolean;
  highFrequencyAlert: boolean;
  highFrequencyThreshold: number;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Vendor activity history
 */
export interface VendorActivityHistory extends BaseEntity, Timestamp {
  id: ID;
  activityId: ID;
  vendorId: ID;
  userId: ID;
  action: 'create' | 'update' | 'archive' | 'delete' | 'restore';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Vendor activity validation
 */
export interface VendorActivityValidation {
  isValid: boolean;
  activityId: ID;
  vendorId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Vendor activity export
 */
export interface VendorActivityExport extends BaseEntity, Timestamp {
  id: ID;
  vendorId: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: VendorActivityFilter;
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
  // Vendor Activity
  VENDOR_ACTIVITY,
  VendorActivityType,
  VendorActivityStatus,
  VendorActivityCategory,
  VendorActivitySeverity,
  VendorActivityColor,
  VendorActivityIcon,
  vendorActivityGetTypeLabel,
  vendorActivityGetStatusLabel,
  vendorActivityGetCategory,
  vendorActivityGetColor,
  vendorActivityIsSuccess,
  vendorActivityIsFailed,
  vendorActivityGetSeverity,
  // Vendor Activity Type
  VENDOR_ACTIVITY_TYPE,
  VendorActivityTypeCategory,
  VendorActivityTypeScope,
  VendorActivityTypePriority,
  VendorActivityTypeRetention,
  VendorActivityTypeLogging,
  vendorActivityTypeGetCategoryLabel,
  vendorActivityTypeGetScopeLabel,
  vendorActivityTypeGetPriorityLabel,
  vendorActivityTypeGetRetention,
  vendorActivityTypeGetLogging,
};
