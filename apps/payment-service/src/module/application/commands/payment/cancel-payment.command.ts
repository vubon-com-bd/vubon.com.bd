import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class CancelPaymentCommand extends BaseCommand {
  readonly type = 'payment.cancel';

  constructor(
    public readonly paymentId: string,
    public readonly reason?: string,
  ) {
    super();
  }
}
