import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { VehicleActionRequestDTO } from '@application/dtos/requests/vehicle/index.js';
export class CompleteMaintenanceVehicleCommand extends BaseCommand {
  readonly type = 'logistics.vehicle.complete_maintenance';
  constructor(public readonly dto: VehicleActionRequestDTO, public readonly actorId: string) { super(); }
}
