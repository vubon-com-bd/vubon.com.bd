import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class UpdateQuantityCommand extends BaseCommand {
  readonly type = 'cart.item.update_quantity';

  constructor(
    public readonly cartId: string,
    public readonly itemId: string,
    public readonly quantity: number,
  ) {
    super();
  }
}
