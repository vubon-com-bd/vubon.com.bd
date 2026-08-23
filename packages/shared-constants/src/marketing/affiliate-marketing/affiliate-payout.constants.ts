/**
 * Affiliate Payout Constants
 * Payout configurations for affiliates
 */

export const MARKETINGAFFILIATE_PAYOUT = {
  // Payout Methods
  METHODS: {
    BANK_TRANSFER: 'bank_transfer',
    BKASH: 'bkash',
    NAGAD: 'nagad',
    ROCKET: 'rocket',
    UPAY: 'upay',
    PAYPAL: 'paypal',
    STRIPE: 'stripe',
    WISE: 'wise',
    PAYONEER: 'payoneer',
    CRYPTO: 'crypto',
    CHECK: 'check',
    CASH: 'cash',
    MANUAL: 'manual',
    OTHER: 'other',
  } as const,

  // Payout Frequencies
  FREQUENCIES: {
    DAILY: 'daily',
    WEEKLY: 'weekly',
    BI_WEEKLY: 'bi_weekly',
    MONTHLY: 'monthly',
    QUARTERLY: 'quarterly',
    ON_DEMAND: 'on_demand',
    CUSTOM: 'custom',
  } as const,

  // Payout Currencies
  CURRENCIES: {
    BDT: 'BDT',
    USD: 'USD',
    EUR: 'EUR',
    GBP: 'GBP',
    CAD: 'CAD',
    AUD: 'AUD',
    JPY: 'JPY',
    SGD: 'SGD',
    MYR: 'MYR',
    INR: 'INR',
    PKR: 'PKR',
  } as const,

  // Payout Statuses
  STATUSES: {
    PENDING: 'pending',
    PROCESSING: 'processing',
    COMPLETED: 'completed',
    FAILED: 'failed',
    CANCELLED: 'cancelled',
    ON_HOLD: 'on_hold',
    REJECTED: 'rejected',
    PARTIAL: 'partial',
    REVERSED: 'reversed',
  } as const,

  // Payout Types
  TYPES: {
    COMMISSION: 'commission',
    BONUS: 'bonus',
    REFERRAL: 'referral',
    PERFORMANCE: 'performance',
    ADJUSTMENT: 'adjustment',
    REFUND: 'refund',
    OTHER: 'other',
  } as const,

  // Payout Thresholds
  THRESHOLDS: {
    MINIMUM: 50,
    MAXIMUM: 100000,
    DEFAULT: 50,
    ACH_MINIMUM: 25,
    WIRE_MINIMUM: 100,
    CRYPTO_MINIMUM: 10,
  } as const,

  // Payout Fees
  FEES: {
    BANK_TRANSFER: 0,
    BKASH: 0,
    NAGAD: 0,
    ROCKET: 0,
    UPAY: 0,
    PAYPAL: 2.9,
    STRIPE: 2.9,
    WISE: 1,
    PAYONEER: 2,
    CRYPTO: 0.5,
    CHECK: 1,
    CASH: 0,
    MANUAL: 0,
    OTHER: 0,
  } as const,

  // Payout Limits
  LIMITS: {
    MIN_AMOUNT: 1,
    MAX_AMOUNT: 1000000,
    MAX_PER_DAY: 500000,
    MAX_PER_WEEK: 2000000,
    MAX_PER_MONTH: 5000000,
    MAX_TRANSACTIONS_PER_DAY: 50,
    MAX_TRANSACTIONS_PER_WEEK: 200,
  } as const,

  // Payout Defaults
  DEFAULTS: {
    DEFAULT_METHOD: 'bank_transfer',
    DEFAULT_FREQUENCY: 'monthly',
    DEFAULT_CURRENCY: 'BDT',
    DEFAULT_MINIMUM_PAYOUT: 50,
    DEFAULT_HOLD_DAYS: 7,
    DEFAULT_PROCESSING_DAYS: 3,
    DEFAULT_BATCH_SIZE: 100,
  } as const,
} as const;

// Payout Methods
export type MarketingAffiliatePayoutMethod =
  (typeof MARKETINGAFFILIATE_PAYOUT.METHODS)[keyof typeof MARKETINGAFFILIATE_PAYOUT.METHODS];

// Payout Frequencies
export type MarketingAffiliatePayoutFrequency =
  (typeof MARKETINGAFFILIATE_PAYOUT.FREQUENCIES)[keyof typeof MARKETINGAFFILIATE_PAYOUT.FREQUENCIES];

