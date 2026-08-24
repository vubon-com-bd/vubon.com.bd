/**
 * Warehouse Constants
 * Configuration for warehouses - Bangladesh based
 */

export const LOGISTICS_WAREHOUSE = {
  // Warehouse Types
  TYPES: {
    CENTRAL: 'central',
    REGIONAL: 'regional',
    LOCAL: 'local',
    FULFILLMENT: 'fulfillment',
    DISTRIBUTION: 'distribution',
    STORAGE: 'storage',
    CROSS_DOCK: 'cross_dock',
  } as const,

  // Warehouse Statuses
  STATUS: {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    MAINTENANCE: 'maintenance',
    FULL: 'full',
    CLOSED: 'closed',
  } as const,

  // Warehouse Locations (Bangladesh)
  LOCATIONS: {
    DHAKA: 'dhaka',
    CHITTAGONG: 'chittagong',
    SYLHET: 'sylhet',
    RAJSHAHI: 'rajshahi',
    KHULNA: 'khulna',
    BARISHAL: 'barishal',
    RANGPUR: 'rangpur',
    MYMENSINGH: 'mymensingh',
  } as const,

  // Location Labels
  LOCATION_LABELS: {
    DHAKA: 'Dhaka',
    CHITTAGONG: 'Chittagong',
    SYLHET: 'Sylhet',
    RAJSHAHI: 'Rajshahi',
    KHULNA: 'Khulna',
    BARISHAL: 'Barishal',
    RANGPUR: 'Rangpur',
    MYMENSINGH: 'Mymensingh',
  } as const,

  // Warehouse Capacities (in sq ft)
  CAPACITIES: {
    CENTRAL: 50000,
    REGIONAL: 20000,
    LOCAL: 10000,
    FULFILLMENT: 30000,
    DISTRIBUTION: 25000,
    STORAGE: 15000,
    CROSS_DOCK: 8000,
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
  } as const,

  // Warehouse Zones
  ZONES: {
    RECEIVING: 'receiving',
    STORAGE: 'storage',
    PICKING: 'picking',
    PACKING: 'packing',
    SHIPPING: 'shipping',
    RETURNS: 'returns',
    DAMAGED: 'damaged',
  } as const,

  // Zone Labels
  ZONE_LABELS: {
    RECEIVING: 'Receiving Area',
    STORAGE: 'Storage Area',
    PICKING: 'Picking Area',
    PACKING: 'Packing Area',
    SHIPPING: 'Shipping Area',
    RETURNS: 'Returns Area',
    DAMAGED: 'Damaged Goods',
  } as const,

  // Warehouse Limits
  LIMITS: {
    MAX_CAPACITY_SQFT: 100000,
    MIN_CAPACITY_SQFT: 1000,
    MAX_ITEMS: 1000000,
    MAX_PALLETS: 5000,
    MAX_DAILY_ORDERS: 10000,
  } as const,

  // Operating Hours
  OPERATING_HOURS: {
    START: 8, // 8 AM
    END: 20, // 8 PM
    WEEKEND_START: 9,
    WEEKEND_END: 17,
    HOLIDAY_START: 10,
    HOLIDAY_END: 16,
  } as const,
} as const;

// Warehouse Types
export type LogisticsWarehouseType =
  (typeof LOGISTICS_WAREHOUSE.TYPES)[keyof typeof LOGISTICS_WAREHOUSE.TYPES];

// Warehouse Statuses
export type LogisticsWarehouseStatus =
  (typeof LOGISTICS_WAREHOUSE.STATUS)[keyof typeof LOGISTICS_WAREHOUSE.STATUS];

// Warehouse Locations
export type LogisticsWarehouseLocation =
  (typeof LOGISTICS_WAREHOUSE.LOCATIONS)[keyof typeof LOGISTICS_WAREHOUSE.LOCATIONS];

// Storage Types
export type LogisticsWarehouseStorageType =
  (typeof LOGISTICS_WAREHOUSE.STORAGE_TYPES)[keyof typeof LOGISTICS_WAREHOUSE.STORAGE_TYPES];

// Warehouse Zones
export type LogisticsWarehouseZone =
  (typeof LOGISTICS_WAREHOUSE.ZONES)[keyof typeof LOGISTICS_WAREHOUSE.ZONES];

