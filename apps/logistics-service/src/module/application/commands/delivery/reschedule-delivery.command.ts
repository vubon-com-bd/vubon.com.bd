import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { RescheduleDeliveryRequestDTO } from '@application/dtos/requests/delivery/index.js';
export class RescheduleDeliveryCommand extends BaseCommand {
  readonly type = 'logistics.delivery.reschedule';
  constructor(public readonly dto: RescheduleDeliveryRequestDTO, public readonly actorId: string) { super(); }
}
