import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { AssignVehicleToDriverRequestDTO } from '@application/dtos/requests/driver/index.js';
export class AssignVehicleDriverCommand extends BaseCommand {
  readonly type = 'logistics.driver.assign_vehicle';
  constructor(public readonly dto: AssignVehicleToDriverRequestDTO, public readonly actorId: string) { super(); }
}
