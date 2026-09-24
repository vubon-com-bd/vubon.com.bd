import { Injectable } from '@nestjs/common';
import { Attachment as PrismaAttachment } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { AttachmentEntity } from '../../../../domain/entities/attachment.entity';
import { AttachmentIdVO } from '../../../../domain/value-objects/primitives/attachment-id.vo';
import { AttachmentTypeVO } from '../../../../domain/value-objects/primitives/attachment-type.vo';
import { AttachmentUrlVO } from '../../../../domain/value-objects/primitives/attachment-url.vo';
import { AttachmentSizeVO } from '../../../../domain/value-objects/primitives/attachment-size.vo';
import { MessageIdVO } from '../../../../domain/value-objects/primitives/message-id.vo';
import type { AttachmentRepository } from '../../../../domain/repositories/attachment.repository.interface';

@Injectable()
export class AttachmentPrismaRepository
  extends BasePrismaRepository<AttachmentEntity, AttachmentIdVO>
  implements AttachmentRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaAttachment): AttachmentEntity {
    return AttachmentEntity.reconstitute(
      AttachmentIdVO.create(raw.id),
      {
        messageId: MessageIdVO.create(raw.messageId),
        type: AttachmentTypeVO.create(raw.type),
        url: AttachmentUrlVO.create(raw.url),
        size: AttachmentSizeVO.create(raw.size),
      },
      raw.createdAt.toISOString(),
      raw.createdAt.toISOString(),
      null,
    );
  }

  async findById(id: AttachmentIdVO): Promise<AttachmentEntity | null> {
    const raw = await this.prisma.attachment.findUnique({ where: { id: id.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly AttachmentEntity[]> {
    const rows = await this.prisma.attachment.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: AttachmentEntity): Promise<AttachmentEntity> {
    const data = {
      messageId: entity.messageId.value,
      type: entity.type.value,
      url: entity.url.value,
      size: entity.size.value,
    };
    const raw = await this.prisma.attachment.upsert({
      where: { id: entity.id.value },
      create: { id: entity.id.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: AttachmentIdVO): Promise<void> {
    await this.prisma.attachment.delete({ where: { id: id.value } });
  }

  async findByMessage(messageId: MessageIdVO): Promise<readonly AttachmentEntity[]> {
    const rows = await this.prisma.attachment.findMany({
      where: { messageId: messageId.value },
    });
    return rows.map((r) => this.toDomain(r));
  }
}
