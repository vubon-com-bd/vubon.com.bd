import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { CompleteReturnRequestDTO } from '@application/dtos/requests/return-shipment/index.js';
export class CompleteReturnShipmentCommand extends BaseCommand {
  readonly type = 'logistics.return_shipment.complete';
  constructor(public readonly dto: CompleteReturnRequestDTO, public readonly actorId: string) { super(); }
}
