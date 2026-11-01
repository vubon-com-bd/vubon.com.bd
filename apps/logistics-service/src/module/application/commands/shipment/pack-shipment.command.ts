import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { PackShipmentRequestDTO } from '@application/dtos/requests/shipment/index.js';

export class PackShipmentCommand extends BaseCommand {
  readonly type = 'logistics.shipment.pack';
  constructor(
    public readonly dto: PackShipmentRequestDTO,
    public readonly actorId: string,
  ) {
    super();
  }
}
