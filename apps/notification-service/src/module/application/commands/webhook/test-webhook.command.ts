import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { TestWebhookRequestDTO } from '../../dtos/requests/webhook/webhook.dto.js';

export class TestWebhookCommand extends BaseCommand {
  readonly type = 'webhook.test';
  constructor(public readonly dto: TestWebhookRequestDTO, public readonly actorId?: string) {
    super();
  }
}
