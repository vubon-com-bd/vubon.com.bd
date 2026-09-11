import { ABANDONED_CART } from '@vubon/shared-constants/src/business/cart/abandoned-cart.constants';

export interface AbandonedCartInput {
  email: string;
  status: string;
}

export const validateAbandonedCart = (
  cart: Partial<AbandonedCartInput>
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (!cart.email) errors.push('Email is required');
  if (cart.status && !Object.keys(ABANDONED_CART.STATUS).includes(cart.status)) {
    errors.push('Invalid abandoned cart status');
  }
  return { isValid: errors.length === 0, errors };
};
