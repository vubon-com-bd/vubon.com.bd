import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { ScheduleReturnPickupRequestDTO } from '../../dtos/requests/return-shipment/return-shipment.dto.js';
export class ScheduleReturnPickupCommand extends BaseCommand {
  readonly type = 'logistics.return_shipment.schedule_pickup';
  constructor(public readonly dto: ScheduleReturnPickupRequestDTO, public readonly actorId?: string) { super(); }
}
