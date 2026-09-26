import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';
import { DomainError } from '@vubon/shared-kernel/domain/errors/domain.error';

export class DataRetentionExpiredError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.VAL_OUT_OF_RANGE;
  readonly httpStatus = 410;

  constructor(dataAge: string, retentionPeriod: string) {
    super(`Data retention expired: age ${dataAge}, retention ${retentionPeriod}`, {
      dataAge,
      retentionPeriod,
    });
  }
}

export class InvalidTimeRangeError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.VAL_OUT_OF_RANGE;
  readonly httpStatus = 400;

  constructor(reason: string) {
    super(`Invalid time range: ${reason}`, { reason });
  }
}
