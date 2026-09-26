import { STATUS as COMMON_STATUS } from '../common/status.constants';

export const SHIPMENT_STATUS = {
  PENDING: COMMON_STATUS.PENDING,
  CONFIRMED: 'confirmed',
  PROCESSING: 'processing',
  PACKED: 'packed',
  PICKED_UP: 'picked_up',
  IN_TRANSIT: 'in_transit',
  OUT_FOR_DELIVERY: 'out_for_delivery',
  DELIVERED: 'delivered',
  FAILED: 'failed',
  RETURNED: 'returned',
  CANCELLED: 'cancelled',
  ON_HOLD: 'on_hold',
  DELAYED: 'delayed',
} as const;

export const SHIPMENT_TYPE = {
  STANDARD: 'standard',
  EXPRESS: 'express',
  SAME_DAY: 'same_day',
  NEXT_DAY: 'next_day',
  OVERNIGHT: 'overnight',
  INTERNATIONAL: 'international',
  FREIGHT: 'freight',
  BULK: 'bulk',
} as const;

export const SHIPMENT_PRIORITY = {
  LOW: 'low',
  NORMAL: 'normal',
  HIGH: 'high',
  URGENT: 'urgent',
} as const;

export const SHIPMENT = {
  STATUS: SHIPMENT_STATUS,
  TYPE: SHIPMENT_TYPE,
  PRIORITY: SHIPMENT_PRIORITY,
  TRACKING_NUMBER_LENGTH: 16,
  TRACKING_NUMBER_PREFIX: 'SH',
  MAX_ITEMS_PER_SHIPMENT: 100,
  MAX_WEIGHT_KG: 500,
  MAX_VOLUME_M3: 2,
  MAX_DECLARED_VALUE: 10000000,
  MAX_ATTEMPTS: 3,
  AUTO_GENERATE_LABEL: true,
  REQUIRE_SIGNATURE: false,
  ALLOW_INSURANCE: true,
} as const;

export type ShipmentStatusType = (typeof SHIPMENT_STATUS)[keyof typeof SHIPMENT_STATUS];
export type ShipmentTypeType = (typeof SHIPMENT_TYPE)[keyof typeof SHIPMENT_TYPE];
export type ShipmentPriorityType = (typeof SHIPMENT_PRIORITY)[keyof typeof SHIPMENT_PRIORITY];
