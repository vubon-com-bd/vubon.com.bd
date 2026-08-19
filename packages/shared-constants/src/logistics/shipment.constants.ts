/**
 * শিপমেন্ট সম্পর্কিত মৌলিক কনস্ট্যান্টসমূহ
 */

/**
 * শিপমেন্ট নম্বরের প্রিফিক্স
 */
export const SHIPMENT_PREFIX = 'SHP-' as const;

/**
 * শিপমেন্ট নম্বরের ফরম্যাট
 */
export const SHIPMENT_NUMBER_FORMAT = {
  PREFIX: SHIPMENT_PREFIX,
  SEPARATOR: '-',
  DATE_FORMAT: 'YYYYMMDD',
  RANDOM_LENGTH: 6,
} as const;

/**
 * শিপমেন্টের সর্বোচ্চ ওজন (কেজি)
 */
export const MAX_SHIPMENT_WEIGHT_KG = 100;

/**
 * শিপমেন্টের সর্বোচ্চ আইটেম সংখ্যা
 */
export const MAX_SHIPMENT_ITEMS = 50;

/**
 * ডিফল্ট শিপমেন্ট টাইমআউট (ঘন্টায়)
 */
export const DEFAULT_SHIPMENT_TIMEOUT_HOURS = 72;

/**
 * শিপমেন্ট ক্যালকুলেশন ফর্মুলা সম্পর্কিত কনস্ট্যান্ট
 */
export const SHIPMENT_CALCULATION = {
  // বেস চার্জ
  BASE_CHARGE: 50,

  // প্রতি কেজি অতিরিক্ত চার্জ
  EXTRA_CHARGE_PER_KG: 10,

  // প্রতি আইটেম অতিরিক্ত চার্জ
  EXTRA_CHARGE_PER_ITEM: 5,

  // ভারী প্যাকেজের জন্য অতিরিক্ত চার্জ (২০ কেজির বেশি)
  HEAVY_PACKAGE_EXTRA: 25,

  // দ্রুত ডেলিভারির জন্য অতিরিক্ত চার্জ
  EXPRESS_DELIVERY_EXTRA: 30,

  // সুরক্ষা বীমা চার্জ (শতাংশ)
  INSURANCE_CHARGE_PERCENT: 2.5,

  // সিএসডি চার্জ (শতাংশ)
  COD_CHARGE_PERCENT: 1.5,

  // ভ্যাট (শতাংশ)
  VAT_PERCENT: 5,

  // ডিসকাউন্ট শতাংশ
  DISCOUNT_PERCENT: 10,
} as const;

/**
 * শিপমেন্ট ক্যালকুলেশন টাইপ
 */
export type ShipmentCalculation = typeof SHIPMENT_CALCULATION;

/**
 * শিপমেন্ট স্ট্যাটাস
 */
export const SHIPMENT_STATUS = {
  CREATED: 'created',
  PROCESSING: 'processing',
  READY_TO_SHIP: 'ready_to_ship',
  SHIPPED: 'shipped',
  IN_TRANSIT: 'in_transit',
  OUT_FOR_DELIVERY: 'out_for_delivery',
  DELIVERED: 'delivered',
  RETURNED: 'returned',
  CANCELLED: 'cancelled',
  FAILED: 'failed',
  HOLD: 'hold',
} as const;

/**
 * শিপমেন্ট স্ট্যাটাস টাইপ
 */
export type ShipmentStatus = (typeof SHIPMENT_STATUS)[keyof typeof SHIPMENT_STATUS];

/**
 * শিপমেন্ট টাইপ
 */
export const SHIPMENT_TYPES = {
  STANDARD: 'standard',
  EXPRESS: 'express',
  SAME_DAY: 'same_day',
  NEXT_DAY: 'next_day',
  SCHEDULED: 'scheduled',
  ECONOMY: 'economy',
  INTERNATIONAL: 'international',
} as const;

/**
 * শিপমেন্ট টাইপ টাইপ
 */
export type ShipmentType = (typeof SHIPMENT_TYPES)[keyof typeof SHIPMENT_TYPES];

