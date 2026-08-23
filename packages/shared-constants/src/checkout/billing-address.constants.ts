/**
 * Billing Address Constants
 * Billing address definitions for checkout
 */

export const BILLING_ADDRESS = {
  // Address Types
  TYPES: {
    RESIDENTIAL: 'residential',
    COMMERCIAL: 'commercial',
    OFFICE: 'office',
    OTHER: 'other',
  } as const,

  // Address Statuses
  STATUSES: {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    PENDING_VERIFICATION: 'pending_verification',
    VERIFIED: 'verified',
    REJECTED: 'rejected',
  } as const,

  // Address Fields
  FIELDS: {
    FULL_NAME: 'full_name',
    PHONE: 'phone',
    EMAIL: 'email',
    ADDRESS_LINE_1: 'address_line_1',
    ADDRESS_LINE_2: 'address_line_2',
    CITY: 'city',
    STATE: 'state',
    POSTAL_CODE: 'postal_code',
    COUNTRY: 'country',
    COMPANY: 'company',
    VAT_NUMBER: 'vat_number',
    TIN_NUMBER: 'tin_number',
  } as const,

  // Address Defaults
  DEFAULTS: {
    DEFAULT_TYPE: 'residential',
    DEFAULT_STATUS: 'active',
    DEFAULT_COUNTRY: 'Bangladesh',
    DEFAULT_COUNTRY_CODE: 'BD',
    DEFAULT_CURRENCY: 'BDT',
    DEFAULT_POSTAL_CODE: '1000',
  } as const,

  // Address Limits
  LIMITS: {
    MIN_NAME_LENGTH: 3,
    MAX_NAME_LENGTH: 100,
    MAX_ADDRESS_LINE_LENGTH: 200,
    MAX_CITY_LENGTH: 50,
    MAX_STATE_LENGTH: 50,
    MAX_POSTAL_CODE_LENGTH: 20,
    MAX_COUNTRY_LENGTH: 50,
    MAX_PHONE_LENGTH: 20,
    MAX_EMAIL_LENGTH: 100,
    MAX_COMPANY_LENGTH: 100,
    MAX_VAT_NUMBER_LENGTH: 50,
    MAX_TIN_NUMBER_LENGTH: 50,
  } as const,
} as const;

// Address Types
export type BillingAddressType = (typeof BILLING_ADDRESS.TYPES)[keyof typeof BILLING_ADDRESS.TYPES];

// Address Statuses
export type BillingAddressStatus =
  (typeof BILLING_ADDRESS.STATUSES)[keyof typeof BILLING_ADDRESS.STATUSES];

// Address Fields
export type BillingAddressField =
  (typeof BILLING_ADDRESS.FIELDS)[keyof typeof BILLING_ADDRESS.FIELDS];

// Address Defaults
export type BillingAddressDefault =
  (typeof BILLING_ADDRESS.DEFAULTS)[keyof typeof BILLING_ADDRESS.DEFAULTS];

// Address Limits
export type BillingAddressLimit =
  (typeof BILLING_ADDRESS.LIMITS)[keyof typeof BILLING_ADDRESS.LIMITS];

// Utility Functions
export function billingaddressGetTypeLabel(type: BillingAddressType): string {
  const labels: Record<BillingAddressType, string> = {
    [BILLING_ADDRESS.TYPES.RESIDENTIAL]: 'Residential',
    [BILLING_ADDRESS.TYPES.COMMERCIAL]: 'Commercial',
    [BILLING_ADDRESS.TYPES.OFFICE]: 'Office',
    [BILLING_ADDRESS.TYPES.OTHER]: 'Other',
  };
  return labels[type] || 'Unknown Type';
}

export function billingaddressGetStatusLabel(status: BillingAddressStatus): string {
  const labels: Record<BillingAddressStatus, string> = {
    [BILLING_ADDRESS.STATUSES.ACTIVE]: 'Active',
    [BILLING_ADDRESS.STATUSES.INACTIVE]: 'Inactive',
    [BILLING_ADDRESS.STATUSES.PENDING_VERIFICATION]: 'Pending Verification',
    [BILLING_ADDRESS.STATUSES.VERIFIED]: 'Verified',
    [BILLING_ADDRESS.STATUSES.REJECTED]: 'Rejected',
  };
  return labels[status] || 'Unknown Status';
}

export function billingaddressGetFieldLabel(field: BillingAddressField): string {
  const labels: Record<BillingAddressField, string> = {
    [BILLING_ADDRESS.FIELDS.FULL_NAME]: 'Full Name',
    [BILLING_ADDRESS.FIELDS.PHONE]: 'Phone Number',
    [BILLING_ADDRESS.FIELDS.EMAIL]: 'Email Address',
    [BILLING_ADDRESS.FIELDS.ADDRESS_LINE_1]: 'Address Line 1',
    [BILLING_ADDRESS.FIELDS.ADDRESS_LINE_2]: 'Address Line 2',
    [BILLING_ADDRESS.FIELDS.CITY]: 'City',
    [BILLING_ADDRESS.FIELDS.STATE]: 'State',
    [BILLING_ADDRESS.FIELDS.POSTAL_CODE]: 'Postal Code',
    [BILLING_ADDRESS.FIELDS.COUNTRY]: 'Country',
    [BILLING_ADDRESS.FIELDS.COMPANY]: 'Company',
    [BILLING_ADDRESS.FIELDS.VAT_NUMBER]: 'VAT Number',
    [BILLING_ADDRESS.FIELDS.TIN_NUMBER]: 'TIN Number',
  };
  return labels[field] || 'Unknown Field';
}

export function billingaddressIsResidential(type: BillingAddressType): boolean {
  return type === BILLING_ADDRESS.TYPES.RESIDENTIAL;
}

export function billingaddressIsCommercial(type: BillingAddressType): boolean {
  return type === BILLING_ADDRESS.TYPES.COMMERCIAL || type === BILLING_ADDRESS.TYPES.OFFICE;
}

export function billingaddressIsVerified(status: BillingAddressStatus): boolean {
  return status === BILLING_ADDRESS.STATUSES.VERIFIED || status === BILLING_ADDRESS.STATUSES.ACTIVE;
}

export function billingaddressGetDefaultCountry(): string {
  return BILLING_ADDRESS.DEFAULTS.DEFAULT_COUNTRY;
}

export function billingaddressGetDefaultCountryCode(): string {
  return BILLING_ADDRESS.DEFAULTS.DEFAULT_COUNTRY_CODE;
}

export function billingaddressGetDefaultPostalCode(): string {
  return BILLING_ADDRESS.DEFAULTS.DEFAULT_POSTAL_CODE;
}
