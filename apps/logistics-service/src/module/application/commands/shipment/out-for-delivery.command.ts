import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { OutForDeliveryRequestDTO } from '@application/dtos/requests/shipment/index.js';

export class OutForDeliveryCommand extends BaseCommand {
  readonly type = 'logistics.shipment.out_for_delivery';
  constructor(
    public readonly dto: OutForDeliveryRequestDTO,
    public readonly actorId: string,
  ) {
    super();
  }
}
