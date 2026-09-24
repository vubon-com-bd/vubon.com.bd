import { Injectable } from '@nestjs/common';
import type { ChatbotEntityServiceInterface } from '../interfaces/chatbot-entity.service.interface';
import type { ChatbotEntityRepository } from '../../../domain/repositories/chatbot-entity.repository.interface';
import { ChatbotEntityEntity } from '../../../domain/entities/chatbot-entity.entity';
import { ChatbotEntityIdVO } from '../../../domain/value-objects/primitives/chatbot-entity-id.vo';
import { ChatbotIdVO } from '../../../domain/value-objects/primitives/chatbot-id.vo';
import type { TrainEntityRequestDTO } from '../../dtos/requests/chatbot';

@Injectable()
export class ChatbotEntityService implements ChatbotEntityServiceInterface {
  constructor(private readonly entityRepo: ChatbotEntityRepository) {}

  async train(input: TrainEntityRequestDTO): Promise<{ id: string }> {
    const entity = ChatbotEntityEntity.create({
      chatbotId: ChatbotIdVO.create(input.chatbotId),
      name: input.name,
      type: input.type,
      value: input.value,
    });
    const saved = await this.entityRepo.save(entity);
    return { id: saved.id.value };
  }

  async findById(id: ChatbotEntityIdVO): Promise<ChatbotEntityEntity | null> {
    return this.entityRepo.findById(id);
  }
}
