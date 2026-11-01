import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { UpdateVehicleRequestDTO } from '@application/dtos/requests/vehicle/index.js';
export class UpdateVehicleCommand extends BaseCommand {
  readonly type = 'logistics.vehicle.update';
  constructor(public readonly dto: UpdateVehicleRequestDTO, public readonly actorId: string) { super(); }
}
