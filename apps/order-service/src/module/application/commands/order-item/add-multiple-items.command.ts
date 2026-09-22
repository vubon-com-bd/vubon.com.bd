import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export interface ItemInput {
  readonly productId: string;
  readonly variantId?: string;
  readonly productName: string;
  readonly quantity: number;
  readonly price: number;
}

export class AddMultipleItemsCommand extends BaseCommand {
  readonly type = 'order.item.add-multiple';

  constructor(
    public readonly orderId: string,
    public readonly items: readonly ItemInput[],
  ) {
    super();
  }
}
