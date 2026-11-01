import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { CreateVehicleRequestDTO } from '@application/dtos/requests/vehicle/index.js';
export class CreateVehicleCommand extends BaseCommand {
  readonly type = 'logistics.vehicle.create';
  constructor(public readonly dto: CreateVehicleRequestDTO, public readonly actorId: string) { super(); }
}
