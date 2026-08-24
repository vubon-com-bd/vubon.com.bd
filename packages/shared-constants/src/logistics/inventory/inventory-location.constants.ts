/**
 * Inventory Location Constants
 * Configuration for inventory locations - Bangladesh based
 */

export const LOGISTICS_INVENTORY_LOCATION = {
  // Location Types
  TYPES: {
    WAREHOUSE: 'warehouse',
    STORE: 'store',
    DISTRIBUTION: 'distribution',
    FULFILLMENT: 'fulfillment',
    PICKUP: 'pickup',
    DROP_OFF: 'drop_off',
    RETURN: 'return',
    DAMAGED: 'damaged',
    HOLD: 'hold',
  } as const,

  // Location Statuses
  STATUS: {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    FULL: 'full',
    MAINTENANCE: 'maintenance',
    CLOSED: 'closed',
  } as const,

  // Location Zones (Bangladesh)
  ZONES: {
    DHAKA: 'dhaka',
    CHITTAGONG: 'chittagong',
    SYLHET: 'sylhet',
    RAJSHAHI: 'rajshahi',
    KHULNA: 'khulna',
    BARISHAL: 'barishal',
    RANGPUR: 'rangpur',
    MYMENSINGH: 'mymensingh',
  } as const,

  // Zone Labels
  ZONE_LABELS: {
    DHAKA: 'Dhaka',
    CHITTAGONG: 'Chittagong',
    SYLHET: 'Sylhet',
    RAJSHAHI: 'Rajshahi',
    KHULNA: 'Khulna',
    BARISHAL: 'Barishal',
    RANGPUR: 'Rangpur',
    MYMENSINGH: 'Mymensingh',
  } as const,

  // Storage Types
  STORAGE_TYPES: {
    RACK: 'rack',
    SHELF: 'shelf',
    PALLET: 'pallet',
    BULK: 'bulk',
    COLD: 'cold',
    HAZARDOUS: 'hazardous',
    FRAGILE: 'fragile',
    RETURNS: 'returns',
  } as const,

  // Location Capacities (in sq ft)
  CAPACITIES: {
    WAREHOUSE: 50000,
    DISTRIBUTION: 25000,
    FULFILLMENT: 20000,
    STORE: 10000,
    PICKUP: 5000,
    DROP_OFF: 5000,
    RETURN: 3000,
    DAMAGED: 2000,
    HOLD: 2000,
  } as const,

  // Location Limits
  LIMITS: {
    MAX_CAPACITY_SQFT: 100000,
    MIN_CAPACITY_SQFT: 500,
    MAX_ITEMS: 100000,
    MAX_BINS: 10000,
    MAX_SHELVES: 5000,
  } as const,
} as const;

// Location Types
export type LogisticsInventoryLocationType =
  (typeof LOGISTICS_INVENTORY_LOCATION.TYPES)[keyof typeof LOGISTICS_INVENTORY_LOCATION.TYPES];

// Location Statuses
export type LogisticsInventoryLocationStatus =
  (typeof LOGISTICS_INVENTORY_LOCATION.STATUS)[keyof typeof LOGISTICS_INVENTORY_LOCATION.STATUS];

// Location Zones
export type LogisticsInventoryLocationZone =
  (typeof LOGISTICS_INVENTORY_LOCATION.ZONES)[keyof typeof LOGISTICS_INVENTORY_LOCATION.ZONES];

// Storage Types
export type LogisticsInventoryStorageType =
  (typeof LOGISTICS_INVENTORY_LOCATION.STORAGE_TYPES)[keyof typeof LOGISTICS_INVENTORY_LOCATION.STORAGE_TYPES];

// Utility Functions
export function logisticsInventoryLocationGetTypeLabel(
  type: LogisticsInventoryLocationType
): string {
  const labels: Record<LogisticsInventoryLocationType, string> = {
    [LOGISTICS_INVENTORY_LOCATION.TYPES.WAREHOUSE]: 'Warehouse',
    [LOGISTICS_INVENTORY_LOCATION.TYPES.STORE]: 'Store',
    [LOGISTICS_INVENTORY_LOCATION.TYPES.DISTRIBUTION]: 'Distribution Center',
    [LOGISTICS_INVENTORY_LOCATION.TYPES.FULFILLMENT]: 'Fulfillment Center',
    [LOGISTICS_INVENTORY_LOCATION.TYPES.PICKUP]: 'Pickup Point',
    [LOGISTICS_INVENTORY_LOCATION.TYPES.DROP_OFF]: 'Drop Off Point',
    [LOGISTICS_INVENTORY_LOCATION.TYPES.RETURN]: 'Return Location',
    [LOGISTICS_INVENTORY_LOCATION.TYPES.DAMAGED]: 'Damaged Goods',
    [LOGISTICS_INVENTORY_LOCATION.TYPES.HOLD]: 'Hold Location',
  };
  return labels[type] || 'Unknown';
}

export function logisticsInventoryLocationGetStatusLabel(
  status: LogisticsInventoryLocationStatus
): string {
  const labels: Record<LogisticsInventoryLocationStatus, string> = {
    [LOGISTICS_INVENTORY_LOCATION.STATUS.ACTIVE]: 'Active',
    [LOGISTICS_INVENTORY_LOCATION.STATUS.INACTIVE]: 'Inactive',
    [LOGISTICS_INVENTORY_LOCATION.STATUS.FULL]: 'Full Capacity',
    [LOGISTICS_INVENTORY_LOCATION.STATUS.MAINTENANCE]: 'Under Maintenance',
    [LOGISTICS_INVENTORY_LOCATION.STATUS.CLOSED]: 'Closed',
  };
  return labels[status] || 'Unknown';
}

