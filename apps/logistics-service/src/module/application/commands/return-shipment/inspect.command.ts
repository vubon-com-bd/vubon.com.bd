import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { InspectReturnRequestDTO } from '@application/dtos/requests/return-shipment/index.js';
export class InspectReturnShipmentCommand extends BaseCommand {
  readonly type = 'logistics.return_shipment.inspect';
  constructor(public readonly dto: InspectReturnRequestDTO, public readonly actorId: string) { super(); }
}
