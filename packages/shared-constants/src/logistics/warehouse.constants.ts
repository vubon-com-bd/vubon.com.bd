export const WAREHOUSE_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  MAINTENANCE: 'maintenance',
  FULL: 'full',
  CLOSED: 'closed',
  ARCHIVED: 'archived',
} as const;

export const WAREHOUSE_TYPE = {
  MAIN: 'main',
  REGIONAL: 'regional',
  LOCAL: 'local',
  FULFILLMENT_CENTER: 'fulfillment_center',
  CROSS_DOCK: 'cross_dock',
  COLD_STORAGE: 'cold_storage',
  DARK_STORE: 'dark_store',
} as const;

export const WAREHOUSE_ZONE = {
  RECEIVING: 'receiving',
  STORAGE: 'storage',
  PICKING: 'picking',
  PACKING: 'packing',
  SHIPPING: 'shipping',
  RETURNS: 'returns',
  QUARANTINE: 'quarantine',
  DISPATCH: 'dispatch',
} as const;

export const WAREHOUSE = {
  STATUS: WAREHOUSE_STATUS,
  TYPE: WAREHOUSE_TYPE,
  ZONE: WAREHOUSE_ZONE,
  MAX_CAPACITY_M3: 100000,
  MAX_WEIGHT_KG: 1000000,
  MAX_SKUS: 500000,
  LOW_CAPACITY_THRESHOLD_PERCENT: 80,
  FULL_CAPACITY_THRESHOLD_PERCENT: 95,
  OPERATING_HOURS_START: 6,
  OPERATING_HOURS_END: 22,
  TIMEZONE_DEFAULT: 'Asia/Dhaka',
  MAX_ACTIVE_WAREHOUSES: 100,
  REQUIRE_ADDRESS: true,
  REQUIRE_CONTACT: true,
} as const;

export type WarehouseStatusType = (typeof WAREHOUSE_STATUS)[keyof typeof WAREHOUSE_STATUS];
export type WarehouseTypeType = (typeof WAREHOUSE_TYPE)[keyof typeof WAREHOUSE_TYPE];
export type WarehouseZoneType = (typeof WAREHOUSE_ZONE)[keyof typeof WAREHOUSE_ZONE];
