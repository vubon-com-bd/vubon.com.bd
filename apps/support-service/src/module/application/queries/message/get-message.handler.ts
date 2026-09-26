/**
 * GetMessageHandler
 * @module support-service/application/queries/message
 */
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetMessageQuery } from './get-message.query';
import type { MessageResponseDTO } from '../../dtos/responses/message-response.dto';
import type { MessageRepository } from '../../../domain/repositories/message.repository.interface';
import { MessageIdVO } from '../../../domain/value-objects/primitives/message-id.vo';
import { MessageMapper } from '../../mappers/message.mapper';
import { MessageNotFoundException } from '../../errors/message.errors';

export class GetMessageHandler extends BaseQueryHandler<
  GetMessageQuery,
  MessageResponseDTO
> {
  readonly queryType = 'support.message.get';

  constructor(
    private readonly messageRepo: MessageRepository,
    private readonly mapper: MessageMapper,
  ) {
    super();
  }

  async execute(query: GetMessageQuery): Promise<MessageResponseDTO> {
    const message = await this.messageRepo.findById(MessageIdVO.create(query.messageId));
    if (!message) {
      throw new MessageNotFoundException(query.messageId);
    }
    return this.mapper.map(message);
  }
}
