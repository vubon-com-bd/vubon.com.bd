/**
 * @fileoverview Financial analytics system core constants
 * @package @vubun/shared-constants
 */

// External libraries - none needed for constants

// Shared packages - none needed for constants

// Project files - none needed for constants

/**
 * Default currency settings
 */
export interface CurrencySettings {
  /** Default currency code */
  defaultCurrency: string;
  /** Supported currencies */
  supportedCurrencies: string[];
  /** Currency symbol mapping */
  currencySymbols: Record<string, string>;
  /** Currency decimal places */
  decimalPlaces: Record<string, number>;
}

export const DEFAULT_CURRENCY_SETTINGS: CurrencySettings = {
  defaultCurrency: 'USD',
  supportedCurrencies: ['USD', 'EUR', 'GBP', 'BDT', 'INR', 'AED', 'SAR'],
  currencySymbols: {
    USD: '$',
    EUR: '€',
    GBP: '£',
    BDT: '৳',
    INR: '₹',
    AED: 'د.إ',
    SAR: '﷼',
  },
  decimalPlaces: {
    USD: 2,
    EUR: 2,
    GBP: 2,
    BDT: 2,
    INR: 2,
    AED: 2,
    SAR: 2,
  },
};

/**
 * Tax calculation settings
 */
export interface TaxCalculationSettings {
  /** Default tax rate percentage */
  defaultTaxRate: number;
  /** Tax types */
  taxTypes: ('VAT' | 'GST' | 'SALES_TAX' | 'INCOME_TAX' | 'CORPORATE_TAX')[];
  /** Enable tax calculation */
  enableTaxCalculation: boolean;
  /** Tax inclusive pricing */
  taxInclusivePricing: boolean;
  /** Compound tax calculation */
  compoundTax: boolean;
  /** Tax rounding method */
  roundingMethod: 'ROUND' | 'CEIL' | 'FLOOR';
}

export const DEFAULT_TAX_CALCULATION_SETTINGS: TaxCalculationSettings = {
  defaultTaxRate: 10,
  taxTypes: ['VAT', 'GST', 'SALES_TAX'],
  enableTaxCalculation: true,
  taxInclusivePricing: false,
  compoundTax: false,
  roundingMethod: 'ROUND',
};

/**
 * Discount calculation settings
 */
export interface DiscountCalculationSettings {
  /** Enable discount calculation */
  enableDiscountCalculation: boolean;
  /** Discount types */
  discountTypes: ('PERCENTAGE' | 'FIXED' | 'VOLUME' | 'SEASONAL' | 'PROMOTIONAL' | 'LOYALTY')[];
  /** Default discount percentage */
  defaultDiscountPercentage: number;
  /** Maximum discount percentage */
  maxDiscountPercentage: number;
  /** Discount approval required */
  approvalRequired: boolean;
  /** Discount reason required */
  reasonRequired: boolean;
}

export const DEFAULT_DISCOUNT_CALCULATION_SETTINGS: DiscountCalculationSettings = {
  enableDiscountCalculation: true,
  discountTypes: ['PERCENTAGE', 'FIXED', 'VOLUME', 'PROMOTIONAL', 'LOYALTY'],
  defaultDiscountPercentage: 0,
  maxDiscountPercentage: 20,
  approvalRequired: true,
  reasonRequired: true,
};

/**
 * Financial reporting periods
 */
export enum FinancialReportingPeriod {
  /** Daily reporting */
  DAILY = 'DAILY',
  /** Weekly reporting */
  WEEKLY = 'WEEKLY',
  /** Monthly reporting */
  MONTHLY = 'MONTHLY',
  /** Quarterly reporting */
  QUARTERLY = 'QUARTERLY',
  /** Half-yearly reporting */
  HALF_YEARLY = 'HALF_YEARLY',
  /** Yearly reporting */
  YEARLY = 'YEARLY',
  /** Custom period */
  CUSTOM = 'CUSTOM',
}

