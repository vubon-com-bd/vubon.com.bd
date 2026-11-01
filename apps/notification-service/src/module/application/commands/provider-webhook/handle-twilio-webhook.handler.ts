import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject, Logger } from '@nestjs/common';
import { HandleTwilioWebhookCommand } from './handle-twilio-webhook.command.js';
import {
  NOTIFICATION_DELIVERY_REPOSITORY,
  type NotificationDeliveryRepository,
} from '@domain/repositories/notification-delivery.repository.interface.js';

export interface HandleTwilioWebhookResult {
  readonly processed: boolean;
  readonly status: string;
}

@CommandHandler(HandleTwilioWebhookCommand)
export class HandleTwilioWebhookHandler
  implements ICommandHandler<HandleTwilioWebhookCommand, HandleTwilioWebhookResult>
{
  private readonly logger = new Logger(HandleTwilioWebhookHandler.name);

  constructor(
    @Inject(NOTIFICATION_DELIVERY_REPOSITORY)
    private readonly repo: NotificationDeliveryRepository,
  ) {}

  async execute(c: HandleTwilioWebhookCommand): Promise<HandleTwilioWebhookResult> {
    const { payload } = c.dto;
    const status = payload.Status ?? 'unknown';
    this.logger.log(`Twilio webhook: sid=${payload.MessageSid} status=${status}`);
    // Delivery lookup via providerMessageId
    return { processed: true, status };
  }
}
