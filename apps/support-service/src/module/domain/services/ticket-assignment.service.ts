import { TicketEntity } from '../entities/ticket.entity';
import { SupportAgentEntity } from '../entities/support-agent.entity';
import { TicketRoutingService } from './ticket-routing.service';

export class TicketAssignmentService {
  constructor(private readonly routing: TicketRoutingService) {}

  assign(
    ticket: TicketEntity,
    agents: readonly SupportAgentEntity[],
  ): TicketEntity | null {
    const agent = this.routing.selectAgent(ticket, agents);
    if (!agent) return null;
    return ticket.assignTo(agent.id);
  }
}
