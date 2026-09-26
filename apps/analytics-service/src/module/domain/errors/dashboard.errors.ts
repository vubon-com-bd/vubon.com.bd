import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';
import { DomainError } from '@vubon/shared-kernel/domain/errors/domain.error';

export class DashboardNotFoundError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.VAL_INVALID_FORMAT;
  readonly httpStatus = 404;

  constructor(dashboardId: string) {
    super(`Dashboard not found: ${dashboardId}`, { dashboardId });
  }
}

export class WidgetLimitExceededError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.VAL_OUT_OF_RANGE;
  readonly httpStatus = 400;

  constructor(limit: number) {
    super(`Widget limit exceeded: ${limit}`, { limit });
  }
}
