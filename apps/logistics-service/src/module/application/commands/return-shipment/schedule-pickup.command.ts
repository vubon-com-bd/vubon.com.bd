import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { SchedulePickupRequestDTO } from '@application/dtos/requests/return-shipment/index.js';
export class SchedulePickupReturnShipmentCommand extends BaseCommand {
  readonly type = 'logistics.return_shipment.schedule_pickup';
  constructor(public readonly dto: SchedulePickupRequestDTO, public readonly actorId: string) { super(); }
}
