import { Injectable } from '@nestjs/common';
import { ConversationEntity } from '../../domain/entities/conversation.entity';
import type { ConversationResponseDTO } from '../dtos/responses/conversation-response.dto';

@Injectable()
export class ConversationMapper {
  toDTO(entity: ConversationEntity): ConversationResponseDTO {
    return {
      id: entity.id.value,
      userId: entity.userId.value,
      agentId: entity.agentId?.value ?? null,
      status: entity.status.value,
      type: entity.type.value,
      startedAt: entity.startedAt.toISOString(),
      endedAt: entity.endedAt?.toISOString() ?? null,
    };
  }
}
