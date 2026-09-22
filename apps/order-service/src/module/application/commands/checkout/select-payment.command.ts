import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class SelectPaymentCommand extends BaseCommand {
  readonly type = 'checkout.payment.select';

  constructor(
    public readonly checkoutId: string,
    public readonly paymentMethod: string,
  ) {
    super();
  }
}
