import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { ScheduleDeliveryRequestDTO } from '@application/dtos/requests/delivery/index.js';
export class ScheduleDeliveryCommand extends BaseCommand {
  readonly type = 'logistics.delivery.schedule';
  constructor(public readonly dto: ScheduleDeliveryRequestDTO, public readonly actorId: string) { super(); }
}
