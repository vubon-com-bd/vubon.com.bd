import { STATUS as COMMON_STATUS } from '../common/status.constants';
import { ORDER_RETURN } from '../business/checkout/order-return.constants';
import { SHIPMENT_STATUS } from './shipment-status.constants';
import { RETURN_REASON } from './return-reason.constants';

export const RETURN_SHIPMENT = {
  STATUS: {
    ...COMMON_STATUS,
    ...SHIPMENT_STATUS,
    REQUESTED: 'requested',
    APPROVED: 'approved',
    REJECTED: 'rejected',
    PICKUP_SCHEDULED: 'pickup_scheduled',
    PICKED_UP: 'picked_up',
    IN_TRANSIT: 'in_transit',
    RECEIVED: 'received',
    INSPECTED: 'inspected',
    COMPLETED: 'completed',
  },
  ORDER_RETURN: { ...ORDER_RETURN },
  SHIPMENT_STATUS: { ...SHIPMENT_STATUS },
  RETURN_REASON: { ...RETURN_REASON },
  RETURN_SHIPMENT_TYPES: {
    CUSTOMER_INITIATED: 'customer_initiated',
    VENDOR_INITIATED: 'vendor_initiated',
    SYSTEM_INITIATED: 'system_initiated',
  },
  RETURN_WINDOW_DAYS: 30,
  RETURN_SHIPPING_COST: {
    CUSTOMER_PAYS: 'customer_pays',
    VENDOR_PAYS: 'vendor_pays',
    PLATFORM_PAYS: 'platform_pays',
  },
  MAX_RETURN_ITEMS: 20,
} as const;
