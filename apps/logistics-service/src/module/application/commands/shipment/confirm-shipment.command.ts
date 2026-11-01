import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { ConfirmShipmentRequestDTO } from '@application/dtos/requests/shipment/index.js';

export class ConfirmShipmentCommand extends BaseCommand {
  readonly type = 'logistics.shipment.confirm';
  constructor(
    public readonly dto: ConfirmShipmentRequestDTO,
    public readonly actorId: string,
  ) {
    super();
  }
}
