/**
 * ChatbotMapper
 * @module support-service/infrastructure/persistence/prisma/mappers
 */
import { Injectable } from '@nestjs/common';
import type { Chatbot as PrismaChatbot } from '@prisma/client';
import { ChatbotEntity } from '../../../../domain/entities/chatbot.entity';

@Injectable()
export class ChatbotMapper {
  toDomain(raw: PrismaChatbot): ChatbotEntity {
    return ChatbotEntity.rehydrate({
      id: raw.id,
      type: raw.type,
      status: raw.status,
      name: raw.name,
      language: raw.language,
      confidenceThreshold: raw.confidenceThreshold,
      intentIds: raw.intentIds,
      createdAt: raw.createdAt.toISOString(),
      updatedAt: raw.updatedAt.toISOString(),
    });
  }

  toPersistence(entity: ChatbotEntity): {
    readonly id: string;
    readonly type: string;
    readonly status: string;
    readonly name: string;
    readonly language: string;
    readonly confidenceThreshold: number;
    readonly intentIds: readonly string[];
    readonly createdAt: Date;
    readonly updatedAt: Date;
  } {
    const snap = entity.toSnapshot();
    return {
      id: snap.id,
      type: snap.type,
      status: snap.status,
      name: snap.name,
      language: snap.language,
      confidenceThreshold: snap.confidenceThreshold,
      intentIds: snap.intentIds,
      createdAt: new Date(snap.createdAt),
      updatedAt: new Date(snap.updatedAt),
    };
  }
}
