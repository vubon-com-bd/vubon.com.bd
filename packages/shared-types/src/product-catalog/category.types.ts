/**
 * Category Types
 * Type definitions for product categories based on shared-constants
 * @module CategoryTypes
 */

import { BaseEntity, Timestamp, Metadata, ID, Slug } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants product
// ============================================================
import {
  // Category
  PRODUCTCATEGORY,
  ProductCategoryType,
  ProductCategoryStatus,
  ProductCategoryVisibility,
  ProductCategoryDefault,
  ProductCategoryLimit,
  productcategoryGetTypeLabel,
  productcategoryGetStatusLabel,
  productcategoryGetVisibilityLabel,
  productcategoryIsActive,
  productcategoryGetMaxDepth,
} from '@vubon/shared-constants';

// ============================================================
// Category Extended Types
// ============================================================

/**
 * Product category
 */
export interface ProductCategory extends BaseEntity, Timestamp {
  id: ID;
  parentId?: ID;
  type: ProductCategoryType;
  status: ProductCategoryStatus;
  visibility: ProductCategoryVisibility;
  name: string;
  slug: Slug;
  description?: string;
  image?: string;
  icon?: string;
  order: number;
  isActive: boolean;
  path: string[];
  depth: number;
  children?: ProductCategory[];
  metadata?: Metadata;
}

/**
 * Category filter
 */
export interface CategoryFilter {
  ids?: ID[];
  parentIds?: ID[];
  types?: ProductCategoryType[];
  statuses?: ProductCategoryStatus[];
  visibilities?: ProductCategoryVisibility[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isActive?: boolean;
  hasChildren?: boolean;
  hasParent?: boolean;
  depth?: number;
  minDepth?: number;
  maxDepth?: number;
  searchTerm?: string;
  slug?: string;
}

/**
 * Category statistics
 */
export interface CategoryStatistics {
  totalCategories: number;
  activeCategories: number;
  rootCategories: number;
  leafCategories: number;
  byType: Record<ProductCategoryType, number>;
  byStatus: Record<ProductCategoryStatus, number>;
  byVisibility: Record<ProductCategoryVisibility, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averageDepth: number;
  maxDepth: number;
  minDepth: number;
  categoriesWithChildren: number;
  categoriesWithoutChildren: number;
  mostFrequentType: ProductCategoryType;
  mostFrequentStatus: ProductCategoryStatus;
}

/**
 * Category summary
 */
export interface CategorySummary {
  period: {
    start: Date;
    end: Date;
  };
  total: number;
  active: number;
  root: number;
  leaf: number;
  byType: Record<ProductCategoryType, number>;
  byStatus: Record<ProductCategoryStatus, number>;
  byVisibility: Record<ProductCategoryVisibility, number>;
  categoryTrend: {
    date: Date;
    total: number;
    active: number;
  }[];
  topTypes: {
    type: ProductCategoryType;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: ProductCategoryStatus;
    count: number;
    label: string;
  }[];
  depthDistribution: {
    depth: number;
    count: number;
  }[];
}

/**
 * Category configuration
 */
export interface CategoryConfiguration {
  enabled: boolean;
  defaultType: ProductCategoryType;
  defaultVisibility: ProductCategoryVisibility;
  maxDepth: number;
  allowMultipleParents: boolean;
  allowEmptyCategories: boolean;
  requireUniqueSlug: boolean;
  autoGenerateSlug: boolean;
  maxCategoriesPerLevel: number;
  notificationOnCreate: boolean;
  notificationOnUpdate: boolean;
  notificationOnDelete: boolean;
  alertConfig?: CategoryAlertConfig;
}

/**
 * Category alert configuration
 */
export interface CategoryAlertConfig {
  enabled: boolean;
  depthLimitAlert: boolean;
  duplicateSlugAlert: boolean;
  orphanCategoryAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Category history
 */
export interface CategoryHistory extends BaseEntity, Timestamp {
  id: ID;
  categoryId: ID;
  action:
    'create' | 'update' | 'move' | 'delete' | 'restore' | 'visibility_change' | 'status_change';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Category validation
 */
export interface CategoryValidation {
  isValid: boolean;
  categoryId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Category path
 */
export interface CategoryPath {
  categoryId: ID;
  path: ProductCategory[];
  depth: number;
  breadcrumbs: {
    name: string;
    slug: Slug;
    id: ID;
  }[];
}

/**
 * Category tree
 */
export interface CategoryTree {
  root: ProductCategory;
  children: CategoryTree[];
  depth: number;
  totalNodes: number;
}

/**
 * Category export
 */
export interface CategoryExport extends BaseEntity, Timestamp {
  id: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: CategoryFilter;
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
  // Category
  PRODUCTCATEGORY,
  ProductCategoryType,
  ProductCategoryStatus,
  ProductCategoryVisibility,
  ProductCategoryDefault,
  ProductCategoryLimit,
  productcategoryGetTypeLabel,
  productcategoryGetStatusLabel,
  productcategoryGetVisibilityLabel,
  productcategoryIsActive,
  productcategoryGetMaxDepth,
};
