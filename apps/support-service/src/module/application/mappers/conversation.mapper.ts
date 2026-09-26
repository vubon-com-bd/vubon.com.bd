/**
 * ConversationMapper — domain ↔ DTO
 * @module support-service/application/mappers
 */
import { OneWayMapper } from '@vubon/shared-kernel/application/mappers';
import { ConversationEntity } from '../../domain/entities/conversation.entity';
import type { ConversationResponseDTO } from '../dtos/responses/conversation-response.dto';

export class ConversationMapper extends OneWayMapper<
  ConversationEntity,
  ConversationResponseDTO
> {
  map(entity: ConversationEntity): ConversationResponseDTO {
    const snapshot = entity.toSnapshot();
    return {
      id: snapshot.id,
      type: snapshot.type as ConversationResponseDTO['type'],
      status: snapshot.status as ConversationResponseDTO['status'],
      ticketId: snapshot.ticketId,
      participantIds: [snapshot.userId],
      messageCount: 0,
      unreadCount: 0,
      isLocked: false,
      isPinned: false,
      createdAt: snapshot.createdAt,
      updatedAt: snapshot.updatedAt,
    };
  }

  toList(entities: readonly ConversationEntity[]): readonly ConversationResponseDTO[] {
    return entities.map((e) => this.map(e));
  }
}
