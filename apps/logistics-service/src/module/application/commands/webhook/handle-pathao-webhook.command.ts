import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { PathaoWebhookRequestDTO } from '@application/dtos/requests/webhook/index.js';

export class HandlePathaoWebhookCommand extends BaseCommand {
  readonly type = 'logistics.webhook.pathao';
  constructor(public readonly dto: PathaoWebhookRequestDTO) { super(); }
}
