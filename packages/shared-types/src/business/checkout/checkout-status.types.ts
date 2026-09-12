import { StatusObject } from '../../common/status.types';
import { CHECKOUT_STATUS } from '@vubon/shared-constants/src/business/checkout/checkout-status.constants';

export interface CheckoutStatus extends StatusObject {
  type: keyof typeof CHECKOUT_STATUS | string;
  category: 'checkout';
  isActive: boolean;
  isComplete: boolean;
  isAbandoned: boolean;
  isExpired: boolean;
}

export type CheckoutStatusKey = keyof typeof CHECKOUT_STATUS;
