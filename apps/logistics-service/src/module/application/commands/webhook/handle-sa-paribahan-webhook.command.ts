import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { SaParibahanWebhookRequestDTO } from '@application/dtos/requests/webhook/index.js';

export class HandleSaParibahanWebhookCommand extends BaseCommand {
  readonly type = 'logistics.webhook.sa_paribahan';
  constructor(public readonly dto: SaParibahanWebhookRequestDTO) { super(); }
}
