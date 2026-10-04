/**
 * Brand domain errors
 * @module product-service/domain/errors
 */
import { NotFoundError } from '@vubon/shared-kernel/domain/errors/not-found.error';
import { ConflictError } from '@vubon/shared-kernel/domain/errors/conflict.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export class BrandNotFoundError extends NotFoundError {
  constructor(brandId: string) {
    super('Brand', brandId);
    this.name = 'BrandNotFoundError';
  }
}

export class BrandSlugExistsError extends ConflictError {
  constructor(slug: string) {
    super(`Brand slug "${slug}" already exists`, 'slug');
    this.name = 'BrandSlugExistsError';
  }
}

export class InvalidBrandStatusError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid brand status "${value}". Allowed: ${allowed.join(', ')}`, 'status');
    this.name = 'InvalidBrandStatusError';
  }
}