/**
 * Budget categories
 */
export enum BudgetCategory {
  /** Operating expenses */
  OPERATING = 'OPERATING',
  /** Capital expenses */
  CAPITAL = 'CAPITAL',
  /** Marketing expenses */
  MARKETING = 'MARKETING',
  /** Sales expenses */
  SALES = 'SALES',
  /** Research and development */
  R_AND_D = 'R_AND_D',
  /** Administrative expenses */
  ADMINISTRATIVE = 'ADMINISTRATIVE',
  /** Personnel expenses */
  PERSONNEL = 'PERSONNEL',
  /** Training expenses */
  TRAINING = 'TRAINING',
  /** Technology expenses */
  TECHNOLOGY = 'TECHNOLOGY',
  /** Infrastructure expenses */
  INFRASTRUCTURE = 'INFRASTRUCTURE',
  /** Professional services */
  PROFESSIONAL_SERVICES = 'PROFESSIONAL_SERVICES',
  /** Travel expenses */
  TRAVEL = 'TRAVEL',
  /** Entertainment expenses */
  ENTERTAINMENT = 'ENTERTAINMENT',
  /** Utilities */
  UTILITIES = 'UTILITIES',
  /** Rent */
  RENT = 'RENT',
  /** Insurance */
  INSURANCE = 'INSURANCE',
  /** Legal expenses */
  LEGAL = 'LEGAL',
  /** Consulting expenses */
  CONSULTING = 'CONSULTING',
}

/**
 * Budget category configuration
 */
export const BUDGET_CATEGORY_CONFIG: Record<
  BudgetCategory,
  { label: string; description: string; color: string; typicalPercentage: number }
> = {
  [BudgetCategory.OPERATING]: {
    label: 'Operating Expenses',
    description: 'Day-to-day operating costs',
    color: '#3B82F6',
    typicalPercentage: 30,
  },
  [BudgetCategory.CAPITAL]: {
    label: 'Capital Expenses',
    description: 'Long-term capital investments',
    color: '#6366F1',
    typicalPercentage: 15,
  },
  [BudgetCategory.MARKETING]: {
    label: 'Marketing Expenses',
    description: 'Marketing and advertising costs',
    color: '#F59E0B',
    typicalPercentage: 10,
  },
  [BudgetCategory.SALES]: {
    label: 'Sales Expenses',
    description: 'Sales team and operations costs',
    color: '#10B981',
    typicalPercentage: 10,
  },
  [BudgetCategory.R_AND_D]: {
    label: 'R&D Expenses',
    description: 'Research and development costs',
    color: '#8B5CF6',
    typicalPercentage: 8,
  },
  [BudgetCategory.ADMINISTRATIVE]: {
    label: 'Administrative Expenses',
    description: 'Administrative and office costs',
    color: '#6B7280',
    typicalPercentage: 8,
  },
  [BudgetCategory.PERSONNEL]: {
    label: 'Personnel Expenses',
    description: 'Employee salaries and benefits',
    color: '#EC4899',
    typicalPercentage: 25,
  },
  [BudgetCategory.TRAINING]: {
    label: 'Training Expenses',
    description: 'Employee training and development',
    color: '#F472B6',
    typicalPercentage: 2,
  },
  [BudgetCategory.TECHNOLOGY]: {
    label: 'Technology Expenses',
    description: 'Technology and software costs',
    color: '#3B82F6',
    typicalPercentage: 5,
  },
  [BudgetCategory.INFRASTRUCTURE]: {
    label: 'Infrastructure Expenses',
    description: 'Infrastructure and hardware costs',
    color: '#6B7280',
    typicalPercentage: 5,
  },
  [BudgetCategory.PROFESSIONAL_SERVICES]: {
    label: 'Professional Services',
    description: 'Professional service fees',
    color: '#8B5CF6',
    typicalPercentage: 3,
  },
  [BudgetCategory.TRAVEL]: {
    label: 'Travel Expenses',
    description: 'Business travel costs',
    color: '#F59E0B',
    typicalPercentage: 2,
  },
  [BudgetCategory.ENTERTAINMENT]: {
    label: 'Entertainment Expenses',
    description: 'Business entertainment costs',
    color: '#F472B6',
    typicalPercentage: 1,
  },
  [BudgetCategory.UTILITIES]: {
    label: 'Utilities',
    description: 'Utility bills and services',
    color: '#10B981',
    typicalPercentage: 3,
  },
  [BudgetCategory.RENT]: {
    label: 'Rent',
    description: 'Office and facility rent',
    color: '#EF4444',
    typicalPercentage: 5,
  },
  [BudgetCategory.INSURANCE]: {
    label: 'Insurance',
    description: 'Business insurance costs',
    color: '#6366F1',
    typicalPercentage: 2,
  },
  [BudgetCategory.LEGAL]: {
    label: 'Legal Expenses',
    description: 'Legal and compliance costs',
    color: '#8B5CF6',
    typicalPercentage: 2,
  },
  [BudgetCategory.CONSULTING]: {
    label: 'Consulting Expenses',
    description: 'Consulting and advisory fees',
    color: '#F59E0B',
    typicalPercentage: 2,
  },
};

