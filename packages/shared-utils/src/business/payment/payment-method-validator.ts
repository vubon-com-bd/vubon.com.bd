import { PAYMENT_METHOD } from '@vubon/shared-constants/src/business/payment/payment-method.constants';

export interface PaymentMethodInput {
  type: string;
  name: string;
  code: string;
  isActive: boolean;
}

export const validatePaymentMethod = (
  method: Partial<PaymentMethodInput>
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (!method.type) errors.push('Payment method type is required');
  if (method.type && !Object.keys(PAYMENT_METHOD.TYPES).includes(method.type)) {
    errors.push('Invalid payment method type');
  }
  if (!method.name) errors.push('Payment method name is required');
  if (!method.code) errors.push('Payment method code is required');
  return { isValid: errors.length === 0, errors };
};

export const isPaymentMethodActive = (method: PaymentMethodInput): boolean => {
  return method.isActive;
};
