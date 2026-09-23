import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class UpdateVehicleCommand extends BaseCommand {
  readonly type = 'logistics.vehicle.update';

  constructor(
    public readonly vehicleId: string,
    public readonly capacity?: number,
    public readonly fuelType?: string,
  ) {
    super();
  }
}
