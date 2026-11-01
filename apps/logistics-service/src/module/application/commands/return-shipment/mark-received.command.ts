import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { MarkReceivedRequestDTO } from '@application/dtos/requests/return-shipment/index.js';
export class MarkReceivedReturnShipmentCommand extends BaseCommand {
  readonly type = 'logistics.return_shipment.mark_received';
  constructor(public readonly dto: MarkReceivedRequestDTO, public readonly actorId: string) { super(); }
}
