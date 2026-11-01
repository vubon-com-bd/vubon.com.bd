import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { PickUpDeliveryRequestDTO } from '@application/dtos/requests/delivery/index.js';
export class PickUpDeliveryCommand extends BaseCommand {
  readonly type = 'logistics.delivery.pick_up';
  constructor(public readonly dto: PickUpDeliveryRequestDTO, public readonly actorId: string) { super(); }
}
