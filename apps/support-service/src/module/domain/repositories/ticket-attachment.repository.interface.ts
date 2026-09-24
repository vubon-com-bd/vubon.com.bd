import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { TicketAttachmentEntity } from '../entities/ticket-attachment.entity';
import { AttachmentIdVO } from '../value-objects/primitives/attachment-id.vo';
import { TicketIdVO } from '../value-objects/primitives/ticket-id.vo';

export interface TicketAttachmentRepository extends BaseRepository<TicketAttachmentEntity, AttachmentIdVO> {
  findByTicket(ticketId: TicketIdVO): Promise<readonly TicketAttachmentEntity[]>;
}
