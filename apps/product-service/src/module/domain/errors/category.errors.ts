/**
 * Category Domain Errors
 * @module product-service/domain/errors
 */
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ConflictError } from '@vubon/shared-kernel/domain/errors/conflict.error';
import { NotFoundError } from '@vubon/shared-kernel/domain/errors/not-found.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export class CategoryNotFoundError extends NotFoundError {
  constructor(categoryId: string) {
    super('Category', categoryId);
    this.name = 'CategoryNotFoundError';
  }
}

export class CategorySlugAlreadyExistsError extends ConflictError {
  constructor(slug: string) {
    super(`Category slug "${slug}" already exists`, 'slug');
    this.name = 'CategorySlugAlreadyExistsError';
  }
}

export class InvalidCategoryStatusError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid category status "${value}". Allowed: ${allowed.join(', ')}`, 'status');
    this.name = 'InvalidCategoryStatusError';
  }
}

export class CategoryDepthExceededError extends BusinessRuleError {
  constructor(limit: number, attempted: number) {
    super(
      `Category depth exceeds max ${limit} (attempted ${attempted})`,
      'CATEGORY_DEPTH_EXCEEDED',
      { limit, attempted },
    );
    this.name = 'CategoryDepthExceededError';
  }
}

export class CategoryCircularReferenceError extends BusinessRuleError {
  constructor(categoryId: string, parentId: string) {
    super(
      `Circular reference: category "${categoryId}" cannot have ancestor "${parentId}" as parent`,
      'CATEGORY_CIRCULAR_REFERENCE',
      { categoryId, parentId },
    );
    this.name = 'CategoryCircularReferenceError';
  }
}
