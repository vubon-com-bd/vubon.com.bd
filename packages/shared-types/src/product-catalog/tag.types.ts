/**
 * Tag Types
 * Type definitions for product tags based on shared-constants
 * @module TagTypes
 */

import { BaseEntity, Timestamp, Metadata, ID, Slug } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants product
// ============================================================
import {
  // Product Core
  ProductStatus,
} from '@vubon/shared-constants';

// ============================================================
// Tag Extended Types
// ============================================================

/**
 * Product tag
 */
export interface ProductTag extends BaseEntity, Timestamp {
  id: ID;
  name: string;
  slug: Slug;
  description?: string;
  status: ProductStatus;
  color?: string;
  icon?: string;
  isActive: boolean;
  productCount: number;
  metadata?: Metadata;
}

/**
 * Tag filter
 */
export interface TagFilter {
  ids?: ID[];
  statuses?: ProductStatus[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isActive?: boolean;
  minProductCount?: number;
  maxProductCount?: number;
  searchTerm?: string;
  slug?: string;
}

/**
 * Tag statistics
 */
export interface TagStatistics {
  totalTags: number;
  activeTags: number;
  byStatus: Record<ProductStatus, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averageProductCount: number;
  maxProductCount: number;
  minProductCount: number;
  tagsWithProducts: number;
  tagsWithoutProducts: number;
  mostUsedTag: {
    id: ID;
    name: string;
    productCount: number;
  };
  leastUsedTag: {
    id: ID;
    name: string;
    productCount: number;
  };
}

/**
 * Tag summary
 */
export interface TagSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalTags: number;
  active: number;
  byStatus: Record<ProductStatus, number>;
  tagTrend: {
    date: Date;
    total: number;
    active: number;
  }[];
  topTags: {
    tag: ProductTag;
    productCount: number;
  }[];
  tagUsage: {
    tag: ProductTag;
    productIds: ID[];
  }[];
}

/**
 * Tag configuration
 */
export interface TagConfiguration {
  enabled: boolean;
  requireUniqueName: boolean;
  requireUniqueSlug: boolean;
  autoGenerateSlug: boolean;
  maxTagsPerProduct: number;
  allowCustomColors: boolean;
  allowCustomIcons: boolean;
  notificationOnCreate: boolean;
  notificationOnUpdate: boolean;
  notificationOnDelete: boolean;
  alertConfig?: TagAlertConfig;
}

/**
 * Tag alert configuration
 */
export interface TagAlertConfig {
  enabled: boolean;
  duplicateNameAlert: boolean;
  inactiveTagAlert: boolean;
  orphanTagAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Tag history
 */
export interface TagHistory extends BaseEntity, Timestamp {
  id: ID;
  tagId: ID;
  action: 'create' | 'update' | 'activate' | 'deactivate' | 'delete' | 'restore';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Tag validation
 */
export interface TagValidation {
  isValid: boolean;
  tagId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Tag assignment
 */
export interface TagAssignment extends BaseEntity, Timestamp {
  id: ID;
  tagId: ID;
  productId: ID;
  assignedAt: Date;
  assignedBy?: ID;
  metadata?: Metadata;
}

/**
 * Tag bulk operation
 */
export interface TagBulkOperation extends BaseEntity, Timestamp {
  id: ID;
  operation: 'assign' | 'unassign' | 'replace';
  tagIds: ID[];
  productIds: ID[];
  status: 'pending' | 'processing' | 'completed' | 'failed';
  totalItems: number;
  processedItems: number;
  failedItems: number;
  errors?: string[];
  startedAt?: Date;
  completedAt?: Date;
  metadata?: Metadata;
}

/**
 * Tag export
 */
export interface TagExport extends BaseEntity, Timestamp {
  id: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: TagFilter;
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
  // Product Core
  ProductStatus,
};
