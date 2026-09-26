/**
 * MessageMapper — domain ↔ DTO
 * @module support-service/application/mappers
 */
import { OneWayMapper } from '@vubon/shared-kernel/application/mappers';
import { MessageEntity } from '../../domain/entities/message.entity';
import type { MessageResponseDTO } from '../dtos/responses/message-response.dto';

export class MessageMapper extends OneWayMapper<MessageEntity, MessageResponseDTO> {
  map(entity: MessageEntity): MessageResponseDTO {
    const snapshot = entity.toSnapshot();
    return {
      id: snapshot.id,
      conversationId: snapshot.conversationId,
      senderId: snapshot.senderUserId ?? snapshot.senderAgentId,
      senderType: this.mapSenderType(snapshot.senderKind),
      type: snapshot.type as MessageResponseDTO['type'],
      status: snapshot.status as MessageResponseDTO['status'],
      content: snapshot.content,
      isInternal: false,
      readAt: snapshot.readAt,
      createdAt: snapshot.createdAt,
      updatedAt: snapshot.updatedAt,
    };
  }

  toList(entities: readonly MessageEntity[]): readonly MessageResponseDTO[] {
    return entities.map((e) => this.map(e));
  }

  private mapSenderType(
    kind: 'user' | 'agent' | 'system',
  ): MessageResponseDTO['senderType'] {
    if (kind === 'user') return 'customer' as MessageResponseDTO['senderType'];
    if (kind === 'agent') return 'agent' as MessageResponseDTO['senderType'];
    return 'system' as MessageResponseDTO['senderType'];
  }
}
