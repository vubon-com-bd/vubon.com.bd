/**
 * @fileoverview Inventory analytics system core constants
 * @package @vubun/shared-constants
 */

// External libraries - none needed for constants

// Shared packages - none needed for constants

// Project files - none needed for constants

/**
 * Inventory reorder point calculation settings
 */
export interface ReorderPointSettings {
  /** Reorder point calculation formula */
  calculationFormula: 'BASIC' | 'ADVANCED' | 'DYNAMIC';
  /** Lead time in days */
  leadTimeDays: number;
  /** Safety stock multiplier */
  safetyStockMultiplier: number;
  /** Demand forecasting period in days */
  demandForecastPeriod: number;
  /** Reorder frequency in days */
  reorderFrequencyDays: number;
  /** Minimum order quantity */
  minOrderQuantity: number;
  /** Maximum order quantity */
  maxOrderQuantity: number;
}

export const DEFAULT_REORDER_POINT_SETTINGS: ReorderPointSettings = {
  calculationFormula: 'BASIC',
  leadTimeDays: 7,
  safetyStockMultiplier: 1.5,
  demandForecastPeriod: 30,
  reorderFrequencyDays: 7,
  minOrderQuantity: 10,
  maxOrderQuantity: 1000,
};

/**
 * Safety stock levels
 */
export interface SafetyStockLevels {
  /** Safety stock percentage */
  safetyStockPercentage: number;
  /** Minimum safety stock quantity */
  minSafetyStock: number;
  /** Maximum safety stock quantity */
  maxSafetyStock: number;
  /** Safety stock calculation method */
  calculationMethod: 'PERCENTAGE' | 'FIXED' | 'DYNAMIC';
  /** Seasonal adjustment factor */
  seasonalAdjustmentFactor: number;
  /** Demand variability factor */
  demandVariabilityFactor: number;
}

export const DEFAULT_SAFETY_STOCK_LEVELS: SafetyStockLevels = {
  safetyStockPercentage: 20,
  minSafetyStock: 5,
  maxSafetyStock: 100,
  calculationMethod: 'PERCENTAGE',
  seasonalAdjustmentFactor: 1.2,
  demandVariabilityFactor: 1.3,
};

/**
 * Inventory turnover thresholds
 */
export interface InventoryTurnoverThresholds {
  /** Good turnover rate */
  goodTurnoverRate: number;
  /** Average turnover rate */
  averageTurnoverRate: number;
  /** Poor turnover rate */
  poorTurnoverRate: number;
  /** Alert threshold percentage */
  alertThreshold: number;
  /** Critical threshold percentage */
  criticalThreshold: number;
}

export const DEFAULT_INVENTORY_TURNOVER_THRESHOLDS: InventoryTurnoverThresholds = {
  goodTurnoverRate: 12,
  averageTurnoverRate: 8,
  poorTurnoverRate: 4,
  alertThreshold: 15,
  criticalThreshold: 25,
};

/**
 * Stockout alert settings
 */
export interface StockoutAlertSettings {
  /** Enable stockout alerts */
  enableAlerts: boolean;
  /** Stockout alert threshold */
  alertThreshold: number;
  /** Critical stockout threshold */
  criticalThreshold: number;
  /** Alert check frequency in hours */
  checkFrequencyHours: number;
  /** Alert notification channels */
  notificationChannels: ('EMAIL' | 'SMS' | 'PUSH' | 'IN_APP')[];
  /** Alert escalation time in hours */
  escalationHours: number;
}

export const DEFAULT_STOCKOUT_ALERT_SETTINGS: StockoutAlertSettings = {
  enableAlerts: true,
  alertThreshold: 20,
  criticalThreshold: 10,
  checkFrequencyHours: 1,
  notificationChannels: ['EMAIL', 'SMS'],
  escalationHours: 24,
};

/**
 * Inventory category classification (ABC Analysis)
 */
export enum InventoryCategoryClass {
  /** A - High value, low quantity */
  A = 'A',
  /** B - Medium value, medium quantity */
  B = 'B',
  /** C - Low value, high quantity */
  C = 'C',
  /** D - Dead stock */
  D = 'D',
  /** E - Excess stock */
  E = 'E',
}

/**
 * ABC Analysis configuration
 */
export interface ABCAnalysisConfig {
  /** A category threshold percentage */
  aCategoryThreshold: number;
  /** B category threshold percentage */
  bCategoryThreshold: number;
  /** C category threshold percentage */
  cCategoryThreshold: number;
  /** Dead stock criteria in days */
  deadStockDays: number;
  /** Excess stock criteria in days */
  excessStockDays: number;
  /** Analysis period in days */
  analysisPeriodDays: number;
}

export const DEFAULT_ABC_ANALYSIS_CONFIG: ABCAnalysisConfig = {
  aCategoryThreshold: 70,
  bCategoryThreshold: 90,
  cCategoryThreshold: 100,
  deadStockDays: 180,
  excessStockDays: 90,
  analysisPeriodDays: 30,
};

/**
 * Warehouse capacity limits
 */
export interface WarehouseCapacityLimits {
  /** Maximum capacity in units */
  maxCapacityUnits: number;
  /** Maximum capacity in weight (kg) */
  maxCapacityWeight: number;
  /** Maximum capacity in volume (cubic meters) */
  maxCapacityVolume: number;
  /** Capacity alert threshold percentage */
  alertThreshold: number;
  /** Capacity critical threshold percentage */
  criticalThreshold: number;
  /** Storage efficiency target percentage */
  efficiencyTarget: number;
}

