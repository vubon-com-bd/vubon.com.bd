/**
 * Pricing Constants
 * Pricing configuration and settings
 */

export const PRODUCTPRICING = {
  // Pricing Types
  TYPES: {
    FIXED: 'fixed',
    DYNAMIC: 'dynamic',
    TIERED: 'tiered',
    VOLUME: 'volume',
    PROMOTIONAL: 'promotional',
    MEMBERSHIP: 'membership',
    SUBSCRIPTION: 'subscription',
    BUNDLE: 'bundle',
    CUSTOM: 'custom',
  } as const,

  // Price Statuses
  STATUSES: {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    SCHEDULED: 'scheduled',
    EXPIRED: 'expired',
    DRAFT: 'draft',
  } as const,

  // Currency Codes
  CURRENCIES: {
    BDT: 'BDT',
    USD: 'USD',
    EUR: 'EUR',
    GBP: 'GBP',
    JPY: 'JPY',
    CAD: 'CAD',
    AUD: 'AUD',
    INR: 'INR',
    PKR: 'PKR',
    SGD: 'SGD',
    MYR: 'MYR',
    AED: 'AED',
  } as const,

  // Tax Classes
  TAX_CLASSES: {
    STANDARD: 'standard',
    REDUCED: 'reduced',
    ZERO: 'zero',
    EXEMPT: 'exempt',
    CUSTOM: 'custom',
  } as const,

  // Pricing Defaults
  DEFAULTS: {
    DEFAULT_TYPE: 'fixed',
    DEFAULT_STATUS: 'active',
    DEFAULT_CURRENCY: 'BDT',
    DEFAULT_TAX_CLASS: 'standard',
    DEFAULT_PRICE: 0,
    DEFAULT_COMPARE_PRICE: 0,
    DEFAULT_COST_PRICE: 0,
    DEFAULT_MARKUP_PERCENTAGE: 0,
    DEFAULT_DISCOUNT_PERCENTAGE: 0,
    DEFAULT_MIN_QUANTITY: 1,
    DEFAULT_MAX_QUANTITY: 0,
  } as const,

  // Pricing Limits
  LIMITS: {
    MIN_PRICE: 0,
    MAX_PRICE: 100000000,
    MIN_COMPARE_PRICE: 0,
    MAX_COMPARE_PRICE: 100000000,
    MIN_COST_PRICE: 0,
    MAX_COST_PRICE: 100000000,
    MIN_MARKUP: 0,
    MAX_MARKUP: 1000,
    MIN_DISCOUNT: 0,
    MAX_DISCOUNT: 100,
    MIN_QUANTITY: 1,
    MAX_QUANTITY: 10000,
  } as const,
} as const;

// Pricing Types
export type ProductPricingType = (typeof PRODUCTPRICING.TYPES)[keyof typeof PRODUCTPRICING.TYPES];

// Price Statuses
export type ProductPriceStatus =
  (typeof PRODUCTPRICING.STATUSES)[keyof typeof PRODUCTPRICING.STATUSES];

// Currency Codes
export type ProductCurrency =
  (typeof PRODUCTPRICING.CURRENCIES)[keyof typeof PRODUCTPRICING.CURRENCIES];

// Tax Classes
export type ProductTaxClass =
  (typeof PRODUCTPRICING.TAX_CLASSES)[keyof typeof PRODUCTPRICING.TAX_CLASSES];

// Pricing Defaults
export type ProductPricingDefault =
  (typeof PRODUCTPRICING.DEFAULTS)[keyof typeof PRODUCTPRICING.DEFAULTS];

// Pricing Limits
export type ProductPricingLimit =
  (typeof PRODUCTPRICING.LIMITS)[keyof typeof PRODUCTPRICING.LIMITS];

