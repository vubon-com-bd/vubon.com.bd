import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { UpdateWebhookCommandDTO } from '@application/dtos/requests/webhook/index.js';

export class UpdateWebhookCommand extends BaseCommand {
  readonly type = 'notification.webhook.update';
  constructor(public readonly dto: UpdateWebhookCommandDTO, public readonly actorId?: string) { super(); }
}
