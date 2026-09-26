/**
 * ConversationControllerMapper
 * @module support-service/interfaces/mappers
 */
import { Injectable } from '@nestjs/common';
import type { ConversationResponseDTO as AppConversationResponseDTO } from '../../application/dtos/responses/conversation-response.dto';
import { ConversationResponseDTO } from '../dtos/responses/conversation-response.dto';

@Injectable()
export class ConversationControllerMapper {
  toResponse(app: AppConversationResponseDTO): ConversationResponseDTO {
    const res = new ConversationResponseDTO();
    res.id = app.id;
    res.title = app.title;
    res.type = app.type;
    res.status = app.status;
    res.ticketId = app.ticketId;
    res.participantIds = [...app.participantIds];
    res.messageCount = app.messageCount;
    res.unreadCount = app.unreadCount;
    res.lastMessageAt = app.lastMessageAt;
    res.lastMessagePreview = app.lastMessagePreview;
    res.isLocked = app.isLocked;
    res.isPinned = app.isPinned;
    res.archivedAt = app.archivedAt;
    res.createdAt = app.createdAt;
    res.updatedAt = app.updatedAt;
    return res;
  }
}
