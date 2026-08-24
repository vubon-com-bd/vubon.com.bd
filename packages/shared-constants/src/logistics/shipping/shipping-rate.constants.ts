/**
 * Shipping Rate Constants
 * Configuration for shipping rates - Bangladesh based
 */

export const LOGISTICS_SHIPPING_RATE = {
  // Rate Types
  TYPES: {
    FLAT: 'flat',
    WEIGHT_BASED: 'weight_based',
    DISTANCE_BASED: 'distance_based',
    VOLUME_BASED: 'volume_based',
    ITEM_BASED: 'item_based',
    TIERED: 'tiered',
    DYNAMIC: 'dynamic',
  } as const,

  // Rate Statuses
  STATUS: {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    EXPIRED: 'expired',
    PENDING: 'pending',
  } as const,

  // Rate Zones (Bangladesh)
  ZONES: {
    LOCAL: 'local',
    DISTRICT: 'district',
    DIVISION: 'division',
    NATIONAL: 'national',
    INTERNATIONAL: 'international',
  } as const,

  // Rate Calculations
  CALCULATIONS: {
    PER_KG: 'per_kg',
    PER_100G: 'per_100g',
    PER_ITEM: 'per_item',
    PER_KM: 'per_km',
    PER_CBM: 'per_cbm',
    FIXED: 'fixed',
  } as const,

  // Rate Tiers (weight in kg)
  TIERS: {
    LIGHT: 1,
    MEDIUM: 5,
    HEAVY: 10,
    EXTRA_HEAVY: 20,
    BULK: 50,
  } as const,

  // Base Rates (BDT)
  BASE_RATES: {
    LOCAL: 50,
    DISTRICT: 80,
    DIVISION: 120,
    NATIONAL: 150,
    INTERNATIONAL: 500,
  } as const,

  // Weight Rates (BDT per kg)
  WEIGHT_RATES: {
    LOCAL: 20,
    DISTRICT: 30,
    DIVISION: 40,
    NATIONAL: 50,
    INTERNATIONAL: 200,
  } as const,
} as const;

// Rate Types
export type LogisticsShippingRateType =
  (typeof LOGISTICS_SHIPPING_RATE.TYPES)[keyof typeof LOGISTICS_SHIPPING_RATE.TYPES];

// Rate Statuses
export type LogisticsShippingRateStatus =
  (typeof LOGISTICS_SHIPPING_RATE.STATUS)[keyof typeof LOGISTICS_SHIPPING_RATE.STATUS];

// Rate Zones
export type LogisticsShippingRateZone =
  (typeof LOGISTICS_SHIPPING_RATE.ZONES)[keyof typeof LOGISTICS_SHIPPING_RATE.ZONES];

// Rate Calculations
export type LogisticsShippingRateCalculation =
  (typeof LOGISTICS_SHIPPING_RATE.CALCULATIONS)[keyof typeof LOGISTICS_SHIPPING_RATE.CALCULATIONS];

// Utility Functions
export function logisticsShippingRateGetTypeLabel(type: LogisticsShippingRateType): string {
  const labels: Record<LogisticsShippingRateType, string> = {
    [LOGISTICS_SHIPPING_RATE.TYPES.FLAT]: 'Flat Rate',
    [LOGISTICS_SHIPPING_RATE.TYPES.WEIGHT_BASED]: 'Weight Based',
    [LOGISTICS_SHIPPING_RATE.TYPES.DISTANCE_BASED]: 'Distance Based',
    [LOGISTICS_SHIPPING_RATE.TYPES.VOLUME_BASED]: 'Volume Based',
    [LOGISTICS_SHIPPING_RATE.TYPES.ITEM_BASED]: 'Item Based',
    [LOGISTICS_SHIPPING_RATE.TYPES.TIERED]: 'Tiered Rate',
    [LOGISTICS_SHIPPING_RATE.TYPES.DYNAMIC]: 'Dynamic Rate',
  };
  return labels[type] || 'Unknown';
}

export function logisticsShippingRateGetStatusLabel(status: LogisticsShippingRateStatus): string {
  const labels: Record<LogisticsShippingRateStatus, string> = {
    [LOGISTICS_SHIPPING_RATE.STATUS.ACTIVE]: 'Active',
    [LOGISTICS_SHIPPING_RATE.STATUS.INACTIVE]: 'Inactive',
    [LOGISTICS_SHIPPING_RATE.STATUS.EXPIRED]: 'Expired',
    [LOGISTICS_SHIPPING_RATE.STATUS.PENDING]: 'Pending',
  };
  return labels[status] || 'Unknown';
}

