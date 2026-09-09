import { BaseEntity } from '../../common/base.types';
import { Money } from '../../common/money.types';
import { User } from '../../user/user.types';
import { CART_STATUS } from '@vubon/shared-constants/src/business/cart/cart-status.constants';
import { CartItem } from './cart-item.types';
import { CartCoupon } from './cart-coupon.types';
import { CartPromotion } from './cart-promotion.types';
import { CartGuest } from './cart-guest.types';

export interface CartMetadata {
  source: string;
  device: string;
  ipAddress: string;
  userAgent: string;
  referrer?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
}

export interface CartSummary {
  subtotal: Money;
  discountTotal: Money;
  taxTotal: Money;
  shippingTotal: Money;
  grandTotal: Money;
  itemCount: number;
  totalQuantity: number;
}

export interface Cart extends BaseEntity {
  cartId: string;
  userId?: string;
  user?: User;
  guestId?: string;
  guest?: CartGuest;
  status: keyof typeof CART_STATUS | string;
  items: CartItem[];
  itemCount: number;
  totalQuantity: number;
  subtotal: Money;
  discountTotal: Money;
  taxTotal: Money;
  shippingTotal: Money;
  grandTotal: Money;
  coupons: CartCoupon[];
  promotions: CartPromotion[];
  currency: string;
  isActive: boolean;
  isLocked: boolean;
  isExpired: boolean;
  expiresAt?: Date;
  lastActivity: Date;
  metadata: CartMetadata;
}
