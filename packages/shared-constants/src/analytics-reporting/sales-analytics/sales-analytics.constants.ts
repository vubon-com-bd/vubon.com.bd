/**
 * @fileoverview Sales analytics system core constants
 * @package @vubun/shared-constants
 */

// External libraries - none needed for constants

// Shared packages - none needed for constants

// Project files - none needed for constants

/**
 * Sales tracking periods
 */
export enum SalesTrackingPeriod {
  /** Today */
  TODAY = 'TODAY',
  /** Yesterday */
  YESTERDAY = 'YESTERDAY',
  /** Last 7 days */
  LAST_7_DAYS = 'LAST_7_DAYS',
  /** Last 14 days */
  LAST_14_DAYS = 'LAST_14_DAYS',
  /** Last 30 days */
  LAST_30_DAYS = 'LAST_30_DAYS',
  /** Last 90 days */
  LAST_90_DAYS = 'LAST_90_DAYS',
  /** This month */
  THIS_MONTH = 'THIS_MONTH',
  /** Last month */
  LAST_MONTH = 'LAST_MONTH',
  /** This quarter */
  THIS_QUARTER = 'THIS_QUARTER',
  /** Last quarter */
  LAST_QUARTER = 'LAST_QUARTER',
  /** This year */
  THIS_YEAR = 'THIS_YEAR',
  /** Last year */
  LAST_YEAR = 'LAST_YEAR',
  /** Year to date */
  YEAR_TO_DATE = 'YEAR_TO_DATE',
  /** Quarter to date */
  QUARTER_TO_DATE = 'QUARTER_TO_DATE',
  /** Month to date */
  MONTH_TO_DATE = 'MONTH_TO_DATE',
}

/**
 * Sales target settings
 */
export interface SalesTargetSettings {
  /** Monthly target amount */
  monthlyTarget: number;
  /** Quarterly target amount */
  quarterlyTarget: number;
  /** Annual target amount */
  annualTarget: number;
  /** Target growth rate percentage */
  targetGrowthRate: number;
  /** Target achievement threshold percentage */
  achievementThreshold: number;
  /** Enable target tracking */
  enableTargetTracking: boolean;
  /** Target tracking period */
  trackingPeriod: SalesTrackingPeriod;
}

export const DEFAULT_SALES_TARGET_SETTINGS: SalesTargetSettings = {
  monthlyTarget: 10000,
  quarterlyTarget: 30000,
  annualTarget: 120000,
  targetGrowthRate: 10,
  achievementThreshold: 80,
  enableTargetTracking: true,
  trackingPeriod: SalesTrackingPeriod.THIS_MONTH,
};

/**
 * Sales commission settings
 */
export interface SalesCommissionSettings {
  /** Commission rate percentage */
  commissionRate: number;
  /** Bonus threshold */
  bonusThreshold: number;
  /** Bonus rate percentage */
  bonusRate: number;
  /** Commission calculation period */
  calculationPeriod: SalesTrackingPeriod;
  /** Enable commission tracking */
  enableCommissionTracking: boolean;
  /** Commission tier thresholds */
  tierThresholds: number[];
  /** Commission tier rates */
  tierRates: number[];
}

export const DEFAULT_SALES_COMMISSION_SETTINGS: SalesCommissionSettings = {
  commissionRate: 5,
  bonusThreshold: 10000,
  bonusRate: 2,
  calculationPeriod: SalesTrackingPeriod.THIS_MONTH,
  enableCommissionTracking: true,
  tierThresholds: [1000, 5000, 10000, 50000],
  tierRates: [2, 3, 5, 7],
};

/**
 * Sales tax configuration
 */
export interface SalesTaxConfig {
  /** Tax rate percentage */
  taxRate: number;
  /** Tax name */
  taxName: string;
  /** Tax type (inclusive/exclusive) */
  taxType: 'INCLUSIVE' | 'EXCLUSIVE';
  /** Enable tax calculation */
  enableTaxCalculation: boolean;
  /** Tax jurisdiction */
  jurisdiction: string;
  /** Tax registration number */
  registrationNumber?: string;
}

export const DEFAULT_SALES_TAX_CONFIG: SalesTaxConfig = {
  taxRate: 10,
  taxName: 'VAT',
  taxType: 'EXCLUSIVE',
  enableTaxCalculation: true,
  jurisdiction: 'Default',
};

/**
 * Sales discount settings
 */
