import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { DhlWebhookRequestDTO } from '@application/dtos/requests/webhook/index.js';

export class HandleDhlWebhookCommand extends BaseCommand {
  readonly type = 'logistics.webhook.dhl';
  constructor(public readonly dto: DhlWebhookRequestDTO) { super(); }
}
