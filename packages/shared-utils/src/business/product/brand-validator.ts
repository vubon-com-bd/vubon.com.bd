import { isValidSlug } from '../../common/validator/slug.validator';

export interface BrandInput {
  name: string;
  slug: string;
}

export const validateBrand = (
  brand: Partial<BrandInput>
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (!brand.name) errors.push('Brand name is required');
  if (!brand.slug) errors.push('Brand slug is required');
  if (brand.slug && !isValidSlug(brand.slug)) {
    errors.push('Invalid slug format');
  }
  return { isValid: errors.length === 0, errors };
};
