/**
 * Route Application Errors
 */
import { ApplicationError } from '@vubon/shared-kernel/application/errors/application.error';
import { ApplicationValidationError } from '@vubon/shared-kernel/application/errors/validation.error';
import { ApplicationNotFoundError } from '@vubon/shared-kernel/application/errors/not-found.error';
import { ERROR_CODE } from '@vubon/shared-constants/common';

export class RouteNotFoundApplicationError extends ApplicationNotFoundError {
  constructor(id: string) { super('Route', id); this.name = 'RouteNotFoundApplicationError'; }
}
export class RouteByCodeNotFoundError extends ApplicationNotFoundError {
  constructor(code: string) { super('Route', `code:${code}`); this.name = 'RouteByCodeNotFoundError'; }
}

export class CreateRouteError extends ApplicationValidationError {
  constructor(msg: string, field?: string) { super(`[Route.create] ${msg}`, field); this.name = 'CreateRouteError'; }
}
export class UpdateRouteError extends ApplicationValidationError {
  constructor(msg: string, field?: string) { super(`[Route.update] ${msg}`, field); this.name = 'UpdateRouteError'; }
}
export class RouteActionError extends ApplicationValidationError {
  constructor(action: string, msg: string, field?: string) { super(`[Route.${action}] ${msg}`, field); this.name = 'RouteActionError'; }
}

export class RouteAlreadyExistsError extends ApplicationError {
  readonly code = ERROR_CODE.ROUTE_NOT_FOUND;
  readonly httpStatus = 409;
  constructor(code: string) { super(`Route with code "${code}" already exists`, { code }); this.name = 'RouteAlreadyExistsError'; }
}
export class RouteStateConflictError extends ApplicationError {
  readonly code = ERROR_CODE.INVALID_ROUTE_STATUS_TRANSITION;
  readonly httpStatus = 409;
  constructor(id: string, status: string, action: string) {
    super(`Route "${id}" in status "${status}" cannot perform "${action}"`, { id, status, action });
    this.name = 'RouteStateConflictError';
  }
}
export class RouteTooLongError extends ApplicationError {
  readonly code = ERROR_CODE.ROUTE_TOO_LONG;
  readonly httpStatus = 400;
  constructor(id: string, stops: number, max: number) {
    super(`Route "${id}" has ${stops} stops, exceeds max ${max}`, { id, stops, max });
    this.name = 'RouteTooLongError';
  }
}
export class RouteOperationError extends ApplicationError {
  readonly code = ERROR_CODE.LOGISTICS_GENERIC_FAILURE;
  readonly httpStatus = 500;
  constructor(op: string, cause: string) { super(`Route.${op} failed: ${cause}`, { op }); this.name = 'RouteOperationError'; }
}