export interface SalesDiscountSettings {
  /** Maximum discount percentage */
  maxDiscountPercentage: number;
  /** Default discount percentage */
  defaultDiscountPercentage: number;
  /** Enable discount tracking */
  enableDiscountTracking: boolean;
  /** Discount approval required */
  approvalRequired: boolean;
  /** Discount reason required */
  reasonRequired: boolean;
  /** Volume discount thresholds */
  volumeThresholds: number[];
  /** Volume discount rates */
  volumeDiscountRates: number[];
}

export const DEFAULT_SALES_DISCOUNT_SETTINGS: SalesDiscountSettings = {
  maxDiscountPercentage: 20,
  defaultDiscountPercentage: 0,
  enableDiscountTracking: true,
  approvalRequired: true,
  reasonRequired: true,
  volumeThresholds: [10, 50, 100, 500],
  volumeDiscountRates: [5, 10, 15, 20],
};

/**
 * Sales forecasting parameters
 */
export interface SalesForecastingParams {
  /** Forecasting period in days */
  forecastPeriod: number;
  /** Historical data period in days */
  historicalDataPeriod: number;
  /** Confidence interval percentage */
  confidenceInterval: number;
  /** Enable seasonality adjustment */
  enableSeasonalityAdjustment: boolean;
  /** Enable trend analysis */
  enableTrendAnalysis: boolean;
  /** Enable machine learning forecasting */
  enableMLForecasting: boolean;
  /** Model type for forecasting */
  modelType: 'ARIMA' | 'PROPHET' | 'ETS' | 'LINEAR' | 'NEURAL';
}

export const DEFAULT_SALES_FORECASTING_PARAMS: SalesForecastingParams = {
  forecastPeriod: 30,
  historicalDataPeriod: 365,
  confidenceInterval: 95,
  enableSeasonalityAdjustment: true,
  enableTrendAnalysis: true,
  enableMLForecasting: false,
  modelType: 'ARIMA',
};

/**
 * Sales seasonality factors
 */
export interface SalesSeasonalityFactors {
  /** Monthly factors (12 months) */
  monthlyFactors: number[];
  /** Quarterly factors (4 quarters) */
  quarterlyFactors: number[];
  /** Weekly factors (7 days) */
  weeklyFactors: number[];
  /** Holiday multiplier */
  holidayMultiplier: number;
  /** Weekend multiplier */
  weekendMultiplier: number;
  /** Enable seasonality adjustment */
  enableAdjustment: boolean;
}

export const DEFAULT_SALES_SEASONALITY_FACTORS: SalesSeasonalityFactors = {
  monthlyFactors: [0.8, 0.9, 1.0, 1.1, 1.2, 1.3, 1.2, 1.1, 1.0, 0.9, 0.8, 0.7],
  quarterlyFactors: [0.9, 1.1, 1.2, 0.8],
  weeklyFactors: [1.2, 1.0, 1.0, 1.0, 1.0, 1.2, 1.4],
  holidayMultiplier: 1.5,
  weekendMultiplier: 1.3,
  enableAdjustment: true,
};

/**
 * Sales territory mapping
 */
export interface SalesTerritoryMapping {
  /** Territory name */
  name: string;
  /** Territory code */
  code: string;
  /** Region */
  region: string;
  /** Sales representative */
  salesRep: string;
  /** Target amount */
  target: number;
  /** Assigned accounts */
  assignedAccounts: string[];
}

/**
 * Sales channel priority
 */
export enum SalesChannelPriority {
  /** Critical channel */
  CRITICAL = 'CRITICAL',
  /** High priority */
  HIGH = 'HIGH',
  /** Medium priority */
  MEDIUM = 'MEDIUM',
  /** Low priority */
  LOW = 'LOW',
  /** Experimental channel */
  EXPERIMENTAL = 'EXPERIMENTAL',
}

/**
 * Sales channels
 */
export enum SalesChannel {
  /** Direct sales */
  DIRECT = 'DIRECT',
  /** Online store */
  ONLINE = 'ONLINE',
  /** Retail stores */
  RETAIL = 'RETAIL',
  /** Wholesale */
  WHOLESALE = 'WHOLESALE',
  /** Distributors */
  DISTRIBUTORS = 'DISTRIBUTORS',
  /** Marketplace */
  MARKETPLACE = 'MARKETPLACE',
  /** Affiliate */
  AFFILIATE = 'AFFILIATE',
  /** Reseller */
  RESELLER = 'RESELLER',
  /** Partner */
  PARTNER = 'PARTNER',
  /** Agency */
  AGENCY = 'AGENCY',
  /** Franchise */
  FRANCHISE = 'FRANCHISE',
}

