import { TicketEntity } from '../entities/ticket.entity';
import { SupportAgentEntity } from '../entities/support-agent.entity';

export class TicketRoutingService {
  selectAgent(
    _ticket: TicketEntity,
    availableAgents: readonly SupportAgentEntity[],
  ): SupportAgentEntity | null {
    if (availableAgents.length === 0) return null;
    const sorted = [...availableAgents].sort(
      (a, b) => a.currentLoad - b.currentLoad,
    );
    return sorted[0] ?? null;
  }
}
