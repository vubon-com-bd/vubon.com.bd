/**
 * Tax Constants
 * Tax configuration and settings for cart
 */

export const TAX = {
  // Tax Types
  TYPES: {
    VAT: 'vat',
    GST: 'gst',
    SALES_TAX: 'sales_tax',
    USE_TAX: 'use_tax',
    CUSTOMS: 'customs',
    EXCISE: 'excise',
    IMPORT: 'import',
    EXPORT: 'export',
    CUSTOM: 'custom',
  } as const,

  // Tax Categories
  CATEGORIES: {
    STANDARD: 'standard',
    REDUCED: 'reduced',
    ZERO: 'zero',
    EXEMPT: 'exempt',
    CUSTOM: 'custom',
  } as const,

  // Tax Statuses
  STATUSES: {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    PENDING: 'pending',
    APPROVED: 'approved',
    REJECTED: 'rejected',
    ARCHIVED: 'archived',
    EXPIRED: 'expired',
  } as const,

  // Tax Calculation Types
  CALCULATION_TYPES: {
    EXCLUSIVE: 'exclusive',
    INCLUSIVE: 'inclusive',
    COMPOUND: 'compound',
    PROGRESSIVE: 'progressive',
    CUSTOM: 'custom',
  } as const,

  // Tax Jurisdictions
  JURISDICTIONS: {
    FEDERAL: 'federal',
    STATE: 'state',
    PROVINCIAL: 'provincial',
    COUNTY: 'county',
    CITY: 'city',
    MUNICIPAL: 'municipal',
    DISTRICT: 'district',
    SPECIAL: 'special',
    CUSTOM: 'custom',
  } as const,

  // Tax Rates
  RATES: {
    // VAT rates
    VAT_STANDARD: 15,
    VAT_REDUCED: 5,
    VAT_ZERO: 0,

    // GST rates
    GST_STANDARD: 18,
    GST_REDUCED: 5,
    GST_ZERO: 0,

    // Default rates
    DEFAULT_RATE: 15,
    MIN_RATE: 0,
    MAX_RATE: 100,

    // Region specific
    SAUDI_VAT: 15,
    UAE_VAT: 5,
    KUWAIT_VAT: 0,
    QATAR_VAT: 0,
    BAHRAIN_VAT: 0,
    OMAN_VAT: 0,
  } as const,

  // Tax Defaults
  DEFAULTS: {
    DEFAULT_TYPE: 'vat',
    DEFAULT_CATEGORY: 'standard',
    DEFAULT_STATUS: 'active',
    DEFAULT_CALCULATION: 'exclusive',
    DEFAULT_JURISDICTION: 'federal',
    DEFAULT_RATE: 15,
    DEFAULT_ROUNDING: 2,
    DEFAULT_COUNTRY: 'SA',
    DEFAULT_CURRENCY: 'SAR',
    DEFAULT_INCLUDED_IN_PRICE: false,
    DEFAULT_COMPOUND_ENABLED: false,
    DEFAULT_ON_SHIPPING: true,
    DEFAULT_ON_DISCOUNT: true,
    DEFAULT_EXEMPTION_ENABLED: true,
    MAX_RATE: 100,
    MIN_RATE: 0,
  } as const,

  // Tax Limits
  LIMITS: {
    MIN_RATE: 0,
    MAX_RATE: 100,
    MIN_AMOUNT: 0,
    MAX_AMOUNT: 1000000,
    MAX_JURISDICTIONS: 5,
    MAX_CATEGORIES: 10,
    MAX_ROUNDING: 4,
    MIN_ROUNDING: 0,
  } as const,

  // Tax Errors
  ERRORS: {
    TAX_NOT_CONFIGURED: 'tax_not_configured',
    INVALID_RATE: 'invalid_rate',
    INVALID_JURISDICTION: 'invalid_jurisdiction',
    INVALID_CATEGORY: 'invalid_category',
    INVALID_CALCULATION: 'invalid_calculation',
    RATE_NOT_FOUND: 'rate_not_found',
    EXEMPTION_FAILED: 'exemption_failed',
    CALCULATION_FAILED: 'calculation_failed',
    PERMISSION_DENIED: 'permission_denied',
  } as const,
} as const;

// Tax Types
export type TaxType = (typeof TAX.TYPES)[keyof typeof TAX.TYPES];

// Tax Categories
export type TaxCategory = (typeof TAX.CATEGORIES)[keyof typeof TAX.CATEGORIES];

// Tax Statuses
export type TaxStatus = (typeof TAX.STATUSES)[keyof typeof TAX.STATUSES];

// Tax Calculation Types
export type TaxCalculationType = (typeof TAX.CALCULATION_TYPES)[keyof typeof TAX.CALCULATION_TYPES];

// Tax Jurisdictions
export type TaxJurisdiction = (typeof TAX.JURISDICTIONS)[keyof typeof TAX.JURISDICTIONS];

// Tax Rates
export type TaxRate = (typeof TAX.RATES)[keyof typeof TAX.RATES];

// Tax Defaults
export type TaxDefault = (typeof TAX.DEFAULTS)[keyof typeof TAX.DEFAULTS];

// Tax Limits
export type TaxLimit = (typeof TAX.LIMITS)[keyof typeof TAX.LIMITS];

// Tax Errors
export type TaxError = (typeof TAX.ERRORS)[keyof typeof TAX.ERRORS];

