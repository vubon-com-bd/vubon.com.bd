/**
 * TicketEscalationRepository — Repository interface
 * @module support-service/domain/repositories
 */
import { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { TicketEscalationEntity } from '../entities/ticket-escalation.entity';
import { TicketEscalationIdVO } from '../value-objects/primitives/ticket-escalation-id.vo';
import { TicketEscalationLevelVO } from '../value-objects/primitives/ticket-escalation-level.vo';
import { TicketIdVO } from '../value-objects/primitives/ticket-id.vo';

export interface TicketEscalationRepository
  extends BaseRepository<TicketEscalationEntity, TicketEscalationIdVO> {
  findByTicket(ticketId: TicketIdVO): Promise<readonly TicketEscalationEntity[]>;
  findUnresolvedByTicket(ticketId: TicketIdVO): Promise<readonly TicketEscalationEntity[]>;
  findByLevel(level: TicketEscalationLevelVO): Promise<readonly TicketEscalationEntity[]>;
  countByTicket(ticketId: TicketIdVO): Promise<number>;
}
