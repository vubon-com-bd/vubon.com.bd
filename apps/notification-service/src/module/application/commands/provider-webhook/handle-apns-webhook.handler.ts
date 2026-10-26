import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { HandleApnsWebhookCommand } from './handle-apns-webhook.command.js';

export interface HandleApnsWebhookResult {
  readonly processed: boolean;
  readonly state: string;
}

@CommandHandler(HandleApnsWebhookCommand)
export class HandleApnsWebhookHandler
  implements ICommandHandler<HandleApnsWebhookCommand, HandleApnsWebhookResult>
{
  private readonly logger = new Logger(HandleApnsWebhookHandler.name);

  async execute(c: HandleApnsWebhookCommand): Promise<HandleApnsWebhookResult> {
    const { payload } = c.dto;
    this.logger.log(`APNs webhook: apnsId=${payload.apnsId} state=${payload.state}`);
    return { processed: true, state: payload.state };
  }
}
