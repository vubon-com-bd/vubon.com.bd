import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class AddOrderItemCommand extends BaseCommand {
  readonly type = 'order.item.add';

  constructor(
    public readonly orderId: string,
    public readonly productId: string,
    public readonly productName: string,
    public readonly quantity: number,
    public readonly price: number,
    public readonly variantId?: string,
  ) {
    super();
  }
}
