/**
 * MarkMessageReadHandler
 * @module support-service/application/commands/message
 */
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { MarkMessageReadCommand } from './mark-read.command';
import type { MessageResponseDTO } from '../../dtos/responses/message-response.dto';
import type { MessageServiceInterface } from '../../services/interfaces/message.service.interface';

export class MarkMessageReadHandler extends BaseCommandHandler<
  MarkMessageReadCommand,
  MessageResponseDTO
> {
  readonly commandType = 'support.message.mark_read';

  constructor(private readonly messageService: MessageServiceInterface) {
    super();
  }

  async execute(command: MarkMessageReadCommand): Promise<MessageResponseDTO> {
    return this.messageService.markRead(command.payload);
  }
}
