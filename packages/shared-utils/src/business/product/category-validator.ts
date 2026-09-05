/**
 * Category Validator
 * ক্যাটাগরি ভ্যালিডেটর
 */

import { CATEGORY_STATUS } from '@vubon/shared-constants';
import { CategorySchema } from '@vubon/shared-schemas';
import type { Category } from '@vubon/shared-types';

export interface CategoryValidationResult {
  valid: boolean;
  errors: Record<string, string[]>;
  data?: Category;
}

export const validateCategory = (data: unknown): CategoryValidationResult => {
  const errors: Record<string, string[]> = {};
  let valid = true;

  if (!data || typeof data !== 'object') {
    return {
      valid: false,
      errors: { _global: ['Invalid category data'] },
    };
  }

  const category = data as Record<string, unknown>;

  // Name validation
  if (!category.name || typeof category.name !== 'string' || category.name.length < 2) {
    errors.name = ['Category name must be at least 2 characters'];
    valid = false;
  } else if (category.name.length > 100) {
    errors.name = ['Category name must be less than 100 characters'];
    valid = false;
  }

  // Slug validation
  if (category.slug && typeof category.slug === 'string') {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(category.slug)) {
      errors.slug = ['Invalid slug format'];
      valid = false;
    }
  } else {
    errors.slug = ['Slug is required'];
    valid = false;
  }

  // Status validation - CATEGORY_STATUS থেকে পাওয়া মানগুলোর সাথে তুলনা
  if (category.status) {
    const statusValues = Object.values(CATEGORY_STATUS) as string[];
    if (!statusValues.includes(category.status as string)) {
      errors.status = ['Invalid category status'];
      valid = false;
    }
  } else {
    errors.status = ['Status is required'];
    valid = false;
  }

  // Parent ID validation (optional)
  if (category.parentId && typeof category.parentId !== 'string') {
    errors.parentId = ['Parent ID must be a string'];
    valid = false;
  }

  try {
    const validatedData = CategorySchema.parse(data);
    return {
      valid: true,
      errors: {},
      data: validatedData as Category,
    };
  } catch {
    return {
      valid,
      errors,
    };
  }
};

export const validateCategoryCreate = (data: unknown): CategoryValidationResult => {
  return validateCategory(data);
};

export const validateCategoryUpdate = (data: unknown): CategoryValidationResult => {
  return validateCategory(data);
};
