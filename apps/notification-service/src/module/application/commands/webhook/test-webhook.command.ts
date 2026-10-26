import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { TestWebhookCommandDTO } from '@application/dtos/requests/webhook/index.js';

export class TestWebhookCommand extends BaseCommand {
  readonly type = 'notification.webhook.test';
  constructor(public readonly dto: TestWebhookCommandDTO, public readonly actorId?: string) { super(); }
}
