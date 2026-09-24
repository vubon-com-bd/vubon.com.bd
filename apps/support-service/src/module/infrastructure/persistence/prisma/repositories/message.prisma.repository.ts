import { Injectable } from '@nestjs/common';
import { Message as PrismaMessage } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { MessageEntity } from '../../../../domain/entities/message.entity';
import { MessageIdVO } from '../../../../domain/value-objects/primitives/message-id.vo';
import { MessageContentVO } from '../../../../domain/value-objects/primitives/message-content.vo';
import { MessageTypeVO } from '../../../../domain/value-objects/primitives/message-type.vo';
import { MessageStatusVO } from '../../../../domain/value-objects/primitives/message-status.vo';
import { ConversationIdVO } from '../../../../domain/value-objects/primitives/conversation-id.vo';
import { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo';
import type { MessageRepository } from '../../../../domain/repositories/message.repository.interface';

@Injectable()
export class MessagePrismaRepository
  extends BasePrismaRepository<MessageEntity, MessageIdVO>
  implements MessageRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaMessage): MessageEntity {
    return MessageEntity.reconstitute(
      MessageIdVO.create(raw.id),
      {
        conversationId: ConversationIdVO.create(raw.conversationId),
        senderId: UserIdVO.create(raw.senderId),
        content: MessageContentVO.create(raw.content),
        type: MessageTypeVO.create(raw.type),
        status: MessageStatusVO.create(raw.status),
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      null,
    );
  }

  async findById(id: MessageIdVO): Promise<MessageEntity | null> {
    const raw = await this.prisma.message.findUnique({ where: { id: id.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly MessageEntity[]> {
    const rows = await this.prisma.message.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: MessageEntity): Promise<MessageEntity> {
    const data = {
      conversationId: entity.conversationId.value,
      senderId: entity.senderId.value,
      content: entity.content.value,
      type: entity.type.value,
      status: entity.status.value,
      updatedAt: new Date(),
    };
    const raw = await this.prisma.message.upsert({
      where: { id: entity.id.value },
      create: { id: entity.id.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: MessageIdVO): Promise<void> {
    await this.prisma.message.delete({ where: { id: id.value } });
  }

  async findByConversation(conversationId: ConversationIdVO): Promise<readonly MessageEntity[]> {
    const rows = await this.prisma.message.findMany({
      where: { conversationId: conversationId.value },
    });
    return rows.map((r) => this.toDomain(r));
  }
}
