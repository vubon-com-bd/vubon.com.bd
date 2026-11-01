import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { ReturnShipmentActionRequestDTO } from '@application/dtos/requests/return-shipment/index.js';
export class MarkPickedUpReturnShipmentCommand extends BaseCommand {
  readonly type = 'logistics.return_shipment.mark_picked_up';
  constructor(public readonly dto: ReturnShipmentActionRequestDTO, public readonly actorId: string) { super(); }
}
