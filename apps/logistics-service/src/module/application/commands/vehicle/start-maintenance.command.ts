import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { StartVehicleMaintenanceRequestDTO } from '@application/dtos/requests/vehicle/index.js';
export class StartMaintenanceVehicleCommand extends BaseCommand {
  readonly type = 'logistics.vehicle.start_maintenance';
  constructor(public readonly dto: StartVehicleMaintenanceRequestDTO, public readonly actorId: string) { super(); }
}
