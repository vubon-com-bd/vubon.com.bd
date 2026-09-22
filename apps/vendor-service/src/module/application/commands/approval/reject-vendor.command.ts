import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class RejectVendorCommand extends BaseCommand {
  readonly type = 'vendor.approval.reject';

  constructor(
    public readonly vendorId: string,
    public readonly reviewedBy: string,
    public readonly reason: string,
  ) {
    super();
  }
}
