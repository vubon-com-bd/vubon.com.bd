import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class AppealSuspensionCommand extends BaseCommand {
  readonly type = 'vendor.suspension.appeal';

  constructor(
    public readonly vendorId: string,
    public readonly appeal: string,
  ) {
    super();
  }
}
