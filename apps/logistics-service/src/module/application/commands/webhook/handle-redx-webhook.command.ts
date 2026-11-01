import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { RedxWebhookRequestDTO } from '@application/dtos/requests/webhook/index.js';

export class HandleRedxWebhookCommand extends BaseCommand {
  readonly type = 'logistics.webhook.redx';
  constructor(public readonly dto: RedxWebhookRequestDTO) { super(); }
}
