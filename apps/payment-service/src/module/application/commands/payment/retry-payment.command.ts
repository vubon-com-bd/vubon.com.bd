import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class RetryPaymentCommand extends BaseCommand {
  readonly type = 'payment.retry';

  constructor(
    public readonly paymentId: string,
    public readonly idempotencyKey?: string,
  ) {
    super();
  }
}
