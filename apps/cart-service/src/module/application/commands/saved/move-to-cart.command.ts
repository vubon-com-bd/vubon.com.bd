import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class MoveToCartCommand extends BaseCommand {
  readonly type = 'cart.saved.move_to_cart';

  constructor(
    public readonly savedItemId: string,
    public readonly cartId: string,
  ) {
    super();
  }
}
