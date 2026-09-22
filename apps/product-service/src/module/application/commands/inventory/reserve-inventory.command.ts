import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class ReserveInventoryCommand extends BaseCommand {
  readonly type = 'product.inventory.reserve';

  constructor(
    public readonly productId: string,
    public readonly quantity: number,
    public readonly orderId: string,
  ) {
    super();
  }
}
