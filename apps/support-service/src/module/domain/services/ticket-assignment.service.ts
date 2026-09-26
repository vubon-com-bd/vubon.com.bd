/**
 * TicketAssignmentService — Assign tickets to agents
 * @module support-service/domain/services
 */
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { TicketEntity } from '../entities/ticket.entity';
import { SupportAgentEntity } from '../entities/support-agent.entity';
import { AgentIdVO } from '../value-objects/primitives/agent-id.vo';
import type { SupportAgentRepository } from '../repositories/support-agent.repository.interface';

export class TicketAssignmentService {
  constructor(private readonly agentRepo: SupportAgentRepository) {}

  async assignToSpecific(
    ticket: TicketEntity,
    agent: SupportAgentEntity,
    now: string,
  ): Promise<void> {
    if (!agent.canTakeTicket) {
      throw new BusinessRuleError(
        'Agent is unavailable or over capacity',
        'ticketAssignment.agent_unavailable',
      );
    }
    ticket.assignTo(agent.id, now);
    agent.assignTicket(ticket.id, now);
  }

  async unassign(
    ticket: TicketEntity,
    agent: SupportAgentEntity,
    now: string,
  ): Promise<void> {
    if (!ticket.isAssigned) return;
    const current = ticket.assignedAgentId;
    if (!current || !current.equals(agent.id)) {
      throw new BusinessRuleError(
        'Agent is not assigned to this ticket',
        'ticketAssignment.mismatch',
      );
    }
    agent.releaseTicket(ticket.id, now);
  }

  async reassign(
    ticket: TicketEntity,
    from: SupportAgentEntity,
    to: SupportAgentEntity,
    now: string,
  ): Promise<void> {
    await this.unassign(ticket, from, now);
    await this.assignToSpecific(ticket, to, now);
  }

  async nextAvailable(): Promise<AgentIdVO | null> {
    const agents = await this.agentRepo.findLeastLoaded();
    const candidate = agents.find((a) => a.canTakeTicket);
    return candidate ? candidate.id : null;
  }
}
