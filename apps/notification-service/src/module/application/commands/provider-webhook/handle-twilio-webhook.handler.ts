import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { HandleTwilioWebhookCommand } from './handle-twilio-webhook.command';

@CommandHandler(HandleTwilioWebhookCommand)
export class HandleTwilioWebhookHandler
  extends BaseCommandHandler<HandleTwilioWebhookCommand, void>
  implements ICommandHandler<HandleTwilioWebhookCommand>
{
  readonly commandType = 'provider-webhook.twilio';

  async execute(command: HandleTwilioWebhookCommand): Promise<void> {
    void command;
  }
}
