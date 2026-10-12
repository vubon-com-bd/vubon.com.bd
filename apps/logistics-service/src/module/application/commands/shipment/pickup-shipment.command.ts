import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { PickupShipmentRequestDTO } from '../../dtos/requests/shipment/shipment.dto.js';
export class PickupShipmentCommand extends BaseCommand {
  readonly type = 'logistics.shipment.pickup';
  constructor(public readonly dto: PickupShipmentRequestDTO, public readonly actorId?: string) { super(); }
}