// Utility Functions
export function taxGetTypeLabel(type: TaxType): string {
  const labels: Record<TaxType, string> = {
    [TAX.TYPES.VAT]: 'VAT',
    [TAX.TYPES.GST]: 'GST',
    [TAX.TYPES.SALES_TAX]: 'Sales Tax',
    [TAX.TYPES.USE_TAX]: 'Use Tax',
    [TAX.TYPES.CUSTOMS]: 'Customs',
    [TAX.TYPES.EXCISE]: 'Excise',
    [TAX.TYPES.IMPORT]: 'Import',
    [TAX.TYPES.EXPORT]: 'Export',
    [TAX.TYPES.CUSTOM]: 'Custom',
  };
  return labels[type] || 'Unknown Tax Type';
}

export function taxGetCategoryLabel(category: TaxCategory): string {
  const labels: Record<TaxCategory, string> = {
    [TAX.CATEGORIES.STANDARD]: 'Standard',
    [TAX.CATEGORIES.REDUCED]: 'Reduced',
    [TAX.CATEGORIES.ZERO]: 'Zero',
    [TAX.CATEGORIES.EXEMPT]: 'Exempt',
    [TAX.CATEGORIES.CUSTOM]: 'Custom',
  };
  return labels[category] || 'Unknown Category';
}

export function taxGetStatusLabel(status: TaxStatus): string {
  const labels: Record<TaxStatus, string> = {
    [TAX.STATUSES.ACTIVE]: 'Active',
    [TAX.STATUSES.INACTIVE]: 'Inactive',
    [TAX.STATUSES.PENDING]: 'Pending',
    [TAX.STATUSES.APPROVED]: 'Approved',
    [TAX.STATUSES.REJECTED]: 'Rejected',
    [TAX.STATUSES.ARCHIVED]: 'Archived',
    [TAX.STATUSES.EXPIRED]: 'Expired',
  };
  return labels[status] || 'Unknown Status';
}

export function taxGetCalculationTypeLabel(calculationType: TaxCalculationType): string {
  const labels: Record<TaxCalculationType, string> = {
    [TAX.CALCULATION_TYPES.EXCLUSIVE]: 'Exclusive',
    [TAX.CALCULATION_TYPES.INCLUSIVE]: 'Inclusive',
    [TAX.CALCULATION_TYPES.COMPOUND]: 'Compound',
    [TAX.CALCULATION_TYPES.PROGRESSIVE]: 'Progressive',
    [TAX.CALCULATION_TYPES.CUSTOM]: 'Custom',
  };
  return labels[calculationType] || 'Unknown Calculation Type';
}

export function taxGetJurisdictionLabel(jurisdiction: TaxJurisdiction): string {
  const labels: Record<TaxJurisdiction, string> = {
    [TAX.JURISDICTIONS.FEDERAL]: 'Federal',
    [TAX.JURISDICTIONS.STATE]: 'State',
    [TAX.JURISDICTIONS.PROVINCIAL]: 'Provincial',
    [TAX.JURISDICTIONS.COUNTY]: 'County',
    [TAX.JURISDICTIONS.CITY]: 'City',
    [TAX.JURISDICTIONS.MUNICIPAL]: 'Municipal',
    [TAX.JURISDICTIONS.DISTRICT]: 'District',
    [TAX.JURISDICTIONS.SPECIAL]: 'Special',
    [TAX.JURISDICTIONS.CUSTOM]: 'Custom',
  };
  return labels[jurisdiction] || 'Unknown Jurisdiction';
}

export function taxGetErrorLabel(error: TaxError): string {
  const labels: Record<TaxError, string> = {
    [TAX.ERRORS.TAX_NOT_CONFIGURED]: 'Tax Not Configured',
    [TAX.ERRORS.INVALID_RATE]: 'Invalid Rate',
    [TAX.ERRORS.INVALID_JURISDICTION]: 'Invalid Jurisdiction',
    [TAX.ERRORS.INVALID_CATEGORY]: 'Invalid Category',
    [TAX.ERRORS.INVALID_CALCULATION]: 'Invalid Calculation',
    [TAX.ERRORS.RATE_NOT_FOUND]: 'Rate Not Found',
    [TAX.ERRORS.EXEMPTION_FAILED]: 'Exemption Failed',
    [TAX.ERRORS.CALCULATION_FAILED]: 'Calculation Failed',
    [TAX.ERRORS.PERMISSION_DENIED]: 'Permission Denied',
  };
  return labels[error] || 'Unknown Error';
}

export function taxIsActive(status: TaxStatus): boolean {
  const activeStatuses: TaxStatus[] = [TAX.STATUSES.ACTIVE, TAX.STATUSES.APPROVED];
  return activeStatuses.includes(status);
}

export function taxIsStandard(category: TaxCategory): boolean {
  return category === TAX.CATEGORIES.STANDARD;
}

export function taxIsExempt(category: TaxCategory): boolean {
  return category === TAX.CATEGORIES.EXEMPT;
}

export function taxIsZero(category: TaxCategory): boolean {
  return category === TAX.CATEGORIES.ZERO;
}

export function taxGetDefaultRate(): number {
  return TAX.DEFAULTS.DEFAULT_RATE;
}

export function taxGetDefaultRounding(): number {
  return TAX.DEFAULTS.DEFAULT_ROUNDING;
}

export function taxGetMaxRate(): number {
  return TAX.DEFAULTS.MAX_RATE;
}

export function taxCalculate(
  amount: number,
  rate: number,
  calculationType: TaxCalculationType
): number {
  if (calculationType === TAX.CALCULATION_TYPES.EXCLUSIVE) {
    return amount * (rate / 100);
  }
  if (calculationType === TAX.CALCULATION_TYPES.INCLUSIVE) {
    return amount - amount / (1 + rate / 100);
  }
  if (calculationType === TAX.CALCULATION_TYPES.COMPOUND) {
    return amount * (rate / 100) * 1.1;
  }
  return amount * (rate / 100);
}
