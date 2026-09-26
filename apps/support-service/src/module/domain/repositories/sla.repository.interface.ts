/**
 * SlaRepository — Repository interface
 * @module support-service/domain/repositories
 */
import { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { SlaEntity } from '../entities/sla.entity';
import { SlaIdVO } from '../value-objects/primitives/sla-id.vo';
import { SlaStatusVO } from '../value-objects/primitives/sla-status.vo';
import { SlaTypeVO } from '../value-objects/primitives/sla-type.vo';
import { TicketIdVO } from '../value-objects/primitives/ticket-id.vo';
import { TicketPriorityVO } from '../value-objects/primitives/ticket-priority.vo';

export interface SlaRepository
  extends BaseRepository<SlaEntity, SlaIdVO> {
  findByTicket(ticketId: TicketIdVO): Promise<readonly SlaEntity[]>;
  findByType(type: SlaTypeVO): Promise<readonly SlaEntity[]>;
  findByPriority(priority: TicketPriorityVO): Promise<readonly SlaEntity[]>;
  findByStatus(status: SlaStatusVO): Promise<readonly SlaEntity[]>;
  findAtRisk(): Promise<readonly SlaEntity[]>;
  findBreached(): Promise<readonly SlaEntity[]>;
}
