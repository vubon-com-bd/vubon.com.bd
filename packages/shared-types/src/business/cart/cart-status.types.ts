import { StatusObject } from '../../common/status.types';
import { CART_STATUS } from '@vubon/shared-constants/src/business/cart/cart-status.constants';

export interface CartStatus extends StatusObject {
  type: keyof typeof CART_STATUS | string;
  category: 'cart';
  isActive: boolean;
  isExpired: boolean;
  isAbandoned: boolean;
  isCheckedOut: boolean;
}

export type CartStatusKey = keyof typeof CART_STATUS;
