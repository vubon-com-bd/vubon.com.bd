import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { AssignVehicleRequestDTO } from '@application/dtos/requests/vehicle/index.js';
export class AssignVehicleCommand extends BaseCommand {
  readonly type = 'logistics.vehicle.assign';
  constructor(public readonly dto: AssignVehicleRequestDTO, public readonly actorId: string) { super(); }
}