/**
 * শিপমেন্ট প্যাকেজিং টাইপ
 */
export const PACKAGING_TYPES = {
  BOX: 'box',
  ENVELOPE: 'envelope',
  PACKET: 'packet',
  TUBE: 'tube',
  PALLET: 'pallet',
  CRATE: 'crate',
  BAG: 'bag',
  CUSTOM: 'custom',
} as const;

/**
 * শিপমেন্ট প্যাকেজিং টাইপ টাইপ
 */
export type PackagingType = (typeof PACKAGING_TYPES)[keyof typeof PACKAGING_TYPES];

/**
 * শিপমেন্ট ডেলিভারি অপশন
 */
export const DELIVERY_OPTIONS = {
  DOOR_TO_DOOR: 'door_to_door',
  DOOR_TO_OFFICE: 'door_to_office',
  OFFICE_TO_DOOR: 'office_to_door',
  OFFICE_TO_OFFICE: 'office_to_office',
  PICKUP_POINT: 'pickup_point',
} as const;

/**
 * শিপমেন্ট ডেলিভারি অপশন টাইপ
 */
export type DeliveryOption = (typeof DELIVERY_OPTIONS)[keyof typeof DELIVERY_OPTIONS];

/**
 * শিপমেন্ট কনফিগারেশন অবজেক্ট
 */
export const SHIPMENT_CONFIG = {
  PREFIX: SHIPMENT_PREFIX,
  NUMBER_FORMAT: SHIPMENT_NUMBER_FORMAT,
  MAX_WEIGHT: MAX_SHIPMENT_WEIGHT_KG,
  MAX_ITEMS: MAX_SHIPMENT_ITEMS,
  DEFAULT_TIMEOUT: DEFAULT_SHIPMENT_TIMEOUT_HOURS,
  CALCULATION: SHIPMENT_CALCULATION,
  STATUS: SHIPMENT_STATUS,
  TYPES: SHIPMENT_TYPES,
  PACKAGING: PACKAGING_TYPES,
  DELIVERY_OPTIONS,
} as const;

/**
 * শিপমেন্ট কনফিগারেশন টাইপ
 */
export type ShipmentConfig = typeof SHIPMENT_CONFIG;

/**
 * শিপমেন্ট ট্র্যাকিং ইভেন্ট
 */
export const TRACKING_EVENTS = {
  LABEL_CREATED: 'label_created',
  PICKUP_SCHEDULED: 'pickup_scheduled',
  PICKED_UP: 'picked_up',
  SORTED: 'sorted',
  DEPARTED: 'departed',
  ARRIVED: 'arrived',
  OUT_FOR_DELIVERY: 'out_for_delivery',
  DELIVERY_ATTEMPT: 'delivery_attempt',
  DELIVERED: 'delivered',
  RETURN_INITIATED: 'return_initiated',
  RETURNED: 'returned',
} as const;

/**
 * শিপমেন্ট ট্র্যাকিং ইভেন্ট টাইপ
 */
export type TrackingEvent = (typeof TRACKING_EVENTS)[keyof typeof TRACKING_EVENTS];

/**
 * ডিফল্ট শিপমেন্ট সেটিংস
 */
export const DEFAULT_SHIPMENT_SETTINGS = {
  DEFAULT_WEIGHT_KG: 1,
  DEFAULT_QUANTITY: 1,
  DEFAULT_DELIVERY_TYPE: SHIPMENT_TYPES.STANDARD,
  DEFAULT_PACKAGING_TYPE: PACKAGING_TYPES.BOX,
  DEFAULT_DELIVERY_OPTION: DELIVERY_OPTIONS.DOOR_TO_DOOR,
  DEFAULT_INSURED: false,
  DEFAULT_COD: false,
  DEFAULT_PRIORITY: 'normal',
} as const;

/**
 * ডিফল্ট শিপমেন্ট সেটিংস টাইপ
 */
export type DefaultShipmentSettings = typeof DEFAULT_SHIPMENT_SETTINGS;
