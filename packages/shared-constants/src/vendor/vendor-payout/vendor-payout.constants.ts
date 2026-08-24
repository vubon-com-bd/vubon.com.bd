/**
 * Vendor Payout Constants
 * Configuration for vendor payouts
 */

export const VENDOR_PAYOUT = {
  // Payout Types
  TYPES: {
    REGULAR: 'regular',
    ADVANCE: 'advance',
    PARTIAL: 'partial',
    FULL: 'full',
    ADJUSTMENT: 'adjustment',
    BONUS: 'bonus',
  } as const,

  // Payout Statuses
  STATUS: {
    PENDING: 'pending',
    PROCESSING: 'processing',
    COMPLETED: 'completed',
    FAILED: 'failed',
    CANCELLED: 'cancelled',
    ON_HOLD: 'on_hold',
    SCHEDULED: 'scheduled',
  } as const,

  // Payout Methods
  METHODS: {
    BANK_TRANSFER: 'bank_transfer',
    MOBILE_BANKING: 'mobile_banking',
    CASH: 'cash',
    CHEQUE: 'cheque',
    DIGITAL_WALLET: 'digital_wallet',
    CRYPTO: 'crypto',
  } as const,

  // Payout Frequencies
  FREQUENCIES: {
    DAILY: 'daily',
    WEEKLY: 'weekly',
    BI_WEEKLY: 'bi_weekly',
    MONTHLY: 'monthly',
    QUARTERLY: 'quarterly',
    CUSTOM: 'custom',
  } as const,

  // Payout Currencies
  CURRENCIES: {
    BDT: 'BDT',
    USD: 'USD',
    EUR: 'EUR',
    GBP: 'GBP',
  } as const,

  // Payout Limits
  LIMITS: {
    MIN_AMOUNT: 100,
    MAX_AMOUNT: 1000000,
    MAX_PER_DAY: 5,
    MAX_PER_WEEK: 20,
    PROCESSING_DAYS: 3,
  } as const,

  // Payout Colors (for UI)
  COLORS: {
    PENDING: '#yellow-500',
    PROCESSING: '#blue-500',
    COMPLETED: '#green-500',
    FAILED: '#red-500',
    CANCELLED: '#gray-500',
    ON_HOLD: '#orange-500',
    SCHEDULED: '#purple-500',
  } as const,

  // Payout Icons (for UI)
  ICONS: {
    PENDING: '⏳',
    PROCESSING: '🔄',
    COMPLETED: '✅',
    FAILED: '❌',
    CANCELLED: '🚫',
    ON_HOLD: '⏸️',
    SCHEDULED: '📅',
  } as const,
} as const;

// Payout Types
export type VendorPayoutType = (typeof VENDOR_PAYOUT.TYPES)[keyof typeof VENDOR_PAYOUT.TYPES];

// Payout Statuses
export type VendorPayoutStatus = (typeof VENDOR_PAYOUT.STATUS)[keyof typeof VENDOR_PAYOUT.STATUS];

// Payout Methods
export type VendorPayoutMethod = (typeof VENDOR_PAYOUT.METHODS)[keyof typeof VENDOR_PAYOUT.METHODS];

// Payout Frequencies
export type VendorPayoutFrequency =
  (typeof VENDOR_PAYOUT.FREQUENCIES)[keyof typeof VENDOR_PAYOUT.FREQUENCIES];

// Payout Currencies
export type VendorPayoutCurrency =
  (typeof VENDOR_PAYOUT.CURRENCIES)[keyof typeof VENDOR_PAYOUT.CURRENCIES];

// Payout Colors
export type VendorPayoutColor = (typeof VENDOR_PAYOUT.COLORS)[keyof typeof VENDOR_PAYOUT.COLORS];

// Payout Icons
export type VendorPayoutIcon = (typeof VENDOR_PAYOUT.ICONS)[keyof typeof VENDOR_PAYOUT.ICONS];

// Utility Functions
export function vendorPayoutGetTypeLabel(type: VendorPayoutType): string {
  const labels: Record<VendorPayoutType, string> = {
    [VENDOR_PAYOUT.TYPES.REGULAR]: 'Regular',
    [VENDOR_PAYOUT.TYPES.ADVANCE]: 'Advance',
    [VENDOR_PAYOUT.TYPES.PARTIAL]: 'Partial',
    [VENDOR_PAYOUT.TYPES.FULL]: 'Full',
    [VENDOR_PAYOUT.TYPES.ADJUSTMENT]: 'Adjustment',
    [VENDOR_PAYOUT.TYPES.BONUS]: 'Bonus',
  };
  return labels[type] || 'Unknown';
}

