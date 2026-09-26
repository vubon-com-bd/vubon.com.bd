import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class UpdateBusinessCommand extends BaseCommand {
  readonly type = 'vendor.update-business';

  constructor(
    public readonly vendorId: string,
    public readonly businessName?: string,
    public readonly businessType?: string,
    public readonly businessRegistration?: string,
    public readonly businessDescription?: string,
  ) {
    super();
  }
}
