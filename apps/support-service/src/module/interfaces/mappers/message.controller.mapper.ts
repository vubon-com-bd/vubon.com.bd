/**
 * MessageControllerMapper
 * @module support-service/interfaces/mappers
 */
import { Injectable } from '@nestjs/common';
import type { MessageResponseDTO as AppMessageResponseDTO } from '../../application/dtos/responses/message-response.dto';
import { MessageResponseDTO } from '../dtos/responses/message-response.dto';

@Injectable()
export class MessageControllerMapper {
  toResponse(app: AppMessageResponseDTO): MessageResponseDTO {
    const res = new MessageResponseDTO();
    res.id = app.id;
    res.conversationId = app.conversationId;
    res.ticketId = app.ticketId;
    res.senderId = app.senderId;
    res.senderType = app.senderType;
    res.senderName = app.senderName;
    res.type = app.type;
    res.status = app.status;
    res.content = app.content;
    res.attachments = app.attachments ? [...app.attachments] : undefined;
    res.isInternal = app.isInternal;
    res.readAt = app.readAt;
    res.editedAt = app.editedAt;
    res.createdAt = app.createdAt;
    res.updatedAt = app.updatedAt;
    return res;
  }
}
