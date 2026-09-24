import { TicketEntity } from '../entities/ticket.entity';

export class TicketPriorityService {
  calculateScore(ticket: TicketEntity): number {
    const priorityWeight: Record<string, number> = {
      low: 1,
      normal: 2,
      high: 3,
      urgent: 4,
      critical: 5,
    };
    return priorityWeight[ticket.priority.value] ?? 1;
  }

  isEscalationRequired(ticket: TicketEntity): boolean {
    return ['urgent', 'critical'].includes(ticket.priority.value);
  }
}
