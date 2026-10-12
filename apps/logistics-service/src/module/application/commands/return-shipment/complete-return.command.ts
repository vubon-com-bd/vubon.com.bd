import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { CompleteReturnRequestDTO } from '../../dtos/requests/return-shipment/return-shipment.dto.js';
export class CompleteReturnCommand extends BaseCommand {
  readonly type = 'logistics.return_shipment.complete';
  constructor(public readonly dto: CompleteReturnRequestDTO, public readonly actorId?: string) { super(); }
}
