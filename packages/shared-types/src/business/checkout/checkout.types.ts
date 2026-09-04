/**
 * Checkout Types
 * চেকআউট সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../../common/base.entity';
import { User } from '../../common/user';
import { Cart } from '../cart/cart.types';
import { CHECKOUT_STATUS } from '@vubon/shared-constants';
import { BillingAddress } from './billing-address.types';
import { ShippingAddress } from './shipping-address.types';
import { DeliveryMethod } from './delivery-method.types';
import { CheckoutStep } from './checkout-step.types';

export interface Checkout extends BaseEntity {
  userId: string;
  user?: User;
  cartId: string;
  cart: Cart;
  status: (typeof CHECKOUT_STATUS)[keyof typeof CHECKOUT_STATUS];
  steps: CheckoutStep[];
  currentStep: number;
  billingAddress?: BillingAddress;
  shippingAddress?: ShippingAddress;
  deliveryMethod?: DeliveryMethod;
  subtotal: number;
  discount: number;
  tax: number;
  shipping: number;
  total: number;
  currency: string;
  note?: string;
  sessionId: string;
  expiresAt: Date;
  completedAt?: Date;
  cancelledAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface CheckoutCreateInput {
  userId: string;
  cartId: string;
  currency?: string;
  note?: string;
  expiresAt?: Date;
}

export interface CheckoutUpdateInput {
  status?: (typeof CHECKOUT_STATUS)[keyof typeof CHECKOUT_STATUS];
  currentStep?: number;
  billingAddress?: BillingAddress;
  shippingAddress?: ShippingAddress;
  deliveryMethod?: DeliveryMethod;
  note?: string;
  completedAt?: Date;
  cancelledAt?: Date;
}

export interface CheckoutResponse {
  checkout: Checkout;
}

export interface CheckoutSummary {
  subtotal: number;
  discount: number;
  tax: number;
  shipping: number;
  total: number;
  savings: number;
  itemCount: number;
}
