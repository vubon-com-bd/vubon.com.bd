import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';
import { ApplicationError } from '@vubon/shared-kernel/application/errors/application.error';

export class UnboundedQueryError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.VAL_OUT_OF_RANGE;
  readonly httpStatus = 400;

  constructor(reason: string) {
    super(`Unbounded query: ${reason}`, { reason });
  }
}
