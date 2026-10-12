import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { ApproveReturnRequestDTO } from '../../dtos/requests/return-shipment/return-shipment.dto.js';
export class ApproveReturnCommand extends BaseCommand {
  readonly type = 'logistics.return_shipment.approve';
  constructor(public readonly dto: ApproveReturnRequestDTO, public readonly actorId?: string) { super(); }
}
