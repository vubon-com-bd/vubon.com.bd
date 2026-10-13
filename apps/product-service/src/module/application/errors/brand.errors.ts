/**
 * Brand Application Errors
 * @module product-service/application/errors
 */
import { ERROR_CODE } from '@vubon/shared-constants/common';
import { ApplicationError } from '@vubon/shared-kernel/application/errors';
import { ApplicationNotFoundError } from '@vubon/shared-kernel/application/errors';
import { ApplicationValidationError } from '@vubon/shared-kernel/application/errors';
import { CommandError } from '@vubon/shared-kernel/application/errors';
import { QueryError } from '@vubon/shared-kernel/application/errors';

export class BrandNotFoundApplicationError extends ApplicationNotFoundError {
  constructor(brandId: string) {
    super('Brand', brandId);
    this.name = 'BrandNotFoundApplicationError';
  }
}

export class BrandValidationError extends ApplicationValidationError {
  constructor(message: string, field?: string) {
    super(message, field);
    this.name = 'BrandValidationError';
  }
}

export class BrandCreateError extends CommandError {
  constructor(reason: string) {
    super(`Brand creation failed: ${reason}`, 'CreateBrand');
    this.name = 'BrandCreateError';
  }
}

export class BrandUpdateError extends CommandError {
  constructor(brandId: string, reason: string) {
    super(`Brand "${brandId}" update failed: ${reason}`, 'UpdateBrand');
    this.name = 'BrandUpdateError';
  }
}

export class BrandSlugConflictApplicationError extends ApplicationError {
  readonly code = ERROR_CODE.VAL_DUPLICATE;
  readonly httpStatus = 409;

  constructor(slug: string) {
    super(`Brand slug "${slug}" already exists`, { slug });
    this.name = 'BrandSlugConflictApplicationError';
  }
}

export class BrandQueryError extends QueryError {
  constructor(reason: string) {
    super(`Brand query failed: ${reason}`, 'BrandQuery');
    this.name = 'BrandQueryError';
  }
}
