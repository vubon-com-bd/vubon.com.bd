import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class UpdateInventoryCommand extends BaseCommand {
  readonly type = 'product.inventory.update';

  constructor(
    public readonly productId: string,
    public readonly quantity: number,
  ) {
    super();
  }
}
