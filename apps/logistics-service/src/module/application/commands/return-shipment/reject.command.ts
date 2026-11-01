import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { RejectReturnRequestDTO } from '@application/dtos/requests/return-shipment/index.js';
export class RejectReturnShipmentCommand extends BaseCommand {
  readonly type = 'logistics.return_shipment.reject';
  constructor(public readonly dto: RejectReturnRequestDTO, public readonly actorId: string) { super(); }
}
