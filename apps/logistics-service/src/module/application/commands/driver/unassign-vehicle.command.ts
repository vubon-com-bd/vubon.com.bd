import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { DriverActionRequestDTO } from '@application/dtos/requests/driver/index.js';
export class UnassignVehicleDriverCommand extends BaseCommand {
  readonly type = 'logistics.driver.unassign_vehicle';
  constructor(public readonly dto: DriverActionRequestDTO, public readonly actorId: string) { super(); }
}
