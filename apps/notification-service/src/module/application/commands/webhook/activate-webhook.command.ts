import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { ActivateWebhookRequestDTO } from '../../dtos/requests/webhook/webhook.dto.js';

export class ActivateWebhookCommand extends BaseCommand {
  readonly type = 'webhook.activate';
  constructor(public readonly dto: ActivateWebhookRequestDTO, public readonly actorId?: string) {
    super();
  }
}
