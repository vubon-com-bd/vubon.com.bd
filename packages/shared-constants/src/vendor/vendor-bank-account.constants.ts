/**
 * Vendor Bank Account Constants
 * Configuration for vendor bank accounts
 */

export const VENDOR_BANK_ACCOUNT = {
  // Account Types
  TYPES: {
    SAVINGS: 'savings',
    CURRENT: 'current',
    BUSINESS: 'business',
    CORPORATE: 'corporate',
  } as const,

  // Account Statuses
  STATUS: {
    PENDING: 'pending',
    VERIFIED: 'verified',
    REJECTED: 'rejected',
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    CLOSED: 'closed',
  } as const,

  // Account Currencies
  CURRENCIES: {
    BDT: 'BDT',
    USD: 'USD',
    EUR: 'EUR',
    GBP: 'GBP',
  } as const,

  // Account Types (expanded)
  ACCOUNT_TYPES: {
    PERSONAL: 'personal',
    BUSINESS: 'business',
    JOINT: 'joint',
  } as const,

  // Verification Methods
  VERIFICATION_METHODS: {
    DOCUMENT: 'document',
    MICRO_DEPOSIT: 'micro_deposit',
    VIDEO_CALL: 'video_call',
    IN_PERSON: 'in_person',
  } as const,

  // Account Limits
  LIMITS: {
    MIN_DEPOSIT: 100,
    MAX_DEPOSIT: 1000000,
    MAX_WITHDRAWAL: 500000,
    MAX_TRANSACTIONS_PER_DAY: 10,
    MAX_TRANSACTIONS_PER_MONTH: 100,
  } as const,
} as const;

// Account Types
export type VendorBankAccountType =
  (typeof VENDOR_BANK_ACCOUNT.TYPES)[keyof typeof VENDOR_BANK_ACCOUNT.TYPES];

// Account Statuses
export type VendorBankAccountStatus =
  (typeof VENDOR_BANK_ACCOUNT.STATUS)[keyof typeof VENDOR_BANK_ACCOUNT.STATUS];

// Account Currencies
export type VendorBankAccountCurrency =
  (typeof VENDOR_BANK_ACCOUNT.CURRENCIES)[keyof typeof VENDOR_BANK_ACCOUNT.CURRENCIES];

// Verification Methods
export type VendorBankAccountVerificationMethod =
  (typeof VENDOR_BANK_ACCOUNT.VERIFICATION_METHODS)[keyof typeof VENDOR_BANK_ACCOUNT.VERIFICATION_METHODS];

// Utility Functions
export function vendorBankAccountGetTypeLabel(type: VendorBankAccountType): string {
  const labels: Record<VendorBankAccountType, string> = {
    [VENDOR_BANK_ACCOUNT.TYPES.SAVINGS]: 'Savings Account',
    [VENDOR_BANK_ACCOUNT.TYPES.CURRENT]: 'Current Account',
    [VENDOR_BANK_ACCOUNT.TYPES.BUSINESS]: 'Business Account',
    [VENDOR_BANK_ACCOUNT.TYPES.CORPORATE]: 'Corporate Account',
  };
  return labels[type] || 'Unknown';
}

export function vendorBankAccountGetStatusLabel(status: VendorBankAccountStatus): string {
  const labels: Record<VendorBankAccountStatus, string> = {
    [VENDOR_BANK_ACCOUNT.STATUS.PENDING]: 'Pending',
    [VENDOR_BANK_ACCOUNT.STATUS.VERIFIED]: 'Verified',
    [VENDOR_BANK_ACCOUNT.STATUS.REJECTED]: 'Rejected',
    [VENDOR_BANK_ACCOUNT.STATUS.ACTIVE]: 'Active',
    [VENDOR_BANK_ACCOUNT.STATUS.INACTIVE]: 'Inactive',
    [VENDOR_BANK_ACCOUNT.STATUS.CLOSED]: 'Closed',
  };
  return labels[status] || 'Unknown';
}

export function vendorBankAccountGetCurrencyLabel(currency: VendorBankAccountCurrency): string {
  const labels: Record<VendorBankAccountCurrency, string> = {
    [VENDOR_BANK_ACCOUNT.CURRENCIES.BDT]: 'BDT',
    [VENDOR_BANK_ACCOUNT.CURRENCIES.USD]: 'USD',
    [VENDOR_BANK_ACCOUNT.CURRENCIES.EUR]: 'EUR',
    [VENDOR_BANK_ACCOUNT.CURRENCIES.GBP]: 'GBP',
  };
  return labels[currency] || 'Unknown';
}

export function vendorBankAccountIsActive(status: VendorBankAccountStatus): boolean {
  return (
    status === VENDOR_BANK_ACCOUNT.STATUS.ACTIVE || status === VENDOR_BANK_ACCOUNT.STATUS.VERIFIED
  );
}

export function vendorBankAccountIsVerified(status: VendorBankAccountStatus): boolean {
  return status === VENDOR_BANK_ACCOUNT.STATUS.VERIFIED;
}

export function vendorBankAccountCanTransact(status: VendorBankAccountStatus): boolean {
  return (
    status === VENDOR_BANK_ACCOUNT.STATUS.ACTIVE || status === VENDOR_BANK_ACCOUNT.STATUS.VERIFIED
  );
}

export function vendorBankAccountGetVerificationMethodLabel(
  method: VendorBankAccountVerificationMethod
): string {
  const labels: Record<VendorBankAccountVerificationMethod, string> = {
    [VENDOR_BANK_ACCOUNT.VERIFICATION_METHODS.DOCUMENT]: 'Document Verification',
    [VENDOR_BANK_ACCOUNT.VERIFICATION_METHODS.MICRO_DEPOSIT]: 'Micro Deposit',
    [VENDOR_BANK_ACCOUNT.VERIFICATION_METHODS.VIDEO_CALL]: 'Video Call',
    [VENDOR_BANK_ACCOUNT.VERIFICATION_METHODS.IN_PERSON]: 'In-Person Verification',
  };
  return labels[method] || 'Unknown';
}
