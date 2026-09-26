import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class ApproveVendorCommand extends BaseCommand {
  readonly type = 'vendor.approval.approve';

  constructor(
    public readonly vendorId: string,
    public readonly reviewedBy: string,
    public readonly reason?: string,
  ) {
    super();
  }
}
