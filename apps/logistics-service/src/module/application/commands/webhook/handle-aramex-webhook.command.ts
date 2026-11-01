import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { AramexWebhookRequestDTO } from '@application/dtos/requests/webhook/index.js';

export class HandleAramexWebhookCommand extends BaseCommand {
  readonly type = 'logistics.webhook.aramex';
  constructor(public readonly dto: AramexWebhookRequestDTO) { super(); }
}
