import { StatusObject } from '../common/status.types';
import { DELIVERY_STATUS } from '@vubon/shared-constants/src/logistics/delivery-status.constants';

export interface DeliveryStatus extends StatusObject {
  type: keyof typeof DELIVERY_STATUS | string;
  category: 'delivery';
  isPending: boolean;
  isAssigned: boolean;
  isInTransit: boolean;
  isOutForDelivery: boolean;
  isDelivered: boolean;
  isReturned: boolean;
  isCancelled: boolean;
  isFailed: boolean;
}

export type DeliveryStatusKey = keyof typeof DELIVERY_STATUS;
