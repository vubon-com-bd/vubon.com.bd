import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class RegisterVendorCommand extends BaseCommand {
  readonly type = 'vendor.register';

  constructor(
    public readonly ownerId: string,
    public readonly businessName: string,
    public readonly businessType: string,
    public readonly contactPhone: string,
    public readonly contactEmail: string,
    public readonly addressLine1: string,
    public readonly division: string,
    public readonly district: string,
    public readonly businessRegistration?: string,
    public readonly businessDescription?: string,
    public readonly addressLine2?: string,
    public readonly upazila?: string,
    public readonly postalCode?: string,
  ) {
    super();
  }
}
