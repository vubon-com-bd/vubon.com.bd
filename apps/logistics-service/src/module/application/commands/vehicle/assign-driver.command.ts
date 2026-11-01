import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { AssignDriverToVehicleRequestDTO } from '@application/dtos/requests/vehicle/index.js';
export class AssignDriverVehicleCommand extends BaseCommand {
  readonly type = 'logistics.vehicle.assign_driver';
  constructor(public readonly dto: AssignDriverToVehicleRequestDTO, public readonly actorId: string) { super(); }
}
