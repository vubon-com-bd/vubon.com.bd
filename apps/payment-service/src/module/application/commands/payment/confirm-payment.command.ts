import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class ConfirmPaymentCommand extends BaseCommand {
  readonly type = 'payment.confirm';

  constructor(
    public readonly paymentId: string,
    public readonly idempotencyKey?: string,
  ) {
    super();
  }
}