export function logisticsInventoryLocationGetZoneLabel(
  zone: LogisticsInventoryLocationZone
): string {
  const labels: Record<LogisticsInventoryLocationZone, string> = {
    [LOGISTICS_INVENTORY_LOCATION.ZONES.DHAKA]: LOGISTICS_INVENTORY_LOCATION.ZONE_LABELS.DHAKA,
    [LOGISTICS_INVENTORY_LOCATION.ZONES.CHITTAGONG]:
      LOGISTICS_INVENTORY_LOCATION.ZONE_LABELS.CHITTAGONG,
    [LOGISTICS_INVENTORY_LOCATION.ZONES.SYLHET]: LOGISTICS_INVENTORY_LOCATION.ZONE_LABELS.SYLHET,
    [LOGISTICS_INVENTORY_LOCATION.ZONES.RAJSHAHI]:
      LOGISTICS_INVENTORY_LOCATION.ZONE_LABELS.RAJSHAHI,
    [LOGISTICS_INVENTORY_LOCATION.ZONES.KHULNA]: LOGISTICS_INVENTORY_LOCATION.ZONE_LABELS.KHULNA,
    [LOGISTICS_INVENTORY_LOCATION.ZONES.BARISHAL]:
      LOGISTICS_INVENTORY_LOCATION.ZONE_LABELS.BARISHAL,
    [LOGISTICS_INVENTORY_LOCATION.ZONES.RANGPUR]: LOGISTICS_INVENTORY_LOCATION.ZONE_LABELS.RANGPUR,
    [LOGISTICS_INVENTORY_LOCATION.ZONES.MYMENSINGH]:
      LOGISTICS_INVENTORY_LOCATION.ZONE_LABELS.MYMENSINGH,
  };
  return labels[zone] || 'Unknown';
}

export function logisticsInventoryLocationGetCapacity(
  type: LogisticsInventoryLocationType
): number {
  const capacities: Record<LogisticsInventoryLocationType, number> = {
    [LOGISTICS_INVENTORY_LOCATION.TYPES.WAREHOUSE]:
      LOGISTICS_INVENTORY_LOCATION.CAPACITIES.WAREHOUSE,
    [LOGISTICS_INVENTORY_LOCATION.TYPES.STORE]: LOGISTICS_INVENTORY_LOCATION.CAPACITIES.STORE,
    [LOGISTICS_INVENTORY_LOCATION.TYPES.DISTRIBUTION]:
      LOGISTICS_INVENTORY_LOCATION.CAPACITIES.DISTRIBUTION,
    [LOGISTICS_INVENTORY_LOCATION.TYPES.FULFILLMENT]:
      LOGISTICS_INVENTORY_LOCATION.CAPACITIES.FULFILLMENT,
    [LOGISTICS_INVENTORY_LOCATION.TYPES.PICKUP]: LOGISTICS_INVENTORY_LOCATION.CAPACITIES.PICKUP,
    [LOGISTICS_INVENTORY_LOCATION.TYPES.DROP_OFF]: LOGISTICS_INVENTORY_LOCATION.CAPACITIES.DROP_OFF,
    [LOGISTICS_INVENTORY_LOCATION.TYPES.RETURN]: LOGISTICS_INVENTORY_LOCATION.CAPACITIES.RETURN,
    [LOGISTICS_INVENTORY_LOCATION.TYPES.DAMAGED]: LOGISTICS_INVENTORY_LOCATION.CAPACITIES.DAMAGED,
    [LOGISTICS_INVENTORY_LOCATION.TYPES.HOLD]: LOGISTICS_INVENTORY_LOCATION.CAPACITIES.HOLD,
  };
  return capacities[type] || LOGISTICS_INVENTORY_LOCATION.CAPACITIES.STORE;
}

export function logisticsInventoryLocationIsActive(
  status: LogisticsInventoryLocationStatus
): boolean {
  return status === LOGISTICS_INVENTORY_LOCATION.STATUS.ACTIVE;
}

export function logisticsInventoryLocationIsOperational(
  status: LogisticsInventoryLocationStatus
): boolean {
  const operationalStatuses: LogisticsInventoryLocationStatus[] = [
    LOGISTICS_INVENTORY_LOCATION.STATUS.ACTIVE,
    LOGISTICS_INVENTORY_LOCATION.STATUS.FULL,
  ];
  return operationalStatuses.includes(status);
}

export function logisticsInventoryLocationGetStorageTypeLabel(
  storageType: LogisticsInventoryStorageType
): string {
  const labels: Record<LogisticsInventoryStorageType, string> = {
    [LOGISTICS_INVENTORY_LOCATION.STORAGE_TYPES.RACK]: 'Rack Storage',
    [LOGISTICS_INVENTORY_LOCATION.STORAGE_TYPES.SHELF]: 'Shelf Storage',
    [LOGISTICS_INVENTORY_LOCATION.STORAGE_TYPES.PALLET]: 'Pallet Storage',
    [LOGISTICS_INVENTORY_LOCATION.STORAGE_TYPES.BULK]: 'Bulk Storage',
    [LOGISTICS_INVENTORY_LOCATION.STORAGE_TYPES.COLD]: 'Cold Storage',
    [LOGISTICS_INVENTORY_LOCATION.STORAGE_TYPES.HAZARDOUS]: 'Hazardous Storage',
    [LOGISTICS_INVENTORY_LOCATION.STORAGE_TYPES.FRAGILE]: 'Fragile Storage',
    [LOGISTICS_INVENTORY_LOCATION.STORAGE_TYPES.RETURNS]: 'Returns Storage',
  };
  return labels[storageType] || 'Unknown';
}
