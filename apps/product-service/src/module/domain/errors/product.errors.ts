/**
 * Product Domain Errors
 * @module product-service/domain/errors
 *
 * Typed error hierarchy — HTTP layer এ auto-map হয়।
 */
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ConflictError } from '@vubon/shared-kernel/domain/errors/conflict.error';
import { NotFoundError } from '@vubon/shared-kernel/domain/errors/not-found.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

// ─── Not Found (404) ───────────────────────
export class ProductNotFoundError extends NotFoundError {
  constructor(productId: string) {
    super('Product', productId);
    this.name = 'ProductNotFoundError';
  }
}

// ─── Conflict (409) ────────────────────────
export class ProductSlugAlreadyExistsError extends ConflictError {
  constructor(slug: string) {
    super(`Product slug "${slug}" already exists`, 'slug');
    this.name = 'ProductSlugAlreadyExistsError';
  }
}

export class ProductSkuAlreadyExistsError extends ConflictError {
  constructor(sku: string) {
    super(`Product SKU "${sku}" already exists`, 'sku');
    this.name = 'ProductSkuAlreadyExistsError';
  }
}

// ─── Validation (422) ──────────────────────
export class InvalidProductStatusError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid product status "${value}". Allowed: ${allowed.join(', ')}`, 'status');
    this.name = 'InvalidProductStatusError';
  }
}

export class InvalidProductTypeError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid product type "${value}". Allowed: ${allowed.join(', ')}`, 'type');
    this.name = 'InvalidProductTypeError';
  }
}

export class InvalidProductPriceError extends ValidationError {
  constructor(reason: string) {
    super(`Invalid product price: ${reason}`, 'price');
    this.name = 'InvalidProductPriceError';
  }
}

export class InvalidProductWeightError extends ValidationError {
  constructor(reason: string) {
    super(`Invalid product weight: ${reason}`, 'weight');
    this.name = 'InvalidProductWeightError';
  }
}

export class InvalidProductDimensionError extends ValidationError {
  constructor(reason: string) {
    super(`Invalid product dimension: ${reason}`, 'dimensions');
    this.name = 'InvalidProductDimensionError';
  }
}

// ─── Business Rule (400) ───────────────────
export class InvalidProductStatusTransitionError extends BusinessRuleError {
  constructor(from: string, to: string, productId?: string) {
    super(
      `Cannot transition product status from "${from}" to "${to}"`,
      'INVALID_PRODUCT_STATUS_TRANSITION',
      { from, to, productId },
    );
    this.name = 'InvalidProductStatusTransitionError';
  }
}

export class ProductCannotBePublishedError extends BusinessRuleError {
  constructor(productId: string, reason: string) {
    super(
      `Product "${productId}" cannot be published: ${reason}`,
      'PRODUCT_CANNOT_BE_PUBLISHED',
      { productId, reason },
    );
    this.name = 'ProductCannotBePublishedError';
  }
}

export class ProductCannotBeDeletedError extends BusinessRuleError {
  constructor(productId: string, status: string) {
    super(
      `Product "${productId}" cannot be deleted in status "${status}"`,
      'PRODUCT_CANNOT_BE_DELETED',
      { productId, status },
    );
    this.name = 'ProductCannotBeDeletedError';
  }
}
