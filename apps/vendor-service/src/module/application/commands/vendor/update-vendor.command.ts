import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class UpdateVendorCommand extends BaseCommand {
  readonly type = 'vendor.update';

  constructor(
    public readonly vendorId: string,
    public readonly name?: string,
    public readonly phone?: string,
    public readonly email?: string,
    public readonly description?: string,
  ) {
    super();
  }
}
