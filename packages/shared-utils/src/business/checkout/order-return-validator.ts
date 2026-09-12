import { ORDER_RETURN } from '@vubon/shared-constants/src/business/checkout/order-return.constants';

export interface OrderReturnInput {
  orderId: string;
  reason: string;
  status: string;
  type: string;
  order: { placedAt: Date };
}

export const validateOrderReturn = (
  returnData: Partial<OrderReturnInput>
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (!returnData.orderId) errors.push('Order ID is required');
  if (!returnData.reason) errors.push('Return reason is required');
  if (returnData.status && !Object.keys(ORDER_RETURN.STATUS).includes(returnData.status)) {
    errors.push('Invalid return status');
  }
  if (returnData.type && !Object.keys(ORDER_RETURN.TYPES).includes(returnData.type)) {
    errors.push('Invalid return type');
  }
  return { isValid: errors.length === 0, errors };
};

export const isReturnValid = (returnData: OrderReturnInput): boolean => {
  const returnWindow = 30;
  const orderDate = new Date(returnData.order.placedAt);
  const daysSinceOrder = (Date.now() - orderDate.getTime()) / (1000 * 60 * 60 * 24);
  return daysSinceOrder <= returnWindow && returnData.status === 'pending';
};
