/**
 * Warehouse Type Constants
 * Types of warehouses
 */

// Services Offered (without as const to avoid readonly issue)
const SERVICES = {
  CENTRAL: ['Storage', 'Distribution', 'Fulfillment', 'Returns', 'Value Added'],
  REGIONAL: ['Storage', 'Distribution', 'Returns'],
  LOCAL: ['Storage', 'Picking', 'Packing'],
  FULFILLMENT: ['Fulfillment', 'Picking', 'Packing', 'Shipping'],
  DISTRIBUTION: ['Distribution', 'Cross-docking', 'Sorting'],
  STORAGE: ['Storage', 'Inventory Management'],
  CROSS_DOCK: ['Cross-docking', 'Sorting', 'Transit'],
};

export const LOGISTICS_WAREHOUSE_TYPE = {
  // Type Types
  TYPES: {
    CENTRAL: 'central',
    REGIONAL: 'regional',
    LOCAL: 'local',
    FULFILLMENT: 'fulfillment',
    DISTRIBUTION: 'distribution',
    STORAGE: 'storage',
    CROSS_DOCK: 'cross_dock',
  } as const,

  // Type Categories
  CATEGORIES: {
    MAIN: 'main',
    REGIONAL: 'regional',
    SPECIALIZED: 'specialized',
  } as const,

  // Type Icons (for UI)
  ICONS: {
    CENTRAL: '🏢',
    REGIONAL: '🏗️',
    LOCAL: '🏪',
    FULFILLMENT: '📦',
    DISTRIBUTION: '🚛',
    STORAGE: '🏠',
    CROSS_DOCK: '🔄',
  } as const,

  // Type Colors (for UI)
  COLORS: {
    CENTRAL: '#purple-600',
    REGIONAL: '#blue-500',
    LOCAL: '#green-500',
    FULFILLMENT: '#orange-500',
    DISTRIBUTION: '#red-500',
    STORAGE: '#gray-500',
    CROSS_DOCK: '#teal-500',
  } as const,

  // Capacity Multiplier
  CAPACITY_MULTIPLIER: {
    CENTRAL: 1.0,
    REGIONAL: 0.6,
    LOCAL: 0.3,
    FULFILLMENT: 0.8,
    DISTRIBUTION: 0.7,
    STORAGE: 0.5,
    CROSS_DOCK: 0.2,
  } as const,

  // Services Offered (without as const)
  SERVICES: SERVICES,
} as const;

// Type Types
export type LogisticsWarehouseTypeType =
  (typeof LOGISTICS_WAREHOUSE_TYPE.TYPES)[keyof typeof LOGISTICS_WAREHOUSE_TYPE.TYPES];

// Type Categories
export type LogisticsWarehouseTypeCategory =
  (typeof LOGISTICS_WAREHOUSE_TYPE.CATEGORIES)[keyof typeof LOGISTICS_WAREHOUSE_TYPE.CATEGORIES];

// Type Icons
export type LogisticsWarehouseTypeIcon =
  (typeof LOGISTICS_WAREHOUSE_TYPE.ICONS)[keyof typeof LOGISTICS_WAREHOUSE_TYPE.ICONS];

// Type Colors
export type LogisticsWarehouseTypeColor =
  (typeof LOGISTICS_WAREHOUSE_TYPE.COLORS)[keyof typeof LOGISTICS_WAREHOUSE_TYPE.COLORS];

// Utility Functions
export function logisticsWarehouseTypeGetLabel(type: LogisticsWarehouseTypeType): string {
  const labels: Record<LogisticsWarehouseTypeType, string> = {
    [LOGISTICS_WAREHOUSE_TYPE.TYPES.CENTRAL]: 'Central Warehouse',
    [LOGISTICS_WAREHOUSE_TYPE.TYPES.REGIONAL]: 'Regional Warehouse',
    [LOGISTICS_WAREHOUSE_TYPE.TYPES.LOCAL]: 'Local Warehouse',
    [LOGISTICS_WAREHOUSE_TYPE.TYPES.FULFILLMENT]: 'Fulfillment Center',
    [LOGISTICS_WAREHOUSE_TYPE.TYPES.DISTRIBUTION]: 'Distribution Center',
    [LOGISTICS_WAREHOUSE_TYPE.TYPES.STORAGE]: 'Storage Facility',
    [LOGISTICS_WAREHOUSE_TYPE.TYPES.CROSS_DOCK]: 'Cross Dock',
  };
  return labels[type] || 'Unknown';
}

