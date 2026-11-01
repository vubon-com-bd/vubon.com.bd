import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { PaperflyWebhookRequestDTO } from '@application/dtos/requests/webhook/index.js';

export class HandlePaperflyWebhookCommand extends BaseCommand {
  readonly type = 'logistics.webhook.paperfly';
  constructor(public readonly dto: PaperflyWebhookRequestDTO) { super(); }
}
