import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { ReceiveReturnRequestDTO } from '../../dtos/requests/return-shipment/return-shipment.dto.js';
export class ReceiveReturnCommand extends BaseCommand {
  readonly type = 'logistics.return_shipment.receive';
  constructor(public readonly dto: ReceiveReturnRequestDTO, public readonly actorId?: string) { super(); }
}