export function logisticsWarehouseTypeGetCategory(
  type: LogisticsWarehouseTypeType
): LogisticsWarehouseTypeCategory {
  const categories: Record<LogisticsWarehouseTypeType, LogisticsWarehouseTypeCategory> = {
    [LOGISTICS_WAREHOUSE_TYPE.TYPES.CENTRAL]: LOGISTICS_WAREHOUSE_TYPE.CATEGORIES.MAIN,
    [LOGISTICS_WAREHOUSE_TYPE.TYPES.REGIONAL]: LOGISTICS_WAREHOUSE_TYPE.CATEGORIES.REGIONAL,
    [LOGISTICS_WAREHOUSE_TYPE.TYPES.LOCAL]: LOGISTICS_WAREHOUSE_TYPE.CATEGORIES.REGIONAL,
    [LOGISTICS_WAREHOUSE_TYPE.TYPES.FULFILLMENT]: LOGISTICS_WAREHOUSE_TYPE.CATEGORIES.SPECIALIZED,
    [LOGISTICS_WAREHOUSE_TYPE.TYPES.DISTRIBUTION]: LOGISTICS_WAREHOUSE_TYPE.CATEGORIES.SPECIALIZED,
    [LOGISTICS_WAREHOUSE_TYPE.TYPES.STORAGE]: LOGISTICS_WAREHOUSE_TYPE.CATEGORIES.SPECIALIZED,
    [LOGISTICS_WAREHOUSE_TYPE.TYPES.CROSS_DOCK]: LOGISTICS_WAREHOUSE_TYPE.CATEGORIES.SPECIALIZED,
  };
  return categories[type] || LOGISTICS_WAREHOUSE_TYPE.CATEGORIES.REGIONAL;
}

export function logisticsWarehouseTypeGetIcon(
  type: LogisticsWarehouseTypeType
): LogisticsWarehouseTypeIcon {
  const icons: Record<LogisticsWarehouseTypeType, LogisticsWarehouseTypeIcon> = {
    [LOGISTICS_WAREHOUSE_TYPE.TYPES.CENTRAL]: LOGISTICS_WAREHOUSE_TYPE.ICONS.CENTRAL,
    [LOGISTICS_WAREHOUSE_TYPE.TYPES.REGIONAL]: LOGISTICS_WAREHOUSE_TYPE.ICONS.REGIONAL,
    [LOGISTICS_WAREHOUSE_TYPE.TYPES.LOCAL]: LOGISTICS_WAREHOUSE_TYPE.ICONS.LOCAL,
    [LOGISTICS_WAREHOUSE_TYPE.TYPES.FULFILLMENT]: LOGISTICS_WAREHOUSE_TYPE.ICONS.FULFILLMENT,
    [LOGISTICS_WAREHOUSE_TYPE.TYPES.DISTRIBUTION]: LOGISTICS_WAREHOUSE_TYPE.ICONS.DISTRIBUTION,
    [LOGISTICS_WAREHOUSE_TYPE.TYPES.STORAGE]: LOGISTICS_WAREHOUSE_TYPE.ICONS.STORAGE,
    [LOGISTICS_WAREHOUSE_TYPE.TYPES.CROSS_DOCK]: LOGISTICS_WAREHOUSE_TYPE.ICONS.CROSS_DOCK,
  };
  return icons[type] || '🏢';
}

