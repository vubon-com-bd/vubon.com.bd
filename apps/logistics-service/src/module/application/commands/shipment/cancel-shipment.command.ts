import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { CancelShipmentRequestDTO } from '../../dtos/requests/shipment/shipment.dto.js';
export class CancelShipmentCommand extends BaseCommand {
  readonly type = 'logistics.shipment.cancel';
  constructor(public readonly dto: CancelShipmentRequestDTO, public readonly actorId?: string) { super(); }
}
