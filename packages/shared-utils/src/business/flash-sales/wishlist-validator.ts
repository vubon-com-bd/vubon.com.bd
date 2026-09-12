import { FLASH_SALE_WISHLIST } from '@vubon/shared-constants/src/business/flash-sales/flash-sale-wishlist.constants';

export interface WishlistInput {
  userId: string;
  productId: string;
  status: string;
}

export const validateWishlist = (
  wishlist: Partial<WishlistInput>
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (!wishlist.userId) errors.push('User ID is required');
  if (!wishlist.productId) errors.push('Product ID is required');
  if (wishlist.status && !Object.keys(FLASH_SALE_WISHLIST.STATUS).includes(wishlist.status)) {
    errors.push('Invalid wishlist status');
  }
  return { isValid: errors.length === 0, errors };
};
