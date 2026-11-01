import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { VehicleActionRequestDTO } from '@application/dtos/requests/vehicle/index.js';
export class ReleaseVehicleCommand extends BaseCommand {
  readonly type = 'logistics.vehicle.release';
  constructor(public readonly dto: VehicleActionRequestDTO, public readonly actorId: string) { super(); }
}
