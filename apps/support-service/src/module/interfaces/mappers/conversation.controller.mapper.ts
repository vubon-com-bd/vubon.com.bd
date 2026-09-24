import { Injectable } from '@nestjs/common';
import type { ConversationResponseDTO } from '../../application/dtos/responses/conversation-response.dto';
import type { ConversationResponseDto } from '../dtos/responses/conversation.response.dto';

@Injectable()
export class ConversationControllerMapper {
  toHttp(dto: ConversationResponseDTO): ConversationResponseDto {
    return {
      id: dto.id,
      userId: dto.userId,
      agentId: dto.agentId ?? undefined,
      status: dto.status,
      type: dto.type,
      startedAt: dto.startedAt,
      endedAt: dto.endedAt ?? undefined,
    };
  }
}
