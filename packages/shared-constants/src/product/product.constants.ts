/**
 * Product Constants
 * Core product configuration and settings
 */

export const PRODUCT = {
  // Product Types
  TYPES: {
    PHYSICAL: 'physical',
    DIGITAL: 'digital',
    SERVICE: 'service',
    SUBSCRIPTION: 'subscription',
    BUNDLE: 'bundle',
    VARIABLE: 'variable',
    CUSTOM: 'custom',
  } as const,

  // Product Statuses
  STATUSES: {
    DRAFT: 'draft',
    PENDING: 'pending',
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    OUT_OF_STOCK: 'out_of_stock',
    DISCONTINUED: 'discontinued',
    ARCHIVED: 'archived',
    UNDER_REVIEW: 'under_review',
    REJECTED: 'rejected',
    SCHEDULED: 'scheduled',
  } as const,

  // Product Visibility
  VISIBILITY: {
    PUBLIC: 'public',
    PRIVATE: 'private',
    HIDDEN: 'hidden',
    SEARCH_ONLY: 'search_only',
    CATALOG_ONLY: 'catalog_only',
    PASSWORD: 'password',
    CUSTOM: 'custom',
  } as const,

  // Product Availability
  AVAILABILITY: {
    IN_STOCK: 'in_stock',
    OUT_OF_STOCK: 'out_of_stock',
    PRE_ORDER: 'pre_order',
    BACK_ORDER: 'back_order',
    DISCONTINUED: 'discontinued',
    COMING_SOON: 'coming_soon',
    LIMITED: 'limited',
    CUSTOM: 'custom',
  } as const,

  // Product Conditions
  CONDITIONS: {
    NEW: 'new',
    USED_LIKE_NEW: 'used_like_new',
    USED_GOOD: 'used_good',
    USED_FAIR: 'used_fair',
    USED_POOR: 'used_poor',
    REFURBISHED: 'refurbished',
    OPEN_BOX: 'open_box',
    CUSTOM: 'custom',
  } as const,

  // Product Defaults
  DEFAULTS: {
    DEFAULT_TYPE: 'physical',
    DEFAULT_STATUS: 'draft',
    DEFAULT_VISIBILITY: 'public',
    DEFAULT_AVAILABILITY: 'in_stock',
    DEFAULT_CONDITION: 'new',
    DEFAULT_SKU_PREFIX: 'PRD',
    DEFAULT_WEIGHT_UNIT: 'kg',
    DEFAULT_DIMENSION_UNIT: 'cm',
    DEFAULT_CURRENCY: 'BDT',
    DEFAULT_TAX_CLASS: 'standard',
    MAX_IMAGES: 10,
    MAX_VARIANTS: 100,
    MAX_ATTRIBUTES: 50,
    MAX_TAGS: 20,
    MAX_CATEGORIES: 5,
    MIN_PRICE: 0,
    MAX_PRICE: 1000000,
  } as const,

  // Product Limits
  LIMITS: {
    MIN_NAME_LENGTH: 3,
    MAX_NAME_LENGTH: 200,
    MAX_DESCRIPTION_LENGTH: 10000,
    MAX_SHORT_DESCRIPTION_LENGTH: 500,
    MAX_SKU_LENGTH: 50,
    MAX_IMAGES: 10,
    MAX_VARIANTS: 100,
    MAX_ATTRIBUTES: 50,
    MAX_TAGS: 20,
    MAX_CATEGORIES: 5,
    MAX_RELATED_PRODUCTS: 20,
    MAX_UPSELL_PRODUCTS: 10,
    MAX_CROSS_SELL_PRODUCTS: 10,
    MAX_META_TITLE_LENGTH: 60,
    MAX_META_DESCRIPTION_LENGTH: 160,
    MIN_PRICE: 0,
    MAX_PRICE: 1000000,
    MIN_WEIGHT: 0.01,
    MAX_WEIGHT: 1000,
  } as const,

  // Product Errors
  ERRORS: {
    INVALID_SKU: 'invalid_sku',
    DUPLICATE_SKU: 'duplicate_sku',
    INVALID_PRICE: 'invalid_price',
    INVALID_STOCK: 'invalid_stock',
    INVALID_STATUS: 'invalid_status',
    INVALID_TYPE: 'invalid_type',
    INVALID_CATEGORY: 'invalid_category',
    INVALID_ATTRIBUTE: 'invalid_attribute',
    INVALID_VARIANT: 'invalid_variant',
    DUPLICATE_VARIANT: 'duplicate_variant',
    INVALID_IMAGE: 'invalid_image',
    MAX_IMAGES_EXCEEDED: 'max_images_exceeded',
    MAX_VARIANTS_EXCEEDED: 'max_variants_exceeded',
    MAX_ATTRIBUTES_EXCEEDED: 'max_attributes_exceeded',
    MAX_TAGS_EXCEEDED: 'max_tags_exceeded',
    MAX_CATEGORIES_EXCEEDED: 'max_categories_exceeded',
  } as const,
} as const;

