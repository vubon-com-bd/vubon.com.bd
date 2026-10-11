import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { DisableWebhookRequestDTO } from '../../dtos/requests/webhook/webhook.dto.js';

export class DisableWebhookCommand extends BaseCommand {
  readonly type = 'webhook.disable';
  constructor(public readonly dto: DisableWebhookRequestDTO, public readonly actorId?: string) {
    super();
  }
}
