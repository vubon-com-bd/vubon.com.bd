import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { ReturnShipmentActionRequestDTO } from '@application/dtos/requests/return-shipment/index.js';
export class StartTransitReturnShipmentCommand extends BaseCommand {
  readonly type = 'logistics.return_shipment.start_transit';
  constructor(public readonly dto: ReturnShipmentActionRequestDTO, public readonly actorId: string) { super(); }
}
