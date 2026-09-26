import { DomainError } from '@vubon/shared-kernel/domain/errors/domain.error';
import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';

export class ScheduleNotFoundError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.SERVER_INTERNAL;
  readonly httpStatus = 404;

  constructor(id: string) {
    super(`Schedule not found: ${id}`, { id });
  }
}

export class ScheduleConflictError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.VAL_DUPLICATE;
  readonly httpStatus = 409;

  constructor(message: string) {
    super(`Schedule conflict: ${message}`, { message });
  }
}
