import { Injectable } from '@nestjs/common';
import { Chatbot as PrismaChatbot, Prisma } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { ChatbotEntity } from '../../../../domain/entities/chatbot.entity';
import { ChatbotIdVO } from '../../../../domain/value-objects/primitives/chatbot-id.vo';
import { ChatbotStatusVO } from '../../../../domain/value-objects/primitives/chatbot-status.vo';
import { ChatbotTypeVO } from '../../../../domain/value-objects/primitives/chatbot-type.vo';
import type { ChatbotRepository } from '../../../../domain/repositories/chatbot.repository.interface';

@Injectable()
export class ChatbotPrismaRepository
  extends BasePrismaRepository<ChatbotEntity, ChatbotIdVO>
  implements ChatbotRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaChatbot): ChatbotEntity {
    const config =
      raw.config && typeof raw.config === 'object'
        ? (raw.config as Record<string, unknown>)
        : null;
    return ChatbotEntity.reconstitute(
      ChatbotIdVO.create(raw.id),
      {
        name: raw.name,
        status: ChatbotStatusVO.create(raw.status),
        type: ChatbotTypeVO.create(raw.type),
        config,
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      null,
    );
  }

  private toConfig(
    config: Readonly<Record<string, unknown>> | null,
  ): Prisma.InputJsonValue | typeof Prisma.JsonNull {
    if (config === null) return Prisma.JsonNull;
    return config as Prisma.InputJsonValue;
  }

  async findById(id: ChatbotIdVO): Promise<ChatbotEntity | null> {
    const raw = await this.prisma.chatbot.findUnique({ where: { id: id.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly ChatbotEntity[]> {
    const rows = await this.prisma.chatbot.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: ChatbotEntity): Promise<ChatbotEntity> {
    const data = {
      name: entity.name,
      status: entity.status.value,
      type: entity.type.value,
      config: this.toConfig(entity.config),
      updatedAt: new Date(),
    };
    const raw = await this.prisma.chatbot.upsert({
      where: { id: entity.id.value },
      create: { id: entity.id.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: ChatbotIdVO): Promise<void> {
    await this.prisma.chatbot.delete({ where: { id: id.value } });
  }

  async findActive(): Promise<readonly ChatbotEntity[]> {
    const rows = await this.prisma.chatbot.findMany({ where: { status: 'active' } });
    return rows.map((r) => this.toDomain(r));
  }
}
