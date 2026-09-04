/**
 * Cart Types
 * কার্ট সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../../common/base.entity';
import { User } from '../../common/user';
import { Product } from '../product/product.types';
import { CART_STATUS } from '@vubon/shared-constants';
import { CartItem } from './cart-item.types';
import { CartCoupon } from './cart-coupon.types';
import { CartPromotion } from './cart-promotion.types';

export interface Cart extends BaseEntity {
  userId: string;
  user?: User;
  sessionId?: string;
  items: CartItem[];
  coupons: CartCoupon[];
  promotions: CartPromotion[];
  subtotal: number;
  discount: number;
  tax: number;
  shipping: number;
  total: number;
  status: (typeof CART_STATUS)[keyof typeof CART_STATUS];
  currency: string;
  note?: string;
  expiresAt?: Date;
  abandonedAt?: Date;
  convertedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface CartCreateInput {
  userId?: string;
  sessionId?: string;
  currency?: string;
  note?: string;
}

export interface CartUpdateInput {
  status?: (typeof CART_STATUS)[keyof typeof CART_STATUS];
  note?: string;
  items?: CartItem[];
  coupons?: CartCoupon[];
}

export interface CartResponse {
  cart: Cart;
}

export interface CartSummary {
  itemCount: number;
  subtotal: number;
  discount: number;
  tax: number;
  shipping: number;
  total: number;
  savings: number;
  couponSavings: number;
  promotionSavings: number;
  products: Product[];
}
