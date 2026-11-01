export const PACKAGING_TYPE = {
  BOX: 'box',
  ENVELOPE: 'envelope',
  BUBBLE_WRAP: 'bubble_wrap',
  POLY_BAG: 'poly_bag',
  PAPER_BAG: 'paper_bag',
  TUBE: 'tube',
  PALLET: 'pallet',
  CRATE: 'crate',
  CUSTOM: 'custom',
} as const;

export const PACKAGING_MATERIAL = {
  CARDBOARD: 'cardboard',
  PLASTIC: 'plastic',
  PAPER: 'paper',
  WOOD: 'wood',
  METAL: 'metal',
  GLASS: 'glass',
  BIODEGRADABLE: 'biodegradable',
  RECYCLED: 'recycled',
} as const;

export const PACKAGING_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  OUT_OF_STOCK: 'out_of_stock',
  DISCONTINUED: 'discontinued',
} as const;

export const PACKAGING = {
  TYPE: PACKAGING_TYPE,
  MATERIAL: PACKAGING_MATERIAL,
  STATUS: PACKAGING_STATUS,
  MAX_PACKAGE_WEIGHT_KG: 500,
  MAX_PACKAGE_LENGTH_CM: 300,
  MAX_PACKAGE_WIDTH_CM: 300,
  MAX_PACKAGE_HEIGHT_CM: 300,
  MIN_PACKAGE_WEIGHT_KG: 0.1,
  LABEL_SIZE_DEFAULT: 'a6',
  LABEL_SIZE_OPTIONS: ['a4', 'a5', 'a6', 'a7'],
  FRAGILE_HANDLING: true,
  TEMPERATURE_CONTROLLED: false,
  CUSTOM_BRANDING: true,
  MAX_CUSTOM_PACKAGING: 50,
} as const;

export type PackagingTypeType = (typeof PACKAGING_TYPE)[keyof typeof PACKAGING_TYPE];
export type PackagingMaterialType = (typeof PACKAGING_MATERIAL)[keyof typeof PACKAGING_MATERIAL];
export type PackagingStatusType = (typeof PACKAGING_STATUS)[keyof typeof PACKAGING_STATUS];
