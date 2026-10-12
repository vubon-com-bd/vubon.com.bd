import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { AssignDriverVehicleRequestDTO } from '../../dtos/requests/driver/driver.dto.js';
export class AssignDriverVehicleCommand extends BaseCommand {
  readonly type = 'logistics.driver.assign_vehicle';
  constructor(public readonly dto: AssignDriverVehicleRequestDTO, public readonly actorId?: string) { super(); }
}
