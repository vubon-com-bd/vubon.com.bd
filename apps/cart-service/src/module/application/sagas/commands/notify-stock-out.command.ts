import { BaseSagaCommand } from '@vubon/shared-kernel/application/sagas';

export interface StockOutItem {
  readonly itemId: string;
  readonly productId: string;
  readonly variantId?: string;
  readonly requested: number;
  readonly available: number;
}

export class NotifyStockOutCommand extends BaseSagaCommand {
  readonly type = 'cart.saga.notify_stock_out';

  constructor(
    public readonly cartId: string,
    public readonly items: readonly StockOutItem[],
    public readonly sagaId?: string,
  ) {
    super();
  }
}
