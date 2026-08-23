/**
 * Inventory Constants
 * Inventory configuration and settings
 */

export const PRODUCTINVENTORY = {
  // Inventory Types
  TYPES: {
    PHYSICAL: 'physical',
    DIGITAL: 'digital',
    SERVICE: 'service',
    VIRTUAL: 'virtual',
  } as const,

  // Inventory Statuses
  STATUSES: {
    IN_STOCK: 'in_stock',
    OUT_OF_STOCK: 'out_of_stock',
    LOW_STOCK: 'low_stock',
    PRE_ORDER: 'pre_order',
    BACK_ORDER: 'back_order',
    DISCONTINUED: 'discontinued',
    COMING_SOON: 'coming_soon',
  } as const,

  // Inventory Tracking
  TRACKING: {
    NONE: 'none',
    BASIC: 'basic',
    ADVANCED: 'advanced',
    REAL_TIME: 'real_time',
  } as const,

  // Inventory Defaults
  DEFAULTS: {
    DEFAULT_TYPE: 'physical',
    DEFAULT_STATUS: 'in_stock',
    DEFAULT_TRACKING: 'basic',
    DEFAULT_QUANTITY: 0,
    DEFAULT_MIN_QUANTITY: 0,
    DEFAULT_MAX_QUANTITY: 1000,
    DEFAULT_REORDER_POINT: 10,
    DEFAULT_REORDER_QUANTITY: 50,
    DEFAULT_LOW_STOCK_THRESHOLD: 5,
    DEFAULT_BACK_ORDER_ALLOWED: false,
    DEFAULT_PRE_ORDER_ALLOWED: false,
  } as const,

  // Inventory Limits
  LIMITS: {
    MIN_QUANTITY: 0,
    MAX_QUANTITY: 1000000,
    MIN_REORDER_POINT: 0,
    MAX_REORDER_POINT: 100000,
    MIN_REORDER_QUANTITY: 1,
    MAX_REORDER_QUANTITY: 10000,
    MIN_LOW_STOCK_THRESHOLD: 0,
    MAX_LOW_STOCK_THRESHOLD: 100,
  } as const,
} as const;

// Inventory Types
export type ProductInventoryType =
  (typeof PRODUCTINVENTORY.TYPES)[keyof typeof PRODUCTINVENTORY.TYPES];

// Inventory Statuses
export type ProductInventoryStatus =
  (typeof PRODUCTINVENTORY.STATUSES)[keyof typeof PRODUCTINVENTORY.STATUSES];

// Inventory Tracking
export type ProductInventoryTracking =
  (typeof PRODUCTINVENTORY.TRACKING)[keyof typeof PRODUCTINVENTORY.TRACKING];

// Inventory Defaults
export type ProductInventoryDefault =
  (typeof PRODUCTINVENTORY.DEFAULTS)[keyof typeof PRODUCTINVENTORY.DEFAULTS];

// Inventory Limits
export type ProductInventoryLimit =
  (typeof PRODUCTINVENTORY.LIMITS)[keyof typeof PRODUCTINVENTORY.LIMITS];

// Utility Functions
export function productinventoryGetTypeLabel(type: ProductInventoryType): string {
  const labels: Record<ProductInventoryType, string> = {
    [PRODUCTINVENTORY.TYPES.PHYSICAL]: 'Physical',
    [PRODUCTINVENTORY.TYPES.DIGITAL]: 'Digital',
    [PRODUCTINVENTORY.TYPES.SERVICE]: 'Service',
    [PRODUCTINVENTORY.TYPES.VIRTUAL]: 'Virtual',
  };
  return labels[type] || 'Unknown Inventory Type';
}

export function productinventoryGetStatusLabel(status: ProductInventoryStatus): string {
  const labels: Record<ProductInventoryStatus, string> = {
    [PRODUCTINVENTORY.STATUSES.IN_STOCK]: 'In Stock',
    [PRODUCTINVENTORY.STATUSES.OUT_OF_STOCK]: 'Out of Stock',
    [PRODUCTINVENTORY.STATUSES.LOW_STOCK]: 'Low Stock',
    [PRODUCTINVENTORY.STATUSES.PRE_ORDER]: 'Pre-Order',
    [PRODUCTINVENTORY.STATUSES.BACK_ORDER]: 'Back Order',
    [PRODUCTINVENTORY.STATUSES.DISCONTINUED]: 'Discontinued',
    [PRODUCTINVENTORY.STATUSES.COMING_SOON]: 'Coming Soon',
  };
  return labels[status] || 'Unknown Status';
}

export function productinventoryGetTrackingLabel(tracking: ProductInventoryTracking): string {
  const labels: Record<ProductInventoryTracking, string> = {
    [PRODUCTINVENTORY.TRACKING.NONE]: 'None',
    [PRODUCTINVENTORY.TRACKING.BASIC]: 'Basic',
    [PRODUCTINVENTORY.TRACKING.ADVANCED]: 'Advanced',
    [PRODUCTINVENTORY.TRACKING.REAL_TIME]: 'Real-Time',
  };
  return labels[tracking] || 'Unknown Tracking Type';
}

export function productinventoryIsInStock(status: ProductInventoryStatus): boolean {
  const inStockStatuses: ProductInventoryStatus[] = [
    PRODUCTINVENTORY.STATUSES.IN_STOCK,
    PRODUCTINVENTORY.STATUSES.PRE_ORDER,
    PRODUCTINVENTORY.STATUSES.BACK_ORDER,
  ];
  return inStockStatuses.includes(status);
}

export function productinventoryIsLowStock(status: ProductInventoryStatus): boolean {
  return status === PRODUCTINVENTORY.STATUSES.LOW_STOCK;
}

export function productinventoryIsOutOfStock(status: ProductInventoryStatus): boolean {
  const outOfStockStatuses: ProductInventoryStatus[] = [
    PRODUCTINVENTORY.STATUSES.OUT_OF_STOCK,
    PRODUCTINVENTORY.STATUSES.DISCONTINUED,
  ];
  return outOfStockStatuses.includes(status);
}

export function productinventoryGetDefaultQuantity(): number {
  return PRODUCTINVENTORY.DEFAULTS.DEFAULT_QUANTITY;
}

export function productinventoryGetDefaultReorderPoint(): number {
  return PRODUCTINVENTORY.DEFAULTS.DEFAULT_REORDER_POINT;
}

export function productinventoryGetDefaultLowStockThreshold(): number {
  return PRODUCTINVENTORY.DEFAULTS.DEFAULT_LOW_STOCK_THRESHOLD;
}
