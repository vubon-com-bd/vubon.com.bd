import { Injectable } from '@nestjs/common';
import type { LiveChatServiceInterface } from '../interfaces/live-chat.service.interface';
import type { LiveChatRepository } from '../../../domain/repositories/live-chat.repository.interface';
import { LiveChatEntity } from '../../../domain/entities/live-chat.entity';
import { LiveChatIdVO } from '../../../domain/value-objects/primitives/live-chat-id.vo';
import { LiveChatStatusVO } from '../../../domain/value-objects/primitives/live-chat-status.vo';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo';
import type { StartChatRequestDTO } from '../../dtos/requests/live-chat';
import type { LiveChatResponseDTO } from '../../dtos/responses/live-chat-response.dto';

@Injectable()
export class LiveChatService implements LiveChatServiceInterface {
  constructor(private readonly liveChatRepo: LiveChatRepository) {}

  async start(input: StartChatRequestDTO): Promise<LiveChatResponseDTO> {
    const entity = LiveChatEntity.create({
      userId: UserIdVO.create(input.userId),
      agentId: null,
      status: LiveChatStatusVO.create('online'),
      type: input.type ?? 'support',
      startedAt: new Date(),
      endedAt: null,
    });
    const saved = await this.liveChatRepo.save(entity);
    return this.toDTO(saved);
  }

  async findById(id: LiveChatIdVO): Promise<LiveChatEntity | null> {
    return this.liveChatRepo.findById(id);
  }

  async end(id: LiveChatIdVO): Promise<void> {
    const existing = await this.liveChatRepo.findById(id);
    if (!existing) return;
    const ended = existing.end();
    await this.liveChatRepo.save(ended);
  }

  private toDTO(entity: LiveChatEntity): LiveChatResponseDTO {
    return {
      id: entity.id.value,
      userId: entity.userId.value,
      agentId: entity.agentId?.value ?? null,
      status: entity.status.value,
      startedAt: entity.startedAt.toISOString(),
      endedAt: entity.endedAt?.toISOString() ?? null,
    };
  }
}
