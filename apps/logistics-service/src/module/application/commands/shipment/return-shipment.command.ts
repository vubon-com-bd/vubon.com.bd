import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { ReturnShipmentRequestDTO } from '@application/dtos/requests/shipment/index.js';

export class ReturnShipmentCommand extends BaseCommand {
  readonly type = 'logistics.shipment.return';
  constructor(
    public readonly dto: ReturnShipmentRequestDTO,
    public readonly actorId: string,
  ) {
    super();
  }
}
