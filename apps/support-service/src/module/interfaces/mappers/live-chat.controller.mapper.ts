/**
 * LiveChatControllerMapper
 * @module support-service/interfaces/mappers
 */
import { Injectable } from '@nestjs/common';
import type { LiveChatResponseDTO as AppLiveChatResponseDTO } from '../../application/dtos/responses/live-chat-response.dto';
import { LiveChatResponseDTO } from '../dtos/responses/live-chat-response.dto';

@Injectable()
export class LiveChatControllerMapper {
  toResponse(app: AppLiveChatResponseDTO): LiveChatResponseDTO {
    const res = new LiveChatResponseDTO();
    res.id = app.id;
    res.userId = app.userId;
    res.agentId = app.agentId;
    res.visitorId = app.visitorId;
    res.status = app.status;
    res.trigger = app.trigger;
    res.subject = app.subject;
    res.messageCount = app.messageCount;
    res.startedAt = app.startedAt;
    res.endedAt = app.endedAt;
    res.durationSeconds = app.durationSeconds;
    res.transferredTo = app.transferredTo;
    res.rating = app.rating;
    res.ratingComment = app.ratingComment;
    res.createdAt = app.createdAt;
    res.updatedAt = app.updatedAt;
    return res;
  }
}
