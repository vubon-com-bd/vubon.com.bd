import { StatusObject } from '../../common/status.types';
import { PAYMENT_STATUS } from '@vubon/shared-constants/src/business/payment/payment-status.constants';

export interface PaymentStatus extends StatusObject {
  type: keyof typeof PAYMENT_STATUS | string;
  category: 'payment';
  isPending: boolean;
  isProcessing: boolean;
  isCompleted: boolean;
  isFailed: boolean;
  isRefunded: boolean;
  isAuthorized: boolean;
  isCaptured: boolean;
}

export type PaymentStatusKey = keyof typeof PAYMENT_STATUS;
