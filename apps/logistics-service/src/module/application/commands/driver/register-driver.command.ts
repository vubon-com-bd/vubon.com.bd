import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class RegisterDriverCommand extends BaseCommand {
  readonly type = 'logistics.driver.register';

  constructor(
    public readonly name: string,
    public readonly phone: string,
    public readonly licenseNo: string,
    public readonly driverType: string,
  ) {
    super();
  }
}