// Product Types
export type ProductType = (typeof PRODUCT.TYPES)[keyof typeof PRODUCT.TYPES];

// Product Statuses
export type ProductStatus = (typeof PRODUCT.STATUSES)[keyof typeof PRODUCT.STATUSES];

// Product Visibility
export type ProductVisibility = (typeof PRODUCT.VISIBILITY)[keyof typeof PRODUCT.VISIBILITY];

// Product Availability
export type ProductAvailability = (typeof PRODUCT.AVAILABILITY)[keyof typeof PRODUCT.AVAILABILITY];

// Product Conditions
export type ProductCondition = (typeof PRODUCT.CONDITIONS)[keyof typeof PRODUCT.CONDITIONS];

// Product Defaults
export type ProductDefault = (typeof PRODUCT.DEFAULTS)[keyof typeof PRODUCT.DEFAULTS];

// Product Limits
export type ProductLimit = (typeof PRODUCT.LIMITS)[keyof typeof PRODUCT.LIMITS];

// Product Errors
export type ProductError = (typeof PRODUCT.ERRORS)[keyof typeof PRODUCT.ERRORS];

// Utility Functions
export function productGetTypeLabel(type: ProductType): string {
  const labels: Record<ProductType, string> = {
    [PRODUCT.TYPES.PHYSICAL]: 'Physical',
    [PRODUCT.TYPES.DIGITAL]: 'Digital',
    [PRODUCT.TYPES.SERVICE]: 'Service',
    [PRODUCT.TYPES.SUBSCRIPTION]: 'Subscription',
    [PRODUCT.TYPES.BUNDLE]: 'Bundle',
    [PRODUCT.TYPES.VARIABLE]: 'Variable',
    [PRODUCT.TYPES.CUSTOM]: 'Custom',
  };
  return labels[type] || 'Unknown Product Type';
}

export function productGetStatusLabel(status: ProductStatus): string {
  const labels: Record<ProductStatus, string> = {
    [PRODUCT.STATUSES.DRAFT]: 'Draft',
    [PRODUCT.STATUSES.PENDING]: 'Pending',
    [PRODUCT.STATUSES.ACTIVE]: 'Active',
    [PRODUCT.STATUSES.INACTIVE]: 'Inactive',
    [PRODUCT.STATUSES.OUT_OF_STOCK]: 'Out of Stock',
    [PRODUCT.STATUSES.DISCONTINUED]: 'Discontinued',
    [PRODUCT.STATUSES.ARCHIVED]: 'Archived',
    [PRODUCT.STATUSES.UNDER_REVIEW]: 'Under Review',
    [PRODUCT.STATUSES.REJECTED]: 'Rejected',
    [PRODUCT.STATUSES.SCHEDULED]: 'Scheduled',
  };
  return labels[status] || 'Unknown Status';
}

export function productGetVisibilityLabel(visibility: ProductVisibility): string {
  const labels: Record<ProductVisibility, string> = {
    [PRODUCT.VISIBILITY.PUBLIC]: 'Public',
    [PRODUCT.VISIBILITY.PRIVATE]: 'Private',
    [PRODUCT.VISIBILITY.HIDDEN]: 'Hidden',
    [PRODUCT.VISIBILITY.SEARCH_ONLY]: 'Search Only',
    [PRODUCT.VISIBILITY.CATALOG_ONLY]: 'Catalog Only',
    [PRODUCT.VISIBILITY.PASSWORD]: 'Password Protected',
    [PRODUCT.VISIBILITY.CUSTOM]: 'Custom',
  };
  return labels[visibility] || 'Unknown Visibility';
}

export function productGetAvailabilityLabel(availability: ProductAvailability): string {
  const labels: Record<ProductAvailability, string> = {
    [PRODUCT.AVAILABILITY.IN_STOCK]: 'In Stock',
    [PRODUCT.AVAILABILITY.OUT_OF_STOCK]: 'Out of Stock',
    [PRODUCT.AVAILABILITY.PRE_ORDER]: 'Pre-Order',
    [PRODUCT.AVAILABILITY.BACK_ORDER]: 'Back Order',
    [PRODUCT.AVAILABILITY.DISCONTINUED]: 'Discontinued',
    [PRODUCT.AVAILABILITY.COMING_SOON]: 'Coming Soon',
    [PRODUCT.AVAILABILITY.LIMITED]: 'Limited Stock',
    [PRODUCT.AVAILABILITY.CUSTOM]: 'Custom',
  };
  return labels[availability] || 'Unknown Availability';
}

