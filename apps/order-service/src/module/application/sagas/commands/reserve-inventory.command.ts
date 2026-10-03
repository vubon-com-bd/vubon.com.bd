import { BaseCommand } from '@vubon/shared-kernel/application/commands';

export class ReserveInventoryCommand extends BaseCommand {
  readonly type = 'saga.reserve_inventory';
  constructor(
    public readonly orderId: string,
    public readonly items: readonly { productId: string; variantId?: string; quantity: number }[],
  ) { super(); }
}
