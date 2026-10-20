/**
 * ReleaseInventoryCommand — saga helper
 * @module order-service/application/sagas/commands
 */
import { BaseSagaCommand } from '@vubon/shared-kernel/application/sagas';

export class ReleaseInventoryCommand extends BaseSagaCommand {
  readonly type = 'order.saga.release-inventory';
  constructor(
    public readonly orderId: string,
    public readonly items: readonly { itemId: string; quantity: number }[],
    public readonly sagaId?: string,
  ) {
    super();
  }
}
