/**
 * TicketAttachmentRepository — Repository interface
 * @module support-service/domain/repositories
 */
import { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { TicketAttachmentEntity } from '../entities/ticket-attachment.entity';
import { AttachmentIdVO } from '../value-objects/primitives/attachment-id.vo';
import { TicketIdVO } from '../value-objects/primitives/ticket-id.vo';
import { MessageIdVO } from '../value-objects/primitives/message-id.vo';
import { AttachmentTypeVO } from '../value-objects/primitives/attachment-type.vo';

export interface TicketAttachmentRepository
  extends BaseRepository<TicketAttachmentEntity, AttachmentIdVO> {
  findByTicket(ticketId: TicketIdVO): Promise<readonly TicketAttachmentEntity[]>;
  findByMessage(messageId: MessageIdVO): Promise<readonly TicketAttachmentEntity[]>;
  findByType(type: AttachmentTypeVO): Promise<readonly TicketAttachmentEntity[]>;
  countByTicket(ticketId: TicketIdVO): Promise<number>;
  totalSizeByTicket(ticketId: TicketIdVO): Promise<number>;
}
