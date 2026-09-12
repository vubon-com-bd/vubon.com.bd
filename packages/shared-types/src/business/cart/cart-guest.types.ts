import { BaseEntity } from '../../common/base.types';
import { CART_GUEST } from '@vubon/shared-constants/src/business/cart/cart-guest.constants';
import { Cart } from './cart.types';

export interface CartGuest extends BaseEntity {
  guestId: string;
  cartId: string;
  cart: Cart;
  status: keyof typeof CART_GUEST.STATUS | string;
  email?: string;
  phone?: string;
  deviceId: string;
  ipAddress: string;
  userAgent: string;
  sessionId: string;
  expiresAt: Date;
  convertedToUserId?: string;
  convertedAt?: Date;
  metadata: Record<string, unknown>;
}
