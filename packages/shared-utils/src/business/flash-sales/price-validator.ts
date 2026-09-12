import { FLASH_SALE_PRICE } from '@vubon/shared-constants/src/business/flash-sales/flash-sale-price.constants';

export interface PriceInput {
  productId: string;
  type: string;
  originalPrice: number;
  flashPrice: number;
}

export const validateFlashSalePrice = (
  price: Partial<PriceInput>
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (!price.productId) errors.push('Product ID is required');
  if (price.type && !Object.keys(FLASH_SALE_PRICE.PRICE_TYPES).includes(price.type)) {
    errors.push('Invalid price type');
  }
  if (price.originalPrice !== undefined && price.originalPrice < 0) {
    errors.push('Original price cannot be negative');
  }
  if (price.flashPrice !== undefined && price.flashPrice < 0) {
    errors.push('Flash price cannot be negative');
  }
  if (
    price.originalPrice !== undefined &&
    price.flashPrice !== undefined &&
    price.flashPrice > price.originalPrice
  ) {
    errors.push('Flash price cannot be greater than original price');
  }
  return { isValid: errors.length === 0, errors };
};
