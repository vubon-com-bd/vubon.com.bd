import { isValidSlug } from '../../common/validator/slug.validator';
import { CATEGORY } from '@vubon/shared-constants/src/business/product/category.constants';

export interface CategoryInput {
  name: string;
  slug: string;
  status: string;
}

export const validateCategory = (
  category: Partial<CategoryInput>
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (!category.name) errors.push('Category name is required');
  if (!category.slug) errors.push('Category slug is required');
  if (category.slug && !isValidSlug(category.slug)) {
    errors.push('Invalid slug format');
  }
  if (category.status && !Object.keys(CATEGORY.STATUS).includes(category.status)) {
    errors.push('Invalid category status');
  }
  return { isValid: errors.length === 0, errors };
};
