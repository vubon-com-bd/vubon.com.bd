import { SupportAgentEntity } from '../entities/support-agent.entity';

export class AgentWorkloadService {
  isOverloaded(agent: SupportAgentEntity): boolean {
    return agent.currentLoad >= agent.maxLoad;
  }

  utilizationPercent(agent: SupportAgentEntity): number {
    if (agent.maxLoad === 0) return 0;
    return Math.round((agent.currentLoad / agent.maxLoad) * 100);
  }

  sortByLoad(agents: readonly SupportAgentEntity[]): readonly SupportAgentEntity[] {
    return [...agents].sort((a, b) => a.currentLoad - b.currentLoad);
  }
}
