/**
 * Vendor Invoice Constants
 * Configuration for vendor invoices
 */

export const VENDOR_INVOICE = {
  // Invoice Types
  TYPES: {
    REGULAR: 'regular',
    CREDIT: 'credit',
    DEBIT: 'debit',
    REFUND: 'refund',
    ADJUSTMENT: 'adjustment',
    PROFORMA: 'proforma',
  } as const,

  // Invoice Statuses
  STATUS: {
    DRAFT: 'draft',
    PENDING: 'pending',
    APPROVED: 'approved',
    PAID: 'paid',
    OVERDUE: 'overdue',
    CANCELLED: 'cancelled',
    VOID: 'void',
  } as const,

  // Invoice Payment Methods
  PAYMENT_METHODS: {
    BANK_TRANSFER: 'bank_transfer',
    MOBILE_BANKING: 'mobile_banking',
    CREDIT_CARD: 'credit_card',
    DEBIT_CARD: 'debit_card',
    DIGITAL_WALLET: 'digital_wallet',
    CASH: 'cash',
  } as const,

  // Invoice Currencies
  CURRENCIES: {
    BDT: 'BDT',
    USD: 'USD',
    EUR: 'EUR',
    GBP: 'GBP',
  } as const,

  // Invoice Periods
  PERIODS: {
    MONTHLY: 'monthly',
    QUARTERLY: 'quarterly',
    SEMI_ANNUAL: 'semi_annual',
    ANNUAL: 'annual',
    CUSTOM: 'custom',
  } as const,

  // Invoice Payment Terms (in days)
  PAYMENT_TERMS: {
    IMMEDIATE: 0,
    NET_7: 7,
    NET_15: 15,
    NET_30: 30,
    NET_45: 45,
    NET_60: 60,
    NET_90: 90,
  } as const,

  // Invoice Discounts
  DISCOUNTS: {
    EARLY_PAYMENT: 2,
    BULK_ORDER: 5,
    SEASONAL: 10,
  } as const,

  // Invoice Limits
  LIMITS: {
    MIN_AMOUNT: 0,
    MAX_AMOUNT: 10000000,
    MAX_LINE_ITEMS: 100,
  } as const,
} as const;

// Invoice Types
export type VendorInvoiceType = (typeof VENDOR_INVOICE.TYPES)[keyof typeof VENDOR_INVOICE.TYPES];

// Invoice Statuses
export type VendorInvoiceStatus =
  (typeof VENDOR_INVOICE.STATUS)[keyof typeof VENDOR_INVOICE.STATUS];

// Payment Methods
export type VendorInvoicePaymentMethod =
  (typeof VENDOR_INVOICE.PAYMENT_METHODS)[keyof typeof VENDOR_INVOICE.PAYMENT_METHODS];

// Currencies
export type VendorInvoiceCurrency =
  (typeof VENDOR_INVOICE.CURRENCIES)[keyof typeof VENDOR_INVOICE.CURRENCIES];

// Periods
export type VendorInvoicePeriod =
  (typeof VENDOR_INVOICE.PERIODS)[keyof typeof VENDOR_INVOICE.PERIODS];

// Payment Terms
export type VendorInvoicePaymentTerm =
  (typeof VENDOR_INVOICE.PAYMENT_TERMS)[keyof typeof VENDOR_INVOICE.PAYMENT_TERMS];

// Utility Functions
export function vendorInvoiceGetTypeLabel(type: VendorInvoiceType): string {
  const labels: Record<VendorInvoiceType, string> = {
    [VENDOR_INVOICE.TYPES.REGULAR]: 'Regular Invoice',
    [VENDOR_INVOICE.TYPES.CREDIT]: 'Credit Invoice',
    [VENDOR_INVOICE.TYPES.DEBIT]: 'Debit Invoice',
    [VENDOR_INVOICE.TYPES.REFUND]: 'Refund Invoice',
    [VENDOR_INVOICE.TYPES.ADJUSTMENT]: 'Adjustment Invoice',
    [VENDOR_INVOICE.TYPES.PROFORMA]: 'Proforma Invoice',
  };
  return labels[type] || 'Unknown';
}