export const DEFAULT_WAREHOUSE_CAPACITY_LIMITS: WarehouseCapacityLimits = {
  maxCapacityUnits: 10000,
  maxCapacityWeight: 50000,
  maxCapacityVolume: 1000,
  alertThreshold: 80,
  criticalThreshold: 90,
  efficiencyTarget: 85,
};

/**
 * Inventory seasonality factors
 */
export interface InventorySeasonalityFactors {
  /** Monthly factors (12 months) */
  monthlyFactors: number[];
  /** Quarterly factors (4 quarters) */
  quarterlyFactors: number[];
  /** Holiday multiplier */
  holidayMultiplier: number;
  /** Seasonal adjustment period in days */
  adjustmentPeriodDays: number;
  /** Enable seasonal adjustment */
  enableSeasonalAdjustment: boolean;
}

export const DEFAULT_INVENTORY_SEASONALITY_FACTORS: InventorySeasonalityFactors = {
  monthlyFactors: [0.8, 0.9, 1.0, 1.1, 1.2, 1.3, 1.2, 1.1, 1.0, 0.9, 0.8, 0.7],
  quarterlyFactors: [0.9, 1.1, 1.2, 0.8],
  holidayMultiplier: 1.5,
  adjustmentPeriodDays: 30,
  enableSeasonalAdjustment: true,
};

/**
 * Lead time calculation settings
 */
export interface LeadTimeCalculationSettings {
  /** Lead time calculation method */
  calculationMethod: 'AVERAGE' | 'MAX' | 'WEIGHTED' | 'FORECAST';
  /** Historical lead time window in days */
  historicalWindowDays: number;
  /** Lead time buffer percentage */
  bufferPercentage: number;
  /** Supplier reliability factor */
  supplierReliabilityFactor: number;
  /** Transportation time in days */
  transportationTimeDays: number;
  /** Processing time in days */
  processingTimeDays: number;
}

export const DEFAULT_LEAD_TIME_CALCULATION_SETTINGS: LeadTimeCalculationSettings = {
  calculationMethod: 'AVERAGE',
  historicalWindowDays: 90,
  bufferPercentage: 20,
  supplierReliabilityFactor: 0.9,
  transportationTimeDays: 3,
  processingTimeDays: 2,
};

/**
 * Inventory reserve settings
 */
export interface InventoryReserveSettings {
  /** Reserve stock percentage */
  reservePercentage: number;
  /** Reserve stock calculation method */
  calculationMethod: 'PERCENTAGE' | 'FIXED' | 'DYNAMIC';
  /** Minimum reserve quantity */
  minReserveQuantity: number;
  /** Maximum reserve quantity */
  maxReserveQuantity: number;
  /** Reserve replenishment threshold */
  replenishmentThreshold: number;
  /** Reserve stock review period in days */
  reviewPeriodDays: number;
}

export const DEFAULT_INVENTORY_RESERVE_SETTINGS: InventoryReserveSettings = {
  reservePercentage: 10,
  calculationMethod: 'PERCENTAGE',
  minReserveQuantity: 0,
  maxReserveQuantity: 500,
  replenishmentThreshold: 50,
  reviewPeriodDays: 30,
};

/**
 * Inventory audit frequency
 */
export enum InventoryAuditFrequency {
  /** Daily audit */
  DAILY = 'DAILY',
  /** Weekly audit */
  WEEKLY = 'WEEKLY',
  /** Monthly audit */
  MONTHLY = 'MONTHLY',
  /** Quarterly audit */
  QUARTERLY = 'QUARTERLY',
  /** Annual audit */
  ANNUAL = 'ANNUAL',
  /** Cycle count */
  CYCLE_COUNT = 'CYCLE_COUNT',
}

/**
 * Inventory audit settings
 */
export interface InventoryAuditSettings {
  /** Default audit frequency */
  defaultFrequency: InventoryAuditFrequency;
  /** Cycle count frequency in days */
  cycleCountFrequencyDays: number;
  /** Audit tolerance percentage */
  tolerancePercentage: number;
  /** Enable random audits */
  enableRandomAudits: boolean;
  /** Audit sample size percentage */
  sampleSizePercentage: number;
  /** Audit notification channels */
  notificationChannels: ('EMAIL' | 'SMS' | 'IN_APP')[];
}

export const DEFAULT_INVENTORY_AUDIT_SETTINGS: InventoryAuditSettings = {
  defaultFrequency: InventoryAuditFrequency.MONTHLY,
  cycleCountFrequencyDays: 30,
  tolerancePercentage: 5,
  enableRandomAudits: true,
  sampleSizePercentage: 10,
  notificationChannels: ['EMAIL'],
};

/**
 * Inventory analytics configuration
 */
export const INVENTORY_ANALYTICS_CONFIG = {
  /** Maximum inventory records to process */
  MAX_RECORDS: 100000,
  /** Inventory analytics cache TTL in seconds */
  CACHE_TTL_SECONDS: 300,
  /** Inventory query timeout in seconds */
  QUERY_TIMEOUT_SECONDS: 30,
  /** Maximum inventory in report */
  MAX_INVENTORY_IN_REPORT: 10000,
  /** Inventory data export limit */
  EXPORT_LIMIT: 50000,
  /** Inventory analytics version */
  VERSION: '1.0.0',
} as const;

/**
 * Inventory functions
 */
export function getInventoryCategoryLabel(category: InventoryCategoryClass): string {
  return category;
}

export function getAuditFrequencyLabel(frequency: InventoryAuditFrequency): string {
  return frequency;
}
