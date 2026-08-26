/**
 * Collection Types
 * Type definitions for product collections based on shared-constants
 * @module CollectionTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import ProductCollection from product.types
// ============================================================
import type { ProductCollection } from './product.types';

// ============================================================
// Import from shared-constants product
// ============================================================
import {
  // Collection
  PRODUCTCOLLECTION,
  ProductCollectionType,
  ProductCollectionStatus,
  ProductCollectionVisibility,
  ProductCollectionCondition,
  ProductCollectionDefault,
  ProductCollectionLimit,
  productcollectionGetTypeLabel,
  productcollectionGetStatusLabel,
  productcollectionGetVisibilityLabel,
  productcollectionGetConditionLabel,
  productcollectionIsActive,
  productcollectionIsManual,
  productcollectionIsAutomated,
  productcollectionGetDefaultPageSize,
  productcollectionGetMaxPageSize,
  productcollectionGetMaxProducts,
} from '@vubon/shared-constants';

// ============================================================
// Collection Extended Types (শুধুমাত্র নতুন টাইপ)
// ============================================================

/**
 * Collection filter
 */
export interface CollectionFilter {
  ids?: ID[];
  types?: ProductCollectionType[];
  statuses?: ProductCollectionStatus[];
  visibilities?: ProductCollectionVisibility[];
  conditions?: ProductCollectionCondition[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isActive?: boolean;
  isManual?: boolean;
  isAutomated?: boolean;
  minProductCount?: number;
  maxProductCount?: number;
  searchTerm?: string;
  slug?: string;
}

/**
 * Collection statistics
 */
export interface CollectionStatistics {
  totalCollections: number;
  activeCollections: number;
  manualCollections: number;
  automatedCollections: number;
  byType: Record<ProductCollectionType, number>;
  byStatus: Record<ProductCollectionStatus, number>;
  byVisibility: Record<ProductCollectionVisibility, number>;
  byCondition: Record<ProductCollectionCondition, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averageProductCount: number;
  maxProductCount: number;
  minProductCount: number;
  collectionsWithProducts: number;
  collectionsWithoutProducts: number;
  mostFrequentType: ProductCollectionType;
  mostFrequentStatus: ProductCollectionStatus;
  mostFrequentVisibility: ProductCollectionVisibility;
}

/**
 * Collection summary
 */
export interface CollectionSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalCollections: number;
  active: number;
  manual: number;
  automated: number;
  byType: Record<ProductCollectionType, number>;
  byStatus: Record<ProductCollectionStatus, number>;
  byVisibility: Record<ProductCollectionVisibility, number>;
  byCondition: Record<ProductCollectionCondition, number>;
  collectionTrend: {
    date: Date;
    total: number;
    active: number;
  }[];
  topTypes: {
    type: ProductCollectionType;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: ProductCollectionStatus;
    count: number;
    label: string;
  }[];
  topVisibilities: {
    visibility: ProductCollectionVisibility;
    count: number;
    label: string;
  }[];
  topCollections: {
    collection: ProductCollection;
    productCount: number;
  }[];
}

/**
 * Collection configuration
 */
export interface CollectionConfiguration {
  enabled: boolean;
  defaultType: ProductCollectionType;
  defaultVisibility: ProductCollectionVisibility;
  defaultPageSize: number;
  maxPageSize: number;
  maxProductsPerCollection: number;
  requireUniqueName: boolean;
  requireUniqueSlug: boolean;
  autoGenerateSlug: boolean;
  allowEmptyCollections: boolean;
  allowDuplicateProducts: boolean;
  allowAutomatedCollections: boolean;
  automatedUpdateInterval: number;
  notificationOnCreate: boolean;
  notificationOnUpdate: boolean;
  notificationOnDelete: boolean;
  alertConfig?: CollectionAlertConfig;
}

/**
 * Collection alert configuration
 */
export interface CollectionAlertConfig {
  enabled: boolean;
  duplicateNameAlert: boolean;
  inactiveCollectionAlert: boolean;
  emptyCollectionAlert: boolean;
  duplicateProductAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Collection history
 */
export interface CollectionHistory extends BaseEntity, Timestamp {
  id: ID;
  collectionId: ID;
  action:
    | 'create'
    | 'update'
    | 'activate'
    | 'deactivate'
    | 'delete'
    | 'restore'
    | 'product_add'
    | 'product_remove';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Collection validation
 */
export interface CollectionValidation {
  isValid: boolean;
  collectionId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Collection product
 */
export interface CollectionProduct extends BaseEntity, Timestamp {
  id: ID;
  collectionId: ID;
  productId: ID;
  position: number;
  addedAt: Date;
  addedBy?: ID;
  metadata?: Metadata;
}

/**
 * Collection rule
 */
export interface CollectionRule extends BaseEntity, Timestamp {
  id: ID;
  collectionId: ID;
  field: string;
  operator:
    | 'eq'
    | 'ne'
    | 'gt'
    | 'gte'
    | 'lt'
    | 'lte'
    | 'in'
    | 'nin'
    | 'contains'
    | 'startsWith'
    | 'endsWith'
    | 'between';
  value: unknown;
  condition: 'and' | 'or';
  priority: number;
  isActive: boolean;
  metadata?: Metadata;
}

/**
 * Collection export
 */
export interface CollectionExport extends BaseEntity, Timestamp {
  id: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: CollectionFilter;
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
  // Collection
  PRODUCTCOLLECTION,
  ProductCollectionType,
  ProductCollectionStatus,
  ProductCollectionVisibility,
  ProductCollectionCondition,
  ProductCollectionDefault,
  ProductCollectionLimit,
  productcollectionGetTypeLabel,
  productcollectionGetStatusLabel,
  productcollectionGetVisibilityLabel,
  productcollectionGetConditionLabel,
  productcollectionIsActive,
  productcollectionIsManual,
  productcollectionIsAutomated,
  productcollectionGetDefaultPageSize,
  productcollectionGetMaxPageSize,
  productcollectionGetMaxProducts,
};
