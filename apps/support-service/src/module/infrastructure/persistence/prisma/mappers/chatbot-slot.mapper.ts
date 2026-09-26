/**
 * ChatbotSlotMapper — domain ChatbotSlotEntity ↔ Prisma ChatbotSlot
 * @module support-service/infrastructure/persistence/prisma/mappers
 */
import { Injectable } from '@nestjs/common';
import type { ChatbotSlot as PrismaChatbotSlot } from '@prisma/client';
import { ChatbotSlotEntity } from '../../../../domain/entities/chatbot-entity.entity';

@Injectable()
export class ChatbotSlotMapper {
  toDomain(raw: PrismaChatbotSlot): ChatbotSlotEntity {
    return ChatbotSlotEntity.rehydrate({
      id: raw.id,
      name: raw.name,
      entityType: raw.entityType as 'text' | 'number' | 'date' | 'email' | 'phone' | 'enum',
      required: raw.required,
      enumValues: raw.enumValues,
      createdAt: raw.createdAt.toISOString(),
      updatedAt: raw.updatedAt.toISOString(),
    });
  }

  toPersistence(entity: ChatbotSlotEntity): {
    readonly id: string;
    readonly name: string;
    readonly entityType: string;
    readonly required: boolean;
    readonly enumValues: readonly string[];
    readonly createdAt: Date;
    readonly updatedAt: Date;
  } {
    const snap = entity.toSnapshot();
    return {
      id: snap.id,
      name: snap.name,
      entityType: snap.entityType,
      required: snap.required,
      enumValues: snap.enumValues,
      createdAt: new Date(snap.createdAt),
      updatedAt: new Date(snap.updatedAt),
    };
  }
}
