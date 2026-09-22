import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class DeleteVendorCommand extends BaseCommand {
  readonly type = 'vendor.delete';

  constructor(
    public readonly vendorId: string,
    public readonly reason?: string,
  ) {
    super();
  }
}