// Payout Currencies
export type MarketingAffiliatePayoutCurrency =
  (typeof MARKETINGAFFILIATE_PAYOUT.CURRENCIES)[keyof typeof MARKETINGAFFILIATE_PAYOUT.CURRENCIES];

// Payout Statuses
export type MarketingAffiliatePayoutStatusType =
  (typeof MARKETINGAFFILIATE_PAYOUT.STATUSES)[keyof typeof MARKETINGAFFILIATE_PAYOUT.STATUSES];

// Payout Types
export type MarketingAffiliatePayoutType =
  (typeof MARKETINGAFFILIATE_PAYOUT.TYPES)[keyof typeof MARKETINGAFFILIATE_PAYOUT.TYPES];

// Payout Thresholds
export type MarketingAffiliatePayoutThreshold =
  (typeof MARKETINGAFFILIATE_PAYOUT.THRESHOLDS)[keyof typeof MARKETINGAFFILIATE_PAYOUT.THRESHOLDS];

// Payout Fees
export type MarketingAffiliatePayoutFee =
  (typeof MARKETINGAFFILIATE_PAYOUT.FEES)[keyof typeof MARKETINGAFFILIATE_PAYOUT.FEES];

// Payout Limits
export type MarketingAffiliatePayoutLimit =
  (typeof MARKETINGAFFILIATE_PAYOUT.LIMITS)[keyof typeof MARKETINGAFFILIATE_PAYOUT.LIMITS];

// Payout Defaults
export type MarketingAffiliatePayoutDefault =
  (typeof MARKETINGAFFILIATE_PAYOUT.DEFAULTS)[keyof typeof MARKETINGAFFILIATE_PAYOUT.DEFAULTS];

// Utility Functions
export function marketingaffiliateGetPayoutMethodLabel(
  method: MarketingAffiliatePayoutMethod
): string {
  const labels: Record<MarketingAffiliatePayoutMethod, string> = {
    [MARKETINGAFFILIATE_PAYOUT.METHODS.BANK_TRANSFER]: 'Bank Transfer',
    [MARKETINGAFFILIATE_PAYOUT.METHODS.BKASH]: 'bKash',
    [MARKETINGAFFILIATE_PAYOUT.METHODS.NAGAD]: 'Nagad',
    [MARKETINGAFFILIATE_PAYOUT.METHODS.ROCKET]: 'Rocket',
    [MARKETINGAFFILIATE_PAYOUT.METHODS.UPAY]: 'Upay',
    [MARKETINGAFFILIATE_PAYOUT.METHODS.PAYPAL]: 'PayPal',
    [MARKETINGAFFILIATE_PAYOUT.METHODS.STRIPE]: 'Stripe',
    [MARKETINGAFFILIATE_PAYOUT.METHODS.WISE]: 'Wise',
    [MARKETINGAFFILIATE_PAYOUT.METHODS.PAYONEER]: 'Payoneer',
    [MARKETINGAFFILIATE_PAYOUT.METHODS.CRYPTO]: 'Cryptocurrency',
    [MARKETINGAFFILIATE_PAYOUT.METHODS.CHECK]: 'Check',
    [MARKETINGAFFILIATE_PAYOUT.METHODS.CASH]: 'Cash',
    [MARKETINGAFFILIATE_PAYOUT.METHODS.MANUAL]: 'Manual',
    [MARKETINGAFFILIATE_PAYOUT.METHODS.OTHER]: 'Other',
  };
  return labels[method] || 'Unknown Method';
}

export function marketingaffiliateGetPayoutFrequencyLabel(
  frequency: MarketingAffiliatePayoutFrequency
): string {
  const labels: Record<MarketingAffiliatePayoutFrequency, string> = {
    [MARKETINGAFFILIATE_PAYOUT.FREQUENCIES.DAILY]: 'Daily',
    [MARKETINGAFFILIATE_PAYOUT.FREQUENCIES.WEEKLY]: 'Weekly',
    [MARKETINGAFFILIATE_PAYOUT.FREQUENCIES.BI_WEEKLY]: 'Bi-Weekly',
    [MARKETINGAFFILIATE_PAYOUT.FREQUENCIES.MONTHLY]: 'Monthly',
    [MARKETINGAFFILIATE_PAYOUT.FREQUENCIES.QUARTERLY]: 'Quarterly',
    [MARKETINGAFFILIATE_PAYOUT.FREQUENCIES.ON_DEMAND]: 'On Demand',
    [MARKETINGAFFILIATE_PAYOUT.FREQUENCIES.CUSTOM]: 'Custom',
  };
  return labels[frequency] || 'Unknown Frequency';
}

