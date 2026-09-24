import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { TicketSatisfactionEntity } from '../entities/ticket-satisfaction.entity';
import { TicketSatisfactionIdVO } from '../value-objects/primitives/ticket-satisfaction-id.vo';
import { TicketIdVO } from '../value-objects/primitives/ticket-id.vo';

export interface TicketSatisfactionRepository extends BaseRepository<TicketSatisfactionEntity, TicketSatisfactionIdVO> {
  findByTicket(ticketId: TicketIdVO): Promise<TicketSatisfactionEntity | null>;
}
