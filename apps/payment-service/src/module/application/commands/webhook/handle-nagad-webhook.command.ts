import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class HandleNagadWebhookCommand extends BaseCommand {
  readonly type = 'webhook.nagad';

  constructor(
    public readonly paymentRefId: string,
    public readonly orderId: string,
    public readonly amount: string,
    public readonly status: string,
    public readonly signature: string,
    public readonly rawPayload: Readonly<Record<string, unknown>>,
  ) {
    super();
  }
}
