/**
 * Category domain errors
 * @module product-service/domain/errors
 */
import { NotFoundError } from '@vubon/shared-kernel/domain/errors/not-found.error';
import { ConflictError } from '@vubon/shared-kernel/domain/errors/conflict.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';

export class CategoryNotFoundError extends NotFoundError {
  constructor(categoryId: string) {
    super('Category', categoryId);
    this.name = 'CategoryNotFoundError';
  }
}

export class CategorySlugExistsError extends ConflictError {
  constructor(slug: string) {
    super(`Category slug "${slug}" already exists`, 'slug');
    this.name = 'CategorySlugExistsError';
  }
}

export class InvalidCategoryStatusError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid category status "${value}". Allowed: ${allowed.join(', ')}`, 'status');
    this.name = 'InvalidCategoryStatusError';
  }
}

export class CategoryDepthExceededError extends BusinessRuleError {
  constructor(depth: number, max: number) {
    super(`Category depth ${depth} exceeds max ${max}`, 'CATEGORY_DEPTH_EXCEEDED', { depth, max });
    this.name = 'CategoryDepthExceededError';
  }
}

export class CategoryHasChildrenError extends BusinessRuleError {
  constructor(categoryId: string) {
    super(`Category "${categoryId}" has children and cannot be deleted`, 'CATEGORY_HAS_CHILDREN', { categoryId });
    this.name = 'CategoryHasChildrenError';
  }
}
