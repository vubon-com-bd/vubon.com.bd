import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class UpdateDriverCommand extends BaseCommand {
  readonly type = 'logistics.driver.update';

  constructor(
    public readonly driverId: string,
    public readonly name?: string,
    public readonly phone?: string,
  ) {
    super();
  }
}
