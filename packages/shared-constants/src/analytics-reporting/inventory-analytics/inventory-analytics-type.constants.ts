/**
 * @fileoverview Inventory analytics type definitions and constants
 * @package @vubun/shared-constants
 */

// External libraries - none needed for constants

// Shared packages - none needed for constants

// Project files - none needed for constants

/**
 * Inventory analytics types enum for different inventory-related analytics
 */
export enum InventoryAnalyticsType {
  /** Stock level analytics */
  STOCK_LEVEL_ANALYTICS = 'STOCK_LEVEL_ANALYTICS',
  /** Inventory turnover analytics */
  INVENTORY_TURNOVER_ANALYTICS = 'INVENTORY_TURNOVER_ANALYTICS',
  /** Warehouse analytics */
  WAREHOUSE_ANALYTICS = 'WAREHOUSE_ANALYTICS',
  /** Supply chain analytics */
  SUPPLY_CHAIN_ANALYTICS = 'SUPPLY_CHAIN_ANALYTICS',
  /** Demand forecast analytics */
  DEMAND_FORECAST_ANALYTICS = 'DEMAND_FORECAST_ANALYTICS',
  /** Reorder point analytics */
  REORDER_POINT_ANALYTICS = 'REORDER_POINT_ANALYTICS',
  /** Safety stock analytics */
  SAFETY_STOCK_ANALYTICS = 'SAFETY_STOCK_ANALYTICS',
  /** Seasonal inventory analytics */
  SEASONAL_INVENTORY_ANALYTICS = 'SEASONAL_INVENTORY_ANALYTICS',
  /** Slow moving inventory analytics */
  SLOW_MOVING_INVENTORY_ANALYTICS = 'SLOW_MOVING_INVENTORY_ANALYTICS',
  /** Fast moving inventory analytics */
  FAST_MOVING_INVENTORY_ANALYTICS = 'FAST_MOVING_INVENTORY_ANALYTICS',
  /** Damaged inventory analytics */
  DAMAGED_INVENTORY_ANALYTICS = 'DAMAGED_INVENTORY_ANALYTICS',
  /** Expired inventory analytics */
  EXPIRED_INVENTORY_ANALYTICS = 'EXPIRED_INVENTORY_ANALYTICS',
  /** Returned inventory analytics */
  RETURNED_INVENTORY_ANALYTICS = 'RETURNED_INVENTORY_ANALYTICS',
  /** Reserved inventory analytics */
  RESERVED_INVENTORY_ANALYTICS = 'RESERVED_INVENTORY_ANALYTICS',
  /** Transit inventory analytics */
  TRANSIT_INVENTORY_ANALYTICS = 'TRANSIT_INVENTORY_ANALYTICS',
  /** Discrepancy analytics */
  DISCREPANCY_ANALYTICS = 'DISCREPANCY_ANALYTICS',
  /** Audit analytics */
  AUDIT_ANALYTICS = 'AUDIT_ANALYTICS',
  /** Reallocation analytics */
  REALLOCATION_ANALYTICS = 'REALLOCATION_ANALYTICS',
  /** Optimization analytics */
  OPTIMIZATION_ANALYTICS = 'OPTIMIZATION_ANALYTICS',
  /** Supplier performance analytics */
  SUPPLIER_PERFORMANCE_ANALYTICS = 'SUPPLIER_PERFORMANCE_ANALYTICS',
  /** Procurement analytics */
  PROCUREMENT_ANALYTICS = 'PROCUREMENT_ANALYTICS',
  /** Distribution analytics */
  DISTRIBUTION_ANALYTICS = 'DISTRIBUTION_ANALYTICS',
  /** Storage analytics */
  STORAGE_ANALYTICS = 'STORAGE_ANALYTICS',
  /** Fulfillment analytics */
  FULFILLMENT_ANALYTICS = 'FULFILLMENT_ANALYTICS',
  /** Returns analytics */
  RETURNS_ANALYTICS = 'RETURNS_ANALYTICS',
  /** Quality analytics */
  QUALITY_ANALYTICS = 'QUALITY_ANALYTICS',
  /** Cost analytics */
  COST_ANALYTICS = 'COST_ANALYTICS',
  /** Value analytics */
  VALUE_ANALYTICS = 'VALUE_ANALYTICS',
}

