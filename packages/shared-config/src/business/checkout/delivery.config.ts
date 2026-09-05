/**
 * Delivery Config
 * ডেলিভারি কনফিগারেশন
 */

import { DELIVERY } from '@vubon/shared-constants';

export interface DeliveryConfig {
  enabled: boolean;
  defaultMethod: string;
  status: Record<string, string>;
  types: Record<string, string>;
  zones: Record<string, string>;
  times: Record<string, number>;
  methods: {
    standard: { duration: number; cost: number; freeThreshold?: number };
    express: { duration: number; cost: number; freeThreshold?: number };
    same_day: { duration: number; cost: number; freeThreshold?: number };
    next_day: { duration: number; cost: number; freeThreshold?: number };
    scheduled: { duration: number; cost: number; freeThreshold?: number };
    pickup: { duration: number; cost: number; freeThreshold?: number };
    dropshipping: { duration: number; cost: number; freeThreshold?: number };
  };
  defaults: {
    maxWeight: number;
    maxDimensions: { length: number; width: number; height: number };
    freeDeliveryThreshold: number;
    deliveryCharge: number;
    attemptLimit: number;
    storageDays: number;
  };
  carriers: Record<string, string>;
  zonesConfig: Record<string, { baseRate: number; perKmRate: number }>;
}

export const deliveryConfig: DeliveryConfig = {
  enabled: true,
  defaultMethod: 'standard',

  status: {
    pending: DELIVERY.STATUS.PENDING,
    processing: DELIVERY.STATUS.PROCESSING,
    picked: DELIVERY.STATUS.PICKED,
    in_transit: DELIVERY.STATUS.IN_TRANSIT,
    out_for_delivery: DELIVERY.STATUS.OUT_FOR_DELIVERY,
    attempted: DELIVERY.STATUS.ATTEMPTED,
    delivered: DELIVERY.STATUS.DELIVERED,
    failed: DELIVERY.STATUS.FAILED,
    returned: DELIVERY.STATUS.RETURNED,
    cancelled: DELIVERY.STATUS.CANCELLED,
    rescheduled: DELIVERY.STATUS.RESCHEDULED,
  },

  types: {
    standard: DELIVERY.TYPES.STANDARD,
    express: DELIVERY.TYPES.EXPRESS,
    same_day: DELIVERY.TYPES.SAME_DAY,
    next_day: DELIVERY.TYPES.NEXT_DAY,
    scheduled: DELIVERY.TYPES.SCHEDULED,
    pickup: DELIVERY.TYPES.PICKUP,
    dropshipping: DELIVERY.TYPES.DROPSHIPPING,
  },

  zones: {
    dhaka: DELIVERY.ZONES.DHAKA,
    chittagong: DELIVERY.ZONES.CHITTAGONG,
    rajshahi: DELIVERY.ZONES.RAJSHAHI,
    khulna: DELIVERY.ZONES.KHULNA,
    barisal: DELIVERY.ZONES.BARISAL,
    sylhet: DELIVERY.ZONES.SYLHET,
    rangpur: DELIVERY.ZONES.RANGPUR,
    mymensingh: DELIVERY.ZONES.MYMENSINGH,
  },

  times: {
    standard: DELIVERY.TIMES.STANDARD,
    express: DELIVERY.TIMES.EXPRESS,
    same_day: DELIVERY.TIMES.SAME_DAY,
    next_day: DELIVERY.TIMES.NEXT_DAY,
    scheduled: DELIVERY.TIMES.SCHEDULED,
    pickup: DELIVERY.TIMES.PICKUP,
    dropshipping: DELIVERY.TIMES.DROPSHIPPING,
  },

  methods: {
    standard: { duration: 3, cost: 60, freeThreshold: 1000 },
    express: { duration: 2, cost: 160 },
    same_day: { duration: 1, cost: 260 },
    next_day: { duration: 1, cost: 210 },
    scheduled: { duration: 2, cost: 80 },
    pickup: { duration: 0, cost: 0 },
    dropshipping: { duration: 4, cost: 120 },
  },

  defaults: {
    maxWeight: DELIVERY.DEFAULTS.MAX_WEIGHT,
    maxDimensions: {
      length: DELIVERY.DEFAULTS.MAX_DIMENSIONS.LENGTH,
      width: DELIVERY.DEFAULTS.MAX_DIMENSIONS.WIDTH,
      height: DELIVERY.DEFAULTS.MAX_DIMENSIONS.HEIGHT,
    },
    freeDeliveryThreshold: DELIVERY.DEFAULTS.FREE_DELIVERY_THRESHOLD,
    deliveryCharge: DELIVERY.DEFAULTS.DELIVERY_CHARGE,
    attemptLimit: DELIVERY.DEFAULTS.ATTEMPT_LIMIT,
    storageDays: DELIVERY.DEFAULTS.STORAGE_DAYS,
  },

  carriers: {
    sa_paribahan: 'sa_paribahan',
    redx: 'redx',
    pathao: 'pathao',
    steadfast: 'steadfast',
    sundarban: 'sundarban',
    paperfly: 'paperfly',
    ecourier: 'ecourier',
    dhl: 'dhl',
    fedex: 'fedex',
    ups: 'ups',
  },

  zonesConfig: {
    dhaka: { baseRate: 60, perKmRate: 2 },
    chittagong: { baseRate: 80, perKmRate: 3 },
    rajshahi: { baseRate: 100, perKmRate: 3 },
    khulna: { baseRate: 100, perKmRate: 3 },
    barisal: { baseRate: 120, perKmRate: 4 },
    sylhet: { baseRate: 120, perKmRate: 4 },
    rangpur: { baseRate: 140, perKmRate: 4 },
    mymensingh: { baseRate: 100, perKmRate: 3 },
  },
} as const;

export type DeliveryConfigType = typeof deliveryConfig;
