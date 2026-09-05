/**
 * Vendor Shipping Config
 * ভেন্ডর শিপিং কনফিগারেশন
 */

import { VENDOR_SHIPPING } from '@vubon/shared-constants';

export interface VendorShippingConfig {
  enabled: boolean;
  types: Record<string, string>;
  carriers: Record<string, string>;
  zones: Record<string, string>;
  deliveryOptions: Record<string, string>;
  defaultMethod: string;
  freeShippingThreshold: number;
  defaults: {
    minWeight: number;
    maxWeight: number;
    freeShippingThreshold: number;
    defaultCost: number;
    processingTime: number;
  };
}

export const vendorShippingConfig: VendorShippingConfig = {
  enabled: true,

  types: {
    standard: VENDOR_SHIPPING.TYPES.STANDARD,
    express: VENDOR_SHIPPING.TYPES.EXPRESS,
    same_day: VENDOR_SHIPPING.TYPES.SAME_DAY,
    next_day: VENDOR_SHIPPING.TYPES.NEXT_DAY,
    international: VENDOR_SHIPPING.TYPES.INTERNATIONAL,
    free: VENDOR_SHIPPING.TYPES.FREE,
    pickup: VENDOR_SHIPPING.TYPES.PICKUP,
    dropshipping: VENDOR_SHIPPING.TYPES.DROPSHIPPING,
  },

  carriers: {
    sa_pariban: VENDOR_SHIPPING.CARRIERS.SA_PARIBAN,
    redx: VENDOR_SHIPPING.CARRIERS.REDX,
    pathao: VENDOR_SHIPPING.CARRIERS.PATHAO,
    steadfast: VENDOR_SHIPPING.CARRIERS.STEADFAST,
    sundarban: VENDOR_SHIPPING.CARRIERS.SUNDARBAN,
    paperfly: VENDOR_SHIPPING.CARRIERS.PAPERFLY,
    ecourier: VENDOR_SHIPPING.CARRIERS.ECOURIER,
    dhl: VENDOR_SHIPPING.CARRIERS.DHL,
    fedex: VENDOR_SHIPPING.CARRIERS.FEDEX,
    ups: VENDOR_SHIPPING.CARRIERS.UPS,
  },

  zones: {
    local: VENDOR_SHIPPING.ZONES.LOCAL,
    national: VENDOR_SHIPPING.ZONES.NATIONAL,
    international: VENDOR_SHIPPING.ZONES.INTERNATIONAL,
  },

  deliveryOptions: {
    home: VENDOR_SHIPPING.DELIVERY.HOME,
    office: VENDOR_SHIPPING.DELIVERY.OFFICE,
    pickup_point: VENDOR_SHIPPING.DELIVERY.PICKUP_POINT,
    locker: VENDOR_SHIPPING.DELIVERY.LOCKER,
  },

  defaultMethod: 'standard',
  freeShippingThreshold: 1000,

  defaults: {
    minWeight: VENDOR_SHIPPING.DEFAULTS.MIN_WEIGHT,
    maxWeight: VENDOR_SHIPPING.DEFAULTS.MAX_WEIGHT,
    freeShippingThreshold: VENDOR_SHIPPING.DEFAULTS.FREE_SHIPPING_THRESHOLD,
    defaultCost: VENDOR_SHIPPING.DEFAULTS.DEFAULT_COST,
    processingTime: VENDOR_SHIPPING.DEFAULTS.PROCESSING_TIME,
  },
} as const;

export type VendorShippingConfigType = typeof vendorShippingConfig;
