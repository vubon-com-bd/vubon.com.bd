/**
 * Product domain errors
 * @module product-service/domain/errors
 */
import { NotFoundError } from '@vubon/shared-kernel/domain/errors/not-found.error';
import { ConflictError } from '@vubon/shared-kernel/domain/errors/conflict.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';

export class ProductNotFoundError extends NotFoundError {
  constructor(productId: string) {
    super('Product', productId);
    this.name = 'ProductNotFoundError';
  }
}

export class ProductSlugExistsError extends ConflictError {
  constructor(slug: string) {
    super(`Product slug "${slug}" already exists`, 'slug');
    this.name = 'ProductSlugExistsError';
  }
}

export class ProductSkuExistsError extends ConflictError {
  constructor(sku: string) {
    super(`Product SKU "${sku}" already exists`, 'sku');
    this.name = 'ProductSkuExistsError';
  }
}

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

export class ProductCannotBePublishedError extends BusinessRuleError {
  constructor(productId: string, reason: string) {
    super(`Product "${productId}" cannot be published: ${reason}`, 'PRODUCT_CANNOT_BE_PUBLISHED', { productId, reason });
    this.name = 'ProductCannotBePublishedError';
  }
}

export class ProductAlreadyPublishedError extends BusinessRuleError {
  constructor(productId: string) {
    super(`Product "${productId}" is already published`, 'PRODUCT_ALREADY_PUBLISHED', { productId });
    this.name = 'ProductAlreadyPublishedError';
  }
}
