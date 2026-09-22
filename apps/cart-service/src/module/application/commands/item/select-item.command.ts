import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class SelectItemCommand extends BaseCommand {
  readonly type = 'cart.item.select';

  constructor(
    public readonly cartId: string,
    public readonly itemId: string,
    public readonly selected: boolean,
  ) {
    super();
  }
}
