/**
 * Flash Sale Inventory Constants
 * Configuration for flash sale inventory management
 */

export const FLASH_SALE_INVENTORY = {
  // Inventory Types
  TYPES: {
    STANDARD: 'standard',
    LIMITED: 'limited',
    PRE_ORDER: 'pre_order',
    BACKORDER: 'backorder',
    DROPSHIP: 'dropship',
    PHYSICAL: 'physical',
    DIGITAL: 'digital',
    SERVICE: 'service',
    BUNDLE: 'bundle',
    VARIANT: 'variant',
  },

  // Inventory Categories
  CATEGORIES: {
    IN_STOCK: 'in_stock',
    OUT_OF_STOCK: 'out_of_stock',
    PRE_ORDER: 'pre_order',
    BACKORDER: 'backorder',
    DISCONTINUED: 'discontinued',
    COMING_SOON: 'coming_soon',
    SEASONAL: 'seasonal',
    CLEARANCE: 'clearance',
  },

  // Inventory Statuses
  STATUSES: {
    AVAILABLE: 'available',
    RESERVED: 'reserved',
    SOLD: 'sold',
    RETURNED: 'returned',
    DAMAGED: 'damaged',
    LOST: 'lost',
    PENDING: 'pending',
    PROCESSING: 'processing',
    SHIPPED: 'shipped',
    DELIVERED: 'delivered',
    CANCELLED: 'cancelled',
    HOLD: 'hold',
  },

  // Inventory Allocation
  ALLOCATION: {
    AUTO: 'auto',
    MANUAL: 'manual',
    DYNAMIC: 'dynamic',
    RESERVED: 'reserved',
    BUFFER: 'buffer',
    SAFETY_STOCK: 'safety_stock',
  },

  // Inventory Tracking
  TRACKING: {
    BATCH: 'batch',
    SERIAL: 'serial',
    LOT: 'lot',
    SKU: 'sku',
    BARCODE: 'barcode',
    QR_CODE: 'qr_code',
    RFID: 'rfid',
  },

  // Inventory Units
  UNITS: {
    PIECE: 'piece',
    KILOGRAM: 'kg',
    GRAM: 'g',
    LITER: 'l',
    MILLILITER: 'ml',
    METER: 'm',
    CENTIMETER: 'cm',
    SQUARE_METER: 'sqm',
    CUBIC_METER: 'cbm',
    DOZEN: 'dozen',
    GROSS: 'gross',
    PACK: 'pack',
    BOX: 'box',
    CARTON: 'carton',
    PALLET: 'pallet',
  },

  // Inventory Defaults
  DEFAULTS: {
    MAX_QUANTITY: 1000,
    MIN_QUANTITY: 0,
    REORDER_LEVEL: 10,
    REORDER_QUANTITY: 50,
    SAFETY_STOCK: 5,
    BUFFER_PERCENTAGE: 10,
    RESERVATION_TIMEOUT_MINUTES: 15,
    MAX_RESERVATIONS: 5,
  },

  // Inventory Limits
  LIMITS: {
    MAX_QUANTITY: 100000,
    MAX_RESERVATIONS: 1000,
    MAX_BATCH_SIZE: 10000,
    MAX_SERIAL_NUMBERS: 1000,
    MAX_LOT_NUMBERS: 100,
    MAX_BARCODES: 10000,
  },

  // Inventory Validation
  VALIDATION: {
    MIN_QUANTITY: 0,
    MAX_QUANTITY: 100000,
    MIN_RESERVATION: 1,
    MAX_RESERVATION: 1000,
    MIN_REORDER_LEVEL: 0,
    MAX_REORDER_LEVEL: 10000,
  },
} as const;

// Inventory Types
export type FlashSaleInventoryType =
  (typeof FLASH_SALE_INVENTORY.TYPES)[keyof typeof FLASH_SALE_INVENTORY.TYPES];

