/**
 * SendLowStockAlertCommand — saga command
 * @module product-service/application/sagas/commands
 */
import { BaseSagaCommand } from '@vubon/shared-kernel/application/sagas';

export class SendLowStockAlertCommand extends BaseSagaCommand {
  readonly type = 'product.saga.send_low_stock_alert';

  constructor(
    public readonly productId: string,
    public readonly variantId: string | undefined,
    public readonly currentStock: number,
    public readonly threshold: number,
    public readonly recipients: readonly string[],
    sagaId?: string,
  ) {
    super();
    if (sagaId) (this as { sagaId?: string }).sagaId = sagaId;
  }
}
