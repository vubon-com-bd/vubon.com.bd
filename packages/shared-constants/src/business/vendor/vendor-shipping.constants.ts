export const VENDOR_SHIPPING_METHOD = {
  STANDARD: 'standard',
  EXPRESS: 'express',
  SAME_DAY: 'same_day',
  NEXT_DAY: 'next_day',
  PICKUP: 'pickup',
  COURIER: 'courier',
} as const;

export const VENDOR_SHIPPING_ZONE = {
  INSIDE_CITY: 'inside_city',
  INSIDE_DIVISION: 'inside_division',
  INSIDE_COUNTRY: 'inside_country',
  INTERNATIONAL: 'international',
  REMOTE: 'remote',
} as const;

export const VENDOR_SHIPPING = {
  FREE_SHIPPING_MIN_AMOUNT: 1000,
  DEFAULT_SHIPPING_COST: 60,
  MAX_SHIPPING_COST: 5000,
  MIN_DELIVERY_DAYS: 1,
  MAX_DELIVERY_DAYS: 15,
  ALLOW_PICKUP: true,
  ALLOW_COURIER: true,
  TRACKING_REQUIRED: true,
} as const;

export type VendorShippingMethodType =
  (typeof VENDOR_SHIPPING_METHOD)[keyof typeof VENDOR_SHIPPING_METHOD];
export type VendorShippingZoneType =
  (typeof VENDOR_SHIPPING_ZONE)[keyof typeof VENDOR_SHIPPING_ZONE];
