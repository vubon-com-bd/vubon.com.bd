import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class PickupReturnCommand extends BaseCommand {
  readonly type = 'logistics.return-shipment.pickup';

  constructor(
    public readonly returnShipmentId: string,
    public readonly courierId?: string,
  ) {
    super();
  }
}
