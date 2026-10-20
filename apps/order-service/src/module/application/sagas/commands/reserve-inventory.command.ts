/**
 * ReserveInventoryCommand — saga helper
 * @module order-service/application/sagas/commands
 */
import { BaseSagaCommand } from '@vubon/shared-kernel/application/sagas';

export class ReserveInventoryCommand extends BaseSagaCommand {
  readonly type = 'order.saga.reserve-inventory';
  constructor(
    public readonly orderId: string,
    public readonly items: readonly { itemId: string; quantity: number }[],
    public readonly sagaId?: string,
  ) {
    super();
  }
}
