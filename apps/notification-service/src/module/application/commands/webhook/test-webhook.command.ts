import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class TestWebhookCommand extends BaseCommand {
  readonly type = 'webhook.test';

  constructor(
    public readonly webhookId: string,
    public readonly event: string,
    public readonly data?: Record<string, unknown>,
  ) {
    super();
  }
}
