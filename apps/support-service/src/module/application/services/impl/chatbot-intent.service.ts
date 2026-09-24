import { Injectable } from '@nestjs/common';
import type { ChatbotIntentServiceInterface } from '../interfaces/chatbot-intent.service.interface';
import type { ChatbotIntentRepository } from '../../../domain/repositories/chatbot-intent.repository.interface';
import { ChatbotIntentEntity } from '../../../domain/entities/chatbot-intent.entity';
import { ChatbotIntentIdVO } from '../../../domain/value-objects/primitives/chatbot-intent-id.vo';
import { ChatbotIdVO } from '../../../domain/value-objects/primitives/chatbot-id.vo';
import type { TrainIntentRequestDTO } from '../../dtos/requests/chatbot';

@Injectable()
export class ChatbotIntentService implements ChatbotIntentServiceInterface {
  constructor(private readonly intentRepo: ChatbotIntentRepository) {}

  async train(input: TrainIntentRequestDTO): Promise<{ id: string }> {
    const entity = ChatbotIntentEntity.create({
      chatbotId: ChatbotIdVO.create(input.chatbotId),
      name: input.name,
      patterns: input.patterns,
      response: input.response,
    });
    const saved = await this.intentRepo.save(entity);
    return { id: saved.id.value };
  }

  async findById(id: ChatbotIntentIdVO): Promise<ChatbotIntentEntity | null> {
    return this.intentRepo.findById(id);
  }
}
