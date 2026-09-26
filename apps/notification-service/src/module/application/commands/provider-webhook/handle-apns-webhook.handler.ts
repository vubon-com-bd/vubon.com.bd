import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { HandleApnsWebhookCommand } from './handle-apns-webhook.command';

@CommandHandler(HandleApnsWebhookCommand)
export class HandleApnsWebhookHandler
  extends BaseCommandHandler<HandleApnsWebhookCommand, void>
  implements ICommandHandler<HandleApnsWebhookCommand>
{
  readonly commandType = 'provider-webhook.apns';

  async execute(command: HandleApnsWebhookCommand): Promise<void> {
    void command;
  }
}
