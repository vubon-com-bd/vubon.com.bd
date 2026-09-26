/**
 * LiveChatService — use case orchestration
 * @module support-service/application/services/impl
 */
import { Injectable } from '@nestjs/common';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';

import type { LiveChatServiceInterface } from '../interfaces/live-chat.service.interface';
import type { LiveChatRepository } from '../../../domain/repositories/live-chat.repository.interface';
import { LiveChatEntity } from '../../../domain/entities/live-chat.entity';
import { LiveChatIdVO } from '../../../domain/value-objects/primitives/live-chat-id.vo';
import { LiveChatTypeVO } from '../../../domain/value-objects/primitives/live-chat-type.vo';
import { MessageIdVO } from '../../../domain/value-objects/primitives/message-id.vo';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo';
import { AgentIdVO } from '../../../domain/value-objects/primitives/agent-id.vo';

import { LiveChatMapper } from '../../mappers/live-chat.mapper';
import { ChatSessionNotFoundException } from '../../errors/chat.errors';
import type { StartChatRequestDTO } from '../../dtos/requests/live-chat/start-chat.dto';
import type { SendChatMessageRequestDTO } from '../../dtos/requests/live-chat/send-chat-message.dto';
import type { TransferChatRequestDTO } from '../../dtos/requests/live-chat/transfer-chat.dto';
import type { EndChatRequestDTO } from '../../dtos/requests/live-chat/end-chat.dto';
import type { LiveChatResponseDTO } from '../../dtos/responses/live-chat-response.dto';
import type { LiveChatListResponseDTO } from '../../dtos/responses/live-chat-list-response.dto';

@Injectable()
export class LiveChatService implements LiveChatServiceInterface {
  constructor(
    private readonly chatRepo: LiveChatRepository,
    private readonly mapper: LiveChatMapper,
  ) {}

  async start(input: StartChatRequestDTO): Promise<LiveChatResponseDTO> {
    const now = new Date().toISOString();
    const userId = UserIdVO.create(input.userId ?? input.visitorId ?? 'anonymous');

    const chat = LiveChatEntity.create({
      id: LiveChatIdVO.generate(),
      userId,
      type: LiveChatTypeVO.human(),
      now,
    });
    await this.chatRepo.save(chat);
    return this.mapper.map(chat);
  }

  async sendMessage(input: SendChatMessageRequestDTO): Promise<LiveChatResponseDTO> {
    const chat = await this.loadOrThrow(input.sessionId);
    if (!chat.isActive) {
      throw new BusinessRuleError(
        'Chat session is not active',
        'chat.not_active',
      );
    }
    if (!input.content || input.content.trim().length === 0) {
      throw new BusinessRuleError(
        'Message content required',
        'chat.message.empty',
      );
    }
    chat.appendMessage(MessageIdVO.generate(), new Date().toISOString());
    await this.chatRepo.save(chat);
    return this.mapper.map(chat);
  }

  async transfer(input: TransferChatRequestDTO): Promise<LiveChatResponseDTO> {
    const chat = await this.loadOrThrow(input.sessionId);
    if (!chat.isActive) {
      throw new BusinessRuleError(
        'Cannot transfer a terminal chat',
        'chat.terminal',
      );
    }
    chat.assignAgent(AgentIdVO.create(input.toAgentId), new Date().toISOString());
    await this.chatRepo.save(chat);
    return this.mapper.map(chat);
  }

  async end(input: EndChatRequestDTO): Promise<LiveChatResponseDTO> {
    const chat = await this.loadOrThrow(input.sessionId);
    chat.end(input.reason, new Date().toISOString());
    await this.chatRepo.save(chat);
    return this.mapper.map(chat);
  }

  async getById(sessionId: string): Promise<LiveChatResponseDTO> {
    const chat = await this.loadOrThrow(sessionId);
    return this.mapper.map(chat);
  }

  async list(page: number, limit: number): Promise<LiveChatListResponseDTO> {
    const all = await this.chatRepo.findAll();
    const safeLimit = Math.max(1, Math.min(limit, 100));
    const safePage = Math.max(1, page);
    const total = all.length;
    const start = (safePage - 1) * safeLimit;
    const slice = all.slice(start, start + safeLimit);
    return {
      items: this.mapper.toList(slice),
      total,
      page: safePage,
      limit: safeLimit,
      totalPages: Math.ceil(total / safeLimit) || 1,
    };
  }

  private async loadOrThrow(sessionId: string): Promise<LiveChatEntity> {
    const chat = await this.chatRepo.findById(LiveChatIdVO.create(sessionId));
    if (!chat) {
      throw new ChatSessionNotFoundException(sessionId);
    }
    return chat;
  }
}
