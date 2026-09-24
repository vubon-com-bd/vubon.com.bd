import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { SendBulkSmsCommand } from './send-bulk-sms.command';

@CommandHandler(SendBulkSmsCommand)
export class SendBulkSmsHandler
  extends BaseCommandHandler<SendBulkSmsCommand, { queued: number }>
  implements ICommandHandler<SendBulkSmsCommand>
{
  readonly commandType = 'sms.send-bulk';

  async execute(command: SendBulkSmsCommand): Promise<{ queued: number }> {
    return { queued: command.recipients.length };
  }
}
