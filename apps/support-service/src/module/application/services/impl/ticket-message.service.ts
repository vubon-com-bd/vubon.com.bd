import { Injectable } from '@nestjs/common';
import type { TicketMessageServiceInterface } from '../interfaces/ticket-message.service.interface';
import type { TicketMessageRepository } from '../../../domain/repositories/ticket-message.repository.interface';
import { TicketMessageEntity } from '../../../domain/entities/ticket-message.entity';
import { MessageIdVO } from '../../../domain/value-objects/primitives/message-id.vo';
import { MessageContentVO } from '../../../domain/value-objects/primitives/message-content.vo';
import { MessageTypeVO } from '../../../domain/value-objects/primitives/message-type.vo';
import { MessageStatusVO } from '../../../domain/value-objects/primitives/message-status.vo';
import { TicketIdVO } from '../../../domain/value-objects/primitives/ticket-id.vo';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo';
import { MessageNotFoundError, MessageOperationFailedError } from '../../errors/message.errors';
import type { SendMessageRequestDTO } from '../../dtos/requests/message';
import type { MessageResponseDTO } from '../../dtos/responses/message-response.dto';

@Injectable()
export class TicketMessageService implements TicketMessageServiceInterface {
  constructor(private readonly messageRepo: TicketMessageRepository) {}

  async send(input: SendMessageRequestDTO): Promise<MessageResponseDTO> {
    try {
      const senderId = 'senderId' in input && typeof input.senderId === 'string'
        ? input.senderId
        : crypto.randomUUID();
      const ticketId = 'ticketId' in input && typeof input.ticketId === 'string'
        ? input.ticketId
        : input.conversationId;

      const entity = TicketMessageEntity.create({
        ticketId: TicketIdVO.create(ticketId),
        senderId: UserIdVO.create(senderId),
        content: MessageContentVO.create(input.content),
        type: MessageTypeVO.create(input.type ?? 'text'),
        status: MessageStatusVO.create('sent'),
        isInternal: input.isInternal ?? false,
      });
      const saved = await this.messageRepo.save(entity);
      return this.toDTO(saved);
    } catch (error) {
      throw new MessageOperationFailedError(
        error instanceof Error ? error.message : 'unknown',
      );
    }
  }

  async findById(id: MessageIdVO): Promise<TicketMessageEntity | null> {
    return this.messageRepo.findById(id);
  }

  async delete(id: MessageIdVO): Promise<void> {
    const exists = await this.messageRepo.findById(id);
    if (!exists) throw new MessageNotFoundError(id.value);
    await this.messageRepo.delete(id);
  }

  private toDTO(entity: TicketMessageEntity): MessageResponseDTO {
    return {
      id: entity.id.value,
      conversationId: entity.ticketId.value,
      senderId: entity.senderId.value,
      content: entity.content.value,
      type: entity.type.value,
      status: entity.status.value,
      createdAt: entity.createdAt,
    };
  }
}
