import { ORDER_STATUS } from '@vubon/shared-constants/src/business/checkout/order-status.constants';

export const validateOrderStatus = (status: string): boolean => {
  return Object.keys(ORDER_STATUS).includes(status);
};

export const getNextOrderStatus = (currentStatus: string): string | null => {
  const flow = ['pending', 'processing', 'shipped', 'delivered', 'completed'];
  const index = flow.indexOf(currentStatus);
  if (index === -1 || index === flow.length - 1) return null;
  return flow[index + 1];
};

export const isOrderCompleted = (status: string): boolean => {
  return status === 'completed' || status === 'delivered';
};

export const isOrderCancellable = (status: string): boolean => {
  return ['pending', 'processing'].includes(status);
};
