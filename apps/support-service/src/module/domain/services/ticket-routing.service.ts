/**
 * TicketRoutingService — Choose best agent for a ticket
 * @module support-service/domain/services
 *
 * Registry: pure domain service
 * Uses: SupportAgentRepository (port)
 */
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { TicketEntity } from '../entities/ticket.entity';
import { SupportAgentEntity } from '../entities/support-agent.entity';
import { AgentIdVO } from '../value-objects/primitives/agent-id.vo';
import type { SupportAgentRepository } from '../repositories/support-agent.repository.interface';

export class TicketRoutingService {
  constructor(private readonly agentRepo: SupportAgentRepository) {}

  async route(ticket: TicketEntity): Promise<SupportAgentEntity | null> {
    const candidates = await this.agentRepo.findAvailable();
    if (candidates.length === 0) return null;

    const eligible = candidates.filter((a) => a.canTakeTicket);
    if (eligible.length === 0) return null;

    const scored = eligible
      .map((agent) => ({ agent, score: this.score(agent, ticket) }))
      .sort((a, b) => b.score - a.score);

    return scored[0]?.agent ?? null;
  }

  async routeOrThrow(ticket: TicketEntity): Promise<AgentIdVO> {
    const agent = await this.route(ticket);
    if (!agent) {
      throw new BusinessRuleError(
        'No available agent for routing',
        'ticketRouting.no_agent',
      );
    }
    return agent.id;
  }

  private score(agent: SupportAgentEntity, ticket: TicketEntity): number {
    let score = 0;
    // Less loaded → higher score
    score += (1 - agent.utilizationPercent / 100) * 50;
    // Supervisory bonus for urgent tickets
    if (ticket.priority.isUrgentOrHigher() && agent.isSupervisory) {
      score += 30;
    }
    // Same-team bonus — placeholder: not enough info, skip
    return score;
  }
}
