/**
 * Zone Application Errors
 */
import { ApplicationError } from '@vubon/shared-kernel/application/errors/application.error';
import { ApplicationValidationError } from '@vubon/shared-kernel/application/errors/validation.error';
import { ApplicationNotFoundError } from '@vubon/shared-kernel/application/errors/not-found.error';
import { ERROR_CODE } from '@vubon/shared-constants/common';

export class ZoneNotFoundApplicationError extends ApplicationNotFoundError {
  constructor(id: string) { super('Zone', id); this.name = 'ZoneNotFoundApplicationError'; }
}
export class ZoneByCodeNotFoundError extends ApplicationNotFoundError {
  constructor(code: string) { super('Zone', `code:${code}`); this.name = 'ZoneByCodeNotFoundError'; }
}
export class ZoneNotCoveredError extends ApplicationError {
  readonly code = ERROR_CODE.ZONE_NOT_COVERED;
  readonly httpStatus = 400;
  constructor(postalCode: string) { super(`Postal code "${postalCode}" is not covered by any zone`, { postalCode }); this.name = 'ZoneNotCoveredError'; }
}

export class CreateZoneError extends ApplicationValidationError {
  constructor(msg: string, field?: string) { super(`[Zone.create] ${msg}`, field); this.name = 'CreateZoneError'; }
}
export class UpdateZoneError extends ApplicationValidationError {
  constructor(msg: string, field?: string) { super(`[Zone.update] ${msg}`, field); this.name = 'UpdateZoneError'; }
}
export class ZoneActionError extends ApplicationValidationError {
  constructor(action: string, msg: string, field?: string) { super(`[Zone.${action}] ${msg}`, field); this.name = 'ZoneActionError'; }
}

export class ZoneAlreadyExistsError extends ApplicationError {
  readonly code = ERROR_CODE.ZONE_NOT_FOUND;
  readonly httpStatus = 409;
  constructor(code: string) { super(`Zone "${code}" already exists`, { code }); this.name = 'ZoneAlreadyExistsError'; }
}
export class ZoneStateConflictError extends ApplicationError {
  readonly code = ERROR_CODE.INVALID_ZONE_STATUS_TRANSITION;
  readonly httpStatus = 409;
  constructor(id: string, status: string, action: string) {
    super(`Zone "${id}" in status "${status}" cannot perform "${action}"`, { id, status, action });
    this.name = 'ZoneStateConflictError';
  }
}
export class ZoneOperationError extends ApplicationError {
  readonly code = ERROR_CODE.LOGISTICS_GENERIC_FAILURE;
  readonly httpStatus = 500;
  constructor(op: string, cause: string) { super(`Zone.${op} failed: ${cause}`, { op }); this.name = 'ZoneOperationError'; }
}
