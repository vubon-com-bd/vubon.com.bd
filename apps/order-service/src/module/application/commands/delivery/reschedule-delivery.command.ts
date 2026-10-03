import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { RescheduleDeliveryRequestDTO } from '../../dtos/requests/delivery/reschedule-delivery.dto.js';

export class RescheduleDeliveryCommand extends BaseCommand {
  readonly type = 'delivery.reschedule';
  constructor(public readonly dto: RescheduleDeliveryRequestDTO, public readonly actorId?: string) { super(); }
}
