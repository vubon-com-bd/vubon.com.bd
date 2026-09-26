import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class RegisterVehicleCommand extends BaseCommand {
  readonly type = 'logistics.vehicle.register';

  constructor(
    public readonly vehicleNumber: string,
    public readonly vehicleType: string,
    public readonly capacity?: number,
    public readonly fuelType?: string,
  ) {
    super();
  }
}
