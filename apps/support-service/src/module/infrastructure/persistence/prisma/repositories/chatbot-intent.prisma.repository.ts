import { Injectable } from '@nestjs/common';
import { ChatbotIntent as PrismaChatbotIntent } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { ChatbotIntentEntity } from '../../../../domain/entities/chatbot-intent.entity';
import { ChatbotIntentIdVO } from '../../../../domain/value-objects/primitives/chatbot-intent-id.vo';
import { ChatbotIdVO } from '../../../../domain/value-objects/primitives/chatbot-id.vo';
import type { ChatbotIntentRepository } from '../../../../domain/repositories/chatbot-intent.repository.interface';

@Injectable()
export class ChatbotIntentPrismaRepository
  extends BasePrismaRepository<ChatbotIntentEntity, ChatbotIntentIdVO>
  implements ChatbotIntentRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaChatbotIntent): ChatbotIntentEntity {
    return ChatbotIntentEntity.reconstitute(
      ChatbotIntentIdVO.create(raw.id),
      {
        chatbotId: ChatbotIdVO.create(raw.chatbotId),
        name: raw.name,
        patterns: raw.patterns,
        response: raw.response,
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      null,
    );
  }

  async findById(id: ChatbotIntentIdVO): Promise<ChatbotIntentEntity | null> {
    const raw = await this.prisma.chatbotIntent.findUnique({ where: { id: id.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly ChatbotIntentEntity[]> {
    const rows = await this.prisma.chatbotIntent.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: ChatbotIntentEntity): Promise<ChatbotIntentEntity> {
    const data = {
      chatbotId: entity.chatbotId.value,
      name: entity.name,
      patterns: [...entity.patterns],
      response: entity.response,
      updatedAt: new Date(),
    };
    const raw = await this.prisma.chatbotIntent.upsert({
      where: { id: entity.id.value },
      create: { id: entity.id.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: ChatbotIntentIdVO): Promise<void> {
    await this.prisma.chatbotIntent.delete({ where: { id: id.value } });
  }

  async findByChatbot(chatbotId: ChatbotIdVO): Promise<readonly ChatbotIntentEntity[]> {
    const rows = await this.prisma.chatbotIntent.findMany({
      where: { chatbotId: chatbotId.value },
    });
    return rows.map((r) => this.toDomain(r));
  }
}
