import { BaseSagaCommand } from '@vubon/shared-kernel/application/sagas';

export interface PriceChangeItem {
  readonly itemId: string;
  readonly productId: string;
  readonly oldPrice: number;
  readonly newPrice: number;
  readonly delta: number;
}

export class NotifyPriceChangeCommand extends BaseSagaCommand {
  readonly type = 'cart.saga.notify_price_change';

  constructor(
    public readonly cartId: string,
    public readonly changes: readonly PriceChangeItem[],
    public readonly currency: string,
    public readonly sagaId?: string,
  ) {
    super();
  }
}