export function productGetConditionLabel(condition: ProductCondition): string {
  const labels: Record<ProductCondition, string> = {
    [PRODUCT.CONDITIONS.NEW]: 'New',
    [PRODUCT.CONDITIONS.USED_LIKE_NEW]: 'Used - Like New',
    [PRODUCT.CONDITIONS.USED_GOOD]: 'Used - Good',
    [PRODUCT.CONDITIONS.USED_FAIR]: 'Used - Fair',
    [PRODUCT.CONDITIONS.USED_POOR]: 'Used - Poor',
    [PRODUCT.CONDITIONS.REFURBISHED]: 'Refurbished',
    [PRODUCT.CONDITIONS.OPEN_BOX]: 'Open Box',
    [PRODUCT.CONDITIONS.CUSTOM]: 'Custom',
  };
  return labels[condition] || 'Unknown Condition';
}

export function productGetErrorLabel(error: ProductError): string {
  const labels: Record<ProductError, string> = {
    [PRODUCT.ERRORS.INVALID_SKU]: 'Invalid SKU',
    [PRODUCT.ERRORS.DUPLICATE_SKU]: 'Duplicate SKU',
    [PRODUCT.ERRORS.INVALID_PRICE]: 'Invalid Price',
    [PRODUCT.ERRORS.INVALID_STOCK]: 'Invalid Stock',
    [PRODUCT.ERRORS.INVALID_STATUS]: 'Invalid Status',
    [PRODUCT.ERRORS.INVALID_TYPE]: 'Invalid Type',
    [PRODUCT.ERRORS.INVALID_CATEGORY]: 'Invalid Category',
    [PRODUCT.ERRORS.INVALID_ATTRIBUTE]: 'Invalid Attribute',
    [PRODUCT.ERRORS.INVALID_VARIANT]: 'Invalid Variant',
    [PRODUCT.ERRORS.DUPLICATE_VARIANT]: 'Duplicate Variant',
    [PRODUCT.ERRORS.INVALID_IMAGE]: 'Invalid Image',
    [PRODUCT.ERRORS.MAX_IMAGES_EXCEEDED]: 'Max Images Exceeded',
    [PRODUCT.ERRORS.MAX_VARIANTS_EXCEEDED]: 'Max Variants Exceeded',
    [PRODUCT.ERRORS.MAX_ATTRIBUTES_EXCEEDED]: 'Max Attributes Exceeded',
    [PRODUCT.ERRORS.MAX_TAGS_EXCEEDED]: 'Max Tags Exceeded',
    [PRODUCT.ERRORS.MAX_CATEGORIES_EXCEEDED]: 'Max Categories Exceeded',
  };
  return labels[error] || 'Unknown Error';
}

export function productIsActive(status: ProductStatus): boolean {
  const activeStatuses: ProductStatus[] = [PRODUCT.STATUSES.ACTIVE, PRODUCT.STATUSES.SCHEDULED];
  return activeStatuses.includes(status);
}

export function productIsInStock(availability: ProductAvailability): boolean {
  const inStockStatuses: ProductAvailability[] = [
    PRODUCT.AVAILABILITY.IN_STOCK,
    PRODUCT.AVAILABILITY.PRE_ORDER,
    PRODUCT.AVAILABILITY.BACK_ORDER,
    PRODUCT.AVAILABILITY.LIMITED,
  ];
  return inStockStatuses.includes(availability);
}

export function productIsPhysical(type: ProductType): boolean {
  return type === PRODUCT.TYPES.PHYSICAL;
}

export function productIsDigital(type: ProductType): boolean {
  return type === PRODUCT.TYPES.DIGITAL;
}

export function productIsService(type: ProductType): boolean {
  return type === PRODUCT.TYPES.SERVICE;
}

export function productGetDefaultSkuPrefix(): string {
  return PRODUCT.DEFAULTS.DEFAULT_SKU_PREFIX;
}

export function productGetDefaultCurrency(): string {
  return PRODUCT.DEFAULTS.DEFAULT_CURRENCY;
}

export function productGetMaxImages(): number {
  return PRODUCT.DEFAULTS.MAX_IMAGES;
}
