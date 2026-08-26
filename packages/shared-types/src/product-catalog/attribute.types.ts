/**
 * Attribute Types
 * Type definitions for product attributes based on shared-constants
 * @module AttributeTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants product
// ============================================================
import {
  // Attribute
  PRODUCTATTRIBUTE,
  ProductAttributeType,
  ProductAttributeStatus,
  ProductAttributeVisibility,
  ProductAttributeDefault,
  ProductAttributeLimit,
  productattributeGetTypeLabel,
  productattributeGetStatusLabel,
  productattributeGetVisibilityLabel,
  productattributeIsActive,
  productattributeIsFilterable,
  productattributeIsSearchable,
} from '@vubon/shared-constants';

// ============================================================
// Attribute Extended Types
// ============================================================

/**
 * Attribute filter
 */
export interface AttributeFilter {
  ids?: ID[];
  productIds?: ID[];
  types?: ProductAttributeType[];
  statuses?: ProductAttributeStatus[];
  visibilities?: ProductAttributeVisibility[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isActive?: boolean;
  isFilterable?: boolean;
  isSearchable?: boolean;
  searchTerm?: string;
  name?: string;
}

/**
 * Attribute statistics
 */
export interface AttributeStatistics {
  productId: ID;
  totalAttributes: number;
  activeAttributes: number;
  filterableAttributes: number;
  searchableAttributes: number;
  byType: Record<ProductAttributeType, number>;
  byStatus: Record<ProductAttributeStatus, number>;
  byVisibility: Record<ProductAttributeVisibility, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  mostFrequentType: ProductAttributeType;
  mostFrequentStatus: ProductAttributeStatus;
  mostFrequentVisibility: ProductAttributeVisibility;
  uniqueAttributeNames: number;
}

/**
 * Attribute summary
 */
export interface AttributeSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalAttributes: number;
  active: number;
  filterable: number;
  searchable: number;
  byType: Record<ProductAttributeType, number>;
  byStatus: Record<ProductAttributeStatus, number>;
  byVisibility: Record<ProductAttributeVisibility, number>;
  attributeTrend: {
    date: Date;
    total: number;
    active: number;
  }[];
  topTypes: {
    type: ProductAttributeType;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: ProductAttributeStatus;
    count: number;
    label: string;
  }[];
  topVisibilities: {
    visibility: ProductAttributeVisibility;
    count: number;
    label: string;
  }[];
  topAttributes: {
    name: string;
    count: number;
  }[];
}

/**
 * Attribute configuration
 */
export interface AttributeConfiguration {
  enabled: boolean;
  defaultType: ProductAttributeType;
  defaultVisibility: ProductAttributeVisibility;
  requireName: boolean;
  requireValue: boolean;
  maxAttributesPerProduct: number;
  allowDuplicateNames: boolean;
  allowEmptyValues: boolean;
  autoCreateFilters: boolean;
  autoCreateSearch: boolean;
  notificationOnCreate: boolean;
  notificationOnUpdate: boolean;
  notificationOnDelete: boolean;
  alertConfig?: AttributeAlertConfig;
}

/**
 * Attribute alert configuration
 */
export interface AttributeAlertConfig {
  enabled: boolean;
  duplicateNameAlert: boolean;
  invalidValueAlert: boolean;
  maxLimitAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
  maxLimitThreshold: number;
}

/**
 * Attribute history
 */
export interface AttributeHistory extends BaseEntity, Timestamp {
  id: ID;
  attributeId: ID;
  productId: ID;
  action: 'create' | 'update' | 'activate' | 'deactivate' | 'delete' | 'restore';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Attribute validation
 */
export interface AttributeValidation {
  isValid: boolean;
  attributeId: ID;
  productId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Attribute value
 */
export interface AttributeValue extends BaseEntity, Timestamp {
  id: ID;
  attributeId: ID;
  productId: ID;
  value: string | number | boolean;
  label: string;
  order: number;
  isActive: boolean;
  metadata?: Metadata;
}

/**
 * Attribute option
 */
export interface AttributeOption extends BaseEntity, Timestamp {
  id: ID;
  attributeId: ID;
  name: string;
  label: string;
  value: string | number;
  order: number;
  isActive: boolean;
  metadata?: Metadata;
}

/**
 * Attribute export
 */
export interface AttributeExport extends BaseEntity, Timestamp {
  id: ID;
  productId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: AttributeFilter;
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
  // Attribute
  PRODUCTATTRIBUTE,
  ProductAttributeType,
  ProductAttributeStatus,
  ProductAttributeVisibility,
  ProductAttributeDefault,
  ProductAttributeLimit,
  productattributeGetTypeLabel,
  productattributeGetStatusLabel,
  productattributeGetVisibilityLabel,
  productattributeIsActive,
  productattributeIsFilterable,
  productattributeIsSearchable,
};
