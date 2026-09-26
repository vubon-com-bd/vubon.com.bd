/**
 * Ticket assignment domain errors
 * @module support-service/domain/errors
 */
import { DomainError } from '@vubon/shared-kernel/domain/errors/domain.error';
import { ERROR_CODE } from '@vubon/shared-constants/common';
import { AgentIdVO } from '../value-objects/primitives/agent-id.vo';
import { TicketIdVO } from '../value-objects/primitives/ticket-id.vo';

export class NoAgentAvailableError extends DomainError {
  readonly code = ERROR_CODE.SUPPORT_NO_AGENT_AVAILABLE;
  readonly httpStatus = 503;
  constructor(public readonly ticketId?: TicketIdVO) {
    super('No available agent for assignment', { ticketId: ticketId?.value });
    this.name = 'NoAgentAvailableError';
  }
}

export class AssignmentAgentNotAvailableError extends DomainError {
  readonly code = ERROR_CODE.SUPPORT_AGENT_NOT_AVAILABLE;
  readonly httpStatus = 409;
  constructor(public readonly agentId: AgentIdVO) {
    super(`Agent not available: ${agentId.value}`, { agentId: agentId.value });
    this.name = 'AssignmentAgentNotAvailableError';
  }
}

export class AgentCapacityExceededError extends DomainError {
  readonly code = ERROR_CODE.SUPPORT_AGENT_CAPACITY_EXCEEDED;
  readonly httpStatus = 409;
  constructor(
    public readonly agentId: AgentIdVO,
    public readonly currentLoad: number,
    public readonly maxLoad: number,
  ) {
    super(`Agent ${agentId.value} at capacity (${currentLoad}/${maxLoad})`, {
      agentId: agentId.value, currentLoad, maxLoad,
    });
    this.name = 'AgentCapacityExceededError';
  }
}

export class TicketAlreadyAssignedError extends DomainError {
  readonly code = ERROR_CODE.SUPPORT_TICKET_ALREADY_ASSIGNED;
  readonly httpStatus = 409;
  constructor(
    public readonly ticketId: TicketIdVO,
    public readonly assignedAgentId: AgentIdVO,
  ) {
    super(`Ticket already assigned to agent ${assignedAgentId.value}`, {
      ticketId: ticketId.value, assignedAgentId: assignedAgentId.value,
    });
    this.name = 'TicketAlreadyAssignedError';
  }
}
