import { ORDER_FULFILLMENT } from '@vubon/shared-constants/src/business/checkout/order-fulfillment.constants';

export interface OrderFulfillmentInput {
  orderId: string;
  warehouseId: string;
  status: string;
  type: string;
}

export const validateOrderFulfillment = (
  fulfillment: Partial<OrderFulfillmentInput>
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (!fulfillment.orderId) errors.push('Order ID is required');
  if (!fulfillment.warehouseId) errors.push('Warehouse ID is required');
  if (fulfillment.status && !Object.keys(ORDER_FULFILLMENT.STATUS).includes(fulfillment.status)) {
    errors.push('Invalid fulfillment status');
  }
  if (fulfillment.type && !Object.keys(ORDER_FULFILLMENT.TYPES).includes(fulfillment.type)) {
    errors.push('Invalid fulfillment type');
  }
  return { isValid: errors.length === 0, errors };
};

export const isFulfillmentComplete = (fulfillment: OrderFulfillmentInput): boolean => {
  return fulfillment.status === 'completed' || fulfillment.status === 'delivered';
};
