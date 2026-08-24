/**
 * Packaging Constants
 * Configuration for packaging - Bangladesh based
 */

export const LOGISTICS_PACKAGING = {
  // Packaging Types
  TYPES: {
    BOX: 'box',
    ENVELOPE: 'envelope',
    PALLET: 'pallet',
    CRATE: 'crate',
    BAG: 'bag',
    TUBE: 'tube',
    BUBBLE_WRAP: 'bubble_wrap',
    STRETCH_WRAP: 'stretch_wrap',
    CUSTOM: 'custom',
  } as const,

  // Packaging Statuses
  STATUS: {
    AVAILABLE: 'available',
    IN_USE: 'in_use',
    DAMAGED: 'damaged',
    DEPLETED: 'depleted',
    DISCONTINUED: 'discontinued',
  } as const,

  // Packaging Materials
  MATERIALS: {
    CARDBOARD: 'cardboard',
    PLASTIC: 'plastic',
    WOOD: 'wood',
    METAL: 'metal',
    PAPER: 'paper',
    FOAM: 'foam',
    BUBBLE: 'bubble',
    STRETCH: 'stretch',
    BIODEGRADABLE: 'biodegradable',
    RECYCLED: 'recycled',
  } as const,

  // Packaging Sizes
  SIZES: {
    SMALL: 'small',
    MEDIUM: 'medium',
    LARGE: 'large',
    XLARGE: 'xlarge',
    CUSTOM: 'custom',
  } as const,

  // Size Dimensions
  DIMENSIONS: {
    SMALL: { length: 20, width: 15, height: 10 },
    MEDIUM: { length: 40, width: 30, height: 20 },
    LARGE: { length: 60, width: 45, height: 30 },
    XLARGE: { length: 80, width: 60, height: 40 },
    CUSTOM: { length: 0, width: 0, height: 0 },
  } as const,

  // Weight Limits (in kg)
  WEIGHT_LIMITS: {
    SMALL: 5,
    MEDIUM: 15,
    LARGE: 30,
    XLARGE: 50,
    CUSTOM: 100,
  } as const,

  // Packaging Costs (BDT)
  COSTS: {
    BOX: { SMALL: 10, MEDIUM: 20, LARGE: 35, XLARGE: 50 },
    ENVELOPE: { SMALL: 5, MEDIUM: 10, LARGE: 15, XLARGE: 20 },
    PALLET: { SMALL: 100, MEDIUM: 150, LARGE: 200, XLARGE: 300 },
    CRATE: { SMALL: 80, MEDIUM: 120, LARGE: 180, XLARGE: 250 },
    BAG: { SMALL: 8, MEDIUM: 15, LARGE: 25, XLARGE: 35 },
    TUBE: { SMALL: 12, MEDIUM: 20, LARGE: 30, XLARGE: 40 },
    CUSTOM: { SMALL: 0, MEDIUM: 0, LARGE: 0, XLARGE: 0 },
  } as const,

  // Eco-Friendly Options
  ECO_FRIENDLY: {
    BIODEGRADABLE: 'biodegradable',
    RECYCLABLE: 'recyclable',
    COMPOSTABLE: 'compostable',
    REUSABLE: 'reusable',
    NONE: 'none',
  } as const,
} as const;

// Packaging Types
export type LogisticsPackagingType =
  (typeof LOGISTICS_PACKAGING.TYPES)[keyof typeof LOGISTICS_PACKAGING.TYPES];

// Packaging Statuses
export type LogisticsPackagingStatus =
  (typeof LOGISTICS_PACKAGING.STATUS)[keyof typeof LOGISTICS_PACKAGING.STATUS];

// Packaging Materials
export type LogisticsPackagingMaterial =
  (typeof LOGISTICS_PACKAGING.MATERIALS)[keyof typeof LOGISTICS_PACKAGING.MATERIALS];

// Packaging Sizes
export type LogisticsPackagingSize =
  (typeof LOGISTICS_PACKAGING.SIZES)[keyof typeof LOGISTICS_PACKAGING.SIZES];

// Eco-Friendly Options
export type LogisticsPackagingEcoFriendly =
  (typeof LOGISTICS_PACKAGING.ECO_FRIENDLY)[keyof typeof LOGISTICS_PACKAGING.ECO_FRIENDLY];

