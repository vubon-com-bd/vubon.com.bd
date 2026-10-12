import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { AssignVehicleDriverRequestDTO } from '../../dtos/requests/vehicle/vehicle.dto.js';
export class AssignVehicleDriverCommand extends BaseCommand {
  readonly type = 'logistics.vehicle.assign_driver';
  constructor(public readonly dto: AssignVehicleDriverRequestDTO, public readonly actorId?: string) { super(); }
}
