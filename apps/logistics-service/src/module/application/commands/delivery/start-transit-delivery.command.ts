import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { DeliveryStartTransitRequestDTO } from '@application/dtos/requests/delivery/index.js';
export class DeliveryStartTransitCommand extends BaseCommand {
  readonly type = 'logistics.delivery.start_transit';
  constructor(public readonly dto: DeliveryStartTransitRequestDTO, public readonly actorId: string) { super(); }
}
