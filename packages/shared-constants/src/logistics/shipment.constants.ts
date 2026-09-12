import { STATUS as COMMON_STATUS } from '../common/status.constants';
import { ORDER_STATUS } from '../business/checkout/order-status.constants';
import { VENDOR_STATUS } from '../business/vendor/vendor-status.constants';

export const SHIPMENT = {
  STATUS: {
    ...COMMON_STATUS,
    PENDING: 'pending',
    PROCESSING: 'processing',
    PACKED: 'packed',
    READY_TO_SHIP: 'ready_to_ship',
    IN_TRANSIT: 'in_transit',
    OUT_FOR_DELIVERY: 'out_for_delivery',
    DELIVERED: 'delivered',
    DELIVERY_ATTEMPTED: 'delivery_attempted',
    RETURNED: 'returned',
    CANCELLED: 'cancelled',
    FAILED: 'failed',
  },
  ORDER_STATUS: { ...ORDER_STATUS },
  VENDOR_STATUS: { ...VENDOR_STATUS },
  SHIPMENT_TYPES: {
    STANDARD: 'standard',
    EXPRESS: 'express',
    OVERNIGHT: 'overnight',
    INTERNATIONAL: 'international',
  },
  SHIPMENT_PRIORITY: {
    LOW: 1,
    MEDIUM: 2,
    HIGH: 3,
    URGENT: 4,
  },
  MAX_ITEMS_PER_SHIPMENT: 100,
  SHIPMENT_NUMBER_PREFIX: 'SHP',
} as const;
