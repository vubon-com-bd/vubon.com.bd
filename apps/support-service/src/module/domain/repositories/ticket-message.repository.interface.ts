import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { TicketMessageEntity } from '../entities/ticket-message.entity';
import { MessageIdVO } from '../value-objects/primitives/message-id.vo';
import { TicketIdVO } from '../value-objects/primitives/ticket-id.vo';

export interface TicketMessageRepository extends BaseRepository<TicketMessageEntity, MessageIdVO> {
  findByTicket(ticketId: TicketIdVO): Promise<readonly TicketMessageEntity[]>;
}
