import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { VehicleActionRequestDTO } from '@application/dtos/requests/vehicle/index.js';
export class UnassignDriverVehicleCommand extends BaseCommand {
  readonly type = 'logistics.vehicle.unassign_driver';
  constructor(public readonly dto: VehicleActionRequestDTO, public readonly actorId: string) { super(); }
}
