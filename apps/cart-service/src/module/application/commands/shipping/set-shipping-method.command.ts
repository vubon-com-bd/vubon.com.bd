import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class SetShippingMethodCommand extends BaseCommand {
  readonly type = 'cart.shipping.set';

  constructor(
    public readonly cartId: string,
    public readonly method: string,
    public readonly cost: number,
    public readonly addressId?: string,
  ) {
    super();
  }
}
