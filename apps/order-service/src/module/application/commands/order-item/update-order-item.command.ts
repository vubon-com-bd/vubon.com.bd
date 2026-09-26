import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class UpdateOrderItemCommand extends BaseCommand {
  readonly type = 'order.item.update';

  constructor(
    public readonly itemId: string,
    public readonly quantity?: number,
    public readonly price?: number,
  ) {
    super();
  }
}
