import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class AddItemCommand extends BaseCommand {
  readonly type = 'cart.item.add';

  constructor(
    public readonly cartId: string,
    public readonly productId: string,
    public readonly quantity: number,
    public readonly variantId?: string,
    public readonly vendorId?: string,
    public readonly note?: string,
  ) {
    super();
  }
}
