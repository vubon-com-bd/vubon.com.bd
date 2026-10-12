import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { RescheduleDeliveryRequestDTO } from '../../dtos/requests/delivery/delivery.dto.js';
export class RescheduleDeliveryCommand extends BaseCommand {
  readonly type = 'logistics.delivery.reschedule';
  constructor(public readonly dto: RescheduleDeliveryRequestDTO, public readonly actorId?: string) { super(); }
}
