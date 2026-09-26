import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class UpdateShipmentCommand extends BaseCommand {
  readonly type = 'logistics.shipment.update';

  constructor(
    public readonly shipmentId: string,
    public readonly shipmentStatus?: string,
    public readonly shipmentPriority?: string,
    public readonly notes?: string,
  ) {
    super();
  }
}
