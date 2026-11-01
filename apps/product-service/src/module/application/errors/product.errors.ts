/**
 * Product Application Errors
 * @module product-service/application/errors
 *
 * Typed error hierarchy — HTTP layer এ auto-map হয়।
 */
import { ERROR_CODE } from '@vubon/shared-constants/common';
import { ApplicationError } from '@vubon/shared-kernel/application/errors';
import { ApplicationNotFoundError } from '@vubon/shared-kernel/application/errors';
import { ApplicationValidationError } from '@vubon/shared-kernel/application/errors';
import { CommandError } from '@vubon/shared-kernel/application/errors';
import { QueryError } from '@vubon/shared-kernel/application/errors';

// ─── Not Found (404) ──────────────────────
export class ProductNotFoundApplicationError extends ApplicationNotFoundError {
  constructor(productId: string) {
    super('Product', productId);
    this.name = 'ProductNotFoundApplicationError';
  }
}

// ─── Validation (422) ─────────────────────
export class ProductValidationError extends ApplicationValidationError {
  constructor(message: string, field?: string) {
    super(message, field);
    this.name = 'ProductValidationError';
  }
}

// ─── Command errors (400) ─────────────────
export class ProductCreationError extends CommandError {
  constructor(reason: string) {
    super(`Product creation failed: ${reason}`, 'CreateProduct');
    this.name = 'ProductCreationError';
  }
}

export class ProductUpdateError extends CommandError {
  constructor(productId: string, reason: string) {
    super(`Product "${productId}" update failed: ${reason}`, 'UpdateProduct');
    this.name = 'ProductUpdateError';
  }
}

export class ProductPublishError extends CommandError {
  constructor(productId: string, reason: string) {
    super(`Product "${productId}" publish failed: ${reason}`, 'PublishProduct');
    this.name = 'ProductPublishError';
  }
}

export class ProductDeleteError extends CommandError {
  constructor(productId: string, reason: string) {
    super(`Product "${productId}" delete failed: ${reason}`, 'DeleteProduct');
    this.name = 'ProductDeleteError';
  }
}

// ─── Conflict (409) ───────────────────────
export class ProductIdempotencyConflictError extends ApplicationError {
  readonly code = ERROR_CODE.VAL_DUPLICATE;
  readonly httpStatus = 409;

  constructor(key: string, existingId?: string) {
    super(
      `Idempotency key "${key}" already processed${existingId ? ` → ${existingId}` : ''}`,
      { key, existingId },
    );
    this.name = 'ProductIdempotencyConflictError';
  }
}

export class ProductSlugConflictApplicationError extends ApplicationError {
  readonly code = ERROR_CODE.VAL_DUPLICATE;
  readonly httpStatus = 409;

  constructor(slug: string) {
    super(`Product slug "${slug}" already exists`, { slug });
    this.name = 'ProductSlugConflictApplicationError';
  }
}

// ─── Query errors (400) ───────────────────
export class ProductQueryError extends QueryError {
  constructor(reason: string) {
    super(`Product query failed: ${reason}`, 'ProductQuery');
    this.name = 'ProductQueryError';
  }
}
