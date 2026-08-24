/**
 * Vendor Settlement Constants
 * Configuration for vendor settlements
 */

export const VENDOR_SETTLEMENT = {
  // Settlement Types
  TYPES: {
    REGULAR: 'regular',
    ADVANCE: 'advance',
    PARTIAL: 'partial',
    FULL: 'full',
    ADJUSTMENT: 'adjustment',
  } as const,

  // Settlement Statuses
  STATUS: {
    PENDING: 'pending',
    PROCESSING: 'processing',
    COMPLETED: 'completed',
    FAILED: 'failed',
    CANCELLED: 'cancelled',
    ON_HOLD: 'on_hold',
  } as const,

  // Settlement Methods
  METHODS: {
    BANK_TRANSFER: 'bank_transfer',
    MOBILE_BANKING: 'mobile_banking',
    CASH: 'cash',
    CHEQUE: 'cheque',
    DIGITAL_WALLET: 'digital_wallet',
  } as const,

  // Settlement Frequencies
  FREQUENCIES: {
    DAILY: 'daily',
    WEEKLY: 'weekly',
    BI_WEEKLY: 'bi_weekly',
    MONTHLY: 'monthly',
    QUARTERLY: 'quarterly',
    CUSTOM: 'custom',
  } as const,

  // Settlement Periods
  PERIODS: {
    TODAY: 'today',
    THIS_WEEK: 'this_week',
    THIS_MONTH: 'this_month',
    LAST_MONTH: 'last_month',
    CUSTOM: 'custom',
  } as const,

  // Settlement Limits
  LIMITS: {
    MIN_AMOUNT: 500,
    MAX_AMOUNT: 1000000,
    MAX_PER_DAY: 5,
    MAX_PER_WEEK: 20,
  } as const,
} as const;

// Settlement Types
export type VendorSettlementType =
  (typeof VENDOR_SETTLEMENT.TYPES)[keyof typeof VENDOR_SETTLEMENT.TYPES];

// Settlement Statuses
export type VendorSettlementStatus =
  (typeof VENDOR_SETTLEMENT.STATUS)[keyof typeof VENDOR_SETTLEMENT.STATUS];

// Settlement Methods
export type VendorSettlementMethod =
  (typeof VENDOR_SETTLEMENT.METHODS)[keyof typeof VENDOR_SETTLEMENT.METHODS];

// Settlement Frequencies
export type VendorSettlementFrequency =
  (typeof VENDOR_SETTLEMENT.FREQUENCIES)[keyof typeof VENDOR_SETTLEMENT.FREQUENCIES];

// Settlement Periods
export type VendorSettlementPeriod =
  (typeof VENDOR_SETTLEMENT.PERIODS)[keyof typeof VENDOR_SETTLEMENT.PERIODS];

// Utility Functions
export function vendorSettlementGetTypeLabel(type: VendorSettlementType): string {
  const labels: Record<VendorSettlementType, string> = {
    [VENDOR_SETTLEMENT.TYPES.REGULAR]: 'Regular',
    [VENDOR_SETTLEMENT.TYPES.ADVANCE]: 'Advance',
    [VENDOR_SETTLEMENT.TYPES.PARTIAL]: 'Partial',
    [VENDOR_SETTLEMENT.TYPES.FULL]: 'Full',
    [VENDOR_SETTLEMENT.TYPES.ADJUSTMENT]: 'Adjustment',
  };
  return labels[type] || 'Unknown';
}

export function vendorSettlementGetStatusLabel(status: VendorSettlementStatus): string {
  const labels: Record<VendorSettlementStatus, string> = {
    [VENDOR_SETTLEMENT.STATUS.PENDING]: 'Pending',
    [VENDOR_SETTLEMENT.STATUS.PROCESSING]: 'Processing',
    [VENDOR_SETTLEMENT.STATUS.COMPLETED]: 'Completed',
    [VENDOR_SETTLEMENT.STATUS.FAILED]: 'Failed',
    [VENDOR_SETTLEMENT.STATUS.CANCELLED]: 'Cancelled',
    [VENDOR_SETTLEMENT.STATUS.ON_HOLD]: 'On Hold',
  };
  return labels[status] || 'Unknown';
}

export function vendorSettlementGetMethodLabel(method: VendorSettlementMethod): string {
  const labels: Record<VendorSettlementMethod, string> = {
    [VENDOR_SETTLEMENT.METHODS.BANK_TRANSFER]: 'Bank Transfer',
    [VENDOR_SETTLEMENT.METHODS.MOBILE_BANKING]: 'Mobile Banking',
    [VENDOR_SETTLEMENT.METHODS.CASH]: 'Cash',
    [VENDOR_SETTLEMENT.METHODS.CHEQUE]: 'Cheque',
    [VENDOR_SETTLEMENT.METHODS.DIGITAL_WALLET]: 'Digital Wallet',
  };
  return labels[method] || 'Unknown';
}

export function vendorSettlementGetFrequencyLabel(frequency: VendorSettlementFrequency): string {
  const labels: Record<VendorSettlementFrequency, string> = {
    [VENDOR_SETTLEMENT.FREQUENCIES.DAILY]: 'Daily',
    [VENDOR_SETTLEMENT.FREQUENCIES.WEEKLY]: 'Weekly',
    [VENDOR_SETTLEMENT.FREQUENCIES.BI_WEEKLY]: 'Bi-Weekly',
    [VENDOR_SETTLEMENT.FREQUENCIES.MONTHLY]: 'Monthly',
    [VENDOR_SETTLEMENT.FREQUENCIES.QUARTERLY]: 'Quarterly',
    [VENDOR_SETTLEMENT.FREQUENCIES.CUSTOM]: 'Custom',
  };
  return labels[frequency] || 'Unknown';
}

export function vendorSettlementIsCompleted(status: VendorSettlementStatus): boolean {
  return status === VENDOR_SETTLEMENT.STATUS.COMPLETED;
}

export function vendorSettlementIsPending(status: VendorSettlementStatus): boolean {
  return (
    status === VENDOR_SETTLEMENT.STATUS.PENDING || status === VENDOR_SETTLEMENT.STATUS.PROCESSING
  );
}

export function vendorSettlementIsFailed(status: VendorSettlementStatus): boolean {
  return status === VENDOR_SETTLEMENT.STATUS.FAILED;
}

export function vendorSettlementGetPeriodLabel(period: VendorSettlementPeriod): string {
  const labels: Record<VendorSettlementPeriod, string> = {
    [VENDOR_SETTLEMENT.PERIODS.TODAY]: 'Today',
    [VENDOR_SETTLEMENT.PERIODS.THIS_WEEK]: 'This Week',
    [VENDOR_SETTLEMENT.PERIODS.THIS_MONTH]: 'This Month',
    [VENDOR_SETTLEMENT.PERIODS.LAST_MONTH]: 'Last Month',
    [VENDOR_SETTLEMENT.PERIODS.CUSTOM]: 'Custom',
  };
  return labels[period] || 'Unknown';
}
