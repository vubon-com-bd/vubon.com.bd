import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class ReinstateVendorCommand extends BaseCommand {
  readonly type = 'vendor.suspension.reinstate';

  constructor(
    public readonly vendorId: string,
    public readonly reinstatedBy: string,
    public readonly reason?: string,
  ) {
    super();
  }
}