/**
 * Inventory analytics category for grouping
 */
export enum InventoryAnalyticsCategory {
  /** Stock level category */
  STOCK = 'STOCK',
  /** Movement category */
  MOVEMENT = 'MOVEMENT',
  /** Storage category */
  STORAGE = 'STORAGE',
  /** Quality category */
  QUALITY = 'QUALITY',
  /** Performance category */
  PERFORMANCE = 'PERFORMANCE',
  /** Optimization category */
  OPTIMIZATION = 'OPTIMIZATION',
  /** Supply chain category */
  SUPPLY_CHAIN = 'SUPPLY_CHAIN',
}

/**
 * Inventory analytics category mapping
 */
export const INVENTORY_ANALYTICS_TYPE_CATEGORY_MAP: Record<
  InventoryAnalyticsType,
  InventoryAnalyticsCategory
> = {
  [InventoryAnalyticsType.STOCK_LEVEL_ANALYTICS]: InventoryAnalyticsCategory.STOCK,
  [InventoryAnalyticsType.INVENTORY_TURNOVER_ANALYTICS]: InventoryAnalyticsCategory.MOVEMENT,
  [InventoryAnalyticsType.WAREHOUSE_ANALYTICS]: InventoryAnalyticsCategory.STORAGE,
  [InventoryAnalyticsType.SUPPLY_CHAIN_ANALYTICS]: InventoryAnalyticsCategory.SUPPLY_CHAIN,
  [InventoryAnalyticsType.DEMAND_FORECAST_ANALYTICS]: InventoryAnalyticsCategory.OPTIMIZATION,
  [InventoryAnalyticsType.REORDER_POINT_ANALYTICS]: InventoryAnalyticsCategory.OPTIMIZATION,
  [InventoryAnalyticsType.SAFETY_STOCK_ANALYTICS]: InventoryAnalyticsCategory.STOCK,
  [InventoryAnalyticsType.SEASONAL_INVENTORY_ANALYTICS]: InventoryAnalyticsCategory.OPTIMIZATION,
  [InventoryAnalyticsType.SLOW_MOVING_INVENTORY_ANALYTICS]: InventoryAnalyticsCategory.MOVEMENT,
  [InventoryAnalyticsType.FAST_MOVING_INVENTORY_ANALYTICS]: InventoryAnalyticsCategory.MOVEMENT,
  [InventoryAnalyticsType.DAMAGED_INVENTORY_ANALYTICS]: InventoryAnalyticsCategory.QUALITY,
  [InventoryAnalyticsType.EXPIRED_INVENTORY_ANALYTICS]: InventoryAnalyticsCategory.QUALITY,
  [InventoryAnalyticsType.RETURNED_INVENTORY_ANALYTICS]: InventoryAnalyticsCategory.MOVEMENT,
  [InventoryAnalyticsType.RESERVED_INVENTORY_ANALYTICS]: InventoryAnalyticsCategory.STOCK,
  [InventoryAnalyticsType.TRANSIT_INVENTORY_ANALYTICS]: InventoryAnalyticsCategory.SUPPLY_CHAIN,
  [InventoryAnalyticsType.DISCREPANCY_ANALYTICS]: InventoryAnalyticsCategory.QUALITY,
  [InventoryAnalyticsType.AUDIT_ANALYTICS]: InventoryAnalyticsCategory.PERFORMANCE,
  [InventoryAnalyticsType.REALLOCATION_ANALYTICS]: InventoryAnalyticsCategory.OPTIMIZATION,
  [InventoryAnalyticsType.OPTIMIZATION_ANALYTICS]: InventoryAnalyticsCategory.OPTIMIZATION,
  [InventoryAnalyticsType.SUPPLIER_PERFORMANCE_ANALYTICS]: InventoryAnalyticsCategory.PERFORMANCE,
  [InventoryAnalyticsType.PROCUREMENT_ANALYTICS]: InventoryAnalyticsCategory.SUPPLY_CHAIN,
  [InventoryAnalyticsType.DISTRIBUTION_ANALYTICS]: InventoryAnalyticsCategory.SUPPLY_CHAIN,
  [InventoryAnalyticsType.STORAGE_ANALYTICS]: InventoryAnalyticsCategory.STORAGE,
  [InventoryAnalyticsType.FULFILLMENT_ANALYTICS]: InventoryAnalyticsCategory.PERFORMANCE,
  [InventoryAnalyticsType.RETURNS_ANALYTICS]: InventoryAnalyticsCategory.MOVEMENT,
  [InventoryAnalyticsType.QUALITY_ANALYTICS]: InventoryAnalyticsCategory.QUALITY,
  [InventoryAnalyticsType.COST_ANALYTICS]: InventoryAnalyticsCategory.PERFORMANCE,
  [InventoryAnalyticsType.VALUE_ANALYTICS]: InventoryAnalyticsCategory.PERFORMANCE,
};

