/**
 * AgentAvailabilityService — Determine who can take new tickets
 * @module support-service/domain/services
 */
import { SupportAgentEntity } from '../entities/support-agent.entity';
import { AgentIdVO } from '../value-objects/primitives/agent-id.vo';
import { TeamIdVO } from '../value-objects/primitives/team-id.vo';

export interface AvailabilityFilter {
  readonly teamId?: TeamIdVO;
  readonly requireSupervisory?: boolean;
  readonly minFreeSlots?: number;
}

export class AgentAvailabilityService {
  available(
    agents: readonly SupportAgentEntity[],
    filter: AvailabilityFilter = {},
  ): readonly SupportAgentEntity[] {
    return agents.filter((a) => this.matches(a, filter));
  }

  countAvailable(agents: readonly SupportAgentEntity[]): number {
    return agents.filter((a) => a.canTakeTicket).length;
  }

  firstAvailable(
    agents: readonly SupportAgentEntity[],
    filter: AvailabilityFilter = {},
  ): SupportAgentEntity | null {
    return this.available(agents, filter)[0] ?? null;
  }

  findById(
    agents: readonly SupportAgentEntity[],
    agentId: AgentIdVO,
  ): SupportAgentEntity | null {
    return agents.find((a) => a.id.equals(agentId)) ?? null;
  }

  private matches(agent: SupportAgentEntity, filter: AvailabilityFilter): boolean {
    if (!agent.canTakeTicket) return false;
    if (filter.teamId && !agent.teamId?.equals(filter.teamId)) return false;
    if (filter.requireSupervisory && !agent.isSupervisory) return false;
    if (filter.minFreeSlots !== undefined) {
      const free = agent.maxConcurrentTickets - agent.currentLoad;
      if (free < filter.minFreeSlots) return false;
    }
    return true;
  }
}
