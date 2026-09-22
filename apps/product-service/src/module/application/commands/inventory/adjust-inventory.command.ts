import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class AdjustInventoryCommand extends BaseCommand {
  readonly type = 'product.inventory.adjust';

  constructor(
    public readonly productId: string,
    public readonly delta: number,
    public readonly reason?: string,
  ) {
    super();
  }
}
