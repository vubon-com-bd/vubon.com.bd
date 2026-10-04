import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { ScheduleDeliveryRequestDTO } from '../../dtos/requests/delivery/schedule-delivery.dto.js';

export class ScheduleDeliveryCommand extends BaseCommand {
  readonly type = 'delivery.schedule';
  constructor(public readonly dto: ScheduleDeliveryRequestDTO, public readonly actorId?: string) { super(); }
}
