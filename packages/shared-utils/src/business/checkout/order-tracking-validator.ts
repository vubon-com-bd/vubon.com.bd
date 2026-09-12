import { ORDER_TRACKING } from '@vubon/shared-constants/src/business/checkout/order-tracking.constants';

export interface OrderTrackingInput {
  orderId: string;
  trackingNumber: string;
  carrier: string;
  status: string;
  isDelivered: boolean;
}

export const validateOrderTracking = (
  tracking: Partial<OrderTrackingInput>
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (!tracking.orderId) errors.push('Order ID is required');
  if (!tracking.trackingNumber) errors.push('Tracking number is required');
  if (!tracking.carrier) errors.push('Carrier is required');
  if (tracking.status && !Object.keys(ORDER_TRACKING.STATUS).includes(tracking.status)) {
    errors.push('Invalid tracking status');
  }
  return { isValid: errors.length === 0, errors };
};

export const isTrackingDelivered = (tracking: OrderTrackingInput): boolean => {
  return tracking.status === 'delivered' || tracking.isDelivered;
};
