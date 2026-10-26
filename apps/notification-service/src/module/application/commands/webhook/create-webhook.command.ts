import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { CreateWebhookCommandDTO } from '@application/dtos/requests/webhook/index.js';

export class CreateWebhookCommand extends BaseCommand {
  readonly type = 'notification.webhook.create';
  constructor(public readonly dto: CreateWebhookCommandDTO, public readonly actorId?: string) { super(); }
}
