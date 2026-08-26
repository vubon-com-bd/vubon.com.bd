/**
 * Product Types
 * Type definitions for product catalog based on shared-constants
 * @module ProductTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants product
// ============================================================
import {
  // Product Core
  PRODUCT,
  ProductType,
  ProductStatus,
  ProductVisibility,
  ProductAvailability,
  ProductCondition,
  ProductDefault,
  ProductLimit,
  ProductError,
  productGetTypeLabel,
  productGetStatusLabel,
  productGetVisibilityLabel,
  productGetAvailabilityLabel,
  productGetConditionLabel,
  productGetErrorLabel,
  productIsActive,
  productIsInStock,
  productIsPhysical,
  productIsDigital,
  productIsService,
  productGetDefaultSkuPrefix,
  productGetDefaultCurrency,
  productGetMaxImages,
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
  // Brand
  PRODUCTBRAND,
  ProductBrandStatus,
  ProductBrandType,
  ProductBrandVerification,
  ProductBrandDefault,
  ProductBrandLimit,
  productbrandGetStatusLabel,
  productbrandGetTypeLabel,
  productbrandGetVerificationLabel,
  productbrandIsActive,
  productbrandIsVerified,
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
  // Inventory
  PRODUCTINVENTORY,
  ProductInventoryType,
  ProductInventoryStatus,
  ProductInventoryTracking,
  ProductInventoryDefault,
  ProductInventoryLimit,
  productinventoryGetTypeLabel,
  productinventoryGetStatusLabel,
  productinventoryGetTrackingLabel,
  productinventoryIsInStock,
  productinventoryIsLowStock,
  productinventoryIsOutOfStock,
  productinventoryGetDefaultQuantity,
  productinventoryGetDefaultReorderPoint,
  productinventoryGetDefaultLowStockThreshold,
  // Pricing
  PRODUCTPRICING,
  ProductPricingType,
  ProductPriceStatus,
  ProductCurrency,
  ProductTaxClass,
  ProductPricingDefault,
  ProductPricingLimit,
  productpricingGetTypeLabel,
  productpricingGetStatusLabel,
  productpricingGetCurrencySymbol,
  productpricingGetTaxClassLabel,
  productpricingIsActive,
  productpricingIsFixed,
  productpricingIsDynamic,
  productpricingIsTiered,
  productpricingGetDefaultCurrency,
  productpricingGetDefaultTaxClass,
  // Review
  PRODUCTREVIEW,
  ProductReviewStatus,
  ProductReviewType,
  ProductReviewRating,
  ProductReviewVerification,
  ProductReviewDefault,
  ProductReviewLimit,
  productreviewGetStatusLabel,
  productreviewGetTypeLabel,
  productreviewGetRatingLabel,
  productreviewGetVerificationLabel,
  productreviewIsApproved,
  productreviewIsPending,
  productreviewIsRejected,
  productreviewIsVerified,
  productreviewGetDefaultRating,
  productreviewGetMaxImages,
  // Approval
  PRODUCTAPPROVAL,
  ProductApprovalStatus,
  ProductApprovalType,
  ProductApprovalPriority,
  ProductApprovalAction,
  ProductApprovalDefault,
  ProductApprovalLimit,
  productapprovalGetStatusLabel,
  productapprovalGetTypeLabel,
  productapprovalGetPriorityLabel,
  productapprovalGetActionLabel,
  productapprovalIsPending,
  productapprovalIsApproved,
  productapprovalIsRejected,
  productapprovalGetDefaultTimeoutHours,
  productapprovalGetMaxApprovers,
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
// Product Extended Types
// ============================================================

/**
 * Product attribute
 */
export interface ProductAttribute extends BaseEntity, Timestamp {
  id: ID;
  name: string;
  type: ProductAttributeType;
  status: ProductAttributeStatus;
  visibility: ProductAttributeVisibility;
  value: string | number | boolean | string[];
  isActive: boolean;
  isFilterable: boolean;
  isSearchable: boolean;
  metadata?: Metadata;
}

