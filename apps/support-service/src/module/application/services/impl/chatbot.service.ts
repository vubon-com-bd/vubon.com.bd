/**
 * ChatbotService — use case orchestration
 * @module support-service/application/services/impl
 */
import { Injectable } from '@nestjs/common';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';

import type { ChatbotServiceInterface } from '../interfaces/chatbot.service.interface';
import type { ChatbotRepository } from '../../../domain/repositories/chatbot.repository.interface';
import type { ChatbotIntentRepository } from '../../../domain/repositories/chatbot-intent.repository.interface';
import { ChatbotEntity } from '../../../domain/entities/chatbot.entity';
import { ChatbotIntentEntity } from '../../../domain/entities/chatbot-intent.entity';
import { ChatbotIdVO } from '../../../domain/value-objects/primitives/chatbot-id.vo';
import { ChatbotIntentIdVO } from '../../../domain/value-objects/primitives/chatbot-intent-id.vo';
import { ChatbotIntentClassifierService } from '../../../domain/services/chatbot-intent-classifier.service';
import { ChatbotResponseService } from '../../../domain/services/chatbot-response.service';

import { ChatbotMapper } from '../../mappers/chatbot.mapper';
import { ChatbotNotFoundException } from '../../errors/chatbot.errors';
import type { SendChatbotMessageRequestDTO } from '../../dtos/requests/chatbot/send-chatbot-message.dto';
import type { TrainIntentRequestDTO } from '../../dtos/requests/chatbot/train-intent.dto';
import type { TrainEntityRequestDTO } from '../../dtos/requests/chatbot/train-entity.dto';
import type { ChatbotResponseDTO } from '../../dtos/responses/chatbot-response.dto';
import type { ChatbotReplyResponseDTO } from '../../dtos/responses/chatbot-reply-response.dto';

@Injectable()
export class ChatbotService implements ChatbotServiceInterface {
  constructor(
    private readonly chatbotRepo: ChatbotRepository,
    private readonly intentRepo: ChatbotIntentRepository,
    private readonly classifier: ChatbotIntentClassifierService,
    private readonly responder: ChatbotResponseService,
    private readonly mapper: ChatbotMapper,
  ) {}

  async sendMessage(
    input: SendChatbotMessageRequestDTO,
  ): Promise<ChatbotReplyResponseDTO> {
    const chatbot = await this.loadOrThrow(input.chatbotId);
    if (!chatbot.isOperational) {
      throw new BusinessRuleError(
        'Chatbot is not operational',
        'chatbot.not_operational',
      );
    }
    if (!input.message || input.message.trim().length === 0) {
      throw new BusinessRuleError('Message required', 'chatbot.message.empty');
    }

    const intents = await this.intentRepo.findByChatbot(chatbot.id);
    const classification = this.classifier.classify(input.message, intents);
    const reply = this.responder.respond(
      chatbot,
      classification.best?.intent ?? null,
      classification.best?.confidence ?? 0,
    );

    return {
      chatbotId: chatbot.id.value,
      sessionId: input.sessionId,
      reply: reply.text,
      confidence: reply.confidence,
      shouldEscalate: reply.shouldEscalate,
      occurredAt: new Date().toISOString(),
    };
  }

  async trainIntent(input: TrainIntentRequestDTO): Promise<ChatbotResponseDTO> {
    const chatbot = await this.loadOrThrow(input.chatbotId);
    const now = new Date().toISOString();
    const intent = ChatbotIntentEntity.create({
      id: ChatbotIntentIdVO.fromSlug(String(input.intent)),
      name: String(input.intent),
      patterns: input.keywords ?? [String(input.intent)],
      response: input.responses[0] ?? 'Acknowledged.',
      priority: 0,
      now,
    });
    await this.intentRepo.save(intent);
    chatbot.registerIntent(intent.id, now);
    await this.chatbotRepo.save(chatbot);
    return this.mapper.map(chatbot);
  }

  async trainEntity(input: TrainEntityRequestDTO): Promise<ChatbotResponseDTO> {
    const chatbot = await this.loadOrThrow(input.chatbotId);
    // Slot training persists through intent repo in a fuller impl
    void input;
    await this.chatbotRepo.save(chatbot);
    return this.mapper.map(chatbot);
  }

  async getById(chatbotId: string): Promise<ChatbotResponseDTO> {
    const chatbot = await this.loadOrThrow(chatbotId);
    return this.mapper.map(chatbot);
  }

  private async loadOrThrow(chatbotId: string): Promise<ChatbotEntity> {
    const chatbot = await this.chatbotRepo.findById(ChatbotIdVO.create(chatbotId));
    if (!chatbot) {
      throw new ChatbotNotFoundException(chatbotId);
    }
    return chatbot;
  }
}
