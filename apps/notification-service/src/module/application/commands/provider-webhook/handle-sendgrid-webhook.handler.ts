import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { HandleSendGridWebhookCommand } from './handle-sendgrid-webhook.command';

@CommandHandler(HandleSendGridWebhookCommand)
export class HandleSendGridWebhookHandler
  extends BaseCommandHandler<HandleSendGridWebhookCommand, { processed: number }>
  implements ICommandHandler<HandleSendGridWebhookCommand>
{
  readonly commandType = 'provider-webhook.sendgrid';

  async execute(command: HandleSendGridWebhookCommand): Promise<{ processed: number }> {
    return { processed: command.events.length };
  }
}
