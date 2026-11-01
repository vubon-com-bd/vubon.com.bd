import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { RetireVehicleRequestDTO } from '@application/dtos/requests/vehicle/index.js';
export class RetireVehicleCommand extends BaseCommand {
  readonly type = 'logistics.vehicle.retire';
  constructor(public readonly dto: RetireVehicleRequestDTO, public readonly actorId: string) { super(); }
}
