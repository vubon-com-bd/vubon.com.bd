import { Injectable } from '@nestjs/common';
import type { ChatbotServiceInterface } from '../interfaces/chatbot.service.interface';
import type { ChatbotRepository } from '../../../domain/repositories/chatbot.repository.interface';
import type { ChatbotIntentRepository } from '../../../domain/repositories/chatbot-intent.repository.interface';
import { ChatbotEntity } from '../../../domain/entities/chatbot.entity';
import { ChatbotIdVO } from '../../../domain/value-objects/primitives/chatbot-id.vo';
import type { SendChatbotMessageRequestDTO } from '../../dtos/requests/chatbot';
import type { ChatbotMessageResponseDTO } from '../../dtos/responses/chatbot-response.dto';

@Injectable()
export class ChatbotService implements ChatbotServiceInterface {
  constructor(
    private readonly chatbotRepo: ChatbotRepository,
    private readonly intentRepo: ChatbotIntentRepository,
  ) {}

  async findById(id: ChatbotIdVO): Promise<ChatbotEntity | null> {
    return this.chatbotRepo.findById(id);
  }

  async sendMessage(input: SendChatbotMessageRequestDTO): Promise<ChatbotMessageResponseDTO> {
    const intents = await this.intentRepo.findByChatbot(ChatbotIdVO.create(input.chatbotId));
    const normalized = input.message.toLowerCase();
    let matchedResponse = '';
    let matchedIntent: string | null = null;

    for (const intent of intents) {
      if (intent.patterns.some((p) => normalized.includes(p.toLowerCase()))) {
        matchedIntent = intent.name;
        matchedResponse = intent.response;
        break;
      }
    }

    return {
      chatbotId: input.chatbotId,
      message: input.message,
      response: matchedResponse || 'Sorry, I did not understand.',
      intent: matchedIntent,
      confidence: matchedIntent ? 1.0 : 0.0,
    };
  }
}
