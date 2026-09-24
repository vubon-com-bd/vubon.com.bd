import { Injectable } from '@nestjs/common';
import type { MessageResponseDTO } from '../../application/dtos/responses/message-response.dto';
import type { MessageResponseDto } from '../dtos/responses/message.response.dto';

@Injectable()
export class MessageControllerMapper {
  toHttp(dto: MessageResponseDTO): MessageResponseDto {
    return {
      id: dto.id,
      conversationId: dto.conversationId,
      senderId: dto.senderId,
      content: dto.content,
      type: dto.type,
      status: dto.status,
      createdAt: dto.createdAt,
    };
  }
}
