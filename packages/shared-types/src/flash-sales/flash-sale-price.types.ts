/**
 * Flash Sale Price Types
 * Type definitions for flash sale pricing based on shared-constants
 * @module FlashSalePriceTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants flash-sales price
// ============================================================
import {
  // Price Core
  FLASH_SALE_PRICE,
  FlashSalePriceType,
  FlashSalePriceCategory,
  FlashSalePriceStatus,
  FlashSalePriceCalculation,
  FlashSalePriceCurrency,
  getFlashSalePriceTypeLabel,
  getFlashSalePriceCategoryLabel,
  getFlashSalePriceStatusLabel,
  getFlashSalePriceStatusColor,
  getFlashSalePriceCalculationLabel,
  getFlashSalePriceCurrencyLabel,
  isFlashSalePriceActive,
  isFlashSalePricePending,
  isFlashSalePriceApproved,
  isFlashSalePriceExpired,
  isFlashSalePriceValid,
  getFlashSalePriceDefaultType,
  getFlashSalePriceDefaultCurrency,
  getFlashSalePriceDefaultCalculation,
  getFlashSalePriceMaxDiscount,
  getFlashSalePriceMinDiscount,
  getFlashSalePriceMaxAmount,
  getFlashSalePriceMinAmount,
  getFlashSalePriceDefaultTiers,
  getFlashSalePriceMaxTiers,
  // Price Type
  FLASH_SALE_PRICE_TYPE_CATEGORIES,
  FlashSalePriceTypeDetail,
  FlashSalePriceTypeComplexity,
  FlashSalePriceTypeScope,
  FlashSalePriceTypePriority,
  getFlashSalePriceTypeCategory,
  getFlashSalePriceTypeComplexityLabel,
  getFlashSalePriceTypeScopeLabel,
  getFlashSalePriceTypePriorityLabel,
  getFlashSalePriceTypeMethodLabel,
  isFlashSalePriceTypeFixed,
  isFlashSalePriceTypePercentage,
  isFlashSalePriceTypeTiered,
  isFlashSalePriceTypeDynamic,
  isFlashSalePriceTypeBundle,
  isFlashSalePriceTypeVolume,
  isFlashSalePriceTypePromotional,
  isFlashSalePriceTypeClearance,
  isFlashSalePriceTypeComplex,
  isFlashSalePriceTypeSimple,
  getFlashSalePriceTypeComplexityScore,
  // Price Status
  FLASH_SALE_PRICE_STATUS,
  FLASH_SALE_PRICE_STATUS_LABELS_DETAIL,
  FLASH_SALE_PRICE_STATUS_COLORS_DETAIL,
  FLASH_SALE_PRICE_STATUS_CATEGORIES,
  FLASH_SALE_PRICE_STATUS_GROUPS,
  FlashSalePriceStatusType,
  FlashSalePriceStatusCategory,
  getFlashSalePriceStatusLabelDetail,
  getFlashSalePriceStatusColorDetail,
  getFlashSalePriceStatusCategory,
  isFlashSalePriceActiveStatus,
  isFlashSalePricePendingStatus,
  isFlashSalePriceApprovedStatus,
  isFlashSalePriceRejectedStatus,
  isFlashSalePriceExpiredStatus,
  isFlashSalePriceTerminalStatus,
  isFlashSalePriceValidStatus,
  isFlashSalePriceCanTransition,
  getFlashSalePriceAvailableTransitions,
  getFlashSalePriceStatusPriority,
  getFlashSalePriceStatusBadgeType,
} from '@vubon/shared-constants';

// ============================================================
// Flash Sale Price Extended Types
// ============================================================

/**
 * Flash Sale Price
 */
export interface FlashSalePrice extends BaseEntity, Timestamp {
  id: ID;
  flashSaleId: ID;
  productId: ID;
  variantId?: ID;
  type: FlashSalePriceType;
  category: FlashSalePriceCategory;
  status: FlashSalePriceStatusType;
  calculation: FlashSalePriceCalculation;
  currency: FlashSalePriceCurrency;
  amount: number;
  originalPrice: number;
  discountedPrice: number;
  discountPercentage: number;
  minAmount?: number;
  maxAmount?: number;
  tiers?: FlashSalePriceTier[];
  isActive: boolean;
  isPending: boolean;
  isApproved: boolean;
  isExpired: boolean;
  isValid: boolean;
  isComplex: boolean;
  isSimple: boolean;
  metadata?: Metadata;
}

