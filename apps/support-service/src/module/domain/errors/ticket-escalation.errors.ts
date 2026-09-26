/**
 * Ticket escalation domain errors
 * @module support-service/domain/errors
 */
import { DomainError } from '@vubon/shared-kernel/domain/errors/domain.error';
import { ERROR_CODE } from '@vubon/shared-constants/common';
import { TicketEscalationIdVO } from '../value-objects/primitives/ticket-escalation-id.vo';
import { TicketIdVO } from '../value-objects/primitives/ticket-id.vo';

export class EscalationNotFoundError extends DomainError {
  readonly code = ERROR_CODE.SUPPORT_ESCALATION_NOT_FOUND;
  readonly httpStatus = 404;
  constructor(public readonly escalationId: TicketEscalationIdVO) {
    super(`Escalation not found: ${escalationId.value}`, { escalationId: escalationId.value });
    this.name = 'EscalationNotFoundError';
  }
}

export class CannotEscalateError extends DomainError {
  readonly code = ERROR_CODE.SUPPORT_ESCALATION_NOT_ALLOWED;
  readonly httpStatus = 409;
  constructor(public readonly ticketId: TicketIdVO, public readonly reason: string) {
    super(`Cannot escalate ticket: ${reason}`, { ticketId: ticketId.value, reason });
    this.name = 'CannotEscalateError';
  }
}

export class EscalationAlreadyResolvedError extends DomainError {
  readonly code = ERROR_CODE.SUPPORT_ESCALATION_ALREADY_RESOLVED;
  readonly httpStatus = 409;
  constructor(public readonly escalationId: TicketEscalationIdVO) {
    super(`Escalation already resolved: ${escalationId.value}`, { escalationId: escalationId.value });
    this.name = 'EscalationAlreadyResolvedError';
  }
}
