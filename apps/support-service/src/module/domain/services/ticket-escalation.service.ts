import { TicketEntity } from '../entities/ticket.entity';
import { TicketEscalationEntity } from '../entities/ticket-escalation.entity';
import { TicketEscalationLevelVO } from '../value-objects/primitives/ticket-escalation-level.vo';

export class TicketEscalationService {
  shouldEscalate(ticket: TicketEntity): boolean {
    return ticket.isOpen && !ticket.isAssigned;
  }

  nextLevel(current: TicketEscalationLevelVO | null): TicketEscalationLevelVO {
    const levels = ['L1', 'L2', 'L3', 'L4'];
    if (!current) return TicketEscalationLevelVO.create('L1');
    const idx = levels.indexOf(current.value);
    const next = levels[Math.min(idx + 1, levels.length - 1)];
    return TicketEscalationLevelVO.create(next ?? 'L4');
  }

  buildEscalation(
    ticket: TicketEntity,
    reason: string,
    current: TicketEscalationEntity | null,
  ): TicketEscalationEntity {
    const level = this.nextLevel(current?.level ?? null);
    return TicketEscalationEntity.create({
      ticketId: ticket.id,
      level,
      reason,
      escalatedAt: new Date(),
      resolvedAt: null,
    });
  }
}
