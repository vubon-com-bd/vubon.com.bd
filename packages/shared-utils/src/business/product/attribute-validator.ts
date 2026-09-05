/**
 * Attribute Validator
 * অ্যাট্রিবিউট ভ্যালিডেটর
 */

import { ATTRIBUTE_TYPES } from '@vubon/shared-constants';
import { AttributeSchema } from '@vubon/shared-schemas';
import type { Attribute } from '@vubon/shared-types';

export interface AttributeValidationResult {
  valid: boolean;
  errors: Record<string, string[]>;
  data?: Attribute;
}

export const validateAttribute = (data: unknown): AttributeValidationResult => {
  const errors: Record<string, string[]> = {};
  let valid = true;

  if (!data || typeof data !== 'object') {
    return {
      valid: false,
      errors: { _global: ['Invalid attribute data'] },
    };
  }

  const attribute = data as Record<string, unknown>;

  // Name validation
  if (!attribute.name || typeof attribute.name !== 'string' || attribute.name.length < 1) {
    errors.name = ['Attribute name is required'];
    valid = false;
  }

  // Slug validation
  if (attribute.slug && typeof attribute.slug === 'string') {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(attribute.slug)) {
      errors.slug = ['Invalid slug format'];
      valid = false;
    }
  } else {
    errors.slug = ['Slug is required'];
    valid = false;
  }

  // Type validation - ATTRIBUTE_TYPES থেকে পাওয়া মানগুলোর সাথে তুলনা
  if (attribute.type) {
    const typeValues = Object.values(ATTRIBUTE_TYPES) as string[];
    if (!typeValues.includes(attribute.type as string)) {
      errors.type = ['Invalid attribute type'];
      valid = false;
    }
  } else {
    errors.type = ['Type is required'];
    valid = false;
  }

  // Options validation
  if (attribute.options && Array.isArray(attribute.options)) {
    for (const option of attribute.options) {
      if (!option.value || typeof option.value !== 'string') {
        errors.options = ['Each option must have a value'];
        valid = false;
        break;
      }
    }
  }

  try {
    const validatedData = AttributeSchema.parse(data);
    return {
      valid: true,
      errors: {},
      data: validatedData as Attribute,
    };
  } catch {
    return {
      valid,
      errors,
    };
  }
};

export const validateAttributeCreate = (data: unknown): AttributeValidationResult => {
  return validateAttribute(data);
};

export const validateAttributeUpdate = (data: unknown): AttributeValidationResult => {
  return validateAttribute(data);
};
