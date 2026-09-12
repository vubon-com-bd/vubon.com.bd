import { BaseEntity } from '../../common/base.types';
import { CHECKOUT_SESSION } from '@vubon/shared-constants/src/business/checkout/checkout-session.constants';
import { Checkout } from './checkout.types';

export interface CheckoutSession extends BaseEntity {
  sessionId: string;
  checkoutId: string;
  checkout: Checkout;
  token: string;
  status: keyof typeof CHECKOUT_SESSION.STATUS | string;
  ipAddress: string;
  userAgent: string;
  deviceId: string;
  expiresAt: Date;
  lastActivity: Date;
  isActive: boolean;
  metadata: Record<string, unknown>;
}
