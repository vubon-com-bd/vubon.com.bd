import { DomainError } from '@vubon/shared-kernel/domain/errors/domain.error';
import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';

export class TicketNotFoundError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.SERVER_INTERNAL;
  readonly httpStatus = 404;

  constructor(ticketId: string) {
    super(`Ticket not found: ${ticketId}`, { ticketId });
  }
}

export class TicketAlreadyClosedError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.SERVER_INTERNAL;
  readonly httpStatus = 409;

  constructor(ticketId: string) {
    super(`Ticket already closed: ${ticketId}`, { ticketId });
  }
}
