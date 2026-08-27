/**
 * Bundle Deal Types
 * Type definitions for bundle deals based on shared-constants
 * @module BundleDealTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants flash-sales bundle-deal
// ============================================================
import {
  // Bundle Deal Core
  BUNDLE_DEAL,
  BundleDealType,
  BundleDealCategory,
  BundleDealComposition,
  BundleDealPricing,
  BundleDealRule,
  flashsalesBundleDealGetTypeLabel,
  flashsalesBundleDealGetCategoryLabel,
  flashsalesBundleDealGetCompositionLabel,
  flashsalesBundleDealGetPricingLabel,
  flashsalesBundleDealGetRuleLabel,
  flashsalesBundleDealIsValidType,
  flashsalesBundleDealIsValidCategory,
  flashsalesBundleDealGetDefaultMaxItems,
  flashsalesBundleDealGetDefaultMinItems,
  flashsalesBundleDealGetDefaultDiscount,
  flashsalesBundleDealGetMaxDiscount,
  flashsalesBundleDealGetMaxItemsLimit,
  // Bundle Deal Type
  BUNDLE_DEAL_TYPE,
  BundleDealTypeCategory,
  BundleDealTypeComplexity,
  BundleDealTypeScope,
  BundleDealTypeAudience,
  BundleDealTypeFrequency,
  BundleDealTypeTrigger,
  BundleDealTypeDuration,
  flashsalesBundleDealTypeGetCategoryLabel,
  flashsalesBundleDealTypeGetComplexityLabel,
  flashsalesBundleDealTypeGetScopeLabel,
  flashsalesBundleDealTypeGetAudienceLabel,
  flashsalesBundleDealTypeGetFrequencyLabel,
  flashsalesBundleDealTypeGetTriggerLabel,
  flashsalesBundleDealTypeGetDurationLabel,
  flashsalesBundleDealTypeGetDurationHours,
  flashsalesBundleDealTypeIsValidCategory,
  flashsalesBundleDealTypeIsValidAudience,
  // Bundle Deal Status
  BUNDLE_DEAL_STATUS,
  BundleDealStatusType,
  BundleDealStatusCategory,
  BundleDealStatusColor,
  BundleDealStatusPriority,
  flashsalesBundleDealStatusGetLabel,
  flashsalesBundleDealStatusGetCategory,
  flashsalesBundleDealStatusGetColor,
  flashsalesBundleDealStatusGetPriority,
  flashsalesBundleDealStatusIsActive,
  flashsalesBundleDealStatusIsScheduled,
  flashsalesBundleDealStatusIsComplete,
  flashsalesBundleDealStatusCanTransitionTo,
  flashsalesBundleDealStatusGetAvailableTransitions,
  flashsalesBundleDealStatusCanStart,
  flashsalesBundleDealStatusCanPause,
  flashsalesBundleDealStatusCanResume,
  flashsalesBundleDealStatusCanEnd,
  flashsalesBundleDealStatusCanCancel,
  flashsalesBundleDealStatusIsValid,
} from '@vubon/shared-constants';

// ============================================================
// Bundle Deal Extended Types
// ============================================================

/**
 * Bundle Deal Item
 */
export interface BundleDealItem extends BaseEntity, Timestamp {
  id: ID;
  bundleDealId: ID;
  productId: ID;
  variantId?: ID;
  quantity: number;
  discountPercentage: number;
  fixedAmount?: number;
  price?: number;
  salePrice?: number;
  metadata?: Metadata;
}

/**
 * Bundle Deal
 */
export interface BundleDeal extends BaseEntity, Timestamp {
  id: ID;
  flashSaleId: ID;
  dealId: ID;
  name: string;
  description?: string;
  type: BundleDealType;
  category: BundleDealCategory;
  composition: BundleDealComposition;
  pricing: BundleDealPricing;
  rule: BundleDealRule;
  status: BundleDealStatusType;
  items: BundleDealItem[];
  minItems: number;
  maxItems: number;
  discount: number;
  maxDiscount: number;
  isActive: boolean;
  isScheduled: boolean;
  isComplete: boolean;
  isValid: boolean;
  startsAt: Date;
  expiresAt: Date;
  metadata?: Metadata;
}

/**
 * Bundle Deal Filter
 */
export interface BundleDealFilter {
  ids?: ID[];
  flashSaleIds?: ID[];
  dealIds?: ID[];
  types?: BundleDealType[];
  categories?: BundleDealCategory[];
  compositions?: BundleDealComposition[];
  pricings?: BundleDealPricing[];
  rules?: BundleDealRule[];
  statuses?: BundleDealStatusType[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isActive?: boolean;
  isScheduled?: boolean;
  isComplete?: boolean;
  minDiscount?: number;
  maxDiscount?: number;
  minItems?: number;
  maxItems?: number;
  searchTerm?: string;
}

/**
 * Bundle Deal Statistics
 */
export interface BundleDealStatistics {
  flashSaleId: ID;
  totalBundleDeals: number;
  activeBundleDeals: number;
  scheduledBundleDeals: number;
  completeBundleDeals: number;
  byType: Record<BundleDealType, number>;
  byCategory: Record<BundleDealCategory, number>;
  byComposition: Record<BundleDealComposition, number>;
  byPricing: Record<BundleDealPricing, number>;
  byRule: Record<BundleDealRule, number>;
  byStatus: Record<BundleDealStatusType, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  totalItems: number;
  averageItems: number;
  maxItems: number;
  minItems: number;
  averageDiscount: number;
  maxDiscount: number;
  minDiscount: number;
  mostFrequentType: BundleDealType;
  mostFrequentCategory: BundleDealCategory;
  mostFrequentStatus: BundleDealStatusType;
}

/**
 * Bundle Deal Summary
 */
export interface BundleDealSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalBundleDeals: number;
  active: number;
  scheduled: number;
  complete: number;
  byType: Record<BundleDealType, number>;
  byCategory: Record<BundleDealCategory, number>;
  byComposition: Record<BundleDealComposition, number>;
  byPricing: Record<BundleDealPricing, number>;
  byRule: Record<BundleDealRule, number>;
  byStatus: Record<BundleDealStatusType, number>;
  bundleDealTrend: {
    date: Date;
    total: number;
    active: number;
    complete: number;
  }[];
  topTypes: {
    type: BundleDealType;
    count: number;
    label: string;
  }[];
  topCategories: {
    category: BundleDealCategory;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: BundleDealStatusType;
    count: number;
    label: string;
  }[];
  itemMetrics: {
    totalItems: number;
    averageItems: number;
    maxItems: number;
    minItems: number;
    averageDiscount: number;
    maxDiscount: number;
    minDiscount: number;
  };
}