export function vendorPayoutGetStatusLabel(status: VendorPayoutStatus): string {
  const labels: Record<VendorPayoutStatus, string> = {
    [VENDOR_PAYOUT.STATUS.PENDING]: 'Pending',
    [VENDOR_PAYOUT.STATUS.PROCESSING]: 'Processing',
    [VENDOR_PAYOUT.STATUS.COMPLETED]: 'Completed',
    [VENDOR_PAYOUT.STATUS.FAILED]: 'Failed',
    [VENDOR_PAYOUT.STATUS.CANCELLED]: 'Cancelled',
    [VENDOR_PAYOUT.STATUS.ON_HOLD]: 'On Hold',
    [VENDOR_PAYOUT.STATUS.SCHEDULED]: 'Scheduled',
  };
  return labels[status] || 'Unknown';
}

export function vendorPayoutGetMethodLabel(method: VendorPayoutMethod): string {
  const labels: Record<VendorPayoutMethod, string> = {
    [VENDOR_PAYOUT.METHODS.BANK_TRANSFER]: 'Bank Transfer',
    [VENDOR_PAYOUT.METHODS.MOBILE_BANKING]: 'Mobile Banking',
    [VENDOR_PAYOUT.METHODS.CASH]: 'Cash',
    [VENDOR_PAYOUT.METHODS.CHEQUE]: 'Cheque',
    [VENDOR_PAYOUT.METHODS.DIGITAL_WALLET]: 'Digital Wallet',
    [VENDOR_PAYOUT.METHODS.CRYPTO]: 'Cryptocurrency',
  };
  return labels[method] || 'Unknown';
}

export function vendorPayoutGetFrequencyLabel(frequency: VendorPayoutFrequency): string {
  const labels: Record<VendorPayoutFrequency, string> = {
    [VENDOR_PAYOUT.FREQUENCIES.DAILY]: 'Daily',
    [VENDOR_PAYOUT.FREQUENCIES.WEEKLY]: 'Weekly',
    [VENDOR_PAYOUT.FREQUENCIES.BI_WEEKLY]: 'Bi-Weekly',
    [VENDOR_PAYOUT.FREQUENCIES.MONTHLY]: 'Monthly',
    [VENDOR_PAYOUT.FREQUENCIES.QUARTERLY]: 'Quarterly',
    [VENDOR_PAYOUT.FREQUENCIES.CUSTOM]: 'Custom',
  };
  return labels[frequency] || 'Unknown';
}

export function vendorPayoutGetCurrencyLabel(currency: VendorPayoutCurrency): string {
  const labels: Record<VendorPayoutCurrency, string> = {
    [VENDOR_PAYOUT.CURRENCIES.BDT]: 'BDT',
    [VENDOR_PAYOUT.CURRENCIES.USD]: 'USD',
    [VENDOR_PAYOUT.CURRENCIES.EUR]: 'EUR',
    [VENDOR_PAYOUT.CURRENCIES.GBP]: 'GBP',
  };
  return labels[currency] || 'Unknown';
}

export function vendorPayoutIsCompleted(status: VendorPayoutStatus): boolean {
  return status === VENDOR_PAYOUT.STATUS.COMPLETED;
}

export function vendorPayoutIsPending(status: VendorPayoutStatus): boolean {
  return (
    status === VENDOR_PAYOUT.STATUS.PENDING ||
    status === VENDOR_PAYOUT.STATUS.PROCESSING ||
    status === VENDOR_PAYOUT.STATUS.SCHEDULED
  );
}

export function vendorPayoutIsFailed(status: VendorPayoutStatus): boolean {
  return status === VENDOR_PAYOUT.STATUS.FAILED;
}

export function vendorPayoutGetColor(status: VendorPayoutStatus): VendorPayoutColor {
  const colors: Record<VendorPayoutStatus, VendorPayoutColor> = {
    [VENDOR_PAYOUT.STATUS.PENDING]: VENDOR_PAYOUT.COLORS.PENDING,
    [VENDOR_PAYOUT.STATUS.PROCESSING]: VENDOR_PAYOUT.COLORS.PROCESSING,
    [VENDOR_PAYOUT.STATUS.COMPLETED]: VENDOR_PAYOUT.COLORS.COMPLETED,
    [VENDOR_PAYOUT.STATUS.FAILED]: VENDOR_PAYOUT.COLORS.FAILED,
    [VENDOR_PAYOUT.STATUS.CANCELLED]: VENDOR_PAYOUT.COLORS.CANCELLED,
    [VENDOR_PAYOUT.STATUS.ON_HOLD]: VENDOR_PAYOUT.COLORS.ON_HOLD,
    [VENDOR_PAYOUT.STATUS.SCHEDULED]: VENDOR_PAYOUT.COLORS.SCHEDULED,
  };
  return colors[status] || '#gray-400';
}
