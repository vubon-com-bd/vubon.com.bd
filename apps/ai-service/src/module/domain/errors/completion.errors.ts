import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';
import { DomainError } from '@vubon/shared-kernel/domain/errors/domain.error';

export class CompletionFailedError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.SERVER_INTERNAL;
  readonly httpStatus = 500;

  constructor(reason: string) {
    super(`Completion failed: ${reason}`, { reason });
  }
}

export class TokenLimitExceededError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.VAL_OUT_OF_RANGE;
  readonly httpStatus = 400;

  constructor(used: number, limit: number) {
    super(`Token limit exceeded: ${used} > ${limit}`, { used, limit });
  }
}
