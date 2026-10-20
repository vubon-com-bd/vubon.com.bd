/**
 * CreateShipmentCommand — saga helper
 * @module order-service/application/sagas/commands
 */
import { BaseSagaCommand } from '@vubon/shared-kernel/application/sagas';

export class CreateShipmentCommand extends BaseSagaCommand {
  readonly type = 'order.saga.create-shipment';
  constructor(
    public readonly orderId: string,
    public readonly courierId: string,
    public readonly warehouseId: string,
    public readonly sagaId?: string,
  ) {
    super();
  }
}
