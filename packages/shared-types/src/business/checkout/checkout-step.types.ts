/**
 * Checkout Step Types
 * চেকআউট স্টেপ সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../../common/base.entity';
import { CHECKOUT_STEPS } from '@vubon/shared-constants';

export interface CheckoutStep extends BaseEntity {
  checkoutId: string;
  step: (typeof CHECKOUT_STEPS)[keyof typeof CHECKOUT_STEPS];
  status: 'pending' | 'in_progress' | 'completed' | 'failed' | 'skipped';
  data?: Record<string, string | number | boolean | object>;
  error?: string;
  startedAt?: Date;
  completedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface CheckoutStepCreateInput {
  checkoutId: string;
  step: (typeof CHECKOUT_STEPS)[keyof typeof CHECKOUT_STEPS];
  data?: Record<string, string | number | boolean | object>;
}

export interface CheckoutStepUpdateInput {
  status?: 'pending' | 'in_progress' | 'completed' | 'failed' | 'skipped';
  data?: Record<string, string | number | boolean | object>;
  error?: string;
  startedAt?: Date;
  completedAt?: Date;
}

export interface CheckoutStepResponse {
  checkoutStep: CheckoutStep;
}
