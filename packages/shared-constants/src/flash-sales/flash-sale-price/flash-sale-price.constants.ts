/**
 * Flash Sale Price Constants
 * Core constants for flash sale pricing
 * @module FlashSalePriceConstants
 */

/**
 * Flash sale price object
 * Main container for all flash sale price-related constants
 */
export const FLASH_SALE_PRICE = 'FLASH_SALE_PRICE' as const;

/**
 * Flash sale price type labels
 */
export const FLASH_SALE_PRICE_TYPE_LABELS = {
  FIXED: 'Fixed Price',
  PERCENTAGE: 'Percentage Discount',
  TIERED: 'Tiered Pricing',
  DYNAMIC: 'Dynamic Pricing',
  BUNDLE: 'Bundle Pricing',
  VOLUME: 'Volume Pricing',
  PROMOTIONAL: 'Promotional Pricing',
  CLEARANCE: 'Clearance Pricing',
} as const;

/**
 * Flash sale price category labels
 */
export const FLASH_SALE_PRICE_CATEGORY_LABELS = {
  DISCOUNT: 'Discount',
  PROMOTION: 'Promotion',
  SALE: 'Sale',
  CLEARANCE: 'Clearance',
  FLASH: 'Flash Sale',
  SPECIAL: 'Special Offer',
} as const;

/**
 * Flash sale price status labels
 */
export const FLASH_SALE_PRICE_STATUS_LABELS = {
  ACTIVE: 'Active',
  PENDING: 'Pending',
  APPROVED: 'Approved',
  REJECTED: 'Rejected',
  EXPIRED: 'Expired',
  CANCELLED: 'Cancelled',
  ARCHIVED: 'Archived',
} as const;

/**
 * Flash sale price status colors
 */
export const FLASH_SALE_PRICE_STATUS_COLORS = {
  ACTIVE: '#34D399',
  PENDING: '#FBBF24',
  APPROVED: '#60A5FA',
  REJECTED: '#F87171',
  EXPIRED: '#F59E0B',
  CANCELLED: '#9CA3AF',
  ARCHIVED: '#6B7280',
} as const;

/**
 * Flash sale price calculation types
 */
export const FLASH_SALE_PRICE_CALCULATION_LABELS = {
  PERCENTAGE_OFF: 'Percentage Off',
  FIXED_AMOUNT: 'Fixed Amount',
  PER_UNIT: 'Per Unit',
  BULK: 'Bulk Discount',
  VOLUME: 'Volume Discount',
  BUNDLE: 'Bundle Discount',
} as const;

/**
 * Flash sale price currency labels
 */
export const FLASH_SALE_PRICE_CURRENCY_LABELS = {
  BDT: 'BDT',
  USD: 'USD',
  EUR: 'EUR',
  GBP: 'GBP',
} as const;

// ============================================================
// Types
// ============================================================

/**
 * Flash sale price type
 */
export type FlashSalePriceType = keyof typeof FLASH_SALE_PRICE_TYPE_LABELS;

/**
 * Flash sale price category
 */
export type FlashSalePriceCategory = keyof typeof FLASH_SALE_PRICE_CATEGORY_LABELS;

/**
 * Flash sale price status
 */
export type FlashSalePriceStatus = keyof typeof FLASH_SALE_PRICE_STATUS_LABELS;

/**
 * Flash sale price calculation
 */
export type FlashSalePriceCalculation = keyof typeof FLASH_SALE_PRICE_CALCULATION_LABELS;

/**
 * Flash sale price currency
 */
export type FlashSalePriceCurrency = keyof typeof FLASH_SALE_PRICE_CURRENCY_LABELS;

// ============================================================
// Helper Functions
// ============================================================

/**
 * Get price type label
 */
export const getFlashSalePriceTypeLabel = (type: FlashSalePriceType): string =>
  FLASH_SALE_PRICE_TYPE_LABELS[type] || type;

/**
 * Get price category label
 */
export const getFlashSalePriceCategoryLabel = (category: FlashSalePriceCategory): string =>
  FLASH_SALE_PRICE_CATEGORY_LABELS[category] || category;

/**
 * Get price status label
 */
export const getFlashSalePriceStatusLabel = (status: FlashSalePriceStatus): string =>
  FLASH_SALE_PRICE_STATUS_LABELS[status] || status;

/**
 * Get price status color
 */
export const getFlashSalePriceStatusColor = (status: FlashSalePriceStatus): string =>
  FLASH_SALE_PRICE_STATUS_COLORS[status] || '#6B7280';

/**
 * Get price calculation label
 */
export const getFlashSalePriceCalculationLabel = (calculation: FlashSalePriceCalculation): string =>
  FLASH_SALE_PRICE_CALCULATION_LABELS[calculation] || calculation;

/**
 * Get price currency label
 */
export const getFlashSalePriceCurrencyLabel = (currency: FlashSalePriceCurrency): string =>
  FLASH_SALE_PRICE_CURRENCY_LABELS[currency] || currency;

/**
 * Check if price is active
 */
export const isFlashSalePriceActive = (status: FlashSalePriceStatus): boolean =>
  status === 'ACTIVE';

/**
 * Check if price is pending
 */
export const isFlashSalePricePending = (status: FlashSalePriceStatus): boolean =>
  status === 'PENDING';

/**
 * Check if price is approved
 */
export const isFlashSalePriceApproved = (status: FlashSalePriceStatus): boolean =>
  status === 'APPROVED';

/**
 * Check if price is expired
 */
export const isFlashSalePriceExpired = (status: FlashSalePriceStatus): boolean =>
  status === 'EXPIRED';

/**
 * Check if price is valid (active or approved)
 */
export const isFlashSalePriceValid = (status: FlashSalePriceStatus): boolean =>
  status === 'ACTIVE' || status === 'APPROVED';

/**
 * Get default price type
 */
export const getFlashSalePriceDefaultType = (): FlashSalePriceType => 'PERCENTAGE';

/**
 * Get default price currency
 */
export const getFlashSalePriceDefaultCurrency = (): FlashSalePriceCurrency => 'BDT';

/**
 * Get default price calculation
 */
export const getFlashSalePriceDefaultCalculation = (): FlashSalePriceCalculation =>
  'PERCENTAGE_OFF';

/**
 * Get max discount percentage
 */
export const getFlashSalePriceMaxDiscount = (): number => 90;

/**
 * Get min discount percentage
 */
export const getFlashSalePriceMinDiscount = (): number => 0;

/**
 * Get max price amount
 */
export const getFlashSalePriceMaxAmount = (): number => 1000000;

/**
 * Get min price amount
 */
export const getFlashSalePriceMinAmount = (): number => 0;

/**
 * Get default tier levels
 */
export const getFlashSalePriceDefaultTiers = (): number => 3;

/**
 * Get max tier levels
 */
export const getFlashSalePriceMaxTiers = (): number => 10;
