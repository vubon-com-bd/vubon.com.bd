import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { InspectReturnRequestDTO } from '../../dtos/requests/return-shipment/return-shipment.dto.js';
export class InspectReturnCommand extends BaseCommand {
  readonly type = 'logistics.return_shipment.inspect';
  constructor(public readonly dto: InspectReturnRequestDTO, public readonly actorId?: string) { super(); }
}
