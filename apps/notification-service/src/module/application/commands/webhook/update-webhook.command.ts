import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { UpdateWebhookRequestDTO } from '../../dtos/requests/webhook/webhook.dto.js';

export class UpdateWebhookCommand extends BaseCommand {
  readonly type = 'webhook.update';
  constructor(public readonly dto: UpdateWebhookRequestDTO, public readonly actorId?: string) {
    super();
  }
}