/**
 * Inventory analytics type configuration
 */
export interface InventoryAnalyticsTypeConfig {
  label: string;
  description: string;
  icon?: string;
  color?: string;
  priority: number;
  isRealtime: boolean;
  requiresProductId: boolean;
}

export const INVENTORY_ANALYTICS_TYPE_CONFIG: Record<
  InventoryAnalyticsType,
  InventoryAnalyticsTypeConfig
> = {
  [InventoryAnalyticsType.STOCK_LEVEL_ANALYTICS]: {
    label: 'Stock Level Analytics',
    description: 'Analytics for current stock levels',
    icon: 'Package',
    color: '#3B82F6',
    priority: 1,
    isRealtime: true,
    requiresProductId: true,
  },
  [InventoryAnalyticsType.INVENTORY_TURNOVER_ANALYTICS]: {
    label: 'Inventory Turnover Analytics',
    description: 'Analytics for inventory turnover rates',
    icon: 'Repeat',
    color: '#10B981',
    priority: 1,
    isRealtime: false,
    requiresProductId: true,
  },
  [InventoryAnalyticsType.WAREHOUSE_ANALYTICS]: {
    label: 'Warehouse Analytics',
    description: 'Analytics for warehouse operations',
    icon: 'Building',
    color: '#8B5CF6',
    priority: 2,
    isRealtime: false,
    requiresProductId: false,
  },
  [InventoryAnalyticsType.SUPPLY_CHAIN_ANALYTICS]: {
    label: 'Supply Chain Analytics',
    description: 'Analytics for supply chain performance',
    icon: 'Truck',
    color: '#6366F1',
    priority: 2,
    isRealtime: false,
    requiresProductId: false,
  },
  [InventoryAnalyticsType.DEMAND_FORECAST_ANALYTICS]: {
    label: 'Demand Forecast Analytics',
    description: 'Analytics for demand forecasting',
    icon: 'TrendingUp',
    color: '#F59E0B',
    priority: 1,
    isRealtime: false,
    requiresProductId: true,
  },
  [InventoryAnalyticsType.REORDER_POINT_ANALYTICS]: {
    label: 'Reorder Point Analytics',
    description: 'Analytics for reorder point optimization',
    icon: 'ArrowRight',
    color: '#F59E0B',
    priority: 2,
    isRealtime: true,
    requiresProductId: true,
  },
  [InventoryAnalyticsType.SAFETY_STOCK_ANALYTICS]: {
    label: 'Safety Stock Analytics',
    description: 'Analytics for safety stock levels',
    icon: 'Shield',
    color: '#10B981',
    priority: 2,
    isRealtime: false,
    requiresProductId: true,
  },
  [InventoryAnalyticsType.SEASONAL_INVENTORY_ANALYTICS]: {
    label: 'Seasonal Inventory Analytics',
    description: 'Analytics for seasonal inventory patterns',
    icon: 'Calendar',
    color: '#F472B6',
    priority: 2,
    isRealtime: false,
    requiresProductId: true,
  },
  [InventoryAnalyticsType.SLOW_MOVING_INVENTORY_ANALYTICS]: {
    label: 'Slow Moving Inventory Analytics',
    description: 'Analytics for slow moving items',
    icon: 'Clock',
    color: '#EF4444',
    priority: 2,
    isRealtime: false,
    requiresProductId: true,
  },
  [InventoryAnalyticsType.FAST_MOVING_INVENTORY_ANALYTICS]: {
    label: 'Fast Moving Inventory Analytics',
    description: 'Analytics for fast moving items',
    icon: 'Zap',
    color: '#22C55E',
    priority: 2,
    isRealtime: false,
    requiresProductId: true,
  },
  [InventoryAnalyticsType.DAMAGED_INVENTORY_ANALYTICS]: {
    label: 'Damaged Inventory Analytics',
    description: 'Analytics for damaged inventory',
    icon: 'AlertTriangle',
    color: '#EF4444',
    priority: 2,
    isRealtime: false,
    requiresProductId: true,
  },
  [InventoryAnalyticsType.EXPIRED_INVENTORY_ANALYTICS]: {
    label: 'Expired Inventory Analytics',
    description: 'Analytics for expired inventory',
    icon: 'AlertCircle',
    color: '#EF4444',
    priority: 2,
    isRealtime: false,
    requiresProductId: true,
  },
  [InventoryAnalyticsType.RETURNED_INVENTORY_ANALYTICS]: {
    label: 'Returned Inventory Analytics',
    description: 'Analytics for returned inventory',
    icon: 'Undo',
    color: '#F59E0B',
    priority: 2,
    isRealtime: false,
    requiresProductId: true,
  },
  [InventoryAnalyticsType.RESERVED_INVENTORY_ANALYTICS]: {
    label: 'Reserved Inventory Analytics',
    description: 'Analytics for reserved inventory',
    icon: 'Lock',
    color: '#6366F1',
    priority: 2,
    isRealtime: true,
    requiresProductId: true,
  },
  [InventoryAnalyticsType.TRANSIT_INVENTORY_ANALYTICS]: {
    label: 'Transit Inventory Analytics',
    description: 'Analytics for inventory in transit',
    icon: 'Truck',
    color: '#3B82F6',
    priority: 2,
    isRealtime: true,
    requiresProductId: true,
  },
  [InventoryAnalyticsType.DISCREPANCY_ANALYTICS]: {
    label: 'Discrepancy Analytics',
    description: 'Analytics for inventory discrepancies',
    icon: 'AlertTriangle',
    color: '#EF4444',
    priority: 2,
    isRealtime: false,
    requiresProductId: true,
  },
  [InventoryAnalyticsType.AUDIT_ANALYTICS]: {
    label: 'Audit Analytics',
    description: 'Analytics for inventory audits',
    icon: 'Clipboard',
    color: '#6B7280',
    priority: 2,
    isRealtime: false,
    requiresProductId: false,
  },
  [InventoryAnalyticsType.REALLOCATION_ANALYTICS]: {
    label: 'Reallocation Analytics',
    description: 'Analytics for inventory reallocation',
    icon: 'ArrowRight',
    color: '#8B5CF6',
    priority: 2,
    isRealtime: false,
    requiresProductId: true,
  },
  [InventoryAnalyticsType.OPTIMIZATION_ANALYTICS]: {
    label: 'Optimization Analytics',
    description: 'Analytics for inventory optimization',
    icon: 'TrendingUp',
    color: '#10B981',
    priority: 1,
    isRealtime: false,
    requiresProductId: true,
  },
  [InventoryAnalyticsType.SUPPLIER_PERFORMANCE_ANALYTICS]: {
    label: 'Supplier Performance Analytics',
    description: 'Analytics for supplier performance',
    icon: 'Users',
    color: '#F59E0B',
    priority: 2,
    isRealtime: false,
    requiresProductId: false,
  },
  [InventoryAnalyticsType.PROCUREMENT_ANALYTICS]: {
    label: 'Procurement Analytics',
    description: 'Analytics for procurement activities',
    icon: 'ShoppingCart',
    color: '#3B82F6',
    priority: 2,
    isRealtime: false,
    requiresProductId: false,
  },
  [InventoryAnalyticsType.DISTRIBUTION_ANALYTICS]: {
    label: 'Distribution Analytics',
    description: 'Analytics for distribution network',
    icon: 'MapPin',
    color: '#10B981',
    priority: 2,
    isRealtime: false,
    requiresProductId: false,
  },
  [InventoryAnalyticsType.STORAGE_ANALYTICS]: {
    label: 'Storage Analytics',
    description: 'Analytics for storage efficiency',
    icon: 'Box',
    color: '#8B5CF6',
    priority: 2,
    isRealtime: false,
    requiresProductId: false,
  },
  [InventoryAnalyticsType.FULFILLMENT_ANALYTICS]: {
    label: 'Fulfillment Analytics',
    description: 'Analytics for order fulfillment',
    icon: 'CheckCircle',
    color: '#22C55E',
    priority: 2,
    isRealtime: true,
    requiresProductId: true,
  },
  [InventoryAnalyticsType.RETURNS_ANALYTICS]: {
    label: 'Returns Analytics',
    description: 'Analytics for returns management',
    icon: 'Undo',
    color: '#F59E0B',
    priority: 2,
    isRealtime: false,
    requiresProductId: true,
  },
  [InventoryAnalyticsType.QUALITY_ANALYTICS]: {
    label: 'Quality Analytics',
    description: 'Analytics for inventory quality',
    icon: 'Shield',
    color: '#10B981',
    priority: 2,
    isRealtime: false,
    requiresProductId: true,
  },
  [InventoryAnalyticsType.COST_ANALYTICS]: {
    label: 'Cost Analytics',
    description: 'Analytics for inventory costs',
    icon: 'DollarSign',
    color: '#EF4444',
    priority: 2,
    isRealtime: false,
    requiresProductId: true,
  },
  [InventoryAnalyticsType.VALUE_ANALYTICS]: {
    label: 'Value Analytics',
    description: 'Analytics for inventory value',
    icon: 'DollarSign',
    color: '#22C55E',
    priority: 2,
    isRealtime: false,
    requiresProductId: true,
  },
};

