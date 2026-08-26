/**
 * Variant Types
 * Type definitions for product variants based on shared-constants
 * @module VariantTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants product
// ============================================================
import {
  // Variant
  PRODUCTVARIANT,
  ProductVariantType,
  ProductVariantStatus,
  ProductVariantDefault,
  ProductVariantLimit,
  productvariantGetTypeLabel,
  productvariantGetStatusLabel,
  productvariantIsActive,
  productvariantIsInStock,
} from '@vubon/shared-constants';

// ============================================================
// Variant Extended Types
// ============================================================

/**
 * Product variant attribute
 */
export interface ProductVariantAttribute {
  name: string;
  value: string;
  metadata?: Metadata;
}

/**
 * Variant filter
 */
export interface VariantFilter {
  ids?: ID[];
  productIds?: ID[];
  types?: ProductVariantType[];
  statuses?: ProductVariantStatus[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isActive?: boolean;
  isInStock?: boolean;
  minPrice?: number;
  maxPrice?: number;
  minStock?: number;
  maxStock?: number;
  searchTerm?: string;
  sku?: string;
}

/**
 * Variant statistics
 */
export interface VariantStatistics {
  productId: ID;
  totalVariants: number;
  activeVariants: number;
  inStockVariants: number;
  byType: Record<ProductVariantType, number>;
  byStatus: Record<ProductVariantStatus, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averagePrice: number;
  maxPrice: number;
  minPrice: number;
  totalStock: number;
  averageStock: number;
  mostFrequentType: ProductVariantType;
  mostFrequentStatus: ProductVariantStatus;
  variantsWithImages: number;
  variantsWithAttributes: number;
}

/**
 * Variant summary
 */
export interface VariantSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalVariants: number;
  active: number;
  inStock: number;
  byType: Record<ProductVariantType, number>;
  byStatus: Record<ProductVariantStatus, number>;
  variantTrend: {
    date: Date;
    total: number;
    active: number;
    inStock: number;
  }[];
  topTypes: {
    type: ProductVariantType;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: ProductVariantStatus;
    count: number;
    label: string;
  }[];
  pricingSummary: {
    averagePrice: number;
    maxPrice: number;
    minPrice: number;
    totalValue: number;
  };
  inventorySummary: {
    totalStock: number;
    averageStock: number;
    maxStock: number;
    minStock: number;
  };
}

/**
 * Variant configuration
 */
export interface VariantConfiguration {
  enabled: boolean;
  defaultType: ProductVariantType;
  requireSku: boolean;
  requireName: boolean;
  requirePrice: boolean;
  requireStock: boolean;
  maxVariantsPerProduct: number;
  allowMultipleTypes: boolean;
  autoGenerateSku: boolean;
  skuPrefix: string;
  trackInventory: boolean;
  notificationOnLowStock: boolean;
  lowStockThreshold: number;
  notificationOnPriceChange: boolean;
  alertConfig?: VariantAlertConfig;
}

/**
 * Variant alert configuration
 */
export interface VariantAlertConfig {
  enabled: boolean;
  lowStockAlert: boolean;
  outOfStockAlert: boolean;
  priceChangeAlert: boolean;
  duplicateSkuAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
  lowStockThreshold: number;
}

/**
 * Variant history
 */
export interface VariantHistory extends BaseEntity, Timestamp {
  id: ID;
  variantId: ID;
  productId: ID;
  action:
    | 'create'
    | 'update'
    | 'activate'
    | 'deactivate'
    | 'stock_update'
    | 'price_update'
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
 * Variant validation
 */
export interface VariantValidation {
  isValid: boolean;
  variantId: ID;
  productId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Variant stock update
 */
export interface VariantStockUpdate extends BaseEntity, Timestamp {
  id: ID;
  variantId: ID;
  productId: ID;
  previousStock: number;
  newStock: number;
  quantityChange: number;
  reason: 'sale' | 'restock' | 'return' | 'adjustment' | 'reservation' | 'cancellation';
  referenceId?: string;
  metadata?: Metadata;
}

/**
 * Variant price update
 */
export interface VariantPriceUpdate extends BaseEntity, Timestamp {
  id: ID;
  variantId: ID;
  productId: ID;
  previousPrice: number;
  newPrice: number;
  previousComparePrice?: number;
  newComparePrice?: number;
  reason: 'promotion' | 'sale' | 'restock' | 'adjustment' | 'seasonal';
  metadata?: Metadata;
}

/**
 * Variant export
 */
export interface VariantExport extends BaseEntity, Timestamp {
  id: ID;
  productId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: VariantFilter;
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
  // Variant
  PRODUCTVARIANT,
  ProductVariantType,
  ProductVariantStatus,
  ProductVariantDefault,
  ProductVariantLimit,
  productvariantGetTypeLabel,
  productvariantGetStatusLabel,
  productvariantIsActive,
  productvariantIsInStock,
};
