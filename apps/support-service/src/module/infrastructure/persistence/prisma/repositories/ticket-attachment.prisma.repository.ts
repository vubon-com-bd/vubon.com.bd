import { Injectable } from '@nestjs/common';
import { TicketAttachment as PrismaTicketAttachment } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { TicketAttachmentEntity } from '../../../../domain/entities/ticket-attachment.entity';
import { AttachmentIdVO } from '../../../../domain/value-objects/primitives/attachment-id.vo';
import { AttachmentTypeVO } from '../../../../domain/value-objects/primitives/attachment-type.vo';
import { AttachmentUrlVO } from '../../../../domain/value-objects/primitives/attachment-url.vo';
import { AttachmentSizeVO } from '../../../../domain/value-objects/primitives/attachment-size.vo';
import { TicketIdVO } from '../../../../domain/value-objects/primitives/ticket-id.vo';
import { MessageIdVO } from '../../../../domain/value-objects/primitives/message-id.vo';
import type { TicketAttachmentRepository } from '../../../../domain/repositories/ticket-attachment.repository.interface';

@Injectable()
export class TicketAttachmentPrismaRepository
  extends BasePrismaRepository<TicketAttachmentEntity, AttachmentIdVO>
  implements TicketAttachmentRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaTicketAttachment): TicketAttachmentEntity {
    return TicketAttachmentEntity.reconstitute(
      AttachmentIdVO.create(raw.id),
      {
        ticketId: TicketIdVO.create(raw.ticketId),
        messageId: raw.messageId ? MessageIdVO.create(raw.messageId) : null,
        type: AttachmentTypeVO.create(raw.type),
        url: AttachmentUrlVO.create(raw.url),
        size: AttachmentSizeVO.create(raw.size),
      },
      raw.createdAt.toISOString(),
      raw.createdAt.toISOString(),
      null,
    );
  }

  async findById(id: AttachmentIdVO): Promise<TicketAttachmentEntity | null> {
    const raw = await this.prisma.ticketAttachment.findUnique({ where: { id: id.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly TicketAttachmentEntity[]> {
    const rows = await this.prisma.ticketAttachment.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: TicketAttachmentEntity): Promise<TicketAttachmentEntity> {
    const data = {
      ticketId: entity.ticketId.value,
      messageId: entity.messageId?.value ?? null,
      type: entity.type.value,
      url: entity.url.value,
      size: entity.size.value,
    };
    const raw = await this.prisma.ticketAttachment.upsert({
      where: { id: entity.id.value },
      create: { id: entity.id.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: AttachmentIdVO): Promise<void> {
    await this.prisma.ticketAttachment.delete({ where: { id: id.value } });
  }

  async findByTicket(ticketId: TicketIdVO): Promise<readonly TicketAttachmentEntity[]> {
    const rows = await this.prisma.ticketAttachment.findMany({
      where: { ticketId: ticketId.value },
    });
    return rows.map((r) => this.toDomain(r));
  }
}
