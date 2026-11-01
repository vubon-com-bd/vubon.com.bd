/**
 * Variant Domain Errors
 * @module product-service/domain/errors
 */
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ConflictError } from '@vubon/shared-kernel/domain/errors/conflict.error';
import { NotFoundError } from '@vubon/shared-kernel/domain/errors/not-found.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export class VariantNotFoundError extends NotFoundError {
  constructor(variantId: string) {
    super('Variant', variantId);
    this.name = 'VariantNotFoundError';
  }
}

export class VariantSkuAlreadyExistsError extends ConflictError {
  constructor(sku: string) {
    super(`Variant SKU "${sku}" already exists`, 'sku');
    this.name = 'VariantSkuAlreadyExistsError';
  }
}

export class InvalidVariantStatusError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid variant status "${value}". Allowed: ${allowed.join(', ')}`, 'status');
    this.name = 'InvalidVariantStatusError';
  }
}

export class InvalidVariantTypeError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid variant type "${value}". Allowed: ${allowed.join(', ')}`, 'type');
    this.name = 'InvalidVariantTypeError';
  }
}

export class VariantLimitExceededError extends BusinessRuleError {
  constructor(productId: string, limit: number, current: number) {
    super(
      `Variant limit exceeded for product "${productId}": max ${limit}, current ${current}`,
      'VARIANT_LIMIT_EXCEEDED',
      { productId, limit, current },
    );
    this.name = 'VariantLimitExceededError';
  }
}
