import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { SendBulkEmailCommand } from './send-bulk-email.command';

@CommandHandler(SendBulkEmailCommand)
export class SendBulkEmailHandler
  extends BaseCommandHandler<SendBulkEmailCommand, { queued: number }>
  implements ICommandHandler<SendBulkEmailCommand>
{
  readonly commandType = 'email.send-bulk';

  async execute(command: SendBulkEmailCommand): Promise<{ queued: number }> {
    return { queued: command.recipients.length };
  }
}
