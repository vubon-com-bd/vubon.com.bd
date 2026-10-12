/**
 * Dashboard Domain Errors
 * @module analytics-service/domain/errors
 */
import { DomainError } from '@vubon/shared-kernel/domain/errors';
import { ERROR_CODE } from '@vubon/shared-constants/common';

export class DashboardNotFoundError extends DomainError {
  readonly code = ERROR_CODE.SERVER_INTERNAL;
  readonly httpStatus = 404;

  constructor(public readonly dashboardId: string) {
    super(`Dashboard "${dashboardId}" not found`, { dashboardId });
    this.name = 'DashboardNotFoundError';
  }
}

export class WidgetLimitExceededError extends DomainError {
  readonly code = ERROR_CODE.VAL_OUT_OF_RANGE;
  readonly httpStatus = 422;

  constructor(
    public readonly dashboardId: string,
    public readonly currentCount: number,
    public readonly maxCount: number
  ) {
    super(
      `Widget limit exceeded for dashboard "${dashboardId}": ${currentCount}/${maxCount}`,
      { dashboardId, currentCount, maxCount }
    );
    this.name = 'WidgetLimitExceededError';
  }
}

export class DuplicateWidgetError extends DomainError {
  readonly code = ERROR_CODE.VAL_DUPLICATE;
  readonly httpStatus = 409;

  constructor(
    public readonly dashboardId: string,
    public readonly widgetId: string
  ) {
    super(`Widget "${widgetId}" already exists in dashboard "${dashboardId}"`, {
      dashboardId,
      widgetId,
    });
    this.name = 'DuplicateWidgetError';
  }
}

export class WidgetNotFoundError extends DomainError {
  readonly code = ERROR_CODE.SERVER_INTERNAL;
  readonly httpStatus = 404;

  constructor(public readonly widgetId: string) {
    super(`Widget "${widgetId}" not found`, { widgetId });
    this.name = 'WidgetNotFoundError';
  }
}

export class DashboardArchivedError extends DomainError {
  readonly code = ERROR_CODE.VAL_INVALID_FORMAT;
  readonly httpStatus = 422;

  constructor(public readonly dashboardId: string) {
    super(`Dashboard "${dashboardId}" is archived and cannot be modified`, {
      dashboardId,
    });
    this.name = 'DashboardArchivedError';
  }
}

export class DashboardAccessDeniedError extends DomainError {
  readonly code = ERROR_CODE.AUTH_FORBIDDEN;
  readonly httpStatus = 403;

  constructor(
    public readonly dashboardId: string,
    public readonly userId: string
  ) {
    super(`User "${userId}" cannot access dashboard "${dashboardId}"`, {
      dashboardId,
      userId,
    });
    this.name = 'DashboardAccessDeniedError';
  }
}
