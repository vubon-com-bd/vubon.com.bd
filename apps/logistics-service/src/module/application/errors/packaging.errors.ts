/**
 * Packaging Application Errors
 */
import { ApplicationError } from '@vubon/shared-kernel/application/errors/application.error';
import { ApplicationValidationError } from '@vubon/shared-kernel/application/errors/validation.error';
import { ApplicationNotFoundError } from '@vubon/shared-kernel/application/errors/not-found.error';
import { ERROR_CODE } from '@vubon/shared-constants/common';

export class PackagingNotFoundApplicationError extends ApplicationNotFoundError {
  constructor(id: string) { super('Packaging', id); this.name = 'PackagingNotFoundApplicationError'; }
}
export class PackagingByCodeNotFoundError extends ApplicationNotFoundError {
  constructor(code: string) { super('Packaging', `code:${code}`); this.name = 'PackagingByCodeNotFoundError'; }
}

export class CreatePackagingError extends ApplicationValidationError {
  constructor(msg: string, field?: string) { super(`[Packaging.create] ${msg}`, field); this.name = 'CreatePackagingError'; }
}
export class UpdatePackagingError extends ApplicationValidationError {
  constructor(msg: string, field?: string) { super(`[Packaging.update] ${msg}`, field); this.name = 'UpdatePackagingError'; }
}
export class PackagingActionError extends ApplicationValidationError {
  constructor(action: string, msg: string, field?: string) { super(`[Packaging.${action}] ${msg}`, field); this.name = 'PackagingActionError'; }
}

export class PackagingAlreadyExistsError extends ApplicationError {
  readonly code = ERROR_CODE.PACKAGING_NOT_FOUND;
  readonly httpStatus = 409;
  constructor(code: string) { super(`Packaging "${code}" already exists`, { code }); this.name = 'PackagingAlreadyExistsError'; }
}
export class PackagingStateConflictError extends ApplicationError {
  readonly code = ERROR_CODE.INVALID_PACKAGING_STATUS_TRANSITION;
  readonly httpStatus = 409;
  constructor(id: string, status: string, action: string) {
    super(`Packaging "${id}" in status "${status}" cannot perform "${action}"`, { id, status, action });
    this.name = 'PackagingStateConflictError';
  }
}
export class PackagingOutOfStockError extends ApplicationError {
  readonly code = ERROR_CODE.PACKAGING_OUT_OF_STOCK;
  readonly httpStatus = 400;
  constructor(id: string, requested: number, available: number) {
    super(`Packaging "${id}" out of stock (requested ${requested}, available ${available})`, { id, requested, available });
    this.name = 'PackagingOutOfStockError';
  }
}
export class PackagingOperationError extends ApplicationError {
  readonly code = ERROR_CODE.LOGISTICS_GENERIC_FAILURE;
  readonly httpStatus = 500;
  constructor(op: string, cause: string) { super(`Packaging.${op} failed: ${cause}`, { op }); this.name = 'PackagingOperationError'; }
}