/**
 * Product variant
 */
export interface ProductVariant extends BaseEntity, Timestamp {
  id: ID;
  productId: ID;
  type: ProductVariantType;
  status: ProductVariantStatus;
  sku: string;
  name: string;
  price: number;
  cost?: number;
  stock: number;
  images: string[];
  attributes: ProductAttribute[];
  isActive: boolean;
  isInStock: boolean;
  metadata?: Metadata;
}

/**
 * Product inventory
 */
export interface ProductInventory extends BaseEntity, Timestamp {
  id: ID;
  productId: ID;
  variantId?: ID;
  type: ProductInventoryType;
  status: ProductInventoryStatus;
  tracking: ProductInventoryTracking;
  quantity: number;
  reservedQuantity: number;
  soldQuantity: number;
  reorderPoint: number;
  lowStockThreshold: number;
  isInStock: boolean;
  isLowStock: boolean;
  isOutOfStock: boolean;
  lastUpdatedAt: Date;
  metadata?: Metadata;
}

/**
 * Product pricing
 */
export interface ProductPricing extends BaseEntity, Timestamp {
  id: ID;
  productId: ID;
  type: ProductPricingType;
  status: ProductPriceStatus;
  currency: ProductCurrency;
  price: number;
  cost?: number;
  compareAtPrice?: number;
  taxClass: ProductTaxClass;
  tierPricing?: ProductTierPricing[];
  isActive: boolean;
  isFixed: boolean;
  isDynamic: boolean;
  isTiered: boolean;
  metadata?: Metadata;
}

/**
 * Product tier pricing
 */
export interface ProductTierPricing {
  minQuantity: number;
  maxQuantity?: number;
  price: number;
  metadata?: Metadata;
}

/**
 * Product review
 */
export interface ProductReview extends BaseEntity, Timestamp {
  id: ID;
  productId: ID;
  userId: ID;
  status: ProductReviewStatus;
  type: ProductReviewType;
  rating: ProductReviewRating;
  title: string;
  content: string;
  images: string[];
  verification: ProductReviewVerification;
  isApproved: boolean;
  isPending: boolean;
  isRejected: boolean;
  isVerified: boolean;
  helpfulCount: number;
  unhelpfulCount: number;
  metadata?: Metadata;
}

/**
 * Product approval
 */
export interface ProductApproval extends BaseEntity, Timestamp {
  id: ID;
  productId: ID;
  type: ProductApprovalType;
  status: ProductApprovalStatus;
  priority: ProductApprovalPriority;
  action: ProductApprovalAction;
  requestedBy: ID;
  approvedBy?: ID;
  comments?: string;
  timeoutHours: number;
  maxApprovers: number;
  isPending: boolean;
  isApproved: boolean;
  isRejected: boolean;
  metadata?: Metadata;
}

/**
 * Product comparison
 */
export interface ProductComparison extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  type: ProductComparisonType;
  status: ProductComparisonStatus;
  mode: ProductComparisonMode;
  criteria: ProductComparisonCriteria[];
  products: Product[];
  isActive: boolean;
  metadata?: Metadata;
}

/**
 * Product collection
 */
export interface ProductCollection extends BaseEntity, Timestamp {
  id: ID;
  type: ProductCollectionType;
  status: ProductCollectionStatus;
  visibility: ProductCollectionVisibility;
  condition: ProductCollectionCondition;
  name: string;
  description?: string;
  slug: string;
  products: Product[];
  isActive: boolean;
  isManual: boolean;
  isAutomated: boolean;
  metadata?: Metadata;
}

/**
 * Product
 */