/**
 * Bundle Deal Configuration
 */
export interface BundleDealConfiguration {
  enabled: boolean;
  defaultType: BundleDealType;
  defaultCategory: BundleDealCategory;
  defaultComposition: BundleDealComposition;
  defaultPricing: BundleDealPricing;
  defaultRule: BundleDealRule;
  defaultStatus: BundleDealStatusType;
  defaultMinItems: number;
  defaultMaxItems: number;
  defaultDiscount: number;
  maxDiscount: number;
  maxItemsLimit: number;
  requireApproval: boolean;
  allowMultipleItems: boolean;
  allowMixedProducts: boolean;
  autoStart: boolean;
  notificationOnCreate: boolean;
  notificationOnStart: boolean;
  notificationOnPause: boolean;
  notificationOnResume: boolean;
  notificationOnEnd: boolean;
  notificationOnCancel: boolean;
  alertConfig?: BundleDealAlertConfig;
}

/**
 * Bundle Deal Alert Configuration
 */
export interface BundleDealAlertConfig {
  enabled: boolean;
  highDiscountAlert: boolean;
  highDiscountThreshold: number;
  lowItemCountAlert: boolean;
  lowItemCountThreshold: number;
  highDemandAlert: boolean;
  highDemandThreshold: number;
  lowStockAlert: boolean;
  lowStockThreshold: number;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Bundle Deal History
 */
export interface BundleDealHistory extends BaseEntity, Timestamp {
  id: ID;
  bundleDealId: ID;
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
    | 'add_item'
    | 'remove_item'
    | 'update_item';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Bundle Deal Validation
 */
export interface BundleDealValidation {
  isValid: boolean;
  bundleDealId: ID;
  flashSaleId: ID;
  dealId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Bundle Deal Export
 */
export interface BundleDealExport extends BaseEntity, Timestamp {
  id: ID;
  flashSaleId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: BundleDealFilter;
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
  // Bundle Deal Core
  BUNDLE_DEAL,
  BundleDealType,
  BundleDealCategory,
  BundleDealComposition,
  BundleDealPricing,
  BundleDealRule,
  flashsalesBundleDealGetTypeLabel,
  flashsalesBundleDealGetCategoryLabel,
  flashsalesBundleDealGetCompositionLabel,
  flashsalesBundleDealGetPricingLabel,
  flashsalesBundleDealGetRuleLabel,
  flashsalesBundleDealIsValidType,
  flashsalesBundleDealIsValidCategory,
  flashsalesBundleDealGetDefaultMaxItems,
  flashsalesBundleDealGetDefaultMinItems,
  flashsalesBundleDealGetDefaultDiscount,
  flashsalesBundleDealGetMaxDiscount,
  flashsalesBundleDealGetMaxItemsLimit,
  // Bundle Deal Type
  BUNDLE_DEAL_TYPE,
  BundleDealTypeCategory,
  BundleDealTypeComplexity,
  BundleDealTypeScope,
  BundleDealTypeAudience,
  BundleDealTypeFrequency,
  BundleDealTypeTrigger,
  BundleDealTypeDuration,
  flashsalesBundleDealTypeGetCategoryLabel,
  flashsalesBundleDealTypeGetComplexityLabel,
  flashsalesBundleDealTypeGetScopeLabel,
  flashsalesBundleDealTypeGetAudienceLabel,
  flashsalesBundleDealTypeGetFrequencyLabel,
  flashsalesBundleDealTypeGetTriggerLabel,
  flashsalesBundleDealTypeGetDurationLabel,
  flashsalesBundleDealTypeGetDurationHours,
  flashsalesBundleDealTypeIsValidCategory,
  flashsalesBundleDealTypeIsValidAudience,
  // Bundle Deal Status
  BUNDLE_DEAL_STATUS,
  BundleDealStatusType,
  BundleDealStatusCategory,
  BundleDealStatusColor,
  BundleDealStatusPriority,
  flashsalesBundleDealStatusGetLabel,
  flashsalesBundleDealStatusGetCategory,
  flashsalesBundleDealStatusGetColor,
  flashsalesBundleDealStatusGetPriority,
  flashsalesBundleDealStatusIsActive,
  flashsalesBundleDealStatusIsScheduled,
  flashsalesBundleDealStatusIsComplete,
  flashsalesBundleDealStatusCanTransitionTo,
  flashsalesBundleDealStatusGetAvailableTransitions,
  flashsalesBundleDealStatusCanStart,
  flashsalesBundleDealStatusCanPause,
  flashsalesBundleDealStatusCanResume,
  flashsalesBundleDealStatusCanEnd,
  flashsalesBundleDealStatusCanCancel,
  flashsalesBundleDealStatusIsValid,
};
