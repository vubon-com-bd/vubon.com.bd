export const VARIANT_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  OUT_OF_STOCK: 'out_of_stock',
  DELETED: 'deleted',
} as const;

export const VARIANT_TYPE = {
  SIZE: 'size',
  COLOR: 'color',
  MATERIAL: 'material',
  STYLE: 'style',
  WEIGHT: 'weight',
  VOLUME: 'volume',
  PACK: 'pack',
} as const;

export const VARIANT = {
  MAX_VARIANTS_PER_PRODUCT: 100,
  MAX_OPTIONS_PER_VARIANT: 50,
  SKU_MAX_LENGTH: 64,
  BARCODE_MAX_LENGTH: 64,
  NAME_MAX_LENGTH: 100,
} as const;

export type VariantStatusType = (typeof VARIANT_STATUS)[keyof typeof VARIANT_STATUS];
export type VariantTypeType = (typeof VARIANT_TYPE)[keyof typeof VARIANT_TYPE];
