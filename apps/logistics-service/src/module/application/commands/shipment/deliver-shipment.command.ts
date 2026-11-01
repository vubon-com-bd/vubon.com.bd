import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { DeliverShipmentRequestDTO } from '@application/dtos/requests/shipment/index.js';

export class DeliverShipmentCommand extends BaseCommand {
  readonly type = 'logistics.shipment.deliver';
  constructor(
    public readonly dto: DeliverShipmentRequestDTO,
    public readonly actorId: string,
  ) {
    super();
  }
}
