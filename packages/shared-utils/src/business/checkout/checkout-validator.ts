import { CHECKOUT_STATUS } from '@vubon/shared-constants/src/business/checkout/checkout-status.constants';

export interface CheckoutInput {
  cartId: string;
  userId: string;
  status: string;
  currentStep: number;
  isComplete: boolean;
  isExpired: boolean;
  expiresAt?: Date;
}

export const validateCheckout = (
  checkout: Partial<CheckoutInput>
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (!checkout.cartId) errors.push('Cart ID is required');
  if (!checkout.userId) errors.push('User ID is required');
  if (checkout.status && !Object.keys(CHECKOUT_STATUS).includes(checkout.status)) {
    errors.push('Invalid checkout status');
  }
  if (checkout.currentStep !== undefined && checkout.currentStep < 0) {
    errors.push('Invalid step number');
  }
  return { isValid: errors.length === 0, errors };
};

export const isCheckoutComplete = (checkout: CheckoutInput): boolean => {
  return checkout.isComplete && checkout.status === 'completed';
};

export const isCheckoutExpired = (checkout: CheckoutInput): boolean => {
  return checkout.isExpired || (!!checkout.expiresAt && new Date(checkout.expiresAt) < new Date());
};
