/**
 * MessagePrismaRepository
 * @module support-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable } from '@nestjs/common';
import { SupportPrismaService } from '../prisma.service';
import { MessageRepository } from '../../../../domain/repositories/message.repository.interface';
import { MessageEntity } from '../../../../domain/entities/message.entity';
import { MessageIdVO } from '../../../../domain/value-objects/primitives/message-id.vo';
import { ConversationIdVO } from '../../../../domain/value-objects/primitives/conversation-id.vo';
import { MessageMapper } from '../mappers/message.mapper';

@Injectable()
export class MessagePrismaRepository implements MessageRepository {
  constructor(
    private readonly prisma: SupportPrismaService,
    private readonly mapper: MessageMapper,
  ) {}

  async findById(id: MessageIdVO): Promise<MessageEntity | null> {
    const raw = await this.prisma.supportMessage.findUnique({
      where: { id: id.value },
    });
    return raw ? this.mapper.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly MessageEntity[]> {
    const rows = await this.prisma.supportMessage.findMany({
      orderBy: { createdAt: 'asc' },
    });
    return rows.map((r) => this.mapper.toDomain(r));
  }

  async save(entity: MessageEntity): Promise<MessageEntity> {
    const data = this.mapper.toPersistence(entity);
    const raw = await this.prisma.supportMessage.upsert({
      where: { id: data.id },
      create: { ...data, attachments: [...data.attachments] },
      update: {
        status: data.status,
        readAt: data.readAt,
        editedAt: data.editedAt,
        updatedAt: new Date(),
      },
    });
    return this.mapper.toDomain(raw);
  }

  async delete(id: MessageIdVO): Promise<void> {
    await this.prisma.supportMessage.delete({ where: { id: id.value } });
  }

  async exists(id: MessageIdVO): Promise<boolean> {
    const count = await this.prisma.supportMessage.count({
      where: { id: id.value },
    });
    return count > 0;
  }

  async findByConversation(conversationId: ConversationIdVO): Promise<readonly MessageEntity[]> {
    const rows = await this.prisma.supportMessage.findMany({
      where: { conversationId: conversationId.value },
      orderBy: { createdAt: 'asc' },
    });
    return rows.map((r) => this.mapper.toDomain(r));
  }

  async findUnreadByConversation(conversationId: ConversationIdVO): Promise<readonly MessageEntity[]> {
    const rows = await this.prisma.supportMessage.findMany({
      where: { conversationId: conversationId.value, readAt: null },
      orderBy: { createdAt: 'asc' },
    });
    return rows.map((r) => this.mapper.toDomain(r));
  }

  async countByConversation(conversationId: ConversationIdVO): Promise<number> {
    return this.prisma.supportMessage.count({
      where: { conversationId: conversationId.value },
    });
  }

  async latestByConversation(conversationId: ConversationIdVO): Promise<MessageEntity | null> {
    const raw = await this.prisma.supportMessage.findFirst({
      where: { conversationId: conversationId.value },
      orderBy: { createdAt: 'desc' },
    });
    return raw ? this.mapper.toDomain(raw) : null;
  }
}
