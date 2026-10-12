import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { CancelReturnRequestDTO } from '../../dtos/requests/return-shipment/return-shipment.dto.js';
export class CancelReturnCommand extends BaseCommand {
  readonly type = 'logistics.return_shipment.cancel';
  constructor(public readonly dto: CancelReturnRequestDTO, public readonly actorId?: string) { super(); }
}
