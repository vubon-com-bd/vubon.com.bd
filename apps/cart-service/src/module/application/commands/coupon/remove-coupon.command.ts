import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class RemoveCouponCommand extends BaseCommand {
  readonly type = 'cart.coupon.remove';

  constructor(
    public readonly cartId: string,
    public readonly code: string,
  ) {
    super();
  }
}