/**
 * Get inventory analytics type label
 */
export function getInventoryAnalyticsTypeLabel(type: InventoryAnalyticsType): string {
  return INVENTORY_ANALYTICS_TYPE_CONFIG[type]?.label || type;
}

/**
 * Get inventory analytics type description
 */
export function getInventoryAnalyticsTypeDescription(type: InventoryAnalyticsType): string {
  return INVENTORY_ANALYTICS_TYPE_CONFIG[type]?.description || '';
}

/**
 * Get inventory analytics type category
 */
export function getInventoryAnalyticsTypeCategory(
  type: InventoryAnalyticsType
): InventoryAnalyticsCategory {
  return INVENTORY_ANALYTICS_TYPE_CATEGORY_MAP[type];
}

/**
 * Get inventory analytics types by category
 */
export function getInventoryAnalyticsTypesByCategory(
  category: InventoryAnalyticsCategory
): InventoryAnalyticsType[] {
  return Object.entries(INVENTORY_ANALYTICS_TYPE_CATEGORY_MAP)
    .filter(([_, cat]) => cat === category)
    .map(([type]) => type as InventoryAnalyticsType);
}

/**
 * Check if inventory analytics type requires product ID
 */
export function inventoryAnalyticsTypeRequiresProductId(type: InventoryAnalyticsType): boolean {
  return INVENTORY_ANALYTICS_TYPE_CONFIG[type]?.requiresProductId || false;
}

