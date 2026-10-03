/**
 * Variant domain errors
 * @module product-service/domain/errors
 */
import { NotFoundError } from '@vubon/shared-kernel/domain/errors/not-found.error';
import { ConflictError } from '@vubon/shared-kernel/domain/errors/conflict.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';

export class VariantNotFoundError extends NotFoundError {
  constructor(variantId: string) {
    super('ProductVariant', variantId);
    this.name = 'VariantNotFoundError';
  }
}

export class VariantSkuExistsError extends ConflictError {
  constructor(sku: string) {
    super(`Variant SKU "${sku}" already exists`, 'sku');
    this.name = 'VariantSkuExistsError';
  }
}

export class VariantLimitExceededError extends BusinessRuleError {
  constructor(current: number, max: number) {
    super(`Variant limit exceeded: ${current}/${max}`, 'VARIANT_LIMIT_EXCEEDED', { current, max });
    this.name = 'VariantLimitExceededError';
  }
}

export class InvalidVariantStatusError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid variant status "${value}". Allowed: ${allowed.join(', ')}`, 'status');
    this.name = 'InvalidVariantStatusError';
  }
}

export class VariantOptionRequiredError extends ValidationError {
  constructor(variantId: string) {
    super(`Variant "${variantId}" must have at least one option`, 'options');
    this.name = 'VariantOptionRequiredError';
  }
}