/**
 * Flash Sale Price Tier
 */
export interface FlashSalePriceTier {
  minQuantity: number;
  maxQuantity?: number;
  price: number;
  discountPercentage: number;
  currency: FlashSalePriceCurrency;
  metadata?: Metadata;
}

/**
 * Flash Sale Price Filter
 */
export interface FlashSalePriceFilter {
  ids?: ID[];
  flashSaleIds?: ID[];
  productIds?: ID[];
  variantIds?: ID[];
  types?: FlashSalePriceType[];
  categories?: FlashSalePriceCategory[];
  statuses?: FlashSalePriceStatusType[];
  calculations?: FlashSalePriceCalculation[];
  currencies?: FlashSalePriceCurrency[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isActive?: boolean;
  isPending?: boolean;
  isApproved?: boolean;
  isExpired?: boolean;
  isValid?: boolean;
  isComplex?: boolean;
  isSimple?: boolean;
  minAmount?: number;
  maxAmount?: number;
  minDiscountPercentage?: number;
  maxDiscountPercentage?: number;
  searchTerm?: string;
}

/**
 * Flash Sale Price Statistics
 */
export interface FlashSalePriceStatistics {
  flashSaleId: ID;
  totalPrices: number;
  activePrices: number;
  pendingPrices: number;
  approvedPrices: number;
  expiredPrices: number;
  complexPrices: number;
  simplePrices: number;
  byType: Record<FlashSalePriceType, number>;
  byCategory: Record<FlashSalePriceCategory, number>;
  byStatus: Record<FlashSalePriceStatusType, number>;
  byCalculation: Record<FlashSalePriceCalculation, number>;
  byCurrency: Record<FlashSalePriceCurrency, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averageAmount: number;
  maxAmount: number;
  minAmount: number;
  averageDiscountPercentage: number;
  maxDiscountPercentage: number;
  minDiscountPercentage: number;
  mostFrequentType: FlashSalePriceType;
  mostFrequentCategory: FlashSalePriceCategory;
  mostFrequentStatus: FlashSalePriceStatusType;
}

/**
 * Flash Sale Price Summary
 */
export interface FlashSalePriceSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalPrices: number;
  active: number;
  pending: number;
  approved: number;
  expired: number;
  complex: number;
  simple: number;
  byType: Record<FlashSalePriceType, number>;
  byCategory: Record<FlashSalePriceCategory, number>;
  byStatus: Record<FlashSalePriceStatusType, number>;
  byCalculation: Record<FlashSalePriceCalculation, number>;
  byCurrency: Record<FlashSalePriceCurrency, number>;
  priceTrend: {
    date: Date;
    total: number;
    active: number;
    approved: number;
  }[];
  topTypes: {
    type: FlashSalePriceType;
    count: number;
    label: string;
  }[];
  topCategories: {
    category: FlashSalePriceCategory;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: FlashSalePriceStatusType;
    count: number;
    label: string;
  }[];
  financialSummary: {
    averageAmount: number;
    maxAmount: number;
    minAmount: number;
    averageDiscountPercentage: number;
    maxDiscountPercentage: number;
    minDiscountPercentage: number;
  };
}

/**
 * Flash Sale Price Configuration
 */
export interface FlashSalePriceConfiguration {
  enabled: boolean;
  defaultType: FlashSalePriceType;
  defaultCategory: FlashSalePriceCategory;
  defaultStatus: FlashSalePriceStatusType;
  defaultCalculation: FlashSalePriceCalculation;
  defaultCurrency: FlashSalePriceCurrency;
  defaultTiers: number;
  maxTiers: number;
  maxDiscount: number;
  minDiscount: number;
  maxAmount: number;
  minAmount: number;
  requireApproval: boolean;
  allowComplexPricing: boolean;
  allowSimplePricing: boolean;
  autoCalculateDiscount: boolean;
  notificationOnCreate: boolean;
  notificationOnApprove: boolean;
  notificationOnReject: boolean;
  notificationOnExpire: boolean;
  alertConfig?: FlashSalePriceAlertConfig;
}

/**
 * Flash Sale Price Alert Configuration
 */
