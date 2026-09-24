import { Injectable } from '@nestjs/common';
import { SupportAgentEntity } from '../../../domain/entities/support-agent.entity';
import { AgentIdVO } from '../../../domain/value-objects/primitives/agent-id.vo';

@Injectable()
export class TicketRouterService {
  selectAgent(agents: readonly SupportAgentEntity[]): AgentIdVO | null {
    if (agents.length === 0) return null;
    const sorted = [...agents].sort((a, b) => a.currentLoad - b.currentLoad);
    return sorted[0]?.id ?? null;
  }
}
