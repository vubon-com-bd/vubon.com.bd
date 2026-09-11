import { VARIANT } from '@vubon/shared-constants/src/business/product/variant.constants';

export interface VariantInput {
  name: string;
  sku: string;
  status: string;
}

export const validateVariant = (
  variant: Partial<VariantInput>
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (!variant.name) errors.push('Variant name is required');
  if (!variant.sku) errors.push('Variant SKU is required');
  if (variant.status && !Object.keys(VARIANT.STATUS).includes(variant.status)) {
    errors.push('Invalid variant status');
  }
  return { isValid: errors.length === 0, errors };
};
