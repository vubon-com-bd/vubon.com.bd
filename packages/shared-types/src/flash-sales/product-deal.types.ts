/**
 * Product Deal Types
 * Type definitions for product deals based on shared-constants
 * @module ProductDealTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants flash-sales product-deal
// ============================================================
import {
  // Product Deal Core
  PRODUCT_DEAL,
  ProductDealType,
  ProductDealCategory,
  ProductDealScope,
  ProductDealApplication,
  ProductDealCondition,
  flashsalesProductDealGetTypeLabel,
  flashsalesProductDealGetCategoryLabel,
  flashsalesProductDealGetScopeLabel,
  flashsalesProductDealGetApplicationLabel,
  flashsalesProductDealGetConditionLabel,
  flashsalesProductDealIsValidType,
  flashsalesProductDealIsValidScope,
  flashsalesProductDealGetDefaultMaxDiscount,
  flashsalesProductDealGetDefaultMaxFixedAmount,
  flashsalesProductDealGetMaxProducts,
  flashsalesProductDealGetMaxVariants,
  // Product Deal Status
  PRODUCT_DEAL_STATUS,
  ProductDealStatusType,
  ProductDealStatusCategory,
  ProductDealStatusColor,
  ProductDealStatusPriority,
  flashsalesProductDealStatusGetLabel,
  flashsalesProductDealStatusGetCategory,
  flashsalesProductDealStatusGetColor,
  flashsalesProductDealStatusGetPriority,
  flashsalesProductDealStatusIsActive,
  flashsalesProductDealStatusIsScheduled,
  flashsalesProductDealStatusIsComplete,
  flashsalesProductDealStatusCanTransitionTo,
  flashsalesProductDealStatusGetAvailableTransitions,
  flashsalesProductDealStatusCanStart,
  flashsalesProductDealStatusCanPause,
  flashsalesProductDealStatusCanResume,
  flashsalesProductDealStatusCanEnd,
  flashsalesProductDealStatusCanCancel,
  flashsalesProductDealStatusIsValid,
} from '@vubon/shared-constants';

// ============================================================
// Product Deal Extended Types
// ============================================================

/**
 * Product Deal Product
 */
export interface ProductDealProduct extends BaseEntity, Timestamp {
  id: ID;
  productDealId: ID;
  productId: ID;
  variantId?: ID;
  discountPercentage: number;
  fixedAmount?: number;
  maxDiscount?: number;
  minQuantity?: number;
  maxQuantity?: number;
  price?: number;
  salePrice?: number;
  metadata?: Metadata;
}

/**
 * Product Deal
 */
export interface ProductDeal extends BaseEntity, Timestamp {
  id: ID;
  flashSaleId: ID;
  dealId: ID;
  type: ProductDealType;
  category: ProductDealCategory;
  scope: ProductDealScope;
  application: ProductDealApplication;
  condition: ProductDealCondition;
  status: ProductDealStatusType;
  products: ProductDealProduct[];
  maxDiscount: number;
  maxFixedAmount: number;
  maxProducts: number;
  maxVariants: number;
  isActive: boolean;
  isScheduled: boolean;
  isComplete: boolean;
  isValid: boolean;
  startsAt: Date;
  expiresAt: Date;
  metadata?: Metadata;
}

/**
 * Product Deal Filter
 */
export interface ProductDealFilter {
  ids?: ID[];
  flashSaleIds?: ID[];
  dealIds?: ID[];
  types?: ProductDealType[];
  categories?: ProductDealCategory[];
  scopes?: ProductDealScope[];
  applications?: ProductDealApplication[];
  conditions?: ProductDealCondition[];
  statuses?: ProductDealStatusType[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isActive?: boolean;
  isScheduled?: boolean;
  isComplete?: boolean;
  minDiscount?: number;
  maxDiscount?: number;
  searchTerm?: string;
}

/**
 * Product Deal Statistics
 */
export interface ProductDealStatistics {
  flashSaleId: ID;
  totalProductDeals: number;
  activeProductDeals: number;
  scheduledProductDeals: number;
  completeProductDeals: number;
  byType: Record<ProductDealType, number>;
  byCategory: Record<ProductDealCategory, number>;
  byScope: Record<ProductDealScope, number>;
  byApplication: Record<ProductDealApplication, number>;
  byCondition: Record<ProductDealCondition, number>;
  byStatus: Record<ProductDealStatusType, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  totalProducts: number;
  totalVariants: number;
  averageDiscount: number;
  maxDiscount: number;
  minDiscount: number;
  averageFixedAmount: number;
  maxFixedAmount: number;
  minFixedAmount: number;
  mostFrequentType: ProductDealType;
  mostFrequentCategory: ProductDealCategory;
  mostFrequentStatus: ProductDealStatusType;
}

/**
 * Product Deal Summary
 */
export interface ProductDealSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalProductDeals: number;
  active: number;
  scheduled: number;
  complete: number;
  byType: Record<ProductDealType, number>;
  byCategory: Record<ProductDealCategory, number>;
  byScope: Record<ProductDealScope, number>;
  byApplication: Record<ProductDealApplication, number>;
  byCondition: Record<ProductDealCondition, number>;
  byStatus: Record<ProductDealStatusType, number>;
  productDealTrend: {
    date: Date;
    total: number;
    active: number;
    complete: number;
  }[];
  topTypes: {
    type: ProductDealType;
    count: number;
    label: string;
  }[];
  topCategories: {
    category: ProductDealCategory;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: ProductDealStatusType;
    count: number;
    label: string;
  }[];
  productMetrics: {
    totalProducts: number;
    totalVariants: number;
    averageDiscount: number;
    maxDiscount: number;
    minDiscount: number;
    averageFixedAmount: number;
    maxFixedAmount: number;
    minFixedAmount: number;
  };
}