export interface Product extends BaseEntity, Timestamp {
  id: ID;
  type: ProductType;
  status: ProductStatus;
  visibility: ProductVisibility;
  availability: ProductAvailability;
  condition: ProductCondition;
  sku: string;
  name: string;
  slug: string;
  description: string;
  shortDescription?: string;
  images: string[];
  categories: ProductCategoryType[];
  brand?: ProductBrandType;
  variants: ProductVariant[];
  attributes: ProductAttribute[];
  inventory: ProductInventory[];
  pricing: ProductPricing[];
  reviews: ProductReview[];
  isActive: boolean;
  isInStock: boolean;
  isPhysical: boolean;
  isDigital: boolean;
  isService: boolean;
  metadata?: Metadata;
}

// ============================================================
// Re-export Everything
// ============================================================

export {
  // Product Core
  PRODUCT,
  ProductType,
  ProductStatus,
  ProductVisibility,
  ProductAvailability,
  ProductCondition,
  ProductDefault,
  ProductLimit,
  ProductError,
  productGetTypeLabel,
  productGetStatusLabel,
  productGetVisibilityLabel,
  productGetAvailabilityLabel,
  productGetConditionLabel,
  productGetErrorLabel,
  productIsActive,
  productIsInStock,
  productIsPhysical,
  productIsDigital,
  productIsService,
  productGetDefaultSkuPrefix,
  productGetDefaultCurrency,
  productGetMaxImages,
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
  // Brand
  PRODUCTBRAND,
  ProductBrandStatus,
  ProductBrandType,
  ProductBrandVerification,
  ProductBrandDefault,
  ProductBrandLimit,
  productbrandGetStatusLabel,
  productbrandGetTypeLabel,
  productbrandGetVerificationLabel,
  productbrandIsActive,
  productbrandIsVerified,
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
  // Inventory
  PRODUCTINVENTORY,
  ProductInventoryType,
  ProductInventoryStatus,
  ProductInventoryTracking,
  ProductInventoryDefault,
  ProductInventoryLimit,
  productinventoryGetTypeLabel,
  productinventoryGetStatusLabel,
  productinventoryGetTrackingLabel,
  productinventoryIsInStock,
  productinventoryIsLowStock,
  productinventoryIsOutOfStock,
  productinventoryGetDefaultQuantity,
  productinventoryGetDefaultReorderPoint,
  productinventoryGetDefaultLowStockThreshold,
  // Pricing
  PRODUCTPRICING,
  ProductPricingType,
  ProductPriceStatus,
  ProductCurrency,
  ProductTaxClass,
  ProductPricingDefault,
  ProductPricingLimit,
  productpricingGetTypeLabel,
  productpricingGetStatusLabel,
  productpricingGetCurrencySymbol,
  productpricingGetTaxClassLabel,
  productpricingIsActive,
  productpricingIsFixed,
  productpricingIsDynamic,
  productpricingIsTiered,
  productpricingGetDefaultCurrency,
  productpricingGetDefaultTaxClass,
  // Review
  PRODUCTREVIEW,
  ProductReviewStatus,
  ProductReviewType,
  ProductReviewRating,
  ProductReviewVerification,
  ProductReviewDefault,
  ProductReviewLimit,
  productreviewGetStatusLabel,
  productreviewGetTypeLabel,
  productreviewGetRatingLabel,
  productreviewGetVerificationLabel,
  productreviewIsApproved,
  productreviewIsPending,
  productreviewIsRejected,
  productreviewIsVerified,
  productreviewGetDefaultRating,
  productreviewGetMaxImages,
  // Approval
  PRODUCTAPPROVAL,
  ProductApprovalStatus,
  ProductApprovalType,
  ProductApprovalPriority,
  ProductApprovalAction,
  ProductApprovalDefault,
  ProductApprovalLimit,
  productapprovalGetStatusLabel,
  productapprovalGetTypeLabel,
  productapprovalGetPriorityLabel,
  productapprovalGetActionLabel,
  productapprovalIsPending,
  productapprovalIsApproved,
  productapprovalIsRejected,
  productapprovalGetDefaultTimeoutHours,
  productapprovalGetMaxApprovers,
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
