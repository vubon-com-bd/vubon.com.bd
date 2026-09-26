import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';
import { DomainError } from '@vubon/shared-kernel/domain/errors/domain.error';

export class PersonalizationFailedError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.SERVER_INTERNAL;
  readonly httpStatus = 500;

  constructor(reason: string) {
    super(`Personalization failed: ${reason}`, { reason });
  }
}

export class InsufficientHistoryError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.VAL_OUT_OF_RANGE;
  readonly httpStatus = 400;

  constructor(userId: string, required: number) {
    super(`Insufficient history for ${userId} (need ${required})`, {
      userId,
      required,
    });
  }
}