/**
 * Check if inventory analytics type is real-time
 */
export function isInventoryAnalyticsTypeRealtime(type: InventoryAnalyticsType): boolean {
  return INVENTORY_ANALYTICS_TYPE_CONFIG[type]?.isRealtime || false;
}

/**
 * Get inventory analytics type priority
 */
export function getInventoryAnalyticsTypePriority(type: InventoryAnalyticsType): number {
  return INVENTORY_ANALYTICS_TYPE_CONFIG[type]?.priority || 3;
}

/**
 * Inventory analytics type status
 */
export enum InventoryAnalyticsTypeStatus {
  /** Active and collecting data */
  ACTIVE = 'ACTIVE',
  /** Inactive and not collecting data */
  INACTIVE = 'INACTIVE',
  /** Paused temporarily */
  PAUSED = 'PAUSED',
  /** Under maintenance */
  MAINTENANCE = 'MAINTENANCE',
  /** Deprecated and will be removed */
  DEPRECATED = 'DEPRECATED',
}

/**
 * Default status for inventory analytics types
 */
export const INVENTORY_ANALYTICS_TYPE_DEFAULT_STATUS: Record<
  InventoryAnalyticsType,
  InventoryAnalyticsTypeStatus
> = {
  [InventoryAnalyticsType.STOCK_LEVEL_ANALYTICS]: InventoryAnalyticsTypeStatus.ACTIVE,
  [InventoryAnalyticsType.INVENTORY_TURNOVER_ANALYTICS]: InventoryAnalyticsTypeStatus.ACTIVE,
  [InventoryAnalyticsType.WAREHOUSE_ANALYTICS]: InventoryAnalyticsTypeStatus.ACTIVE,
  [InventoryAnalyticsType.SUPPLY_CHAIN_ANALYTICS]: InventoryAnalyticsTypeStatus.ACTIVE,
  [InventoryAnalyticsType.DEMAND_FORECAST_ANALYTICS]: InventoryAnalyticsTypeStatus.ACTIVE,
  [InventoryAnalyticsType.REORDER_POINT_ANALYTICS]: InventoryAnalyticsTypeStatus.ACTIVE,
  [InventoryAnalyticsType.SAFETY_STOCK_ANALYTICS]: InventoryAnalyticsTypeStatus.ACTIVE,
  [InventoryAnalyticsType.SEASONAL_INVENTORY_ANALYTICS]: InventoryAnalyticsTypeStatus.ACTIVE,
  [InventoryAnalyticsType.SLOW_MOVING_INVENTORY_ANALYTICS]: InventoryAnalyticsTypeStatus.ACTIVE,
  [InventoryAnalyticsType.FAST_MOVING_INVENTORY_ANALYTICS]: InventoryAnalyticsTypeStatus.ACTIVE,
  [InventoryAnalyticsType.DAMAGED_INVENTORY_ANALYTICS]: InventoryAnalyticsTypeStatus.ACTIVE,
  [InventoryAnalyticsType.EXPIRED_INVENTORY_ANALYTICS]: InventoryAnalyticsTypeStatus.ACTIVE,
  [InventoryAnalyticsType.RETURNED_INVENTORY_ANALYTICS]: InventoryAnalyticsTypeStatus.ACTIVE,
  [InventoryAnalyticsType.RESERVED_INVENTORY_ANALYTICS]: InventoryAnalyticsTypeStatus.ACTIVE,
  [InventoryAnalyticsType.TRANSIT_INVENTORY_ANALYTICS]: InventoryAnalyticsTypeStatus.ACTIVE,
  [InventoryAnalyticsType.DISCREPANCY_ANALYTICS]: InventoryAnalyticsTypeStatus.ACTIVE,
  [InventoryAnalyticsType.AUDIT_ANALYTICS]: InventoryAnalyticsTypeStatus.ACTIVE,
  [InventoryAnalyticsType.REALLOCATION_ANALYTICS]: InventoryAnalyticsTypeStatus.ACTIVE,
  [InventoryAnalyticsType.OPTIMIZATION_ANALYTICS]: InventoryAnalyticsTypeStatus.ACTIVE,
  [InventoryAnalyticsType.SUPPLIER_PERFORMANCE_ANALYTICS]: InventoryAnalyticsTypeStatus.ACTIVE,
  [InventoryAnalyticsType.PROCUREMENT_ANALYTICS]: InventoryAnalyticsTypeStatus.ACTIVE,
  [InventoryAnalyticsType.DISTRIBUTION_ANALYTICS]: InventoryAnalyticsTypeStatus.ACTIVE,
  [InventoryAnalyticsType.STORAGE_ANALYTICS]: InventoryAnalyticsTypeStatus.ACTIVE,
  [InventoryAnalyticsType.FULFILLMENT_ANALYTICS]: InventoryAnalyticsTypeStatus.ACTIVE,
  [InventoryAnalyticsType.RETURNS_ANALYTICS]: InventoryAnalyticsTypeStatus.ACTIVE,
  [InventoryAnalyticsType.QUALITY_ANALYTICS]: InventoryAnalyticsTypeStatus.ACTIVE,
  [InventoryAnalyticsType.COST_ANALYTICS]: InventoryAnalyticsTypeStatus.ACTIVE,
  [InventoryAnalyticsType.VALUE_ANALYTICS]: InventoryAnalyticsTypeStatus.ACTIVE,
};

