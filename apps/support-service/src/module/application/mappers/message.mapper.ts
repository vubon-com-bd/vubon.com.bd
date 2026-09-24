import { Injectable } from '@nestjs/common';
import { MessageEntity } from '../../domain/entities/message.entity';
import type { MessageResponseDTO } from '../dtos/responses/message-response.dto';

@Injectable()
export class MessageMapper {
  toDTO(entity: MessageEntity): MessageResponseDTO {
    return {
      id: entity.id.value,
      conversationId: entity.conversationId.value,
      senderId: entity.senderId.value,
      content: entity.content.value,
      type: entity.type.value,
      status: entity.status.value,
      createdAt: entity.createdAt,
    };
  }
}
