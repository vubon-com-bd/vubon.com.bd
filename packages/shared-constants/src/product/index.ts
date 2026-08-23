/**
 * Product Constants Index
 * Export all product constants and types for easy importing
 */

// Product Constants
export {
  PRODUCT,
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
} from './product.constants';

export type {
  ProductType,
  ProductStatus,
  ProductVisibility,
  ProductAvailability,
  ProductCondition,
  ProductDefault,
  ProductLimit,
  ProductError,
} from './product.constants';

// Category Constants
export {
  PRODUCTCATEGORY,
  productcategoryGetTypeLabel,
  productcategoryGetStatusLabel,
  productcategoryGetVisibilityLabel,
  productcategoryIsActive,
  productcategoryGetMaxDepth,
} from './category.constants';

export type {
  ProductCategoryType,
  ProductCategoryStatus,
  ProductCategoryVisibility,
  ProductCategoryDefault,
  ProductCategoryLimit,
} from './category.constants';

// Brand Constants
export {
  PRODUCTBRAND,
  productbrandGetStatusLabel,
  productbrandGetTypeLabel,
  productbrandGetVerificationLabel,
  productbrandIsActive,
  productbrandIsVerified,
} from './brand.constants';

export type {
  ProductBrandStatus,
  ProductBrandType,
  ProductBrandVerification,
  ProductBrandDefault,
  ProductBrandLimit,
} from './brand.constants';

// Variant Constants
export {
  PRODUCTVARIANT,
  productvariantGetTypeLabel,
  productvariantGetStatusLabel,
  productvariantIsActive,
  productvariantIsInStock,
} from './variant.constants';

export type {
  ProductVariantType,
  ProductVariantStatus,
  ProductVariantDefault,
  ProductVariantLimit,
} from './variant.constants';

// Attribute Constants
export {
  PRODUCTATTRIBUTE,
  productattributeGetTypeLabel,
  productattributeGetStatusLabel,
  productattributeGetVisibilityLabel,
  productattributeIsActive,
  productattributeIsFilterable,
  productattributeIsSearchable,
} from './attribute.constants';

export type {
  ProductAttributeType,
  ProductAttributeStatus,
  ProductAttributeVisibility,
  ProductAttributeDefault,
  ProductAttributeLimit,
} from './attribute.constants';

// Inventory Constants
export {
  PRODUCTINVENTORY,
  productinventoryGetTypeLabel,
  productinventoryGetStatusLabel,
  productinventoryGetTrackingLabel,
  productinventoryIsInStock,
  productinventoryIsLowStock,
  productinventoryIsOutOfStock,
  productinventoryGetDefaultQuantity,
  productinventoryGetDefaultReorderPoint,
  productinventoryGetDefaultLowStockThreshold,
} from './inventory.constants';

export type {
  ProductInventoryType,
  ProductInventoryStatus,
  ProductInventoryTracking,
  ProductInventoryDefault,
  ProductInventoryLimit,
} from './inventory.constants';

// Pricing Constants
export {
  PRODUCTPRICING,
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
} from './pricing.constants';

export type {
  ProductPricingType,
  ProductPriceStatus,
  ProductCurrency,
  ProductTaxClass,
  ProductPricingDefault,
  ProductPricingLimit,
} from './pricing.constants';

// Review Constants
export {
  PRODUCTREVIEW,
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
} from './review.constants';

export type {
  ProductReviewStatus,
  ProductReviewType,
  ProductReviewRating,
  ProductReviewVerification,
  ProductReviewDefault,
  ProductReviewLimit,
} from './review.constants';

// Approval Constants
export {
  PRODUCTAPPROVAL,
  productapprovalGetStatusLabel,
  productapprovalGetTypeLabel,
  productapprovalGetPriorityLabel,
  productapprovalGetActionLabel,
  productapprovalIsPending,
  productapprovalIsApproved,
  productapprovalIsRejected,
  productapprovalGetDefaultTimeoutHours,
  productapprovalGetMaxApprovers,
} from './approval.constants';

export type {
  ProductApprovalStatus,
  ProductApprovalType,
  ProductApprovalPriority,
  ProductApprovalAction,
  ProductApprovalDefault,
  ProductApprovalLimit,
} from './approval.constants';

// Comparison Constants
export {
  PRODUCTCOMPARISON,
  productcomparisonGetTypeLabel,
  productcomparisonGetStatusLabel,
  productcomparisonGetModeLabel,
  productcomparisonGetCriteriaLabel,
  productcomparisonIsActive,
  productcomparisonGetMaxProducts,
  productcomparisonGetMinProducts,
} from './comparison.constants';

export type {
  ProductComparisonType,
  ProductComparisonStatus,
  ProductComparisonMode,
  ProductComparisonCriteria,
  ProductComparisonDefault,
  ProductComparisonLimit,
} from './comparison.constants';

// Collection Constants
export {
  PRODUCTCOLLECTION,
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
} from './collection.constants';

export type {
  ProductCollectionType,
  ProductCollectionStatus,
  ProductCollectionVisibility,
  ProductCollectionCondition,
  ProductCollectionDefault,
  ProductCollectionLimit,
} from './collection.constants';
