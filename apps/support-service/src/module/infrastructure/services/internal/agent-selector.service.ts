import { Injectable } from '@nestjs/common';
import { SupportAgentEntity } from '../../../domain/entities/support-agent.entity';

@Injectable()
export class AgentSelectorService {
  filterAvailable(
    agents: readonly SupportAgentEntity[],
  ): readonly SupportAgentEntity[] {
    return agents.filter((a) => a.isAvailable);
  }

  filterBySkill(
    agents: readonly SupportAgentEntity[],
    skill: string,
  ): readonly SupportAgentEntity[] {
    return agents.filter((a) => a.skills.includes(skill));
  }

  sortByLoad(
    agents: readonly SupportAgentEntity[],
  ): readonly SupportAgentEntity[] {
    return [...agents].sort((a, b) => a.currentLoad - b.currentLoad);
  }
}
