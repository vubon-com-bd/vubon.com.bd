import { isValidSlug } from '../../common/validator/slug.validator';
import { PRODUCT_STATUS } from '@vubon/shared-constants/src/business/product/product-status.constants';
import { PRODUCT_TYPES } from '@vubon/shared-constants/src/business/product/product-type.constants';

export interface ProductInput {
  name: string;
  slug: string;
  description: string;
  status: string;
  type: string;
}

export const validateProduct = (
  product: Partial<ProductInput>
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (!product.name) errors.push('Product name is required');
  if (!product.slug) errors.push('Product slug is required');
  if (product.slug && !isValidSlug(product.slug)) {
    errors.push('Invalid slug format');
  }
  if (!product.description) errors.push('Product description is required');
  if (product.status && !Object.keys(PRODUCT_STATUS).includes(product.status)) {
    errors.push('Invalid product status');
  }
  if (product.type && !Object.keys(PRODUCT_TYPES).includes(product.type)) {
    errors.push('Invalid product type');
  }
  return { isValid: errors.length === 0, errors };
};

export const validateProductSlug = (slug: string): boolean => {
  return isValidSlug(slug);
};

export const validateProductStatus = (status: string): boolean => {
  return Object.keys(PRODUCT_STATUS).includes(status);
};
