/**
 * Campaign Budget Constants
 * Budget configurations for marketing campaigns
 */

export const MARKETINGCAMPAIGN_BUDGET = {
  // Budget Types
  TYPES: {
    FIXED: 'fixed',
    VARIABLE: 'variable',
    PERCENTAGE_OF_REVENUE: 'percentage_of_revenue',
    DYNAMIC: 'dynamic',
    FLEXIBLE: 'flexible',
    CAP: 'cap',
    UNLIMITED: 'unlimited',
  } as const,

  // Budget Allocation Methods
  ALLOCATION_METHODS: {
    EVEN: 'even',
    PERFORMANCE_BASED: 'performance_based',
    SEASONAL: 'seasonal',
    WEIGHTED: 'weighted',
    DYNAMIC: 'dynamic',
    MANUAL: 'manual',
  } as const,

  // Budget Statuses
  STATUSES: {
    PENDING: 'pending',
    APPROVED: 'approved',
    REJECTED: 'rejected',
    ACTIVE: 'active',
    EXHAUSTED: 'exhausted',
    FROZEN: 'frozen',
    CANCELLED: 'cancelled',
  } as const,

  // Budget Periods
  PERIODS: {
    DAILY: 'daily',
    WEEKLY: 'weekly',
    MONTHLY: 'monthly',
    QUARTERLY: 'quarterly',
    YEARLY: 'yearly',
    CAMPAIGN_DURATION: 'campaign_duration',
  } as const,

  // Currency Types
  CURRENCIES: {
    USD: 'USD',
    EUR: 'EUR',
    GBP: 'GBP',
    BDT: 'BDT',
    INR: 'INR',
    JPY: 'JPY',
    CAD: 'CAD',
    AUD: 'AUD',
  } as const,

  // Budget Limits
  LIMITS: {
    MIN_AMOUNT: 100,
    MAX_AMOUNT: 1000000,
    MIN_DAILY_BUDGET: 10,
    MAX_DAILY_BUDGET: 50000,
    MIN_PERCENTAGE: 1,
    MAX_PERCENTAGE: 100,
  } as const,

  // Budget Defaults
  DEFAULTS: {
    DEFAULT_TYPE: 'fixed',
    DEFAULT_ALLOCATION_METHOD: 'even',
    DEFAULT_PERIOD: 'monthly',
    DEFAULT_CURRENCY: 'BDT',
    DEFAULT_BUDGET: 1000,
    DEFAULT_DAILY_BUDGET: 100,
    DEFAULT_PERCENTAGE: 10,
  } as const,
} as const;

// Budget Types
export type MarketingCampaignBudgetType =
  (typeof MARKETINGCAMPAIGN_BUDGET.TYPES)[keyof typeof MARKETINGCAMPAIGN_BUDGET.TYPES];

// Allocation Methods
export type MarketingCampaignAllocationMethod =
  (typeof MARKETINGCAMPAIGN_BUDGET.ALLOCATION_METHODS)[keyof typeof MARKETINGCAMPAIGN_BUDGET.ALLOCATION_METHODS];

// Budget Statuses
export type MarketingCampaignBudgetStatus =
  (typeof MARKETINGCAMPAIGN_BUDGET.STATUSES)[keyof typeof MARKETINGCAMPAIGN_BUDGET.STATUSES];

// Budget Periods
export type MarketingCampaignBudgetPeriod =
  (typeof MARKETINGCAMPAIGN_BUDGET.PERIODS)[keyof typeof MARKETINGCAMPAIGN_BUDGET.PERIODS];

// Currencies
export type MarketingCampaignCurrency =
  (typeof MARKETINGCAMPAIGN_BUDGET.CURRENCIES)[keyof typeof MARKETINGCAMPAIGN_BUDGET.CURRENCIES];

// Budget Limits
export type MarketingCampaignBudgetLimit =
  (typeof MARKETINGCAMPAIGN_BUDGET.LIMITS)[keyof typeof MARKETINGCAMPAIGN_BUDGET.LIMITS];

// Budget Defaults
export type MarketingCampaignBudgetDefault =
  (typeof MARKETINGCAMPAIGN_BUDGET.DEFAULTS)[keyof typeof MARKETINGCAMPAIGN_BUDGET.DEFAULTS];

// Utility Functions
export function marketingcampaignGetBudgetTypeLabel(
  budgetType: MarketingCampaignBudgetType
): string {
  const labels: Record<MarketingCampaignBudgetType, string> = {
    [MARKETINGCAMPAIGN_BUDGET.TYPES.FIXED]: 'Fixed Budget',
    [MARKETINGCAMPAIGN_BUDGET.TYPES.VARIABLE]: 'Variable Budget',
    [MARKETINGCAMPAIGN_BUDGET.TYPES.PERCENTAGE_OF_REVENUE]: 'Percentage of Revenue',
    [MARKETINGCAMPAIGN_BUDGET.TYPES.DYNAMIC]: 'Dynamic Budget',
    [MARKETINGCAMPAIGN_BUDGET.TYPES.FLEXIBLE]: 'Flexible Budget',
    [MARKETINGCAMPAIGN_BUDGET.TYPES.CAP]: 'Budget Cap',
    [MARKETINGCAMPAIGN_BUDGET.TYPES.UNLIMITED]: 'Unlimited Budget',
  };
  return labels[budgetType] || 'Unknown Budget Type';
}

