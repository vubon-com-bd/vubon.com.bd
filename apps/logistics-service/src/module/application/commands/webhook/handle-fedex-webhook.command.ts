import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { FedexWebhookRequestDTO } from '@application/dtos/requests/webhook/index.js';

export class HandleFedexWebhookCommand extends BaseCommand {
  readonly type = 'logistics.webhook.fedex';
  constructor(public readonly dto: FedexWebhookRequestDTO) { super(); }
}