/**
 * Sales channel configuration
 */
export const SALES_CHANNEL_CONFIG: Record<
  SalesChannel,
  {
    label: string;
    description: string;
    priority: SalesChannelPriority;
    commissionRate: number;
    icon?: string;
    color?: string;
  }
> = {
  [SalesChannel.DIRECT]: {
    label: 'Direct Sales',
    description: 'Direct sales through sales team',
    priority: SalesChannelPriority.CRITICAL,
    commissionRate: 10,
    icon: 'User',
    color: '#3B82F6',
  },
  [SalesChannel.ONLINE]: {
    label: 'Online Store',
    description: 'Sales through online store',
    priority: SalesChannelPriority.HIGH,
    commissionRate: 5,
    icon: 'Globe',
    color: '#10B981',
  },
  [SalesChannel.RETAIL]: {
    label: 'Retail Stores',
    description: 'Sales through physical retail stores',
    priority: SalesChannelPriority.HIGH,
    commissionRate: 8,
    icon: 'Store',
    color: '#F59E0B',
  },
  [SalesChannel.WHOLESALE]: {
    label: 'Wholesale',
    description: 'Wholesale sales to businesses',
    priority: SalesChannelPriority.MEDIUM,
    commissionRate: 3,
    icon: 'Truck',
    color: '#6366F1',
  },
  [SalesChannel.DISTRIBUTORS]: {
    label: 'Distributors',
    description: 'Sales through distributors',
    priority: SalesChannelPriority.MEDIUM,
    commissionRate: 4,
    icon: 'Package',
    color: '#8B5CF6',
  },
  [SalesChannel.MARKETPLACE]: {
    label: 'Marketplace',
    description: 'Sales through online marketplaces',
    priority: SalesChannelPriority.HIGH,
    commissionRate: 6,
    icon: 'Layers',
    color: '#EC4899',
  },
  [SalesChannel.AFFILIATE]: {
    label: 'Affiliate',
    description: 'Sales through affiliate partners',
    priority: SalesChannelPriority.LOW,
    commissionRate: 7,
    icon: 'Share2',
    color: '#F472B6',
  },
  [SalesChannel.RESELLER]: {
    label: 'Reseller',
    description: 'Sales through resellers',
    priority: SalesChannelPriority.MEDIUM,
    commissionRate: 5,
    icon: 'Users',
    color: '#22C55E',
  },
  [SalesChannel.PARTNER]: {
    label: 'Partner',
    description: 'Sales through strategic partners',
    priority: SalesChannelPriority.HIGH,
    commissionRate: 8,
    icon: 'Handshake',
    color: '#F59E0B',
  },
  [SalesChannel.AGENCY]: {
    label: 'Agency',
    description: 'Sales through agencies',
    priority: SalesChannelPriority.LOW,
    commissionRate: 6,
    icon: 'Building',
    color: '#6B7280',
  },
  [SalesChannel.FRANCHISE]: {
    label: 'Franchise',
    description: 'Sales through franchise locations',
    priority: SalesChannelPriority.MEDIUM,
    commissionRate: 4,
    icon: 'Store',
    color: '#8B5CF6',
  },
};

/**
 * Sales reporting thresholds
 */
export interface SalesReportingThresholds {
  /** Low sales threshold */
  lowSalesThreshold: number;
  /** High sales threshold */
  highSalesThreshold: number;
  /** Growth alert threshold percentage */
  growthAlertThreshold: number;
  /** Decline alert threshold percentage */
  declineAlertThreshold: number;
  /** Revenue alert threshold */
  revenueAlertThreshold: number;
  /** Order volume alert threshold */
  orderVolumeAlertThreshold: number;
}

export const DEFAULT_SALES_REPORTING_THRESHOLDS: SalesReportingThresholds = {
  lowSalesThreshold: 100,
  highSalesThreshold: 1000,
  growthAlertThreshold: 10,
  declineAlertThreshold: 10,
  revenueAlertThreshold: 5000,
  orderVolumeAlertThreshold: 100,
};

/**
 * Sales analytics configuration
 */
