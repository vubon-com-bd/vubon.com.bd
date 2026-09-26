/**
 * TicketMessagePrismaRepository
 * @module support-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable } from '@nestjs/common';
import { SupportPrismaService } from '../prisma.service';
import { TicketMessageRepository } from '../../../../domain/repositories/ticket-message.repository.interface';
import { TicketMessageEntity } from '../../../../domain/entities/ticket-message.entity';
import { MessageIdVO } from '../../../../domain/value-objects/primitives/message-id.vo';
import { TicketIdVO } from '../../../../domain/value-objects/primitives/ticket-id.vo';
import { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo';
import { TicketMessageMapper } from '../mappers/ticket-message.mapper';

@Injectable()
export class TicketMessagePrismaRepository implements TicketMessageRepository {
  constructor(
    private readonly prisma: SupportPrismaService,
    private readonly mapper: TicketMessageMapper,
  ) {}

  async findById(id: MessageIdVO): Promise<TicketMessageEntity | null> {
    const raw = await this.prisma.ticketMessage.findUnique({
      where: { id: id.value, deletedAt: null },
    });
    return raw ? this.mapper.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly TicketMessageEntity[]> {
    const rows = await this.prisma.ticketMessage.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: 'asc' },
    });
    return rows.map((r) => this.mapper.toDomain(r));
  }

  async save(entity: TicketMessageEntity): Promise<TicketMessageEntity> {
    const data = this.mapper.toPersistence(entity);
    const raw = await this.prisma.ticketMessage.upsert({
      where: { id: data.id },
      create: { ...data, attachments: [...data.attachments] },
      update: {
        content: data.content,
        status: data.status,
        readAt: data.readAt,
        editedAt: data.editedAt,
        attachments: [...data.attachments],
        updatedAt: new Date(),
      },
    });
    return this.mapper.toDomain(raw);
  }

  async delete(id: MessageIdVO): Promise<void> {
    await this.prisma.ticketMessage.update({
      where: { id: id.value },
      data: { deletedAt: new Date() },
    });
  }

  async exists(id: MessageIdVO): Promise<boolean> {
    const count = await this.prisma.ticketMessage.count({
      where: { id: id.value, deletedAt: null },
    });
    return count > 0;
  }

  async findByTicket(ticketId: TicketIdVO): Promise<readonly TicketMessageEntity[]> {
    const rows = await this.prisma.ticketMessage.findMany({
      where: { ticketId: ticketId.value, deletedAt: null },
      orderBy: { createdAt: 'asc' },
    });
    return rows.map((r) => this.mapper.toDomain(r));
  }

  async findPublicByTicket(ticketId: TicketIdVO): Promise<readonly TicketMessageEntity[]> {
    const rows = await this.prisma.ticketMessage.findMany({
      where: { ticketId: ticketId.value, isInternal: false, deletedAt: null },
      orderBy: { createdAt: 'asc' },
    });
    return rows.map((r) => this.mapper.toDomain(r));
  }

  async findInternalByTicket(ticketId: TicketIdVO): Promise<readonly TicketMessageEntity[]> {
    const rows = await this.prisma.ticketMessage.findMany({
      where: { ticketId: ticketId.value, isInternal: true, deletedAt: null },
      orderBy: { createdAt: 'asc' },
    });
    return rows.map((r) => this.mapper.toDomain(r));
  }

  async findByAuthor(userId: UserIdVO): Promise<readonly TicketMessageEntity[]> {
    const rows = await this.prisma.ticketMessage.findMany({
      where: { authorUserId: userId.value, deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => this.mapper.toDomain(r));
  }

  async countByTicket(ticketId: TicketIdVO): Promise<number> {
    return this.prisma.ticketMessage.count({
      where: { ticketId: ticketId.value, deletedAt: null },
    });
  }
}