/**
 * Get inventory analytics type status
 */
export function getInventoryAnalyticsTypeStatus(
  type: InventoryAnalyticsType
): InventoryAnalyticsTypeStatus {
  return INVENTORY_ANALYTICS_TYPE_DEFAULT_STATUS[type] || InventoryAnalyticsTypeStatus.INACTIVE;
}

/**
 * Set inventory analytics type status
 */
export function setInventoryAnalyticsTypeStatus(
  type: InventoryAnalyticsType,
  status: InventoryAnalyticsTypeStatus
): void {
  INVENTORY_ANALYTICS_TYPE_DEFAULT_STATUS[type] = status;
}

/**
 * Inventory analytics priority levels
 */
export const INVENTORY_ANALYTICS_PRIORITY_LEVELS = {
  /** Critical priority - essential analytics */
  CRITICAL: 1,
  /** High priority - important analytics */
  HIGH: 2,
  /** Medium priority - useful analytics */
  MEDIUM: 3,
  /** Low priority - nice to have */
  LOW: 4,
} as const;

/**
 * Get inventory analytics types by priority
 */
export function getInventoryAnalyticsTypesByPriority(priority: number): InventoryAnalyticsType[] {
  return Object.entries(INVENTORY_ANALYTICS_TYPE_CONFIG)
    .filter(([_, config]) => config.priority === priority)
    .map(([type]) => type as InventoryAnalyticsType);
}

