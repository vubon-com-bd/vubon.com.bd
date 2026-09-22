import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class UpdateItemCommand extends BaseCommand {
  readonly type = 'cart.item.update';

  constructor(
    public readonly cartId: string,
    public readonly itemId: string,
    public readonly quantity: number,
    public readonly note?: string,
  ) {
    super();
  }
}
