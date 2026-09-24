import { Injectable } from '@nestjs/common';
import { ChatbotEntity as PrismaChatbotEntity } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { ChatbotEntityEntity } from '../../../../domain/entities/chatbot-entity.entity';
import { ChatbotEntityIdVO } from '../../../../domain/value-objects/primitives/chatbot-entity-id.vo';
import { ChatbotIdVO } from '../../../../domain/value-objects/primitives/chatbot-id.vo';
import type { ChatbotEntityRepository } from '../../../../domain/repositories/chatbot-entity.repository.interface';

@Injectable()
export class ChatbotEntityPrismaRepository
  extends BasePrismaRepository<ChatbotEntityEntity, ChatbotEntityIdVO>
  implements ChatbotEntityRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaChatbotEntity): ChatbotEntityEntity {
    return ChatbotEntityEntity.reconstitute(
      ChatbotEntityIdVO.create(raw.id),
      {
        chatbotId: ChatbotIdVO.create(raw.chatbotId),
        name: raw.name,
        type: raw.type,
        value: raw.value,
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      null,
    );
  }

  async findById(id: ChatbotEntityIdVO): Promise<ChatbotEntityEntity | null> {
    const raw = await this.prisma.chatbotEntity.findUnique({ where: { id: id.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly ChatbotEntityEntity[]> {
    const rows = await this.prisma.chatbotEntity.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: ChatbotEntityEntity): Promise<ChatbotEntityEntity> {
    const data = {
      chatbotId: entity.chatbotId.value,
      name: entity.name,
      type: entity.type,
      value: entity.value,
      updatedAt: new Date(),
    };
    const raw = await this.prisma.chatbotEntity.upsert({
      where: { id: entity.id.value },
      create: { id: entity.id.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: ChatbotEntityIdVO): Promise<void> {
    await this.prisma.chatbotEntity.delete({ where: { id: id.value } });
  }

  async findByChatbot(chatbotId: ChatbotIdVO): Promise<readonly ChatbotEntityEntity[]> {
    const rows = await this.prisma.chatbotEntity.findMany({
      where: { chatbotId: chatbotId.value },
    });
    return rows.map((r) => this.toDomain(r));
  }
}
