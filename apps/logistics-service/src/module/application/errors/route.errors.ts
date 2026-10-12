/**
 * Route application errors
 * @module logistics-service/application/errors
 */
import { ApplicationError } from '@vubon/shared-kernel/application/errors';
import { ERROR_CODE } from '@vubon/shared-constants/common';

export class RouteNotFoundApplicationError extends ApplicationError {
  readonly code = ERROR_CODE.ROUTE_NOT_FOUND;
  readonly httpStatus = 404;
  constructor(public readonly routeId: string) {
    super(`Route "${routeId}" not found`, { routeId });
    this.name = 'RouteNotFoundApplicationError';
  }
}

export class RouteTooLongApplicationError extends ApplicationError {
  readonly code = ERROR_CODE.ROUTE_TOO_LONG;
  readonly httpStatus = 422;
  constructor(public readonly routeId: string, reason: string) {
    super(`Route "${routeId}" too long: ${reason}`, { routeId, reason });
    this.name = 'RouteTooLongApplicationError';
  }
}

export class RouteOperationFailedApplicationError extends ApplicationError {
  readonly code = ERROR_CODE.SERVER_INTERNAL;
  readonly httpStatus = 400;
  constructor(public readonly operation: string, reason: string, public readonly routeId?: string) {
    super(`Route ${operation} failed: ${reason}`, { operation, routeId });
    this.name = 'RouteOperationFailedApplicationError';
  }
}
