import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class ValidateCouponCommand extends BaseCommand {
  readonly type = 'cart.coupon.validate';

  constructor(
    public readonly code: string,
    public readonly subtotal: number,
    public readonly currency: string,
  ) {
    super();
  }
}
