import { STATUS as COMMON_STATUS } from '../common/status.constants';

export const SHIPMENT_STATUS = {
  ...COMMON_STATUS,
  CREATED: 'created',
  PENDING: 'pending',
  PROCESSING: 'processing',
  PACKED: 'packed',
  LABEL_GENERATED: 'label_generated',
  READY_TO_SHIP: 'ready_to_ship',
  PICKED_UP: 'picked_up',
  IN_TRANSIT: 'in_transit',
  OUT_FOR_DELIVERY: 'out_for_delivery',
  DELIVERED: 'delivered',
  DELIVERY_ATTEMPTED: 'delivery_attempted',
  RETURNED: 'returned',
  CANCELLED: 'cancelled',
  FAILED: 'failed',
  LOST: 'lost',
  DAMAGED: 'damaged',
} as const;
