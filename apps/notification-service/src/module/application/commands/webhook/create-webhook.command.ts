import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { CreateWebhookRequestDTO } from '../../dtos/requests/webhook/webhook.dto.js';

export class CreateWebhookCommand extends BaseCommand {
  readonly type = 'webhook.create';
  constructor(public readonly dto: CreateWebhookRequestDTO, public readonly actorId?: string) {
    super();
  }
}