export function marketingaffiliateGetPayoutCurrencySymbol(
  currency: MarketingAffiliatePayoutCurrency
): string {
  const symbols: Record<MarketingAffiliatePayoutCurrency, string> = {
    [MARKETINGAFFILIATE_PAYOUT.CURRENCIES.BDT]: '৳',
    [MARKETINGAFFILIATE_PAYOUT.CURRENCIES.USD]: '$',
    [MARKETINGAFFILIATE_PAYOUT.CURRENCIES.EUR]: '€',
    [MARKETINGAFFILIATE_PAYOUT.CURRENCIES.GBP]: '£',
    [MARKETINGAFFILIATE_PAYOUT.CURRENCIES.CAD]: 'C$',
    [MARKETINGAFFILIATE_PAYOUT.CURRENCIES.AUD]: 'A$',
    [MARKETINGAFFILIATE_PAYOUT.CURRENCIES.JPY]: '¥',
    [MARKETINGAFFILIATE_PAYOUT.CURRENCIES.SGD]: 'S$',
    [MARKETINGAFFILIATE_PAYOUT.CURRENCIES.MYR]: 'RM',
    [MARKETINGAFFILIATE_PAYOUT.CURRENCIES.INR]: '₹',
    [MARKETINGAFFILIATE_PAYOUT.CURRENCIES.PKR]: 'Rs',
  };
  return symbols[currency] || '$';
}

export function marketingaffiliateGetPayoutStatusLabel(
  status: MarketingAffiliatePayoutStatusType
): string {
  const labels: Record<MarketingAffiliatePayoutStatusType, string> = {
    [MARKETINGAFFILIATE_PAYOUT.STATUSES.PENDING]: 'Pending',
    [MARKETINGAFFILIATE_PAYOUT.STATUSES.PROCESSING]: 'Processing',
    [MARKETINGAFFILIATE_PAYOUT.STATUSES.COMPLETED]: 'Completed',
    [MARKETINGAFFILIATE_PAYOUT.STATUSES.FAILED]: 'Failed',
    [MARKETINGAFFILIATE_PAYOUT.STATUSES.CANCELLED]: 'Cancelled',
    [MARKETINGAFFILIATE_PAYOUT.STATUSES.ON_HOLD]: 'On Hold',
    [MARKETINGAFFILIATE_PAYOUT.STATUSES.REJECTED]: 'Rejected',
    [MARKETINGAFFILIATE_PAYOUT.STATUSES.PARTIAL]: 'Partial',
    [MARKETINGAFFILIATE_PAYOUT.STATUSES.REVERSED]: 'Reversed',
  };
  return labels[status] || 'Unknown Status';
}

export function marketingaffiliateGetPayoutTypeLabel(type: MarketingAffiliatePayoutType): string {
  const labels: Record<MarketingAffiliatePayoutType, string> = {
    [MARKETINGAFFILIATE_PAYOUT.TYPES.COMMISSION]: 'Commission',
    [MARKETINGAFFILIATE_PAYOUT.TYPES.BONUS]: 'Bonus',
    [MARKETINGAFFILIATE_PAYOUT.TYPES.REFERRAL]: 'Referral',
    [MARKETINGAFFILIATE_PAYOUT.TYPES.PERFORMANCE]: 'Performance',
    [MARKETINGAFFILIATE_PAYOUT.TYPES.ADJUSTMENT]: 'Adjustment',
    [MARKETINGAFFILIATE_PAYOUT.TYPES.REFUND]: 'Refund',
    [MARKETINGAFFILIATE_PAYOUT.TYPES.OTHER]: 'Other',
  };
  return labels[type] || 'Unknown Type';
}

