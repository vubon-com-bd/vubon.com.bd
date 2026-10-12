import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { UpdateVehicleMileageRequestDTO } from '../../dtos/requests/vehicle/vehicle.dto.js';
export class UpdateVehicleMileageCommand extends BaseCommand {
  readonly type = 'logistics.vehicle.update_mileage';
  constructor(public readonly dto: UpdateVehicleMileageRequestDTO, public readonly actorId?: string) { super(); }
}
