import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class ProceedToCheckoutCommand extends BaseCommand {
  readonly type = 'cart.checkout.proceed';

  constructor(
    public readonly cartId: string,
    public readonly addressId?: string,
    public readonly shippingMethod?: string,
    public readonly idempotencyKey?: string,
  ) {
    super();
  }
}
