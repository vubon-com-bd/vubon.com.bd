import { ATTRIBUTE } from '@vubon/shared-constants/src/business/product/attribute.constants';

export interface AttributeInput {
  name: string;
  slug: string;
  type: string;
}

export const validateAttribute = (
  attribute: Partial<AttributeInput>
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (!attribute.name) errors.push('Attribute name is required');
  if (!attribute.slug) errors.push('Attribute slug is required');
  if (attribute.type && !Object.keys(ATTRIBUTE.TYPES).includes(attribute.type)) {
    errors.push('Invalid attribute type');
  }
  return { isValid: errors.length === 0, errors };
};
