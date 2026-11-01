/**
 * Driver Application Errors
 */
import { ApplicationError } from '@vubon/shared-kernel/application/errors/application.error';
import { ApplicationValidationError } from '@vubon/shared-kernel/application/errors/validation.error';
import { ApplicationNotFoundError } from '@vubon/shared-kernel/application/errors/not-found.error';
import { ERROR_CODE } from '@vubon/shared-constants/common';

export class DriverNotFoundApplicationError extends ApplicationNotFoundError {
  constructor(id: string) { super('Driver', id); this.name = 'DriverNotFoundApplicationError'; }
}
export class DriverByLicenseNotFoundError extends ApplicationNotFoundError {
  constructor(license: string) { super('Driver', `license:${license}`); this.name = 'DriverByLicenseNotFoundError'; }
}
export class DriverByPhoneNotFoundError extends ApplicationNotFoundError {
  constructor(phone: string) { super('Driver', `phone:${phone}`); this.name = 'DriverByPhoneNotFoundError'; }
}

export class CreateDriverError extends ApplicationValidationError {
  constructor(msg: string, field?: string) { super(`[Driver.create] ${msg}`, field); this.name = 'CreateDriverError'; }
}
export class UpdateDriverError extends ApplicationValidationError {
  constructor(msg: string, field?: string) { super(`[Driver.update] ${msg}`, field); this.name = 'UpdateDriverError'; }
}
export class DriverActionError extends ApplicationValidationError {
  constructor(action: string, msg: string, field?: string) { super(`[Driver.${action}] ${msg}`, field); this.name = 'DriverActionError'; }
}

export class DriverAlreadyExistsError extends ApplicationError {
  readonly code = ERROR_CODE.DRIVER_NOT_FOUND;
  readonly httpStatus = 409;
  constructor(license: string) { super(`Driver with license "${license}" already exists`, { license }); this.name = 'DriverAlreadyExistsError'; }
}
export class DriverStateConflictError extends ApplicationError {
  readonly code = ERROR_CODE.INVALID_DRIVER_STATUS_TRANSITION;
  readonly httpStatus = 409;
  constructor(id: string, status: string, action: string) {
    super(`Driver "${id}" in status "${status}" cannot perform "${action}"`, { id, status, action });
    this.name = 'DriverStateConflictError';
  }
}
export class DriverLicenseExpiredError extends ApplicationError {
  readonly code = ERROR_CODE.DRIVER_LICENSE_EXPIRED;
  readonly httpStatus = 400;
  constructor(id: string, expiresAt: string) {
    super(`Driver "${id}" license expired at ${expiresAt}`, { id, expiresAt });
    this.name = 'DriverLicenseExpiredError';
  }
}
export class DriverCashLimitExceededError extends ApplicationError {
  readonly code = ERROR_CODE.DRIVER_CASH_LIMIT_EXCEEDED;
  readonly httpStatus = 400;
  constructor(id: string, cash: number, limit: number) {
    super(`Driver "${id}" cash limit exceeded (${cash}/${limit})`, { id, cash, limit });
    this.name = 'DriverCashLimitExceededError';
  }
}
export class DriverOperationError extends ApplicationError {
  readonly code = ERROR_CODE.LOGISTICS_GENERIC_FAILURE;
  readonly httpStatus = 500;
  constructor(op: string, cause: string) { super(`Driver.${op} failed: ${cause}`, { op }); this.name = 'DriverOperationError'; }
}
