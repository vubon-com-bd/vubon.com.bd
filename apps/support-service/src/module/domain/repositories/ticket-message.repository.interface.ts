/**
 * TicketMessageRepository — Repository interface
 * @module support-service/domain/repositories
 */
import { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { TicketMessageEntity } from '../entities/ticket-message.entity';
import { MessageIdVO } from '../value-objects/primitives/message-id.vo';
import { TicketIdVO } from '../value-objects/primitives/ticket-id.vo';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';

export interface TicketMessageRepository
  extends BaseRepository<TicketMessageEntity, MessageIdVO> {
  findByTicket(ticketId: TicketIdVO): Promise<readonly TicketMessageEntity[]>;
  findPublicByTicket(ticketId: TicketIdVO): Promise<readonly TicketMessageEntity[]>;
  findInternalByTicket(ticketId: TicketIdVO): Promise<readonly TicketMessageEntity[]>;
  findByAuthor(userId: UserIdVO): Promise<readonly TicketMessageEntity[]>;
  countByTicket(ticketId: TicketIdVO): Promise<number>;
}
