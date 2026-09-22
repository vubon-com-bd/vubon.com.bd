import { BaseSagaCommand } from '@vubon/shared-kernel/application/sagas/base.saga.command';

export class SendLowStockAlertCommand extends BaseSagaCommand {
  readonly type = 'saga.product.low-stock-alert';

  constructor(
    public readonly productId: string,
    public readonly remaining: number,
  ) {
    super();
  }
}
