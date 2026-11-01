import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { HandleApnsWebhookCommandDTO } from '@application/dtos/requests/provider-webhook/index.js';

export class HandleApnsWebhookCommand extends BaseCommand {
  readonly type = 'notification.provider_webhook.apns';
  constructor(public readonly dto: HandleApnsWebhookCommandDTO) { super(); }
}