export function logisticsShippingRateGetZoneLabel(zone: LogisticsShippingRateZone): string {
  const labels: Record<LogisticsShippingRateZone, string> = {
    [LOGISTICS_SHIPPING_RATE.ZONES.LOCAL]: 'Local (within city)',
    [LOGISTICS_SHIPPING_RATE.ZONES.DISTRICT]: 'Within District',
    [LOGISTICS_SHIPPING_RATE.ZONES.DIVISION]: 'Within Division',
    [LOGISTICS_SHIPPING_RATE.ZONES.NATIONAL]: 'National (Bangladesh)',
    [LOGISTICS_SHIPPING_RATE.ZONES.INTERNATIONAL]: 'International',
  };
  return labels[zone] || 'Unknown';
}

export function logisticsShippingRateGetBaseRate(zone: LogisticsShippingRateZone): number {
  const rates: Record<LogisticsShippingRateZone, number> = {
    [LOGISTICS_SHIPPING_RATE.ZONES.LOCAL]: LOGISTICS_SHIPPING_RATE.BASE_RATES.LOCAL,
    [LOGISTICS_SHIPPING_RATE.ZONES.DISTRICT]: LOGISTICS_SHIPPING_RATE.BASE_RATES.DISTRICT,
    [LOGISTICS_SHIPPING_RATE.ZONES.DIVISION]: LOGISTICS_SHIPPING_RATE.BASE_RATES.DIVISION,
    [LOGISTICS_SHIPPING_RATE.ZONES.NATIONAL]: LOGISTICS_SHIPPING_RATE.BASE_RATES.NATIONAL,
    [LOGISTICS_SHIPPING_RATE.ZONES.INTERNATIONAL]: LOGISTICS_SHIPPING_RATE.BASE_RATES.INTERNATIONAL,
  };
  return rates[zone] || LOGISTICS_SHIPPING_RATE.BASE_RATES.LOCAL;
}

export function logisticsShippingRateGetWeightRate(zone: LogisticsShippingRateZone): number {
  const rates: Record<LogisticsShippingRateZone, number> = {
    [LOGISTICS_SHIPPING_RATE.ZONES.LOCAL]: LOGISTICS_SHIPPING_RATE.WEIGHT_RATES.LOCAL,
    [LOGISTICS_SHIPPING_RATE.ZONES.DISTRICT]: LOGISTICS_SHIPPING_RATE.WEIGHT_RATES.DISTRICT,
    [LOGISTICS_SHIPPING_RATE.ZONES.DIVISION]: LOGISTICS_SHIPPING_RATE.WEIGHT_RATES.DIVISION,
    [LOGISTICS_SHIPPING_RATE.ZONES.NATIONAL]: LOGISTICS_SHIPPING_RATE.WEIGHT_RATES.NATIONAL,
    [LOGISTICS_SHIPPING_RATE.ZONES.INTERNATIONAL]:
      LOGISTICS_SHIPPING_RATE.WEIGHT_RATES.INTERNATIONAL,
  };
  return rates[zone] || LOGISTICS_SHIPPING_RATE.WEIGHT_RATES.LOCAL;
}

export function logisticsShippingRateIsActive(status: LogisticsShippingRateStatus): boolean {
  return status === LOGISTICS_SHIPPING_RATE.STATUS.ACTIVE;
}

export function logisticsShippingRateCalculate(
  zone: LogisticsShippingRateZone,
  weight: number,
  type: LogisticsShippingRateType = LOGISTICS_SHIPPING_RATE.TYPES.WEIGHT_BASED
): number {
  const baseRate = logisticsShippingRateGetBaseRate(zone);
  const weightRate = logisticsShippingRateGetWeightRate(zone);

  if (type === LOGISTICS_SHIPPING_RATE.TYPES.FLAT) {
    return baseRate;
  }

  if (type === LOGISTICS_SHIPPING_RATE.TYPES.WEIGHT_BASED) {
    return baseRate + weight * weightRate;
  }

  if (type === LOGISTICS_SHIPPING_RATE.TYPES.TIERED) {
    let tierMultiplier = 1;
    if (weight <= LOGISTICS_SHIPPING_RATE.TIERS.LIGHT) tierMultiplier = 1;
    else if (weight <= LOGISTICS_SHIPPING_RATE.TIERS.MEDIUM) tierMultiplier = 1.5;
    else if (weight <= LOGISTICS_SHIPPING_RATE.TIERS.HEAVY) tierMultiplier = 2;
    else if (weight <= LOGISTICS_SHIPPING_RATE.TIERS.EXTRA_HEAVY) tierMultiplier = 3;
    else tierMultiplier = 4;
    return baseRate * tierMultiplier;
  }

  return baseRate + weight * weightRate;
}
