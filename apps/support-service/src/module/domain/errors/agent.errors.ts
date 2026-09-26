/**
 * Support agent domain errors
 * @module support-service/domain/errors
 */
import { DomainError } from '@vubon/shared-kernel/domain/errors/domain.error';
import { ERROR_CODE } from '@vubon/shared-constants/common';
import { AgentIdVO } from '../value-objects/primitives/agent-id.vo';
import { TeamIdVO } from '../value-objects/primitives/team-id.vo';
import { TicketIdVO } from '../value-objects/primitives/ticket-id.vo';

export class AgentNotFoundError extends DomainError {
  readonly code = ERROR_CODE.SUPPORT_AGENT_NOT_FOUND;
  readonly httpStatus = 404;
  constructor(public readonly agentId: AgentIdVO) {
    super(`Support agent not found: ${agentId.value}`, { agentId: agentId.value });
    this.name = 'AgentNotFoundError';
  }
}

export class AgentNotAvailableError extends DomainError {
  readonly code = ERROR_CODE.SUPPORT_AGENT_UNAVAILABLE;
  readonly httpStatus = 409;
  constructor(public readonly agentId: AgentIdVO) {
    super(`Agent is not available: ${agentId.value}`, { agentId: agentId.value });
    this.name = 'AgentNotAvailableError';
  }
}

export class AgentTeamDuplicateError extends DomainError {
  readonly code = ERROR_CODE.SUPPORT_AGENT_UNAVAILABLE;
  readonly httpStatus = 409;
  constructor(public readonly agentId: AgentIdVO, public readonly teamId: TeamIdVO) {
    super(`Agent already in team: ${teamId.value}`, {
      agentId: agentId.value, teamId: teamId.value,
    });
    this.name = 'AgentTeamDuplicateError';
  }
}

export class AgentTicketDuplicateError extends DomainError {
  readonly code = ERROR_CODE.SUPPORT_TICKET_ALREADY_ASSIGNED;
  readonly httpStatus = 409;
  constructor(public readonly agentId: AgentIdVO, public readonly ticketId: TicketIdVO) {
    super(`Ticket already assigned to agent: ${ticketId.value}`, {
      agentId: agentId.value, ticketId: ticketId.value,
    });
    this.name = 'AgentTicketDuplicateError';
  }
}