/**
 * Cost center settings
 */
export interface CostCenterSettings {
  /** Enable cost center tracking */
  enableCostCenterTracking: boolean;
  /** Cost centers */
  costCenters: string[];
  /** Default cost center */
  defaultCostCenter: string;
  /** Cost center allocation method */
  allocationMethod: 'DIRECT' | 'INDIRECT' | 'PROPORTIONAL';
  /** Budget allocation period */
  budgetAllocationPeriod: FinancialReportingPeriod;
}

export const DEFAULT_COST_CENTER_SETTINGS: CostCenterSettings = {
  enableCostCenterTracking: true,
  costCenters: ['HQ', 'REGION_1', 'REGION_2', 'REGION_3'],
  defaultCostCenter: 'HQ',
  allocationMethod: 'DIRECT',
  budgetAllocationPeriod: FinancialReportingPeriod.MONTHLY,
};

/**
 * Profit center settings
 */
export interface ProfitCenterSettings {
  /** Enable profit center tracking */
  enableProfitCenterTracking: boolean;
  /** Profit centers */
  profitCenters: string[];
  /** Default profit center */
  defaultProfitCenter: string;
  /** Revenue allocation method */
  revenueAllocationMethod: 'DIRECT' | 'INDIRECT' | 'PROPORTIONAL';
  /** Profit calculation period */
  calculationPeriod: FinancialReportingPeriod;
}

export const DEFAULT_PROFIT_CENTER_SETTINGS: ProfitCenterSettings = {
  enableProfitCenterTracking: true,
  profitCenters: ['PRODUCT_A', 'PRODUCT_B', 'PRODUCT_C'],
  defaultProfitCenter: 'PRODUCT_A',
  revenueAllocationMethod: 'DIRECT',
  calculationPeriod: FinancialReportingPeriod.MONTHLY,
};

/**
 * Financial threshold alerts
 */
export interface FinancialThresholdAlerts {
  /** Enable financial alerts */
  enableAlerts: boolean;
  /** Revenue decline threshold percentage */
  revenueDeclineThreshold: number;
  /** Expense increase threshold percentage */
  expenseIncreaseThreshold: number;
  /** Profit margin decline threshold percentage */
  profitMarginDeclineThreshold: number;
  /** Budget overrun threshold percentage */
  budgetOverrunThreshold: number;
  /** Alert check frequency in hours */
  checkFrequencyHours: number;
}

