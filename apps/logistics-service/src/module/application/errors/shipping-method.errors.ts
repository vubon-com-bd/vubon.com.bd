/**
 * ShippingMethod Application Errors
 */
import { ApplicationError } from '@vubon/shared-kernel/application/errors/application.error';
import { ApplicationValidationError } from '@vubon/shared-kernel/application/errors/validation.error';
import { ApplicationNotFoundError } from '@vubon/shared-kernel/application/errors/not-found.error';
import { ERROR_CODE } from '@vubon/shared-constants/common';

export class ShippingMethodNotFoundApplicationError extends ApplicationNotFoundError {
  constructor(id: string) { super('ShippingMethod', id); this.name = 'ShippingMethodNotFoundApplicationError'; }
}
export class ShippingMethodByCodeNotFoundError extends ApplicationNotFoundError {
  constructor(code: string) { super('ShippingMethod', `code:${code}`); this.name = 'ShippingMethodByCodeNotFoundError'; }
}

export class CreateShippingMethodError extends ApplicationValidationError {
  constructor(msg: string, field?: string) { super(`[ShippingMethod.create] ${msg}`, field); this.name = 'CreateShippingMethodError'; }
}
export class UpdateShippingMethodError extends ApplicationValidationError {
  constructor(msg: string, field?: string) { super(`[ShippingMethod.update] ${msg}`, field); this.name = 'UpdateShippingMethodError'; }
}
export class ShippingMethodActionError extends ApplicationValidationError {
  constructor(action: string, msg: string, field?: string) { super(`[ShippingMethod.${action}] ${msg}`, field); this.name = 'ShippingMethodActionError'; }
}

export class ShippingMethodAlreadyExistsError extends ApplicationError {
  readonly code = ERROR_CODE.SHIPPING_METHOD_NOT_FOUND;
  readonly httpStatus = 409;
  constructor(code: string) { super(`Shipping method "${code}" already exists`, { code }); this.name = 'ShippingMethodAlreadyExistsError'; }
}
export class ShippingMethodStateConflictError extends ApplicationError {
  readonly code = ERROR_CODE.SHIPPING_METHOD_NOT_ACTIVE;
  readonly httpStatus = 409;
  constructor(id: string, status: string, action: string) {
    super(`Shipping method "${id}" in status "${status}" cannot perform "${action}"`, { id, status, action });
    this.name = 'ShippingMethodStateConflictError';
  }
}
export class ShippingMethodOperationError extends ApplicationError {
  readonly code = ERROR_CODE.LOGISTICS_GENERIC_FAILURE;
  readonly httpStatus = 500;
  constructor(op: string, cause: string) { super(`ShippingMethod.${op} failed: ${cause}`, { op }); this.name = 'ShippingMethodOperationError'; }
}