/**
 * Product Deal Configuration
 */
export interface ProductDealConfiguration {
  enabled: boolean;
  defaultType: ProductDealType;
  defaultCategory: ProductDealCategory;
  defaultScope: ProductDealScope;
  defaultApplication: ProductDealApplication;
  defaultCondition: ProductDealCondition;
  defaultStatus: ProductDealStatusType;
  maxDiscount: number;
  maxFixedAmount: number;
  maxProducts: number;
  maxVariants: number;
  requireApproval: boolean;
  allowMultipleProducts: boolean;
  allowMultipleVariants: boolean;
  autoStart: boolean;
  notificationOnCreate: boolean;
  notificationOnStart: boolean;
  notificationOnPause: boolean;
  notificationOnResume: boolean;
  notificationOnEnd: boolean;
  notificationOnCancel: boolean;
  alertConfig?: ProductDealAlertConfig;
}

/**
 * Product Deal Alert Configuration
 */
export interface ProductDealAlertConfig {
  enabled: boolean;
  highDiscountAlert: boolean;
  highDiscountThreshold: number;
  lowStockAlert: boolean;
  lowStockThreshold: number;
  highDemandAlert: boolean;
  highDemandThreshold: number;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Product Deal History
 */
export interface ProductDealHistory extends BaseEntity, Timestamp {
  id: ID;
  productDealId: ID;
  flashSaleId: ID;
  dealId: ID;
  action:
    | 'create'
    | 'update'
    | 'start'
    | 'pause'
    | 'resume'
    | 'end'
    | 'cancel'
    | 'delete'
    | 'restore'
    | 'add_product'
    | 'remove_product';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Product Deal Validation
 */
export interface ProductDealValidation {
  isValid: boolean;
  productDealId: ID;
  flashSaleId: ID;
  dealId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Product Deal Export
 */
export interface ProductDealExport extends BaseEntity, Timestamp {
  id: ID;
  flashSaleId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: ProductDealFilter;
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
  // Product Deal Core
  PRODUCT_DEAL,
  ProductDealType,
  ProductDealCategory,
  ProductDealScope,
  ProductDealApplication,
  ProductDealCondition,
  flashsalesProductDealGetTypeLabel,
  flashsalesProductDealGetCategoryLabel,
  flashsalesProductDealGetScopeLabel,
  flashsalesProductDealGetApplicationLabel,
  flashsalesProductDealGetConditionLabel,
  flashsalesProductDealIsValidType,
  flashsalesProductDealIsValidScope,
  flashsalesProductDealGetDefaultMaxDiscount,
  flashsalesProductDealGetDefaultMaxFixedAmount,
  flashsalesProductDealGetMaxProducts,
  flashsalesProductDealGetMaxVariants,
  // Product Deal Status
  PRODUCT_DEAL_STATUS,
  ProductDealStatusType,
  ProductDealStatusCategory,
  ProductDealStatusColor,
  ProductDealStatusPriority,
  flashsalesProductDealStatusGetLabel,
  flashsalesProductDealStatusGetCategory,
  flashsalesProductDealStatusGetColor,
  flashsalesProductDealStatusGetPriority,
  flashsalesProductDealStatusIsActive,
  flashsalesProductDealStatusIsScheduled,
  flashsalesProductDealStatusIsComplete,
  flashsalesProductDealStatusCanTransitionTo,
  flashsalesProductDealStatusGetAvailableTransitions,
  flashsalesProductDealStatusCanStart,
  flashsalesProductDealStatusCanPause,
  flashsalesProductDealStatusCanResume,
  flashsalesProductDealStatusCanEnd,
  flashsalesProductDealStatusCanCancel,
  flashsalesProductDealStatusIsValid,
};
