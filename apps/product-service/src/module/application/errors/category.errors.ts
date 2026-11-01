/**
 * Category Application Errors
 * @module product-service/application/errors
 */
import { ERROR_CODE } from '@vubon/shared-constants/common';
import { ApplicationError } from '@vubon/shared-kernel/application/errors';
import { ApplicationNotFoundError } from '@vubon/shared-kernel/application/errors';
import { ApplicationValidationError } from '@vubon/shared-kernel/application/errors';
import { CommandError } from '@vubon/shared-kernel/application/errors';
import { QueryError } from '@vubon/shared-kernel/application/errors';

export class CategoryNotFoundApplicationError extends ApplicationNotFoundError {
  constructor(categoryId: string) {
    super('Category', categoryId);
    this.name = 'CategoryNotFoundApplicationError';
  }
}

export class CategoryValidationError extends ApplicationValidationError {
  constructor(message: string, field?: string) {
    super(message, field);
    this.name = 'CategoryValidationError';
  }
}

export class CategoryCreateError extends CommandError {
  constructor(reason: string) {
    super(`Category creation failed: ${reason}`, 'CreateCategory');
    this.name = 'CategoryCreateError';
  }
}

export class CategoryUpdateError extends CommandError {
  constructor(categoryId: string, reason: string) {
    super(`Category "${categoryId}" update failed: ${reason}`, 'UpdateCategory');
    this.name = 'CategoryUpdateError';
  }
}

export class CategorySlugConflictApplicationError extends ApplicationError {
  readonly code = ERROR_CODE.VAL_DUPLICATE;
  readonly httpStatus = 409;

  constructor(slug: string) {
    super(`Category slug "${slug}" already exists`, { slug });
    this.name = 'CategorySlugConflictApplicationError';
  }
}

export class CategoryDepthExceededApplicationError extends ApplicationError {
  readonly code = ERROR_CODE.VAL_OUT_OF_RANGE;
  readonly httpStatus = 422;

  constructor(limit: number, attempted: number) {
    super(`Category depth ${attempted} exceeds maximum ${limit}`, { limit, attempted });
    this.name = 'CategoryDepthExceededApplicationError';
  }
}

export class CategoryQueryError extends QueryError {
  constructor(reason: string) {
    super(`Category query failed: ${reason}`, 'CategoryQuery');
    this.name = 'CategoryQueryError';
  }
}
