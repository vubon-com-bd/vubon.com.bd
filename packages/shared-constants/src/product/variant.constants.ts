/**
 * Variant Constants
 * Variant configuration and settings
 */

export const PRODUCTVARIANT = {
  // Variant Types
  TYPES: {
    SIZE: 'size',
    COLOR: 'color',
    MATERIAL: 'material',
    STYLE: 'style',
    PACKAGE: 'package',
    CUSTOM: 'custom',
  } as const,

  // Variant Statuses
  STATUSES: {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    OUT_OF_STOCK: 'out_of_stock',
    DISCONTINUED: 'discontinued',
    DRAFT: 'draft',
  } as const,

  // Variant Defaults
  DEFAULTS: {
    DEFAULT_TYPE: 'size',
    DEFAULT_STATUS: 'active',
    DEFAULT_IS_DEFAULT: false,
    DEFAULT_IS_AVAILABLE: true,
    DEFAULT_IS_SELECTABLE: true,
  } as const,

  // Variant Limits
  LIMITS: {
    MAX_OPTIONS: 50,
    MAX_VALUES: 100,
    MAX_IMAGES: 5,
    MAX_NAME_LENGTH: 100,
    MAX_SKU_LENGTH: 50,
    MIN_PRICE: 0,
    MAX_PRICE: 1000000,
  } as const,
} as const;

// Variant Types
export type ProductVariantType = (typeof PRODUCTVARIANT.TYPES)[keyof typeof PRODUCTVARIANT.TYPES];

// Variant Statuses
export type ProductVariantStatus =
  (typeof PRODUCTVARIANT.STATUSES)[keyof typeof PRODUCTVARIANT.STATUSES];

// Variant Defaults
export type ProductVariantDefault =
  (typeof PRODUCTVARIANT.DEFAULTS)[keyof typeof PRODUCTVARIANT.DEFAULTS];

// Variant Limits
export type ProductVariantLimit =
  (typeof PRODUCTVARIANT.LIMITS)[keyof typeof PRODUCTVARIANT.LIMITS];

// Utility Functions
export function productvariantGetTypeLabel(type: ProductVariantType): string {
  const labels: Record<ProductVariantType, string> = {
    [PRODUCTVARIANT.TYPES.SIZE]: 'Size',
    [PRODUCTVARIANT.TYPES.COLOR]: 'Color',
    [PRODUCTVARIANT.TYPES.MATERIAL]: 'Material',
    [PRODUCTVARIANT.TYPES.STYLE]: 'Style',
    [PRODUCTVARIANT.TYPES.PACKAGE]: 'Package',
    [PRODUCTVARIANT.TYPES.CUSTOM]: 'Custom',
  };
  return labels[type] || 'Unknown Variant Type';
}

export function productvariantGetStatusLabel(status: ProductVariantStatus): string {
  const labels: Record<ProductVariantStatus, string> = {
    [PRODUCTVARIANT.STATUSES.ACTIVE]: 'Active',
    [PRODUCTVARIANT.STATUSES.INACTIVE]: 'Inactive',
    [PRODUCTVARIANT.STATUSES.OUT_OF_STOCK]: 'Out of Stock',
    [PRODUCTVARIANT.STATUSES.DISCONTINUED]: 'Discontinued',
    [PRODUCTVARIANT.STATUSES.DRAFT]: 'Draft',
  };
  return labels[status] || 'Unknown Status';
}

export function productvariantIsActive(status: ProductVariantStatus): boolean {
  return status === PRODUCTVARIANT.STATUSES.ACTIVE;
}

export function productvariantIsInStock(status: ProductVariantStatus): boolean {
  const inStockStatuses: ProductVariantStatus[] = [
    PRODUCTVARIANT.STATUSES.ACTIVE,
    PRODUCTVARIANT.STATUSES.INACTIVE,
  ];
  return inStockStatuses.includes(status);
}
