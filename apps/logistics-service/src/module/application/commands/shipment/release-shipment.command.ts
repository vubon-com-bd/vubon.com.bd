import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { ReleaseShipmentRequestDTO } from '../../dtos/requests/shipment/shipment.dto.js';
export class ReleaseShipmentCommand extends BaseCommand {
  readonly type = 'logistics.shipment.release';
  constructor(public readonly dto: ReleaseShipmentRequestDTO, public readonly actorId?: string) { super(); }
}
