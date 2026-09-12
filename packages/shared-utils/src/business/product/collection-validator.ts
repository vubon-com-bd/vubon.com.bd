import { isValidSlug } from '../../common/validator/slug.validator';
import { COLLECTION } from '@vubon/shared-constants/src/business/product/collection.constants';

export interface CollectionInput {
  name: string;
  slug: string;
  status: string;
}

export const validateCollection = (
  collection: Partial<CollectionInput>
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (!collection.name) errors.push('Collection name is required');
  if (!collection.slug) errors.push('Collection slug is required');
  if (collection.slug && !isValidSlug(collection.slug)) {
    errors.push('Invalid slug format');
  }
  if (collection.status && !Object.keys(COLLECTION.STATUS).includes(collection.status)) {
    errors.push('Invalid collection status');
  }
  return { isValid: errors.length === 0, errors };
};
