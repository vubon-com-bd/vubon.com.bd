/**
 * ChatbotControllerMapper
 * @module support-service/interfaces/mappers
 */
import { Injectable } from '@nestjs/common';
import type { ChatbotResponseDTO as AppChatbotResponseDTO } from '../../application/dtos/responses/chatbot-response.dto';
import type { ChatbotReplyResponseDTO as AppChatbotReplyResponseDTO } from '../../application/dtos/responses/chatbot-reply-response.dto';
import {
  ChatbotResponseDTO,
  ChatbotReplyResponseDTO,
} from '../dtos/responses/chatbot-response.dto';

@Injectable()
export class ChatbotControllerMapper {
  toResponse(app: AppChatbotResponseDTO): ChatbotResponseDTO {
    const res = new ChatbotResponseDTO();
    res.id = app.id;
    res.name = app.name;
    res.type = app.type;
    res.status = app.status;
    res.description = app.description;
    res.intents = app.intents.map((i) => ({
      intent: i.intent,
      responses: [...i.responses],
      keywords: i.keywords ? [...i.keywords] : undefined,
      confidence: i.confidence,
      isActive: i.isActive,
    }));
    res.fallbackMessage = app.fallbackMessage;
    res.handoffMessage = app.handoffMessage;
    res.handoffEnabled = app.handoffEnabled;
    res.languages = [...app.languages];
    res.createdBy = app.createdBy;
    res.createdAt = app.createdAt;
    res.updatedAt = app.updatedAt;
    return res;
  }

  toReplyResponse(app: AppChatbotReplyResponseDTO): ChatbotReplyResponseDTO {
    const res = new ChatbotReplyResponseDTO();
    res.chatbotId = app.chatbotId;
    res.sessionId = app.sessionId;
    res.reply = app.reply;
    res.intent = app.intent;
    res.confidence = app.confidence;
    res.shouldEscalate = app.shouldEscalate;
    res.occurredAt = app.occurredAt;
    return res;
  }
}
