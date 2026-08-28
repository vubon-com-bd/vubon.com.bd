/**
 * Vendor Feature Types
 * Type definitions for vendor features based on shared-constants
 * @module VendorFeatureTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants vendor feature
// ============================================================
import {
  // Vendor Feature
  VENDOR_FEATURE,
  VendorFeatureType,
  VendorFeatureStatus,
  VendorFeatureCategory,
  VendorFeatureAccessLevel,
  VendorFeatureFlag,
  vendorFeatureGetTypeLabel,
  vendorFeatureGetStatusLabel,
  vendorFeatureGetCategoryLabel,
  vendorFeatureGetAccessLevelLabel,
  vendorFeatureIsActive,
  vendorFeatureGetFlagLabel,
} from '@vubon/shared-constants';

// ============================================================
// Vendor Feature Extended Types
// ============================================================

/**
 * Vendor feature
 */
export interface VendorFeature extends BaseEntity, Timestamp {
  id: ID;
  vendorId: ID;
  type: VendorFeatureType;
  status: VendorFeatureStatus;
  category: VendorFeatureCategory;
  accessLevel: VendorFeatureAccessLevel;
  flag: VendorFeatureFlag;
  isActive: boolean;
  isEnabled: boolean;
  isPartial: boolean;
  isRollout: boolean;
  dependencies: VendorFeatureType[];
  metadata?: Metadata;
}

/**
 * Vendor feature filter
 */
export interface VendorFeatureFilter {
  ids?: ID[];
  vendorIds?: ID[];
  types?: VendorFeatureType[];
  statuses?: VendorFeatureStatus[];
  categories?: VendorFeatureCategory[];
  accessLevels?: VendorFeatureAccessLevel[];
  flags?: VendorFeatureFlag[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isActive?: boolean;
  isEnabled?: boolean;
  isPartial?: boolean;
  isRollout?: boolean;
  searchTerm?: string;
}

/**
 * Vendor feature statistics
 */
export interface VendorFeatureStatistics {
  vendorId: ID;
  totalFeatures: number;
  activeFeatures: number;
  inactiveFeatures: number;
  pendingFeatures: number;
  betaFeatures: number;
  deprecatedFeatures: number;
  byType: Record<VendorFeatureType, number>;
  byStatus: Record<VendorFeatureStatus, number>;
  byCategory: Record<VendorFeatureCategory, number>;
  byAccessLevel: Record<VendorFeatureAccessLevel, number>;
  byFlag: Record<VendorFeatureFlag, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  mostFrequentType: VendorFeatureType;
  mostFrequentStatus: VendorFeatureStatus;
  mostFrequentCategory: VendorFeatureCategory;
  mostFrequentAccessLevel: VendorFeatureAccessLevel;
  mostFrequentFlag: VendorFeatureFlag;
}

/**
 * Vendor feature summary
 */
export interface VendorFeatureSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalFeatures: number;
  active: number;
  inactive: number;
  pending: number;
  beta: number;
  deprecated: number;
  byType: Record<VendorFeatureType, number>;
  byStatus: Record<VendorFeatureStatus, number>;
  byCategory: Record<VendorFeatureCategory, number>;
  byAccessLevel: Record<VendorFeatureAccessLevel, number>;
  byFlag: Record<VendorFeatureFlag, number>;
  featureTrend: {
    date: Date;
    total: number;
    active: number;
    inactive: number;
  }[];
  topTypes: {
    type: VendorFeatureType;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: VendorFeatureStatus;
    count: number;
    label: string;
  }[];
  topCategories: {
    category: VendorFeatureCategory;
    count: number;
    label: string;
  }[];
  topAccessLevels: {
    level: VendorFeatureAccessLevel;
    count: number;
    label: string;
  }[];
  topFlags: {
    flag: VendorFeatureFlag;
    count: number;
    label: string;
  }[];
}

/**
 * Vendor feature configuration
 */
export interface VendorFeatureConfiguration {
  enabled: boolean;
  defaultAccessLevel: VendorFeatureAccessLevel;
  defaultCategory: VendorFeatureCategory;
  maxFeatures: number;
  maxCustomFeatures: number;
  autoActivate: boolean;
  requireApproval: boolean;
  allowBetaFeatures: boolean;
  allowDeprecatedFeatures: boolean;
  allowCustomFeatures: boolean;
  notificationOnCreate: boolean;
  notificationOnUpdate: boolean;
  notificationOnStatusChange: boolean;
  notificationOnAccessChange: boolean;
  alertConfig?: VendorFeatureAlertConfig;
}

/**
 * Vendor feature alert configuration
 */
export interface VendorFeatureAlertConfig {
  enabled: boolean;
  statusChangeAlert: boolean;
  accessChangeAlert: boolean;
  dependencyMissingAlert: boolean;
  limitExceededAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Vendor feature history
 */
export interface VendorFeatureHistory extends BaseEntity, Timestamp {
  id: ID;
  featureId: ID;
  vendorId: ID;
  action:
    | 'create'
    | 'update'
    | 'activate'
    | 'deactivate'
    | 'beta'
    | 'deprecate'
    | 'delete'
    | 'restore'
    | 'access_change'
    | 'flag_change';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Vendor feature validation
 */
export interface VendorFeatureValidation {
  isValid: boolean;
  featureId: ID;
  vendorId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Vendor feature export
 */
export interface VendorFeatureExport extends BaseEntity, Timestamp {
  id: ID;
  vendorId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: VendorFeatureFilter;
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
  // Vendor Feature
  VENDOR_FEATURE,
  VendorFeatureType,
  VendorFeatureStatus,
  VendorFeatureCategory,
  VendorFeatureAccessLevel,
  VendorFeatureFlag,
  vendorFeatureGetTypeLabel,
  vendorFeatureGetStatusLabel,
  vendorFeatureGetCategoryLabel,
  vendorFeatureGetAccessLevelLabel,
  vendorFeatureIsActive,
  vendorFeatureGetFlagLabel,
};
