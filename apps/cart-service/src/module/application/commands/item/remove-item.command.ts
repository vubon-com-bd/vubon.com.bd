import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class RemoveItemCommand extends BaseCommand {
  readonly type = 'cart.item.remove';

  constructor(
    public readonly cartId: string,
    public readonly itemId: string,
  ) {
    super();
  }
}
