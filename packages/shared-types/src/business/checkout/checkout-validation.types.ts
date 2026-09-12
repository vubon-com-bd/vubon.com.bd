import { BaseEntity } from '../../common/base.types';
import { Checkout } from './checkout.types';

export interface CheckoutValidationRule {
  field: string;
  rule: string;
  params?: unknown[];
  message: string;
}

export interface CheckoutValidationError {
  field: string;
  message: string;
  code: string;
  value?: unknown;
}

export interface CheckoutValidationWarning {
  field: string;
  message: string;
  code: string;
  value?: unknown;
}

export interface CheckoutValidation extends BaseEntity {
  validationId: string;
  checkoutId: string;
  checkout: Checkout;
  rules: CheckoutValidationRule[];
  isValid: boolean;
  errors: CheckoutValidationError[];
  warnings: CheckoutValidationWarning[];
  validatedAt: Date;
  metadata: Record<string, unknown>;
}
