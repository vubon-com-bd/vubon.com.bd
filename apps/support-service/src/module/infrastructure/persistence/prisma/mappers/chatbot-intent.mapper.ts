/**
 * ChatbotIntentMapper
 * @module support-service/infrastructure/persistence/prisma/mappers
 */
import { Injectable } from '@nestjs/common';
import type { ChatbotIntent as PrismaChatbotIntent } from '@prisma/client';
import { ChatbotIntentEntity } from '../../../../domain/entities/chatbot-intent.entity';

@Injectable()
export class ChatbotIntentMapper {
  toDomain(raw: PrismaChatbotIntent): ChatbotIntentEntity {
    return ChatbotIntentEntity.rehydrate({
      id: raw.id,
      name: raw.name,
      patterns: raw.patterns,
      response: raw.response,
      priority: raw.priority,
      createdAt: raw.createdAt.toISOString(),
      updatedAt: raw.updatedAt.toISOString(),
    });
  }

  toPersistence(entity: ChatbotIntentEntity): {
    readonly id: string;
    readonly name: string;
    readonly patterns: readonly string[];
    readonly response: string;
    readonly priority: number;
    readonly createdAt: Date;
    readonly updatedAt: Date;
  } {
    const snap = entity.toSnapshot();
    return {
      id: snap.id,
      name: snap.name,
      patterns: snap.patterns,
      response: snap.response,
      priority: snap.priority,
      createdAt: new Date(snap.createdAt),
      updatedAt: new Date(snap.updatedAt),
    };
  }
}
