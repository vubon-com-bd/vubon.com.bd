/**
 * AgentWorkloadService — Analyze and balance agent load
 * @module support-service/domain/services
 */
import { SupportAgentEntity } from '../entities/support-agent.entity';
import { AgentIdVO } from '../value-objects/primitives/agent-id.vo';

export interface AgentLoad {
  readonly agentId: string;
  readonly current: number;
  readonly max: number;
  readonly utilizationPercent: number;
}

export class AgentWorkloadService {
  load(agent: SupportAgentEntity): AgentLoad {
    return {
      agentId: agent.id.value,
      current: agent.currentLoad,
      max: agent.maxConcurrentTickets,
      utilizationPercent: Math.round(agent.utilizationPercent * 100) / 100,
    };
  }

  averageUtilization(agents: readonly SupportAgentEntity[]): number {
    if (agents.length === 0) return 0;
    const total = agents.reduce((sum, a) => sum + a.utilizationPercent, 0);
    return Math.round((total / agents.length) * 100) / 100;
  }

  pickLeastLoaded(agents: readonly SupportAgentEntity[]): SupportAgentEntity | null {
    const eligible = agents.filter((a) => a.canTakeTicket);
    if (eligible.length === 0) return null;
    return eligible.reduce((best, cur) =>
      cur.utilizationPercent < best.utilizationPercent ? cur : best,
    );
  }

  pickMostLoaded(agents: readonly SupportAgentEntity[]): SupportAgentEntity | null {
    const eligible = agents.filter((a) => a.currentLoad > 0);
    if (eligible.length === 0) return null;
    return eligible.reduce((best, cur) =>
      cur.utilizationPercent > best.utilizationPercent ? cur : best,
    );
  }

  isOverloaded(agent: SupportAgentEntity): boolean {
    return agent.utilizationPercent >= 90;
  }

  overloadedAgents(agents: readonly SupportAgentEntity[]): readonly AgentIdVO[] {
    return agents.filter((a) => this.isOverloaded(a)).map((a) => a.id);
  }
}
