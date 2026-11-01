import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { ApproveReturnRequestDTO } from '@application/dtos/requests/return-shipment/index.js';
export class ApproveReturnShipmentCommand extends BaseCommand {
  readonly type = 'logistics.return_shipment.approve';
  constructor(public readonly dto: ApproveReturnRequestDTO, public readonly actorId: string) { super(); }
}
