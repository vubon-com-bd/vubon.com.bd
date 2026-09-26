/**
 * LiveChatMapper — domain ↔ DTO
 * @module support-service/application/mappers
 */
import { OneWayMapper } from '@vubon/shared-kernel/application/mappers';
import { LiveChatEntity } from '../../domain/entities/live-chat.entity';
import type { LiveChatResponseDTO } from '../dtos/responses/live-chat-response.dto';

export class LiveChatMapper extends OneWayMapper<LiveChatEntity, LiveChatResponseDTO> {
  map(entity: LiveChatEntity): LiveChatResponseDTO {
    const snapshot = entity.toSnapshot();
    return {
      id: snapshot.id,
      userId: snapshot.userId,
      agentId: snapshot.agentId,
      status: snapshot.status as LiveChatResponseDTO['status'],
      trigger: 'customer_initiated' as LiveChatResponseDTO['trigger'],
      messageCount: snapshot.messageIds.length,
      startedAt: snapshot.startedAt,
      endedAt: snapshot.endedAt,
      createdAt: snapshot.createdAt,
      updatedAt: snapshot.updatedAt,
    };
  }

  toList(entities: readonly LiveChatEntity[]): readonly LiveChatResponseDTO[] {
    return entities.map((e) => this.map(e));
  }
}
