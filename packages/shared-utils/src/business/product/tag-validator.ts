import { isValidSlug } from '../../common/validator/slug.validator';

export interface TagInput {
  name: string;
  slug: string;
}

export const validateTag = (tag: Partial<TagInput>): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (!tag.name) errors.push('Tag name is required');
  if (!tag.slug) errors.push('Tag slug is required');
  if (tag.slug && !isValidSlug(tag.slug)) {
    errors.push('Invalid slug format');
  }
  return { isValid: errors.length === 0, errors };
};
