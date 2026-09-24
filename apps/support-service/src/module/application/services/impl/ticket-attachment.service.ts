import { Injectable } from '@nestjs/common';
import type { TicketAttachmentServiceInterface } from '../interfaces/ticket-attachment.service.interface';
import type { TicketAttachmentRepository } from '../../../domain/repositories/ticket-attachment.repository.interface';
import { TicketAttachmentEntity } from '../../../domain/entities/ticket-attachment.entity';
import { AttachmentIdVO } from '../../../domain/value-objects/primitives/attachment-id.vo';
import { AttachmentTypeVO } from '../../../domain/value-objects/primitives/attachment-type.vo';
import { AttachmentUrlVO } from '../../../domain/value-objects/primitives/attachment-url.vo';
import { AttachmentSizeVO } from '../../../domain/value-objects/primitives/attachment-size.vo';
import { TicketIdVO } from '../../../domain/value-objects/primitives/ticket-id.vo';
import { MessageIdVO } from '../../../domain/value-objects/primitives/message-id.vo';
import type { UploadAttachmentRequestDTO } from '../../dtos/requests/attachment';

@Injectable()
export class TicketAttachmentService implements TicketAttachmentServiceInterface {
  constructor(private readonly attachmentRepo: TicketAttachmentRepository) {}

  async upload(input: UploadAttachmentRequestDTO): Promise<{ id: string; url: string }> {
    const entity = TicketAttachmentEntity.create({
      ticketId: TicketIdVO.create(input.ticketId ?? crypto.randomUUID()),
      messageId: input.messageId ? MessageIdVO.create(input.messageId) : null,
      type: AttachmentTypeVO.create(input.type),
      url: AttachmentUrlVO.create(input.url),
      size: AttachmentSizeVO.create(input.size),
    });
    const saved = await this.attachmentRepo.save(entity);
    return { id: saved.id.value, url: saved.url.value };
  }

  async findById(id: AttachmentIdVO): Promise<TicketAttachmentEntity | null> {
    return this.attachmentRepo.findById(id);
  }

  async delete(id: AttachmentIdVO): Promise<void> {
    await this.attachmentRepo.delete(id);
  }
}