// Utility Functions
export function logisticsWarehouseGetTypeLabel(type: LogisticsWarehouseType): string {
  const labels: Record<LogisticsWarehouseType, string> = {
    [LOGISTICS_WAREHOUSE.TYPES.CENTRAL]: 'Central Warehouse',
    [LOGISTICS_WAREHOUSE.TYPES.REGIONAL]: 'Regional Warehouse',
    [LOGISTICS_WAREHOUSE.TYPES.LOCAL]: 'Local Warehouse',
    [LOGISTICS_WAREHOUSE.TYPES.FULFILLMENT]: 'Fulfillment Center',
    [LOGISTICS_WAREHOUSE.TYPES.DISTRIBUTION]: 'Distribution Center',
    [LOGISTICS_WAREHOUSE.TYPES.STORAGE]: 'Storage Facility',
    [LOGISTICS_WAREHOUSE.TYPES.CROSS_DOCK]: 'Cross Dock',
  };
  return labels[type] || 'Unknown';
}

export function logisticsWarehouseGetStatusLabel(status: LogisticsWarehouseStatus): string {
  const labels: Record<LogisticsWarehouseStatus, string> = {
    [LOGISTICS_WAREHOUSE.STATUS.ACTIVE]: 'Active',
    [LOGISTICS_WAREHOUSE.STATUS.INACTIVE]: 'Inactive',
    [LOGISTICS_WAREHOUSE.STATUS.MAINTENANCE]: 'Under Maintenance',
    [LOGISTICS_WAREHOUSE.STATUS.FULL]: 'Full Capacity',
    [LOGISTICS_WAREHOUSE.STATUS.CLOSED]: 'Closed',
  };
  return labels[status] || 'Unknown';
}

export function logisticsWarehouseGetLocationLabel(location: LogisticsWarehouseLocation): string {
  const labels: Record<LogisticsWarehouseLocation, string> = {
    [LOGISTICS_WAREHOUSE.LOCATIONS.DHAKA]: LOGISTICS_WAREHOUSE.LOCATION_LABELS.DHAKA,
    [LOGISTICS_WAREHOUSE.LOCATIONS.CHITTAGONG]: LOGISTICS_WAREHOUSE.LOCATION_LABELS.CHITTAGONG,
    [LOGISTICS_WAREHOUSE.LOCATIONS.SYLHET]: LOGISTICS_WAREHOUSE.LOCATION_LABELS.SYLHET,
    [LOGISTICS_WAREHOUSE.LOCATIONS.RAJSHAHI]: LOGISTICS_WAREHOUSE.LOCATION_LABELS.RAJSHAHI,
    [LOGISTICS_WAREHOUSE.LOCATIONS.KHULNA]: LOGISTICS_WAREHOUSE.LOCATION_LABELS.KHULNA,
    [LOGISTICS_WAREHOUSE.LOCATIONS.BARISHAL]: LOGISTICS_WAREHOUSE.LOCATION_LABELS.BARISHAL,
    [LOGISTICS_WAREHOUSE.LOCATIONS.RANGPUR]: LOGISTICS_WAREHOUSE.LOCATION_LABELS.RANGPUR,
    [LOGISTICS_WAREHOUSE.LOCATIONS.MYMENSINGH]: LOGISTICS_WAREHOUSE.LOCATION_LABELS.MYMENSINGH,
  };
  return labels[location] || 'Unknown';
}

export function logisticsWarehouseGetCapacity(type: LogisticsWarehouseType): number {
  const capacities: Record<LogisticsWarehouseType, number> = {
    [LOGISTICS_WAREHOUSE.TYPES.CENTRAL]: LOGISTICS_WAREHOUSE.CAPACITIES.CENTRAL,
    [LOGISTICS_WAREHOUSE.TYPES.REGIONAL]: LOGISTICS_WAREHOUSE.CAPACITIES.REGIONAL,
    [LOGISTICS_WAREHOUSE.TYPES.LOCAL]: LOGISTICS_WAREHOUSE.CAPACITIES.LOCAL,
    [LOGISTICS_WAREHOUSE.TYPES.FULFILLMENT]: LOGISTICS_WAREHOUSE.CAPACITIES.FULFILLMENT,
    [LOGISTICS_WAREHOUSE.TYPES.DISTRIBUTION]: LOGISTICS_WAREHOUSE.CAPACITIES.DISTRIBUTION,
    [LOGISTICS_WAREHOUSE.TYPES.STORAGE]: LOGISTICS_WAREHOUSE.CAPACITIES.STORAGE,
    [LOGISTICS_WAREHOUSE.TYPES.CROSS_DOCK]: LOGISTICS_WAREHOUSE.CAPACITIES.CROSS_DOCK,
  };
  return capacities[type] || LOGISTICS_WAREHOUSE.CAPACITIES.LOCAL;
}

