import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class ReleaseInventoryCommand extends BaseCommand {
  readonly type = 'product.inventory.release';

  constructor(
    public readonly productId: string,
    public readonly quantity: number,
    public readonly orderId: string,
  ) {
    super();
  }
}
