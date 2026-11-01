import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { CancelReturnRequestDTO } from '@application/dtos/requests/return-shipment/index.js';
export class CancelReturnShipmentCommand extends BaseCommand {
  readonly type = 'logistics.return_shipment.cancel';
  constructor(public readonly dto: CancelReturnRequestDTO, public readonly actorId: string) { super(); }
}
