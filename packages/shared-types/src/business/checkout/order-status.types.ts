import { StatusObject } from '../../common/status.types';
import { ORDER_STATUS } from '@vubon/shared-constants/src/business/checkout/order-status.constants';

export interface OrderStatus extends StatusObject {
  type: keyof typeof ORDER_STATUS | string;
  category: 'order';
  isPending: boolean;
  isProcessing: boolean;
  isCompleted: boolean;
  isCancelled: boolean;
  isReturned: boolean;
}

export type OrderStatusKey = keyof typeof ORDER_STATUS;
