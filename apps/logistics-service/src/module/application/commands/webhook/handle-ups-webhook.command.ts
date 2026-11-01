import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { UpsWebhookRequestDTO } from '@application/dtos/requests/webhook/index.js';

export class HandleUpsWebhookCommand extends BaseCommand {
  readonly type = 'logistics.webhook.ups';
  constructor(public readonly dto: UpsWebhookRequestDTO) { super(); }
}
