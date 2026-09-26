import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class SuspendVendorCommand extends BaseCommand {
  readonly type = 'vendor.suspension.suspend';

  constructor(
    public readonly vendorId: string,
    public readonly suspendedBy: string,
    public readonly reason: string,
    public readonly notes?: string,
  ) {
    super();
  }
}
