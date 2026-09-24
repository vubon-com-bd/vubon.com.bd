import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { AttachFileCommand } from './attach-file.command';
import type { AttachmentServiceInterface } from '../../services/interfaces/attachment.service.interface';

@CommandHandler(AttachFileCommand)
export class AttachFileHandler
  extends BaseCommandHandler<AttachFileCommand, { id: string; url: string }>
  implements ICommandHandler<AttachFileCommand>
{
  readonly commandType = 'support.message.attach-file';

  constructor(private readonly attachmentService: AttachmentServiceInterface) {
    super();
  }

  async execute(command: AttachFileCommand): Promise<{ id: string; url: string }> {
    return this.attachmentService.upload({
      messageId: command.messageId,
      type: command.type_,
      url: command.url,
      size: command.size,
    });
  }
}
