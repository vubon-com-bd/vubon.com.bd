import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class PickUpShipmentCommand extends BaseCommand {
  readonly type = 'logistics.shipment.pick-up';

  constructor(
    public readonly shipmentId: string,
    public readonly courierId: string,
  ) {
    super();
  }
}