export function marketingcampaignGetAllocationMethodLabel(
  method: MarketingCampaignAllocationMethod
): string {
  const labels: Record<MarketingCampaignAllocationMethod, string> = {
    [MARKETINGCAMPAIGN_BUDGET.ALLOCATION_METHODS.EVEN]: 'Even Allocation',
    [MARKETINGCAMPAIGN_BUDGET.ALLOCATION_METHODS.PERFORMANCE_BASED]: 'Performance Based',
    [MARKETINGCAMPAIGN_BUDGET.ALLOCATION_METHODS.SEASONAL]: 'Seasonal Allocation',
    [MARKETINGCAMPAIGN_BUDGET.ALLOCATION_METHODS.WEIGHTED]: 'Weighted Allocation',
    [MARKETINGCAMPAIGN_BUDGET.ALLOCATION_METHODS.DYNAMIC]: 'Dynamic Allocation',
    [MARKETINGCAMPAIGN_BUDGET.ALLOCATION_METHODS.MANUAL]: 'Manual Allocation',
  };
  return labels[method] || 'Unknown Allocation Method';
}

export function marketingcampaignGetBudgetStatusLabel(
  status: MarketingCampaignBudgetStatus
): string {
  const labels: Record<MarketingCampaignBudgetStatus, string> = {
    [MARKETINGCAMPAIGN_BUDGET.STATUSES.PENDING]: 'Pending',
    [MARKETINGCAMPAIGN_BUDGET.STATUSES.APPROVED]: 'Approved',
    [MARKETINGCAMPAIGN_BUDGET.STATUSES.REJECTED]: 'Rejected',
    [MARKETINGCAMPAIGN_BUDGET.STATUSES.ACTIVE]: 'Active',
    [MARKETINGCAMPAIGN_BUDGET.STATUSES.EXHAUSTED]: 'Exhausted',
    [MARKETINGCAMPAIGN_BUDGET.STATUSES.FROZEN]: 'Frozen',
    [MARKETINGCAMPAIGN_BUDGET.STATUSES.CANCELLED]: 'Cancelled',
  };
  return labels[status] || 'Unknown Status';
}

export function marketingcampaignGetBudgetPeriodLabel(
  period: MarketingCampaignBudgetPeriod
): string {
  const labels: Record<MarketingCampaignBudgetPeriod, string> = {
    [MARKETINGCAMPAIGN_BUDGET.PERIODS.DAILY]: 'Daily',
    [MARKETINGCAMPAIGN_BUDGET.PERIODS.WEEKLY]: 'Weekly',
    [MARKETINGCAMPAIGN_BUDGET.PERIODS.MONTHLY]: 'Monthly',
    [MARKETINGCAMPAIGN_BUDGET.PERIODS.QUARTERLY]: 'Quarterly',
    [MARKETINGCAMPAIGN_BUDGET.PERIODS.YEARLY]: 'Yearly',
    [MARKETINGCAMPAIGN_BUDGET.PERIODS.CAMPAIGN_DURATION]: 'Campaign Duration',
  };
  return labels[period] || 'Unknown Period';
}

export function marketingcampaignGetCurrencySymbol(currency: MarketingCampaignCurrency): string {
  const symbols: Record<MarketingCampaignCurrency, string> = {
    [MARKETINGCAMPAIGN_BUDGET.CURRENCIES.USD]: '$',
    [MARKETINGCAMPAIGN_BUDGET.CURRENCIES.EUR]: '€',
    [MARKETINGCAMPAIGN_BUDGET.CURRENCIES.GBP]: '£',
    [MARKETINGCAMPAIGN_BUDGET.CURRENCIES.BDT]: '৳',
    [MARKETINGCAMPAIGN_BUDGET.CURRENCIES.INR]: '₹',
    [MARKETINGCAMPAIGN_BUDGET.CURRENCIES.JPY]: '¥',
    [MARKETINGCAMPAIGN_BUDGET.CURRENCIES.CAD]: 'C$',
    [MARKETINGCAMPAIGN_BUDGET.CURRENCIES.AUD]: 'A$',
  };
  return symbols[currency] || '$';
}

export function marketingcampaignIsBudgetExhausted(status: MarketingCampaignBudgetStatus): boolean {
  return status === MARKETINGCAMPAIGN_BUDGET.STATUSES.EXHAUSTED;
}

export function marketingcampaignIsBudgetActive(status: MarketingCampaignBudgetStatus): boolean {
  const activeStatuses: MarketingCampaignBudgetStatus[] = [
    MARKETINGCAMPAIGN_BUDGET.STATUSES.ACTIVE,
    MARKETINGCAMPAIGN_BUDGET.STATUSES.APPROVED,
  ];
  return activeStatuses.includes(status);
}

export function marketingcampaignCalculateDailyBudget(
  totalBudget: number,
  durationDays: number
): number {
  if (durationDays <= 0) return 0;
  return Math.round(totalBudget / durationDays);
}

export function marketingcampaignCalculateRemainingBudget(
  totalBudget: number,
  spentBudget: number
): number {
  return Math.max(0, totalBudget - spentBudget);
}

export function marketingcampaignGetBudgetUtilization(
  totalBudget: number,
  spentBudget: number
): number {
  if (totalBudget === 0) return 0;
  return Math.min(100, (spentBudget / totalBudget) * 100);
}

export function marketingcampaignIsWithinBudget(
  totalBudget: number,
  spentBudget: number,
  plannedBudget: number
): boolean {
  return totalBudget >= spentBudget + plannedBudget;
}

export function marketingcampaignGetDefaultBudgetType(): MarketingCampaignBudgetType {
  return MARKETINGCAMPAIGN_BUDGET.DEFAULTS.DEFAULT_TYPE;
}

export function marketingcampaignGetDefaultCurrency(): MarketingCampaignCurrency {
  return MARKETINGCAMPAIGN_BUDGET.DEFAULTS.DEFAULT_CURRENCY;
}

export function marketingcampaignGetDefaultBudget(): number {
  return MARKETINGCAMPAIGN_BUDGET.DEFAULTS.DEFAULT_BUDGET;
}
