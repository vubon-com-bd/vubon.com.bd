import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { CreateReturnShipmentRequestDTO } from '@application/dtos/requests/return-shipment/index.js';
export class CreateReturnShipmentCommand extends BaseCommand {
  readonly type = 'logistics.return_shipment.create';
  constructor(public readonly dto: CreateReturnShipmentRequestDTO, public readonly actorId: string) { super(); }
}
