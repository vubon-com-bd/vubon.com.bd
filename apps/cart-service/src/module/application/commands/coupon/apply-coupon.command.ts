import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class ApplyCouponCommand extends BaseCommand {
  readonly type = 'cart.coupon.apply';

  constructor(
    public readonly cartId: string,
    public readonly code: string,
  ) {
    super();
  }
}
