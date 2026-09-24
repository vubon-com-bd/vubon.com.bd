import { Injectable } from '@nestjs/common';
import type { MessageServiceInterface } from '../interfaces/message.service.interface';
import type { MessageRepository } from '../../../domain/repositories/message.repository.interface';
import { MessageEntity } from '../../../domain/entities/message.entity';
import { MessageIdVO } from '../../../domain/value-objects/primitives/message-id.vo';
import { MessageContentVO } from '../../../domain/value-objects/primitives/message-content.vo';
import { MessageTypeVO } from '../../../domain/value-objects/primitives/message-type.vo';
import { MessageStatusVO } from '../../../domain/value-objects/primitives/message-status.vo';
import { ConversationIdVO } from '../../../domain/value-objects/primitives/conversation-id.vo';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo';
import type { SendMessageRequestDTO } from '../../dtos/requests/message';
import type { MessageResponseDTO } from '../../dtos/responses/message-response.dto';

@Injectable()
export class MessageService implements MessageServiceInterface {
  constructor(private readonly messageRepo: MessageRepository) {}

  async send(input: SendMessageRequestDTO): Promise<MessageResponseDTO> {
    // Schema lacks senderId — accept via cast (interface-এ থাকলে adjust)
    const senderId = 'senderId' in input && typeof input.senderId === 'string'
      ? input.senderId
      : crypto.randomUUID();

    const entity = MessageEntity.create({
      conversationId: ConversationIdVO.create(input.conversationId),
      senderId: UserIdVO.create(senderId),
      content: MessageContentVO.create(input.content),
      type: MessageTypeVO.create(input.type ?? 'text'),
      status: MessageStatusVO.create('sent'),
    });
    const saved = await this.messageRepo.save(entity);
    return this.toDTO(saved);
  }

  async findById(id: MessageIdVO): Promise<MessageEntity | null> {
    return this.messageRepo.findById(id);
  }

  async delete(id: MessageIdVO): Promise<void> {
    await this.messageRepo.delete(id);
  }

  private toDTO(entity: MessageEntity): MessageResponseDTO {
    return {
      id: entity.id.value,
      conversationId: entity.conversationId.value,
      senderId: entity.senderId.value,
      content: entity.content.value,
      type: entity.type.value,
      status: entity.status.value,
      createdAt: entity.createdAt,
    };
  }
}