// Inventory Categories
export type FlashSaleInventoryCategory =
  (typeof FLASH_SALE_INVENTORY.CATEGORIES)[keyof typeof FLASH_SALE_INVENTORY.CATEGORIES];

// Inventory Statuses
export type FlashSaleInventoryStatus =
  (typeof FLASH_SALE_INVENTORY.STATUSES)[keyof typeof FLASH_SALE_INVENTORY.STATUSES];

// Inventory Allocation
export type FlashSaleInventoryAllocation =
  (typeof FLASH_SALE_INVENTORY.ALLOCATION)[keyof typeof FLASH_SALE_INVENTORY.ALLOCATION];

// Inventory Tracking
export type FlashSaleInventoryTracking =
  (typeof FLASH_SALE_INVENTORY.TRACKING)[keyof typeof FLASH_SALE_INVENTORY.TRACKING];

// Inventory Units
export type FlashSaleInventoryUnit =
  (typeof FLASH_SALE_INVENTORY.UNITS)[keyof typeof FLASH_SALE_INVENTORY.UNITS];

// Utility Functions
export function flashsalesInventoryGetTypeLabel(type: FlashSaleInventoryType): string {
  const labels: Record<FlashSaleInventoryType, string> = {
    [FLASH_SALE_INVENTORY.TYPES.STANDARD]: 'Standard Inventory',
    [FLASH_SALE_INVENTORY.TYPES.LIMITED]: 'Limited Inventory',
    [FLASH_SALE_INVENTORY.TYPES.PRE_ORDER]: 'Pre-Order Inventory',
    [FLASH_SALE_INVENTORY.TYPES.BACKORDER]: 'Backorder Inventory',
    [FLASH_SALE_INVENTORY.TYPES.DROPSHIP]: 'Dropship Inventory',
    [FLASH_SALE_INVENTORY.TYPES.PHYSICAL]: 'Physical Inventory',
    [FLASH_SALE_INVENTORY.TYPES.DIGITAL]: 'Digital Inventory',
    [FLASH_SALE_INVENTORY.TYPES.SERVICE]: 'Service Inventory',
    [FLASH_SALE_INVENTORY.TYPES.BUNDLE]: 'Bundle Inventory',
    [FLASH_SALE_INVENTORY.TYPES.VARIANT]: 'Variant Inventory',
  };
  return labels[type] || 'Unknown Inventory Type';
}

export function flashsalesInventoryGetCategoryLabel(category: FlashSaleInventoryCategory): string {
  const labels: Record<FlashSaleInventoryCategory, string> = {
    [FLASH_SALE_INVENTORY.CATEGORIES.IN_STOCK]: 'In Stock',
    [FLASH_SALE_INVENTORY.CATEGORIES.OUT_OF_STOCK]: 'Out of Stock',
    [FLASH_SALE_INVENTORY.CATEGORIES.PRE_ORDER]: 'Pre-Order',
    [FLASH_SALE_INVENTORY.CATEGORIES.BACKORDER]: 'Backorder',
    [FLASH_SALE_INVENTORY.CATEGORIES.DISCONTINUED]: 'Discontinued',
    [FLASH_SALE_INVENTORY.CATEGORIES.COMING_SOON]: 'Coming Soon',
    [FLASH_SALE_INVENTORY.CATEGORIES.SEASONAL]: 'Seasonal',
    [FLASH_SALE_INVENTORY.CATEGORIES.CLEARANCE]: 'Clearance',
  };
  return labels[category] || 'Unknown Category';
}

