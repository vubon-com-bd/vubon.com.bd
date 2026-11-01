export const SHIPPING_METHOD = {
  STANDARD: 'standard',
  EXPRESS: 'express',
  SAME_DAY: 'same_day',
  NEXT_DAY: 'next_day',
  OVERNIGHT: 'overnight',
  ECONOMY: 'economy',
  INTERNATIONAL: 'international',
  FREIGHT: 'freight',
  PICKUP: 'pickup',
  LOCAL_DELIVERY: 'local_delivery',
} as const;

export const SHIPPING_METHOD_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  SEASONAL: 'seasonal',
  SUSPENDED: 'suspended',
} as const;

export const SHIPPING_RATE_TYPE = {
  FLAT: 'flat',
  WEIGHT_BASED: 'weight_based',
  PRICE_BASED: 'price_based',
  QUANTITY_BASED: 'quantity_based',
  DISTANCE_BASED: 'distance_based',
  TIERED: 'tiered',
} as const;

export const SHIPPING_METHOD_LIMIT = {
  STATUS: SHIPPING_METHOD_STATUS,
  RATE_TYPE: SHIPPING_RATE_TYPE,
  MAX_ACTIVE_METHODS: 50,
  MIN_DELIVERY_DAYS: 0,
  MAX_DELIVERY_DAYS: 30,
  MAX_WEIGHT_KG: 500,
  MAX_DIMENSIONS_CM: 300,
  FREE_SHIPPING_THRESHOLD: 1000,
  MIN_SHIPPING_COST: 0,
  MAX_SHIPPING_COST: 100000,
  COD_ENABLED: true,
  TRACKING_ENABLED: true,
} as const;

export type ShippingMethodTypeType = (typeof SHIPPING_METHOD)[keyof typeof SHIPPING_METHOD];
export type ShippingMethodStatusType =
  (typeof SHIPPING_METHOD_STATUS)[keyof typeof SHIPPING_METHOD_STATUS];
export type ShippingRateTypeType = (typeof SHIPPING_RATE_TYPE)[keyof typeof SHIPPING_RATE_TYPE];
