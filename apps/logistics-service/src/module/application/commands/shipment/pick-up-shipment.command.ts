import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { PickUpShipmentRequestDTO } from '@application/dtos/requests/shipment/index.js';

export class PickUpShipmentCommand extends BaseCommand {
  readonly type = 'logistics.shipment.pick_up';
  constructor(
    public readonly dto: PickUpShipmentRequestDTO,
    public readonly actorId: string,
  ) {
    super();
  }
}
