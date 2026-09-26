import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class SetVehicleStatusCommand extends BaseCommand {
  readonly type = 'logistics.vehicle.set-status';

  constructor(
    public readonly vehicleId: string,
    public readonly status: string,
  ) {
    super();
  }
}
