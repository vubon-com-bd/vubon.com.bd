/**
 * Ticket domain errors
 * @module support-service/domain/errors
 */
import { DomainError } from '@vubon/shared-kernel/domain/errors/domain.error';
import { ERROR_CODE } from '@vubon/shared-constants/common';
import { TicketIdVO } from '../value-objects/primitives/ticket-id.vo';

export class TicketNotFoundError extends DomainError {
  readonly code = ERROR_CODE.SUPPORT_TICKET_NOT_FOUND;
  readonly httpStatus = 404;
  constructor(public readonly ticketId: TicketIdVO) {
    super(`Ticket not found: ${ticketId.value}`, { ticketId: ticketId.value });
    this.name = 'TicketNotFoundError';
  }
}

export class TicketAlreadyClosedError extends DomainError {
  readonly code = ERROR_CODE.SUPPORT_TICKET_ALREADY_CLOSED;
  readonly httpStatus = 409;
  constructor(public readonly ticketId: TicketIdVO) {
    super(`Ticket already closed: ${ticketId.value}`, { ticketId: ticketId.value });
    this.name = 'TicketAlreadyClosedError';
  }
}

export class TicketAlreadyResolvedError extends DomainError {
  readonly code = ERROR_CODE.SUPPORT_TICKET_ALREADY_RESOLVED;
  readonly httpStatus = 409;
  constructor(public readonly ticketId: TicketIdVO) {
    super(`Ticket already resolved: ${ticketId.value}`, { ticketId: ticketId.value });
    this.name = 'TicketAlreadyResolvedError';
  }
}

export class InvalidTicketTransitionError extends DomainError {
  readonly code = ERROR_CODE.SUPPORT_TICKET_INVALID_TRANSITION;
  readonly httpStatus = 422;
  constructor(
    public readonly ticketId: TicketIdVO,
    public readonly from: string,
    public readonly to: string,
  ) {
    super(`Invalid ticket status transition: ${from} → ${to}`, {
      ticketId: ticketId.value, from, to,
    });
    this.name = 'InvalidTicketTransitionError';
  }
}

export class TicketTerminalError extends DomainError {
  readonly code = ERROR_CODE.SUPPORT_TICKET_TERMINAL;
  readonly httpStatus = 409;
  constructor(public readonly ticketId: TicketIdVO, public readonly action: string) {
    super(`Cannot ${action} a terminal ticket`, { ticketId: ticketId.value, action });
    this.name = 'TicketTerminalError';
  }
}
