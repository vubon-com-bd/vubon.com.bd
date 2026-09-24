import { SupportAgentEntity } from '../entities/support-agent.entity';

export class AgentAvailabilityService {
  isAvailable(agent: SupportAgentEntity): boolean {
    return agent.isAvailable;
  }

  filterAvailable(
    agents: readonly SupportAgentEntity[],
  ): readonly SupportAgentEntity[] {
    return agents.filter((a) => this.isAvailable(a));
  }
}
