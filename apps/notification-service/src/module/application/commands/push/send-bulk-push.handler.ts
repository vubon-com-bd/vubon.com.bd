import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { SendBulkPushCommand } from './send-bulk-push.command';

@CommandHandler(SendBulkPushCommand)
export class SendBulkPushHandler
  extends BaseCommandHandler<SendBulkPushCommand, { queued: number }>
  implements ICommandHandler<SendBulkPushCommand>
{
  readonly commandType = 'push.send-bulk';

  async execute(command: SendBulkPushCommand): Promise<{ queued: number }> {
    return { queued: command.userIds.length };
  }
}
