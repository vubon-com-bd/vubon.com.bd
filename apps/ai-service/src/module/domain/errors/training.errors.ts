import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';
import { DomainError } from '@vubon/shared-kernel/domain/errors/domain.error';

export class TrainingFailedError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.SERVER_INTERNAL;
  readonly httpStatus = 500;

  constructor(trainingId: string, reason: string) {
    super(`Training failed for ${trainingId}: ${reason}`, {
      trainingId,
      reason,
    });
  }
}

export class InsufficientDataError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.VAL_OUT_OF_RANGE;
  readonly httpStatus = 400;

  constructor(required: number, provided: number) {
    super(`Insufficient data: required ${required}, provided ${provided}`, {
      required,
      provided,
    });
  }
}