export function logisticsWarehouseGetZoneLabel(zone: LogisticsWarehouseZone): string {
  const labels: Record<LogisticsWarehouseZone, string> = {
    [LOGISTICS_WAREHOUSE.ZONES.RECEIVING]: LOGISTICS_WAREHOUSE.ZONE_LABELS.RECEIVING,
    [LOGISTICS_WAREHOUSE.ZONES.STORAGE]: LOGISTICS_WAREHOUSE.ZONE_LABELS.STORAGE,
    [LOGISTICS_WAREHOUSE.ZONES.PICKING]: LOGISTICS_WAREHOUSE.ZONE_LABELS.PICKING,
    [LOGISTICS_WAREHOUSE.ZONES.PACKING]: LOGISTICS_WAREHOUSE.ZONE_LABELS.PACKING,
    [LOGISTICS_WAREHOUSE.ZONES.SHIPPING]: LOGISTICS_WAREHOUSE.ZONE_LABELS.SHIPPING,
    [LOGISTICS_WAREHOUSE.ZONES.RETURNS]: LOGISTICS_WAREHOUSE.ZONE_LABELS.RETURNS,
    [LOGISTICS_WAREHOUSE.ZONES.DAMAGED]: LOGISTICS_WAREHOUSE.ZONE_LABELS.DAMAGED,
  };
  return labels[zone] || 'Unknown';
}

export function logisticsWarehouseIsActive(status: LogisticsWarehouseStatus): boolean {
  return status === LOGISTICS_WAREHOUSE.STATUS.ACTIVE;
}

export function logisticsWarehouseIsOperational(status: LogisticsWarehouseStatus): boolean {
  const operationalStatuses: LogisticsWarehouseStatus[] = [
    LOGISTICS_WAREHOUSE.STATUS.ACTIVE,
    LOGISTICS_WAREHOUSE.STATUS.MAINTENANCE,
  ];
  return operationalStatuses.includes(status);
}

export function logisticsWarehouseGetStorageTypeLabel(
  storageType: LogisticsWarehouseStorageType
): string {
  const labels: Record<LogisticsWarehouseStorageType, string> = {
    [LOGISTICS_WAREHOUSE.STORAGE_TYPES.RACK]: 'Rack Storage',
    [LOGISTICS_WAREHOUSE.STORAGE_TYPES.SHELF]: 'Shelf Storage',
    [LOGISTICS_WAREHOUSE.STORAGE_TYPES.PALLET]: 'Pallet Storage',
    [LOGISTICS_WAREHOUSE.STORAGE_TYPES.BULK]: 'Bulk Storage',
    [LOGISTICS_WAREHOUSE.STORAGE_TYPES.COLD]: 'Cold Storage',
    [LOGISTICS_WAREHOUSE.STORAGE_TYPES.HAZARDOUS]: 'Hazardous Storage',
    [LOGISTICS_WAREHOUSE.STORAGE_TYPES.FRAGILE]: 'Fragile Storage',
  };
  return labels[storageType] || 'Unknown';
}

export function logisticsWarehouseIsWithinOperatingHours(date: Date): boolean {
  const hours = date.getHours();
  const day = date.getDay();
  const isWeekend = day === 0 || day === 6;
  const start = isWeekend
    ? LOGISTICS_WAREHOUSE.OPERATING_HOURS.WEEKEND_START
    : LOGISTICS_WAREHOUSE.OPERATING_HOURS.START;
  const end = isWeekend
    ? LOGISTICS_WAREHOUSE.OPERATING_HOURS.WEEKEND_END
    : LOGISTICS_WAREHOUSE.OPERATING_HOURS.END;
  return hours >= start && hours < end;
}
