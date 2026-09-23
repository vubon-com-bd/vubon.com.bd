import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class CreateShipmentCommand extends BaseCommand {
  readonly type = 'logistics.shipment.create';

  constructor(
    public readonly orderId: string,
    public readonly userId: string,
    public readonly shipmentType: string = 'standard',
    public readonly shipmentPriority: string = 'normal',
  ) {
    super();
  }
}
