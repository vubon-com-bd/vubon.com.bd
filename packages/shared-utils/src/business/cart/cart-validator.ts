import { CART_STATUS } from '@vubon/shared-constants/src/business/cart/cart-status.constants';

export interface CartInput {
  status: string;
  items: unknown[];
  isActive: boolean;
  isExpired: boolean;
  expiresAt?: Date;
}

export const validateCart = (cart: Partial<CartInput>): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (cart.status && !Object.keys(CART_STATUS).includes(cart.status)) {
    errors.push('Invalid cart status');
  }
  if (cart.items && cart.items.length > 100) {
    errors.push('Cart cannot have more than 100 items');
  }
  return { isValid: errors.length === 0, errors };
};

export const isCartValid = (cart: CartInput): boolean => {
  return cart.isActive && !cart.isExpired && cart.items.length > 0;
};

export const isCartExpired = (cart: CartInput): boolean => {
  return cart.isExpired || (!!cart.expiresAt && new Date(cart.expiresAt) < new Date());
};
