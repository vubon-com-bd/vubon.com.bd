import { DomainError } from '@vubon/shared-kernel/domain/errors/domain.error';
import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';

export class BroadcastNotFoundError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.SERVER_INTERNAL;
  readonly httpStatus = 404;

  constructor(id: string) {
    super(`Broadcast not found: ${id}`, { id });
  }
}

export class BroadcastLimitExceededError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.RATE_LIMIT_EXCEEDED;
  readonly httpStatus = 429;

  constructor(limit: number) {
    super(`Broadcast limit exceeded: max ${limit}`, { limit });
  }
}
