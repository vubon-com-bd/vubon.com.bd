import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { HandleFcmWebhookCommand } from './handle-fcm-webhook.command';

@CommandHandler(HandleFcmWebhookCommand)
export class HandleFcmWebhookHandler
  extends BaseCommandHandler<HandleFcmWebhookCommand, void>
  implements ICommandHandler<HandleFcmWebhookCommand>
{
  readonly commandType = 'provider-webhook.fcm';

  async execute(command: HandleFcmWebhookCommand): Promise<void> {
    void command;
  }
}
