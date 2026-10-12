import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { CreateShipmentRequestDTO } from '../../dtos/requests/shipment/shipment.dto.js';

export class CreateShipmentCommand extends BaseCommand {
  readonly type = 'logistics.shipment.create';
  constructor(
    public readonly dto: CreateShipmentRequestDTO,
    public readonly actorId?: string,
  ) { super(); }
}
