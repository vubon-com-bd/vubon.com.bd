import { DomainError } from '@vubon/shared-kernel/domain/errors/domain.error';
import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';

export class CannotEscalateError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.SERVER_INTERNAL;
  readonly httpStatus = 400;

  constructor(ticketId: string, reason: string) {
    super(`Cannot escalate ticket ${ticketId}: ${reason}`, { ticketId, reason });
  }
}
