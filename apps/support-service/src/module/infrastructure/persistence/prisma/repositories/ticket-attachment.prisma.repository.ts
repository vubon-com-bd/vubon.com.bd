/**
 * TicketAttachmentPrismaRepository
 * @module support-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable } from '@nestjs/common';
import { SupportPrismaService } from '../prisma.service';
import { TicketAttachmentRepository } from '../../../../domain/repositories/ticket-attachment.repository.interface';
import { TicketAttachmentEntity } from '../../../../domain/entities/ticket-attachment.entity';
import { AttachmentIdVO } from '../../../../domain/value-objects/primitives/attachment-id.vo';
import { TicketIdVO } from '../../../../domain/value-objects/primitives/ticket-id.vo';
import { MessageIdVO } from '../../../../domain/value-objects/primitives/message-id.vo';
import { AttachmentTypeVO } from '../../../../domain/value-objects/primitives/attachment-type.vo';
import { TicketAttachmentMapper } from '../mappers/ticket-attachment.mapper';

@Injectable()
export class TicketAttachmentPrismaRepository
  implements TicketAttachmentRepository
{
  constructor(
    private readonly prisma: SupportPrismaService,
    private readonly mapper: TicketAttachmentMapper,
  ) {}

  async findById(id: AttachmentIdVO): Promise<TicketAttachmentEntity | null> {
    const raw = await this.prisma.ticketAttachment.findUnique({
      where: { id: id.value },
    });
    return raw ? this.mapper.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly TicketAttachmentEntity[]> {
    const rows = await this.prisma.ticketAttachment.findMany();
    return rows.map((r) => this.mapper.toDomain(r));
  }

  async save(entity: TicketAttachmentEntity): Promise<TicketAttachmentEntity> {
    const data = this.mapper.toPersistence(entity);
    const raw = await this.prisma.ticketAttachment.upsert({
      where: { id: data.id },
      create: { ...data },
      update: { messageId: data.messageId, updatedAt: new Date() },
    });
    return this.mapper.toDomain(raw);
  }

  async delete(id: AttachmentIdVO): Promise<void> {
    await this.prisma.ticketAttachment.delete({ where: { id: id.value } });
  }

  async exists(id: AttachmentIdVO): Promise<boolean> {
    const count = await this.prisma.ticketAttachment.count({
      where: { id: id.value },
    });
    return count > 0;
  }

  async findByTicket(ticketId: TicketIdVO): Promise<readonly TicketAttachmentEntity[]> {
    const rows = await this.prisma.ticketAttachment.findMany({
      where: { ticketId: ticketId.value },
    });
    return rows.map((r) => this.mapper.toDomain(r));
  }

  async findByMessage(messageId: MessageIdVO): Promise<readonly TicketAttachmentEntity[]> {
    const rows = await this.prisma.ticketAttachment.findMany({
      where: { messageId: messageId.value },
    });
    return rows.map((r) => this.mapper.toDomain(r));
  }

  async findByType(type: AttachmentTypeVO): Promise<readonly TicketAttachmentEntity[]> {
    const rows = await this.prisma.ticketAttachment.findMany({
      where: { type: type.value },
    });
    return rows.map((r) => this.mapper.toDomain(r));
  }

  async countByTicket(ticketId: TicketIdVO): Promise<number> {
    return this.prisma.ticketAttachment.count({
      where: { ticketId: ticketId.value },
    });
  }

  async totalSizeByTicket(ticketId: TicketIdVO): Promise<number> {
    const result = await this.prisma.ticketAttachment.aggregate({
      where: { ticketId: ticketId.value },
      _sum: { size: true },
    });
    return result._sum.size ?? 0;
  }
}
