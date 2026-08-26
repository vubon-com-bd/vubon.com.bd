/**
 * Cart Merger Types
 * Type definitions for cart merging based on shared-constants
 * @module CartMergerTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants cart
// ============================================================
import {
  // Cart Core
  CartType,
  CartCategory,
  CartStatus,
  CartPriority,
  // Cart Item
  CartItemType,
  CartItemStatus,
} from '@vubon/shared-constants';

// ============================================================
// Cart Merger Extended Types
// ============================================================

/**
 * Cart merge request
 */
export interface CartMergeRequest {
  sourceCartId: ID;
  targetCartId: ID;
  userId: ID;
  strategy: 'newest' | 'oldest' | 'largest' | 'smallest' | 'manual';
  conflictResolution:
    | 'keep_source'
    | 'keep_target'
    | 'combine'
    | 'highest_quantity'
    | 'lowest_quantity'
    | 'highest_price'
    | 'lowest_price';
  preserveItems: boolean;
  preservePromotions: boolean;
  preserveCoupons: boolean;
  preserveMetadata: boolean;
  metadata?: Metadata;
}

/**
 * Cart merge result
 */
export interface CartMergeResult extends BaseEntity, Timestamp {
  id: ID;
  sourceCartId: ID;
  targetCartId: ID;
  mergedCartId: ID;
  userId: ID;
  strategy: string;
  conflictResolution: string;
  mergedItems: CartMergeItem[];
  resolvedConflicts: CartMergeConflict[];
  droppedItems: CartMergeItem[];
  keptItems: CartMergeItem[];
  sourceStatus: CartStatus;
  targetStatus: CartStatus;
  mergedStatus: CartStatus;
  sourceTotal: number;
  targetTotal: number;
  mergedTotal: number;
  currency: string;
  isSuccessful: boolean;
  errorMessage?: string;
  metadata?: Metadata;
}

/**
 * Cart merge item
 */
export interface CartMergeItem extends BaseEntity, Timestamp {
  id: ID;
  sourceCartId: ID;
  targetCartId: ID;
  mergedCartId: ID;
  productId: ID;
  variantId?: ID;
  sku: string;
  name: string;
  sourceQuantity: number;
  targetQuantity: number;
  mergedQuantity: number;
  sourcePrice: number;
  targetPrice: number;
  mergedPrice: number;
  sourceTotal: number;
  targetTotal: number;
  mergedTotal: number;
  currency: string;
  isConflict: boolean;
  resolution: 'source' | 'target' | 'combined';
  metadata?: Metadata;
}

/**
 * Cart merge conflict
 */
export interface CartMergeConflict {
  itemId: ID;
  productId: ID;
  variantId?: ID;
  sourceQuantity: number;
  targetQuantity: number;
  sourcePrice: number;
  targetPrice: number;
  resolution: 'source' | 'target' | 'combined' | 'manual';
  resolved: boolean;
  resolvedAt?: Date;
  resolvedBy?: ID;
  metadata?: Metadata;
}

/**
 * Cart merge filter
 */
export interface CartMergeFilter {
  sourceCartIds?: ID[];
  targetCartIds?: ID[];
  mergedCartIds?: ID[];
  userIds?: ID[];
  strategies?: string[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isSuccessful?: boolean;
  hasConflicts?: boolean;
  searchTerm?: string;
}

/**
 * Cart merge statistics
 */
export interface CartMergeStatistics {
  userId: ID;
  totalMerges: number;
  successfulMerges: number;
  failedMerges: number;
  mergesWithConflicts: number;
  byStrategy: Record<string, number>;
  byConflictResolution: Record<string, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averageItemsMerged: number;
  averageConflictsPerMerge: number;
  totalItemsMerged: number;
  totalValueMerged: number;
  mostFrequentStrategy: string;
  mostFrequentConflictResolution: string;
}

/**
 * Cart merge summary
 */
export interface CartMergeSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalMerges: number;
  successful: number;
  failed: number;
  withConflicts: number;
  byStrategy: Record<string, number>;
  byConflictResolution: Record<string, number>;
  mergeTrend: {
    date: Date;
    total: number;
    successful: number;
    failed: number;
  }[];
  topStrategies: {
    strategy: string;
    count: number;
    label: string;
  }[];
  topResolutions: {
    resolution: string;
    count: number;
    label: string;
  }[];
  performanceMetrics: {
    averageMergeTime: number;
    averageItemsPerMerge: number;
    averageValuePerMerge: number;
  };
}

/**
 * Cart merge configuration
 */
export interface CartMergeConfiguration {
  enabled: boolean;
  defaultStrategy: 'newest' | 'oldest' | 'largest' | 'smallest' | 'manual';
  defaultConflictResolution:
    | 'keep_source'
    | 'keep_target'
    | 'combine'
    | 'highest_quantity'
    | 'lowest_quantity'
    | 'highest_price'
    | 'lowest_price';
  autoMergeOnLogin: boolean;
  autoMergeOnSession: boolean;
  preserveItems: boolean;
  preservePromotions: boolean;
  preserveCoupons: boolean;
  preserveMetadata: boolean;
  requireConfirmation: boolean;
  maxItemsPerMerge: number;
  timeoutSeconds: number;
  notificationOnMerge: boolean;
  notificationOnConflict: boolean;
  notificationOnError: boolean;
  alertConfig?: CartMergeAlertConfig;
}

/**
 * Cart merge alert configuration
 */
export interface CartMergeAlertConfig {
  enabled: boolean;
  conflictAlert: boolean;
  failureAlert: boolean;
  highItemCountAlert: boolean;
  highItemCountThreshold: number;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Cart merge history
 */
export interface CartMergeHistory extends BaseEntity, Timestamp {
  id: ID;
  mergeId: ID;
  sourceCartId: ID;
  targetCartId: ID;
  mergedCartId: ID;
  userId: ID;
  action: 'merge' | 'resolve_conflict' | 'undo' | 'retry';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Cart merge validation
 */
export interface CartMergeValidation {
  isValid: boolean;
  sourceCartId: ID;
  targetCartId: ID;
  userId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Cart merge export
 */
export interface CartMergeExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: CartMergeFilter;
  filename: string;
  fileSize?: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  completedAt?: Date;
  downloadUrl?: string;
  metadata?: Metadata;
}

/**
 * Cart merge undo
 */
export interface CartMergeUndo extends BaseEntity, Timestamp {
  id: ID;
  mergeId: ID;
  sourceCartId: ID;
  targetCartId: ID;
  mergedCartId: ID;
  userId: ID;
  reason: string;
  restoredItems: CartMergeItem[];
  restoredAt: Date;
  metadata?: Metadata;
}

// ============================================================
// Re-export Everything
// ============================================================

export {
  // Cart Core
  CartType,
  CartCategory,
  CartStatus,
  CartPriority,
  // Cart Item
  CartItemType,
  CartItemStatus,
};
