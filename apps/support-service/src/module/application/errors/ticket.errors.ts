/**
 * Ticket application errors
 * @module support-service/application/errors
 *
 * Registry: extends ApplicationError
 * Rule: `code` must be a known ERROR_CODE value; `httpStatus` required
 * Note: ERROR_CODE lacks support-specific codes → mapped to closest generic
 */
import { ERROR_CODE } from '@vubon/shared-constants/common';
import { ApplicationError } from '@vubon/shared-kernel/application/errors/application.error';

export class TicketNotFoundException extends ApplicationError {
  readonly code = ERROR_CODE.USER_NOT_FOUND;
  readonly httpStatus = 404;

  constructor(public readonly ticketId: string) {
    super(`Ticket not found: ${ticketId}`, { ticketId });
    this.name = 'TicketNotFoundException';
  }
}

export class TicketAlreadyClosedException extends ApplicationError {
  readonly code = ERROR_CODE.VAL_DUPLICATE;
  readonly httpStatus = 409;

  constructor(public readonly ticketId: string) {
    super(`Ticket already closed: ${ticketId}`, { ticketId });
    this.name = 'TicketAlreadyClosedException';
  }
}

export class TicketUnauthorizedException extends ApplicationError {
  readonly code = ERROR_CODE.AUTH_FORBIDDEN;
  readonly httpStatus = 403;

  constructor(public readonly ticketId: string, public readonly action: string) {
    super(`Not allowed to ${action} ticket ${ticketId}`, { ticketId, action });
    this.name = 'TicketUnauthorizedException';
  }
}

export class TicketOperationFailedException extends ApplicationError {
  readonly code = ERROR_CODE.VAL_INVALID_FORMAT;
  readonly httpStatus = 422;

  constructor(public readonly ticketId: string, public readonly reason: string) {
    super(`Ticket operation failed: ${reason}`, { ticketId, reason });
    this.name = 'TicketOperationFailedException';
  }
}
