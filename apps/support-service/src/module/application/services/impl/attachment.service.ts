import { Injectable } from '@nestjs/common';
import type { AttachmentServiceInterface } from '../interfaces/attachment.service.interface';
import type { AttachmentRepository } from '../../../domain/repositories/attachment.repository.interface';
import { AttachmentEntity } from '../../../domain/entities/attachment.entity';
import { AttachmentIdVO } from '../../../domain/value-objects/primitives/attachment-id.vo';
import { AttachmentTypeVO } from '../../../domain/value-objects/primitives/attachment-type.vo';
import { AttachmentUrlVO } from '../../../domain/value-objects/primitives/attachment-url.vo';
import { AttachmentSizeVO } from '../../../domain/value-objects/primitives/attachment-size.vo';
import { MessageIdVO } from '../../../domain/value-objects/primitives/message-id.vo';
import type { UploadAttachmentRequestDTO } from '../../dtos/requests/attachment';

@Injectable()
export class AttachmentService implements AttachmentServiceInterface {
  constructor(private readonly attachmentRepo: AttachmentRepository) {}

  async upload(input: UploadAttachmentRequestDTO): Promise<{ id: string; url: string }> {
    const entity = AttachmentEntity.create({
      messageId: MessageIdVO.create(input.messageId ?? crypto.randomUUID()),
      type: AttachmentTypeVO.create(input.type),
      url: AttachmentUrlVO.create(input.url),
      size: AttachmentSizeVO.create(input.size),
    });
    const saved = await this.attachmentRepo.save(entity);
    return { id: saved.id.value, url: saved.url.value };
  }

  async findById(id: AttachmentIdVO): Promise<AttachmentEntity | null> {
    return this.attachmentRepo.findById(id);
  }

  async delete(id: AttachmentIdVO): Promise<void> {
    await this.attachmentRepo.delete(id);
  }
}
