import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { UploadAttachmentCommand } from './upload-attachment.command';
import type { AttachmentServiceInterface } from '../../services/interfaces/attachment.service.interface';

@CommandHandler(UploadAttachmentCommand)
export class UploadAttachmentHandler
  extends BaseCommandHandler<UploadAttachmentCommand, { id: string; url: string }>
  implements ICommandHandler<UploadAttachmentCommand>
{
  readonly commandType = 'support.attachment.upload';

  constructor(private readonly attachmentService: AttachmentServiceInterface) {
    super();
  }

  async execute(command: UploadAttachmentCommand): Promise<{ id: string; url: string }> {
    return this.attachmentService.upload({
      url: command.url,
      type: command.type_,
      size: command.size,
      ticketId: command.ticketId,
      messageId: command.messageId,
    });
  }
}