// Utility Functions
export function logisticsPackagingGetTypeLabel(type: LogisticsPackagingType): string {
  const labels: Record<LogisticsPackagingType, string> = {
    [LOGISTICS_PACKAGING.TYPES.BOX]: 'Box',
    [LOGISTICS_PACKAGING.TYPES.ENVELOPE]: 'Envelope',
    [LOGISTICS_PACKAGING.TYPES.PALLET]: 'Pallet',
    [LOGISTICS_PACKAGING.TYPES.CRATE]: 'Crate',
    [LOGISTICS_PACKAGING.TYPES.BAG]: 'Bag',
    [LOGISTICS_PACKAGING.TYPES.TUBE]: 'Tube',
    [LOGISTICS_PACKAGING.TYPES.BUBBLE_WRAP]: 'Bubble Wrap',
    [LOGISTICS_PACKAGING.TYPES.STRETCH_WRAP]: 'Stretch Wrap',
    [LOGISTICS_PACKAGING.TYPES.CUSTOM]: 'Custom',
  };
  return labels[type] || 'Unknown';
}

export function logisticsPackagingGetStatusLabel(status: LogisticsPackagingStatus): string {
  const labels: Record<LogisticsPackagingStatus, string> = {
    [LOGISTICS_PACKAGING.STATUS.AVAILABLE]: 'Available',
    [LOGISTICS_PACKAGING.STATUS.IN_USE]: 'In Use',
    [LOGISTICS_PACKAGING.STATUS.DAMAGED]: 'Damaged',
    [LOGISTICS_PACKAGING.STATUS.DEPLETED]: 'Depleted',
    [LOGISTICS_PACKAGING.STATUS.DISCONTINUED]: 'Discontinued',
  };
  return labels[status] || 'Unknown';
}

export function logisticsPackagingGetMaterialLabel(material: LogisticsPackagingMaterial): string {
  const labels: Record<LogisticsPackagingMaterial, string> = {
    [LOGISTICS_PACKAGING.MATERIALS.CARDBOARD]: 'Cardboard',
    [LOGISTICS_PACKAGING.MATERIALS.PLASTIC]: 'Plastic',
    [LOGISTICS_PACKAGING.MATERIALS.WOOD]: 'Wood',
    [LOGISTICS_PACKAGING.MATERIALS.METAL]: 'Metal',
    [LOGISTICS_PACKAGING.MATERIALS.PAPER]: 'Paper',
    [LOGISTICS_PACKAGING.MATERIALS.FOAM]: 'Foam',
    [LOGISTICS_PACKAGING.MATERIALS.BUBBLE]: 'Bubble',
    [LOGISTICS_PACKAGING.MATERIALS.STRETCH]: 'Stretch',
    [LOGISTICS_PACKAGING.MATERIALS.BIODEGRADABLE]: 'Biodegradable',
    [LOGISTICS_PACKAGING.MATERIALS.RECYCLED]: 'Recycled',
  };
  return labels[material] || 'Unknown';
}

export function logisticsPackagingGetSizeLabel(size: LogisticsPackagingSize): string {
  const labels: Record<LogisticsPackagingSize, string> = {
    [LOGISTICS_PACKAGING.SIZES.SMALL]: 'Small',
    [LOGISTICS_PACKAGING.SIZES.MEDIUM]: 'Medium',
    [LOGISTICS_PACKAGING.SIZES.LARGE]: 'Large',
    [LOGISTICS_PACKAGING.SIZES.XLARGE]: 'X-Large',
    [LOGISTICS_PACKAGING.SIZES.CUSTOM]: 'Custom',
  };
  return labels[size] || 'Unknown';
}

export function logisticsPackagingGetDimensions(size: LogisticsPackagingSize): {
  length: number;
  width: number;
  height: number;
} {
  const dimensions: Record<
    LogisticsPackagingSize,
    { length: number; width: number; height: number }
  > = {
    [LOGISTICS_PACKAGING.SIZES.SMALL]: LOGISTICS_PACKAGING.DIMENSIONS.SMALL,
    [LOGISTICS_PACKAGING.SIZES.MEDIUM]: LOGISTICS_PACKAGING.DIMENSIONS.MEDIUM,
    [LOGISTICS_PACKAGING.SIZES.LARGE]: LOGISTICS_PACKAGING.DIMENSIONS.LARGE,
    [LOGISTICS_PACKAGING.SIZES.XLARGE]: LOGISTICS_PACKAGING.DIMENSIONS.XLARGE,
    [LOGISTICS_PACKAGING.SIZES.CUSTOM]: LOGISTICS_PACKAGING.DIMENSIONS.CUSTOM,
  };
  return dimensions[size] || LOGISTICS_PACKAGING.DIMENSIONS.MEDIUM;
}

