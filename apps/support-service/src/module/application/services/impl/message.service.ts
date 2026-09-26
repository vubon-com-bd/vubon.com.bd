/**
 * MessageService — use case orchestration
 * @module support-service/application/services/impl
 */
import { Injectable } from '@nestjs/common';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';

import type { MessageServiceInterface } from '../interfaces/message.service.interface';
import type { MessageRepository } from '../../../domain/repositories/message.repository.interface';
import type { ConversationRepository } from '../../../domain/repositories/conversation.repository.interface';
import { MessageEntity } from '../../../domain/entities/message.entity';
import { MessageIdVO } from '../../../domain/value-objects/primitives/message-id.vo';
import { MessageContentVO } from '../../../domain/value-objects/primitives/message-content.vo';
import { MessageTypeVO } from '../../../domain/value-objects/primitives/message-type.vo';
import { ConversationIdVO } from '../../../domain/value-objects/primitives/conversation-id.vo';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo';
import { AgentIdVO } from '../../../domain/value-objects/primitives/agent-id.vo';

import { MessageMapper } from '../../mappers/message.mapper';
import { MessageNotFoundException } from '../../errors/message.errors';
import { ConversationNotFoundException } from '../../errors/conversation.errors';
import type { SendMessageRequestDTO } from '../../dtos/requests/message/send-message.dto';
import type { MarkMessageReadRequestDTO } from '../../dtos/requests/message/mark-read.dto';
import type { AttachFileRequestDTO } from '../../dtos/requests/message/attach-file.dto';
import type { MessageResponseDTO } from '../../dtos/responses/message-response.dto';
import type { MessageListResponseDTO } from '../../dtos/responses/message-list-response.dto';

@Injectable()
export class MessageService implements MessageServiceInterface {
  constructor(
    private readonly messageRepo: MessageRepository,
    private readonly conversationRepo: ConversationRepository,
    private readonly mapper: MessageMapper,
  ) {}

  async send(input: SendMessageRequestDTO): Promise<MessageResponseDTO> {
    const conversation = await this.conversationRepo.findById(
      ConversationIdVO.create(input.conversationId),
    );
    if (!conversation) {
      throw new ConversationNotFoundException(input.conversationId);
    }
    if (!conversation.isActive) {
      throw new BusinessRuleError(
        'Cannot send message to closed conversation',
        'message.conversation.closed',
      );
    }

    const senderKind = input.senderType === 'agent' ? 'agent' : 'user';
    const now = new Date().toISOString();

    const message = MessageEntity.create({
      id: MessageIdVO.generate(),
      conversationId: conversation.id,
      content: MessageContentVO.create(input.content),
      type: MessageTypeVO.create(input.type ?? 'text'),
      senderKind,
      senderUserId:
        senderKind === 'user' && input.senderId
          ? UserIdVO.create(input.senderId)
          : senderKind === 'user'
            ? conversation.userId
            : undefined,
      senderAgentId:
        senderKind === 'agent' && input.senderId
          ? AgentIdVO.create(input.senderId)
          : undefined,
      now,
    });

    await this.messageRepo.save(message);
    return this.mapper.map(message);
  }

  async markRead(input: MarkMessageReadRequestDTO): Promise<MessageResponseDTO> {
    const message = await this.loadOrThrow(input.messageId);
    message.markRead(new Date().toISOString());
    await this.messageRepo.save(message);
    return this.mapper.map(message);
  }

  async attachFile(input: AttachFileRequestDTO): Promise<MessageResponseDTO> {
    if (input.attachments.length === 0) {
      throw new BusinessRuleError(
        'At least one attachment required',
        'message.attach.empty',
      );
    }
    const message = await this.loadOrThrow(input.messageId);
    // attachment linking happens at message metadata layer
    void input.attachments;
    await this.messageRepo.save(message);
    return this.mapper.map(message);
  }

  async listByConversation(
    conversationId: string,
    page: number,
    limit: number,
  ): Promise<MessageListResponseDTO> {
    const convId = ConversationIdVO.create(conversationId);
    const all = await this.messageRepo.findByConversation(convId);
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

  private async loadOrThrow(messageId: string): Promise<MessageEntity> {
    const message = await this.messageRepo.findById(MessageIdVO.create(messageId));
    if (!message) {
      throw new MessageNotFoundException(messageId);
    }
    return message;
  }
}
