import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { MarkReturnedRequestDTO } from '../../dtos/requests/shipment/shipment.dto.js';
export class MarkReturnedCommand extends BaseCommand {
  readonly type = 'logistics.shipment.mark_returned';
  constructor(public readonly dto: MarkReturnedRequestDTO, public readonly actorId?: string) { super(); }
}