export function marketingaffiliateGetPayoutFee(method: MarketingAffiliatePayoutMethod): number {
  const fees: Record<MarketingAffiliatePayoutMethod, number> = {
    [MARKETINGAFFILIATE_PAYOUT.METHODS.BANK_TRANSFER]: MARKETINGAFFILIATE_PAYOUT.FEES.BANK_TRANSFER,
    [MARKETINGAFFILIATE_PAYOUT.METHODS.BKASH]: MARKETINGAFFILIATE_PAYOUT.FEES.BKASH,
    [MARKETINGAFFILIATE_PAYOUT.METHODS.NAGAD]: MARKETINGAFFILIATE_PAYOUT.FEES.NAGAD,
    [MARKETINGAFFILIATE_PAYOUT.METHODS.ROCKET]: MARKETINGAFFILIATE_PAYOUT.FEES.ROCKET,
    [MARKETINGAFFILIATE_PAYOUT.METHODS.UPAY]: MARKETINGAFFILIATE_PAYOUT.FEES.UPAY,
    [MARKETINGAFFILIATE_PAYOUT.METHODS.PAYPAL]: MARKETINGAFFILIATE_PAYOUT.FEES.PAYPAL,
    [MARKETINGAFFILIATE_PAYOUT.METHODS.STRIPE]: MARKETINGAFFILIATE_PAYOUT.FEES.STRIPE,
    [MARKETINGAFFILIATE_PAYOUT.METHODS.WISE]: MARKETINGAFFILIATE_PAYOUT.FEES.WISE,
    [MARKETINGAFFILIATE_PAYOUT.METHODS.PAYONEER]: MARKETINGAFFILIATE_PAYOUT.FEES.PAYONEER,
    [MARKETINGAFFILIATE_PAYOUT.METHODS.CRYPTO]: MARKETINGAFFILIATE_PAYOUT.FEES.CRYPTO,
    [MARKETINGAFFILIATE_PAYOUT.METHODS.CHECK]: MARKETINGAFFILIATE_PAYOUT.FEES.CHECK,
    [MARKETINGAFFILIATE_PAYOUT.METHODS.CASH]: MARKETINGAFFILIATE_PAYOUT.FEES.CASH,
    [MARKETINGAFFILIATE_PAYOUT.METHODS.MANUAL]: MARKETINGAFFILIATE_PAYOUT.FEES.MANUAL,
    [MARKETINGAFFILIATE_PAYOUT.METHODS.OTHER]: MARKETINGAFFILIATE_PAYOUT.FEES.OTHER,
  };
  return fees[method] || 0;
}

export function marketingaffiliateIsPayoutComplete(
  status: MarketingAffiliatePayoutStatusType
): boolean {
  const completeStatuses: MarketingAffiliatePayoutStatusType[] = [
    MARKETINGAFFILIATE_PAYOUT.STATUSES.COMPLETED,
  ];
  return completeStatuses.includes(status);
}

export function marketingaffiliateIsPayoutPending(
  status: MarketingAffiliatePayoutStatusType
): boolean {
  const pendingStatuses: MarketingAffiliatePayoutStatusType[] = [
    MARKETINGAFFILIATE_PAYOUT.STATUSES.PENDING,
    MARKETINGAFFILIATE_PAYOUT.STATUSES.PROCESSING,
    MARKETINGAFFILIATE_PAYOUT.STATUSES.ON_HOLD,
  ];
  return pendingStatuses.includes(status);
}

export function marketingaffiliateIsPayoutFailed(
  status: MarketingAffiliatePayoutStatusType
): boolean {
  const failedStatuses: MarketingAffiliatePayoutStatusType[] = [
    MARKETINGAFFILIATE_PAYOUT.STATUSES.FAILED,
    MARKETINGAFFILIATE_PAYOUT.STATUSES.CANCELLED,
    MARKETINGAFFILIATE_PAYOUT.STATUSES.REJECTED,
    MARKETINGAFFILIATE_PAYOUT.STATUSES.REVERSED,
  ];
  return failedStatuses.includes(status);
}

export function marketingaffiliateGetDefaultPayoutMethod(): MarketingAffiliatePayoutMethod {
  return MARKETINGAFFILIATE_PAYOUT.DEFAULTS.DEFAULT_METHOD;
}

export function marketingaffiliateGetDefaultPayoutCurrency(): MarketingAffiliatePayoutCurrency {
  return MARKETINGAFFILIATE_PAYOUT.DEFAULTS.DEFAULT_CURRENCY;
}

export function marketingaffiliateGetMinimumPayout(): number {
  return MARKETINGAFFILIATE_PAYOUT.THRESHOLDS.DEFAULT;
}

export function marketingaffiliateCalculatePayoutAfterFee(
  amount: number,
  method: MarketingAffiliatePayoutMethod
): number {
  const fee = marketingaffiliateGetPayoutFee(method);
  return amount - (amount * fee) / 100;
}
