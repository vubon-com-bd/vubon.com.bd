import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class SetDriverStatusCommand extends BaseCommand {
  readonly type = 'logistics.driver.set-status';

  constructor(
    public readonly driverId: string,
    public readonly status: string,
  ) {
    super();
  }
}
