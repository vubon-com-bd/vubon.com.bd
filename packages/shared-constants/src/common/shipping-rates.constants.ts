/**
 * Shipping Rates Constants (numeric, calculator-only)
 * @module shared-constants/common/shipping-rates
 *
 * Note: This is separate from `business/cart/shipping.constants` (SHIPPING),
 * which holds shipping methods, statuses, and delivery days.
 * This file holds only numeric rates used by the shipping calculator.
 */

export const SHIPPING_RATES = {
  BASE: 50,
  PER_KG: 10,
  PER_KM: 2,
  FREE_THRESHOLD: 1000,
  MAX_WEIGHT_KG: 100,
  MAX_DISTANCE_KM: 1000,
} as const;
