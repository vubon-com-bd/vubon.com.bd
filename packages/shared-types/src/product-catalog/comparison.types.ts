/**
 * Comparison Types
 * Type definitions for product comparison based on shared-constants
 * @module ComparisonTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants product
// ============================================================
import {
  // Comparison
  PRODUCTCOMPARISON,
  ProductComparisonType,
  ProductComparisonStatus,
  ProductComparisonMode,
  ProductComparisonCriteria,
  ProductComparisonDefault,
  ProductComparisonLimit,
  productcomparisonGetTypeLabel,
  productcomparisonGetStatusLabel,
  productcomparisonGetModeLabel,
  productcomparisonGetCriteriaLabel,
  productcomparisonIsActive,
  productcomparisonGetMaxProducts,
  productcomparisonGetMinProducts,
} from '@vubon/shared-constants';

// ============================================================
// Comparison Extended Types
// ============================================================

/**
 * Comparison filter
 */
export interface ComparisonFilter {
  ids?: ID[];
  userIds?: ID[];
  types?: ProductComparisonType[];
  statuses?: ProductComparisonStatus[];
  modes?: ProductComparisonMode[];
  criteria?: ProductComparisonCriteria[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isActive?: boolean;
  minProducts?: number;
  maxProducts?: number;
  searchTerm?: string;
}

/**
 * Comparison statistics
 */
export interface ComparisonStatistics {
  userId: ID;
  totalComparisons: number;
  activeComparisons: number;
  byType: Record<ProductComparisonType, number>;
  byStatus: Record<ProductComparisonStatus, number>;
  byMode: Record<ProductComparisonMode, number>;
  byCriteria: Record<ProductComparisonCriteria, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averageProductsPerComparison: number;
  maxProductsPerComparison: number;
  minProductsPerComparison: number;
  mostFrequentType: ProductComparisonType;
  mostFrequentStatus: ProductComparisonStatus;
  mostFrequentMode: ProductComparisonMode;
  mostFrequentCriteria: ProductComparisonCriteria;
}

/**
 * Comparison summary
 */
export interface ComparisonSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalComparisons: number;
  active: number;
  byType: Record<ProductComparisonType, number>;
  byStatus: Record<ProductComparisonStatus, number>;
  byMode: Record<ProductComparisonMode, number>;
  byCriteria: Record<ProductComparisonCriteria, number>;
  comparisonTrend: {
    date: Date;
    total: number;
    active: number;
  }[];
  topTypes: {
    type: ProductComparisonType;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: ProductComparisonStatus;
    count: number;
    label: string;
  }[];
  topModes: {
    mode: ProductComparisonMode;
    count: number;
    label: string;
  }[];
  topCriteria: {
    criteria: ProductComparisonCriteria;
    count: number;
    label: string;
  }[];
}

/**
 * Comparison configuration
 */
export interface ComparisonConfiguration {
  enabled: boolean;
  defaultType: ProductComparisonType;
  defaultMode: ProductComparisonMode;
  defaultCriteria: ProductComparisonCriteria[];
  maxProducts: number;
  minProducts: number;
  allowMultipleComparisons: boolean;
  allowAnonymous: boolean;
  requireLogin: boolean;
  saveComparisonHistory: boolean;
  notificationOnCreate: boolean;
  notificationOnUpdate: boolean;
  notificationOnDelete: boolean;
  alertConfig?: ComparisonAlertConfig;
}

/**
 * Comparison alert configuration
 */
export interface ComparisonAlertConfig {
  enabled: boolean;
  duplicateComparisonAlert: boolean;
  maxProductsAlert: boolean;
  inactiveComparisonAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Comparison history
 */
export interface ComparisonHistory extends BaseEntity, Timestamp {
  id: ID;
  comparisonId: ID;
  userId: ID;
  action:
    | 'create'
    | 'update'
    | 'add_product'
    | 'remove_product'
    | 'activate'
    | 'deactivate'
    | 'delete'
    | 'restore';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Comparison validation
 */
export interface ComparisonValidation {
  isValid: boolean;
  comparisonId: ID;
  userId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Comparison result
 */
export interface ComparisonResult extends BaseEntity, Timestamp {
  id: ID;
  comparisonId: ID;
  userId: ID;
  productId: ID;
  scores: {
    criteria: ProductComparisonCriteria;
    score: number;
    rank: number;
  }[];
  totalScore: number;
  rank: number;
  metadata?: Metadata;
}

/**
 * Comparison export
 */
export interface ComparisonExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: ComparisonFilter;
  filename: string;
  fileSize?: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  completedAt?: Date;
  downloadUrl?: string;
  metadata?: Metadata;
}

/**
 * Comparison share
 */
export interface ComparisonShare extends BaseEntity, Timestamp {
  id: ID;
  comparisonId: ID;
  userId: ID;
  shareToken: string;
  expiresAt: Date;
  views: number;
  metadata?: Metadata;
}

// ============================================================
// Re-export Everything
// ============================================================

export {
  // Comparison
  PRODUCTCOMPARISON,
  ProductComparisonType,
  ProductComparisonStatus,
  ProductComparisonMode,
  ProductComparisonCriteria,
  ProductComparisonDefault,
  ProductComparisonLimit,
  productcomparisonGetTypeLabel,
  productcomparisonGetStatusLabel,
  productcomparisonGetModeLabel,
  productcomparisonGetCriteriaLabel,
  productcomparisonIsActive,
  productcomparisonGetMaxProducts,
  productcomparisonGetMinProducts,
};
