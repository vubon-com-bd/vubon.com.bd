import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';
import { DomainError } from '@vubon/shared-kernel/domain/errors/domain.error';

export class RouteNotFoundError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.ROUTE_NOT_FOUND;
  readonly httpStatus = 404;

  constructor(routeId: string) {
    super(`Route not found: ${routeId}`, { routeId });
  }
}

export class RouteTooLongError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.ROUTE_TOO_LONG;
  readonly httpStatus = 400;

  constructor(distanceKm: number, maxKm: number) {
    super(`Route too long: ${distanceKm}km > ${maxKm}km`, { distanceKm, maxKm });
  }
}
