/**
 * Cart Tax Constants (EXTENDS common/types)
 * @module shared-constants/business/cart/tax.constants
 */

import { TYPES } from '../../common/types.constants';

export const CART_TAX = {
  // Base types from common
  ...TYPES,

  // Tax specific
  DEFAULT_TAX_RATE: 15,
  DEFAULT_TAX_TYPE: 'vat',
  TAX_CACHE_TTL: 3600,

  // Tax type
  CART_TAX_TYPE: {
    VAT: 'vat',
    GST: 'gst',
    SALES_TAX: 'sales_tax',
    SERVICE_TAX: 'service_tax',
    INCOME_TAX: 'income_tax',
    WITHHOLDING_TAX: 'withholding_tax',
    EXCISE: 'excise',
    CUSTOMS: 'customs',
    IMPORT_DUTY: 'import_duty',
    EXPORT_DUTY: 'export_duty',
  } as const,

  // Tax calculation
  CART_TAX_CALCULATION: {
    EXCLUSIVE: 'exclusive',
    INCLUSIVE: 'inclusive',
    COMPOUND: 'compound',
    FIXED: 'fixed',
    PERCENTAGE: 'percentage',
    SLAB: 'slab',
  } as const,

  // Tax status
  CART_TAX_STATUS: {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    PENDING: 'pending',
    EXPIRED: 'expired',
    EXEMPT: 'exempt',
    ZERO_RATED: 'zero_rated',
  } as const,

  // Tax jurisdiction
  CART_TAX_JURISDICTION: {
    FEDERAL: 'federal',
    STATE: 'state',
    LOCAL: 'local',
    INTERNATIONAL: 'international',
    REGIONAL: 'regional',
    CUSTOM: 'custom',
  } as const,

  // Tax applicability
  CART_TAX_APPLICABILITY: {
    ALL_PRODUCTS: 'all_products',
    SPECIFIC_CATEGORIES: 'specific_categories',
    SPECIFIC_BRANDS: 'specific_brands',
    SPECIFIC_PRODUCTS: 'specific_products',
    EXCLUDE_CATEGORIES: 'exclude_categories',
    EXCLUDE_BRANDS: 'exclude_brands',
    EXCLUDE_PRODUCTS: 'exclude_products',
  } as const,

  // Bangladesh tax
  BD_TAX: {
    VAT_STANDARD: 15,
    VAT_REDUCED: 7.5,
    VAT_EXPORT: 0,
    VAT_EXEMPT_CATEGORIES: ['books', 'newspaper', 'medicine', 'agricultural_products'],
    TDS_RATES: {
      COMPANY: 10,
      INDIVIDUAL: 5,
      NON_RESIDENT: 20,
      CONTRACTOR: 6,
    },
    TCS_RATES: {
      GOODS: 2,
      SERVICES: 5,
    },
    INCOME_TAX: {
      INDIVIDUAL: {
        UP_TO_300000: 0,
        '300001-500000': 5,
        '500001-700000': 10,
        '700001-1000000': 15,
        '1000001-2000000': 20,
        ABOVE_2000000: 25,
      },
      COMPANY: {
        PUBLIC: 25,
        PRIVATE: 27.5,
        BANK: 40,
      },
    },
  } as const,
} as const;

export type CartTaxType = (typeof CART_TAX.CART_TAX_TYPE)[keyof typeof CART_TAX.CART_TAX_TYPE];
export type CartTaxCalculation =
  (typeof CART_TAX.CART_TAX_CALCULATION)[keyof typeof CART_TAX.CART_TAX_CALCULATION];
export type CartTaxStatus =
  (typeof CART_TAX.CART_TAX_STATUS)[keyof typeof CART_TAX.CART_TAX_STATUS];
export type CartTaxJurisdiction =
  (typeof CART_TAX.CART_TAX_JURISDICTION)[keyof typeof CART_TAX.CART_TAX_JURISDICTION];
export type CartTaxApplicability =
  (typeof CART_TAX.CART_TAX_APPLICABILITY)[keyof typeof CART_TAX.CART_TAX_APPLICABILITY];

export const CART_TAX_STATUS_LABELS: Record<CartTaxStatus, string> = {
  [CART_TAX.CART_TAX_STATUS.ACTIVE]: 'Active',
  [CART_TAX.CART_TAX_STATUS.INACTIVE]: 'Inactive',
  [CART_TAX.CART_TAX_STATUS.PENDING]: 'Pending',
  [CART_TAX.CART_TAX_STATUS.EXPIRED]: 'Expired',
  [CART_TAX.CART_TAX_STATUS.EXEMPT]: 'Exempt',
  [CART_TAX.CART_TAX_STATUS.ZERO_RATED]: 'Zero Rated',
};

export const CART_TAX_STATUS_COLORS: Record<CartTaxStatus, string> = {
  [CART_TAX.CART_TAX_STATUS.ACTIVE]: '#22c55e',
  [CART_TAX.CART_TAX_STATUS.INACTIVE]: '#9ca3af',
  [CART_TAX.CART_TAX_STATUS.PENDING]: '#eab308',
  [CART_TAX.CART_TAX_STATUS.EXPIRED]: '#9ca3af',
  [CART_TAX.CART_TAX_STATUS.EXEMPT]: '#60a5fa',
  [CART_TAX.CART_TAX_STATUS.ZERO_RATED]: '#8b5cf6',
};
