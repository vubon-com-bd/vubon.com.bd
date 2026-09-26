/**
 * AttachFileHandler
 * @module support-service/application/commands/message
 */
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { AttachFileCommand } from './attach-file.command';
import type { MessageResponseDTO } from '../../dtos/responses/message-response.dto';
import type { MessageServiceInterface } from '../../services/interfaces/message.service.interface';

export class AttachFileHandler extends BaseCommandHandler<
  AttachFileCommand,
  MessageResponseDTO
> {
  readonly commandType = 'support.message.attach_file';

  constructor(private readonly messageService: MessageServiceInterface) {
    super();
  }

  async execute(command: AttachFileCommand): Promise<MessageResponseDTO> {
    return this.messageService.attachFile(command.payload);
  }
}
