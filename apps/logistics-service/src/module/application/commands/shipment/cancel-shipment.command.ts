import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class CancelShipmentCommand extends BaseCommand {
  readonly type = 'logistics.shipment.cancel';

  constructor(
    public readonly shipmentId: string,
    public readonly reason: string,
  ) {
    super();
  }
}
