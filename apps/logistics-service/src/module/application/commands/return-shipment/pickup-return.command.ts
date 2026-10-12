import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { PickupReturnRequestDTO } from '../../dtos/requests/return-shipment/return-shipment.dto.js';
export class PickupReturnCommand extends BaseCommand {
  readonly type = 'logistics.return_shipment.pickup';
  constructor(public readonly dto: PickupReturnRequestDTO, public readonly actorId?: string) { super(); }
}
