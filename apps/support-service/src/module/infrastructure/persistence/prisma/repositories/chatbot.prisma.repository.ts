/**
 * ChatbotPrismaRepository
 * @module support-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable } from '@nestjs/common';
import { SupportPrismaService } from '../prisma.service';
import { ChatbotRepository } from '../../../../domain/repositories/chatbot.repository.interface';
import { ChatbotEntity } from '../../../../domain/entities/chatbot.entity';
import { ChatbotIdVO } from '../../../../domain/value-objects/primitives/chatbot-id.vo';
import { ChatbotStatusVO } from '../../../../domain/value-objects/primitives/chatbot-status.vo';
import { ChatbotTypeVO } from '../../../../domain/value-objects/primitives/chatbot-type.vo';
import { ChatbotMapper } from '../mappers/chatbot.mapper';

@Injectable()
export class ChatbotPrismaRepository implements ChatbotRepository {
  constructor(
    private readonly prisma: SupportPrismaService,
    private readonly mapper: ChatbotMapper,
  ) {}

  async findById(id: ChatbotIdVO): Promise<ChatbotEntity | null> {
    const raw = await this.prisma.chatbot.findUnique({ where: { id: id.value } });
    return raw ? this.mapper.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly ChatbotEntity[]> {
    const rows = await this.prisma.chatbot.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => this.mapper.toDomain(r));
  }

  async save(entity: ChatbotEntity): Promise<ChatbotEntity> {
    const data = this.mapper.toPersistence(entity);
    const raw = await this.prisma.chatbot.upsert({
      where: { id: data.id },
      create: { ...data, intentIds: [...data.intentIds] },
      update: {
        name: data.name,
        status: data.status,
        confidenceThreshold: data.confidenceThreshold,
        intentIds: [...data.intentIds],
        updatedAt: new Date(),
      },
    });
    return this.mapper.toDomain(raw);
  }

  async delete(id: ChatbotIdVO): Promise<void> {
    await this.prisma.chatbot.delete({ where: { id: id.value } });
  }

  async exists(id: ChatbotIdVO): Promise<boolean> {
    const count = await this.prisma.chatbot.count({ where: { id: id.value } });
    return count > 0;
  }

  async findActive(): Promise<readonly ChatbotEntity[]> {
    const rows = await this.prisma.chatbot.findMany({ where: { status: 'active' } });
    return rows.map((r) => this.mapper.toDomain(r));
  }

  async findByStatus(status: ChatbotStatusVO): Promise<readonly ChatbotEntity[]> {
    const rows = await this.prisma.chatbot.findMany({
      where: { status: status.value },
    });
    return rows.map((r) => this.mapper.toDomain(r));
  }

  async findByType(type: ChatbotTypeVO): Promise<readonly ChatbotEntity[]> {
    const rows = await this.prisma.chatbot.findMany({
      where: { type: type.value },
    });
    return rows.map((r) => this.mapper.toDomain(r));
  }

  async findByLanguage(language: string): Promise<readonly ChatbotEntity[]> {
    const rows = await this.prisma.chatbot.findMany({ where: { language } });
    return rows.map((r) => this.mapper.toDomain(r));
  }
}
