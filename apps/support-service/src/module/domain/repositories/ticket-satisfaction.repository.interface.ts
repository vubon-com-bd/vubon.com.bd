/**
 * TicketSatisfactionRepository — Repository interface
 * @module support-service/domain/repositories
 */
import { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { TicketSatisfactionEntity } from '../entities/ticket-satisfaction.entity';
import { TicketSatisfactionIdVO } from '../value-objects/primitives/ticket-satisfaction-id.vo';
import { TicketIdVO } from '../value-objects/primitives/ticket-id.vo';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';

export interface TicketSatisfactionRepository
  extends BaseRepository<TicketSatisfactionEntity, TicketSatisfactionIdVO> {
  findByTicket(ticketId: TicketIdVO): Promise<TicketSatisfactionEntity | null>;
  findByUser(userId: UserIdVO): Promise<readonly TicketSatisfactionEntity[]>;
  findNegative(): Promise<readonly TicketSatisfactionEntity[]>;
  averageScore(): Promise<number>;
}