export const SALES_ANALYTICS_CONFIG = {
  /** Maximum sales records to process */
  MAX_RECORDS: 100000,
  /** Sales analytics cache TTL in seconds */
  CACHE_TTL_SECONDS: 300,
  /** Sales query timeout in seconds */
  QUERY_TIMEOUT_SECONDS: 30,
  /** Maximum sales in report */
  MAX_SALES_IN_REPORT: 10000,
  /** Sales data export limit */
  EXPORT_LIMIT: 50000,
  /** Sales analytics version */
  VERSION: '1.0.0',
} as const;

/**
 * Sales event types
 */
export enum SalesEventType {
  /** Sale created */
  SALE_CREATED = 'SALE_CREATED',
  /** Sale updated */
  SALE_UPDATED = 'SALE_UPDATED',
  /** Sale completed */
  SALE_COMPLETED = 'SALE_COMPLETED',
  /** Sale cancelled */
  SALE_CANCELLED = 'SALE_CANCELLED',
  /** Sale refunded */
  SALE_REFUNDED = 'SALE_REFUNDED',
  /** Commission earned */
  COMMISSION_EARNED = 'COMMISSION_EARNED',
  /** Target achieved */
  TARGET_ACHIEVED = 'TARGET_ACHIEVED',
  /** Target missed */
  TARGET_MISSED = 'TARGET_MISSED',
}

/**
 * Sales event configuration
 */
export const SALES_EVENT_CONFIG: Record<
  SalesEventType,
  { label: string; description: string; isCritical: boolean }
> = {
  [SalesEventType.SALE_CREATED]: {
    label: 'Sale Created',
    description: 'New sale record created',
    isCritical: false,
  },
  [SalesEventType.SALE_UPDATED]: {
    label: 'Sale Updated',
    description: 'Sale record updated',
    isCritical: false,
  },
  [SalesEventType.SALE_COMPLETED]: {
    label: 'Sale Completed',
    description: 'Sale process completed',
    isCritical: true,
  },
  [SalesEventType.SALE_CANCELLED]: {
    label: 'Sale Cancelled',
    description: 'Sale was cancelled',
    isCritical: true,
  },
  [SalesEventType.SALE_REFUNDED]: {
    label: 'Sale Refunded',
    description: 'Sale was refunded',
    isCritical: true,
  },
  [SalesEventType.COMMISSION_EARNED]: {
    label: 'Commission Earned',
    description: 'Commission earned on sale',
    isCritical: false,
  },
  [SalesEventType.TARGET_ACHIEVED]: {
    label: 'Target Achieved',
    description: 'Sales target achieved',
    isCritical: true,
  },
  [SalesEventType.TARGET_MISSED]: {
    label: 'Target Missed',
    description: 'Sales target missed',
    isCritical: true,
  },
};

/**
 * Sales status
 */
export enum SalesStatus {
  /** Draft */
  DRAFT = 'DRAFT',
  /** Pending */
  PENDING = 'PENDING',
  /** In progress */
  IN_PROGRESS = 'IN_PROGRESS',
  /** Completed */
  COMPLETED = 'COMPLETED',
  /** Cancelled */
  CANCELLED = 'CANCELLED',
  /** Refunded */
  REFUNDED = 'REFUNDED',
  /** Shipped */
  SHIPPED = 'SHIPPED',
  /** Delivered */
  DELIVERED = 'DELIVERED',
}

/**
 * Sales functions
 */
export function getSalesChannelLabel(channel: SalesChannel): string {
  return SALES_CHANNEL_CONFIG[channel]?.label || channel;
}

export function getSalesChannelPriority(channel: SalesChannel): SalesChannelPriority {
  return SALES_CHANNEL_CONFIG[channel]?.priority || SalesChannelPriority.MEDIUM;
}

export function getSalesChannelCommission(channel: SalesChannel): number {
  return SALES_CHANNEL_CONFIG[channel]?.commissionRate || 5;
}

export function getSalesChannelColor(channel: SalesChannel): string {
  return SALES_CHANNEL_CONFIG[channel]?.color || '#6B7280';
}

export function getSalesStatusLabel(status: SalesStatus): string {
  return status;
}

export function getSalesEventLabel(event: SalesEventType): string {
  return SALES_EVENT_CONFIG[event]?.label || event;
}

export function isSalesEventCritical(event: SalesEventType): boolean {
  return SALES_EVENT_CONFIG[event]?.isCritical || false;
}