export const DEFAULT_FINANCIAL_THRESHOLD_ALERTS: FinancialThresholdAlerts = {
  enableAlerts: true,
  revenueDeclineThreshold: 10,
  expenseIncreaseThreshold: 15,
  profitMarginDeclineThreshold: 5,
  budgetOverrunThreshold: 20,
  checkFrequencyHours: 24,
};

/**
 * Invoicing cycle settings
 */
export interface InvoicingCycleSettings {
  /** Default invoicing cycle */
  defaultCycle: 'DAILY' | 'WEEKLY' | 'BI_WEEKLY' | 'MONTHLY' | 'QUARTERLY' | 'ANNUAL';
  /** Invoice generation day of month */
  generationDayOfMonth: number;
  /** Invoice due days */
  dueDays: number;
  /** Early payment discount days */
  earlyPaymentDiscountDays: number;
  /** Early payment discount percentage */
  earlyPaymentDiscountPercentage: number;
  /** Late payment fee percentage */
  latePaymentFeePercentage: number;
  /** Late payment grace period days */
  gracePeriodDays: number;
  /** Auto-generate invoices */
  autoGenerate: boolean;
  /** Send invoice notifications */
  sendNotifications: boolean;
}

export const DEFAULT_INVOICING_CYCLE_SETTINGS: InvoicingCycleSettings = {
  defaultCycle: 'MONTHLY',
  generationDayOfMonth: 1,
  dueDays: 30,
  earlyPaymentDiscountDays: 10,
  earlyPaymentDiscountPercentage: 2,
  latePaymentFeePercentage: 1.5,
  gracePeriodDays: 7,
  autoGenerate: true,
  sendNotifications: true,
};

/**
 * Payment terms settings
 */
export interface PaymentTermsSettings {
  /** Payment terms */
  paymentTerms: {
    code: string;
    name: string;
    days: number;
    description: string;
  }[];
  /** Default payment term */
  defaultTerm: string;
  /** Enable payment term validation */
  enableValidation: boolean;
  /** Payment term grace period days */
  gracePeriodDays: number;
}

export const DEFAULT_PAYMENT_TERMS_SETTINGS: PaymentTermsSettings = {
  paymentTerms: [
    { code: 'NET30', name: 'Net 30', days: 30, description: 'Payment due in 30 days' },
    { code: 'NET60', name: 'Net 60', days: 60, description: 'Payment due in 60 days' },
    { code: 'NET90', name: 'Net 90', days: 90, description: 'Payment due in 90 days' },
    { code: 'COD', name: 'Cash on Delivery', days: 0, description: 'Payment on delivery' },
    { code: 'EOM', name: 'End of Month', days: 30, description: 'Payment due at end of month' },
  ],
  defaultTerm: 'NET30',
  enableValidation: true,
  gracePeriodDays: 7,
};

/**
 * Financial analytics configuration
 */
export const FINANCIAL_ANALYTICS_CONFIG = {
  /** Maximum financial records to process */
  MAX_RECORDS: 100000,
  /** Financial analytics cache TTL in seconds */
  CACHE_TTL_SECONDS: 300,
  /** Financial query timeout in seconds */
  QUERY_TIMEOUT_SECONDS: 30,
  /** Maximum financial in report */
  MAX_FINANCIAL_IN_REPORT: 10000,
  /** Financial data export limit */
  EXPORT_LIMIT: 50000,
  /** Financial analytics version */
  VERSION: '1.0.0',
} as const;

/**
 * Financial functions
 */
export function getBudgetCategoryLabel(category: BudgetCategory): string {
  return BUDGET_CATEGORY_CONFIG[category]?.label || category;
}

export function getBudgetCategoryColor(category: BudgetCategory): string {
  return BUDGET_CATEGORY_CONFIG[category]?.color || '#6B7280';
}

export function getBudgetCategoryTypicalPercentage(category: BudgetCategory): number {
  return BUDGET_CATEGORY_CONFIG[category]?.typicalPercentage || 0;
}
