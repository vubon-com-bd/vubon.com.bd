import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { ArriveDeliveryRequestDTO } from '@application/dtos/requests/delivery/index.js';
export class ArriveDeliveryCommand extends BaseCommand {
  readonly type = 'logistics.delivery.arrive';
  constructor(public readonly dto: ArriveDeliveryRequestDTO, public readonly actorId: string) { super(); }
}
