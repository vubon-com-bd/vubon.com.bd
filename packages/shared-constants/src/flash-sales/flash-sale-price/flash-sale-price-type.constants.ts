/**
 * Flash Sale Price Type Constants
 * Type-specific constants for flash sale pricing
 * @module FlashSalePriceTypeConstants
 */

/**
 * Flash sale price type categories
 */
export const FLASH_SALE_PRICE_TYPE_CATEGORIES = {
  FIXED: 'FIXED',
  PERCENTAGE: 'PERCENTAGE',
  TIERED: 'TIERED',
  DYNAMIC: 'DYNAMIC',
  BUNDLE: 'BUNDLE',
  VOLUME: 'VOLUME',
  PROMOTIONAL: 'PROMOTIONAL',
  CLEARANCE: 'CLEARANCE',
} as const;

/**
 * Flash sale price type complexity labels
 */
export const FLASH_SALE_PRICE_TYPE_COMPLEXITY_LABELS = {
  FIXED: 'Simple',
  PERCENTAGE: 'Simple',
  TIERED: 'Complex',
  DYNAMIC: 'Advanced',
  BUNDLE: 'Complex',
  VOLUME: 'Complex',
  PROMOTIONAL: 'Medium',
  CLEARANCE: 'Simple',
} as const;

/**
 * Flash sale price type scope labels
 */
export const FLASH_SALE_PRICE_TYPE_SCOPE_LABELS = {
  FIXED: 'Product',
  PERCENTAGE: 'Product',
  TIERED: 'Product',
  DYNAMIC: 'Global',
  BUNDLE: 'Bundle',
  VOLUME: 'Product',
  PROMOTIONAL: 'Campaign',
  CLEARANCE: 'Category',
} as const;

/**
 * Flash sale price type priority labels
 */
export const FLASH_SALE_PRICE_TYPE_PRIORITY_LABELS = {
  FIXED: 'Medium',
  PERCENTAGE: 'Medium',
  TIERED: 'High',
  DYNAMIC: 'Critical',
  BUNDLE: 'High',
  VOLUME: 'Medium',
  PROMOTIONAL: 'Low',
  CLEARANCE: 'Low',
} as const;

/**
 * Flash sale price type method labels
 */
export const FLASH_SALE_PRICE_TYPE_METHOD_LABELS = {
  FIXED: 'Fixed Amount',
  PERCENTAGE: 'Percentage Off',
  TIERED: 'Tier Based',
  DYNAMIC: 'Dynamic Adjustment',
  BUNDLE: 'Bundle Pricing',
  VOLUME: 'Volume Based',
  PROMOTIONAL: 'Promotional Code',
  CLEARANCE: 'Clearance Markdown',
} as const;

// ============================================================
// Types
// ============================================================

/**
 * Flash sale price type detail
 */
export type FlashSalePriceTypeDetail = keyof typeof FLASH_SALE_PRICE_TYPE_CATEGORIES;

/**
 * Flash sale price type complexity
 */
export type FlashSalePriceTypeComplexity =
  'Simple' | 'Medium' | 'Complex' | 'Advanced' | 'Critical';

/**
 * Flash sale price type scope
 */
export type FlashSalePriceTypeScope = 'Product' | 'Category' | 'Bundle' | 'Campaign' | 'Global';

/**
 * Flash sale price type priority
 */
export type FlashSalePriceTypePriority = 'Low' | 'Medium' | 'High' | 'Critical';

// ============================================================
// Helper Functions
// ============================================================

/**
 * Get price type category
 */
export const getFlashSalePriceTypeCategory = (type: FlashSalePriceTypeDetail): string =>
  FLASH_SALE_PRICE_TYPE_CATEGORIES[type] || 'UNKNOWN';

/**
 * Get price type complexity label
 */
export const getFlashSalePriceTypeComplexityLabel = (type: FlashSalePriceTypeDetail): string =>
  FLASH_SALE_PRICE_TYPE_COMPLEXITY_LABELS[type] || 'Unknown';

/**
 * Get price type scope label
 */
export const getFlashSalePriceTypeScopeLabel = (type: FlashSalePriceTypeDetail): string =>
  FLASH_SALE_PRICE_TYPE_SCOPE_LABELS[type] || 'Unknown';

/**
 * Get price type priority label
 */
export const getFlashSalePriceTypePriorityLabel = (type: FlashSalePriceTypeDetail): string =>
  FLASH_SALE_PRICE_TYPE_PRIORITY_LABELS[type] || 'Medium';

/**
 * Get price type method label
 */
export const getFlashSalePriceTypeMethodLabel = (type: FlashSalePriceTypeDetail): string =>
  FLASH_SALE_PRICE_TYPE_METHOD_LABELS[type] || type;

/**
 * Check if price type is fixed
 */
export const isFlashSalePriceTypeFixed = (type: FlashSalePriceTypeDetail): boolean =>
  type === 'FIXED';

/**
 * Check if price type is percentage
 */
export const isFlashSalePriceTypePercentage = (type: FlashSalePriceTypeDetail): boolean =>
  type === 'PERCENTAGE';

/**
 * Check if price type is tiered
 */
export const isFlashSalePriceTypeTiered = (type: FlashSalePriceTypeDetail): boolean =>
  type === 'TIERED';

/**
 * Check if price type is dynamic
 */
export const isFlashSalePriceTypeDynamic = (type: FlashSalePriceTypeDetail): boolean =>
  type === 'DYNAMIC';

/**
 * Check if price type is bundle
 */
export const isFlashSalePriceTypeBundle = (type: FlashSalePriceTypeDetail): boolean =>
  type === 'BUNDLE';

/**
 * Check if price type is volume
 */
export const isFlashSalePriceTypeVolume = (type: FlashSalePriceTypeDetail): boolean =>
  type === 'VOLUME';

/**
 * Check if price type is promotional
 */
export const isFlashSalePriceTypePromotional = (type: FlashSalePriceTypeDetail): boolean =>
  type === 'PROMOTIONAL';

/**
 * Check if price type is clearance
 */
export const isFlashSalePriceTypeClearance = (type: FlashSalePriceTypeDetail): boolean =>
  type === 'CLEARANCE';

/**
 * Check if price type is complex (requires advanced logic)
 */
export const isFlashSalePriceTypeComplex = (type: FlashSalePriceTypeDetail): boolean =>
  type === 'TIERED' || type === 'DYNAMIC' || type === 'BUNDLE' || type === 'VOLUME';

/**
 * Check if price type is simple (straightforward pricing)
 */
export const isFlashSalePriceTypeSimple = (type: FlashSalePriceTypeDetail): boolean =>
  type === 'FIXED' || type === 'PERCENTAGE' || type === 'CLEARANCE';

/**
 * Get price type complexity score
 */
export const getFlashSalePriceTypeComplexityScore = (type: FlashSalePriceTypeDetail): number => {
  const scores = {
    FIXED: 1,
    PERCENTAGE: 1,
    CLEARANCE: 1,
    PROMOTIONAL: 2,
    VOLUME: 3,
    TIERED: 3,
    BUNDLE: 3,
    DYNAMIC: 4,
  };
  return scores[type] || 1;
};