export function flashsalesInventoryGetStatusLabel(status: FlashSaleInventoryStatus): string {
  const labels: Record<FlashSaleInventoryStatus, string> = {
    [FLASH_SALE_INVENTORY.STATUSES.AVAILABLE]: 'Available',
    [FLASH_SALE_INVENTORY.STATUSES.RESERVED]: 'Reserved',
    [FLASH_SALE_INVENTORY.STATUSES.SOLD]: 'Sold',
    [FLASH_SALE_INVENTORY.STATUSES.RETURNED]: 'Returned',
    [FLASH_SALE_INVENTORY.STATUSES.DAMAGED]: 'Damaged',
    [FLASH_SALE_INVENTORY.STATUSES.LOST]: 'Lost',
    [FLASH_SALE_INVENTORY.STATUSES.PENDING]: 'Pending',
    [FLASH_SALE_INVENTORY.STATUSES.PROCESSING]: 'Processing',
    [FLASH_SALE_INVENTORY.STATUSES.SHIPPED]: 'Shipped',
    [FLASH_SALE_INVENTORY.STATUSES.DELIVERED]: 'Delivered',
    [FLASH_SALE_INVENTORY.STATUSES.CANCELLED]: 'Cancelled',
    [FLASH_SALE_INVENTORY.STATUSES.HOLD]: 'On Hold',
  };
  return labels[status] || 'Unknown Status';
}

export function flashsalesInventoryGetAllocationLabel(
  allocation: FlashSaleInventoryAllocation
): string {
  const labels: Record<FlashSaleInventoryAllocation, string> = {
    [FLASH_SALE_INVENTORY.ALLOCATION.AUTO]: 'Automatic Allocation',
    [FLASH_SALE_INVENTORY.ALLOCATION.MANUAL]: 'Manual Allocation',
    [FLASH_SALE_INVENTORY.ALLOCATION.DYNAMIC]: 'Dynamic Allocation',
    [FLASH_SALE_INVENTORY.ALLOCATION.RESERVED]: 'Reserved Allocation',
    [FLASH_SALE_INVENTORY.ALLOCATION.BUFFER]: 'Buffer Stock',
    [FLASH_SALE_INVENTORY.ALLOCATION.SAFETY_STOCK]: 'Safety Stock',
  };
  return labels[allocation] || 'Unknown Allocation';
}

export function flashsalesInventoryGetTrackingLabel(tracking: FlashSaleInventoryTracking): string {
  const labels: Record<FlashSaleInventoryTracking, string> = {
    [FLASH_SALE_INVENTORY.TRACKING.BATCH]: 'Batch Tracking',
    [FLASH_SALE_INVENTORY.TRACKING.SERIAL]: 'Serial Number Tracking',
    [FLASH_SALE_INVENTORY.TRACKING.LOT]: 'Lot Tracking',
    [FLASH_SALE_INVENTORY.TRACKING.SKU]: 'SKU Tracking',
    [FLASH_SALE_INVENTORY.TRACKING.BARCODE]: 'Barcode Tracking',
    [FLASH_SALE_INVENTORY.TRACKING.QR_CODE]: 'QR Code Tracking',
    [FLASH_SALE_INVENTORY.TRACKING.RFID]: 'RFID Tracking',
  };
  return labels[tracking] || 'Unknown Tracking';
}

export function flashsalesInventoryGetUnitLabel(unit: FlashSaleInventoryUnit): string {
  const labels: Record<FlashSaleInventoryUnit, string> = {
    [FLASH_SALE_INVENTORY.UNITS.PIECE]: 'Piece',
    [FLASH_SALE_INVENTORY.UNITS.KILOGRAM]: 'Kilogram',
    [FLASH_SALE_INVENTORY.UNITS.GRAM]: 'Gram',
    [FLASH_SALE_INVENTORY.UNITS.LITER]: 'Liter',
    [FLASH_SALE_INVENTORY.UNITS.MILLILITER]: 'Milliliter',
    [FLASH_SALE_INVENTORY.UNITS.METER]: 'Meter',
    [FLASH_SALE_INVENTORY.UNITS.CENTIMETER]: 'Centimeter',
    [FLASH_SALE_INVENTORY.UNITS.SQUARE_METER]: 'Square Meter',
    [FLASH_SALE_INVENTORY.UNITS.CUBIC_METER]: 'Cubic Meter',
    [FLASH_SALE_INVENTORY.UNITS.DOZEN]: 'Dozen',
    [FLASH_SALE_INVENTORY.UNITS.GROSS]: 'Gross',
    [FLASH_SALE_INVENTORY.UNITS.PACK]: 'Pack',
    [FLASH_SALE_INVENTORY.UNITS.BOX]: 'Box',
    [FLASH_SALE_INVENTORY.UNITS.CARTON]: 'Carton',
    [FLASH_SALE_INVENTORY.UNITS.PALLET]: 'Pallet',
  };
  return labels[unit] || 'Unknown Unit';
}

