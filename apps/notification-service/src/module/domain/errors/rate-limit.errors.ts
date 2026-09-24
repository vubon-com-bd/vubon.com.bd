import { DomainError } from '@vubon/shared-kernel/domain/errors/domain.error';
import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';

export class RateLimitExceededError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.RATE_LIMIT_EXCEEDED;
  readonly httpStatus = 429;

  constructor(limit: number, windowMs: number) {
    super(`Rate limit exceeded: ${limit} per ${windowMs}ms`, { limit, windowMs });
  }
}

export class QuietHoursError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.AUTH_FORBIDDEN;
  readonly httpStatus = 403;

  constructor() {
    super('Cannot send during quiet hours');
  }
}
