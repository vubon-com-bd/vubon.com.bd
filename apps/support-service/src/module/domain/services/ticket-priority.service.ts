/**
 * TicketPriorityService — Compute and adjust priority
 * @module support-service/domain/services
 *
 * Registry: pure domain service
 */
import { TicketEntity } from '../entities/ticket.entity';
import { TicketPriorityVO } from '../value-objects/primitives/ticket-priority.vo';
import { TICKET_PRIORITY } from '@vubon/shared-constants/support';

export interface PrioritySuggestion {
  readonly priority: TicketPriorityVO;
  readonly reason: string;
}

export class TicketPriorityService {
  /**
   * Derive suggested priority from ticket content.
   * Simple heuristic: urgent keywords + channel + type.
   */
  suggest(ticket: TicketEntity): PrioritySuggestion {
    const text = `${ticket.subject.value} ${ticket.description.value}`.toLowerCase();

    if (this.hasAny(text, ['fraud', 'scam', 'hacked', 'stolen', 'abuse'])) {
      return {
        priority: TicketPriorityVO.create(TICKET_PRIORITY.CRITICAL),
        reason: 'security_fraud_keyword',
      };
    }
    if (this.hasAny(text, ['urgent', 'immediately', 'asap', 'refund', 'not working'])) {
      return {
        priority: TicketPriorityVO.create(TICKET_PRIORITY.URGENT),
        reason: 'urgent_keyword',
      };
    }
    if (ticket.type.isHighPriority()) {
      return {
        priority: TicketPriorityVO.create(TICKET_PRIORITY.HIGH),
        reason: 'high_priority_type',
      };
    }
    return {
      priority: TicketPriorityVO.default(),
      reason: 'default',
    };
  }

  escalateIfNeeded(ticket: TicketEntity, current: TicketPriorityVO): TicketPriorityVO {
    const suggested = this.suggest(ticket).priority;
    return suggested.isHigherThan(current) ? suggested : current;
  }

  private hasAny(haystack: string, needles: readonly string[]): boolean {
    return needles.some((n) => haystack.includes(n));
  }
}
