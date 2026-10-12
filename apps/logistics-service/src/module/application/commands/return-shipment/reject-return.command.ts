import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { RejectReturnRequestDTO } from '../../dtos/requests/return-shipment/return-shipment.dto.js';
export class RejectReturnCommand extends BaseCommand {
  readonly type = 'logistics.return_shipment.reject';
  constructor(public readonly dto: RejectReturnRequestDTO, public readonly actorId?: string) { super(); }
}
