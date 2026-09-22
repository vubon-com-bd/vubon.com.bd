import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class MoveToSavedCommand extends BaseCommand {
  readonly type = 'cart.item.move_to_saved';

  constructor(
    public readonly cartId: string,
    public readonly itemId: string,
    public readonly userId: string,
  ) {
    super();
  }
}
