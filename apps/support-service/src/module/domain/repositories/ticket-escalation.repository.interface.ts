import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { TicketEscalationEntity } from '../entities/ticket-escalation.entity';
import { TicketEscalationIdVO } from '../value-objects/primitives/ticket-escalation-id.vo';
import { TicketIdVO } from '../value-objects/primitives/ticket-id.vo';

export interface TicketEscalationRepository extends BaseRepository<TicketEscalationEntity, TicketEscalationIdVO> {
  findByTicket(ticketId: TicketIdVO): Promise<readonly TicketEscalationEntity[]>;
}
