import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { DeactivateWebhookRequestDTO } from '../../dtos/requests/webhook/webhook.dto.js';

export class DeactivateWebhookCommand extends BaseCommand {
  readonly type = 'webhook.deactivate';
  constructor(public readonly dto: DeactivateWebhookRequestDTO, public readonly actorId?: string) {
    super();
  }
}
