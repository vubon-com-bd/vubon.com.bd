import { PRODUCT_DEAL } from '@vubon/shared-constants/src/business/flash-sales/product-deal.constants';

export interface ProductDealInput {
  productId: string;
  originalPrice: number;
  dealPrice: number;
  status: string;
}

export const validateProductDeal = (
  deal: Partial<ProductDealInput>
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (!deal.productId) errors.push('Product ID is required');
  if (deal.originalPrice !== undefined && deal.originalPrice < 0) {
    errors.push('Original price cannot be negative');
  }
  if (deal.dealPrice !== undefined && deal.dealPrice < 0) {
    errors.push('Deal price cannot be negative');
  }
  if (
    deal.originalPrice !== undefined &&
    deal.dealPrice !== undefined &&
    deal.dealPrice > deal.originalPrice
  ) {
    errors.push('Deal price cannot be greater than original price');
  }
  if (deal.status && !Object.keys(PRODUCT_DEAL.STATUS).includes(deal.status)) {
    errors.push('Invalid product deal status');
  }
  return { isValid: errors.length === 0, errors };
};
