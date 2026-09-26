/**
 * SLA domain errors
 * @module support-service/domain/errors
 */
import { DomainError } from '@vubon/shared-kernel/domain/errors/domain.error';
import { ERROR_CODE } from '@vubon/shared-constants/common';
import { SlaIdVO } from '../value-objects/primitives/sla-id.vo';
import { TicketIdVO } from '../value-objects/primitives/ticket-id.vo';

export class SlaNotFoundError extends DomainError {
  readonly code = ERROR_CODE.SUPPORT_SLA_NOT_FOUND;
  readonly httpStatus = 404;
  constructor(public readonly slaId: SlaIdVO) {
    super(`SLA not found: ${slaId.value}`, { slaId: slaId.value });
    this.name = 'SlaNotFoundError';
  }
}

export class SlaBreachedError extends DomainError {
  readonly code = ERROR_CODE.SUPPORT_SLA_BREACHED;
  readonly httpStatus = 409;
  constructor(
    public readonly slaId: SlaIdVO,
    public readonly ticketId: TicketIdVO,
    public readonly targetMinutes: number,
    public readonly actualMinutes: number,
  ) {
    super(`SLA breached for ticket ${ticketId.value}`, {
      slaId: slaId.value, ticketId: ticketId.value, targetMinutes, actualMinutes,
    });
    this.name = 'SlaBreachedError';
  }
}

export class SlaTerminalError extends DomainError {
  readonly code = ERROR_CODE.SUPPORT_SLA_BREACHED;
  readonly httpStatus = 409;
  constructor(public readonly slaId: SlaIdVO, public readonly action: string) {
    super(`Cannot ${action} a terminal SLA`, { slaId: slaId.value, action });
    this.name = 'SlaTerminalError';
  }
}
