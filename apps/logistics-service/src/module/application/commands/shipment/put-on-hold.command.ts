import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { PutOnHoldRequestDTO } from '../../dtos/requests/shipment/shipment.dto.js';
export class PutOnHoldCommand extends BaseCommand {
  readonly type = 'logistics.shipment.put_on_hold';
  constructor(public readonly dto: PutOnHoldRequestDTO, public readonly actorId?: string) { super(); }
}