export function logisticsWarehouseTypeGetColor(
  type: LogisticsWarehouseTypeType
): LogisticsWarehouseTypeColor {
  const colors: Record<LogisticsWarehouseTypeType, LogisticsWarehouseTypeColor> = {
    [LOGISTICS_WAREHOUSE_TYPE.TYPES.CENTRAL]: LOGISTICS_WAREHOUSE_TYPE.COLORS.CENTRAL,
    [LOGISTICS_WAREHOUSE_TYPE.TYPES.REGIONAL]: LOGISTICS_WAREHOUSE_TYPE.COLORS.REGIONAL,
    [LOGISTICS_WAREHOUSE_TYPE.TYPES.LOCAL]: LOGISTICS_WAREHOUSE_TYPE.COLORS.LOCAL,
    [LOGISTICS_WAREHOUSE_TYPE.TYPES.FULFILLMENT]: LOGISTICS_WAREHOUSE_TYPE.COLORS.FULFILLMENT,
    [LOGISTICS_WAREHOUSE_TYPE.TYPES.DISTRIBUTION]: LOGISTICS_WAREHOUSE_TYPE.COLORS.DISTRIBUTION,
    [LOGISTICS_WAREHOUSE_TYPE.TYPES.STORAGE]: LOGISTICS_WAREHOUSE_TYPE.COLORS.STORAGE,
    [LOGISTICS_WAREHOUSE_TYPE.TYPES.CROSS_DOCK]: LOGISTICS_WAREHOUSE_TYPE.COLORS.CROSS_DOCK,
  };
  return colors[type] || '#blue-500';
}

export function logisticsWarehouseTypeGetCapacityMultiplier(
  type: LogisticsWarehouseTypeType
): number {
  const multipliers: Record<LogisticsWarehouseTypeType, number> = {
    [LOGISTICS_WAREHOUSE_TYPE.TYPES.CENTRAL]: LOGISTICS_WAREHOUSE_TYPE.CAPACITY_MULTIPLIER.CENTRAL,
    [LOGISTICS_WAREHOUSE_TYPE.TYPES.REGIONAL]:
      LOGISTICS_WAREHOUSE_TYPE.CAPACITY_MULTIPLIER.REGIONAL,
    [LOGISTICS_WAREHOUSE_TYPE.TYPES.LOCAL]: LOGISTICS_WAREHOUSE_TYPE.CAPACITY_MULTIPLIER.LOCAL,
    [LOGISTICS_WAREHOUSE_TYPE.TYPES.FULFILLMENT]:
      LOGISTICS_WAREHOUSE_TYPE.CAPACITY_MULTIPLIER.FULFILLMENT,
    [LOGISTICS_WAREHOUSE_TYPE.TYPES.DISTRIBUTION]:
      LOGISTICS_WAREHOUSE_TYPE.CAPACITY_MULTIPLIER.DISTRIBUTION,
    [LOGISTICS_WAREHOUSE_TYPE.TYPES.STORAGE]: LOGISTICS_WAREHOUSE_TYPE.CAPACITY_MULTIPLIER.STORAGE,
    [LOGISTICS_WAREHOUSE_TYPE.TYPES.CROSS_DOCK]:
      LOGISTICS_WAREHOUSE_TYPE.CAPACITY_MULTIPLIER.CROSS_DOCK,
  };
  return multipliers[type] || 0.5;
}

export function logisticsWarehouseTypeGetServices(type: LogisticsWarehouseTypeType): string[] {
  const services: Record<LogisticsWarehouseTypeType, string[]> = {
    [LOGISTICS_WAREHOUSE_TYPE.TYPES.CENTRAL]: SERVICES.CENTRAL,
    [LOGISTICS_WAREHOUSE_TYPE.TYPES.REGIONAL]: SERVICES.REGIONAL,
    [LOGISTICS_WAREHOUSE_TYPE.TYPES.LOCAL]: SERVICES.LOCAL,
    [LOGISTICS_WAREHOUSE_TYPE.TYPES.FULFILLMENT]: SERVICES.FULFILLMENT,
    [LOGISTICS_WAREHOUSE_TYPE.TYPES.DISTRIBUTION]: SERVICES.DISTRIBUTION,
    [LOGISTICS_WAREHOUSE_TYPE.TYPES.STORAGE]: SERVICES.STORAGE,
    [LOGISTICS_WAREHOUSE_TYPE.TYPES.CROSS_DOCK]: SERVICES.CROSS_DOCK,
  };
  return services[type] || ['Storage'];
}
