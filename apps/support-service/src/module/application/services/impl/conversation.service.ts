import { Injectable } from '@nestjs/common';
import type { ConversationServiceInterface } from '../interfaces/conversation.service.interface';
import type { ConversationRepository } from '../../../domain/repositories/conversation.repository.interface';
import { ConversationEntity } from '../../../domain/entities/conversation.entity';
import { ConversationIdVO } from '../../../domain/value-objects/primitives/conversation-id.vo';
import { ConversationStatusVO } from '../../../domain/value-objects/primitives/conversation-status.vo';
import { ConversationTypeVO } from '../../../domain/value-objects/primitives/conversation-type.vo';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo';
import { ChatNotFoundError } from '../../errors/chat.errors';
import type { StartConversationRequestDTO } from '../../dtos/requests/conversation';
import type { ConversationResponseDTO } from '../../dtos/responses/conversation-response.dto';

@Injectable()
export class ConversationService implements ConversationServiceInterface {
  constructor(private readonly conversationRepo: ConversationRepository) {}

  async start(input: StartConversationRequestDTO): Promise<ConversationResponseDTO> {
    const entity = ConversationEntity.create({
      userId: UserIdVO.create(input.userId),
      agentId: null,
      status: ConversationStatusVO.create('active'),
      type: ConversationTypeVO.create(input.type),
      startedAt: new Date(),
      endedAt: null,
    });
    const saved = await this.conversationRepo.save(entity);
    return this.toDTO(saved);
  }

  async end(id: ConversationIdVO): Promise<void> {
    const existing = await this.conversationRepo.findById(id);
    if (!existing) throw new ChatNotFoundError(id.value);
    const ended = existing.end();
    await this.conversationRepo.save(ended);
  }

  async findById(id: ConversationIdVO): Promise<ConversationEntity | null> {
    return this.conversationRepo.findById(id);
  }

  private toDTO(entity: ConversationEntity): ConversationResponseDTO {
    return {
      id: entity.id.value,
      userId: entity.userId.value,
      agentId: entity.agentId?.value ?? null,
      status: entity.status.value,
      type: entity.type.value,
      startedAt: entity.startedAt.toISOString(),
      endedAt: entity.endedAt?.toISOString() ?? null,
    };
  }
}
