/**
 * ChatbotSlotPrismaRepository
 * @module support-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable } from '@nestjs/common';
import { SupportPrismaService } from '../prisma.service';
import { ChatbotSlotRepository } from '../../../../domain/repositories/chatbot-slot.repository.interface';
import { ChatbotSlotEntity } from '../../../../domain/entities/chatbot-entity.entity';
import { ChatbotEntityIdVO } from '../../../../domain/value-objects/primitives/chatbot-entity-id.vo';
import { ChatbotIdVO } from '../../../../domain/value-objects/primitives/chatbot-id.vo';
import { ChatbotSlotMapper } from '../mappers/chatbot-slot.mapper';

@Injectable()
export class ChatbotSlotPrismaRepository implements ChatbotSlotRepository {
  constructor(
    private readonly prisma: SupportPrismaService,
    private readonly mapper: ChatbotSlotMapper,
  ) {}

  async findById(id: ChatbotEntityIdVO): Promise<ChatbotSlotEntity | null> {
    const raw = await this.prisma.chatbotSlot.findUnique({ where: { id: id.value } });
    return raw ? this.mapper.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly ChatbotSlotEntity[]> {
    const rows = await this.prisma.chatbotSlot.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => this.mapper.toDomain(r));
  }

  async save(entity: ChatbotSlotEntity): Promise<ChatbotSlotEntity> {
    const data = this.mapper.toPersistence(entity);
    const raw = await this.prisma.chatbotSlot.upsert({
      where: { id: data.id },
      create: { ...data, enumValues: [...data.enumValues] },
      update: {
        name: data.name,
        required: data.required,
        enumValues: [...data.enumValues],
        updatedAt: new Date(),
      },
    });
    return this.mapper.toDomain(raw);
  }

  async delete(id: ChatbotEntityIdVO): Promise<void> {
    await this.prisma.chatbotSlot.delete({ where: { id: id.value } });
  }

  async exists(id: ChatbotEntityIdVO): Promise<boolean> {
    const count = await this.prisma.chatbotSlot.count({ where: { id: id.value } });
    return count > 0;
  }

  async findByChatbot(_chatbotId: ChatbotIdVO): Promise<readonly ChatbotSlotEntity[]> {
    const rows = await this.prisma.chatbotSlot.findMany();
    return rows.map((r) => this.mapper.toDomain(r));
  }

  async findRequiredByChatbot(_chatbotId: ChatbotIdVO): Promise<readonly ChatbotSlotEntity[]> {
    const rows = await this.prisma.chatbotSlot.findMany({
      where: { required: true },
    });
    return rows.map((r) => this.mapper.toDomain(r));
  }

  async findByName(_chatbotId: ChatbotIdVO, name: string): Promise<ChatbotSlotEntity | null> {
    const raw = await this.prisma.chatbotSlot.findFirst({ where: { name } });
    return raw ? this.mapper.toDomain(raw) : null;
  }

  async countByChatbot(_chatbotId: ChatbotIdVO): Promise<number> {
    return this.prisma.chatbotSlot.count();
  }
}
