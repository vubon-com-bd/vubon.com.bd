import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { MarkReturnInTransitRequestDTO } from '../../dtos/requests/return-shipment/return-shipment.dto.js';
export class MarkReturnInTransitCommand extends BaseCommand {
  readonly type = 'logistics.return_shipment.mark_in_transit';
  constructor(public readonly dto: MarkReturnInTransitRequestDTO, public readonly actorId?: string) { super(); }
}
