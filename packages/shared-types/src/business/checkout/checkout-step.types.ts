import { BaseEntity } from '../../common/base.types';
import { CHECKOUT_STEP } from '@vubon/shared-constants/src/business/checkout/checkout-step.constants';
import { Checkout } from './checkout.types';

export interface CheckoutStep extends BaseEntity {
  stepId: string;
  checkoutId: string;
  checkout: Checkout;
  type: keyof typeof CHECKOUT_STEP | string;
  order: number;
  isCompleted: boolean;
  isActive: boolean;
  startedAt?: Date;
  completedAt?: Date;
  metadata: Record<string, unknown>;
}
