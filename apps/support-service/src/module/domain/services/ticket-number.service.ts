/**
 * TicketNumberService — Generate and validate ticket numbers
 * @module support-service/domain/services
 *
 * Registry: pure domain service
 * Rules: no framework, no DB directly (uses repo port)
 */
import { TicketNumberVO } from '../value-objects/primitives/ticket-number.vo';
import type { TicketRepository } from '../repositories/ticket.repository.interface';

export class TicketNumberService {
  constructor(private readonly ticketRepo: TicketRepository) {}

  async next(): Promise<TicketNumberVO> {
    const sequence = await this.ticketRepo.nextTicketSequence();
    return TicketNumberVO.fromSequence(sequence);
  }

  format(sequence: number): TicketNumberVO {
    return TicketNumberVO.fromSequence(sequence);
  }

  isSequential(current: TicketNumberVO, next: TicketNumberVO): boolean {
    return next.sequence === current.sequence + 1;
  }
}
