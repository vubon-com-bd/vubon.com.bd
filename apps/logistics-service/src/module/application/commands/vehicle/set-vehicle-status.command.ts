import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { SetVehicleStatusRequestDTO } from '../../dtos/requests/vehicle/vehicle.dto.js';
export class SetVehicleStatusCommand extends BaseCommand {
  readonly type = 'logistics.vehicle.set_status';
  constructor(public readonly dto: SetVehicleStatusRequestDTO, public readonly actorId?: string) { super(); }
}
