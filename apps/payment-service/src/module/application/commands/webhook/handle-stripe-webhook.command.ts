import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class HandleStripeWebhookCommand extends BaseCommand {
  readonly type = 'webhook.stripe';

  constructor(
    public readonly eventId: string,
    public readonly eventType: string,
    public readonly data: Readonly<Record<string, unknown>>,
    public readonly signature: string,
  ) {
    super();
  }
}