/**
 * Get critical inventory analytics types
 */
export function getCriticalInventoryAnalyticsTypes(): InventoryAnalyticsType[] {
  return getInventoryAnalyticsTypesByPriority(INVENTORY_ANALYTICS_PRIORITY_LEVELS.CRITICAL);
}

/**
 * Inventory analytics sub-categories
 */
export enum InventoryAnalyticsSubCategory {
  /** Stock analysis */
  STOCK = 'STOCK',
  /** Movement analysis */
  MOVEMENT = 'MOVEMENT',
  /** Quality analysis */
  QUALITY = 'QUALITY',
  /** Performance analysis */
  PERFORMANCE = 'PERFORMANCE',
  /** Optimization analysis */
  OPTIMIZATION = 'OPTIMIZATION',
  /** Supply chain analysis */
  SUPPLY_CHAIN = 'SUPPLY_CHAIN',
  /** Storage analysis */
  STORAGE = 'STORAGE',
}

/**
 * Mapping of inventory analytics types to sub-categories
 */
export const INVENTORY_ANALYTICS_TYPE_SUB_CATEGORY_MAP: Record<
  InventoryAnalyticsType,
  InventoryAnalyticsSubCategory
> = {
  [InventoryAnalyticsType.STOCK_LEVEL_ANALYTICS]: InventoryAnalyticsSubCategory.STOCK,
  [InventoryAnalyticsType.SAFETY_STOCK_ANALYTICS]: InventoryAnalyticsSubCategory.STOCK,
  [InventoryAnalyticsType.RESERVED_INVENTORY_ANALYTICS]: InventoryAnalyticsSubCategory.STOCK,
  [InventoryAnalyticsType.INVENTORY_TURNOVER_ANALYTICS]: InventoryAnalyticsSubCategory.MOVEMENT,
  [InventoryAnalyticsType.SLOW_MOVING_INVENTORY_ANALYTICS]: InventoryAnalyticsSubCategory.MOVEMENT,
  [InventoryAnalyticsType.FAST_MOVING_INVENTORY_ANALYTICS]: InventoryAnalyticsSubCategory.MOVEMENT,
  [InventoryAnalyticsType.RETURNED_INVENTORY_ANALYTICS]: InventoryAnalyticsSubCategory.MOVEMENT,
  [InventoryAnalyticsType.RETURNS_ANALYTICS]: InventoryAnalyticsSubCategory.MOVEMENT,
  [InventoryAnalyticsType.DAMAGED_INVENTORY_ANALYTICS]: InventoryAnalyticsSubCategory.QUALITY,
  [InventoryAnalyticsType.EXPIRED_INVENTORY_ANALYTICS]: InventoryAnalyticsSubCategory.QUALITY,
  [InventoryAnalyticsType.DISCREPANCY_ANALYTICS]: InventoryAnalyticsSubCategory.QUALITY,
  [InventoryAnalyticsType.QUALITY_ANALYTICS]: InventoryAnalyticsSubCategory.QUALITY,
  [InventoryAnalyticsType.WAREHOUSE_ANALYTICS]: InventoryAnalyticsSubCategory.STORAGE,
  [InventoryAnalyticsType.STORAGE_ANALYTICS]: InventoryAnalyticsSubCategory.STORAGE,
  [InventoryAnalyticsType.AUDIT_ANALYTICS]: InventoryAnalyticsSubCategory.PERFORMANCE,
  [InventoryAnalyticsType.SUPPLIER_PERFORMANCE_ANALYTICS]:
    InventoryAnalyticsSubCategory.PERFORMANCE,
  [InventoryAnalyticsType.FULFILLMENT_ANALYTICS]: InventoryAnalyticsSubCategory.PERFORMANCE,
  [InventoryAnalyticsType.COST_ANALYTICS]: InventoryAnalyticsSubCategory.PERFORMANCE,
  [InventoryAnalyticsType.VALUE_ANALYTICS]: InventoryAnalyticsSubCategory.PERFORMANCE,
  [InventoryAnalyticsType.DEMAND_FORECAST_ANALYTICS]: InventoryAnalyticsSubCategory.OPTIMIZATION,
  [InventoryAnalyticsType.REORDER_POINT_ANALYTICS]: InventoryAnalyticsSubCategory.OPTIMIZATION,
  [InventoryAnalyticsType.SEASONAL_INVENTORY_ANALYTICS]: InventoryAnalyticsSubCategory.OPTIMIZATION,
  [InventoryAnalyticsType.REALLOCATION_ANALYTICS]: InventoryAnalyticsSubCategory.OPTIMIZATION,
  [InventoryAnalyticsType.OPTIMIZATION_ANALYTICS]: InventoryAnalyticsSubCategory.OPTIMIZATION,
  [InventoryAnalyticsType.SUPPLY_CHAIN_ANALYTICS]: InventoryAnalyticsSubCategory.SUPPLY_CHAIN,
  [InventoryAnalyticsType.TRANSIT_INVENTORY_ANALYTICS]: InventoryAnalyticsSubCategory.SUPPLY_CHAIN,
  [InventoryAnalyticsType.PROCUREMENT_ANALYTICS]: InventoryAnalyticsSubCategory.SUPPLY_CHAIN,
  [InventoryAnalyticsType.DISTRIBUTION_ANALYTICS]: InventoryAnalyticsSubCategory.SUPPLY_CHAIN,
};

/**
 * Get inventory analytics type sub-category
 */
export function getInventoryAnalyticsTypeSubCategory(
  type: InventoryAnalyticsType
): InventoryAnalyticsSubCategory {
  return INVENTORY_ANALYTICS_TYPE_SUB_CATEGORY_MAP[type];
}

/**
 * Get inventory analytics types by sub-category
 */
export function getInventoryAnalyticsTypesBySubCategory(
  subCategory: InventoryAnalyticsSubCategory
): InventoryAnalyticsType[] {
  return Object.entries(INVENTORY_ANALYTICS_TYPE_SUB_CATEGORY_MAP)
    .filter(([_, subCat]) => subCat === subCategory)
    .map(([type]) => type as InventoryAnalyticsType);
}
