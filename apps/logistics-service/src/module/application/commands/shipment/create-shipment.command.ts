/**
 * CreateShipmentCommand
 * @module logistics-service/application/commands/shipment
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { CreateShipmentRequestDTO } from '@application/dtos/requests/shipment/index.js';

export class CreateShipmentCommand extends BaseCommand {
  readonly type = 'logistics.shipment.create';
  constructor(
    public readonly dto: CreateShipmentRequestDTO,
    public readonly actorId: string,
  ) {
    super();
  }
}
