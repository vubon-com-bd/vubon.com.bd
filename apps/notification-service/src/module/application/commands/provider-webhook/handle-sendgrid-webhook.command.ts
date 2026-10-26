import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { HandleSendgridWebhookCommandDTO } from '@application/dtos/requests/provider-webhook/index.js';

export class HandleSendgridWebhookCommand extends BaseCommand {
  readonly type = 'notification.provider_webhook.sendgrid';
  constructor(public readonly dto: HandleSendgridWebhookCommandDTO) { super(); }
}
