import { STATUS as COMMON_STATUS } from '../common/status.constants';

export const DELIVERY_STATUS = {
  ...COMMON_STATUS,
  PENDING: 'pending',
  PROCESSING: 'processing',
  ASSIGNED: 'assigned',
  PICKED_UP: 'picked_up',
  IN_TRANSIT: 'in_transit',
  OUT_FOR_DELIVERY: 'out_for_delivery',
  DELIVERED: 'delivered',
  DELIVERY_ATTEMPTED: 'delivery_attempted',
  RESCHEDULED: 'rescheduled',
  RETURNED: 'returned',
  CANCELLED: 'cancelled',
  FAILED: 'failed',
  COMPLETED: 'completed',
} as const;
