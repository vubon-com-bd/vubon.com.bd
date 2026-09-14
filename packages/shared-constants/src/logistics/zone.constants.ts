export const ZONE_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  RESTRICTED: 'restricted',
  SUSPENDED: 'suspended',
  ARCHIVED: 'archived',
} as const;

export const ZONE_TYPE = {
  NATIONAL: 'national',
  DIVISION: 'division',
  DISTRICT: 'district',
  UPAZILA: 'upazila',
  CITY: 'city',
  AREA: 'area',
  POSTAL_CODE: 'postal_code',
  CUSTOM_POLYGON: 'custom_polygon',
} as const;

export const ZONE_PRICING_TYPE = {
  FLAT: 'flat',
  WEIGHT_BASED: 'weight_based',
  DISTANCE_BASED: 'distance_based',
  TIERED: 'tiered',
  ZONE_BASED: 'zone_based',
} as const;

export const ZONE = {
  STATUS: ZONE_STATUS,
  TYPE: ZONE_TYPE,
  PRICING_TYPE: ZONE_PRICING_TYPE,
  MAX_ZONES: 5000,
  MIN_DELIVERY_DAYS: 1,
  MAX_DELIVERY_DAYS: 15,
  DEFAULT_DELIVERY_DAYS: 3,
  FREE_DELIVERY_MIN_AMOUNT: 1000,
  DEFAULT_SHIPPING_COST: 60,
  MAX_SHIPPING_COST: 5000,
  COD_ENABLED: true,
  COD_MAX_AMOUNT: 50000,
  COD_CHARGE: 20,
  ALLOW_REMOTE: true,
  REMOTE_SURCHARGE: 100,
} as const;

export type ZoneStatusType = (typeof ZONE_STATUS)[keyof typeof ZONE_STATUS];
export type ZoneTypeType = (typeof ZONE_TYPE)[keyof typeof ZONE_TYPE];
export type ZonePricingTypeType = (typeof ZONE_PRICING_TYPE)[keyof typeof ZONE_PRICING_TYPE];
