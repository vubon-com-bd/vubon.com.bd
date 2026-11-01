import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { DeliveryOutForDeliveryRequestDTO } from '@application/dtos/requests/delivery/index.js';
export class DeliveryOutForDeliveryCommand extends BaseCommand {
  readonly type = 'logistics.delivery.out_for_delivery';
  constructor(public readonly dto: DeliveryOutForDeliveryRequestDTO, public readonly actorId: string) { super(); }
}
