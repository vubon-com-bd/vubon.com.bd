import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';
import { DomainError } from '@vubon/shared-kernel/domain/errors/domain.error';

export class EventNotFoundError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.VAL_INVALID_FORMAT;
  readonly httpStatus = 404;

  constructor(eventId: string) {
    super(`Event not found: ${eventId}`, { eventId });
  }
}

export class InvalidEventPayloadError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.VAL_INVALID_FORMAT;
  readonly httpStatus = 400;

  constructor(reason: string) {
    super(`Invalid event payload: ${reason}`, { reason });
  }
}
