import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { MarkReturnLostRequestDTO } from '../../dtos/requests/return-shipment/return-shipment.dto.js';
export class MarkReturnLostCommand extends BaseCommand {
  readonly type = 'logistics.return_shipment.mark_lost';
  constructor(public readonly dto: MarkReturnLostRequestDTO, public readonly actorId?: string) { super(); }
}
