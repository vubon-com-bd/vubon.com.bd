/**
 * Dispatch Application Errors
 */
import { ApplicationError } from '@vubon/shared-kernel/application/errors/application.error';
import { ApplicationValidationError } from '@vubon/shared-kernel/application/errors/validation.error';
import { ApplicationNotFoundError } from '@vubon/shared-kernel/application/errors/not-found.error';
import { ERROR_CODE } from '@vubon/shared-constants/common';

export class DispatchNotFoundApplicationError extends ApplicationNotFoundError {
  constructor(id: string) { super('Dispatch', id); this.name = 'DispatchNotFoundApplicationError'; }
}
export class DispatchByNumberNotFoundError extends ApplicationNotFoundError {
  constructor(num: string) { super('Dispatch', `number:${num}`); this.name = 'DispatchByNumberNotFoundError'; }
}

export class CreateDispatchError extends ApplicationValidationError {
  constructor(msg: string, field?: string) { super(`[Dispatch.create] ${msg}`, field); this.name = 'CreateDispatchError'; }
}
export class AssignDispatchError extends ApplicationValidationError {
  constructor(msg: string, field?: string) { super(`[Dispatch.assign] ${msg}`, field); this.name = 'AssignDispatchError'; }
}
export class DispatchActionError extends ApplicationValidationError {
  constructor(action: string, msg: string, field?: string) { super(`[Dispatch.${action}] ${msg}`, field); this.name = 'DispatchActionError'; }
}
export class MarkDispatchError extends ApplicationValidationError {
  constructor(msg: string, field?: string) { super(`[Dispatch.mark] ${msg}`, field); this.name = 'MarkDispatchError'; }
}

export class DispatchAlreadyExistsError extends ApplicationError {
  readonly code = ERROR_CODE.DISPATCH_NOT_FOUND;
  readonly httpStatus = 409;
  constructor(num: string) { super(`Dispatch "${num}" already exists`, { num }); this.name = 'DispatchAlreadyExistsError'; }
}
export class DispatchStateConflictError extends ApplicationError {
  readonly code = ERROR_CODE.INVALID_DISPATCH_STATUS_TRANSITION;
  readonly httpStatus = 409;
  constructor(id: string, status: string, action: string) {
    super(`Dispatch "${id}" in status "${status}" cannot perform "${action}"`, { id, status, action });
    this.name = 'DispatchStateConflictError';
  }
}
export class DispatchAlreadyStartedError extends ApplicationError {
  readonly code = ERROR_CODE.DISPATCH_ALREADY_STARTED;
  readonly httpStatus = 400;
  constructor(id: string) { super(`Dispatch "${id}" already started`, { id }); this.name = 'DispatchAlreadyStartedError'; }
}
export class DispatchAlreadyCompletedError extends ApplicationError {
  readonly code = ERROR_CODE.DISPATCH_ALREADY_COMPLETED;
  readonly httpStatus = 400;
  constructor(id: string) { super(`Dispatch "${id}" already completed`, { id }); this.name = 'DispatchAlreadyCompletedError'; }
}
export class DispatchRequiresTransportError extends ApplicationError {
  readonly code = ERROR_CODE.DISPATCH_NOT_FOUND;
  readonly httpStatus = 400;
  constructor(id: string) { super(`Dispatch "${id}" requires courier or vehicle`, { id }); this.name = 'DispatchRequiresTransportError'; }
}
export class DispatchOperationError extends ApplicationError {
  readonly code = ERROR_CODE.LOGISTICS_GENERIC_FAILURE;
  readonly httpStatus = 500;
  constructor(op: string, cause: string) { super(`Dispatch.${op} failed: ${cause}`, { op }); this.name = 'DispatchOperationError'; }
}
