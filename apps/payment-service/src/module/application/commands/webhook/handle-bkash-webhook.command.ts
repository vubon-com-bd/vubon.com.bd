import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class HandleBkashWebhookCommand extends BaseCommand {
  readonly type = 'webhook.bkash';

  constructor(
    public readonly paymentId: string,
    public readonly trxId: string,
    public readonly amount: string,
    public readonly currency: string,
    public readonly status: string,
    public readonly signature: string,
    public readonly rawPayload: Readonly<Record<string, unknown>>,
  ) {
    super();
  }
}
