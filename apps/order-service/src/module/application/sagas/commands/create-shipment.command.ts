import { BaseCommand } from '@vubon/shared-kernel/application/commands';

export class CreateShipmentCommand extends BaseCommand {
  readonly type = 'saga.create_shipment';
  constructor(
    public readonly orderId: string,
    public readonly fulfillmentId: string,
    public readonly courierId?: string,
  ) { super(); }
}