export function vendorInvoiceGetStatusLabel(status: VendorInvoiceStatus): string {
  const labels: Record<VendorInvoiceStatus, string> = {
    [VENDOR_INVOICE.STATUS.DRAFT]: 'Draft',
    [VENDOR_INVOICE.STATUS.PENDING]: 'Pending',
    [VENDOR_INVOICE.STATUS.APPROVED]: 'Approved',
    [VENDOR_INVOICE.STATUS.PAID]: 'Paid',
    [VENDOR_INVOICE.STATUS.OVERDUE]: 'Overdue',
    [VENDOR_INVOICE.STATUS.CANCELLED]: 'Cancelled',
    [VENDOR_INVOICE.STATUS.VOID]: 'Void',
  };
  return labels[status] || 'Unknown';
}

export function vendorInvoiceGetPaymentMethodLabel(method: VendorInvoicePaymentMethod): string {
  const labels: Record<VendorInvoicePaymentMethod, string> = {
    [VENDOR_INVOICE.PAYMENT_METHODS.BANK_TRANSFER]: 'Bank Transfer',
    [VENDOR_INVOICE.PAYMENT_METHODS.MOBILE_BANKING]: 'Mobile Banking',
    [VENDOR_INVOICE.PAYMENT_METHODS.CREDIT_CARD]: 'Credit Card',
    [VENDOR_INVOICE.PAYMENT_METHODS.DEBIT_CARD]: 'Debit Card',
    [VENDOR_INVOICE.PAYMENT_METHODS.DIGITAL_WALLET]: 'Digital Wallet',
    [VENDOR_INVOICE.PAYMENT_METHODS.CASH]: 'Cash',
  };
  return labels[method] || 'Unknown';
}

export function vendorInvoiceGetCurrencyLabel(currency: VendorInvoiceCurrency): string {
  const labels: Record<VendorInvoiceCurrency, string> = {
    [VENDOR_INVOICE.CURRENCIES.BDT]: 'BDT',
    [VENDOR_INVOICE.CURRENCIES.USD]: 'USD',
    [VENDOR_INVOICE.CURRENCIES.EUR]: 'EUR',
    [VENDOR_INVOICE.CURRENCIES.GBP]: 'GBP',
  };
  return labels[currency] || 'Unknown';
}

export function vendorInvoiceGetPeriodLabel(period: VendorInvoicePeriod): string {
  const labels: Record<VendorInvoicePeriod, string> = {
    [VENDOR_INVOICE.PERIODS.MONTHLY]: 'Monthly',
    [VENDOR_INVOICE.PERIODS.QUARTERLY]: 'Quarterly',
    [VENDOR_INVOICE.PERIODS.SEMI_ANNUAL]: 'Semi-Annual',
    [VENDOR_INVOICE.PERIODS.ANNUAL]: 'Annual',
    [VENDOR_INVOICE.PERIODS.CUSTOM]: 'Custom',
  };
  return labels[period] || 'Unknown';
}

export function vendorInvoiceGetPaymentTermLabel(term: VendorInvoicePaymentTerm): string {
  const labels: Record<VendorInvoicePaymentTerm, string> = {
    [VENDOR_INVOICE.PAYMENT_TERMS.IMMEDIATE]: 'Immediate',
    [VENDOR_INVOICE.PAYMENT_TERMS.NET_7]: 'Net 7',
    [VENDOR_INVOICE.PAYMENT_TERMS.NET_15]: 'Net 15',
    [VENDOR_INVOICE.PAYMENT_TERMS.NET_30]: 'Net 30',
    [VENDOR_INVOICE.PAYMENT_TERMS.NET_45]: 'Net 45',
    [VENDOR_INVOICE.PAYMENT_TERMS.NET_60]: 'Net 60',
    [VENDOR_INVOICE.PAYMENT_TERMS.NET_90]: 'Net 90',
  };
  return labels[term] || 'Unknown';
}

export function vendorInvoiceIsPaid(status: VendorInvoiceStatus): boolean {
  return status === VENDOR_INVOICE.STATUS.PAID;
}

export function vendorInvoiceIsPending(status: VendorInvoiceStatus): boolean {
  return status === VENDOR_INVOICE.STATUS.PENDING || status === VENDOR_INVOICE.STATUS.APPROVED;
}

export function vendorInvoiceIsOverdue(status: VendorInvoiceStatus): boolean {
  return status === VENDOR_INVOICE.STATUS.OVERDUE;
}
