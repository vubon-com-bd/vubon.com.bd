import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { HandleTwilioWebhookCommandDTO } from '@application/dtos/requests/provider-webhook/index.js';

export class HandleTwilioWebhookCommand extends BaseCommand {
  readonly type = 'notification.provider_webhook.twilio';
  constructor(public readonly dto: HandleTwilioWebhookCommandDTO) { super(); }
}
