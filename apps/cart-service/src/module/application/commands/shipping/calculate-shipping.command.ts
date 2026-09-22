import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class CalculateShippingCommand extends BaseCommand {
  readonly type = 'cart.shipping.calculate';

  constructor(
    public readonly cartId: string,
    public readonly method: string,
    public readonly addressId?: string,
  ) {
    super();
  }
}