export function flashsalesInventoryIsValidType(type: string): type is FlashSaleInventoryType {
  return Object.values(FLASH_SALE_INVENTORY.TYPES).includes(type as FlashSaleInventoryType);
}

export function flashsalesInventoryIsValidCategory(
  category: string
): category is FlashSaleInventoryCategory {
  return Object.values(FLASH_SALE_INVENTORY.CATEGORIES).includes(
    category as FlashSaleInventoryCategory
  );
}

export function flashsalesInventoryIsValidStatus(
  status: string
): status is FlashSaleInventoryStatus {
  return Object.values(FLASH_SALE_INVENTORY.STATUSES).includes(status as FlashSaleInventoryStatus);
}

export function flashsalesInventoryIsAvailable(status: FlashSaleInventoryStatus): boolean {
  const availableStatuses: FlashSaleInventoryStatus[] = [
    FLASH_SALE_INVENTORY.STATUSES.AVAILABLE,
    FLASH_SALE_INVENTORY.STATUSES.PENDING,
  ];
  return availableStatuses.includes(status);
}

export function flashsalesInventoryIsSold(status: FlashSaleInventoryStatus): boolean {
  const soldStatuses: FlashSaleInventoryStatus[] = [
    FLASH_SALE_INVENTORY.STATUSES.SOLD,
    FLASH_SALE_INVENTORY.STATUSES.SHIPPED,
    FLASH_SALE_INVENTORY.STATUSES.DELIVERED,
  ];
  return soldStatuses.includes(status);
}

export function flashsalesInventoryIsReserved(status: FlashSaleInventoryStatus): boolean {
  const reservedStatuses: FlashSaleInventoryStatus[] = [
    FLASH_SALE_INVENTORY.STATUSES.RESERVED,
    FLASH_SALE_INVENTORY.STATUSES.PROCESSING,
    FLASH_SALE_INVENTORY.STATUSES.HOLD,
  ];
  return reservedStatuses.includes(status);
}

export function flashsalesInventoryIsDamaged(status: FlashSaleInventoryStatus): boolean {
  const damagedStatuses: FlashSaleInventoryStatus[] = [
    FLASH_SALE_INVENTORY.STATUSES.DAMAGED,
    FLASH_SALE_INVENTORY.STATUSES.LOST,
  ];
  return damagedStatuses.includes(status);
}

export function flashsalesInventoryGetDefaultMaxQuantity(): number {
  return FLASH_SALE_INVENTORY.DEFAULTS.MAX_QUANTITY;
}

export function flashsalesInventoryGetDefaultReorderLevel(): number {
  return FLASH_SALE_INVENTORY.DEFAULTS.REORDER_LEVEL;
}

export function flashsalesInventoryGetDefaultSafetyStock(): number {
  return FLASH_SALE_INVENTORY.DEFAULTS.SAFETY_STOCK;
}

export function flashsalesInventoryGetMaxQuantity(): number {
  return FLASH_SALE_INVENTORY.LIMITS.MAX_QUANTITY;
}

export function flashsalesInventoryGetMaxReservations(): number {
  return FLASH_SALE_INVENTORY.LIMITS.MAX_RESERVATIONS;
}

export function flashsalesInventoryGetReservationTimeoutMinutes(): number {
  return FLASH_SALE_INVENTORY.DEFAULTS.RESERVATION_TIMEOUT_MINUTES;
}

export function flashsalesInventoryGetBufferPercentage(): number {
  return FLASH_SALE_INVENTORY.DEFAULTS.BUFFER_PERCENTAGE;
}
