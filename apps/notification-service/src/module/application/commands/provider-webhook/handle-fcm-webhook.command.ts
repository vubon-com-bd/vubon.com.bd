import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { HandleFcmWebhookCommandDTO } from '@application/dtos/requests/provider-webhook/index.js';

export class HandleFcmWebhookCommand extends BaseCommand {
  readonly type = 'notification.provider_webhook.fcm';
  constructor(public readonly dto: HandleFcmWebhookCommandDTO) { super(); }
}
