import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { UpdateShipmentRequestDTO } from '../../dtos/requests/shipment/shipment.dto.js';
export class UpdateShipmentCommand extends BaseCommand {
  readonly type = 'logistics.shipment.update';
  constructor(public readonly dto: UpdateShipmentRequestDTO, public readonly actorId?: string) { super(); }
}
