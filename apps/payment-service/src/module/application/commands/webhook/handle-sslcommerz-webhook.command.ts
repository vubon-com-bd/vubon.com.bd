import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class HandleSslcommerzWebhookCommand extends BaseCommand {
  readonly type = 'webhook.sslcommerz';

  constructor(
    public readonly tranId: string,
    public readonly valId: string,
    public readonly amount: string,
    public readonly status: string,
    public readonly verifySign: string,
    public readonly rawPayload: Readonly<Record<string, unknown>>,
  ) {
    super();
  }
}
