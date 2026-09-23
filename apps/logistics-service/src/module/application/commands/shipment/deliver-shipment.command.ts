import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class DeliverShipmentCommand extends BaseCommand {
  readonly type = 'logistics.shipment.deliver';

  constructor(
    public readonly shipmentId: string,
    public readonly deliveredAt?: string,
  ) {
    super();
  }
}
