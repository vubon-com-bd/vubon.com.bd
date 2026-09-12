import { CART_ITEM } from '@vubon/shared-constants/src/business/cart/cart-item.constants';

export interface CartItemInput {
  productId: string;
  quantity: number;
  status: string;
  isSelected: boolean;
  maxQuantity: number;
}

export const validateCartItem = (
  item: Partial<CartItemInput>
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (!item.productId) errors.push('Product ID is required');
  if (item.quantity !== undefined && (item.quantity < 1 || item.quantity > 99)) {
    errors.push('Quantity must be between 1 and 99');
  }
  if (item.status && !Object.keys(CART_ITEM.STATUS).includes(item.status)) {
    errors.push('Invalid cart item status');
  }
  return { isValid: errors.length === 0, errors };
};

export const isCartItemValid = (item: CartItemInput): boolean => {
  return item.isSelected && item.quantity > 0 && item.quantity <= item.maxQuantity;
};
