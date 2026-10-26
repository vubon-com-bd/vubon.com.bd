import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { HandleFcmWebhookCommand } from './handle-fcm-webhook.command.js';

export interface HandleFcmWebhookResult {
  readonly processed: boolean;
  readonly state: string;
}

@CommandHandler(HandleFcmWebhookCommand)
export class HandleFcmWebhookHandler
  implements ICommandHandler<HandleFcmWebhookCommand, HandleFcmWebhookResult>
{
  private readonly logger = new Logger(HandleFcmWebhookHandler.name);

  async execute(c: HandleFcmWebhookCommand): Promise<HandleFcmWebhookResult> {
    const { payload } = c.dto;
    this.logger.log(`FCM webhook: msg=${payload.messageId} state=${payload.state}`);
    return { processed: true, state: payload.state };
  }
}
