import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { FailShipmentRequestDTO } from '@application/dtos/requests/shipment/index.js';

export class FailShipmentCommand extends BaseCommand {
  readonly type = 'logistics.shipment.fail';
  constructor(
    public readonly dto: FailShipmentRequestDTO,
    public readonly actorId: string,
  ) {
    super();
  }
}