export interface FlashSalePriceAlertConfig {
  enabled: boolean;
  highDiscountAlert: boolean;
  highDiscountThreshold: number;
  lowDiscountAlert: boolean;
  lowDiscountThreshold: number;
  priceChangeAlert: boolean;
  priceChangeThreshold: number;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Flash Sale Price History
 */
export interface FlashSalePriceHistory extends BaseEntity, Timestamp {
  id: ID;
  priceId: ID;
  flashSaleId: ID;
  productId: ID;
  variantId?: ID;
  action: 'create' | 'update' | 'approve' | 'reject' | 'activate' | 'expire' | 'delete' | 'restore';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Flash Sale Price Validation
 */
export interface FlashSalePriceValidation {
  isValid: boolean;
  priceId: ID;
  flashSaleId: ID;
  productId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Flash Sale Price Export
 */
export interface FlashSalePriceExport extends BaseEntity, Timestamp {
  id: ID;
  flashSaleId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: FlashSalePriceFilter;
  filename: string;
  fileSize?: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  completedAt?: Date;
  downloadUrl?: string;
  metadata?: Metadata;
}

/**
 * Flash Sale Price Calculation Result
 */
export interface FlashSalePriceCalculationResult {
  originalPrice: number;
  discountPercentage: number;
  discountedPrice: number;
  savings: number;
  currency: FlashSalePriceCurrency;
  tierApplied?: FlashSalePriceTier;
  calculationType: FlashSalePriceCalculation;
  metadata?: Metadata;
}

// ============================================================
// Re-export Everything
// ============================================================

export {
  // Price Core
  FLASH_SALE_PRICE,
  FlashSalePriceType,
  FlashSalePriceCategory,
  FlashSalePriceStatus,
  FlashSalePriceCalculation,
  FlashSalePriceCurrency,
  getFlashSalePriceTypeLabel,
  getFlashSalePriceCategoryLabel,
  getFlashSalePriceStatusLabel,
  getFlashSalePriceStatusColor,
  getFlashSalePriceCalculationLabel,
  getFlashSalePriceCurrencyLabel,
  isFlashSalePriceActive,
  isFlashSalePricePending,
  isFlashSalePriceApproved,
  isFlashSalePriceExpired,
  isFlashSalePriceValid,
  getFlashSalePriceDefaultType,
  getFlashSalePriceDefaultCurrency,
  getFlashSalePriceDefaultCalculation,
  getFlashSalePriceMaxDiscount,
  getFlashSalePriceMinDiscount,
  getFlashSalePriceMaxAmount,
  getFlashSalePriceMinAmount,
  getFlashSalePriceDefaultTiers,
  getFlashSalePriceMaxTiers,
  // Price Type
  FLASH_SALE_PRICE_TYPE_CATEGORIES,
  FlashSalePriceTypeDetail,
  FlashSalePriceTypeComplexity,
  FlashSalePriceTypeScope,
  FlashSalePriceTypePriority,
  getFlashSalePriceTypeCategory,
  getFlashSalePriceTypeComplexityLabel,
  getFlashSalePriceTypeScopeLabel,
  getFlashSalePriceTypePriorityLabel,
  getFlashSalePriceTypeMethodLabel,
  isFlashSalePriceTypeFixed,
  isFlashSalePriceTypePercentage,
  isFlashSalePriceTypeTiered,
  isFlashSalePriceTypeDynamic,
  isFlashSalePriceTypeBundle,
  isFlashSalePriceTypeVolume,
  isFlashSalePriceTypePromotional,
  isFlashSalePriceTypeClearance,
  isFlashSalePriceTypeComplex,
  isFlashSalePriceTypeSimple,
  getFlashSalePriceTypeComplexityScore,
  // Price Status
  FLASH_SALE_PRICE_STATUS,
  FLASH_SALE_PRICE_STATUS_LABELS_DETAIL,
  FLASH_SALE_PRICE_STATUS_COLORS_DETAIL,
  FLASH_SALE_PRICE_STATUS_CATEGORIES,
  FLASH_SALE_PRICE_STATUS_GROUPS,
  FlashSalePriceStatusType,
  FlashSalePriceStatusCategory,
  getFlashSalePriceStatusLabelDetail,
  getFlashSalePriceStatusColorDetail,
  getFlashSalePriceStatusCategory,
  isFlashSalePriceActiveStatus,
  isFlashSalePricePendingStatus,
  isFlashSalePriceApprovedStatus,
  isFlashSalePriceRejectedStatus,
  isFlashSalePriceExpiredStatus,
  isFlashSalePriceTerminalStatus,
  isFlashSalePriceValidStatus,
  isFlashSalePriceCanTransition,
  getFlashSalePriceAvailableTransitions,
  getFlashSalePriceStatusPriority,
  getFlashSalePriceStatusBadgeType,
};
