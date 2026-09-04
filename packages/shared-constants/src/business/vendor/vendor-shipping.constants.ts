/**
 * Vendor Shipping Constants
 * ভেন্ডর শিপিং সম্পর্কিত কনস্ট্যান্টস
 */

import { TYPES } from '../../common';

export const VENDOR_SHIPPING = {
  // Shipping types (TYPES ব্যবহার করে)
  TYPES: {
    STANDARD: TYPES.STANDARD,
    EXPRESS: TYPES.EXPRESS,
    SAME_DAY: TYPES.SAME_DAY,
    NEXT_DAY: TYPES.NEXT_DAY,
    INTERNATIONAL: TYPES.INTERNATIONAL,
    FREE: TYPES.FREE,
    PICKUP: TYPES.PICKUP,
    DROPSHIPPING: TYPES.DROPSHIPPING,
  },

  // Shipping carriers
  CARRIERS: {
    SA_PARIBAN: 'sa_paribahan',
    REDX: 'redx',
    PATHAO: 'pathao',
    STEADFAST: 'steadfast',
    SUNDARBAN: 'sundarban',
    PAPERFLY: 'paperfly',
    ECOURIER: 'ecourier',
    DHL: 'dhl',
    FEDEX: 'fedex',
    UPS: 'ups',
  },

  // Shipping zones
  ZONES: {
    LOCAL: 'local',
    NATIONAL: 'national',
    INTERNATIONAL: TYPES.INTERNATIONAL,
  },

  // Delivery options
  DELIVERY: {
    HOME: 'home',
    OFFICE: 'office',
    PICKUP_POINT: 'pickup_point',
    LOCKER: 'locker',
  },

  // Default values
  DEFAULTS: {
    MIN_WEIGHT: 0.1,
    MAX_WEIGHT: 50,
    FREE_SHIPPING_THRESHOLD: 1000,
    DEFAULT_COST: 60,
    PROCESSING_TIME: 24, // hours
  },
} as const;

export type VendorShippingType = (typeof VENDOR_SHIPPING.TYPES)[keyof typeof VENDOR_SHIPPING.TYPES];
export type VendorShippingCarrier =
  (typeof VENDOR_SHIPPING.CARRIERS)[keyof typeof VENDOR_SHIPPING.CARRIERS];
export type VendorShippingZone = (typeof VENDOR_SHIPPING.ZONES)[keyof typeof VENDOR_SHIPPING.ZONES];
export type VendorDeliveryOption =
  (typeof VENDOR_SHIPPING.DELIVERY)[keyof typeof VENDOR_SHIPPING.DELIVERY];
