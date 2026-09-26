/**
 * ConversationService — use case orchestration
 * @module support-service/application/services/impl
 */
import { Injectable } from '@nestjs/common';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';

import type { ConversationServiceInterface } from '../interfaces/conversation.service.interface';
import type { ConversationRepository } from '../../../domain/repositories/conversation.repository.interface';
import { ConversationEntity } from '../../../domain/entities/conversation.entity';
import { ConversationIdVO } from '../../../domain/value-objects/primitives/conversation-id.vo';
import { ConversationTypeVO } from '../../../domain/value-objects/primitives/conversation-type.vo';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo';
import { TicketIdVO } from '../../../domain/value-objects/primitives/ticket-id.vo';

import { ConversationMapper } from '../../mappers/conversation.mapper';
import { ConversationNotFoundException } from '../../errors/conversation.errors';
import type { StartConversationRequestDTO } from '../../dtos/requests/conversation/start-conversation.dto';
import type { EndConversationRequestDTO } from '../../dtos/requests/conversation/end-conversation.dto';
import type { UpdateConversationRequestDTO } from '../../dtos/requests/conversation/update-conversation.dto';
import type { ConversationResponseDTO } from '../../dtos/responses/conversation-response.dto';
import type { ConversationListResponseDTO } from '../../dtos/responses/conversation-list-response.dto';

@Injectable()
export class ConversationService implements ConversationServiceInterface {
  constructor(
    private readonly conversationRepo: ConversationRepository,
    private readonly mapper: ConversationMapper,
  ) {}

  async start(input: StartConversationRequestDTO): Promise<ConversationResponseDTO> {
    if (input.participantIds.length === 0) {
      throw new BusinessRuleError(
        'Conversation requires at least one participant',
        'conversation.participants.empty',
      );
    }
    const now = new Date().toISOString();
    const primary = input.participantIds[0];

    const conversation = ConversationEntity.create({
      id: ConversationIdVO.generate(),
      userId: UserIdVO.create(primary),
      type: ConversationTypeVO.create(input.type),
      ticketId: input.ticketId ? TicketIdVO.create(input.ticketId) : undefined,
      now,
    });

    await this.conversationRepo.save(conversation);
    return this.mapper.map(conversation);
  }

  async end(input: EndConversationRequestDTO): Promise<ConversationResponseDTO> {
    const conversation = await this.loadOrThrow(input.conversationId);
    conversation.end(input.reason, new Date().toISOString());
    await this.conversationRepo.save(conversation);
    return this.mapper.map(conversation);
  }

  async update(
    conversationId: string,
    _input: UpdateConversationRequestDTO,
  ): Promise<ConversationResponseDTO> {
    const conversation = await this.loadOrThrow(conversationId);
    // ConversationEntity-এ title/locked/pinned নেই — ভবিষ্যতে যোগ করা যাবে
    await this.conversationRepo.save(conversation);
    return this.mapper.map(conversation);
  }

  async getById(conversationId: string): Promise<ConversationResponseDTO> {
    const conversation = await this.loadOrThrow(conversationId);
    return this.mapper.map(conversation);
  }

  async listByUser(
    userId: string,
    page: number,
    limit: number,
  ): Promise<ConversationListResponseDTO> {
    const user = UserIdVO.create(userId);
    const all = await this.conversationRepo.findByUser(user);
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

  private async loadOrThrow(conversationId: string): Promise<ConversationEntity> {
    const conversation = await this.conversationRepo.findById(
      ConversationIdVO.create(conversationId),
    );
    if (!conversation) {
      throw new ConversationNotFoundException(conversationId);
    }
    return conversation;
  }
}
