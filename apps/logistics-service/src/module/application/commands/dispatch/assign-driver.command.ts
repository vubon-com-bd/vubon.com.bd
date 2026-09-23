import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class AssignDriverCommand extends BaseCommand {
  readonly type = 'logistics.dispatch.assign-driver';

  constructor(
    public readonly dispatchId: string,
    public readonly driverId: string,
  ) {
    super();
  }
}
