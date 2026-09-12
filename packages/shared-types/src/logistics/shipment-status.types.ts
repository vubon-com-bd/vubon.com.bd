import { StatusObject } from '../common/status.types';
import { SHIPMENT_STATUS } from '@vubon/shared-constants/src/logistics/shipment-status.constants';

export interface ShipmentStatus extends StatusObject {
  type: keyof typeof SHIPMENT_STATUS | string;
  category: 'shipment';
  isCreated: boolean;
  isPending: boolean;
  isProcessing: boolean;
  isShipped: boolean;
  isDelivered: boolean;
  isReturned: boolean;
  isCancelled: boolean;
  isFailed: boolean;
  isLost: boolean;
  isDamaged: boolean;
}

export type ShipmentStatusKey = keyof typeof SHIPMENT_STATUS;
