import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';
import { DomainError } from '@vubon/shared-kernel/domain/errors/domain.error';

export class CategoryNotFoundError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.PRODUCT_NOT_FOUND;
  readonly httpStatus = 404;

  constructor(categoryId: string) {
    super(`Category not found: ${categoryId}`, { categoryId });
  }
}

export class CategorySlugExistsError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.VAL_DUPLICATE;
  readonly httpStatus = 409;

  constructor(slug: string) {
    super(`Category slug already exists: ${slug}`, { slug });
  }
}

export class CircularCategoryError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.VAL_OUT_OF_RANGE;
  readonly httpStatus = 400;

  constructor(categoryId: string, parentId: string) {
    super(`Circular category reference: ${categoryId} → ${parentId}`, {
      categoryId,
      parentId,
    });
  }
}
