import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { RegisterVehicleRequestDTO } from '../../dtos/requests/vehicle/vehicle.dto.js';
export class RegisterVehicleCommand extends BaseCommand {
  readonly type = 'logistics.vehicle.register';
  constructor(public readonly dto: RegisterVehicleRequestDTO, public readonly actorId?: string) { super(); }
}
