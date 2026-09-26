import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class RequestInfoCommand extends BaseCommand {
  readonly type = 'vendor.approval.request-info';

  constructor(
    public readonly vendorId: string,
    public readonly reviewedBy: string,
    public readonly message: string,
  ) {
    super();
  }
}
