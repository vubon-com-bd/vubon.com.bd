import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { SundarbanWebhookRequestDTO } from '@application/dtos/requests/webhook/index.js';

export class HandleSundarbanWebhookCommand extends BaseCommand {
  readonly type = 'logistics.webhook.sundarban';
  constructor(public readonly dto: SundarbanWebhookRequestDTO) { super(); }
}
