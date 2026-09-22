import { BaseSagaCommand } from '@vubon/shared-kernel/application/sagas/base.saga.command';

export class CreateShipmentCommand extends BaseSagaCommand {
  readonly type = 'saga.order.create-shipment';

  constructor(
    public readonly orderId: string,
    public readonly deliveryId: string,
  ) {
    super();
  }
}
