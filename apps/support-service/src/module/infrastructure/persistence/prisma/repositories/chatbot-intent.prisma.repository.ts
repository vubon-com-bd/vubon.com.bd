/**
 * ChatbotIntentPrismaRepository
 * @module support-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable } from '@nestjs/common';
import { SupportPrismaService } from '../prisma.service';
import { ChatbotIntentRepository } from '../../../../domain/repositories/chatbot-intent.repository.interface';
import { ChatbotIntentEntity } from '../../../../domain/entities/chatbot-intent.entity';
import { ChatbotIntentIdVO } from '../../../../domain/value-objects/primitives/chatbot-intent-id.vo';
import { ChatbotIdVO } from '../../../../domain/value-objects/primitives/chatbot-id.vo';
import { ChatbotIntentMapper } from '../mappers/chatbot-intent.mapper';

@Injectable()
export class ChatbotIntentPrismaRepository implements ChatbotIntentRepository {
  constructor(
    private readonly prisma: SupportPrismaService,
    private readonly mapper: ChatbotIntentMapper,
  ) {}

  async findById(id: ChatbotIntentIdVO): Promise<ChatbotIntentEntity | null> {
    const raw = await this.prisma.chatbotIntent.findUnique({
      where: { id: id.value },
    });
    return raw ? this.mapper.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly ChatbotIntentEntity[]> {
    const rows = await this.prisma.chatbotIntent.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => this.mapper.toDomain(r));
  }

  async save(entity: ChatbotIntentEntity): Promise<ChatbotIntentEntity> {
    const data = this.mapper.toPersistence(entity);
    const raw = await this.prisma.chatbotIntent.upsert({
      where: { id: data.id },
      create: { ...data, patterns: [...data.patterns] },
      update: {
        name: data.name,
        patterns: [...data.patterns],
        response: data.response,
        priority: data.priority,
        updatedAt: new Date(),
      },
    });
    return this.mapper.toDomain(raw);
  }

  async delete(id: ChatbotIntentIdVO): Promise<void> {
    await this.prisma.chatbotIntent.delete({ where: { id: id.value } });
  }

  async exists(id: ChatbotIntentIdVO): Promise<boolean> {
    const count = await this.prisma.chatbotIntent.count({
      where: { id: id.value },
    });
    return count > 0;
  }

  async findByChatbot(_chatbotId: ChatbotIdVO): Promise<readonly ChatbotIntentEntity[]> {
    const rows = await this.prisma.chatbotIntent.findMany({
      orderBy: { priority: 'desc' },
    });
    return rows.map((r) => this.mapper.toDomain(r));
  }

  async findByName(_chatbotId: ChatbotIdVO, name: string): Promise<ChatbotIntentEntity | null> {
    const raw = await this.prisma.chatbotIntent.findFirst({ where: { name } });
    return raw ? this.mapper.toDomain(raw) : null;
  }

  async search(_chatbotId: ChatbotIdVO, text: string): Promise<readonly ChatbotIntentEntity[]> {
    const rows = await this.prisma.chatbotIntent.findMany({
      where: { patterns: { has: text } },
    });
    return rows.map((r) => this.mapper.toDomain(r));
  }

  async countByChatbot(_chatbotId: ChatbotIdVO): Promise<number> {
    return this.prisma.chatbotIntent.count();
  }
}
