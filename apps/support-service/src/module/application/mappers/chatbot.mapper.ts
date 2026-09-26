/**
 * ChatbotMapper — domain ↔ DTO
 * @module support-service/application/mappers
 */
import { OneWayMapper } from '@vubon/shared-kernel/application/mappers';
import { ChatbotEntity } from '../../domain/entities/chatbot.entity';
import type { ChatbotResponseDTO } from '../dtos/responses/chatbot-response.dto';

export class ChatbotMapper extends OneWayMapper<ChatbotEntity, ChatbotResponseDTO> {
  map(entity: ChatbotEntity): ChatbotResponseDTO {
    const snapshot = entity.toSnapshot();
    return {
      id: snapshot.id,
      name: snapshot.name,
      type: snapshot.type as ChatbotResponseDTO['type'],
      status: snapshot.status as ChatbotResponseDTO['status'],
      intents: [],
      fallbackMessage: 'Sorry, I could not understand.',
      handoffEnabled: false,
      languages: [snapshot.language],
      createdBy: 'system',
      createdAt: snapshot.createdAt,
      updatedAt: snapshot.updatedAt,
    };
  }

  toList(entities: readonly ChatbotEntity[]): readonly ChatbotResponseDTO[] {
    return entities.map((e) => this.map(e));
  }
}
