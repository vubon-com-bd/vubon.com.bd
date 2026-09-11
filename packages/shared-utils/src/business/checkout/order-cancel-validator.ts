import { ORDER_CANCEL } from '@vubon/shared-constants/src/business/checkout/order-cancel.constants';

export interface OrderCancelInput {
  orderId: string;
  reason: string;
  status: string;
  type: string;
  order: { placedAt: Date };
}

export const validateOrderCancel = (
  cancelData: Partial<OrderCancelInput>
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (!cancelData.orderId) errors.push('Order ID is required');
  if (!cancelData.reason) errors.push('Cancel reason is required');
  if (cancelData.status && !Object.keys(ORDER_CANCEL.STATUS).includes(cancelData.status)) {
    errors.push('Invalid cancel status');
  }
  if (cancelData.type && !Object.keys(ORDER_CANCEL.TYPES).includes(cancelData.type)) {
    errors.push('Invalid cancel type');
  }
  return { isValid: errors.length === 0, errors };
};

export const isCancelValid = (cancelData: OrderCancelInput): boolean => {
  const cancelWindow = 24;
  const orderDate = new Date(cancelData.order.placedAt);
  const hoursSinceOrder = (Date.now() - orderDate.getTime()) / (1000 * 60 * 60);
  return hoursSinceOrder <= cancelWindow && cancelData.status === 'pending';
};