// Utility Functions
export function productpricingGetTypeLabel(type: ProductPricingType): string {
  const labels: Record<ProductPricingType, string> = {
    [PRODUCTPRICING.TYPES.FIXED]: 'Fixed',
    [PRODUCTPRICING.TYPES.DYNAMIC]: 'Dynamic',
    [PRODUCTPRICING.TYPES.TIERED]: 'Tiered',
    [PRODUCTPRICING.TYPES.VOLUME]: 'Volume',
    [PRODUCTPRICING.TYPES.PROMOTIONAL]: 'Promotional',
    [PRODUCTPRICING.TYPES.MEMBERSHIP]: 'Membership',
    [PRODUCTPRICING.TYPES.SUBSCRIPTION]: 'Subscription',
    [PRODUCTPRICING.TYPES.BUNDLE]: 'Bundle',
    [PRODUCTPRICING.TYPES.CUSTOM]: 'Custom',
  };
  return labels[type] || 'Unknown Pricing Type';
}

export function productpricingGetStatusLabel(status: ProductPriceStatus): string {
  const labels: Record<ProductPriceStatus, string> = {
    [PRODUCTPRICING.STATUSES.ACTIVE]: 'Active',
    [PRODUCTPRICING.STATUSES.INACTIVE]: 'Inactive',
    [PRODUCTPRICING.STATUSES.SCHEDULED]: 'Scheduled',
    [PRODUCTPRICING.STATUSES.EXPIRED]: 'Expired',
    [PRODUCTPRICING.STATUSES.DRAFT]: 'Draft',
  };
  return labels[status] || 'Unknown Status';
}

export function productpricingGetCurrencySymbol(currency: ProductCurrency): string {
  const symbols: Record<ProductCurrency, string> = {
    [PRODUCTPRICING.CURRENCIES.BDT]: '৳',
    [PRODUCTPRICING.CURRENCIES.USD]: '$',
    [PRODUCTPRICING.CURRENCIES.EUR]: '€',
    [PRODUCTPRICING.CURRENCIES.GBP]: '£',
    [PRODUCTPRICING.CURRENCIES.JPY]: '¥',
    [PRODUCTPRICING.CURRENCIES.CAD]: 'C$',
    [PRODUCTPRICING.CURRENCIES.AUD]: 'A$',
    [PRODUCTPRICING.CURRENCIES.INR]: '₹',
    [PRODUCTPRICING.CURRENCIES.PKR]: 'Rs',
    [PRODUCTPRICING.CURRENCIES.SGD]: 'S$',
    [PRODUCTPRICING.CURRENCIES.MYR]: 'RM',
    [PRODUCTPRICING.CURRENCIES.AED]: 'د.إ',
  };
  return symbols[currency] || '$';
}

export function productpricingGetTaxClassLabel(taxClass: ProductTaxClass): string {
  const labels: Record<ProductTaxClass, string> = {
    [PRODUCTPRICING.TAX_CLASSES.STANDARD]: 'Standard',
    [PRODUCTPRICING.TAX_CLASSES.REDUCED]: 'Reduced',
    [PRODUCTPRICING.TAX_CLASSES.ZERO]: 'Zero',
    [PRODUCTPRICING.TAX_CLASSES.EXEMPT]: 'Exempt',
    [PRODUCTPRICING.TAX_CLASSES.CUSTOM]: 'Custom',
  };
  return labels[taxClass] || 'Unknown Tax Class';
}

export function productpricingIsActive(status: ProductPriceStatus): boolean {
  const activeStatuses: ProductPriceStatus[] = [
    PRODUCTPRICING.STATUSES.ACTIVE,
    PRODUCTPRICING.STATUSES.SCHEDULED,
  ];
  return activeStatuses.includes(status);
}

export function productpricingIsFixed(type: ProductPricingType): boolean {
  return type === PRODUCTPRICING.TYPES.FIXED;
}

export function productpricingIsDynamic(type: ProductPricingType): boolean {
  return type === PRODUCTPRICING.TYPES.DYNAMIC;
}

export function productpricingIsTiered(type: ProductPricingType): boolean {
  return type === PRODUCTPRICING.TYPES.TIERED;
}

export function productpricingGetDefaultCurrency(): ProductCurrency {
  return PRODUCTPRICING.DEFAULTS.DEFAULT_CURRENCY;
}

export function productpricingGetDefaultTaxClass(): ProductTaxClass {
  return PRODUCTPRICING.DEFAULTS.DEFAULT_TAX_CLASS;
}
