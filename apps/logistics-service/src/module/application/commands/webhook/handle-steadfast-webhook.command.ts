import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { SteadfastWebhookRequestDTO } from '@application/dtos/requests/webhook/index.js';

export class HandleSteadfastWebhookCommand extends BaseCommand {
  readonly type = 'logistics.webhook.steadfast';
  constructor(public readonly dto: SteadfastWebhookRequestDTO) { super(); }
}
