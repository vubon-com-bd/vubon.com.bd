/**
 * Variant Application Errors
 * @module product-service/application/errors
 */
import { ERROR_CODE } from '@vubon/shared-constants/common';
import { ApplicationError } from '@vubon/shared-kernel/application/errors';
import { ApplicationNotFoundError } from '@vubon/shared-kernel/application/errors';
import { ApplicationValidationError } from '@vubon/shared-kernel/application/errors';
import { CommandError } from '@vubon/shared-kernel/application/errors';
import { QueryError } from '@vubon/shared-kernel/application/errors';

export class VariantNotFoundApplicationError extends ApplicationNotFoundError {
  constructor(variantId: string) {
    super('Variant', variantId);
    this.name = 'VariantNotFoundApplicationError';
  }
}

export class VariantValidationError extends ApplicationValidationError {
  constructor(message: string, field?: string) {
    super(message, field);
    this.name = 'VariantValidationError';
  }
}

export class VariantAddError extends CommandError {
  constructor(reason: string) {
    super(`Variant add failed: ${reason}`, 'AddVariant');
    this.name = 'VariantAddError';
  }
}

export class VariantUpdateError extends CommandError {
  constructor(variantId: string, reason: string) {
    super(`Variant "${variantId}" update failed: ${reason}`, 'UpdateVariant');
    this.name = 'VariantUpdateError';
  }
}

export class VariantSkuConflictApplicationError extends ApplicationError {
  readonly code = ERROR_CODE.VAL_DUPLICATE;
  readonly httpStatus = 409;

  constructor(sku: string) {
    super(`Variant SKU "${sku}" already exists`, { sku });
    this.name = 'VariantSkuConflictApplicationError';
  }
}

export class VariantQueryError extends QueryError {
  constructor(reason: string) {
    super(`Variant query failed: ${reason}`, 'VariantQuery');
    this.name = 'VariantQueryError';
  }
}
