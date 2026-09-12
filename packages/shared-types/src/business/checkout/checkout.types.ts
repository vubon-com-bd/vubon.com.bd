import { BaseEntity } from '../../common/base.types';
import { Money } from '../../common/money.types';
import { Cart } from '../cart/cart.types';
import { User } from '../../user/user.types';
import { CHECKOUT_STATUS } from '@vubon/shared-constants/src/business/checkout/checkout-status.constants';
import { BillingAddress } from './billing-address.types';
import { ShippingAddress } from './shipping-address.types';
import { DeliveryMethod } from './delivery-method.types';
import { CheckoutStep } from './checkout-step.types';
import { CheckoutSession } from './checkout-session.types';

export interface CheckoutMetadata {
  ipAddress: string;
  userAgent: string;
  deviceId: string;
  sessionId: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
}

export interface Checkout extends BaseEntity {
  checkoutId: string;
  cartId: string;
  cart: Cart;
  userId: string;
  user: User;
  status: keyof typeof CHECKOUT_STATUS | string;
  steps: CheckoutStep[];
  currentStep: number;
  session: CheckoutSession;
  billingAddress: BillingAddress;
  shippingAddress: ShippingAddress;
  deliveryMethod: DeliveryMethod;
  subtotal: Money;
  discountTotal: Money;
  taxTotal: Money;
  shippingCost: Money;
  grandTotal: Money;
  currency: string;
  isComplete: boolean;
  isExpired: boolean;
  expiresAt: Date;
  completedAt?: Date;
  metadata: CheckoutMetadata;
}
