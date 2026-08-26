/**
 * Bundle Types
 * Type definitions for bundles based on shared-constants
 * @module BundleTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants discovery
// ============================================================
import {
  // Discovery Core
  DiscoveryType,
  DiscoveryCategory,
  DiscoverySource,
  // Bundle
  DISCOVERY_BUNDLE,
  DiscoveryBundleType,
  DiscoveryBundleStatus,
  DiscoveryBundleDefault,
  DiscoveryBundleLimit,
  DiscoveryBundleError,
  discoveryBundleGetTypeLabel,
  discoveryBundleGetStatusLabel,
  discoveryBundleGetErrorLabel,
  discoveryBundleIsActive,
  discoveryBundleIsApproved,
  discoveryBundleGetDefaultLimit,
  discoveryBundleGetDefaultDiscount,
  discoveryBundleGetMaxItems,
  discoveryBundleGetMinItems,
} from '@vubon/shared-constants';

// ============================================================
// Bundle Extended Types
// ============================================================

/**
 * Bundle item
 */
export interface BundleItem extends BaseEntity, Timestamp {
  id: ID;
  type: DiscoveryBundleType;
  status: DiscoveryBundleStatus;
  itemIds: ID[];
  discount: number;
  isActive: boolean;
  isApproved: boolean;
  metadata?: Metadata;
}

/**
 * Bundle filter
 */
export interface BundleFilter {
  types?: DiscoveryBundleType[];
  statuses?: DiscoveryBundleStatus[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  minDiscount?: number;
  maxDiscount?: number;
  minItems?: number;
  maxItems?: number;
  isActive?: boolean;
  isApproved?: boolean;
  searchTerm?: string;
}

/**
 * Bundle statistics
 */
export interface BundleStatistics {
  totalBundles: number;
  activeBundles: number;
  approvedBundles: number;
  byType: Record<DiscoveryBundleType, number>;
  byStatus: Record<DiscoveryBundleStatus, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averageDiscount: number;
  maxDiscount: number;
  minDiscount: number;
  averageItems: number;
  maxItems: number;
  minItems: number;
  mostFrequentType: DiscoveryBundleType;
  totalBundleItems: number;
}

/**
 * Bundle summary
 */
export interface BundleSummary {
  period: {
    start: Date;
    end: Date;
  };
  total: number;
  active: number;
  approved: number;
  byType: Record<DiscoveryBundleType, number>;
  byStatus: Record<DiscoveryBundleStatus, number>;
  bundleTrend: {
    date: Date;
    total: number;
    active: number;
    approved: number;
  }[];
  topTypes: {
    type: DiscoveryBundleType;
    count: number;
    label: string;
  }[];
  topBundles: {
    bundleId: ID;
    itemCount: number;
    discount: number;
    status: string;
  }[];
}

/**
 * Bundle configuration
 */
export interface BundleConfiguration {
  enabled: boolean;
  defaultType: DiscoveryBundleType;
  defaultLimit: number;
  defaultDiscount: number;
  minDiscount: number;
  maxDiscount: number;
  minItems: number;
  maxItems: number;
  requireApproval: boolean;
  cacheTTLSeconds: number;
  enableRealTime: boolean;
  enableHistorical: boolean;
  enablePredictive: boolean;
  notificationOnCreate: boolean;
  notificationOnUpdate: boolean;
  notificationOnApproval: boolean;
  notificationOnError: boolean;
  alertConfig?: BundleAlertConfig;
}

/**
 * Bundle alert configuration
 */
export interface BundleAlertConfig {
  enabled: boolean;
  discountThresholdAlert: boolean;
  itemCountAlert: boolean;
  approvalErrorAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
  discountThreshold: number;
  itemCountThreshold: number;
}

/**
 * Bundle history
 */
export interface BundleHistory extends BaseEntity, Timestamp {
  id: ID;
  bundleId: ID;
  action: 'create' | 'update' | 'approve' | 'reject' | 'expire' | 'archive' | 'delete';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Bundle item detail
 */
export interface BundleItemDetail extends BaseEntity, Timestamp {
  id: ID;
  bundleId: ID;
  itemId: ID;
  position: number;
  addedAt: Date;
  removedAt?: Date;
  metadata?: Metadata;
}

/**
 * Bundle analytics
 */
export interface BundleAnalytics extends BaseEntity, Timestamp {
  id: ID;
  bundleId: ID;
  period: {
    start: Date;
    end: Date;
  };
  views: number;
  clicks: number;
  purchases: number;
  revenue: number;
  conversionRate: number;
  averageOrderValue: number;
  metadata?: Metadata;
}

/**
 * Bundle recommendation
 */
export interface BundleRecommendation extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  bundleId: ID;
  score: number;
  reason: string;
  recommendedAt: Date;
  expiresAt?: Date;
  metadata?: Metadata;
}

/**
 * Bundle export
 */
export interface BundleExport extends BaseEntity, Timestamp {
  id: ID;
  format: 'json' | 'csv' | 'pdf';
  filter: BundleFilter;
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
  // Discovery Core
  DiscoveryType,
  DiscoveryCategory,
  DiscoverySource,
  // Bundle
  DISCOVERY_BUNDLE,
  DiscoveryBundleType,
  DiscoveryBundleStatus,
  DiscoveryBundleDefault,
  DiscoveryBundleLimit,
  DiscoveryBundleError,
  discoveryBundleGetTypeLabel,
  discoveryBundleGetStatusLabel,
  discoveryBundleGetErrorLabel,
  discoveryBundleIsActive,
  discoveryBundleIsApproved,
  discoveryBundleGetDefaultLimit,
  discoveryBundleGetDefaultDiscount,
  discoveryBundleGetMaxItems,
  discoveryBundleGetMinItems,
};