export function logisticsPackagingGetWeightLimit(size: LogisticsPackagingSize): number {
  const limits: Record<LogisticsPackagingSize, number> = {
    [LOGISTICS_PACKAGING.SIZES.SMALL]: LOGISTICS_PACKAGING.WEIGHT_LIMITS.SMALL,
    [LOGISTICS_PACKAGING.SIZES.MEDIUM]: LOGISTICS_PACKAGING.WEIGHT_LIMITS.MEDIUM,
    [LOGISTICS_PACKAGING.SIZES.LARGE]: LOGISTICS_PACKAGING.WEIGHT_LIMITS.LARGE,
    [LOGISTICS_PACKAGING.SIZES.XLARGE]: LOGISTICS_PACKAGING.WEIGHT_LIMITS.XLARGE,
    [LOGISTICS_PACKAGING.SIZES.CUSTOM]: LOGISTICS_PACKAGING.WEIGHT_LIMITS.CUSTOM,
  };
  return limits[size] || LOGISTICS_PACKAGING.WEIGHT_LIMITS.MEDIUM;
}

export function logisticsPackagingGetCost(
  type: LogisticsPackagingType,
  size: LogisticsPackagingSize
): number {
  const costs: Record<string, Record<string, number>> = {
    [LOGISTICS_PACKAGING.TYPES.BOX]: LOGISTICS_PACKAGING.COSTS.BOX,
    [LOGISTICS_PACKAGING.TYPES.ENVELOPE]: LOGISTICS_PACKAGING.COSTS.ENVELOPE,
    [LOGISTICS_PACKAGING.TYPES.PALLET]: LOGISTICS_PACKAGING.COSTS.PALLET,
    [LOGISTICS_PACKAGING.TYPES.CRATE]: LOGISTICS_PACKAGING.COSTS.CRATE,
    [LOGISTICS_PACKAGING.TYPES.BAG]: LOGISTICS_PACKAGING.COSTS.BAG,
    [LOGISTICS_PACKAGING.TYPES.TUBE]: LOGISTICS_PACKAGING.COSTS.TUBE,
    [LOGISTICS_PACKAGING.TYPES.CUSTOM]: LOGISTICS_PACKAGING.COSTS.CUSTOM,
  };
  const costMap = costs[type];
  if (!costMap) return 0;
  return costMap[size] || 0;
}

export function logisticsPackagingIsAvailable(status: LogisticsPackagingStatus): boolean {
  return status === LOGISTICS_PACKAGING.STATUS.AVAILABLE;
}

export function logisticsPackagingIsUsable(status: LogisticsPackagingStatus): boolean {
  const usableStatuses: LogisticsPackagingStatus[] = [
    LOGISTICS_PACKAGING.STATUS.AVAILABLE,
    LOGISTICS_PACKAGING.STATUS.IN_USE,
  ];
  return usableStatuses.includes(status);
}

export function logisticsPackagingGetEcoFriendlyLabel(eco: LogisticsPackagingEcoFriendly): string {
  const labels: Record<LogisticsPackagingEcoFriendly, string> = {
    [LOGISTICS_PACKAGING.ECO_FRIENDLY.BIODEGRADABLE]: 'Biodegradable',
    [LOGISTICS_PACKAGING.ECO_FRIENDLY.RECYCLABLE]: 'Recyclable',
    [LOGISTICS_PACKAGING.ECO_FRIENDLY.COMPOSTABLE]: 'Compostable',
    [LOGISTICS_PACKAGING.ECO_FRIENDLY.REUSABLE]: 'Reusable',
    [LOGISTICS_PACKAGING.ECO_FRIENDLY.NONE]: 'None',
  };
  return labels[eco] || 'Unknown';
}
