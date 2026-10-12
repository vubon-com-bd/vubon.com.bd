import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { ScheduleDeliveryRequestDTO } from '../../dtos/requests/delivery/delivery.dto.js';
export class ScheduleDeliveryCommand extends BaseCommand {
  readonly type = 'logistics.delivery.schedule';
  constructor(public readonly dto: ScheduleDeliveryRequestDTO, public readonly actorId?: string) { super(); }
}
