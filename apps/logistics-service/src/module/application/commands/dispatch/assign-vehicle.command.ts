import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class AssignVehicleCommand extends BaseCommand {
  readonly type = 'logistics.dispatch.assign-vehicle';

  constructor(
    public readonly dispatchId: string,
    public readonly vehicleId: string,
  ) {
    super();
  }
}
